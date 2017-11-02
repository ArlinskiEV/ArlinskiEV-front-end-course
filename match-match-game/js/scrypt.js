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
        console.log('start constructor');
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
        this.rotateNumber = 0;
        this.rotateCard = -1;
        this.matches = 0;

        let table = document.getElementById('table');
        table.addEventListener('click', function startTimer(event) {
            table.removeEventListener('click', startTimer);
            gamer.gameStartTimer();
        });

        table.addEventListener('click', function rot(event) {
            console.log('target id='+event.target.id);
            if (event.target.classList.contains('card')) gamer.rotate(event.target.id);
        });
        console.log('end constructor');
    }
    gameStartTimer() {
        console.log('startTimer');
    }
    croupier(n) {//add card on table
        console.log('start croupier');
        let table = document.getElementById('table');
        table.innerHTML = '';
        for (let i = 0; i < n; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('tabindex', i + 1);
            card.id = i;
            card.innerHTML = '';
            table.appendChild(card);
        };
        console.log('end');
    };
    win() {
        alert('win');
        console.log('win');
        console.log('rotate:'+this.rotateNumber);
    }
    styleRotate(obj) {
        obj.classList.remove('unrotate');
        obj.classList.add('rotate');
    }
    styleHide() {
        console.log('start hide');
        let table = document.getElementById('table');
        let forHide = table.getElementsByClassName('rotate');
        let arr = [];
        for (let i = 0; i < forHide.length; i++) {
            arr.push(forHide.item(i));
        }
        for (let i = 0; i < arr.length; i++)
        {
            arr[i].classList.add('hide');
            arr[i].classList.remove('rotate');
            arr[i].classList.remove('unrotate');
        }
        console.log('end hide')
    }

    unrotate() {
        console.log('unrotate');
        let table = document.getElementById('table');
        let forHide = table.getElementsByClassName('rotate');
        let arr = [];
        for (let i = 0; i < forHide.length; i++) {
            arr.push(forHide.item(i));
        }
        for (let i = 0; i < arr.length; i++)
        {
            arr[i].classList.add('unrotate');
            arr[i].classList.remove('rotate');
        }
        console.log('end hide')
    }

    rotate(id) {

        console.log('rotate id=' + id);

        let card = document.getElementById(id);
        this.styleRotate(card);
        this.rotateNumber++;
        //only one card rotate
        if (this.rotateCard == -1) {
            this.rotateCard = id;
            console.log('rotate one card');
            return true;
        }
        //two cards rotate
        if (this.rotateCard == this.game[id]) {
            this.matches += 2;
            this.styleHide();
            if (this.matches == this.game.length) {
                this.win();
            }
        } else {
            this.unrotate();
        }

        this.rotateCard = -1;

        console.log('end rotate');

    }

}


var g = null;
function start() {
    g = new Game;
}
