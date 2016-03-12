import React from 'react';

function ValidatedInput({value, onChange, validationInfo}) {
    return <span>
        <input value={value} onChange={onChange} />
        {validationInfo ? <span>{validationInfo.text}</span> : null}
    </span>;
}

function bindValidatedInput(fieldName, model, validationInfo, onChange) {
    return {
        value: model[fieldName],
        onChange: e => onChange({[fieldName]: e.target.value}),
        validationInfo: validationInfo[fieldName]
    }
}

export default function ContactsForm({
    contacts,
    validationInfo,
    onChange
}) {
    return <div>
        <h2>Contacts form</h2>
        <div>
            First name: <ValidatedInput  {...bindValidatedInput('firstName', contacts, validationInfo, onChange)} />
        </div>
        <div>
            Last name: <ValidatedInput  {...bindValidatedInput('lastName', contacts, validationInfo, onChange)} />
        </div>
        <div>
            EMail: <ValidatedInput  {...bindValidatedInput('email', contacts, validationInfo, onChange)} />
        </div>
        <div>
            INN: <ValidatedInput  {...bindValidatedInput('inn', contacts, validationInfo, onChange)} />
        </div>
    </div>;
}