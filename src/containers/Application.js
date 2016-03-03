import React from 'react';
import ContactsForm from '../components/ContactsForm'
import {connect} from 'react-redux'
import {selectContacts} from '../selectors'

@connect(
    state => ({
        contacts: selectContacts(state.contacts)
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