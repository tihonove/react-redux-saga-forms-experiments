import contactsReducer from './contactsReducer'

const initialState = {};

export default function applicationReducer(state = initialState, action) {
    if (action.type.startsWith('Contacts/') || action.type.startsWith('@@')){
        state = {
            ...state,
            contacts: contactsReducer(state.contacts, {...action, type: action.type.replace('Contacts/', '')})
        }
    }
    return state;
}