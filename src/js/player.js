var dateStart = new Date().getTime();

function getParams() { 
	var $_GET = {}; 
	var __GET = window.location.search.substring(1).split("&"); 
	for(var i=0; i<__GET.length; i++) { 
		var getVar = __GET[i].split("="); 
		$_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
	}

	return $_GET; 
}

if(getParams().admin !== undefined) {
	// console.log('admin');
	$('body').addClass('admin');
} else {
	// console.log('index');
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
	localStorage.removeItem('uniqHash');
	return false;
});


$('.toAdmin').on('click', function(e) {
	console.log('toAdmin');
	$('body').addClass('admin');

	$.ajax({
		data: {'admin': 1},
		success: function(data) {
			// console.log(data);

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
			console.log(titleContainerWidth, titleSize, ratio, maxSize);
			// title.substr(0, maxSize);
			console.log(title.length);
			if(window.innerWidth > 700) {
				titleContainer.addClass('runningString')
								.parent().css({'width':'240px'});
			} else {
				titleContainer.html(title.substr(0, maxSize) + '...');
			}
			
		} else {
			titleContainer.removeClass('runningString')
							.parent().css({'width':'auto'});
		}
	}

	// Отобразить время восроизведения
	// TODO: починить
	function updateTime() {
		var s = ('0' + parseInt(player.currentTime % 60)).slice(-2);
		var m = ('0' + parseInt((player.currentTime / 60) % 60)).slice(-2);
		$('#player .time .hours').html();
		$('#player .time .minutes').html(m);
		$('#player .time .seconds').html(s);
	}
	
	// Добавить станцию в плейлист
	function addToPlaylist(id) {
		$.ajax({
			data: {'action': 'getStation', 'id': id},
			success: function(data) {
				var response = JSON.parse(data);
				var playlist = playlistContainer.find('.playlist[data-name="'
														+ playerState.currentPlaylist
														+ '"]');
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

					playerState.playlists[playerState.currentPlaylist].tracks.push(+track.station_id);
					playerState.playlists[playerState.currentPlaylist].currentTrack = {
						id: track.station_id,
						url: track.station_url,
						title: track.station_title
					};
				}
				localStorage.setItem('playerState', JSON.stringify(playerState));
				playlist.html(playlist.html() + markup);
				playlist.find('.track').removeClass('selected');
				playlist.find('.track:last').addClass('selected');
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

	function AudioApiElement(audioElement) {
	    var $playerTag = document.getElementById(audioElement);
	    var self = this;
	    var analyser;
	    analyser = audioCtx.createAnalyser();
	    analyser.smoothingTimeConstant = 0.3;
	    analyser.fftSize = 512;
	    var source = audioCtx.createMediaElementSource($playerTag);
	    source.connect(analyser);
	    analyser.connect(audioCtx.destination);
	    var sampleAudioStream = function() {
	        analyser.getByteFrequencyData(self.streamData);
	        var total = 0;
	        for (var i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
	            total += self.streamData[i];
	        }
	        // self.volume = total;
	        // console.log($playerTag.volume);
	    };
	    setInterval(sampleAudioStream, 20); // 
	    // public properties and methods
	    // this.volume = 0;
	    // $playerTag.volume = playerState.volume;

	    this.streamData = new Uint8Array(analyser.frequencyBinCount); // This just means we will have 128 "bins" (always half the analyzer.fftsize value), each containing a number between 0 and 255. 
	    this.playStream = function(streamUrl) {
	    	// TODO: .selected переделать на data-current и везде проверять его
        	playerState.playlists[playerState.currentPlaylist].currentTrack = {
        		id: $('.playlistContainer .selected').data('stationId'),
        		// url: $playerTag.src,
        		url: streamUrl,
        		title: $('.playlistContainer .selected').data('stationTitle')
        	};

        	var currentTrackEl = $('.playlistContainer .active [data-station-id='
        							+ playerState.playlists[playerState.currentPlaylist].currentTrack.id
        							+ ']');

	        $playerTag.src = streamUrl;
	        $playerTag.crossOrigin = 'anonymous';
	    	setTimeout(function(){
	    		$playerTag.crossOrigin = 'anonymous';
	        }, 3000);
	        function playPromise() {
	        	return $playerTag.play();
	        }

	        $playerTag.addEventListener('canplay', (e)=> {
	         		// console.log(e);
	        });

	        var playPromise = $playerTag.play();
	        $playerTag.addEventListener('error', (err)=> {
	         		// console.log(err);
	        });

	        $(".spinner").show();

	        if (playPromise !== undefined) {
				playPromise.then(function() {
					console.log('Promise::Automatic playback started!');
					$(".spinner").hide();
				}).catch(function(error) {
					self.stopStream();
					console.log('Promise::Automatic playback failed...');
					console.log(error);
					// defferedPlayStream();
				});
	        }

	        

	        playerState.paused = $playerTag.paused;
	        visualisation(currentTrackEl);
	        displayState();
	        updateTime();
	        localStorage.setItem('playerState', JSON.stringify(playerState));
	        setInterval(function() {
	        	updateTime();
	        }, 1000);
	        console.log('AudioApiElement::playStream');
	        drawEq1();
	        drawEq2();
	        drawEq3();
	        // TODO: добавить на играющий трек эквалайзер
	    }
	    this.stopStream = function() {
	    	var currentTrackEl = $('.playlistContainer .active [data-station-id='
									+ playerState.playlists[playerState.currentPlaylist].currentTrack.id
									+ ']');

			visualisationStop(currentTrackEl);
			$('#player .play').removeClass('visualisation');
			$('#player .info .trackTitle').html('')
											.removeClass('runningString')
											.parent().css({'width':'auto'});

			$playerTag.pause();
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
	    $playerTag.volume = playerState.volume;
	}

	var canvasAudioSource 			= document.getElementById('canvas-audio-source');
	var ctxAudioSource 				= canvasAudioSource.getContext("2d");
	canvasAudioSource.width 		= 500;
	canvasAudioSource.height 		= 255;
	var canvasAudioSourceWidth 		= canvasAudioSource.width;
	var canvasAudioSourceHeight 	= canvasAudioSource.height;

	var canvasAudioSourceEq2 		= document.getElementById('canvas-audio-source-eq2');
	var ctxAudioSourceEq2			= canvasAudioSourceEq2.getContext("2d");
	canvasAudioSourceEq2.width 		= 500;
	canvasAudioSourceEq2.height 	= 255;
	var canvasAudioSourceEq2Width 	= canvasAudioSourceEq2.width;
	var canvasAudioSourceEq2Height 	= canvasAudioSourceEq2.height;

	var canvasAudioSourceEq3 		= document.getElementById('canvas-audio-source-eq3');
	var ctxAudioSourceEq3			= canvasAudioSourceEq3.getContext("2d");
	canvasAudioSourceEq3.width 		= 500;
	canvasAudioSourceEq3.height 	= 150;
	var canvasAudioSourceEq3Width 	= canvasAudioSourceEq3.width;
	var canvasAudioSourceEq3Height 	= canvasAudioSourceEq3.height;

	function drawEq1() {
		ctxAudioSource.clearRect(0, 0, canvasAudioSourceWidth, canvasAudioSourceHeight);

	    for(bin = 0; bin < audioApiElement.streamData.length; bin ++) {
	        var val = audioApiElement.streamData[bin];
	        ctxAudioSource.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
	        // ctxAudioSource.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
	        ctxAudioSource.fillRect(bin, canvasAudioSourceHeight, 1, Math.floor(-val / 4));
	    }
        // console.log(audioApiElement.volume);
	    requestAnimationFrame(drawEq1);
	};

	function drawEq2() {
		ctxAudioSourceEq2.clearRect(0, 0, canvasAudioSourceEq2Width, canvasAudioSourceEq2Height);

	    for(bin = 0; bin < audioApiElement.streamData.length; bin ++) {
	        var val = audioApiElement.streamData[bin];
	        ctxAudioSourceEq2.fillStyle = 'rgb(' + (255 - val) + ',' + (val) + ',' + (255 - val) + ')';
	        ctxAudioSourceEq2.fillRect(bin, canvasAudioSourceEq2Height, 1, -val / 1);
	    }
        // console.log(audioApiElement.streamData.length);
	    requestAnimationFrame(drawEq2);
	};

	function drawEq3() {
		ctxAudioSourceEq3.clearRect(0, 0, canvasAudioSourceEq3Width, canvasAudioSourceEq3Height);
		// получаем число плиток в вертикальном ряду при максимальном значении частоты 255
		// в одной плитке - 10 едениц частоты
		var maxBar 			= Math.floor(255 / 10),
			// ширина плитки
			// barWidth 	= Math.floor(canvasAudioSourceEq3Width / 80),
			barWidth 		= 10,
			// высота плитки
			barHeight 		= Math.floor(canvasAudioSourceEq3Height / maxBar),
			// зазор между плитками
			gutter 	= 2,
			// полная ширина плитки  сзазором
			fullBarWidth 	= barWidth + gutter,
			// полная высота плитки  сзазором
			fullBarHeight 	= barHeight + gutter
		;
	    for(var i = 0; i < audioApiElement.streamData.length; i ++) {
	        var val = audioApiElement.streamData[i],
				totalBar = Math.floor(val / 10)
			;
			/*ctxAudioSourceEq3.fillStyle = 'rgb(' + (255 - val) + ',' + (val) + ',' + (255 - val) + ')';
	        ctxAudioSourceEq3.fillRect(i, canvasAudioSourceEq3Height, 1, -val / 1);*/
	        for(var j = 0; j < totalBar; j++) {
	        	ctxAudioSourceEq3.strokeStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
	        	ctxAudioSourceEq3.strokeRect(
		        							i * fullBarWidth,
	        								canvasAudioSourceEq3Height - (j * fullBarHeight),
	        								barWidth,
	        								barHeight
        								);
	        }
	    }
	    requestAnimationFrame(drawEq3);
	};

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
			volume : player.volume,
			paused: player.paused
		}
	;


	if(localStorage.getItem('userStatus') == undefined) {
		localStorage.setItem('userStatus', JSON.stringify(userStatus));
		// 
	} else {
		userStatus = JSON.parse(localStorage.userStatus);
		// console.log(userStatus);
	}
	

	if(localStorage.getItem('playerState') == undefined) {
		// Объект плейлиста
		var defaultPlaylist = new Playlist('Default');
		playerState.currentPlaylist = 'Default';
		playlistsPanel.append('<div class="plName" data-name="Default">Default</div>');
		playlistContainer.append(playerState.playlists[playerState.currentPlaylist].htmlEl);
		localStorage.setItem('playerState', JSON.stringify(playerState));
	} else {
		var audioApiElement = new AudioApiElement('playerTag');
		// Поучаем актуальное состояние плеера из local storage
		playerState = JSON.parse(localStorage.getItem('playerState'));
		// console.log(playerState.volume);
		// Наполняем playlistsPanel заголовками плейлистов
		for (var i = 0; i < playerState.playlistsOrder.length; i++) {
			playlistsPanel.append('<div class="plName" data-name="' + playerState.playlistsOrder[i] + '">' + playerState.playlistsOrder[i] + '</div>');
		}
		// Задаем свойства объекта Audio свойствами объекта playerState
		// player.volume = playerState.volume;
		player.src = playerState.playlists[playerState.currentPlaylist].currentTrack.url;
		player.paused = playerState.paused;
		audioApiElement.setVolume(playerState.volume);
		// Создаем контейнер для треков текущего (активного) плейлиста
		playlistContainer.append(playerState.playlists[playerState.currentPlaylist].htmlEl);
		// Получить плейлист и сформировать его
		var playlistTracks = playerState.playlists[playerState.currentPlaylist].tracks;
		$.ajax({
			data: {'action': 'getPlaylistStations', 'id': playlistTracks},
			success: function(data) {
				var response = JSON.parse(data),
					playlist = playlistContainer.find('.playlist[data-name="'
														+ playerState.currentPlaylist
														+ '"]'),
					markup = '';

				var trackMarkup = $('.template-track').html();

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
								+ '</div></div>'
					;
				}

				playlist.html(playlist.html() + markup);
				playlist.find('.track[data-station-id='
								+ playerState.playlists[playerState.currentPlaylist].currentTrack.id
								+ ']')
								.addClass('selected');

				if(!playerState.paused) {
					audioApiElement.playStream(playerState.playlists[playerState.currentPlaylist].currentTrack.url);
					// console.log(playerState.playlists[playerState.currentPlaylist].currentTrack.url);
					displayState();
					updateTime();

					setInterval(function() {
						updateTime();
					}, 1000);

					visualisation($('.playlistContainer .active [data-station-id='
									+ playerState.playlists[playerState.currentPlaylist].currentTrack.id
									+ ']'));
				}
			}
		});
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
			.removeAttr('style');
		$('#player .play').removeClass('visualisation')
							.css({'boxShadow': 'none', 'borderColor': '#0ff'})
							.removeAttr('style');
		$('#player .play span').remove();
	}


	
	$('#player .play').click(function(e) {
		if(player.paused) {
			audioApiElement.playStream(playerState.playlists[playerState.currentPlaylist].currentTrack.url);
		}
	});

	// TODO: удалить data-current-track у всех треков
	$('.playlistContainer').on('click', '.track', function(e) {
		if(player.paused) {
			if($(this).attr('data-current-track')) {
				$(this).removeAttr('data-current-track');
				audioApiElement.stopStream();
			} else {
				$(this).attr('data-current-track', 1);
				var url = $(this).data('stationUrl');
				audioApiElement.playStream(url);
			}
		} else {

		}
	});

	// TODO: в кликах на кнопку stop проверять player.paused
	$('#player .stop').click(function(e) {
		audioApiElement.stopStream();
	});

	$('.playlistContainer').on('click', '.delete', function(e) {
		var id = $(this).parent().data('stationId'),
			pl = playerState.playlists[playerState.currentPlaylist];

		pl.tracks.splice(pl.tracks.indexOf(id), 1);
		$(this).parent().remove();
		localStorage.setItem('playerState', JSON.stringify(playerState));
	});

	$('.playlistContainer').on('mousedown', '.track', function(e) {
		$(this).parent()
				.find('.selected')
				.removeClass('selected');

		$(this).addClass('selected');
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
	$('#player .volume .val').html(Math.floor(audioApiElement.getVolume() * 100));
	// drawWolumeBar(Math.ceil($('#player .volume input').val() / 10));
	drawWolumeBar();
	// requestAnimationFrame(drawWolumeBar(Math.ceil($('#player .volume input').val() / 10)));

	$('#player .volume input').on('input', function(e) {
		var $inputVolume = $(this);

		/*player.volume = parseFloat($(this).val() / 100);
		playerState.volume = player.volume;*/
		audioApiElement.setVolume(parseFloat($(this).val() / 100));
		playerState.volume = audioApiElement.getVolume();

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
			$inputVolume.val(+$inputVolume.val() - 2).trigger('input');
		} else if(delta < 0 && +$inputVolume.val() < 100) {
			$inputVolume.val(+$inputVolume.val() + 2).trigger('input');
		}

		return false;
	});

	$('#player .volume').on('click', function(e) {
		e = e || window.event;
		var $inputVolume = $(this).find('input');

		$inputVolume.val(e.offsetX).trigger('input');

		return false;
	});


	// Показать поле ввода для поиска
	$('#player .find .showFieldSearch').click(function(e) {
		$(this).toggleClass('active');

		var searchInput = $(this).parent().find('input');

		if(searchInput.hasClass('visible') == false) {
			searchInput.addClass('visible')
						.animate({opacity: 1, width: 190}, 100);

			setTimeout(function() {
				searchInput.focus();
			}, 300);
		}
		else {
			searchInput.removeClass('visible')
						.animate({opacity: 0, width: 0}, 100)
						.blur();
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
							.addClass('playerRight');

					if(window.innerHeight <= 640 && window.innerWidth < 700) {
						$('.playlistContainer').toggleClass('hidden');
					}
				}
			});
		}
	});

	// Получить все станции
	$('#player .find .showAll').on('click', function(e) {
		$(this).toggleClass('active');
		$(".spinner").show();
		$.ajax({
			data: {'action': 'getAllStations'},
			success: function(data) {
				var response = JSON.parse(data);
					result = $('.searchContainer .result');
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

				if($('.searchContainer').hasClass('visible')) {
					$('.searchContainer').removeClass('searchContainerFadeIn visible')
										.addClass('searchContainerFadeOut')
										.parent().removeClass('playerRight')
										.addClass('playerLeft');
				} else {
					$('.searchContainer').removeClass('searchContainerFadeOut')
										.addClass('searchContainerFadeIn visible')
										.parent()
										.removeClass('playerLeft')
										.addClass('playerRight');
				}

				if(window.innerHeight <= 640 && window.innerWidth < 700) {
					$('.playlistContainer').toggleClass('hidden');
				}
				
			}
		});
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
							.addClass('playerLeft');
	});


	// Добавление станций в плейлист
	// Доделать, чтобы станции добавлялись в активный плэйлист
	$('.searchContainer').on('click', '.add', function(e) {
		addToPlaylist($(this).parent().data('stationId'));
	});

	$('.searchContainer').on('click', '.station', function(e) {
		addToPlaylist($(this).data('stationId'));
	});


	/*Sortable plugin JQueryUI*/
	$('.sortable').sortable({scroll: true});

	// mCustomScrollbar
	// Анимация кнопки "закрыть" при скроле блока с результатами поиска
	$('.searchContainer').mCustomScrollbar({
		callbacks: {
			onScroll: function() {
				animateCloseButton(this);
			}
		}
	});

	function animateCloseButton(el) {
		setTimeout(function() {
			$('.searchContainer .close').animate({top: -(el.mcs.top - 10) + 'px'}, 150);
		}, 50);
	}


	// Первоначальное случайное фоновое изображение для body
	$('body').css({'background':'url("../img/bg/bg' + getRandomInt(1, 10) + '.jpg") no-repeat center / cover'});
	
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
		var _playlistContainerHeight = $('#player').height() - ($('#player .playlistsPanel').height() + $('#player .trackContainer').height());
		console.log(_playlistContainerHeight);
		$('.searchContainer, .playlistContainer', '#player').height(_playlistContainerHeight);
	}


	

});


