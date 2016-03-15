import _ from 'lodash'
import { bindActionCreators } from 'redux'

export const fire = actionObject => (...args) => ({ type: actionObject.name, ...actionObject.fire(...args) })

function bindActionCreatorsDeep(actionCreators, dispatch) {
    return Object
        .getOwnPropertyNames(actionCreators)
        .map(prop => 
            ({ 
                [prop]: (typeof actionCreators[prop] === 'function'
                        ? bindActionCreators(actionCreators[prop], dispatch)
                        : bindActionCreatorsDeep(actionCreators[prop], dispatch)) 
            }))
        .reduce((x, y) => ({...x, ...y}), {})
}

export const buildDispatchConnector = (...actionCreatorsList) => dispatch => _.merge(...actionCreatorsList.map(x => bindActionCreatorsDeep(x, dispatch)))

export const conventialActions = actionsObject => 
    Object
        .getOwnPropertyNames(actionsObject)
        .map(prop => 
            ({ 
                [/[A-Z]/.test(prop[0]) ? ('on' + prop) : (prop)]: (actionsObject[prop].name && actionsObject[prop].fire)
                        ? fire(actionsObject[prop])
                        : conventialActions(actionsObject[prop])
            }))
        .reduce((x, y) => ({...x, ...y}), {})
