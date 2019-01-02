import React from 'react';
import Protected from './Protected';
import Api from '../services/Api';

import Header from './Header';

class Account extends React.Component {
  state = {
    accounts: [],
    errors: ''
  }

  componentWillMount = () =>
    Api.getAccounts()
      .then(accs => this.setState({ accounts: accs }))
      .catch(error => this.setState({ errors: error }));
  

  render() {
    return (
      <div>
        <Header />
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            {this.state.accounts.map(acc => 
              <tr key={acc._id}>
                <td>{acc.name}</td>
                <td>{acc.value}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default () => <Protected view={ Account } />