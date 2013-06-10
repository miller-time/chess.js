var board = undefined;

$(document).ready(function() {
    var board = new Board();
});

function getPiece(x, y) {
    return board.getPiece(x, y);
}

function getRelativePiece(square, deltaX, deltaY) {
    return board.getPiece(square.x + deltaX, square.y + deltaY);
}
