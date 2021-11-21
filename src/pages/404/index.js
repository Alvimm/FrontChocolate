import React from 'react';
import { Link } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { ButtonLink } from '../../components/button';
import chocolateImg from '../../assets/images/chocolate.svg';

function NotFound() {
  return (
    <div className="App">
      <GlobalStyle />

      <Container>
        <img src={chocolateImg} alt="Imagem do chocolate" />
        <h1> 404 - Not found!</h1>

        <ButtonLink>
          <Link to="/">Ir para página inicial</Link>
        </ButtonLink>
      </Container>
    </div>
  );
}

export default NotFound;
