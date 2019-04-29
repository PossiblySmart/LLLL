class Castra {

	constructor(canvas) {

		this.canvas = canvas;

		this.galacticMarinePurchaseButton = document.getElementById('galactic-marine-purchase-btn');
    	this.orcusChargerPurchaseButton = document.getElementById('orcus-charger-purchase-btn');
		this.cptAndromedaPurchaseButton = document.getElementById('cpt-andromeda-purchase-btn');

		this.cursorX;
		this.cursorY;
	}

	openShop(centurion, legatus, ludus, ludusPrime, towerType, canvasObjectSize) {

		this.galacticMarinePurchaseButton.addEventListener('click', function() {
			towerType = 'galacticMarine';
		});
	
		this.orcusChargerPurchaseButton.addEventListener('click', function() {
			towerType = 'orcusCharger';
		});
	
		this.cptAndromedaPurchaseButton.addEventListener('click', function() {
			towerType = 'cptAndromeda';
		});

		this.canvas.addEventListener('click', function(row, column, selectedBlock) {

			row = Math.floor(this.cursorX / 100);
			column = Math.floor(this.cursorY / 100)

			selectedBlock = centurion.blocks[row + column * 10];
			
			if (towerType != null && selectedBlock.type == 'tower-spot' && selectedBlock.status != 'occupied') {
	
				legatus.addObject('towers', new Tower(towerType, canvasObjectSize * row, canvasObjectSize * column, ludus));
				
				selectedBlock.status = 'occupied';
				towerType = null;

				ludusPrime.clearMap();
				centurion.drawBlocks();
			}
		});
	}

	trackMouse() {

		this.canvas.addEventListener('mousemove', function(event) {

			this.cursorX = event.offsetX;
			this.cursorY = event.offsetY;
		});
	}
}