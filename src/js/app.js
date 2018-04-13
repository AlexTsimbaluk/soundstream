'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var dateStart = new Date().getTime();

$.ajaxSetup({
	type: 'POST',
	url: 'actions.php',
	complete: function complete() {},
	statusCode: {
		200: function _(message) {},
		403: function _(jqXHR) {
			'use strict';

			var error = JSON.parse(jqXHR.responseText);
			$("body").prepend(error.message);
		}
	},
	error: function error(_error, xhr, status, errorThrown) {
		'use strict';

		consoleOutput('XHR error');
		console.log(_error);
	}
});

if (getParams().admin !== undefined) {
	$('body').addClass('admin');
} else {
	$('body').removeClass('admin');
}

function getParams() {
	'use strict';

	var $_GET = {};
	var __GET = window.location.search.substring(1).split("&");
	for (var i = 0; i < __GET.length; i++) {
		var getVar = __GET[i].split("=");
		$_GET[getVar[0]] = typeof getVar[1] == "undefined" ? "" : getVar[1];
	}
	return $_GET;
}

function d(str) {
	'use strict';

	$('.debug').html(str);
}
// Получение случайного числа в заданном диапазоне
function getRandomInt(min, max) {
	'use strict';

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Получение случайного цвета rgb
function getRandomRgbColor() {
	'use strict';
	// var color = '';

	return 'rgb(' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ')';
}

// Получение случайной строки
function getHash(size) {
	'use strict';

	var hash = '';
	for (var i = 0; i < size; i++) {
		hash += String.fromCharCode(getRandomInt(33, 127));
	}
	return hash;
}

$(document).ready(function () {
	'use strict';

	detectDevice();

	$(window).on('resize', function () {
		detectDevice();
	});

	$.material.init();

	/*Sortable plugin JQueryUI*/
	// $('.sortable').sortable({scroll: true});


	// Первоначальное случайное фоновое изображение для body
	$('body').css({ 'background': 'url("../img/bg/bg' + getRandomInt(1, 10) + '.jpg") no-repeat center / cover'
		// '.jpg") no-repeat center / auto 100%'
	});

	/*Slider for background*/
	$(function () {
		/*function compareRandom(a, b) {
  	return Math.random() - 0.5;
  }*/

		var imageArr = new Array(10);
		for (var i = 0; i < imageArr.length; i++) {
			var path = '/img/bg/bg' + (i + 1) + '.jpg';
			// consoleOutput(path);
			imageArr[i] = path;
		}
		// imageArr.sort(compareRandom);
		// consoleOutput(imageArr);

		$.mbBgndGallery.buildGallery({
			containment: "body",
			timer: 3000,
			effTimer: 11000,
			shuffle: true,
			effect: "fade",
			// folderPath:"/img/bg/",
			images: imageArr,

			onChange: function onChange(idx) {
				/*var effects = ['fade', 'zoom', 'slideUp', 'slideDown', 'slideRight', 'slideLeft'];
    var index = getRandomInt(0, effects.length);
    $.mbBgndGallery.changeEffect(effects[index]);*/
			}
		});
	});

	// mCustomScrollbar
	// Анимация кнопки "закрыть" при скроле блока с результатами поиска
	$('.searchContainer').mCustomScrollbar({
		callbacks: {
			onScroll: function onScroll() {
				animateCloseButton(this);
			}
		}
	});

	// определяем устройство
	function detectDevice() {
		console.log('::detectDevice');

		var width = $('body').width(),
		    height = $('body').height(),
		    screenWidth = screen.width,
		    screenHeight = screen.height,
		    ratio = Math.max(width, height) / Math.min(width, height),
		    screenRatio = Math.max(width, screenHeight) / Math.min(width, screenHeight),
		    device = '';

		$('body').removeAttr('data-smartphone').removeAttr('data-tab').removeAttr('data-desktop').removeAttr('data-smartphone-keyboard').removeAttr('data-console');

		if (height <= 736) {
			consoleOutput('height <= 736');
			if (ratio >= 1.01 && ratio < 1.25) {
				device = 'smartphone-keyboard';
				$('body').attr('data-smartphone-keyboard', 1);
			} else if (screenRatio >= 1.7 && screenRatio < 1.8 && ratio < 2) {
				// if(ratio >= 1.7 && ratio < 1.8) {
				device = 'smartphone';
				$('body').attr('data-smartphone', 1);
			} else {
				device = 'desktop';
				$('body').attr('data-desktop', 1);
				if (screenHeight - height > 115) {
					$('body').attr('data-console', 1);
				}
			}
		} else if (height <= 1024) {
			consoleOutput('height <= 1024');
			if (screenRatio >= 1.3 && screenRatio < 1.4) {
				device = 'tab';
				$('body').attr('data-tab', 1);
			} else {
				device = 'desktop';
				$('body').attr('data-desktop', 1);
				if (screenHeight - height > 115) {
					$('body').attr('data-console', 1);
				}
			}
		} else {
			device = 'desktop';
			$('body').attr('data-desktop', 1);
			if (screenHeight - height > 115) {
				$('body').attr('data-console', 1);
			}
		}
		consoleOutput(device);
		consoleOutput(width);
		consoleOutput(height);
		consoleOutput(screenHeight);
		consoleOutput(ratio);
		consoleOutput(screenRatio);

		$('body').attr('data-screen-width', width);
		$('body').attr('data-screen-height', height);
		$('body').attr('data-useragent', navigator.userAgent);
	}

	// Отобразить название станции при воспроизведении
	function displayState() {
		consoleOutput('function::displayState');
		var title = getCurrentTrack().title,
		    titleSize = title.length,
		    titleContainer = $('#player .info .trackTitle'),
		    maxWidth = 250,
		    maxSize,
		    titleContainerWidth,
		    ratio;

		// Поставим <title>
		$('title').html(title + '::RadioRA');

		// изменим свойство за которым следит Vue
		// vmCurrentTrackTitle.title = title;
		consoleOutput(title);

		/*consoleOutput(vmCurrentTrackTitle.title);
  consoleOutput(vmCurrentTrackTitle.trackTitle);
  vmCurrentTrackTitle.trackTitle = title;
  consoleOutput(vmCurrentTrackTitle.title);
  consoleOutput(vmCurrentTrackTitle.trackTitle);*/

		// titleContainer.html(title);

		titleContainer.removeClass('runningString').parent().css({ 'width': 'auto' });

		titleContainerWidth = titleContainer.width();
		ratio = titleContainerWidth / titleSize;
		maxSize = Math.floor(maxWidth / ratio) - 5;

		consoleOutput(titleContainerWidth);
		consoleOutput(titleContainer.text());

		/*if(titleContainerWidth > 220) {
  	if(window.innerWidth > 700) {
  		titleContainer.addClass('runningString')
  						.parent()
  						.css({'width':'220px'});
  	} else {
  		titleContainer.html(title.substr(0, maxSize) + '...');
  	}
  } else {
  	titleContainer.removeClass('runningString')
  					.parent()
  					.css({'width':'auto'});
  }*/

		titleContainer.addClass('runningString').parent().css({ 'width': '220px' });
	}

	// Конструктор объекта Playlist
	function Playlist(name, opts) {
		this.name = name;
		this.tracks = [];
		this.currentTrack = {};
		/*this.titleHtmlEl = 
  	'<div class="playlist sortable" data-name="' 	+
  	this.name 										+
  	'">'											+
  	this.name 										+
  	'</div>'
  ;
  	this.htmlEl = 
  	'<div class="playlist sortable" data-name="' 	+
  	this.name 										+
  	'"></div>'
  ;*/

		/*function getScroll() {
  	
  }*/

		playerState.currentPlaylist = this.name;
		playerState.playlistsOrder.push(this.name);

		__playlists[name] = this;

		localStorage.setItem('playerState', JSON.stringify(playerState));
		localStorage.setItem('__playlists', JSON.stringify(__playlists));
	}

	// класс для управления плейлистом
	// принимает имя плейлиста, которым будем управлять
	function PlaylistManager() {
		var self = this;

		this.templateTrack = $('.template-track').html();

		// функция для добавления плейлистов на панель
		this.addPanel = function (name) {
			$playlistsPanel.find('.list .mCSB_container').append($(__playlists[name].titleHtmlEl));

			var totalPl = $playlistsPanel.find('.playlist').length - 1;
			var plWidth = __playlists.playlistPanelWidth || $playlistsPanel.find('.playlist:first').innerWidth();

			var scrollLeft = plWidth * totalPl;

			$playlistsPanel.find('.playlist:last').attr('data-scroll-left', scrollLeft);
		};

		this.addTrackToPlaylist = function (trackId) {
			// var array = [];
			// array.push(trackId);
			var $track = self.makeTrack([trackId]);

			if (playlistContainer.hasClass('mCustomScrollbar')) {
				playlistContainer.find('.mCSB_container').append($track);
			} else {
				playlistContainer.append($track);
			}

			__playlists[playerState.currentPlaylist].tracks.push(+trackId);

			consoleOutput(__playlists);

			localStorage.setItem('__playlists', JSON.stringify(__playlists));
		};

		// метод возвращает jquery коллекцию эементов треков,
		// которая будет встроена в DOM методом this.makePlaylistTracks
		// принимает массив track_id
		this.makeTrack = function (tracksId) {
			var tracks = tracksId;

			var templateTrack = $('.template-track').html(),
			    tracksArray = [];
			// consoleOutput($(templateTrack));

			for (var i = 0; i < tracks.length; i++) {
				var track = stationsArray[tracks[i]];
				var $track = $(templateTrack);

				$track.attr('data-station-id', track.station_id);
				$track.attr('data-station-title', track.station_title);
				$track.attr('data-station-url', track.station_url);

				$track.find('.title').text(track.station_title);
				$track.find('.url').text(track.station_url);

				tracksArray.push($track);
			}
			console.log(tracksArray);

			return tracksArray;
		};

		// метод добавляет в текущий плейлист треки
		// принимает массив track_id
		this.makePlaylistTracks = function (tracksId) {
			var currentPlaylist = __playlists[playerState.currentPlaylist],
			    tracks = self.makeTrack(tracksId) // jquery collection 
			;

			if (playlistContainer.hasClass('mCustomScrollbar')) {
				playlistContainer.find('.mCSB_container').append(tracks);
			} else {
				playlistContainer.append(tracks);
			}

			/*for (var i = 0; i < tracks.length; i++) {
   	var $track = tracks[i];
   	if(playlistContainer.hasClass('mCustomScrollbar')) {
   		playlistContainer.
   			find('.mCSB_container').
   			append($track);
   	} else {
   		playlistContainer.append($track);
   	}
   }*/

			if (!playlistContainer.hasClass('mCustomScrollbar')) {
				$('.playlistContainer').mCustomScrollbar({
					// theme:"dark"
				});
			}
		};

		this.setCurrent = function (name, scrollPosition) {
			/*$('.playlistsPanel .list').
   	mCustomScrollbar('scrollTo', scrollPosition);*/

			$('.playlistsPanel').find('.list').mCustomScrollbar('scrollTo', $playlistsPanel.find('[data-current]').attr('data-scroll-left'));

			$playlistsPanel.find('[data-name="' + playerState.currentPlaylist + '"]').removeAttr('data-current');

			$playlistsPanel.find('[data-name="' + name + '"]').attr('data-current', 1);

			playerState.currentPlaylist = name;

			playlistContainer.find('.mCSB_container').children().remove();

			var tracksArray = __playlists[playerState.currentPlaylist].tracks;
			if (tracksArray.length) {
				self.makePlaylistTracks(tracksArray);
			}

			__playlists[playerState.currentPlaylist].scrollPosition = scrollPosition;

			localStorage.setItem('playerState', JSON.stringify(playerState));
			localStorage.setItem('__playlists', JSON.stringify(__playlists));
		};
	}

	// http://ianreah.com/2013/02/28/Real-time-analysis-of-streaming-audio-data-with-Web-Audio-API.html
	// https://dzone.com/articles/exploring-html5-web-audio - разделить каналы
	function Analyser(src, analyserOpts) {
		var self = this;
		var analyser = audioCtx.createAnalyser();
		analyser.smoothingTimeConstant = analyserOpts.smoothingTimeConstant || 0.7;
		analyser.fftSize = analyserOpts.fftSize || 512;

		src.connect(analyser);
		analyser.connect(audioCtx.destination);

		self.streamData = new Uint8Array(analyser.frequencyBinCount);

		var sampleAudioStream = function sampleAudioStream() {
			analyser.getByteFrequencyData(self.streamData);
			var total = 0;
			for (var i = 0; i < 80; i++) {
				total += self.streamData[i];
			}
		};

		var aInterval = setInterval(sampleAudioStream, 20);
	}

	// объект, который запускает и останавливает  функцию отрисовки звуковых данных из streamdata
	function DrawSound() {
		var self = this;
		var interval;

		self.getCtx = function (canvasId, width, height) {
			var canvas = new AudioCanvas(canvasId, width, height);
		};

		this.start = function (cb) {
			interval = requestAnimationFrame(cb);
		};
		this.stop = function (cb) {
			clearRequestAnimationFrame(cb);
		};
	}

	function AudioApiElement(audioElement) {
		var $playerTag = document.getElementById(audioElement);
		var self = this;

		var source = audioCtx.createMediaElementSource($playerTag);
		var analyserEqLeft, analyserEqRight, analyserVolume, analyserTriangle;
		analyserEqLeft = new Analyser(source, { smoothingTimeConstant: 0.2, fftSize: 1024 });
		analyserEqRight = new Analyser(source, { smoothingTimeConstant: 0.5, fftSize: 1024 });
		analyserVolume = new Analyser(source, { smoothingTimeConstant: 0.5, fftSize: 64 });
		analyserTriangle = new Analyser(source, { smoothingTimeConstant: 0.9, fftSize: 32 });

		this.streamDataEqLeft = analyserEqLeft.streamData;
		this.streamDataEqRight = analyserEqRight.streamData;
		this.streamDataVolume = analyserVolume.streamData;
		this.streamDataTriangle = analyserTriangle.streamData;

		audioBindAll($playerTag, 'AudioApiElement');

		this.visStart = function (visName) {
			switch (visName) {
				case 'visTriangle':
					this.streamDataTriangle = analyserTriangle.streamData;
					drawTriangle();
					break;
				case 'visEqLeft':
					this.streamDataEqLeft = analyserEqLeft.streamData;
					drawEqLeft();
					break;
				case 'visEqRight':
					this.streamDataEqRight = analyserEqRight.streamData;
					drawEqRight();
					break;
				case 'analyserVisVolume':
					this.streamDataVolume = analyserVolume.streamData;
					drawVisVolume();
					break;
				default:
					console.log('передано не canvas[id]');
			}
		};

		this.visStop = function (visName) {
			switch (visName) {
				case 'visTriangle':
					this.streamDataTriangle = null;
					break;
				case 'visEqLeft':
					this.streamDataEqLeft = null;
					break;
				case 'visEqRight':
					this.streamDataEqRight = null;
					break;
				case 'analyserVisVolume':
					this.streamDataVolume = null;
					break;
				default:
					console.log('передано не canvas[id]');
			}
		};

		this.playStream = function (streamUrl) {
			consoleOutput('AudioApiElement::playStream::Begin');
			consoleOutput(streamUrl);

			// jquery-объект трека, который надо играть
			var currentTrackEl = $('[data-station-url="' + streamUrl + '"]');

			var posLeft;
			if (currentTrackEl.length) {
				posLeft = currentTrackEl.position().top;
			} else {
				posLeft = 0;
			}

			$('.playlistContainer').mCustomScrollbar('scrollTo', posLeft);

			// при старте воспроизведения
			// удалим у всех треков атрибут data-current-track
			currentTrackEl.
			// closest('.playlist').
			parent().find('[data-current-track]').removeAttr('data-current-track');

			consoleOutput(currentTrackEl);

			// а затем установим data-current-track нужному треку
			currentTrackEl.attr('data-current-track', 1);

			// Соберем временный объект для удобства
			var _currentTrack = {
				url: currentTrackEl.attr('data-station-url'),
				title: currentTrackEl.attr('data-station-title'),
				id: currentTrackEl.attr('data-station-id'),
				scrollPosition: posLeft
			};

			// Изменим объект состояния
			/*playerState.playlists[getCurrentPlaylist()].currentTrack =
   													_currentTrack;*/

			__playlists[getCurrentPlaylist()].currentTrack = _currentTrack;
			// vmCurrentTrackTitle.title = _currentTrack.title;

			$playerTag.src = streamUrl;
			$playerTag.crossOrigin = 'anonymous';
			setTimeout(function () {
				$playerTag.crossOrigin = 'anonymous';
			}, 3000);

			var playPromise = $playerTag.play();
			// $(".spinner").show();

			// В конце if проверить PromiseStatus, если он rejected
			if (playPromise !== undefined) {
				/*playPromise.then(function() {
    	consoleOutput('Promise::Automatic playback started!');
    	$(".spinner").hide();
    }).catch(function(error) {
    	$(".spinner").hide();
    	consoleOutput('Promise::Automatic playback failed...');
    	consoleOutput(error);
    	self.stopStream();
    	$('.playlistContainer .track[data-current-track]').
    	removeAttr('data-current-track');
    });*/

				playPromise.then(function () {
					consoleOutput('AudioApiElement::playPromise::Success::Begin');
					consoleOutput('AudioApiElement::playPromise::Success::End');
				}).catch(function () {
					consoleOutput('AudioApiElement::playPromise::Failed::Begin');

					self.stopStream();

					audioCbElement.playStream(streamUrl);
					consoleOutput('Start audioCbElement');
					consoleOutput('AudioApiElement::playPromise::Failed::End');
				});
			}

			playerState.paused = $playerTag.paused;
			// playerState.playingTrack = _currentTrack;
			// playerState.lastActivePlaylist = playerState.currentPlaylist;

			// vmCurrentTrackTitle.trackTitle = playerState.playingTrack.title;
			// vmCurrentTrackTitle.trackTitle = _currentTrack.title;

			if (!playerState.nowPlaying.playlistName) {
				playerState.nowPlaying.playlistName = playerState.currentPlaylist;
				playerState.nowPlaying.track = _currentTrack;
			} else if (playerState.nowPlaying.playlistName == playerState.currentPlaylist) {
				playerState.nowPlaying.track = _currentTrack;
			} else if (playerState.nowPlaying.playlistName != playerState.currentPlaylist) {
				consoleOutput('pppp');
				playerState.nowPlaying.playlistName = playerState.currentPlaylist;
				playerState.nowPlaying.track = _currentTrack;
			}
			// __playlists.nowPlaying.playlistName = playerState.currentPlaylist;

			localStorage.setItem('playerState', JSON.stringify(playerState));
			localStorage.setItem('__playlists', JSON.stringify(__playlists));

			if (playerState.visualisations['visEqLeft'].state) {
				drawEqLeft();
			}
			if (playerState.visualisations['visEqRight'].state) {
				drawEqRight();
			}
			if (playerState.visualisations['analyserVisVolume'].state) {
				drawVisVolume();
			}
			if (playerState.visualisations['visTriangle'].state) {
				drawTriangle();
			}
			if (playerState.visualisations['allEnabled'].state) {
				drawEqLeft();
				drawEqRight();
				drawVisVolume();
				drawTriangle();
			}

			consoleOutput('AudioApiElement::playStream::End');
			// TODO: добавить на играющий трек эквалайзер
		};
		// TODO: добавить сюда остановку анимации
		this.stopStream = function () {
			visualisationStop();
			$('#player .play').removeClass('visualisation');

			// playerState.playingTrack = {};
			vmCurrentTrackTitle.title = '';

			$('#player .info .trackTitle').html('').removeClass('runningString').parent().css({ 'width': 'auto' });

			$playerTag.pause();

			audioCbElement.stopStream();
			// $playerTag.currentTime = 0;
			// playerState.paused = $playerTag.paused;
			consoleOutput('AudioApiElement::stopStream');
			localStorage.setItem('playerState', JSON.stringify(playerState));
		};
		this.setVolume = function (vol) {
			$playerTag.volume = vol;
		};
		this.getVolume = function () {
			return $playerTag.volume;
		};
	}

	// Фолбэк если не срабатывает Audio API
	function AudioCbElement() {
		var player = new Audio();

		audioBindAll(player, 'AudioCbElement');

		this.playStream = function (streamUrl) {
			consoleOutput('AudioCbElement::playStream::Begin');
			player.src = streamUrl;

			player.play();
			// $(".spinner").show();

			consoleOutput(player.paused);
			playerState.paused = player.paused;

			localStorage.setItem('playerState', JSON.stringify(playerState));
			consoleOutput('AudioCbElement::playStream::End');
		};
		this.stopStream = function () {
			visualisationStop();
			$('#player .play').removeClass('visualisation');
			$('#player .info .trackTitle').html('').removeClass('runningString').parent().css({ 'width': 'auto' });

			player.pause();
			player.currentTime = 0;
			playerState.paused = player.paused;
			consoleOutput('AudioCbElement::stopStream');
			localStorage.setItem('playerState', JSON.stringify(playerState));
		};
		this.setVolume = function (vol) {
			player.volume = vol;
		};
		this.getVolume = function () {
			return player.volume;
		};
	}

	// https://developer.mozilla.org/ru/docs/Web/Guide/Events/Media_events
	function audioBindProgress(player, name) {
		player.addEventListener('progress', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
	}

	function audioBindVolume(player, name) {
		player.addEventListener('volumechange', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
	}

	function audioBindAll(player, name) {
		player.addEventListener('abort', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
			$(".spinner").hide();
		});
		player.addEventListener('canplay', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('canplaythrough', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('durationchange', function (e) {
			// consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('emptied', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
			$(".spinner").hide();
		});
		player.addEventListener('encrypted', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('ended', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('error', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
			$(".spinner").hide();
			// if(!$('.track.visualisation').length) {
			if (playerState.paused) {
				consoleOutput('paused');
				$('.track.waiting').removeClass('waiting').addClass('error-playing');
			} else {
				consoleOutput('это невозможно');
			}
		});
		player.addEventListener('interruptbegin', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('interruptend', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('loadeddata', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('loadedmetadata', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('loadstart', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('mozaudioavailable', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('pause', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);

			consoleOutput('pause::' + player.paused);
			player.currentTime = 0;
			playerState.paused = player.paused;

			visualisationStop();
		});
		player.addEventListener('play', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
			$(".spinner").show();
			$('[data-current-track]').addClass('waiting');
		});
		player.addEventListener('playing', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);

			consoleOutput('pause::' + player.paused);
			playerState.paused = player.paused;

			$(".spinner").hide();

			if ($('[data-current-track]').hasClass('waiting')) {
				$('[data-current-track]').removeClass('waiting');
			}
			if ($('[data-current-track]').hasClass('error-playing')) {
				$('[data-current-track]').removeClass('error-playing');
			}

			visualisation();

			consoleOutput(getCurrentTrack().title);

			consoleOutput(vmCurrentTrackTitle.title);
			consoleOutput(vmCurrentTrackTitle.trackTitle);
			vmCurrentTrackTitle.trackTitle = getCurrentTrack().title;
			consoleOutput(vmCurrentTrackTitle.title);
			consoleOutput(vmCurrentTrackTitle.trackTitle);

			displayState();
		});
		player.addEventListener('ratechange', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('seeked', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('seeking', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('timeupdate', function (e) {
			var time = Math.ceil(player.currentTime);

			var sec = ('0' + parseInt(Math.floor(time % 60))).slice(-2);
			var min = ('0' + parseInt(Math.floor(time / 60) % 60)).slice(-2);
			$('#player .time .hours').html();
			$('#player .time .minutes').html(min);
			$('#player .time .seconds').html(sec);
		});
		player.addEventListener('stalled', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
			$(".spinner").hide();
		});
		player.addEventListener('suspend', function (e) {
			// consoleOutput(name + '::Event.type::' + e.type);
		});
		player.addEventListener('waiting', function (e) {
			consoleOutput(name + '::Event.type::' + e.type);
		});
	}

	/*
 Media Events
  AudioApiElement
 воспроизведение (player.play()) началось успешно после остановки (player.stop())
 abort
 emptied
 play
 waiting
 loadstart
 durationchange
 loadedmetadata
 loadeddata
 canplay
 playing
 canplaythrough
  
  воспроизведение (player.play()) началось успешно после перезагрузки страницы (onready)
  [pause 							- если playerState.paused был true (остановлен)]
  [emptied 						- если playerState.paused был true (остановлен)]
 play
 waiting
 loadstart
 durationchange
 loadedmetadata
 loadeddata
 canplay
 playing
 canplaythrough
 AudioApiElement::playPromise::Success::Begin
 updateTime
 false
 AudioApiElement::playPromise::Success::End
 Остановить
 AudioCbElement::stopStream
 AudioApiElement::stopStream
 pause
 seeking
 seeking
 seeked
 canplay
 canplaythrough
 seeked
 canplay
 canplaythrough
 stalled
 если не получается использовать AudioApiElement, но получается использовать AudioCbElement
 AudioApiElement::playStream::Begin
 AudioApiElement::playStream::End
 [abort						- stop()]
 [emptied					- stop()]
 play
 waiting
 loadstart
 error
 AudioApiElement::playPromise::Failed::Begin
 AudioCbElement::playStream::Begin
 AudioCbElement::playStream::End
 Start AudioCbElement 			- AudioApiElement says
 AudioApiElement::playPromise::Failed::End
 pause
 play
 waiting
 loadstart
 durationchange
 loadedmetadata
 loadeddata
 canplay
 playing
 canplaythrough
 */

	// Возвращает объект контекста для canvas и его размеры
	// Принимает DOM-элемент и размеры
	function AudioCanvas(id, width, height) {
		var canvas = document.getElementById(id);
		canvas.width = width;
		canvas.height = height;
		this.ctx = canvas.getContext("2d");
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
	}

	// TODO: Сделать функцию,
	// которая принимает объект с настройками (анализатора например (fft)),
	// и колбэк - функцию рисования


	function drawEqLeft() {
		// левый eq
		var maxValue = window.innerHeight > 510 ? 510 : Math.ceil(window.innerHeight / 2);
		// получаем canvas
		// var canvas = new AudioCanvas('visEqLeft', 500, 255 * 2);
		var canvas = new AudioCanvas('visEqLeft', 500, maxValue * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

		for (var bin = 0; audioApiElement.streamDataEqLeft && bin < audioApiElement.streamDataEqLeft.length; bin++) {
			var val = audioApiElement.streamDataEqLeft[bin];
			canvas.ctx.fillStyle = 'rgb(' + val + ',' + val + ',' + val + ')';
			// canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
			canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 + 1, 1, Math.floor(-val / 1.5));
			canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 - 1, 1, Math.floor(val / 1.5));
		}
		requestAnimationFrame(drawEqLeft);
	};

	function drawEqRight() {
		// правый eq
		var maxValue = window.innerHeight > 510 ? 510 : Math.ceil(window.innerHeight / 2);
		// получаем canvas
		var canvas = new AudioCanvas('visEqRight', 500, maxValue * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

		for (var bin = 0; audioApiElement.streamDataEqRight && bin < audioApiElement.streamDataEqRight.length; bin++) {
			var val = audioApiElement.streamDataEqRight[bin];
			// canvas.ctx.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
			// canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
			canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + val + ',' + (255 - val) + ')';
			canvas.ctx.fillRect(audioApiElement.streamDataEqRight.length - bin, canvas.canvasHeight / 2 + 1, 1, -val / 1.5);
			canvas.ctx.fillRect(audioApiElement.streamDataEqRight.length - bin, canvas.canvasHeight / 2 - 1, 1, val / 1.5);
		}
		requestAnimationFrame(drawEqRight);
	};

	function drawVisVolume() {
		// громкость
		var canvas = new AudioCanvas('analyserVisVolume', 288, 20);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);
		// получаем число плиток в вертикальном ряду при максимальном значении частоты 255
		// в одной плитке - 10 едениц частоты
		var maxBar = Math.floor(255 / 10),

		// ширина плитки
		barWidth = Math.floor(canvas.canvasWidth / 32),

		// barWidth 		= 10,
		// высота плитки
		barHeight = Math.floor(canvas.canvasHeight / maxBar),

		// зазор между плитками
		gutter = 3,

		// полная ширина плитки  с зазором
		fullBarWidth = barWidth + gutter,

		// полная высота плитки  с зазором
		fullBarHeight = barHeight + gutter;
		for (var i = 0; audioApiElement.streamDataVolume && i < audioApiElement.streamDataVolume.length; i++) {
			var val = audioApiElement.streamDataVolume[i],
			    totalBar = Math.floor(val / 10);
			// canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (val) + ',' + (255 - val) + ')';
			// canvas.ctx.fillRect(i, canvas.canvasHeight, 1, -val / 1);
			for (var j = 0; j < totalBar; j++) {
				// canvas.ctx.strokeStyle = 'rgb(' + (255 - val) + ',' + (0 + val) + ',' + (255 - val) + ')';
				// canvas.ctx.strokeStyle = 'hsl(' + (0 + j * 7) + ', 100%, 50%)';
				canvas.ctx.strokeStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
				canvas.ctx.strokeRect(i * fullBarWidth, canvas.canvasHeight - j * fullBarHeight, barWidth, barHeight);
			}
		}
		requestAnimationFrame(drawVisVolume);
	};

	function drawTriangle() {
		var maxValue = window.innerHeight > 510 ? 510 : Math.ceil(window.innerHeight / 2);
		// получаем canvas
		var canvas = new AudioCanvas('visTriangle', 540, maxValue * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);
		canvas.ctx.translate(canvas.canvasWidth / 2, canvas.canvasHeight / 2);

		var fib = 1.6180339;

		// при fftSize > 64 тормозит
		for (var bin = 0; audioApiElement.streamDataTriangle && bin < audioApiElement.streamDataTriangle.length; bin++) {
			// var val = audioApiElement.streamDataTriangle[bin] % 50;
			var val = audioApiElement.streamDataTriangle[bin] % 10;

			// canvas.ctx.strokeStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
			canvas.ctx.strokeStyle = 'rgb(255, 255, 255)';

			if (bin % 2 == 0) {
				canvas.ctx.strokeStyle = "rgb(" + Math.floor(255 - 255 / val * bin) + "0," + Math.floor(255 - 255 / val * bin) + ")";
			} else if (bin % 3 == 0) {
				canvas.ctx.strokeStyle = "rgb(0," + Math.floor(0 + 255 / val * bin) + "," + Math.floor(0 + 255 / val * bin) + ")";
			} else {
				canvas.ctx.strokeStyle = "rgba(" + Math.floor(255 - 255 / val * bin) + "," + Math.floor(0 + 255 / val * bin) + "," + Math.floor(255 - 255 / val * bin) + ".5)";
			}

			canvas.ctx.moveTo(audioApiElement.streamDataTriangle[bin], audioApiElement.streamDataTriangle[bin]);
			canvas.ctx.lineTo(audioApiElement.streamDataTriangle[bin] % 5, audioApiElement.streamDataTriangle[bin] / 1.618);
			canvas.ctx.lineTo(audioApiElement.streamDataTriangle[bin] / 1.618, audioApiElement.streamDataTriangle[bin]);
			canvas.ctx.lineTo(audioApiElement.streamDataTriangle[bin], audioApiElement.streamDataTriangle[bin]);

			/*canvas.ctx.moveTo(240, val * 1.7);
   canvas.ctx.lineTo(val * 1.7, val * 3);
   canvas.ctx.lineTo(val * 3, val * 1.7);
   canvas.ctx.lineTo(240, val * 1.7);*/

			canvas.ctx.stroke();
			canvas.ctx.strokeRect(0, 0, audioApiElement.streamDataTriangle[bin], audioApiElement.streamDataTriangle[bin]);
			// canvas.ctx.strokeRect(0, 0, val, 45);

			canvas.ctx.rotate(4 * Math.PI);
			canvas.ctx.rotate(Math.PI * 3 / 60);
			canvas.ctx.rotate(2 * Math.PI);
			canvas.ctx.rotate(Math.PI / 4);
		}
		requestAnimationFrame(drawTriangle);
	};

	function drawFractal() {
		var canvas = new AudioCanvas('visFractal', 500, 255 * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

		var qtMin = 5;
		var fib = 1.6180339;

		for (var bin = 0; bin < audioApiElement.streamData_4.length; bin++) {
			var val = audioApiElement.streamData_4[bin];
			/*canvas.ctx.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
   canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 + 1, 1, Math.floor(-val / 1.5));
   canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 - 1, 1, Math.floor(val / 1.5));*/
			if (qt <= qtMin) {
				canvas.ctx.stroke();
			} else {
				for (var i = 0; i < qt; i++) {
					canvas.ctx.arc(bin * bin * fib, 3 * bin, fib * bin, 0, 2 * Math.PI);
					canvas.ctx.rotate(2 * Math.PI * 3 / (qt - 1));
				}
				drawRound(qt * 0.5);
			}
		}
		requestAnimationFrame(drawFractal);
	};

	function addEqToTrack(track, canvasId) {
		$('.track').each(function (i) {
			$(this).find('canvas').remove();
		});
		track.append('<canvas id="' + canvasId + '"></canvas>');
	}

	// Визуализация выбранного играющего трека и кнопки play
	// TODO: переделать на requestAnimationFrame
	function visualisation() {
		consoleOutput('visualisation::Begin');
		visualisationStop();

		var el = $('.playlistContainer [data-station-id="' + getCurrentTrack().id + '"]');
		el.addClass('visualisation').find('.url').addClass('runningString');

		$('#player .play').addClass('visualisation');

		var stepGrad1 = Math.floor(Math.random() * 360),
		    stepGrad2 = stepGrad1 + 180,
		    stepBorder1 = Math.floor(Math.random() * 360),
		    stepBorder2 = stepBorder1 + 180;

		if (window.innerWidth > 700) {
			intervalVis = setInterval(function () {
				el.css({ 'backgroundImage': 'linear-gradient(to right, hsl(' + ++stepGrad1 % 360 + ', 60%, 50%) 0%, hsl(' + ++stepGrad2 % 360 + ', 60%, 50%) 100%)' });

				$('#player .play.visualisation').css({ 'boxShadow': '0px 0px 5px 0.4px hsl(' + ++stepBorder1 % 360 + ', 100%, 50%)', 'borderColor': 'hsl(' + ++stepBorder1 % 360 + ', 100%, 50%)' });

				$('#player .play.visualisation .inner').css({ 'borderBottomColor': 'hsl(' + ++stepBorder1 % 360 + ', 100%, 50%)' });

				$('#player .play.visualisation .outer').css({ 'borderTopColor': 'hsl(' + (360 - stepBorder1) % 360 + ', 100%, 50%)' });
			}, 50);
		}
		consoleOutput('visualisation::End');
	}

	// Остановка визуализации
	function visualisationStop() {
		consoleOutput('visualisationStop::Begin');
		clearInterval(intervalVis);
		var el = $('.playlistContainer [data-station-id="' + getCurrentTrack().id + '"]');
		el.removeClass('visualisation').css({ 'backgroundImage': 'none' }).removeAttr('style').find('.url').removeClass('runningString');
		$('#player .play').removeClass('visualisation').css({ 'boxShadow': 'none', 'borderColor': '#0ff' }).removeAttr('style');
		// $('#player .play span').remove();
		consoleOutput('visualisationStop::End');
	}

	function drawWolumeBar() {
		// var volumeAnimation 	= requestAnimationFrame(drawWolumeBar());
		// q - какую часть volume-bar от 100% отрисовать, от 1 до 10, шаг - 10%
		var q = Math.ceil(+$('#player .volume input').val() / 10);

		ctxVolume.clearRect(0, 0, canvasVolumeWidth, canvasVolumeHeight);
		var maxHue = 360 / 10 * q,
		    startHue = 0,
		    barWidth = 3,
		    gutterWidth = 1,
		    maxBar = Math.floor(canvasVolumeWidth / (gutterWidth + barWidth)),
		    targetCountBar = Math.floor(maxBar / 10 * q),
		    barMaxHeight = canvasVolumeHeight,
		    barStepHeight = barMaxHeight / maxBar;
		// consoleOutput(maxBar);

		for (var i = 0; i < targetCountBar; i++) {
			ctxVolume.fillStyle = 'hsl(' + i * maxHue / targetCountBar + ', 100%, 50%)';
			ctxVolume.fillRect(i * (gutterWidth + barWidth), canvasVolumeHeight - i * barStepHeight - barStepHeight, barWidth, i * barStepHeight + barStepHeight);

			ctxVolume.fill();
		}
		/*ctxVolume.fillRect(10 * (gutterWidth + barWidth), canvasVolumeHeight - 10 * barStepHeight - barStepHeight, barWidth, 10 * barStepHeight + barStepHeight);
  ctxVolume.fill();*/

		startHue += 15 % 360;
		// consoleOutput(startHue);
	}

	function animateCloseButton(el) {
		// el.mcs - объект с данными об элементе, который возвращает mCustomScrollbar
		setTimeout(function () {
			$('.searchContainer .close').animate({ top: -(el.mcs.top + 10) + 'px' }, 150);
		}, 50);
	}

	function getCurrentPlaylist() {
		return playerState.currentPlaylist;
	}

	function getCurrentTrack() {
		// consoleOutput(__playlists[getCurrentPlaylist()].currentTrack);
		return __playlists[getCurrentPlaylist()].currentTrack;
	}

	// получим соседа
	function getSibling(direction) {
		var track = getCurrentTrack(),
		    $track = $('.playlistContainer [data-station-id="' + track.id + '"]'),
		    $sibling,

		// url для audioApiElement.playStream()
		playUrl;

		if (direction === 'prev') {
			$sibling = $track.prev();
		} else if (direction === 'next') {
			$sibling = $track.next();
		} else {
			throw new Error('Не передано направление!');
		}

		if ($sibling.length) {
			playUrl = $sibling.attr('data-station-url');
			return playUrl;
		} else {
			consoleOutput('no siblings');
		}
	}

	function debugPlayerState() {
		// consoleOutput('::debugPlayerState');
		var $debugLs = $('[data-remove="prop"]'),
		    $removeButton = $debugLs.find('.removeItem'),
		    $removeList = $debugLs.find('.removeItemList'),
		    removeList = [],
		    markup = '';

		$removeButton.attr('disabled', 'disabled');
		$removeButton.attr('title', 'Change item of local storage');

		removeList.push({ prop: 'search.stationsOpened', name: 'StationsOpened' });
		removeList.push({ prop: 'volume', name: 'Volume' });

		for (var i = 0; i < removeList.length; i++) {
			markup += '<li class="remove" data-change-prop="' + removeList[i].prop + '"><a href="#">' + removeList[i].name + '</a></li>';
		}
		$removeList.html(markup);

		$('[data-change-prop]').on('click', function (e) {
			var prop = $(this).attr('data-change-prop');

			consoleOutput(prop);
			consoleOutput($removeButton);

			$removeButton.attr('data-remove-prop', prop);
			$removeButton.removeAttr('disabled');
			$removeButton.html(prop).attr('title', 'playerState.' + prop);

			$('[data-remove-prop]').on('click', function (e) {
				// prop - что удаляем, например volume у playerState
				var prop = $(this).attr('data-remove-prop'),
				    $option = $removeList.find('[data-change-prop="' + prop + '"]');

				switch (prop) {
					case 'search.stationsOpened':
						delete playerState.search.stationsOpened;
						consoleOutput('delete playerState.' + prop);
						break;

					case 'volume':
						delete playerState.volume;
						consoleOutput('delete playerState.' + prop);
						break;

					default:
						break;
				}

				consoleOutput(playerState);
				localStorage.setItem('playerState', JSON.stringify(playerState));

				$(this).html('Reset').attr('disabled', 'disabled').attr('title', 'Change prop of playerState').removeAttr('data-remove-prop');
				$option.remove();

				return false;
			});
		});
	}

	function debugLocalStorage() {
		// consoleOutput('::debugLocalStorage');
		var $debugLs = $('[data-remove="item"]'),
		    $removeButton = $debugLs.find('.removeItem'),
		    $removeList = $debugLs.find('.removeItemList'),
		    removeList = [],
		    markup = '';

		$removeButton.attr('disabled', 'disabled');
		$removeButton.attr('title', 'Change item of local storage');

		removeList.push({ item: 'playerState', name: 'playerState' });
		removeList.push({ item: 'stations', name: 'stations' });
		removeList.push({ item: 'stationsOn100', name: 'stationsOn100' });
		removeList.push({ item: 'uniqHash', name: 'uniqHash' });
		removeList.push({ item: 'userStatus', name: 'userStatus' });
		removeList.push({ item: 'localStorage', name: 'localStorage' });

		for (var i = 0; i < removeList.length; i++) {
			markup += '<li class="remove" data-change-item="' + removeList[i].item + '"><a href="#">' + removeList[i].name + '</a></li>';
		}
		$removeList.html(markup);

		$('[data-change-item]').on('click', function (e) {
			var $option = $(this),
			    item = $option.attr('data-change-item');

			consoleOutput($option);

			$removeButton.attr('data-remove-item', item);
			$removeButton.removeAttr('disabled');
			$removeButton.html(item).attr('title', 'Delete::' + item);

			$('[data-remove-item]').on('click', function (e) {
				// item - элемент из localStorage который удаляем
				var item = $(this).attr('data-remove-item'),
				    $option = $removeList.find('[data-change-item="' + item + '"]');

				if ($option.attr('data-change-item') == 'stations' || $option.attr('data-change-item') == 'stationsOn100') {
					var $optionStations = [$removeList.find('[data-change-item="stations"]'), $removeList.find('[data-change-item="stationsOn100"]')];
				}
				consoleOutput($option);

				switch (item) {
					case 'playerState':
						localStorage.removeItem(item);
						consoleOutput('delete ' + item);
						break;

					case 'stations':
					case 'stationsOn100':
						localStorage.removeItem('stations');
						localStorage.removeItem('stationsOn100');
						consoleOutput('delete ' + item);
						consoleOutput('delete ' + item + 'On100');
						break;

					case 'uniqHash':
						localStorage.removeItem(item);
						consoleOutput('delete ' + item);
						break;

					case 'userStatus':
						localStorage.removeItem(item);
						consoleOutput('delete ' + item);
						break;

					case 'localStorage':
						localStorage.clear();
						consoleOutput('delete ' + item);
						location.reload();
						break;

					default:
						break;
				}

				$(this).html('Clear').attr('disabled', 'disabled').attr('title', 'Change item of local storage').removeAttr('data-remove-item');

				if ($optionStations) {
					$removeList.find('[data-change-item="stations"]').remove();
					$removeList.find('[data-change-item="stationsOn100"]').remove();
				} else {
					$option.remove();
				}
				return false;
			});
		});
	}

	function enableVisualisations() {
		var vis = playerState.visualisations;
		var visOrder = vis.order;

		for (var i = 0, size = visOrder.length; i < size; i++) {
			var markup = '<label title="' + visOrder[i] + '"><input type="checkbox" data-animation-name="' + visOrder[i] + '" data-animation-state="' + vis[visOrder[i]].state + '" class="toggle-animation" /><div class="button btn"><div class="iconWrapper"><div class="icon">' + vis[visOrder[i]].icon + '</div></div></div></label>';

			$('.animation-settings').append(markup);

			if (vis[visOrder[i]].state) {
				$('[data-animation-name=' + visOrder[i] + ']').prop('checked', true);
			} else {
				$('[data-animation-name=' + visOrder[i] + ']').prop('checked', false);
			}
		}

		$('.toggle-animation').on('change', function (event) {
			var $el = $(this);
			var aName = $el.attr('data-animation-name');
			var aState = $el.attr('data-animation-state');

			$el.attr('data-animation-state', !playerState.visualisations[aName].state);

			if (playerState.visualisations[aName].state) {
				audioApiElement.visStop(playerState.visualisations[aName].name);
			} else {
				audioApiElement.visStart(playerState.visualisations[aName].name);
			}
			playerState.visualisations[aName].state = !playerState.visualisations[aName].state;

			localStorage.setItem('playerState', JSON.stringify(playerState));
			return false;
		});
	}

	function getObjectProperties(obj) {
		consoleOutput('::getObjectProperties');
		for (var key in obj) {
			consoleOutput(key + ' : ' + obj[key]);
			if (_typeof(obj[key]) === 'object') {
				var _o = obj[key];
				// if(typeof +obj[key] == 'number') {
				/*if(!isNaN(parseFloat(key))) {
    	consoleOutput('number');
    }*/
				// consoleOutput('Тип ' + typeof key);
				getObjectProperties(_o);
			}
		}
	}

	function consoleOutput(outputText, disableCustomConsole) {
		console.log(outputText);
		if (!disableCustomConsole) {
			$('.consoleList .mCSB_container').append('<div class="consoleItem">' + $('.consoleItem').length + ':' + outputText + '</div>');

			$('.consoleList').mCustomScrollbar('scrollTo', '.consoleItem:last');
		}
	}

	function makeConfig() {
		$.ajax({
			data: { 'action': 'configToFile', 'config': JSON.stringify(playerState) },
			success: function success(data) {
				console.log('config is made');
			}
		});
	}

	function toggleSearchContainer(time) {
		var $playerDesktop = $('[data-desktop]').find('#player'),
		    $searchDesktop = $('[data-desktop]').find('.searchContainer'),
		    $playerTab = $('[data-tab]').find('#player'),
		    $searchTab = $('[data-tab]').find('.searchContainer'),
		    $playerSmartphone = $('[data-smartphone]').find('#player'),
		    $searchSmartphone = $('[data-smartphone]').find('.searchContainer'),
		    $playerSmartphoneKeyboard = $('[data-smartphone-keyboard]').find('#player'),
		    $searchSmartphoneKeyboard = $('[data-smartphone-keyboard]').find('.searchContainer'),
		    playerWidth = $('#player').outerWidth();

		if (!$('#player').attr('data-search-container')) {
			console.log('hidden');

			if ($playerDesktop.length) {
				$playerDesktop.animate({
					left: '+=' + playerWidth / 2 + 'px'
				}, time);

				$searchDesktop.animate({
					// left: '-100%',
					left: '-320px',
					opacity: 1
				}, time);
			} else if ($playerTab.length || $playerSmartphone.length || $playerSmartphoneKeyboard.length) {
				$('#player').find('.playlistContainer').fadeOut(time / 2);

				$('.searchContainer').animate({
					opacity: 1
				}, time);
			}

			$('#player').attr('data-search-container', true);
			$('.searchContainer').attr('data-visible', true);
		} else {
			console.log('visible');

			if ($playerDesktop.length) {
				$playerDesktop.animate({
					left: '-=' + playerWidth / 2 + 'px'
				}, time);

				$searchDesktop.animate({
					left: '0',
					opacity: 0
				}, time);
			} else if ($playerTab.length || $playerSmartphone.length || $playerSmartphoneKeyboard.length) {
				$('#player').find('.playlistContainer').fadeIn(time);

				$('.searchContainer').animate({
					opacity: 0
				}, time);
			}

			$('#player').removeAttr('data-search-container');
			$('.searchContainer').removeAttr('data-visible');
		}
	}

	$('#player .prev').click(function (e) {
		consoleOutput('prev');
		var playUrl = getSibling('prev');
		consoleOutput(playUrl);
		if (playUrl) {
			audioApiElement.stopStream();
			audioApiElement.playStream(playUrl);
		}
	});

	$('#player .next').click(function (e) {
		consoleOutput('next');
		var playUrl = getSibling('next');
		consoleOutput(playUrl);
		if (playUrl) {
			audioApiElement.stopStream();
			audioApiElement.playStream(playUrl);
		}
	});

	$('#player .play').on('click', function (e) {
		if (playerState.paused) {
			audioApiElement.playStream(getCurrentTrack().url);
			$('.playlistContainer').mCustomScrollbar('scrollTo', getCurrentTrack().scrollPosition);
		}
	});

	$('.playlistContainer').on('click', '.track', function (e) {
		if (!playerState.paused) {
			if ($(this).attr('data-current-track')) {
				// $(this).removeAttr('data-current-track');
				audioApiElement.stopStream();
			} else {
				// $(this).attr('data-current-track', 1);
				var url = $(this).data('stationUrl');
				audioApiElement.stopStream();
				audioApiElement.playStream(url);
			}
		} else {
			// $(this).attr('data-current-track', 1);
			var url = $(this).data('stationUrl');
			audioApiElement.playStream(url);
		}

		consoleOutput($(this).position().top);
	});

	// TODO: в кликах на кнопку stop проверять player.paused
	$('#player .stop').click(function (e) {
		audioApiElement.stopStream();
	});

	$('.playlistContainer').on('click', '.delete', function (e) {
		var id = $(this).parent().data('stationId'),
		    pl = __playlists[playerState.currentPlaylist];

		pl.tracks.splice(pl.tracks.indexOf(id), 1);
		$(this).parent().remove();
		// localStorage.setItem('playerState', JSON.stringify(playerState));
		localStorage.setItem('__playlists', JSON.stringify(__playlists));
		return false;
	});

	$('.playlistContainer').on('click', '.canplaytest', function (e) {
		var url = $(e.target).closest('.track').data('stationUrl');
		consoleOutput(url);
		e.stopPropagation();
	});

	$('.toAdmin').on('click', function (e) {
		consoleOutput('toAdmin');
		$('body').addClass('admin');

		$.ajax({
			data: { 'admin': 1 },
			success: function success(data) {
				$('#player').after(data);
				$('#player').hide();

				$('.toPlayer').on('click', function (e) {
					consoleOutput('toPlayer');
					$('.admin-wrapper').remove();
					$('body').removeClass('admin');
					$('#player').fadeIn(300);
					return false;
				});
			}
		});
		return false;
	});

	$('#player .volume input').on('input', function (e) {
		var $inputVolume = $(this);

		/*player.volume = parseFloat($(this).val() / 100);
  playerState.volume = player.volume;*/
		audioApiElement.setVolume(parseFloat($(this).val() / 100));
		audioCbElement.setVolume(parseFloat($(this).val() / 100));
		playerState.volume = audioApiElement.getVolume();
		playerState.volume = audioCbElement.getVolume();

		$('#player .volume .val').html($(this).val());

		if (+$inputVolume.val() != 0) {
			drawWolumeBar(Math.ceil(+$inputVolume.val() / 10));
		} else {
			ctxVolume.clearRect(0, 0, canvasVolumeWidth, canvasVolumeHeight);
		}

		localStorage.setItem('playerState', JSON.stringify(playerState));
	});

	$('#player .volume').on('wheel', function (e) {
		e = e || window.event;
		var $inputVolume = $(this).find('input');

		var delta = e.originalEvent.deltaY || e.originalEvent.detail || e.originalEvent.wheelDelta;

		if (delta > 0 && +$inputVolume.val() > 0) {
			$inputVolume.val(+$inputVolume.val() - 2).trigger('input');
		} else if (delta < 0 && +$inputVolume.val() < 100) {
			$inputVolume.val(+$inputVolume.val() + 2).trigger('input');
		}

		return false;
	});

	$('#player .volume').on('click', function (e) {
		e = e || window.event;
		var $inputVolume = $(this).find('input');

		$inputVolume.val(e.offsetX).trigger('input');

		return false;
	});

	// Показать поле ввода для поиска
	$('.showFieldSearch').click(function (e) {
		$(this).toggleClass('active');

		var searchInput = $(this).closest('.find').find('.js-search-station-input');

		if (searchInput.hasClass('visible') == false) {
			searchInput.addClass('visible').animate({ opacity: 1, width: '100%' }, 100);

			setTimeout(function () {
				searchInput.focus();
			}, 300);
		} else {
			searchInput.removeClass('visible').animate({ opacity: 0, width: 0 }, 100).blur();
		}
	});

	// Поиск и показ найденных станций
	$('.js-search-station-input').on('keyup', function (e) {
		var target = $(this).val();

		if (target.length > 2) {
			$(".spinner").show();

			$.ajax({
				data: { 'action': 'search', 'target': target },
				success: function success(data) {
					var response = JSON.parse(data),
					    result = $('.searchContainer .result'),
					    markup = '<div class="total"><span>' + response.length + '</span> stations is found on <span class="target">' + target + '<span></div>';

					result.html('');

					for (var i = 0; i < response.length; i++) {
						var station = response[i];

						markup += '<div class="station btn" data-station-id="' + station.station_id + '"><div class="add"><div class="icon">add</div></div><div class="title">' + station.station_title + '</div><div class="url">' + station.station_url + '</div></div>';
					}

					result.html(markup);

					$('[data-station-id]').each(function (index, el) {
						var $station = $(el);
						var title = $station.find('.title').text();
						var url = $station.find('.url').text();
						var regExp = new RegExp(target, 'gi');

						title = title.replace(regExp, '<span class="search-target">' + target + '</span>');
						url = url.replace(regExp, '<span class="search-target">' + target + '</span>');

						$station.find('.title').html(title);
						$station.find('.url').html(url);
					});

					$(".spinner").hide();

					if (!$('.vmPlayer').attr('data-search-container')) {
						toggleSearchContainer(400);
					}
				}
			});
		}
	});

	// Получить все станции
	// TODO: выолнять когда еще не получены станции (1-й if())
	// Не строить DOM-дерево станций, если оно уже было построено, 
	// а просто открывать окно со списком станций

	// Предотвратить повторное построение при повторном клике DOM-дерева станций,
	// если окно со станциями нужно свернуть, то return false;

	// TODO: перестал работать $(".spinner")


	$('#player .find .showAll').on('click', function (e) {
		$(this).toggleClass('active');

		// ??? - что за if ???
		if (!$('.searchContainer .result .station').length) {
			$(".spinner").show();
			/*$.ajax({
   	data: {'action': 'getAllStations'},
   	beforeSend: function(){
           dateStart = new Date().getTime();
       },
   	success: function(data) {
   		var response = JSON.parse(data);
   			result = $('.searchContainer .result'),
   			markup = '<div class="total"><span>'
   						+ response.length
   						+ '</span> stations is found</div>'
   		;
   			result.html('');
   			for(var i = 0; i < response.length; i++) {
   			var station = response[i];
   				markup += '<div class="station" data-station-id="'
   						+ station.station_id
   						+ '"><div class="add"><i class="fa fa-plus"></i></div><div class="title">'
   						+ station.station_title 
   						+ '</div><div class="url">'
   						+ station.station_url
   						+ '</div></div>';
   		}
   			result.html(markup);
   			$(".spinner").hide();
   			if($('.searchContainer').hasClass('visible')) {
   			$('.searchContainer').removeClass('searchContainerFadeIn visible')
   								.addClass('searchContainerFadeOut')
   								.parent().removeClass('playerRight')
   								.addClass('playerLeft')
   			;
   		} else {
   			$('.searchContainer').removeClass('searchContainerFadeOut')
   								.addClass('searchContainerFadeIn visible')
   								.parent()
   								.removeClass('playerLeft')
   								.addClass('playerRight')
   			;
   		}
   			if(window.innerHeight <= 640 && window.innerWidth < 700) {
   			$('.playlistContainer').toggleClass('hidden');
   		}
   			var dateLoad = new Date().getTime();
   		consoleOutput((dateLoad - dateStart) + 'ms');
   	}
   });*/

			var size = 0;
			for (var key in stationsArray) {
				size++;
			}
			var response = stationsArray,
			    stationsOpened = playerState.search.stationsOpened || [],

			// size 			= response.length,
			result = $('.searchContainer .result'),

			// станций в блоке и всего блоков
			IN_BLOCK = 100,
			    totalBlocks = Math.ceil(size / IN_BLOCK),

			// начальная разметка - общее количество станций
			markup = '<div class="total"><span>' + size + '</span> stations is found</div>';

			result.html('');

			for (var i = 0; i < totalBlocks; i++) {
				var from = i * 100,
				    to = (i + 1) * 100;

				if (i == totalBlocks - 1) {
					to = (totalBlocks - 1).toString() + size % 100;
				}

				markup += '<div class="stationsBlockToggle" data-show="closed" data-block-number="' + i
				// + '"><div class="showFoundStations"><i class="fa fa-minus"></i></div><div class="title">'
				+ '"><div class="title">' + from + '..' + to + '</div></div>';
			}

			result.html(markup);

			// $('.stationsBlockToggle').on('click', function(e) {
			$('[data-block-number]').on('click', function (e) {
				var markup = '',
				    index = $(this).attr('data-block-number');
				if ($(this).attr('data-show') == 'closed') {
					var _stations = stationsArrayOn100[index];
					markup += '<div class="stationsBlockList" data-stations-number=' + index + '>';
					for (var i = 0; i < _stations.length; i++) {
						var station = _stations[i];
						markup += '<div class="station" data-station-id="' + station.station_id
						// + '"><div class="add"><i class="fa fa-plus"></i></div><div class="title">'
						+ '"><div class="title">' + station.station_title + '</div><div class="url">' + station.station_url + '</div></div>';
					}
					markup += '</div>';
					$(this).after(markup);
					$(this).attr('data-show', 'open');

					consoleOutput(stationsOpened);
					stationsOpened.push(index);
					consoleOutput(stationsOpened);

					if (stationsOpened.length > 3) {
						consoleOutput('лишний ' + stationsOpened[0]);

						$('[data-stations-number="' + stationsOpened[0] + '"]').remove();
						$('[data-block-number="' + stationsOpened[0] + '"]').attr('data-show', 'closed');

						consoleOutput(stationsOpened);
						stationsOpened.shift();
						consoleOutput(stationsOpened);
					}

					consoleOutput('stationsBlockToggle №' + index + ' opened');

					/*localStorage.setItem('playerState', JSON.stringify(playerState));
     return false;*/
				} else {
					// TODO: при скрытии списка станций удалять его номер из этого массива
					// https://learn.javascript.ru/array-iteration#filter
					var _stationsOpened = stationsOpened.filter(function (el) {
						consoleOutput('filter');
						return el != index;
					});

					stationsOpened = _stationsOpened;
					consoleOutput(stationsOpened);

					$(this).next('[data-stations-number]').remove();
					$(this).attr('data-show', 'closed');

					consoleOutput('stationsBlockToggle №' + index + ' removed');

					// return false;
				}

				playerState.search.stationsOpened = stationsOpened;

				consoleOutput(stationsOpened);
				consoleOutput(playerState.search);
				consoleOutput(playerState.search.stationsOpened);

				localStorage.setItem('playerState', JSON.stringify(playerState));
				return false;
			});

			if (stationsOpened.length > 0) {
				var targetBlock = stationsOpened[stationsOpened.length - 1],
				    $targetBlock = $('[data-block-number="' + targetBlock + '"]'),
				    markupStationsList = '';

				stationsOpened = [];
				consoleOutput('targetBlock is ' + targetBlock);
				// $('[data-block-number="' + targetBlock + '"]').click();
				var _stations = stationsArrayOn100[targetBlock];
				markupStationsList += '<div class="stationsBlockList" data-stations-number=' + targetBlock + '>';
				for (var i = 0; i < _stations.length; i++) {
					var station = _stations[i];
					markupStationsList += '<div class="station" data-station-id="' + station.station_id + '"><div class="add"><i class="fa fa-plus"></i></div><div class="title">' + station.station_title + '</div><div class="url">' + station.station_url + '</div></div>';
				}
				markupStationsList += '</div>';
				// ||
				// $targetBlock.after(markupStationsList);
				// $targetBlock.attr('data-show', 'open');
				$targetBlock.attr('data-show', 'open').after(markupStationsList);

				consoleOutput(stationsOpened);
				stationsOpened.push(targetBlock);
				consoleOutput('stationsBlockToggle №' + targetBlock + ' opened');
				consoleOutput(stationsOpened);

				localStorage.setItem('playerState', JSON.stringify(playerState));
			}

			$(".spinner").hide();
		}

		$(".spinner").show();
		toggleSearchContainer(600);

		/*if(window.innerHeight <= 640 && window.innerWidth < 700) {
  	$('.playlistContainer').toggleClass('hidden');
  }*/

		$(".spinner").hide();
	});

	// Закрытие блока с результатами поиска
	$('.searchContainer .close').on('click', function (e) {
		$('.showAll').removeClass('active');
		toggleSearchContainer(600);
	});

	$('.searchContainer').on('click', '.station', function (e) {
		playlistManager.addTrackToPlaylist($(this).data('stationId'));
	});

	$('.playlist-new').on('click', function (e) {
		consoleOutput('::new playlist');

		var defaultPLName = new Date().getTime().toString().substr(6);

		var pl = new Playlist(defaultPLName);

		/*__playlists[defaultPLName] = pl;
  consoleOutput(__playlists['Default']);*/

		/*playerState
  	.playlists[playerState.currentPlaylist]
  	 = pl;*/

		// playlistManager.addPanel(defaultPLName);

		$playlistsPanel.find('[data-current]').removeAttr('data-current');

		$playlistsPanel.find('[data-name=' + defaultPLName + ']').attr('data-current', 1);

		playerState.currentPlaylist = defaultPLName;

		consoleOutput($playlistsPanel.find('[data-name=' + defaultPLName + ']'));

		// var scrollPosition = $playlistsPanel.find('[data-current]').position().left;

		// __playlists[playerState.currentPlaylist].scrollPosition = scrollPosition;

		localStorage.setItem('playerState', JSON.stringify(playerState));
		// localStorage.setItem('__playlists', JSON.stringify(__playlists));
	});

	$('.playlistsPanel').on('click', '.vmTitle', function () {
		var $pl = $(this).closest('.playlist');
		if (!$pl.attr('data-current')) {
			consoleOutput('::Change playlist::' + $pl.attr('data-name'));

			/*playlistManager.
   	// setCurrent($pl.attr('data-name'), $pl.attr('data-scroll-left'));
   	setCurrent($pl.attr('data-name'));*/

			// mCustomScrollbar('scrollTo', $pl.attr('data-scroll-left'));
		} else {
			consoleOutput('Плейлист уже выбран');
		}
	});

	$('.showConsole').on('click', function () {
		$('.console').toggleClass('hidden');
		$('.consoleList').mCustomScrollbar('scrollTo', '.consoleItem:last');

		detectDevice();
		return false;
	});

	$('.clearConsole').on('click', function () {
		$('.consoleList .mCSB_container').children().remove();
		return false;
	});

	/*****************************************
 REGISTRATION
 ******************************************/
	function checkLoginUniq(login) {
		console.log('checkLoginUniq');
		$.ajax({
			data: { 'action': 'loginUniq', 'regLogin': login },
			success: function success(data) {
				if (data) {
					$('.form-reg .regLogin').addClass('busy');
					// console.log("Good");
					var response = JSON.parse(data);
					// console.log(response);
					$('.loginsUniq').html('');
					var markup = '';
					for (var i = 0; i < response.length; i++) {
						var fieldBusy = response[i];
						markup += '<div class=\"fieldUniq\"><div class=\"field\">' + fieldBusy.user_login + '</div></div>';
					}
					$('.loginsUniq').html('Used :(:<br>' + markup);
					setTimeout(function () {
						$('.loginsUniq').html('');
					}, 4000);
				} else if (!$('.form-reg .regLogin').hasClass('error')) {
					$('.form-reg .regLogin').removeClass('busy');
					$('.loginsUniq').html('Good choice!');
					setTimeout(function () {
						$('.loginsUniq').html('');
					}, 4000);
				}
			}
		});
	}

	function popupClose(popup, delay) {
		popup.fadeOut(delay);
	}

	function validateField(element) {
		// console.log('validateField');
		var pattern, errorMessage, top;
		if (element.attr('type') == 'text') {
			pattern = /^[A-Za-zА-Яа-яЁё0-9\._-]{3,27}$/;
			errorMessage = 'От 3 до 20 символов';
			top = element.position().top;
		} else if (element.attr('type') == 'password') {
			pattern = /^[A-Za-zА-Яа-яЁё0-9\._-]{5,}$/;
			errorMessage = 'От 5 символов';
			top = element.position().top;
		}

		var value = element.val();
		var check = true;
		if (value.search(pattern) != 0) {
			element.addClass('error');
			/*if(element.prev().hasClass('errorTitle') == false) {
   	element.before('<div class="errorTitle">' + errorMessage);
   	element.prev('.errorTitle').css({'display':'inline-block', 'top':top});
   } else {
   	element.prev('.errorTitle').css({'display':'inline-block', 'top':top});
   }*/
			check = false;
		} else {
			element.removeClass('error');
			// element.prev('.errorTitle').css({'display':'none'});
		}
		return check;
	}

	function equalPassword(pass1, pass2) {
		// console.log('equalPassword');
		if (pass1.val() != pass2.val()) {
			pass2.addClass('error');
			/*if(pass2.prev().hasClass('errorTitlePass') == false) {
   	pass2.before('<div class="errorTitlePass">Пароли не совпадают');
   	pass2.prev('.errorTitlePass').css({'display':'inline-block', 'top':top});
   } else {
   	pass2.prev('.errorTitlePass').css({'display':'inline-block', 'top':top});
   }*/
			return false;
		} else {
			pass2.removeClass('error');
			// pass2.prev('.errorTitlePass').css({'display':'none'});
			return true;
		}
	}

	function loginIsFree(login) {
		console.log('loginIsFree');
		// console.log($(login));
		$.ajax({
			data: { 'action': 'loginIsFree', 'value': login.val() },
			success: function success(data) {
				// console.log("Good");

				if (data === 'true') {
					// console.log($(login));
					console.log('good');
					login.removeClass('busy');
					// return true;
				} else {
					// console.log($(login));
					console.log('busy');
					login.addClass('busy');
					$('.loginsUnique').html('Login is busy');
					setTimeout(function () {
						$('.loginsUnique').html('');
					}, 4000);
					// return false;
				}
				/*var response = JSON.parse(data);
    console.log(response);
    $('.loginsUnique').html('');
    var markup = '';
    for(var i = 0; i < response.length; i++) {
    	var fieldBusy = response[i];
    	markup += '<div class=\"fieldUniques\"><div class=\"field\">' + fieldBusy.user_login
    	+ '</div></div>';
    }
    $('.loginsUnique').html(markup);
    setTimeout(function() {
    	$('.loginsUnique').html('');
    }, 4000);*/
			}
		});
	}

	$('.showFormSign, .showFormReg').on('click', function () {
		var $el = $(this);
		var targetEl = $el.attr('data-form');
		console.log('покажем форму ' + targetEl);
		// $el.toggleClass('active').siblings().toggleClass('active');
		$(targetEl).toggleClass('visible').fadeToggle(300);
		$('.overlayFull').attr('data-visible', true).fadeToggle(300);
		$el.attr('disabled', 'disabled');

		if (!$('.overlayFull').attr('data-visible')) {
			$el.attr('data-visible', true).fadeToggle(300);
		}
	});

	$(".overlayFull").on('click', function () {
		var $el = $(this);

		if ($el.attr('data-visible')) {
			$el.attr('data-visible', false).hide();
		}

		$('.form-reg, .form-auth').hide();
		$('.showFormSign, .showFormReg').removeAttr('disabled');
	});

	//закрытие модального окна и формы, сброс полей формы
	$(".popup-overlay, .close-popup").click(function (e) {
		popupClose($(".popup-container, .popup-overlay"), 500);
		// $(".popup-container, .popup-overlay").fadeOut(500);
		$(':input', ".popup-container").not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
	});

	$('.form-reg .regLogin').keyup(function (e) {
		var login = $('.form-reg .regLogin');
		if (login.val().length > 2) {
			checkLoginUniq(login.val());
		}

		validateField($(this));

		// return false;
		e.preventDefault();
	});

	$('.form-reg .regPass').keyup(function () {
		validateField($(this));
		/*if($(this).val().length < 4) {
  	setTimeout(function() {
  		validateField($(this));
  	}, 2000);
  } else {
  	validateField($(this));	
  }*/
	});

	$('.form-reg .regPassEx').keyup(function () {
		equalPassword($('.form-reg .regPass'), $(this));
	});

	$('.form-reg .regSubmit').on('click', function (e) {
		var login = $('.form-reg .regLogin');
		var pass = $('.form-reg .regPass');
		var pass2 = $('.form-reg .regPassEx');
		// console.log(loginIsFree(login));
		if (validateField(login) && validateField(pass) && equalPassword(pass, pass2) && !login.hasClass('busy')) {
			$.ajax({
				data: { 'action': 'regUser', 'regLogin': login.val(), 'regPass': pass.val() },
				// url: 'actionsRegistration.php',
				success: function success(data) {
					console.log('Registration is success!!!');
					$('.form-reg').fadeOut(300);
					// $('.showFormReg').toggleClass('active').fadeToggle(300);
					// $('.showFormReg').toggleClass('active');
					$('.successReg').html('You have successfully signed up!').fadeIn(300).addClass('popupHide');
					setTimeout(function () {
						// $('.overlayFull, .success').fadeOut(500);
						$('.overlayFull').fadeOut(500);
						// $('.success').removeClass('popupHide');
					}, 4000);

					$.ajax({
						data: { 'action': 'authUser', 'authLogin': login.val(), 'authPass': pass.val() },
						// data: {'action': 'authUser', 'authLogin': 55555, 'authPass': 55555},
						success: function success(data) {
							if (data) {
								// $('.success').removeClass('popupHide, transparentText');
								console.log('Authorization is success!!!');
								var response = JSON.parse(data);
								console.log(response);
								$('.form-auth').fadeOut(300);
								// $('.showFormSign').toggleClass('active').fadeToggle(300);
								// $('.showFormSign').toggleClass('active');
								$('.successAuth').html('Hi, ' + response.user_login + '<br>Welcome to RA').fadeIn(300).addClass('popupHide');
								setTimeout(function () {
									$('.overlayFull').fadeOut(500);
								}, 4000);
							} else {
								console.log('no data');
								$('.errors').html('Login or password is not correct :(');
								setTimeout(function () {
									$('.errors').html('');
								}, 5000);
							}
						}
					});
				}
			});
		}
		return false;
	});

	$('.form-auth .authSubmit').on('click', function (e) {
		var login = $('.form-auth .authLogin');
		var pass = $('.form-auth .authPass');

		if (validateField(login) && validateField(pass)) {
			$.ajax({
				data: { 'action': 'authUser', 'authLogin': login.val(), 'authPass': pass.val() },
				// data: {'action': 'authUser', 'authLogin': 55555, 'authPass': 55555},
				success: function success(data) {
					if (data) {
						// $('.success').removeClass('popupHide, transparentText');
						console.log('Authorization is success!!!');
						var response = JSON.parse(data);
						console.log(response);
						$('.form-auth').fadeOut(300);
						// $('.showFormSign').toggleClass('active').fadeToggle(300);
						// $('.showFormSign').toggleClass('active');
						$('.successAuth').html('Hi, ' + response.user_login + '<br>Welcome to RA').fadeIn(300).addClass('popupHide');

						setTimeout(function () {
							$('.overlayFull').fadeOut(500);
						}, 4000);

						Cookies.set('userLogin', response.user_login, { expires: 30, path: "/" });
						Cookies.set('userKey', response.user_cookie, { expires: 30, path: "/" });
						// Cookies.get('sliderState')

						$('.showFormSign').removeClass('showFormSign').addClass('logout').removeAttr('data-form').attr('title', 'Logout').find('.icon').text('exit_to_app');

						$(this).closest('.animation-settings').append('<p class="user-name">' + response.user_login + '</p>');
					} else {
						console.log('no data');
						$('.errors').html('Login or password is not correct :(');
						setTimeout(function () {
							$('.errors').html('');
						}, 5000);
					}
				}
			});
		}
		return false;
	});

	$('.controls .logout').on('click', function (e) {
		console.log('logout');
		$.ajax({
			data: { 'action': 'logout' },
			success: function success(data) {
				console.log('You logged out');
				$('.logout').removeClass('logout').addClass('showFormSign').attr('data-form', '.form-auth').attr('title', 'Sign in').find('.icon').text('forward');

				$(this).closest('.animation-settings').find('.user-name').remove();
			}
		});
		return false;
	});

	/*
 	Чтобы на экранах в высоту меньше 640px у блока playlistContainer с треками 
 	выставить всю доступную высоту
 */

	var playlistContainer = $('#player .playlistContainer'),

	// панелька для плейлистов
	$playlistsPanel = $('#player .playlistsPanel'),
	    player = new Audio(),


	// Состояние пользователя - зарегистрирован или нет, авторизован или нет
	userStatus = {
		reg: false,
		auth: false
	},


	// объект для хранения данных о плейлистах
	__playlists = {},
	    playlistManager = new PlaylistManager(),


	// Объект состояния плеера
	playerState = {
		playlists: {},
		playlistsOrder: [],
		currentPlaylist: '',
		// lastActivePlaylist: '',
		nowPlaying: {},
		// volume : player.volume,
		// volume: audioApiElement ? audioApiElement.getVolume() : .2,
		volume: .27,
		paused: player.paused,
		search: {
			stationsOpened: []
		}
	},


	// Массив со всеми станциями
	stationsArray = {},


	// Массив со всеми станциями, только станции сгруппированы в массивы по 100шт
	stationsArrayOn100 = [],


	// Аудио-контекст
	audioCtx = new (window.AudioContext || window.webkitAudioContext)(),


	// Основной и запасной аудио источники
	audioApiElement = new AudioApiElement('playerTag'),
	    audioCbElement = new AudioCbElement(),
	    canvasAudioSourceEq3 = new DrawSound(),


	// Таймер для визуализации трека
	// TODO: переделать на requestAnimationFrame
	intervalVis = null,


	// 
	canvasVolume = document.getElementById('canvas-volume'),
	    ctxVolume = canvasVolume.getContext('2d'),
	    canvasVolumeWidth = canvasVolume.width,
	    canvasVolumeHeight = canvasVolume.height;

	canvasVolume.width = 100;
	canvasVolume.height = 30;

	// Погнали!!!;)
	// Состояние пользователя - зарегистрирован или нет, авторизован или нет
	if (localStorage.getItem('userStatus') == undefined) {
		consoleOutput('userStatus == undefined');
		localStorage.setItem('userStatus', JSON.stringify(userStatus));
	} else {
		userStatus = JSON.parse(localStorage.userStatus);
		console.log(userStatus);
		console.log(localStorage);
	}

	if (localStorage.getItem('stations') == undefined) {
		consoleOutput('stations == undefined');
		$.ajax({
			data: { 'action': 'getAllStations' },
			success: function success(data) {
				stationsArray = JSON.parse(data);
				// consoleOutput(stationsArray);
				var size = 0;
				for (var key in stationsArray) {
					size++;
				}
				var totalArrays = Math.ceil(size / 100)
				// size 		= stationsArray.length
				;

				// массив имен станций
				// нужен для правильного получения stationsIndex
				var keys = [];

				for (var key in stationsArray) {
					keys.push(key);
				}

				for (var i = 0; i < totalArrays; i++) {
					// debugger;
					stationsArrayOn100[i] = []; // TODO здесь баги
					for (var j = 0; j < 100; j++) {
						var stationsIndex = keys[i * 100 + j];
						// если последняя станция - break
						// почему?
						// return?
						if (i == totalArrays - 1 && j == size % 100) {
							break;
						}
						// TODO
						//  сделать проверку что stationsArray[stationsIndex] не null
						stationsArrayOn100[i][j] = stationsArray[stationsIndex];
					}
				}
				// consoleOutput(stationsArray);

				localStorage.setItem('stations', JSON.stringify(stationsArray));
				localStorage.setItem('stationsOn100', JSON.stringify(stationsArrayOn100));

				location.reload();
			}
		});
	}

	if (localStorage.getItem('playerState') == undefined) {
		consoleOutput('playerState == undefined');

		// Объект плейлиста
		var defaultPlaylist = new Playlist('Default'); // ?? - нужен ??

		defaultPlaylist.tracks = [883, // Drum and Bass) (Uturn Radio
		3207, // TECHNO4EVER.FM HARD
		884, // TeaTime.FM - 24h Happy Hardcore, Drum and Bass, UK
		3771, // CoreTime.FM - 24h Hardcore, Industrial, Speedcore
		1330, // graal future
		1193, // graal space
		2403, // DubTerrain.net
		7943, // Massive DubStep Trap And Rave
		3210, // Make Some Noise
		2400, // Dubstep.fm
		2599, // Walmer Radio
		4055, // UFO TRAP Radio Station
		6369, // RapTrapRadio
		55, // Dub & Bass
		885, // Dubstep) (Uturn Radio
		7942 // не воспроизводится - для отладки ошибок
		];

		defaultPlaylist.currentTrack = {
			id: 2400,
			url: 'http://stream.dubstep.fm:80/256mp3',
			title: 'Dubstep.fm - 256k MP3',
			scrollPosition: 406
		};

		__playlists['Default'] = defaultPlaylist;
		__playlists['Default'].scrollPosition = 0;
		// consoleOutput(__playlists['Default']);
		// consoleOutput(playerState);

		playerState.currentPlaylist = 'Default';
		// playerState.nowPlaying = {};
		playerState.volume = .27;
		playerState.paused = true;

		playerState.visualisations = {};
		playerState.visualisations.order = ['allEnabled', 'visEqLeft', 'analyserVisVolume', 'visEqRight', 'visTriangle'];
		playerState.visualisations['allEnabled'] = {
			icon: 'flash_auto',
			name: 'allEnabled',
			state: false
		};
		playerState.visualisations['visEqLeft'] = {
			icon: 'graphic_eq',
			name: 'visEqLeft',
			state: false
		};
		playerState.visualisations['visEqRight'] = {
			icon: 'graphic_eq',
			name: 'visEqRight',
			state: false
		};
		playerState.visualisations['analyserVisVolume'] = {
			icon: 'equalizer',
			name: 'analyserVisVolume',
			state: true
		};
		playerState.visualisations['visTriangle'] = {
			icon: 'brightness_auto',
			name: 'visTriangle',
			state: false
		};

		playerState.search.stationsOpened = [];

		localStorage.setItem('playerState', JSON.stringify(playerState));
		localStorage.setItem('__playlists', JSON.stringify(__playlists));
	} else {
		// Получаем актуальное состояние плеера из local storage
		playerState = JSON.parse(localStorage.getItem('playerState'));
		__playlists = JSON.parse(localStorage.getItem('__playlists'));

		stationsArray = JSON.parse(localStorage.getItem('stations'));
		stationsArrayOn100 = JSON.parse(localStorage.getItem('stationsOn100'));

		consoleOutput(playerState);
		consoleOutput(__playlists);

		debugPlayerState();
		debugLocalStorage();
		enableVisualisations();

		var vmPlaylist = new Vue({
			el: '.vmPlaylistsPanel',
			data: {
				edited: false,
				playlistsOrder: playerState.playlistsOrder,
				playlistEdited: -1,
				totalPl: playerState.playlistsOrder.length,
				plWidth: 84,
				curPl: playerState.currentPlaylist
			},
			computed: {
				currentPlaylist: function currentPlaylist(pl) {
					return this.curPl;
				},
				scrollLeft: function scrollLeft() {
					return this.plWidth * this.totalPl;
				}
			},
			methods: {
				setCurrentPlaylist: function setCurrentPlaylist(index, name) {
					consoleOutput(playerState.playlistsOrder[index]);
					consoleOutput(name);

					$('.playlistsPanel').find('.list').mCustomScrollbar('scrollTo', $playlistsPanel.find('[data-name="' + name + '"]').attr('data-scroll-left'));

					$playlistsPanel.find('[data-name="' + playerState.currentPlaylist + '"]').removeAttr('data-current');

					$playlistsPanel.find('[data-name="' + name + '"]').attr('data-current', 1);

					playerState.currentPlaylist = name;

					playlistContainer.find('.mCSB_container').children().remove();

					var tracksArray = __playlists[playerState.currentPlaylist].tracks;
					if (tracksArray.length) {
						playlistManager.makePlaylistTracks(tracksArray);
					}

					// __playlists[playerState.currentPlaylist].scrollPosition = scrollPosition;

					localStorage.setItem('playerState', JSON.stringify(playerState));
					localStorage.setItem('__playlists', JSON.stringify(__playlists));
				},
				deletePlaylist: function deletePlaylist(index, name) {
					consoleOutput(this.playlistsOrder);
					consoleOutput(playerState.playlistsOrder[index]);
					consoleOutput(__playlists);
					consoleOutput(__playlists[playerState.playlistsOrder[index]]);

					delete __playlists[playerState.playlistsOrder[index]];
					this.playlistsOrder.splice(index, 1);

					playerState.playlistsOrder = this.playlistsOrder;
					consoleOutput(this.playlistsOrder);

					localStorage.setItem('playerState', JSON.stringify(playerState));
					localStorage.setItem('__playlists', JSON.stringify(__playlists));
				},
				changeEditMode: function changeEditMode(index, event) {
					consoleOutput(index);
					// consoleOutput($(event.target));
					consoleOutput(this.playlistEdited);
					this.edited = !this.edited;
					if (this.edited) {
						this.playlistEdited = index;
					} else {
						this.playlistEdited = -1;
					}
				},
				editPlaylist: function editPlaylist(index, name, event) {
					var newName = $(event.target).val();

					playerState.playlistsOrder[index] = newName;

					consoleOutput($(event.target));
					if ($(event.target).closest('.playlist').attr('data-current')) {
						playerState.currentPlaylist = newName;
					}

					__playlists[name].name = newName;
					__playlists[newName] = __playlists[name];
					delete __playlists[name];

					localStorage.setItem('playerState', JSON.stringify(playerState));
					localStorage.setItem('__playlists', JSON.stringify(__playlists));
				}
			}
		});

		consoleOutput($('.vmPlaylistsPanel'));

		$('.playlistsPanel .list').mCustomScrollbar({
			axis: 'x',
			// theme:'dark',
			advanced: {
				autoExpandHorizontalScroll: true
			}
		});

		// хак
		$('.playlistsPanel .list').find('.mCSB_container').addClass('flex left');

		// Наполняем $playlistsPanel заголовками плейлистов
		/*for (var i = 0; i < playerState.playlistsOrder.length; i++) {
  	var plName = playerState.playlistsOrder[i];
  	playlistManager.addPanel(plName);
  }*/

		$playlistsPanel.find('[data-name="' + playerState.currentPlaylist + '"]').attr('data-current', 1);

		consoleOutput($playlistsPanel.find('[data-current]').attr('data-scroll-left'));

		$('.playlistsPanel').find('.list').mCustomScrollbar('scrollTo', $playlistsPanel.find('[data-current]').attr('data-scroll-left'));

		/*$('.playlistsPanel').
  		find('.list').
  		// mCustomScrollbar('scrollTo', __playlists[playerState.currentPlaylist].scrollPosition);
  		mCustomScrollbar('scrollTo', $playlistsPanel
  										.find('[data-current]')
  										.attr('data-scroll-left'));*/

		// Задаем свойства объекта Audio свойствами объекта playerState
		// Выставляем громкость
		audioApiElement.setVolume(playerState.volume || .27);
		audioCbElement.setVolume(playerState.volume || .27);

		$('#player .volume input').val(audioApiElement.getVolume() * 100);
		$('#player .volume input').val(audioCbElement.getVolume() * 100);
		$('#player .volume .val').html(Math.floor(audioApiElement.getVolume() * 100));
		$('#player .volume .val').html(Math.floor(audioCbElement.getVolume() * 100));
		// Рисуем соответствующий регулятор
		drawWolumeBar();

		// Создаем контейнер для треков текущего (активного) плейлиста
		/*playlistContainer.append(__playlists[playerState.currentPlaylist].
  							htmlEl
  						);*/

		// Получить массив с id треков плейлиста и сформировать его
		var playlistTracks = __playlists[playerState.currentPlaylist].tracks;

		var playlistPanelWidth = $playlistsPanel.find('.playlist:first').innerWidth();

		__playlists.playlistPanelWidth = playlistPanelWidth;

		if (playlistTracks.length > 0) {
			consoleOutput('make tracks:begin');
			playlistManager.makePlaylistTracks(playlistTracks);
			consoleOutput('make tracks:end');
		} else {
			consoleOutput('Выбранный плейлист пуст - нет треков');
		}

		var vmCurrentTrackTitle = new Vue({
			el: '.currentTrackTitle',
			data: {
				trackTitle: ''
			},
			computed: {
				title: {
					get: function get() {
						// return getCurrentTrack().title;
						return this.trackTitle;
					},
					set: function set(title) {
						consoleOutput(title);
						consoleOutput(getCurrentTrack().title);
						this.trackTitle = title;
						// this.trackTitle = getCurrentTrack().title;
					}
				}
			},
			beforeCreate: function beforeCreate() {
				consoleOutput('vmCurrentTrackTitle::beforeCreate');
			},
			created: function created() {
				consoleOutput('vmCurrentTrackTitle::created');
			},
			beforeMount: function beforeMount() {
				consoleOutput('vmCurrentTrackTitle::beforeMount');
			},
			mounted: function mounted() {
				consoleOutput('vmCurrentTrackTitle::mounted');
			},
			beforeUpdate: function beforeUpdate() {
				consoleOutput('vmCurrentTrackTitle::beforeUpdate');
			},
			updated: function updated() {
				consoleOutput('vmCurrentTrackTitle::updated');
			},
			beforeDestroy: function beforeDestroy() {
				consoleOutput('vmCurrentTrackTitle::beforeDestroy');
			},
			destroyed: function destroyed() {
				consoleOutput('vmCurrentTrackTitle::destroyed');
			}
		});

		if (!playerState.paused) {
			// если плейлист играющего(!) текущего трека != playerState.currentPlaylist
			// сделать что то(?)
			/*if(__playlists[playerState.currentPlaylist].tracks.length) {
   	audioApiElement.playStream(getCurrentTrack().url);
   } else {
   	consoleOutput('няма трэкау');
   	vmPlaylist.setCurrentPlaylist(0, playerState.nowPlaying.playlistName);
   	audioApiElement.playStream(playerState.nowPlaying.track.url);
   }*/

			if (!__playlists[playerState.currentPlaylist].tracks.length) {
				vmPlaylist.setCurrentPlaylist(0, playerState.nowPlaying.playlistName);
			}
			audioApiElement.playStream(getCurrentTrack().url);
		}
		makeConfig();
	}
});

// PWA
// отменяем действие для prompt() по умолчанию
// https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android?hl=en
/*window.addEventListener('beforeinstallprompt', function(e) {
	console.log('beforeinstallprompt Event fired');
	e.preventDefault();
	return false;
});*/

// предложить пользователю добавить сайт на главный экран
window.addEventListener('beforeinstallprompt', function (e) {
	// beforeinstallprompt Event fired
	// e.userChoice will return a Promise.
	e.userChoice.then(function (choiceResult) {
		console.log(choiceResult.outcome);

		if (choiceResult.outcome == 'dismissed') {
			console.log('User cancelled home screen install');
		} else {
			console.log('User added to home screen');
		}
	});
});
'use strict';

$(document).ready(function () {

	function checkLoginUniq(login) {
		console.log('checkLoginUniq');
		$.ajax({
			data: { 'action': 'loginUniq', 'regLogin': login },
			success: function success(data) {
				if (data) {
					$('.form-reg .regLogin').addClass('busy');
					// console.log("Good");
					var response = JSON.parse(data);
					// console.log(response);
					$('.loginsUniq').html('');
					var markup = '';
					for (var i = 0; i < response.length; i++) {
						var fieldBusy = response[i];
						markup += '<div class=\"fieldUniq\"><div class=\"field\">' + fieldBusy.user_login + '</div></div>';
					}
					$('.loginsUniq').html('Used :(:<br>' + markup);
					setTimeout(function () {
						$('.loginsUniq').html('');
					}, 4000);
				} else if (!$('.form-reg .regLogin').hasClass('error')) {
					$('.form-reg .regLogin').removeClass('busy');
					$('.loginsUniq').html('Good choice!');
					setTimeout(function () {
						$('.loginsUniq').html('');
					}, 4000);
				}
			}
		});
	}

	function popupClose(popup, delay) {
		popup.fadeOut(delay);
	}

	function validateField(element) {
		// console.log('validateField');
		var pattern, errorMessage, top;
		if (element.attr('type') == 'text') {
			pattern = /^[A-Za-zА-Яа-яЁё0-9\._-]{3,27}$/;
			errorMessage = 'От 3 до 20 символов';
			top = element.position().top;
		} else if (element.attr('type') == 'password') {
			pattern = /^[A-Za-zА-Яа-яЁё0-9\._-]{5,}$/;
			errorMessage = 'От 5 символов';
			top = element.position().top;
		}

		var value = element.val();
		var check = true;
		if (value.search(pattern) != 0) {
			element.addClass('error');
			/*if(element.prev().hasClass('errorTitle') == false) {
   	element.before('<div class="errorTitle">' + errorMessage);
   	element.prev('.errorTitle').css({'display':'inline-block', 'top':top});
   } else {
   	element.prev('.errorTitle').css({'display':'inline-block', 'top':top});
   }*/
			check = false;
		} else {
			element.removeClass('error');
			// element.prev('.errorTitle').css({'display':'none'});
		}
		return check;
	}

	function equalPassword(pass1, pass2) {
		// console.log('equalPassword');
		if (pass1.val() != pass2.val()) {
			pass2.addClass('error');
			/*if(pass2.prev().hasClass('errorTitlePass') == false) {
   	pass2.before('<div class="errorTitlePass">Пароли не совпадают');
   	pass2.prev('.errorTitlePass').css({'display':'inline-block', 'top':top});
   } else {
   	pass2.prev('.errorTitlePass').css({'display':'inline-block', 'top':top});
   }*/
			return false;
		} else {
			pass2.removeClass('error');
			// pass2.prev('.errorTitlePass').css({'display':'none'});
			return true;
		}
	}

	function loginIsFree(login) {
		console.log('loginIsFree');
		// console.log($(login));
		$.ajax({
			data: { 'action': 'loginIsFree', 'value': login.val() },
			success: function success(data) {
				// console.log("Good");

				if (data === 'true') {
					// console.log($(login));
					console.log('good');
					login.removeClass('busy');
					// return true;
				} else {
					// console.log($(login));
					console.log('busy');
					login.addClass('busy');
					$('.loginsUnique').html('Login is busy');
					setTimeout(function () {
						$('.loginsUnique').html('');
					}, 4000);
					// return false;
				}
				/*var response = JSON.parse(data);
    console.log(response);
    $('.loginsUnique').html('');
    var markup = '';
    for(var i = 0; i < response.length; i++) {
    	var fieldBusy = response[i];
    	markup += '<div class=\"fieldUniques\"><div class=\"field\">' + fieldBusy.user_login
    	+ '</div></div>';
    }
    $('.loginsUnique').html(markup);
    setTimeout(function() {
    	$('.loginsUnique').html('');
    }, 4000);*/
			}
		});
	}

	/*$('.userPanel button').click(function(e) {
 	console.log((this));
 	$('.userPanel button').removeClass('active');
 	$('.form-auth, .form-reg').fadeOut()
 });*/

	$('.showFormSign, .showFormReg').on('click', function () {
		var $el = $(this);
		var targetEl = $el.attr('data-form');
		console.log('покажем форму ' + targetEl);
		$el.toggleClass('active').siblings().toggleClass('active');
		$(targetEl).toggleClass('visible').fadeToggle(300);
		$('.overlayFull').attr('data-visible', true).fadeToggle(300);
		$el.attr('disabled', 'disabled');

		if (!$('.overlayFull').attr('data-visible')) {
			$el.attr('data-visible', true).fadeToggle(300);
		}
	});

	$(".overlayFull").on('click', function () {
		var $el = $(this);

		if ($el.attr('data-visible')) {
			$el.attr('data-visible', false).hide();
		}

		$('.form-reg, .form-auth').hide();
		$('.showFormSign, .showFormReg').removeAttr('disabled');
	});

	//закрытие модального окна и формы, сброс полей формы
	$(".popup-overlay, .close-popup").click(function (e) {
		popupClose($(".popup-container, .popup-overlay"), 500);
		// $(".popup-container, .popup-overlay").fadeOut(500);
		$(':input', ".popup-container").not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
	});

	/*****************************************
 REGISTRATION
 ******************************************/
	$('.form-reg .regLogin').keyup(function (e) {

		var login = $('.form-reg .regLogin');
		if (login.val().length > 2) {
			checkLoginUniq(login.val());
		}

		validateField($(this));

		// return false;
		e.preventDefault();
	});

	$('.form-reg .regPass').keyup(function () {
		validateField($(this));
		/*if($(this).val().length < 4) {
  	setTimeout(function() {
  		validateField($(this));
  	}, 2000);
  } else {
  	validateField($(this));	
  }*/
	});

	$('.form-reg .regPassEx').keyup(function () {
		equalPassword($('.form-reg .regPass'), $(this));
	});

	$('.form-reg .regSubmit').on('click', function (e) {
		var login = $('.form-reg .regLogin');
		var pass = $('.form-reg .regPass');
		var pass2 = $('.form-reg .regPassEx');
		// console.log(loginIsFree(login));
		if (validateField(login) && validateField(pass) && equalPassword(pass, pass2) && !login.hasClass('busy')) {
			$.ajax({
				data: { 'action': 'regUser', 'regLogin': login.val(), 'regPass': pass.val() },
				// url: 'actionsRegistration.php',
				success: function success(data) {
					console.log('Registration is success!!!');
					$('.form-reg').fadeOut(300);
					$('.showFormReg').toggleClass('active').fadeToggle(300);
					$('.successReg').html('You have successfully signed up!').fadeIn(300).addClass('popupHide');
					setTimeout(function () {
						// $('.overlayFull, .success').fadeOut(500);
						$('.overlayFull').fadeOut(500);
						// $('.success').removeClass('popupHide');
					}, 4000);

					$.ajax({
						data: { 'action': 'authUser', 'authLogin': login.val(), 'authPass': pass.val() },
						success: function success(data) {
							if (data) {
								// $('.success').removeClass('popupHide, transparentText');
								console.log('Authorization is success!!!');
								var response = JSON.parse(data);
								console.log(response);
								$('.form-auth').fadeOut(300);
								$('.showFormSign').toggleClass('active').fadeToggle(300);
								$('.successAuth').html('Hi, ' + response.user_login + '<br>Welcome to RA').fadeIn(300).addClass('popupHide');
								setTimeout(function () {
									$('.overlayFull').fadeOut(500);
								}, 4000);
							} else {
								console.log('no data');
								$('.errors').html('Login or password is not correct :(');
								setTimeout(function () {
									$('.errors').html('');
								}, 5000);
							}
						}
					});
				}
			});
		}
		return false;
	});

	$('.form-auth .authSubmit').on('click', function (e) {

		var login = $('.form-auth .authLogin');
		var pass = $('.form-auth .authPass');

		if (validateField(login) && validateField(pass)) {
			$.ajax({
				data: { 'action': 'authUser', 'authLogin': login.val(), 'authPass': pass.val() },
				success: function success(data) {
					if (data) {
						// $('.success').removeClass('popupHide, transparentText');
						console.log('data');
						var response = JSON.parse(data);
						console.log(response);
						$('.form-auth').fadeOut(300);
						$('.showFormSign').toggleClass('active').fadeToggle(300);
						$('.successAuth').html('Hi, ' + response.user_login + '<br>Welcome to RA').fadeIn(300).addClass('popupHide');
						setTimeout(function () {
							$('.overlayFull').fadeOut(500);
						}, 4000);
					} else {
						console.log('no data');
						$('.errors').html('Login or password is not correct :(');
						setTimeout(function () {
							$('.errors').html('');
						}, 5000);
					}
				}
			});
		}
		return false;
	});

	$('.controls .logout').on('click', function (e) {
		console.log('logout');
		return false;
	});
});
'use strict';

$(document).ready(function () {

	function checkUniqToday(uniqHash) {
		$.ajax({
			data: {
				'action': 'checkUniqToday',
				'cookie': uniqHash
			},
			success: function success(data) {
				data = JSON.parse(data);
				if (data.length > 0) {
					addHit(uniqHash);
				} else {
					addVisit(uniqHash);
				}
			}
		});
	}

	function addVisit(uniqHash) {
		var useragent = navigator.userAgent,
		    os = navigator.oscpu || navigator.platform,
		    screensize = screen.width + '*' + screen.height,
		    browsersize = window.innerWidth + '*' + window.innerHeight;

		/*console.log(useragent);
  console.log(os);
  console.log(screensize);
  console.log(browsersize);*/

		$.ajax({
			data: {
				'action': 'addVisit',
				'cookie': uniqHash,
				'useragent': useragent,
				'platform': os,
				'screensize': screensize,
				'browsersize': browsersize,
				'timeonsite': 1
			},
			success: function success(data) {}
		});
	}

	function addHit(uniqHash) {
		/*console.log(useragent);
  console.log(os);
  console.log(screensize);
  console.log(browsersize);*/

		$.ajax({
			data: {
				'action': 'addHit',
				'cookie': uniqHash,
				'timeonsite': 1
			},
			success: function success(data) {}
		});
	}

	var uniqHash;

	if (localStorage.getItem('uniqHash') == undefined) {
		uniqHash = getHash(8);
		localStorage.setItem('uniqHash', uniqHash);
		addVisit(uniqHash);
		console.log('+uniq visit first');
	} else {
		uniqHash = localStorage.getItem('uniqHash');
		checkUniqToday(uniqHash);
	}
});
'use strict';

$(document).ready(function () {

	function getModalMarkup(data) {
		var responseMarkup = '',
		    className = data.result == 'Update SUCCES!' ? 'state-success' : 'state-warning';

		responseMarkup = '<div class="row"><div class="col-md-2">Запрос SQL</div>\
							<div class="col-md-10">' + data.query + '</div></div>\
							<br><br><div class="row ' + className + '">\
							<div class="col-md-2">Результат</div>\
							<div class="col-md-10">' + data.result + '</div></div>';

		return responseMarkup;
	}

	$('.js-create-table').on('click', function (e) {
		var sqlAction = $(this).attr('data-sql'),
		    sqlValue = $($(this).attr('data-sql-value') + ' option:selected').val();

		console.log(sqlAction);
		console.log(sqlValue);

		$.ajax({
			url: 'actionsAdmin.php',
			data: {
				'action': 'makeSql',
				'sqlAction': sqlAction,
				'sqlValue': sqlValue
			},
			success: function success(data) {
				var response = JSON.parse(data);
				console.log(response);

				var modal = $('#sqlResponse');
				modalBody = modal.find('.modal-body'), responseMarkup = getModalMarkup(response);

				modalBody.html(responseMarkup);

				modal.modal('toggle');
			}
		});
	});

	$('.js-drop-table').on('click', function (e) {
		var sqlAction = $(this).attr('data-sql'),
		    sqlValue = $($(this).attr('data-sql-value') + ' option:selected').val();

		console.log(sqlAction);
		console.log(sqlValue);

		$.ajax({
			url: 'actionsAdmin.php',
			data: {
				'action': 'makeSql',
				'sqlAction': sqlAction,
				'sqlValue': sqlValue
			},
			success: function success(data) {
				var response = JSON.parse(data);
				console.log(response);

				var modal = $('#sqlResponse');
				modalBody = modal.find('.modal-body'), responseMarkup = getModalMarkup(response);

				modalBody.html(responseMarkup);

				modal.modal('show');
			}
		});
	});
});
"use strict";

/*
	Фрактал на кривых
*/

// Инициализация переменных
var canvasSquare = document.getElementById("square");
var contextSquare = canvasSquare.getContext("2d");
canvasSquare.width = 1000;
canvasSquare.height = 560;
contextSquare.save();
contextSquare.translate(500, 290);
var x = canvasSquare.width / 2;
var y = canvasSquare.height / 2;
var ln = 120;
var minLn = 2;
var qtMin = 5;
var fib = 1.6180339;
contextSquare.lineWidth = 1;
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
		switch (getRandom()) {
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
			contextSquare.moveTo(-100 + i * 10, -70 + i * 10);
			contextSquare.lineTo(50 + i * 10, 0 + i * 10);
			contextSquare.lineTo(-100 + i * 10, 70 + i * 10);
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

drawFractalRound.onclick = function () {
	drawRound(getRandom() * 10);
};

var drawFractalSquare = document.getElementById("draw_square");

drawFractalSquare.onclick = function () {
	drawSquare(getRandom() * 5);
};

var drawFractal = document.getElementById("add_fractal");

drawFractal.onclick = function () {
	addFractal(getRandom() * 10);
};

/* var clear = document.getElementById("clear");
clear.onclick = function() {
	contextSquare.fillRect(0, 0, canvasSquare.width, canvasSquare.height);
} */

// Инициализация переменных
var canvasTriangle = document.getElementById("triangle");
var contextTriangle = canvasTriangle.getContext("2d");
canvasTriangle.width = 540;
canvasTriangle.height = 480;
contextTriangle.translate(240, 240);
var x = canvasTriangle.width / 2;
var y = canvasTriangle.height / 2;
var ln = 120;
var minLn = 2;
// var qt = 120;
contextTriangle.lineWidth = 1;
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
			contextTriangle.moveTo(240, 40);
			contextTriangle.lineTo(40, 240);
			contextTriangle.lineTo(440, 240);
			contextTriangle.lineTo(240, 40);
			contextTriangle.stroke();
			if (i % 2 == 0) {
				// contextTriangle.strokeStyle = "rgb(0," + Math.floor(255 - 255 / qt1 * i) + "," + Math.floor(255 - 255 / qt1 * i) + ")";
			} else if (i % 3 == 0) {
				contextTriangle.strokeStyle = "rgb(," + Math.floor(0 + 255 / qt1 * i) + "0," + Math.floor(0 + 255 / qt1 * i) + ")";
			} else {
				contextTriangle.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt1 * i) + "," + Math.floor(0 + 255 / qt1 * i) + ",0)";
			}
			contextTriangle.stroke();
			contextTriangle.rotate(2 * Math.PI * 4 / (qt1 - 1));
			// contextTriangle.scale(0.5);
		}
	} else {
		for (var i = 0; i < qt1; i++) {
			contextTriangle.moveTo(240, 40);
			contextTriangle.lineTo(40, 240);
			contextTriangle.lineTo(440, 240);
			contextTriangle.lineTo(240, 40);
			contextTriangle.stroke();
			if (i % 2 == 0) {
				contextTriangle.strokeStyle = "rgb(" + Math.floor(255 - 255 / qt1 * i) + "0," + Math.floor(255 - 255 / qt1 * i) + ")";
			} else if (i % 3 == 0) {
				contextTriangle.strokeStyle = "rgb(0," + Math.floor(0 + 255 / qt1 * i) + "," + Math.floor(0 + 255 / qt1 * i) + ")";
			} else {
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
'use strict';

/*Fractals*/
$(document).ready(function () {

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
	    shapeRadiusValue = $('.shape-radius-value');

	orbitRadius.attr('max', canvasWidth / 2);

	orbitRadiusValue.text(orbitRadius.val());
	trianglePointQuantityValue.text(trianglePointQuantity.val());
	fractalQuantityValue.text(fractalQuantity.val());
	fractalRadiusValue.text(fractalRadius.val());
	triangleRadiusValue.text(triangleRadius.val());
	shapeRadiusValue.text(shapeRadius.val());

	// ctx.translate(0 - +orbitRadius.val() * 3, 0);

	$('.clear').click(function () {
		// ctx.translate(0, 0);
		ctx.clearRect(0 - fractalCenterX, 0 - fractalCenterY, canvasWidth, canvasHeight);
		// ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	});

	drawRoundFractalButton.click(function () {
		// ctx.moveTo(fractalCenterX + ((fractalRadius + shapeRadius) * 2), fractalCenterY + ((fractalRadius + shapeRadius) * 2));
		// drawOrbit(orbitRadius.val(), trianglePointQuantity.val());
		// drawRoundFractal(fractalRadius.val(), fractalQuantity.val());
		// ctx.translate(0 - +orbitRadius.val() * 3, 0);
		drawRoundFractal(orbitRadius.val(), fractalQuantity.val());
		ctx.strokeStyle = getRandomRgbColor();
		// ctx.translate(0 + +orbitRadius.val() * 3, 0);
	});

	$('.draw-triangle-fractal').click(function () {
		drawTriangle(trianglePointQuantity.val());
		ctx.strokeStyle = getRandomRgbColor();
	});

	$('input').change(function () {
		// drawOrbit(orbitRadius.val(), trianglePointQuantity.val());
		orbitRadiusValue.text(orbitRadius.val());
		trianglePointQuantityValue.text(trianglePointQuantity.val());
		fractalQuantityValue.text(fractalQuantity.val());
		fractalRadiusValue.text(fractalRadius.val());
		triangleRadiusValue.text(triangleRadius.val());
		shapeRadiusValue.text(shapeRadius.val());
		ctx.strokeStyle = getRandomRgbColor();
	});

	$('.draw-spiral').click(function () {
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
		var r = Math.floor(255 - 255 / q * i);
		var g = Math.floor(0 + 255 / q * i);
		var b = Math.floor(255 - 255 / q * i);
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
		return Math.PI / 180 * angle;
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
			x: x,
			y: y
		};
		return coords;
	}

	function getArrayPoints(radius, quantity) {
		// ctx.translate(fractalCenterX, fractalCenterY);
		var array = [];
		for (var i = 0; i < quantity; i++) {

			var coords = {
				x: Math.round(getPointCenterX(radius, quantity, i)),
				y: Math.round(getPointCenterY(radius, quantity, i))
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
		for (var i = 0; i < all; i++) {
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
		for (var i = 0; i < fractalQuantity; i++) {
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
		var radians = Math.PI / 180 * angle;
		for (var i = 0; i < all; i++) {
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