import React from 'react';
import ReactDOM from 'react-dom';

window.console.log(`mode=${process.env.NODE_ENV}`);
document.title = process.env.NODE_ENV;


import { AppContainer } from 'react-hot-loader'
import Main from './containers/Main'
//-------------------------------------------------------

const root = document.getElementById('root');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
}

render(Main);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Main', () => {
    render(Main);
  })
}

//-------------------------------------------------------
window.console.log('end ReactDOM.render');