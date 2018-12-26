/*
	Фрактал на кривых
*/

// Инициализация переменных
var canvasSquare    = document.getElementById("square");
var contextSquare       = canvasSquare.getContext("2d");
canvasSquare.width  = 1000;
canvasSquare.height = 560;
contextSquare.save();
contextSquare.translate(500, 290);
var x = canvasSquare.width / 2;
var y = canvasSquare.height / 2;
var ln    = 120;
var minLn = 2;
var qtMin = 5;
var fib =  	1.6180339;
contextSquare.lineWidth   = 1;
contextSquare.beginPath();
contextSquare.save();

function drawRound(qt) {
	if (qt <= qtMin) {
		contextSquare.stroke();
	} else {
		for (var i = 0; i < qt; i++) {
			contextSquare.arc(i * i * fib, 3 * i, fib * i, 0, 2 * Math.PI);
			contextSquare.rotate(2 * Math.PI * 3 / (qt - 1));
		}
		drawRound(qt * 0.5);
  	}
  	// drawFractal(qt * 0.5);
}

function addFractal(qt) {
	if (qt <= qtMin) {
		contextSquare.stroke();
	} else {
		switch(getRandom()) {
			case 1:
			for (var i = 0; i < qt / 2; i++) {
				contextSquare.strokeRect(0, 0, 30, 20);
				if (i % 2 == 0) {
					contextSquare.strokeStyle = "rgb(0," + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ")";
				} else {
					contextSquare.strokeStyle = "rgb(0," + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ")";
				}
				contextSquare.stroke();
				contextSquare.rotate(3 * Math.PI * 2 / (qt - 1));
			}
			addFractal(qt * 0.3);
			break;

			case 2:
			for (var i = 0; i < qt / 3; i++) {
				contextSquare.strokeRect(0, 0, 45, 15);
				if (i % 2 == 0) {
					contextSquare.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt * i) + "0," + Math.floor(0 + 255 / qt * i) + ")";
				} else {
					contextSquare.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ",255)";
				}
				contextSquare.stroke();
				contextSquare.rotate(2 * Math.PI * 5 / (qt - 1));
			}
			addFractal(qt * 0.3);
			break;

			case 3:
			for (var i = 0; i < qt / 2; i++) {
				contextSquare.strokeRect(10, 50, 45, 35);
				if (i % 2 == 0) {
					contextSquare.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + "," + Math.floor(255 - 255 / qt * i) + ")";
					contextSquare.stroke();
				} else {
					contextSquare.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ",255)";
					contextSquare.stroke();
				}
				contextSquare.rotate(3 * Math.PI * 4 / (qt - 1));
			}
			addFractal(qt * 0.3);
			break;

			case 4:
			for (var i = 0; i < qt / 3; i++) {
				contextSquare.arc(10, 30, 45, 0, 2 * Math.PI);
				contextSquare.stroke();
				contextSquare.rotate(2 * Math.PI * 3 / (qt - 1));
			}
			addFractal(qt * 0.3);
			break;

			case 5:
			for (var i = 0; i < qt / 3; i++) {
				contextSquare.arc(50, 50, 25, 0, 2 * Math.PI);
				contextSquare.stroke();
				contextSquare.rotate(2 * Math.PI * 4 / (qt - 1));
			}
	  		// drawFractal(0.3);
	  		addFractal(qt * 0.3);
		  	break;

		  	case 6:
		  	for (var i = 0; i < qt / 4; i++) {
		  		contextSquare.strokeRect(0, 0, 30, 20);
		  		if (i % 2 == 0) {
		  			contextSquare.strokeStyle = "rgb(0," + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ")";
		  		} else {
		  			contextSquare.strokeStyle = "rgb(0," + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ")";
		  		}
		  		contextSquare.stroke();
		  		contextSquare.rotate(4 * Math.PI * 3 / (qt - 1));
		  	}
		  	// drawFractal(0.3);
		  	addFractal(qt * 0.3);
		  	break;

		  	default:
		  	for (var i = 0; i < qt / 2; i++) {
		  		contextSquare.strokeRect(30, 0, getRandom() * i, getRandom() * i / 1.7);
		  		if (i % 2 == 0) {
		  			contextSquare.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt * i) + "0," + Math.floor(0 + 255 / qt * i) + ")";
		  		} else {
		  			contextSquare.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ",255)";
		  		}
		  		contextSquare.stroke();
		  		contextSquare.rotate(2 * Math.PI * 3 / (qt - 1));
		  	}
		  	addFractal(qt * 0.5);
		  	break;
		}
	}
}


