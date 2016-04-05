
export function reduceTo(definition) {
    return function(state, action) {
        var reducerContext = this;
        for(var key of Object.getOwnPropertyNames(definition)) {
            state = state.updateIn([key], subState => reducerContext::definition[key](subState, action))
        }
        return state;
    }
}