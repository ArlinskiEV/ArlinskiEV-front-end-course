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

const Name = styled.input``;
const Block = styled.div`
width: min-content;
margin: 15px 0px;
`;
const TextBlock = styled.div`
margin-top: 15px
`;

class TaskEditForm extends React.Component {
    changer(action, value) {
        //name/toggle/text/save/cansel
        store.dispatch(editParamsTodo([action, this.props.id, value]));
    }
    render() {window.console.log('stop');
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
                        type="button"
                        value="Save"
                        onClick = {() => {this.changer('save');}}
                    />
                    <input
                        type="button"
                        value="Cansel"
                        onClick = {() => {this.changer('cansel');}}
                    />
                    <TextBlock>
                        <textarea
                            value ={this.props.text}
                            placeholder="Text..."
                            onChange = {(e) => {this.changer('text',e.target.value)}}
                        />
                    </TextBlock>
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
    categoryURLId: PropTypes.number
};

const mapStateToProps = function(store, ownProps) {
    let taskId = parseInt(ownProps.match.params.id);
    let categoryURLId = parseInt(ownProps.match.params.categoryId);
    window.console.log(`own=${JSON.stringify(ownProps)}`);
    window.console.log(`ownProps.match.params=${JSON.stringify(ownProps.match.params)}`);
    let id = store.todoList.findIndex((item) => item.id === taskId);
    let task = store.todoList[id];
    let state = store.taskEditStates[taskId];
    return Object.assign({categoryURLId: categoryURLId}, task, state);
};
export default connect(mapStateToProps)(TaskEditForm);