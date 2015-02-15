(function() {

    ChessJS.ChessGame = function() {
        this.playerOne = 'Player 1';
        this.playerTwo = 'Player 2';
        this.setupSplashScreen();
    };

    ChessJS.ChessGame.prototype.setupSplashScreen = function() {
        var self = this;
        var playerOneInput = $('<input />')
            .addClass('player-one')
            .attr('placeholder', 'Player 1')
            .change(function() {
                self.playerOne = $(this).val();
            });
        var playerTwoInput = $('<input />')
            .addClass('player-two')
            .attr('placeholder', 'Player 2')
            .change(function() {
                self.playerTwo = $(this).val();
            });
        var submitButton = $('<button />')
            .addClass('start-game')
            .text('Start Game')
            .button()
            .click(function() {
                // initialize board
                // this.board = new ChessJS.Board();

                // start game
            });

        this.element = $('<div />')
            .addClass('splash rounded')
            .append($('<table />')
                .append($('<tr />')
                    .append($('<td />').text('Player 1 (White)'))
                    .append($('<td />')
                        .append(playerOneInput)))
                .append($('<tr />')
                    .append($('<td />').text('Player 2 (Black)'))
                    .append($('<td />')
                        .append(playerTwoInput))))
            .append(submitButton);
        $('body').append(this.element);

    };

})();
