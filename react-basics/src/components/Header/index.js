import React from 'react';
import styled from 'styled-components';

import ProgressBar from '../../containers/ProgressBar';
import Submit from '../../containers/Submit';
import Filter from '../../containers/Filter';

const Tag = styled.div`
margin-bottom: 15px;
`;

const Right = styled.div`
display: flex;
justify-content: flex-end;
`;

export default class Header extends React.Component {
    render() {
        return (
            <Tag>
                <Right>
                    <Filter/>
                    <Submit
                        type = "SEARCH"
                    />
                </Right>
                <ProgressBar/>
            </Tag>
        );
    }
}