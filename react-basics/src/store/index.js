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
    let newState = JSON.parse(JSON.stringify(state));

    let prevCategoriesState = state.categoriesState
        ? state.categoriesState
        : generateState.generateCategoriesState(state.categoryList);

    let newCategoriesState = prevCategoriesState;
    if (action.type === TOGGLE_CATEGORY) {
        newCategoriesState = generateState.showedCategory(action.index, prevCategoriesState);
    }
    
    newState.categoriesState = [...newCategoriesState];

  return newState;
}

const deleteCategory = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === DELETE_CATEGORY) {
        let shift = 0;
        let i = newState.categoriesState
            .findIndex((item) => {
                if (item.id === action.id) shift = item.shift;
                return item.id === action.id;
            });
        let delArr = [action.id];
        for (let j = i + 1; (j < newState.categoriesState.length) && (shift < newState.categoriesState[j].shift); j++) {
            delArr.push(newState.categoriesState[j].id);
        }

        newState.categoryList = newState.categoryList
            .filter((item) => delArr.indexOf(item.id) === -1);
        newState.categoriesState = newState.categoriesState
            .filter((item) => delArr.indexOf(item.id) === -1);

        newState.categoriesState[i - 1].haveNested = (newState.categoriesState[i - 1].shift < newState.categoriesState[i].shift);
    }
    return newState;
}

const toggleTodo = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));

    if (action.type === TOGGLE_TODO) {
        let i = newState.todoList.findIndex((item) => item.id === action.index);

        if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');

        newState.todoList[i].completed = ! newState.todoList[i].completed;
        if (newState.taskEditStates[action.index]) {
            newState.taskEditStates[action.index].completed = newState.todoList[i].completed;
        }
    }
    return newState;
};

const addTodo = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    let nextId = newState.todoList
        .reduce(
            (prev, item) => item.id > prev
                ? item.id
                : prev,
            0
        )
        + 1;
    newState.todoList = [
        ...newState.todoList,
        {
            id: nextId,
            name: action.field.name,
            text: '',
            completed: false,
            categoryId: action.field.category
        },
    ];
    return newState
}

const addCategory = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    let nextId = newState.categoryList
        .reduce(
            (prev, item) => item.id > prev
                ? item.id
                : prev,
            0
        )
        + 1;
    newState.categoryList = [
        ...newState.categoryList,
        {
            id: nextId,
            name: action.field.name,
            parentId: action.field.parentId,
        }
    ];

    if (action.field.parentId === 0) {
        newState.categoriesState.unshift(
            {
                id: nextId,
                name: action.field.name,
                visible: true,
                shift: 0,
            }
        );
    } else {
        let i = newState.categoriesState
            .findIndex((item) => item.id === action.field.parentId);
        newState.categoriesState[i].haveNested = true;
        newState.categoriesState = [
            ...(newState.categoriesState.slice(0, i + 1)),
            {
                id: nextId,
                name: action.field.name,
                visible: newState.categoriesState[i].visible && newState.categoriesState[i].isOpen,
                shift: newState.categoriesState[i].shift + 1,
            },
            ...(newState.categoriesState.slice(i + 1))
        ];
    }

    return newState;
}

const moveTodoInCategory = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === MOVE_TODO) {
        // window.console.log(`move: action=${JSON.stringify(action)}`);
        let i = newState.todoList.findIndex((item) => item.id === action.todoId);

        if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');

        newState.todoList[i].categoryId = action.categoryId;
        if (newState.taskEditStates[action.todoId]) {
            newState.taskEditStates[action.todoId].categoryId = action.categoryId;
        }
    }
    return newState;
};

const editParams = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    let i = newState.todoList.findIndex((item) => item.id === action.params[1]);
    if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');
    let task = newState.todoList[i];

    newState.taskEditStates[task.id] = Object.assign(
        {},
        task,
        newState.taskEditStates[task.id]
    );

    switch (action.params[0]) {
        case 'name': {
            newState.taskEditStates[task.id].name = action.params[2];
            break;
        }
        case 'text': {
            newState.taskEditStates[task.id].text = action.params[2];
            break;
        }
        case 'toggle': {
            newState.taskEditStates[task.id].completed = ! newState.taskEditStates[task.id].completed;
            break;
        }
        case 'save': {
            newState.todoList[i] = newState.taskEditStates[task.id];
            window.console.log(`save - toggle?....`);
            break;
        }
        case 'cansel': {
            newState.taskEditStates[task.id] = task;
            break;
        }
    }
    return newState;
};

const editAddTodoName = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === EDIT_ADD_TODO_NAME) {
        newState.addTodoName = action.text;
    }
    return newState;
}

const editAddCategoryName = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === EDIT_ADD_CATEGORY_NAME) {
        newState.editCategoryName = action.text;
    }
    return newState;
}

const editCategory = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === EDIT_CATEGORY) {
        // field={name:'',id:0}
        let i = newState.categoryList
            .findIndex((item) => item.id === action.field.id);
        newState.categoryList[i].name = action.field.name;
        i = newState.categoriesState
            .findIndex((item) => item.id === action.field.id);
        newState.categoriesState[i].name = action.field.name;
    }
    return newState;
}

const modalOpen = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === MODAL_OPEN) {
        Object.assign(newState.modal,{open: true});
        newState.modal.type = action.field.type;
        if (action.field.type === 'ADD') {
            newState.editCategoryParentId = action.field.parentId;
        }
        if (action.field.type === 'EDIT') {
            newState.editCategoryParentId = action.field.id;
        }
    }
    return newState;
}

const modalClose = function(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === MODAL_CLOSE) {
        Object.assign(newState.modal,{open: false});
    }
    return newState;
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