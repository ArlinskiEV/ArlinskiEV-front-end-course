export default class Sprite {
  constructor(...args) { // url, pos, size, speed, frames, dir, once
    let speed;
    let dir;
    if (args.length !== 1) {
      [this.url,
        this.pos,
        this.size,
        speed,
        this.frames,
        dir,
        this.once] = args;
    } else {
      [this.url,
        this.pos,
        this.size,
        speed,
        this.frames,
        dir,
        this.once] = [args];
    }
    this.speed = typeof speed === 'number' ? speed : 0;
    this.dir = dir || 'horizontal';
    this.currentIndex = 0;
  }

  update(dt) {
    this.currentIndex += this.speed * dt;
  }

  render(ctx, res) {
    let frame;

    if (this.speed > 0) {
      const max = this.frames.length;
      const idx = Math.floor(this.currentIndex);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    let x = this.pos[0];
    let y = this.pos[1];

    switch (this.dir) {
      case 'vertical':
        y += frame * this.size[1];
        break;
      case 'horizontal':
        x += frame * this.size[0];
        break;
      default:
        // console.info('default directional frame');
    }

    ctx.drawImage(
      res.get(this.url),
      x, y,
      this.size[0], this.size[1],
      0, 0,
      this.size[0], this.size[1],
    );
  }
}
