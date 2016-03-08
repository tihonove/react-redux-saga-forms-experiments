import { createValidator, isRequired } from "../../src/forms/validators"

const dataValidator = createValidator({
    stringValue: isRequired('String value')
});

describe('CreateValidatorResult', () => {

    it('validate empty string', () => {
        var result = dataValidator({ stringValue: '' });
        expect(result.stringValue)
            .toEqual({
                valid: false,
                message: 'String value is required'
            });
    })

    it('validate valid string', () => {
        var result = dataValidator({ stringValue: 'valid string' });
        expect(result.stringValue)
            .toEqual({ valid: true });
    })

    it('do not touch not in defintion values', () => {
        var result = dataValidator({ stringValue: 'valid string', otherValue: 'value' });
        expect(result)
            .toEqual({ stringValue: { valid: true } });
    })

});
