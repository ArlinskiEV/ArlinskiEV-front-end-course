/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const MOVE_TODO = 'MOVE_TODO';
export const EDIT_PARAMS_TODO = 'EDIT_PARAMS_TODO';
export const EDIT_ADD_TODO_NAME = 'EDIT_ADD_TODO_NAME';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

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
  return { type: ADD_TODO, field }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function moveTodo(task, category) {
  return {type: MOVE_TODO, todoId: task, categoryId: category}
}

export function editParamsTodo(params) {
  return { type: EDIT_PARAMS_TODO, params }
}

export function editAddTodoName(text) {
  return { type: EDIT_ADD_TODO_NAME, text}
}

export function toggleSubCategories(index) {
  return { type: TOGGLE_CATEGORY, index }
}

export function deleteCategory(id) {
  return {type: DELETE_CATEGORY, id}
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}