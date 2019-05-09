var Towers = {},
    TowersUpgrade = {},
    Buttons = {},
    TowerCurrentInfo = {},
    TowerUpgradeInfo = {},
    Message = {},
    Indicators = {},
    IndicatorsEndGame = {},
    Sounds = {};

var spawnInterval;

const AvailabeToPurchase = {
    
    galacticMarine: false,
    orcusCharger: false,
    cptAndromeda: false,
    galacticMarineUpgrade: false,
    orcusChargerUpgrade: false
};

const Colors = {

    cyan:       'rgba(0, 255, 255, 1)',
	orange:     'rgba(255, 165, 0, 1)',
	violet:     'rgba(255, 0, 255, 1)',
	dark:       'rgba(27, 25, 38, 1)',
	light:      'rgba(226, 226, 226, 1)',
	gray:       'rgba(128, 128, 128, 1)',
	lightgray:  'rgba(190, 190, 190, 1)',
	red:        'rgba(255, 0, 0, 1)',
	redwood:    'rgba(193, 39, 45, 1)',
	green:      'rgba(0, 255, 0, 1)',
	toxicGreen: 'rgba(173, 255, 47, 1)',
	deepgreen:  'rgba(57, 181, 74, 1)',
	blue:       'rgba(0, 0, 255, 1)',
	deepblue:   'rgba(0, 0, 139, 1)',
	orangeDim:  'rgba(247, 147, 30, 1)',
	darkviolet: 'rgba(138, 43, 226, 1)',
	deepviolet: 'rgba(61, 5, 61, 1)',
	pink:       'rgba(238, 130, 238, 1)',
	deeppink:   'rgba(219, 112, 147, 1)',
	yellow:     'rgba(255, 255, 0, 1)',
	black:		'rgba(0, 0, 0, 1)',

	alpha(color, alpha) {
		return this[color].replace('1)', alpha + ')');
	}
};

