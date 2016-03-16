import { Map } from 'immutable'

import reduce, { createReducer, on, namespace } from 'redux-compose'
import { modal } from './actions'

export const modalReducer = createReducer(
    Map({show: false}),
    {
        [on(modal.Show)]: (x, {type, ...args}) => x.merge({show: true, ...args}),
        [on(modal.Close)]: x => Map({show: false, goodItem: Map()}),        
    });
