import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import { reducerEffects } from 'reelm'

import { connect } from 'react-redux'

const Application = connect(state => ({state: state}))(function({state}) {
    return <div>
        <pre>
            {JSON.stringify(state, null, '  ')}
        </pre>
    </div>
})

function nextTick() {
    return new Promise(r => setTimeout(r, 0));
}

function delay(x) {
    return new Promise(r => setTimeout(r, x));
}

function nestedReducer(state = {}, action) {
    if (action.type === 'Add') {
        state = { ...state, nestedArray: [...(state.nestedArray || []), action.value] }
    }
    if (action.type === 'AddAsync') {
        this.runEffect(async (effect) => {
            await delay(1000);
            console.log('produces side effect')
            var sideValue = await effect.side({ type: 'GetEffectValue' });
            await effect.put({ type: 'Add', value: sideValue })
            await effect.side({ type: 'UnhandledEffect' });
        })
    }
    return state
}

function reducer(state = { data: [] }, action) {
    if (action.type === 'Add') {
        state = { ...state, data: [...state.data, action.value] }
        this.runEffect(async (effect) => {
            //await effect.put({type: 'Put1'})
            //var a = await effect.take(x => x.type === 'Awaited');
            //var s = await effect.select();
            //console.log('state from effect', s);
        });
    }
    if (action.type.startsWith('Nested')){
        var currentThis = this;
        var nestedThis = { 
            ...this, 
            put: (a) => { return currentThis.put({ ...a, type: 'Nested.' + a.type }) },
            catchEffect: function(sideEffect) {
                if (sideEffect.type == 'GetEffectValue') {
                    return async (effect) => {
                        console.log('process GetEffectValue effect')
                        await delay(1000);
                        return 42;
                    }
                }
                return currentThis.catchEffect(sideEffect);
            }
        }
        state = { ...state, nestedData: nestedThis::nestedReducer(state.nestedData, { ...action, type: action.type.replace('Nested.', '') }) };
    }
    console.log(action)
    return state;
}

var store = createStore(reducer, undefined, reducerEffects());

ReactDom.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('content'));


store.dispatch({type: 'Add', value: 1})
//store.dispatch({type: 'Nested.Add', value: 2})
store.dispatch({type: 'Nested.AddAsync', value: 3})
//store.dispatch({type: 'Add', value: 1})
setTimeout(() => {
    //store.dispatch({type: 'Awaited', value: 1})
}, 1000)


