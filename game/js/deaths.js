import Sprite from './sprite';

export default class Deaths {
  constructor() {
    this.deaths = [];

    this.deaths.push({
      pos: [0, -40], // shift
      sound: './music/skl_d.mp3',
      sprite: ['./img/enemies/skeleton.png',
        [90, 0],
        [90, 120],
        5,
        [0, 1, 2, 3, 4, 5],
        'vertical',
        true],
    });

    this.deaths.push({
      pos: [0, 39],
      sound: './music/zmb_d.mp3',
      sprite: ['./img/enemies/temp.png',
        [0, 0],
        [80, 39],
        6,
        [0, 1, 2, 3, 2, 1],
        null,
        true],
    });
  }

  getUrls() {
    return this.deaths.reduce((arr, death) => {
      arr.push(death.sprite[0]);
      arr.push(death.sound);
      return arr;
    }, []);
  }

  died(resources, x, y, typeId) {
    const j = this.deaths[typeId];
    const death = {
      pos: [x + j.pos[0], y + j.pos[1]],
      sound: resources.get(j.sound),
      sprite: new Sprite(j.sprite),
    };

    death.sound.currentTime = 0.0;
    death.sound.play();

    return death;
  }
}
