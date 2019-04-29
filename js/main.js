
window.addEventListener('load', function () {
    startGame();
});

function loadWelcomeScreen() {
    startGame();
}

function startGame() {

    const canvas = document.getElementById('main-canvas');
    const background = document.getElementById('background-canvas');

    // Game handlers

    const caesar = new Caesar(canvas, background);

    caesar.makeLevel(0, 0);
    caesar.drawBlocks();
    caesar.spawnEnemy();
    
    openShop(canvas, caesar);

    function refresh() {

        caesar.clearScene();
        caesar.rotateAllTowers();
        caesar.moveEnemies();
        caesar.drawScene();

        requestAnimationFrame(refresh);
    }

    refresh();

    /*const ludus = new Ludus(canvas, canvasObjectSize);
    const ludusPrime = new Ludus(background, canvasObjectSize);
    const centurion = new Centurion();
    const legatus = new Legatus();
    const opifex = new Opifex(centurion, ludusPrime);
    const castra = new Castra(canvas);

    opifex.createLevelOne(0, 0);
    centurion.drawBlocks();

    castra.trackMouse();
    castra.openShop(centurion, legatus, ludus, ludusPrime, null, canvasObjectSize);

    function refresh() {

        ludus.clearMap();
        legatus.rotateAllTowers();
        legatus.drawScene();
        requestAnimationFrame(refresh);
    }

    refresh();*/
}

function openShop(canvas, caesar) {

    const galacticMarinePurchaseButton = document.getElementById('galactic-marine-purchase-btn');
    const orcusChargerPurchaseButton = document.getElementById('orcus-charger-purchase-btn');
    const cptAndromedaPurchaseButton = document.getElementById('cpt-andromeda-purchase-btn');

    let cursorX;
    let cursorY;

    var towerType = null;

    galacticMarinePurchaseButton.addEventListener('click', function() {
        towerType = 'galactic-marine';
    });

    orcusChargerPurchaseButton.addEventListener('click', function() {
        towerType = 'orcus-charger'; 
    });

    cptAndromedaPurchaseButton.addEventListener('click', function() {
        towerType = 'cpt-andromeda';
    });

    canvas.addEventListener('click', function(row, column, selectedBlock) {	

        row = Math.floor(cursorX / 100);
        column = Math.floor(cursorY / 100)

        selectedBlock = caesar.blocks[row + column * 10];
        
        if (towerType != null && selectedBlock.type == 'tower-spot' && selectedBlock.status != 'occupied') {

            switch (towerType) {

                case 'galactic-marine':
                    caesar.towers.push(new GalacticMarine(canvas, caesar.objectSize, row * caesar.objectSize, column * caesar.objectSize));
                    break;

                case 'orcus-charger':
                    caesar.towers.push(new OrcusCharger(canvas, caesar.objectSize, row * caesar.objectSize, column * caesar.objectSize));
                    break;

                case 'cpt-andromeda':
                    caesar.towers.push(new CptAndromeda(canvas, caesar.objectSize, row * caesar.objectSize, column * caesar.objectSize));
                    break;
            }

            selectedBlock.status = 'occupied';
            towerType = null;

            caesar.clearBlocks();
            caesar.drawBlocks();
        }
    });

    canvas.addEventListener('mousemove', function(event) {

        cursorX = event.offsetX;
        cursorY = event.offsetY;
    });
}
