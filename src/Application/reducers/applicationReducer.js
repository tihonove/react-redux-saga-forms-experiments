import { Map } from 'immutable'
import { on, namespace, createReducer } from 'redux-compose'

import invoiceReducer from '../../InvoiceEditForm/reducers/invoiceReducer'
import goodItemModalReducer from '../../InvoiceEditForm/reducers/goodItemModalReducer'

import actions from '../actions'

export default createReducer(Map(), {
        invoice: invoiceReducer,
        [namespace(actions.GoodItem.ModalDialog)]: {
            goodItemModal: goodItemModalReducer
        }
    }, (s, a) => { console.log(a); return s; })
