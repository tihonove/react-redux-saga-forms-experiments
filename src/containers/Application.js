import React from 'react'
import { connect } from 'react-redux'

import InvoiceEditForm from '../components/InvoiceEditForm/Form'
import GoodItemModal from '../components/InvoiceEditForm/GoodItemModal'

const ApplicationInvoiceEditForm = connect(
    state => ({
        invoice: state.get('invoice').toJS(),
    }),
    dispatch => ({
        onChange: v => dispatch({type: "Change", invoice: v}),
        onGoodItem: {
            change: v => dispatch({type: "GoodItem/Change", ...v}),
            delete: v => dispatch({type: "GoodItem/Delete", ...v}),
            add: v => dispatch({type: "GoodItem/ModalAdd", ...v}),
            edit: v => dispatch({type: "GoodItem/ModalEdit", ...v}),
        }
    })
)(InvoiceEditForm)

@connect(
    state => ({ 
        immutableState: state,
        goodItemModal: state.get('goodItemModal').toJS(),
    }),
    dispatch => ({
        onGoodItemModal: {
            onChange: (v) => dispatch({type: "GoodItem/ModalDialog/Change", ...v}),
            onCancel: () => dispatch({type: "GoodItem/ModalDialog/Close"}),
            onComplete: () => dispatch({type: "GoodItem/ModalDialog/Complete"}),
        },
    })
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
