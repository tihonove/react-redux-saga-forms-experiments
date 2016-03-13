import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import applicationReducer from './reducers/applicationReducer'
import applicationSaga from './sagas/applicationSaga'
import Application from './containers/Application'

var store = createStore(
    applicationReducer,
    applyMiddleware(createSagaMiddleware(applicationSaga)));

ReactDom.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('content'));
