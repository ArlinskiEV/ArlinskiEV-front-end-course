import React from 'react';
import styled from 'styled-components';

import ProgressBar from '../../components/ProgressBar';
import Search from '../../components/SubmitText';
import Filter from '../../components/Filter';

const Tag = styled.div`
margin-bottom: 15px;
`;

const Left = styled.div`
display: flex;
justify-content: flex-end;
`;

export default class Header extends React.Component {
    render() {
        return (
            <Tag>
                <Left>
                    <Filter/>
                    <Search
                        placeholder = "Search..."
                        buttonName = "Search"
                    />
                </Left>
                <ProgressBar/>
            </Tag>
        );
    }
}