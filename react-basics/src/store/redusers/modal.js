import {
    MODAL_OPEN,
    MODAL_CLOSE,
} from '../actions';


export const modalOpen = function(state = {}, action) {
    // .modal
    // .editCategoryParentId

    let change = {};
    if (action.type === MODAL_OPEN) {
        Object.assign(
            change,
            {
                modal: Object.assign(
                    {},
                    state.modal,
                    {
                        open: true,
                        type: action.field.type,
                    }
                ),
            }
        );

        switch (action.field.type) {
            case 'ADD': {
                Object.assign(change, {
                    modal: Object.assign(
                        {},
                        change.modal,
                        {
                            parentId: action.field.parentId
                        }
                    ),
                });
                break;
            }
            case 'EDIT': {
                Object.assign(change, {
                    modal: Object.assign(
                        {},
                        change.modal,
                        {
                            parentId: action.field.id
                        }
                    ),
                });
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
            {
                modal: Object.assign(
                    {},
                    state.modal,
                    {
                        open: false,
                    }
                ),
            }
        );
    }

    return Object.assign({},change);
}