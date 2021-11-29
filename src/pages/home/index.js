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
import { Footer } from '../../components/footer';

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
        title: 'Data loading error',
        message: 'There was an error loading the chocolates',
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
          title: 'Error deleting',
          message: 'There was an error deleting the chocolate',
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
        title: 'Error deleting',
        message: 'There was an error deleting the chocolate',
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
        <img src={chocolateImg} alt="Chocolate" />
        <h1>Chocolates</h1>
        <ButtonLink type="button" onClick={logout}>
          Logout
        </ButtonLink>

        <ButtonLink>
          <Link to="/chocolates">Register chocolate</Link>
        </ButtonLink>
        <ButtonLink>
          <Link to="/user">Register user</Link>
        </ButtonLink>

        <ChocolateList>
          {infos.map((info) => (
            <li key={info.name}>
              <div>
                <img src={info.image} alt="Chocolate" />
                <div>
                  <h2>{info.name}</h2>
                  <p>
                    <strong>US$:</strong> {info.value}
                  </p>
                  <p>
                    <strong>Brand:</strong> {info.name}
                  </p>
                  <ButtonLink // eslint-disable-next-line no-underscore-dangle
                    id={info._id}
                    type="button"
                    onClick={deleteChocolate}
                  >
                    Delete
                  </ButtonLink>
                </div>
              </div>
            </li>
          ))}
        </ChocolateList>
        <ButtonLink type="button" onClick={buttonClick}>
          Reload chocolates
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

export default App;
