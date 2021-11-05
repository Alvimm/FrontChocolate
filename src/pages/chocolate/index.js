import React from 'react';
import { useHistory } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { localStorageGetItem } from '../../helper/localStorage';

function Chocolate() {
  const history = useHistory();

  const token = localStorageGetItem();

  if (!token) {
    history.push('/login');
  }

  return (
    <div className="App">
      <GlobalStyle />
      <Container />
    </div>
  );
}

export default Chocolate;
