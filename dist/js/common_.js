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
	function addToPlaylist(id, playlistObject) {
		runAjax('POST', {'action': 'getStation', 'id': id}, function(data) {
			var response = JSON.parse(data);
			var playlist = $('.playlistContainer .playlist');
			var markup = '';
			for(var i = 0; i < response.length; i++) {
				var track = response[i];
				markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete"><i class="fa fa-minus"></i></div><div class="title">' + track.station_title +
				'</div><div class="url">' + track.station_url + '</div></div>';
				playlistObject.addTrack(+track.station_id);
			}
			playerState.playlists[playlistObject] = playlistObject;
			console.log(playerState);
			// console.log(playerState.playlists);
			// console.log(JSON.parse(Cookies.get('playerState')));
			Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
			playlist.html(playlist.html() + markup);
			playlist.find('.track:first').addClass('selected');
		});
	}

	function Playlist(name, active) {
		this.name = name;
		this.active = active;
		this.tracks = [];
		this.currentTrack = {};
		console.log(this);
		
		// console.log(playerState.playlists['Default']);
		// console.log(this);
		// console.log(playerState.playlists[this.name]);
	}
	Playlist.prototype.addTrack = function(id) {
		console.log(this);
		runAjax('POST', {'action': 'getStation', 'id': id}, function(data) {
			var response = JSON.parse(data);
			var playlist = $('.playlistContainer .playlist');
			var markup = '';
			for(var i = 0; i < response.length; i++) {
				var track = response[i];
				markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete"><i class="fa fa-minus"></i></div><div class="title">' + track.station_title +
				'</div><div class="url">' + track.station_url + '</div></div>';
				console.log(this);
				this.tracks.push(+track.id);
			}
			playerState.playlists[this.name] = this;
			console.log(playerState);
			// console.log(playerState.playlists);
			// console.log(JSON.parse(Cookies.get('playerState')));
			Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
			playlist.html(playlist.html() + markup);
			playlist.find('.track:first').addClass('selected');
		});
		this.tracks.push(id);
	}
	Playlist.prototype.deleteTrack = function(id) {
		// this.tracks.push(id);
	}

	var browser = $('body');
	browser.attr('data-useragent', navigator.userAgent);

	// var playlistContainer = $('.playlistContainer');
	var player = new Audio();
	// Объект состояния плеера
	var playerState = {
		/*playlists: [{
			active: true,
			name: 'Default',
			tracks: [],
			currentTrack: {}
		}],*/
		playlists: [],
		currentPlaylist: 0,
		volume : player.volume,
		paused: player.paused
	};
	

	if(Cookies.get('playerState') == undefined) {
		console.log('cookie undefined');
		// Объект плейлиста
		var playlistDefault = new Playlist('Default', true);
		playerState.playlists['Default'] = playlistDefault;
		Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
	} else {
		playerState = JSON.parse(Cookies.get('playerState'));
		player.volume = playerState.volume;
		// playerState.playlists
		/*if(playerState.playlists.length == 0) {
			var playlistDefault = new Playlist('Default', true);
		}*/
		console.log(playerState.playlists);
		// player.src = playerState.playlists[0].currentTrack.url;
		// player.src = playlistDefault.currentTrack.url;
		player.paused = playerState.paused;

		/*Получить плейлист и сформировать его*/
		/*var targetStations = JSON.parse(Cookies.get('playerState')).playlists['Default'].tracks;
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
		}*/
		/*for (var i = 0; i < targetStations.length; i++) {
			addToPlaylist(targetStations[i]);
		}*/
	}
	/*console.log(player.src);
	console.log(player.currentPlaylist);*/
	/*var a = JSON.parse(Cookies.get('playerState')).playlists;
	console.log(a[0].tracks);*/


	$('#player .play').click(function(e) {
		if($('.playlist').children('.selected').length > 0) {
			player.src = $('.playlistContainer .selected').data('stationUrl');
			player.play();
			playlistDefault.currentTrack = {
				id: $('.playlistContainer .selected').data('stationId'),
				url: player.src,
				title: $('.playlistContainer .selected').data('stationTitle')
			};
			playerState.playlists[0] = playlistDefault;
			playerState.paused = player.paused;
			Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
			displayState($('.playlist .selected'));
			updateTime();
			setInterval(function() {
				updateTime();
			}, 1000);
		}
	});
	$('#player .stop').click(function(e) {
		player.pause();
		playerState.paused = player.paused;
		Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
		player.currentTime = 0;
		$('#player .info').html('');
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

	$('.playlistContainer').on('mousedown', '.track', function(e) {
		$(this).parent().find('.selected').removeClass('selected');
		$(this).addClass('selected');
	});

	$('.playlistContainer').on('dblclick', '.track', function(e) {
		var url = $(this).data('stationUrl');
		player.src = url;
		player.play();
		playlistDefault.currentTrack = {
			id: $('.playlistContainer .selected').data('stationId'),
			url: player.src,
			title: $('.playlistContainer .selected').data('stationTitle')
		};
		playerState.playlists[0] = playlistDefault;
		playerState.paused = player.paused;
		Cookies.set('playerState', JSON.stringify(playerState), {expires: 180, path: "/"});
		displayState($(this));
		updateTime();
		setInterval(function() {
			updateTime();
		}, 1000);
	});

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
		playlistDefault.addTrack($(this).parent().data('stationId'));
	});
	$('.searchContainer').on('dblclick', '.station', function(e) {
		playlistDefault.addTrack($(this).data('stationId'));
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

