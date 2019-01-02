import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Footer from './components/Footer';

import Login from './components/Login';
import User from './components/User';
import Account from './components/Account';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={ Login } />
      <Route path="/login" component={ Login } />
      <Route path="/user" component={ User } />      
      <Route path="/account" component={ Account } />
    </div>
  </Router>
);

export default Routes;