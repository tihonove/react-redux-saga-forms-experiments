const merge = (left, right) => Object.assign({}, left, right)

export const selectValidationInfos = (validationInfo) => Object
    .getOwnPropertyNames(validationInfo)
    .filter(x => validationInfo[ x].displayed)
    .map(x => ({
        [x]: {
            text: validationInfo[ x].message
        }
    }))
    .reduce(merge, {});
