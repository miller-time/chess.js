function Pawn(color, square) {
    this.color = color;
    this.square = square;
    this.possibleSquares = function() {
	var squares = [];
	var yPlusOne = (this.color) == "white" ? -1 : 1;
	squares.push(getRelativeSquare(this.square, 0, yPlusOne));
	squares.push(getRelativeSquare(this.square, 0, yPlusOne*2));
	return squares;
    };
}

function Rook(color, square) {
    this.color = color;
    this.square = square;
    this.possibleSquares = function() {
	var squares = [];
	// positive X
	for (var i = this.square.x; i < 8; i++) {
	    squares.push(getRelativeSquare(this.square, i, this.y));
	}
	// negative X
	for (var i = this.square.x; i >= 0; i--) {
	    squares.push(getRelativeSquare(this.square, i, this.y));
	}
	// positive Y
	for (var i = this.square.y; i < 8; i++) {
	    squares.push(getRelativeSquare(this.square, this.x, i));
	}
	// negative Y
	for (var i = this.square.y; i >= 0; i++) {
	    squares.push(getRelativeSquare(this.square, this.x, i));
	}
	return squares;
    };
}
