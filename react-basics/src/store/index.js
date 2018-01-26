import { createStore, combineReducers } from 'redux';
// import  from './actions';
import generateState from './generateState'; 
// The User Reducer
const userReducer = function(state = {}, action) {
    window.console.log(`a=${action}`);
  return state;
}

// The Categories Reducer
const categoriesReducer = function(state = {}, action) {
    window.console.log(`a=${action.type}`);
    window.console.log(`all_state=${JSON.stringify(state)}`);
    // let categoryList = state.categoryList;
    let categoryList = [
        {id:1, name:'Cat 1', parentId:0},
        {id:2, name:'Cat 2', parentId:0},
        {id:8, name:'Cat 3', parentId:0},
        {id:4, name:'Cat 3-1', parentId:8},
        {id:5, name:'Cat 3-2', parentId:8},
        {id:6, name:'Cat 3-3', parentId:8},
        {id:7, name:'Cat 2-1', parentId:2},
        {id:3, name:'Cat 2-1-1', parentId:7},
        {id:9, name:'Cat 2-1-1-1', parentId:3}
    ];
    let prevCategoriesState = state.categoriesState
        ? state.categoriesState
        : generateState.generate(categoryList);

    let newCategoriesState = prevCategoriesState;
    if (action.type === 'TOGGLE_CATEGORY') {
        // window.console.log(`id=${action.index}`);
        // window.console.log(`state=${JSON.stringify(state)}`);
        // window.console.log(`prev=${JSON.stringify(prevCategoriesState)}`);
        newCategoriesState = generateState.showed(action.index, prevCategoriesState);
    }
    
    let newState = Object.assign(
        {},
        state,
        {categoriesState: [...newCategoriesState]}
    );
    window.console.log(`newState=${JSON.stringify(newState)}`);
  return newState;
}

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
  categoriesListState: categoriesReducer
});

const store = createStore(reducers);
export default store;