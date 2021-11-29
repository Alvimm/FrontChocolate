import React, { useState } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useHistory } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import chocolateImg from '../../assets/images/chocolate.svg';
import { Form } from '../../components/form';
import api from '../../services/api';
import {
  localStorageSetItem,
  localStorageGetItem,
} from '../../helper/localStorage';
import { Footer } from '../../components/footer';

function Login() {
  const history = useHistory();

  const token = localStorageGetItem();

  if (token) {
    history.push('/');
  }

  const [infos, setInfos] = useState({
    email: '',
    password: '',
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', infos);

      if (response.status !== 201) {
        store.addNotification({
          title: 'There was an error logging in.',
          message: 'There was an error logging in.',
          type: 'warning',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }

      localStorageSetItem(response.data.token);

      return history.push('/');
    } catch (err) {
      return store.addNotification({
        title: 'Authentication error',
        message: 'Invalid email or password',
        type: 'warning',
        insert: 'top',
        container: 'top-right',
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };

  const handleInputChange = (e) => {
    setInfos({
      ...infos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
      <GlobalStyle />
      <ReactNotification />
      <Container>
        <img src={chocolateImg} alt="Chocolate" />
        <h1>Login</h1>

        <Form onSubmit={onFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Type your e-mail"
            required
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Type your password"
            required
            onChange={handleInputChange}
          />
          <button type="submit">Login</button>
        </Form>
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

export default Login;
