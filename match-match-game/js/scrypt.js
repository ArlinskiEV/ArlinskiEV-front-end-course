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

        /*desk.addEventListener('click', function startTimer(event) {
            desk.removeEventListener('click', startTimer);
            gamer.gameStartTimer();
            alert('123');
        });*/
        this.rotateNumber = -1;//for only one time-starter
        this.maxUnicCardsCount = 12;
        this.shirtsCount = 9;

        /*listeners*/
        let desk = document.getElementById('desk');
        desk.addEventListener('click', function(event) {
            console.log('target desk id='+event.target.id);
            if (event.target.classList.contains('cardType')) {
                let target = event.target;
                while (document.getElementById(target.parentNode.id).classList.contains('cardType')) {
                    target = target.parentNode;
                }
                gamer.rotate(target.id);
            }
        });

        let shirtSection = document.getElementById('shirts');
        shirtSection.addEventListener('click', function(event) {
            console.log('target shirt id='+event.target.id);
            if (event.target.classList.contains('shirt')) gamer.shirt(event.target.id);
        });



        gamer.reset();
        console.log('end constructor');
    }
    reset() {
        this.difficulty = 4;//pair count;
        this.unicCardsCount = 4; //same card on desk %2 == 0
        this.game = [];

        for (let i = 0; i < this.difficulty * 2; i++) {
            this.game.push(/*this.difficulty +*/ i);
        }

        this.game.shuffle();
        /*
        for (let i = 0; i < this.difficulty; i++) {
            this.game[this.game[i]] = i;
        }*/
        this.croupier(
            this.difficulty * 2,
            document.getElementById('desk'),
            'card',
            false);


        /*timer event*/
        if (this.rotateNumber != 0) {
            let gamer = this;
            let desk = document.getElementById('desk');
            desk.addEventListener('click', function startTimer(event) {
                if (event.target.classList.contains('cardType')) {
                    desk.removeEventListener('click', startTimer);
                    gamer.gameStartTimer();
                    //alert('123');
                }
            });
        }

        this.rotateNumber = 0;
        this.rotateCard = [];
        this.matches = 0;
        //for test
        let s = '';
        for (var i = 0; i < this.game.length; i++) {
            s += ' '+this.game[i];
        }
        console.log('reset:'+s);
    };
    gameStartTimer() {
        console.log('startTimer');
    };
    croupier(n, section, classes, shirtMode) {//add card on table
        console.log('start croupier');
        //section.innerHTML = '';
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }


        for (let i = 0; i < n; i++) {
            let card = document.createElement('div');
            card.className = classes;
            card.setAttribute('tabindex', i + 1);
            card.id = i + 'card';
            card.innerHTML = '';
            if (shirtMode) {
                    let style = 'background-image: url(../img/shirts/'+i+'shirt.png)';
                    card.setAttribute('style',style);
                    card.id = i + 'shirt';
            } else {
                    let both = document.createElement('div');
                    both.className = 'cardType cardContainer';
                    both.id = i + 'both';
                    card.appendChild(both);
                    let face = document.createElement('div');
                    face.className = 'cardType face';
                    face.id = i + 'face';
                    both.appendChild(face);

                    let back = document.createElement('div');
                    back.className = 'cardType back';
                    back.id = i + 'back';
                    both.appendChild(back);
            }
            section.appendChild(card);
        };
        console.log('end croupier');
    };
    shirts() {/*click button*/
        let shirtSection = document.getElementById('shirts');
        /*if empty - add, if full - delete*/
        if (!shirtSection.firstChild) {
            this.croupier(
                this.shirtsCount,
                document.getElementById('shirts'),
                'card shirt',
                true);
        } else {
            while (shirtSection.firstChild) {
                shirtSection.removeChild(shirtSection.firstChild);
            }
        }
    }
    shirt(id) {
        console.log('start shirts id='+id);
        let style = document.getElementById('shirtsStyle');
        style.innerHTML = '.back{background-image: url(../img/shirts/'+id+'.png);}';

        console.log('end shirts id='+id);
    };
    win() {
        console.log('win');
        console.log('rotate:'+this.rotateNumber);
    }
    resolveImg(id) {
        //return this.game[id] % this.difficulty;

        return (this.game[parseInt(id,10)] %
            (this.difficulty * 2 / this.unicCardsCount) + 'card');
    }
    styleRotate(obj) {

        /*
        obj.classList.remove('unrotate');
        obj.classList.add('rotate');
        */
        let t = this.resolveImg(obj.id);
        obj.classList.toggle('rotate');
        console.log('obj = '+obj.id+' t='+t);
        let style = 'background-image: url(../img/cards/'+t+'.png);';
        let face = obj.getElementsByClassName('face');
        face[0].setAttribute('style',style);




        console.log('rotate object id='+obj.id);
    }
    styleHide() {
        console.log('start hide');

        for (let i = 0; i < arguments.length; i++) {
            let j = document.getElementById(parseInt(arguments[i])+'card');

            while (j.classList.contains('cardType')) {
                target = target.parentNode;
            }


            j.classList.add('hide');
            //j.classList.remove('rotate');
            //j.classList.remove('unrotate');
            /*
            while (j.firstChild) {
                j.removeChild(shirtSection.firstChild);
            }
            */
            console.log('hide id='+j.id);
        }

        console.log('end hide')
    }

    unrotate() {
        console.log('start unrotate');


        for (let i = 0; (i < arguments.length && arguments[i]); i++) {
            let j = document.getElementById(arguments[i]);
            /*
            j.classList.remove('rotate');
            j.classList.add('unrotate');
            j.removeAttribute('style');
            */
            j.classList.toggle('rotate');
            console.log('unrotate id='+j.id)
        }


        console.log('end unrotate')
    }

    rotate(id) {

        console.log('rotate id=' + id);

        let card = document.getElementById(id);
        this.rotateNumber++;
        let flag = this.rotateCard.indexOf(id);

        //rotate third card
        if (this.rotateCard.length == 2) {
            console.log('rot = 2, need unrotate');
            this.unrotate(this.rotateCard[0], this.rotateCard[1]);
            this.rotateCard = [];
        }
        //card rotate
        if (flag != -1) {
            this.unrotate(this.rotateCard.join(','));
            this.rotateCard = [];
        } else {
            this.rotateCard.push(id);
            this.styleRotate(card);
            console.log('rotate card id='+id);
        }

        //match
        if (this.rotateCard.length == 2 &&
            this.resolveImg(this.rotateCard[0]) == this.resolveImg(id)
            ) {
            this.matches += 2;
            console.log('matches');


            let card1 = this.rotateCard[0];
            let card2 = this.rotateCard[1];
            let gamer = this;
            setTimeout(function(){
                gamer.styleHide(card1, card2);
            }, 1000);


            this.rotateCard = [];

            if (this.matches == this.game.length) {
                setTimeout(function(){
                    gamer.win();
                }, 1000);
            }
        }

        console.log('end rotate');

    }

}

/*main*/
var g = new Game;
function start() {
    g.reset();
}
function shirt() {
    g.shirts();
}
