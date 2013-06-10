$(document).ready(function() {
    for (var i = 0; i < 8; i++) {
	for (var j = 0; j < 8; j++) {
	    var piece = $("<div />").css({
		top: i*50 + "px",
		left: j*50 + "px"		
	    });
	    piece.addClass("square");
	    var color = isSquareBlack(i, j) ? "black" : "white";
	    piece.addClass(color);
	    $("#board").append(piece);
	}
    }
});

function isSquareBlack(i, j) {
    return (i % 2) ? !(j % 2) : (j % 2);
}
