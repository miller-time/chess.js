var XLABELS = [ "A", "B", "C", "D", "E", "F", "G", "H" ];
var YLABELS = [   8,   7,   6,   5,   4,   3,   2,   1 ];

function Square(x, y) {
    this.x = x;
    this.y = y;
    this._element = undefined;
    this.element = function() {
	if (this._element === undefined) {
	    this._element = $("<div />").css({
		top: this.x * 50 + "px",
		left: this.y * 50 + "px"
	    });
	    this._element.addClass("square");
	    this._element.addClass(squareColor(this.x, this.y));
	    $("#board").append(this._element);
	}
	return this._element;
    };
    this.element();
    this.piece = undefined;
}

function Board() {
    this.squares = [];
    for (var i = 0; i < 8; i++) {
	for (var j = 0; j < 8; j++) {
	    this.squares.push(new Square(i, j));
	}
    }
    for (var m = 0; m < 8; m++) {
	var coord = $("<div />").css({
	    top: 20+m*50 + "px"
	});
	coord.addClass("square");
	coord.addClass("number-coord");
	coord.html("<b>"+YLABELS[m]+"</b>");
	$("#board").append(coord);
    }
    for (var n = 0; n < 8; n++) {
	var coord = $("<div />").css({
	    left: n*50 + "px"
	});
	coord.addClass("square");
	coord.addClass("letter-coord");
	coord.html("<b>"+XLABELS[n]+"</b>");
	$("#board").append(coord);
    }
    this.getSquare = function(i, j) {
	for (var k = 0; k < this.squares.length; k++) {
	    var x = this.squares[k].x;
	    var y = this.squares[k].y;
	    if (x == i && y == j) {
		return this.squares[k].element();
	    }
	}
    };
    var topLeft = this.getSquare(0, 0);
    topLeft.css({ "border-top-left-radius": "10px" });
    var bottomRight = this.getSquare(7, 7);
    bottomRight.css({ "border-bottom-right-radius": "10px" });
}

function squareColor(i, j) {
    if (i % 2) {
	return !(j % 2) ? "black" : "white";
    } else {
	return (j % 2) ? "black" : "white";
    }
}
