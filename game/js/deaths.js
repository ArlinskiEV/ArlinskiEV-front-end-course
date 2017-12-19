import Sprite from './sprite.js';

export default class Deaths {
    constructor() {
        this.deaths = [];

        this.deaths.push({
            pos: [0, -40], //shift
            sprite: ['./img/enemies/skeleton.png',
                        [90, 0],
                        [90, 120],
                        5,
                        [0,1,2,3,4,5],
                        'vertical',
                        true],
        });

        this.deaths.push({
            pos: [0, 39],
            sprite: ['./img/enemies/temp.png',
                        [0, 0],
                        [80, 39],
                        6,
                        [0, 1, 2, 3, 2, 1],
                        null,
                        true],
        });
    };

    died(x, y, typeId) {
        let j = this.deaths[typeId];
        let death = {
            pos: [x + j.pos[0], y + j.pos[1]],
            sprite: new Sprite(j.sprite)
        };

        return death;
    };
};
