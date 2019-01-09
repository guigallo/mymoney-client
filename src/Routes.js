import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from './templates/Layout'
import Login from './templates/Login';
import Logout from './templates/Logout';
import User from './views/lists/UsersList';

import Accounts from './views/lists/AccountsList';
//import AccountCreate from './views/create/AccountCreate';

import Incomes from './views/lists/IncomesList';
//import { AccountCreate, IncomeCreate } from './views/Create';
import Create from './views/Create';

import Creditcards from './views/lists/CreditcardsList';
import Expenses from './views/lists/ExpensesList';
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

const restFull = [
  'account',
  'income',
  'expense',
  'transfer',
  'creditcard',
  'category',
  'user'
]

const Routes = () => (
  <Router>
    <>
      <Route path="/login" component={ Login } />
      <Route path="/logout" component={ Logout } />

      <PrivateRoute exact path="/" component={ () => (<p>dashboard</p>) } />
      <PrivateRoute path="/dashboard" component={ () => (<p>dashboard</p>) } />

      <PrivateRoute exact path="/account" component={ Accounts } />
      <PrivateRoute exact path="/income" component={ Incomes } />
      <PrivateRoute exact path="/expense" component={ Expenses } />
      <PrivateRoute exact path="/transfer" component={ Transfers } />
      <PrivateRoute exact path="/creditcard" component={ Creditcards } />
      <PrivateRoute exact path="/category" component={ Categories } />
      <PrivateRoute exact path="/user" component={ User } />

      {restFull.map(route =>
        <PrivateRoute key={`create-${route}`} exact path={`/${route}/create`} component={ Create[route] } />
      )}

    </>
  </Router>
);

export default Routes;