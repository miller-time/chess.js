(function() {

    ChessJS.Piece = function(color, name) {
        this.color = color;
        this.name = name;
        this.status = 'new';
        this.setupElement();
    };

    ChessJS.Piece.prototype.toString = function() {
        var obj = {color: this.color, name: this.name, status: this.status};
        if (this.square) {
            obj.x = this.square.x;
            obj.y = this.square.y;
        }
        return JSON.stringify(obj);
    };

    ChessJS.Piece.prototype.checkSum = function() {
        return CryptoJS.MD5(this.toString()).toString(CryptoJS.enc.Hex);
    };

    ChessJS.Piece.prototype.setupElement = function() {
        this.element = null;
    };

    ChessJS.Piece.prototype.possibleSquares = function() {
        return [];
    };

    ChessJS.Piece.prototype.canMoveTo = function(square, boardState) {
        var squares = this.possibleSquares(boardState),
            canMoveHere = false;
        $.each(squares, function(idx, squareToCheck) {
            if (square.x === squareToCheck.x && square.y === squareToCheck.y) {
                canMoveHere = true;
            }
        });
        return canMoveHere;
    };

    ChessJS.Piece.prototype.moveTo = function(square) {
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

    ChessJS.Piece.prototype.capture = function() {
        this.element.hide();
        this.status = 'captured';
        $(document).trigger('pieceCaptured', this);
    };

    /***************************************
     *              Pawn                   *
     ***************************************/

    ChessJS.Pawn = function(color) {
        ChessJS.Piece.call(this, color, 'pawn');
    };

    ChessJS.Pawn.prototype = Object.create(ChessJS.Piece.prototype);
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

    ChessJS.Pawn.prototype.possibleSquares = function(boardState) {
        var squares = [],
            yPlusOne = (this.color) == "white" ? -1 : 1;
        var canMoveOne = squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, yPlusOne, boardState), 'any');
        if (canMoveOne && this.status === 'new') {
            squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, yPlusOne*2, boardState), 'any');
        }
        var leftAttackSquare = ChessJS.getRelativeSquare(this.square, -1, yPlusOne, boardState),
            rightAttackSquare = ChessJS.getRelativeSquare(this.square, 1, yPlusOne, boardState);
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
        ChessJS.Piece.call(this, color, 'rook');
    };

    ChessJS.Rook.prototype = Object.create(ChessJS.Piece.prototype);
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

    ChessJS.Rook.prototype.possibleSquares = function(boardState) {
        var squares = [],
            x, y;
        for (x = this.square.x + 1; x < 8; x++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, 0, boardState), this.color)) {
                break;
            }
        }
        for (x = this.square.x - 1; x >= 0; x--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, 0, boardState), this.color)) {
                break;
            }
        }
        for (y = this.square.y + 1; y < 8; y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, y - this.square.y, boardState), this.color)) {
                break;
            }
        }
        for (y = this.square.y - 1; y >= 0; y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, y - this.square.y, boardState), this.color)) {
                break;
            }
        }
        return squares;
    };

    /***************************************
     *              Knight                 *
     ***************************************/

    ChessJS.Knight = function(color) {
        ChessJS.Piece.call(this, color, 'knight');
    };

    ChessJS.Knight.prototype = Object.create(ChessJS.Piece.prototype);
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

    ChessJS.Knight.prototype.possibleSquares = function(boardState) {
        var squares = [];
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, -2, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -2, -1, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, -2, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 2, -1, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, 2, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -2, 1, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, 2, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 2, 1, boardState), this.color);
        return squares;
    };

    /***************************************
    *              Bishop                  *
    ***************************************/

    ChessJS.Bishop = function(color) {
        ChessJS.Piece.call(this, color, 'bishop');
    };

    ChessJS.Bishop.prototype = Object.create(ChessJS.Piece.prototype);
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

    ChessJS.Bishop.prototype.possibleSquares = function(boardState) {
        var squares = [],
            x, y;
        for (x = this.square.x - 1, y = this.square.y - 1; x >= 0 && y >= 0; x--, y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(
                this.square,
                x - this.square.x,
                y - this.square.y,
                boardState
            ), this.color)) {
                break;
            }
        }
        for (x = this.square.x + 1, y = this.square.y - 1; x < 8 && y >= 0; x++, y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(
                this.square,
                x - this.square.x,
                y - this.square.y,
                boardState
            ), this.color)) {
                break;
            }
        }
        for (x = this.square.x - 1, y = this.square.y + 1; x >= 0 && y < 8; x--, y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(
                this.square,
                x - this.square.x,
                y - this.square.y,
                boardState
            ), this.color)) {
                break;
            }
        }
        for (x = this.square.x + 1, y = this.square.y + 1; x < 8 && y < 8; x++, y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(
                this.square,
                x - this.square.x,
                y - this.square.y,
                boardState
            ), this.color)) {
                break;
            }
        }
        return squares;
    };

    /***************************************
    *              Queen                   *
    ***************************************/

    ChessJS.Queen = function(color) {
        ChessJS.Piece.call(this, color, 'queen');
    };

    ChessJS.Queen.prototype = Object.create(ChessJS.Piece.prototype);
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

    ChessJS.Queen.prototype.possibleSquares = function(boardState) {
        var squares = [],
            x, y;
        // Rook Moves
        for (x = this.square.x + 1; x < 8; x++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, 0, boardState), this.color)) {
                break;
            }
        }
        for (x = this.square.x - 1; x >= 0; x--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, x - this.square.x, 0, boardState), this.color)) {
                break;
            }
        }
        for (y = this.square.y + 1; y < 8; y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, y - this.square.y, boardState), this.color)) {
                break;
            }
        }
        for (y = this.square.y - 1; y >= 0; y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, y - this.square.y, boardState), this.color)) {
                break;
            }
        }
        // Bishop Moves
        for (x = this.square.x - 1, y = this.square.y - 1; x >= 0 && y >= 0; x--, y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(
                this.square,
                x - this.square.x,
                y - this.square.y,
                boardState
            ), this.color)) {
                break;
            }
        }
        for (x = this.square.x + 1, y = this.square.y - 1; x < 8 && y >= 0; x++, y--) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(
                this.square,
                x - this.square.x,
                y - this.square.y,
                boardState
            ), this.color)) {
                break;
            }
        }
        for (x = this.square.x - 1, y = this.square.y + 1; x >= 0 && y < 8; x--, y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(
                this.square,
                x - this.square.x,
                y - this.square.y,
                boardState
            ), this.color)) {
                break;
            }
        }
        for (x = this.square.x + 1, y = this.square.y + 1; x < 8 && y < 8; x++, y++) {
            if (!squares.pushSquare(ChessJS.getRelativeSquare(
                this.square,
                x - this.square.x,
                y - this.square.y,
                boardState
            ), this.color)) {
                break;
            }
        }
        return squares;
    };

    /***************************************
    *              King                    *
    ***************************************/

    ChessJS.King = function(color) {
        ChessJS.Piece.call(this, color, 'king');
    };

    ChessJS.King.prototype = Object.create(ChessJS.Piece.prototype);
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

    ChessJS.King.prototype.possibleSquares = function(boardState) {
        var squares = [];
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, -1, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, 0, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, -1, 1, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, -1, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 0, 1, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, -1, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, 0, boardState), this.color);
        squares.pushSquare(ChessJS.getRelativeSquare(this.square, 1, 1, boardState), this.color);
        return squares;
    };

})();
