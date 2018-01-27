import React from 'react';
import {
  BrowserRouter as Router
  , Route
  , Switch
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components';

import Header from '../../components/Header';
import ToolBox from '../../components/ToolBox';
import Categories from '../../containers/Categories';
import TodoList from '../../containers/TodoList';
import TaskEditForm from '../../containers/TaskEditForm';

const Content = styled.div`
display: flex;
flex-wrap: wrap;
`;
const Left = styled.div`
`;
const Right = styled.div`
`;

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
                    <Route path="/" component={Categories}/>
                  </Left>
                  <Right>
                    <Switch>
                      <Route path="/category/:categoryId/task/:id" component={TaskEditForm}/>
                      <Route path="/category/:id" component={TodoList}/>
                    </Switch>
                  </Right>
                </Content>
              </div>
            </MuiThemeProvider>
          </Router>
        </Provider>
      );
    }
  }