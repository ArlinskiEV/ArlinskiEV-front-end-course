import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';

const Tag = styled.div`
min-width: max-content;
display: flex;
border: 1px solid black;
position: relative;
padding: 15px;
padding-left: 35px;
&:hover {
    background-color: pink;
}
.selected & {
    background-color: yellow;
}
`;

const Icon = styled.i`
margin: 0px 5px;
&:hover {
    background-color: red;
}
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

export default class TodoItem extends React.Component {
    render() {
        return (
            <Tag>
                <div style={styles.block}>
                    <Checkbox
                        label=""
                        checked={this.props.completed}
                        onCheck={() => {this.props.toggle()}}
                        style={styles.checkbox}
                    />
                </div>
                <span>{this.props.name}</span>
                <Icon className="fas fa-edit"></Icon>
            </Tag>
        );
    }
}

TodoItem.propTypes = {
    itemId: PropTypes.number,
    name: PropTypes.string,
    completed: PropTypes.bool,
    toggle: PropTypes.func,
  };