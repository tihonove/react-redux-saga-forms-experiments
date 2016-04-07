import React from 'react'
import ReactDom from 'react-dom'
import { Iterable } from 'immutable'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import { reducerEffects } from 'reelm'
import createLogger from 'redux-logger';

import Application from './src/components/Application/Application'
import applicationReducer from './src/components/Application/Application.reducer'


/*function nextTick() {
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
            effect.put({type: 'Add', value: action.value});
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
        var nestedThis = { ...this, put: (a) => { return currentThis.put({ ...a, type: 'Nested.' + a.type }) } }
        state = { ...state, nestedData: nestedThis::nestedReducer(state.nestedData, { ...action, type: action.type.replace('Nested.', '') }) };
    }
    console.log(action)
    return state;
}

store.dispatch({type: 'Add', value: 1})
//store.dispatch({type: 'Nested.Add', value: 2})
store.dispatch({type: 'Nested.AddAsync', value: 3})
//store.dispatch({type: 'Add', value: 1})
setTimeout(() => {
    //store.dispatch({type: 'Awaited', value: 1})
}, 1000)

*/
const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};

var store = createStore(applicationReducer, undefined, compose(reducerEffects(), applyMiddleware(createLogger({stateTransformer, collapsed: true}))));

ReactDom.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('content'));

