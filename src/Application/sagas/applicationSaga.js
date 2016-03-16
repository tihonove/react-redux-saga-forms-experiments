import { call } from 'redux-saga/effects'
import invoiceFormSaga from '../../InvoiceEditForm/saga'
import confirmModalSaga from '../../ConfirmModal/saga'
import actions from '../actions'

export default function* applicationSaga() {
    yield [
        call(invoiceFormSaga, actions.Invoice),
        call(confirmModalSaga, actions.Invoice)
    ];
}