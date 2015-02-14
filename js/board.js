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
        this.element = $("<div />")
            .css({
                top: this.x * 50 + "px",
                left: this.y * 50 + "px"
            })
            .addClass("square")
            .addClass(ChessJS.squareColor(this.x, this.y));
    };

    ChessJS.Board = function() {
        this.setupElement();
        this.setupSquares();
        this.setupLabels();
        this.addStyles();

        this.pieces = [];
        this.setupWhitePieces();
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
            coord.html("<b>"+YLABELS[m]+"</b>");
            this.element.append(coord);
        }
        for (var n = 0; n < 8; n++) {
            var coord = $("<div />").css({
                left: n*50 + "px"
            });
            coord.addClass("square");
            coord.addClass("letter-coord");
            coord.html("<b>"+XLABELS[n]+"</b>");
            this.element.append(coord);
        }
    };

    ChessJS.Board.prototype.getSquare = function(i, j) {
        for (var k = 0; k < this.squares.length; k++) {
            var x = this.squares[k].x;
            var y = this.squares[k].y;
            if (x == i && y == j) {
                return this.squares[k];
            }
        }
    };

    ChessJS.Board.prototype.addStyles = function() {
        var topLeft = this.getSquare(0, 0).element;
        topLeft.css({ "border-top-left-radius": "10px" });
        var bottomRight = this.getSquare(7, 7).element;
        bottomRight.css({ "border-bottom-right-radius": "10px" });
    };

    ChessJS.Board.prototype.addPiece = function(piece, xCoord, yCoord) {
        this.pieces.push(piece);
        this.element.append(piece.element);
        var i = YLABELS.indexOf(yCoord),
            j = XLABELS.indexOf(xCoord);
        piece.moveTo(this.getSquare(i, j));
    };

    ChessJS.Board.prototype.setupWhitePieces = function() {
        this.addPiece(new ChessJS.Rook('white'), 'A', 8);
        this.addPiece(new ChessJS.Rook('white'), 'H', 8);
        for (var col = 0; col < XLABELS.length; ++col) {
            this.addPiece(new ChessJS.Pawn('white'), XLABELS[col], 7);
        }
    };

})();
