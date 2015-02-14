(function() {

    window.ChessJS = window.ChessJS || {};

    ChessJS.getRelativeSquare = function(square, deltaX, deltaY) {
        if (this.board) {
            return this.board.getSquarebyXY(square.x + deltaX, square.y + deltaY);
        }
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
     * Returns true if push was successful, false otherwise.
     */
    Array.prototype.pushSquare = function(square, invalidColor) {
        if (square && !square.piece) {
            this.push(square);
            return true;
        } else if (square.piece && invalidColor !== 'any' && square.piece.color !== invalidColor) {
            this.push(square);
            return true;
        }
        return false;
    };

})();
