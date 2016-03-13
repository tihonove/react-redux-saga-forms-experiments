import { Map } from 'immutable'
import invoiceReducer from '../components/InvoiceEditForm/reducer'
import reduce, { on, namespace } from 'redux-compose'

export default function (state, action) {
    state = reduce({
        invoice: invoiceReducer,
        goodItemModal: reduce({
            [namespace('GoodItem/ModalDialog')]: {
                [on('Show')]: (x, {goodItem}) => x.mergeDeep({show: true, goodItem: goodItem}),
                [on('Close')]: x => Map({show: false, goodItem: Map()}),
                [on('Change')]: (state, {type, ...values}) => state.mergeDeepIn(['goodItem'], values)
            }
        }, Map({
            show: false,
            goodItem: Map()
        }))
    }, Map())(state, action);
    return state;
}