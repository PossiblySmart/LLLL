class Tower {

	constructor(game, statistics, canvas, size, x, y) {

		this.game = game;
		this.statistics = statistics;

		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.size = size;

		this.x = x;
		this.y = y;

		this.type = 'towers';

		this.currentAngle = 0;
		this.currentExperience = 0;

		this.blockIndex = 0;

		this.rangeStart = 0;
		this.rangeEnd = 0;

		this.showRange = false;
		this.isUpgradable = false;

		this.target = 0;
		this.targetAngle = 0;

		this.targetAcquired = false;
		this.rotationComplete = false;
		
		this.firstShot = true;
		this.shotsInterval = 0;
	}

	clearSelf() {
        this.context.clearRect(this.x, this.y, this.size, this.size);
	}

	targetDefeated() {
		return this.target.health <= 0 ? true : false;
	}

	targetOutOfRange() {
		return (this.target.blockIndex >= this.rangeStart && this.target.blockIndex <= this.rangeEnd) ? false : true;
	}

	calculateTargetAngle() {
		return Math.floor(Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI) + 90;
	}
	
	defendNexus() {

		if (this.targetAcquired) {

			if (this.targetDefeated()) {

				this.currentExperience += this.target.tier * this.target.tier * 50 + (this.target.tier - 1) * 100;
				this.currentExperience += Math.random() * 100 > Math.random() * 90 ? this.target.tier * this.target.tier * 50 : 0;
			}

			if (this.targetDefeated() || this.targetOutOfRange() || this.target.currentBlock.is('nexus')) {

				this.rotationComplete = false;
				this.targetAcquired = false;
				
				this.firstShot = true;
				this.target = 0;
				
				return;
			}

			if (this.rotationComplete) {
				//this.shoot();
			}

			this.targetAngle = this.calculateTargetAngle();
			this.rotate();
		}

		else {
			this.target = this.findTarget();
			this.targetAngle = this.calculateTargetAngle();
		}
	}

	rotate() {

		if (this.rotationComplete)
			this.currentAngle += this.targetAngle - this.currentAngle;

		else if (Math.floor(Math.abs(this.targetAngle - this.currentAngle)) >= 0 && Math.floor(Math.abs(this.targetAngle - this.currentAngle)) <= 5)
			this.rotationComplete = true;

		else if (this.currentAngle < this.targetAngle)
			this.currentAngle += this.rotationSpeed;

		else if (this.currentAngle > this.targetAngle)
			this.currentAngle -= this.rotationSpeed;
	}
	
	findTarget() {

		let startBlock = this.blockIndex - this.range - (this.range > 1 ? this.range - 1 : this.range) * 10;
		let endBlock = this.blockIndex + this.range + (this.range > 1 ? this.range - 1 : this.range) * 10;

		this.rangeStart = startBlock;
		this.rangeEnd = endBlock;

		let currentBlock;

		for (let row = 0; row <= this.range + 1; row++)
			
			for (let index = startBlock + row * 10; index != startBlock + row * 10 + this.range * 2 + 1; index++) {
				
				currentBlock = this.game.blocks[index];

				if (currentBlock != undefined && (currentBlock.is('road') || currentBlock.is('breach')) && currentBlock.hasEnemy) {
					this.targetAcquired = true;
					return currentBlock.enemy;
				}
			}

		return 0;
	}

	shoot() {

		if (this.firstShot) {
			this.firstShot = false;
			this.game.charges.push(
				new Charge(this.canvas, this.x, this.y, this.size, this.currentAngle, this.chargeSpeed, this.tier, this.target));
		}

		else {

			var tower = this;

			tower.shotsInterval = setInterval(function() {
				tower.game.charges.push(
					new Charge(tower.canvas, tower.x, tower.y, tower.size, tower.currentAngle, tower.chargeSpeed, tower.tier, tower.target));
			}, 1700 / tower.fireRate);
		
			window.addEventListener('focus', function() {

				clearInterval(tower.shotsInterval);

				tower.shotsInterval = setInterval(function() {
					tower.game.charges.push(
						new Charge(tower.canvas, tower.x, tower.y, tower.size, tower.currentAngle, tower.chargeSpeed, tower.tier, tower.target));
				}, 1700 / tower.fireRate);
			});
		
			window.addEventListener('blur', function() {
				clearInterval(tower.shotsInterval);
			});
		}
	}

	drawSelf() {

		if (this.currentAngle) {

			this.context.save();
			this.context.translate(this.x + this.width / 2 + (this.size - this.size * this.width / 100) / 2, this.y + this.height / 2 + this.size * this.height / 1000);
			this.context.rotate(this.currentAngle * Math.PI / 180);
			this.context.drawImage(this.image, -(this.size * this.width / 100) / 2, -(this.size * this.height / 100) / 2 - this.size * this.height / 1000, this.size * this.width / 100, this.size * this.height / 100);
			this.context.restore();
		}

		else
			this.context.drawImage(this.image, this.x + (this.size - this.size * this.width / 100) / 2, this.y, this.size * this.width / 100, this.size * this.height / 100);

		if (this.showRange) {

			this.context.fillStyle = Colors.orange + '10';
			this.context.strokeStyle = Colors.violet + '80';
			this.context.lineWidth = 2;
			this.context.beginPath();
			this.context.arc(this.x + this.size / 2, this.y + this.size / 2, this.range * this.size, 0, 2 * Math.PI);
			this.context.fill();
			this.context.stroke();
			this.context.closePath();
		}
	}
}

class GalacticMarine extends Tower {

	constructor(game, statistics, canvas, objectSize, x, y) {

		super(game, statistics, canvas, objectSize, x, y);

		for (let property in ShopItems.galacticMarine)
			this[property] = ShopItems.galacticMarine[property];

		this.image = document.getElementById(this.imageID);
		this.width = this.image.width;
		this.height = this.image.height;
	}
}

class OrcusCharger extends Tower {

	constructor(game, statistics, canvas, objectSize, x, y) {

		super(game, statistics, canvas, objectSize, x, y);
		
		for (let property in ShopItems.orcusCharger)
			this[property] = ShopItems.orcusCharger[property];

		this.image = document.getElementById(this.imageID);
		this.width = this.image.width;
		this.height = this.image.height;
	}
}

class CptAndromeda extends Tower {

	constructor(game, statistics, canvas, objectSize, x, y) {

		super(game, statistics, canvas, objectSize, x, y);

		for (let property in ShopItems.cptAndromeda)
			this[property] = ShopItems.cptAndromeda[property];

		this.image = document.getElementById(this.imageID);
		this.width = this.image.width;
		this.height = this.image.height;
	}
}