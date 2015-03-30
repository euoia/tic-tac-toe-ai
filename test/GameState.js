var GameState = require('../src/GameState.js'),
	AIPlayer = require('../src/AIPlayer.js'),
	expect = require('expect.js'),
	clone = require('clone');

describe('GameState', function() {
	var gameState;

	beforeEach(function () {
		gameState = new GameState({
			player1: new AIPlayer({name: 'onebot', symbol: 'X'}),
			player2: new AIPlayer({name: 'twobot', symbol: 'O'})
		});

		gameState.phase = 'playing';
	});

	describe('getValidActions', function() {
		it('should equal 9 with a starting board', function() {
			expect(gameState.getValidActions().length).to.equal(9);
		});

		it('should return moves for the current player', function() {
			expect(gameState.getValidActions()[0].symbol).to.equal(gameState.currentPlayer.symbol);
		});

	});

	describe('applyAction', function() {
		it('should apply a put-symbol action', function() {
			gameState.applyAction({
				type: 'put-symbol',
				row: 1,
				col: 1,
				symbol: 'X'
			});

			expect(gameState.getTile(1, 1).symbol).to.equal('X');
		});

	});

	describe('getWinningSymbol', function() {
		it('should return null for the starting board', function() {
			expect(gameState.getWinningSymbol()).to.equal(null);
		});

		it('should return X when X has the top row', function() {
			gameState.board[0].symbol = 'X';
			gameState.board[1].symbol = 'X';
			gameState.board[2].symbol = 'X';
			expect(gameState.getWinningSymbol()).to.equal('X');
		});
	});

	describe('applyAction', function() {
		it('should update the winner and phase a final X', function() {
			gameState.board[0].symbol = 'X';
			gameState.board[1].symbol = 'X';
			expect(gameState.winningSymbol).to.equal(null);
			expect(gameState.phase).to.equal('playing');

			gameState.applyAction({
				row: 0,
				col: 2,
				type: 'put-symbol',
				symbol: 'X'
			});

			expect(gameState.winningSymbol).to.equal('X');
			expect(gameState.phase).to.equal('complete');
		});

		it('should throw an error for an invalid tileId', function() {
			expect(
				gameState.applyAction.bind(
					gameState,
					{
						row: 1,
						col: 3,
						type: 'put-symbol',
						symbol: 'X'
					}
				)
			).to.throwError(/Invalid action/);
		});
	});

	describe('clone', function() {
		it('changes to the original should not modify the clone', function() {
			var clonedGameState = clone(gameState);
			gameState.board[0].symbol = 'X';
			expect(clonedGameState.board[0].symbol).not.to.equal('X');
		});
	});
});
