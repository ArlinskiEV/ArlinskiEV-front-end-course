import React from 'react';
import styled from 'styled-components';

const Tag = styled.div`
    display: 
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
          date: new Date()
        });
    }
    render() {
        return <Tag>
            It is {this.state.date.toLocaleTimeString()}.
            </Tag>
    }
}