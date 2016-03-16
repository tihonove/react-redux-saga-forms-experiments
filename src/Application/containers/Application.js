import React from 'react'
import { connect } from 'react-redux'
import { toNamespace , mergeActionCreators, buildActionCreators, wrap, wrap2, connect2 } from 'redux-compose/actions2'

import InvoiceEditForm from '../../InvoiceEditForm/components/InvoiceEditForm'
import GoodItemModal from '../../InvoiceEditForm/components/GoodItemModal'

import actions from '../actions'
import { modal } from '../../Modal/actions'
import { goodItem } from '../../InvoiceEditForm/invoiceActions'
import { invoiceEditFormActionCreators, goodItemModalActionCreators } from '../../InvoiceEditForm/actionCreators'
import confirmModalAction, { viaConfirm } from '../../ConfirmModal/actions'
import ConfirmModal from '../../ConfirmModal/ConfirmModal'

const ApplicationInvoiceEditForm = connect2(
    state => ({ invoice: state.get('invoice').toJS() }),
    [
        toNamespace(actions.Invoice, invoiceEditFormActionCreators),
        {
            onGoodItem: {
                add: viaConfirm(actions.Invoice.GoodItem.ModalAdd, "Add?"),
                edit: viaConfirm(actions.Invoice.GoodItem.ModalEdit, "Edit?")
            }
        }
    ])(InvoiceEditForm)

var AppConfirmModal = connect2(
    state => state.get('confirmModal').toJS(),
    [{
        onYes: confirmModalAction.Yes,
        onNo: confirmModalAction.No
    }])(ConfirmModal)


@connect(
    state => ({ 
        immutableState: state,
        goodItemModal: state.get('goodItemModal').toJS(),
    }),
    [
        toNamespace(actions.Invoice.GoodItem.ModalDialog, {
            onGoodItemModal: goodItemModalActionCreators
        })
    ]
)
export default class Application extends React.Component {
    render() {
        return (<div>
            <AppConfirmModal />
            <GoodItemModal {...this.props.goodItemModal} {...this.props.onGoodItemModal} />

            <div style={{width: 1200, margin: '0 auto' }}>
                <h1>Application</h1>
                <table style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <td style={{width: '50%'}}>
                                <ApplicationInvoiceEditForm />
                            </td>
                            <td style={{width: '50%'}}>
                                <pre>{JSON.stringify(this.props.immutableState.toJS(), null, '  ')}</pre>            
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>            
        </div>)
    }
}
