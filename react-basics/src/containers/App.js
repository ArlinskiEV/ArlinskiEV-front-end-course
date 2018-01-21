import React from 'react';


import Test from '../components/Test/Test';

import Title from '../components/Title/Title'

export default class Welcome extends React.Component {
    render() {
      return <div>
                <h1>Hello</h1>
                <Test />
                <Title />
                <div>My first Single Page App</ div>
            </div>;
    }
  }