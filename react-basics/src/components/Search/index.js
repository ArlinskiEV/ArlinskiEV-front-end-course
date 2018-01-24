import React from 'react';
import styled from 'styled-components';

const Tag = styled.div`
border: 2px solid green;
margin-bottom: 5px;
display: flex;
`;

const Area = styled.input`
width: 70%;
border: 2px solid blue;
`;

const Button = styled.input`
width: 30%;
background: blue;
color: white;
`;

export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Tag>
                <Area type="text" placeholder="Search..."/>
                <Button type="submit" value="Search"/>
            </Tag>
        );
    }
}