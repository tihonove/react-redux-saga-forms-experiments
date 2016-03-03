export function selectContacts(contacts) {
    return {
        ...contacts,
        firstNameValidationInfo:  {
            displayed: !contacts.firstName,
            text: !contacts.firstName ? "First name is required" : null
        },
        lastNameValidationInfo:  {
            displayed: !contacts.lastName,
            text: !contacts.lastName ? "Last name is required" : null
        },
        emailValidationInfo:  {
            displayed: !contacts.email,
            text: !contacts.email ? "First name is required" : null
        }
    }
}
