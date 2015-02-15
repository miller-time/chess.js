(function() {

    $(document).ready(function() {
        ChessJS.board = new ChessJS.Board();

        $(document).on('pieceCaptured', function(event, piece) {
            console.log('pieceCaptured', piece);
        });
    });

})();
