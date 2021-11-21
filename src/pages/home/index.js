import React, { useEffect, useState } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useHistory, Link } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { ChocolateList } from './style';
import { ButtonLink } from '../../components/button';
import chocolateImg from '../../assets/images/chocolate.svg';
import api from '../../services/api';
import {
  localStorageGetItem,
  localStorageRemoveItem,
} from '../../helper/localStorage';

function App() {
  const history = useHistory();

  const token = localStorageGetItem();

  const changeRoute = (route) => {
    history.push(route);
  };

  if (!token) {
    changeRoute('/login');
  }

  const [infos, setInfos] = useState([]);

  const logout = () => {
    localStorageRemoveItem();
    changeRoute('/login');
  };

  const getApiData = async () => {
    try {
      const response = await api.get('/chocolates');
      setInfos(response.data.chocolates);
    } catch (err) {
      store.addNotification({
        title: 'Erro de carregamento dos dados',
        message: 'Houve um erro ao carregar os chocolates',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      setInfos(infos);
    }
  };
  const deleteChocolate = async (e) => {
    try {
      const { id } = e.target;
      const response = await api.delete(`/chocolates/${id}`);
      if (response.status !== 200) {
        store.addNotification({
          title: 'Erro ao deletar',
          message: 'Houve um erro ao deletar o chocolate',
          type: 'warning',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
      getApiData();
    } catch (err) {
      store.addNotification({
        title: 'Erro ao deletar',
        message: 'Houve um erro ao deletar o chocolate',
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

  const buttonClick = () => {
    getApiData();
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <ReactNotification />
      <Container>
        <img src={chocolateImg} alt="Imagem de chocolate" />
        <h1>Chocolates</h1>
        <ButtonLink type="button" onClick={logout}>
          Sair
        </ButtonLink>

        <ButtonLink>
          <Link to="/chocolate">Cadastrar chocolate</Link>
        </ButtonLink>
        <ButtonLink>
          <Link to="/user">Cadastrar usuário</Link>
        </ButtonLink>

        <ChocolateList>
          {infos.map((info) => (
            <li key={info.name}>
              <div>
                <img src={info.image} alt="Imagem de chocolate" />
                <div>
                  <h2>{info.name}</h2>
                  <p>
                    <strong>R$:</strong> {info.value}
                  </p>
                  <p>
                    <strong>Marca:</strong> {info.name}
                  </p>
                  <ButtonLink // eslint-disable-next-line no-underscore-dangle
                    id={info._id}
                    type="button"
                    onClick={deleteChocolate}
                  >
                    Deletar
                  </ButtonLink>
                </div>
              </div>
            </li>
          ))}
        </ChocolateList>
        <ButtonLink type="button" onClick={buttonClick}>
          Recarregar chocolates
        </ButtonLink>
      </Container>
    </div>
  );
}

export default App;
