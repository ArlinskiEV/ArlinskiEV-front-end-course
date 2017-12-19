
//init
(function() {
    let container = document.getElementById('application');
    let controls = document.createElement('section').classList.add('controls');
    let game = document.createElement('section');
    let weapons = document.createElement('section').classList.add('weapons');

    game.id = 'game';
    weapons.id = 'weapons';

    //create buttons
    let button = document.createElement('button');
    button.id = 'play-pause';
    button.innerHTML = 'Play/Pause';
    controls.appendChild(button.cloneNode(true));

    button.id = 'reset';
    button.innerHTML = 'Reset';
    controls.appendChild(button.cloneNode(true));


    //create info
    let info = document.createElement('p').classList.add('info');
    let digitInfo = document.createElement('span');
    digitInfo.id = 'health';
    digitInfo.innerHTML = '0';
    info.innerHTML = 'Health:';
    info.appendChild(digitInfo);
    controls.appendChild(info.cloneNode(true));

    info.inn


    container.appendChild(controls);
    container.appendChild(game);
    container.appendChild(weapons);


}());
