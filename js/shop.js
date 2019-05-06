
class Shop {

    constructor(game, canvas) {

        this.game = game;
        this.canvas = canvas;
        this.objectSize = canvas.width / 10;

        this.currentGold = game.statistics.gold;

        this.dontDisplayMessage = false;

        this.towerInfoRevealed = false;
        this.tooltipPosition = 'none';
        this.towerInfoTransformOrigin = 'none';

        this.shopButtons = [this.galacticMarineButton, this.orcusChargerButton, this.cptAndromedaButton];

        this.selectedBlock = 0;
        this.selectedTower = 0;
        this.upgradeTower = 0;

        this.cursorX;
        this.cursorY;

        this.towerTier = 0;

        this.availabeToPurchase = {

            galacticMarine: false,
            orcusCharger: false,
            cptAndromeda: false,
            galacticMarineUpgrade: false,
            orcusChargerUpgrade: false
        };
    }

    showMessage() {

        document.body.style.cursor = 'cell';

        this.message.style.opacity = 1;
        this.message.style.transform = 'scale(1)';

        this.messageTitle.innerHTML = 'You have selected a tower!';
        this.messageBody.innerHTML = 'Move your cursor to the grid and press on available spot to purchase it.';
    }

    hideMessage() {

        document.body.style.cursor = 'auto';

        this.message.style.opacity = 0;
        this.message.style.transform = 'scale(0)';
    }

    changeStyle(item, available) {

        if (available) {
            item.style.filter = 'none';
        }
        else
            item.style.filter = 'grayscale(100%) brightness(120%)';
    }

    checkGold() {

        this.currentGold = this.game.statistics.gold;

        for (let item in ShopItems) {

            if (this.currentGold >= ShopItems[item].price) {
                
                this.availabeToPurchase[item] = true;

                if (!item.includes('Upgrade'))
                    this.changeStyle(this[item + 'Button'], true);
            }
            
            else {

                this.availabeToPurchase[item] = false;
                
                if (!item.includes('Upgrade'))
                    this.changeStyle(this[item + 'Button'], false);
            }
        }
    }

    open() {

        const shop = this;

        this.shopButtons.forEach((button, index) => {
            button.addEventListener('click', function() {

                if (shop.availabeToPurchase[shop.getTowerByTier(index + 1).name]) {

                    shop.towerTier = index + 1;

                    if (!shop.dontDisplayMessage)
                        shop.showMessage();
                }
            });
        });

        this.canvas.addEventListener('mousemove', function(event) {
            shop.cursorX = event.offsetX
            shop.cursorY = event.offsetY;
        });
        
        this.canvas.addEventListener('click', function() {
            if (shop.towerTier)
                shop.placeTower();
            else shop.showTowerInfo();
        });

        this.messageDontShowButton.addEventListener('click', function() {
            shop.dontDisplayMessage = true;
            shop.hideMessage();
        });

        this.sellButton.addEventListener('click', function() {
            shop.sellTower();
        });

        this.upgradeButton.addEventListener('click', function() {
            if (shop.availabeToPurchase[shop.selectedTower.name + 'Upgrade'] && shop.selectedTower.tier != 3)
                shop.upgrade();
        });
    }

    placeTower() {

        let row = Math.floor(this.cursorX / 100);
        let column = Math.floor(this.cursorY / 100);

        this.selectedBlock = this.game.blocks[row + column * 10];
        
        if (this.towerTier && this.selectedBlock.type == 'tower-spot' && this.selectedBlock.status != 'occupied') {

            switch (this.towerTier) {

                case 1:
                    this.purchaseTower(
                        new GalacticMarine(
                            this.game, this.game.statistics, this.canvas, this.objectSize, row * this.objectSize, column * this.objectSize));
                    break;

                case 2:
                    this.purchaseTower(
                        new OrcusCharger(
                            this.game, this.game.statistics, this.canvas, this.objectSize, row * this.objectSize, column * this.objectSize));
                    break;

                case 3:
                    this.purchaseTower(
                        new CptAndromeda(
                            this.game, this.game.statistics, this.canvas, this.objectSize, row * this.objectSize, column * this.objectSize));
                    break;
            }

            this.selectedBlock.status = 'occupied';
            this.towerTier = 0;

            this.game.clearBlocks();
            this.game.drawBlocks();
        }
    }

    purchaseTower(tower) {

        let row = (tower.y / this.objectSize) * 10 
        let column = tower.x / this.objectSize;
        
        let blockIndex = row + column;
        let block = this.game.blocks[blockIndex];
        
        block.tower = tower;
        block.tower.blockIndex = blockIndex;

        this.game.towers.push(tower);

        this.game.statistics.reduceGold(tower.price);
        this.game.statistics.update(tower);

        this.hideMessage();
    }

    sellTower() {

        var shop = this;

        setTimeout(function() {
            shop.hideTowerInfo();
        }, 250);

        this.game.remove('towers', this.selectedTower);
        this.game.blocks[this.selectedTower.blockIndex].status = 'none';
        this.game.blocks[this.selectedTower.blockIndex].tower = 0;

        this.game.clearBlocks();
        this.game.drawBlocks();
        
        this.game.statistics.increaseGold(this.selectedTower.price / 2);
        
        this.game.statistics.towers--;
        this.game.statistics.set('towers', this.game.statistics.towers);
    }

