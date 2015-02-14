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
            top: square.y * 50 + "px",
            left: square.x * 50 + "px"
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
            .addClass('pawn piece')
            .data('piece', this);
    };

    ChessJS.Pawn.prototype.possibleSquares = function() {
        var squares = [],
            yPlusOne = (this.color) == "white" ? -1 : 1;
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, 0, yPlusOne));
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, 0, yPlusOne*2));
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
            .addClass('rook piece')
            .data('piece', this);
    };

    ChessJS.Rook.prototype.possibleSquares = function() {
        var squares = [];
        for (var x = 0; x < 8; x++) {
            squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, x - this.square.x, 0));
        }
        for (var y = 0; y < 8; y++) {
            squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, 0, y - this.square.y));
        }
        return squares;
    };

})();
