var check = require('check-types');

export default class BasePlayer {
	constructor(options) {
		check.assert.string(options.name);
		this.name = options.name;
	}

	getMove(state) {
		/* jshint unused: false */
		throw new Error('Must implement getMove');
	}
}
