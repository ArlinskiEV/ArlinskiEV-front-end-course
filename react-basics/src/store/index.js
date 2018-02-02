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

// My single Reduser
const mySingleReduser = function(state = {}, action) {
    let newState = Object.assign({}, state);
    let change = {};

    window.console.log(`TYPE: ${action.type}`);
    switch (action.type) {
        case '@@redux/INIT': {
            change = generateState.init();
            break;
        }
        case TOGGLE_CATEGORY: {
            change = toggleCategory(
                {
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action
            );
            break;
        }
        case DELETE_CATEGORY: {
            change = deleteCategory(
                {
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action);
            break;
        }
        case TOGGLE_TODO: {
            change = toggleTodo(
                {
                    todoList: newState.todoList,
                    taskEditStates: newState.taskEditStates
                },
                action
            );
            break;
        }
        case MOVE_TODO: {
            change = moveTodoInCategory(
                {
                    todoList: newState.todoList,
                    taskEditStates: newState.taskEditStates
                },
                action
            );
            break;
        }
        case ADD_TODO: {
            change = addTodo(
                {
                    todoList: newState.todoList,
                },
                action);
            break;
        }
        case ADD_CATEGORY: {
            change = addCategory(
                {
                    editCategoryName: newState.editCategoryName,
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action);
            break;
        }
        case EDIT_PARAMS_TODO: {
            change = editParams(
                {
                    todoList: newState.todoList,
                    taskEditStates: newState.taskEditStates,
                },
                action
            );
            break;
        }
        case EDIT_ADD_TODO_NAME: {
            change = editAddTodoName(
                {
                    addTodoName: newState.addTodoName,
                },
                action
            );
            break;
        }
        case EDIT_ADD_CATEGORY_NAME: {
            change = editAddCategoryName(
                {
                    editCategoryName: newState.editCategoryName,
                },
                action
            );
            break;
        }
        case EDIT_CATEGORY: {
            change = editCategory(
                {
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action
            );
            break;
        }
        case MODAL_OPEN: {
            change = modalOpen(
                {
                    modal: newState.modal,
                    editCategoryParentId: newState.editCategoryParentId,
                },
                action
            );
            break;
        }
        case MODAL_CLOSE: {
            change = modalClose(
                {
                    modal: newState.modal,
                },
                action
            );
            break;
        }
        default: {
            window.console.log(`UNKNOWN_TYPE`);
            change = {};
        }
    }
    newState = Object.assign({}, newState, change);
    sessionStorage.setItem('APP_STATE', JSON.stringify(newState));

    return newState;
};



// Combine Reducers
// const reducers = combineReducers({
//   userState: userReducer,
//   categoriesListState: categoriesReducer
// });

// const store = createStore(reducers);
const store = createStore(mySingleReduser);
export default store;