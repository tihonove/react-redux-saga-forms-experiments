import { Map } from 'immutable'
import { patternMatch } from 'reelm'

import goodItemListReducer from './GoodItemList/GoodItemListEdit.reducer'

function isEmptyInvoice(invoice) {
    return !invoice.number & !invoice.orderNumber;
}

export default patternMatch(Map({ goodItems: goodItemListReducer() }))
    .caseExact('Change', (invoice, {data}) => invoice.mergeDeep(data))
    .caseExact('Clear', (invoice) => Map())
    .caseExact('ConfirmedClear', function(state) { 
        this.runEffect(async (effect) => {
            var state = await effect.select(x => x.toJS());
            if (isEmptyInvoice(state))
                return;
            var confirmed = await effect.side({ type: 'Confirm', text: 'Clear form?' })
            if (confirmed)
                await effect.put({ type: 'Clear' });
        })
        return state;
    })
    .case('GoodItems', ['goodItems'], goodItemListReducer)