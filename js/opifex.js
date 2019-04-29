class Opifex {

    constructor(centurion, ludus) {
        
        this.centurion = centurion;
        this.ludus = ludus;
    }

    createLevelOne(row, column) {
        
        for (row; row < this.ludus.canvas.height / this.ludus.size; row++)
			
			for (column = 0; column < this.ludus.canvas.width / this.ludus.size; column++) {

				if (row == 0 && column == 1)
                    this.centurion.addBlock(new Block('breach', column * this.ludus.size, row * this.ludus.size, 'none', this.ludus));

				else if (row == 4 && column == (this.ludus.canvas.width / this.ludus.size) - 1)
                    this.centurion.addBlock(new Block('nexus', column * this.ludus.size, row * this.ludus.size, 'none', this.ludus));

				else if ((column == 1 && row > 0 && row < (this.ludus.canvas.height / this.ludus.size) - 1) ||
					(row == 1 && column > 1 && column < (this.ludus.canvas.width / this.ludus.size) - 1) ||
					(column == 3 && row > 1 && row < (this.ludus.canvas.height / this.ludus.size) - 1) ||
					(column == 5 && row > 1 && row < (this.ludus.canvas.height / this.ludus.size) - 1) ||
					(column == 7 && row > 1 && row < (this.ludus.canvas.height / this.ludus.size) - 1) ||
					(column == 8 && row > 1 && row < (this.ludus.canvas.height / this.ludus.size) - 1) ||
					(column == 2 && row == (this.ludus.canvas.height / this.ludus.size) - 2) ||
					(column == 6 && row == (this.ludus.canvas.height / this.ludus.size) - 2))
                    this.centurion.addBlock(new Block('road', column * this.ludus.size, row * this.ludus.size, 'none', this.ludus));

				else
                    this.centurion.addBlock(new Block('tower-spot', column * this.ludus.size, row * this.ludus.size, 'none', this.ludus));
			}
    }
}