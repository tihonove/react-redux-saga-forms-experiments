import React from 'react'
import { connect } from 'react-redux'
import { mergeActionCreators, buildActionCreators, wrap } from 'redux-compose/actions2'

import InvoiceEditForm from '../../InvoiceEditForm/components/InvoiceEditForm'
import GoodItemModal from '../../InvoiceEditForm/components/GoodItemModal'

import actions from '../actions'
import { invoiceEditFormActionCreators } from '../../InvoiceEditForm/actionCreators'

const ApplicationInvoiceEditForm = connect(
    state => ({
        invoice: state.get('invoice').toJS(),
    }),
    wrap(mergeActionCreators(
        buildActionCreators(invoiceEditFormActionCreators),
        buildActionCreators({
            onGoodItem: {
                add: actions.GoodItem.ModalAdd,
                edit: actions.GoodItem.ModalEdit,
            }
        })

    ))
)(InvoiceEditForm)

@connect(
    state => ({ 
        immutableState: state,
        goodItemModal: state.get('goodItemModal').toJS(),
    }),
    wrap(buildActionCreators({
        onGoodItemModal: {
            onChange: actions.GoodItem.ModalDialog.Change,
            onCancel: actions.GoodItem.ModalDialog.Close,
            onComplete: actions.GoodItem.ModalDialog.Complete,
        },
    }))
)
export default class Application extends React.Component {
    render() {
        return (<div>
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
