import React from 'react';
import Protected from './Protected';
import Api from '../services/Api';

class Account extends React.Component {
  render() {
    Api.getAccounts();
    return (
      <div>account class</div>
    );
  }
}

export default () => <Protected view={ Account } />