import {take, select} from 'redux-saga/effects'

export default function* applicationSaga(){
    while(true){
        yield take('SendContacts');
        var contacts = yield select(x => x.contacts);
        alert(JSON.stringify(contacts));
    }
}