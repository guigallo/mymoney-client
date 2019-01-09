import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from './templates/Layout'
import Login from './templates/Login';
import Logout from './templates/Logout';
import User from './views/lists/UsersList';

import Accounts from './views/lists/AccountsList';
import AccountCreate from './views/create/AccountCreate';

import Creditcards from './views/lists/CreditcardsList';
import Expenses from './views/lists/ExpensesList';
import Incomes from './views/lists/IncomesList';
import Transfers from './views/lists/TransfersList';
import Categories from './views/lists/CategoriesList';
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

      <PrivateRoute exact path="/account" component={ Accounts } />
      <PrivateRoute path="/account/create" component={ AccountCreate } />

      <PrivateRoute exact path="/user" component={ User } />
      <PrivateRoute exact path="/creditcard" component={ Creditcards } />
      <PrivateRoute exact path="/expense" component={ Expenses } />
      <PrivateRoute exact path="/income" component={ Incomes } />
      <PrivateRoute exact path="/transfer" component={ Transfers } />
      <PrivateRoute exact path="/category" component={ Categories } />
    </>
  </Router>
);

export default Routes;