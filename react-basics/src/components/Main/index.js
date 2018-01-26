import React from 'react';
import {
  BrowserRouter as Router
  , Route
  // , Link
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components';

import Test2 from '../../components/Test2';
import Weather from '../../components/Weather';

import Header from '../../components/Header';
import ToolBox from '../../components/ToolBox';
import Categories from '../../containers/Categories';

const Content = styled.div`
display: flex;
`;
const Left = styled.div`
max-width: 30%;
`;
const Right = styled.div``;

export default class Main extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Router>
            <MuiThemeProvider>
              <div>
                <Header/>
                <hr/>
                <ToolBox/>
                <hr/>
                <Content>
                  <Left>
                    <Categories/>
                  </Left>
                  <Right>
                    <Route path="/Weather" component={Weather}/>
                    <Route path="/test" component={Test2}/>
                  </Right>
                </Content>
              </div>
            </MuiThemeProvider>
          </Router>
        </Provider>
      );
    }
  }