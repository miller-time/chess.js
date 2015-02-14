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

    /***************************************
     *              Pawn                   *
     ***************************************/

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

    /***************************************
     *              Rook                   *
     ***************************************/

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

    /***************************************
     *              Knight                 *
     ***************************************/

    ChessJS.Knight = function(color, square) {
        Piece.call(this, color, square);
    };

    ChessJS.Knight.prototype = Object.create(Piece.prototype);
    ChessJS.Knight.prototype.constructor = ChessJS.Knight;

    ChessJS.Knight.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('knight piece')
            .data('piece', this);
    };

    ChessJS.Knight.prototype.possibleSquares = function() {
        var squares = [];
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, -1, -2));
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, -2, -1));
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, 1, -2));
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, 2, -1));
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, -1, 2));
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, -2, 1));
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, 1, 2));
        squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, 2, 1));
        return squares;
    };

     /***************************************
     *              Bishop                  *
     ***************************************/

     ChessJS.Bishop = function(color, square) {
        Piece.call(this, color, square);
     };

     ChessJS.Bishop.prototype = Object.create(Piece.prototype);
     ChessJS.Bishop.prototype.constructor = ChessJS.Bishop;

     ChessJS.Bishop.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('bishop piece')
            .data('piece', this);
     };

     ChessJS.Bishop.prototype.possibleSquares = function() {
        var squares = [],
            x, y;
        for (x = this.square.x, y = this.square.y; x >= 0 && y >= 0; x--, y--) {
            squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, x - this.square.x, y - this.square.y));
        }
        for (x = this.square.x, y = this.square.y; x < 8 && y >= 0; x++, y--) {
            squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, x - this.square.x, y - this.square.y));
        }
        for (x = this.square.x, y = this.square.y; x >= 0 && y < 8; x--, y++) {
            squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, x - this.square.x, y - this.square.y));
        }
        for (x = this.square.x, y = this.square.y; x < 8 && y < 8; x++, y++) {
            squares.pushIfDefined(ChessJS.getRelativeSquare(this.square, x - this.square.x, y - this.square.y));
        }
        return squares;
     };

})();
