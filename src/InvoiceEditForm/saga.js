import { select, take, put, call } from 'redux-saga/effects'

import actions from '../Application/actions'

function* handleModal(modalActions, params) {
    yield put({ type: modalActions.Show.name, ...params });
    var result = yield take([modalActions.Close.name, modalActions.Complete.name]);
    if (result.type === modalActions.Close.name) {
        return false;
    }
    else {
        var {show, ...rest} = yield select(x => x.get('goodItemModal').toJS())
        yield put({type: actions.GoodItem.ModalDialog.Close.name});
        return rest;
    }
}

function* handleAddGoodItemModal() {
    while(yield take(actions.GoodItem.ModalAdd.name)){
        var modalResult = yield call(handleModal, actions.GoodItem.ModalDialog, {goodItem: {}})
        if (modalResult){
            yield put({type: actions.GoodItem.Add.name, ...modalResult.goodItem});            
        }
    }
}

function* handleEditGoodItemModal() {
    while(true){
        var editAction = yield take(actions.GoodItem.ModalEdit.name)
        var goodItem = yield select(x => x.getIn(['invoice', 'items', editAction.goodItemIndex]).toJS());
        var modalResult = yield call(handleModal, actions.GoodItem.ModalDialog, {goodItem: goodItem})
        if (modalResult){
            yield put({type: actions.GoodItem.Change.name, goodItemIndex: editAction.goodItemIndex, ...modalResult.goodItem });
        }
    }
}

export default function* () {
    yield [
        call(handleAddGoodItemModal),
        call(handleEditGoodItemModal)
    ];
}