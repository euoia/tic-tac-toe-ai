import BasePlayer from './BasePlayer.js';

export default class AIPlayer extends BasePlayer {
	getMove(state) {
		console.log('AI player, your move.', state);

		var promise = new Promise((resolve) => {
			resolve();
		});

		return promise;
	}
}
