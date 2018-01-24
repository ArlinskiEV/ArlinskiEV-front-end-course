import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProgressBar from '../../components/ProgressBar';
import Search from '../../components/Search';
import Filter from '../../components/Filter';

const Tag = styled.div`
margin-bottom: 15px;
`;

const Left = styled.div`
display: flex;
justify-content: flex-end;
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
            completed: props.completed,
        };
    }
    render() {
        return (
            <Tag>
                <Left>
                    <Filter/>
                    <Search/>
                </Left>
                <ProgressBar count={10} completed={6} />
            </Tag>
        );
    }
}

Header.propTypes = {
  count: PropTypes.number,
  completed: PropTypes.number
};