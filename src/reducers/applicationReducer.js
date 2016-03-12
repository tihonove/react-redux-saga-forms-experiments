import contactsReducer from './contactsReducer'
import { contactsValidator, contactValidatorBehaviour } from '../contactsValidator'

import reduce, {on, namespace} from '../utils/reduce'
import { createValidatorReducer } from '../forms2'

const contactsValidatorReducer = createValidatorReducer(contactsValidator, contactValidatorBehaviour);

const initialState = {}

export default function applicationReducer( state = initialState, action ) {
    state = reduce({
        [namespace("Contacts")]: {
            contacts: contactsReducer,
        },
        [namespace("@@")]: {
            contactsValidators: (s, a, rootState) => contactsValidatorReducer.onChange(rootState.contacts, s, a)
        },
        [on("Contacts/Change")]: {
            contactsValidators: (s, a, rootState) => contactsValidatorReducer.onChange(rootState.contacts, s, a)
        },
        [on("SendContacts")]: {
            contactsValidators: (s, a, rootState) => contactsValidatorReducer.requestValidation(rootState.contacts, s, a)
        },
        /*
        [on("ClearContacts")]: {
            contactsValidators: contactsValidatorReducer.resetValidation
        }*/
    })(state, action);
    console.log(state)
    return state;
}
