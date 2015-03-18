var AIPlayer = require('../AIPlayer.js'),
	expect = require('expect.js');

describe('AIPlayer', function() {
	var aiPlayer;

	beforeEach(function() {
		aiPlayer = new AIPlayer({
			name: 'testbot',
			symbol: 'X'
		});
	});

	describe('evaluateState', function() {
		it('should return 100 when the AI has won', function() {
			var mockState = {
				phase: 'complete',
				winningSymbol: 'X'
			};

			expect(aiPlayer.evaluateState(mockState)).to.equal(100);
		});

		it('should return -100 when the AI has not won', function() {
			var mockState = {
				phase: 'complete',
				winningSymbol: 'O'
			};

			expect(aiPlayer.evaluateState(mockState)).to.equal(-100);
		});
	});

	describe('getBestAction', function() {
		it('should return row=0 col=2 when that would win', function() {
			var bestAction = {
				type: 'put-symbol',
				symbol: 'X',
				row: 0,
				col: 2
			};

			var mockState = {
				getValidActions: function () {
					return [
						bestAction
					];
				},
				applyAction: function () { },
				disableEvents: function () { },
				phase: 'complete',
				winningSymbol: 'X'
			};

			expect(aiPlayer.getBestAction(mockState)).to.equal(bestAction);
		});
	});
});
