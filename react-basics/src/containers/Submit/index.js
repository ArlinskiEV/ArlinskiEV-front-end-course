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
import store from '../../store';

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