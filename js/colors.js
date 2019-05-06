
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

	alpha: function(color, alpha) {
		return this[color] + alpha;
	}
};