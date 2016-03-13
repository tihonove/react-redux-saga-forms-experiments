import { Map } from 'immutable'
import reduce, { on, namespace } from 'redux-compose'

import invoiceReducer from '../../InvoiceEditForm/reducers/invoiceReducer'
import goodItemModalReducer from '../../InvoiceEditForm/reducers/goodItemModalReducer'

import actions from '../actions'

export default reduce({
    invoice: invoiceReducer,
    [namespace(actions.GoodItem.ModalDialog)]: {
        goodItemModal: goodItemModalReducer
    }
}, Map())