import { call } from 'redux-saga/effects'

import invoiceFormSaga from '../components/InvoiceEditForm/saga'

export default function* applicationSaga() {
    yield [
        call(invoiceFormSaga)
    ];
}