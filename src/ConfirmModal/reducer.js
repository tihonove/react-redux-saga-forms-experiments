import { Map } from 'immutable'
import { on, namespace, createReducer } from 'redux-compose'
import actions from './actions'

export default createReducer(Map({show: false}), {
    [on(actions.Confirm)]: (s, a) => s.set('show', true).set('text', a.text),
    [on(actions.Yes)]: s => s.set('show', false),
    [on(actions.No)]: s => s.set('show', false)
})