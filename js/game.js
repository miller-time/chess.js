(function() {

    ChessJS.ChessGame = function() {
        this.whitePlayer = 'White Player';
        this.blackPlayer = 'Black Player';
        this.whoseTurn = 'white';
        this.setupSplashScreen();
    };

    ChessJS.ChessGame.prototype.setupSplashScreen = function() {
        var self = this;
        var whitePlayerInput = $('<input />')
            .attr('placeholder', 'White Player')
            .change(function() {
                self.whitePlayer = $(this).val();
            });
        var blackPlayerInput = $('<input />')
            .attr('placeholder', 'Black Player')
            .change(function() {
                self.blackPlayer = $(this).val();
            });
        var submitButton = $('<button />')
            .addClass('start-game')
            .text('Start Game')
            .button()
            .click(function() {
                self.element.remove();
                self.startGame();
            });

        this.element = $('<div />')
            .addClass('splash rounded')
            .append($('<table />')
                .append($('<tr />')
                    .append($('<td />').text('Black Player'))
                    .append($('<td />')
                        .append(blackPlayerInput)))
                .append($('<tr />')
                    .append($('<td />').text('White Player'))
                    .append($('<td />')
                        .append(whitePlayerInput))))
            .append(submitButton);
        $('body').append(this.element);

    };

    ChessJS.ChessGame.prototype.startGame = function() {
        this.board = new ChessJS.Board();
        $('.black-player').find('h3').text(this.blackPlayer);
        $('.white-player').find('h3').text(this.whitePlayer);
        $('.white-player').find('.go-icon').show();
        $('.panel').show();
        $('.black.piece').each(function() {
            if ($(this).data('piece') && $(this).data('piece').status !== 'captured') {
                $(this).draggable('option', 'disabled', true);
            }
        });
    };

    ChessJS.ChessGame.prototype.turnTaken = function(color) {
        var blacksTurn = (color === 'white');
        this.whoseTurn = blacksTurn ? 'black' : 'white';
        $('.black-player').find('.go-icon').toggle(blacksTurn);
        $('.white-player').find('.go-icon').toggle(!blacksTurn);
        $('.black.piece').each(function() {
            if ($(this).data('piece') && $(this).data('piece').status !== 'captured') {
                $(this).draggable('option', 'disabled', !blacksTurn);
            }
        });
        $('.white.piece').each(function() {
            if ($(this).data('piece') && $(this).data('piece').status !== 'captured') {
                $(this).draggable('option', 'disabled', blacksTurn);
            }
        });
    };

    $(document).on('pieceMoved', function(event, piece) {
        if (ChessJS.game) {
            ChessJS.game.turnTaken(piece.color);
        }
    });

    $(document).on('pieceCaptured', function(event, piece) {
        piece.element
            .detach()
            .css({
                'top': '0px',
                'left': '0px',
                'display': 'block',
                'position': 'relative',
                'float': 'left'
            })
            .draggable('destroy');
        $('.' + piece.color + '-player').append(piece.element);
    });

})();
