import {
    MODAL_OPEN,
    MODAL_CLOSE,
} from '../actions';


export const modalOpen = function(state = {}, action) {
    // .modal

    let change = {};
    if (action.type === MODAL_OPEN) {
        change = Object.assign(
            {},
            state,
            {
                open: true,
                type: action.field.type,
            }
        );

        switch (action.field.type) {
            case 'ADD': {
                Object.assign(
                    change,
                    {
                        parentId: action.field.parentId
                    }
                );
                break;
            }
            case 'EDIT': {
                Object.assign(
                    change,
                    {
                        parentId: action.field.id
                    }
                );
                break;
            }
            case 'CONFIRM': {
                break;
            }
            default: window.console.log(`ERROR: UNKNOWN MODAL TYPE: ${action.field.type}`);
        }

    }
    return Object.assign({}, state, change);
}
    
export const modalClose = function(state = {}, action) {
    // .modal
    let change = {};

    if (action.type === MODAL_CLOSE) {
        Object.assign(
            change,
            state,
            {
                open: false,
            }
        );
    }

    return Object.assign({},change);
}



export function modalReducer(state = {}, action) {
    switch (action.type) {
        case MODAL_OPEN: {
            return modalOpen(state, action);
        }
        case MODAL_CLOSE: {
            return modalClose(state, action);
        }
        default: return state;
    }
}