import React from 'react'
import ReactDom from 'react-dom'
import { Iterable } from 'immutable'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import { reducerEffects } from 'reelm'
import createLogger from 'redux-logger'

import './src/styles/Application.less'

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};


import SingleInvoiceEditApplication from './src/components/SingleInvoiceEditApplication/SingleInvoiceEditApplication.view'
import singleInvoiceEditApplicationReducer from './src/components/SingleInvoiceEditApplication/SingleInvoiceEditApplication.reducer'
var singleInvoiceEditApplicationStore = createStore(singleInvoiceEditApplicationReducer, undefined, compose(reducerEffects(), applyMiddleware(createLogger({stateTransformer, collapsed: true}))));


import ModalInvoiceEditApplication from './src/components/ModalInvoiceEditApplication/ModalInvoiceEditApplication.view'
import modalInvoiceEditApplicationReducer from './src/components/ModalInvoiceEditApplication/ModalInvoiceEditApplication.reducer'
var modalInvoiceEditApplicationStore = createStore(modalInvoiceEditApplicationReducer, undefined, compose(reducerEffects(), applyMiddleware(createLogger({stateTransformer, collapsed: true}))));

import InPlaceInvoiceEditApplication from './src/components/InPlaceInvoiceEditApplication/InPlaceInvoiceEditApplication.view'
import inPlaceInvoiceEditApplicationReducer from './src/components/InPlaceInvoiceEditApplication/InPlaceInvoiceEditApplication.reducer'
var inPlaceInvoiceEditApplicationStore = createStore(inPlaceInvoiceEditApplicationReducer, undefined, compose(reducerEffects(), applyMiddleware(createLogger({stateTransformer, collapsed: true}))));


ReactDom.render(
    <div>
        <Provider store={singleInvoiceEditApplicationStore}>
            <SingleInvoiceEditApplication />
        </Provider>
        <hr />
        <Provider store={modalInvoiceEditApplicationStore}>
            <ModalInvoiceEditApplication />
        </Provider>
        <hr />
        <Provider store={inPlaceInvoiceEditApplicationStore}>
            <InPlaceInvoiceEditApplication />
        </Provider>
    </div>,
    document.getElementById('content'));

