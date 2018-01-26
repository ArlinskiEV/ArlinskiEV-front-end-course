export default class GenerateState {

    static generateCategoriesState(arr) {
        let newList = arr.map((item) => item).sort((a, b) => {return (b.id - a.id);}); // in order id
        let result =[]; // all for CategoryItem

        let array = newList
            .filter((item) => {
                return (item.parentId === 0);
            }) // all in root
            .map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    visible: true,
                    shift: 0,
                };
            });

        while (array.length) {
            let current = array.pop();
            array.push(...(newList
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

    static generateTodosState(arr) {
        return arr;
    }

    

}