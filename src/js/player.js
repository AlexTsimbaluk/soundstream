var dateStart = new Date().getTime();

function getParams() { 
	var $_GET = {}; 
	var __GET = window
				.location
				.search
				.substring(1)
				.split("&")
	; 
	for(var i=0; i<__GET.length; i++) { 
		var getVar = __GET[i].split("="); 
		$_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
	}
	return $_GET; 
}

if(getParams().admin !== undefined) {
	$('body').addClass('admin');
} else {
	$('body').removeClass('admin');
}


function d(str) {
	$('.debug').html(str);
}
// Получение случайного числа в заданном диапазоне
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Получение случайного цвета rgb
function getRandomRgbColor() {
	var color = '';
	return 'rgb('
				 + getRandomInt(0, 255)
				 + ','
				 + getRandomInt(0, 255)
				 + ','
				 + getRandomInt(0, 255)
				 + ')';
}

// Получение случайной строки
function getHash(size) {
	var hash = '';
	for(var i = 0; i < size; i++) {
		hash += String.fromCharCode(getRandomInt(33, 127));
	}
	return hash;
}



$('.clearLocalStorage').on('click', function(e) {
	localStorage.clear();
	return false;
});

$('.clearUniqHash').on('click', function(e) {
	// localStorage.removeItem('uniqHash');
	localStorage.removeItem('stations');
	return false;
});


