import { Map } from 'immutable'
import { patternMatch } from 'reelm'

export default patternMatch(Map())
    .caseExact('Change', (invoice, {data}) => invoice.mergeDeep(data))
    .caseExact('Clear', (invoice) => Map())
    .caseExact('ConfirmedClear', function(state) { 
        this.runEffect(async (effect) => {
            var state = await effect.select();
            console.log(state)
            var confirmed = await effect.side({ type: 'Confirm', text: 'Clear form?' })
            if (confirmed)
                await effect.put({ type: 'Clear' });
        })
        return state;
    })