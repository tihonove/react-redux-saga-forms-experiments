import { selectValidationInfos } from '../forms/selectors'

export function selectContacts( contacts, validationInfo ) {
    return {
        model: contacts,
        validationInfo: selectValidationInfos(validationInfo)
    }
}
