import SubmitText from '../../components/SubmitText'

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

const mapStateToProps = function(state, ownProps) {
    let placeholder = 'Category name...';
    let buttonName = 'Add';
    let value = '';

    switch (ownProps.type) {
        case 'ADD_TODO': {
            placeholder = 'Task name...';
            value = state.addTodoName || '';
            break;
        }
        case 'ADD_CATEGORY': {
            placeholder = 'Category name...';
            value = state.editCategoryName || '';
            break;
        }
        case 'SEARCH': {
            buttonName = 'Search';
            placeholder = 'Search task by name';
            break;
        }
        default: window.console.log('ERROR: UNKNOWN SUBMIT_TYPE');
    }

    return {
        placeholder: placeholder,
        buttonName: buttonName,
        value: value,
    };
};

const mapDispatchToProps = function(dispatch, ownProps) {

    let clicker = () => {
        window.console.log('click!');
    };
    let changer = () => {
        window.console.log('change');
    };

    switch (ownProps.type) {
        case 'ADD_TODO': {
            changer = (value) => dispatch(editAddTodoName(value));

            let i = ownProps.location.pathname.lastIndexOf('/category/') + 10;
            let catId = i < 10
                ? (0)
                : parseInt(ownProps.location.pathname.slice(i));
            clicker = (value) => {
                dispatch(addTodo(
                    {
                        name: value || 'noName',
                        category: catId
                    })
                );
                dispatch(editAddTodoName(''));
            };

            break;
        }
        case 'ADD_CATEGORY': {
            changer = (value) => dispatch(editAddCategoryName(value));

            clicker = (value) => {
                if (value) {
                    dispatch(addCategory(
                        {
                            name: value || 'noName',
                            parentId: 0,
                        })
                    );
                    dispatch(editAddCategoryName(''));
                } else {
                    dispatch(modalOpen({type:'ADD', parentId: 0}));
                }
            };

            break;
        }
        case 'SEARCH': {
            break;
        }
        default: window.console.log('ERROR: UNKNOWN SUBMIT_TYPE');
    }

    return {
        clicker: clicker,
        changer: changer,
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitText));