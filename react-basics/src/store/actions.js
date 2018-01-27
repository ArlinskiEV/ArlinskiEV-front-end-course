/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const MOVE_TODO = 'MOVE_TODO';
export const EDIT_PARAMS_TODO = 'EDIT_PARAMS_TODO';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
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

export function addTodo(text) {
  return { type: ADD_TODO, text }
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

export function toggleSubCategories(index) {
  return { type: TOGGLE_CATEGORY, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}