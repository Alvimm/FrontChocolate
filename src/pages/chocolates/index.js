import React, { useState } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useHistory, Link } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { localStorageGetItem } from '../../helper/localStorage';
import { ButtonLink } from '../../components/button';
import { Form } from '../../components/form';
import chocolateImg from '../../assets/images/chocolate.svg';
import api from '../../services/api';
import { Footer } from '../../components/footer';

function Chocolate() {
  const history = useHistory();

  const token = localStorageGetItem();

  if (!token) {
    history.push('/login');
  }

  const formData = new FormData();

  const [infos, setInfos] = useState({
    name: '',
    value: '',
  });

  const handleInputChange = (e) => {
    setInfos({
      ...infos,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    formData.append('file', e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    Object.keys(infos).forEach((key) => formData.append(key, infos[key]));

    try {
      const response = await api({
        method: 'post',
        url: '/chocolates',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status !== 201) {
        store.addNotification({
          title: 'There was an error in the API',
          message: 'There was an error when register chocolates',
          type: 'warning',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
      history.push('/');
    } catch (err) {
      store.addNotification({
        title: 'There was an error when register chocolate',
        message: 'It was not possible to register the chocolate',
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

  return (
    <div className="App">
      <GlobalStyle />
      <ReactNotification />
      <Container>
        <img src={chocolateImg} alt="chocolate" />
        <h1>Register chocolate</h1>
        <ButtonLink>
          <Link to="/">Home page</Link>
        </ButtonLink>
        <Form onSubmit={onFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter the name of the chocolate"
            required
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="value"
            placeholder="enter the value of the chocolate"
            required
            onChange={handleInputChange}
          />
          <input type="file" name="file" onChange={handleImageChange} />
          <button type="submit">Register chocolate</button>
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

export default Chocolate;
