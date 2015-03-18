import GameState from './GameState.js';
import AIPlayer from './AIPlayer.js';
import HumanPlayer from './HumanPlayer.js';
import Board from './Board.js';
var check = require('check-types');

class App {
	constructor (options) {
		check.assert.instance(options.gameElement, HTMLElement);

		let board = new Board({
			parent: options.gameElement
		});

		let humanPlayer = new HumanPlayer({
			name: 'Humey',
			boardEmitter: board.emitter
		});

		let gameState = new GameState({
			player1: humanPlayer,
			player2: new AIPlayer({ name: 'Bobbot' })
		});

		gameState.fsm.start('hello');
	}
}

window.onload = function () {
	new App({
		gameElement: document.getElementById('tic-tac-toe')
	});
};
