import React from 'react';
import Protected from './Protected';

class Account extends React.Component {
  render() {
    return (
      <div>account class</div>
    );
  }
}

export default () => <Protected view={ Account } />