import { createValidateReducer, requestValidationReducer } from '../forms/reducers'
import { isValid } from '../forms/validators'

import contactsReducer from './contactsReducer'
import contactValidator from '../contactsValidator'

const contactValidatorReducer = createValidateReducer(contactValidator);

const initialState = {};

export default function applicationReducer( state = initialState, action ) {
    if ( action.type.startsWith('Contacts/') || action.type.startsWith('@@') ) {
        state = {
            ...state,
            contacts: contactsReducer(state.contacts, {
                ...action,
                type: action.type.replace('Contacts/', '')
            })
        };
        state = {
            ...state,
            contactsValidationInfo: contactValidatorReducer(state.contactsValidationInfo, state.contacts)
        }
    }
    if ( action.type === 'SendContacts' ) {
        if ( !isValid(contactValidator(state.contacts)) ) {
            state = {
                ...state,
                contactsValidationInfo: requestValidationReducer(state.contactsValidationInfo)
            };
            state = {
                ...state,
                contactsValidationInfo: contactValidatorReducer(state.contactsValidationInfo, state.contacts)
            }
        }
    }
    return state;
}
