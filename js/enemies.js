class Enemy {

	constructor(game, statistics, canvas, blocks, size, x, y) {

		this.game = game;
		this.statistics = statistics;

		this.type = 'enemies';

		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.size = size;

		this.currentAngle = 180;
		this.targetAngle = 0;
		this.movesCounter = 0;
		this.alpha = 1.0;

		this.x = x;
		this.y = y;

		this.bodyWidthStart = this.x + (this.size - this.width) / 2;
		this.bodyWidthEnd = this.bodyWidthStart + this.width;

		this.bodyHeightStart = this.y + (this.size - this.height) / 2;
		this.bodyHeightEnd = this.bodyHeightStart + this.height;

		this.body

		this.blocks = blocks;
		
		this.blockIndex;
		this.currentBlock;

		this.directions = ['right', 'bottom', 'top'];

		this.directions.forEach(direction => {
			this[direction + 'Block'];
		});

		this.turned = false;
		this.direction = 'bottom';

		this.getNearbyBlocks();
		this.targetBlock = this.currentBlock;
	}

	getNearbyBlocks() {

		this.blockIndex = Math.floor(this.x / this.size) + Math.floor(this.y / this.size) * 10;

		this.currentBlock = this.blocks[this.blockIndex];
		this.topBlock = this.blocks[this.blockIndex - 10];
		this.bottomBlock = this.blocks[this.blockIndex + 10];
		this.rightBlock = this.blocks[this.blockIndex + 1];

		this.directions.forEach(direction => {
			if (this[direction + 'Block'] == undefined)
				this[direction + 'Block'] = this.currentBlock;
		});

		this.currentBlock.hasEnemy = true;
		this.currentBlock.enemy = this;
	}

	findTargetBlock() {

		this.direction = this.getDirection();
		return this[this.direction + 'Block'];
	}

	calculateTargetAngle() {
		return Math.floor(Math.atan2(this.targetBlock.y - this.currentBlock.y, this.targetBlock.x - this.currentBlock.x) * 180 / Math.PI) + 90;
	}

	targetBlockIsReached() {
		return (this.x == this.targetBlock.x && this.y == this.targetBlock.y) ? true : false;
	}

	isDefeated() {
		return this.health <= 0 ? true : false;
	}

	fade() {
		this.alpha -= 0.1;
	}

	move() {

		if (this.isDefeated()) {

			if (this.alpha > 0 )
				this.fade();
			
			else
				this.statistics.enemyDown(this);

			return;
		}

		if (this.targetBlockIsReached()) {

			this.currentBlock.enemy = 0;
			this.currentBlock.hasEnemy = false;
			
			this.getNearbyBlocks();

			if (this.currentBlock.is('nexus')) {

				if (this.alpha > 0) this.fade();
				else this.statistics.enemyHasReachedNexus(this);
				return;
			}

			this.targetBlock = this.findTargetBlock();
			this.turned = false;
			this.targetAngle = this.calculateTargetAngle();

			this.movesCounter++;
		}

		if (this.turned)
			this.advance();
		else
			this.turn();
	}

	randomDirection(directionA, directionB, chance) {
		return (Math.random() * 100 > chance) ? directionA : directionB;
	}

	getDirection() {

		if (this.rightBlock.is('road') && this.bottomBlock.is('road')) {

			if (this.direction == 'top')
				return 'right';

			else if (this.direction == 'bottom' && this.movesCounter > this.canvas.height / this.size)
				return 'right';

			else
				return this.randomDirection('right', 'bottom', 50);
		}

		if (this.direction == 'right' && this.topBlock.is('road') && this.bottomBlock.is('road')) {

			if (this.movesCounter > 0 && this.movesCounter <= this.canvas.height / this.size)
				return this.randomDirection('top', 'bottom', 50);

			else
				return 'bottom';
		}

		if (this.direction == 'right' && this.topBlock.is('road') && this.rightBlock.is('road')) 
			return this.randomDirection('top', 'right', 50);

		if (this[this.direction + 'Block'].is('road') || this[this.direction + 'Block'].is('nexus'))
			return this.direction;

		for (let i = 0; i < this.directions.length; i++)
			if (this[this.directions[i] + 'Block'].is('road') || this[this.directions[i] + 'Block'].is('nexus'))
				return this.directions[i];
	}

	advance() {

		this.y += (this.targetBlock.y - this.currentBlock.y) / (this.size / this.speed);
		this.x += (this.targetBlock.x - this.currentBlock.x) / (this.size / this.speed);
	}

	turn() {

		if (this.currentAngle < this.targetAngle)
			this.currentAngle += this.speed;

		else if (this.currentAngle > this.targetAngle)
			this.currentAngle -= this.speed;

		else this.turned = true;
	}

	drawSelf() {

		this.context.save();
		this.context.globalAlpha = this.alpha;
		this.context.translate(this.x + this.width / 2 + (this.size - this.size * this.width / 100) / 2, this.y + this.height / 2 + this.size * this.height / 1000);
		this.context.rotate(this.currentAngle * Math.PI / 180);
		this.context.drawImage(this.image, -(this.size * this.width / 100) / 2 + 1, -(this.size * this.height / 100) / 2 - 4, this.size * this.width / 100, this.size * this.height / 100);
		this.context.restore();	
	}

	hit(amount) {

		const enemy = this;

		this.health -= amount;
		this.image = document.getElementById(this.name + '-hit');

		setTimeout(() => {
			enemy.image = document.getElementById(enemy.name);
		}, 250);
	}
}

class ToxicCarrier extends Enemy {

	constructor(game, statistics, canvas, blocks, objectSize, x, y) {

		super(game, statistics, canvas, blocks, objectSize, x, y);

		this.name = 'toxic-carrier';
		this.image = document.getElementById(this.name);
		this.width = this.image.width;
		this.height = this.image.height;
		this.tier = 1;

		this.health = 100;

		this.speed = 1;
	}
}

class ToxicSpreader extends Enemy {

	constructor(game, statistics, canvas, blocks, objectSize, x, y) {

		super(game, statistics, canvas, blocks, objectSize, x, y);

		this.name = 'toxic-spreader';
		this.image = document.getElementById(this.name);
		this.width = this.image.width;
		this.height = this.image.height;
		this.tier = 2;

		this.health = 70;

		this.speed = 2;
	}
}

class DoubleToxicCarrier extends Enemy {

	constructor(game, statistics, canvas, blocks, objectSize, x, y) {

		super(game, statistics, canvas, blocks, objectSize, x, y);

		this.name = 'double-toxic-carrier';
		this.image = document.getElementById(this.name);
		this.width = this.image.width;
		this.height = this.image.height;
		this.tier = 3;

		this.health = 700;

		this.speed = 0.5;
	}
}
