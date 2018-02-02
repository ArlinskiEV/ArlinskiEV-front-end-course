import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import {
  modalClose,
  addCategory,
  editAddCategoryName,
  editCategory,
} from '../../store/actions'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class ModalDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={this.props.actions}
          modal={false}
          open={this.props.open}
        >
        {this.props.children}
        </Dialog>
      </div>
    );
  }
}

ModalDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  actions: PropTypes.array,
  children: PropTypes.object
};

const mapStateToProps = function(state) {
  let newState = {};
  let actions = [
    <FlatButton
      key={'Cancel'}
      label="Cancel"
      primary={true}
      disabled={false}
      onClick={() => store.dispatch(modalClose({}))}
    />,
  ];
  switch (state.modal.type) {
    case 'CONFIRM': {
      Object.assign(
        newState,
        {
          open: state.modal.open,
          title: 'Done',
          actions,
          children: <span>Category was remove with nested category</span>,
        }
      );
      break;
    }
    case 'ADD': {
      Object.assign(
        newState,
        {
          open: state.modal.open,
          title: 'Add category',
          actions: [
            ...actions,
            <FlatButton
              key={'Add'}
              label="Add"
              primary={true}
              disabled={false}
              onClick={() => {
                store.dispatch(addCategory(
                  {
                    name: state.editCategoryName,
                    parentId: state.editCategoryParentId,
                  }
                ));
                store.dispatch(editAddCategoryName(''))
                store.dispatch(modalClose());
              }}
            />,
          ],
          children:
            <input
              key = {0}
              placeholder = {`Add category in ${state.editCategoryParentId}`}
              value = {state.editCategoryName || ''}
              onChange = {(e) => store.dispatch(editAddCategoryName(e.target.value))}
            />,
        }
      );
      break;
    }
    case 'EDIT': {
      Object.assign(
        newState,
        {
          open: state.modal.open,
          title: 'Edit category name',
          actions: [
            ...actions,
            <FlatButton
              key={'Save'}
              label="Save"
              primary={true}
              disabled={false}
              onClick={() => {
                store.dispatch(editCategory(
                  {
                    name: state.editCategoryName,
                    id: state.editCategoryParentId,
                  }
                ));
                store.dispatch(editAddCategoryName(''))
                store.dispatch(modalClose());
              }}
            />,
          ],
          children:
            <input
              key = {0}
              placeholder = {`Edit category name id = ${state.editCategoryParentId}`}
              value = {state.editCategoryName || ''}
              onChange = {(e) => store.dispatch(editAddCategoryName(e.target.value))}
            />,
        }
      );
      break;
    }
  }
  return newState;
};

// const mapDispatchToProps = function(dispatch) {
//   return {};
// };

export default connect(mapStateToProps)(ModalDialog);