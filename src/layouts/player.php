<!-- <div id="player" class="vmPlayer flex top overflow-sm-x overflow-md-x overflow-lg-x"> -->
<div id="player" class="vmPlayer">
	<div class="spinner">
		<div class="bounce1"></div>
		<div class="bounce2"></div>
		<div class="bounce3"></div>
	</div>

	<div class="overlayFull" data-visible="false"></div>

	<div class="console hidden">
		<button class="clearConsole">
			<div class="icon">not_interested</div>
		</button>
		
		<div class="consoleList mCustomScrollbar"></div>
	</div>

	<form action="" method="post" class="form-reg" novalidate>
		<input type="text" class="focus-right regLogin" name="regLogin" placeholder="Login">
		<div class="loginsUniq"></div>
		<input type="password" class="focus-right regPass" name="regPass" placeholder="Password">
		<input type="password" class="focus-right regPassEx" name="regPassEx" placeholder="Repeat Password">
		<button class="regSubmit">Register</button>
	</form>
	<div class="registration-bad"></div>


	<form action="" method="post" class="form-auth">
		<div class="errors"></div>
		<input type="text" class="focus-fade authLogin" name="authLogin" placeholder="Login">
		<input type="password" class="focus-fade authPass" name="authPass" placeholder="Password">
		<button class="authSubmit">Sign In</button>
	</form>

	<div class="successReg"></div>
	<div class="successAuth"></div>

	<div class="searchContainer mCustomScrollbar">
		<div class="close"><span class="icon">clear</span></div>
		<div class="result"></div>
	</div>

	<div class="trackContainer">
		<div class="overlay"></div>

		<div class="info">
			<div class="trackTitle currentTrackTitle">
				{{ title }}
			</div>
		</div>

		<div class="time">
			<span class="hours">00</span>
			<span class="minutes">00</span>
			<span class="seconds">00</span>
		</div>

		<div class="find flex left">
			<div class="size-16">
				<input type="text" class="js-search-station-input" placeholder="Search" />

				<input type="text" class="js-extra-mode-password" placeholder="Password" />
			</div>

			<div class="child-center size-4">
				<img class="showFieldSearch" src="img/icon-eye.png" alt="" title="Search station" />
			</div>

			<div class="child-center size-4">
				<img class="showAll" src="img/icon-list.png" alt="" title="Show all stations" />
			</div>
		</div>

		<div class="left animation-settings controls set-title">
			<!-- не будем рендерить то что нужно для разработки и не до конца реализованное -->
			<?php if(isset($_SESSION['dev'])) { ?>
				<label>
					<div class="downloadConfig config button btn" title="Download file with your configuration">
						<a href="config.txt" download class="iconWrapper">
							<span class="icon">file_download</span>
						</a>
					</div>
				</label>
				
				<label>
					<div class="showFormReg config button btn" data-form=".form-reg" title="Register">
						<div class="iconWrapper">
							<div class="icon">person_add</div>
						</div>
					</div>
				</label>
				
				<?php if(isset($_SESSION['auth'])) { ?>
					<label>
						<div class="logout config button btn" title="Logout">
							<div class="iconWrapper <?php echo $_SESSION['login']; ?>">
								<div class="icon">exit_to_app</div>
							</div>
						</div>
					</label>
				<?php } else { ?>
					<label>
						<div class="showFormSign config button btn" data-form=".form-auth" title="Sign in">
							<div class="iconWrapper">
								<div class="icon">forward</div>
							</div>
						</div>
					</label>
				<?php } ?>
				
				<?php if(isset($_SESSION['login'])) { ?>
					<p class="user-name">
						<?php echo $_SESSION['login'] ?>
					</p>
				<?php } ?>
			<?php } ?>

			



			<!-- кнопка для перевода текста -->
			<label>
				<div class="translate-text config button btn" title="Translate">
					<div class="iconWrapper">
						<div class="icon">translate</div>
					</div>
				</div>
			</label>

			<!-- войти в dev-режим -->
			<label>
				<div class="extra-mode config button btn">
					<div class="iconWrapper">
						<div class="icon">settings</div>
					</div>
				</div>
			</label>
		</div>

		<?php if(isset($_SESSION['dev'])) { ?>
		<?php } ?>

		<div class="flex left controls track-control">
			<div class="play button btn">
				<span class="inner js-animate"></span>
				<span class="outer js-animate"></span>
				
				<div class="iconWrapper">
					<div class="icon">play_arrow</div>
				</div>
			</div>
			<div class="stop button btn">
				<div class="iconWrapper">
					<div class="icon">stop</div>
				</div>
			</div>
			<div class="prev button btn">
				<div class="iconWrapper">
					<div class="icon">skip_previous</div>
				</div>
			</div>
			<div class="next button btn">
				<div class="iconWrapper">
					<div class="icon">skip_next</div>
				</div>
			</div>

			<div class="volume">
				<canvas id="canvas-volume" width="100" height="30"></canvas>
				<input class="hidden" type="range" min="0" max="100" step="1" />
				<span class="val"></span>
			</div>
		</div>
		
		<canvas id="analyserVisVolume" width="288" height="20"></canvas>
		
		<?php
		if(isset($_SESSION['dev'])) {
	        include_once 'layouts/nav-player.php';
	    }
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
				:key="index"
			>
				<div
					class="vmDelete vmAction size-5 chld-center"
					@click.prevent="deletePlaylist(index)"
				>
					<div class="icon">clear</div>
				</div>




				<!-- <div
					class="vmTitle size-16"
					v-if="!edited"
					@click.prevent="setCurrentPlaylist(index, playlist)"
				>
					{{ playlist }}
				</div>

				<div
					class="vmTitle size-16"
					v-if="edited"
				>
					<input type="text" v-model="playlistsOrder[index]" />
				</div> -->

				<div class="size-14">
					<div
						class="vmTitle"
						v-if="!edited"
						@click.prevent="setCurrentPlaylist(index, playlist)"
					>
						{{ playlist }}
					</div>

					<div
						class="vmEditTitle fill"
						v-if="edited"
					>
					<!-- <div
						class="vmEditTitle fill"
						v-if="playlistEdited == index"
					> -->
						<input
							class="fill"
							type="text"
							@input="editPlaylist(index, playlist, $event)"
							v-model="playlistsOrder[index]"
						/>
					</div>
				</div>




				
				<!-- <div
					class="vmEdit vmAction size-4"
					@click.prevent="changeEditMode(index, $event)"
				>
					<div class="icon">more_horiz</div>
				</div> -->

				<div
					class="vmEdit vmAction size-5 chld-center"
					@click.prevent="edited = !edited"
				>
					<div class="icon">more_horiz</div>
				</div>
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
				<button class="playlist-control playlist-new btn">
					<div class="icon">add</div>
				</button>
			</li>
		</ul>
	</div>


	<div class="playlistContainer grow-1 size-12"></div>

	<template class="template-track">
		<div class="track btn" data-station-id="@station_id" data-station-title="@station_title" data-station-url="@station_url">
			<div class="delete">
				<div class="icon">clear</div>
			</div>
			<div class="title"></div>
			<div class="url"></div>
		</div>
	</template>
</div>

<canvas id="visEqLeft"></canvas>
<canvas id="visEqRight"></canvas>
<canvas id="visTriangle"></canvas>
<canvas id="visFractal"></canvas>


<audio id="playerTag" data-audio-api></audio>

<!--
beatnbreaks
 http://stream.nauticradio.net:14280/
-->

<!-- <span class="currentTrackTitle">
	{{ title }}
</span> -->


<!-- <audio class="walmer hidden" src="http://ml1.t4e.dj:80/dublovers_high.aac" controls></audio> -->
<!-- <audio class="walmer hidden" src="http://stream1.ml0.t4e.dj:80/dublovers_high.mp3|DubLovers.FM|Dubstep+Drumstep|DE|128" controls></audio>