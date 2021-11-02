import React from 'react';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
// import { Redirect } from 'react-router-dom';
import validateToken from '../../helper/auth';

function Chocolate() {
  validateToken();
  return (
    <div className="App">
      <GlobalStyle />
      <Container />
    </div>
  );
}

export default Chocolate;
