import React from 'react';

export default function ContactsForm({firstName, lastName, email, onChange}) {
    return <div>
        <h2>Contacts form</h2>
        <div>First name: <input value={firstName} onChange={e => onChange({firstName: e.target.value})}/></div>
        <div>Last name: <input value={lastName} onChange={e => onChange({lastName: e.target.value})}/></div>
        <div>EMail: <input value={email} onChange={e => onChange({email: e.target.value})}/></div>
    </div>;
}