// import { createStore, combineReducers } from 'redux';
import { createStore } from 'redux';
import generateState from './generateState'; 
import {
    TOGGLE_CATEGORY,
    DELETE_CATEGORY,
    TOGGLE_TODO,
    MOVE_TODO,
    ADD_TODO,
    EDIT_PARAMS_TODO,
    EDIT_ADD_TODO_NAME,
    EDIT_ADD_CATEGORY_NAME,
    EDIT_CATEGORY,
    MODAL_OPEN,
    MODAL_CLOSE,
    ADD_CATEGORY,
} from './actions';


const toggleCategory = function(state = {}, action) {
// .categoriesState
    let prevCategoriesState = state.categoriesState
        ? state.categoriesState
        : generateState.generateCategoriesState(state.categoryList);

    let newCategoriesState = prevCategoriesState;
    if (action.type === TOGGLE_CATEGORY) {
        newCategoriesState = generateState.showedCategory(action.index, prevCategoriesState);
    }

  return Object.assign(
      {},
      state,
      {
        categoriesState: [...newCategoriesState],
      }
    );
}

const deleteCategory = function(state = {}, action) {
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
                haveNested: (change.categoriesState[i - 1].shift < change.categoriesState[i].shift),
            }
        );
    }
    return Object.assign({}, state, change);
}

const toggleTodo = function(state = {}, action) {
// .todoList
// .taskEditState
    let change = {};
    if (action.type === TOGGLE_TODO) {
        let i = state.todoList.findIndex((item) => item.id === action.index);

        if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');

        change = {
                todoList: state.todoList.map((item, index) => {
                    if (index !== i) return item;
                    return Object.assign({}, item, {completed: !item.completed});
                }),
            };

        if (state.taskEditStates[action.index]) {
            change.taskEditStates = Object.assign(
                {},
                state.taskEditStates,
                {
                    [action.index]: Object.assign(
                        {},
                        state.taskEditStates[action.index],
                        {
                            completed: change.todoList[i].completed,
                        }
                    ),
                }
            );
        }
    }
    return Object.assign({}, state, change);
};

const addTodo = function(state = {}, action) {
// .todoList
    let nextId = state.todoList
        .reduce(
            (prev, item) => item.id > prev
                ? item.id
                : prev,
            0
        )
        + 1;

    return Object.assign(
        {},
        state,
        {
            todoList: [
                ...state.todoList,
                {
                    id: nextId,
                    name: action.field.name,
                    text: '',
                    completed: false,
                    categoryId: action.field.category
                },
            ],
        }
    );
}

const addCategory = function(state = {}, action) {
// .categoryList
// .categoriesState
    let nextId = state.categoryList
        .reduce(
            (prev, item) => item.id > prev
                ? item.id
                : prev,
            0
        )
        + 1;

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

    return Object.assign(
        {},
        state,
        {
            categoryList: [
                ...state.categoryList,
                {
                    id: nextId,
                    name: action.field.name,
                    parentId: action.field.parentId,
                }
            ],
            categoriesState: [...newCategoriesState],
        }
    );
}

const moveTodoInCategory = function(state = {}, action) {
// .todoList
// .taskEditStates
    let newTodoList = [...state.todoList];
    let changeTaskEditState = {};
    if (action.type === MOVE_TODO) {
        let i = state.todoList.findIndex((item) => item.id === action.todoId);

        if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');

        newTodoList = state.todoList.map((item, index) => {
            if (index !== i) return item;
            return Object.assign(
                {},
                item,
                {
                    categoryId: action.categoryId,
                }
            );
        });

        if (state.taskEditStates[action.todoId]) {
            changeTaskEditState = Object.assign(
                {},
                {
                    [action.todoId]: {categoryId: action.categoryId}
                }
            );
        }
    }
    return Object.assign(
        {},
        state,
        {
            todoList: [...newTodoList],
            taskEditStates: Object.assign(
                {},
                state.taskEditStates,
                changeTaskEditState
            ),
        }
    );
};

