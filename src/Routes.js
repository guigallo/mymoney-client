import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from './templates/Layout'
import Login from './templates/Login';
import Logout from './templates/Logout';

import Restful from './views/Restful';
import Protected from './services/Protected';

import Controllers from './controllers/RestfulControllers';

import account from './models/account';
import category from './models/category';
import creditcard from './models/creditcard';
import expense from './models/expense';
import income from './models/income';
import transfer from './models/transfer';
import user from './models/user';

const restfulRoutes = [
  { id: 'account', store: 'accounts', model: account, Controller: Controllers.Accounts },
  { id: 'income', store: 'incomes', model: income, Controller: Controllers.Incomes },
  { id: 'expense', store: 'expenses', model: expense, Controller: Controllers.Expenses },
  { id: 'transfer', store: 'transfers', model: transfer, Controller: Controllers.Transfers },
  { id: 'creditcard', store: 'creditcards', model: creditcard, Controller: Controllers.Creditcards },
  { id: 'category', store: 'categories', model: category, Controller: Controllers.Categories },
  { id: 'user', store: 'users', model: user, Controller: Controllers.Users },
];

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

      {Restful(restfulRoutes).map(route =>
        <PrivateRoute key={`list-${route.id}`} exact path={`/${route.id}`} component={ route.list } />
      )}
      {Restful(restfulRoutes).map(route =>
        <PrivateRoute key={`create-${route.id}`} exact path={`/${route.id}/create`} component={ route.create } />
      )}

    </>
  </Router>
);

export default Routes;