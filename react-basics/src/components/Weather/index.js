import React from 'react';
import styled from 'styled-components';

import ReqwestJSON from '../../reqwest';

const Tag = styled.div`
border: 2px solid green;
`;

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Weather: 'loading'};
    }
    componentDidMount() {
        new ReqwestJSON((data) => {this.resolve(data)});
    }
    resolve(data) {
        this.setState({
            Weather: JSON.stringify(data)
        });
    }

    render () {
        return (
            <Tag>
                <span style={{width: '100%'}}>{this.state.Weather}</span>
            </Tag>
        );
    }
}