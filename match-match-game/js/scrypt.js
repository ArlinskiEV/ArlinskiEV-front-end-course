//implement shuffle-function
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


class Game {
    constructor() {
        let gamer = this;
        this.difficulty = 2; //from radio-button
        this.game = [];
        for (let i = 0; i < this.difficulty; i++) {
            this.game.push(this.difficulty + i);
        }
        this.game.shuffle();
        for (let i = 0; i < this.difficulty; i++) {
            this.game[this.game[i]] = i;
        }
        this.croupier(this.difficulty*2);
        this.rotateNumer = 0;
        this.rotateCard = -1;
        this.matches = 0;

        let table = document.getElementById('table');
        table.addEventListener('click', function startTimer(event) {
            table.removeEventListener('click', startTimer);
            gamer.gameStartTimer();
        });

        table.addEventListener('click', function rot(event) {
            console.log(event.target.id);
            if (event.target.getAttribute('class') == 'card') gamer.rotate(event.target.id);
        });
    }
    gameStartTimer() {
        console.log('startTimer');
    }
    croupier(n) {//add card on table
        let table = document.getElementById('table');
        table.innerHTML = '';
        for (let i = 0; i < n; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('tabindex', i + 1);
            //card.setAttribute('onclick', 'function(){rot('+i+');}');
            card.id = i;
            card.innerHTML = '';
            table.appendChild(card);
        };
    };

    unrotate() {
        //style-unrotate
        //for all with attribute rotate
    }

    rotate(id) {

        console.log('id=' + id);

        let card = document.getElementById(id);
        //style-rotate
        if (!this.rotateNumer) {
            //start timer
        }
        this.rotateNumer++;
        //only one card rotate
        if (this.rotateCard == -1) {
            this.rotateCard = id;
            return true;
        }
        //two cards rotate
        if (this.rotateCard == this.game[id]) {
            this.matches += 2;
            //hide cards
            if (this.matches == this.game.length) {
                //win
                alert('win');
            }
        } else {
            this.unrotate();
        }

        this.rotateCard = -1;

    }

}


var g = null;
function start() {
    g = new Game;
}
