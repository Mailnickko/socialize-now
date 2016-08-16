import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import App from './components/presentational/App';
import Login from './components/containers/Login_Page';
import Dashboard from './components/presentational/Dashboard_Page'
import Polling from './components/presentational/Polling_Page';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.auth,  //get auth state
  predicate: (auth) => auth.isAuthenticated,  //checks result of authSelector, if false, redirect
  redirectAction: routerActions.replace,   //redux action creator to handle redirect
  wrapperDisplayName: 'userIsAuthenticated',   //name for auth check
  failureRedirectPath: '/login',
  allowRedirectBack: false    //don't send redirect query param to failureRedirectPath
});

export default (
  <Route path='/' component={ App }>
    <IndexRedirect to="/login" />
    <Route path='/login' component={ Login } />
    <Route path='/dashboard' component={ UserIsAuthenticated(Dashboard) } />
    <Route path='/polling' component={ UserIsAuthenticated(Polling) } />
    <Route path="/polling/:pollId" component={ UserIsAuthenticated(Polling) } />
  </Route>
);
