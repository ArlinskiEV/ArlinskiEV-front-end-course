/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sprite {
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
      [[this.url,
        this.pos,
        this.size,
        speed,
        this.frames,
        dir,
        this.once]] = args;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);


const myGame = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
//myGame.pause();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__towers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weapons__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enemies__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__deaths__ = __webpack_require__(8);








class Game {
  constructor(containerId, gameWidth, gameHeight) {
    // variables
    this.input = new __WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */]();
    this.thisGame = this;
    this.containerId = containerId || 'game';
    this.gameWidth = gameWidth || 1200;
    this.gameHeight = gameHeight || 250;
    this.resources = new __WEBPACK_IMPORTED_MODULE_0__resources__["a" /* default */]();
    this.terrain = './img/terrain.png';


    // Create the canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.gameWidth;
    this.canvas.height = this.gameHeight;

    // States
    this.states = {
      tower: new __WEBPACK_IMPORTED_MODULE_2__towers__["a" /* default */](
        this.canvas.width,
        this.canvas.height,
      ),

      terrainPattern: null,
    };

    // Create enemiesType & weapons
    this.weapons = new __WEBPACK_IMPORTED_MODULE_3__weapons__["a" /* default */](
      this.states.tower.firePoint[0],
      this.states.tower.firePoint[1],
    );
    this.enemiesArr = new __WEBPACK_IMPORTED_MODULE_4__enemies__["a" /* default */](this.canvas.width, this.canvas.height);
    this.deathsArr = new __WEBPACK_IMPORTED_MODULE_5__deaths__["a" /* default */]();

