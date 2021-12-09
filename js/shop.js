
class Shop {

    constructor(game, canvas) {

        this.game = game;
        this.canvas = canvas;
        this.blockSize = canvas.width / 10;
        this.currentGold = game.statistics.gold;

        this.hideDelay = 250;
    }

    set(tier) {

        if (Message.show)
            this.showMessage();

        this.purchaseTowerTier = tier;
        this.game.towerSpotsHighlight(true);

        document.body.style.cursor = 'cell';
        Buttons.cancel.style.opacity = 1;
    }

    reset() {

        if (Message.show)
            this.hideMessage();

        this.game.towerSpotsHighlight(false);
        this.purchaseTowerTier = 0;
        
        document.body.style.cursor = 'default';
        Buttons.cancel.style.opacity = 0;
    }

    showMessage() {

        document.body.style.cursor = 'cell';

        Message.container.style.opacity = 1;
        Message.container.style.transform = 'scale(1)';

        Message.title.innerHTML = 'You have selected a tower!';
        Message.body.innerHTML = 'Move your cursor to the grid and press on available spot to purchase it.';
    }

    hideMessage() {

        Message.container.style.opacity = 0;
        Message.container.style.transform = 'scale(0)';
    }

    changeStyle(tower, available) {

        if (available) {
			
			Thumbnails[tower].src = Thumbnails[tower].src.replace('-unavailable', '-frame-0');
			Buttons[tower].style.filter = 'none';
		}
        
        else {
			
			Thumbnails[tower].src = Thumbnails[tower].src.replace('-frame-0', '-unavailable');
			Buttons[tower].style.filter = 'grayscale(100%)';
		}
    }

    checkAvailability() {

        this.currentGold = this.game.statistics.gold;

        for (let tower in Towers) {

            if (this.currentGold >= Towers[tower].price) {
				
				AvailabeToPurchase[tower] = true;
                this.changeStyle(tower, true);
            }

            else {
				AvailabeToPurchase[tower] = false;
                this.changeStyle(tower, false);
            }
        }
    }

    open() {

        const shop = this;

        Buttons.galacticMarine.addEventListener('click', () => {
            
            if (AvailabeToPurchase.galacticMarine)
                this.set(1);
        });

        Buttons.orcusCharger.addEventListener('click', () => {
            
            if (AvailabeToPurchase.orcusCharger)
                this.set(2);
        });

        Buttons.cptAndromeda.addEventListener('click', () => {
            
            if (AvailabeToPurchase.cptAndromeda)
                this.set(3);
        });

        Message.doNotShowButton.addEventListener('click', () => {

            Message.show = false;
            this.hideMessage();
        });

        Buttons.sell.addEventListener('click', () => {
            this.sellTower();
        });

        Buttons.upgrade.addEventListener('click', () => {

            if (AvailabeToPurchase[this.selectedTower.name + 'Upgrade'] &&
                this.selectedTower.tier != 3)
                    this.upgradeTower();
        });

        Buttons.cancel.addEventListener('click', () => {

            if (this.purchaseTowerTier)
                this.reset();
        });

        Buttons.soundControl.addEventListener('click', () => {

            if (this.soundOn) {
                
                Buttons.soundControl.setAttribute('style', 'clip-path: inset(0 20px 0 0)');
                Sounds.soundtrack.pause();
                this.soundOn = false;
            }

            else {

                Buttons.soundControl.setAttribute('style', 'clip-path: inset(0 0 0 0)');
                Sounds.soundtrack.volume = 0.5;
                Sounds.soundtrack.play();
                this.soundOn = true;
            }
        });

        this.canvas.addEventListener('click', () => {
            
            shop.selectedBlock = shop.game.blocks[
                shop.getBlockIndex(shop.cursorX, shop.cursorY)
            ];

            if (shop.purchaseTowerTier) {
                shop.placeTower();
                shop.reset();
            }
            else
                shop.showTowerInfo();
        });

        this.canvas.addEventListener('mousemove', (event) => {
            shop.cursorX = event.offsetX
            shop.cursorY = event.offsetY;
        });
    }

