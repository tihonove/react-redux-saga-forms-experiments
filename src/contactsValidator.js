import { createValidator, isRequired } from './forms/validators'

export default createValidator({
    firstName: isRequired('First name'),
    lastName: isRequired('Last name'),
    email: isRequired('EMail'),
})
