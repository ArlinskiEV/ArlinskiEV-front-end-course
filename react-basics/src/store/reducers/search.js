import {
    EDIT_SEARCH_FIELD,
    APPLY_SEARCH,
} from '../actions';

export function editSearchTodo(state = {}, action) {
    // .search
    let change = {};
    if (action.type === EDIT_SEARCH_FIELD) {
        Object.assign(
            change,
            {
                text: action.text,
            }
        );
    }
    return Object.assign({}, state, change);
}

export function enableSearch(state = {}, action) {
    // .search
    let change = {};
    if (action.type === APPLY_SEARCH) {
        Object.assign(
            change,
            {
                apply: action.value,
            }
        );
    }
    return Object.assign({}, state, change);
}




export function searchReducer(state = {}, action) {
    switch (action.type) {
        case EDIT_SEARCH_FIELD: {
            return editSearchTodo(state, action);
        }
        case APPLY_SEARCH: {
            return enableSearch(state, action);
        }
        default: return state;
    }
}