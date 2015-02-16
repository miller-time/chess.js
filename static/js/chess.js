(function() {

    $(document).ready(function() {
        ChessJS.game = new ChessJS.ChessGame();
    });

    $(document).on('startNewGame', function() {
        if (ChessJS.game) {
            ChessJS.game.board.element.remove();
        }
        ChessJS.game = new ChessJS.ChessGame();
    });

})();
