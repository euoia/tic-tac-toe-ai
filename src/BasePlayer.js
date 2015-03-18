var check = require('check-types');

export default class BasePlayer {
	constructor(options) {
		check.assert.string(options.name);
		check.assert.string(options.symbol);
		this.name = options.name;
		this.symbol = options.symbol;
	}

	getMove(state) {
		/* jshint unused: false */
		throw new Error('Must implement getMove');
	}
}
