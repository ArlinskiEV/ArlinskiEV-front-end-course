import Sprite from './sprite';

export default class Enemies {
  constructor(x, y) {
    this.enemiesArr = [];

    this.enemiesArr.push({
      pos: [-90, (y - 80)], // ground minus enemy size
      soundAttack: './music/skl_a.mp3',
      sprite: ['./img/enemies/skeleton.png',
        [0, 0],
        [90, 80],
        8,
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        'vertical',
      ],
      spriteAttack: ['./img/enemies/skeleton.png',
        [180, 0],
        [100, 115],
        7,
        [0, 1, 2, 3, 4, 5, 6, 7],
        'vertical',
      ],
      score: {
        cost: 2,
        start: 0,
      },
      reload: 1000,
      health: 1,
      damage: 100,
      speed: 100,
    });


    this.enemiesArr.push({
      pos: [-90, (y - 100)],
      soundAttack: './music/uni_a.mp3',
      sprite: ['./img/enemies/horse.png',
        [0, 0],
        [100, 100],
        6,
        [0, 1, 2, 3, 4, 5, 6, 7]],
      spriteAttack: ['./img/enemies/horse.png',
        [389, 376],
        [130, 120],
        8,
        [0, 1, 2, 3],
      ],
      score: {
        cost: 7,
        start: 10,
      },
      reload: 500,
      health: 3,
      damage: 200,
      speed: 50,
    });
  }

  getUrls() {
    return this.enemiesArr.reduce((arr, enemy) => {
      arr.push(enemy.sprite[0]);
      arr.push(enemy.spriteAttack[0]);
      arr.push(enemy.soundAttack);
      return arr;
    }, []);
  }

  getEnemy(score) {
    let i = Math.floor(Math.random() * (score / 50)); // random between 0 and score
    i = (i >= this.enemiesArr.length) ? (this.enemiesArr.length - 1) : i;

    for (;((i > 0) && (this.enemiesArr[i].score.start > score));i -= 1);
    const j = this.enemiesArr[i];
    const enemy = {
      pos: [j.pos[0], j.pos[1]],
      sprite: new Sprite(j.sprite),
      score: j.score.cost,
      reload: j.reload,
      health: j.health,
      damage: j.damage,
      speed: j.speed,
      lastHit: 0,
      typeId: i,
    };
    return enemy;
  }

  inAttack(resources, enemy) {
    const j = resources.get(this.enemiesArr[enemy.typeId].soundAttack);

    j.currentTime = 0.0;
    j.play();
    return [j, new Sprite(this.enemiesArr[enemy.typeId].spriteAttack)];
  }
}