function drawSquare(qt) {
	if (qt <= qtMin) {
		contextSquare.stroke();
	} else {
		/* for (var i = 0; i < qt / 10; i++) {
			contextSquare.strokeRect(0, 0, 150,  150);
			if (i % 2 == 0) {
				contextSquare.strokeStyle = "rgb(255," + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ")";
			} else {
				contextSquare.strokeStyle = "rgb(0," + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ")";
			}
			contextSquare.rotate(3 * Math.PI * 4 / (qt - 1));

  			// drawFractal(qt * 0.5, qtMin);
  		} */
  		for (var i = 0; i < qt / 2; i++) {
			contextSquare.moveTo(-100 + i * 10,-70 + i * 10);
			contextSquare.lineTo(50 + i * 10,0 + i * 10);
			contextSquare.lineTo(-100 + i * 10,70 + i * 10);
			// contextSquare.lineTo(30,30);
			contextSquare.rotate(2 * Math.PI / (qt - 1));
		}
		
		/*for (var i = 0; i < qt * fib / 3; i++) {
			var radius = 2 * Math.PI * 3 / qt * i * 20;
			contextSquare.strokeRect(i * fib, i * fib, Math.cos(radius) * 150, Math.cos(radius) * 150);
			if (i % 2 == 0) {
				contextSquare.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + "," + Math.floor(255 - 255 / qt * i) + ")";
			} else {
				contextSquare.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt * i) + "," + Math.floor(0 + 255 / qt * i) + ",255)";
			}
			contextSquare.rotate(2 * Math.PI * 3 / (qt - 1 / 3));
		}*/
		drawSquare(qt * 0.5);
	}
}

// var rand = document.getElementById("rand");
function getRandom() {
	var random = Math.random() * 10;
	random = Math.round(random);
	return random;
}

var drawFractalRound = document.getElementById("draw_round");

drawFractalRound.onclick = function() {
	drawRound(getRandom() * 10);
}

var drawFractalSquare = document.getElementById("draw_square");

drawFractalSquare.onclick = function() {
	drawSquare(getRandom() * 5);
}

var drawFractal = document.getElementById("add_fractal");

drawFractal.onclick = function() {
	addFractal(getRandom() * 10);
}

/* var clear = document.getElementById("clear");
clear.onclick = function() {
	contextSquare.fillRect(0, 0, canvasSquare.width, canvasSquare.height);
} */

