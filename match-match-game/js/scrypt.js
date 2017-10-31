 (function () {
     //alert('hello world ;)');



    Array.prototype.shuffle = function() {
        var input = this;

        for (var i = input.length-1; i >=0; i--) {

            var randomIndex = Math.floor(Math.random()*(i+1));

            var itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

    //alert('document redy? really?');

    //all work only within #table
    let n = 13;
    let table = document.getElementById('table');
    for (let i = 0; i < n; i++) {
        createCard(i,table);
    }
    function createCard(id, container) {
        const card = document.createElement('div');
        card.className = 'card';
        //card.setAttribute('id', id);
        card.id = id;
        card.innerHTML = '<img src="img/cards/triss.png" alt="">';
        container.appendChild(card);
    }

 }());
