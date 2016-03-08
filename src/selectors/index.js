export function selectContacts(contacts, validationInfo) {
    var validationDisplayed = true;
    console.log(validationInfo);
    return {
        model: contacts,
        validationInfo: {
            firstName: {
                displayed: validationInfo.firstName.displayed,
                text: validationInfo.firstName.message
            },
            lastName: {
                displayed: validationInfo.lastName.displayed,
                text: validationInfo.lastName.message
            },
            email: {
                displayed: validationInfo.email.displayed,
                text: validationInfo.email.message
            }
        }
    }
}
