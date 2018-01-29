import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import SubmitText from '../../components/SubmitText';

const Tag = styled.div`
margin-bottom: 15px;
display: flex;
align-items: center;
justify-content: space-between;
`;

export default class ToolBox extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Tag>
                <SubmitText
                    type = "ADD_CATEGORY"
                />
                <div>
                    <span>undo</span>
                    <span> || </span>
                    <span>redo</span>
                </div>
                <SubmitText
                    type = "ADD_TODO"
                />
            </Tag>
        );
    }
}
