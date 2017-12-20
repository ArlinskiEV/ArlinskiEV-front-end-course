import Resources from './resources';

export default class Sprite {
    constructor(url, pos, size, speed, frames, dir, once) {
        if (arguments.length != 1) {
            this.pos = pos;
            this.size = size;
            this.speed = typeof speed === 'number' ? speed : 0;
            this.frames = frames;
            this._index = 0;
            this.url = url;
            this.dir = dir || 'horizontal';
            this.once = once;
        } else {
            this.pos = arguments[0][1];
            this.size = arguments[0][2];
            this.speed = typeof arguments[0][3] === 'number' ? arguments[0][3] : 0;
            this.frames = arguments[0][4];
            this._index = 0;
            this.url = arguments[0][0];
            this.dir = arguments[0][5] || 'horizontal';
            this.once = arguments[0][6];
        };
    };

    update(dt) {
        this._index += this.speed*dt;
    };

    render(ctx, res) {
        let frame;

        if (this.speed > 0) {
            let max = this.frames.length;
            let idx = Math.floor(this._index);
            frame = this.frames[idx % max];

            if (this.once && idx >= max) {
                this.done = true;
                return;
            };
        } else {
            frame = 0;
        };

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
                console.info('default directional frame');
        };

        ctx.drawImage(res.get(this.url),
                      x, y,
                      this.size[0], this.size[1],
                      0, 0,
                      this.size[0], this.size[1]);
    };
};
