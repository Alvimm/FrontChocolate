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
          title: 'Houve um erro ao fazer login',
          message: 'Houve um erro ao fazer o login',
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
        title: 'Erro na autenticação',
        message: 'E-mail ou senha inválidos',
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
        <img src={chocolateImg} alt="imagem do chocolate" />
        <h1>Login</h1>

        <Form onSubmit={onFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            required
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            required
            onChange={handleInputChange}
          />
          <button type="submit">Login</button>

          <footer className="footer">
            <div className="container">
              <div className="row">
                <div className="footer-col">
                  <h4>Company</h4>
                  <ul>
                    <li>
                      <a href="https://github.com/Alvimm">about us</a>
                    </li>
                    <li>
                      <a href="https://github.com/Alvimm">our portfolio</a>
                    </li>
                    <li>
                      <a href="https://github.com/Alvimm?tab=repositories">
                        privacy policy
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/Alvimm">work with us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
