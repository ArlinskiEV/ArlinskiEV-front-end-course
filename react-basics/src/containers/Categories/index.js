import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryItem from '../../components/CategoryItem';

import { connect } from 'react-redux';

import {
    toggleSubCategories,
    moveTodo,
    deleteCategory,
    modalOpen,
    editAddCategoryName,
} from '../../store/actions';

const Tag = styled.div`
    overflow: auto;
    min-width: 250px;
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

class Categories extends React.Component {
    render() {
        return (
            <Tag>
                <Wrap>
                    {this.props.state//this.state.list
                        .filter((item) => item.visible)
                        .map((item) => {
                            return (
                                <CategoryItem
                                    key = {item.id}

                                    showed = {() => this.props.showed(item.id)}
                                    moveIn = {(categoryId) => this.props.moveIn(this.props.task, categoryId)}
                                    remove = {(categoryId) => this.props.remove(categoryId)}
                                    add = {(categoryId) => this.props.add(categoryId)}
                                    edit = {(categoryId, name) => this.props.edit(categoryId, name)}

                                    history = {this.props.history}

                                    itemId = {item.id}
                                    name = {item.name}
                                    haveNested = {item.haveNested}
                                    isOpen = {item.isOpen}
                                    shift = {item.shift}
                                    task = {this.props.task}
                                />
                            );
                        })
                    }
                </Wrap>
            </Tag>
        );
    }
}

Categories.propTypes = {
    state: PropTypes.array,
    task: PropTypes.number,
    history: PropTypes.object,

    showed: PropTypes.func,
    moveIn: PropTypes.func,
    remove: PropTypes.func,
    add: PropTypes.func,
    edit: PropTypes.func,
};

const mapStateToProps = function(store, ownProps) {
    //'/category/1/task/1'
    // ownProps.location.pathname
    let i = ownProps.location.pathname.lastIndexOf('/task/') + 6;
    let task = i < 6
        ? (-1)
        : parseInt(ownProps.location.pathname.slice(i));

    return {
        state: store.categories.categoriesState,
        task: task,
        history: ownProps.history,
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        showed: (id) => {
            dispatch(toggleSubCategories(id));
        },
        moveIn: (taskId, categoryId) => {
            dispatch(moveTodo(taskId, categoryId));
        },
        remove: (id) => {
            dispatch(deleteCategory(id));
            dispatch(modalOpen({type:'CONFIRM'}));
        },
        add: (parentId) => {
            dispatch(modalOpen({type:'ADD', parentId}));
        },
        edit: (id, name) => {
            dispatch(editAddCategoryName(name));
            dispatch(modalOpen({type:'EDIT', id}));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);