(function() {

    var Piece = function(color, square) {
        this.color = color;
        this.square = square;
        this.setupElement();
    };

    Piece.prototype.setupElement = function() {
        this.element = null;
    };

    Piece.prototype.possibleSquares = function() {
        return [];
    };

    Piece.prototype.moveTo = function(square) {
        this.square = square;
        square.piece = this;
        this.element.css({
            top: square.x * 50 + "px",
            left: square.y * 50 + "px"
        });
    };

    ChessJS.Pawn = function(color, square) {
        Piece.call(this, color, square);
    };

    ChessJS.Pawn.prototype = Object.create(Piece.prototype);
    ChessJS.Pawn.prototype.constructor = ChessJS.Pawn;

    ChessJS.Pawn.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('pawn piece');
    };

    ChessJS.Pawn.prototype.possibleSquares = function() {
        var squares = [];
        var yPlusOne = (this.color) == "white" ? -1 : 1;
        squares.push(ChessJS.getRelativeSquare(this.square, 0, yPlusOne));
        squares.push(ChessJS.getRelativeSquare(this.square, 0, yPlusOne*2));
        return squares;
    };

    ChessJS.Rook = function(color, square) {
        Piece.call(this, color, square);
    };

    ChessJS.Rook.prototype = Object.create(Piece.prototype);
    ChessJS.Rook.prototype.constructor = ChessJS.Rook;

    ChessJS.Rook.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('rook piece');
    };

    ChessJS.Rook.prototype.possibleSquares = function() {
        var squares = [];
        // positive X
        for (var i = this.square.x; i < 8; i++) {
            squares.push(ChessJS.getRelativeSquare(this.square, i, this.square.y));
        }
        // negative X
        for (var i = this.square.x; i >= 0; i--) {
            squares.push(ChessJS.getRelativeSquare(this.square, i, this.square.y));
        }
        // positive Y
        for (var i = this.square.y; i < 8; i++) {
            squares.push(ChessJS.getRelativeSquare(this.square, this.square.x, i));
        }
        // negative Y
        for (var i = this.square.y; i >= 0; i--) {
            squares.push(ChessJS.getRelativeSquare(this.square, this.square.x, i));
        }
        return squares;
    };

})();
