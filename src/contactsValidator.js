import { conditionValidator, createValidator, isRequired, showIfRequested, alwaysShown } from './forms/validators'

export var contactsValidator = createValidator({
    firstName: isRequired('First name'),
    lastName: isRequired('Last name'),
    email: isRequired('EMail'),
    inn: conditionValidator(x => x && x.startsWith('6699'), x => `${x} is not valid value for inn. Must starts with '6699'`),
})

export var contactValidatorBehaviour = { 
    firstName: showIfRequested('firstName'),
    lastName: showIfRequested('lastName'),
    email: alwaysShown('email'),
    inn: showIfRequested('inn'),
}