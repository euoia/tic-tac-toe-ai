var check = require('check-types'),
	EventEmitter2 = require('eventemitter2').EventEmitter2;

export default class BoardDrawer {
	constructor(options) {
		check.assert.instance(options.parent, HTMLElement);

		this.parent = options.parent;

		this.emitter = new EventEmitter2();
		this.tileHeight = 100;
		this.tileWidth = 100;

		this.board = document.createElement('div');
		this.board.style.width = (this.tileWidth  * 3) + 'px';
		this.board.style.height = (this.tileHeight  * 3) + 'px';
		this.board.style.backgroundColor = '#ffcccc';
		this.board.style.position = 'absolute';

		this.tiles = [];

		for (let tileRow = 0; tileRow < 3; tileRow += 1) {
			this.tiles[tileRow] = [];

			for (let tileCol = 0; tileCol < 3; tileCol += 1) {
				let tile = document.createElement('div');
				tile.style.width = `${this.tileWidth}px`;
				tile.style.height = `${this.tileHeight}px`;
				tile.style.left = `${this.tileWidth * tileCol}px`;
				tile.style.top = `${this.tileHeight * tileRow}px`;
				tile.style.backgroundColor = '#ffaaaa';
				tile.style.position = 'absolute';
				tile.style.textAlign = 'center';
				tile.style.lineHeight = `${this.tileHeight}px`;
				tile.style.fontSize  = `${this.tileHeight}px`;

				// Send click events for the tile.
				tile.onclick = () => {
					this.emitter.emit(
						'board::click-tile',
						{
							row: tileRow,
							col: tileCol
						});
				};

				this.board.appendChild(tile);
				this.tiles[tileRow][tileCol] = tile;
			}
		}

		this.parent.appendChild(this.board);
	}

	updateTileSymbol(row, col, symbol) {
		this.tiles[row][col].innerHTML = symbol;
	}

	listenToStateEvents(stateEmitter) {
		stateEmitter.on('action', (action) => {
			this.updateTileSymbol(
				action.row,
				action.col,
				action.symbol
			);
		});
	}
}
