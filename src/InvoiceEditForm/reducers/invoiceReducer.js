import { Map, List } from 'immutable'
import reduce, { namespace, on } from 'redux-compose'

import goodItemReducer from './goodItemReducer'
import { invoice, goodItem, list } from '../invoiceActions'


export default reduce({
    [on(invoice.Change)]:
        (state, {type, ...values}) => state.mergeDeep(values),

    [namespace(invoice.GoodItem)]: {
        items: {
            [on(goodItem.Change)]: 
                (state, {type, goodItemIndex, ...values}) => 
                    state.update(goodItemIndex, s => goodItemReducer(s, {type, ...values})),
            [on(list.Delete)]: 
                (state, {type, goodItemIndex}) => state.delete(goodItemIndex),
            [on(list.Add)]: 
                (state, {type, ...values}) => state.push(Map(values)),
        }
    }
}, Map({
    number: '#',
    inn: '',
    items: List.of(
        Map({ 
            name: 'Milk',
            price: 1.2
        }),
        Map({ 
            name: 'Bread',
            price: 2.3
        })
    )
}))