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

export const conditionValidator = 
    (condition, messageFactory) => 
        value => 
            condition(value) 
                ? { valid: true } 
                : { valid: false, message: messageFactory(value) };

export const isRequired = path => conditionValidator(x => x, x => `${path} is required`)

export const showIfRequested = 
    prop => ({
        onChange: (validator, data, state = { requested: false }) => {
            var validationResult = validator(data);
            if (validationResult[prop].valid)
                return {...state, requested: false}
            return state;
        },
        onRequest: (data, state) => ({ ...state, requested: true }),
        dislayed: (validationResult, behaviourState) => behaviourState.requested
    });

export const alwaysShown = 
    prop => ({
        onChange: (validator, data, state = {}) => state,
        onRequest: (data, state) => state,
        dislayed: (validationResult, behaviourState) => true
    });

