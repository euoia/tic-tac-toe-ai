import GameState from './src/GameState.js';
import AIPlayer from './src/AIPlayer.js';
import HumanPlayer from './src/HumanPlayer.js';
import Board from './src/Board.js';
var check = require('check-types');

require('source-map-support').install();

class App {
	constructor (options) {
		check.assert.instance(options.gameElement, HTMLElement);

		let board = new Board({
			parent: options.gameElement
		});

		let humanPlayer = new HumanPlayer({
			name: 'Humey',
			boardEmitter: board.emitter,
			symbol: 'X'
		});

		let gameState = new GameState({
			player1: humanPlayer,
			player2: new AIPlayer({
				name: 'Bobbot',
				symbol: 'O'
			})
		});


		board.listenToStateEvents(gameState.emitter);
		gameState.start();
	}
}

window.onload = function () {
	new App({
		gameElement: document.getElementById('tic-tac-toe')
	});
};
