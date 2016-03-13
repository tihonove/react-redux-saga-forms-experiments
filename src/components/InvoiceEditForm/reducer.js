import { Map, List } from 'immutable'
import reduce, { namespace, on } from 'redux-compose'

export default reduce({
    [on("Change")]: 
        (state, {type, ...values}) => state.mergeDeep(values),

    [namespace("GoodItem")]: {
        items: {
            [on("Change")]: 
                (state, {type, goodItemIndex, ...values}) => state.mergeDeepIn([goodItemIndex], values),
            [on("Delete")]: 
                (state, {type, goodItemIndex}) => state.delete(goodItemIndex),
            [on("Add")]: 
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