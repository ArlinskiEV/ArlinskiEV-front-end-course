// import { createStore, combineReducers } from 'redux';
import { createStore } from 'redux';
import generateState from './generateState'; 
import {
    TOGGLE_TODO,
    MOVE_TODO,
    ADD_TODO,
    EDIT_PARAMS_TODO,
    EDIT_ADD_TODO_NAME,

    TOGGLE_CATEGORY,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    EDIT_ADD_CATEGORY_NAME,
    EDIT_CATEGORY,

    MODAL_OPEN,
    MODAL_CLOSE,

    TOGGLE_FILTER,
} from './actions';

import {
    toggleTodo,
    addTodo,
    moveTodoInCategory,
    editParams,
    editAddTodoName,

} from './redusers/todo';

import {
    toggleCategory,
    deleteCategory,
    addCategory,
    editAddCategoryName,
    editCategory,
} from './redusers/category';

import {
    modalOpen,
    modalClose,
} from './redusers/modal';

import {
    toggleFilter,
} from './redusers/filter';

// My single Reduser
const mySingleReduser = function(state = {}, action) {
    let change = {};

    window.console.log(`TYPE: ${action.type}`);
    switch (action.type) {
        // case '@@redux/INIT': {
        //     change = generateState.init();
        //     break;
        // }
        case TOGGLE_CATEGORY: {
            change = toggleCategory(
                {
                    categoryList: state.categoryList,
                    categoriesState: state.categoriesState,
                },
                action
            );
            break;
        }
        case DELETE_CATEGORY: {
            change = deleteCategory(
                {
                    categoryList: state.categoryList,
                    categoriesState: state.categoriesState,
                },
                action);
            break;
        }
        case ADD_CATEGORY: {
            change = addCategory(
                {
                    editCategoryName: state.editCategoryName,
                    categoryList: state.categoryList,
                    categoriesState: state.categoriesState,
                },
                action);
            break;
        }
        case EDIT_ADD_CATEGORY_NAME: {
            change = editAddCategoryName(
                {
                    editCategoryName: state.editCategoryName,
                },
                action
            );
            break;
        }
        case EDIT_CATEGORY: {
            change = editCategory(
                {
                    categoryList: state.categoryList,
                    categoriesState: state.categoriesState,
                },
                action
            );
            break;
        }
        // -----------------------------------------
        // -----------------------------------------
        case TOGGLE_TODO: {
            change = toggleTodo(
                {
                    todoList: state.todoList,
                    taskEditStates: state.taskEditStates
                },
                action
            );
            break;
        }
        case MOVE_TODO: {
            change = moveTodoInCategory(
                {
                    todoList: state.todoList,
                    taskEditStates: state.taskEditStates
                },
                action
            );
            break;
        }
        case ADD_TODO: {
            change = addTodo(
                {
                    todoList: state.todoList,
                },
                action);
            break;
        }
        case EDIT_PARAMS_TODO: {
            change = editParams(
                {
                    todoList: state.todoList,
                    taskEditStates: state.taskEditStates,
                },
                action
            );
            break;
        }
        case EDIT_ADD_TODO_NAME: {
            change = editAddTodoName(
                {
                    addTodoName: state.addTodoName,
                },
                action
            );
            break;
        }
        // -----------------------------------------
        // -----------------------------------------
        case MODAL_OPEN: {
            change = modalOpen(
                {
                    modal: state.modal,
                },
                action
            );
            break;
        }
        case MODAL_CLOSE: {
            change = modalClose(
                {
                    modal: state.modal,
                },
                action
            );
            break;
        }
        // -----------------------------------------
        // -----------------------------------------
        case TOGGLE_FILTER: {
            change = toggleFilter(
                {
                    filter: state.filter,
                },
                action
            );
            break;
        }
        // -----------------------------------------
        // -----------------------------------------
        default: {
            window.console.log(`UNKNOWN_TYPE: ${action.type}`);
            change = {};
        }
    }
    let newState = Object.assign({}, state, change);
    // window.console.log(`newstate: ${JSON.stringify(newState)}`);
    sessionStorage.setItem('APP_STATE', JSON.stringify(newState));

    return newState;
};



// Combine Reducers
// const reducers = combineReducers({
//   userState: userReducer,
//   categoriesListState: categoriesReducer
// });

// const store = createStore(reducers);
const store = createStore(mySingleReduser, generateState.init());
export default store;