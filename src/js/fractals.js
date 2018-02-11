/*
	Фрактал на кривых
*/

/* var hour = document.getElementById("hours");
var minute = document.getElementById("minutes");
var second = document.getElementById("seconds");

setInterval(function() {
	var date = new Date();
	if (hour < 10) hours = "0" + hour;
	if (minute < 10) minutes = "0" + minute;
	if (second < 10) seconds = "0" + second;
	hour.innerHTML = date.getHours();
	minute.innerHTML = date.getMinutes();
	second.innerHTML = date.getSeconds();
},
1000); */


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
// contextSquare.fillStyle   = "#fff";
contextSquare.lineWidth   = 1;
// contextSquare.fillRect(0, 0, canvasSquare.width, canvasSquare.height);
contextSquare.beginPath();
contextSquare.save();
// drawFractal(120);
// contextSquare.stroke();

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
			console.log(getRandom(), qt / 3);
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
			console.log(getRandom(), qt * fib / 3, radius);
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

/* rand.onclick = function() {
	console.log(getRandom());
} */

var drawFractalRound = document.getElementById("draw_round");
drawFractalRound.onclick = function() {
	console.log(getRandom());
	drawRound(getRandom() * 10);
}

var drawFractalSquare = document.getElementById("draw_square");
drawFractalSquare.onclick = function() {
	console.log(getRandom());
	drawSquare(getRandom() * 5);
}

var drawFractal = document.getElementById("add_fractal");
drawFractal.onclick = function() {
	console.log(getRandom());
	addFractal(getRandom() * 10);
}

/* var clear = document.getElementById("clear");
clear.onclick = function() {
	contextSquare.fillRect(0, 0, canvasSquare.width, canvasSquare.height);
} */

  
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
drawFractal1(60);
drawFractalTriangle(55);
drawFractalTriangle(20);
// drawKohLeg();

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



var canvasKoh    = document.getElementById("koh");
var contextKoh       = canvasKoh.getContext("2d");
canvasKoh.width  = 640;
canvasKoh.height = 640;
var x = canvasKoh.width / 2;
var y = canvasKoh.height / 2;
contextKoh.translate(x, y);
var ln    = 50;
var minLn = 2;
contextKoh.lineWidth   = 1;

// drawKohLeg(1);

function drawKohLeg(n) {
	if (n >= 0) {
		var canvasKoh    = document.getElementById("koh");
		var contextKoh       = canvasKoh.getContext("2d");
		contextKoh.moveTo(0-ln,0);
		contextKoh.lineTo(0,0);
		contextKoh.rotate(Math.PI / 1.5);
		// console.log(2 * Math.PI / (n - 1));
		drawKohLeg(n - 1);	
	}
}


	/* for (var i = 0; i < n; i++) {
		if (i % 2 == 0) {
			contextKoh.strokeStyle = "rgb(" + Math.floor(255 - 255 / n * i) + "0," + Math.floor(255 - 255 / n * i) + ")";
		} else if (i % 3 == 0) { 
			contextKoh.strokeStyle = "rgb(0," + Math.floor(0 + 255 / n * i) + "," + Math.floor(0 + 255 / n * i) + ")";
		} else  { 
			contextKoh.strokeStyle = "rgb(" + Math.floor(255 - 255 / n * i) + "," + Math.floor(0 + 255 / n * i) + "," + Math.floor(255 - 255 / n * i) + ")";
		}
		contextKoh.rotate(2 * Math.PI * 5 / (n - 1));
		// contextKoh.scale(0.5);
	} */
	

// initKoh();



// Снежинка Коха
// alpha = 60 deg or Math.PI / 3
	

/*
 *	function degToRad(alpha) {
 *		return alpha * Math.PI / 180;
 *	}
 */

var cos = 0.5,
	sin = Math.sqrt(3) / 2,
	canv, ctx;

function rotate(x0, y0, x, y, alpha) {
	var cos = Math.cos(alpha),
		sin = Math.sin(alpha);

	return {
		x: x0 + (x - x0) * cos - (y - y0) * sin,
		y: y0 + (y - y0) * cos + (x - x0) * sin
	};
}

function drawKochCurve(x1, y1, x2, y2, n) {
	if (n > 0) {
		var xn1 = (2 * x1 + x2) / 3,
			yn1 = (2 * y1 + y2) / 3,
			xn3 = (x1 + 2 * x2) / 3,
			yn3 = (y1 + 2 * y2) / 3,
			
			xn2 = xn1 + (xn3 - xn1) * cos + (yn3 - yn1) * sin,
			yn2 = yn1 + (yn3 - yn1) * cos - (xn3 - xn1) * sin;
		
		n--;
		drawKochCurve(x1, y1, xn1, yn1, n);
		drawKochCurve(xn1, yn1, xn2, yn2, n);
		drawKochCurve(xn2, yn2, xn3, yn3, n);
		drawKochCurve(xn3, yn3, x2, y2, n);
	} else {
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
	}
}

