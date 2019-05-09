class Tower {

	constructor(game, statistics, canvas, size, x, y) {

		this.game = game;
		this.statistics = statistics;

		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.size = size;

		this.x = x;
		this.y = y;

		if (this.x < this.canvas.height / 2)
			this.angle = 90;
		else
			this.angle = -90;

		this.type = 'towers';

		this.target = 0;
		this.targetAngle = 0;
		this.experience = 0;
		this.blockIndex = 0;
		this.rangeStart = 0;
		this.rangeEnd = 0;

		this.showRange = false;
		this.isUpgradable = false;
		this.targetAcquired = false;
		this.rotationComplete = false;
		this.targetDefeated = false;
		this.readyToShoot = true;
		
		this.animationFrame = 0;
	}

	clearSelf() {
        this.context.clearRect(this.x, this.y, this.size, this.size);
	}

	targetOutOfRange() {

		return (
			this.target.blockIndex >= this.rangeStart &&
			this.target.blockIndex <= this.rangeEnd
		) ? false : true;
	}

	calculateTargetAngle() {

		return Math.floor(
			
			Math.atan2(

				this.target.y - this.y,
				this.target.x - this.x

			) * 180 / Math.PI) + 90;
	}

	readyToUpgrade() {
		return this.experience >= this.experienceRequiredToUpgrade ? true : false;
	}

	reset() {

		this.rotationComplete = false;
		this.targetAcquired = false;
		this.targetDefeated = false;
		this.readyToShoot = true;
		this.animationFrame = 0;
		this.target = 0;
		this.image = this.state.default;
	}
	
	defendNexus() {

		if (this.targetAcquired) {

			if (this.targetOutOfRange() || this.target.currentBlock.is('nexus')) {
				this.reset();
				return;
			}

			if (this.targetDefeated) {

				this.experience += this.target.tier * this.target.tier * 50 + (this.target.tier - 1) * 100;
				this.experience += Math.random() * 100 > Math.random() * 90 ? this.target.tier * this.target.tier * 50 : 0;

				if (this.readyToUpgrade() && this.tier != 3)
					Message.markTower(this.x, this.y);

				this.reset();
				return;
			}

			if (this.rotationComplete) {

				if (this.animationFrame == Math.floor(100 / this.fireRate))
					this.readyToShoot = true;

				if (this.readyToShoot && this.target) {
					
					this.shoot();
					this.animationFrame = 1;
				}

				if (this.animationFrame == 1)
					this.image = this.state.frame_1;

				if (this.animationFrame == 5)
					this.image = this.state.frame_2;

				if (this.animationFrame == 10) {

					if (this.tier == 3)
						this.shootCharge('_right');
			
					this.image = this.state.frame_3;
				}

				if (this.animationFrame == 15)
					this.image = this.state.frame_4;

				if (this.animationFrame == 20)
					this.image = this.state.default;

				if (this.animationFrame)
					this.animationFrame++;
			}

			this.targetAngle = this.calculateTargetAngle();
			this.rotate();
		}

		else {

			this.target = this.findTarget();
			this.targetAngle = this.calculateTargetAngle();
		}
	}

	shootCharge(double) {

		this.game.charges.push(
			
			new Charge(

				this.canvas,
				this.x,
				this.y,
				this.size,
				this.angle,
				this.chargeSpeed,
				this.tier,
				this.chargePower,
				this,
				this.target,
				double
			)
		);
	}

	shoot() {

		this.shootCharge('');
		this.readyToShoot = false;

		Sounds.play('enemyDown');
	}

	rotate() {

		if (this.rotationComplete)
			this.angle += this.targetAngle - this.angle;

		else if (
			Math.floor(Math.abs(this.targetAngle - this.angle)) >= 0 &&
			Math.floor(Math.abs(this.targetAngle - this.angle)) <= 5)
				this.rotationComplete = true;

		else if ((this.targetAngle - this.angle) > 0)
			this.angle += this.rotationSpeed;
		else
			this.angle -= this.rotationSpeed;
	}
	
	findTarget() {

		let startBlock;
		let endBlock;

		if (Math.floor(this.blockIndex / 10) > Math.floor((this.blockIndex - this.range) / 10))
			startBlock = Math.floor(this.blockIndex / 10) * 10;
		else
			startBlock = this.blockIndex - this.range;

		if (Math.floor(this.blockIndex / 10) < Math.floor((this.blockIndex + this.range) / 10))
			endBlock = Math.floor(this.blockIndex / 10) * 10 + 9;
		else
			endBlock = this.blockIndex + this.range;

		startBlock -= this.range * 10;
		endBlock += this.range * 10;

		this.rangeStart = startBlock;
		this.rangeEnd = endBlock;

		let row,
			column,
			currentBlock,
			previousBlock,
			index;

		for (row = 0; row <= this.range + 1; row++) {

			index = startBlock + row * 10;
			currentBlock = undefined;
			previousBlock = undefined;

			for (column = 0; column < this.range * 2 + 1; column++) {

				currentBlock = this.game.blocks[index];

				if (column > 0)
					previousBlock = this.game.blocks[index - 1];

				if (currentBlock != undefined && previousBlock != undefined) {

					if (currentBlock.y != previousBlock.y)
						break;
				}

				if (currentBlock != undefined && (currentBlock.is('road') ||
					currentBlock.is('breach')) && currentBlock.hasEnemy) {
					
					this.targetAcquired = true;
					return currentBlock.enemy;
				}

				index++;
			}
		}

		return 0;
	}

	drawSelf() {

		if (this.angle) {

			this.context.save();

			this.context.translate(
				this.x + this.size / 2,
				this.y + this.size / 2
			);

			this.context.rotate(this.angle * Math.PI / 180);

			this.context.drawImage(
				this.image,
				-this.size / 2,
				-this.size / 2,
				this.size,
				this.size
			);

			this.context.restore();

		}

		else this.context.drawImage(this.image, this.x, this.y, this.size, this.size);

		if (this.showRange) {

			this.context.fillStyle = Colors.alpha('orange', 10);
			this.context.strokeStyle = Colors.alpha('violet', 80);
			this.context.lineWidth = 2;
			this.context.beginPath();

			this.context.arc(

				this.x + this.size / 2,
				this.y + this.size / 2,
				(this.range + 0.5) * this.size,
				0,
				2 * Math.PI
			);

			this.context.fill();
			this.context.stroke();
			this.context.closePath();
		}
	}
}

