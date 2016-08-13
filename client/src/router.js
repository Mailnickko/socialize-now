import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { UserIsAuthenticated } from './index';
import App from './components/presentational/App';
import Login from './components/containers/Login_Page';
import Dashboard from './components/presentational/Dashboard_Page'
import Polling from './components/presentational/Polling_Page';

export default (
  <Route path='/' component={ App }>
    <IndexRedirect to="/login" />
    <Route path='/login' component={ Login } />
    <Route component={ UserIsAuthenticated }>
      <Route path='/dashboard' component={ Dashboard } />
      <Route path='/polling' component={ Polling } />
    </Route>
  </Route>
);
