import { take, select } from 'redux-saga/effects'
import { isValid } from '../forms/validators'

import { contactsValidator } from '../contactsValidator'

export default function* applicationSaga() {
    while (true) {
        yield take('SendContacts');
        var contacts = yield select(x => x.contacts);
        if ( isValid(contactsValidator(contacts)) ) {
            alert(JSON.stringify(contacts));
        }
    }
}
