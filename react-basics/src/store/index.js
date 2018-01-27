// import { createStore, combineReducers } from 'redux';
import { createStore } from 'redux';
import generateState from './generateState'; 
import { TOGGLE_CATEGORY, TOGGLE_TODO, EDIT_PARAMS_TODO } from './actions';


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

    if (action.type === TOGGLE_TODO) {
        let i = newState.todoList.findIndex((item) => item.id === action.index);

        if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');

        newState.todoList[i].completed = ! newState.todoList[i].completed;
    }
    return newState;
};


const editParams = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    // action = {type, params = [action = text, task-id, value = e]}
    // action={"type":"EDIT_PARAMS_TODO","params":["name",1,"Todo 15"]}

    let i = newState.todoList.findIndex((item) => item.id === action.params[1]);
    if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');
    let task = newState.todoList[i];

    newState.taskEditStates[task.id] = Object.assign(
        {},
        task,
        newState.taskEditStates[task.id]
    );

    switch (action.params[0]) {
        case 'name': {
            newState.taskEditStates[task.id].name = action.params[2];
            break;
        }
        case 'text': {
            newState.taskEditStates[task.id].text = action.params[2];
            break;
        }
        case 'toggle': {
            newState.taskEditStates[task.id].completed = ! newState.taskEditStates[task.id].completed;
            break;
        }
        case 'save': {
            newState.todoList[i] = newState.taskEditStates[task.id];
            window.console.log(`save - toggle?....`);
            break;
        }
        case 'cansel': {
            newState.taskEditStates[task.id] = task;
            break;
        }
    }
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
            newState = Object.assign({}, newState, change);
            break;
        }
        case TOGGLE_TODO: {
            let change = toggleTodo(
                {
                    todoList: newState.todoList,
                    // todosState: newState.todosState,
                },
                action
            );
            newState = Object.assign({}, newState, change);
            break;
        }
        case EDIT_PARAMS_TODO: {
            let change = editParams(
                {
                    todoList: newState.todoList,
                    taskEditStates: newState.taskEditStates,
                },
                action
            );
            newState = Object.assign({}, newState, change);
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