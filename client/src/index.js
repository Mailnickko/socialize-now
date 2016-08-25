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
import chat from './data/chat';
import voteStatus from './data/voteStatus';
import userInfo from './data/userInfo';
import userStatus from './data/userStatus';
import userEvents from './data/userEvents';
import event from './data/event';

const defaultState = {
  participants,
  chat,
  voteStatus,
  userInfo,
  userStatus,
  userEvents,
  event
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
