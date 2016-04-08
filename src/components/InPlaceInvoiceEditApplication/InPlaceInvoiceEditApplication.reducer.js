import { Map, List, fromJS } from 'immutable'
import { patternMatch } from 'reelm'
import { reduceTo } from 'utils'

import { invoiceEditFormDataReducer, invoiceEditFormReducer } from '../InvoiceEdit/InvoiceEdit.reducer'
import confirmModalReducer from '../ConfirmModal/ConfirmModal.reducer'

const invoiceListReducer = patternMatch(List())
    .caseExact('Add', (list) => list.push(invoiceEditFormReducer()))
    .case('[Index]', ({Index}) => [Index], invoiceEditFormReducer)
    .case('[Index]', ({Index}) => [Index], (item, {type, data}) => type === 'Replace' ? fromJS(data) : item)

const confirmSideEffectHandler = (sideEffect) => {
    if (sideEffect.type === 'Confirm') {
        return async (effect) => {
            await effect.put({ type: 'ConfirmModal.Show', text: sideEffect.text })
            var modalResultAction = await effect.take(a => a.type === 'ConfirmModal.Discard' || a.type === 'ConfirmModal.Confirm')
            var result = modalResultAction.type === 'ConfirmModal.Confirm';
            return result;
        }
    }
}

export default patternMatch(Map({
        invoices: invoiceListReducer(),
        confirmModal: confirmModalReducer(),
        invoiceEditForm: invoiceEditFormDataReducer()
    }))
    .case('ConfirmModal', ['confirmModal'], confirmModalReducer)
    .case('Invoices', ['invoices'], invoiceListReducer, confirmSideEffectHandler)
    .case2('Invoices.[Index]', '', [], function(state, {type, match: { Index }}) {
        if (type === 'InplaceEdit') {
            state = state.set('currentInvoiceIndex', Index)
        }
        return state;
    })
    .case('InvoiceEditForm', ['invoiceEditForm'], invoiceEditFormDataReducer)
