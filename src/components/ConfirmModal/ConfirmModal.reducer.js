import { Map } from 'immutable'
import { patternMatch } from 'reelm'
import { reduceTo } from 'utils'

export default patternMatch(Map())
    .caseExact('Confirm', s => Map({ show: false }))
    .caseExact('Discard', s => Map({ show: false }))
    .caseExact('Show', (s, {text}) => Map({ show: true, text: text }))