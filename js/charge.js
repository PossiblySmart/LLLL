
class Charge {

    constructor(canvas, x, y, size, angle, speed, tier, power, tower, target, double) {
        
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.x = x;
        this.y = y;

        this.size = size;
        this.angle = angle;
        this.speed = speed;
        this.power = power;

        this.tier = tier;
        this.tower = tower;
        this.target = target;
        this.targetIsHit = false;
        this.image = document.getElementById('charge_' + tier + double);
    }

    drawSelf() {

        this.context.save();
        this.context.translate(this.x + this.size / 2, this.y + this.size / 2);
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

    calculateTargetAngle() {

		return Math.floor(

            Math.atan2(
                this.target.y - this.y,
                this.target.x - this.x
            ) * 180 / Math.PI) + 90;
	}

    advance() {

        this.targetAngle = this.calculateTargetAngle();
        this.angle += this.targetAngle - this.angle;

        if (Math.abs(this.target.y - this.y) >= 0 &&
            Math.abs(this.target.y - this.y) <= this.size / 2 &&
            Math.abs(this.target.x - this.x) >= 0 &&
            Math.abs(this.target.x - this.x) <= this.size / 2)
        
                this.targetIsHit = true;
        
        this.y += (this.target.y - this.y) / (this.size / this.speed) * 2;
		this.x += (this.target.x - this.x) / (this.size / this.speed) * 2;
    }

    move() {

        if (this.targetIsHit) {

            this.target.hit(25 * this.power);
            this.tower.game.remove('charges', this);

            if (this.target.isDefeated())
                this.tower.targetDefeated = true;
                
            return;
        }

        this.advance();
    }
}