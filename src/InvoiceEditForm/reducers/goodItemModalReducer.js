import { Map } from 'immutable'
import reduce, { createReducer, on, namespace } from 'redux-compose'

import { modalReducer } from '../../Modal/reducer'
import goodItemReducer from './goodItemReducer'

export default createReducer(Map(), modalReducer, { goodItem: goodItemReducer });
