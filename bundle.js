(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/james.pickard/Code/tic-tac-toe-ai/AIPlayer.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BasePlayer = _interopRequire(require("./BasePlayer.js"));

var AIPlayer = (function (_BasePlayer) {
	function AIPlayer() {
		_classCallCheck(this, AIPlayer);

		if (_BasePlayer != null) {
			_BasePlayer.apply(this, arguments);
		}
	}

	_inherits(AIPlayer, _BasePlayer);

	_createClass(AIPlayer, {
		getMove: {
			value: function getMove(state) {
				console.log("AI player, your move.", state);

				var promise = new Promise(function (resolve) {
					resolve();
				});

				return promise;
			}
		}
	});

	return AIPlayer;
})(BasePlayer);

module.exports = AIPlayer;

},{"./BasePlayer.js":"/Users/james.pickard/Code/tic-tac-toe-ai/BasePlayer.js"}],"/Users/james.pickard/Code/tic-tac-toe-ai/App.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var GameState = _interopRequire(require("./GameState.js"));

var AIPlayer = _interopRequire(require("./AIPlayer.js"));

var HumanPlayer = _interopRequire(require("./HumanPlayer.js"));

var Board = _interopRequire(require("./Board.js"));

var check = require("check-types");

var App = function App(options) {
	_classCallCheck(this, App);

	check.assert.instance(options.gameElement, HTMLElement);

	var board = new Board({
		parent: options.gameElement
	});

	var humanPlayer = new HumanPlayer({
		name: "Humey",
		boardEmitter: board.emitter
	});

	var gameState = new GameState({
		player1: humanPlayer,
		player2: new AIPlayer({ name: "Bobbot" })
	});

	gameState.fsm.start("hello");
};

window.onload = function () {
	new App({
		gameElement: document.getElementById("tic-tac-toe")
	});
};

},{"./AIPlayer.js":"/Users/james.pickard/Code/tic-tac-toe-ai/AIPlayer.js","./Board.js":"/Users/james.pickard/Code/tic-tac-toe-ai/Board.js","./GameState.js":"/Users/james.pickard/Code/tic-tac-toe-ai/GameState.js","./HumanPlayer.js":"/Users/james.pickard/Code/tic-tac-toe-ai/HumanPlayer.js","check-types":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/check-types/src/check-types.js"}],"/Users/james.pickard/Code/tic-tac-toe-ai/BasePlayer.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var check = require("check-types");

var BasePlayer = (function () {
	function BasePlayer(options) {
		_classCallCheck(this, BasePlayer);

		check.assert.string(options.name);
		this.name = options.name;
	}

	_createClass(BasePlayer, {
		getMove: {
			value: function getMove(state) {
				/* jshint unused: false */
				throw new Error("Must implement getMove");
			}
		}
	});

	return BasePlayer;
})();

module.exports = BasePlayer;

},{"check-types":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/check-types/src/check-types.js"}],"/Users/james.pickard/Code/tic-tac-toe-ai/Board.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var check = require("check-types"),
    EventEmitter2 = require("eventemitter2").EventEmitter2;

var BoardDrawer = (function () {
	function BoardDrawer(options) {
		var _this = this;

		_classCallCheck(this, BoardDrawer);

		check.assert.instance(options.parent, HTMLElement);

		this.parent = options.parent;

		this.emitter = new EventEmitter2();
		this.tileHeight = 100;
		this.tileWidth = 100;

		this.board = document.createElement("div");
		this.board.style.width = this.tileWidth * 3 + "px";
		this.board.style.height = this.tileHeight * 3 + "px";
		this.board.style.backgroundColor = "#ffcccc";
		this.board.style.position = "absolute";

		this.tiles = [];

		for (var tileRow = 0; tileRow < 3; tileRow += 1) {
			(function (tileRow) {
				_this.tiles[tileRow] = [];

				for (var tileCol = 0; tileCol < 3; tileCol += 1) {
					(function (tileCol) {
						var tile = document.createElement("div");
						tile.style.width = "" + _this.tileWidth + "px";
						tile.style.height = "" + _this.tileHeight + "px";
						tile.style.left = "" + _this.tileWidth * tileCol + "px";
						tile.style.top = "" + _this.tileHeight * tileRow + "px";
						tile.style.backgroundColor = "#ffaaaa";
						tile.style.position = "absolute";
						tile.style.textAlign = "center";
						tile.style.lineHeight = "" + _this.tileHeight + "px";
						tile.style.fontSize = "" + _this.tileHeight + "px";

						// Send click events for the tile.
						tile.onclick = function () {
							_this.emitter.emit("board::click-tile", {
								row: tileRow,
								col: tileCol
							});
						};

						_this.board.appendChild(tile);
						_this.tiles[tileRow][tileCol] = tile;
					})(tileCol);
				}
			})(tileRow);
		}

		this.parent.appendChild(this.board);
	}

	_createClass(BoardDrawer, {
		updateTilePlayer: {
			value: function updateTilePlayer(row, col, playerChar) {
				this.tiles[row][col].innerHtml = playerChar;
			}
		}
	});

	return BoardDrawer;
})();

module.exports = BoardDrawer;

},{"check-types":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/check-types/src/check-types.js","eventemitter2":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/eventemitter2/lib/eventemitter2.js"}],"/Users/james.pickard/Code/tic-tac-toe-ai/GameState.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var EventEmitter2 = require("eventemitter2").EventEmitter2,
    check = require("check-types"),
    BasePlayer = require("./BasePlayer.js"),
    StateMachine = require("javascript-state-machine");

var GameState = (function () {
	function GameState(options) {
		var _this = this;

		_classCallCheck(this, GameState);

		check.assert.instance(options.player1, BasePlayer);
		check.assert.instance(options.player2, BasePlayer);

		this.turnNumber = 0;

		this.players = [options.player1, options.player2];

		this.winner = null;

		this.currentPlayer = this.player1;

		this.board = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];

		this.emitter = new EventEmitter2();

		var s0 = "Initial",
		    s1 = "PlayerTurn",
		    s2 = "CheckWin";

		this.fsm = StateMachine.create({
			initial: s0,
			events: [{
				name: "start",
				from: s0,
				to: s1
			}, {
				name: "turnComplete",
				from: s1,
				to: s2 }, {
				name: "checkWinComplete",
				from: s2,
				to: s1
			}]
		});

		this.fsm.onenterPlayerTurn = function () {
			_this.getCurrentPlayer().getMove(_this).then(function (move) {
				_this.fsm.turnComplete(move);
			});
		};

		this.fsm.onenterCheckWin = function () {
			_this.winner = _this.checkWin();

			if (_this.winner === null) {
				_this.turnNumber += 1;
				_this.fsm.checkWinComplete();
			}
		};
	}

	_createClass(GameState, {
		checkWin: {
			value: function checkWin() {
				return null;
			}
		},
		getCurrentPlayer: {
			value: function getCurrentPlayer() {
				return this.players[this.turnNumber % 2];
			}
		}
	});

	return GameState;
})();

module.exports = GameState;

},{"./BasePlayer.js":"/Users/james.pickard/Code/tic-tac-toe-ai/BasePlayer.js","check-types":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/check-types/src/check-types.js","eventemitter2":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/eventemitter2/lib/eventemitter2.js","javascript-state-machine":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/javascript-state-machine/state-machine.js"}],"/Users/james.pickard/Code/tic-tac-toe-ai/HumanPlayer.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var check = require("check-types");

var BasePlayer = _interopRequire(require("./BasePlayer.js"));

var HumanPlayer = (function (_BasePlayer) {
	function HumanPlayer(options) {
		_classCallCheck(this, HumanPlayer);

		check.assert.instance(options.boardEmitter, require("eventemitter2").EventEmitter2);

		this.boardEmitter = options.boardEmitter;
	}

	_inherits(HumanPlayer, _BasePlayer);

	_createClass(HumanPlayer, {
		getMove: {
			value: function getMove(state) {
				var _this = this;

				console.log("Human move", state);
				var promise = new Promise(function (resolve) {
					_this.boardEmitter.once("board::click-tile", function (eventData) {
						console.log("clicked on board!", eventData);
						resolve();
					});
				});

				return promise;
			}
		}
	});

	return HumanPlayer;
})(BasePlayer);

module.exports = HumanPlayer;

},{"./BasePlayer.js":"/Users/james.pickard/Code/tic-tac-toe-ai/BasePlayer.js","check-types":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/check-types/src/check-types.js","eventemitter2":"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/eventemitter2/lib/eventemitter2.js"}],"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/check-types/src/check-types.js":[function(require,module,exports){
/**
 * This module exports functions for checking types
 * and throwing exceptions.
 */

/*globals define, module */

(function (globals) {
    'use strict';

    var messages, predicates, functions, assert, not, maybe, either;

    messages = {
        like: 'Invalid type',
        instance: 'Invalid type',
        emptyObject: 'Invalid object',
        object: 'Invalid object',
        assigned: 'Invalid value',
        undefined: 'Invalid value',
        null: 'Invalid value',
        hasLength: 'Invalid length',
        emptyArray: 'Invalid array',
        array: 'Invalid array',
        date: 'Invalid date',
        error: 'Invalid error',
        fn: 'Invalid function',
        match: 'Invalid string',
        contains: 'Invalid string',
        unemptyString: 'Invalid string',
        string: 'Invalid string',
        odd: 'Invalid number',
        even: 'Invalid number',
        between: 'Invalid number',
        greater: 'Invalid number',
        less: 'Invalid number',
        positive: 'Invalid number',
        negative: 'Invalid number',
        integer: 'Invalid number',
        zero: 'Invalid number',
        number: 'Invalid number',
        boolean: 'Invalid boolean'
    };

    predicates = {
        like: like,
        instance: instance,
        emptyObject: emptyObject,
        object: object,
        assigned: assigned,
        undefined: isUndefined,
        null: isNull,
        hasLength: hasLength,
        emptyArray: emptyArray,
        array: array,
        date: date,
        error: error,
        function: isFunction,
        match: match,
        contains: contains,
        unemptyString: unemptyString,
        string: string,
        odd: odd,
        even: even,
        between: between,
        greater: greater,
        less: less,
        positive: positive,
        negative: negative,
        integer : integer,
        zero: zero,
        number: number,
        boolean: boolean
    };

    functions = {
        apply: apply,
        map: map,
        all: all,
        any: any
    };

    functions = mixin(functions, predicates);
    assert = createModifiedPredicates(assertModifier, assertImpl);
    not = createModifiedPredicates(notModifier, notImpl);
    maybe = createModifiedPredicates(maybeModifier, maybeImpl);
    either = createModifiedPredicates(eitherModifier);
    assert.not = createModifiedFunctions(assertModifier, not);
    assert.maybe = createModifiedFunctions(assertModifier, maybe);
    assert.either = createModifiedFunctions(assertEitherModifier, predicates);

    exportFunctions(mixin(functions, {
        assert: assert,
        not: not,
        maybe: maybe,
        either: either
    }));

    /**
     * Public function `like`.
     *
     * Tests whether an object 'quacks like a duck'.
     * Returns `true` if the first argument has all of
     * the properties of the second, archetypal argument
     * (the 'duck'). Returns `false` otherwise.
     *
     */
    function like (data, duck) {
        var name;

        for (name in duck) {
            if (duck.hasOwnProperty(name)) {
                if (data.hasOwnProperty(name) === false || typeof data[name] !== typeof duck[name]) {
                    return false;
                }

                if (object(data[name]) && like(data[name], duck[name]) === false) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Public function `instance`.
     *
     * Returns `true` if an object is an instance of a prototype,
     * `false` otherwise.
     *
     */
    function instance (data, prototype) {
        if (data && isFunction(prototype) && data instanceof prototype) {
            return true;
        }

        return false;
    }

    /**
     * Public function `emptyObject`.
     *
     * Returns `true` if something is an empty object,
     * `false` otherwise.
     *
     */
    function emptyObject (data) {
        return object(data) && Object.keys(data).length === 0;
    }

    /**
     * Public function `object`.
     *
     * Returns `true` if something is a plain-old JS object,
     * `false` otherwise.
     *
     */
    function object (data) {
        return Object.prototype.toString.call(data) === '[object Object]';
    }

    /**
     * Public function `assigned`.
     *
     * Returns `true` if something is not null or undefined,
     * `false` otherwise.
     *
     */
    function assigned (data) {
        return !isUndefined(data) && !isNull(data);
    }

    /**
     * Public function `undefined`.
     *
     * Returns `true` if something is undefined,
     * `false` otherwise.
     *
     */
    function isUndefined (data) {
        return data === undefined;
    }

    /**
     * Public function `null`.
     *
     * Returns `true` if something is null,
     * `false` otherwise.
     *
     */
    function isNull (data) {
        return data === null;
    }

    /**
     * Public function `hasLength`.
     *
     * Returns `true` if something is has a length property
     * that equals `value`, `false` otherwise.
     *
     */
    function hasLength (data, value) {
        return assigned(data) && data.length === value;
    }

    /**
     * Public function `emptyArray`.
     *
     * Returns `true` if something is an empty array,
     * `false` otherwise.
     *
     */
    function emptyArray (data) {
        return array(data) && data.length === 0;
    }

    /**
     * Public function `array`.
     *
     * Returns `true` something is an array,
     * `false` otherwise.
     *
     */
    function array (data) {
        return Array.isArray(data);
    }

    /**
     * Public function `date`.
     *
     * Returns `true` something is a valid date,
     * `false` otherwise.
     *
     */
    function date (data) {
        return Object.prototype.toString.call(data) === '[object Date]' &&
            !isNaN(data.getTime());
    }

    /**
     * Public function `error`.
     *
     * Returns `true` if something is a plain-old JS object,
     * `false` otherwise.
     *
     */
    function error (data) {
        return Object.prototype.toString.call(data) === '[object Error]';
    }

    /**
     * Public function `function`.
     *
     * Returns `true` if something is function,
     * `false` otherwise.
     *
     */
    function isFunction (data) {
        return typeof data === 'function';
    }

    /**
     * Public function `match`.
     *
     * Returns `true` if something is a string
     * that matches `regex`, `false` otherwise.
     *
     */
    function match (data, regex) {
        return string(data) && !!data.match(regex);
    }

    /**
     * Public function `contains`.
     *
     * Returns `true` if something is a string
     * that contains `substring`, `false` otherwise.
     *
     */
    function contains (data, substring) {
        return string(data) && data.indexOf(substring) !== -1;
    }

    /**
     * Public function `unemptyString`.
     *
     * Returns `true` if something is a non-empty string,
     * `false` otherwise.
     *
     */
    function unemptyString (data) {
        return string(data) && data !== '';
    }

    /**
     * Public function `string`.
     *
     * Returns `true` if something is a string, `false` otherwise.
     *
     */
    function string (data) {
        return typeof data === 'string';
    }

    /**
     * Public function `odd`.
     *
     * Returns `true` if something is an odd number,
     * `false` otherwise.
     *
     */
    function odd (data) {
        return integer(data) && !even(data);
    }

    /**
     * Public function `even`.
     *
     * Returns `true` if something is an even number,
     * `false` otherwise.
     *
     */
    function even (data) {
        return number(data) && data % 2 === 0;
    }

    /**
     * Public function `integer`.
     *
     * Returns `true` if something is an integer,
     * `false` otherwise.
     *
     */
    function integer (data) {
        return number(data) && data % 1 === 0;
    }

    /**
     * Public function `between`.
     *
     * Returns `true` if something is a number
     * between `a` and `b`, `false` otherwise.
     *
     */
    function between (data, a, b) {
        if (a < b) {
            return greater(data, a) && less(data, b);
        }

        return less(data, a) && greater(data, b);
    }

    /**
     * Public function `greater`.
     *
     * Returns `true` if something is a number
     * greater than `value`, `false` otherwise.
     *
     */
    function greater (data, value) {
        return number(data) && data > value;
    }

    /**
     * Public function `less`.
     *
     * Returns `true` if something is a number
     * less than `value`, `false` otherwise.
     *
     */
    function less (data, value) {
        return number(data) && data < value;
    }

    /**
     * Public function `positive`.
     *
     * Returns `true` if something is a positive number,
     * `false` otherwise.
     *
     */
    function positive (data) {
        return greater(data, 0);
    }

    /**
     * Public function `negative`.
     *
     * Returns `true` if something is a negative number,
     * `false` otherwise.
     *
     * @param data          The thing to test.
     */
    function negative (data) {
        return less(data, 0);
    }

    /**
     * Public function `number`.
     *
     * Returns `true` if data is a number,
     * `false` otherwise.
     *
     */
    function number (data) {
        return typeof data === 'number' && isNaN(data) === false &&
               data !== Number.POSITIVE_INFINITY &&
               data !== Number.NEGATIVE_INFINITY;
    }

    /**
     * Public function `zero`.
     *
     * Returns `true` if something is zero,
     * `false` otherwise.
     *
     * @param data          The thing to test.
     */
    function zero (data) {
        return data === 0;
    }

    /**
     * Public function `boolean`.
     *
     * Returns `true` if data is a boolean value,
     * `false` otherwise.
     *
     */
    function boolean (data) {
        return data === false || data === true;
    }

    /**
     * Public function `apply`.
     *
     * Maps each value from the data to the corresponding predicate and returns
     * the result array. If the same function is to be applied across all of the
     * data, a single predicate function may be passed in.
     *
     */
    function apply (data, predicates) {
        assert.array(data);

        if (isFunction(predicates)) {
            return data.map(function (value) {
                return predicates(value);
            });
        }

        assert.array(predicates);
        assert.hasLength(data, predicates.length);

        return data.map(function (value, index) {
            return predicates[index](value);
        });
    }

    /**
     * Public function `map`.
     *
     * Maps each value from the data to the corresponding predicate and returns
     * the result object. Supports nested objects. If the data is not nested and
     * the same function is to be applied across all of it, a single predicate
     * function may be passed in.
     *
     */
    function map (data, predicates) {
        assert.object(data);

        if (isFunction(predicates)) {
            return mapSimple(data, predicates);
        }

        assert.object(predicates);

        return mapComplex(data, predicates);
    }

    function mapSimple (data, predicate) {
        var result = {};

        Object.keys(data).forEach(function (key) {
            result[key] = predicate(data[key]);
        });

        return result;
    }

    function mapComplex (data, predicates) {
        var result = {};

        Object.keys(predicates).forEach(function (key) {
            var predicate = predicates[key];

            if (isFunction(predicate)) {
                result[key] = predicate(data[key]);
            } else if (object(predicate)) {
                result[key] = mapComplex(data[key], predicate);
            }
        });

        return result;
    }

    /**
     * Public function `all`
     *
     * Check that all boolean values are true
     * in an array (returned from `apply`)
     * or object (returned from `map`).
     *
     */
    function all (data) {
        if (array(data)) {
            return testArray(data, false);
        }

        assert.object(data);

        return testObject(data, false);
    }

    function testArray (data, result) {
        var i;

        for (i = 0; i < data.length; i += 1) {
            if (data[i] === result) {
                return result;
            }
        }

        return !result;
    }

    function testObject (data, result) {
        var key, value;

        for (key in data) {
            if (data.hasOwnProperty(key)) {
                value = data[key];

                if (object(value) && testObject(value, result) === result) {
                    return result;
                }

                if (value === result) {
                    return result;
                }
            }
        }

        return !result;
    }

    /**
     * Public function `any`
     *
     * Check that at least one boolean value is true
     * in an array (returned from `apply`)
     * or object (returned from `map`).
     *
     */
    function any (data) {
        if (array(data)) {
            return testArray(data, true);
        }

        assert.object(data);

        return testObject(data, true);
    }

    function mixin (target, source) {
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });

        return target;
    }

    /**
     * Public modifier `assert`.
     *
     * Throws if `predicate` returns `false`.
     */
    function assertModifier (predicate, defaultMessage) {
        return function () {
            assertPredicate(predicate, arguments, defaultMessage);
        };
    }

    function assertPredicate (predicate, args, defaultMessage) {
        var message = args[args.length - 1];
        assertImpl(predicate.apply(null, args), unemptyString(message) ? message : defaultMessage);
    }

    function assertImpl (value, message) {
        if (value === false) {
            throw new Error(message || 'Assertion failed');
        }
    }

    function assertEitherModifier (predicate, defaultMessage) {
        return function () {
            var error;

            try {
                assertPredicate(predicate, arguments, defaultMessage);
            } catch (e) {
                error = e;
            }

            return {
                or: Object.keys(predicates).reduce(delayedAssert, {})
            };

            function delayedAssert (result, key) {
                result[key] = function () {
                    if (error && !predicates[key].apply(null, arguments)) {
                        throw error;
                    }
                };

                return result;
            }
        };
    }

    /**
     * Public modifier `not`.
     *
     * Negates `predicate`.
     */
    function notModifier (predicate) {
        return function () {
            return notImpl(predicate.apply(null, arguments));
        };
    }

    function notImpl (value) {
        return !value;
    }

    /**
     * Public modifier `maybe`.
     *
     * Returns `true` if predicate argument is  `null` or `undefined`,
     * otherwise propagates the return value from `predicate`.
     */
    function maybeModifier (predicate) {
        return function () {
            if (!assigned(arguments[0])) {
                return true;
            }

            return predicate.apply(null, arguments);
        };
    }

    function maybeImpl (value) {
        if (assigned(value) === false) {
            return true;
        }

        return value;
    }

    /**
     * Public modifier `either`.
     *
     * Returns `true` if either predicate is true.
     */
    function eitherModifier (predicate) {
        return function () {
            var shortcut = predicate.apply(null, arguments);

            return {
                or: Object.keys(predicates).reduce(nopOrPredicate, {})
            };

            function nopOrPredicate (result, key) {
                result[key] = shortcut ? nop : predicates[key];
                return result;
            }
        };

        function nop () {
            return true;
        }
    }

    function createModifiedPredicates (modifier, object) {
        return createModifiedFunctions(modifier, predicates, object);
    }

    function createModifiedFunctions (modifier, functions, object) {
        var result = object || {};

        Object.keys(functions).forEach(function (key) {
            Object.defineProperty(result, key, {
                configurable: false,
                enumerable: true,
                writable: false,
                value: modifier(functions[key], messages[key])
            });
        });

        return result;
    }

    function exportFunctions (functions) {
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return functions;
            });
        } else if (typeof module !== 'undefined' && module !== null && module.exports) {
            module.exports = functions;
        } else {
            globals.check = functions;
        }
    }
}(this));

},{}],"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/eventemitter2/lib/eventemitter2.js":[function(require,module,exports){
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || !!this._all;
    }
    else {
      return !!this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if(!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.EventEmitter2 = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

},{}],"/Users/james.pickard/Code/tic-tac-toe-ai/node_modules/javascript-state-machine/state-machine.js":[function(require,module,exports){
/*

  Javascript State Machine Library - https://github.com/jakesgordon/javascript-state-machine

  Copyright (c) 2012, 2013, 2014, 2015, Jake Gordon and contributors
  Released under the MIT license - https://github.com/jakesgordon/javascript-state-machine/blob/master/LICENSE

*/

(function () {

  var StateMachine = {

    //---------------------------------------------------------------------------

    VERSION: "2.3.5",

    //---------------------------------------------------------------------------

    Result: {
      SUCCEEDED:    1, // the event transitioned successfully from one state to another
      NOTRANSITION: 2, // the event was successfull but no state transition was necessary
      CANCELLED:    3, // the event was cancelled by the caller in a beforeEvent callback
      PENDING:      4  // the event is asynchronous and the caller is in control of when the transition occurs
    },

    Error: {
      INVALID_TRANSITION: 100, // caller tried to fire an event that was innapropriate in the current state
      PENDING_TRANSITION: 200, // caller tried to fire an event while an async transition was still pending
      INVALID_CALLBACK:   300 // caller provided callback function threw an exception
    },

    WILDCARD: '*',
    ASYNC: 'async',

    //---------------------------------------------------------------------------

    create: function(cfg, target) {

      var initial      = (typeof cfg.initial == 'string') ? { state: cfg.initial } : cfg.initial; // allow for a simple string, or an object with { state: 'foo', event: 'setup', defer: true|false }
      var terminal     = cfg.terminal || cfg['final'];
      var fsm          = target || cfg.target  || {};
      var events       = cfg.events || [];
      var callbacks    = cfg.callbacks || {};
      var map          = {}; // track state transitions allowed for an event { event: { from: [ to ] } }
      var transitions  = {}; // track events allowed from a state            { state: [ event ] }

      var add = function(e) {
        var from = (e.from instanceof Array) ? e.from : (e.from ? [e.from] : [StateMachine.WILDCARD]); // allow 'wildcard' transition if 'from' is not specified
        map[e.name] = map[e.name] || {};
        for (var n = 0 ; n < from.length ; n++) {
          transitions[from[n]] = transitions[from[n]] || [];
          transitions[from[n]].push(e.name);

          map[e.name][from[n]] = e.to || from[n]; // allow no-op transition if 'to' is not specified
        }
      };

      if (initial) {
        initial.event = initial.event || 'startup';
        add({ name: initial.event, from: 'none', to: initial.state });
      }

      for(var n = 0 ; n < events.length ; n++)
        add(events[n]);

      for(var name in map) {
        if (map.hasOwnProperty(name))
          fsm[name] = StateMachine.buildEvent(name, map[name]);
      }

      for(var name in callbacks) {
        if (callbacks.hasOwnProperty(name))
          fsm[name] = callbacks[name]
      }

      fsm.current     = 'none';
      fsm.is          = function(state) { return (state instanceof Array) ? (state.indexOf(this.current) >= 0) : (this.current === state); };
      fsm.can         = function(event) { return !this.transition && (map[event].hasOwnProperty(this.current) || map[event].hasOwnProperty(StateMachine.WILDCARD)); }
      fsm.cannot      = function(event) { return !this.can(event); };
      fsm.transitions = function()      { return transitions[this.current]; };
      fsm.isFinished  = function()      { return this.is(terminal); };
      fsm.error       = cfg.error || function(name, from, to, args, error, msg, e) { throw e || msg; }; // default behavior when something unexpected happens is to throw an exception, but caller can override this behavior if desired (see github issue #3 and #17)

      if (initial && !initial.defer)
        fsm[initial.event]();

      return fsm;

    },

    //===========================================================================

    doCallback: function(fsm, func, name, from, to, args) {
      if (func) {
        try {
          return func.apply(fsm, [name, from, to].concat(args));
        }
        catch(e) {
          return fsm.error(name, from, to, args, StateMachine.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
        }
      }
    },

    beforeAnyEvent:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onbeforeevent'],                       name, from, to, args); },
    afterAnyEvent:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onafterevent'] || fsm['onevent'],      name, from, to, args); },
    leaveAnyState:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onleavestate'],                        name, from, to, args); },
    enterAnyState:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onenterstate'] || fsm['onstate'],      name, from, to, args); },
    changeState:     function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onchangestate'],                       name, from, to, args); },

    beforeThisEvent: function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onbefore' + name],                     name, from, to, args); },
    afterThisEvent:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onafter'  + name] || fsm['on' + name], name, from, to, args); },
    leaveThisState:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onleave'  + from],                     name, from, to, args); },
    enterThisState:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onenter'  + to]   || fsm['on' + to],   name, from, to, args); },

    beforeEvent: function(fsm, name, from, to, args) {
      if ((false === StateMachine.beforeThisEvent(fsm, name, from, to, args)) ||
          (false === StateMachine.beforeAnyEvent( fsm, name, from, to, args)))
        return false;
    },

    afterEvent: function(fsm, name, from, to, args) {
      StateMachine.afterThisEvent(fsm, name, from, to, args);
      StateMachine.afterAnyEvent( fsm, name, from, to, args);
    },

    leaveState: function(fsm, name, from, to, args) {
      var specific = StateMachine.leaveThisState(fsm, name, from, to, args),
          general  = StateMachine.leaveAnyState( fsm, name, from, to, args);
      if ((false === specific) || (false === general))
        return false;
      else if ((StateMachine.ASYNC === specific) || (StateMachine.ASYNC === general))
        return StateMachine.ASYNC;
    },

    enterState: function(fsm, name, from, to, args) {
      StateMachine.enterThisState(fsm, name, from, to, args);
      StateMachine.enterAnyState( fsm, name, from, to, args);
    },

    //===========================================================================

    buildEvent: function(name, map) {
      return function() {

        var from  = this.current;
        var to    = map[from] || map[StateMachine.WILDCARD] || from;
        var args  = Array.prototype.slice.call(arguments); // turn arguments into pure array

        if (this.transition)
          return this.error(name, from, to, args, StateMachine.Error.PENDING_TRANSITION, "event " + name + " inappropriate because previous transition did not complete");

        if (this.cannot(name))
          return this.error(name, from, to, args, StateMachine.Error.INVALID_TRANSITION, "event " + name + " inappropriate in current state " + this.current);

        if (false === StateMachine.beforeEvent(this, name, from, to, args))
          return StateMachine.Result.CANCELLED;

        if (from === to) {
          StateMachine.afterEvent(this, name, from, to, args);
          return StateMachine.Result.NOTRANSITION;
        }

        // prepare a transition method for use EITHER lower down, or by caller if they want an async transition (indicated by an ASYNC return value from leaveState)
        var fsm = this;
        this.transition = function() {
          fsm.transition = null; // this method should only ever be called once
          fsm.current = to;
          StateMachine.enterState( fsm, name, from, to, args);
          StateMachine.changeState(fsm, name, from, to, args);
          StateMachine.afterEvent( fsm, name, from, to, args);
          return StateMachine.Result.SUCCEEDED;
        };
        this.transition.cancel = function() { // provide a way for caller to cancel async transition if desired (issue #22)
          fsm.transition = null;
          StateMachine.afterEvent(fsm, name, from, to, args);
        }

        var leave = StateMachine.leaveState(this, name, from, to, args);
        if (false === leave) {
          this.transition = null;
          return StateMachine.Result.CANCELLED;
        }
        else if (StateMachine.ASYNC === leave) {
          return StateMachine.Result.PENDING;
        }
        else {
          if (this.transition) // need to check in case user manually called transition() but forgot to return StateMachine.ASYNC
            return this.transition();
        }

      };
    }

  }; // StateMachine

  //===========================================================================

  //======
  // NODE
  //======
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = StateMachine;
    }
    exports.StateMachine = StateMachine;
  }
  //============
  // AMD/REQUIRE
  //============
  else if (typeof define === 'function' && define.amd) {
    define(function(require) { return StateMachine; });
  }
  //========
  // BROWSER
  //========
  else if (typeof window !== 'undefined') {
    window.StateMachine = StateMachine;
  }
  //===========
  // WEB WORKER
  //===========
  else if (typeof self !== 'undefined') {
    self.StateMachine = StateMachine;
  }

}());

},{}]},{},["/Users/james.pickard/Code/tic-tac-toe-ai/App.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvaW8uanMvdjEuMy4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qYW1lcy5waWNrYXJkL0NvZGUvdGljLXRhYy10b2UtYWkvQUlQbGF5ZXIuanMiLCIvVXNlcnMvamFtZXMucGlja2FyZC9Db2RlL3RpYy10YWMtdG9lLWFpL0FwcC5qcyIsIi9Vc2Vycy9qYW1lcy5waWNrYXJkL0NvZGUvdGljLXRhYy10b2UtYWkvQmFzZVBsYXllci5qcyIsIi9Vc2Vycy9qYW1lcy5waWNrYXJkL0NvZGUvdGljLXRhYy10b2UtYWkvQm9hcmQuanMiLCIvVXNlcnMvamFtZXMucGlja2FyZC9Db2RlL3RpYy10YWMtdG9lLWFpL0dhbWVTdGF0ZS5qcyIsIi9Vc2Vycy9qYW1lcy5waWNrYXJkL0NvZGUvdGljLXRhYy10b2UtYWkvSHVtYW5QbGF5ZXIuanMiLCJub2RlX21vZHVsZXMvY2hlY2stdHlwZXMvc3JjL2NoZWNrLXR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjIvbGliL2V2ZW50ZW1pdHRlcjIuanMiLCJub2RlX21vZHVsZXMvamF2YXNjcmlwdC1zdGF0ZS1tYWNoaW5lL3N0YXRlLW1hY2hpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQU8sVUFBVSwyQkFBTSxpQkFBaUI7O0lBRW5CLFFBQVE7VUFBUixRQUFRO3dCQUFSLFFBQVE7Ozs7Ozs7V0FBUixRQUFROztjQUFSLFFBQVE7QUFDNUIsU0FBTztVQUFBLGlCQUFDLEtBQUssRUFBRTtBQUNkLFdBQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRTVDLFFBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQ3RDLFlBQU8sRUFBRSxDQUFDO0tBQ1YsQ0FBQyxDQUFDOztBQUVILFdBQU8sT0FBTyxDQUFDO0lBQ2Y7Ozs7UUFUbUIsUUFBUTtHQUFTLFVBQVU7O2lCQUEzQixRQUFROzs7Ozs7Ozs7SUNGdEIsU0FBUywyQkFBTSxnQkFBZ0I7O0lBQy9CLFFBQVEsMkJBQU0sZUFBZTs7SUFDN0IsV0FBVywyQkFBTSxrQkFBa0I7O0lBQ25DLEtBQUssMkJBQU0sWUFBWTs7QUFDOUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztJQUU3QixHQUFHLEdBQ0ksU0FEUCxHQUFHLENBQ0ssT0FBTyxFQUFFO3VCQURqQixHQUFHOztBQUVQLE1BQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7O0FBRXhELEtBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDO0FBQ3JCLFFBQU0sRUFBRSxPQUFPLENBQUMsV0FBVztFQUMzQixDQUFDLENBQUM7O0FBRUgsS0FBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUM7QUFDakMsTUFBSSxFQUFFLE9BQU87QUFDYixjQUFZLEVBQUUsS0FBSyxDQUFDLE9BQU87RUFDM0IsQ0FBQyxDQUFDOztBQUVILEtBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDO0FBQzdCLFNBQU8sRUFBRSxXQUFXO0FBQ3BCLFNBQU8sRUFBRSxJQUFJLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztFQUN6QyxDQUFDLENBQUM7O0FBRUgsVUFBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDN0I7O0FBR0YsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZO0FBQzNCLEtBQUksR0FBRyxDQUFDO0FBQ1AsYUFBVyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO0VBQ25ELENBQUMsQ0FBQztDQUNILENBQUM7Ozs7Ozs7OztBQ2hDRixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7O0lBRWQsVUFBVTtBQUNuQixVQURTLFVBQVUsQ0FDbEIsT0FBTyxFQUFFO3dCQURELFVBQVU7O0FBRTdCLE9BQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQyxNQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7RUFDekI7O2NBSm1CLFVBQVU7QUFNOUIsU0FBTztVQUFBLGlCQUFDLEtBQUssRUFBRTs7QUFFZCxVQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDMUM7Ozs7UUFUbUIsVUFBVTs7O2lCQUFWLFVBQVU7Ozs7Ozs7OztBQ0YvQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ2pDLGFBQWEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDOztJQUVuQyxXQUFXO0FBQ3BCLFVBRFMsV0FBVyxDQUNuQixPQUFPLEVBQUU7Ozt3QkFERCxXQUFXOztBQUU5QixPQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDOztBQUVuRCxNQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7O0FBRTdCLE1BQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUNuQyxNQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztBQUN0QixNQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQzs7QUFFckIsTUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNDLE1BQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxBQUFDLElBQUksQ0FBQyxTQUFTLEdBQUksQ0FBQyxHQUFJLElBQUksQ0FBQztBQUN0RCxNQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQUFBQyxJQUFJLENBQUMsVUFBVSxHQUFJLENBQUMsR0FBSSxJQUFJLENBQUM7QUFDeEQsTUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUM3QyxNQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDOztBQUV2QyxNQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsT0FBSyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFO2NBQXhDLE9BQU87QUFDZixVQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRXpCLFNBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRTtnQkFBeEMsT0FBTztBQUNmLFVBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsVUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQU0sTUFBSyxTQUFTLE9BQUksQ0FBQztBQUN6QyxVQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sUUFBTSxNQUFLLFVBQVUsT0FBSSxDQUFDO0FBQzNDLFVBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFNLE1BQUssU0FBUyxHQUFHLE9BQU8sT0FBSSxDQUFDO0FBQ2xELFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFNLE1BQUssVUFBVSxHQUFHLE9BQU8sT0FBSSxDQUFDO0FBQ2xELFVBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUN2QyxVQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDakMsVUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBQ2hDLFVBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxRQUFNLE1BQUssVUFBVSxPQUFJLENBQUM7QUFDL0MsVUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLFFBQU8sTUFBSyxVQUFVLE9BQUksQ0FBQzs7O0FBRzlDLFVBQUksQ0FBQyxPQUFPLEdBQUcsWUFBTTtBQUNwQixhQUFLLE9BQU8sQ0FBQyxJQUFJLENBQ2hCLG1CQUFtQixFQUNuQjtBQUNDLFdBQUcsRUFBRSxPQUFPO0FBQ1osV0FBRyxFQUFFLE9BQU87UUFDWixDQUFDLENBQUM7T0FDSixDQUFDOztBQUVGLFlBQUssS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixZQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7UUF2QjVCLE9BQU87S0F3QmY7TUEzQk8sT0FBTztHQTRCZjs7QUFFRCxNQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDcEM7O2NBakRtQixXQUFXO0FBbUQvQixrQkFBZ0I7VUFBQSwwQkFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtBQUN0QyxRQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7SUFDNUM7Ozs7UUFyRG1CLFdBQVc7OztpQkFBWCxXQUFXOzs7Ozs7Ozs7QUNIaEMsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWE7SUFDekQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDOUIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUN2QyxZQUFZLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7O0lBRS9CLFNBQVM7QUFDbEIsVUFEUyxTQUFTLENBQ2pCLE9BQU8sRUFBRTs7O3dCQURELFNBQVM7O0FBRTVCLE9BQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkQsT0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzs7QUFFbkQsTUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7O0FBRXBCLE1BQUksQ0FBQyxPQUFPLEdBQUcsQ0FDZCxPQUFPLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxPQUFPLENBQ2YsQ0FBQzs7QUFFRixNQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFFbkIsTUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDOztBQUVsQyxNQUFJLENBQUMsS0FBSyxHQUFHLENBQ1osQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUNmLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQ2YsQ0FBQzs7QUFFRixNQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7O0FBRW5DLE1BQUksRUFBRSxHQUFHLFNBQVM7TUFDakIsRUFBRSxHQUFHLFlBQVk7TUFDakIsRUFBRSxHQUFHLFVBQVUsQ0FBQzs7QUFFakIsTUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO0FBQzlCLFVBQU8sRUFBRSxFQUFFO0FBQ1gsU0FBTSxFQUFFLENBQ1A7QUFDQyxRQUFJLEVBQUUsT0FBTztBQUNiLFFBQUksRUFBRSxFQUFFO0FBQ1IsTUFBRSxFQUFFLEVBQUU7SUFDTixFQUNEO0FBQ0MsUUFBSSxFQUFFLGNBQWM7QUFDcEIsUUFBSSxFQUFFLEVBQUU7QUFDUixNQUFFLEVBQUUsRUFBRSxFQUNOLEVBQ0Q7QUFDQyxRQUFJLEVBQUUsa0JBQWtCO0FBQ3hCLFFBQUksRUFBRSxFQUFFO0FBQ1IsTUFBRSxFQUFFLEVBQUU7SUFDTixDQUNEO0dBQ0QsQ0FBQyxDQUFDOztBQUVILE1BQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsWUFBTTtBQUNsQyxTQUFLLGdCQUFnQixFQUFFLENBQUMsT0FBTyxPQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3BELFVBQUssR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7R0FDSCxDQUFDOztBQUVGLE1BQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLFlBQU07QUFDaEMsU0FBSyxNQUFNLEdBQUcsTUFBSyxRQUFRLEVBQUUsQ0FBQzs7QUFFOUIsT0FBSSxNQUFLLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFDekIsVUFBSyxVQUFVLElBQUksQ0FBQyxDQUFDO0FBQ3JCLFVBQUssR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUI7R0FDRCxDQUFDO0VBQ0Y7O2NBL0RtQixTQUFTO0FBaUU3QixVQUFRO1VBQUMsb0JBQUc7QUFDWCxXQUFPLElBQUksQ0FBQztJQUNaOztBQUVELGtCQUFnQjtVQUFBLDRCQUFHO0FBQ2xCLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDOzs7O1FBdkVtQixTQUFTOzs7aUJBQVQsU0FBUzs7Ozs7Ozs7Ozs7OztBQ0w5QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7O0lBRTVCLFVBQVUsMkJBQU0saUJBQWlCOztJQUVuQixXQUFXO0FBQ3BCLFVBRFMsV0FBVyxDQUNuQixPQUFPLEVBQUU7d0JBREQsV0FBVzs7QUFFOUIsT0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ3BCLE9BQU8sQ0FBQyxZQUFZLEVBQ3BCLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQ3RDLENBQUM7O0FBRUYsTUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0VBQ3pDOztXQVJtQixXQUFXOztjQUFYLFdBQVc7QUFVL0IsU0FBTztVQUFBLGlCQUFDLEtBQUssRUFBRTs7O0FBQ2QsV0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakMsUUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDdEMsV0FBSyxZQUFZLENBQUMsSUFBSSxDQUNyQixtQkFBbUIsRUFDbkIsVUFBQyxTQUFTLEVBQUs7QUFDZCxhQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLGFBQU8sRUFBRSxDQUFDO01BQ1YsQ0FDRCxDQUFDO0tBQ0YsQ0FBQyxDQUFDOztBQUVILFdBQU8sT0FBTyxDQUFDO0lBQ2Y7Ozs7UUF2Qm1CLFdBQVc7R0FBUyxVQUFVOztpQkFBOUIsV0FBVzs7O0FDSmhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ250QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEJhc2VQbGF5ZXIgZnJvbSAnLi9CYXNlUGxheWVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQUlQbGF5ZXIgZXh0ZW5kcyBCYXNlUGxheWVyIHtcblx0Z2V0TW92ZShzdGF0ZSkge1xuXHRcdGNvbnNvbGUubG9nKCdBSSBwbGF5ZXIsIHlvdXIgbW92ZS4nLCBzdGF0ZSk7XG5cblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRyZXNvbHZlKCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxufVxuIiwiaW1wb3J0IEdhbWVTdGF0ZSBmcm9tICcuL0dhbWVTdGF0ZS5qcyc7XG5pbXBvcnQgQUlQbGF5ZXIgZnJvbSAnLi9BSVBsYXllci5qcyc7XG5pbXBvcnQgSHVtYW5QbGF5ZXIgZnJvbSAnLi9IdW1hblBsYXllci5qcyc7XG5pbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZC5qcyc7XG52YXIgY2hlY2sgPSByZXF1aXJlKCdjaGVjay10eXBlcycpO1xuXG5jbGFzcyBBcHAge1xuXHRjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuXHRcdGNoZWNrLmFzc2VydC5pbnN0YW5jZShvcHRpb25zLmdhbWVFbGVtZW50LCBIVE1MRWxlbWVudCk7XG5cblx0XHRsZXQgYm9hcmQgPSBuZXcgQm9hcmQoe1xuXHRcdFx0cGFyZW50OiBvcHRpb25zLmdhbWVFbGVtZW50XG5cdFx0fSk7XG5cblx0XHRsZXQgaHVtYW5QbGF5ZXIgPSBuZXcgSHVtYW5QbGF5ZXIoe1xuXHRcdFx0bmFtZTogJ0h1bWV5Jyxcblx0XHRcdGJvYXJkRW1pdHRlcjogYm9hcmQuZW1pdHRlclxuXHRcdH0pO1xuXG5cdFx0bGV0IGdhbWVTdGF0ZSA9IG5ldyBHYW1lU3RhdGUoe1xuXHRcdFx0cGxheWVyMTogaHVtYW5QbGF5ZXIsXG5cdFx0XHRwbGF5ZXIyOiBuZXcgQUlQbGF5ZXIoeyBuYW1lOiAnQm9iYm90JyB9KVxuXHRcdH0pO1xuXG5cdFx0Z2FtZVN0YXRlLmZzbS5zdGFydCgnaGVsbG8nKTtcblx0fVxufVxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRuZXcgQXBwKHtcblx0XHRnYW1lRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpYy10YWMtdG9lJylcblx0fSk7XG59O1xuIiwidmFyIGNoZWNrID0gcmVxdWlyZSgnY2hlY2stdHlwZXMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVBsYXllciB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRjaGVjay5hc3NlcnQuc3RyaW5nKG9wdGlvbnMubmFtZSk7XG5cdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHR9XG5cblx0Z2V0TW92ZShzdGF0ZSkge1xuXHRcdC8qIGpzaGludCB1bnVzZWQ6IGZhbHNlICovXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdNdXN0IGltcGxlbWVudCBnZXRNb3ZlJyk7XG5cdH1cbn1cbiIsInZhciBjaGVjayA9IHJlcXVpcmUoJ2NoZWNrLXR5cGVzJyksXG5cdEV2ZW50RW1pdHRlcjIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJykuRXZlbnRFbWl0dGVyMjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmREcmF3ZXIge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Y2hlY2suYXNzZXJ0Lmluc3RhbmNlKG9wdGlvbnMucGFyZW50LCBIVE1MRWxlbWVudCk7XG5cblx0XHR0aGlzLnBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuXG5cdFx0dGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcjIoKTtcblx0XHR0aGlzLnRpbGVIZWlnaHQgPSAxMDA7XG5cdFx0dGhpcy50aWxlV2lkdGggPSAxMDA7XG5cblx0XHR0aGlzLmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGhpcy5ib2FyZC5zdHlsZS53aWR0aCA9ICh0aGlzLnRpbGVXaWR0aCAgKiAzKSArICdweCc7XG5cdFx0dGhpcy5ib2FyZC5zdHlsZS5oZWlnaHQgPSAodGhpcy50aWxlSGVpZ2h0ICAqIDMpICsgJ3B4Jztcblx0XHR0aGlzLmJvYXJkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZjY2NjJztcblx0XHR0aGlzLmJvYXJkLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuXHRcdHRoaXMudGlsZXMgPSBbXTtcblxuXHRcdGZvciAobGV0IHRpbGVSb3cgPSAwOyB0aWxlUm93IDwgMzsgdGlsZVJvdyArPSAxKSB7XG5cdFx0XHR0aGlzLnRpbGVzW3RpbGVSb3ddID0gW107XG5cblx0XHRcdGZvciAobGV0IHRpbGVDb2wgPSAwOyB0aWxlQ29sIDwgMzsgdGlsZUNvbCArPSAxKSB7XG5cdFx0XHRcdGxldCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdHRpbGUuc3R5bGUud2lkdGggPSBgJHt0aGlzLnRpbGVXaWR0aH1weGA7XG5cdFx0XHRcdHRpbGUuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy50aWxlSGVpZ2h0fXB4YDtcblx0XHRcdFx0dGlsZS5zdHlsZS5sZWZ0ID0gYCR7dGhpcy50aWxlV2lkdGggKiB0aWxlQ29sfXB4YDtcblx0XHRcdFx0dGlsZS5zdHlsZS50b3AgPSBgJHt0aGlzLnRpbGVIZWlnaHQgKiB0aWxlUm93fXB4YDtcblx0XHRcdFx0dGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmYWFhYSc7XG5cdFx0XHRcdHRpbGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0XHR0aWxlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdFx0XHR0aWxlLnN0eWxlLmxpbmVIZWlnaHQgPSBgJHt0aGlzLnRpbGVIZWlnaHR9cHhgO1xuXHRcdFx0XHR0aWxlLnN0eWxlLmZvbnRTaXplICA9IGAke3RoaXMudGlsZUhlaWdodH1weGA7XG5cblx0XHRcdFx0Ly8gU2VuZCBjbGljayBldmVudHMgZm9yIHRoZSB0aWxlLlxuXHRcdFx0XHR0aWxlLm9uY2xpY2sgPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5lbWl0dGVyLmVtaXQoXG5cdFx0XHRcdFx0XHQnYm9hcmQ6OmNsaWNrLXRpbGUnLFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRyb3c6IHRpbGVSb3csXG5cdFx0XHRcdFx0XHRcdGNvbDogdGlsZUNvbFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0dGhpcy5ib2FyZC5hcHBlbmRDaGlsZCh0aWxlKTtcblx0XHRcdFx0dGhpcy50aWxlc1t0aWxlUm93XVt0aWxlQ29sXSA9IHRpbGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5ib2FyZCk7XG5cdH1cblxuXHR1cGRhdGVUaWxlUGxheWVyKHJvdywgY29sLCBwbGF5ZXJDaGFyKSB7XG5cdFx0dGhpcy50aWxlc1tyb3ddW2NvbF0uaW5uZXJIdG1sID0gcGxheWVyQ2hhcjtcblx0fVxufVxuIiwidmFyIEV2ZW50RW1pdHRlcjIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJykuRXZlbnRFbWl0dGVyMixcblx0Y2hlY2sgPSByZXF1aXJlKCdjaGVjay10eXBlcycpLFxuXHRCYXNlUGxheWVyID0gcmVxdWlyZSgnLi9CYXNlUGxheWVyLmpzJyksXG5cdFN0YXRlTWFjaGluZSA9IHJlcXVpcmUoJ2phdmFzY3JpcHQtc3RhdGUtbWFjaGluZScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGUge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Y2hlY2suYXNzZXJ0Lmluc3RhbmNlKG9wdGlvbnMucGxheWVyMSwgQmFzZVBsYXllcik7XG5cdFx0Y2hlY2suYXNzZXJ0Lmluc3RhbmNlKG9wdGlvbnMucGxheWVyMiwgQmFzZVBsYXllcik7XG5cblx0XHR0aGlzLnR1cm5OdW1iZXIgPSAwO1xuXG5cdFx0dGhpcy5wbGF5ZXJzID0gW1xuXHRcdFx0b3B0aW9ucy5wbGF5ZXIxLFxuXHRcdFx0b3B0aW9ucy5wbGF5ZXIyXG5cdFx0XTtcblxuXHRcdHRoaXMud2lubmVyID0gbnVsbDtcblxuXHRcdHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyMTtcblxuXHRcdHRoaXMuYm9hcmQgPSBbXG5cdFx0XHRbJy4nLCAnLicsICcuJ10sXG5cdFx0XHRbJy4nLCAnLicsICcuJ10sXG5cdFx0XHRbJy4nLCAnLicsICcuJ11cblx0XHRdO1xuXG5cdFx0dGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcjIoKTtcblxuXHRcdGxldCBzMCA9ICdJbml0aWFsJyxcblx0XHRcdHMxID0gJ1BsYXllclR1cm4nLFxuXHRcdFx0czIgPSAnQ2hlY2tXaW4nO1xuXG5cdFx0dGhpcy5mc20gPSBTdGF0ZU1hY2hpbmUuY3JlYXRlKHtcblx0XHRcdGluaXRpYWw6IHMwLFxuXHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiAnc3RhcnQnLFxuXHRcdFx0XHRcdGZyb206IHMwLFxuXHRcdFx0XHRcdHRvOiBzMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogJ3R1cm5Db21wbGV0ZScsXG5cdFx0XHRcdFx0ZnJvbTogczEsXG5cdFx0XHRcdFx0dG86IHMyLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogJ2NoZWNrV2luQ29tcGxldGUnLFxuXHRcdFx0XHRcdGZyb206IHMyLFxuXHRcdFx0XHRcdHRvOiBzMVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSk7XG5cblx0XHR0aGlzLmZzbS5vbmVudGVyUGxheWVyVHVybiA9ICgpID0+IHtcblx0XHRcdHRoaXMuZ2V0Q3VycmVudFBsYXllcigpLmdldE1vdmUodGhpcykudGhlbigobW92ZSkgPT4ge1xuXHRcdFx0XHR0aGlzLmZzbS50dXJuQ29tcGxldGUobW92ZSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0dGhpcy5mc20ub25lbnRlckNoZWNrV2luID0gKCkgPT4ge1xuXHRcdFx0dGhpcy53aW5uZXIgPSB0aGlzLmNoZWNrV2luKCk7XG5cblx0XHRcdGlmICh0aGlzLndpbm5lciA9PT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLnR1cm5OdW1iZXIgKz0gMTtcblx0XHRcdFx0dGhpcy5mc20uY2hlY2tXaW5Db21wbGV0ZSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHRjaGVja1dpbiAoKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRnZXRDdXJyZW50UGxheWVyKCkge1xuXHRcdHJldHVybiB0aGlzLnBsYXllcnNbdGhpcy50dXJuTnVtYmVyICUgMl07XG5cdH1cbn1cbiIsInZhciBjaGVjayA9IHJlcXVpcmUoJ2NoZWNrLXR5cGVzJyk7XG5cbmltcG9ydCBCYXNlUGxheWVyIGZyb20gJy4vQmFzZVBsYXllci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1bWFuUGxheWVyIGV4dGVuZHMgQmFzZVBsYXllciB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRjaGVjay5hc3NlcnQuaW5zdGFuY2UoXG5cdFx0XHRvcHRpb25zLmJvYXJkRW1pdHRlcixcblx0XHRcdHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjInKS5FdmVudEVtaXR0ZXIyXG5cdFx0KTtcblxuXHRcdHRoaXMuYm9hcmRFbWl0dGVyID0gb3B0aW9ucy5ib2FyZEVtaXR0ZXI7XG5cdH1cblxuXHRnZXRNb3ZlKHN0YXRlKSB7XG5cdFx0Y29uc29sZS5sb2coJ0h1bWFuIG1vdmUnLCBzdGF0ZSk7XG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0dGhpcy5ib2FyZEVtaXR0ZXIub25jZShcblx0XHRcdFx0J2JvYXJkOjpjbGljay10aWxlJyxcblx0XHRcdFx0KGV2ZW50RGF0YSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdjbGlja2VkIG9uIGJvYXJkIScsIGV2ZW50RGF0YSk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cbiIsIi8qKlxuICogVGhpcyBtb2R1bGUgZXhwb3J0cyBmdW5jdGlvbnMgZm9yIGNoZWNraW5nIHR5cGVzXG4gKiBhbmQgdGhyb3dpbmcgZXhjZXB0aW9ucy5cbiAqL1xuXG4vKmdsb2JhbHMgZGVmaW5lLCBtb2R1bGUgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIG1lc3NhZ2VzLCBwcmVkaWNhdGVzLCBmdW5jdGlvbnMsIGFzc2VydCwgbm90LCBtYXliZSwgZWl0aGVyO1xuXG4gICAgbWVzc2FnZXMgPSB7XG4gICAgICAgIGxpa2U6ICdJbnZhbGlkIHR5cGUnLFxuICAgICAgICBpbnN0YW5jZTogJ0ludmFsaWQgdHlwZScsXG4gICAgICAgIGVtcHR5T2JqZWN0OiAnSW52YWxpZCBvYmplY3QnLFxuICAgICAgICBvYmplY3Q6ICdJbnZhbGlkIG9iamVjdCcsXG4gICAgICAgIGFzc2lnbmVkOiAnSW52YWxpZCB2YWx1ZScsXG4gICAgICAgIHVuZGVmaW5lZDogJ0ludmFsaWQgdmFsdWUnLFxuICAgICAgICBudWxsOiAnSW52YWxpZCB2YWx1ZScsXG4gICAgICAgIGhhc0xlbmd0aDogJ0ludmFsaWQgbGVuZ3RoJyxcbiAgICAgICAgZW1wdHlBcnJheTogJ0ludmFsaWQgYXJyYXknLFxuICAgICAgICBhcnJheTogJ0ludmFsaWQgYXJyYXknLFxuICAgICAgICBkYXRlOiAnSW52YWxpZCBkYXRlJyxcbiAgICAgICAgZXJyb3I6ICdJbnZhbGlkIGVycm9yJyxcbiAgICAgICAgZm46ICdJbnZhbGlkIGZ1bmN0aW9uJyxcbiAgICAgICAgbWF0Y2g6ICdJbnZhbGlkIHN0cmluZycsXG4gICAgICAgIGNvbnRhaW5zOiAnSW52YWxpZCBzdHJpbmcnLFxuICAgICAgICB1bmVtcHR5U3RyaW5nOiAnSW52YWxpZCBzdHJpbmcnLFxuICAgICAgICBzdHJpbmc6ICdJbnZhbGlkIHN0cmluZycsXG4gICAgICAgIG9kZDogJ0ludmFsaWQgbnVtYmVyJyxcbiAgICAgICAgZXZlbjogJ0ludmFsaWQgbnVtYmVyJyxcbiAgICAgICAgYmV0d2VlbjogJ0ludmFsaWQgbnVtYmVyJyxcbiAgICAgICAgZ3JlYXRlcjogJ0ludmFsaWQgbnVtYmVyJyxcbiAgICAgICAgbGVzczogJ0ludmFsaWQgbnVtYmVyJyxcbiAgICAgICAgcG9zaXRpdmU6ICdJbnZhbGlkIG51bWJlcicsXG4gICAgICAgIG5lZ2F0aXZlOiAnSW52YWxpZCBudW1iZXInLFxuICAgICAgICBpbnRlZ2VyOiAnSW52YWxpZCBudW1iZXInLFxuICAgICAgICB6ZXJvOiAnSW52YWxpZCBudW1iZXInLFxuICAgICAgICBudW1iZXI6ICdJbnZhbGlkIG51bWJlcicsXG4gICAgICAgIGJvb2xlYW46ICdJbnZhbGlkIGJvb2xlYW4nXG4gICAgfTtcblxuICAgIHByZWRpY2F0ZXMgPSB7XG4gICAgICAgIGxpa2U6IGxpa2UsXG4gICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgZW1wdHlPYmplY3Q6IGVtcHR5T2JqZWN0LFxuICAgICAgICBvYmplY3Q6IG9iamVjdCxcbiAgICAgICAgYXNzaWduZWQ6IGFzc2lnbmVkLFxuICAgICAgICB1bmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICAgICAgICBudWxsOiBpc051bGwsXG4gICAgICAgIGhhc0xlbmd0aDogaGFzTGVuZ3RoLFxuICAgICAgICBlbXB0eUFycmF5OiBlbXB0eUFycmF5LFxuICAgICAgICBhcnJheTogYXJyYXksXG4gICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgZnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gICAgICAgIG1hdGNoOiBtYXRjaCxcbiAgICAgICAgY29udGFpbnM6IGNvbnRhaW5zLFxuICAgICAgICB1bmVtcHR5U3RyaW5nOiB1bmVtcHR5U3RyaW5nLFxuICAgICAgICBzdHJpbmc6IHN0cmluZyxcbiAgICAgICAgb2RkOiBvZGQsXG4gICAgICAgIGV2ZW46IGV2ZW4sXG4gICAgICAgIGJldHdlZW46IGJldHdlZW4sXG4gICAgICAgIGdyZWF0ZXI6IGdyZWF0ZXIsXG4gICAgICAgIGxlc3M6IGxlc3MsXG4gICAgICAgIHBvc2l0aXZlOiBwb3NpdGl2ZSxcbiAgICAgICAgbmVnYXRpdmU6IG5lZ2F0aXZlLFxuICAgICAgICBpbnRlZ2VyIDogaW50ZWdlcixcbiAgICAgICAgemVybzogemVybyxcbiAgICAgICAgbnVtYmVyOiBudW1iZXIsXG4gICAgICAgIGJvb2xlYW46IGJvb2xlYW5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb25zID0ge1xuICAgICAgICBhcHBseTogYXBwbHksXG4gICAgICAgIG1hcDogbWFwLFxuICAgICAgICBhbGw6IGFsbCxcbiAgICAgICAgYW55OiBhbnlcbiAgICB9O1xuXG4gICAgZnVuY3Rpb25zID0gbWl4aW4oZnVuY3Rpb25zLCBwcmVkaWNhdGVzKTtcbiAgICBhc3NlcnQgPSBjcmVhdGVNb2RpZmllZFByZWRpY2F0ZXMoYXNzZXJ0TW9kaWZpZXIsIGFzc2VydEltcGwpO1xuICAgIG5vdCA9IGNyZWF0ZU1vZGlmaWVkUHJlZGljYXRlcyhub3RNb2RpZmllciwgbm90SW1wbCk7XG4gICAgbWF5YmUgPSBjcmVhdGVNb2RpZmllZFByZWRpY2F0ZXMobWF5YmVNb2RpZmllciwgbWF5YmVJbXBsKTtcbiAgICBlaXRoZXIgPSBjcmVhdGVNb2RpZmllZFByZWRpY2F0ZXMoZWl0aGVyTW9kaWZpZXIpO1xuICAgIGFzc2VydC5ub3QgPSBjcmVhdGVNb2RpZmllZEZ1bmN0aW9ucyhhc3NlcnRNb2RpZmllciwgbm90KTtcbiAgICBhc3NlcnQubWF5YmUgPSBjcmVhdGVNb2RpZmllZEZ1bmN0aW9ucyhhc3NlcnRNb2RpZmllciwgbWF5YmUpO1xuICAgIGFzc2VydC5laXRoZXIgPSBjcmVhdGVNb2RpZmllZEZ1bmN0aW9ucyhhc3NlcnRFaXRoZXJNb2RpZmllciwgcHJlZGljYXRlcyk7XG5cbiAgICBleHBvcnRGdW5jdGlvbnMobWl4aW4oZnVuY3Rpb25zLCB7XG4gICAgICAgIGFzc2VydDogYXNzZXJ0LFxuICAgICAgICBub3Q6IG5vdCxcbiAgICAgICAgbWF5YmU6IG1heWJlLFxuICAgICAgICBlaXRoZXI6IGVpdGhlclxuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgbGlrZWAuXG4gICAgICpcbiAgICAgKiBUZXN0cyB3aGV0aGVyIGFuIG9iamVjdCAncXVhY2tzIGxpa2UgYSBkdWNrJy5cbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaGFzIGFsbCBvZlxuICAgICAqIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBzZWNvbmQsIGFyY2hldHlwYWwgYXJndW1lbnRcbiAgICAgKiAodGhlICdkdWNrJykuIFJldHVybnMgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsaWtlIChkYXRhLCBkdWNrKSB7XG4gICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgIGZvciAobmFtZSBpbiBkdWNrKSB7XG4gICAgICAgICAgICBpZiAoZHVjay5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KG5hbWUpID09PSBmYWxzZSB8fCB0eXBlb2YgZGF0YVtuYW1lXSAhPT0gdHlwZW9mIGR1Y2tbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QoZGF0YVtuYW1lXSkgJiYgbGlrZShkYXRhW25hbWVdLCBkdWNrW25hbWVdKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgaW5zdGFuY2VgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYW4gb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIGEgcHJvdG90eXBlLFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5zdGFuY2UgKGRhdGEsIHByb3RvdHlwZSkge1xuICAgICAgICBpZiAoZGF0YSAmJiBpc0Z1bmN0aW9uKHByb3RvdHlwZSkgJiYgZGF0YSBpbnN0YW5jZW9mIHByb3RvdHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBlbXB0eU9iamVjdGAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBzb21ldGhpbmcgaXMgYW4gZW1wdHkgb2JqZWN0LFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gZW1wdHlPYmplY3QgKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdChkYXRhKSAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgc29tZXRoaW5nIGlzIGEgcGxhaW4tb2xkIEpTIG9iamVjdCxcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9iamVjdCAoZGF0YSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGEpID09PSAnW29iamVjdCBPYmplY3RdJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgZnVuY3Rpb24gYGFzc2lnbmVkYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHNvbWV0aGluZyBpcyBub3QgbnVsbCBvciB1bmRlZmluZWQsXG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NpZ25lZCAoZGF0YSkge1xuICAgICAgICByZXR1cm4gIWlzVW5kZWZpbmVkKGRhdGEpICYmICFpc051bGwoZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgc29tZXRoaW5nIGlzIHVuZGVmaW5lZCxcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVW5kZWZpbmVkIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhID09PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBudWxsYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHNvbWV0aGluZyBpcyBudWxsLFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNOdWxsIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhID09PSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgaGFzTGVuZ3RoYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHNvbWV0aGluZyBpcyBoYXMgYSBsZW5ndGggcHJvcGVydHlcbiAgICAgKiB0aGF0IGVxdWFscyBgdmFsdWVgLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc0xlbmd0aCAoZGF0YSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGFzc2lnbmVkKGRhdGEpICYmIGRhdGEubGVuZ3RoID09PSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgZnVuY3Rpb24gYGVtcHR5QXJyYXlgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgc29tZXRoaW5nIGlzIGFuIGVtcHR5IGFycmF5LFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gZW1wdHlBcnJheSAoZGF0YSkge1xuICAgICAgICByZXR1cm4gYXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBhcnJheWAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBzb21ldGhpbmcgaXMgYW4gYXJyYXksXG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcnJheSAoZGF0YSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgZnVuY3Rpb24gYGRhdGVgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgc29tZXRoaW5nIGlzIGEgdmFsaWQgZGF0ZSxcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRhdGUgKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRhKSA9PT0gJ1tvYmplY3QgRGF0ZV0nICYmXG4gICAgICAgICAgICAhaXNOYU4oZGF0YS5nZXRUaW1lKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgZXJyb3JgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgc29tZXRoaW5nIGlzIGEgcGxhaW4tb2xkIEpTIG9iamVjdCxcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVycm9yIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkgPT09ICdbb2JqZWN0IEVycm9yXSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBmdW5jdGlvbmAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBzb21ldGhpbmcgaXMgZnVuY3Rpb24sXG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgZnVuY3Rpb24gYG1hdGNoYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHNvbWV0aGluZyBpcyBhIHN0cmluZ1xuICAgICAqIHRoYXQgbWF0Y2hlcyBgcmVnZXhgLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1hdGNoIChkYXRhLCByZWdleCkge1xuICAgICAgICByZXR1cm4gc3RyaW5nKGRhdGEpICYmICEhZGF0YS5tYXRjaChyZWdleCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBjb250YWluc2AuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBzb21ldGhpbmcgaXMgYSBzdHJpbmdcbiAgICAgKiB0aGF0IGNvbnRhaW5zIGBzdWJzdHJpbmdgLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zIChkYXRhLCBzdWJzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZyhkYXRhKSAmJiBkYXRhLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGB1bmVtcHR5U3RyaW5nYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHNvbWV0aGluZyBpcyBhIG5vbi1lbXB0eSBzdHJpbmcsXG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bmVtcHR5U3RyaW5nIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcoZGF0YSkgJiYgZGF0YSAhPT0gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBzdHJpbmdgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgc29tZXRoaW5nIGlzIGEgc3RyaW5nLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0cmluZyAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgb2RkYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHNvbWV0aGluZyBpcyBhbiBvZGQgbnVtYmVyLFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gb2RkIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBpbnRlZ2VyKGRhdGEpICYmICFldmVuKGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgZXZlbmAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBzb21ldGhpbmcgaXMgYW4gZXZlbiBudW1iZXIsXG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBldmVuIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBudW1iZXIoZGF0YSkgJiYgZGF0YSAlIDIgPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBpbnRlZ2VyYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHNvbWV0aGluZyBpcyBhbiBpbnRlZ2VyLFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW50ZWdlciAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbnVtYmVyKGRhdGEpICYmIGRhdGEgJSAxID09PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgYmV0d2VlbmAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBzb21ldGhpbmcgaXMgYSBudW1iZXJcbiAgICAgKiBiZXR3ZWVuIGBhYCBhbmQgYGJgLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJldHdlZW4gKGRhdGEsIGEsIGIpIHtcbiAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gZ3JlYXRlcihkYXRhLCBhKSAmJiBsZXNzKGRhdGEsIGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlc3MoZGF0YSwgYSkgJiYgZ3JlYXRlcihkYXRhLCBiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgZnVuY3Rpb24gYGdyZWF0ZXJgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgc29tZXRoaW5nIGlzIGEgbnVtYmVyXG4gICAgICogZ3JlYXRlciB0aGFuIGB2YWx1ZWAsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ3JlYXRlciAoZGF0YSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bWJlcihkYXRhKSAmJiBkYXRhID4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBsZXNzYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHNvbWV0aGluZyBpcyBhIG51bWJlclxuICAgICAqIGxlc3MgdGhhbiBgdmFsdWVgLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxlc3MgKGRhdGEsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBudW1iZXIoZGF0YSkgJiYgZGF0YSA8IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgcG9zaXRpdmVgLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgc29tZXRoaW5nIGlzIGEgcG9zaXRpdmUgbnVtYmVyLFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gcG9zaXRpdmUgKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGdyZWF0ZXIoZGF0YSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBuZWdhdGl2ZWAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBzb21ldGhpbmcgaXMgYSBuZWdhdGl2ZSBudW1iZXIsXG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSAgICAgICAgICBUaGUgdGhpbmcgdG8gdGVzdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBuZWdhdGl2ZSAoZGF0YSkge1xuICAgICAgICByZXR1cm4gbGVzcyhkYXRhLCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgZnVuY3Rpb24gYG51bWJlcmAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBkYXRhIGlzIGEgbnVtYmVyLFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gbnVtYmVyIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicgJiYgaXNOYU4oZGF0YSkgPT09IGZhbHNlICYmXG4gICAgICAgICAgICAgICBkYXRhICE9PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgJiZcbiAgICAgICAgICAgICAgIGRhdGEgIT09IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgZnVuY3Rpb24gYHplcm9gLlxuICAgICAqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgc29tZXRoaW5nIGlzIHplcm8sXG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSAgICAgICAgICBUaGUgdGhpbmcgdG8gdGVzdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB6ZXJvIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhID09PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgYm9vbGVhbmAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBkYXRhIGlzIGEgYm9vbGVhbiB2YWx1ZSxcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJvb2xlYW4gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEgPT09IGZhbHNlIHx8IGRhdGEgPT09IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBhcHBseWAuXG4gICAgICpcbiAgICAgKiBNYXBzIGVhY2ggdmFsdWUgZnJvbSB0aGUgZGF0YSB0byB0aGUgY29ycmVzcG9uZGluZyBwcmVkaWNhdGUgYW5kIHJldHVybnNcbiAgICAgKiB0aGUgcmVzdWx0IGFycmF5LiBJZiB0aGUgc2FtZSBmdW5jdGlvbiBpcyB0byBiZSBhcHBsaWVkIGFjcm9zcyBhbGwgb2YgdGhlXG4gICAgICogZGF0YSwgYSBzaW5nbGUgcHJlZGljYXRlIGZ1bmN0aW9uIG1heSBiZSBwYXNzZWQgaW4uXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcHBseSAoZGF0YSwgcHJlZGljYXRlcykge1xuICAgICAgICBhc3NlcnQuYXJyYXkoZGF0YSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocHJlZGljYXRlcykpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlZGljYXRlcyh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydC5hcnJheShwcmVkaWNhdGVzKTtcbiAgICAgICAgYXNzZXJ0Lmhhc0xlbmd0aChkYXRhLCBwcmVkaWNhdGVzLmxlbmd0aCk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWNhdGVzW2luZGV4XSh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBmdW5jdGlvbiBgbWFwYC5cbiAgICAgKlxuICAgICAqIE1hcHMgZWFjaCB2YWx1ZSBmcm9tIHRoZSBkYXRhIHRvIHRoZSBjb3JyZXNwb25kaW5nIHByZWRpY2F0ZSBhbmQgcmV0dXJuc1xuICAgICAqIHRoZSByZXN1bHQgb2JqZWN0LiBTdXBwb3J0cyBuZXN0ZWQgb2JqZWN0cy4gSWYgdGhlIGRhdGEgaXMgbm90IG5lc3RlZCBhbmRcbiAgICAgKiB0aGUgc2FtZSBmdW5jdGlvbiBpcyB0byBiZSBhcHBsaWVkIGFjcm9zcyBhbGwgb2YgaXQsIGEgc2luZ2xlIHByZWRpY2F0ZVxuICAgICAqIGZ1bmN0aW9uIG1heSBiZSBwYXNzZWQgaW4uXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXAgKGRhdGEsIHByZWRpY2F0ZXMpIHtcbiAgICAgICAgYXNzZXJ0Lm9iamVjdChkYXRhKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihwcmVkaWNhdGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hcFNpbXBsZShkYXRhLCBwcmVkaWNhdGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydC5vYmplY3QocHJlZGljYXRlcyk7XG5cbiAgICAgICAgcmV0dXJuIG1hcENvbXBsZXgoZGF0YSwgcHJlZGljYXRlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwU2ltcGxlIChkYXRhLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBwcmVkaWNhdGUoZGF0YVtrZXldKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXBDb21wbGV4IChkYXRhLCBwcmVkaWNhdGVzKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcblxuICAgICAgICBPYmplY3Qua2V5cyhwcmVkaWNhdGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcmVkaWNhdGUgPSBwcmVkaWNhdGVzW2tleV07XG5cbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHByZWRpY2F0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHByZWRpY2F0ZShkYXRhW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmplY3QocHJlZGljYXRlKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gbWFwQ29tcGxleChkYXRhW2tleV0sIHByZWRpY2F0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBhbGxgXG4gICAgICpcbiAgICAgKiBDaGVjayB0aGF0IGFsbCBib29sZWFuIHZhbHVlcyBhcmUgdHJ1ZVxuICAgICAqIGluIGFuIGFycmF5IChyZXR1cm5lZCBmcm9tIGBhcHBseWApXG4gICAgICogb3Igb2JqZWN0IChyZXR1cm5lZCBmcm9tIGBtYXBgKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFsbCAoZGF0YSkge1xuICAgICAgICBpZiAoYXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXN0QXJyYXkoZGF0YSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0Lm9iamVjdChkYXRhKTtcblxuICAgICAgICByZXR1cm4gdGVzdE9iamVjdChkYXRhLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVzdEFycmF5IChkYXRhLCByZXN1bHQpIHtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2ldID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICFyZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVzdE9iamVjdCAoZGF0YSwgcmVzdWx0KSB7XG4gICAgICAgIHZhciBrZXksIHZhbHVlO1xuXG4gICAgICAgIGZvciAoa2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFba2V5XTtcblxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QodmFsdWUpICYmIHRlc3RPYmplY3QodmFsdWUsIHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICFyZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIGZ1bmN0aW9uIGBhbnlgXG4gICAgICpcbiAgICAgKiBDaGVjayB0aGF0IGF0IGxlYXN0IG9uZSBib29sZWFuIHZhbHVlIGlzIHRydWVcbiAgICAgKiBpbiBhbiBhcnJheSAocmV0dXJuZWQgZnJvbSBgYXBwbHlgKVxuICAgICAqIG9yIG9iamVjdCAocmV0dXJuZWQgZnJvbSBgbWFwYCkuXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbnkgKGRhdGEpIHtcbiAgICAgICAgaWYgKGFycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVzdEFycmF5KGRhdGEsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0Lm9iamVjdChkYXRhKTtcblxuICAgICAgICByZXR1cm4gdGVzdE9iamVjdChkYXRhLCB0cnVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtaXhpbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1vZGlmaWVyIGBhc3NlcnRgLlxuICAgICAqXG4gICAgICogVGhyb3dzIGlmIGBwcmVkaWNhdGVgIHJldHVybnMgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NlcnRNb2RpZmllciAocHJlZGljYXRlLCBkZWZhdWx0TWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXNzZXJ0UHJlZGljYXRlKHByZWRpY2F0ZSwgYXJndW1lbnRzLCBkZWZhdWx0TWVzc2FnZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNzZXJ0UHJlZGljYXRlIChwcmVkaWNhdGUsIGFyZ3MsIGRlZmF1bHRNZXNzYWdlKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICBhc3NlcnRJbXBsKHByZWRpY2F0ZS5hcHBseShudWxsLCBhcmdzKSwgdW5lbXB0eVN0cmluZyhtZXNzYWdlKSA/IG1lc3NhZ2UgOiBkZWZhdWx0TWVzc2FnZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNzZXJ0SW1wbCAodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgJ0Fzc2VydGlvbiBmYWlsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2VydEVpdGhlck1vZGlmaWVyIChwcmVkaWNhdGUsIGRlZmF1bHRNZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3I7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0UHJlZGljYXRlKHByZWRpY2F0ZSwgYXJndW1lbnRzLCBkZWZhdWx0TWVzc2FnZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9yOiBPYmplY3Qua2V5cyhwcmVkaWNhdGVzKS5yZWR1Y2UoZGVsYXllZEFzc2VydCwge30pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBkZWxheWVkQXNzZXJ0IChyZXN1bHQsIGtleSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgIXByZWRpY2F0ZXNba2V5XS5hcHBseShudWxsLCBhcmd1bWVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtb2RpZmllciBgbm90YC5cbiAgICAgKlxuICAgICAqIE5lZ2F0ZXMgYHByZWRpY2F0ZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbm90TW9kaWZpZXIgKHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5vdEltcGwocHJlZGljYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vdEltcGwgKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAhdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1vZGlmaWVyIGBtYXliZWAuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBwcmVkaWNhdGUgYXJndW1lbnQgaXMgIGBudWxsYCBvciBgdW5kZWZpbmVkYCxcbiAgICAgKiBvdGhlcndpc2UgcHJvcGFnYXRlcyB0aGUgcmV0dXJuIHZhbHVlIGZyb20gYHByZWRpY2F0ZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWF5YmVNb2RpZmllciAocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWFzc2lnbmVkKGFyZ3VtZW50c1swXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY2F0ZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1heWJlSW1wbCAodmFsdWUpIHtcbiAgICAgICAgaWYgKGFzc2lnbmVkKHZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtb2RpZmllciBgZWl0aGVyYC5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIGVpdGhlciBwcmVkaWNhdGUgaXMgdHJ1ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlaXRoZXJNb2RpZmllciAocHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2hvcnRjdXQgPSBwcmVkaWNhdGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvcjogT2JqZWN0LmtleXMocHJlZGljYXRlcykucmVkdWNlKG5vcE9yUHJlZGljYXRlLCB7fSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG5vcE9yUHJlZGljYXRlIChyZXN1bHQsIGtleSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gc2hvcnRjdXQgPyBub3AgOiBwcmVkaWNhdGVzW2tleV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBub3AgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVNb2RpZmllZFByZWRpY2F0ZXMgKG1vZGlmaWVyLCBvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU1vZGlmaWVkRnVuY3Rpb25zKG1vZGlmaWVyLCBwcmVkaWNhdGVzLCBvYmplY3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vZGlmaWVkRnVuY3Rpb25zIChtb2RpZmllciwgZnVuY3Rpb25zLCBvYmplY3QpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG9iamVjdCB8fCB7fTtcblxuICAgICAgICBPYmplY3Qua2V5cyhmdW5jdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbW9kaWZpZXIoZnVuY3Rpb25zW2tleV0sIG1lc3NhZ2VzW2tleV0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBvcnRGdW5jdGlvbnMgKGZ1bmN0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbnM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUgIT09IG51bGwgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb25zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFscy5jaGVjayA9IGZ1bmN0aW9ucztcbiAgICAgICAgfVxuICAgIH1cbn0odGhpcykpO1xuIiwiLyohXG4gKiBFdmVudEVtaXR0ZXIyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vaGlqMW54L0V2ZW50RW1pdHRlcjJcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMgaGlqMW54XG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbjshZnVuY3Rpb24odW5kZWZpbmVkKSB7XG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5ID8gQXJyYXkuaXNBcnJheSA6IGZ1bmN0aW9uIF9pc0FycmF5KG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9O1xuICB2YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgaWYgKHRoaXMuX2NvbmYpIHtcbiAgICAgIGNvbmZpZ3VyZS5jYWxsKHRoaXMsIHRoaXMuX2NvbmYpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25mKSB7XG4gICAgaWYgKGNvbmYpIHtcblxuICAgICAgdGhpcy5fY29uZiA9IGNvbmY7XG5cbiAgICAgIGNvbmYuZGVsaW1pdGVyICYmICh0aGlzLmRlbGltaXRlciA9IGNvbmYuZGVsaW1pdGVyKTtcbiAgICAgIGNvbmYubWF4TGlzdGVuZXJzICYmICh0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzID0gY29uZi5tYXhMaXN0ZW5lcnMpO1xuICAgICAgY29uZi53aWxkY2FyZCAmJiAodGhpcy53aWxkY2FyZCA9IGNvbmYud2lsZGNhcmQpO1xuICAgICAgY29uZi5uZXdMaXN0ZW5lciAmJiAodGhpcy5uZXdMaXN0ZW5lciA9IGNvbmYubmV3TGlzdGVuZXIpO1xuXG4gICAgICBpZiAodGhpcy53aWxkY2FyZCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyVHJlZSA9IHt9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcihjb25mKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgdGhpcy5uZXdMaXN0ZW5lciA9IGZhbHNlO1xuICAgIGNvbmZpZ3VyZS5jYWxsKHRoaXMsIGNvbmYpO1xuICB9XG5cbiAgLy9cbiAgLy8gQXR0ZW50aW9uLCBmdW5jdGlvbiByZXR1cm4gdHlwZSBub3cgaXMgYXJyYXksIGFsd2F5cyAhXG4gIC8vIEl0IGhhcyB6ZXJvIGVsZW1lbnRzIGlmIG5vIGFueSBtYXRjaGVzIGZvdW5kIGFuZCBvbmUgb3IgbW9yZVxuICAvLyBlbGVtZW50cyAobGVhZnMpIGlmIHRoZXJlIGFyZSBtYXRjaGVzXG4gIC8vXG4gIGZ1bmN0aW9uIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZSwgaSkge1xuICAgIGlmICghdHJlZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgbGlzdGVuZXJzPVtdLCBsZWFmLCBsZW4sIGJyYW5jaCwgeFRyZWUsIHh4VHJlZSwgaXNvbGF0ZWRCcmFuY2gsIGVuZFJlYWNoZWQsXG4gICAgICAgIHR5cGVMZW5ndGggPSB0eXBlLmxlbmd0aCwgY3VycmVudFR5cGUgPSB0eXBlW2ldLCBuZXh0VHlwZSA9IHR5cGVbaSsxXTtcbiAgICBpZiAoaSA9PT0gdHlwZUxlbmd0aCAmJiB0cmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgIC8vXG4gICAgICAvLyBJZiBhdCB0aGUgZW5kIG9mIHRoZSBldmVudChzKSBsaXN0IGFuZCB0aGUgdHJlZSBoYXMgbGlzdGVuZXJzXG4gICAgICAvLyBpbnZva2UgdGhvc2UgbGlzdGVuZXJzLlxuICAgICAgLy9cbiAgICAgIGlmICh0eXBlb2YgdHJlZS5fbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGhhbmRsZXJzICYmIGhhbmRsZXJzLnB1c2godHJlZS5fbGlzdGVuZXJzKTtcbiAgICAgICAgcmV0dXJuIFt0cmVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGVhZiA9IDAsIGxlbiA9IHRyZWUuX2xpc3RlbmVycy5sZW5ndGg7IGxlYWYgPCBsZW47IGxlYWYrKykge1xuICAgICAgICAgIGhhbmRsZXJzICYmIGhhbmRsZXJzLnB1c2godHJlZS5fbGlzdGVuZXJzW2xlYWZdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RyZWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgoY3VycmVudFR5cGUgPT09ICcqJyB8fCBjdXJyZW50VHlwZSA9PT0gJyoqJykgfHwgdHJlZVtjdXJyZW50VHlwZV0pIHtcbiAgICAgIC8vXG4gICAgICAvLyBJZiB0aGUgZXZlbnQgZW1pdHRlZCBpcyAnKicgYXQgdGhpcyBwYXJ0XG4gICAgICAvLyBvciB0aGVyZSBpcyBhIGNvbmNyZXRlIG1hdGNoIGF0IHRoaXMgcGF0Y2hcbiAgICAgIC8vXG4gICAgICBpZiAoY3VycmVudFR5cGUgPT09ICcqJykge1xuICAgICAgICBmb3IgKGJyYW5jaCBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKGJyYW5jaCAhPT0gJ19saXN0ZW5lcnMnICYmIHRyZWUuaGFzT3duUHJvcGVydHkoYnJhbmNoKSkge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgaSsxKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gICAgICB9IGVsc2UgaWYoY3VycmVudFR5cGUgPT09ICcqKicpIHtcbiAgICAgICAgZW5kUmVhY2hlZCA9IChpKzEgPT09IHR5cGVMZW5ndGggfHwgKGkrMiA9PT0gdHlwZUxlbmd0aCAmJiBuZXh0VHlwZSA9PT0gJyonKSk7XG4gICAgICAgIGlmKGVuZFJlYWNoZWQgJiYgdHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAgICAgLy8gVGhlIG5leHQgZWxlbWVudCBoYXMgYSBfbGlzdGVuZXJzLCBhZGQgaXQgdG8gdGhlIGhhbmRsZXJzLlxuICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlLCB0eXBlTGVuZ3RoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGJyYW5jaCBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKGJyYW5jaCAhPT0gJ19saXN0ZW5lcnMnICYmIHRyZWUuaGFzT3duUHJvcGVydHkoYnJhbmNoKSkge1xuICAgICAgICAgICAgaWYoYnJhbmNoID09PSAnKicgfHwgYnJhbmNoID09PSAnKionKSB7XG4gICAgICAgICAgICAgIGlmKHRyZWVbYnJhbmNoXS5fbGlzdGVuZXJzICYmICFlbmRSZWFjaGVkKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgdHlwZUxlbmd0aCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGkpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihicmFuY2ggPT09IG5leHRUeXBlKSB7XG4gICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGkrMikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gTm8gbWF0Y2ggb24gdGhpcyBvbmUsIHNoaWZ0IGludG8gdGhlIHRyZWUgYnV0IG5vdCBpbiB0aGUgdHlwZSBhcnJheS5cbiAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdGVuZXJzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVtjdXJyZW50VHlwZV0sIGkrMSkpO1xuICAgIH1cblxuICAgIHhUcmVlID0gdHJlZVsnKiddO1xuICAgIGlmICh4VHJlZSkge1xuICAgICAgLy9cbiAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciB0cmVlIHdpbGwgYWxsb3cgYW55IG1hdGNoIGZvciB0aGlzIHBhcnQsXG4gICAgICAvLyB0aGVuIHJlY3Vyc2l2ZWx5IGV4cGxvcmUgYWxsIGJyYW5jaGVzIG9mIHRoZSB0cmVlXG4gICAgICAvL1xuICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4VHJlZSwgaSsxKTtcbiAgICB9XG5cbiAgICB4eFRyZWUgPSB0cmVlWycqKiddO1xuICAgIGlmKHh4VHJlZSkge1xuICAgICAgaWYoaSA8IHR5cGVMZW5ndGgpIHtcbiAgICAgICAgaWYoeHhUcmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgbGlzdGVuZXIgb24gYSAnKionLCBpdCB3aWxsIGNhdGNoIGFsbCwgc28gYWRkIGl0cyBoYW5kbGVyLlxuICAgICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlLCB0eXBlTGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1aWxkIGFycmF5cyBvZiBtYXRjaGluZyBuZXh0IGJyYW5jaGVzIGFuZCBvdGhlcnMuXG4gICAgICAgIGZvcihicmFuY2ggaW4geHhUcmVlKSB7XG4gICAgICAgICAgaWYoYnJhbmNoICE9PSAnX2xpc3RlbmVycycgJiYgeHhUcmVlLmhhc093blByb3BlcnR5KGJyYW5jaCkpIHtcbiAgICAgICAgICAgIGlmKGJyYW5jaCA9PT0gbmV4dFR5cGUpIHtcbiAgICAgICAgICAgICAgLy8gV2Uga25vdyB0aGUgbmV4dCBlbGVtZW50IHdpbGwgbWF0Y2gsIHNvIGp1bXAgdHdpY2UuXG4gICAgICAgICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlW2JyYW5jaF0sIGkrMik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYnJhbmNoID09PSBjdXJyZW50VHlwZSkge1xuICAgICAgICAgICAgICAvLyBDdXJyZW50IG5vZGUgbWF0Y2hlcywgbW92ZSBpbnRvIHRoZSB0cmVlLlxuICAgICAgICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZVticmFuY2hdLCBpKzEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXNvbGF0ZWRCcmFuY2ggPSB7fTtcbiAgICAgICAgICAgICAgaXNvbGF0ZWRCcmFuY2hbYnJhbmNoXSA9IHh4VHJlZVticmFuY2hdO1xuICAgICAgICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHsgJyoqJzogaXNvbGF0ZWRCcmFuY2ggfSwgaSsxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZih4eFRyZWUuX2xpc3RlbmVycykge1xuICAgICAgICAvLyBXZSBoYXZlIHJlYWNoZWQgdGhlIGVuZCBhbmQgc3RpbGwgb24gYSAnKionXG4gICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlLCB0eXBlTGVuZ3RoKTtcbiAgICAgIH0gZWxzZSBpZih4eFRyZWVbJyonXSAmJiB4eFRyZWVbJyonXS5fbGlzdGVuZXJzKSB7XG4gICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlWycqJ10sIHR5cGVMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gIH1cblxuICBmdW5jdGlvbiBncm93TGlzdGVuZXJUcmVlKHR5cGUsIGxpc3RlbmVyKSB7XG5cbiAgICB0eXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG5cbiAgICAvL1xuICAgIC8vIExvb2tzIGZvciB0d28gY29uc2VjdXRpdmUgJyoqJywgaWYgc28sIGRvbid0IGFkZCB0aGUgZXZlbnQgYXQgYWxsLlxuICAgIC8vXG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gdHlwZS5sZW5ndGg7IGkrMSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZih0eXBlW2ldID09PSAnKionICYmIHR5cGVbaSsxXSA9PT0gJyoqJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRyZWUgPSB0aGlzLmxpc3RlbmVyVHJlZTtcbiAgICB2YXIgbmFtZSA9IHR5cGUuc2hpZnQoKTtcblxuICAgIHdoaWxlIChuYW1lKSB7XG5cbiAgICAgIGlmICghdHJlZVtuYW1lXSkge1xuICAgICAgICB0cmVlW25hbWVdID0ge307XG4gICAgICB9XG5cbiAgICAgIHRyZWUgPSB0cmVlW25hbWVdO1xuXG4gICAgICBpZiAodHlwZS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICBpZiAoIXRyZWUuX2xpc3RlbmVycykge1xuICAgICAgICAgIHRyZWUuX2xpc3RlbmVycyA9IGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHRyZWUuX2xpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRyZWUuX2xpc3RlbmVycyA9IFt0cmVlLl9saXN0ZW5lcnMsIGxpc3RlbmVyXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0FycmF5KHRyZWUuX2xpc3RlbmVycykpIHtcblxuICAgICAgICAgIHRyZWUuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgICAgIGlmICghdHJlZS5fbGlzdGVuZXJzLndhcm5lZCkge1xuXG4gICAgICAgICAgICB2YXIgbSA9IGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fZXZlbnRzLm1heExpc3RlbmVycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgbSA9IHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtID4gMCAmJiB0cmVlLl9saXN0ZW5lcnMubGVuZ3RoID4gbSkge1xuXG4gICAgICAgICAgICAgIHRyZWUuX2xpc3RlbmVycy53YXJuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIG5hbWUgPSB0eXBlLnNoaWZ0KCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhblxuICAvLyAxMCBsaXN0ZW5lcnMgYXJlIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2hcbiAgLy8gaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG4gIC8vXG4gIC8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuICAvLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmRlbGltaXRlciA9ICcuJztcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgICB0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgPSBuO1xuICAgIGlmICghdGhpcy5fY29uZikgdGhpcy5fY29uZiA9IHt9O1xuICAgIHRoaXMuX2NvbmYubWF4TGlzdGVuZXJzID0gbjtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50ID0gJyc7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgdGhpcy5tYW55KGV2ZW50LCAxLCBmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5tYW55ID0gZnVuY3Rpb24oZXZlbnQsIHR0bCwgZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hbnkgb25seSBhY2NlcHRzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgaWYgKC0tdHRsID09PSAwKSB7XG4gICAgICAgIHNlbGYub2ZmKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGxpc3RlbmVyLl9vcmlnaW4gPSBmbjtcblxuICAgIHRoaXMub24oZXZlbnQsIGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcblxuICAgIHZhciB0eXBlID0gYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKHR5cGUgPT09ICduZXdMaXN0ZW5lcicgJiYgIXRoaXMubmV3TGlzdGVuZXIpIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgKl9hbGwqIGZ1bmN0aW9ucyBhbmQgaW52b2tlIHRoZW0uXG4gICAgaWYgKHRoaXMuX2FsbCkge1xuICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsOyBpKyspIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yIChpID0gMCwgbCA9IHRoaXMuX2FsbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5ldmVudCA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2FsbFtpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gICAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcblxuICAgICAgaWYgKCF0aGlzLl9hbGwgJiZcbiAgICAgICAgIXRoaXMuX2V2ZW50cy5lcnJvciAmJlxuICAgICAgICAhKHRoaXMud2lsZGNhcmQgJiYgdGhpcy5saXN0ZW5lclRyZWUuZXJyb3IpKSB7XG5cbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgYXJndW1lbnRzWzFdOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuY2F1Z2h0LCB1bnNwZWNpZmllZCAnZXJyb3InIGV2ZW50LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXI7XG5cbiAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICBoYW5kbGVyID0gW107XG4gICAgICB2YXIgbnMgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlLnNwbGl0KHRoaXMuZGVsaW1pdGVyKSA6IHR5cGUuc2xpY2UoKTtcbiAgICAgIHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIGhhbmRsZXIsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuZXZlbnQgPSB0eXBlO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vIHNsb3dlclxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGw7IGkrKykgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaGFuZGxlcikge1xuICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsOyBpKyspIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICB2YXIgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSB0eXBlO1xuICAgICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGxpc3RlbmVycy5sZW5ndGggPiAwKSB8fCAhIXRoaXMuX2FsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gISF0aGlzLl9hbGw7XG4gICAgfVxuXG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG5cbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub25BbnkodHlwZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29uIG9ubHkgYWNjZXB0cyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcblxuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT0gXCJuZXdMaXN0ZW5lcnNcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lcnNcIi5cbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgZ3Jvd0xpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIHR5cGUsIGxpc3RlbmVyKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSB7XG4gICAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgIH1cbiAgICBlbHNlIGlmKHR5cGVvZiB0aGlzLl9ldmVudHNbdHlwZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0FycmF5KHRoaXMuX2V2ZW50c1t0eXBlXSkpIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuXG4gICAgICAgIHZhciBtID0gZGVmYXVsdE1heExpc3RlbmVycztcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbSA9IHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcblxuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uQW55ID0gZnVuY3Rpb24oZm4pIHtcblxuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25Bbnkgb25seSBhY2NlcHRzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmKCF0aGlzLl9hbGwpIHtcbiAgICAgIHRoaXMuX2FsbCA9IFtdO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgZnVuY3Rpb24gdG8gdGhlIGV2ZW50IGxpc3RlbmVyIGNvbGxlY3Rpb24uXG4gICAgdGhpcy5fYWxsLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUxpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXJzLGxlYWZzPVtdO1xuXG4gICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgdmFyIG5zID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG4gICAgICBsZWFmcyA9IHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIG51bGwsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gZG9lcyBub3QgdXNlIGxpc3RlbmVycygpLCBzbyBubyBzaWRlIGVmZmVjdCBvZiBjcmVhdGluZyBfZXZlbnRzW3R5cGVdXG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkgcmV0dXJuIHRoaXM7XG4gICAgICBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICAgIGxlYWZzLnB1c2goe19saXN0ZW5lcnM6aGFuZGxlcnN9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpTGVhZj0wOyBpTGVhZjxsZWFmcy5sZW5ndGg7IGlMZWFmKyspIHtcbiAgICAgIHZhciBsZWFmID0gbGVhZnNbaUxlYWZdO1xuICAgICAgaGFuZGxlcnMgPSBsZWFmLl9saXN0ZW5lcnM7XG4gICAgICBpZiAoaXNBcnJheShoYW5kbGVycykpIHtcblxuICAgICAgICB2YXIgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaGFuZGxlcnNbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgICAoaGFuZGxlcnNbaV0ubGlzdGVuZXIgJiYgaGFuZGxlcnNbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB8fFxuICAgICAgICAgICAgKGhhbmRsZXJzW2ldLl9vcmlnaW4gJiYgaGFuZGxlcnNbaV0uX29yaWdpbiA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICAgICAgbGVhZi5fbGlzdGVuZXJzLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgICAgICAgZGVsZXRlIGxlYWYuX2xpc3RlbmVycztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGhhbmRsZXJzID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAoaGFuZGxlcnMubGlzdGVuZXIgJiYgaGFuZGxlcnMubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB8fFxuICAgICAgICAoaGFuZGxlcnMuX29yaWdpbiAmJiBoYW5kbGVycy5fb3JpZ2luID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgICAgIGRlbGV0ZSBsZWFmLl9saXN0ZW5lcnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmQW55ID0gZnVuY3Rpb24oZm4pIHtcbiAgICB2YXIgaSA9IDAsIGwgPSAwLCBmbnM7XG4gICAgaWYgKGZuICYmIHRoaXMuX2FsbCAmJiB0aGlzLl9hbGwubGVuZ3RoID4gMCkge1xuICAgICAgZm5zID0gdGhpcy5fYWxsO1xuICAgICAgZm9yKGkgPSAwLCBsID0gZm5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZihmbiA9PT0gZm5zW2ldKSB7XG4gICAgICAgICAgZm5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hbGwgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAhdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgdmFyIGxlYWZzID0gc2VhcmNoTGlzdGVuZXJUcmVlLmNhbGwodGhpcywgbnVsbCwgbnMsIHRoaXMubGlzdGVuZXJUcmVlLCAwKTtcblxuICAgICAgZm9yICh2YXIgaUxlYWY9MDsgaUxlYWY8bGVhZnMubGVuZ3RoOyBpTGVhZisrKSB7XG4gICAgICAgIHZhciBsZWFmID0gbGVhZnNbaUxlYWZdO1xuICAgICAgICBsZWFmLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSByZXR1cm4gdGhpcztcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIHZhciBoYW5kbGVycyA9IFtdO1xuICAgICAgdmFyIG5zID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG4gICAgICBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBoYW5kbGVycywgbnMsIHRoaXMubGlzdGVuZXJUcmVlLCAwKTtcbiAgICAgIHJldHVybiBoYW5kbGVycztcbiAgICB9XG5cbiAgICB0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuXG4gICAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdO1xuICAgIGlmICghaXNBcnJheSh0aGlzLl9ldmVudHNbdHlwZV0pKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyc0FueSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYodGhpcy5fYWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgfTtcblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsLlxuICAgIHdpbmRvdy5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuICB9XG59KCk7XG4iLCIvKlxuXG4gIEphdmFzY3JpcHQgU3RhdGUgTWFjaGluZSBMaWJyYXJ5IC0gaHR0cHM6Ly9naXRodWIuY29tL2pha2VzZ29yZG9uL2phdmFzY3JpcHQtc3RhdGUtbWFjaGluZVxuXG4gIENvcHlyaWdodCAoYykgMjAxMiwgMjAxMywgMjAxNCwgMjAxNSwgSmFrZSBHb3Jkb24gYW5kIGNvbnRyaWJ1dG9yc1xuICBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgLSBodHRwczovL2dpdGh1Yi5jb20vamFrZXNnb3Jkb24vamF2YXNjcmlwdC1zdGF0ZS1tYWNoaW5lL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcblxuKi9cblxuKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgU3RhdGVNYWNoaW5lID0ge1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIFZFUlNJT046IFwiMi4zLjVcIixcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBSZXN1bHQ6IHtcbiAgICAgIFNVQ0NFRURFRDogICAgMSwgLy8gdGhlIGV2ZW50IHRyYW5zaXRpb25lZCBzdWNjZXNzZnVsbHkgZnJvbSBvbmUgc3RhdGUgdG8gYW5vdGhlclxuICAgICAgTk9UUkFOU0lUSU9OOiAyLCAvLyB0aGUgZXZlbnQgd2FzIHN1Y2Nlc3NmdWxsIGJ1dCBubyBzdGF0ZSB0cmFuc2l0aW9uIHdhcyBuZWNlc3NhcnlcbiAgICAgIENBTkNFTExFRDogICAgMywgLy8gdGhlIGV2ZW50IHdhcyBjYW5jZWxsZWQgYnkgdGhlIGNhbGxlciBpbiBhIGJlZm9yZUV2ZW50IGNhbGxiYWNrXG4gICAgICBQRU5ESU5HOiAgICAgIDQgIC8vIHRoZSBldmVudCBpcyBhc3luY2hyb25vdXMgYW5kIHRoZSBjYWxsZXIgaXMgaW4gY29udHJvbCBvZiB3aGVuIHRoZSB0cmFuc2l0aW9uIG9jY3Vyc1xuICAgIH0sXG5cbiAgICBFcnJvcjoge1xuICAgICAgSU5WQUxJRF9UUkFOU0lUSU9OOiAxMDAsIC8vIGNhbGxlciB0cmllZCB0byBmaXJlIGFuIGV2ZW50IHRoYXQgd2FzIGlubmFwcm9wcmlhdGUgaW4gdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgIFBFTkRJTkdfVFJBTlNJVElPTjogMjAwLCAvLyBjYWxsZXIgdHJpZWQgdG8gZmlyZSBhbiBldmVudCB3aGlsZSBhbiBhc3luYyB0cmFuc2l0aW9uIHdhcyBzdGlsbCBwZW5kaW5nXG4gICAgICBJTlZBTElEX0NBTExCQUNLOiAgIDMwMCAvLyBjYWxsZXIgcHJvdmlkZWQgY2FsbGJhY2sgZnVuY3Rpb24gdGhyZXcgYW4gZXhjZXB0aW9uXG4gICAgfSxcblxuICAgIFdJTERDQVJEOiAnKicsXG4gICAgQVNZTkM6ICdhc3luYycsXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgY3JlYXRlOiBmdW5jdGlvbihjZmcsIHRhcmdldCkge1xuXG4gICAgICB2YXIgaW5pdGlhbCAgICAgID0gKHR5cGVvZiBjZmcuaW5pdGlhbCA9PSAnc3RyaW5nJykgPyB7IHN0YXRlOiBjZmcuaW5pdGlhbCB9IDogY2ZnLmluaXRpYWw7IC8vIGFsbG93IGZvciBhIHNpbXBsZSBzdHJpbmcsIG9yIGFuIG9iamVjdCB3aXRoIHsgc3RhdGU6ICdmb28nLCBldmVudDogJ3NldHVwJywgZGVmZXI6IHRydWV8ZmFsc2UgfVxuICAgICAgdmFyIHRlcm1pbmFsICAgICA9IGNmZy50ZXJtaW5hbCB8fCBjZmdbJ2ZpbmFsJ107XG4gICAgICB2YXIgZnNtICAgICAgICAgID0gdGFyZ2V0IHx8IGNmZy50YXJnZXQgIHx8IHt9O1xuICAgICAgdmFyIGV2ZW50cyAgICAgICA9IGNmZy5ldmVudHMgfHwgW107XG4gICAgICB2YXIgY2FsbGJhY2tzICAgID0gY2ZnLmNhbGxiYWNrcyB8fCB7fTtcbiAgICAgIHZhciBtYXAgICAgICAgICAgPSB7fTsgLy8gdHJhY2sgc3RhdGUgdHJhbnNpdGlvbnMgYWxsb3dlZCBmb3IgYW4gZXZlbnQgeyBldmVudDogeyBmcm9tOiBbIHRvIF0gfSB9XG4gICAgICB2YXIgdHJhbnNpdGlvbnMgID0ge307IC8vIHRyYWNrIGV2ZW50cyBhbGxvd2VkIGZyb20gYSBzdGF0ZSAgICAgICAgICAgIHsgc3RhdGU6IFsgZXZlbnQgXSB9XG5cbiAgICAgIHZhciBhZGQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBmcm9tID0gKGUuZnJvbSBpbnN0YW5jZW9mIEFycmF5KSA/IGUuZnJvbSA6IChlLmZyb20gPyBbZS5mcm9tXSA6IFtTdGF0ZU1hY2hpbmUuV0lMRENBUkRdKTsgLy8gYWxsb3cgJ3dpbGRjYXJkJyB0cmFuc2l0aW9uIGlmICdmcm9tJyBpcyBub3Qgc3BlY2lmaWVkXG4gICAgICAgIG1hcFtlLm5hbWVdID0gbWFwW2UubmFtZV0gfHwge307XG4gICAgICAgIGZvciAodmFyIG4gPSAwIDsgbiA8IGZyb20ubGVuZ3RoIDsgbisrKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbnNbZnJvbVtuXV0gPSB0cmFuc2l0aW9uc1tmcm9tW25dXSB8fCBbXTtcbiAgICAgICAgICB0cmFuc2l0aW9uc1tmcm9tW25dXS5wdXNoKGUubmFtZSk7XG5cbiAgICAgICAgICBtYXBbZS5uYW1lXVtmcm9tW25dXSA9IGUudG8gfHwgZnJvbVtuXTsgLy8gYWxsb3cgbm8tb3AgdHJhbnNpdGlvbiBpZiAndG8nIGlzIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKGluaXRpYWwpIHtcbiAgICAgICAgaW5pdGlhbC5ldmVudCA9IGluaXRpYWwuZXZlbnQgfHwgJ3N0YXJ0dXAnO1xuICAgICAgICBhZGQoeyBuYW1lOiBpbml0aWFsLmV2ZW50LCBmcm9tOiAnbm9uZScsIHRvOiBpbml0aWFsLnN0YXRlIH0pO1xuICAgICAgfVxuXG4gICAgICBmb3IodmFyIG4gPSAwIDsgbiA8IGV2ZW50cy5sZW5ndGggOyBuKyspXG4gICAgICAgIGFkZChldmVudHNbbl0pO1xuXG4gICAgICBmb3IodmFyIG5hbWUgaW4gbWFwKSB7XG4gICAgICAgIGlmIChtYXAuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgZnNtW25hbWVdID0gU3RhdGVNYWNoaW5lLmJ1aWxkRXZlbnQobmFtZSwgbWFwW25hbWVdKTtcbiAgICAgIH1cblxuICAgICAgZm9yKHZhciBuYW1lIGluIGNhbGxiYWNrcykge1xuICAgICAgICBpZiAoY2FsbGJhY2tzLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgIGZzbVtuYW1lXSA9IGNhbGxiYWNrc1tuYW1lXVxuICAgICAgfVxuXG4gICAgICBmc20uY3VycmVudCAgICAgPSAnbm9uZSc7XG4gICAgICBmc20uaXMgICAgICAgICAgPSBmdW5jdGlvbihzdGF0ZSkgeyByZXR1cm4gKHN0YXRlIGluc3RhbmNlb2YgQXJyYXkpID8gKHN0YXRlLmluZGV4T2YodGhpcy5jdXJyZW50KSA+PSAwKSA6ICh0aGlzLmN1cnJlbnQgPT09IHN0YXRlKTsgfTtcbiAgICAgIGZzbS5jYW4gICAgICAgICA9IGZ1bmN0aW9uKGV2ZW50KSB7IHJldHVybiAhdGhpcy50cmFuc2l0aW9uICYmIChtYXBbZXZlbnRdLmhhc093blByb3BlcnR5KHRoaXMuY3VycmVudCkgfHwgbWFwW2V2ZW50XS5oYXNPd25Qcm9wZXJ0eShTdGF0ZU1hY2hpbmUuV0lMRENBUkQpKTsgfVxuICAgICAgZnNtLmNhbm5vdCAgICAgID0gZnVuY3Rpb24oZXZlbnQpIHsgcmV0dXJuICF0aGlzLmNhbihldmVudCk7IH07XG4gICAgICBmc20udHJhbnNpdGlvbnMgPSBmdW5jdGlvbigpICAgICAgeyByZXR1cm4gdHJhbnNpdGlvbnNbdGhpcy5jdXJyZW50XTsgfTtcbiAgICAgIGZzbS5pc0ZpbmlzaGVkICA9IGZ1bmN0aW9uKCkgICAgICB7IHJldHVybiB0aGlzLmlzKHRlcm1pbmFsKTsgfTtcbiAgICAgIGZzbS5lcnJvciAgICAgICA9IGNmZy5lcnJvciB8fCBmdW5jdGlvbihuYW1lLCBmcm9tLCB0bywgYXJncywgZXJyb3IsIG1zZywgZSkgeyB0aHJvdyBlIHx8IG1zZzsgfTsgLy8gZGVmYXVsdCBiZWhhdmlvciB3aGVuIHNvbWV0aGluZyB1bmV4cGVjdGVkIGhhcHBlbnMgaXMgdG8gdGhyb3cgYW4gZXhjZXB0aW9uLCBidXQgY2FsbGVyIGNhbiBvdmVycmlkZSB0aGlzIGJlaGF2aW9yIGlmIGRlc2lyZWQgKHNlZSBnaXRodWIgaXNzdWUgIzMgYW5kICMxNylcblxuICAgICAgaWYgKGluaXRpYWwgJiYgIWluaXRpYWwuZGVmZXIpXG4gICAgICAgIGZzbVtpbml0aWFsLmV2ZW50XSgpO1xuXG4gICAgICByZXR1cm4gZnNtO1xuXG4gICAgfSxcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICBkb0NhbGxiYWNrOiBmdW5jdGlvbihmc20sIGZ1bmMsIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7XG4gICAgICBpZiAoZnVuYykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KGZzbSwgW25hbWUsIGZyb20sIHRvXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICByZXR1cm4gZnNtLmVycm9yKG5hbWUsIGZyb20sIHRvLCBhcmdzLCBTdGF0ZU1hY2hpbmUuRXJyb3IuSU5WQUxJRF9DQUxMQkFDSywgXCJhbiBleGNlcHRpb24gb2NjdXJyZWQgaW4gYSBjYWxsZXItcHJvdmlkZWQgY2FsbGJhY2sgZnVuY3Rpb25cIiwgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYmVmb3JlQW55RXZlbnQ6ICBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7IHJldHVybiBTdGF0ZU1hY2hpbmUuZG9DYWxsYmFjayhmc20sIGZzbVsnb25iZWZvcmVldmVudCddLCAgICAgICAgICAgICAgICAgICAgICAgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpOyB9LFxuICAgIGFmdGVyQW55RXZlbnQ6ICAgZnVuY3Rpb24oZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykgeyByZXR1cm4gU3RhdGVNYWNoaW5lLmRvQ2FsbGJhY2soZnNtLCBmc21bJ29uYWZ0ZXJldmVudCddIHx8IGZzbVsnb25ldmVudCddLCAgICAgIG5hbWUsIGZyb20sIHRvLCBhcmdzKTsgfSxcbiAgICBsZWF2ZUFueVN0YXRlOiAgIGZ1bmN0aW9uKGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpIHsgcmV0dXJuIFN0YXRlTWFjaGluZS5kb0NhbGxiYWNrKGZzbSwgZnNtWydvbmxlYXZlc3RhdGUnXSwgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLCBmcm9tLCB0bywgYXJncyk7IH0sXG4gICAgZW50ZXJBbnlTdGF0ZTogICBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7IHJldHVybiBTdGF0ZU1hY2hpbmUuZG9DYWxsYmFjayhmc20sIGZzbVsnb25lbnRlcnN0YXRlJ10gfHwgZnNtWydvbnN0YXRlJ10sICAgICAgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpOyB9LFxuICAgIGNoYW5nZVN0YXRlOiAgICAgZnVuY3Rpb24oZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykgeyByZXR1cm4gU3RhdGVNYWNoaW5lLmRvQ2FsbGJhY2soZnNtLCBmc21bJ29uY2hhbmdlc3RhdGUnXSwgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsIGZyb20sIHRvLCBhcmdzKTsgfSxcblxuICAgIGJlZm9yZVRoaXNFdmVudDogZnVuY3Rpb24oZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykgeyByZXR1cm4gU3RhdGVNYWNoaW5lLmRvQ2FsbGJhY2soZnNtLCBmc21bJ29uYmVmb3JlJyArIG5hbWVdLCAgICAgICAgICAgICAgICAgICAgIG5hbWUsIGZyb20sIHRvLCBhcmdzKTsgfSxcbiAgICBhZnRlclRoaXNFdmVudDogIGZ1bmN0aW9uKGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpIHsgcmV0dXJuIFN0YXRlTWFjaGluZS5kb0NhbGxiYWNrKGZzbSwgZnNtWydvbmFmdGVyJyAgKyBuYW1lXSB8fCBmc21bJ29uJyArIG5hbWVdLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7IH0sXG4gICAgbGVhdmVUaGlzU3RhdGU6ICBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7IHJldHVybiBTdGF0ZU1hY2hpbmUuZG9DYWxsYmFjayhmc20sIGZzbVsnb25sZWF2ZScgICsgZnJvbV0sICAgICAgICAgICAgICAgICAgICAgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpOyB9LFxuICAgIGVudGVyVGhpc1N0YXRlOiAgZnVuY3Rpb24oZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykgeyByZXR1cm4gU3RhdGVNYWNoaW5lLmRvQ2FsbGJhY2soZnNtLCBmc21bJ29uZW50ZXInICArIHRvXSAgIHx8IGZzbVsnb24nICsgdG9dLCAgIG5hbWUsIGZyb20sIHRvLCBhcmdzKTsgfSxcblxuICAgIGJlZm9yZUV2ZW50OiBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7XG4gICAgICBpZiAoKGZhbHNlID09PSBTdGF0ZU1hY2hpbmUuYmVmb3JlVGhpc0V2ZW50KGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpKSB8fFxuICAgICAgICAgIChmYWxzZSA9PT0gU3RhdGVNYWNoaW5lLmJlZm9yZUFueUV2ZW50KCBmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgYWZ0ZXJFdmVudDogZnVuY3Rpb24oZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncykge1xuICAgICAgU3RhdGVNYWNoaW5lLmFmdGVyVGhpc0V2ZW50KGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpO1xuICAgICAgU3RhdGVNYWNoaW5lLmFmdGVyQW55RXZlbnQoIGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpO1xuICAgIH0sXG5cbiAgICBsZWF2ZVN0YXRlOiBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7XG4gICAgICB2YXIgc3BlY2lmaWMgPSBTdGF0ZU1hY2hpbmUubGVhdmVUaGlzU3RhdGUoZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyksXG4gICAgICAgICAgZ2VuZXJhbCAgPSBTdGF0ZU1hY2hpbmUubGVhdmVBbnlTdGF0ZSggZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XG4gICAgICBpZiAoKGZhbHNlID09PSBzcGVjaWZpYykgfHwgKGZhbHNlID09PSBnZW5lcmFsKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgZWxzZSBpZiAoKFN0YXRlTWFjaGluZS5BU1lOQyA9PT0gc3BlY2lmaWMpIHx8IChTdGF0ZU1hY2hpbmUuQVNZTkMgPT09IGdlbmVyYWwpKVxuICAgICAgICByZXR1cm4gU3RhdGVNYWNoaW5lLkFTWU5DO1xuICAgIH0sXG5cbiAgICBlbnRlclN0YXRlOiBmdW5jdGlvbihmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKSB7XG4gICAgICBTdGF0ZU1hY2hpbmUuZW50ZXJUaGlzU3RhdGUoZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XG4gICAgICBTdGF0ZU1hY2hpbmUuZW50ZXJBbnlTdGF0ZSggZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XG4gICAgfSxcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICBidWlsZEV2ZW50OiBmdW5jdGlvbihuYW1lLCBtYXApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgZnJvbSAgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgIHZhciB0byAgICA9IG1hcFtmcm9tXSB8fCBtYXBbU3RhdGVNYWNoaW5lLldJTERDQVJEXSB8fCBmcm9tO1xuICAgICAgICB2YXIgYXJncyAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpOyAvLyB0dXJuIGFyZ3VtZW50cyBpbnRvIHB1cmUgYXJyYXlcblxuICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uKVxuICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yKG5hbWUsIGZyb20sIHRvLCBhcmdzLCBTdGF0ZU1hY2hpbmUuRXJyb3IuUEVORElOR19UUkFOU0lUSU9OLCBcImV2ZW50IFwiICsgbmFtZSArIFwiIGluYXBwcm9wcmlhdGUgYmVjYXVzZSBwcmV2aW91cyB0cmFuc2l0aW9uIGRpZCBub3QgY29tcGxldGVcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuY2Fubm90KG5hbWUpKVxuICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yKG5hbWUsIGZyb20sIHRvLCBhcmdzLCBTdGF0ZU1hY2hpbmUuRXJyb3IuSU5WQUxJRF9UUkFOU0lUSU9OLCBcImV2ZW50IFwiICsgbmFtZSArIFwiIGluYXBwcm9wcmlhdGUgaW4gY3VycmVudCBzdGF0ZSBcIiArIHRoaXMuY3VycmVudCk7XG5cbiAgICAgICAgaWYgKGZhbHNlID09PSBTdGF0ZU1hY2hpbmUuYmVmb3JlRXZlbnQodGhpcywgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpKVxuICAgICAgICAgIHJldHVybiBTdGF0ZU1hY2hpbmUuUmVzdWx0LkNBTkNFTExFRDtcblxuICAgICAgICBpZiAoZnJvbSA9PT0gdG8pIHtcbiAgICAgICAgICBTdGF0ZU1hY2hpbmUuYWZ0ZXJFdmVudCh0aGlzLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XG4gICAgICAgICAgcmV0dXJuIFN0YXRlTWFjaGluZS5SZXN1bHQuTk9UUkFOU0lUSU9OO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJlcGFyZSBhIHRyYW5zaXRpb24gbWV0aG9kIGZvciB1c2UgRUlUSEVSIGxvd2VyIGRvd24sIG9yIGJ5IGNhbGxlciBpZiB0aGV5IHdhbnQgYW4gYXN5bmMgdHJhbnNpdGlvbiAoaW5kaWNhdGVkIGJ5IGFuIEFTWU5DIHJldHVybiB2YWx1ZSBmcm9tIGxlYXZlU3RhdGUpXG4gICAgICAgIHZhciBmc20gPSB0aGlzO1xuICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBmc20udHJhbnNpdGlvbiA9IG51bGw7IC8vIHRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGV2ZXIgYmUgY2FsbGVkIG9uY2VcbiAgICAgICAgICBmc20uY3VycmVudCA9IHRvO1xuICAgICAgICAgIFN0YXRlTWFjaGluZS5lbnRlclN0YXRlKCBmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKTtcbiAgICAgICAgICBTdGF0ZU1hY2hpbmUuY2hhbmdlU3RhdGUoZnNtLCBuYW1lLCBmcm9tLCB0bywgYXJncyk7XG4gICAgICAgICAgU3RhdGVNYWNoaW5lLmFmdGVyRXZlbnQoIGZzbSwgbmFtZSwgZnJvbSwgdG8sIGFyZ3MpO1xuICAgICAgICAgIHJldHVybiBTdGF0ZU1hY2hpbmUuUmVzdWx0LlNVQ0NFRURFRDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uLmNhbmNlbCA9IGZ1bmN0aW9uKCkgeyAvLyBwcm92aWRlIGEgd2F5IGZvciBjYWxsZXIgdG8gY2FuY2VsIGFzeW5jIHRyYW5zaXRpb24gaWYgZGVzaXJlZCAoaXNzdWUgIzIyKVxuICAgICAgICAgIGZzbS50cmFuc2l0aW9uID0gbnVsbDtcbiAgICAgICAgICBTdGF0ZU1hY2hpbmUuYWZ0ZXJFdmVudChmc20sIG5hbWUsIGZyb20sIHRvLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZWF2ZSA9IFN0YXRlTWFjaGluZS5sZWF2ZVN0YXRlKHRoaXMsIG5hbWUsIGZyb20sIHRvLCBhcmdzKTtcbiAgICAgICAgaWYgKGZhbHNlID09PSBsZWF2ZSkge1xuICAgICAgICAgIHRoaXMudHJhbnNpdGlvbiA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIFN0YXRlTWFjaGluZS5SZXN1bHQuQ0FOQ0VMTEVEO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFN0YXRlTWFjaGluZS5BU1lOQyA9PT0gbGVhdmUpIHtcbiAgICAgICAgICByZXR1cm4gU3RhdGVNYWNoaW5lLlJlc3VsdC5QRU5ESU5HO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24pIC8vIG5lZWQgdG8gY2hlY2sgaW4gY2FzZSB1c2VyIG1hbnVhbGx5IGNhbGxlZCB0cmFuc2l0aW9uKCkgYnV0IGZvcmdvdCB0byByZXR1cm4gU3RhdGVNYWNoaW5lLkFTWU5DXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgfTtcbiAgICB9XG5cbiAgfTsgLy8gU3RhdGVNYWNoaW5lXG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAvLz09PT09PVxuICAvLyBOT0RFXG4gIC8vPT09PT09XG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFN0YXRlTWFjaGluZTtcbiAgICB9XG4gICAgZXhwb3J0cy5TdGF0ZU1hY2hpbmUgPSBTdGF0ZU1hY2hpbmU7XG4gIH1cbiAgLy89PT09PT09PT09PT1cbiAgLy8gQU1EL1JFUVVJUkVcbiAgLy89PT09PT09PT09PT1cbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUpIHsgcmV0dXJuIFN0YXRlTWFjaGluZTsgfSk7XG4gIH1cbiAgLy89PT09PT09PVxuICAvLyBCUk9XU0VSXG4gIC8vPT09PT09PT1cbiAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuU3RhdGVNYWNoaW5lID0gU3RhdGVNYWNoaW5lO1xuICB9XG4gIC8vPT09PT09PT09PT1cbiAgLy8gV0VCIFdPUktFUlxuICAvLz09PT09PT09PT09XG4gIGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgIHNlbGYuU3RhdGVNYWNoaW5lID0gU3RhdGVNYWNoaW5lO1xuICB9XG5cbn0oKSk7XG4iXX0=
