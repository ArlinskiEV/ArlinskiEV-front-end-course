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
    window.console.log(`categoriesReducer: type=${action.type}`);
    window.console.log(`all_state=${JSON.stringify(state)}`);
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

    window.console.log(`categoryReducer: newState=${JSON.stringify(newState)}`);
  return newState;
}


const toggleTodo = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));

    window.console.log(`toggle todo: state=${JSON.stringify(state)}`);

    window.console.log(`action.index = ${action.index}`);
    if (action.type === TOGGLE_TODO) {
        let i = newState.todoList.findIndex((item) => item.id === action.index);

        if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');

        window.console.log(`i=${i}, before: compl=${newState.todosState[i].completed}`);
        newState.todoList[i].completed = ! newState.todoList[i].completed;
        newState.todosState[i].completed = ! newState.todosState[i].completed;
        // re-calculae progress-bar
        window.console.log(`i=${i}, after: compl=${newState.todosState[i].completed}`);
    }
    window.console.log(`toggle todo: newState=${JSON.stringify(newState)}`);
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
    let categoryList = [
        {id:1, name:'Cat 1', parentId:0},
        {id:2, name:'Cat 2', parentId:0},
        {id:3, name:'Cat 2-1-1', parentId:7},
        {id:4, name:'Cat 3-1', parentId:8},
        {id:5, name:'Cat 3-2', parentId:8},
        {id:6, name:'Cat 3-3', parentId:8},
        {id:7, name:'Cat 2-1', parentId:2},
        {id:8, name:'Cat 3', parentId:0},
        {id:9, name:'Cat 2-1-1-1', parentId:3}
    ];
    let todoList = [
        {id:1, name:'Todo 1', completed: false, categoryId:1},
        {id:2, name:'Todo 2', completed: false, categoryId:2},
        {id:3, name:'Todo 3', completed: false, categoryId:3},
        {id:4, name:'Todo 4', completed: false, categoryId:4},
        {id:5, name:'Todo 5', completed: false, categoryId:5},
        {id:6, name:'Todo 6', completed: false, categoryId:6},
        {id:7, name:'Todo 7', completed: false, categoryId:7},
        {id:8, name:'Todo 8', completed: false, categoryId:8},
        {id:9, name:'Todo 9', completed: false, categoryId:1},
    ];


    let newState = Object.assign({}, state);

    // ----------------for default
    if (!newState.categoryList) {
        Object.assign(newState, {
            categoryList: categoryList,
        })
    }
    if (!newState.todoList) {
        Object.assign(newState, {
            todoList: todoList,
        })
    }
    if (!newState.categoriesState) {
        Object.assign(newState, {
            categoriesState: generateState.generateCategoriesState(newState.categoryList),
        }
        )
    }
    if (!newState.todosState) {
        Object.assign(newState, {
            todosState: generateState.generateTodosState(newState.todoList),
        }
        )
    }


    switch (action.type) {
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
                window.console.log(`change=${JSON.stringify(change)}`);
            Object.assign(newState, change);
            break;
        }
        default: window.console.log(`UNKNOWN_TYPE: ${action.type}`);
    }
    return newState;
};


// const store = createStore(reducers);
const store = createStore(mySingleReduser);
export default store;