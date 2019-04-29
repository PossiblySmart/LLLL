class Caesar {

	constructor(mainCanvas, backgroundCanvas) {

		this.blocks = new Array;
		this.towers = new Array;
		this.enemies = new Array;
		this.projectiles = new Array;

		this.mainCanvas = mainCanvas;
		this.backgroundCanvas = backgroundCanvas;
		
		this.backgroundContext = backgroundCanvas.getContext('2d');
		this.mainContext = mainCanvas.getContext('2d');

		this.blockSize = mainCanvas.width / 10;
	}

	clearScene() {
		this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
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
		this.projectiles.forEach(projectile => { projectile.drawSelf(); });
	}

	removeObject(type, object) {
		this[type].splice(this[type].indexOf(object), 1);
   }
	
	rotateAllTowers() {
		this.towers.forEach(tower => { tower.rotate(2); })
	}

	spawnEnemy() {
		this.enemies.push(new ToxicCarrier(this.mainCanvas, this.blocks, this.blockSize, this.blockSize, 0));
	}

	moveEnemies() {
		this.enemies.forEach(enemy => { enemy.move(); });
	}

	makeLevel(column) {

		this.addBlock('tower-spot', 0, 0);
		this.addBlock('breach', 1, 0);
		this.addBlock('tower-spot', 0, 1);
		this.addBlock('road', 1, 1);
		this.addBlock('tower-spot', 2, 1);
		this.addBlock('tower-spot', 3, 1);
		this.addBlock('tower-spot', 9, 1);
		this.addBlock('tower-spot', 0, 2);
		this.addBlock('tower-spot', 5, 2);
		this.addBlock('road', 6, 2);
		this.addBlock('tower-spot', 7, 2);
		this.addBlock('road', 8, 2);
		this.addBlock('tower-spot', 9, 2);
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
		this.addBlock('tower-spot', 0, 4);
		this.addBlock('tower-spot', 7, 4);
		this.addBlock('road', 8, 4);
		this.addBlock('nexus', 9, 4);

		for (column = 4; column < (this.backgroundCanvas.width / this.blockSize) - 1; column++)
			this.addBlock('road', column, 1);

		for (column = 0; column < this.backgroundCanvas.width / this.blockSize; column++)
			this.addBlock('tower-spot', column, 5);

		for (column = 2; column < this.backgroundCanvas.width / this.blockSize; column++)
			this.addBlock('tower-spot', column, 0);

		for (column = 1; column < 5; column++)
			this.addBlock('road', column, 2);

		for (column = 1; column < 7; column++)
			this.addBlock('road', column, 4);	
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