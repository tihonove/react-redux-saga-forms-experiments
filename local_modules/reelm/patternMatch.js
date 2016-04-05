import unwrap from './unwrap';
import wrap from './wrap';

/**
 * Returns reducer enhanced with `case` function which registers updater
 * for specific pattern. It's unwrapping the action automatically.
 *
 * @param {any} Initial model
 *
 * @return {Function} Enhanced reducer
 */
function overrideContext(currentContext, effectHandler, pattern, match, path) {
  var nestedContext = { 
    ...currentContext, 
    put: (a) => { return currentContext.put(wrap(a, pattern, match)) },
    select: async (selector = x => x) => path ? (currentContext.select(x => selector(x.getIn(path)))) : currentContext.select(selector),
    catchEffect: (function(sideEffect) {
      var result;
      if (effectHandler){
        var handler = effectHandler(sideEffect);
        if (handler)
          return [currentContext, handler]
      }
      return currentContext.catchEffect(sideEffect);
    })
  }
  return nestedContext;
}


function reduceTo(path, reducer) {
    return function(state, action) {
        var reducerContext = this;
        return state.updateIn(path, subState => reducerContext::reducer(subState, action))
    }
}

export default initialModel => {
  const updaters = [];

  const reducer = function(model = initialModel, action) {
    var reducerContext = this;
    if (action) {
      return updaters.reduce((partialModel, { updater, compiledUnwrap, pattern, effectHandler, path }) => {
        if (compiledUnwrap) {
          const unwrappedAction = compiledUnwrap(action);

          if (unwrappedAction && (unwrappedAction.type !== '' || action.type === pattern)) {
            if (path)
              updater = reduceTo(path, updater)                
            return overrideContext(reducerContext, effectHandler, pattern, unwrappedAction.match[pattern], path)::updater(partialModel, { ...unwrappedAction, match: unwrappedAction.match[pattern] });
          } else {
            return partialModel;
          }
        } else {
          if (pattern === action.type) {
            return reducerContext::updater(partialModel, action);
          } else {
            return partialModel;
          }
        }
      }, model);
    } else {
      return model;
    }
  };

  reducer.case = (pattern, path, updater, effectHandler) => {
    updaters.push({
      updater,
      compiledUnwrap: unwrap(pattern),
      pattern,
      path,
      effectHandler
    });

    return reducer;
  };

  reducer.caseExact = (pattern, updater)=> {
    updaters.push({
      updater,
      pattern
    });

    return reducer;
  };

  return reducer;
};
