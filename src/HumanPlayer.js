var check = require('check-types'),
	Bluebird = require('bluebird');

import BasePlayer from './BasePlayer.js';

export default class HumanPlayer extends BasePlayer {
	constructor(options) {
		check.assert.instance(
			options.boardEmitter,
			require('eventemitter2').EventEmitter2
		);

		this.boardEmitter = options.boardEmitter;

		super(options);
	}

	getAction(state) {
		console.log('getting human action');
		console.dir(state.getValidActions());
		var promise = new Bluebird((resolve) => {
			this.boardEmitter.once(
				'board::click-tile',
				(eventData) => {
					console.log('human player got board event', eventData);
					resolve({
						type: 'put-symbol',
						symbol: this.symbol,
						row: eventData.row,
						col: eventData.col
					});
				}
			);
		});

		return promise;
	}
}
