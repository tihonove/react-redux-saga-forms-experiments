import { select, take, put, call } from 'redux-saga/effects'

import actions from '../Application/actions'

function* handleAddGoodItemModal() {
    while(yield take(actions.GoodItem.ModalAdd)){
        yield put({type: actions.GoodItem.ModalDialog.Show, goodItem: {}});
        var result = yield take([actions.GoodItem.ModalDialog.Close, actions.GoodItem.ModalDialog.Complete]);
        if (result.type === actions.GoodItem.ModalDialog.Close) {
            continue;
        }
        else {
            var goodItem = yield select(x => x.get('goodItemModal').get('goodItem').toJS())
            yield put({type: actions.GoodItem.ModalDialog.Close});
            yield put({type: actions.GoodItem.Add, ...goodItem});
        }
    }
}

function* handleEditGoodItemModal() {
    while(true){
        var editAction = yield take(actions.GoodItem.ModalEdit)
        var goodItem = yield select(x => x.getIn(['invoice', 'items', editAction.goodItemIndex]).toJS());
        yield put({type: actions.GoodItem.ModalDialog.Show, goodItem: goodItem});
        var result = yield take([actions.GoodItem.ModalDialog.Close, actions.GoodItem.ModalDialog.Complete]);
        if (result.type === actions.GoodItem.ModalDialog.Close) {
            continue;
        }
        else {
            var goodItem = yield select(x => x.get('goodItemModal').get('goodItem').toJS())
            yield put({type: actions.GoodItem.ModalDialog.Close});
            yield put({type: actions.GoodItem.Change, goodItemIndex: editAction.goodItemIndex, ...goodItem });
        }
    }
}

export default function* () {
    yield [
        call(handleAddGoodItemModal),
        call(handleEditGoodItemModal)
    ];
}