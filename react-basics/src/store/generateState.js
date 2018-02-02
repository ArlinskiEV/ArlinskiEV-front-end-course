export default class GenerateState {

    static generateCategoriesState(arr) {
        let newList = arr
            .sort((a, b) => b.id - a.id); // in order id desc
        let result =[]; // all for CategoryItem

        let array = newList
            .filter(item => item.parentId === 0) // all in root
            .map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    visible: true,
                    shift: 0,
                };
            });

        while (array.length) {
            let current = array.shift();
            array.unshift(...(newList
                .filter((item) => ((item.parentId === current.id) && (item.parentId !== item.id))) // all child of current
                .map((item) => { 
                    current.haveNested = true;
                    current.isOpen = true;
                    return {
                        id: item.id,
                        name: item.name,
                        visible: true,
                        shift: current.shift + 1,
                    };
                }) // with shift
            ));

            result.push(current);
        }
        // window.console.log(JSON.stringify(result));
        return result;
    }

    static showedCategory(id, prevList) {
        let newList = [...prevList];
        let i = newList.findIndex((item) => {
            return (item.id === id);
        });

        if (i < 0) window.console.log(`!!!!!!!!!!!!!! ERROR i=${i}!!!!!!!`);

        newList[i].isOpen = !newList[i].isOpen; //revers image
        let childVisible = newList[i].isOpen;
        let stack = [];

        for (let j = newList[i++].shift;(i< newList.length) && (newList[i].shift > j);i++) {

            if (newList[i].shift > newList[i - 1].shift) {
                stack.push(newList[i - 1].isOpen && newList[i - 1].visible);
            }

            if (newList[i].shift < newList[i - 1].shift) {
                stack.pop();
            }

            newList[i].visible = childVisible && !!stack[stack.length -1];
        }

        // window.console.log(`end: ${JSON.stringify(newList)}`);
        // window.console.log(newList);
        return (newList);

    }

    // static generateTodosState(arr) {
    //     return arr;
    // }

    static init() {

        let result = JSON.parse(sessionStorage.getItem('APP_STATE'));

        let categoryList = [
            {id:1, name:'Cat 1', parentId:0},
            {id:2, name:'Cat 2', parentId:0},
            {id:3, name:'Cat 2-1-1', parentId:7},
            {id:4, name:'Cat 3-1', parentId:8},
            {id:5, name:'Cat 3-2', parentId:8},
            {id:6, name:'Cat 3-3', parentId:8},
            {id:7, name:'Cat 2-1', parentId:2},
            {id:8, name:'Cat 3', parentId:0},
            {id:9, name:'Cat 2-1-1-1', parentId:3}
        ];
        let todoList = [
            {id:1, name:'Todo 1', text:'', completed: false, categoryId:1},
            {id:2, name:'Todo 2', text:'', completed: false, categoryId:2},
            {id:3, name:'Todo 3', text:'', completed: false, categoryId:3},
            {id:4, name:'Todo 4', text:'', completed: false, categoryId:4},
            {id:5, name:'Todo 5', text:'', completed: false, categoryId:5},
            {id:6, name:'Todo 6', text:'', completed: false, categoryId:6},
            {id:7, name:'Todo 7', text:'', completed: false, categoryId:7},
            {id:8, name:'Todo 8', text:'', completed: false, categoryId:8},
            {id:9, name:'Todo 9', text:'', completed: false, categoryId:1},
            {id:10, name:'Todo 9', text:'', completed: false, categoryId:10},
        ];

        result = result ? result : {
            todoList,
            taskEditStates: {},

            categoryList,
            editCategoryName: '',
            editCategoryParentId: 0,
            categoriesState: GenerateState.generateCategoriesState(categoryList),

            modal: {
                open: false,
                type: 'CONFIRM',
            },

            filter: {
                showDone: true,
            },

            search: {
                text: '',
                apply: false,
            },
        };

        sessionStorage.setItem('APP_STATE', JSON.stringify(result));

        return result;
    }

    

}