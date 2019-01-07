import React from 'react';
import { Redirect } from 'react-router-dom';

const logout = () => {
  localStorage.removeItem('auth-token');
  return (<Redirect to={{ pathname: '/' }} />);
}

export default logout;