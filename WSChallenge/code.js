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
                    taskArithmetic();
                    break;
                case 'binary_arithmetic':
                    taskBinaryArithmetic();
                    break;
                default://win
                    console.log('server say:'+incomingMessage);
            }
    }
};

//{ token: my_saved_token, command: saved_next_task_name }
function next(message) {
    ws.send({token: myToken,
        command: message === 'win' ? win_command : message});
}
