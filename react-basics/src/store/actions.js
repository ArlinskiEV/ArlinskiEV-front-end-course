/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const MOVE_TODO = 'MOVE_TODO';
export const EDIT_PARAMS_TODO = 'EDIT_PARAMS_TODO';
export const EDIT_ADD_TODO_NAME = 'EDIT_ADD_TODO_NAME';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_ADD_CATEGORY_NAME = 'EDIT_ADD_CATEGORY_NAME';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const EDIT_SEARCH_FIELD = 'EDIT_SEARCH_FIELD';
export const APPLY_SEARCH = 'APPLY_SEARCH';
/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTodo(field) {
  // field = {name: 'todoName', category: id}
  return { type: ADD_TODO, field };
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index };
}

export function moveTodo(task, category) {
  return {type: MOVE_TODO, todoId: task, categoryId: category};
}

export function editParamsTodo(params) {
  return { type: EDIT_PARAMS_TODO, params };
}

export function editAddTodoName(text) {
  return { type: EDIT_ADD_TODO_NAME, text};
}







export function addCategory(field) {
  // field = {name: 'CategoryName', parentId: id || 0}
  return { type: ADD_CATEGORY, field };
}

export function editAddCategoryName(text) {
  return { type: EDIT_ADD_CATEGORY_NAME, text};
}

export function editCategory(field) {
  // field={name:'',id:0}
  return { type: EDIT_CATEGORY, field};
}

export function toggleSubCategories(index) {
  return { type: TOGGLE_CATEGORY, index };
}

export function deleteCategory(id) {
  return {type: DELETE_CATEGORY, id};
}





export function modalOpen(field) {
  // field = {type:'text', -/parentId/Id}
  return {type: MODAL_OPEN, field};
}

export function modalClose() {
  return {type: MODAL_CLOSE};
}





export function toggleFilter() {
  return {type: TOGGLE_FILTER};
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}




export function editSearh(text) {
  return {type: EDIT_SEARCH_FIELD, text};
}

export function applySearh(value) {
  return {type: APPLY_SEARCH, value};
}