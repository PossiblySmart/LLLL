class Game {

	constructor(gameCanvas, backgroundCanvas, blockSize, map) {

		this.gameCanvas = gameCanvas;
		this.backgroundCanvas = backgroundCanvas;
		this.blockSize = blockSize;
		this.width = gameCanvas.width;
		this.height = gameCanvas.height;
		
		this.backgroundContext = backgroundCanvas.getContext('2d');
		this.gameContext = gameCanvas.getContext('2d');

		this.blocks = map;

		this.towers = new Array;
		this.enemies = new Array;
		this.charges = new Array;

		this.statistics = new Statistics(this);
	}

	clearScene() {
		this.gameContext.clearRect(0, 0, this.width, this.height);
	}

	clearBlocks() {
		this.backgroundContext.clearRect(0, 0, this.width, this.height);
	}

	drawBlocks() {
		this.blocks.forEach(block => { block.drawSelf(); });
	}

	updateBlocks() {

		this.clearBlocks();
		this.drawBlocks();
	}

	drawScene() {

		this.towers.forEach(tower => { tower.drawSelf(); });
		this.enemies.forEach(enemy => { enemy.drawSelf(); });
		this.charges.forEach(charge => { charge.drawSelf(); });
	}

	towerSpotsHighlight(status) {

		this.blocks.forEach(block => { block.highlight = status; });
		this.updateBlocks();
	}

	remove(type, object) {
		this[type].splice(this[type].indexOf(object), 1);
	}

	activateDefense() {
		this.towers.forEach(tower => { tower.defendNexus(); });
	}

	moveEnemies() {
		this.enemies.forEach(enemy => { enemy.move(); });
	}

	moveCharges() {

		if (this.charges.length > 0)
			this.charges.forEach(charge => { charge.move(); });
	}

	spawnEnemy() {

		this.enemies.push(this.newEnemy(randomEnemy(this.statistics.wave)));
		this.statistics.update(this.enemies[this.enemies.length - 1]);
	}

	newEnemy(tier) {

		switch (tier) {
	
			case 1: return new ToxicCarrier(
				
				this,
				this.statistics,
				this.gameCanvas,
				this.blocks,
				this.blockSize,
				this.blockSize,
				0
			);

			case 2: return new ToxicSpreader(

				this,
				this.statistics,
				this.gameCanvas,
				this.blocks,
				this.blockSize,
				this.blockSize,
				0
			);

			case 3: return new DoubleToxicCarrier(
				
				this,
				this.statistics,
				this.gameCanvas,
				this.blocks,
				this.blockSize,
				this.blockSize,
				0
			);
		}
	};
};