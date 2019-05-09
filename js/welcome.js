
const Welcome = () => {

    const welcomeSreen = document.getElementById('welcome');
    const gameScreen = document.getElementById('game');
    
    const canvas = document.getElementById('welcome-canvas');
    const blockSize = 100;
    const map = new Map(canvas, blockSize);
    const game = new Game(canvas, canvas, blockSize, map.welcome());

    const startGame = () => {

        cancelAnimationFrame(frameID);

        welcomeSreen.style.opacity = 0;
        welcomeSreen.style.transform = 'scale(0)';
        gameScreen.style.opacity = 1;

        window.removeEventListener('keydown', startGame);
        PlayGame();
    }

    const refresh = () => {
    
        game.clearScene();
        game.drawBlocks();
        game.activateDefense();
        game.moveEnemies();
        game.moveCharges();
        game.drawScene();

        frameID = requestAnimationFrame(refresh);
    };
    
    var frameID;

    game.spawnEnemy();
    game.towers.push(
        new GalacticMarineWelcome(
            game,
            game.statistics,
            canvas,
            blockSize,
            200,
            100
        )
    );
    game.towers.push(
        new GalacticMarineWelcome(
            game,
            game.statistics,
            canvas,
            blockSize,
            0,
            0
        )
    );

    window.addEventListener('keydown', startGame);
    refresh();
};