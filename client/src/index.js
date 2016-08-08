// From NPM modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { createStore } from 'redux';

//From App
import App from './components/presentational/App';
import rootReducer from './reducers';
import routes from './router';
import './styles/css/index.css';

// Instantiate Store with data from rootReducer
const store = createStore(rootReducer);
// Include state to passed along with routes
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={ store }>
    <Router history={ history}>
      {routes}
    </Router>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.querySelector('.root')
);
