import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from '../MyAwesomeReactComponent/MyAwesomeReactComponent';

const Test = () => (
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);


export default Test;