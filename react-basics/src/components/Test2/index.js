import React from 'react';
import Test from '../../components/Test';
import Title from '../../components/Title';
import Clock from '../../components/Clock';

import src from '../../img/test.jpg';
// Use the image in your code somehow now
const MyImg = () => <img src={src} />;

export default class TestContainer extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello</h1>
          <MyImg/>
          <hr/>
          <Test />
          <Title />
          <div>My first Single Page App</ div>
          <Clock date={new Date()}/>
          <hr />
        </div>
      );
    }
  }