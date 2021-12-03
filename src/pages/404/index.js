import React from 'react';
import { Link } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { ButtonLink } from '../../components/button';
import chocolateImg from '../../assets/images/chocolate.svg';
import { Footer } from '../../components/footer';

function NotFound() {
  return (
    <div className="App">
      <GlobalStyle />

      <Container>
        <img src={chocolateImg} alt="Chocolate" />
        <h1> 404 - Not found!</h1>
        <img
          className="not-found"
          src="https://i.stack.imgur.com/6M513.png"
          alt="Not Found"
        />

        <ButtonLink>
          <Link to="/">Go to home page</Link>
        </ButtonLink>
      </Container>
      <Footer>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="footer-col">
                <h4>Know me</h4>
                <ul>
                  <li>
                    <a href="https://github.com/Alvimm">about me</a>
                  </li>
                  <li>
                    <a href="https://github.com/Alvimm?tab=repositories">
                      my portfolio
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/filipe-alvim-178518210/">
                      work with me
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </Footer>
    </div>
  );
}

export default NotFound;
