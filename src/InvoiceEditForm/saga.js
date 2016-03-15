import { select, take, put, call } from 'redux-saga/effects'

import actions from '../Application/actions'

console.log(actions)

function* handleAddGoodItemModal() {
    while(yield take(actions.GoodItem.ModalAdd.name)){
        yield put({type: actions.GoodItem.ModalDialog.Show.name, goodItem: {}});
        var result = yield take([actions.GoodItem.ModalDialog.Close.name, actions.GoodItem.ModalDialog.Complete.name]);
        if (result.type === actions.GoodItem.ModalDialog.Close.name) {
            continue;
        }
        else {
            var goodItem = yield select(x => x.get('goodItemModal').get('goodItem').toJS())
            yield put({type: actions.GoodItem.ModalDialog.Close.name});
            yield put({type: actions.GoodItem.Add.name, ...goodItem});
        }
    }
}

function* handleEditGoodItemModal() {
    while(true){
        var editAction = yield take(actions.GoodItem.ModalEdit.name)
        var goodItem = yield select(x => x.getIn(['invoice', 'items', editAction.goodItemIndex]).toJS());
        yield put({type: actions.GoodItem.ModalDialog.Show.name, goodItem: goodItem});
        var result = yield take([actions.GoodItem.ModalDialog.Close.name, actions.GoodItem.ModalDialog.Complete.name]);
        if (result.type === actions.GoodItem.ModalDialog.Close.name) {
            continue;
        }
        else {
            var goodItem = yield select(x => x.get('goodItemModal').get('goodItem').toJS())
            yield put({type: actions.GoodItem.ModalDialog.Close.name});
            yield put({type: actions.GoodItem.Change.name, goodItemIndex: editAction.goodItemIndex, ...goodItem });
        }
    }
}

export default function* () {
    yield [
        call(handleAddGoodItemModal),
        call(handleEditGoodItemModal)
    ];
}