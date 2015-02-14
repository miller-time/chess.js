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

    Array.prototype.pushIfDefined = function(elem) {
        if (typeof elem !== 'undefined') {
            this.push(elem);
        }
    };

})();
