class Enemy {

	constructor(canvas, blocks, size, x, y) {

		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.size = size;

		this.currentAngle = 180;
		this.targetAngle = 0;

		this.x = x;
		this.y = y;

		this.blocks = blocks;
		
		this.blockIndex;
		this.currentBlock;

		this.directions = ['top', 'left', 'bottom', 'right'];

		this.directions.forEach(direction => {
			this[direction + 'Block'];
		});

		this.turned = false;
		this.direction = 'bottom';

		this.getNearbyBlocks();
		this.targetBlock = this.currentBlock;
	}

	drawSelf() {

		this.context.save();
		this.context.translate(this.x + this.width / 2 + (this.size - this.size * this.width / 100) / 2, this.y + this.height / 2 + this.size * this.height / 1000);
		this.context.rotate(this.currentAngle * Math.PI / 180);
		this.context.drawImage(this.image, -(this.size * this.width / 100) / 2 + 1, -(this.size * this.height / 100) / 2 - 4, this.size * this.width / 100, this.size * this.height / 100);
		this.context.restore();	
	}

	move() {

		if (this.targetHasBeenReached()) {

			this.targetBlock = this.findTargetBlock();
			this.turned = false;
			this.targetAngle = this.calculateTargetAngle();
		}

		if (this.turned) {

			this.advance();
			this.getNearbyBlocks();
		}

		else
			this.turn();
	}

	targetHasBeenReached() {
		return (this.currentBlock.x == this.targetBlock.x && this.currentBlock.y == this.targetBlock.y) ? true : false;
	}

	findTargetBlock() {

		this.direction = this.getDirection();
		return this[this.direction + 'Block'];
	}

	calculateTargetAngle() {
		return Math.floor(Math.atan2(this.targetBlock.y - this.currentBlock.y, this.targetBlock.x - this.currentBlock.x) * 180 / Math.PI) + 90;
	}

	advance() {

		if (this.targetBlock.y - this.y > 0)
			this.y += this.speed;
		else {
			this.y -= this.speed;
			console.log(this.y);
		}
		
		if (this.targetBlock.x - this.x > 0)
			this.x += this.speed;
		else
			this.x -= this.speed;
	}

	getNearbyBlocks() {

		this.blockIndex = Math.floor(this.x / 100) + Math.floor(this.y / 100) * 10;

		this.currentBlock = this.blocks[this.blockIndex];
		this.topBlock = this.blocks[this.blockIndex - 10];
		this.leftBlock = this.blocks[this.blockIndex - 1];
		this.bottomBlock = this.blocks[this.blockIndex + 10];
		this.rightBlock = this.blocks[this.blockIndex + 1];

		this.directions.forEach(direction => {
			if (this[direction + 'Block'] == undefined)
				this[direction + 'Block'] = this.currentBlock;
		});
	}

	turn() {

		if (this.turned)
			return;

		if (this.currentAngle < this.targetAngle)
			this.currentAngle += 1;

		else if (this.currentAngle > this.targetAngle)
			this.currentAngle -= 1;

		else
			this.turned = true;
	}

	getDirection() {

		if (this.rightBlock.is('road') && this.bottomBlock.is('road'))
			return this.randomDirection('right', 'bottom', 50);

		if (this[this.direction + 'Block'].is('road') || this[this.direction + 'Block'].is('nexus'))
			return this.direction;

		if (this.direction == 'right' && this.bottomBlock.is('road'))
			return 'bottom';

		if (this.rightBlock.is('road') || this.rightBlock.is('nexus'))
			return 'right';

		if (this.topBlock.is('road') && this.bottomBlock.is('road'))
			return this.randomDirection('top', 'bottom', 50);

		if (this.bottomBlock.is('road'))
			return 'bottom';

		if (this.topBlock.is('road'))
			return 'top';
	}

	randomDirection(directionA, directionB, chance) {
		return (Math.random() * 100 > chance) ? directionA : directionB;
	}

	getOpposite(direction) {

		switch (direction) {

			case 'left': return 'right';
			case 'right': return 'left';
			case 'top': return 'bottom';
			case 'bottom': return 'top';
		}
	}
}

class ToxicCarrier extends Enemy {

	constructor(canvas, blocks, objectSize, x, y) {

		super(canvas, blocks, objectSize, x, y);

		this.image = document.getElementById('toxic-carrier');
		this.width = this.image.width;
		this.height = this.image.height;

		this.speed = 1;
	}
}

class ToxicSpreader extends Enemy {

	constructor(canvas, objectSize, x, y) {

		super(canvas, objectSize, x, y);

		this.image = document.getElementById('toxic-spreader');
		this.width = this.image.width;
		this.height = this.image.height;

		this.speed = 2;
	}
}

class DoubleToxicCarrier extends Enemy {

	constructor(canvas, objectSize, x, y) {

		super(canvas, objectSize, x, y);

		this.image = document.getElementById('double-toxic-carrier');
		this.width = this.image.width;
		this.height = this.image.height;

		this.speed = 0.75;
	}
}