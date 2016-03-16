import { call } from 'redux-saga/effects'
import invoiceFormSaga from '../../InvoiceEditForm/saga'
import confirmModalSaga from '../../ConfirmModal/saga'

export default function* applicationSaga() {
    yield [
        call(invoiceFormSaga),
        call(confirmModalSaga)
    ];
}