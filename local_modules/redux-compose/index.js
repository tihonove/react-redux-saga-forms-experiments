import { Iterable } from 'immutable'

const toNamespace = (action, namespace) => ({ ...action, type: action.type.replace(namespace + '/', '') })

export const chain = (...reducers) => (state, action) => reducers.reduce((s, reducer) => reducer(s, action), state)

const reduceInternal = 
    (descriptor, defaultState) => 
        typeof descriptor === 'function'
            ? (state = defaultState, action, rootState) => descriptor(state, action, rootState)
            : (state = defaultState, action, rootState) => {
                return Object
                    .getOwnPropertyNames(descriptor)
                    .reduce(
                        (state, prop) => {
                            if (prop.startsWith('NS:')) {
                                let namespace = prop.replace('NS:', '');
                                if (action.type.startsWith(namespace + '/') || action.type.startsWith('@@')){
                                    return reduceInternal(descriptor[prop], defaultState)(state, toNamespace(action, namespace), state);
                                }
                                return state;                                
                            }
                            else if (prop.startsWith('A:')) {
                                let actionName = prop.replace('A:', '');
                                if (action.type == actionName) {
                                    return reduceInternal(descriptor[prop], defaultState)(state, action, state);
                                }
                                return state;                                
                            }
                            else {
                                if (Iterable.isKeyed(state))
                                {
                                    return state.update(prop, x => reduceInternal(descriptor[prop])(x, action, x))
                                }
                                else {
                                    return {
                                        ...state,
                                        [prop]: reduceInternal(descriptor[prop])(state[prop], action, state),
                                    }                                    
                                }
                            }
                            return state;
                        }, state)
              };

const reduce = 
    (descriptor, defaultState) => {
        var result = reduceInternal(descriptor, defaultState);
        return (state, action) => result(state, action, state);
    };

export default reduce

export const on = actionName => 
    actionName.name 
        ? `A:${actionName.name}`
        : `A:${actionName}`

export const namespace = 
    actionNamepsace => 
        actionNamepsace['__namespace__'] 
            ? `NS:${actionNamepsace['__namespace__']}`
            : actionNamepsace.name 
                ? `NS:${actionNamepsace.name}`
                : `NS:${actionNamepsace}`

export const mergeFrom = selector => (state, action) => ({ ...state, ...selector(action) })