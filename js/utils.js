var Towers = {},
    TowersUpgrade = {},
    Buttons = {},
    TowerCurrentInfo = {},
    TowerUpgradeInfo = {},
    Message = {},
    Indicators = {};

const AvailabeToPurchase = {
    
    galacticMarine: false,
    orcusCharger: false,
    cptAndromeda: false,
    galacticMarineUpgrade: false,
    orcusChargerUpgrade: false
};

const Colors = {

    cyan:       '#00ffff',
	orange:     '#ffa500',
	violet:     '#ff00ff',
	dark:       '#1b1926',
	light:      '#e2e2e2',
	gray:       '#808080',
	lightgray:  '#bebebe',
	red:        '#ff0000',
	redwood:    '#c1272d',
	green:      '#00ff00',
	toxicGreen: '#adff2f',
	deepgreen:  '#39b54a',
	blue:       '#0000ff',
	deepblue:   '#00008b',
	orangeDim:  '#f7931e',
	darkviolet: '#8a2be2',
	deepviolet: '#3d053d',
	pink:       '#ee82ee',
	deeppink:   '#db7093',
	yellow:     '#ffff00',
	black:		'#000000',

	alpha(color, alpha) {
		return this[color] + alpha;
	}
};

window.addEventListener('load', function() {

    Towers = {

        galacticMarine: {
            
            name: 'galacticMarine',
            tier: 1,
            price: 100,
            rotationSpeed: 2,
            fireRate: 1,
            chargePower: 1,
            chargeSpeed: 1.5,
            range: 2,
            experienceRequiredToUpgrade: 1000,
            image: document.getElementById('galactic-marine'),
            width: document.getElementById('galactic-marine').width,
            height: document.getElementById('galactic-marine').height
        },
    
        orcusCharger: {
    
            name: 'orcusCharger',
            tier: 2,
            price: 500,
            rotationSpeed: 1,
            fireRate: 0.85,
            chargePower: 2.5,
            chargeSpeed: 1,
            range: 1,
            experienceRequiredToUpgrade: 3000,
            image: document.getElementById('orcus-charger'),
            width: document.getElementById('galactic-marine').width,
            height: document.getElementById('galactic-marine').height
        },
    
        cptAndromeda: {
    
            name: 'cptAndromeda',
            tier: 3,
            price: 1500,
            rotationSpeed: 1.7,
            fireRate: 1.5,
            chargePower: 0.8,
            chargeSpeed: 2,
            range: 3,
            experienceRequiredToUpgrade: 0,
            image: document.getElementById('cpt-andromeda'),
            width: document.getElementById('galactic-marine').width,
            height: document.getElementById('galactic-marine').height
        }
    };
    
    TowersUpgrade = {
    
        galacticMarine: {
    
            name: 'orcusCharger',
            tier: 2,
            price: 200,
            rotationSpeed: 1,
            fireRate: 0.85,
            chargePower: 2.5,
            chargeSpeed: 1,
            range: 1,
            experienceRequiredToUpgrade: 3000,
            image: document.getElementById('orcus-charger'),
            width: document.getElementById('galactic-marine').width,
            height: document.getElementById('galactic-marine').height
        },

        orcusCharger: {
    
            name: 'cptAndromeda',
            tier: 3,
            price: 1000,
            rotationSpeed: 1.7,
            fireRate: 1.5,
            chargePower: 0.8,
            chargeSpeed: 2,
            range: 3,
            experienceRequiredToUpgrade: 0,
            image: document.getElementById('cpt-andromeda'),
            width: document.getElementById('galactic-marine').width,
            height: document.getElementById('galactic-marine').height
        }
    }
    
    Buttons = {
    
        galacticMarine: document.getElementById('galactic-marine-purchase-btn'),
        orcusCharger:document.getElementById('orcus-charger-purchase-btn'),
        cptAndromeda: document.getElementById('cpt-andromeda-purchase-btn'),
        upgrade: document.getElementById('upgrade'),
        sell: document.getElementById('sell')
    };

    TowerInfo = {

        container: document.getElementById('tower-info'),
        revealed: false,
        position: 'none',
        transformOrigin: 'none'
    }
    
    TowerCurrentInfo = {
    
        currentExperience: document.getElementById('current-exp'),
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
        show: true
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
    }
});

const getTowerByTier = (tier) => {
    return tier == 1 ? Towers.galacticMarine : tier == 2 ? Towers.orcusCharger : Towers.cptAndromeda;
}

const hide = (hideFunction, parameter, delay) => {
    
    setTimeout(() => {
        hideFunction(parameter);
    }, delay);
}