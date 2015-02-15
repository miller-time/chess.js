(function() {

    $(document).ready(function() {
        ChessJS.game = new ChessJS.ChessGame();

        $(document).on('pieceCaptured', function(event, piece) {
            console.log('pieceCaptured', piece);
        });
    });

})();
