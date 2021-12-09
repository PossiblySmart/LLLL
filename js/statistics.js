
class Statistics {

    constructor(game) {

        this.game = game;

        this.towers = 0;
        this.towersUpgradable = 0;
        this.towersMaxTier = 0;
        
        this.enemies = 0;
        this.enemiesMaxTier = 1;
        this.enemiesTotalDefeated = 0;

        this.wave = 1;
        this.waveIncrementer = 1;
        this.nextWave = 3 * this.waveIncrementer;

        this.gold = 200;
        this.goldMinus = 0;
        this.goldPlus = 0;

        this.hideDelay = 900;
        this.enemySpawnDelay = 750;

        for (let indicator in Indicators)
            Indicators.set(indicator, this[indicator]);
    }

    hideIndicator(indicator) {

        Indicators[indicator].style.opacity = 0;
		Indicators[indicator].style.bottom = '-1rem';
    }

    checkWave() {

        Indicators.set('nextWave', this.nextWave - this.enemiesTotalDefeated);

        if (this.enemiesTotalDefeated == this.nextWave) {
            
            if (this.wave % 10 == 0)
                this.waveIncrementer += this.wave - 8;
            else
                this.waveIncrementer++;

            this.wave++;
            this.nextWave = 5 * this.waveIncrementer;

            Indicators.set('wave', this.wave);
            Indicators.set('nextWave', this.nextWave);
            Message.showNextWave();
            
            Sounds.play('newWave');

            clearInterval(spawnInterval);
            setTimeout(InitializeEnemySpawning, 3500, this.game);
        }
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

        this.increaseGold(enemy.tier * enemy.tier * 500000000);
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
