const merge = (x, y) => ({...x, ...y})

export const createValidatorReducer = 
    (validator, behaviour) => ({
        onChange: (data, state = {}, action) => {
            return Object
                .getOwnPropertyNames(behaviour)
                .map(prop => ({ [prop]: behaviour[prop].onChange(validator, data, state[prop]) }))
                .reduce(merge)
        },
        requestValidation: (data, state = {}, action) => {
            return Object
                .getOwnPropertyNames(behaviour)
                .map(prop => ({ [prop]: behaviour[prop].onRequest(data, state[prop]) }))
                .reduce(merge)
        }
    })

export const createValidationInfoSelector = 
    (validator, behaviour) => 
        (data, behaviourState) => {
            var validationResult = validator(data);
            return Object
                .getOwnPropertyNames(validationResult)
                .filter(prop => !validationResult[prop].valid && behaviour[prop].dislayed(validationResult[prop], behaviourState[prop]))
                .map(prop => ({
                    [prop]: { text: validationResult[prop].message }
                }))
                .reduce(merge, {})
        }
        