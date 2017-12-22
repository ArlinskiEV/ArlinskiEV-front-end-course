import Sprite from './sprite';

export default class Towers {
  constructor(x, y) {
    this.pos = [x - 128, y - 178];
    this.sprite = new Sprite(
      './img/tower.png',
      [0, 0],
      [128, 178],
      6,
      [0, 1, 2, 3, 4],
    );
    this.firePoint = [((x - 128) + 71),
      ((y - 178) + 17)];
  }

  getUrls() {
    return [this.sprite.url];
  }
}
