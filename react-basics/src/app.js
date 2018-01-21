import React from 'react';
import ReactDOM from 'react-dom';

window.console.log('start ReactDOM.render');
window.console.log(`mode=${process.env.NODE_ENV}`);
document.title = process.env.NODE_ENV;


import { AppContainer } from 'react-hot-loader'
import App from './containers/App'
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

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App)
  })
}

//-------------------------------------------------------
window.console.log('end ReactDOM.render');