import { Map } from 'immutable'
import { patternMatch } from 'reelm'

import { goodItemListReducer, goodItemListEditReducer } from './GoodItemList/GoodItemListEdit.reducer'

function isEmptyInvoice(invoice) {
    return !invoice.number & !invoice.orderNumber;
}

export const invoiceEditFormReducer = 
    patternMatch(Map({ goodItems: goodItemListReducer() }))
        .caseExact('Change', (invoice, {data}) => invoice.mergeDeep(data))
        .caseExact('Clear', (invoice) => invoiceEditFormReducer())
        .case('GoodItems', ['goodItems'], goodItemListReducer)
        .caseExact('ConfirmedClear', function(state) {
            this.runEffect(async (effect) => {
                var state = await effect.select(x => x.toJS());
                if (isEmptyInvoice(state))
                    return;
                if (await effect.side({ type: 'Confirm', text: 'Clear form?' })) {
                    await effect.put({ type: 'Clear' });
                }
            })
            return state;
        })
        .case('GoodItems', ['goodItems'], goodItemListEditReducer)    

export const invoiceEditFormDataReducer = patternMatch(Map({ duplicateNumber: true }))
    .caseExact('Change', (state, {data}) => state.mergeDeep(data))