    towerCanBePlaced() {

        return (

            this.purchaseTowerTier &&
            this.selectedBlock.type == 'tower-spot' &&
            this.selectedBlock.status != 'occupied'

        ) ? true : false;
    }

    getBlockIndex(x, y) {

        this.row = Math.floor(y / this.blockSize);
        this.column = Math.floor(x / this.blockSize);
        
        return this.row * 10 + this.column;
    }

    placeTower() {

        if (this.towerCanBePlaced()) {

            switch (this.purchaseTowerTier) {

                case 1:

                    this.purchaseTower(

                        new GalacticMarine(

                            this.game,
                            this.game.statistics,
                            this.canvas,
                            this.blockSize,
                            this.column * this.blockSize,
                            this.row * this.blockSize
                        )
                    );
                    break;

                case 2:

                    this.purchaseTower(

                        new OrcusCharger(

                            this.game,
                            this.game.statistics,
                            this.canvas,
                            this.blockSize,
                            this.column * this.blockSize,
                            this.row * this.blockSize
                        )
                    );
                    break;

                case 3:

                    this.purchaseTower(

                        new CptAndromeda(
                            
                            this.game,
                            this.game.statistics,
                            this.canvas,
                            this.blockSize,
                            this.column * this.blockSize,
                            this.row * this.blockSize
                        )
                    );
                    break;
            }
        }
    }

    purchaseTower(tower) {

        this.selectedBlock.tower = tower;
        this.selectedBlock.tower.blockIndex = this.getBlockIndex(tower.x, tower.y);
        this.selectedBlock.status = 'occupied';
        
        this.game.towers.push(tower);
        this.game.statistics.reduceGold(tower.price);
        this.game.statistics.update(tower);
        this.game.updateBlocks();
    }

    sellTower() {

        hide(this.hideTowerInfo, null, this.hideDelay);

        this.game.remove('towers', this.selectedTower);
        this.game.blocks[this.selectedTower.blockIndex].status = 'none';
        this.game.blocks[this.selectedTower.blockIndex].tower = 0;

        this.game.updateBlocks();
        this.game.statistics.increaseGold(this.selectedTower.price * 200000);

        this.game.statistics.towers--;
        this.game.statistics.set('towers', this.game.statistics.towers);
    }

    upgradeTower() {

        hide(this.hideTowerInfo, null, this.hideDelay);
        Message.showUpgraded(this.selectedTower.x, this.selectedTower.y);

        this.game.statistics.addGold(TowersUpgrade[this.selectedTower.name].price);
        this.selectedTower.experience = 100000;

        this.updateStats(this.selectedTowerUpgrade, this.selectedTower);

        this.game.remove('towers', this.selectedTower);
        this.game.towers.push(this.selectedTower);
        
        this.game.statistics.update(this.selectedTower);
        this.game.updateBlocks();
    }

    updateStats(upgrade, current) {
        Object.keys(upgrade).forEach(property => {
            current[property] = upgrade[property];
        });
        current.state = new TowerState(upgrade.name);
    }

    showTowerInfo() {

        if (this.selectedBlockIsTower()) {

			Message.unmarkTower(this.selectedBlock.x, this.selectedBlock.y);

            if (TowerInfo.revealed)
                return;

            this.setCurrentTierInfo();

            if (this.selectedTower.tier == 3)
                this.setMaxTierInfo();
            else
                this.setUpgradeTierInfo();

            this.placeTowerInfo();
        }

        else if (TowerInfo.revealed)
            this.hideTowerInfo();
    }

    hideTowerInfo() {

        TowerInfo.container.style.opacity = 0;
        TowerInfo.container.style.transform = 'scale(0)';
        TowerInfo.container.classList.remove(TowerInfo.position);
        TowerInfo.revealed = false;
    }

    selectedBlockIsTower() {

        return (
            this.selectedBlock.tower != undefined &&
            this.selectedBlock.isOccupied()
        ) ? true : false;
    }

    placeTowerInfo() {

        if (this.selectedTower.x <= this.canvas.width / 2)
            this.setTowerInfoPosition('left')
        
        else
            this.setTowerInfoPosition('right');
        
        TowerInfo.container.classList.add(TowerInfo.position);
        TowerInfo.revealed = true;
    }

