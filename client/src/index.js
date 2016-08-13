// From NPM modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import { UserAuthWrapper } from 'redux-auth-wrapper';

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

//options for authentication
export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.user,  //get user state
  predicate: (auth) => auth.isAuthenticated,  //checks result of authSelector, if false, redirect
  redirectAction: routerActions.replace,   //redux action creator to handle redirect
  wrapperDisplayName: 'UserIsAuthenticated',   //name for auth check
  allowRedirectBack: false    //don't send redirect query param to failureRedirectPath
});

const defaultState = {
  participants,
  nominees,
  suggestions,
  activeUser,
  chat,
  voteStatus
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
