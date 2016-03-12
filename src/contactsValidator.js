import { createValidator, isRequired } from './forms/validators'

export var contactsValidator = createValidator({
    firstName: isRequired('First name'),
    lastName: isRequired('Last name'),
    email: isRequired('EMail'),
})

const showIfRequested = 
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

export var contactValidatorBehaviour = { 
    firstName: showIfRequested('firstName'),
    lastName: showIfRequested('lastName'),
    email: showIfRequested('email')
}