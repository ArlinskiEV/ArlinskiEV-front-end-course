const ws = new WebSocket('ws://188.166.46.38');
ws.binaryType = 'arraybuffer';
let myToken = null;
let wait = null;

ws.onopen = function() {
    ws.send(`{ "name":"ArlinskiEV", "command": "challenge accepted" }`);
};

ws.onmessage = function(event) {
    let incomingMessage = event.data;
    console.log(`server:${incomingMessage}`);

    if (wait) {
        wait(incomingMessage);
    } else {

        let obj = JSON.parse(incomingMessage);

        switch (obj.message) {
            case 'You successfully accept challenge':
                myToken = obj.token;
                console.log('myToken='+myToken);
                next(obj.next);
                break;

            case 'You solve the task'://'You solve (!)task'
                next(obj.next);//.nextTask(!)
                break;

            default://task
                switch (obj.name) {
                    case 'arithmetic':
                        taskArithmetic(obj.task);
                        break;

                    case 'binary_arithmetic':
                        taskBinaryArithmetic(obj.task);
                        break;

                    default://win
                        console.log(`secretCode: ${obj.secretCode}`);//"secretCode":"b9a51820516ea42d"
                }
        }
    }
};

function next(message) {
    console.log(`{"token": "${myToken}", "command":"${message}"}`);
    ws.send(`{"token": "${myToken}", "command":"${message}"}`);
};

function taskArithmetic(task) {

    function basicOp(operation, value1, value2) {
        let operationFunctions = {
            '+': function(x, y) {return x + y;},
            '-': function(x, y) {return x - y;},
            '*': function(x, y) {return x * y;},
            '/': function(x, y) {return x / y;}
        };
        return operationFunctions[operation](value1,value2);
    }

    let values = task.values;
    console.log(`arithmetic, task=${task}`);
    console.log(`values:${values}`);

    let result = values.shift();
    while (values.length) {
        result = basicOp(task.sign, result, values.shift());
    }

    console.log(`{ "token": "${myToken}", "command": "arithmetic", "answer": ${result} }`);
    ws.send(`{ "token": "${myToken}", "command": "arithmetic", "answer": ${result} }`);
};

function taskBinaryArithmetic(task, bits, data) {
    if (!bits) {
        wait = taskBinaryArithmetic.bind(null, null, task.bits);
        return true;
    } else {
        wait = null;
    }

    let arr = (bits === 8) ? new Uint8Array(data) : new Uint16Array(data);
    console.log(`bits=${bits} data=${data} arr=${arr}`);
    let result = 0;
    arr.forEach(function (item, i, arr) {
        result += item;
    });

    console.log(`{ "token": "${myToken}", "command": "binary_arithmetic", "answer": ${result} }`);
    ws.send(`{ "token": "${myToken}", "command": "binary_arithmetic", "answer": ${result} }`);
};
