import actions from 'redux-compose/actions'

export const goodItem = actions({
    Change: true
})

export const list = actions({
    Delete: true,
    Add: true,    
})

export const invoice = actions({
    Change: true,
    GoodItem: {
        ...goodItem,
        ...list
    }
})

console.log(invoice)