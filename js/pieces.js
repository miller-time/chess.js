(function() {

    var Piece = function(color) {
        this.color = color;
        this.status = 'new';
        this.setupElement();
    };

    Piece.prototype.setupElement = function() {
        this.element = null;
    };

    Piece.prototype.possibleSquares = function() {
        return [];
    };

    Piece.prototype.moveTo = function(square) {
        var oldSquare = this.square;
        this.square = square;
        if (oldSquare) {
            oldSquare.piece = null;
            this.status = 'in play';
            $(document).trigger('pieceMoved', this);
        }
        this.element.css({
            top: square.y * 50 + "px",
            left: square.x * 50 + "px"
        });
        if (square.piece) {
            square.piece.capture();
        }
        square.piece = this;
    };

    Piece.prototype.capture = function() {
        this.element.hide();
        this.status = 'captured';
        $(document).trigger('pieceCaptured', this);
    };

    /***************************************
     *              Pawn                   *
     ***************************************/

    ChessJS.Pawn = function(color) {
        Piece.call(this, color);
    };

    ChessJS.Pawn.prototype = Object.create(Piece.prototype);
    ChessJS.Pawn.prototype.constructor = ChessJS.Pawn;

    ChessJS.Pawn.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('pawn piece')
            .data('piece', this)
            .draggable({
                revert: 'invalid',
                helper: 'clone',
                opacity: 0.7
            });
    };

    ChessJS.Pawn.prototype.possibleSquares = function() {
        var squares = [],
            yPlusOne = (this.color) == "white" ? -1 : 1;
        var canMoveOne = squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, yPlusOne), 'any');
        if (canMoveOne && this.status === 'new') {
            squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, yPlusOne*2), 'any');
        }
        var leftAttackSquare = ChessJS.getRelativeSquare(this.square, -1, yPlusOne),
            rightAttackSquare = ChessJS.getRelativeSquare(this.square, 1, yPlusOne);
        if (leftAttackSquare && leftAttackSquare.piece && leftAttackSquare.piece.color !== this.color) {
            squares.push(leftAttackSquare);
        }
        if (rightAttackSquare && rightAttackSquare.piece && rightAttackSquare.piece.color !== this.color) {
            squares.push(rightAttackSquare);
        }
        return squares;
    };

    /***************************************
     *              Rook                   *
     ***************************************/

    ChessJS.Rook = function(color) {
        Piece.call(this, color);
    };

    ChessJS.Rook.prototype = Object.create(Piece.prototype);
    ChessJS.Rook.prototype.constructor = ChessJS.Rook;

    ChessJS.Rook.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('rook piece')
            .data('piece', this)
            .draggable({
                revert: 'invalid',
                helper: 'clone',
                opacity: 0.7
            });
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

    ChessJS.Knight = function(color) {
        Piece.call(this, color);
    };

    ChessJS.Knight.prototype = Object.create(Piece.prototype);
    ChessJS.Knight.prototype.constructor = ChessJS.Knight;

    ChessJS.Knight.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('knight piece')
            .data('piece', this)
            .draggable({
                revert: 'invalid',
                helper: 'clone',
                opacity: 0.7
            });
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

    ChessJS.Bishop = function(color) {
        Piece.call(this, color);
    };

    ChessJS.Bishop.prototype = Object.create(Piece.prototype);
    ChessJS.Bishop.prototype.constructor = ChessJS.Bishop;

    ChessJS.Bishop.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('bishop piece')
            .data('piece', this)
            .draggable({
                revert: 'invalid',
                helper: 'clone',
                opacity: 0.7
            });
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

    /***************************************
    *              Queen                   *
    ***************************************/

    ChessJS.Queen = function(color) {
        Piece.call(this, color);
    };

    ChessJS.Queen.prototype = Object.create(Piece.prototype);
    ChessJS.Queen.prototype.constructor = ChessJS.Queen;

    ChessJS.Queen.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('queen piece')
            .data('piece', this)
            .draggable({
                revert: 'invalid',
                helper: 'clone',
                opacity: 0.7
            });
    };

    ChessJS.Queen.prototype.possibleSquares = function() {
        var squares = [],
            x, y;
        // Rook Moves
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
        // Bishop Moves
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

    /***************************************
    *              King                    *
    ***************************************/

    ChessJS.King = function(color) {
        Piece.call(this, color);
    };

    ChessJS.King.prototype = Object.create(Piece.prototype);
    ChessJS.King.prototype.constructor = ChessJS.King;

    ChessJS.King.prototype.setupElement = function() {
        this.element = $('<div />')
            .addClass(this.color)
            .addClass('king piece')
            .data('piece', this)
            .draggable({
                revert: 'invalid',
                helper: 'clone',
                opacity: 0.7
            });
    };

    ChessJS.King.prototype.possibleSquares = function() {
        var squares = [];
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, -1), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, 0), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, 1), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, -1), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, 1), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, -1), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, 0), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, 1), this.color);
        return squares;
    };

})();
