import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { Form } from '../../components/form';
import { localStorageGetItem } from '../../helper/localStorage';
import chocolateImg from '../../assets/images/chocolate.svg';
import api from '../../services/api';

function User() {
  const history = useHistory();

  const token = localStorageGetItem();

  if (!token) {
    history.push('/login');
  }
  const [infos, setInfos] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = infos;

    if (password !== confirmPassword) {
      // eslint-disable-next-line no-alert
      return alert('As senhas não são iguais');
    }

    delete infos.confirmPassword;
    try {
      const response = await api.post('/users', infos);

      if (response.status !== 201) {
        // eslint-disable-next-line no-alert
        return alert('Deu ruim ao criar usuário');
      }

      return history.push('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      return console.log(error);
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
        <img src={chocolateImg} alt="Imagem de chocolate" />
        <h1>Cadastrar usuário</h1>

        <Form onSubmit={onFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            required
            onChange={handleInputChange}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Digite sua senha novamente"
            required
            onChange={handleInputChange}
          />
          <button type="submit">Cadastrar usuário</button>
        </Form>
      </Container>
    </div>
  );
}

export default User;
