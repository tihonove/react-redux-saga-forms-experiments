import React from 'react';

export default function ContactsForm({
    firstName,
    firstNameValidationInfo,
    lastName,
    lastNameValidationInfo,
    email,
    emailValidationInfo,
    onChange
}) {
    return <div>
        <h2>Contacts form</h2>
        <div>
            First name:
            <input value={firstName.value} onChange={e => onChange({firstName: e.target.value})}/>
            {firstNameValidationInfo.displayed ? <span>{firstNameValidationInfo.text}</span> : null}
        </div>
        <div>
            Last name:
            <input value={lastName} onChange={e => onChange({lastName: e.target.value})}/>
            {lastNameValidationInfo.displayed ? <span>{lastNameValidationInfo.text}</span> : null}
        </div>
        <div>
            EMail:
            <input value={email} onChange={e => onChange({email: e.target.value})}/>
            {emailValidationInfo.displayed ? <span>{emailValidationInfo.text}</span> : null}
        </div>
    </div>;
}