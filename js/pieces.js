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
        var canMoveOne = squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, yPlusOne), 'any');
        if (canMoveOne) {
            squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, yPlusOne*2), 'any');
        }
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
        var squares = [],
            x, y;
        for (x = this.square.x + 1; x < 8; x++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, 0), this.color)) {
                break;
            }
        }
        for (x = this.square.x - 1; x >= 0; x--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, 0), this.color)) {
                break;
            }
        }
        for (y = this.square.y + 1; y < 8; y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, y - this.square.y), this.color)) {
                break;
            }
        }
        for (y = this.square.y - 1; y >= 0; y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, y - this.square.y), this.color)) {
                break;
            }
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
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, -2), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -2, -1), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, -2), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 2, -1), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, 2), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -2, 1), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, 2), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 2, 1), this.color);
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
        for (x = this.square.x - 1, y = this.square.y - 1; x >= 0 && y >= 0; x--, y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, y - this.square.y), this.color)) {
                break;
            }
        }
        for (x = this.square.x + 1, y = this.square.y - 1; x < 8 && y >= 0; x++, y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, y - this.square.y), this.color)) {
                break;
            }
        }
        for (x = this.square.x - 1, y = this.square.y + 1; x >= 0 && y < 8; x--, y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, y - this.square.y), this.color)) {
                break;
            }
        }
        for (x = this.square.x + 1, y = this.square.y + 1; x < 8 && y < 8; x++, y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, y - this.square.y), this.color)) {
                break;
            }
        }
        return squares;
     };

})();
