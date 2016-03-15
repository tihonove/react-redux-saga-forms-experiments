import _ from 'lodash'

const reduceKeys = 
    (obj, func) => 
        Object
            .getOwnPropertyNames(obj)
            .map(prop => ({ [prop]: func(prop, obj[prop], (value = obj[prop]) => {
                if (typeof value === 'object')
                    return reduceKeys(value, func);
                return value;
            }) }))
            .reduce((x, y) => ({...x, ...y}), {})


export const plainAction = (prop) => ({ 
    name: prop,
    fire: (v) => ({ type: prop, ...v })
})

export const isNamespace = value => !value.fire && value.name && true
const isAction = value => value.fire && value.name && true

const exctractDefinitions = obj => reduceKeys(obj['__definition__'] ? obj['__definition__'] : obj, (prop, value, next) => {
    if (value['__definition__'])
        return next(value['__definition__']);
    return next();
})

export const namespace = 
    (...sets) => 
        namespaceProp => ({
                name: namespaceProp,
                ['__type__']: 'namespace',
                ['__definition__']: _.merge({}, ...sets.map(exctractDefinitions)),
                ...reduceKeys(_.merge({}, ...sets.map(exctractDefinitions)), (prop, value, next) => {
                    if (typeof value === 'function') {
                        return value(namespaceProp + '/' + prop);
                    }
                    return next();
                })
        })

export const actionSet = (...objs) => ({
        ['__type__']: 'set',
        ['__definition__']: _.merge({}, ...objs.map(exctractDefinitions)),
        ...reduceKeys(_.merge({}, ...objs.map(exctractDefinitions)), (prop, value, next) => {
            if (typeof value === 'function') {
                return value(prop)
            }
            return next();
        })
    })


export const mergeActionCreators = _.merge

export const buildActionCreators = 
    defs => 
        reduceKeys(defs, (prop, value, next) => isAction(value) ? value.fire : next())

export const toNamespace = 
    (namespaceObj, actionCreators) => reduceKeys(actionCreators, (prop, value, next) => {
        if (typeof value === 'function') {
            return (...args) => {
                var result = value(...args);
                result.type = namespaceObj.name + '/' +result.type;
                return result;
            }
        }
        return next();
    })

export const bindProps = propSelector => (dispatch, props) => action => dispatch({ ...action, ...propSelector(props) })

export const wrap = (actionCreators, ...modificators) => (dispatch, props) => {
    dispatch = modificators.reduce((dispatch, modificator) => modificator(dispatch, props), dispatch)
    return reduceKeys(actionCreators, (prop, value, next) => {
        if (typeof value === 'function') {
            return (...args) => dispatch(value(...args))
        }
        return next();
    })
}
