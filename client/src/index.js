// From NPM modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';

//From App
import rootReducer from './reducers';
import routes from './router';
import './styles/css/index.css';

//Dummy data to test out state flow
import participants from './data/participants';
import nominees from './data/nominees';
import suggestions from './data/suggestions';
import activeUser from './data/activeUser';
import chat from './data/chat';
import voteStatus from './data/voteStatus';
import userInfo from './data/userInfo';
import userStatus from './data/userStatus';

const defaultState = {
  participants,
  nominees,
  suggestions,
  activeUser,
  chat,
  voteStatus,
  userInfo,
  userStatus
};

// Instantiate Store with data from rootReducer
// const store = createStore(rootReducer, defaultState);
// Need to include routerMiddleware for react-router-redux action creators
const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(rootReducer, defaultState, applyMiddleware(thunkMiddleware, promise, routingMiddleware));

// Include state to passed along with routes
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={ store }>
    <Router history={ history }>
      { routes }
    </Router>
  </Provider>
);

ReactDOM.render(
  router,
  document.querySelector('.root')
);
