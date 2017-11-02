 function Game() {
     alert('hello world ;)');



    Array.prototype.shuffle = function() {
        let input = this;

        for (let i = input.length - 1; i >= 0; i--) {

            let randomIndex = Math.floor(Math.random() * (i + 1));

            let itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

    //all work only within #table
    // id -in order
    // pair - from shuffle
    let difficulty = 8;
    let n = difficulty * 2;
    let table = document.getElementById('table');

    for (let i = 0; i < n; i++) {
        createCard(i, table);
    }
    function createCard(id, container) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('tabindex', 100 + id);
        card.id = id;
        card.innerHTML = '';
        container.appendChild(card);
    }

};






alert('document ready? really?');
Game();
