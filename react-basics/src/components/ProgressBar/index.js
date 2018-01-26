import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

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

class ProgressBar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Tag title={`${this.props.completed}/${this.props.count}`}>
                <Completed count={`${this.props.count}`} completed={`${this.props.completed}`}/>
            </Tag>
        );
    }
}

ProgressBar.propTypes = {
  count: PropTypes.number,
  completed: PropTypes.number
};

const mapStateToProps = function(store) {

    return {
        count: store.todoList.length,
        completed: store.todoList.filter((item) => {
            return item.completed;
        }).length,
    };
};

export default connect(mapStateToProps)(ProgressBar);