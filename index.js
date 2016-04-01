import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Application from './src/components/Application'


function nextTick() {
    return new Promise(r => setTimeout(r, 0));
}

function delay(x) {
    return new Promise(r => setTimeout(r, x));
}

function reducerEffects() {
    return (next) => (reducer, initialState, enhancer) => {
        var effectRunner = {};
        
        effectRunner.lastState = undefined;
        effectRunner.takes = [];
        effectRunner.handleEffects = function(state, action) {
            var indicesToDelete = [];
            for(var i = 0; i < this.takes.length; i++) {
                if (this.takes[i][0](action)){
                    this.takes[i][1](action);
                    indicesToDelete.push(i);
                }
            }
            indicesToDelete.sort();
            for(var i = indicesToDelete.length - 1; i >= 0; i--) {
                this.takes.splice(indicesToDelete[i], 1);
            }
        }

        var store = next((state, action, ...rest) => { 
            var state = effectRunner::reducer(state, action, ...rest);
            effectRunner.lastState = state;
            effectRunner.handleEffects(state, action);
            return state;
        }, initialState, enhancer);

        effectRunner.runEffect = function (effectSaga) {
            return effectSaga(this);
        }
        effectRunner.put = async (action) => { 
            await nextTick();
            return store.dispatch(action);
        }
        effectRunner.select = async function (selector) { 
            await nextTick();
            return selector ? selector(this.lastState) : this.lastState;
        }
        effectRunner.take = (action) => {
            return new Promise(resolve => {
                effectRunner.takes.push([action, resolve]);
            });
        }

        return store;
    }
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
            /*await effect.put({type: 'Put1'})
            var a = await effect.take(x => x.type === 'Awaited');
            var s = await effect.select();*/
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
