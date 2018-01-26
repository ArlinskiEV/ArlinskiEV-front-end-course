import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import store from '../../store';
import {toggleTodo} from '../../store/actions';

const Tag = styled.div`
overflow: auto;
margin-left: 20px;

-webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.75);
`;

const styles = {
    block: {
    //   minWidth: 150,
      marginRight: 15,
    },
    checkbox: {
      // marginBottom: 16,
    },
};

class TaskEdit extends React.Component {
    toggleTodo(id) {
        window.console.log(`task-edit:toggle id= ${id}`);
        store.dispatch(toggleTodo(id));
    }
    render() {
        return (
            <Tag>
                <span>{this.props.name}</span>
                <div style={styles.block}>
                    <Checkbox
                        label=""
                        checked={this.props.completed}
                        onCheck={() => {this.toggleTodo(this.props.id)}}
                        style={styles.checkbox}
                    />
                </div>
                <span>{this.props.id}</span>
                <span>{this.props.categoryId}</span>
                <span>{this.props.text}</span>
            </Tag>
        );
    }
}

TaskEdit.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
    categoryId: PropTypes.number,
};
const mapStateToProps = function(store, ownProps) {
    let taskId = parseInt(ownProps.match.params.id);
    let task = store.todoList.findIndex((item) => item.id === taskId);
    return store.todoList[task];
};

export default connect(mapStateToProps)(TaskEdit);