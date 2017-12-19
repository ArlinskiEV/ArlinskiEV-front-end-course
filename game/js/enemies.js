import Sprite from './sprite.js';

export default class Enemies {
    constructor(x, y) {
        let arr = [];

        arr.push({
            pos: [-90, (y - 80)], //ground minus enemy size
            sprite: new Sprite('./img/enemies/skeleton.png',
                                [0, 0],
                                [90, 80],
                                8,
                                [0,1,2,3,4,5,6,7,8,9,10,11],
                                'vertical'
                            ),
            score: {
                cost: 2,
                start: 0,
                typeID: 0
            },
            reload: 500,
            lastHit: 0,
            health: 1,
            damage: 100,
            speed: 100
        });


        arr.push({
            pos: [-90, (y - 39)],
            sprite: new Sprite('./img/enemies/temp.png',
                                [0, 0],
                                [80, 39],
                                6,
                                [0, 1, 2, 3, 2, 1]),
            score: {
                cost: 5,
                start: 100,
                typeID: 1
            },
            reload: 500,
            lastHit: 0,
            health: 1,
            damage: 100,
            speed: 50
        });


        return arr;
    };
};
