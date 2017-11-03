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

        let desk = document.getElementById('desk');
        desk.addEventListener('click', function startTimer(event) {
            desk.removeEventListener('click', startTimer);
            gamer.gameStartTimer();
            alert('123');
        });
        desk.addEventListener('click', function rot(event) {
            console.log('target id='+event.target.id);
            if (event.target.classList.contains('card')) gamer.rotate(event.target.id);
        });
        gamer.reset();
        console.log('end constructor');
    }
    reset() {
        this.difficulty = 3; //from radio-button
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
        this.rotateCard = [];
        this.matches = 0;

        let s = '';
        for (var i = 0; i < this.game.length; i++) {
            s += ' '+this.game[i];
        }
        console.log('reset:'+s);
    }
    gameStartTimer() {
        console.log('startTimer');
    }
    croupier(n) {//add card on table
        console.log('start croupier');
        let desk = document.getElementById('desk');
        desk.innerHTML = '';
        for (let i = 0; i < n; i++) {
            let card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('tabindex', i + 1);
            card.id = i;
            card.innerHTML = '';
            desk.appendChild(card);
        };
        console.log('end croupier');
    };
    win() {
        console.log('win');
        console.log('rotate:'+this.rotateNumber);
    }
    styleRotate(obj) {
        obj.classList.remove('unrotate');
        obj.classList.add('rotate');
        let t = obj.id<this.game[obj.id]?obj.id:this.game[obj.id];
        console.log('obj = '+obj.id+' t='+t);
        let style = 'background-image: url(../img/cards/'+t+'.png)';
        obj.setAttribute('style',style);
        console.log('rotate object id='+obj.id);
    }
    styleHide() {
        console.log('start hide');

        for (let i = 0; i < arguments.length; i++) {
            let j = document.getElementById(arguments[i]);
            j.classList.add('hide');
            j.classList.remove('rotate');
            j.classList.remove('unrotate');
            j.removeAttribute('style');
            console.log('hide id='+j.id);
        }

        console.log('end hide')
    }

    unrotate() {
        console.log('start unrotate');

        for (let i = 0; i < arguments.length; i++) {
            let j = document.getElementById(arguments[i]);
            j.classList.remove('rotate');
            j.classList.add('unrotate');
            j.removeAttribute('style');
            console.log('unrotate id='+j.id)
        }

        console.log('end unrotate')
    }

    rotate(id) {

        console.log('rotate id=' + id);

        let card = document.getElementById(id);
        this.styleRotate(card);
        this.rotateNumber++;

        //rotate third card
        if (this.rotateCard.length == 2) {
            console.log('rot = 2, need unrotate');
            this.unrotate(this.rotateCard[0], this.rotateCard[1]);
            this.rotateCard = [];
        }
        //card rotate
        if (this.rotateCard.indexOf(id) != -1) {
            this.unrotate(this.rotateCard.join(','));
            this.rotateCard = [];
        } else {
            this.rotateCard.push(id);
            console.log('rotate card id='+id);
        }

        //match
        if (this.rotateCard.length == 2 &&
            this.rotateCard[0] == this.game[id]) {
            this.matches += 2;
            this.styleHide(this.rotateCard[0], this.rotateCard[1]);
            if (this.matches == this.game.length) {
                this.win();
            }
        }

        console.log('end rotate');

    }

}


var g = new Game;
function start() {
    //g = new Game;
    g.reset();
}
