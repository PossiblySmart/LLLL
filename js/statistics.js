
class Statistics {

    constructor(game) {

        this.game = game;

        this.towers = game.towers.length;
        this.towersUpgradable = 0;
        this.towersMaxTier = 0;
        
        this.enemies = game.enemies.length;
        this.enemiesMaxTier = 1;
        this.enemiesTotalDefeated = 0;

        this.wave = 1;
        this.nextWave = 15;

        this.gold = 500;
        this.goldMinus = 0;
        this.goldPlus = 0;

        this.hideDelay = 900;
        this.enemySpawnDelay = 7500;

        for (let indicator in Indicators)
            Indicators.set(indicator, this[indicator]);
    }

    hideIndicator(indicator) {

        Indicators[indicator].style.opacity = 0;
		Indicators[indicator].style.bottom = '-1rem';
    }
    
    reduceGold(amount) {

        this.gold -= amount;

		Indicators.goldMinus.style.opacity = 1;
        Indicators.goldMinus.style.bottom = '1.5rem';

        Indicators.set('goldMinus', amount);
        Indicators.set('gold', this.gold);

		hide(this.hideIndicator, 'goldMinus', this.hideDelay);
    }

    increaseGold(amount) {

        this.gold += amount;

        Indicators.goldPlus.style.opacity = 1;
        Indicators.goldPlus.style.bottom = '1.5rem';

        Indicators.set('goldPlus', amount);
        Indicators.set('gold', this.gold);

        hide(this.hideIndicator, 'goldPlus', this.hideDelay);
    }

    enemyHasReachedNexus(enemy) {

		this.reduceGold(enemy.tier * 100);
        this.game.remove('enemies', enemy);
        
        this.enemies--;
        Indicators.set('enemies', this.enemies);
    }

    enemyDown(enemy) {

        this.increaseGold(enemy.tier * 100);
        this.game.remove('enemies', enemy);

        enemy.currentBlock.hasEnemy = false;
        enemy.currentBlock.enemy = 0;

        this.enemies--;
        this.enemiesTotalDefeated++;

        Indicators.set('enemies', this.enemies);
        Indicators.set('enemiesTotalDefeated', this.enemiesTotalDefeated);
    }
    
    update(object) {

        if (object.tier > this[object.type + 'MaxTier'])
            Indicators.set(object.type + 'MaxTier', object.tier);

        this[object.type]++;
        Indicators.set(object.type, this[object.type]);
    }
}