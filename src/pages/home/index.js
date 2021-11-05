import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalStyle from '../../styles/global';
import { Container } from '../../components/container';
import { ChocolateList } from './style';
import chocolateImg from '../../assets/images/chocolate.svg';
import api from '../../services/api';
import { localStorageGetItem } from '../../helper/localStorage';

function App() {
  const history = useHistory();

  const token = localStorageGetItem();

  if (!token) {
    history.push('/login');
  }

  const [infos, setInfos] = useState([]);

  useEffect(async () => {
    const response = await api.get('/chocolates');

    setInfos(response.data.chocolates);
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Container>
        <img src={chocolateImg} alt="Imagem de chocolate" />
        <h1>Chocolates</h1>

        <ChocolateList>
          {infos.map((info) => (
            <li key={info.name}>
              <div>
                <img src={info.image} alt="Imagem de chocolate" />
                <div>
                  <h2>{info.name}</h2>
                  <p>{info.value}</p>
                  <p>{info.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ChocolateList>
      </Container>
    </div>
  );
}

export default App;
