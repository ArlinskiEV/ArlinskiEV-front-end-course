import Game from './game.js';


//start Game
let myGame = new Game();
resources.load([
    './img/terrain.png',
    './img/tower.png',
    './img/bullets/bullet.png',
    './img/enemies/skeleton.png',
    './img/enemies/temp.png'
]);
resources.onReady(() => {
    myGame.states.terrainPattern = myGame.ctx.createPattern(resources.get('./img/terrain.png'), 'repeat');
    myGame.pause();
});

myGame.main();
