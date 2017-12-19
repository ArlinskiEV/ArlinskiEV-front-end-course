import Sprite from './sprite.js';

export default class Enemies {
    constructor(x, y) {
        this.enemiesArr = [];

        this.enemiesArr.push({
            pos: [-90, (y - 80)], //ground minus enemy size
            sprite: ['./img/enemies/skeleton.png',
                        [0, 0],
                        [90, 80],
                        8,
                        [0,1,2,3,4,5,6,7,8,9,10,11],
                        'vertical'],
            score: {
                cost: 2,
                start: 0,
            },
            reload: 500,
            health: 1,
            damage: 100,
            speed: 100
        });


        this.enemiesArr.push({
            pos: [-90, (y - 39)],
            sprite: ['./img/enemies/temp.png',
                        [0, 0],
                        [80, 39],
                        6,
                        [0, 1, 2, 3, 2, 1]],
            score: {
                cost: 5,
                start: 100,
            },
            reload: 500,
            health: 1,
            damage: 100,
            speed: 50
        });
    };

    getEnemy(score) {
        let i = Math.floor(Math.random() * score/50);//random between 0 and score
        for (;((i > 0) && (this.enemiesArr[i].score.start > score));i--);
        let j = this.enemiesArr[i];
        let enemy = {
            pos: [j.pos[0], j.pos[1]],
            sprite: new Sprite(j.sprite),
            score: j.score.cost,
            reload: j.reload,
            health: j.health,
            damage: j.damage,
            speed: j.speed,
            lastHit: 0,
            typeId: i
        };
        return enemy;
    }
};
