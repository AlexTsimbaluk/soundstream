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
			<div class="trackTitle currentTrackTitle">
				{{ title }}
			</div>
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
				<li><a href="sql/db_queries.php" class="runSql">SQL</a></li>
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
		
		<!-- <canvas id="canvas-audio-source"></canvas>
		<canvas id="canvas-audio-source-eq2"></canvas> -->
		<canvas id="canvas-audio-source-eq3" width="288" height="20"></canvas>
		
		<?php
	        include_once 'layouts/nav-player.php';
	    ?>
	</div>

	<div class="playlistsPanel">
		<!-- <div class="list"> -->
		<div class="list vmPlaylistsPanel">
			<div
				class="playlist sortable flex left child-center"
				data-name="Default"
				data-current="1"
				v-for="(playlist, index) in playlistsOrder"
				:data-scroll-left="index * plWidth"
				:data-current="playlist == curPl"
				:data-name="playlist"
				
			>
				<div class="vmDelete vmAction  size-4">x</div>
				<div class="vmTitle  size-16">{{ playlist }}</div>
				<div class="vmEdit vmAction  size-4">...</div>
			</div>
		</div>

		<ul class="nav">
			<!-- <li>
				<button class="playlist-control playlist-prev">
					<i class="fa fa-angle-left"></i>
				</button>
			</li>
			<li>
				<button class="playlist-control playlist-next">
					<i class="fa fa-angle-right"></i>
				</button>
			</li> -->
			<li>
				<button class="playlist-control playlist-new">
					<i class="fa fa-plus"></i>
				</button>
			</li>
		</ul>
	</div>

	<div class="playlistContainer"></div>

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

<canvas id="canvas-audio-source"></canvas>
<canvas id="canvas-audio-source-eq2"></canvas>


<audio id="playerTag" data-audio-api></audio>

<!-- <span class="currentTrackTitle">
	{{ title }}
</span> -->


<!-- <audio class="walmer hidden" src="http://ml1.t4e.dj:80/dublovers_high.aac" controls></audio> -->
<!-- <audio class="walmer hidden" src="http://stream1.ml0.t4e.dj:80/dublovers_high.mp3|DubLovers.FM|Dubstep+Drumstep|DE|128" controls></audio> -->