import Illustrator from './illustrator.js';

window.addEventListener('load', function() {
	loadWelcomeScreen();;
});

function loadWelcomeScreen() {

	const canvas = document.getElementById('canvas');
	const illustrator = new Illustrator(canvas);
	illustrator.drawTowerTierOne();
}