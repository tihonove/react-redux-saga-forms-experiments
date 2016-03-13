import { Map } from 'immutable'
import reduce, { on, namespace } from 'redux-compose'

import goodItemReducer from './goodItemReducer'

export default reduce({
    [on('Show')]: (x, {goodItem}) => x.mergeDeep({show: true, goodItem: goodItem}),
    [on('Close')]: x => Map({show: false, goodItem: Map()}),
    goodItem: goodItemReducer
}, Map({
    show: false
}))
