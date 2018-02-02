import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';

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
  
const mapStateToProps = function() {
    return {};
};

const mapDispatchToProps= function() {
    return {
        undo: () => {window.console.log('undo')},
        redo: () => {window.console.log('redo')},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);