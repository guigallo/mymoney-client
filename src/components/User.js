import React from 'react';

class User extends React.Component {
  state = { authenticated: false };

  componentWillMount() {
    if(localStorage.getItem('auth-token') !== null) 
      this.setState({ authenticated: true });
  }

  render() {
    return (
      this.state.authenticated ? (
        <p>auth</p>
      ) : (
        <p>not auth</p>
      )
    );
  }
}

export default User;