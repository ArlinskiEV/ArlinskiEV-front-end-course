import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import Submit from '../../containers/Submit';
import UndoRedo from '../../containers/UndoRedo';

const Tag = styled.div`
margin-bottom: 15px;
display: flex;
align-items: center;
justify-content: space-between;
`;

export default class ToolBox extends React.Component {
    render() {
        return (
            <Tag>
                <Submit
                    type = "ADD_CATEGORY"
                />
                <UndoRedo/>
                <Submit
                    type = "ADD_TODO"
                />
            </Tag>
        );
    }
}
