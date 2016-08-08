import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/presentational/App';
import Login from './components/presentational/Login';
import Dashboard from './components/presentational/Dashboard'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Login } />
    <Route path='/dashboard' component={ Dashboard } />
  </Route>
);
