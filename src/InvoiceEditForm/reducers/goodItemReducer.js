import { Map } from 'immutable'
import reduce, { on, namespace } from 'redux-compose'

import { goodItem } from '../invoiceActions'

export default reduce({
    [on(goodItem.Change)]: (state, {type, ...values}) => state.mergeDeep(values)
}, Map()) 

