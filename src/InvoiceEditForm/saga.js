import { select, take, put, call } from 'redux-saga/effects'

import handleModal from '../Modal/saga'

function* handleAddGoodItemModal(namespace) {
    while(yield take(namespace.GoodItem.ModalAdd.name)){
        var modalResult = yield call(handleModal, namespace.GoodItem.ModalDialog, {goodItem: {}})
        if (modalResult){
            yield put({type: namespace.GoodItem.Add.name, ...modalResult.goodItem});            
        }
    }
}

function* handleEditGoodItemModal(namespace) {
    while(true){
        var editAction = yield take(namespace.GoodItem.ModalEdit.name)
        var goodItem = yield select(x => x.getIn(['invoice', 'items', editAction.goodItemIndex]).toJS());
        var modalResult = yield call(handleModal, namespace.GoodItem.ModalDialog, {goodItem: goodItem})
        if (modalResult){
            yield put({type: namespace.GoodItem.Change.name, goodItemIndex: editAction.goodItemIndex, ...modalResult.goodItem });
        }
    }
}

export default function* (namespace) {
    yield [
        call(handleAddGoodItemModal, namespace),
        call(handleEditGoodItemModal, namespace)
    ];
}