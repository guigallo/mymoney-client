import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux'

import Routes from './Routes';
import accounts from './reducers/accountsReducers';
import users from './reducers/usersReducers';

const reducers = combineReducers({ accounts, users });
const store = new createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={ store }>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
