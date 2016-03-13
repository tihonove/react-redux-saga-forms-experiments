import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import applicationReducer from './Application/reducers/applicationReducer'
import applicationSaga from './Application/sagas/applicationSaga'
import Application from './Application/containers/Application'

var store = createStore(
    applicationReducer,
    applyMiddleware(createSagaMiddleware(applicationSaga)));

ReactDom.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('content'));
