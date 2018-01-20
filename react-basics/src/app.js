import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

window.console.log('start ReactDOM.render');
window.console.log(`mode=${process.env.NODE_ENV}`);

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  border: 5px solid green;
`;


const root = document.getElementById('root');

ReactDOM.render(
  <div>
  <div>Single Page App</ div>
  <Title>Hello, world!</ Title>
  </ div>,
  root
);

window.console.log('end ReactDOM.render');