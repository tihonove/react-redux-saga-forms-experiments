import React from 'react';
import ContactsForm from '../components/ContactsForm'
import {connect} from 'react-redux'
import { contactsValidator, contactValidatorBehaviour } from '../contactsValidator'
import { createValidationInfoSelector } from '../utils/forms2'

const baseSelectContactsValidationInfo = createValidationInfoSelector(contactsValidator, contactValidatorBehaviour);

function selectContactsValidationInfo(state, contacts, contactsValidators) {
    var result = baseSelectContactsValidationInfo(contacts, contactsValidators);
    var validationResult = contactsValidator(contacts);
    if (state.alwaysValidateInn) {
        if (!validationResult.inn.valid) {
            result = {
                ...result,
                inn: { text: validationResult.inn.message }
            }
            console.log(result)
        }
    }
    return result;
}

@connect(
    state => ({
        alwaysValidateInn: state.alwaysValidateInn,
        contacts: {
            contacts: state.contacts,
            validationInfo: selectContactsValidationInfo(state, state.contacts, state.contactsValidators)
        }
    }),
    dispatch => ({
        onContactsChange: (v) => dispatch({type: 'Contacts/Change', changedValues: v}),
        onSendContacts : () => dispatch({type: 'SendContacts'}),
        onValidateInnClick: () => dispatch({type: 'ValidateInn'}),
        onChange: (v) => dispatch({type: 'Change', changedValues: v}),
    })
)
export default class Application extends React.Component {
    render() {
        var {alwaysValidateInn, contacts, onChange, onValidateInnClick, onContactsChange, onSendContacts} = this.props;

        return (<div>
            <h1>Mega application</h1>
            <ContactsForm {...contacts} onChange={onContactsChange} />

            <button onClick={onValidateInnClick}>Validate inn</button>
            <br />

            <input type="checkbox" checked={alwaysValidateInn} onChange={x => onChange({alwaysValidateInn: x.target.checked})} />Always validate inn
            <br />

            <button onClick={onSendContacts}>Send</button>
        </div>);
    }
}