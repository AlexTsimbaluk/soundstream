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

		console.log('XHR error');
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

	$('body').attr('data-useragent', navigator.userAgent);

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
			// console.log(path);
			imageArr[i] = path;
		}
		// imageArr.sort(compareRandom);
		// console.log(imageArr);

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

	// Отобразить название станции при воспроизведении
	function displayState() {
		var title = getCurrentTrack().title,
		    titleSize = title.length,
		    titleContainer = $('#player .info .trackTitle'),
		    maxWidth = 250,
		    maxSize,
		    titleContainerWidth,
		    ratio;

		// Поставим <title>
		$('title').html('RadioRA::' + title);

		titleContainer.html(title).removeClass('runningString').parent().css({ 'width': 'auto' });

		titleContainerWidth = titleContainer.width();
		ratio = titleContainerWidth / titleSize;
		maxSize = Math.floor(maxWidth / ratio) - 5;

		if (titleContainerWidth > 240) {
			if (window.innerWidth > 700) {
				titleContainer.addClass('runningString').parent().css({ 'width': '240px' });
			} else {
				titleContainer.html(title.substr(0, maxSize) + '...');
			}
		} else {
			titleContainer.removeClass('runningString').parent().css({ 'width': 'auto' });
		}
	}

	// Добавить станцию в плейлист
	function addToPlaylist(id) {
		$.ajax({
			data: { 'action': 'getStation', 'id': id },
			success: function success(data) {
				var response = JSON.parse(data),
				    playlist = playlistContainer.find('.playlist[data-name="' + playerState.currentPlaylist + '"]');
				var markup = '';
				for (var i = 0; i < response.length; i++) {
					var track = response[i];
					markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete">\
							<i class="fa fa-minus"></i>\
							</div><div class="title">' + track.station_title + '</div><div class="url">' + track.station_url + '</div></div>';

					playerState.playlists[playerState.currentPlaylist].tracks.push(+track.station_id);
					playerState.playlists[playerState.currentPlaylist].currentTrack = {
						id: track.station_id,
						url: track.station_url,
						title: track.station_title
					};
				}
				localStorage.setItem('playerState', JSON.stringify(playerState));

				playlist.html(playlist.html() + markup);
			}
		});
	}

	// Конструктор объекта Playlist
	function Playlist(name) {
		this.name = name;
		// this.active = active;
		this.tracks = [];
		this.currentTrack = {};
		this.titleHtmlEl = '<div class="playlist sortable" data-name="' + this.name + '">' + this.name + '</div>';

		this.htmlEl = '<div class="playlist sortable" data-name="' + this.name + '"></div>';

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
		// функция для добавления плейлистов на панель
		this.addPanel = function (name, scrollable) {
			var pl = __playlists[name].titleHtmlEl;
			if (scrollable) {
				$playlistsPanel.find('.list .mCSB_container').append(pl);
			} else {
				$playlistsPanel.find('.list').append(pl);
			}
		};

		this.addTrack = function () {};

		this.makeTracks = function () {
			var playlistTracks = __playlists[playerState.currentPlaylist].tracks;

			console.log(playlistTracks);

			playlistContainer.append(__playlists[playerState.currentPlaylist].htmlEl);

			if (playlistTracks.length > 0) {
				/*var response = stationsArray,
    	playlist = playlistContainer
    				.find('.playlist[data-name="' 	+
    					playerState.currentPlaylist +
    					'"]'),
    	markup = ''
    ;*/

				// console.log('response');

				for (var i = 0; i < playlistTracks.length; i++) {
					/*var track = response[i];
     markup += 
     		'<div class="track" data-station-id="' 	+
     			track.station_id 					+
     			'" data-station-title="' 			+
     			track.station_title 				+
     			'" data-station-url="' 				+
     			track.station_url 					+
     			'"><div class="delete"><i class="fa fa-minus"></i></div> \
     				<div class="canplaytest"><i class="fa fa-music"></i></div>\
     				<div class="title">' 			+
     			track.station_title 				+
     			'</div><div class="url">' 			+
     			track.station_url 					+
     			'</div></div>'
     ;*/
					addToPlaylist(playlistTracks[i]);
				}

				// playlist.html(playlist.html() + markup);

				$('.playlistContainer').mCustomScrollbar({
					// theme:"dark"
				});
			} else {
				console.log(0);
			}
		};

		this.setCurrent = function (name) {
			$playlistsPanel.find('[data-name="' + playerState.currentPlaylist + '"]').removeAttr('data-current');

			$playlistsPanel.find('[data-name="' + name + '"]').attr('data-current', 1);

			playerState.currentPlaylist = name;

			playlistContainer.find('.mCustomScrollBox').remove();
			self.makeTracks();

			localStorage.setItem('playerState', JSON.stringify(playerState));
		};
	}

	// TODO: analyser сделать отдельным объектом,
	// с которым будет работать AudioApiElement
	function Analyser(ctx, src, analyserOpts) {
		var self = this;
		var analyser = ctx.createAnalyser();
		analyser.smoothingTimeConstant = analyserOpts.smoothingTimeConstant || 0.7;
		analyser.fftSize = analyserOpts.fftSize || 512;

		src.connect(analyser);
		analyser.connect(audioCtx.destination);

		var sampleAudioStream = function sampleAudioStream() {
			analyser.getByteFrequencyData(self.streamData);
			var total = 0;
			for (var i = 0; i < 80; i++) {
				total += self.streamData[i];
			}
		};
		setInterval(sampleAudioStream, 20);

		self.streamData = new Uint8Array(analyser.frequencyBinCount);
	}

	function AudioApiElement(audioElement) {
		var $playerTag = document.getElementById(audioElement);
		var self = this;
		/*function createAnalyser(opts) {
   var a = audioCtx.createAnalyser();
  	a.smoothingTimeConstant = opts.smoothingTimeConstant || 0.7;
  	a.fftSize = opts.fftSize || 512;
  	return a;
  }*/

		var source = audioCtx.createMediaElementSource($playerTag);

		var analyser_1 = new Analyser(audioCtx, source, { smoothingTimeConstant: 0.5, fftSize: 1024 });
		var analyser_2 = new Analyser(audioCtx, source, { smoothingTimeConstant: 0.5, fftSize: 1024 });
		var analyser_3 = new Analyser(audioCtx, source, { smoothingTimeConstant: 0.5, fftSize: 64 });
		var analyser_4 = new Analyser(audioCtx, source, { smoothingTimeConstant: 0.5, fftSize: 512 });

		this.streamData_1 = analyser_1.streamData;
		this.streamData_2 = analyser_2.streamData;
		this.streamData_3 = analyser_3.streamData;
		this.streamData_4 = analyser_4.streamData;

		audioBindAll($playerTag, 'AudioApiElement');

		this.playStream = function (streamUrl) {
			console.log('AudioApiElement::playStream::Begin');

			// jquery-объект трека, который надо играть
			var currentTrackEl = $('[data-station-url="' + streamUrl + '"]');

			console.log(currentTrackEl);
			console.log(streamUrl);
			$('.playlistContainer').mCustomScrollbar('scrollTo', currentTrackEl.position().top);

			/*$('.playlistContainer')
   	.mCustomScrollbar('scrollTo', getCurrentTrack().scrollPosition);*/

			// Соберем временный объект для удобства
			var _currentTrack = {
				url: currentTrackEl.attr('data-station-url'),
				title: currentTrackEl.attr('data-station-title'),
				id: currentTrackEl.attr('data-station-id'),
				scrollPosition: currentTrackEl.position().top
			};

			// Изменим объект состояния
			playerState.playlists[getCurrentPlaylist()].currentTrack = _currentTrack;

			__playlists[getCurrentPlaylist()].currentTrack = _currentTrack;

			// Запишем в объект состояния свойтво
			// с позицией по высоте текущего трека
			// для скрола к нему при загрузке страницы
			/*playerState.
   	playlists[getCurrentPlaylist()].
   	currentTrack.
   	scrollPosition = currentTrackEl.position().top;
   	__playlists[getCurrentPlaylist()].
   	currentTrack.
   	scrollPosition = currentTrackEl.position().top;*/

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
    	console.log('Promise::Automatic playback started!');
    	$(".spinner").hide();
    }).catch(function(error) {
    	$(".spinner").hide();
    	console.log('Promise::Automatic playback failed...');
    	console.log(error);
    	self.stopStream();
    	$('.playlistContainer .track[data-current-track]').
    	removeAttr('data-current-track');
    });*/

				playPromise.then(function () {
					console.log('AudioApiElement::playPromise::Success::Begin');
					console.log('AudioApiElement::playPromise::Success::End');
				}).catch(function () {
					console.log('AudioApiElement::playPromise::Failed::Begin');

					self.stopStream();

					audioCbElement.playStream(streamUrl);
					console.log('Start audioCbElement');
					console.log('AudioApiElement::playPromise::Failed::End');
				});
			}

			playerState.paused = $playerTag.paused;
			localStorage.setItem('playerState', JSON.stringify(playerState));
			localStorage.setItem('__playlists', JSON.stringify(__playlists));
			drawEq1();
			drawEq2();
			drawEq3();

			console.log('AudioApiElement::playStream::End');
			// TODO: добавить на играющий трек эквалайзер
			// addEqToTrack(currentTrackEl, 'canvas-audio-source');
		};
		// TODO: добавить сюда остановку анимации
		this.stopStream = function () {
			visualisationStop();
			$('#player .play').removeClass('visualisation');
			$('#player .info .trackTitle').html('').removeClass('runningString').parent().css({ 'width': 'auto' });

			$playerTag.pause();

			audioCbElement.stopStream();
			// $playerTag.currentTime = 0;
			// playerState.paused = $playerTag.paused;
			console.log('AudioApiElement::stopStream');
			localStorage.setItem('playerState', JSON.stringify(playerState));
		};
		this.setVolume = function (vol) {
			$playerTag.volume = vol;
		};
		this.getVolume = function () {
			return $playerTag.volume;
		};
		// self.setVolume(playerState.volume);
	}

	// Колбэк если не срабатывает Audio API
	function AudioCbElement() {
		var player = new Audio();

		audioBindAll(player, 'AudioCbElement');

		this.playStream = function (streamUrl) {
			console.log('AudioCbElement::playStream::Begin');
			player.src = streamUrl;

			player.play();
			// $(".spinner").show();

			console.log(player.paused);
			playerState.paused = player.paused;

			localStorage.setItem('playerState', JSON.stringify(playerState));
			console.log('AudioCbElement::playStream::End');
		};
		this.stopStream = function () {
			visualisationStop();
			$('#player .play').removeClass('visualisation');
			$('#player .info .trackTitle').html('').removeClass('runningString').parent().css({ 'width': 'auto' });

			player.pause();
			player.currentTime = 0;
			playerState.paused = player.paused;
			console.log('AudioCbElement::stopStream');
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
			console.log(name + '::Event.type::' + e.type);
		});
	}

	function audioBindVolume(player, name) {
		player.addEventListener('volumechange', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
	}

	function audioBindAll(player, name) {
		function playingTrack() {
			if ($('[data-current-track]').hasClass('waiting')) {
				$('[data-current-track]').removeClass('waiting');
			}
		}
		player.addEventListener('abort', function (e) {
			console.log(name + '::Event.type::' + e.type);
			$(".spinner").hide();
		});
		player.addEventListener('canplay', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('canplaythrough', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('durationchange', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('emptied', function (e) {
			console.log(name + '::Event.type::' + e.type);
			$(".spinner").hide();
		});
		player.addEventListener('encrypted', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('ended', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('error', function (e) {
			console.log(name + '::Event.type::' + e.type);
			$(".spinner").hide();
		});
		player.addEventListener('interruptbegin', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('interruptend', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('loadeddata', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('loadedmetadata', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('loadstart', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('mozaudioavailable', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('pause', function (e) {
			console.log(name + '::Event.type::' + e.type);

			console.log('pause::' + player.paused);
			player.currentTime = 0;
			playerState.paused = player.paused;

			visualisationStop();
		});
		player.addEventListener('play', function (e) {
			console.log(name + '::Event.type::' + e.type);
			$(".spinner").show();
			$('[data-current-track]').addClass('waiting');
		});
		player.addEventListener('playing', function (e) {
			console.log(name + '::Event.type::' + e.type);

			console.log('pause::' + player.paused);
			playerState.paused = player.paused;

			$(".spinner").hide();

			playingTrack();

			visualisation();
			displayState();
		});
		player.addEventListener('ratechange', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('seeked', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('seeking', function (e) {
			console.log(name + '::Event.type::' + e.type);
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
			console.log(name + '::Event.type::' + e.type);
			$(".spinner").hide();
		});
		player.addEventListener('suspend', function (e) {
			console.log(name + '::Event.type::' + e.type);
		});
		player.addEventListener('waiting', function (e) {
			console.log(name + '::Event.type::' + e.type);
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

	function drawEq1() {
		// получаем canvas
		var canvas = new AudioCanvas('canvas-audio-source', 500, 255 * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

		for (var bin = 0; bin < audioApiElement.streamData_1.length; bin++) {
			var val = audioApiElement.streamData_1[bin];
			canvas.ctx.fillStyle = 'rgb(' + val + ',' + val + ',' + val + ')';
			// canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
			canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 + 1, 1, Math.floor(-val / 1.5));
			canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 - 1, 1, Math.floor(val / 1.5));
		}
		requestAnimationFrame(drawEq1);
	};

	function drawEq2() {
		// получаем canvas
		var canvas = new AudioCanvas('canvas-audio-source-eq2', 500, 255 * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

		for (var bin = 0, size = audioApiElement.streamData_2.length; bin < size; bin++) {
			var val = audioApiElement.streamData_2[bin];
			// canvas.ctx.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
			// canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
			canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + val + ',' + (255 - val) + ')';
			canvas.ctx.fillRect(size - bin, canvas.canvasHeight / 2 + 1, 1, -val / 1.5);
			canvas.ctx.fillRect(size - bin, canvas.canvasHeight / 2 - 1, 1, val / 1.5);
		}
		requestAnimationFrame(drawEq2);
	};

	function drawEq3() {
		var canvas = new AudioCanvas('canvas-audio-source-eq3', 288, 20);
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
		for (var i = 0; i < audioApiElement.streamData_3.length; i++) {
			var val = audioApiElement.streamData_3[i],
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
		requestAnimationFrame(drawEq3);
	};

	function drawEq4() {
		// получаем canvas
		var canvas = new AudioCanvas('canvas-fractal', 500, 255 * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

		for (var bin = 0; bin < audioApiElement.streamData_4.length; bin++) {
			var val = audioApiElement.streamData_4[bin];
			canvas.ctx.fillStyle = 'rgb(' + val + ',' + val + ',' + val + ')';
			// canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
			canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 + 1, 1, Math.floor(-val / 1.5));
			canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 - 1, 1, Math.floor(val / 1.5));
		}
		requestAnimationFrame(drawEq4);
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
		console.log('visualisation::Begin');
		visualisationStop();

		var el = $('.playlistContainer [data-station-id="' + getCurrentTrack().id + '"]');
		el.addClass('visualisation');

		$('#player .play').addClass('visualisation');
		$('#player .play span').remove();
		$('#player .play.visualisation').prepend('<span class="inner"></span><span class="outer"></span>');

		var stepGrad1 = Math.floor(Math.random() * 360),
		    stepGrad2 = stepGrad1 + 180,
		    stepBorder1 = Math.floor(Math.random() * 360),
		    stepBorder2 = stepBorder1 + 180;

		if (window.innerWidth > 700) {
			intervalVis = setInterval(function () {
				el.css({ 'backgroundImage': 'linear-gradient(to right, hsl(' + ++stepGrad1 % 360 + ', 60%, 50%) 0%, hsl(' + ++stepGrad2 % 360 + ', 60%, 50%) 100%)' });

				$('#player .play.visualisation').css({ 'boxShadow': '0px 0px 5px 0.4px hsl(' + ++stepBorder1 % 360 + ', 100%, 50%)', 'borderColor': 'hsl(' + ++stepBorder1 % 360 + ', 100%, 50%)' });

				$('#player .play.visualisation .inner').css({ 'borderBottomColor': 'hsl(' + ++stepBorder1 % 360 + ', 100%, 50%)' });

				$('#player .play.visualisation .outer').css({ 'borderTopColor': 'hsl(' + ++stepBorder1 % 360 + ', 100%, 50%)' });
			}, 50);
		}
		console.log('visualisation::End');
	}

	// Остановка визуализации
	function visualisationStop() {
		console.log('visualisationStop::Begin');
		clearInterval(intervalVis);
		var el = $('.playlistContainer [data-station-id="' + getCurrentTrack().id + '"]');
		el.removeClass('visualisation').css({ 'backgroundImage': 'none' }).removeAttr('style');
		$('#player .play').removeClass('visualisation').css({ 'boxShadow': 'none', 'borderColor': '#0ff' }).removeAttr('style');
		$('#player .play span').remove();
		console.log('visualisationStop::End');
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
		// console.log(maxBar);

		for (var i = 0; i < targetCountBar; i++) {
			ctxVolume.fillStyle = 'hsl(' + i * maxHue / targetCountBar + ', 100%, 50%)';
			ctxVolume.fillRect(i * (gutterWidth + barWidth), canvasVolumeHeight - i * barStepHeight - barStepHeight, barWidth, i * barStepHeight + barStepHeight);

			ctxVolume.fill();
		}
		/*ctxVolume.fillRect(10 * (gutterWidth + barWidth), canvasVolumeHeight - 10 * barStepHeight - barStepHeight, barWidth, 10 * barStepHeight + barStepHeight);
  ctxVolume.fill();*/

		startHue += 15 % 360;
		// console.log(startHue);
	}

	function animateCloseButton(el) {
		setTimeout(function () {
			$('.searchContainer .close').animate({ top: -(el.mcs.top - 10) + 'px' }, 150);
		}, 50);
	}

	function getCurrentPlaylist() {
		return playerState.currentPlaylist;
	}

	function getCurrentTrack() {
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
			console.log('no siblings');
		}
	}

	function debugPlayerState() {
		// console.log('::debugPlayerState');
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

			console.log(prop);
			console.log($removeButton);

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
						console.log('delete playerState.' + prop);
						break;

					case 'volume':
						delete playerState.volume;
						console.log('delete playerState.' + prop);
						break;

					default:
						break;
				}

				console.log(playerState);
				localStorage.setItem('playerState', JSON.stringify(playerState));

				$(this).html('Reset').attr('disabled', 'disabled').attr('title', 'Change prop of playerState').removeAttr('data-remove-prop');
				$option.remove();

				return false;
			});
		});
	}

	function debugLocalStorage() {
		// console.log('::debugLocalStorage');
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

			console.log($option);

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
				console.log($option);

				switch (item) {
					case 'playerState':
						localStorage.removeItem(item);
						console.log('delete ' + item);
						break;

					case 'stations':
					case 'stationsOn100':
						localStorage.removeItem('stations');
						localStorage.removeItem('stationsOn100');
						console.log('delete ' + item);
						console.log('delete ' + item + 'On100');
						break;

					case 'uniqHash':
						localStorage.removeItem(item);
						console.log('delete ' + item);
						break;

					case 'userStatus':
						localStorage.removeItem(item);
						console.log('delete ' + item);
						break;

					case 'localStorage':
						localStorage.clear();
						console.log('delete ' + item);
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

	function getObjectProperties(obj) {
		console.log('::getObjectProperties');
		for (var key in obj) {
			console.log(key + ' : ' + obj[key]);
			if (_typeof(obj[key]) === 'object') {
				var _o = obj[key];
				// if(typeof +obj[key] == 'number') {
				/*if(!isNaN(parseFloat(key))) {
    	console.log('number');
    }*/
				// console.log('Тип ' + typeof key);
				getObjectProperties(_o);
			}
		}
	}

	$('#player .prev').click(function (e) {
		console.log('prev');
		var playUrl = getSibling('prev');
		console.log(playUrl);
		if (playUrl) {
			audioApiElement.stopStream();
			audioApiElement.playStream(playUrl);
		}
	});

	$('#player .next').click(function (e) {
		console.log('next');
		var playUrl = getSibling('next');
		console.log(playUrl);
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
				$(this).removeAttr('data-current-track');
				audioApiElement.stopStream();
			} else {
				$(this).attr('data-current-track', 1);
				var url = $(this).data('stationUrl');
				audioApiElement.stopStream();
				audioApiElement.playStream(url);
			}
		} else {
			$(this).attr('data-current-track', 1);
			var url = $(this).data('stationUrl');
			audioApiElement.playStream(url);
		}

		console.log($(this).position().top);
	});

	// TODO: в кликах на кнопку stop проверять player.paused
	$('#player .stop').click(function (e) {
		audioApiElement.stopStream();
	});

	$('.playlistContainer').on('click', '.delete', function (e) {
		var id = $(this).parent().data('stationId'),
		    pl = playerState.playlists[playerState.currentPlaylist];

		pl.tracks.splice(pl.tracks.indexOf(id), 1);
		$(this).parent().remove();
		localStorage.setItem('playerState', JSON.stringify(playerState));
		return false;
	});

	$('.playlistContainer').on('click', '.canplaytest', function (e) {
		var url = $(e.target).closest('.track').data('stationUrl');
		console.log(url);
		e.stopPropagation();
	});

	$('.toAdmin').on('click', function (e) {
		console.log('toAdmin');
		$('body').addClass('admin');

		$.ajax({
			data: { 'admin': 1 },
			success: function success(data) {
				$('#player').after(data);
				$('#player').hide();

				$('.toPlayer').on('click', function (e) {
					console.log('toPlayer');
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
	$('#player .find .showFieldSearch').click(function (e) {
		$(this).toggleClass('active');

		var searchInput = $(this).parent().find('input');

		if (searchInput.hasClass('visible') == false) {
			searchInput.addClass('visible').animate({ opacity: 1, width: 190 }, 100);

			setTimeout(function () {
				searchInput.focus();
			}, 300);
		} else {
			searchInput.removeClass('visible').animate({ opacity: 0, width: 0 }, 100).blur();
		}
	});

	// Поиск и показ найденных станций
	$('#player .find input').on('keyup', function (e) {
		var target = $(this).val();

		if (target.length > 2) {
			$(".spinner").show();

			$.ajax({
				data: { 'action': 'search', 'target': target },
				success: function success(data) {
					var response = JSON.parse(data),
					    result = $('.searchContainer .result'),
					    markup = '<div class="total"><span>' + response.length + '</span> stations is found</div>';

					result.html('');

					for (var i = 0; i < response.length; i++) {
						var station = response[i];

						markup += '<div class="station" data-station-id="' + station.station_id + '"><div class="add"><i class="fa fa-plus"></i></div><div class="title">' + station.station_title + '</div><div class="url">' + station.station_url + '</div></div>';
					}

					result.html(markup);

					$(".spinner").hide();

					$('.searchContainer').removeClass('searchContainerFadeOut').addClass('searchContainerFadeIn visible').parent().removeClass('playerLeft').addClass('playerRight');

					if (window.innerHeight <= 640 && window.innerWidth < 700) {
						$('.playlistContainer').toggleClass('hidden');
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
   		console.log((dateLoad - dateStart) + 'ms');
   	}
   });*/

			var response = stationsArray,
			    stationsOpened = playerState.search.stationsOpened || [],
			    size = response.length,
			    result = $('.searchContainer .result'),

			// станций в блоке и всего блоков
			IN_BLOCK = 100,
			    totalBlocks = Math.ceil(size / IN_BLOCK),

			// начальная разметка - общее количество станций
			markup = '<div class="total"><span>' + size + '</span> stations is found</div>';
			console.log(size);
			console.log(totalBlocks);

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
						markup += '<div class="station" data-station-id="' + station.station_id + '"><div class="add"><i class="fa fa-plus"></i></div><div class="title">' + station.station_title + '</div><div class="url">' + station.station_url + '</div></div>';
					}
					markup += '</div>';
					$(this).after(markup);
					$(this).attr('data-show', 'open');

					console.log(stationsOpened);
					stationsOpened.push(index);
					console.log(stationsOpened);

					if (stationsOpened.length > 3) {
						console.log('лишний ' + stationsOpened[0]);

						$('[data-stations-number="' + stationsOpened[0] + '"]').remove();
						$('[data-block-number="' + stationsOpened[0] + '"]').attr('data-show', 'closed');

						console.log(stationsOpened);
						stationsOpened.shift();
						console.log(stationsOpened);
					}

					console.log('stationsBlockToggle №' + index + ' opened');
					console.log(stationsOpened);

					/*localStorage.setItem('playerState', JSON.stringify(playerState));
     return false;*/
				} else {
					// TODO: при скрытии списка станций удалять его номер из этого массива
					// https://learn.javascript.ru/array-iteration#filter
					var _stationsOpened = stationsOpened.filter(function (el) {
						console.log('filter');
						return el != index;
					});

					stationsOpened = _stationsOpened;
					console.log(stationsOpened);

					$(this).next('[data-stations-number]').remove();
					$(this).attr('data-show', 'closed');

					console.log('stationsBlockToggle №' + index + ' removed');

					// return false;
				}
				localStorage.setItem('playerState', JSON.stringify(playerState));
				return false;
			});

			if (stationsOpened.length > 0) {
				var targetBlock = stationsOpened[stationsOpened.length - 1],
				    $targetBlock = $('[data-block-number="' + targetBlock + '"]'),
				    markupStationsList = '';

				stationsOpened = [];
				console.log('targetBlock is ' + targetBlock);
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

				console.log(stationsOpened);
				stationsOpened.push(targetBlock);
				console.log('stationsBlockToggle №' + targetBlock + ' opened');
				console.log(stationsOpened);

				localStorage.setItem('playerState', JSON.stringify(playerState));
			}

			$(".spinner").hide();

			var dateLoad = new Date().getTime();
			console.log(dateLoad - dateStart + 'ms');
		}

		$(".spinner").show();

		if ($('.searchContainer').hasClass('visible')) {
			$('.searchContainer').removeClass('searchContainerFadeIn visible').addClass('searchContainerFadeOut').parent().removeClass('playerRight').addClass('playerLeft');
		} else {
			$('.searchContainer').removeClass('searchContainerFadeOut').addClass('searchContainerFadeIn visible').parent().removeClass('playerLeft').addClass('playerRight');
		}

		if (window.innerHeight <= 640 && window.innerWidth < 700) {
			$('.playlistContainer').toggleClass('hidden');
		}

		$(".spinner").hide();
	});

	// Закрытие блока с результатами поиска
	$('.searchContainer .close').on('click', function (e) {
		$('.showAll').removeClass('active');

		if (window.innerHeight <= 640 && window.innerWidth < 700) {
			$('.playlistContainer').toggleClass('hidden');
		}

		$('.searchContainer').removeClass('searchContainerFadeIn visible').addClass('searchContainerFadeOut').parent().removeClass('playerRight').addClass('playerLeft');
	});

	// Добавление станций в плейлист
	// Доделать, чтобы станции добавлялись в активный плэйлист
	$('.searchContainer').on('click', '.add', function (e) {
		addToPlaylist($(this).parent().data('stationId'));
	});

	$('.searchContainer').on('click', '.station', function (e) {
		addToPlaylist($(this).data('stationId'));
	});

	$('.playlist-new').on('click', function (e) {
		console.log('::new playlist');

		var defaultPLName = new Date().getTime();

		var pl = new Playlist(defaultPLName);
		console.log(pl);

		/*__playlists[defaultPLName] = pl;
  console.log(__playlists['Default']);*/

		/*playerState
  	.playlists[playerState.currentPlaylist]
  	 = pl;*/

		playlistManager.addPanel(defaultPLName, true);
	});

	$('.playlistsPanel').on('click', '.playlist', function () {
		console.log('::Change playlist::' + $(this).attr('data-name'));
		playlistManager.setCurrent($(this).attr('data-name'));
	});

	/*
 	Чтобы на экранах в высоту меньше 640px у блока playlistContainer с треками 
 	выставить всю доступную высоту
 */
	if (window.innerHeight <= 640 && window.innerWidth < 700) {
		var _playlistContainerHeight = $('#player').height() - ($('#player .playlistsPanel').height() + $('#player .trackContainer').height());
		console.log(_playlistContainerHeight);
		$('.searchContainer, .playlistContainer', '#player').height(_playlistContainerHeight);
	}

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
		console.log('userStatus == undefined');
		localStorage.setItem('userStatus', JSON.stringify(userStatus));
	} else {
		userStatus = JSON.parse(localStorage.userStatus);
	}

	if (localStorage.getItem('stations') == undefined) {
		console.log('stations == undefined');
		$.ajax({
			data: { 'action': 'getAllStations' },
			success: function success(data) {
				stationsArray = JSON.parse(data);
				var size = 0;
				for (var key in stationsArray) {
					size++;
				}
				var totalArrays = Math.ceil(size / 100)
				// size 		= stationsArray.length
				;

				for (var i = 0; i < totalArrays; i++) {
					debugger;
					stationsArrayOn100[i] = [];
					for (var j = 0; j < 100; j++) {
						var stationsIndex = i * 100 + j;
						if (i == totalArrays - 1 && j == size % 100) {
							break;
						}
						stationsArrayOn100[i][j] = stationsArray[stationsIndex];
					}
					// console.log(stationsArrayOn100[i]);
				}

				localStorage.setItem('stations', JSON.stringify(stationsArray));
				localStorage.setItem('stationsOn100', JSON.stringify(stationsArrayOn100));
			}
		});
	} else {
		stationsArray = JSON.parse(localStorage.getItem('stations'));
		stationsArrayOn100 = JSON.parse(localStorage.getItem('stationsOn100'));
	}

	if (localStorage.getItem('playerState') == undefined) {
		console.log('playerState == undefined');
		// Объект плейлиста
		var defaultPlaylist = new Playlist('Default'); // ?? - нужен ??

		defaultPlaylist.tracks = [884, // Drum and Bass) (Uturn Radio
		1331, // graal future
		1194, // graal space
		2404, // DubTerrain.net
		7943, // Massive DubStep Trap And Rave
		2411, // Dubstep.fm
		3210, // TECHNO4EVER.FM HARD
		916, // TeaTime.FM - 24h Happy Hardcore, Drum and Bass, UK
		3772, // CoreTime.FM - 24h Hardcore, Industrial, Speedcore
		3211, // Make Some Noise
		857 // не воспроизводится - для отладки ошибок
		];

		// для базы с повторами
		defaultPlaylist.currentTrack = {
			id: 2411,
			url: 'http://stream.dubstep.fm:80/256mp3',
			title: 'Dubstep.fm - 256k MP3',
			scrollPosition: 406
		};

		playerState.playlists[playerState.currentPlaylist] = __playlists['Default'] = defaultPlaylist;
		// __playlists['Default'] = defaultPlaylist;
		console.log(__playlists['Default']);
		console.log(playerState);

		playerState.volume = .27;
		// playerState.paused = false;
		playerState.paused = true;
		playerState.search.stationsOpened = [];

		// $playlistsPanel.find('.list').append('<div class="playlist" data-name="Default">Default</div>');
		// playlistContainer.html(playerState.playlists[playerState.currentPlaylist].htmlEl);

		playlistManager.addPanel(defaultPlaylist.name);

		localStorage.setItem('playerState', JSON.stringify(playerState));
		localStorage.setItem('__playlists', JSON.stringify(__playlists));
		// audioApiElement.playStream(playerState.playlists[playerState.currentPlaylist].currentTrack);

		// location.reload();
	} else {
		// Получаем актуальное состояние плеера из local storage
		playerState = JSON.parse(localStorage.getItem('playerState'));
		__playlists = JSON.parse(localStorage.getItem('__playlists'));
		console.log(playerState);
		console.log(__playlists);

		// Наполняем $playlistsPanel заголовками плейлистов
		for (var i = 0; i < playerState.playlistsOrder.length; i++) {
			var plName = playerState.playlistsOrder[i];
			// addPanel(__playlists[playerState.playlistsOrder[i]]);
			playlistManager.addPanel(plName);
			/*console.log(__playlists[playerState.playlistsOrder[i]].htmlEl == playerState.playlists[playerState.currentPlaylist].htmlEl)
   console.log(__playlists[playerState.playlistsOrder[i]]);
   console.log(playerState.playlists[playerState.currentPlaylist]);
   console.log(playerState.playlistsOrder[i]);*/
		}

		$playlistsPanel.find('[data-name="' + playerState.currentPlaylist + '"]').attr('data-current', 1);

		$('.playlistsPanel .list').mCustomScrollbar({
			axis: 'x',
			// theme:'dark',
			advanced: {
				autoExpandHorizontalScroll: true
			}
		});

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

		console.log(playerState.currentPlaylist);

		// Создаем контейнер для треков текущего (активного) плейлиста
		/*playlistContainer.append(playerState.
  							playlists[playerState.currentPlaylist].
  							htmlEl
  						);*/

		playlistContainer.append(__playlists[playerState.currentPlaylist].htmlEl);

		// Получить массив с id треков плейлиста и сформировать его
		/*var playlistTracks = playerState
  						.playlists[playerState.currentPlaylist]
  						.tracks
  ;*/

		console.log('make tracks:begin');
		// playlistManager.makeTracks();
		console.log('make tracks:end');

		var playlistTracks = __playlists[playerState.currentPlaylist].tracks;

		if (playlistTracks.length > 0) {
			/*for(var i = 0; i < playlistTracks.length; i++) {
   	addToPlaylist(playlistTracks[i]);
   }
   	$('.playlistContainer').mCustomScrollbar({
   	// theme:"dark"
   });
   	if(!playerState.paused) {
   	var streamUrl = getCurrentTrack().url;
   	audioApiElement.playStream(streamUrl);
   		$('.playlistContainer [data-station-url="' + streamUrl + '"]')
   		.attr('data-current-track', 1);
   }*/

			$.ajax({
				data: { 'action': 'getPlaylistStations', 'id': playlistTracks },
				success: function success(data) {
					var response = JSON.parse(data),
					    playlist = playlistContainer.find('.playlist[data-name="' + playerState.currentPlaylist + '"]'),
					    markup = '';

					// var trackMarkup = $('.template-track').html();

					for (var i = 0; i < response.length; i++) {
						var track = response[i];
						markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete"><i class="fa fa-minus"></i></div> \
										<div class="canplaytest"><i class="fa fa-music"></i></div>\
										<div class="title">' + track.station_title + '</div><div class="url">' + track.station_url + '</div></div>';
					}

					playlist.html(playlist.html() + markup);

					$('.playlistContainer').mCustomScrollbar({
						// theme:"dark"
					});

					if (!playerState.paused) {
						var streamUrl = getCurrentTrack().url;
						audioApiElement.playStream(streamUrl);

						$('.playlistContainer [data-station-url="' + streamUrl + '"]').attr('data-current-track', 1);
					}
					// $('.playlistContainer').mCustomScrollbar('scrollTo', getCurrentTrack().scrollPosition);
					// $('.playlistContainer').mCustomScrollbar('scrollTo', $('[data-current-track=1]').position().top);
				}
			});

			debugPlayerState();
			debugLocalStorage();
		} else {
			console.log(0);
		}
	}

	/*try {
 	localStorage.setItem('limit', 'phhhhh');
 } catch (e) {
 		if (e == QUOTA_EXCEEDED_ERR) {
 		console.log('Превышен лимит');
 	}
 }*/
});

$(window).load(function () {});
'use strict';

$(document).ready(function () {

	function checkLoginUniq(login) {
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

	/*$('.userPanel button').click(function(e) {
 	console.log((this));
 	$('.userPanel button').removeClass('active');
 	$('.form-auth, .form-reg').fadeOut()
 });*/

	$('.showFormSign').click(function () {
		$(this).toggleClass('active').siblings().toggleClass('active');
		$('.form-auth').toggleClass('visible').fadeToggle(300);
		$('.overlayFull').toggleClass('visible').fadeToggle(300);
	});

	$('.showFormReg').click(function () {
		$(this).toggleClass('active').siblings().toggleClass('active');
		$('.form-reg').toggleClass('visible').fadeToggle(300);
		$('.overlayFull').toggleClass('visible').fadeToggle(300);
		if ($('.form-reg .regLogin').val().length > 0) {
			checkLoginUniq($('.form-reg .regLogin').val());
		}
	});

	function popupClose(popup, delay) {
		popup.fadeOut(delay);
	}

	//закрытие модального окна и формы, сброс полей формы
	$(".popup-overlay, .close-popup").click(function (e) {
		popupClose($(".popup-container, .popup-overlay"), 500);
		// $(".popup-container, .popup-overlay").fadeOut(500);
		$(':input', ".popup-container").not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
	});

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

	$('.form-reg .regSubmit').click(function (e) {
		var login = $('.form-reg .regLogin');
		var pass = $('.form-reg .regPass');
		var pass2 = $('.form-reg .regPassEx');
		// console.log(loginIsFree(login));
		if (validateField(login) && validateField(pass) && equalPassword(pass, pass2) && !login.hasClass('busy')) {
			$.ajax({
				data: { 'action': 'regUser', 'regLogin': login.val(), 'regPass': pass.val() },
				// url: 'actionsRegistration.php',
				success: function success(data) {
					console.log("success");
					$('.form-reg').fadeOut(300);
					$('.showFormReg').toggleClass('active').fadeToggle(300);
					$('.successReg').html('You have successfully signed up!').fadeIn(300).addClass('popupHide');
					setTimeout(function () {
						// $('.overlayFull, .success').fadeOut(500);
						$('.overlayFull').fadeOut(500);
						// $('.success').removeClass('popupHide');
					}, 4000);
				}
			});
		}
		return false;
	});

	$('.form-auth .authSubmit').click(function (e) {

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