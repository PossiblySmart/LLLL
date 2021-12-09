class Enemy {

	constructor(game, statistics, canvas, blocks, size, x, y) {

		this.game = game;
		this.statistics = statistics;

		this.type = 'enemies';

		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.size = size;

		this.angle = 180;
		this.targetAngle = 0;
		this.movesCounter = 0;
		this.alpha = 1.0;

		this.x = x;
		this.y = y;

		this.blocks = blocks;
		
		this.blockIndex;
		this.currentBlock;

		this.directions = ['right', 'bottom', 'top'];

		if (this.canvas.id == 'welcome-canvas')
			this.directions.push('left');

		this.directions.forEach(direction => {
			this[direction + 'Block'];
		});

		this.turned = false;
		this.direction = 'bottom';

		this.getNearbyBlocks();
		this.targetBlock = this.currentBlock;

		this.hitRegistered = false;
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
		
		return Math.floor(
			
			Math.atan2(
				this.targetBlock.y - this.currentBlock.y,
				this.targetBlock.x - this.currentBlock.x
			) * 180 / Math.PI) + 90;
	}

	targetBlockIsReached() {
		return (this.x == this.targetBlock.x &&
				this.y == this.targetBlock.y) ? true : false;
	}

	isDefeated() {
		return this.health <= 0 ? true : false;
	}

	fade() {
		this.alpha -= 0.1;
	}

	move() {

		if (this.isDefeated()) {

			Sounds.play('enemyHasReachedNexus');
			this.statistics.enemyDown(this);
			return;
		}

		if (this.targetBlockIsReached()) {

			this.currentBlock.enemy = 0;
			this.currentBlock.hasEnemy = false;
			
			this.getNearbyBlocks();

			if (this.currentBlock.is('nexus')) {

				Sounds.play('enemyHasReachedNexus');
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

		if (this.rightBlock.is('road') &&
			this.bottomBlock.is('road')) {

			if (this.direction == 'top')
				return 'right';

			else if (this.direction == 'bottom' &&
					 this.movesCounter > this.canvas.height / this.size)
				return 'right';

			else
				return this.randomDirection('right', 'bottom', 50);
		}

		if (this.canvas.id == 'welcome-canvas')
			return 'left';

		if (this.direction == 'right' && this.topBlock.is('road') &&
			this.bottomBlock.is('road')) {

			if (this.movesCounter > 0 &&
				this.movesCounter <= this.canvas.height / this.size)
				return this.randomDirection('top', 'bottom', 50);

			else
				return 'bottom';
		}

		if (this.direction == 'right' && this.topBlock.is('road') &&
			this.rightBlock.is('road')) 
			return this.randomDirection('top', 'right', 50);

		if (this[this.direction + 'Block'].is('road') ||
			this[this.direction + 'Block'].is('nexus'))
			return this.direction;

		for (let i = 0; i < this.directions.length; i++)
			if (this[this.directions[i] + 'Block'].is('road') ||
				this[this.directions[i] + 'Block'].is('nexus'))
				return this.directions[i];
	}

	advance() {

		this.y += (this.targetBlock.y - this.currentBlock.y) / (this.size / this.speed);
		this.x += (this.targetBlock.x - this.currentBlock.x) / (this.size / this.speed);
	}

	turn() {

		this.image = this.state.turn;
		this.hitImage = this.state.turnHit;

		if (this.angle < this.targetAngle)
			this.angle += this.speed;

		else if (this.angle > this.targetAngle)
			this.angle -= this.speed;

		else {

			this.image = this.state.default;
			this.hitImage = this.state.hit;
			this.turned = true;
		}
	}

	drawSelf() {

		this.context.save();
		this.context.globalAlpha = this.alpha;
		this.context.translate(this.x + this.size / 2, this.y + this.size / 2);
		this.context.rotate(this.angle * Math.PI / 180);
		
		this.context.drawImage(
		
			this.image,
			-this.size / 2,
			-this.size / 2,
			this.size,
			this.size
		);

		if (this.hitRegistered) {

			this.context.drawImage(
				
				this.hitImage,
				-this.size / 2,
				-this.size / 2,
				this.size,
				this.size
			);
		}

		this.context.restore();	
	}

	hit(amount) {

		this.health -= amount;
		this.hitRegistered = true;

		setTimeout((enemy) => {
			enemy.hitRegistered = false;
		}, 250, this);
	}
}

class EnemyState {

	constructor(name) {

		this.default = document.getElementById(name + '_0');
		this.hit = document.getElementById(name + '_0_hit');
		this.turn = document.getElementById(name + '_1');
		this.turnHit = document.getElementById(name + '_1_hit');
	}
}

class ToxicCarrier extends Enemy {

	constructor(game, statistics, canvas, blocks, objectSize, x, y) {

		super(game, statistics, canvas, blocks, objectSize, x, y);

		this.name = 'toxicCarrier';
		this.tier = 1;
		this.health = 1;
		this.speed = 4;

		this.state = new EnemyState(this.name);
		this.image = this.state.default;
		this.hitImage = this.state.hit;
	}
}

class ToxicSpreader extends Enemy {

	constructor(game, statistics, canvas, blocks, objectSize, x, y) {

		super(game, statistics, canvas, blocks, objectSize, x, y);

		this.name = 'toxicSpreader';
		this.tier = 2;
		this.health = 500;
		this.speed = 2;

		this.state = new EnemyState(this.name);
		this.image = this.state.default;
		this.hitImage = this.state.hit;
	}
}

class DoubleToxicCarrier extends Enemy {

	constructor(game, statistics, canvas, blocks, objectSize, x, y) {

		super(game, statistics, canvas, blocks, objectSize, x, y);

		this.name = 'doubleToxicCarrier';
		this.tier = 3;
		this.health = 66666;
		this.speed = 5

		this.state = new EnemyState(this.name);
		this.image = this.state.default;
		this.hitImage = this.state.hit;
	}
}
