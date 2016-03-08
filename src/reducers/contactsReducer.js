const initialState = {
    firstName: '',
    lastName: '',
    email: ''
};

export default function contactsReducer(state = initialState, action) {
    if (action.type === 'Change') {
        return {
            ...state,
            ...action.changedValues
        };
    }
    return state;
}
