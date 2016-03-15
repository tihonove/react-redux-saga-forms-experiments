import { Map } from 'immutable'
import reduce, { createReducer, on, namespace } from 'redux-compose'

import { modal } from '../invoiceActions'
import goodItemReducer from './goodItemReducer'

const modalReducer = createReducer(
    Map({show: false}),
    {
        [on(modal.Show)]: (x, {type, ...args}) => x.merge({show: true, ...args}),
        [on(modal.Close)]: x => Map({show: false, goodItem: Map()}),        
    });

export default createReducer(Map(), modalReducer, { goodItem: goodItemReducer });
