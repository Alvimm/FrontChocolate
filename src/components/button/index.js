import styled from 'styled-components';

export const ButtonLink = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #fdf1d9;
  margin: 10px;

  &:hover {
    cursor: pointer;
    background-color: #ff9839;
  }

  a {
    color: #000;
    text-decoration: none;
  }
`;
