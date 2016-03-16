import { Map } from 'immutable'
import { on, namespace, createReducer } from 'redux-compose'

import invoiceReducer from '../../InvoiceEditForm/reducers/invoiceReducer'
import goodItemModalReducer from '../../InvoiceEditForm/reducers/goodItemModalReducer'
import confirmModalReducer from '../../ConfirmModal/reducer'

import actions from '../actions'

export default createReducer(Map(), {
    [namespace(actions.Invoice)]: {
        invoice: invoiceReducer,
    },
    [namespace(actions.Invoice.GoodItem.ModalDialog)]: {
        goodItemModal: goodItemModalReducer
    },
    confirmModal: confirmModalReducer
}, (s, a) => { console.log(a); return s; })
