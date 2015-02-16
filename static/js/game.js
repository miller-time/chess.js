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
    };

    ChessJS.ChessGame.prototype.turnTaken = function(color) {
        var blacksTurn = (color === 'white');
        this.whoseTurn = blacksTurn ? 'black' : 'white';
        $('.black-player').find('.go-icon').toggle(blacksTurn);
        $('.white-player').find('.go-icon').toggle(!blacksTurn);
    };

    ChessJS.ChessGame.prototype.checkForCheck = function(color, boardState) {
        var king = $('.' + color + '.king').data('piece'),
            kingInCheck = false,
            threats = [];
        if (king) {
            $.each(ChessJS.game.board.pieces, function(idx, piece) {
                if (piece.color === ChessJS.otherColor(color) && piece.status !== 'captured' && piece.canMoveTo(king.square)) {
                    threats.push(piece);
                    kingInCheck = true;
                }
            });
            if (kingInCheck) {
                return {
                    'inCheck': color,
                    'king': king,
                    'threats': threats
                };
            }
        } else {
            throw 'King not found for color ' + color + '!';
        }
    };

    ChessJS.ChessGame.prototype.highlightCheck = function(checkData) {
        $.each(checkData.threats, function(idx, piece) {
            piece.square.element.addClass('alert');
        });
        checkData.king.square.element.addClass('warning');
    };

    ChessJS.ChessGame.prototype.checkForCheckMate = function(color) {
        var anyPieceCanBreakCheck = false;
        for (var i = 0; i < this.board.pieces.length; i++) {
            var pieceToCheck = this.board.pieces[i];
            if (pieceToCheck.color === color && pieceToCheck.status !== 'captured') {
                var moves = ChessJS.possibleBreakCheckMoves(pieceToCheck);
                if (moves.length) {
                    anyPieceCanBreakCheck = true;
                    break;
                }
            }
        }
        if (!anyPieceCanBreakCheck) {
            var winner = this[ChessJS.otherColor(color) + 'Player'],
                loser = this[color + 'Player'];
            $('<div />').text(winner + ' has defeated ' + loser + '!')
                .dialog({
                    'title': 'Checkmate!',
                    'buttons': [
                        {
                            autoOpen: true,
                            draggable: true,
                            modal: true,
                            text: 'Start New Game',
                            click: function() {
                                $(document).trigger('startNewGame');
                                $(this).dialog('close');
                            }
                        }
                    ]
                });
        }
    };

    $(document).on('pieceMoved', function(event, piece) {
        if (ChessJS.game) {
            checkData = ChessJS.game.checkForCheck(ChessJS.otherColor(piece.color));
            if (checkData && checkData.inCheck) {
                ChessJS.game[checkData.inCheck + 'InCheck'] = true;
                ChessJS.game.highlightCheck(checkData);
                $(document).trigger('placedInCheck', ChessJS.otherColor(piece.color));
            }
            ChessJS.game.turnTaken(piece.color);
        }
    });

    $(document).on('placedInCheck', function(event, color) {
        if (ChessJS.game) {
            ChessJS.game.checkForCheckMate(color);
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
