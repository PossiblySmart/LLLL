class Centurion {

	constructor() {
		this.blocks = new Array;
	}

	addBlock(block) {
		this.blocks.push(block);
	}

	removeBlock(block) {
		this.blocks.splice(this.blocks.indexOf(block), 1);
	}

	drawBlocks() {
		this.blocks.forEach(block => { block.draw(); });
	}
}