const editParams = function(state = {}, action) {
// .todoList
// .taskEditStates

    let i = state.todoList.findIndex((item) => item.id === action.params[1]);
    if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');
    
    let task = Object.assign({}, state.todoList[i]);
    let taskState  = Object.assign(
        {},
        task,
        state.taskEditStates[task.id]
    );

    let change = {};

    switch (action.params[0]) {
        case 'name': {
            Object.assign(taskState,{name: action.params[2]});
            break;
        }
        case 'text': {
            Object.assign(taskState,{text: action.params[2]});
            break;
        }
        case 'toggle': {
            Object.assign(taskState,{completed: !taskState.completed});
            break;
        }
        case 'save': {
            Object.assign(
                change,
                {
                    todoList: state.todoList.map((item, index) => {
                        if (index !== i) return item;
                        return Object.assign({}, taskState);
                    }),
                }
            );
            break;
        }
        case 'cansel': {
            taskState = Object.assign({}, task);
            break;
        }
    }
    Object.assign(
        change,
        {
            taskEditStates: {
                [action.params[1]]: taskState,
            }
        }
    );
    return Object.assign({}, state, change);
};

const editAddTodoName = function(state = {}, action) {
// .addTodoName
    let change = {};

    if (action.type === EDIT_ADD_TODO_NAME) {
        Object.assign(
            change,
            {
                addTodoName: action.text,
            }
        );
    }

    return Object.assign({}, state, change);
}

const editAddCategoryName = function(state = {}, action) {
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

const editCategory = function(state = {}, action) {
// .caegoryList
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

const modalOpen = function(state = {}, action) {
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
                    editCategoryParentId: action.field.parentId,
                });
                break;
            }
            case 'EDIT': {
                Object.assign(change, {
                    editCategoryParentId: action.field.id,
                });
                break;
            }
            default: window.console.log('ERROR: UNKNOWN MODAL TYPE');
        }

    }
    return Object.assign({}, state, change);
}

const modalClose = function(state = {}, action) {
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


// My single Reduser
const mySingleReduser = function(state = {}, action) {
    let newState = Object.assign({}, state);
    let change = {};

    window.console.log(`TYPE: ${action.type}`);
    switch (action.type) {
        case '@@redux/INIT': {
            change = generateState.init();
            break;
        }
        case TOGGLE_CATEGORY: {
            change = toggleCategory(
                {
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action
            );
            break;
        }
        case DELETE_CATEGORY: {
            change = deleteCategory(
                {
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action);
            break;
        }
        case TOGGLE_TODO: {
            change = toggleTodo(
                {
                    todoList: newState.todoList,
                    taskEditStates: newState.taskEditStates
                },
                action
            );
            break;
        }
        case MOVE_TODO: {
            change = moveTodoInCategory(
                {
                    todoList: newState.todoList,
                    taskEditStates: newState.taskEditStates
                },
                action
            );
            break;
        }
        case ADD_TODO: {
            change = addTodo(
                {
                    todoList: newState.todoList,
                },
                action);
            break;
        }
        case ADD_CATEGORY: {
            change = addCategory(
                {
                    editCategoryName: newState.editCategoryName,
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action);
            break;
        }
        case EDIT_PARAMS_TODO: {
            change = editParams(
                {
                    todoList: newState.todoList,
                    taskEditStates: newState.taskEditStates,
                },
                action
            );
            break;
        }
        case EDIT_ADD_TODO_NAME: {
            change = editAddTodoName(
                {
                    addTodoName: newState.addTodoName,
                },
                action
            );
            break;
        }
        case EDIT_ADD_CATEGORY_NAME: {
            change = editAddCategoryName(
                {
                    editCategoryName: newState.editCategoryName,
                },
                action
            );
            break;
        }
        case EDIT_CATEGORY: {
            change = editCategory(
                {
                    categoryList: newState.categoryList,
                    categoriesState: newState.categoriesState,
                },
                action
            );
            break;
        }
        case MODAL_OPEN: {
            change = modalOpen(
                {
                    modal: newState.modal,
                    editCategoryParentId: newState.editCategoryParentId,
                },
                action
            );
            break;
        }
        case MODAL_CLOSE: {
            change = modalClose(
                {
                    modal: newState.modal,
                },
                action
            );
            break;
        }
        default: {
            window.console.log(`UNKNOWN_TYPE`);
            change = {};
        }
    }
    newState = Object.assign({}, newState, change);
    sessionStorage.setItem('APP_STATE', JSON.stringify(newState));

    return newState;
};



// Combine Reducers
// const reducers = combineReducers({
//   userState: userReducer,
//   categoriesListState: categoriesReducer
// });
// window.console.log(`redusers=${reducers}`);

// const store = createStore(reducers);
const store = createStore(mySingleReduser);
export default store;