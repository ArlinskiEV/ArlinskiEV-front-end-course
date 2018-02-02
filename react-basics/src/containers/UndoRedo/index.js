import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';


// import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';


const Tag = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;


class UndoRedo extends React.Component {
    render() {
        return (
            <Tag>
                <FlatButton
                    label="Undo"
                    primary={true}
                    disabled={false}
                    onClick={() => {this.props.undo()}}
                />
                <FlatButton
                    label="Redo"
                    primary={true}
                    disabled={false}
                    onClick={() => {this.props.redo()}}
                />
            </Tag>
        );
    }
}



UndoRedo.propTypes = {
    undo: PropTypes.func,
    redo: PropTypes.func,
};
  
// const mapStateToProps = function() {
//     return {};
// };

const mapDispatchToProps= function(dispatch) {
    return {
        undo: () => {
            window.console.log('undo');
            dispatch(ActionCreators.undo()) // undo the last action
        },
        redo: () => {
            window.console.log('redo');
            dispatch(ActionCreators.redo()) // redo the last action
        },
    };
};

export default connect(undefined, mapDispatchToProps)(UndoRedo);