const InitializeUtils = () => {

    Towers = {

        galacticMarine: {
            
            name: 'galacticMarine',
            color: Colors.alpha('cyan', '0.1'),
            tier: 1,
            price: 100,
            rotationSpeed: 2,
            fireRate: 1,
            chargePower: 1,
            chargeSpeed: 2.5,
            range: 2,
            experienceRequiredToUpgrade: 1250,
            image: document.getElementById('galacticMarine_0')
        },
    
        orcusCharger: {
    
            name: 'orcusCharger',
            color: Colors.alpha('orange', '0.1'),
            tier: 2,
            price: 1500,
            rotationSpeed: 1,
            fireRate: 0.85,
            chargePower: 2.5,
            chargeSpeed: 2,
            range: 1,
            experienceRequiredToUpgrade: 5000,
            image: document.getElementById('orcusCharger_0')
        },
    
        cptAndromeda: {
    
            name: 'cptAndromeda',
            color: Colors.alpha('darkviolet', '0.1'),
            tier: 3,
            price: 5000,
            rotationSpeed: 2,
            fireRate: 1.5,
            chargePower: 0.8,
            chargeSpeed: 3,
            range: 3,
            experienceRequiredToUpgrade: 0,
            image: document.getElementById('cptAndromeda_0')
        }
    };
    
    TowersUpgrade = {
    
        galacticMarine: {
    
            name: 'orcusCharger',
            color: Colors.alpha('orange', '0.1'),
            tier: 2,
            price: 750,
            rotationSpeed: 1,
            fireRate: 0.85,
            chargePower: 2.5,
            chargeSpeed: 2,
            range: 1,
            experienceRequiredToUpgrade: 5000,
            image: document.getElementById('orcusCharger_0')
        },

        orcusCharger: {
    
            name: 'cptAndromeda',
            color: Colors.alpha('darkviolet', '0.1'),
            tier: 3,
            price: 2500,
            rotationSpeed: 2,
            fireRate: 1.5,
            chargePower: 0.8,
            chargeSpeed: 3,
            range: 3,
            experienceRequiredToUpgrade: 0,
            image: document.getElementById('cptAndromeda_0')
        },

        cptAndromeda: {
    
            name: 'cptAndromeda',
            color: Colors.alpha('darkviolet', '0.1'),
            tier: 3,
            price: 1500,
            rotationSpeed: 2,
            fireRate: 1.5,
            chargePower: 0.8,
            chargeSpeed: 3,
            range: 3,
            experienceRequiredToUpgrade: 0,
            image: document.getElementById('cptAndromeda_0')
        }
    };
    
    Buttons = {
    
        galacticMarine: document.getElementById('galactic-marine-purchase-btn'),
        orcusCharger:document.getElementById('orcus-charger-purchase-btn'),
        cptAndromeda: document.getElementById('cpt-andromeda-purchase-btn'),
        upgrade: document.getElementById('upgrade'),
        sell: document.getElementById('sell'),
        cancel: document.getElementById('cancel-purchase'),
        soundControl: document.getElementById('sound-control')
	};
	
	Thumbnails = {

		galacticMarine: document.getElementById('galactic-marine-thumbnail'),
		orcusCharger: document.getElementById('orcus-charger-thumbnail'),
		cptAndromeda: document.getElementById('cpt-andromeda-thumbnail')
	}

    TowerInfo = {

        container: document.getElementById('tower-info'),
        revealed: false,
        position: 'none',
        transformOrigin: 'none'
    };
    
    TowerCurrentInfo = {
    
        experience: document.getElementById('current-exp'),
        rotationSpeed: document.getElementById('rotation-speed'),
        fireRate: document.getElementById('fire-rate'),
        chargePower: document.getElementById('charge-power'),
        chargeSpeed: document.getElementById('charge-speed')
    };
    
    TowerUpgradeInfo = {
    
        price: document.getElementById('upgrade-price'),
        rotationSpeed: document.getElementById('rotation-speed_upgrade'),
        fireRate: document.getElementById('fire-rate_upgrade'),
        chargePower: document.getElementById('charge-power_upgrade'),
        chargeSpeed: document.getElementById('charge-speed_upgrade')
    };
    
    Message = {
    
        container: document.getElementById('message'),
        title: document.getElementById('message-title'),
        body: document.getElementById('message-body'),
		doNotShowButton: document.getElementById('do-not-show'),
        readyToUpgrade: document.getElementById('ready-to-upgrade'),
        upgraded: document.getElementById('tower-upgraded'),
        nextWave: document.getElementById('next-wave'),
		show: true,
		
		markTower(x, y) {

            if (document.getElementById('mark-' + x + '-' + y) != null)
                return;

            let mark = document.createElement('p');
            document.getElementById('canvas').prepend(mark);
            
            mark.innerHTML = '!';
            mark.id = 'mark-' + x + '-' + y;
            mark.classList.add('ready-to-upgrade');
			mark.style.top = y + 15 + 'px';
            mark.style.left = x + 15 +'px';
            mark.style.opacity = 1;
            mark.style.transform = 'scale(1)';
		},

		unmarkTower(x, y) {

            if (document.getElementById('mark-' + x + '-' + y) != null)
                document.getElementById('mark-' + x + '-' + y).outerHTML = '';
        },

        showUpgraded(x, y) {

            this.upgraded.style.left = x + 'px';
            this.upgraded.style.top = y - 20 + 'px';
            this.upgraded.style.opacity = 1;

            setTimeout((upgraded) => {
                upgraded.style.opacity = 0;
            }, 1500, this.upgraded);
        },

        showNextWave() {

            this.nextWave.style.transform = 'scale(1)';
            this.nextWave.style.opacity = 1;

            setTimeout((nextWave) => {
                nextWave.style.opacity = 0;
                nextWave.style.transform = 'scale(0)';
            }, 3000, this.nextWave);
        }
	};
    
    Indicators = {

        towers: document.getElementById('towers_amount'),
        towersUpgradable: document.getElementById('towers_upgradable'),
        towersMaxTier: document.getElementById('towers_max-tier'),
        enemies: document.getElementById('toxic-carriers_amount'),
        enemiesMaxTier: document.getElementById('toxic-carriers_max-tier'),
        enemiesTotalDefeated: document.getElementById('toxic-carriers_total-defeated'),
        wave: document.getElementById('wave_current'),
        nextWave: document.getElementById('wave_until-next'),
        gold: document.getElementById('nuclear-gold'),
        goldMinus: document.getElementById('nuclear-gold-minus'),
        goldPlus: document.getElementById('nuclear-gold-plus'),

        set(indicator, value) {
            this[indicator].innerHTML = value; 
        }
    };

    IndicatorsEndGame = {

        towers: document.getElementById('towers_amount_end'),
        towersUpgradable: document.getElementById('towers_upgradable_end'),
        towersMaxTier: document.getElementById('towers_max-tier_end'),
        enemies: document.getElementById('toxic-carriers_amount_end'),
        enemiesMaxTier: document.getElementById('toxic-carriers_max-tier_end'),
        enemiesTotalDefeated: document.getElementById('toxic-carriers_total-defeated_end'),
        wave: document.getElementById('wave_current_end'),
        nextWave: document.getElementById('wave_until-next_end'),
        nextWave: document.getElementById('wave_until-next'),
        gold: document.getElementById('nuclear-gold'),
        goldMinus: document.getElementById('nuclear-gold-minus'),
        goldPlus: document.getElementById('nuclear-gold-plus'),

        set(indicator, value) {
            this[indicator].innerHTML = value; 
        }
    };

    Sounds = {

        soundtrack: document.getElementById('soundtrack'),
        enemyDown: document.getElementById('enemy-down'),
        enemyHasReachedNexus: document.getElementById('enemy-has-reached-nexus'),
        gameOver: document.getElementById('game-over'),
        newWave: document.getElementById('new-wave-audio'),
        soundToggle: document.getElementById('sound-toggle'),
        shotTier_1: document.getElementById('shot-tier-1'),
        shotTier_2: document.getElementById('shot-tier-2'),
        shotTier_3: document.getElementById('shot-tier-3'),
        silence: document.getElementById('silence'),

        muteAll() {
            Object.keys(this).forEach(key => {
                this[key].volume = 0;
            });
        },

        play(sound) {

            let track = this[sound].cloneNode(true);

            track.volume = 0.5;
            document.body.appendChild(track);

            let promise = track.play();

            if (promise)
                promise.catch(
                    function(error) {
                        console.error(error);
                    }
                );
            
            setTimeout(() => {
                track.outerHTML = "";
            }, Math.floor(this[sound].duration * 1000));
        },

        pause(sound) {

            let promise = this[sound].pause();

            if (promise)
                promise.catch(
                    function(error) {
                        console.error(error);
                    }
                );
        }
    };

    Sounds.muteAll();
};

