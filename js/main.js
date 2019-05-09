
window.addEventListener('load', function () {
    InitializeUtils();
    Welcome();
});

const PlayGame = () => {

    const canvas = document.getElementById('main-canvas');
    const background = document.getElementById('background-canvas');
    const blockSize = canvas.width / 10;
    const map = new Map(background, blockSize);

    const game = new Game(canvas, background, blockSize, map.theDock());
    const shop = new Shop(game, canvas);

    var refreshID;

    InitializeEnemySpawning(game);

    game.drawBlocks();
    shop.open();

    const refresh = () => {

        if (game.statistics.gold < 0) {
            EndGame(refreshID);
            return;
        }

        shop.checkAvailability();
        game.statistics.checkWave();

        game.clearScene();
        game.activateDefense();
        game.moveEnemies();
        game.moveCharges();
        game.drawScene();

        console.log('lol');

        refreshID = requestAnimationFrame(refresh);
    }

    refresh();
};

const EndGame = (refreshID) => {

    const defeatScreen = document.getElementById('defeat');

    Object.keys(Indicators).forEach(property => {
        IndicatorsEndGame[property].innerHTML = Indicators[property].innerHTML;
    });

    cancelAnimationFrame(refreshID);

    Sounds.gameOver.volume = 0.5;
    Sounds.gameOver.play();
    
    defeatScreen.style.transform = 'scale(1)';
    defeatScreen.style.opacity = 1;
};
