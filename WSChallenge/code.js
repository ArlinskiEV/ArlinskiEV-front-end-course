const ws = new WebSocket('ws://188.166.46.38');
ws.binaryType = 'arraybuffer';

ws.onopen = function() {
    ws.send({ 'name':'ArlinskiEV',
            'command': 'challenge accepted' });
};


/* The server will respond with:
{"message":"You successfully accept challenge",
"next":"arithmetic",
"token":"eae34860c6f507f2"}.
*/
let myToken = null;
ws.onmessage = function(event) {
    const incomingMessage = event.data;

    switch (incomingMessage.message) {
        case 'You successfully accept challenge':
            myToken = incomingMessage.token;
            console.log('myToken='+myToken);
            next(incomingMessage.next);
            break;
        case 'You solve task':
            next(incomingMessage.nextTask);
            break;
        default://task
            switch (incomingMessage.name) {
                case 'arithmetic':
                    taskArithmetic(incomingMessage.task);
                    break;
                case 'binary_arithmetic':
                    taskBinaryArithmetic(incomingMessage.task);
                    break;
                default://win
                    console.log('server say:'+incomingMessage);
            }
    }
};

/*{ token: my_saved_token,
command: saved_next_task_name }*/
function next(message) {
    ws.send({
        'token': myToken,
        'command': message === 'win' ? win_command : message
    });
}

taskArithmetic(task) {
/*"task":{"sign": OPERATION ,"values": ARRAY}*/
    function basicOp(operation, value1, value2) {
        let operationFunctions = {
            '+': function(x, y) {return x+y;},
            '-': function(x, y) {return x-y;},
            '*': function(x, y) {return x*y;},
            '/': function(x, y) {return x/y;}
        };
        return operationFunctions[operation](value1,value2);
    }

    let values = task.values;
    let result = values.pop();
    while (values.length) {
        result = basicOp(task.sign, result, values.pop());
    }


     ws.send({
         'token': myToken,
         'command': 'arithmetic',
         'answer': result
     });
};

taskBinaryArithmetic(task) {

};
