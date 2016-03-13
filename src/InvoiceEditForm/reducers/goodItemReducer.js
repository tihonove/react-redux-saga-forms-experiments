import { Map } from 'immutable'
import reduce, { on, namespace } from 'redux-compose'

export default reduce({
    [on('Change')]: (state, {type, ...values}) => state.mergeDeep(values)
}, Map()) 

