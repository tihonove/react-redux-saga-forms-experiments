function nextTick() {
    return new Promise(r => setTimeout(r, 0));
}

function delay(x) {
    return new Promise(r => setTimeout(r, x));
}

export forwardTo from './forwardTo'
export patternMatch from './patternMatch'

function handleTakeEffects(takes, action) {
    var indicesToDelete = [];
    for(var i = 0; i < takes.length; i++) {
        if (takes[i][0](action)){
            takes[i][1](action);
            indicesToDelete.push(i);
        }
    }
    indicesToDelete.sort();
    for(var i = indicesToDelete.length - 1; i >= 0; i--) {
        takes.splice(indicesToDelete[i], 1);
    }   
    return takes; 
}

export function reducerEffects() {
    return (next) => (reducer, initialState, enhancer) => {
        var effectRunner = {};
        
        effectRunner.lastState = undefined;
        effectRunner.takes = [];
        effectRunner.effects = [];

        effectRunner.runSideEffectHandler = async function(handler, resolve, reject) {
            try {
                resolve(await handler(this));
            }
            catch(e) {
                reject(e);
            }
        }

        effectRunner.handleEffects = function(state, action) {
            this.takes = handleTakeEffects(this.takes, action);
        }

        effectRunner.catchEffect = function(sideEffect) {
            return [this, async (effect) => {
                throw "Unhandled side effect: " + JSON.stringify(sideEffect);
            }]
        }

        var store = next((state, action, ...rest) => { 
            var state = effectRunner::reducer(state, action, ...rest);
            effectRunner.lastState = state;
            effectRunner.handleEffects(state, action);
            return state;
        }, initialState, enhancer);

        effectRunner.side = function(sideEffect) {
            var sideEffectProcessor = this.catchEffect(sideEffect)
            return new Promise((resolve, reject) => {
                sideEffectProcessor[0].runSideEffectHandler(sideEffectProcessor[1], resolve, reject)
            });
        }

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
