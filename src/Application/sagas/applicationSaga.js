import { call } from 'redux-saga/effects'
import invoiceFormSaga from '../../InvoiceEditForm/saga'

export default function* applicationSaga() {
    yield [
        call(invoiceFormSaga)
    ];
}