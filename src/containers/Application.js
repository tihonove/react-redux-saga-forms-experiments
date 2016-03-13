import React from 'react'
import { connect } from 'react-redux'

import InvoiceEditForm from '../components/InvoiceEditForm/Form'

const ApplicationInvoiceEditForm = connect(
    state => ({
        invoice: state.invoice.toJS()
    }),
    dispatch => ({
        onChange: v => dispatch({type: "Change", invoice: v}),
        onGoodItem: {
            change: v => dispatch({type: "GoodItem/Change", ...v}),
            delete: v => dispatch({type: "GoodItem/Delete", ...v}),
            add: v => dispatch({type: "GoodItem/Add", ...v}),
        }
    })
)(InvoiceEditForm)

@connect(state => state)
export default class Application extends React.Component {
    render() {
        return (<div>
            <div style={{width: 1200, margin: '0 auto' }}>
                <h1>Application</h1>
                <table style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <td style={{width: '50%'}}>
                                <ApplicationInvoiceEditForm />
                            </td>
                            <td style={{width: '50%'}}>
                                <pre>{JSON.stringify(this.props, null, '  ')}</pre>            
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>            
        </div>)
    }
}
