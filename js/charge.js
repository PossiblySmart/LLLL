
class Charge {

    constructor(canvas, x, y, size, angle, speed, tier, target) {
        
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.x = x;
        this.y = y;

        this.size = size;
        
        this.currentAngle = angle;
        this.speed = speed;
        this.tier = tier;

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

    targetIsReached() {
        return (this.x == this.target.x && this.y == this.target.y) ? true : false;
    }

    move() {

        if (targetIsReached()) {
            this.target.hit(this.tier * 25);
        }
    }
}