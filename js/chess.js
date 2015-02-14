(function() {

    $(document).ready(function() {
        ChessJS.board = new ChessJS.Board();

        $('.piece').click(function() {
            var piece = $(this).data('piece');
            $.each(piece.possibleSquares(), function(idx, square) {
                if (square.element) {
                    square.element.toggleClass('highlight');
                }
            });
        });
    });

})();
