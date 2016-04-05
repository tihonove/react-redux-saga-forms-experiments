import { Map } from 'immutable'
import { patternMatch } from 'reelm'
import { reduceTo } from 'utils'

import invoiceEditReducer from '../InvoiceEdit/InvoiceEdit.reducer'
import confirmModalReducer from '../ConfirmModal/ConfirmModal.reducer'

export default patternMatch(Map({
        invoice: invoiceEditReducer(),
        confirmModal: confirmModalReducer()
    }))
    .case('ConfirmModal', ['confirmModal'], confirmModalReducer)
    .case('Invoice', ['invoice'],
        invoiceEditReducer, 
        (sideEffect) => {
            if (sideEffect.type === 'Confirm') {
                return async (effect) => {
                    await effect.put({ type: 'ConfirmModal.Show' })
                    var modalResultAction = await effect.take(a => a.type === 'ConfirmModal.Close' || a.type === 'ConfirmModal.Confirm')
                    return modalResultAction.type === 'ConfirmModal.Confirm';
                }
            }
    })
