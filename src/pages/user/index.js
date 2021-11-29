import React, { useState } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useHistory, Link } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { ButtonLink } from '../../components/button';
import { Form } from '../../components/form';
import { localStorageGetItem } from '../../helper/localStorage';
import chocolateImg from '../../assets/images/chocolate.svg';
import api from '../../services/api';
import { Footer } from '../../components/footer';

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
      return store.addNotification({
        title: 'Error registering user',
        message: 'Unable to register user',
        type: 'warning',
        insert: 'top',
        container: 'top-right',
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }

    delete infos.confirmPassword;
    try {
      const response = await api.post('/users', infos);

      if (response.status !== 201) {
        return store.addNotification({
          title: 'Error registering user',
          message: 'Unable to register user',
          type: 'warning',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }

      return history.push('/');
    } catch (error) {
      return store.addNotification({
        title: 'There was an error register chocolate',
        message: 'Unable to register chocolate',
        type: 'danger',
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
        <h1>Register usuário</h1>
        <ButtonLink>
          <Link to="/">Go to home page</Link>{' '}
        </ButtonLink>

        <Form onSubmit={onFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Type your name"
            required
            onChange={handleInputChange}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter your password again"
            required
            onChange={handleInputChange}
          />
          <button type="submit">Register usuário</button>
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

export default User;
