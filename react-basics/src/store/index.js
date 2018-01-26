// import { createStore, combineReducers } from 'redux';
import { createStore } from 'redux';
// import  from './actions';
import generateState from './generateState'; 


// The User Reducer
// const userReducer = function(state = {}, action) {
//     window.console.log(`a=${action}`);
//   return state;
// }



// The Categories Reducer
const categoriesReducer = function(state = {}, action) {
    window.console.log(`a=${action.type}`);
    window.console.log(`all_state=${JSON.stringify(state)}`);
    // let categoryList = state.categoryList;
    let prevCategoriesState = state.categoriesState
        ? state.categoriesState
        : generateState.generate(state.categoryList);

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
        {id:8, name:'Cat 3', parentId:0},
        {id:4, name:'Cat 3-1', parentId:8},
        {id:5, name:'Cat 3-2', parentId:8},
        {id:6, name:'Cat 3-3', parentId:8},
        {id:7, name:'Cat 2-1', parentId:2},
        {id:3, name:'Cat 2-1-1', parentId:7},
        {id:9, name:'Cat 2-1-1-1', parentId:3}
    ];


    // ----------------for default
    let newState = Object.assign({}, state);
    if (!newState.categoryList) {
        Object.assign(newState, {
            categoryList: categoryList,
        })
    }
    if (!newState.categoriesState) {
        Object.assign(newState, {
            categoriesState: generateState.generate(newState.categoryList),
        }
        )
    }


    switch (action.type) {
        case 'TOGGLE_CATEGORY': {
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
        default: window.console.log(`UNKNOWN_TYPE: ${action.type}`);
    }
    return newState;
};


// const store = createStore(reducers);
const store = createStore(mySingleReduser);
export default store;