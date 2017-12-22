import Sprite from './sprite';

export default class Weapons {
  constructor(x, y) {
    this.weapons = [];

    this.weapons.push({
      // minus half-size for center-to-center
      pos: [x - 22, y - 22],
      title: './img/bullets/bullet_title.png',
      sprite: ['./img/bullets/bullet.png',
        [0, 0],
        [44, 44],
        6,
        [0, 1, 2, 1],
        'vertical'],
      damage: 1,
      reload: 1000,
      minScore: 0,
      bulletSpeed: 10,
      lastShoot: 0,
    });


    this.weapons.push({
      pos: [x - 22, y - 22],
      title: './img/bullets/bullet_title.png',
      sprite: ['./img/bullets/bullet.png',
        [0, 0],
        [44, 44],
        6,
        [0, 1, 2, 1],
        'vertical'],
      damage: 1,
      reload: 10,
      minScore: 90,
      bulletSpeed: 2,
      lastShoot: 0,
    });

    // add in page
    this.weaponsEL = document.getElementById('weapons');
    this.weapons.forEach((item, i) => {
      const el = document.createElement('div');
      el.classList.add('weapon');
      el.classList.add('denied');
      el.id = i;
      // title-img
      const prev = document.createElement('div');
      prev.classList.add('prev');
      const img = document.createElement('img');
      img.setAttribute('src', item.title);
      prev.appendChild(img);
      el.appendChild(prev);

      const info = document.createElement('p');
      info.innerHTML = `DMG:${item.damage}`;
      el.appendChild(info.cloneNode());
      info.innerHTML = `SPD:${item.bulletSpeed}`;
      el.appendChild(info.cloneNode());
      info.innerHTML = `REL:${item.reload}`;
      el.appendChild(info);
    });
  }

  getUrls() {
    return this.weapons.reduce((arr, weapon) => {
      arr.push(weapon.sprite[0]);
      arr.push(weapon.title);
      return arr;
    }, []);
  }

  getBullet(type, time) {
    const j = this.weapons[type];

    if (j.lastShoot + j.reload >= time) {
      return null;
    }

    j.lastShoot = time;

    const bullet = {
      pos: [j.pos[0], j.pos[1]],
      sprite: new Sprite(j.sprite),
      damage: j.damage,
      speed: j.bulletSpeed,
      target: [0, 0], // change-in-shoot
    };

    return bullet;
  }

  addTime(time) {
    this.weapons.map((item) => { item.lastShoot += time; return item; });
  }
}
