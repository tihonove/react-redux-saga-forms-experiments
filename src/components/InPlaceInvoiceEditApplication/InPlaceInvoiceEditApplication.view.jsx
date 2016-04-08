import React from 'react'
import { connect } from 'react-redux'
import { forwardTo } from 'reelm'

import { Gapped, Button, Modal } from 'ui'

import ConfirmModal from '../ConfirmModal/ConfirmModal.view'
import InvoiceEdit  from '../InvoiceEdit/InvoiceEdit.view'

@connect(state => ({
    state: state,
    invoices: state.get('invoices').toJS(),
    invoiceEditForm: state.get('invoiceEditForm').toJS(),
    confirmModal: state.get('confirmModal').toJS(),
    currentInvoiceIndex: state.get('currentInvoiceIndex'),
}))
export default class Application extends React.Component {
    render() {
        var { dispatch, state, invoices, confirmModal, invoiceEditForm, currentInvoiceIndex } = this.props;
        var onAddInvoice = () => dispatch({ type: 'Invoices.Add' });
        var onEditInvoice = (index) => dispatch({ type: `Invoices.${index}.InplaceEdit` });

        var onInvoiceEditDiscard = () => dispatch({ type: 'InvoiceModalEdit.Discard' });
        var onInvoiceEditSave = () => dispatch({ type: 'InvoiceModalEdit.Save' });

        return <div>
            <h1>Inplace invoice</h1>
            <table width="100%">
                <tbody>
                    <tr>
                        <td width="33%">
                            <Gapped size={20} vertical>
                                {invoices.map((invoice, index) => <div key={index}>
                                    #{index} | Number: {invoice.number} | OrderNumber: {invoice.orderNumber} <Button onClick={() => onEditInvoice(index)}>Edit</Button>
                                    </div>)}
                            </Gapped>
                            <Button onClick={onAddInvoice}>Add invoice</Button>
                        </td>
                        <td width="33%">
                            {currentInvoiceIndex === undefined ? null : (<h3>Invoice #{currentInvoiceIndex}</h3>)}
                            {currentInvoiceIndex === undefined ? null : 
                                (<InvoiceEdit 
                                    invoice={invoices[currentInvoiceIndex]} 
                                    {...invoiceEditForm} 
                                    dispatch={forwardTo(dispatch, 'Invoices', currentInvoiceIndex)}
                                    viewDispatch={forwardTo(dispatch, 'InvoiceEditForm')}
                                />)}
                        </td>
                        <td width="33%">
                            <pre>
                                {JSON.stringify(state, null, '  ')}
                            </pre>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ConfirmModal {...confirmModal} dispatch={forwardTo(dispatch, 'ConfirmModal')}/>
        </div>
    }
}