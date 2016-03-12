import contactsReducer from './contactsReducer'
import { contactsValidator, contactValidatorBehaviour } from '../contactsValidator'

import reduce, {on, namespace, mergeFrom, chain} from '../utils/reduce'
import { createValidatorReducer } from '../utils/forms2'

const contactsValidatorReducer = createValidatorReducer(contactsValidator, contactValidatorBehaviour);

export default function applicationReducer( state, action ) {
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
        [on("ValidateInn")]: {
            contactsValidators: (s, a, rootState) => contactsValidatorReducer.requestValidationFor('inn', rootState.contacts, s, a)  
        },
        [on("Change")]: chain(
            mergeFrom(x => x.changedValues),
            (state, action) => {
                if (state.alwaysValidateInn){
                    
                }
                return state;
            })
        /*
        [on("ClearContacts")]: {
            contactsValidators: contactsValidatorReducer.resetValidation
        }*/
    }, { alwaysValidateInn: false })(state, action);
    return state;
}
