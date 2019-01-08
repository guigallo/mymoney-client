import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from './templates/Layout'
import Login from './templates/Login';
import Logout from './templates/Logout';
import User from './views/UsersView';
import Accounts from './views/AccountsView';
import Creditcards from './views/CreditcardsView';
import Expenses from './views/ExpensesView';
import Incomes from './views/IncomesView';
import Transfers from './views/TransfersView';
import Categories from './views/CategoriesView';
import Protected from './services/Protected';

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
      <PrivateRoute path="/account" component={ Accounts } />
      <PrivateRoute path="/user" component={ User } />
      <PrivateRoute path="/creditcard" component={ Creditcards } />
      <PrivateRoute path="/expense" component={ Expenses } />
      <PrivateRoute path="/income" component={ Incomes } />
      <PrivateRoute path="/transfer" component={ Transfers } />
      <PrivateRoute path="/category" component={ Categories } />
    </>
  </Router>
);

export default Routes;