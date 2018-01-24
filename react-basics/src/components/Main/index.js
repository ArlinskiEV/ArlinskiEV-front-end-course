import React from 'react';
import {
  BrowserRouter as Router
  , Route
  // , Link
} from 'react-router-dom';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Test2 from '../../components/Test2';
import Weather from '../../components/Weather';

import Header from '../../components/Header';
import ToolBox from '../../components/ToolBox';
import Categories from '../../components/Categories';

export default class Main extends React.Component {
    render() {
      return (
        <Router>
          <MuiThemeProvider>
            <div>
              <Header/>
              <hr/>
              <ToolBox/>
              <hr/>
              <div>
                <Categories 
                  categoriesList={[
                    {id:1, name:'Cat 1', parentId:0},
                    {id:2, name:'Cat 2', parentId:0},
                    {id:8, name:'Cat 3', parentId:0},
                    {id:4, name:'Cat 3-1', parentId:8},
                    {id:5, name:'Cat 3-2', parentId:8},
                    {id:6, name:'Cat 3-3', parentId:8},
                    {id:7, name:'Cat 2-1', parentId:2},
                  ]}
                />
              </div>
              <Route exact path="/Weather" component={Weather}/>
              <Route exact path="/test" component={Test2}/>
            </div>
          </MuiThemeProvider>
        </Router>
      );
    }
  }