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
