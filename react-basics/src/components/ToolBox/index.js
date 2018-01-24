import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tag = styled.div`
margin-bottom: 15px;
display: flex;
justify-content: space-between;
`;

export default class ToolBox extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Tag>
                <div>first</div>
                <div>second</div>
            </ Tag>
        );
    }
}
