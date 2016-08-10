// From NPM modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { createStore } from 'redux';

//From App
import rootReducer from './reducers';
import routes from './router';
import './styles/css/index.css';

//Dummy data to test out state flow
import participants from './data/participants';
import nominees from './data/nominees';
import suggestions from './data/suggestions';
import singleUser from './data/singleUser';
import chat from './data/chat';

const defaultState = {
  participants,
  nominees,
  suggestions,
  singleUser,
  chat
};

// Instantiate Store with data from rootReducer
const store = createStore(rootReducer, defaultState);
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
