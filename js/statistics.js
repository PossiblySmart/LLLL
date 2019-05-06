
class Statistics {

    constructor(game) {

        this.game = game;

        this.towers = game.towers.length;
        this.towersUpgradableAmount = 0;
        this.towersMaxTier = 0;
        
        this.enemies = game.enemies.length;
        this.enemiesMaxTier = 1;
        this.enemiesTotalDefeated = 0;

        this.currentWave = 1;
        this.untilNextWave = 15;

        this.gold = 500;
        this.delay = 900;
        this.enemySpawnDelay = 7500;

        this.towersIndicator = document.getElementById('towers_amount');
        this.towersUpgradableAmountIndicator = document.getElementById('towers_upgradable');
        this.towersMaxTierIndicator = document.getElementById('towers_max-tier');
        
        this.enemiesIndicator = document.getElementById('toxic-carriers_amount');
        this.enemiesMaxTierIndicator = document.getElementById('toxic-carriers_max-tier');
        this.enemiesTotalDefeatedIndicator = document.getElementById('toxic-carriers_total-defeated');

        this.currentWaveIndicator = document.getElementById('wave_current');
        this.untilNextWaveIndicator = document.getElementById('wave_until-next');
        
        this.goldIndicator = document.getElementById('nuclear-gold');
        this.goldMinusIndicator = document.getElementById('nuclear-gold-minus');
        this.goldPlusIndicator = document.getElementById('nuclear-gold-plus');

        for (let property in this)
            if (property.includes('Indicator'))
                this.set(property.replace('Indicator', ''), this[property.replace('Indicator', '')]);
    }

    set(stat, value) {
		this[stat + 'Indicator'].innerHTML = value; 
    }
    
    reduceGold(amount) {

        this.gold -= amount;

        this.set('goldMinus', amount);
		this.goldMinusIndicator.style.opacity = 1;
        this.goldMinusIndicator.style.bottom = '1.5rem';
        
        this.set('gold', this.gold);

		setTimeout(function(minusIndicator) {
			
			minusIndicator.style.opacity = 0;
			minusIndicator.style.bottom = '-1rem';

        }, this.delay, this.goldMinusIndicator);
    }

    increaseGold(amount) {

        this.gold += amount;

        this.set('goldPlus', amount);
        this.goldPlusIndicator.style.opacity = 1;
        this.goldPlusIndicator.style.bottom = '1.5rem';

        this.set('gold', this.gold);

        setTimeout(function(plusIndicator) {

            plusIndicator.style.opacity = 0;
            plusIndicator.style.bottom = '-1rem';
        }, this.delay, this.goldPlusIndicator);
    }

    enemyHasReachedNexus(enemy) {

		this.reduceGold(enemy.tier * 100);
        this.game.remove('enemies', enemy);
        
        this.enemies--;
        this.set('enemies', this.enemies);
    }

    enemyDown(enemy) {

        this.increaseGold(enemy.tier * 100);
        this.game.remove('enemies', enemy);

        enemy.currentBlock.hasEnemy = false;
        enemy.currentBlock.enemy = 0;

        console.log(enemy.currentBlock, this.game.towers);

        this.enemies--;
        this.set('enemies', this.enemies);
        
        this.enemiesTotalDefeated++;
        this.set('enemiesTotalDefeated', this.enemiesTotalDefeated);
    }
    
    update(object) {

        if (object.tier > this[object.type + 'MaxTier'])
            this.set(object.type + 'MaxTier', object.tier);

        this[object.type]++;
        this.set(object.type, this[object.type]);
    }
}