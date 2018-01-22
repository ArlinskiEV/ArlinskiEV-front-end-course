import React from 'react';
import Test from '../../components/Test';
import Title from '../../components/Title';
import Clock from '../../components/Clock';

export default class TestContainer extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello</h1>
          <Test />
          <Title />
          <div>My first Single Page App</ div>
          <Clock date={new Date()}/>
          <hr />
        </div>
      );
    }
  }