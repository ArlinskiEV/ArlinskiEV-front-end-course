import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import TestContainer from '../containers/TestContainer';

export default class Main extends React.Component {
    render() {
      return (
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/test">Test</Link></li>
            </ul>

            <hr/>

            {/* <Route exact path="/" component={Home}/> */}
            <Route path="/test" component={TestContainer}/>
          </div>
        </Router>
      );
    }
  }