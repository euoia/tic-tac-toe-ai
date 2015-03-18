var EventEmitter2 = require('eventemitter2').EventEmitter2,
	check = require('check-types'),
	BasePlayer = require('./BasePlayer.js'),
	StateMachine = require('javascript-state-machine');

export default class GameState {
	constructor(options) {
		check.assert.instance(options.player1, BasePlayer);
		check.assert.instance(options.player2, BasePlayer);

		this.turnNumber = 0;

		this.players = [
			options.player1,
			options.player2
		];

		this.winner = null;

		this.currentPlayer = this.player1;

		this.board = [
			['.', '.', '.'],
			['.', '.', '.'],
			['.', '.', '.']
		];

		this.emitter = new EventEmitter2();

		let s0 = 'Initial',
			s1 = 'PlayerTurn',
			s2 = 'CheckWin';

		this.fsm = StateMachine.create({
			initial: s0,
			events: [
				{
					name: 'start',
					from: s0,
					to: s1
				},
				{
					name: 'turnComplete',
					from: s1,
					to: s2,
				},
				{
					name: 'checkWinComplete',
					from: s2,
					to: s1
				}
			]
		});

		this.fsm.onenterPlayerTurn = () => {
			this.getCurrentPlayer().getMove(this).then((move) => {
				this.fsm.turnComplete(move);
			});
		};

		this.fsm.onenterCheckWin = () => {
			this.winner = this.checkWin();

			if (this.winner === null) {
				this.turnNumber += 1;
				this.fsm.checkWinComplete();
			}
		};
	}

	checkWin () {
		return null;
	}

	getCurrentPlayer() {
		return this.players[this.turnNumber % 2];
	}
}
