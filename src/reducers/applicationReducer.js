import invoiceReducer from '../components/InvoiceEditForm/reducer'
import reduce from 'redux-compose'

export default function (state, action) {
    state = reduce({
        invoice: invoiceReducer
    }, {})(state, action);
    return state;
}