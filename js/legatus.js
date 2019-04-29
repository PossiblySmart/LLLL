class Legatus {

	constructor() {

		this.towers = new Array;
		this.enemies = new Array;
        this.projectiles = new Array;
    }
    
    addObject(type, object) {
        this[type].push(object);
    }

    removeObject(type, object) {
         this[type].splice(this[type].indexOf(object), 1);
    }

    drawObjects(type) {
        this[type].forEach(object => { object.draw(); });
    }

    rotateAllTowers() {
        this.towers.forEach(tower => { tower.rotate(1); });
    }

	drawScene() {

        this.drawObjects('towers');
        this.drawObjects('enemies');
        this.drawObjects('projectiles');
    }
}