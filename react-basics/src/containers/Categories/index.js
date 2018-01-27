import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryItem from '../../components/CategoryItem';
// import generateState from './generateState'; 

import { connect } from 'react-redux';
import store from '../../store';
import {
    toggleSubCategories,
    moveTodo,
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
    showed(id) {
        store.dispatch(toggleSubCategories(id));
    }
    moveIn(taskId, categoryId) {
        store.dispatch(moveTodo(taskId, categoryId));
    }

    render() {
        return (
            <Tag>
                <Wrap>
                    <hr/>
                    {this.props.state//this.state.list
                        .filter((item) => item.visible)
                        .map((item) => {
                            return (
                                <CategoryItem
                                    key = {item.id}
                                    showed = {() => {this.showed(item.id);}}
                                    moveIn = {(categoryId) => {this.moveIn(this.props.task, categoryId);}}

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
                    <hr/>
                </Wrap>
            </Tag>
        );
    }
}

Categories.propTypes = {
    state: PropTypes.array,
    task: PropTypes.number,
    history: PropTypes.object,
};

const mapStateToProps = function(store, ownProps) {
    //'/category/1/task/1'
    // ownProps.location.pathname
    let i = ownProps.location.pathname.lastIndexOf('/task/') + 6;
    let task = i < 6
        ? (-1)
        : parseInt(ownProps.location.pathname.slice(i));

    return {
        state: store.categoriesState,
        task: task,
        history: ownProps.history,
    };
};

export default connect(mapStateToProps)(Categories);