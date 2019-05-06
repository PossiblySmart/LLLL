
class Charge {

    constructor(canvas, x, y, size, angle, speed, tier, tower, target) {
        
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.x = x;
        this.y = y;

        this.size = size;
        
        this.currentAngle = angle;
        this.speed = speed;
        this.tier = tier;

        this.tower = tower;
        this.target = target;
        
        this.image = document.getElementById('charge-tier-' + tier);
        this.width = this.image.width;
        this.height = this.image.height;
    }

    drawSelf() {

        this.context.save();
        this.context.translate(this.x + this.width / 2 + (this.size - this.size * this.width / 100) / 2, this.y + this.height / 2 + this.size * this.height / 1000);
        this.context.rotate(this.currentAngle * Math.PI / 180);
        this.context.drawImage(this.image, -(this.size * this.width / 100) / 2, -(this.size * this.height / 100) / 2 - this.size * this.height / 1000, this.size * this.width / 100, this.size * this.height / 100);
        this.context.restore();
    }

    calculateTargetAngle() {
		return Math.floor(Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI) + 90;
	}

    targetIsHit() {

        if (Math.floor(Math.abs(this.x - this.target.x)) >= 0 && Math.floor(Math.abs(this.x - this.target.x)) <= 30 &&
            Math.floor(Math.abs(this.y - this.target.y)) >= 0 && Math.floor(Math.abs(this.x - this.target.x)) <= 30)
            return true;

        return false;
    }

    advance() {

        this.targetAngle = this.calculateTargetAngle();

        if (this.currentAngle < this.targetAngle)
			this.currentAngle += this.speed;

		else if (this.currentAngle > this.targetAngle)
			this.currentAngle -= this.speed;

        this.y += (this.target.y - this.y) / (this.size / this.speed);
		this.x += (this.target.x - this.x) / (this.size / this.speed);
    }

    move() {

        if (this.targetIsHit()) {

            this.target.hit(this.tier * 25);
            this.tower.game.remove('charges', this);

            if (this.target.isDefeated())
                this.tower.targetDefeated = true;
                
            return;
        }

        this.advance();
    }
}