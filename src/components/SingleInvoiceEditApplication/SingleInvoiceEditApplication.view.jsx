import React from 'react'
import { connect } from 'react-redux'
import { forwardTo } from 'reelm'

import InvoiceEdit from '../InvoiceEdit/InvoiceEdit.view'
import ConfirmModal from '../ConfirmModal/ConfirmModal.view'

@connect(state => ({
    state: state,
    invoice: state.get('invoice').toJS(),
    invoiceEditForm: state.get('invoiceEditForm').toJS(),
    confirmModal: state.get('confirmModal').toJS(),
}))
export default class Application extends React.Component {
    render() {
        var { dispatch, state, invoice, confirmModal, invoiceEditForm } = this.props;

        return <div>
            <h1>Single invoice</h1>
            <table width="100%">
                <tbody>
                    <tr>
                        <td width="50%">
                            <InvoiceEdit invoice={invoice || {}} {...invoiceEditForm} 
                                dispatch={forwardTo(dispatch, 'Invoice')}
                                viewDispatch={forwardTo(dispatch, 'InvoiceEditForm')} />
                        </td>
                        <td width="50%">
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