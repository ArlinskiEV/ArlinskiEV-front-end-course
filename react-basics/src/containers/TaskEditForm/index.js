import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import store from '../../store';
import {editParamsTodo} from '../../store/actions'

const Tag = styled.div`
overflow: auto;
margin-left: 20px;
padding: 20px;
-webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

const Name = styled.input`
`;
const Block = styled.div`
width: min-content;
marginRight: 15;
`;

class TaskEditForm extends React.Component {
    changer(action, value) {
        //name/toggle/text/save/cansel
        store.dispatch(editParamsTodo([action, this.props.id, value]));
    }
    render() {window.console.log('re-render');
        return (
            <Tag>
                <Name
                    type="text"
                    value = {this.props.name}
                    placeholder="Task Name"
                    onChange = {(e) => {this.changer('name',e.target.value)}}
                />
                <Block>
                    <Checkbox
                        label="Done"
                        checked={this.props.completed}
                        onCheck={() => {this.changer('toggle');}}
                    />
                </Block>
                <span>Task id = {this.props.id} ||| </span>
                <span>Category id = {this.props.categoryId} ||| </span>
                <input
                    value ={this.props.text}
                    placeholder="Text..."
                    onChange = {(e) => {this.changer('text',e.target.value)}}
                />
                <input
                    type="button"
                    value="Save"
                    onClick = {() => {this.changer('save');}}
                />
                <input
                    type="button"
                    value="Cansel"
                    onClick = {() => {this.changer('cansel');}}
                />
            </Tag>
        );
    }
}

TaskEditForm.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
    categoryId: PropTypes.number,
};

const mapStateToProps = function(store, ownProps) {
    let taskId = parseInt(ownProps.match.params.id);
    let id = store.todoList.findIndex((item) => item.id === taskId);
    let task = store.todoList[id];
    let state = store.taskEditStates[taskId];
    window.console.log(`fromState=${JSON.stringify(state)}`);
    window.console.log(`fromTodo=${JSON.stringify(task)}`);
    return Object.assign({}, task, state);
};
export default connect(mapStateToProps)(TaskEditForm);