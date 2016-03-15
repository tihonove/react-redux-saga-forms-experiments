import { actionSet, emptyAction, plainAction, namespace } from 'redux-compose/actions2'

export const modal = actionSet({
    Close: emptyAction,
    Complete: emptyAction,
    Show: plainAction
})

export const goodItem = actionSet({
    Change: plainAction
})

export const list = actionSet({
    Delete: plainAction,
    Add: plainAction,
})

export const invoice = actionSet({
    Change: plainAction,
    GoodItem: namespace(goodItem, list)
})