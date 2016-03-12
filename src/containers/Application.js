import React from 'react';
import ContactsForm from '../components/ContactsForm'
import {connect} from 'react-redux'
import { contactsValidator, contactValidatorBehaviour } from '../contactsValidator'
import { createValidationInfoSelector } from '../forms2'

const selectContactsValidationInfo = createValidationInfoSelector(contactsValidator, contactValidatorBehaviour);

@connect(
    state => ({
        contacts: {
            contacts: state.contacts,
            validationInfo: selectContactsValidationInfo(state.contacts, state.contactsValidators)
        }
    }),
    dispatch => ({
        onContactsChange: (v) => dispatch({type: 'Contacts/Change', changedValues: v}),
        onSendContacts : () => dispatch({type: 'SendContacts'})
    })
)
export default class Application extends React.Component {
    render() {
        var {contacts, onContactsChange, onSendContacts} = this.props;

        return (<div>
            <h1>Mega application</h1>
            <ContactsForm {...contacts} onChange={onContactsChange} />
            <button onClick={onSendContacts}>Send</button>
        </div>);
    }
}