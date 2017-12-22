import Resources from './resources';
import Input from './input';

import Towers from './towers';
import Weapons from './weapons';
import Enemies from './enemies';
import Deaths from './deaths';

export default class Game {
  constructor(containerId, gameWidth, gameHeight) {
    // variables
    this.input = new Input();
    this.thisGame = this;
    this.containerId = containerId || 'game';
    this.gameWidth = gameWidth || 1200;
    this.gameHeight = gameHeight || 250;
    this.resources = new Resources();
    this.terrain = './img/terrain.png';


    // Create the canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.gameWidth;
    this.canvas.height = this.gameHeight;

    // States
    this.states = {
      tower: new Towers(
        this.canvas.width,
        this.canvas.height,
      ),

      terrainPattern: null,
    };

    // Create enemiesType & weapons
    this.weapons = new Weapons(
      this.states.tower.firePoint[0],
      this.states.tower.firePoint[1],
    );
    this.enemiesArr = new Enemies(this.canvas.width, this.canvas.height);
    this.deathsArr = new Deaths();

    this.resources.onReady(() => {
      this.states.terrainPattern = this.ctx.createPattern(this.resources.get(this.terrain), 'repeat');
      this.pause();
    });

    this.resources.load([this.terrain].concat(
      this.states.tower.getUrls(),
      this.weapons.getUrls(),
      this.enemiesArr.getUrls(),
      this.deathsArr.getUrls(),
    ));


    this.scoreEl = document.getElementById('score');
    this.fragsEl = document.getElementById('frags');
    this.healthEl = document.getElementById('health');
    document.getElementById(this.containerId).appendChild(this.canvas);

    // listeners
    this.canvas.addEventListener('click', (e) => {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;

      this.mouseHandler(x, y);
    });

    document.getElementById('reset').addEventListener('click', () => {
      this.reset();
      this.pause();
    });

    document.getElementById('play-pause').addEventListener('click', () => {
      this.pause();
    });

    document.getElementById('weapons').addEventListener('click', (e) => {
      let t = e.target;
      if (t.id !== 'weapons') {
        while (t.parentNode.id !== 'weapons') {
          t = t.parentNode;
        }
        this.setWeapon(t.id);
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 32) {
        this.pause();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) {
        // e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.preventDefault();
      }
    });

    this.reset();
  }

  // Set default params
  reset() {
    const now = Date.now();
    this.lastTime = now;
    this.states.isGameOver = false;
    this.states.isPaused = true;
    this.states.currentState = 'pause';
    this.states.timePause = now;
    this.states.gameTime = 0;
    this.states.score = 0;
    this.states.difficult = 1000;
    this.states.frags = 0;
    this.states.enemies = [];
    this.states.bullets = [];
    this.states.explosions = [];
    this.states.deaths = [];
    this.states.activeWeapon = 0;
    this.states.tower.health = 1000;


    for (let i = 1; i < this.weapons.weapons.length; i += 1) {
      const el = document.getElementById(i);
      el.classList.remove('activeWeapon');
      el.classList.add('disabled');
    }
    document.getElementById('0').classList.add('activeWeapon');
    document.getElementById('0').classList.remove('disabled');
  }

  // The main game loop
  main() {
    const now = Date.now();
    const dt = (now - this.lastTime) / 1000.0;

    // --------------------------------------------------temp
    this.states.difficult = (1000 - (this.states.score * 10)) < 0 ?
      0 : (1000 - (this.states.score * 10));

    if ((!this.states.isGameOver) && (!this.states.isPaused)) {
      this.update(dt);
      this.render();

      this.lastTime = now;
      requestAnimationFrame(() => {
        this.main();
      });
    }
  }

  gameOver() {
    this.states.isGameOver = true;
    this.states.currentState = 'gameover';
    console.log('------------------------------GAME OVER--------------');
    // alert('GAME OVER');
  }

