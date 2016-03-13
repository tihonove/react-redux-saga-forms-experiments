function leaf(prefix, prop) {
    return (prefix ? prefix + '/' : '') + prop;
}

function node(prefix, prop, value) {
    return {
        ['__namespace__']: (prefix ? prefix + '/' : '') + prop, 
        ...actions(value, (prefix ? prefix + '/' : '') + prop) 
    }
}

function build(prefix, prop, value) {
    if (value === true) {
        return ({ [prop]: leaf(prefix, prop) })
    }
    else if (typeof value === 'string') {
        return ({ [prop]: (prefix ? prefix + '/' : '') + value });
    }
    else {
        return ({ [prop]: node(prefix, prop, value) })
    }
}

export default function actions(actionObject, prefix) {
    return Object
        .getOwnPropertyNames(actionObject)
        .map(prop => build(prefix, prop, actionObject[prop]))
        .reduce((x, y) => ({...x, ...y}), {})
}

