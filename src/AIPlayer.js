/**
 * An AI that evaluates the board.
 */
import BasePlayer from './BasePlayer.js';
var Bluebird = require('bluebird'),
	_ = require('lodash');

var stateCount;
export default class AIPlayer extends BasePlayer {
	/**
	 * Minimax state evaluation.
	 */
	evaluateState (state, depth) {
		stateCount += 1;
		if (state.phase === 'complete') {
			if (state.winningSymbol === null) {
				// Stalemate.
				return 0;
			}

			// Modify the final score by the depth so that the AI prefer to end
			// the game sooner.
			if (state.winningSymbol === 'O') {
				// This player wins, best outcome.
				return 100 + depth;
			}

			// Other player wins, worst outcome.
			return -100 - depth;
		}

		// Value of the state is the average of the possible action values.
		let validActions = state.getValidActions();

		var startingValue, cmpFn;
		if (state.currentPlayer.symbol === 'O') {
			startingValue = -100;
			cmpFn = _.max;
		} else {
			startingValue = 100;
			cmpFn = _.min;
		}

		var bestValue = startingValue;
		for (
			var actionIdx = 0, numActions = validActions.length;
			actionIdx < numActions;
			actionIdx += 1
		) {
			state.applyAction(validActions[actionIdx]);
			let value = this.evaluateState(state, depth - 1);
			state.undoAction(validActions[actionIdx]);
			bestValue = cmpFn([bestValue, value]);
		}

		return bestValue;
	}

	getBestAction (state) {
		stateCount = 0;
		let validActions = state.getValidActions();
		console.log(`[AIPlayer] considering ${validActions.length} actions.`);
		let startTime = Date.now();

		state.disableEvents();
		let actionValues = validActions.map((action) => {
			state.applyAction(action);
			let value = this.evaluateState(state, 0);
			state.undoAction(action);

			return {
				action: action,
				value: value
			};
		});
		state.enableEvents();

		let timeTaken = Date.now() - startTime;
		console.log(`[AIPlayer] Considered ${stateCount} states in ${timeTaken}ms.`);
		//actionValues.forEach(function (actionValue) {
		//	console.log(`[AIPlayer] Action value: ${JSON.stringify(actionValue)}`);
		//});

		let bestAction = _.chain(actionValues)
			.sortByOrder('value', false)
			.first()
			.result('action')
			.value();

		console.log(`[AIPlayer] I think the best action is: ${JSON.stringify(bestAction)}`);
		return bestAction;
	}

	getAction (state) {
		// Delay a little bit to allow other events to fire.
		return Bluebird.delay(10).then(function () {
			return this.getBestAction(state);
		}.bind(this));
	}
}
