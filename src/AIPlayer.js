/**
 * An AI that evaluates the board.
 */
import BasePlayer from './BasePlayer.js';
var Bluebird = require('bluebird'),
	clone = require('clone'),
	_ = require('lodash');

var stateCount;
export default class AIPlayer extends BasePlayer {
	evaluateState (state) {
		stateCount += 1;
		if (state.phase === 'complete') {
			if (state.winningSymbol === null) {
				// Stalemate.
				return 0;
			}
			if (state.winningSymbol === 'O') {
				// This player wins, best outcome.
				return 100;
			}

			// Other player wins, worst outcome.
			return -100;
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
		_.map(validActions, (action) => {
			let stateClone = clone(state);
			stateClone.applyAction(action);
			let value = this.evaluateState(stateClone);
			bestValue = cmpFn([bestValue, value]);
		});

		return bestValue;
	}

	getBestAction (state) {
		stateCount = 0;
		let validActions = state.getValidActions();
		console.log(`[AIPlayer] considering ${validActions.length} actions.`);
		let actionValues = validActions.map((action) => {
			let stateClone = clone(state);
			stateClone.disableEvents();
			stateClone.applyAction(action);

			return {
				action: action,
				value: this.evaluateState(stateClone)
			};
		});

		console.log(`[AIPlayer] Considered ${stateCount} states.`);
		actionValues.forEach(function (actionValue) {
			console.log(`[AIPlayer] Action value: ${JSON.stringify(actionValue)}`);
		});

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
