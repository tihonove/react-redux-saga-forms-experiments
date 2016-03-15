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

export const emptyAction = (prop) => ({ 
    name: prop,
    fire: () => ({ type: prop })
})

export const isNamespace = value => !value.fire && value.name && true
const isAction = value => value.fire && value.name && true


const exctractDefinitions = obj => reduceKeys(obj['__definition__'] ? obj['__definition__'] : obj, (prop, value, next) => {
    while (value['__definition__']){
        value = value['__definition__'];
    }
    return next(value);
})

const restoreDefintions = 
    (sets) => 
        _.mergeWith({}, ...sets.map(exctractDefinitions), (val, src) => 
            {
                if ((val && val.ns) && (src && src.ns)) {
                    return namespace(val.ns, src.ns);
                }
            });


function namespace(...sets) {  
    function namespaceFunc(namespaceProp) {
        return {
                name: namespaceProp,
                ['__type__']: 'namespace',
                ['__definition__']: restoreDefintions(sets),
                ...reduceKeys(restoreDefintions(sets), (prop, value, next) => {
                    if (typeof value === 'function') {
                        return value(namespaceProp + '/' + prop);
                    }
                    return next();
                })
        }}
        namespaceFunc.ns = restoreDefintions(sets);
        return namespaceFunc;
    }

export {namespace};

export const actionSet = (...objs) => ({
        ['__type__']: 'set',
        ['__definition__']: restoreDefintions(objs),
        ...reduceKeys(restoreDefintions(objs), (prop, value, next) => {
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
