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
        new ReqwestJSON((data) => {this.resolve(data)});




        // const url = 'https://api.apixu.com/v1/current.json';
        // const key = '295e41195b004b63870161436182201';
        // const town = 'Paris';
        // const data = {username: 'example'};

        // const requestUrl = `${url}?key=${key}&q=${town}`;


        // fetch(requestUrl, {
        //     method: 'POST', // or 'PUT'
        //     body: JSON.stringify(data), 
        //     headers: new Headers({
        //       'Content-Type': 'application/json'
        //     })
        //   }).then(res => res.json())
        //   .catch(error => window.console.error('Error:', error))
        //   .then(response => {
        //       window.console.log('Success:', response);
        //       this.setState({
        //           Weather: response
        //       });
        //     }
        //   )
    }

    resolve(data) {
        this.setState({
            Weather: data
        });
    }

    render () {
        return (
            <Tag>
                {this.state.Weather}
            </Tag>
        );
    }
}