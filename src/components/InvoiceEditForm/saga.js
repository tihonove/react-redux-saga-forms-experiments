import { select, take, put, call } from 'redux-saga/effects'

function* handleAddGoodItemModal() {
    while(yield take('GoodItem/ModalAdd')){
        yield put({type: 'GoodItem/ModalDialog/Show', goodItem: {}});
        var result = yield take(['GoodItem/ModalDialog/Close', 'GoodItem/ModalDialog/Complete']);
        console.log(result)
        if (result.type === 'GoodItem/ModalDialog/Close') {
            continue;
        }
        else {
            var goodItem = yield select(x => x.get('goodItemModal').get('goodItem').toJS())
            yield put({type: 'GoodItem/ModalDialog/Close'});
            yield put({type: 'GoodItem/Add', ...goodItem});
        }
    }
}

function* handleEditGoodItemModal() {
    while(true){
        var editAction = yield take('GoodItem/ModalEdit')
        var goodItem = yield select(x => x.getIn(['invoice', 'items', editAction.goodItemIndex]).toJS());
        console.log(goodItem);
        yield put({type: 'GoodItem/ModalDialog/Show', goodItem: goodItem});
        var result = yield take(['GoodItem/ModalDialog/Close', 'GoodItem/ModalDialog/Complete']);
        console.log(result)
        if (result.type === 'GoodItem/ModalDialog/Close') {
            continue;
        }
        else {
            var goodItem = yield select(x => x.get('goodItemModal').get('goodItem').toJS())
            yield put({type: 'GoodItem/ModalDialog/Close'});
            yield put({type: 'GoodItem/Change', goodItemIndex: editAction.goodItemIndex, ...goodItem });
        }
    }
}

export default function* () {
    yield [
        call(handleAddGoodItemModal),
        call(handleEditGoodItemModal)
    ];
}