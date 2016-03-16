import { actionSet, emptyAction, plainAction, namespace } from 'redux-compose/actions2'

const actions = actionSet({
    Confirm: plainAction,
    Yes: emptyAction,
    No: emptyAction
})

export default actions;

export function viaConfirm(action, textSelector) {
    return (...args) => ({
            type: actions.Confirm.name,
            text: textSelector,
            action: () => action.fire(...args)
        })
}