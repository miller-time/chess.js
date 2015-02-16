(function() {

    var XLABELS = [ "A", "B", "C", "D", "E", "F", "G", "H" ];
    var YLABELS = [   8,   7,   6,   5,   4,   3,   2,   1 ];

    var Square = function(x, y) {
        this.x = x;
        this.y = y;
        this.piece = undefined;
        this.setupElement();
    };

    Square.prototype.setupElement = function() {
        var self = this;
        this.element = $("<div />")
            .css({
                top: this.y * 50 + "px",
                left: this.x * 50 + "px"
            })
            .addClass("square")
            .addClass(ChessJS.squareColor(this.x, this.y))
            .droppable({
                activeClass: 'highlight',
                accept: function(draggedElement) {
                    var piece = draggedElement.data('piece');
                    if (piece) {
                        var validSquares;
                        if (ChessJS.game && ChessJS.game.whoseTurn !== piece.color) {
                            // not your turn!
                            validSquares = [];
                        } else if (ChessJS.game && ChessJS.game[piece.color + 'InCheck']) {
                            // break check moves
                            validSquares = ChessJS.possibleBreakCheckMoves(piece);
                        } else {
                            // normal movement rules
                            validSquares = piece.possibleSquares();
                        }
                        if (validSquares.indexOf(self) !== -1) {
                            return true;
                        }
                    }
                },
                drop: function(event, ui) {
                    var piece = ui.draggable.data('piece'),
                        breakingCheck = ChessJS.game.checkForCheck(piece.color);
                    if (piece) {
                        piece.moveTo(self);
                    }
                    // clear any remaining square highlights
                    $('.highlight').removeClass('highlight');
                    if (breakingCheck) {
                        $('.alert').removeClass('alert');
                        $('.warning').removeClass('warning');
                    }
                }
            });
    };

    ChessJS.Board = function() {
        this.setupElement();
        this.setupSquares();
        this.setupLabels();
        this.addStyles();

        this.pieces = [];
        this.setupWhitePieces();
        this.setupBlackPieces();
    };

    ChessJS.Board.prototype.setupElement = function() {
        this.element = $('<div />').addClass('board rounded');
        $('body').append(this.element);
    };

    ChessJS.Board.prototype.setupSquares = function() {
        this.squares = [];
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var square = new Square(i, j);
                this.squares.push(square);
                this.element.append(square.element);
            }
        }
    };

    ChessJS.Board.prototype.setupLabels = function() {
        for (var m = 0; m < 8; m++) {
            var coord = $("<div />").css({
                top: 20+m*50 + "px"
            });
            coord.addClass("square");
            coord.addClass("number-coord");
            coord.html("<b>"+this.getYCoord(m)+"</b>");
            this.element.append(coord);
        }
        for (var n = 0; n < 8; n++) {
            var coord = $("<div />").css({
                left: n*50 + "px"
            });
            coord.addClass("square");
            coord.addClass("letter-coord");
            coord.html("<b>"+this.getXCoord(n)+"</b>");
            this.element.append(coord);
        }
    };

    ChessJS.Board.prototype.getX = function(xCoord) {
        return XLABELS.indexOf(xCoord);
    };

    ChessJS.Board.prototype.getXCoord = function(x) {
        return XLABELS[x];
    };

    ChessJS.Board.prototype.getY = function(yCoord) {
        return YLABELS.indexOf(yCoord);
    };

    ChessJS.Board.prototype.getYCoord = function(y) {
        return YLABELS[y];
    };

    ChessJS.Board.prototype.getSquarebyXY = function(x, y) {
        return this.getSquare(this.getXCoord(x), this.getYCoord(y));
    };

    ChessJS.Board.prototype.getSquare = function(xCoord, yCoord) {
        for (var k = 0; k < this.squares.length; k++) {
            var x = this.squares[k].x;
            var y = this.squares[k].y;
            if (x === this.getX(xCoord) && y === this.getY(yCoord)) {
                return this.squares[k];
            }
        }
    };

    ChessJS.Board.prototype.addStyles = function() {
        var topLeft = this.getSquare('A', 8).element,
            topRight = this.getSquare('H', 8).element,
            bottomLeft = this.getSquare('A', 1).element,
            bottomRight = this.getSquare('H', 1).element;
        topLeft.css("border-top-left-radius", "5px");
        topRight.css("border-top-right-radius", "5px");
        bottomLeft.css("border-bottom-left-radius", "5px");
        bottomRight.css("border-bottom-right-radius", "5px");
    };

    ChessJS.Board.prototype.addPiece = function(piece, xCoord, yCoord) {
        this.pieces.push(piece);
        this.element.append(piece.element);
        piece.moveTo(this.getSquare(xCoord, yCoord));
    };

    ChessJS.Board.prototype.setupWhitePieces = function() {
        this.addPiece(new ChessJS.Rook('white'),   'A', 1);
        this.addPiece(new ChessJS.Knight('white'), 'B', 1);
        this.addPiece(new ChessJS.Bishop('white'), 'C', 1);
        this.addPiece(new ChessJS.Queen('white'),  'D', 1);
        this.addPiece(new ChessJS.King('white'),   'E', 1);
        this.addPiece(new ChessJS.Bishop('white'), 'F', 1);
        this.addPiece(new ChessJS.Knight('white'), 'G', 1);
        this.addPiece(new ChessJS.Rook('white'),   'H', 1);
        for (var col = 0; col < XLABELS.length; ++col) {
            this.addPiece(new ChessJS.Pawn('white'), XLABELS[col], 2);
        }
    };

    ChessJS.Board.prototype.setupBlackPieces = function() {
        this.addPiece(new ChessJS.Rook('black'),   'A', 8);
        this.addPiece(new ChessJS.Knight('black'), 'B', 8);
        this.addPiece(new ChessJS.Bishop('black'), 'C', 8);
        this.addPiece(new ChessJS.Queen('black'),  'D', 8);
        this.addPiece(new ChessJS.King('black'),   'E', 8);
        this.addPiece(new ChessJS.Bishop('black'), 'F', 8);
        this.addPiece(new ChessJS.Knight('black'), 'G', 8);
        this.addPiece(new ChessJS.Rook('black'),   'H', 8);
        for (var col = 0; col < XLABELS.length; ++col) {
            this.addPiece(new ChessJS.Pawn('black'), XLABELS[col], 7);
        }
    };

    ChessJS.BoardState = function(board) {
        this.squares = [];
        this.pieces = [];
        var self = this;
        $.each(board.squares, function(idx, square) {
            var squareInfo = {
                x: square.x,
                y: square.y
            };
            if (square.piece) {
                var pieceInfo = {
                    'color': square.piece.color,
                    'name': square.piece.name,
                    'status': square.piece.status
                };
                squareInfo.piece = pieceInfo;
                pieceInfo.square = squareInfo;
                self.pieces.push(pieceInfo);
            }
            self.squares.push(squareInfo);
        });
    };

    ChessJS.BoardState.prototype.toString = function() {
        var squares = this.squares.slice();
        $.each(squares, function(idx, square) {
            if (square.piece) {
                delete square.piece.square;
            }
        });
        return JSON.stringify({'squares': squares});
    };

    ChessJS.BoardState.prototype.checkSum = function() {
        return CryptoJS.MD5(this.toString()).toString(CryptoJS.enc.Hex);
    };

    ChessJS.BoardState.prototype.getSquare = function(x, y) {
        for (var i = 0; i < this.squares.length; i++) {
            if (this.squares[i].x === x && this.squares[i].y === y) {
                return this.squares[i];
            }
        }
    };

    ChessJS.BoardState.prototype.movePiece = function(x, y, newX, newY) {
        var oldSquare = this.getSquare(x, y),
            newSquare = this.getSquare(newX, newY);
        if (!oldSquare) {
            throw 'Cannot move piece from (' + x + ',' + y + '). Square does not exist!';
        }
        if (!newSquare) {
            throw 'Cannot move piece to (' + newX + ',' + newY + '). Square does not exist!';
        }
        if (oldSquare.piece) {
            var piece = {
                'color': oldSquare.piece.color,
                'name': oldSquare.piece.name,
                'status': oldSquare.piece.status
            };
            if (newSquare.piece) {
                // capture
                this.pieces.splice(this.pieces.indexOf(newSquare.piece), 1);
            }
            newSquare.piece = piece;
            piece.square = newSquare;
            this.pieces.splice(this.pieces.indexOf(oldSquare.piece), 1);
            this.pieces.push(piece);
            oldSquare.piece = null;
        } else {
            throw 'Cannot move piece from (' + x + ',' + y + '). It is not there!';
        }
    };

    ChessJS.BoardState.prototype.getKing = function(color) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].name === 'king' && this.pieces[i].color === color) {
                return this.pieces[i];
            }
        }
    };

    ChessJS.BoardState.prototype.checkForCheck = function(color) {
        var self = this,
            king = this.getKing(color),
            kingInCheck = false;
        $.each(this.pieces, function(idx, pieceInfo) {
            if (king && pieceInfo.color === ChessJS.otherColor(color) && pieceInfo.status !== 'captured') {
                var tempPiece = ChessJS.makeTempPiece(pieceInfo);
                if (tempPiece.canMoveTo(king.square, self)) {
                    kingInCheck = true;
                }
            }
        });
        return kingInCheck;
    };

    ChessJS.Board.prototype.getState = function() {
        return new ChessJS.BoardState(this);
    };

})();
