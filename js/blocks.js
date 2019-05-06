class Block {

    constructor(canvas, x, y, size, status) {

        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.status = status;
        this.size = size;

        this.number = 0;
        
        this.x = x;
        this.y = y;
    }

    is(type) {
        return this.type == type ? true : false;
    }

    isOccupied() {
        return this.status == 'occupied' ? true : false;
    }

    clearSelf() {
        this.context.clearRect(this.x, this.y, this.size, this.size);
    }
}

class Road extends Block {

    constructor(canvas, x, y, size, status) {

        super(canvas, x, y, size, status);
        
        this.type = 'road';

        this.hasEnemy = false;
        this.enemy = 0;
    }

    drawSelf() {

        this.context.fillStyle = 'rgba(0, 0, 0, 0)';
		this.context.fillRect(this.x, this.y, this.size, this.size);
		this.context.strokeStyle = 'rgba(255, 0, 255, .3)';
        this.context.strokeRect(this.x, this.y, this.size, this.size);
        
        if (this.number) {

            this.context.fillStyle = Colors.light;
            this.context.font = '20px sans';
            this.context.fillText(this.number, this.x + this.size / 2 - 5, this.y + this.size / 2);
        }
	}
}

class TowerSpot extends Block {

    constructor(canvas, x, y, size, status) {

        super(canvas, x, y, size, status);
        
        this.type = 'tower-spot';
        this.tower = 0;
    }

    drawSelf() {

        switch(this.tower.tier) {

            case 1: this.context.fillStyle = 'rgba(0, 255, 255, .1)'; break;
            case 2: this.context.fillStyle = 'rgba(255, 127, 0, .1)'; break;
            case 3: this.context.fillStyle = 'rgba(255, 0, 255, .1)'; break;
            
            default: this.context.fillStyle = 'rgba(44, 34, 48, .35)'; break;
        }

		this.context.fillRect(this.x, this.y, this.size, this.size);
		this.context.strokeStyle = '#ff00ff';
        this.context.strokeRect(this.x, this.y, this.size, this.size);
        
        if (this.number) {

            this.context.fillStyle = Colors.light;
            this.context.font = '20px sans';
            this.context.fillText(this.number, this.x + 35, this.y + 35);
        }
    }
}

class Breach extends Block {

    constructor(canvas, x, y, size, status) {
        
        super(canvas, x, y, size, status);

        this.type = 'breach';
        this.image = document.getElementById('breach');
    }

    drawSelf() {
		this.context.drawImage(this.image, this.x, this.y, this.size, this.size / 6);
	}
}

class Nexus extends Block {

    constructor(canvas, x, y, size, status) {
        
        super(canvas, x, y, size, status);

        this.type = 'nexus';
        this.image = document.getElementById('nexus');
    }

    drawSelf() {

		this.context.save();
		this.context.translate(this.canvas.width / 2 + (this.x + this.size) / 2, this.canvas.height / 2 + this.y / 2 - this.size);
		this.context.rotate(90 * Math.PI / 180);
		this.context.drawImage(this.image, 0, 0, this.size, this.size / 6);
		this.context.restore();
	}
}