import {
    TOGGLE_TODO,
    MOVE_TODO,
    ADD_TODO,
    EDIT_PARAMS_TODO,
    EDIT_ADD_TODO_NAME,
} from '../actions';


export const toggleTodo = function(state = {}, action) {
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
    
export const addTodo = function(state = {}, action) {
    // .todoList
    let change = {};
    if (action.type === ADD_TODO) {
        let nextId = state.todoList
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

    return Object.assign({}, state, change);
};


export const moveTodoInCategory = function(state = {}, action) {
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

export const editParams = function(state = {}, action) {
    // .todoList
    // .taskEditStates

    let change = {};

    if (action.type === EDIT_PARAMS_TODO) {
        let i = state.todoList.findIndex((item) => item.id === action.params[1]);
        if (i < 0) window.console.log('ERROR: NOT FOUNT TODO');
        
        let task = Object.assign({}, state.todoList[i]);
        let taskState  = Object.assign(
            {},
            task,
            state.taskEditStates[task.id]
        );

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
    }

    return Object.assign({}, state, change);
};

export const editAddTodoName = function(state = {}, action) {
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
