class Game {

	constructor(gameCanvas, backgroundCanvas) {

		this.blocks = new Array;
		this.towers = new Array;
		this.enemies = new Array;
		this.charges = new Array;

		this.statistics = new Statistics(this);

		this.gameCanvas = gameCanvas;
		this.backgroundCanvas = backgroundCanvas;
		
		this.backgroundContext = backgroundCanvas.getContext('2d');
		this.gameContext = gameCanvas.getContext('2d');

		this.blockSize = gameCanvas.width / 10;
	}

	clearScene() {
		this.gameContext.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
	}

	clearBlocks() {
		this.backgroundContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
	}

	drawBlocks() {
		this.blocks.forEach(block => { block.drawSelf(); });
	}

	drawScene() {

		this.towers.forEach(tower => { tower.drawSelf(); });
		this.enemies.forEach(enemy => { enemy.drawSelf(); });
		this.charges.forEach(charge => { charge.drawSelf(); });
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
		this.charges.forEach(charge => { charge.move(); });
	}

	spawnEnemy() {

		let wave = this.statistics.currentWave;

		switch (true) {

			case (wave < 5): this.enemies.push(this.newEnemy(1)); break;
			case (wave < 12): this.enemies.push(this.newEnemy(Math.random() * 100 > 20 ? 1 : 2)); break;
			case (wave < 15): this.enemies.push(this.newEnemy(Math.random() * 100 > 30 ? 1 : 2)); break;
			case (wave < 30): this.enemies.push(this.newEnemy((Math.random() * 100 < 40) ? ((Math.random() * 100 > 20) ? 2 : 3) : 1)); break;
			case (wave < 40): this.enemies.push(this.newEnemy((Math.random() * 100 < 50) ? ((Math.random() * 100 > 20) ? 2 : 3) : 1)); break;
			case (wave < 70): this.enemies.push(this.newEnemy((Math.random() * 100 < 60) ? ((Math.random() * 100 > 20) ? 2 : 3) : 1)); break;
			case (wave < 100): this.enemies.push(this.newEnemy((Math.random() * 100 < 60) ? ((Math.random() * 100 > 30) ? 2 : 3) : 1)); break;
			case (wave < 178): this.enemies.push(this.newEnemy((Math.random() * 100 < 70) ? ((Math.random() * 100 > 40) ? 2 : 3) : 1)); break;
			case (wave < 256): this.enemies.push(this.newEnemy((Math.random() * 100 < 80) ? ((Math.random() * 100 > 50) ? 2 : 3) : 1)); break;
			
			default: this.enemies.push(this.newEnemy((Math.random() * 100 < 80) ? ((Math.random() * 100 > 50) ? 2 : 3) : 1)); break;
				
		}

		this.statistics.update(this.enemies[this.enemies.length - 1]);
	}

	newEnemy(tier) {

		switch (tier) {

			case 1: return new ToxicCarrier(this, this.statistics, this.gameCanvas, this.blocks, this.blockSize, this.blockSize, 0);
			case 2: return new ToxicSpreader(this, this.statistics, this.gameCanvas, this.blocks, this.blockSize, this.blockSize, 0);
			case 3: return new DoubleToxicCarrier(this, this.statistics, this.gameCanvas, this.blocks, this.blockSize, this.blockSize, 0);
		}
	}

	makeLevel(column) {

		// 1st row

		this.addBlock('tower-spot', 0, 0);
		this.addBlock('breach', 1, 0);

		for (column = 2; column < this.backgroundCanvas.width / this.blockSize; column++)
			this.addBlock('tower-spot', column, 0);

		// 2nd row
			
		this.addBlock('tower-spot', 0, 1);
		this.addBlock('road', 1, 1);
		this.addBlock('tower-spot', 2, 1);
		this.addBlock('tower-spot', 3, 1);

		for (column = 4; column < (this.backgroundCanvas.width / this.blockSize) - 1; column++)
			this.addBlock('road', column, 1);
			
		this.addBlock('tower-spot', 9, 1);

		// 3rd row

		this.addBlock('tower-spot', 0, 2);

		for (column = 1; column < 5; column++)
			this.addBlock('road', column, 2);

		this.addBlock('tower-spot', 5, 2);
		this.addBlock('road', 6, 2);
		this.addBlock('tower-spot', 7, 2);
		this.addBlock('road', 8, 2);
		this.addBlock('tower-spot', 9, 2);

		// 4th row

		this.addBlock('tower-spot', 0, 3);
		this.addBlock('road', 1, 3);
		this.addBlock('tower-spot', 2, 3);
		this.addBlock('tower-spot', 3, 3);
		this.addBlock('road', 4, 3);
		this.addBlock('tower-spot', 5, 3);
		this.addBlock('road', 6, 3);
		this.addBlock('road', 7, 3);
		this.addBlock('road', 8, 3);
		this.addBlock('tower-spot', 9, 3);

		// 5th row

		this.addBlock('tower-spot', 0, 4);

		for (column = 1; column < 7; column++)
			this.addBlock('road', column, 4);

		this.addBlock('tower-spot', 7, 4);
		this.addBlock('road', 8, 4);
		this.addBlock('nexus', 9, 4);

		// 6th row

		for (column = 0; column < this.backgroundCanvas.width / this.blockSize; column++)
			this.addBlock('tower-spot', column, 5);
	}

	addBlock(type, column, row) {
	
		switch (type) {

			case 'tower-spot':
				this.blocks.push(new TowerSpot(this.backgroundCanvas, column * this.blockSize, row * this.blockSize, this.blockSize, 'none'));
				break;
			case 'breach':
				this.blocks.push(new Breach(this.backgroundCanvas, column * this.blockSize, row * this.blockSize, this.blockSize, 'none'));
				break;
			case 'nexus':
				this.blocks.push(new Nexus(this.backgroundCanvas, column * this.blockSize, row * this.blockSize, this.blockSize, 'none'));
				break;
			case 'road':
				this.blocks.push(new Road(this.backgroundCanvas, column * this.blockSize, row * this.blockSize, this.blockSize, 'none'));
				break;
		}
	}
};