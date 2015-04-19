var EventEmitter2 = require('eventemitter2').EventEmitter2,
	check = require('check-types'),
	BasePlayer = require('./BasePlayer.js'),
	_ = require('lodash');

module.exports = class GameState {
	constructor (options) {
		check.assert.instance(options.player1, BasePlayer);
		check.assert.instance(options.player2, BasePlayer);

		this.players = [
			options.player1,
			options.player2
		];

		this.board = [
			{row: 0, col: 0, symbol: null},
			{row: 0, col: 1, symbol: null},
			{row: 0, col: 2, symbol: null},
			{row: 1, col: 0, symbol: null},
			{row: 1, col: 1, symbol: null},
			{row: 1, col: 2, symbol: null},
			{row: 2, col: 0, symbol: null},
			{row: 2, col: 1, symbol: null},
			{row: 2, col: 2, symbol: null},
		];

		this.phase = null;
		this.winningSymbol = null;
		this.turnCount = 0;
		this.currentPlayer = this.players[this.turnCount % 2];
		this.emitter = new EventEmitter2();
		this.eventsEnabled = true;
	}

	start () {
		this.phase = 'playing';

		/**
		 * Recursively get and apply the next action until the game is in an
		 * end state.
		 */
		let getWinner = () => {
			if (this.phase !== 'playing') {
				return this.getWinningSymbol();
			}

			return this.getNextAction().then((action) => {
				return this.applyAction(action);
			}).then(getWinner);
		};

		getWinner().then((winner) => {
			if (winner === null) {
				console.log('STALEMATE');
			} else {
				console.log('WE HAVE A WINNER!');
			}
		});
	}

	getValidActions () {
		if (this.phase === 'finished') {
			return [];
		}

		let free = this.board.filter(function (tile) {
			return tile.symbol === null;
		});

		return free.map(function (tile) {
			return {
				type: 'put-symbol',
				symbol: this.currentPlayer.symbol,
				row: tile.row,
				col: tile.col
			};
		}.bind(this));
	}

	getNextAction () {
		var actionPromise = this.currentPlayer.getAction(this);
		check.assert.function(actionPromise.then, 'Player.getAction() must return a promise');
		return actionPromise;
	}

	applyAction (action) {
		var validActions = this.getValidActions();
		var matchingAction = _.findWhere(validActions, action);

		if (typeof matchingAction === 'undefined') {
			console.error(`Valid actions are: ${JSON.stringify(validActions)}`);
			throw new Error(`Invalid action: ${JSON.stringify(action)}`);
		}

		switch (action.type) {
			case 'put-symbol':
				var tile = _.find(this.board, {row: action.row, col: action.col});

				// Update the tile's symbol.
				tile.symbol = action.symbol;
				this.updateWinner();
				if (this.winningSymbol !== null || this.isBoardFull() === true) {
					this.phase = 'complete';
				} else {
					this.turnCount += 1;
					this.currentPlayer = this.players[this.turnCount % 2];
				}

				break;
			default:
				throw new Error('Unrecognized action type: ' + action.type);
		}

		this.emit(
			'action',
			action
		);
	}

	undoAction (action) {
		switch (action.type) {
			case 'put-symbol':
				var tile = _.find(this.board, {row: action.row, col: action.col});

				if (this.phase === 'playing') {
					this.turnCount -= 1;
					this.currentPlayer = this.players[this.turnCount % 2];
				}

				// Update the tile's symbol.
				tile.symbol = null;

				// Update the winner.
				this.updateWinner();

				this.phase = 'playing';
				break;
			default:
				throw new Error('Unrecognized action type: ' + action.type);
		}
	}

	updateWinner () {
		// Check for the winner.
		this.winningSymbol = this.getWinningSymbol();
	}

	isBoardFull () {
		if (_.findWhere(this.board, {symbol: null}) === undefined) {
			return true;
		}

		return false;
	}

	getWinningSymbol () {
		// Row 1.
		if (this.board[0].symbol !== null &&
			this.board[0].symbol === this.board[1].symbol &&
			this.board[0].symbol === this.board[2].symbol
		) {
			return this.board[0].symbol;
		}

		// Row 2.
		if (this.board[3].symbol !== null &&
			this.board[3].symbol === this.board[4].symbol &&
			this.board[3].symbol === this.board[5].symbol
		) {
			return this.board[3].symbol;
		}

		// Row 3.
		if (this.board[6].symbol !== null &&
			this.board[6].symbol === this.board[7].symbol &&
			this.board[6].symbol === this.board[8].symbol
		) {
			return this.board[6].symbol;
		}

		// Col 1.
		if (this.board[0].symbol !== null &&
			this.board[0].symbol === this.board[3].symbol &&
			this.board[0].symbol === this.board[6].symbol
		) {
			return this.board[0].symbol;
		}

		// Col 2.
		if (this.board[1].symbol !== null &&
			this.board[1].symbol === this.board[4].symbol &&
			this.board[1].symbol === this.board[7].symbol
		) {
			return this.board[1].symbol;
		}

		// Col 3.
		if (this.board[2].symbol !== null &&
			this.board[2].symbol === this.board[5].symbol &&
			this.board[2].symbol === this.board[8].symbol
		) {
			return this.board[2].symbol;
		}

		// Diag 1.
		if (this.board[0].symbol !== null &&
			this.board[0].symbol === this.board[4].symbol &&
			this.board[0].symbol === this.board[8].symbol
		) {
			return this.board[0].symbol;
		}

		// Diag 2.
		if (this.board[2].symbol !== null &&
			this.board[2].symbol === this.board[4].symbol &&
			this.board[2].symbol === this.board[6].symbol
		) {
			return this.board[2].symbol;
		}

		return null;
	}

	getTile (row, col) {
		return _.find(this.board, {row: row, col: col});
	}

	emit (eventName, eventData) {
		if (this.eventsEnabled === true) {
			this.emitter.emit(eventName, eventData);
		}
	}

	disableEvents () {
		this.eventsEnabled = false;
	}

	enableEvents () {
		this.eventsEnabled = true;
	}
};
