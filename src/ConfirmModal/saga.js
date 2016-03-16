import { select, take, put, call } from 'redux-saga/effects'

import actions from './actions'

export default function* handleConfirmations() {
    while(true) {
        var confirmAction = yield take(actions.Confirm.name);
        var action = yield take([actions.Yes.name, actions.No.name])
        if (action.type === actions.Yes.name) {
            yield put(confirmAction.action())
        }
    }
}