/*$(window).load(function() {
	var playerState = {};
	playerState = JSON.parse(localStorage.getItem('playerState'));

	// var dateLoad = new Date().getTime();
	// console.log(dateLoad, dateStart);
	// console.log((dateLoad - dateStart) + 'ms');

	// Preloader
	// $(".spinner").fadeOut(300);
	// $(".loader").delay(400).fadeOut("slow");

    var canvasAnalyser 	= document.getElementById("canvas-eq");
    var ctxAnalyser 	= canvasAnalyser.getContext("2d");
    var analyserSource	= document.getElementById('analyser-source');

    analyserSource.src 	= playerState.playlists[playerState.currentPlaylist].currentTrack.url;
    analyserSource.crossOrigin = 'anonymous';

    var audioCtx 		= new(window.AudioContext || window.webkitAudioContext)(),
        analyser 		= audioCtx.createAnalyser(),
    	// source 			= audioCtx.createMediaElementSource(playerState.playlists[playerState.currentPlaylist].currentTrack.url),
    	// source 			= audioCtx.createMediaElementSource(player),
    	source 			= audioCtx.createMediaElementSource(analyserSource)
    ;
    analyser.fftSize 	= 2048;

	source.connect(analyser);
	analyser.connect(audioCtx.destination);

    // Создаем массивы для хранения данных
    var bufferLength 	= analyser.frequencyBinCount,
    	fFrequencyData  = new Float32Array(bufferLength),
        bFrequencyData  = new Uint8Array(bufferLength),
        bTimeData       = new Uint8Array(bufferLength)
    ;


    // Получаем данные
    analyser.getFloatFrequencyData(fFrequencyData); 
    analyser.getByteFrequencyData(bFrequencyData); 
    analyser.getByteTimeDomainData(bTimeData);

    // console.log(fFrequencyData);
    // console.log(bFrequencyData);
    // console.log(bTimeData);

    function draw() {

        drawVisual = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(bTimeData);

        ctxAnalyser.fillStyle = 'rgb(200, 200, 200)';
        ctxAnalyser.fillRect(0, 0, canvasAnalyser.width, canvasAnalyser.height);

        ctxAnalyser.lineWidth = 2;
        ctxAnalyser.strokeStyle = 'rgb(0, 0, 0)';

        ctxAnalyser.beginPath();

        var sliceWidth = canvasAnalyser.width * 1.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {

            var v = bTimeData[i] / 128.0;
            var y = v * canvasAnalyser.height / 2;

            if (i === 0) {
                ctxAnalyser.moveTo(x, y);
            } else {
                ctxAnalyser.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctxAnalyser.lineTo(canvasAnalyser.width, canvasAnalyser.height / 2);
        ctxAnalyser.stroke();
    };
    draw();

		
});*/




$(window).load(function() {

});