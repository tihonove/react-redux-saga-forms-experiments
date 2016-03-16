import { actionSet, emptyAction, plainAction, namespace } from 'redux-compose/actions2'

export const modal = actionSet({
    Close: emptyAction,
    Complete: emptyAction,
    Show: plainAction
})
