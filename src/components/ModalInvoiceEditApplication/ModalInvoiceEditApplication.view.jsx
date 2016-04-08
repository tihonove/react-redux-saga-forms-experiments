import React from 'react'
import { connect } from 'react-redux'
import { forwardTo } from 'reelm'

import { Gapped, Button, Modal } from 'ui'

import ConfirmModal from '../ConfirmModal/ConfirmModal.view'
import InvoiceEdit  from '../InvoiceEdit/InvoiceEdit.view'

@connect(state => ({
    state: state,
    invoices: state.get('invoices').toJS(),
    invoiceModalEdit: state.get('invoiceModalEdit').toJS(),
    confirmModal: state.get('confirmModal').toJS(),
}))
export default class Application extends React.Component {
    render() {
        var { dispatch, state, invoices, confirmModal, invoiceModalEdit } = this.props;
        var onAddInvoice = () => dispatch({ type: 'Invoices.Add' });
        var onEditInvoice = (index) => dispatch({ type: `Invoices.${index}.ModalEdit` });

        var onInvoiceEditDiscard = () => dispatch({ type: 'InvoiceModalEdit.Discard' });
        var onInvoiceEditSave = () => dispatch({ type: 'InvoiceModalEdit.Save' });

        return <div>
            <h1>Modal edit invoice</h1>
            <table width="100%">
                <tbody>
                    <tr>
                        <td width="50%">
                            <Gapped size={20} vertical>
                                {invoices.map((invoice, index) => <div key={index}>
                                    #{index} | Number: {invoice.number} | OrderNumber: {invoice.orderNumber} <Button onClick={() => onEditInvoice(index)}>Edit</Button>
                                    </div>)}
                            </Gapped>
                            <Button onClick={onAddInvoice}>Add invoice</Button>
                        </td>
                        <td width="50%">
                            <pre>
                                {JSON.stringify(state, null, '  ')}
                            </pre>
                        </td>
                    </tr>
                </tbody>
            </table>
            {invoiceModalEdit.show 
                ? (<Modal onClose={onInvoiceEditDiscard}>
                        <Modal.Header>Title</Modal.Header>
                        <Modal.Body>
                            <InvoiceEdit 
                                invoice={invoiceModalEdit.editableInvoice} 
                                {...invoiceModalEdit.invoiceEditForm} 
                                dispatch={forwardTo(dispatch, 'EditableInvoice')}
                                viewDispatch={forwardTo(dispatch, 'InvoiceEditForm')}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={onInvoiceEditSave}>Save</Button>
                            <Button onClick={onInvoiceEditDiscard}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>)
                : null}
            <ConfirmModal {...confirmModal} dispatch={forwardTo(dispatch, 'ConfirmModal')}/>
        </div>
    }
}