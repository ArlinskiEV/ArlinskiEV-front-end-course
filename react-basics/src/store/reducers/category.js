import {
    TOGGLE_CATEGORY,
    DELETE_CATEGORY,
    EDIT_ADD_CATEGORY_NAME,
    EDIT_CATEGORY,
    ADD_CATEGORY,
} from '../actions';

import generateState from '../generateState'; 

export const toggleCategory = function(state = {}, action) {
    // .categoriesState

    let newCategoriesState = state.categoriesState
        ? state.categoriesState
        : generateState.generateCategoriesState(state.categoryList);

    if (action.type === TOGGLE_CATEGORY) {
        newCategoriesState = generateState.showedCategory(action.index, newCategoriesState);
    }

  return Object.assign(
      {},
      state,
      {
        categoriesState: [...newCategoriesState],
      }
    );
}

export const deleteCategory = function(state = {}, action) {
    // .categoriesState
    // .categoryList
    let change = {};

    if (action.type === DELETE_CATEGORY) {
        let shift = 0;
        let i = state.categoriesState
            .findIndex((item) => {
                if (item.id === action.id) shift = item.shift;
                return item.id === action.id;
            });

        let delArr = [action.id];
        for (let j = i + 1; (j < state.categoriesState.length) && (shift < state.categoriesState[j].shift); j++) {
            delArr.push(state.categoriesState[j].id);
        }

        change.categoryList = state.categoryList
            .filter((item) => delArr.indexOf(item.id) === -1);
        change.categoriesState = state.categoriesState
            .filter((item) => delArr.indexOf(item.id) === -1);

        if (i > 0) change.categoriesState[i - 1] = Object.assign(
            {},
            change.categoriesState[i - 1],
            {
                haveNested: (i !== change.categoriesState.length) && (change.categoriesState[i - 1].shift < change.categoriesState[i].shift),
            }
        );
    }
    return Object.assign({}, state, change);
}

export const addCategory = function(state = {}, action) {
    // .categoryList
    // .categoriesState
    let change = {};

    if (action.type === ADD_CATEGORY) {
        let nextId = state.categoryList
            .reduce(
                (prev, item) => item.id > prev
                    ? item.id
                    : prev,
                0
            )
            + 1;

        Object.assign(
            change,
            {
                categoryList: [
                    ...state.categoryList,
                    {
                        id: nextId,
                        name: action.field.name,
                        parentId: action.field.parentId,
                    }
                ],
            }
        );

        let newCategoriesState = [];
        if (action.field.parentId === 0) {
            newCategoriesState = [
                {
                    id: nextId,
                    name: action.field.name,
                    visible: true,
                    shift: 0,
                },
                ...state.categoriesState
            ];
        } else {
            let i = state.categoriesState
                .findIndex((item) => item.id === action.field.parentId);
            
            newCategoriesState = state.categoriesState.map((item, index) => {
                if (index !== i) return item;
                return Object.assign(
                    {},
                    item,
                    {
                        haveNested: true,
                    }
                );
            });

            newCategoriesState = [
                ...(newCategoriesState.slice(0, i + 1)),
                {
                    id: nextId,
                    name: action.field.name,
                    visible: newCategoriesState[i].visible && newCategoriesState[i].isOpen,
                    shift: newCategoriesState[i].shift + 1,
                },
                ...(newCategoriesState.slice(i + 1))
            ];
        }

        Object.assign(
            change,
            {
                categoriesState: [...newCategoriesState],
            }
        );
    }

    return Object.assign({}, state, change);
}


export const editAddCategoryName = function(state = {}, action) {
// .editCategoryName
    let change = {};

    if (action.type === EDIT_ADD_CATEGORY_NAME) {
        Object.assign(
            change,
            {
                editCategoryName: action.text,
            }
        );
    }

    return Object.assign({}, state, change);
}

export const editCategory = function(state = {}, action) {
// .categoryList
// .categoriesState
    let change = {};
    if (action.type === EDIT_CATEGORY) {
        // field={name:'',id:0}
        let i = state.categoryList
            .findIndex((item) => item.id === action.field.id);
        change.categoryList = state.categoryList.map((item, index) => {
            if (index !== i) return item;
            return Object.assign({}, item, {name: action.field.name});
        });

        i = state.categoriesState
            .findIndex((item) => item.id === action.field.id);
        change.categoriesState = state.categoriesState.map((item, index) => {
            if (index !== i) return item;
            return Object.assign({}, item, {name: action.field.name});
        });
    }

    return Object.assign({}, state, change);
}




export function categoryReducer(state = {}, action) {
    switch (action.type) {
        case TOGGLE_CATEGORY: {
            return toggleCategory(state, action);
        }
        case DELETE_CATEGORY: {
            return deleteCategory(state, action);
        }
        case ADD_CATEGORY: {
            return addCategory(state, action);
        }
        case EDIT_ADD_CATEGORY_NAME: {
            return editAddCategoryName(state, action);
        }
        case EDIT_CATEGORY: {
            return editCategory(state, action);
        }
        default: return state;
    }
}