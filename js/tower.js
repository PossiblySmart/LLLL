class Tower {

	constructor(tier, position,) {

		this.tier = tier;
		this.position = position;
		this.experience = 0;
	}

	trackEnemy();
	rotate();
	shoot();
	recharge();
	tierUp();
}

export default Tower;