$('.toAdmin').on('click', function(e) {
	console.log('toAdmin');
	$('body').addClass('admin');

	$.ajax({
		data: {'admin': 1},
		success: function(data) {
			$('#player').after(data);
			$('#player').hide();

			$('.toPlayer').on('click', function(e) {
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




$.ajaxSetup({
	type: 'POST',
	url: 'actions.php',
	complete: function() {},
	statusCode: {
		200: function(message) {
		},
		403: function(jqXHR) {
			var error = JSON.parse(jqXHR.responseText);
			$("body").prepend(error.message);
		}
	},
	error: function (error, xhr, status, errorThrown) {
		console.log('XHR error');
	}
});



$(document).ready(function() {
	var audioCtx = new (window.AudioContext || window.webkitAudioContext);

	// Отобразить название станции при воспроизведении
	function displayState() {
		var title = playerState.playlists[playerState.currentPlaylist].currentTrack.title,
			titleSize = title.length,
			titleContainer = $('#player .info .trackTitle'),
			maxWidth = 250,
			maxSize,
			titleContainerWidth,
			ratio
		;

		titleContainer.html(title)
						.removeClass('runningString')
						.parent().css({'width':'auto'})
		;

		titleContainerWidth = titleContainer.width();
		ratio = titleContainerWidth / titleSize;
		maxSize = Math.floor(maxWidth / ratio) - 5;

		if(titleContainerWidth > 240) {
			if(window.innerWidth > 700) {
				titleContainer.addClass('runningString')
								.parent()
								.css({'width':'240px'});
			} else {
				titleContainer.html(title.substr(0, maxSize) + '...');
			}
			
		} else {
			titleContainer.removeClass('runningString')
							.parent()
							.css({'width':'auto'});
		}
	}

	// Отобразить время восроизведения
	// TODO: починить
	// для этого надо player заменить на audioApiElement,
	// у которого должно быть это свойство (проверить)
	/*function updateTime() {
		var s = ('0' + parseInt(player.currentTime % 60)).slice(-2);
		var m = ('0' + parseInt((player.currentTime / 60) % 60)).slice(-2);
		$('#player .time .hours').html();
		$('#player .time .minutes').html(m);
		$('#player .time .seconds').html(s);
	}*/
	
	// Добавить станцию в плейлист
	function addToPlaylist(id) {
		$.ajax({
			data: {'action': 'getStation', 'id': id},
			success: function(data) {
				var response = JSON.parse(data),
					playlist = playlistContainer.find('.playlist[data-name="'
														+ playerState.currentPlaylist
														+ '"]')
				;
				var markup = '';
				for(var i = 0; i < response.length; i++) {
					var track = response[i];
					markup += '<div class="track" data-station-id="'
								+ track.station_id
								+ '" data-station-title="'
								+ track.station_title
								+ '" data-station-url="'
								+ track.station_url
								+ '"><div class="delete"><i class="fa fa-minus"></i></div><div class="title">'
								+ track.station_title
								+ '</div><div class="url">'
								+ track.station_url
								+ '</div></div>';

					playerState
						.playlists[playerState.currentPlaylist]
						.tracks
						.push(+track.station_id)
					;
					playerState
						.playlists[playerState.currentPlaylist]
						.currentTrack = {
							id: track.station_id,
							url: track.station_url,
							title: track.station_title
					};
				}
				localStorage.setItem('playerState', JSON.stringify(playerState));
				playlist.html(playlist.html() + markup);
				playlist
					.find('.track')
					.removeClass('selected')
				;
				playlist
					.find('.track:last')
					.addClass('selected')
				;
			}
		});
	}


	// Конструктор объекта Playlist
	function Playlist(name) {
		this.name = name;
		// this.active = active;
		this.tracks = [];
		this.currentTrack = {};
		this.htmlEl = '<div class="playlist active sortable" data-name="' + this.name + '">';
		playerState.playlists[name] = this;
		playerState.playlistsOrder.push(this.name);
	}

	function defferedPlayStream() {
		setTimeout(() => {
			console.log(defferedPlayStream);
			audioApiElement.playStream(playerState.playlists[playerState.currentPlaylist].currentTrack.url);
		}, 5000);
	}

	$('body').attr('data-useragent', navigator.userAgent);

	// TODO: analyser сделать отдельным объектом, с которым будет работать AudioApiElement
	function Analyser(ctx, src, analyserOpts) {
		var self = this;
	    var analyser = ctx.createAnalyser();
    	analyser.smoothingTimeConstant = analyserOpts.smoothingTimeConstant || .7;
    	analyser.fftSize = analyserOpts.fftSize || 512;

    	src.connect(analyser);
    	analyser.connect(audioCtx.destination);

    	var sampleAudioStream = function() {
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
	    function createAnalyser(opts) {
		    var a = audioCtx.createAnalyser();
	    	a.smoothingTimeConstant = opts.smoothingTimeConstant || .7;
	    	a.fftSize = opts.fftSize || 512;
	    	return a;
	    }

	    var source = audioCtx.createMediaElementSource($playerTag);

	    var analyser_1 = new Analyser(audioCtx, source, {smoothingTimeConstant: .5, fftSize: 1024});
	    var analyser_2 = new Analyser(audioCtx, source, {smoothingTimeConstant: .5, fftSize: 1024});
	    var analyser_3 = new Analyser(audioCtx, source, {smoothingTimeConstant: .5, fftSize: 64});
	    var analyser_4 = new Analyser(audioCtx, source, {smoothingTimeConstant: .5, fftSize: 512});

	    this.streamData_1 = analyser_1.streamData;
	    this.streamData_2 = analyser_2.streamData;
	    this.streamData_3 = analyser_3.streamData;
	    this.streamData_4 = analyser_4.streamData;

	    this.delayedLaunch = function() {
	    	setTimeout(function(){
	    		$playerTag.play();
	        }, 3000);
	    }

    	audioBindAll($playerTag);

	    this.playStream = function(streamUrl) {
	    	// TODO: .selected переделать на data-current и везде проверять его
	    	console.log('AudioApiElement::playStream::Begin');

	    	
        	playerState
        		.playlists[playerState.currentPlaylist]
        		.currentTrack = {
	        		id				: $('.playlistContainer .selected').data('stationId'),
	        		url				: streamUrl,
	        		title			: $('.playlistContainer .selected').data('stationTitle')
	        		// scrollPosition	: $('.playlistContainer .selected').position().top

        	};

        	var currentTrackEl = $('.playlistContainer .active [data-station-id='
        							+ playerState
        								.playlists[playerState.currentPlaylist]
        								.currentTrack
        								.id
        							+ ']');

        	playerState.playlists[playerState.currentPlaylist].currentTrack.scrollPosition = currentTrackEl.position().top;

        	console.log(currentTrackEl.position().top);
        	console.log(playerState.playlists[playerState.currentPlaylist].currentTrack.scrollPosition);

        	/*var scrollPosition = playerState.playlists[playerState.currentPlaylist].currentTrack.scrollPosition;
        	$('.playlistContainer').mCustomScrollbar('scrollTo' , scrollPosition);*/
        	
        	// addEqToTrack(currentTrackEl, 'canvas-audio-source');

	        $playerTag.src = streamUrl;
	        $playerTag.crossOrigin = 'anonymous';
	    	setTimeout(function(){
	    		$playerTag.crossOrigin = 'anonymous';
	        }, 3000);

	        var playPromise = $playerTag.play();
	        $(".spinner").show();

	        // В конце if проверить PromiseStatus, если он rejected
	        if (playPromise !== undefined) {
				/*playPromise.then(function() {
					console.log('Promise::Automatic playback started!');
					$(".spinner").hide();
				}).catch(function(error) {
					$(".spinner").hide();
					console.log('Promise::Automatic playback failed...');
					console.log(error);
					console.log($('playlistContainer .track[data-current-track]'));
					self.stopStream();
					$('.playlistContainer .track[data-current-track]').removeAttr('data-current-track');
				});*/

				playPromise.then(function() {
					console.log('AudioApiElement::playPromise::Success::Begin');
					$(".spinner").hide();
			        
			        self.updateTime();
			        console.log('updateTime');
			        setInterval(function() {
			        	self.updateTime();
			        }, 1000);
			        console.log($playerTag.paused);
			        console.log('AudioApiElement::playPromise::Success::End');
				}).catch(function(error) {
					console.log('AudioApiElement::playPromise::Failed::Begin');
					console.log($playerTag.paused);
					audioCbElement.playStream(streamUrl);
					console.log('Start audioCbElement');
					$(".spinner").hide();
					console.log('AudioApiElement::playPromise::Failed::End');
				});

				/*if (playPromise.prototype.PromiseStatus == resolved) {
					console.log('resolved');
				}*/
	        }

	        console.log($playerTag.paused);
	        playerState.paused = $playerTag.paused;
	        visualisation(currentTrackEl);
	        displayState();
	        localStorage.setItem('playerState', JSON.stringify(playerState));
	        drawEq1();
	        drawEq2();
	        drawEq3();
	        
	        console.log('AudioApiElement::playStream::End');
	        // TODO: добавить на играющий трек эквалайзер
	    }
	     // TODO: добавить сюда остановку анимации
	    this.stopStream = function() {
	    	var currentTrackEl = $('.playlistContainer .active [data-station-id='
									+ playerState
										.playlists[playerState.currentPlaylist]
										.currentTrack
										.id
									+ ']')
	    	;

			visualisationStop(currentTrackEl);
			$('#player .play').removeClass('visualisation');
			$('#player .info .trackTitle').html('')
											.removeClass('runningString')
											.parent().css({'width':'auto'});

			$playerTag.pause();
			audioCbElement.stopStream();
			$playerTag.currentTime = 0;
			playerState.paused = $playerTag.paused;
			console.log('AudioApiElement::stopStream');
			localStorage.setItem('playerState', JSON.stringify(playerState));
	    }
	    this.setVolume = function(vol) {
	    	$playerTag.volume = vol;
	    }
	    this.getVolume = function() {
	    	return $playerTag.volume;
	    }
	    this.updateTime = function() {
	    	// console.log('AudioApiElement::updateTime');
	    	var time = Math.ceil($playerTag.currentTime);
	    	
	    	var sec = ('0' + parseInt(Math.floor(time % 60))).slice(-2);
	    	var min = ('0' + parseInt((Math.floor(time / 60)) % 60)).slice(-2);
	    	$('#player .time .hours').html();
	    	$('#player .time .minutes').html(min);
	    	$('#player .time .seconds').html(sec);
	    }
	    $playerTag.volume = playerState.volume;
	}

	// Колбэк если не срабатывает Audio API
	function AudioCbElement() {
	    var player = new Audio();
	    var self = this;

    	audioBindAll(player);

	    this.playStream = function(streamUrl) {
	    	console.log('AudioCbElement::playStream::Begin');
	    	// TODO: .selected переделать на data-current и везде проверять его
        	playerState
        		.playlists[playerState.currentPlaylist]
        		.currentTrack = {
	        		id: $('.playlistContainer .selected').data('stationId'),
	        		url: streamUrl,
	        		title: $('.playlistContainer .selected').data('stationTitle')
        	};

        	var currentTrackEl = $('.playlistContainer .active [data-station-id='
        							+ playerState
        								.playlists[playerState.currentPlaylist]
        								.currentTrack
        								.id
        							+ ']');

        	player.src = streamUrl;

	        player.play();
	        console.log(player.paused);
	        playerState.paused = player.paused;

	        visualisation(currentTrackEl);
	        displayState();

	        self.updateTime();
	        setInterval(function() {
	        	self.updateTime();
	        }, 1000);

	        localStorage.setItem('playerState', JSON.stringify(playerState));
	        console.log('AudioCbElement::playStream::End');
	    }

	    // TODO: добавить сюда остановку анимации
	    this.stopStream = function() {
	    	var currentTrackEl = $('.playlistContainer .active [data-station-id='
									+ playerState
										.playlists[playerState.currentPlaylist]
										.currentTrack
										.id
									+ ']')
	    	;

			visualisationStop(currentTrackEl);
			$('#player .play').removeClass('visualisation');
			$('#player .info .trackTitle').html('')
											.removeClass('runningString')
											.parent().css({'width':'auto'});

			player.pause();
			player.currentTime = 0;
			playerState.paused = player.paused;
			console.log('AudioCbElement::stopStream');
			localStorage.setItem('playerState', JSON.stringify(playerState));
	    }
	    this.setVolume = function(vol) {
	    	player.volume = vol;
	    }
	    this.getVolume = function() {
	    	return player.volume;
	    }

	    this.updateTime = function() {
	    	// console.log('AudioCbElement::updateTime');
	    	var time = Math.ceil(player.currentTime);

	    	var sec = ('0' + parseInt(Math.floor(time % 60))).slice(-2);
	    	var min = ('0' + parseInt((Math.floor(time / 60)) % 60)).slice(-2);
	    	$('#player .time .hours').html();
	    	$('#player .time .minutes').html(min);
	    	$('#player .time .seconds').html(sec);
	    }
	    player.volume = playerState.volume;
	}

	// https://developer.mozilla.org/ru/docs/Web/Guide/Events/Media_events
	function audioBindProgress(player) {
		player.addEventListener('progress', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('timeupdate', (e)=> {
         		console.log('Event.type::' + e.type);
        });
	}

	function audioBindVolume(player) {
		player.addEventListener('volumechange', (e)=> {
         		console.log('Event.type::' + e.type);
        });
	}

    function audioBindAll(player) {
    	player.addEventListener('abort', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('canplay', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('canplaythrough', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('durationchange', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('emptied', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('encrypted', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('ended', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('error', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('interruptbegin', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('interruptend', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('loadeddata', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('loadedmetadata', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('loadstart', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('mozaudioavailable', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('pause', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('play', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('playing', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('ratechange', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('seeked', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('seeking', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('stalled', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('suspend', (e)=> {
         		console.log('Event.type::' + e.type);
        });
        player.addEventListener('waiting', (e)=> {
         		console.log('Event.type::' + e.type);
        });
    }

    /*
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
		var canvas 			= document.getElementById(id);
		canvas.width 		= width;
		canvas.height 		= height;
		this.ctx			= canvas.getContext("2d");
		this.canvasWidth 	= canvas.width;
		this.canvasHeight 	= canvas.height;
	}

	// TODO: Сделать функцию, которая принимает объект с настройками (анализатора например (fft)),
	// и колбэк - функцию рисования

	function drawEq1() {
		// получаем canvas
		var canvas = new AudioCanvas('canvas-audio-source', 500, 255 * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

	    for(bin = 0; bin < audioApiElement.streamData_1.length; bin ++) {
	        var val = audioApiElement.streamData_1[bin];
	        canvas.ctx.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
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

	    for(bin = 0, size = audioApiElement.streamData_2.length; bin < size; bin ++) {
	        var val = audioApiElement.streamData_2[bin];
	        // canvas.ctx.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
	        // canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
	        canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (val) + ',' + (255 - val) + ')';
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
		var maxBar 			= Math.floor(255 / 10),
			// ширина плитки
			barWidth 	= Math.floor(canvas.canvasWidth / 32),
			// barWidth 		= 10,
			// высота плитки
			barHeight 		= Math.floor(canvas.canvasHeight / maxBar),
			// зазор между плитками
			gutter 	= 3,
			// полная ширина плитки  с зазором
			fullBarWidth 	= barWidth + gutter,
			// полная высота плитки  с зазором
			fullBarHeight 	= barHeight + gutter
		;
	    for(var i = 0; i < audioApiElement.streamData_3.length; i ++) {
	        var val = audioApiElement.streamData_3[i],
				totalBar = Math.floor(val / 10)
			;
			// canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (val) + ',' + (255 - val) + ')';
	        // canvas.ctx.fillRect(i, canvas.canvasHeight, 1, -val / 1);
	        for(var j = 0; j < totalBar; j++) {
	        	// canvas.ctx.strokeStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
	        	canvas.ctx.strokeStyle = 'hsl(' + (180 - j * 7) + ', 100%, 50%)';
	        	canvas.ctx.strokeRect(
		        							i * fullBarWidth,
	        								canvas.canvasHeight - (j * fullBarHeight),
	        								barWidth,
	        								barHeight
        								);
	        }
	    }
	    requestAnimationFrame(drawEq3);
	};

	function drawEq4() {
		// получаем canvas
		var canvas = new AudioCanvas('canvas-fractal', 500, 255 * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

	    for(bin = 0; bin < audioApiElement.streamData_4.length; bin ++) {
	        var val = audioApiElement.streamData_4[bin];
	        canvas.ctx.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
	        // canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
	        canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 + 1, 1, Math.floor(-val / 1.5));
	        canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 - 1, 1, Math.floor(val / 1.5));
	    }
	    requestAnimationFrame(drawEq4);
	};

	function addEqToTrack(track, canvasId) {
		$('.track').each(function(i) {
			$(this).find('canvas').remove();
		});
		track.append('<canvas id="' + canvasId + '"></canvas>');
	}

	var playlistContainer = $('#player .playlistContainer'),
		playlistsPanel = $('#player .playlistsPanel'),
		
		player = new Audio(),


		// Состояние пользователя - зарегистрирован или нет, авторизован или нет
		userStatus = {
			reg: false,
			auth: false
		},

		// Объект состояния плеера
		playerState = {
			playlists: {},
			playlistsOrder: [],
			currentPlaylist: '',
			// volume : player.volume,
			volume: audioApiElement ? audioApiElement.getVolume() : 0,
			paused: player.paused
		},

		// Массив со всеми станциями
		stationsArray = []
	;

	// console.log(player.paused);

	if(localStorage.getItem('userStatus') == undefined) {
		localStorage.setItem('userStatus', JSON.stringify(userStatus));
	} else {
		userStatus = JSON.parse(localStorage.userStatus);
	}

	if(localStorage.getItem('stations') == undefined) {
		$.ajax({
			data: {'action': 'getAllStations'},
			success: function(data) {
				stationsArray = JSON.parse(data);
				localStorage.setItem('stations', JSON.stringify(stationsArray));
			}
		});
	} else {
		stationsArray = JSON.parse(localStorage.getItem('stations'));
	}


	
	var audioApiElement = new AudioApiElement('playerTag'),
		audioCbElement 	= new AudioCbElement()
	;

	/*console.log(audioApiElement);
	console.log(audioCbElement);*/

	if(localStorage.getItem('playerState') == undefined) {
		// Объект плейлиста
		var defaultPlaylist = new Playlist('Default');
		playerState.currentPlaylist = 'Default';
		playlistsPanel.append('<div class="plName" data-name="Default">Default</div>');
		playlistContainer.append(playerState.playlists[playerState.currentPlaylist].htmlEl);
		
		// playerState.playlists[playerState.currentPlaylist].currentTrack.scrollPosition = 0;

		playerState
			.playlists[playerState.currentPlaylist]
			.tracks = [2599,
						1193,
						1330,
						55,
						760,
						884,
						894,
						900,
						7068,
						9096,
						4046,
						3187,
						4055,
						6369,
						6377,
						6716,
						7942,
						2400
		];

		playerState
			.playlists[playerState.currentPlaylist]
			.currentTrack = {
				id:1330,
				url:'http://graalradio.com:8123/future',
				title:'Graal Radio Future'
		};

		localStorage.setItem('playerState', JSON.stringify(playerState));
	} else {
		// Получаем актуальное состояние плеера из local storage
		playerState = JSON.parse(localStorage.getItem('playerState'));
		console.log(playerState.playlists[playerState.currentPlaylist].currentTrack.scrollPosition);
		
		// Наполняем playlistsPanel заголовками плейлистов
		for (var i = 0; i < playerState.playlistsOrder.length; i++) {
			playlistsPanel.append('<div class="plName" data-name="'
									+ playerState.playlistsOrder[i]
									+ '">'
									+ playerState.playlistsOrder[i]
									+ '</div>'
								);
		}

		// Задаем свойства объекта Audio свойствами объекта playerState
		audioApiElement.setVolume(playerState.volume);
		audioCbElement.setVolume(playerState.volume);

		// Создаем контейнер для треков текущего (активного) плейлиста
		playlistContainer.append(playerState.
									playlists[playerState.currentPlaylist].
									htmlEl
								);

		// Получить массив с id треков плейлиста и сформировать его
		var playlistTracks = playerState
								.playlists[playerState.currentPlaylist]
								.tracks
		;

		if(playlistTracks.length > 0) {
			$('.playlistContainer').mCustomScrollbar();

			$.ajax({
				data: {'action': 'getPlaylistStations', 'id': playlistTracks},
				success: function(data) {
					var response = JSON.parse(data),
						playlist = playlistContainer.find('.playlist[data-name="'
															+ playerState.currentPlaylist
															+ '"]'),
						markup = ''
					;
					

					var trackMarkup = $('.template-track').html();

					for(var i = 0; i < response.length; i++) {
						var track = response[i];
						markup += '<div class="track" data-station-id="'
									+ track.station_id
									+ '" data-station-title="'
									+ track.station_title
									+ '" data-station-url="'
									+ track.station_url
									+ '"><div class="delete"><i class="fa fa-minus"></i></div> \
										<div class="canplaytest"><i class="fa fa-music"></i></div>\
										<div class="title">'
									+ track.station_title
									+ '</div><div class="url">'
									+ track.station_url
									+ '</div></div>'
						;
					}

					playlist.html(playlist.html() + markup);
					playlist.find('.track[data-station-id='
									+ playerState
										.playlists[playerState.currentPlaylist]
										.currentTrack
										.id
									+ ']'
								)
								.addClass('selected');


					if(!playerState.paused) {
						audioApiElement.playStream(playerState
													.playlists[playerState.currentPlaylist]
													.currentTrack
													.url
													)
						;
					}
					var scrollPosition = playerState.playlists[playerState.currentPlaylist].currentTrack.scrollPosition;
					$('.playlistContainer').mCustomScrollbar('scrollTo' , scrollPosition);
				}
			});
		} else {
			console.log(0);
		}

	}

	// TODO: 2 ф-и ниже должны определять свой target-element внутри себя
	// Визуализация выбранного играющего трека и кнопки play
	var intervalVis = null;

	function visualisation(el) {
		clearInterval(intervalVis);

		el.parent().children('.track:not(.selected)')
					.removeClass('visualisation')
					.removeAttr('style');

		el.addClass('visualisation');

		$('#player .play').addClass('visualisation');
		$('#player .play span').remove();
		$('#player .play.visualisation').prepend('<span class="inner"></span><span class="outer"></span>');
		
		var stepGrad1 = Math.floor(Math.random() * 360),
			stepGrad2 = stepGrad1 + 180,
			stepBorder1 = Math.floor(Math.random() * 360),
			stepBorder2 = stepBorder1 + 180;

		if(window.innerWidth > 700) {
			intervalVis = setInterval(function() {
				el.css({'backgroundImage': 'linear-gradient(to right, hsl('
						+ ((++stepGrad1)%360) 
						+ ', 60%, 50%) 0%, hsl('
						+ ((++stepGrad2)%360) 
						+ ', 60%, 50%) 100%)'});

				$('#player .play.visualisation').css({'boxShadow': '0px 0px 5px 0.4px hsl('
						+ ((++stepBorder1)%360) 
						+ ', 100%, 50%)', 'borderColor': 'hsl('
						+ ((++stepBorder1)%360) 
						+ ', 100%, 50%)'});

				$('#player .play.visualisation .inner').css({'borderBottomColor': 'hsl('
						+ ((++stepBorder1)%360) 
						+ ', 100%, 50%)'});

				$('#player .play.visualisation .outer').css({'borderTopColor': 'hsl('
						+ ((++stepBorder1)%360) 
						+ ', 100%, 50%)'});
			}, 50);
		}
		
	}
	
	// Остановка визуализации
	function visualisationStop(el) {
		clearInterval(intervalVis);
		el.removeClass('visualisation')
			.css({'backgroundImage': 'none'})
			.removeAttr('style')
		;
		$('#player .play').removeClass('visualisation')
							.css({'boxShadow': 'none', 'borderColor': '#0ff'})
							.removeAttr('style')
		;
		$('#player .play span').remove();
	}

	// Почему в if(player.paused) проверяется состояние player
	// а не audioApiElement или playerState.paused ?
	$('#player .play').click(function(e) {
		if(playerState.paused) {
			audioApiElement.playStream(playerState
										.playlists[playerState.currentPlaylist]
										.currentTrack
										.url
										)
			;
		}
	});

	// TODO: удалить data-current-track у всех треков
	$('.playlistContainer').on('click', '.track', function(e) {
		if(!playerState.paused) {
			if($(this).attr('data-current-track')) {
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
	});

	$('.playlistContainer').on('mousedown', '.track', function(e) {
		$(this).parent()
				.find('.selected')
				.removeClass('selected')
		;

		$(this).addClass('selected');
	});

	// TODO: в кликах на кнопку stop проверять player.paused
	$('#player .stop').click(function(e) {
		audioApiElement.stopStream();
	});

	$('.playlistContainer').on('click', '.delete', function(e) {
		var id = $(this)
					.parent()
					.data('stationId'),
			pl = playerState.playlists[playerState.currentPlaylist]
		;

		pl.tracks.splice(pl.tracks.indexOf(id), 1);
		$(this)
			.parent()
			.remove()
		;
		localStorage.setItem('playerState', JSON.stringify(playerState));
	});

	$('.playlistContainer').on('click', '.canplaytest', function(e) {
		var url = $(e.target)
					.closest('.track')
					.data('stationUrl')
		;
		console.log(url);
		e.stopPropagation();

	});


	

    


	var canvasVolume    	= document.getElementById('canvas-volume');
	var	ctxVolume			= canvasVolume.getContext('2d');

	canvasVolume.width 	= 100;
	canvasVolume.height = 30;

	var canvasVolumeWidth = canvasVolume.width;
	var canvasVolumeHeight = canvasVolume.height;

	// console.log(canvasVolumeHeight);

	function drawWolumeBar() {
		// var volumeAnimation 	= requestAnimationFrame(drawWolumeBar());
		// q - какую часть volume-bar от 100% отрисовать, от 1 до 10, шаг - 10%
		var q = Math.ceil(+($('#player .volume input').val()) / 10);

		ctxVolume.clearRect(0, 0, canvasVolumeWidth, canvasVolumeHeight);
		var maxHue 			= 360 / 10 * q,
			startHue		= 0,
			barWidth 		= 3,
			gutterWidth		= 1,
			maxBar			= Math.floor(canvasVolumeWidth / (gutterWidth + barWidth)),
			targetCountBar	= Math.floor(maxBar / 10 * q),
			barMaxHeight	= canvasVolumeHeight,
			barStepHeight	= (barMaxHeight / maxBar)
		;
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

	/*$('#player .volume input').val(player.volume * 100);
	$('#player .volume .val').html(Math.floor(player.volume * 100));*/
	// audioApiElement.setVolume(playerState.volume);
	$('#player .volume input').val(audioApiElement.getVolume() * 100);
	$('#player .volume input').val(audioCbElement.getVolume() * 100);
	$('#player .volume .val').html(Math.floor(audioApiElement.getVolume() * 100));
	$('#player .volume .val').html(Math.floor(audioCbElement.getVolume() * 100));
	// drawWolumeBar(Math.ceil($('#player .volume input').val() / 10));
	drawWolumeBar();
	// requestAnimationFrame(drawWolumeBar(Math.ceil($('#player .volume input').val() / 10)));

	$('#player .volume input').on('input', function(e) {
		var $inputVolume = $(this);

		/*player.volume = parseFloat($(this).val() / 100);
		playerState.volume = player.volume;*/
		audioApiElement.setVolume(parseFloat($(this).val() / 100));
		audioCbElement.setVolume(parseFloat($(this).val() / 100));
		playerState.volume = audioApiElement.getVolume();
		playerState.volume = audioCbElement.getVolume();

		$('#player .volume .val').html($(this).val());

		if(+$inputVolume.val() != 0) {
			drawWolumeBar(Math.ceil(+$inputVolume.val() / 10));
		} else {
			ctxVolume.clearRect(0, 0, canvasVolumeWidth, canvasVolumeHeight);
		}

		localStorage.setItem('playerState', JSON.stringify(playerState));
	});


	$('#player .volume').on('wheel', function(e) {
		e = e || window.event;
		var $inputVolume = $(this).find('input');

		var delta = e.originalEvent.deltaY
				 || e.originalEvent.detail
				 || e.originalEvent.wheelDelta
		;

		if(delta > 0 && +$inputVolume.val() > 0) {
			$inputVolume
				.val(+$inputVolume.val() - 2)
				.trigger('input')
			;
		} else if(delta < 0 && +$inputVolume.val() < 100) {
			$inputVolume
				.val(+$inputVolume.val() + 2)
				.trigger('input')
			;
		}

		return false;
	});

	$('#player .volume').on('click', function(e) {
		e = e || window.event;
		var $inputVolume = $(this).find('input');

		$inputVolume
			.val(e.offsetX)
			.trigger('input')
		;

		return false;
	});


	// Показать поле ввода для поиска
	$('#player .find .showFieldSearch').click(function(e) {
		$(this).toggleClass('active');

		var searchInput = $(this)
							.parent()
							.find('input')
		;

		if(searchInput.hasClass('visible') == false) {
			searchInput.addClass('visible')
						.animate({opacity: 1, width: 190}, 100)
			;

			setTimeout(function() {
				searchInput.focus();
			}, 300);
		}
		else {
			searchInput.removeClass('visible')
						.animate({opacity: 0, width: 0}, 100)
						.blur()
			;
		}
	});

	// Поиск и показ найденных станций
	$('#player .find input').on('keyup', function(e) {
		var target = $(this).val();

		

		if(target.length > 2) {
			$(".spinner").show();

			$.ajax({
				data: {'action': 'search', 'target': target},
				success: function(data) {
					var response = JSON.parse(data),
						result = $('.searchContainer .result'),
						markup = '<div class="total"><span>'
									+ response.length
									+ '</span> stations is found</div>';

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

					$('.searchContainer')
							.removeClass('searchContainerFadeOut')
							.addClass('searchContainerFadeIn visible')
							.parent()
							.removeClass('playerLeft')
							.addClass('playerRight')
					;

					if(window.innerHeight <= 640 && window.innerWidth < 700) {
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
	$('#player .find .showAll').on('click', function(e) {
		$(this).toggleClass('active');

		if(!$('.searchContainer .result .station').length) {
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

			dateStart = new Date().getTime();

			var response = stationsArray,
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

			var dateLoad = new Date().getTime();
			console.log((dateLoad - dateStart) + 'ms');
		}

		$(".spinner").show();

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

		$(".spinner").hide();
	});

	// Закрытие блока с результатами поиска
	$('.searchContainer .close').on('click', function(e) {
		$('.showAll').removeClass('active');

		if(window.innerHeight <= 640 && window.innerWidth < 700) {
			$('.playlistContainer').toggleClass('hidden');
		}

		$('.searchContainer').removeClass('searchContainerFadeIn visible')
							.addClass('searchContainerFadeOut')
							.parent().removeClass('playerRight')
							.addClass('playerLeft')
		;
	});


	// Добавление станций в плейлист
	// Доделать, чтобы станции добавлялись в активный плэйлист
	$('.searchContainer').on('click', '.add', function(e) {
		addToPlaylist($(this)
						.parent()
						.data('stationId')
					)
		;
	});

	$('.searchContainer').on('click', '.station', function(e) {
		addToPlaylist($(this).data('stationId'));
	});


	/*Sortable plugin JQueryUI*/
	$('.sortable').sortable({scroll: true});

	/*$(window).on('scroll', function(e) {
		console.log(e.originalEvent);
		console.log(document.querySelector('.playlistContainer').scrollHeight);
		console.log(document.querySelector('.playlistContainer').scrollTop);
		console.log((this).scrollHeight);
		console.log((this).scrollTop);
	});*/

	// mCustomScrollbar
	// Анимация кнопки "закрыть" при скроле блока с результатами поиска
	$('.searchContainer').mCustomScrollbar({
		callbacks: {
			onScroll: function() {
				animateCloseButton(this);
			}
		}
	});

	/*$('.playlistContainer').mCustomScrollbar({
		callbacks: {
			onScroll: function() {
				console.log(this.mcs.top);

				console.log(playerState.playlists[playerState.currentPlaylist].currentTrack);
				playerState.playlists[playerState.currentPlaylist].currentTrack.scrollPosition = this.mcs.top;
				localStorage.setItem('playerState', JSON.stringify(playerState));
			}
		}
	});*/

	function animateCloseButton(el) {
		setTimeout(function() {
			$('.searchContainer .close').animate({top: -(el.mcs.top - 10) + 'px'}, 150);
		}, 50);
	}


	// Первоначальное случайное фоновое изображение для body
	$('body').css({'background':'url("../img/bg/bg'
					+ getRandomInt(1, 10)
					+ '.jpg") no-repeat center / cover'
					})
	;
	
	/*Slider for background*/
	$(function() {

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
			containment:"body",
			timer:3000,
			effTimer:11000,
			shuffle:true,
			effect:"fade",
            // folderPath:"/img/bg/",
            images: imageArr,

            onChange:function(idx) {
            	/*var effects = ['fade', 'zoom', 'slideUp', 'slideDown', 'slideRight', 'slideLeft'];
            	var index = getRandomInt(0, effects.length);
            	$.mbBgndGallery.changeEffect(effects[index]);*/
            }
        });
	});


	/*
	Чтобы на экранах в высоту меньше 640px у блока playlistContainer с треками 
	выставить всю доступную высоту
	*/
	if(window.innerHeight <= 640 && window.innerWidth < 700) {
		var _playlistContainerHeight = $('#player').height() 
										- ($('#player .playlistsPanel').height()
										+ $('#player .trackContainer').height())
		;
		console.log(_playlistContainerHeight);
		$('.searchContainer, .playlistContainer', '#player').height(_playlistContainerHeight);
	}


	

});


$(window).load(function() {

});