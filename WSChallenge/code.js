const ws = new WebSocket('ws://188.166.46.38');
ws.binaryType = 'arraybuffer';

ws.onopen = function() {
    ws.send(`{ "name":"ArlinskiEV", "command": "challenge accepted" }`);
};

let myToken = null;
ws.onmessage = function(event) {
    let incomingMessage = event.data;
    console.log(`server:${incomingMessage}`);
    let obj = JSON.parse(incomingMessage);

    switch (obj.message) {
        case 'You successfully accept challenge':
            myToken = obj.token;
            console.log('myToken='+myToken);
            next(obj.next);
            break;
        case 'You solve task':
            next(obj.nextTask);
            break;
        default://task
            console.log(`task`);
            switch (obj.name) {
                case 'arithmetic':
                    taskArithmetic(obj.task);
                    break;
                case 'binary_arithmetic':
                    taskBinaryArithmetic(obj.task);
                    break;
                default://win
                    console.log('WIN:'+obj);
            }
    }
};

/*{ token: my_saved_token,
command: saved_next_task_name }*/
function next(message) {
    console.log(`next:`);
    console.log(`{"token": "${myToken}", "command":"${message === 'win' ? win_command : message}"}`);
    ws.send(`{"token": "${myToken}", "command":"${message === 'win' ? win_command : message}"}`);
};

function taskArithmetic(task) {
/*"task":{"sign": OPERATION ,"values": ARRAY}*/
    function basicOp(operation, value1, value2) {
        let operationFunctions = {
            '+': function(x, y) {return x + y;},
            '-': function(x, y) {return x - y;},
            '*': function(x, y) {return x * y;},
            '/': function(x, y) {return x / y;}
        };
        return operationFunctions[operation](value1,value2);
    }
    console.log(`arithmetic, task=${task}`);
    let values = task.values;
    console.log(`values:${values}`);
    let result = values.shift();
    while (values.length) {
        result = basicOp(task.sign, result, values.shift());
        console.log(`result=${result}`);
    }
    console.log(`result:${result}`);
    console.log(`{ "token": "${myToken}", "command": "arithmetic", "answer": ${result} }`);
    ws.send(`{ "token": "${myToken}", "command": "arithmetic", "answer": ${result} }`);
};

function taskBinaryArithmetic(task) {

    console.log(`binary`);
};
