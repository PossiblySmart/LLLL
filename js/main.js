
window.addEventListener('load', function () {
    startGame();
});

function loadWelcomeScreen() {
    startGame();
}

function startGame() {

    const canvas = document.getElementById('main-canvas');
    const background = document.getElementById('background-canvas');

    const game = new Game(canvas, background);
    const shop = new Shop(game, canvas);

    var spawnInterval;

    const spawn = function() {
        game.spawnEnemy();
    }

    window.addEventListener('focus', function() {
        clearInterval(spawnInterval);
        spawnInterval = setInterval(spawn, game.statistics.enemySpawnDelay);
    });

    window.addEventListener('blur', function() {
        clearInterval(spawnInterval);
    });

    // setInterval(function() {
    //     game.enemies.forEach(enemy => { enemy.hit(25); });
    // }, 1500);

    game.makeLevel(0, 0);
    game.drawBlocks();
    game.spawnEnemy();
    shop.open();

    spawnInterval = setInterval(spawn, game.statistics.enemySpawnDelay);

    function refresh() {

        game.clearScene();
        game.activateDefense();
        game.moveEnemies();
        shop.checkGold();
        game.moveCharges();
        game.drawScene();

        requestAnimationFrame(refresh);
    }

    refresh();
}
