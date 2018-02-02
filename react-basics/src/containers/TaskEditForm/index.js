import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';

import {editParamsTodo} from '../../store/actions'

const Tag = styled.div`
overflow: auto;
margin-left: 20px;
padding: 20px;
-webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

const Name = styled.input``;
const Block = styled.div`
width: min-content;
margin: 15px 0px;
`;
const TextBlock = styled.textarea`
margin-top: 15px;
width: 100%;
display: block;
`;
const Warning = styled.i.attrs({
    show: props => props.show || "none",
})`
display: ${props => props.show};
color: GoldenRod;
margin: 10px;
&::before {
    margin-right: 10px;
}
`;
class TaskEditForm extends React.Component {
    render() {
        return (
            (this.props.categoryURLId !== this.props.categoryId )
            ? (
                <Tag>
                    <span>{`No, this task in other category ;)`}</span>
                </Tag>
            )
            : (
                <Tag>
                    <Name
                        type="text"
                        value = {this.props.name}
                        placeholder="Task Name"
                        onChange = {(e) => {this.props.changer('name', this.props.id, e.target.value)}}
                    />
                    <Warning
                        className="fas fa-exclamation-triangle"
                        show = {!this.props.categoryIsExist ? "block" : "none"}
                    >{`Warning: Parent category doesn't exist`}</Warning>
                    <Block>
                        <Checkbox
                            label="Done"
                            checked={this.props.completed}
                            onCheck={() => {this.props.changer('toggle', this.props.id);}}
                        />
                    </Block>
                    <p>Task id = {this.props.id}</p>
                    <p>Category id = {this.props.categoryId}</p>
                    <input
                        type="button"
                        value="Save"
                        onClick = {() => {this.props.changer('save', this.props.id);}}
                    />
                    <input
                        type="button"
                        value="Cansel"
                        onClick = {() => {this.props.changer('cansel', this.props.id);}}
                    />
                    <TextBlock
                        value ={this.props.text}
                        placeholder="Text..."
                        onChange = {(e) => {this.props.changer('text', this.props.id, e.target.value)}}
                    />
                </Tag>
            )
        );
    }
}

TaskEditForm.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
    categoryId: PropTypes.number,

    categoryURLId: PropTypes.number,
    categoryIsExist: PropTypes.bool,

    changer: PropTypes.func,
};

const mapStateToProps = function(store, ownProps) {
    let taskId = parseInt(ownProps.match.params.id);
    let categoryURLId = parseInt(ownProps.match.params.categoryId);
    let id = store.present.todos.todoList.findIndex((item) => item.id === taskId);
    let task = store.present.todos.todoList[id];
    let state = store.present.todos.taskEditStates[taskId];
    let categoryIsExist = store.present.categories.categoryList.some(category => category.id === task.categoryId);
    return Object.assign(
        {
            categoryURLId: categoryURLId,
            categoryIsExist: categoryIsExist,
        },
        task,
        state
    );
};

const mapDispatchToProps = function(dispatch) {
    return {
        changer: (action, id, value) => {
            //name/toggle/text/save/cansel
            dispatch(editParamsTodo([action, id, value]));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditForm);