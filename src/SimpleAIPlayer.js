/**
 * An AI that simply plays the first possible move.
 */
import BasePlayer from './BasePlayer.js';
var Bluebird = require('bluebird');

export default class AIPlayer extends BasePlayer {
	getAction (state) {
		return Bluebird.resolve(state.getValidActions()[0]);
	}
}