    this.resources.onReady(() => {
      this.states.terrainPattern = this.ctx.createPattern(this.resources.get(this.terrain), 'repeat');
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

    // main-menu
    document.getElementById('startButton').addEventListener('click', () => {
      this.reset();
      this.pause();
    });
    document.getElementById('pauseButton').addEventListener('click', () => {
      this.pause();
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
    const result = document.getElementById('isOver');
    result.classList.add('disabled');


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
    let el = document.getElementById('isOver');
    el.classList.remove('disabled');
    el = document.getElementById('menu');
    el.classList.remove('disabled');
  }

  pause() {
    let time = Date.now();
    const audio = document.getElementById('mainMusic');
    const el = document.getElementById('menu');
    audio.volume = 0.1;
    this.states.isPaused = !this.states.isPaused;
    if (!this.states.isPaused) {
      audio.play();
      el.classList.add('disabled');
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
      audio.pause();
      let menuScore = document.getElementById('resultScore');
      menuScore.innerHTML = this.states.score;
      el.classList.remove('disabled');
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
          this.states.enemies[i].health -= this.states.bullets[j].damage;

          // Remove the enemy
          if (this.states.enemies[i].health <= 0) {
            // Add score and frags
            this.states.score += this.states.enemies[i].score;
            this.states.frags += 1;

            // Add death
            const death = this.deathsArr.died(
              this.resources,
              this.states.enemies[i].pos[0],
              this.states.enemies[i].pos[1],
              this.states.enemies[i].typeId,
            );
            // if (this.states.enemies[i].speed === 0) {
            death.pos[1] = this.canvas.height - death.sprite.size[1];
            // }
            this.states.deaths.push(death);

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


  getHit(enemy) {
    const time = Date.now();
    if (!enemy.lastHit) { // first
      let [x, y] = [enemy.sprite.size];
      [enemy.soundAttack, enemy.sprite] = this.enemiesArr.inAttack(this.resources, enemy);
      enemy.pos[1] = this.canvas.height - enemy.sprite.size[1];
    }

    if (enemy.lastHit + enemy.reload < time) {
      if (enemy.soundAttack) {
        enemy.soundAttack.currentTime = 0.0;
        enemy.soundAttack.play();
      }
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* for audio necessary have mp3 in url */
class Resources {
  constructor() {
    this.resourceCache = {};
    this.loading = [];
    this.readyCallbacks = [];
  }

  /* Load an image/audio url or an array of urls */
  load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      urlOrArr.forEach((url) => {
        this.resourceCache[url] = false;
      });
      urlOrArr.forEach(url => this.loadUrl(url));
    } else {
      this.loadUrl(urlOrArr);
    }
  }

  loadUrl(url) {
    if (!this.resourceCache[url]) {
      /*
          return this.resourceCache[url];
      } else {
        */

      if (url.indexOf('mp3') >= 0) { // mp3 file=audio
        const aud = new Audio();
        aud.addEventListener('loadedmetadata', () => {
          this.resourceCache[url] = aud;
          if (this.isReady()) {
          // this.readyCallbacks.forEach( (foo) => foo() );
            while (this.readyCallbacks.length) {
              (this.readyCallbacks.pop()());
            }
          }
        });
        aud.src = url;
      } else { // image
        const img = new Image();
        img.onload = () => {
          this.resourceCache[url] = img;
          if (this.isReady()) {
            this.readyCallbacks.forEach(foo => foo());
          }
        };
        img.src = url;
      }
    }
  }

  get(url) {
    return this.resourceCache[url];
  }

  isReady() {
    let ready = true;

    Object.keys(this.resourceCache).forEach((k) => {
      ready = !!this.resourceCache[k];
    });

    /*
    for (let k in this.resourceCache) {
      if(this.resourceCache.hasOwnProperty(k) &&
         !this.resourceCache[k]) {
             ready = false;
      }
    }
    */

    return ready;
  }

  onReady(func) {
    this.readyCallbacks.push(func);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Resources;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Input {
  constructor() {
    this.pressedKeys = {};

    document.addEventListener('keydown', (e) => {
      this.setKey(e, true);
    });

    document.addEventListener('keyup', (e) => {
      this.setKey(e, false);
    });

    window.addEventListener('blur', () => {
      this.pressedKeys = {};
    });
  }

  setKey(e, status) {
    const code = e.keyCode;
    let key;

    switch (code) {
      case 32:
        key = 'SPACE'; break;
      case 37:
        key = 'LEFT'; break;
      case 38:
        key = 'UP'; break;
      case 39:
        key = 'RIGHT'; break;
      case 40:
        key = 'DOWN'; break;
      default:
        // Convert ASCII codes to letters
        key = String.fromCharCode(code);
    }
    this.pressedKeys[key] = status;
  }

  isDown(key) {
    return this.pressedKeys[key];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


class Towers {
  constructor(x, y) {
    this.pos = [x - 128, y - 178];
    this.sprite = new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */](
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Towers;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


class Weapons {
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
        'vertical',
      ],
      damage: 1,
      reload: 1000,
      minScore: 0,
      bulletSpeed: 10,
      lastShoot: 0,
    });


    this.weapons.push({
      pos: [x - 5, y - 5],
      title: './img/bullets/small_title.png',
      sprite: ['./img/bullets/small.png',
        [0, 0],
        [10, 10],
        8,
        [0, 1, 2, 3],
      ],
      damage: 2,
      reload: 500,
      minScore: 5,
      bulletSpeed: 4,
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

      let info = document.createElement('p');
      info.innerHTML = `DMG:${item.damage}`;
      el.appendChild(info);
      info = document.createElement('p');
      info.innerHTML = `SPD:${item.bulletSpeed}`;
      el.appendChild(info);
      info = document.createElement('p');
      info.innerHTML = `REL:${item.reload}`;
      el.appendChild(info);

      this.weaponsEL.appendChild(el);
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
      sprite: new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */](j.sprite),
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Weapons;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


class Enemies {
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
      sprite: new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */](j.sprite),
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
    return [j, new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */](this.enemiesArr[enemy.typeId].spriteAttack)];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemies;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


class Deaths {
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
      pos: [0, 0],
      sound: './music/uni_d.mp3',
      sprite: ['./img/enemies/horse.png',
        [0, 800],
        [125, 100],
        6,
        [0, 1, 2, 3, 4, 5],
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
      sprite: new __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */](j.sprite),
    };

    death.sound.currentTime = 0.0;
    death.sound.play();

    return death;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Deaths;



/***/ })
/******/ ]);