import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Layout from '../templates/Layout'
import Login from '../templates/Login';
import Logout from '../templates/Logout';
import Protected from '../services/Protected';
import { restRoutes } from './restRoutes';

const PrivateRoute = ({ component: Component, ...rest }) => (
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

const Routes = () => (
  <Router>
    <>
      <Route path="/login" component={ Login } />
      <Route path="/logout" component={ Logout } />

      <PrivateRoute exact path="/" component={ () => (<p>dashboard</p>) } />
      <PrivateRoute path="/dashboard" component={ () => (<p>dashboard</p>) } />

      {restRoutes.map(route =>
        <Switch key={route.id}>
          <PrivateRoute exact path={`/${route.id}`} component={ route.list } />
          <PrivateRoute exact path={`/${route.id}/create`} component={ route.create } />
          <PrivateRoute path={`/${route.id}/:id`} component={ route.edit } />
        </Switch>
      )}
    </>
  </Router>
);

export default Routes;