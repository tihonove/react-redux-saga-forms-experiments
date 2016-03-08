const merge = (left, right) => Object.assign({}, left, right)

export const createValidator = 
    definition => 
        model => 
            Object
                .getOwnPropertyNames(definition)
                .map(prop => ({ [prop]: definition[prop](model[prop], model) }))
                .reduce(merge, {});

export const isValid = validationResult => 
    Object
        .getOwnPropertyNames(validationResult)
        .map(x => validationResult[x].valid)
        .reduce((x, y) => x && y, true);

export const isRequired = 
    path => 
        value => 
            value 
                ? { valid: true } 
                : { valid: false, message: `${path} is required` };
