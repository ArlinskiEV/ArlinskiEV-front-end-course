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

        this.difficulty = 4;//pair count;
        this.unicCardsCount = 2; //same card on desk %2 == 0

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

        let difficultySection = document.getElementById('difficulty');
        this.diffArr = [];
        while (difficultySection.firstChild) {
            this.diffArr.push(difficultySection.removeChild(difficultySection.firstChild));
        }
        difficultySection.addEventListener('click', function(event) {
            console.log('target diff id='+event.target.id);
            if (event.target.id) {
                gamer.changeDifficulty(event.target.id);
                gamer.reset();
            }
        });


        gamer.reset();
        console.log('end constructor');
    }
    setDifficulty() {/*click button*/
        let difficultySection = document.getElementById('difficulty');
        if (!difficultySection.firstChild) {
            /*add controls*/
            while (this.diffArr.length > 0) {
                difficultySection.appendChild(this.diffArr.pop());
            }
        } else {
            while (difficultySection.firstChild) {
                this.diffArr.push(difficultySection.removeChild(difficultySection.firstChild));
            }
        }

    }
    changeDifficulty(id) {
        console.log('+++');
        if (id.indexOf('unic') != -1) {
            this.unicCardsCount = parseInt(id) * 2; //same card on desk %2 == 0
        };

        if (id.indexOf('pair') != -1) {
            this.difficulty = parseInt(id);//pair count;
        };
    }
    reset() {
        this.game = [];
        this.stoped = true;
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

        let timer = document.getElementById('timer');
        timer.innerHTML = '00:00:00.00';
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
        this.startTime = new Date();
        this.stoped = false;

        function timerIterate(gamer) {
            let currentTime = new Date();
            let timer = document.getElementById('timer');

            let time = currentTime.getTime() - gamer.startTime.getTime();
            let h = Math.trunc(time / (60*60*1000));//60*60*1000
            time = time % (60*60*1000);
            let m = Math.trunc(time / (60*1000));//60*1000
            time = time % (60*1000);
            let s = Math.trunc(time / 1000);//1000
            time = time % 1000;
            let ms = time;//

            timer.innerHTML = h+':'+m+':'+s+'.'+ms;
            //timer.innerHTML = time.toTimeString();

            if (!gamer.stoped) setTimeout(function(){
                timerIterate(gamer);
            }, 10);
        }

        timerIterate(this);
    };
    gameStopTimer() {
        console.log('stopTimer');
        this.stoped = true;
        return new Date();
    }
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
        let time = this.gameStopTimer();
        let desk = document.getElementById('desk');
        while (desk.firstChild) {
            desk.removeChild(desk.firstChild);
        }
        let h1 = document.createElement('h1');
        h1.innerHTML = "congratulation";

        let h2 = document.createElement('h2');
        h2.innerHTML = 'clicks: '+this.rotateNumber;
        let h22 = document.createElement('h2');
        //time = new Date(time - this.startTime);
        time = time.getTime() - this.startTime.getTime();
        let h = Math.trunc(time / (60*60*1000));//60*60*1000
        time = time % (60*60*1000);
        let m = Math.trunc(time / (60*1000));//60*1000
        time = time % (60*1000);
        let s = Math.trunc(time / 1000);//1000
        time = time % 1000;
        let ms = time;//
        h22.innerHTML = h+':'+m+':'+s+'.'+ms;
        //h22.innerHTML = time.toTimeString();



        desk.appendChild(h1);
        desk.appendChild(h2);
        desk.appendChild(h22);
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
function difficulty() {
    g.setDifficulty();
}
