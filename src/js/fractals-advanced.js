var dateStart = new Date().getTime();

/*Fractals*/
$(document).ready(function() {

	var canvas = document.getElementById('fractal-area');
	var ctx = canvas.getContext('2d');

	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;

	ctx.strokeStyle = getRandomRgbColor();
	ctx.fillStyle = getRandomRgbColor();

	var fractalCenterX = canvasWidth / 2;
	var fractalCenterY = canvasHeight / 2;


	ctx.translate(fractalCenterX, fractalCenterY);

	/*
	*	Fractals settings
	*/
	var orbitRadius = $('.orbit-radius'),
		trianglePointQuantity = $('.triangle-point-quantity'),
		fractalQuantity = $('.fractal-quantity'),
		fractalRadius = $('.fractal-radius'),
		triangleRadius = $('.triangle-radius'),
		shapeRadius = $('.shape-radius'),
		drawRoundFractalButton = $('.draw'),
		clear = $('.clear'),
		spiral = $('.spiral'),
		orbitRadiusValue = $('.orbit-radius-value'),
		trianglePointQuantityValue = $('.triangle-point-quantity-value'),
		fractalQuantityValue = $('.fractal-quantity-value'),
		fractalRadiusValue = $('.fractal-radius-value'),
		triangleRadiusValue = $('.triangle-radius-value'),
		shapeRadiusValue = $('.shape-radius-value')
		;


	orbitRadius.attr('max', canvasWidth / 2);

	orbitRadiusValue.text(orbitRadius.val());
	trianglePointQuantityValue.text(trianglePointQuantity.val());
	fractalQuantityValue.text(fractalQuantity.val());
	fractalRadiusValue.text(fractalRadius.val());
	triangleRadiusValue.text(triangleRadius.val());
	shapeRadiusValue.text(shapeRadius.val());

	// ctx.translate(0 - +orbitRadius.val() * 3, 0);

	$('.clear').click(function() {
		// ctx.translate(0, 0);
		ctx.clearRect(0 - fractalCenterX, 0 - fractalCenterY, canvasWidth, canvasHeight);
		// ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	});

	drawRoundFractalButton.click(function() {
		// ctx.moveTo(fractalCenterX + ((fractalRadius + shapeRadius) * 2), fractalCenterY + ((fractalRadius + shapeRadius) * 2));
		// drawOrbit(orbitRadius.val(), trianglePointQuantity.val());
		// drawRoundFractal(fractalRadius.val(), fractalQuantity.val());
		// ctx.translate(0 - +orbitRadius.val() * 3, 0);
		drawRoundFractal(orbitRadius.val(), fractalQuantity.val());
		ctx.strokeStyle = getRandomRgbColor();
		// ctx.translate(0 + +orbitRadius.val() * 3, 0);
	});

	$('.draw-triangle-fractal').click(function() {
		drawTriangle(trianglePointQuantity.val());
		ctx.strokeStyle = getRandomRgbColor();
	});

	$('input').change(function() {
		// drawOrbit(orbitRadius.val(), trianglePointQuantity.val());
		orbitRadiusValue.text(orbitRadius.val());
		trianglePointQuantityValue.text(trianglePointQuantity.val());
		fractalQuantityValue.text(fractalQuantity.val());
		fractalRadiusValue.text(fractalRadius.val());
		triangleRadiusValue.text(triangleRadius.val());
		shapeRadiusValue.text(shapeRadius.val());
		ctx.strokeStyle = getRandomRgbColor();
	});

	$('.draw-spiral').click(function() {
		drawSpiral(orbitRadius.val());
	});


	
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function getRandomRgbColor() {
		var color = '';
		return 'rgb(' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ')';
	}

	function changeColor(q, i) {
		var r = Math.floor(255 - (255 / q * i));
		var g = Math.floor(0 + (255 / q * i));
		var b = Math.floor(255 - (255 / q * i));
		var col1 = 'rgb(' + r + ',' + g + ',' + getRandomInt(0, 255) + ')';
		var col2 = 'rgb(' + r + ',' + getRandomInt(0, 255) + ',' + b + ')';
		var col3 = 'rgb(' + getRandomInt(0, 255) + ',' + g + ',' + b + ')';
		var colors = [col1, col2, col3];
		// console.log(colors[getRandomInt(0, 2)]);
		return colors[getRandomInt(0, 2)];
	}

	// orbit, point
	// shape on orbit in point
	// fractal

	function getAngle(q) {
		var angle = 360 / q;
		return (Math.PI / 180) * angle;
	}

	function getPointCenterX(radius, quantity, iterationNumber, centerX) {
		var x = radius * Math.sin(getAngle(quantity) * iterationNumber);
		return x;
	}

	function getPointCenterY(radius, quantity, iterationNumber, centerY) {
		var y = radius * Math.cos(getAngle(quantity) * iterationNumber);
		return y;
	}

	function getCoords(radius, quantity, iterationNumber, centerX, centerY) {
		var x = Math.round(centerX + radius * Math.sin(getAngle(quantity) * iterationNumber));
		var y = Math.round(centerY + radius * Math.cos(getAngle(quantity) * iterationNumber));
		var coords = {
			x : x,
			y : y
		};
		return coords;
	}

	function getArrayPoints(radius, quantity) {
		// ctx.translate(fractalCenterX, fractalCenterY);
		var array = [];
		for(var i = 0; i < quantity; i++) {
			
			var coords = {
				x : Math.round(getPointCenterX(radius, quantity, i)),
				y : Math.round(getPointCenterY(radius, quantity, i))
			};
			console.log(coords.x, coords.y);
			// var coords = getCoords(radius, quantity, i, canvasWidth / 2, canvasHeight / 2);
			console.log(coords);
			array.push(coords);
		}
		console.log(array);
		return array;
	}

	function drawOrbitPart(centerX, centerY, radius) {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
	}

	function drawOrbit(centerX, centerY, all) {
		ctx.translate(centerX, centerY);
		// ctx.translate(getPointCenterX(fractalRadius.val(), fractalQuantity.val(), i), getPointCenterY(fractalRadius.val(), fractalQuantity.val(), i));
		// console.log(centerX, centerY);
		for(var i = 0; i < all; i++) {
			// ctx.translate(getPointCenterX(fractalRadius.val(), fractalQuantity.val(), i), getPointCenterY(fractalRadius.val(), fractalQuantity.val(), i));
			drawOrbitPart(getPointCenterX(fractalRadius.val(), fractalQuantity.val(), i), getPointCenterY(fractalRadius.val(), fractalQuantity.val(), i), shapeRadius.val());
			drawTriangle(trianglePointQuantity.val());
			// ctx.strokeStyle = getRandomRgbColor();
			// ctx.strokeStyle = changeColor(all, i);
			/*var color = 'rgb(' + Math.floor(255 - (255 / all * i)) + ',' + Math.floor(0 + (255 / all * i)) + ',' + getRandomInt(0, 255) + ')';
			ctx.strokeStyle = color;*/
		}
	}

	function drawRoundFractal(fractalRadius, fractalQuantity) {
		var array = getArrayPoints(fractalRadius, fractalQuantity);
		// console.log(array);
		for(var i = 0; i < fractalQuantity; i++) {
			// var x = getPointCenterX(fractalRadius, fractalQuantity, i);
			// var y = getPointCenterY(fractalRadius, fractalQuantity, i);
			// var x = getPointCenterX(orbitRadius.val(), fractalQuantity, i);
			// var y = getPointCenterY(orbitRadius.val(), fractalQuantity, i);
			
			// console.log(x, y, typeof q, typeof trianglePointQuantity.val(), typeof fractalQuantity);
			
			// drawOrbit(x, y, fractalQuantity);
			drawOrbit(array[i].x, array[i].y, fractalQuantity);
			// drawTriangle(fractalQuantity);
			ctx.strokeStyle = changeColor(fractalQuantity, i);
		}
		ctx.moveTo(0, 0);
	}

	/*function drawTrianglePart(angle, size) {
		// ctx.translate(centerX, centerY);
		ctx.beginPath();
		ctx.moveTo(circlePointX, circlePointY);
		ctx.lineTo(circlePointX, circlePointY - size);
		ctx.lineTo(circlePointX - size, circlePointY + size);
		ctx.lineTo(circlePointX + size, circlePointY);
		ctx.closePath();
		ctx.rotate(angle);
		ctx.stroke();
	}*/

	function drawTrianglePart(angle, size, circlePointX, circlePointY) {
		// ctx.translate(centerX, centerY);
		ctx.beginPath();
		ctx.moveTo(circlePointX, circlePointY);
		ctx.lineTo(circlePointX, circlePointY - size * 1.3);
		ctx.lineTo(circlePointX - size * 1.3, circlePointY + size * 1.3);
		ctx.lineTo(circlePointX + size * 1.3, circlePointY);
		ctx.closePath();
		ctx.rotate(angle * 1.3);
		ctx.stroke();
	}

	function drawTriangle(all) {
		var angle = 360 / all;
		var radians = (Math.PI / 180) * angle;
		for(var i = 0; i < all; i++) {
			circlePointX = Math.sin(radians);
			circlePointY = Math.cos(radians);
			// console.log(circlePointX + " " + circlePointY);
			drawTrianglePart(radians * angle, triangleRadius.val(), circlePointX, circlePointY);
			ctx.strokeStyle = changeColor(all, i);
		}
	}


	

	/*записываете r = k*phi
	x = r*cos(phi)
	y = r*sin(phi)

	предположим точек N*/
	/*var N = 100, phi, some_const = 1, r, k, x, y;
	for(i=0;i!=N;++i){
		phi = i*some_const;
		r = k*i;
		x = r*cos(phi)
		y = r*sin(phi)
		ctx.lineTo(x, y);
	}
	ctx.stroke();*/

	/*context.moveTo(start_x, start_y)
	context.beginPath()      

	for (angle = 0; angle < Math.PI*6; angle = angle+0.01) {

		x = start_x + (a + b * Math.pow(angle, p)) * Math.cos(angle)
		y = start_y + (a + b * Math.pow(angle, p)) * Math.sin(angle)

		context.lineTo(x, y)
	}

	context.lineWidth = 0.25;
	context.strokeStyle = "#fff"
	context.stroke() */


	
	/*function drawSpiral(r) {
		var dr = -0.1, k = 0.2, shiftX = 100, shiftY = 100;
		while (r > 0) {
			var x = r * Math.cos(k * r),
			y = r * Math.sin(-k * r);
			console.log(x + ' ' + y);
			x += shiftX;
			y += shiftY;
			ctx.lineTo(x, y);
			r += dr;  
		}
		ctx.stroke();
	}*/

	/*var r = 100, dr = -0.1, k = 0.4,
	shiftX = 100, shiftY = 100;
	while (r > 0) {
		var x = r * Math.cos(k * r),
		y = r * Math.sin(-k * r);
		var div = document.createElement('div');
		div.className = 'dot';
		div.style.left = x + shiftX + 'px';
		div.style.top = y + shiftY + 'px';
		document.body.appendChild(div);
		r += dr;  
	}*/

});

$(window).load(function() {

	// console.log(new Date().getTime() - dateStart);

});

