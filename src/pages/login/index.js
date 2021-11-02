/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import chocolateImg from '../../assets/images/chocolate.svg';
import { LoginForm } from './style';
import api from '../../services/api';
import { localStorageSetItem } from '../../helper/localStorage';

function Login() {
  const [infos, setInfos] = useState({
    email: '',
    password: '',
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', infos);

      if (response.status !== 201) {
        return alert('Usuário inválido');
      }

      localStorageSetItem(response.data.token);

      <Redirect to="/" />;
      return alert('Usuário válido');
    } catch (err) {
      return alert('Houve um problema com a API');
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
      <Container>
        <img src={chocolateImg} alt="imagem do chocolate" />
        <h1>Login</h1>

        <LoginForm onSubmit={onFormSubmit}>
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
        </LoginForm>
      </Container>
    </div>
  );
}

export default Login;