const getTowerByTier = (tier) => {
    return tier == 1 ? Towers.galacticMarine : tier == 2 ? Towers.orcusCharger : Towers.cptAndromeda;
};

const hide = (hideFunction, parameter, delay) => {
    
    setTimeout(() => {
        hideFunction(parameter);
    }, delay);
};

const InitializeEnemySpawning = (game) => {    

    const spawn = () => {
        game.spawnEnemy();
    }

    spawnInterval = setInterval(spawn, game.statistics.enemySpawnDelay);

    window.addEventListener('focus', () => {
        clearInterval(spawnInterval);
        spawnInterval = setInterval(spawn, game.statistics.enemySpawnDelay);
    });

    window.addEventListener('blur', () => {
        clearInterval(spawnInterval);
    });
};

const randomEnemy = (wave) => {

    switch (true) {

        case (wave < 3):    return 1;
        case (wave < 12):   return Math.random() * 100 > 20 ? 1 : 2;
        case (wave < 15):   return Math.random() * 100 > 30 ? 1 : 2;
        case (wave < 30):   return (Math.random() * 100 < 40) ? ((Math.random() * 100 > 20) ? 2 : 3) : 1;
        case (wave < 40):   return (Math.random() * 100 < 50) ? ((Math.random() * 100 > 20) ? 2 : 3) : 1;
        case (wave < 70):   return (Math.random() * 100 < 60) ? ((Math.random() * 100 > 20) ? 2 : 3) : 1;
        case (wave < 100):  return (Math.random() * 100 < 60) ? ((Math.random() * 100 > 30) ? 2 : 3) : 1;
        case (wave < 178):  return (Math.random() * 100 < 70) ? ((Math.random() * 100 > 40) ? 2 : 3) : 1;
        case (wave < 256):  return (Math.random() * 100 < 80) ? ((Math.random() * 100 > 50) ? 2 : 3) : 1;
        
        default:            return (Math.random() * 100 < 80) ? ((Math.random() * 100 > 50) ? 2 : 3) : 1;
    }
};