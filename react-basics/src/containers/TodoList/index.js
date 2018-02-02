import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import TodoItem from '../../components/TodoItem';

import {toggleTodo} from '../../store/actions';

const Tag = styled.div`
    overflow: auto;
    margin-left: 20px;
   -webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

const Wrap = styled.div`
display: flex;
padding: 10px;
flex-direction: column;
min-width: max-content;
`;


class TodoList extends React.Component {
    render() {
        let child = false;
        let obj = (
            <Tag>
                <Wrap>
                    {this.props.state
                        .filter((item) => this.props.categoryId === item.categoryId)
                        .sort((a, b) => b.id - a.id)
                        .map((item) => {
                            child = true;
                            return (
                                <TodoItem
                                    key = {item.id}
                                    itemId = {item.id}
                                    name = {item.name}
                                    completed = {item.completed}
                                    toggle = {() => {this.props.toggleTodo(item.id)}}
                                    owner = {this.props.categoryId}
                                />
                            );
                        })
                    }
                </Wrap>
            </Tag>
        );
        return child ? obj : '';
    }
}

TodoList.propTypes = {
    state: PropTypes.array,
    categoryId: PropTypes.number,
    toggleTodo: PropTypes.func,
};

const mapStateToProps = function(state, ownProps) {
    return {
        state: state.todoList,
        categoryId: parseInt(ownProps.match.params.id),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        toggleTodo: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);