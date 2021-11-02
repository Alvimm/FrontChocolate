import React from 'react';
// import { Redirect } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import validateToken from '../../helper/auth';

function User() {
  validateToken();
  return (
    <div className="App">
      <GlobalStyle />
      <Container />
    </div>
  );
}

export default User;
