import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import User from './components/User';
import Accounts from './views/AccountsView';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={ Login } />
      <Route path="/login" component={ Login } />
      <Route path="/user" component={ User } />      
      <Route path="/account" component={ Accounts } />
    </div>
  </Router>
);

export default Routes;