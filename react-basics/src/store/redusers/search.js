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
                search: Object.assign(
                    {},
                    state.search,
                    {
                        text: action.text
                    }
                ),
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
                search: Object.assign(
                    {},
                    state.search,
                    {
                        apply: action.value,
                    }
                ),
            }
        );
    }
    return Object.assign({}, state, change);
}