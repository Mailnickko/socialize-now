import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/presentational/App';
import Login from './component/presentational/Login';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Login } />
  </Route>
);
