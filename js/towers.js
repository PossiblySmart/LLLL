class Tower {

	constructor(canvas, size, x, y) {

		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.size = size;

		this.currentRotation = 0;
		this.currentExperience = 0;
		
		this.x = x;
		this.y = y;
	}

	clearSelf() {
        this.context.clearRect(this.x, this.y, this.size, this.size);
    }

	drawSelf() {

		if (this.currentRotation) {

			this.context.save();
			this.context.translate(this.x + this.width / 2 + (this.size - this.size * this.width / 100) / 2, this.y + this.height / 2 + this.size * this.height / 1000);
			this.context.rotate(this.currentRotation * Math.PI / 180);
			this.context.drawImage(this.image, -(this.size * this.width / 100) / 2, -(this.size * this.height / 100) / 2 - this.size * this.height / 1000, this.size * this.width / 100, this.size * this.height / 100);
			this.context.restore();
		}

		else
			this.context.drawImage(this.image, this.x + (this.size - this.size * this.width / 100) / 2, this.y, this.size * this.width / 100, this.size * this.height / 100);
	}

	rotate(degrees) {
		this.currentRotation += degrees * this.rotationSpeed;
	}
}

class GalacticMarine extends Tower {

	constructor(canvas, objectSize, x, y) {

		super(canvas, objectSize, x, y);

		this.rotationSpeed = 2;
		this.fireRate = 1;
		this.chargePower = 1;
		this.chargeSpeed = 1.5;

		this.image = document.getElementById('galactic-marine');
		this.width = this.image.width;
		this.height = this.image.height;
	}
}

class OrcusCharger extends Tower {

	constructor(canvas, objectSize, x, y) {

		super(canvas, objectSize, x, y);

		this.rotationSpeed = 1;
		this.fireRate = 0.85;
		this.chargePower = 2.5;
		this.chargeSpeed = 1;

		this.image = document.getElementById('orcus-charger');
		this.width = this.image.width;
		this.height = this.image.height;
	}
}

class CptAndromeda extends Tower {

	constructor(canvas, objectSize, x, y) {

		super(canvas, objectSize, x, y);

		this.rotationSpeed = 1.5;
		this.fireRate = 1.5;
		this.chargePower = 0.8;
		this.chargeSpeed = 2;

		this.image = document.getElementById('cpt-andromeda');
		this.width = this.image.width;
		this.height = this.image.height;
	}
}