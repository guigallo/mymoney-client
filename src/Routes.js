import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from './templates/Layout'
import Login from './templates/Login';
import User from './views/UsersView';
import Accounts from './views/AccountsView';
import Protected from './services/Protected';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props =>
      Protected.isAuthenticated() ? (
        <>
          <Layout />
          <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    } />
  );
}

const Routes = () => (
  <Router>
    <>
      <Route path="/login" component={ Login } />

      <PrivateRoute exact path="/" component={ () => (<p>dashboard</p>)} />
      <PrivateRoute path="/account" component={ Accounts } />
      <PrivateRoute path="/user" component={ User } />
    </>
  </Router>
);

export default Routes;