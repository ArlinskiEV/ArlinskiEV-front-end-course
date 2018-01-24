import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Tag = styled.div`
    width: 100%;
    height: 3px;
    margin: 1px 0px;
    background: red;

    -webkit-box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.75);
`;

const Completed = styled.div`
    width: ${props => `${100 * props.completed / props.count}%`};
    height: 100%;
    background: green;
`;

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
            completed: props.completed,
        };
    }

    render() {
        return (
            <Tag title={`${this.state.completed}/${this.state.count}`}>
                <Completed count={`${this.state.count}`} completed={`${this.state.completed}`}/>
            </ Tag>
        );
    }
}

ProgressBar.propTypes = {
  count: PropTypes.number,
  completed: PropTypes.number
};