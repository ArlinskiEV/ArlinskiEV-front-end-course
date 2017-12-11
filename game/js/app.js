class Game {
    constructor(containerId, gameWidth, gameHeight) {
        //variables
        this.game = this;
        this.containerId = containerId || 'game';
        this.gameWidth = gameWidth || 1200;
        this.gameHeight = gameHeight || 500;

        // Create the canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.gameWidth;
        this.canvas.height = this.gameHeight;
        document.getElementById(this.containerId).appendChild(this.canvas);

        this.lastTime = 0;

        // States
        this.states = {
            tower: {
                health: 1000
            },
            score: 0,
            scoreEl: document.getElementById('score'),
            gameTime: 0,
            isGameOver: false,
            terrainPattern: null,

            bullets: [],
            enemies: [],
            explosions: []
        };
    };

    // The main game loop
    main(game) {
        let now = Date.now();
        let dt = (now - this.lastTime) / 1000.0;

        this.update(dt);
        this.render();

        this.lastTime = now;
        requestAnimationFrame(Game.prototype.main.bind(this));
    };

    // Update states of all objects
    update(dt) {
        this.states.gameTime += dt;

        //-----------------------------------------------------------off
        //handleInput(dt);
        this.updateEntities(dt);

        // It gets harder over time by adding enemies using this
        // equation: 1-.993^gameTime
        let rand = Math.random();
        let diff = Math.pow(.993, this.states.gameTime);
        let ddt = Date.now() - (this.lastadd || 0);
        let flag = ddt > 700;
        //-----------------------------------------------------------edit
        if ((rand < 1 - diff) && (this.states.enemies.length < 10) && (flag)) {
            let enemy = {
                pos: [0, (this.canvas.height - 39)], //ground minus enemy size
                sprite: new Sprite('./img/temp.png',//url
                                    [0, 0],//pos
                                    [80, 39],//size
                                   6,//speed fps
                                   [0, 1, 2, 3, 2, 1]),//frames
                speed: 100 //enemy speed
            };
            this.states.enemies.push(enemy);
            this.lastadd = Date.now();
            console.log('enemy add');
        } else {
            console.log(`no add: rand=${rand} 1-diff=${1-diff}`);
            console.log(`lastadd=${this.lastadd} ddt=${ddt}`);
        }

        this.checkCollisions();

        this.states.scoreEl.innerHTML = this.states.score;
    };

    updateEntities(dt) {
        // Update the tower
        // Update all the bullets
            // Remove the bullet if it goes offscreen
        // Update all the enemies
        this.states.enemies.forEach(function(enemy) {
            enemy.pos[0] += enemy.speed * dt;
            enemy.sprite.update(dt);
            // Stop if near tower
            if (enemy.pos[0] > 1100) {
                enemy.speed = 0;
                console.log('enemy stop');
            };
        });


        // Update all the explosions
        this.states.explosions.forEach(function(explosion, i, explosions) {
            explosion.sprite.update(dt);

            // Remove if animation is done
            if(explosion.sprite.done) {
                explosions.splice(i, 1);
                console.log('expl done');
            }

        });
    };

    checkCollisions() {
        //enemies-tower
        //bullets-enemies
    };


    // Draw everything
    render() {
        this.ctx.fillStyle = this.states.terrainPattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        [].concat(this.states.bullets, this.states.enemies, this.states.explosions).forEach(Game.prototype.renderEntity.bind(this));
    };

    renderEntity(entity) {
        this.ctx.save();
        this.ctx.translate(entity.pos[0], entity.pos[1]);
        entity.sprite.render(this.ctx); //from Sprite.js
        this.ctx.restore();
    };
};


//start Game
let myGame = new Game();
resources.load([
    './img/temp.png',
    './img/terrain.png'
]);
//resources.onReady(init);
//myGame.main();
