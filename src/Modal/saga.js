import { select, take, put, call } from 'redux-saga/effects'

export default function* handleModal(modalActions, params) {
    yield put({ type: modalActions.Show.name, ...params });
    var result = yield take([modalActions.Close.name, modalActions.Complete.name]);
    if (result.type === modalActions.Close.name) {
        return false;
    }
    else {
        var {show, ...rest} = yield select(x => x.get('goodItemModal').toJS())
        yield put({type: modalActions.Close.name});
        return rest;
    }
}
