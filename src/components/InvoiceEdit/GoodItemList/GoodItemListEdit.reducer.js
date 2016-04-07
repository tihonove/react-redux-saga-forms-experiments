import { Map, List } from 'immutable'
import { patternMatch } from 'reelm'

const goodItemReducer = patternMatch(Map())
    .caseExact('Change', (goodItem, {data}) => goodItem.mergeDeep(data))

export const goodItemListReducer = patternMatch(List())
    .caseExact('Add', (list) => list.push(goodItemReducer()))
    .case('[Index]', ({Index}) => [Index], goodItemReducer)
    .case('[Index]', [], function(list, { type, match: { Index } }) {
        if (type === 'Delete')
            return list.delete(Index);
        return list;
    })

export const goodItemListEditReducer = patternMatch(List())
    .case('[Index]', [], function(list, { type, match: { Index } }) {
        if (type === 'DeleteConfirmed') {
            this.runEffect(async (effect) => {
                if (await effect.side({ type: 'Confirm', text: `Delete item ${Index}?` }))
                    await effect.put({ type: 'Delete' });
            })
        }
        return list;
    })
