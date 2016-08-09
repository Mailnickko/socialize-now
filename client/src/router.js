import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/presentational/App';
import Login from './components/presentational/Login_Page';
import Dashboard from './components/presentational/Dashboard_Page'
import Polling from './components/presentational/Polling_Page';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Login } />
    <Route path='/dashboard' component={ Dashboard } />
    <Route path='/polling' component={ Polling } />
  </Route>
);
