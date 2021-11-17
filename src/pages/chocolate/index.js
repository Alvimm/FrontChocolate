import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { localStorageGetItem } from '../../helper/localStorage';
import { ChocolateForm, ButtonLink } from './style';
import chocolateImg from '../../assets/images/chocolate.svg';
import api from '../../services/api';

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
        // eslint-disable-next-line no-alert
        alert('Deu ruim na req');
      }
      history.push('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <div className="App">
      <GlobalStyle />
      <Container>
        <img src={chocolateImg} alt="imagem do chocolate" />
        <h1>Cadastrar chocolate</h1>
        <ButtonLink>
          <Link to="/">Página principal</Link>
        </ButtonLink>
        <ChocolateForm onSubmit={onFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome do chocolate"
            required
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="value"
            placeholder="Digite o valor do chocolate"
            required
            onChange={handleInputChange}
          />
          <input type="file" name="file" onChange={handleImageChange} />
          <button type="submit">Cadastrar chocolate</button>
        </ChocolateForm>
      </Container>
    </div>
  );
}

export default Chocolate;