if(false) {
	// Инициализация переменных
	var canvasTriangle    = document.getElementById("triangle");
	var contextTriangle       = canvasTriangle.getContext("2d");
	canvasTriangle.width  = 540;
	canvasTriangle.height = 480;
	contextTriangle.translate(240, 240);
	var x = canvasTriangle.width / 2;
	var y = canvasTriangle.height / 2;
	var ln    = 120;
	var minLn = 2;
	// var qt = 120;
	contextTriangle.lineWidth   = 1;
	contextTriangle.beginPath();
	contextTriangle.save();
	drawFractal1(120);
	// drawFractal1(60);
	drawFractalTriangle(55);
	// drawFractalTriangle(20);

	function drawFractal1(qt1) {
	  for (var i = 0; i < qt1; i++) {
	    contextTriangle.strokeRect(0, 0, 100, 133);
	    if (i % 2 == 0) {
	      contextTriangle.strokeStyle = "rgb(0," + Math.floor(255 - 255 / qt1 * i) + "," + Math.floor(255 - 255 / qt1 * i) + ")";
	    } else {
	      contextTriangle.strokeStyle = "rgb(" + Math.floor(0 + 255 / qt1 * i) + "," + Math.floor(0 + 255 / qt1 * i) + ",255)";
	    }
	    contextTriangle.stroke();
	    contextTriangle.rotate(2 * Math.PI * 4 / (qt1 - 1));
	  // console.log(contextTriangle.strokeStyle);
	  }

	  for (var i = 0; i < qt1; i++) {
	    contextTriangle.strokeRect(0, 0, 45, 45);
	    if (i % 2 == 0) {
	      contextTriangle.strokeStyle = "rgb(0," + Math.floor(0 + 255 / qt1 * i) + "," + Math.floor(255 - 255 / qt1 * i) + ")";
	      contextTriangle.stroke();
	    } else {
	      contextTriangle.strokeStyle = "rgb(" + Math.floor(0 + 255 / qt1 * i) + "," + Math.floor(255 - 255 / qt1 * i) + ",0)";
	      contextTriangle.stroke();
	    }
	    contextTriangle.rotate(2 * Math.PI * 4 / (qt1 - 1));
	  }
	}

	function drawFractalTriangle(qt1) {
		if (qt1 > 50) {
			for (var i = 0; i < qt1; i++) {
				contextTriangle.moveTo(240,40);
				contextTriangle.lineTo(40,240);
				contextTriangle.lineTo(440,240);
				contextTriangle.lineTo(240,40);
				contextTriangle.stroke();
				if (i % 2 == 0) {
					// contextTriangle.strokeStyle = "rgb(0," + Math.floor(255 - 255 / qt1 * i) + "," + Math.floor(255 - 255 / qt1 * i) + ")";
				} else if (i % 3 == 0) { 
					contextTriangle.strokeStyle = "rgb(," + Math.floor(0 + 255 / qt1 * i) + "0," + Math.floor(0 + 255 / qt1 * i) + ")";
				} else  { 
					contextTriangle.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt1 * i) + "," + Math.floor(0 + 255 / qt1 * i) + ",0)";
				}
				contextTriangle.stroke();
				contextTriangle.rotate(2 * Math.PI * 4 / (qt1 - 1));
	    		// contextTriangle.scale(0.5);
			}
		} else {
			for (var i = 0; i < qt1; i++) {
				contextTriangle.moveTo(240,40);
				contextTriangle.lineTo(40,240);
				contextTriangle.lineTo(440,240);
				contextTriangle.lineTo(240,40);
				contextTriangle.stroke();
				if (i % 2 == 0) {
					contextTriangle.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt1 * i) + "0," + Math.floor(255 - 255 / qt1 * i) + ")";
				} else if (i % 3 == 0) { 
					contextTriangle.strokeStyle = "rgb(0," + Math.floor(0 + 255 / qt1 * i) + "," + Math.floor(0 + 255 / qt1 * i) + ")";
				} else  { 
					contextTriangle.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt1 * i) + "," + Math.floor(0 + 255 / qt1 * i) + "," + Math.floor(255 - 255 / qt1 * i) + ")";
				}
				contextTriangle.stroke();
				contextTriangle.rotate(2 * Math.PI * 4 / (qt1 - 1));
	    		// contextTriangle.scale(0.5);
			}
		}
	}


	var colorsArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	var color = new Array(6);
	var setColor, fullColor, setColorBg, fullColorBg;

	function setC() {
		color[0] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
		color[1] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
		color[2] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
		color[3] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
		color[4] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
		color[5] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
		var stringColor = color.toString();
		setColor = stringColor.replace(/,/g, '');
		fullColor = '#' + setColor;
		canvasTriangle.style.borderColor = fullColor;

		return fullColor;
	}
	setInterval(setC, 100);
}