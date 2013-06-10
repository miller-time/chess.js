var Board = function() {
    for (var i = 0; i < 8; i++) {
	for (var j = 0; j < 8; j++) {
	    var square = $("<div />").css({
		top: i*50 + "px",
		left: j*50 + "px"
	    });
	    square.attr("row", i);
	    square.attr("col", j);
	    square.addClass("square");
	    var color = isSquareBlack(i, j) ? "black" : "white";
	    square.addClass(color);
	    $("#board").append(square);
	}
    }
    var topLeft = getSquare(0, 0);
    topLeft.css({ "border-top-left-radius": "10px" });
    var bottomRight = getSquare(7, 7);
    bottomRight.css({ "border-bottom-right-radius": "10px" });
}

function isSquareBlack(i, j) {
    return (i % 2) ? !(j % 2) : (j % 2);
}

function getSquare(i, j) {
    var squares = $(".square");
    for (var k = 0; k < squares.length; k++) {
	var s = $(squares[k]);
	if (s.attr("row") == i && s.attr("col") == j) {
	    return s;
	}
    }
}
