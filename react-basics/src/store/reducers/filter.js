import {
    TOGGLE_FILTER,
} from '../actions';

export function toggleFilter(state = {}, action) {
    // .filter
    let change = {};
    if (action.type === TOGGLE_FILTER) {
        Object.assign(
            change,
            {
                showDone: !state.showDone,
            }
        );
    }
    return Object.assign({}, state, change);
}


export function filterReducer(state = {}, action) {
    switch (action.type) {
        case TOGGLE_FILTER: {
            return toggleFilter(state, action);
        }
        default: return state;
    }
}