  pause() {
    let time = Date.now();
    this.states.isPaused = !this.states.isPaused;
    if (!this.states.isPaused) {
      time -= this.states.timePause;
      //-------------------------------
      this.lastTime += time;
      this.lastadd += time;
      this.weapons.addTime(time);
      this.states.enemies = this.states.enemies
        .map((enemy) => {
          enemy.lastHit += time;
          return enemy;
        });
      //-------------------------------
      this.states.currentState = 'run';
      this.main();
    } else {
      this.states.timePause = time;
      this.states.currentState = 'pause';
    }
  }

  checkCollisions() {
    function collides(x, y, r, b, x2, y2, r2, b2) {
      return !(r <= x2 || x > r2 ||
                   b <= y2 || y > b2);
    }

    function boxCollides(pos, size, pos2, size2) {
      return collides(
        pos[0], pos[1],
        pos[0] + size[0], pos[1] + size[1],
        pos2[0], pos2[1],
        pos2[0] + size2[0], pos2[1] + size2[1],
      );
    }

    // Run collision detection for all enemies and bullets
    for (let i = 0; i < this.states.enemies.length; i += 1) {
      const pos1 = this.states.enemies[i].pos;
      const size1 = this.states.enemies[i].sprite.size;

      // enemies-tower
      if (boxCollides(
        pos1, size1, this.states.tower.pos,
        this.states.tower.sprite.size,
      )) {
        this.getHit(this.states.enemies[i]);
      }

      // enemies-bullet
      for (let j = 0; j < this.states.bullets.length; j += 1) {
        const pos2 = this.states.bullets[j].pos;
        const size2 = this.states.bullets[j].sprite.size;

        // target = center 25x25
        if (boxCollides(
          [((pos1[0] + (size1[0] / 2)) - 12),
            ((pos1[1] + (size1[1] / 2)) - 12)],
          [25, 25],
          pos2,
          size2,
        )) {
          this.hitting(this.states.bullets[j], this.states.enemies[i]);
          // Remove the enemy
          if (this.states.enemies[i].health <= 0) {
            // Add score and frags
            this.states.score += this.states.enemies[i].score;
            this.states.frags += 1;

            // Add death
            this.states.deaths.push(this.deathsArr.died(
              this.resources,
              this.states.enemies[i].pos[0],
              this.states.enemies[i].pos[1],
              this.states.enemies[i].typeId,
            ));

            this.states.enemies.splice(i, 1);
            i -= 1;
          }

          // Remove the bullet and stop this iteration
          this.states.bullets.splice(j, 1);
          j = this.states.bullets.length + 1;
        }
      }
    }
  }


  // Draw everything
  render() {
    this.ctx.fillStyle = this.states.terrainPattern;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    [this.states.tower].concat(
      this.states.bullets,
      this.states.enemies,
      this.states.explosions,
      this.states.deaths,
    )
    // .forEach(Game.prototype.renderEntity.bind(this));
      .forEach((entity) => { this.renderEntity(entity); });
  }

  renderEntity(entity) {
    this.ctx.save();
    this.ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(this.ctx, this.resources); // from Sprite.js
    this.ctx.restore();
  }

  mouseHandler(x, y) {
    // create bullet
    if (!this.states.isPaused) {
      this.shoot(x, y);// a,b
    }
  }

  // Update states of all objects
  update(dt) {
    this.states.gameTime += dt;

    this.handleInput(dt);
    this.updateEntities(dt);


    // add enemy
    const ddt = Date.now() - (this.lastadd || 0);
    if (ddt > (700 + this.states.difficult)) { // min-time between enemies
      const enemy = this.enemiesArr.getEnemy(this.states.score);
      if (enemy) {
        this.states.enemies.push(enemy);
        this.lastadd = Date.now();
      }
    }


    this.checkCollisions();

    // check score
    for (let i = 1; i < this.weapons.weapons.length; i += 1) {
      if (this.weapons.weapons[i].minScore <= this.states.score) {
        const el = document.getElementById(i);
        el.classList.remove('disabled');
      }
    }

    this.scoreEl.innerHTML = this.states.score;
    this.fragsEl.innerHTML = this.states.frags;
    this.healthEl.innerHTML = this.states.tower.health;
  }