function drawKochSnowflake(cx, cy, a, n) {
	var tr = getEquilateralTriangle(canv.width / 2, canv.height / 2, a, -Math.PI / 12);
	drawKochCurve(tr[0].x, tr[0].y, tr[1].x, tr[1].y, n);
	drawKochCurve(tr[1].x, tr[1].y, tr[2].x, tr[2].y, n);
	drawKochCurve(tr[2].x, tr[2].y, tr[0].x, tr[0].y, n);
}

function getEquilateralTriangle(cx, cy, a, alpha0) {
	if (typeof alpha0 === 'undefined') {
		alpha0 = 0;
	}
	var r = Math.sqrt(3) / 3 * a,
		points = [];
	
	points.push(rotate(cx, cy, cx + r, cy + r, alpha0));
	for (var i = 1; i < 3; i++) {
		points.push(rotate(cx, cy, cx + r, cy + r, alpha0 + 2 * Math.PI / 3 * i));
	}
	return points;
}

var canv = document.getElementById('canv');
window.onload = function () {
	ctx = canv.getContext('2d');
	canv.width  = 640;
	canv.height = 640;
	drawKochSnowflake(320, 240, 280, 5);
	ctx.stroke();
}



// Ковер Серпинского
/* var canvSerp, ctxSerp;
function draw(x, y, width, height, n) {
	if (n > 0) {
		ctxSerp.fillStyle = '#000000';
		ctxSerp.fillRect(x, y, width, height);
		ctxSerp.fillStyle = '#ffffff';
		ctxSerp.fillRect(x + width / 3, y + height / 3, width / 3, height / 3);
		
		n--;
		width /= 3;
		height /= 3;		
		
		draw(x, y, width, height, n);
		draw(x + width, y, width, height, n);
		draw(x + 2 * width, y, width, height, n);
		
		draw(x, y + height, width, height, n);
		draw(x + 2 * width, y + height, width, height, n);
		
		draw(x, y + 2 * height, width, height, n);
		draw(x + width, y + 2 * height, width, height, n);
		draw(x + 2 * width, y + 2 * height, width, height, n);
	}
}

window.onload = function () {
	canvSerp = document.getElementById('serp');
	ctxSerp = canvSerp.getContext('2d');
	canvSerp.width  = 640;
	canvSerp.height = 640;
	draw(120, 40, 400, 400, 5);
} */


var colorsArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
var color = new Array(6);
var setColor, fullColor, setColorBg, fullColorBg;

function setC() {
	// color[0] = colorsArray[3];
	// color[1] = colorsArray[3];
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
	canvasKoh.style.borderColor = fullColor;
	canv.style.borderColor = "#fff";
	// canvSerp.style.borderColor = "#fff";
	
	// console.log(fullColor);
	return fullColor;
}
setInterval(setC, 100);

function setBg() {
	// color[0] = colorsArray[13];
	// color[1] = colorsArray[13];
	// color[2] = colorsArray[13];
	// color[3] = colorsArray[13];
	color[0] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
	color[1] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
	color[2] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
	color[3] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
	color[4] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
	color[5] = colorsArray[Math.floor(Math.random() * colorsArray.length)];
	var stringColor = color.toString();
	setColorBg = stringColor.replace(/,/g, '');
	fullColorBg = '#' + setColorBg;
	/* hour.style.color = fullColor;
	minute.style.color = fullColor;
	second.style.color = fullColor; */
	// btn.style.color = fullColor;
	
	// console.log(fullColorBg);
	return fullColorBg;
}
setInterval(setBg, 100);

// function setRgbColor() {
//   contextSquare.strokeStyle = "rgb(0," + Math.floor(255-42.5*i) + "," + Math.floor(255-42.5*i) + ")";
//   contextSquare.stroke();
// }
// setInterval(setRgbColor, 100);

function setTreeColor() {
	contextSquare.strokeStyle = setC();
	contextTriangle.strokeStyle = setC();
	contextKoh.strokeStyle = setC();
	ctx.strokeStyle = setC();
	// contextSquare.stroke();
	// contextTriangle.stroke();
	contextKoh.stroke();
	ctx.stroke();
}
setInterval(setTreeColor, 100);

function setBgColor() {
	contextSquare.fillStyle = setBg();
	contextSquare.fillRect(0, 0, canvasSquare.width, canvasSquare.height);
}
// setInterval(setBgColor, 1000);

