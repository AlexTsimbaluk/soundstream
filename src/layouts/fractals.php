<canvas id="triangle"></canvas>

<div class="fractals hidden">
	
	<!-- Фрактал на кривых -->
	<canvas id="square"></canvas>
	
	<div class="controls-panel">
		<button id="draw_round" class="draw-fractal btn">DRAW ROUND</button>
		<button id="draw_square" class="draw-fractal btn">DRAW SQUARE</button>
		<button id="add_fractal" class="draw-fractal btn">ADD FRACTAL</button>
	</div>



	<!-- Fractals -->
	<div class="flex left fractals-advanced">
		<div class="fractal-settings size-6 flex top">
			<div class="">
				<p>Orbit radius</p>
				<input type="range" min = "1" step="1" value="100" class="orbit-radius">
				<span class="orbit-radius-value"></span>
				<p>Radius of shape on orbit</p>
				<input type="range" min = "1" max="100" step="1" value="33" class="shape-radius">
				<span class="shape-radius-value"></span>
				<p>Radius of fractal</p>
				<input type="range" min = "1" max="100" step="1" value="9" class="fractal-radius">
				<span class="fractal-radius-value"></span>
				<p>Quantity of fractal</p>
				<input type="range" min = "1" max="100" step="1" value="9" class="fractal-quantity">
				<span class="fractal-quantity-value"></span>
				<p>Quantity of points on orbit</p>
				<input type="range" min = "1" max="100" step="1" value="9" class="triangle-point-quantity">
				<span class="triangle-point-quantity-value"></span>
				
				<p>Radius of triangle</p>
				<input type="range" min = "1" max="250" step="1" value="20" class="triangle-radius">
				<span class="triangle-radius-value"></span>
				<!-- <span>Spiral</span>
				<input type="checkbox" class="spiral"> -->
			</div>

			<div class="flex left child-center button-panel">
				<button class="btn button draw">Draw fractal</button>
				<!-- <button class="draw-spiral">Draw spiral</button> -->
				<button class="btn button draw-triangle-fractal">Draw Tr-fractal</button>
				<button class="btn button clear">Clear</button>
			</div>
		</div>
		
		<div class="canvas-wrapper size-18">
			<canvas id="fractal-area" width="1000" height="570"></canvas>
		</div>
	</div>
</div>