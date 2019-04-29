class Ludus {

    constructor(canvas, size) {

		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.size = size;

		// Towers

		this.galacticMarine = document.getElementById('galactic-marine');
		this.orcusCharger = document.getElementById('orcus-charger');
		this.cptAndromeda = document.getElementById('cpt-andromeda');

		// Enemies

		this.toxicCarrier = document.getElementById('toxic-carrier');
		this.toxicSpreader = document.getElementById('toxic-spreader');
		this.doubleToxicCarrier = document.getElementById('dobule-toxic-carrier');

		// Charges

		this.chargeTierOne = document.getElementById('charge-tier-1');
		this.chargeTierTwo = document.getElementById('charge-tier-2');
		this.chargeTierThree = document.getElementById('charge-tier-3');

		// Entries

		this.breach = document.getElementById('breach');
		this.nexus = document.getElementById('nexus');
	}

	clearMap() { this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); }

	drawTower(name, x, y, degrees) {

		if (degrees) {

			this.context.save();
			this.context.translate(x + this[name].width / 2 + (this.size - this.size * this[name].width / 100) / 2, y + this[name].height / 2 + this.size * this[name].height / 1000);
			this.context.rotate(degrees * Math.PI / 180);
			this.context.drawImage(this[name], -(this.size * this[name].width / 100) / 2, -(this.size * this[name].height / 100) / 2 - this.size * this[name].height / 1000, this.size * this[name].width / 100, this.size * this[name].height / 100);
			this.context.restore();
		}

		else
			this.context.drawImage(this[name], x + (this.size - this.size * this[name].width / 100) / 2, y, this.size * this[name].width / 100, this.size * this[name].height / 100);
	}

	drawNexus(x, y) {

		this.context.save();
		this.context.translate(this.canvas.width / 2 + (x + this.size) / 2, this.canvas.height / 2 + y / 2 - this.size);
		this.context.rotate(90 * Math.PI / 180);
		this.context.drawImage(this.nexus, 0, 0, this.size, this.size / 6);
		this.context.restore();
	}

	drawBreach(x, y) {
		this.context.drawImage(this.breach, x, y, this.size, this.size / 6);
	}

	drawBlock(type, x, y, status) {

		switch(type) {

			case 'tower-spot':
				this.drawTowerSpot(x, y, status);
				break;
			
			case 'road':
				this.drawRoad(x, y, status);
				break;

			case 'breach':
				this.drawBreach(x, y);
				this.drawRoad(x, y);
				break;

			case 'nexus':
				this.drawNexus(x, y);
				this.drawRoad(x, y);
				break;
		}
	}

	drawTowerSpot(x, y, status) {
        
        if (status == 'occupied')
            this.context.fillStyle = 'rgba(0, 255, 255, .05)';
        else if (status.includes('highlighted'))
            this.context.fillStyle = 'rgba(100, 255, 88, .15)';
        else
            this.context.fillStyle = 'rgba(44, 34, 48, .35)';

		this.context.fillRect(x, y, this.size, this.size);
		this.context.strokeStyle = '#ff00ff';
		this.context.strokeRect(x, y, this.size, this.size);
	}

	drawRoad(x, y) {

        if (status.includes('highlighted'))
            this.context.fillStyle = 'rgba(100, 255, 48, 1)';
        else
            this.context.fillStyle = 'rgba(0, 0, 0, 0)';

		this.context.fillRect(x, y, this.size, this.size);
		this.context.strokeStyle = 'rgba(255, 0, 255, .3)';
		this.context.strokeRect(x, y, this.size, this.size);
	}
};