  handleInput() { // (dt) in params
    if (this.input.isDown('UP')) {
      console.log('up');
    }
    // 49-57=1-9 48=0
    for (let i = 0; i <= 8; i += 1) { // 0-8=>1-9, max weapons
      if (this.input.isDown(i + 1)) {
        this.setWeapon(i);
      }
    }
  }

  updateEntities(dt) {
    // Update the tower
    this.states.tower.sprite.update(dt);
    if (this.states.tower.health <= 0) {
      this.states.isGameOver = true;
      this.gameOver();
    }

    // Update all the bullets
    for (let i = 0; i < this.states.bullets.length; i += 1) {
      const bullet = this.states.bullets[i];
      bullet.pos[0] += bullet.target[0] * bullet.speed;
      bullet.pos[1] += bullet.target[1] * bullet.speed;
      bullet.sprite.update(dt);
      // Remove the bullet if it goes offscreen
      if (bullet.pos[0] < 0 || bullet.pos[0] > this.canvas.width ||
          bullet.pos[1] < 0 || bullet.pos[1] > this.canvas.height) {
        this.states.bullets.splice(i, 1);
        i -= 1;
      }
    }


    // Update all the enemies
    for (let i = 0; i < this.states.enemies.length; i += 1) {
      const enemy = this.states.enemies[i];
      enemy.pos[0] += enemy.speed * dt;
      enemy.sprite.update(dt);

      // Stop if near tower
      if (enemy.pos[0] > (1200 - 128) + 2) {
        enemy.speed = 0;
        console.log('enemy stop');
        enemy.pos[0] = (1200 - 128) + 1;
      }
    }


    // Update all the explosions
    this.states.explosions.forEach((explosion, i, explosions) => {
      explosion.sprite.update(dt);

      // Remove if animation is done
      if (explosion.sprite.done) {
        explosions.splice(i, 1);
        console.log('expl done');
      }
    });
    // Update all the deaths
    this.states.deaths.forEach((death, i, deaths) => {
      death.sprite.update(dt);

      // Remove if animation is done
      if (death.sprite.done) {
        // death.sound.pause();
        deaths.splice(i, 1);
      }
    });
  }


  // ---------------------------------------------------------actions
  shoot(x, y) {
    let a = x - this.states.tower.firePoint[0];
    let b = y - this.states.tower.firePoint[1];
    const l = Math.sqrt((a * a) + (b * b));
    // normolize (a,b) vector
    a /= l;
    b /= l;

    // check reload
    const time = Date.now();

    const bullet = this.weapons.getBullet(this.states.activeWeapon, time);
    if (bullet) {
      bullet.target = [a, b];
      this.states.bullets.push(bullet);
    }
  }

  hitting(bullet, enemy) {
    if (enemy && bullet) {
      enemy.health -= bullet.damage;
    }
  }

  getHit(enemy) {
    const time = Date.now();
    if (!enemy.lastHit) { // first
      this.enemiesArr.inAttack(this.resources, enemy);
    }

    if (enemy.lastHit + enemy.reload < time) {
      if (!enemy.soundAttack) alert('1');
      enemy.soundAttack.currentTime = 0.0;
      enemy.soundAttack.play();
      this.states.tower.health -= enemy.damage;
      enemy.lastHit = time;
      console.log(`hit, health: ${this.states.tower.health}`);
    }
  }

  setWeapon(id) {
    const targetWeapon = document.getElementById(id);
    if ((targetWeapon) && (this.states.activeWeapon !== id) &&
    (!targetWeapon.classList.contains('disabled'))) {
      const el = document.getElementById(this.states.activeWeapon);
      el.classList.remove('activeWeapon');

      targetWeapon.classList.add('activeWeapon');
      this.states.activeWeapon = id;
    }
  }
}
