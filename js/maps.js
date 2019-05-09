
class Map {

    constructor(canvas, blockSize) {

        this.canvas = canvas;
        this.blockSize = blockSize;
    }

    addBlock(type, column, row) {

        switch (type) {
    
            case 'tower-spot':

                return new TowerSpot(

                    this.canvas,
                    column * this.blockSize,
                    row * this.blockSize,
                    this.blockSize,
                    'none'
                );
        
            case 'breach':

                return new Breach(

                    this.canvas,
                    column * this.blockSize,
                    row * this.blockSize,
                    this.blockSize,
                    'none'
                );
                
            case 'nexus':

                return new Nexus(

                    this.canvas,
                    column * this.blockSize,
                    row * this.blockSize,
                    this.blockSize,
                    'none'
                );
                
            case 'road':

                return new Road(

                    this.canvas,
                    column * this.blockSize,
                    row * this.blockSize,
                    this.blockSize,
                    'none'
                );   
        }
    }

    theDock() {

        return [

            this.addBlock(   'tower-spot',   0, 0),
            this.addBlock(   'breach',       1, 0),
            this.addBlock(   'tower-spot',   2, 0),
            this.addBlock(   'tower-spot',   3, 0),
            this.addBlock(   'tower-spot',   4, 0),
            this.addBlock(   'tower-spot',   5, 0),
            this.addBlock(   'tower-spot',   6, 0),
            this.addBlock(   'tower-spot',   7, 0),
            this.addBlock(   'tower-spot',   8, 0),
            this.addBlock(   'tower-spot',   9, 0),
            this.addBlock(   'tower-spot',   0, 1),
            this.addBlock(   'road',         1, 1),
            this.addBlock(   'tower-spot',   2, 1),
            this.addBlock(   'tower-spot',   3, 1),
            this.addBlock(   'road',         4, 1),
            this.addBlock(   'road',         5, 1),
            this.addBlock(   'road',         6, 1),
            this.addBlock(   'road',         7, 1),
            this.addBlock(   'road',         8, 1),
            this.addBlock(   'tower-spot',   9, 1),
            this.addBlock(   'tower-spot',   0, 2),
            this.addBlock(   'road',         1, 2),
            this.addBlock(   'road',         2, 2),
            this.addBlock(   'road',         3, 2),
            this.addBlock(   'road',         4, 2),
            this.addBlock(   'tower-spot',   5, 2),
            this.addBlock(   'road',         6, 2),
            this.addBlock(   'tower-spot',   7, 2),
            this.addBlock(   'road',         8, 2),
            this.addBlock(   'tower-spot',   9, 2),
            this.addBlock(   'tower-spot',   0, 3),
            this.addBlock(   'road',         1, 3),
            this.addBlock(   'tower-spot',   2, 3),
            this.addBlock(   'tower-spot',   3, 3),
            this.addBlock(   'road',         4, 3),
            this.addBlock(   'tower-spot',   5, 3),
            this.addBlock(   'road',         6, 3),
            this.addBlock(   'road',         7, 3),
            this.addBlock(   'road',         8, 3),
            this.addBlock(   'tower-spot',   9, 3),
            this.addBlock(   'tower-spot',   0, 4),
            this.addBlock(   'road',         1, 4),
            this.addBlock(   'road',         2, 4),
            this.addBlock(   'road',         3, 4),
            this.addBlock(   'road',         4, 4),
            this.addBlock(   'road',         5, 4),
            this.addBlock(   'road',         6, 4),
            this.addBlock(   'tower-spot',   7, 4),
            this.addBlock(   'road',         8, 4),
            this.addBlock(   'nexus',        9, 4),
            this.addBlock(   'tower-spot',   0, 5),
            this.addBlock(   'tower-spot',   1, 5),
            this.addBlock(   'tower-spot',   2, 5),
            this.addBlock(   'tower-spot',   3, 5),
            this.addBlock(   'tower-spot',   4, 5),
            this.addBlock(   'tower-spot',   5, 5),
            this.addBlock(   'tower-spot',   6, 5),
            this.addBlock(   'tower-spot',   7, 5),
            this.addBlock(   'tower-spot',   8, 5),
            this.addBlock(   'tower-spot',   9, 5)
        ];
    }

    welcome() {

        return [

            this.addBlock('tower-spot', 0, 0),
            this.addBlock('road', 1, 0),
            this.addBlock('road', 2, 0),
            this.addBlock('road', 3, 0),
            this.addBlock('tower-spot', 0, 1),
            this.addBlock('tower-spot', 1, 1),
            this.addBlock('tower-spot', 2, 1),
            this.addBlock('tower-spot', 3, 1),
        ];
    }
};