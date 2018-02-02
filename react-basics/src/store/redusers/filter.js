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
                filter: Object.assign(
                    {},
                    state.filter,
                    {
                        showDone: state.filter
                            ? !state.filter.showDone
                            : true,
                    }),
            }
        );
    }
    return Object.assign({}, state, change);
}