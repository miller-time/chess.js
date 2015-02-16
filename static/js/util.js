(function() {

    window.ChessJS = window.ChessJS || {};

    /* ChessJS.getRelativeSquare
     *
     * `square`: Square or BoardState square info
     * `deltaX`: offset for square's x value
     * `deltaY`: offset for square's y value
     * `boardState`: when specified, use this board instead of the game board
     *
     * Returns the square at the [+deltaX, +deltaY] offset.
     */
    ChessJS.getRelativeSquare = function(square, deltaX, deltaY, boardState) {
        if (boardState) {
            return boardState.getSquare(square.x + deltaX, square.y + deltaY);
        } else if (this.game && this.game.board) {
            return this.game.board.getSquarebyXY(square.x + deltaX, square.y + deltaY);
        }
    };

    ChessJS.otherColor = function(color) {
        return (color === 'black') ? 'white' : 'black';
    };

    ChessJS.squareColor = function(i, j) {
        if (i % 2) {
            return !(j % 2) ? "black" : "white";
        } else {
            return (j % 2) ? "black" : "white";
        }
    };

    /* ChessJS.BreakCheckStore
     *
     * Hash Table for caching `possibleBreakCheckMoves` results
     * using board state checksum and piece checksum as keys.
     */
    ChessJS.BreakCheckStore = function() {
        this.store = {};
    };

    ChessJS.BreakCheckStore.prototype.key = function(boardState, piece) {
        return boardState.checkSum() + piece.checkSum();
    };

    ChessJS.BreakCheckStore.prototype.get = function(boardState, piece) {
        return this.store[this.key(boardState, piece)];
    };

    ChessJS.BreakCheckStore.prototype.set = function(boardState, piece, moves) {
        this.store[this.key(boardState, piece)] = moves;
    };

    /* ChessJS.possibleBreakCheckMoves
     *
     * `piece`: piece attempting to break check
     *
     * Returns any squares where this piece can break check.
     */
    ChessJS.possibleBreakCheckMoves = function(piece) {
        if (!ChessJS.game && !ChessJS.game.board) {
            throw 'Unable to check moves because board not initialized.';
        }

        ChessJS.breakCheckStore = ChessJS.breakCheckStore || new ChessJS.BreakCheckStore();

        var state = ChessJS.game.board.getState(),
            cached = ChessJS.breakCheckStore.get(state, piece);
        if (cached) {
            return cached;
        }

        // squares this piece could normally move
        var squares = piece.possibleSquares();
        // squares that break the check
        var breakCheckSquares = $.grep(squares, function(squareToCheck) {
            // get current board state
            var boardState = ChessJS.game.board.getState();
            // simulate moving the piece to the square-to-check
            boardState.movePiece(piece.square.x, piece.square.y, squareToCheck.x, squareToCheck.y);
            // if the king is no longer in check, the break was successful
            return !boardState.checkForCheck(piece.color);
        });

        ChessJS.breakCheckStore.set(state, piece, breakCheckSquares);
        return breakCheckSquares;
    };

    /* ChessJS.makeTempPiece
     *
     * `pieceInfo`: info to create piece
     *
     * Returns a new Piece instance with null element.
     */
    ChessJS.makeTempPiece = function(pieceInfo) {
        var piece;
        switch(pieceInfo.name) {
            case 'pawn':
                piece = new ChessJS.Pawn(pieceInfo.color);
                break;
            case 'rook':
                piece = new ChessJS.Rook(pieceInfo.color);
                break;
            case 'knight':
                piece = new ChessJS.Knight(pieceInfo.color);
                break;
            case 'bishop':
                piece = new ChessJS.Bishop(pieceInfo.color);
                break;
            case 'queen':
                piece = new ChessJS.Queen(pieceInfo.color);
                break;
            case 'king':
                piece = new ChessJS.King(pieceInfo.color);
                break;
            default:
                throw 'Invalid piece type: ' + pieceInfo.name;
        }
        piece.element.remove();
        piece.element = null;
        piece.square = pieceInfo.square;
        return piece;
    };

    /* Array.prototype.pushSquare
     *
     * `square`: Square
     *
     * Cannot be pushed if it's undefined or occupied by a piece of invalid color.
     * Returns true if square was empty, false otherwise.
     */
    Array.prototype.pushSquare = function(square, invalidColor) {
        if (square && !square.piece) {
            // no piece is on target square
            this.push(square);
            return true;
        } else if (square && square.piece && invalidColor !== 'any' && square.piece.color !== invalidColor) {
            // piece on target square can be captured
            this.push(square);
            // cannot move beyond this square, so return false
            return false;
        }
        return false;
    };

})();
