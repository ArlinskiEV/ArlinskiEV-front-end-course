
// init
(function init() {
  const container = document.getElementById('application');
  const controls = document.createElement('section').classList.add('controls');
  const game = document.createElement('section');
  const weapons = document.createElement('section').classList.add('weapons');

  game.id = 'game';
  weapons.id = 'weapons';

  // create buttons
  const button = document.createElement('button');
  button.id = 'play-pause';
  button.innerHTML = 'Play/Pause';
  controls.appendChild(button.cloneNode(true));

  button.id = 'reset';
  button.innerHTML = 'Reset';
  controls.appendChild(button.cloneNode(true));


  // create info
  const info = document.createElement('p').classList.add('info');
  const digitInfo = document.createElement('span');
  digitInfo.id = 'health';
  digitInfo.innerHTML = '0';
  info.innerHTML = 'Health:';
  info.appendChild(digitInfo);
  controls.appendChild(info.cloneNode(true));

  info.innerHTML = ''; // ?????


  container.appendChild(controls);
  container.appendChild(game);
  container.appendChild(weapons);
}());
