var check = require('check-types');

import BasePlayer from './BasePlayer.js';

export default class HumanPlayer extends BasePlayer {
	constructor(options) {
		check.assert.instance(
			options.boardEmitter,
			require('eventemitter2').EventEmitter2
		);

		this.boardEmitter = options.boardEmitter;
	}

	getMove(state) {
		console.log('Human move', state);
		var promise = new Promise((resolve) => {
			this.boardEmitter.once(
				'board::click-tile',
				(eventData) => {
					console.log('clicked on board!', eventData);
					resolve();
				}
			);
		});

		return promise;
	}
}
