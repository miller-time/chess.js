(function() {

    $(document).ready(function() {
        new ChessJS.ChessGame();

        $(document).on('pieceCaptured', function(event, piece) {
            console.log('pieceCaptured', piece);
        });
    });

})();
