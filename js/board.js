var Square = function(x, y) {
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
}

var Board = function() {
    this.squares = [];
    for (var i = 0; i < 8; i++) {
	for (var j = 0; j < 8; j++) {
	    this.squares.push(new Square(i, j));
	}
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