    upgrade() {

        var shop = this;

        setTimeout(function() {
            shop.hideTowerInfo();
        }, 250);

        this.game.statistics.reduceGold(ShopItems[this.selectedTower.name + 'Upgrade'].price);

        this.selectedTower.currentExperience = 0;

        this.selectedTower.name = this.upgradeTower.name;
        this.selectedTower.tier = this.upgradeTower.tier;
		this.selectedTower.price = this.upgradeTower.price;
		
		this.selectedTower.rotationSpeed = this.upgradeTower.rotationSpeed;
		this.selectedTower.fireRate = this.upgradeTower.fireRate;
		this.selectedTower.chargePower = this.upgradeTower.chargePower;
		this.selectedTower.chargeSpeed = this.upgradeTower.chargeSpeed;

		this.selectedTower.range = this.upgradeTower.range;

		this.selectedTower.image = document.getElementById(this.upgradeTower.imageID);
		this.selectedTower.width = this.selectedTower.image.width;
		this.selectedTower.height = this.selectedTower.image.height;

        this.game.remove('towers', this.selectedTower);
        this.game.towers.push(this.selectedTower);
        this.game.statistics.update(this.selectedTower);

        this.game.clearBlocks();
        this.game.drawBlocks();
    }

    showTowerInfo() {

        let row = Math.floor(this.cursorX / this.objectSize);
        let column = Math.floor(this.cursorY / this.objectSize);

        this.selectedBlock = this.game.blocks[row + column * 10];

        if (this.selectedBlock.tower != undefined && this.selectedBlock.isOccupied()) { 

            if (this.towerInfoRevealed) return;

            this.setCurrentTierInfo();

            if (this.selectedTower.tier == 3) this.setMaxTierInfo();
            else this.setUpgradeTierInfo();

            if (this.selectedTower.x <= this.canvas.width / 2) this.setTowerInfoPosition('left');
            else this.setTowerInfoPosition('right');

            this.towerInfo.classList.add(this.tooltipPosition);
            this.towerInfoRevealed = true;
        }

        else if (this.towerInfoRevealed)
            this.hideTowerInfo()
    }

    setCurrentTierInfo() {

        this.selectedTower = this.selectedBlock.tower;
        this.towerInfo.style.opacity = 1;

        this.rotationSpeed.innerHTML = this.selectedTower.rotationSpeed;
        this.fireRate.innerHTML = this.selectedTower.fireRate;
        this.chargePower.innerHTML = this.selectedTower.chargePower;
        this.chargeSpeed.innerHTML = this.selectedTower.chargeSpeed;

        this.changeStyle(this.upgradeButton, false);

        if (this.availabeToPurchase[this.selectedTower.name + 'Upgrade'])
            this.changeStyle(this.upgradeButton, true);
    }

    setMaxTierInfo() {

        this.rotationSpeedUpgrade.style.color = Colors.yellow;
        this.rotationSpeedUpgrade.innerHTML = 'MAX';

        this.fireRateUpgrade.style.color = Colors.yellow;
        this.fireRateUpgrade.innerHTML = 'MAX';

        this.chargePowerUpgrade.style.color = Colors.yellow;
        this.chargePowerUpgrade.innerHTML = 'MAX';

        this.chargeSpeedUpgrade.style.color = Colors.yellow;
        this.chargeSpeedUpgrade.innerHTML = 'MAX';

        this.upgradePrice.parentElement.style.display = 'none';
    }

    setUpgradeTierInfo() {

        this.upgradeTower = this.getTowerByTier(this.selectedTower.tier + 1);

        this.upgradePrice.parentElement.style.display = 'inline-block';
        this.upgradePrice.innerHTML = ShopItems[this.selectedTower.name + 'Upgrade'].price + ' NG';
        this.upgradePrice.style.color = Colors.yellow;

        this.rotationSpeedUpgrade.innerHTML = this.calculateUpgradeValue(this.rotationSpeedUpgrade, this.upgradeTower.rotationSpeed, this.selectedTower.rotationSpeed);
        this.fireRateUpgrade.innerHTML = this.calculateUpgradeValue(this.fireRateUpgrade, this.upgradeTower.fireRate, this.selectedTower.fireRate);
        this.chargePowerUpgrade.innerHTML = this.calculateUpgradeValue(this.chargePowerUpgrade, this.upgradeTower.chargePower, this.selectedTower.chargePower);
        this.chargeSpeedUpgrade.innerHTML = this.calculateUpgradeValue(this.chargeSpeedUpgrade, this.upgradeTower.chargeSpeed, this.selectedTower.chargeSpeed);
    }

    setTowerInfoPosition(position) {

        this.tooltipPosition = position;
        this.towerInfo.style.transformOrigin = (position == 'right' ? 'left' : 'right');

        this.towerInfo.style.top = this.selectedTower.y + this.objectSize / 2 + 'px';
        this.towerInfo.style.left = this.selectedTower.x + (position == 'right' ? -this.objectSize * 1.5 : this.objectSize) + 'px';
        this.towerInfo.style.transform = 'scale(1) translateY(-50%)';
    }

    hideTowerInfo() {

        this.towerInfo.style.opacity = 0;
        this.towerInfo.style.transform = 'scale(0)';
        this.towerInfo.classList.remove(this.tooltipPosition);
        this.towerInfoRevealed = false;
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

    getTowerByTier(tier) {
        return tier == 1 ? ShopItems.galacticMarine : tier == 2 ? ShopItems.orcusCharger : ShopItems.cptAndromeda;
    }
}