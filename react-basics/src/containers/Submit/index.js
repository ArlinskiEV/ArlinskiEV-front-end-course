import SubmitText from '../../components/SubmitText';

import {
    withRouter
} from 'react-router-dom';

import 'url-search-params-polyfill';

import { connect } from 'react-redux';
import {
    addTodo,
    editAddTodoName,
    editAddCategoryName,
    addCategory,
    modalOpen,
    editSearh,
    applySearh,
} from '../../store/actions';

const mapStateToProps = function(state, ownProps) {
    let placeholder = 'Category name...';
    let buttonName = 'Add';
    let value = '';

    switch (ownProps.type) {
        case 'ADD_TODO': {
            placeholder = 'Task name...';
            value = state.todos.addTodoName || '';
            break;
        }
        case 'ADD_CATEGORY': {
            placeholder = 'Category name...';
            value = state.categories.editCategoryName || '';
            break;
        }
        case 'SEARCH': {
            buttonName = 'Search';
            placeholder = 'Search task by name';
            value = state.search.text || '';
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
    let mount = () => {};

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
            changer = (value) => dispatch(editSearh(value));
            clicker = (value) => {
                if (value) {
                    dispatch(applySearh(true));
                    let path = ownProps.location.pathname;
                    let search = new URLSearchParams (ownProps.location.search);
                    search.set("search", value);
                    ownProps.history.push(`${path+'?'+search}`);

                } else {
                    dispatch(editSearh(''));
                    dispatch(applySearh(false));
                }
            };
            mount = (current) => {
                let search = new URLSearchParams (ownProps.location.search);
                let value = search.get("search");
                if (value !== current) {
                    dispatch(editSearh(value));
                    dispatch(applySearh(true));
                    window.console.log('apply search from url');
                }
            };
            break;
        }
        default: window.console.log('ERROR: UNKNOWN SUBMIT_TYPE');
    }

    return {
        clicker: clicker,
        changer: changer,

        willmount: mount,
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitText));