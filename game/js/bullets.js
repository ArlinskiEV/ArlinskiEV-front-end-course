import Sprite from './sprite.js';

export default class Bullets {
    constructor(x, y) {
        let arr = [];

        arr.push({
            //minus half-size for center-to-center
            pos: [x - 22, y - 22],
            sprite: new Sprite('./img/bullets/bullet.png',
                                [0, 0],
                                [44, 44],
                                6,
                                [0,1,2,1],
                                'vertical'
                            ),
            damage: 1,
            reload: 1000,
            speed: 10,
            target: [0, 0]
        });


        arr.push({
            pos: [x - 22, y - 22],
            sprite: new Sprite('./img/bullets/bullet.png',
                                [0, 0],
                                [44, 44],
                                6,
                                [0,1,2,1],
                                'vertical'
                            ),
            damage: 1,
            reload: 10,
            speed: 2,
            target: [0, 0]
        });

        return arr;
    };
};
