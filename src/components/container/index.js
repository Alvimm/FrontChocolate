import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  background-color: #fff;
  align-items: center;
  border-radius: 4px;
  margin: 80px auto;

  h1 {
    font-size: 50px;
    margin-top: 15px;
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  img {
    max-width: 250px;
  }

  body {
    line-height: 1.5;
    font-family: Arial, Helvetica, sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    max-width: 1170px;
    margin: auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  ul {
    list-style: none;
  }

  .content {
    width: 100%;
    padding: 100px;
  }

  .content h1,
  p {
    padding-bottom: 40px;
  }

  .footer {
    background-color: #000;
    padding: 70px 0;
  }

  .footer-col {
    width: 25%;
    padding: 0 15px;
  }

  .footer-col h4 {
    font-size: 18px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
  }

  .footer-col h4::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #161516;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
  }

  .footer-col ul li:not(:last-child) {
    margin-bottom: 10px;
  }

  .footer-col ul li a {
    font-size: 16px;
    text-transform: capitalize;
    color: #ffffff;
    text-decoration: none;
    font-weight: 300;
    color: #faf5f5;
    display: block;
    transition: all 0.3s ease;
  }

  .footer-col ul li a:hover {
    color: #ffffff;
    padding-left: 8px;
  }
`;
