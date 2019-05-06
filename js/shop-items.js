document.addEventListener('load', function() {

    const Towers = {

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
            width: image.width,
            height: image.height
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
            width: image.width,
            height: image.height
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
            width: image.width,
            height: image.height
        },

        galacticMarineUpgrade: {

            tier: 2,
            price: 200,
            rotationSpeed: 1,
            fireRate: 0.85,
            chargePower: 2.5,
            chargeSpeed: 1,
            range: 1,
            image: document.getElementById('orcus-charger'),
            width: image.width,
            height: image.height
        },

        orcusChargerUpgrade: {

            tier: 3,
            price: 1000,
            rotationSpeed: 1.7,
            fireRate: 1.5,
            chargePower: 0.8,
            chargeSpeed: 2,
            range: 3,
            image: document.getElementById('cpt-andromeda'),
            width: image.width,
            height: image.height
        },
    };

    const Buttons = {

        galacticMarine: document.getElementById('galactic-marine-purchase-btn'),
        orcusCharger: document.getElementById('orcus-charger-purchase-btn'),
        cptAndromeda: document.getElementById('cpt-andromeda-purchase-btn'),
        upgrade: document.getElementById('upgrade'),
        sell: document.getElementById('sell')
    };

    const TowerCurrentInfo = {

        container: document.getElementById('tower-info'),
        rotationSpeed: document.getElementById('rotation-speed'),
        fireRate: document.getElementById('fire-rate'),
        chargePower: document.getElementById('charge-power'),
        chargeSpeed: document.getElementById('charge-speed')
    };

    const TowerUpgradeInfo = {

        price: document.getElementById('upgrade-price'),
        rotationSpeed: document.getElementById('rotation-speed_upgrade'),
        fireRate: document.getElementById('fire-rate_upgrade'),
        chargePower: document.getElementById('charge-power_upgrade'),
        chargeSpeed: document.getElementById('charge-speed_upgrade')
    };

    const Message = {

        container: document.getElementById('message'),
        title: document.getElementById('message-title'),
        body: document.getElementById('message-body'),
        dontShowButton: document.getElementById('do-not-show')
    };

    const Shop = {

        game: game,
        canvas: canvas,
        
        blockSize: canvas.width / 10,
        currentGold: game.statistics.gold,
        
        dontDisplayMessage: false,
        towerInfoRevealed: false,
        
        tooltipPosition: 'none',
        towerInfoTransformOrigin: 'none',

        selectedBlock: 0,
        selectedTower: 0,
        upgradeTower: 0,

        cursorX = 0,
        cursorY = 0,

        towerTier: 0,

        availabeToPurchase: {

            galacticMarine: false,
            orcusCharger: false,
            cptAndromeda: false,
            galacticMarineUpgrade: false,
            orcusChargerUpgrade: false
        }
    };
});