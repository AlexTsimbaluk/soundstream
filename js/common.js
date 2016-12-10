var dateStart = new Date().getTime();

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

	function getStationAjax(id) {
		runAjax('POST', {'action': 'getStation', 'id': id}, function(data) {
			var response = JSON.parse(data);
			var track = response[0];
			var station = {
				id: track.station_id,
				title: track.station_title,
				url: track.station_url
			};
			// console.log(station);
			// return station;
			getStation(station);
		});
	}
	function getStation(station) {
		// console.log(station);
		return station;
	}

	function getTrackMarkup() {
		// body...
	}

	var t = getStationAjax(12);
	// console.log(t);

	function runAjax(type_, data_, callback) {
		$.ajax({
			type: type_,
			data: data_,
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
				console.log('error');
			},
			success: callback
		});
	}

	// Отобразить название станции при воспроизведении
	function displayState(el) {
		$('#player .info').html(el.data('stationTitle'));
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
	function addToPlaylist(id, playlistName) {
		runAjax('POST', {'action': 'getStation', 'id': id}, function(data) {
			var response = JSON.parse(data);
			var playlistActive = $('.playlistContainer .playlist.active');
			var markup = '';
			for(var i = 0; i < response.length; i++) {
				var track = response[i];
				markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete"><i class="fa fa-minus"></i></div><div class="title">' + track.station_title +
				'</div><div class="url">' + track.station_url + '</div></div>';
				for (var i = 0; i < playerState.playlists.length; i++) {
					if(playerState.playlists[i].name == playlistName) {
						playerState.playlists[i].tracks.push(+track.station_id);
						playerState.playlists[i].currentTrack = {
							id: track.station_id,
							url: track.station_url,
							title: track.station_title
						};
						playerState.currentPlaylist = i;
					}
				}
			}
			Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
			playlistActive.html(playlistActive.html() + markup);
			playlistActive.find('.track:first').addClass('selected');
		});
	}

	// Удалить станцию из плейлиста
	function deleteFromPlaylist(id, playlistName) {
		console.log(playlistName);
	}

	

	// Конструктор объекта Playlist
	function Playlist(name, active) {
		this.name = name;
		this.active = active;
		this.tracks = [];
		this.currentTrack = {};
	}

	var browser = $('body');
	browser.attr('data-useragent', navigator.userAgent);

	// var playlistContainer = $('.playlistContainer');
	var player = new Audio();
	// Объект состояния плеера
	var playerState = {
		playlists: [],
		currentPlaylist: 0,
		volume : player.volume,
		paused: player.paused
	};
	

	if(Cookies.get('playerState') == undefined) {
		console.log('cookie undefined');
		// Объект плейлиста
		playerState.playlists[0] = new Playlist('Default', true);
		Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
		playerState = JSON.parse(Cookies.get('playerState'));

	} else {
		playerState = JSON.parse(Cookies.get('playerState'));
		player.volume = playerState.volume;
		player.src = playerState.playlists[playerState.currentPlaylist].currentTrack.url;
		player.paused = playerState.paused;
		console.log($('.playlistContainer .playlist').find('.track'));
		var currentTrackEl = $('.playlistContainer .active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']');
		console.log($('.playlistContainer .active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']'));
		/*Получить плейлист и сформировать его*/
		var targetStations = playerState.playlists[0].tracks;
		runAjax('POST', {'action': 'getTargetStations', 'id': targetStations}, function(data) {
			var response = JSON.parse(data);
			var playlist = $('.playlistContainer .playlist');
			var markup = '';
			for(var i = 0; i < response.length; i++) {
				var track = response[i];
				markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete"><i class="fa fa-minus"></i></div><div class="title">' + track.station_title +
				'</div><div class="url">' + track.station_url + '</div></div>';
			}
			playlist.html(playlist.html() + markup);
			playlist.find('.track:first').addClass('selected');
		});
		if(!playerState.paused) {
			player.play();
			$('#player .play').addClass('visualisation');
			console.log($('.playlistContainer .active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']'));
			visualisation($('.playlistContainer .active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']'));
		}
	}

	var intervalVis;
	// Визуализация выбранного играющего трека
	function visualisation(el) {
		console.log(el);
		clearInterval(intervalVis);
		// el.parent().children('.track:not(.selected)').removeClass('visualisation').css({backgroundImage: 'none'});
		el.parent().children('.track:not(.selected)').removeClass('visualisation');
		el.addClass('visualisation');
		$('#player .play').addClass('visualisation');
		var stepGrad1 = Math.floor(Math.random() * 360);
		var stepGrad2 = stepGrad1 + 180;
		var stepBorder1 = Math.floor(Math.random() * 360);
		var stepBorder2 = 180;
		intervalVis = setInterval(function() {
			el.css({'backgroundImage': 'linear-gradient(to right, hsl(' + ((++stepGrad1)%360)  + ', 60%, 50%) 0%, hsl(' + ((++stepGrad2)%360)  + ', 60%, 50%) 100%)'});
			$('#player .play').css({'boxShadow': '0px 0px 5px 0.4px hsl(' + ((++stepBorder1)%360)  + ', 100%, 50%)', 'borderColor': 'hsl(' + ((++stepBorder1)%360)  + ', 100%, 50%)'});
		}, 50);
	}
	$('#player .play').on('mouseover', function(e) {
		$(this).css({'boxShadow': '0px 0px 5px 0.4px #0ff'});
	});
	$('#player .play').on('mouseout', function(e) {
		$(this).css({'boxShadow': 'none'});
	});
	// Плавное изменение цвета
	function visualisationStop(el) {
		clearInterval(intervalVis);
		el.removeClass('visualisation');
		el.css({'backgroundImage': 'linear-gradient(to right, hsl(0, 0%, 33%) 0%, hsl(0, 0%, 47%) 100%)'});
		$('#player .play').css({'boxShadow': 'none', 'borderColor': '#0ff'});
	}


	$('#player .play').click(function(e) {
		if($('.playlist').children('.selected').length > 0) {
			var track = $('.playlistContainer .active .selected');
			var currentTrackEl = $('.playlistContainer .active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']');
			console.log(currentTrackEl);
			player.src = $('.playlistContainer .selected').data('stationUrl');
			playerState.playlists[0].currentTrack = {
				id: $('.playlistContainer .selected').data('stationId'),
				url: player.src,
				title: $('.playlistContainer .selected').data('stationTitle')
			};
			player.play();
			playerState.paused = player.paused;
			// var currentTrackEl = $('.playlistContainer .active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']');
			// console.log(currentTrackEl);
			Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
			// visualisation(playerState.playlists[0].currentTrack.el);
			visualisation($('.active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']'));
			displayState($('.playlist .selected'));
			updateTime();
			setInterval(function() {
				updateTime();
			}, 1000);
		}
	});
	$('#player .stop').click(function(e) {
		playerState = JSON.parse(Cookies.get('playerState'));
		player.pause();
		playerState.paused = player.paused;
		var currentTrackEl = $('.playlistContainer .active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']');
		visualisationStop(currentTrackEl);
		// visualisationStop($('.playlistContainer .active .selected'));
		Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
		player.currentTime = 0;
		$('#player .info').html('');
	});

	$('.playlistContainer').on('click', '.delete', function(e) {
		var playlistName = $(this).parents('.playlist.active').data('name');
		var id = $(this).parent().data('stationId');
		var pl = 
		console.log(playlistName, id);
		// deleteFromPlaylist($(this).parent().data('stationId'), playlistName);
		$(this).parent().remove();
		for (var i = 0; i < playerState.playlists.length; i++) {
			var pl = playerState.playlists[i];
			if(pl.name == playlistName) {
				pl.tracks.splice(pl.tracks.indexOf(id), 1);
			}
		}
		console.log(playerState);
		Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
	});

	$('.playlistContainer').on('mousedown', '.track', function(e) {
		/*$(this).parent().find('.selected').removeClass('selected').css({backgroundImage: 'none'});
		$(this).addClass('selected').css({'backgroundImage': 'linear-gradient(to right, hsl(0, 0%, 33%) 0%, hsl(0, 0%, 47%) 100%)'});*/
		$(this).parent().find('.selected').removeClass('selected');
		$(this).addClass('selected');
	});

	$('.playlistContainer').on('dblclick', '.track', function(e) {
		var url = $(this).data('stationUrl');
		player.src = url;
		player.play();
		playerState.playlists[0].currentTrack = {
			id: $('.playlistContainer .selected').data('stationId'),
			url: player.src,
			title: $('.playlistContainer .selected').data('stationTitle')
		};
		var currentTrackEl = $('.playlistContainer .active [data-station-id=' + playerState.playlists[0].currentTrack.id + ']');
		visualisation(currentTrackEl);
		playerState.paused = player.paused;
		Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
		displayState($(this));
		updateTime();
		setInterval(function() {
			updateTime();
		}, 1000);
	});

	
	$('#player .volume input').val(player.volume * 100);

	$('#player .volume input').on('input', function(e) {
		player.volume = parseFloat($(this).val() / 100);
		$('#player .volume .val').html($(this).val());
		setPlayerState('volume', player.volume);
	});

	/*$('.playlistContainer').on('mouseover', '.track', function(e) {
		$(this).addClass('hovered');
	});
	$('.playlistContainer').on('mouseout', '.track', function(e) {
		$(this).removeClass('hovered');
	});*/

	

	$('#player .find input').on('keyup', function(e) {
		var target = $(this).val();
		if(target.length > 2) {
			runAjax('POST', {'action': 'find', 'target': target}, function(data) {
				var response = JSON.parse(data);
				var result = $('.searchContainer .result');
				result.html('');
				var markup = '<div class="total"><span>' + response.length + '</span> stations is found</div>';
				for(var i = 0; i < response.length; i++) {
					var station = response[i];
					markup += '<div class="station" data-station-id="' + station.station_id + '"><div class="add"><i class="fa fa-plus"></i></div><div class="title">' + station.station_title +
					'</div><div class="url">' + station.station_url + '</div></div>';
				}
				result.html(markup);
				$('.searchContainer').css({'display': 'inline-block'});
			});
		}
	});

	// Закрытие блока с результатами поиска
	$('.searchContainer .close').on('click', function(e) {
		$(this).parent().slideUp(500);
	});

	// Анимация кнопки "закрыть" при скроле блока с результатами поиска
	$('.searchContainer').on('scroll', function(e) {
		setTimeout(function() {
			$('.searchContainer').find('.close').animate({top: ($('.searchContainer').scrollTop() + 10) + 'px'}, 100);
		}, 50);
		
	});
	
	
	// Добавление станций в плейлист
	// Доделать, чтобы станции добавлялись в активный плэйлист
	$('.searchContainer').on('click', '.add', function(e) {
		// playlistDefault.addTrack($(this).parent().data('stationId'));
		addToPlaylist($(this).parent().data('stationId'), 'Default');
	});
	$('.searchContainer').on('dblclick', '.station', function(e) {
		// playlistDefault.addTrack($(this).data('stationId'));
		addToPlaylist($(this).data('stationId'), 'Default');
	});

	/*Sortable plugin JQueryUI*/
	$('.sortable').sortable({scroll: true});


});

$(window).load(function() {

	var dateLoad = new Date().getTime();
	// console.log(dateLoad, dateStart);
	// console.log((dateLoad - dateStart) + 'ms');

	// Preloader
	/*$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");*/

	
		
});

