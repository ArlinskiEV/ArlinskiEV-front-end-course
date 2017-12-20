import Resources from './resources';
import Game from './game';


//start-Game
const resources = new Resources();
const myGame = new Game(resources);
resources.load([
    './img/terrain.png',
    './img/tower.png',
    './img/bullets/bullet.png',
    './music/3.mp3',
    './music/2.mp3',
    //'./music/2.wav',
    './img/enemies/skeleton.png',
    './img/enemies/temp.png'
]);

resources.onReady(() => {
    myGame.states.terrainPattern = myGame.ctx.createPattern(resources.get('./img/terrain.png'), 'repeat');
    myGame.pause();
});

myGame.main();
