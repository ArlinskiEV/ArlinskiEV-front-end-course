import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    withRouter
 } from 'react-router-dom';

import { connect } from 'react-redux';
import {
    addTodo,
    editAddTodoName,
    editAddCategoryName,
    addCategory,
    modalOpen,
} from '../../store/actions'
import store from '../../store';

const Tag = styled.div`
margin: 5px;
display: flex;
-webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

const Area = styled.input.attrs({
    type: "text"
})`
width: 70%;
`;

const Button = styled.input.attrs({
    type: "button"
})`
width: 30%;
`;

class SubmitText extends React.Component {
    render () {
        return (
            <Tag>
                <Area
                    placeholder={this.props.placeholder}
                    value = {this.props.value}
                    onChange = {(e) => {this.props.changer(e.target.value)}}
                />
                <Button
                    value={this.props.buttonName}
                    onClick = {() => {this.props.clicker();}}
                />
            </Tag>
        );
    }
}

SubmitText.propTypes = {
    placeholder: PropTypes.string,
    buttonName: PropTypes.string,
    clicker: PropTypes.func,
    changer: PropTypes.func,
    value: PropTypes.string,
};


const mapStateToProps = function(state, ownProps) {
    let placeholder = 'Category name...';
    let buttonName = 'Add';
    let value = '';
    let clicker = () => {
        window.console.log('click!');
    };
    let changer = () => {
        window.console.log('change');
    };
    switch (ownProps.type) {
        case 'ADD_TODO': {
            placeholder = 'Task name...';
            value = state.addTodoName || '';
            let i = ownProps.location.pathname.lastIndexOf('/category/') + 10;
            let catId = i < 10
                ? (0)
                : parseInt(ownProps.location.pathname.slice(i));
            clicker = () => {
                store.dispatch(addTodo(
                    {
                        name: state.addTodoName || 'noName',
                        category: catId
                    })
                );
                store.dispatch(editAddTodoName(''));
            };
            changer = (value) => store.dispatch(editAddTodoName(value));
            break;
        }
        case 'ADD_CATEGORY': {
            placeholder = 'Category name...';
            value = state.editCategoryName || '';
            changer = (value) => store.dispatch(editAddCategoryName(value));
            clicker = () => {
                if (state.editCategoryName) {
                    store.dispatch(addCategory(
                        {
                            name: state.editCategoryName || 'noName',
                            parentId: 0,//state.editCategoryParentId || 0,
                        })
                    );
                    store.dispatch(editAddCategoryName(''));
                } else {
                    window.console.log('TRASH!!!!!!!!!!!');
                    store.dispatch(modalOpen({type:'ADD', parentId: 0}));
                }
            };
            break;
        }
        case 'SEARCH': {
            buttonName = 'Search';
            placeholder = 'Search task by name';
            break;
        }
    }

    return {
        placeholder: placeholder,
        buttonName: buttonName,
        value: value,
        clicker: clicker,
        changer: changer,
    };
};

export default withRouter(connect(mapStateToProps)(SubmitText));