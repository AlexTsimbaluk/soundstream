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
	console.log('admin');
	$('body').addClass('admin');
} else {
	console.log('index');
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

	

	

	// Установить свойство состояния объекта и записать в куки
	function setPlayerState(prop, val) {
		playerState[prop] = val;
		Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
	}

	// Получить свойство состояния объекта из в куки
	function getPlayerState(prop) {
		if(!prop) {
			return JSON.parse(Cookies.get('playerState'));	
		} else {
			return JSON.parse(Cookies.get('playerState'))[prop];
		}
	}

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
						.parent().css({'width':'auto'});

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

	$('body').attr('data-useragent', navigator.userAgent);

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
		};

	if(localStorage.getItem('userStatus') == undefined) {
		localStorage.setItem('userStatus', JSON.stringify(userStatus));
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
		// Поучаем актуальное состояние плеера из local storage
		playerState = JSON.parse(localStorage.getItem('playerState'));
		// Наполняем playlistsPanel заголовками плейлистов
		for (var i = 0; i < playerState.playlistsOrder.length; i++) {
			playlistsPanel.append('<div class="plName" data-name="' + playerState.playlistsOrder[i] + '">' + playerState.playlistsOrder[i] + '</div>');
		}
		// Задаем свойства объекта Audio свойствами объекта playerState
		player.volume = playerState.volume;
		player.src = playerState.playlists[playerState.currentPlaylist].currentTrack.url;
		player.paused = playerState.paused;
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
				// console.log(trackMarkup);

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
					player.play();
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
		if($('.playlist').children('.selected').length > 0) {
			playerState.playlists[playerState.currentPlaylist].currentTrack = {
				id: $('.playlistContainer .selected').data('stationId'),
				url: player.src,
				title: $('.playlistContainer .selected').data('stationTitle')
			};

			var currentTrackEl = $('.playlistContainer .active [data-station-id='
									+ playerState.playlists[playerState.currentPlaylist].currentTrack.id
									+ ']');

			player.src = $('.playlistContainer .selected').data('stationUrl');
			player.play();
			playerState.paused = player.paused;

			visualisation(currentTrackEl);
			displayState();
			updateTime();

			localStorage.setItem('playerState', JSON.stringify(playerState));

			setInterval(function() {
				updateTime();
			}, 1000);
		}
	});

	$('.playlistContainer').on('dblclick', '.track', function(e) {
		// debugger;
		var url = $(this).data('stationUrl');

		player.src = url;
		player.play();

		playerState.playlists[playerState.currentPlaylist].currentTrack = {
			id: $('.playlistContainer .selected').data('stationId'),
			url: player.src,
			title: $('.playlistContainer .selected').data('stationTitle')
		};

		var currentTrackEl = $('.playlistContainer .active [data-station-id='
								+ playerState.playlists[playerState.currentPlaylist].currentTrack.id
								+ ']');

		visualisation(currentTrackEl);

		playerState.paused = player.paused;
		localStorage.setItem('playerState', JSON.stringify(playerState));
		
		displayState();
		updateTime();

		setInterval(function() {
			updateTime();
		}, 1000);
	});

	$('#player .stop').click(function(e) {
		var currentTrackEl = $('.playlistContainer .active [data-station-id='
								+ playerState.playlists[playerState.currentPlaylist].currentTrack.id
								+ ']');

		visualisationStop(currentTrackEl);
		$('#player .play').removeClass('visualisation');
		$('#player .info .trackTitle').html('')
										.removeClass('runningString')
										.parent().css({'width':'auto'});

		player.pause();
		player.currentTime = 0;
		playerState.paused = player.paused;
		
		localStorage.setItem('playerState', JSON.stringify(playerState));
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

	function drawWolumeBar(q) {
		ctxVolume.clearRect(0, 0, canvasVolumeWidth, canvasVolumeHeight);
		var maxHue 			= 360 / 10 * q,
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
	
		/*ctxVolume.moveTo(0, canvasVolumeHeight);
		ctxVolume.lineTo(canvasVolumeWidth, 0);
		ctxVolume.lineTo(canvasVolumeWidth, canvasVolumeHeight);
		ctxVolume.strokeStyle = '#000000';
		ctxVolume.lineWidth = 2;
		ctxVolume.stroke();*/

	}


	$('#player .volume input').val(player.volume * 100);
	$('#player .volume .val').html(Math.floor(player.volume * 100));

	drawWolumeBar(Math.ceil($('#player .volume input').val() / 10));

	$('#player .volume input').on('input', function(e) {
		var $inputVolume = $(this);

		player.volume = parseFloat($(this).val() / 100);
		playerState.volume = player.volume;

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

		console.log(e.offsetX);
		$inputVolume.val(e.offsetX).trigger('input');

		/*var delta = e.originalEvent.deltaY
				 || e.originalEvent.detail
				 || e.originalEvent.wheelDelta
		;

		if(delta > 0 && +$inputVolume.val() > 0) {
			$inputVolume.val(+$inputVolume.val() - 2).trigger('input');
		} else if(delta < 0 && +$inputVolume.val() < 100) {
			$inputVolume.val(+$inputVolume.val() + 2).trigger('input');
		}*/

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

$(document).ready(function() {

	

});


$(window).load(function() {

	// var dateLoad = new Date().getTime();
	// console.log(dateLoad, dateStart);
	// console.log((dateLoad - dateStart) + 'ms');

	// Preloader
	// $(".spinner").fadeOut(300);
	// $(".loader").delay(400).fadeOut("slow");

		
});

