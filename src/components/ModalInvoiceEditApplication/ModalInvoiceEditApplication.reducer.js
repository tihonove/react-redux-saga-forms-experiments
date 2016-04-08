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
            var modalResultAction = await effect.take(a => a.type === 'ConfirmModal.Close' || a.type === 'ConfirmModal.Confirm')
            return modalResultAction.type === 'ConfirmModal.Confirm';
        }
    }
}

export default patternMatch(Map({
        invoices: invoiceListReducer(),
        confirmModal: confirmModalReducer(),
        invoiceModalEdit: Map({ show: false })
    }))
    .case('ConfirmModal', ['confirmModal'], confirmModalReducer)
    .case('Invoices', ['invoices'], invoiceListReducer, confirmSideEffectHandler)
    .case2('Invoices.[Index]', '', [], function(state, action) {
        if (action.type === 'ModalEdit') {
            this.runEffect(async effect => {
                var invoiceToEdit = await effect.select(x => x.getIn(['invoices', action.match.Index]));                
                
                await effect.put({ type: 'InvoiceModalEdit.Show', invoice: invoiceToEdit });

                var a = await effect.take(x => x.type === 'InvoiceModalEdit.Discard' || x.type === 'InvoiceModalEdit.Save');
                if (a.type === 'InvoiceModalEdit.Save') {
                    var editableInvoice = await effect.select(x => x.get('invoiceModalEdit').get('editableInvoice').toJS());
                    await effect.put({ type: `Invoices.${action.match.Index}.Replace`, data: editableInvoice })
                }
                await effect.put({ type: 'InvoiceModalEdit.Hide' })
            })
        }
        return state;
    })
    .case('EditableInvoice', ['invoiceModalEdit', 'editableInvoice'], invoiceEditFormReducer, confirmSideEffectHandler)
    .case('InvoiceEditForm', ['invoiceModalEdit', 'invoiceEditForm'], invoiceEditFormDataReducer)
    .caseExact('InvoiceModalEdit.Show', reduceTo({ 
        invoiceModalEdit: (state, {invoice}) => Map({ show: true, editableInvoice: invoice, invoiceEditForm: invoiceEditFormDataReducer() }) 
    }))
    .caseExact('InvoiceModalEdit.Hide', reduceTo({ 
        invoiceModalEdit: (state, {invoice}) => Map({ show: false }) 
    }))
