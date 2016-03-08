const initialState = {};

export const requestValidationReducer = (state = initialState) => 
        Object
            .getOwnPropertyNames(state)
            .reduce((state, prop) => ({
                    ...state,
                    [prop]: {
                        ...state[prop],
                        validationRequested: true
                    }
                }), state);

export const createValidateReducer = validator => (state = initialState, model) => {
        var validationResult = validator(model);
        return Object
            .getOwnPropertyNames(validationResult)
            .reduce((state, prop) => {
                return {
                    ...state,
                    [prop]: {
                        ...validationResult[prop],
                        validationRequested: !!(state[prop] && state[prop].validationRequested) && !validationResult[prop].valid,
                        displayed: !validationResult[prop].valid && !!(state[prop] && state[prop].validationRequested)
                    }
                };
            }, state);
    };