class TowerState {

	constructor(name) {

		this.default = document.getElementById(name + '_0');
		
		for (let i = 1; i <= 4; i++)
			this['frame_' + i] = document.getElementById(name + '_' + i);
	}
}

class GalacticMarine extends Tower {

	constructor(game, statistics, canvas, objectSize, x, y) {

		super(game, statistics, canvas, objectSize, x, y);

		Object.keys(Towers.galacticMarine).forEach(property => {
			this[property] = Towers.galacticMarine[property];
		});

		this.state = new TowerState(this.name);
	}
}

class OrcusCharger extends Tower {

	constructor(game, statistics, canvas, objectSize, x, y) {

		super(game, statistics, canvas, objectSize, x, y);

		Object.keys(Towers.orcusCharger).forEach(property => {
			this[property] = Towers.orcusCharger[property];
		});

		this.state = new TowerState(this.name); 
	}
}

class CptAndromeda extends Tower {

	constructor(game, statistics, canvas, objectSize, x, y) {

		super(game, statistics, canvas, objectSize, x, y);

		Object.keys(Towers.cptAndromeda).forEach(property => {
			this[property] = Towers.cptAndromeda[property];
		});

		this.state = new TowerState(this.name); 
	}
}

class GalacticMarineWelcome extends Tower {

	constructor(game, statistics, canvas, objectSize, x, y) {

		super(game, statistics, canvas, objectSize, x, y);

		this.name = 'galacticMarine',
		this.color = Colors.alpha('cyan', 10),
		this.tier = 1,
		this.price = 100,
		this.rotationSpeed = 2,
		this.fireRate = 1,
		this.chargePower = 0,
		this.chargeSpeed = 2.5,
		this.range = 2,
		this.experienceRequiredToUpgrade = 1000,
		this.image = document.getElementById('galacticMarine_0')

		this.state = new TowerState(this.name);
	}
}