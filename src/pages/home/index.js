import React from 'react';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import chocolateImg from '../../assets/images/chocolate.svg';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Container>
        <img src={chocolateImg} alt="Imagem de chocolate" />
        <h1>Chocolates</h1>
      </Container>
    </div>
  );
}

export default App;
