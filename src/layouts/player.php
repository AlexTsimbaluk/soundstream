<div id="player">

	<div class="spinner">
		<div class="bounce1"></div>
		<div class="bounce2"></div>
		<div class="bounce3"></div>
	</div>

	<div class="overlayFull"></div>

	<form action="" method="post" class="form-reg" novalidate>
		<input type="text" class="regLogin" name="regLogin" placeholder="Login">
		<div class="loginsUniq"></div>
		<input type="password" class="regPass" name="regPass" placeholder="Password">
		<input type="password" class="regPassEx" name="regPassEx" placeholder="Repeat Password">
		<button class="regSubmit">Register</button>
	</form>
	<div class="registration-bad"></div>


	<form action="" method="post" class="form-auth">
		<div class="errors"></div>
		<input type="text" class="authLogin" name="authLogin" placeholder="Login">
		<input type="password" class="authPass" name="authPass" placeholder="Password">
		<button class="authSubmit">Sign In</button>
	</form>

	<div class="successReg"></div>
	<div class="successAuth"></div>

	<div class="searchContainer mCustomScrollbar">
		<div class="close"><i class="fa fa-close"></i></div>
		<div class="result"></div>
	</div>

	<div class="trackContainer">
		<div class="overlay"></div>

		<div class="info" title="track">
			<div class="trackTitle"></div>
		</div>

		<div class="time">
			<span class="hours">00</span>
			<span class="minutes">00</span>
			<span class="seconds">00</span>
		</div>

		<div class="find">
			<input type="text" placeholder="Search" />
			<img class="showFieldSearch" src="img/icon-eye.png" alt="" title="Search" />
			<span></span>
			<img class="showAll" src="img/icon-list.png" alt="" title="Show all stations" />
			<span></span>
		</div>

		<!-- <div class="view"></div> -->

		<div class="userPanel">
			<ul class="userActions">
				<li><button class="showFormReg">Reg</button></li>
				<li><button class="showFormSign">Auth</button></li>
				<!-- <li><button class="userAction">user</button></li> -->
			</ul>
		</div>

		<div class="controls">
			<!-- <div class="play button"><span class="inner"></span><span class="outer"></span><div class="iconWrapper"><i class="fa fa-play"></i></div></div> -->
			<div class="play button"><div class="iconWrapper"><i class="fa fa-play"></i></div></div>
			<div class="stop button"><div class="iconWrapper"><i class="fa fa-stop"></i></div></div>
			<div class="prev button"><div class="iconWrapper"><i class="fa fa-step-backward"></i></div></div>
			<div class="next button"><div class="iconWrapper"><i class="fa fa-step-forward"></i></div></div>

			<div class="volume">
				<canvas id="canvas-volume" width="100" height="30"></canvas>
				<input class="hidden" type="range" min="0" max="100" step="1" />
				<span class="val"></span>
			</div>
			<!-- <div class="volumeVisualisation"></div> -->
		</div>

		
		<?php
	        include_once 'layouts/nav-player.php';
	    ?>
	</div>

	<div class="playlistsPanel">
		<div class="nav">
			<i class="fa fa-angle-left"></i>
			<i class="fa fa-angle-right"></i>
		</div>
	</div>

	<div class="playlistContainer mCustomScrollbar">
		
	</div>

	<template class="template-track">
		<div class="track" data-station-id="@station_id" data-station-title="@station_title" data-station-url="@station_url">
			<div class="delete">
				<i class="fa fa-minus"></i>
			</div>
			<div class="title">
				@station_title
			</div>
			<div class="url">
				@station_url
			</div>
		</div>
	</template>
</div>

<!-- <canvas id="canvas-eq"></canvas>
<audio id="analyser-source" controls></audio> -->


<canvas id="canvas" width="300" height="200"></canvas>
<audio id="playerTag"></audio>