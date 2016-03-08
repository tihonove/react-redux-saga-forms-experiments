import { createValidator, isRequired } from "../../src/forms/validators"
import { validationInfo } from "../../src/forms/reducers"

const validator = createValidator({
    firstName: isRequired('First name')
})

const requestValidationReducer = validationInfo.requestValidationReducer;
const validateReducer = validationInfo.createValidateReducer(validator);

describe('ValidationInfoReducer', () => {

    it('should do right things', () => {
        var state = undefined;

        state = validateReducer(state, { firstName: '123' })
        expect(state).toEqual({ firstName: { validationRequested: false, displayed: false, valid: true } })

        state = validateReducer(state, { firstName: '' })
        expect(state).toEqual({ firstName: { validationRequested: false, displayed: false, valid: false, message: 'First name is required' } })

        state = requestValidationReducer(state)
        expect(state).toEqual({ firstName: { validationRequested: true, displayed: false, valid: false, message: 'First name is required' } })

        state = validateReducer(state, { firstName: '' })
        expect(state).toEqual({ firstName: { validationRequested: true, displayed: true, valid: false, message: 'First name is required' } })

        state = validateReducer(state, { firstName: '123' })
        expect(state).toEqual({ firstName: { validationRequested: false, displayed: false, valid: true } })
    });

});