    setTowerInfoPosition(position) {

        TowerInfo.position = position;
        TowerInfo.transformOrigin = (position == 'right' ? 'left' : 'right');

        TowerInfo.container.style.top = this.selectedTower.y + this.blockSize / 2 + 'px';
        TowerInfo.container.style.left = this.selectedTower.x + (position == 'right' ? -this.blockSize * 1.5 : this.blockSize) + 'px';
        TowerInfo.container.style.transform = 'scale(1) translateY(-50%)';
    }

    setCurrentTierInfo() {

        this.selectedTower = this.selectedBlock.tower;
        
        TowerInfo.container.style.opacity = 1;

        TowerCurrentInfo.experience.innerHTML = this.selectedTower.experience;
        TowerCurrentInfo.rotationSpeed.innerHTML = this.selectedTower.rotationSpeed;
        TowerCurrentInfo.fireRate.innerHTML = this.selectedTower.fireRate;
        TowerCurrentInfo.chargePower.innerHTML = this.selectedTower.chargePower;
        TowerCurrentInfo.chargeSpeed.innerHTML = this.selectedTower.chargeSpeed;

        if (this.currentGold >= TowersUpgrade[this.selectedTower.name].price &&
            this.selectedTower.experience >= this.selectedTower.experienceRequiredToUpgrade) {

			AvailabeToPurchase[this.selectedTower.name + 'Upgrade'] = true;
			Buttons.upgrade.classList.remove('unavailable');
		}

		else {
			AvailabeToPurchase[this.selectedTower.name + 'Upgrade'] = false;
			Buttons.upgrade.classList.add('unavailable');
		}
    }

    setMaxTierInfo() {

        TowerUpgradeInfo.rotationSpeed.style.color = Colors.yellow;
        TowerUpgradeInfo.rotationSpeed.innerHTML = 'MAX';

        TowerUpgradeInfo.fireRate.style.color = Colors.yellow;
        TowerUpgradeInfo.fireRate.innerHTML = 'MAX';

        TowerUpgradeInfo.chargePower.style.color = Colors.yellow;
        TowerUpgradeInfo.chargePower.innerHTML = 'MAX';

        TowerUpgradeInfo.chargeSpeed.style.color = Colors.yellow;
        TowerUpgradeInfo.chargeSpeed.innerHTML = 'MAX';

        TowerUpgradeInfo.price.parentElement.style.display = 'none';
    }

    setUpgradeTierInfo() {

        this.selectedTowerUpgrade = getTowerByTier(this.selectedTower.tier + 1);

        TowerUpgradeInfo.price.parentElement.style.display = 'inline-block';
        TowerUpgradeInfo.price.innerHTML = TowersUpgrade[this.selectedTower.name].price + ' NG';
        TowerUpgradeInfo.price.style.color = Colors.yellow;

        TowerUpgradeInfo.rotationSpeed.innerHTML = this.calculateUpgradeValue(
            
            TowerUpgradeInfo.rotationSpeed,
            this.selectedTowerUpgrade.rotationSpeed,
            this.selectedTower.rotationSpeed
        );

        TowerUpgradeInfo.fireRate.innerHTML = this.calculateUpgradeValue(

            TowerUpgradeInfo.fireRate,
            this.selectedTowerUpgrade.fireRate,
            this.selectedTower.fireRate
        );

        TowerUpgradeInfo.chargePower.innerHTML = this.calculateUpgradeValue(

            TowerUpgradeInfo.chargePower,
            this.selectedTowerUpgrade.chargePower,
            this.selectedTower.chargePower
        );

        TowerUpgradeInfo.chargeSpeed.innerHTML = this.calculateUpgradeValue(

            TowerUpgradeInfo.chargeSpeed,
            this.selectedTowerUpgrade.chargeSpeed,
            this.selectedTower.chargeSpeed
        );
    }

    calculateUpgradeValue(stat, upgradeValue, currentValue) {

        let difference = upgradeValue - currentValue;

        if (difference > 0) {

            stat.style.color = Colors.toxicGreen;
            return '+' + Number(difference).toFixed(1);
        }

        else {

            stat.style.color = Colors.red;
            return Number(difference).toFixed(1);
        }
    }
}
