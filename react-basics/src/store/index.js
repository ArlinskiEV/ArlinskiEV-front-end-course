import { createStore, combineReducers } from 'redux';

import undoable from 'redux-undo';

import generateState from './generateState'; 


// Combine Reducers
import {todoReducer} from './reducers/todo';
import {categoryReducer} from './reducers/category';
import {filterReducer} from './reducers/filter';
import {modalReducer} from './reducers/modal';
import {searchReducer} from './reducers/search';
const reducers = combineReducers({
  todos: todoReducer,
  categories: categoryReducer,

  filter: filterReducer,
  modal: modalReducer,
  search: searchReducer,
});

// const store = createStore(reducers, generateState.init());




// const withUndo = combineReducers({
//     reducers: undoable(reducers),
// })
const store = createStore(undoable(reducers), generateState.init());





export default store;