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
    model,
    validationInfo,
    onChange
}) {
    return <div>
        <h2>Contacts form</h2>
        <div>
            First name: <ValidatedInput  {...bindValidatedInput('firstName', model, validationInfo, onChange)} />
        </div>
        <div>
            Last name: <ValidatedInput  {...bindValidatedInput('lastName', model, validationInfo, onChange)} />
        </div>
        <div>
            EMail: <ValidatedInput  {...bindValidatedInput('email', model, validationInfo, onChange)} />
        </div>
    </div>;
}