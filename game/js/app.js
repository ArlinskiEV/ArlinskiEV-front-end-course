class Game {
    constructor(containerId, gameWidth, gameHeight) {
        //variables
        this.game = this;
        this.containerId = containerId || 'game';
        this.gameWidth = gameWidth || 1200;
        this.gameHeight = gameHeight || 250;
        this.scoreEl = document.getElementById('score');
        this.fragsEl = document.getElementById('frags');
        this.healthEl = document.getElementById('health');

        // Create the canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.gameWidth;
        this.canvas.height = this.gameHeight;
        document.getElementById(this.containerId).appendChild(this.canvas);

        this.lastTime = 0;


        //listeners
        this.canvas.addEventListener('mouseup', function (e) {
            let x = e.pageX - e.target.offsetLeft,
                y = e.pageY - e.target.offsetTop;

            Game.prototype.mouseHandler.bind(myGame)(x, y);
        });
        document.getElementById('reset').addEventListener('click', function (e) {
            Game.prototype.reset.bind(myGame)();
            Game.prototype.main.bind(myGame)();
        });
        document.getElementById('play-pause').addEventListener('click', function (e) {
            Game.prototype.pause.bind(myGame)();
        });

        // States
        this.states = {
            tower: {
                pos: [(this.canvas.width - 128), (this.canvas.height - 178)],
                sprite: new Sprite('./img/tower.png',
                                    [0, 0],
                                    [128, 178],
                                    6,
                                    [0,1,2,3,4]
                                )
            },
            terrainPattern: null
        };
        this.reset();
    };

    // Set default params
    reset() {
        this.states.isGameOver = false;
        this.states.isPaused = true;
        this.states.gameTime = 0;
        this.states.score = 0;
        this.states.frags = 0;
        this.states.enemies = [];
        this.states.bullets = [];
        this.states.explosions = [];
        this.states.deaths = [];
        this.states.tower.health = 1000;
    };

    // The main game loop
    main(game) {
        let now = Date.now();
        let dt = (now - this.lastTime) / 1000.0;

        if ((!this.states.isGameOver) && (!this.states.isPaused)) {
            this.update(dt);
            this.render();

            this.lastTime = now;
            requestAnimationFrame(Game.prototype.main.bind(this));
        };
    };

    gameOver() {
        this.states.isGameOver = true;
        console.log(`------------------------------GAME OVER--------------`);
        alert('GAME OVER');
    };
    pause() {
        this.states.isPaused = !this.states.isPaused;
        if (!this.states.isPaused) {
            this.main();
        }
    };

    checkCollisions() {
        function collides(x, y, r, b, x2, y2, r2, b2) {
            return !(r <= x2 || x > r2 ||
                     b <= y2 || y > b2);
        };

        function boxCollides(pos, size, pos2, size2) {
            return collides(pos[0], pos[1],
                            pos[0] + size[0], pos[1] + size[1],
                            pos2[0], pos2[1],
                            pos2[0] + size2[0], pos2[1] + size2[1]);
        };

        // Run collision detection for all enemies and bullets
        for (let i = 0; i < this.states.enemies.length; i++) {
            let pos = this.states.enemies[i].pos;
            let size = this.states.enemies[i].sprite.size;

            //enemies-tower
            if (boxCollides(pos, size, this.states.tower.pos, this.states.tower.sprite.size)) {

                this.getHit(this.states.enemies[i]);
                this.states.enemies.splice(i, 1);
                i--;
            }

            //enemies-bullet
            for (let j = 0; j < this.states.bullets.length; j++) {
                let pos2 = this.states.bullets[j].pos;
                let size2 = this.states.bullets[j].sprite.size;

                if (boxCollides(pos, size, pos2, size2)) {
                    this.hitting(this.states.bullets[j], this.states.enemies[i]);
                    // Remove the enemy
                    if (this.states.enemies[i].health <= 0) {
                        // Add score and frags
                        this.states.score += this.states.enemies[i].score.cost;
                        this.states.frags++;

                        // Add an explosion and death
                        this.states.enemies.splice(i, 1);
                        i--;
                    };

                    // Remove the bullet and stop this iteration
                    this.states.bullets.splice(j, 1);
                    j = this.states.bullets.length + 1;
                };
            };

        };
    };


    // Draw everything
    render() {
        this.ctx.fillStyle = this.states.terrainPattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        [this.states.tower].concat(
            this.states.bullets,
            this.states.enemies,
            this.states.explosions,
            this.states.deaths)
            .forEach(Game.prototype.renderEntity.bind(this));
    };

    renderEntity(entity) {
        this.ctx.save();
        this.ctx.translate(entity.pos[0], entity.pos[1]);
        entity.sprite.render(this.ctx); //from Sprite.js
        this.ctx.restore();
    };

    mouseHandler(x, y) {
        //create bullet
        let a = x - this.states.tower.pos[0],
            b = y - this.states.tower.pos[1];
        if ((!this.states.isPaused) && (this.states.bullets.length < 2)) {
            this.shoot(a, b);
        }
    };

    // Update states of all objects
    update(dt) {
        this.states.gameTime += dt;

        //-----------------------------------------------------------off
        //handleInput(dt);
        this.updateEntities(dt);

        let ddt = Date.now() - (this.lastadd || 0);
        let flag = ddt > (1000 - this.states.score * 10); //times between enemies
        flag = flag && (this.states.enemies.length < 1+this.states.score);
        if (flag) {
            let enemy = this.getEnemy();
            this.states.enemies.push(enemy);
            this.lastadd = Date.now();
        };

        this.checkCollisions();

        this.scoreEl.innerHTML = this.states.score;
        this.fragsEl.innerHTML = this.states.frags;
        this.healthEl.innerHTML = this.states.tower.health;
    };

    updateEntities(dt) {
        // Update the tower
        this.states.tower.sprite.update(dt);

        if (this.states.tower.health <= 0) {
            this.states.isGameOver = true;
            this.gameOver();
        }

        // Update all the bullets
        for (let i = 0; i < this.states.bullets.length; i++) {
            let bullet = this.states.bullets[i];
            bullet.pos[0] = bullet.pos[0] + bullet.target[0] * bullet.speed;
            bullet.pos[1] = bullet.pos[1] + bullet.target[1] * bullet.speed;
            bullet.sprite.update(dt);
            // Remove the bullet if it goes offscreen
            if(bullet.pos[1] < 0 || bullet.pos[1] > this.canvas.height ||
               bullet.pos[0] > this.canvas.width) {
                this.states.bullets.splice(i, 1);
                i--;
            }
        };


        // Update all the enemies
        for (let i = 0; i < this.states.enemies.length; i++) {
            let enemy = this.states.enemies[i];
            enemy.pos[0] += enemy.speed * dt;
            enemy.sprite.update(dt);
            // Stop if near tower
            if (enemy.pos[0] > 1200 - 128 + 2) {
                enemy.speed = 0;
                console.log('enemy stop');
                enemy.pos[0] = 1200 - 128 + 1;
                enemy.sprite.speed = 0;
            };
        };


        // Update all the explosions
        this.states.explosions.forEach(function(explosion, i, explosions) {
            explosion.sprite.update(dt);

            // Remove if animation is done
            if(explosion.sprite.done) {
                explosions.splice(i, 1);
                console.log('expl done');
            }

        });
        // Update all the deaths
        this.states.deaths.forEach(function(death, i, deaths) {
            death.sprite.update(dt);

            // Remove if animation is done
            if(death.sprite.done) {
                deaths.splice(i, 1);
                console.log('death done');
            }

        });
    };


//---------------------------------------------------------actions
    shoot(x, y) {
        let bullet = {
            pos: [this.states.tower.pos[0], this.states.tower.pos[1]],
            sprite: new Sprite('./img/bullets/bullet.png',
                                [0, 0],
                                [44, 44],
                                6,
                                [0,1,2,1],
                                'vertical'
                            ),
            damage: 1,
            speed: 0.3, //bullet speed
            target: [-1, 1]//[x, y]
        };
        this.states.bullets.push(bullet);
    };

    getEnemy() {
        let enemy = {
            pos: [50, (this.canvas.height - 80)], //ground minus enemy size
            sprite: new Sprite('./img/enemies/skeleton.png',
                                [0, 0],
                                [90, 80],
                                8,
                                [0,1,2,3,4,5,6,7,8,9,10,11],
                                'vertical'
                            ),
            score: {
                cost: 2,
                start: 0
            },
            //enemy health,damage,speed
            health: 1,
            damage: 100,
            speed: 100
        };
        return enemy;
    };

    hitting(bullet, enemy) {
        enemy.health -= bullet.damage;
    };
    getHit(enemy) {
        this.states.tower.health -= enemy.damage;
        console.log('hit');
    };

};


//start Game
let myGame = new Game();
resources.load([
    './img/terrain.png',
    './img/tower.png',
    './img/bullets/bullet.png',
    './img/enemies/skeleton.png'
]);
//resources.onReady();
myGame.main();
