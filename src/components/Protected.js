import React from 'react';

class Protected extends React.Component {
  state = { authenticated: false };

  constructor(props) {
    super(props);
    this.View = props.view;
  }

  componentWillMount() {
    if(localStorage.getItem('auth-token') !== null) 
      this.setState({ authenticated: true });
  }
  
  render() {
    return (
      this.state.authenticated ? (
        <this.View />
      ) : (
        <p>not auth</p>
      )
    );
  }
}


export default Protected;