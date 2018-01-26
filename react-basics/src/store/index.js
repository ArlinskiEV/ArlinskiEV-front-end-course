// import { createStore, combineReducers } from 'redux';
import { createStore } from 'redux';
import generateState from './generateState'; 
import { TOGGLE_CATEGORY, TOGGLE_TODO } from './actions';


// The User Reducer
// const userReducer = function(state = {}, action) {
//     window.console.log(`a=${action}`);
//   return state;
// }



// The Categories Reducer
const categoriesReducer = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    // window.console.log(`categoriesReducer: type=${action.type}`);
    // window.console.log(`all_state=${JSON.stringify(state)}`);
    // let categoryList = state.categoryList;
    let prevCategoriesState = state.categoriesState
        ? state.categoriesState
        : generateState.generateCategoriesState(state.categoryList);

    let newCategoriesState = prevCategoriesState;
    if (action.type === TOGGLE_CATEGORY) {
        // window.console.log(`id=${action.index}`);
        // window.console.log(`state=${JSON.stringify(state)}`);
        // window.console.log(`prev=${JSON.stringify(prevCategoriesState)}`);
        newCategoriesState = generateState.showedCategory(action.index, prevCategoriesState);
    }
    
    newState.categoriesState = [...newCategoriesState];

    // window.console.log(`categoryReducer: newState=${JSON.stringify(newState)}`);
  return newState;
}


const toggleTodo = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));

    // window.console.log(`toggle todo: state=${JSON.stringify(state)}`);

    // window.console.log(`action.index = ${action.index}`);
    if (action.type === TOGGLE_TODO) {
        let i = newState.todoList.findIndex((item) => item.id === action.index);

        if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');

        // window.console.log(`i=${i}, before: compl=${newState.todosState[i].completed}`);
        newState.todoList[i].completed = ! newState.todoList[i].completed;
        newState.todosState[i].completed = ! newState.todosState[i].completed;
        // re-calculae progress-bar
        // window.console.log(`i=${i}, after: compl=${newState.todosState[i].completed}`);
    }
    // window.console.log(`toggle todo: newState=${JSON.stringify(newState)}`);
    return newState;
};

// Combine Reducers
// const reducers = combineReducers({
//   userState: userReducer,
//   categoriesListState: categoriesReducer
// });
// window.console.log(`redusers=${reducers}`);



// My single Reduser
const mySingleReduser = function(state = {}, action) {

    let newState = Object.assign({}, state);

    window.console.log(`TYPE: ${action.type}`);
    switch (action.type) {
        case '@@redux/INIT': {
            let change = generateState.init();
            Object.assign(newState, change);
            break;
        }
        case TOGGLE_CATEGORY: {
            let change = categoriesReducer(
                {
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action
            );
            Object.assign(newState, change);
            break;
        }
        case TOGGLE_TODO: {
            let change = toggleTodo(
                {
                    todoList: newState.todoList,
                    todosState: newState.todosState,
                },
                action);
            Object.assign(newState, change);
            break;
        }
        default: window.console.log(`UNKNOWN_TYPE`);
    }
    sessionStorage.setItem('APP_STATE', JSON.stringify(newState));
    return newState;
};


// const store = createStore(reducers);
const store = createStore(mySingleReduser);
export default store;