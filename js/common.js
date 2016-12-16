var dateStart = new Date().getTime();

$(document).ready(function() {

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
			console.log('error');
		}
	});

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

	/*function getStationAjax(id) {
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
	}*/
	function getStation(station) {
		// console.log(station);
		return station;
	}

	function getTrackMarkup() {
		// body...
	}

	/*var t = getStationAjax(12);
	console.log(t);*/

	

	// Отобразить название станции при воспроизведении
	/*function displayState(el) {
		$('#player .info').html(el.data('stationTitle'));
	}*/
	function displayState() {
		$('#player .info').html(playerState.playlists[playerState.currentPlaylist].currentTrack.title);
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
				var playlist = playlistContainer.find('.playlist[data-name="' + playerState.currentPlaylist + '"]');
				var markup = '';
				for(var i = 0; i < response.length; i++) {
					var track = response[i];
					markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete"><i class="fa fa-minus"></i></div><div class="title">' + track.station_title +
					'</div><div class="url">' + track.station_url + '</div></div>';
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

	// Удалить станцию из плейлиста
	/*function deleteFromPlaylist(id, playlistName) {
		console.log(playlistName);
	}*/


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

	var browser = $('body');
	browser.attr('data-useragent', navigator.userAgent);

	var playlistContainer = $('#player .playlistContainer'),
		playlistsPanel = $('#player .playlistsPanel'),
		player = new Audio(),
		// Объект состояния плеера
		playerState = {
			playlists: {},
			playlistsOrder: [],
			currentPlaylist: '',
			volume : player.volume,
			paused: player.paused
		};

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
				var response = JSON.parse(data);
				var playlist = playlistContainer.find('.playlist[data-name="' + playerState.currentPlaylist + '"]');
				var markup = '';
				for(var i = 0; i < response.length; i++) {
					var track = response[i];
					markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete"><i class="fa fa-minus"></i></div><div class="title">' + track.station_title +
					'</div><div class="url">' + track.station_url + '</div></div>';
				}
				playlist.html(playlist.html() + markup);
				// playlist.find('.track:first').addClass('selected');
				playlist.find('.track[data-station-id=' + playerState.playlists[playerState.currentPlaylist].currentTrack.id + ']').addClass('selected');
				if(!playerState.paused) {
					player.play();
					displayState();
					updateTime();
					setInterval(function() {
						updateTime();
					}, 1000);
					visualisation($('.playlistContainer .active [data-station-id=' + playerState.playlists[playerState.currentPlaylist].currentTrack.id + ']'));
				}
			}
		});
		
	}
	
	var intervalVis = null;
	// Визуализация выбранного играющего трека и кнопки play 
	function visualisation(el) {
		console.log(el);
		clearInterval(intervalVis);
		el.parent().children('.track:not(.selected)').removeClass('visualisation').removeAttr('style');
		el.addClass('visualisation');
		$('#player .play').addClass('visualisation');
		$('#player .play span').remove();
		$('#player .play.visualisation').prepend('<span class="inner"></span><span class="outer"></span>');
		var stepGrad1 = Math.floor(Math.random() * 360);
		var stepGrad2 = stepGrad1 + 180;
		var stepBorder1 = Math.floor(Math.random() * 360);
		var stepBorder2 = stepBorder1 + 180;
		intervalVis = setInterval(function() {
			el.css({'backgroundImage': 'linear-gradient(to right, hsl(' + ((++stepGrad1)%360)  + ', 60%, 50%) 0%, hsl(' + ((++stepGrad2)%360)  + ', 60%, 50%) 100%)'});
			$('#player .play.visualisation').css({'boxShadow': '0px 0px 5px 0.4px hsl(' + ((++stepBorder1)%360)  + ', 100%, 50%)', 'borderColor': 'hsl(' + ((++stepBorder1)%360)  + ', 100%, 50%)'});
			$('#player .play.visualisation .inner').css({'borderBottomColor': 'hsl(' + ((++stepBorder1)%360)  + ', 100%, 50%)'});
			$('#player .play.visualisation .outer').css({'borderTopColor': 'hsl(' + ((++stepBorder1)%360)  + ', 100%, 50%)'});
		}, 50);
	}
	
	// Остановка визуализации
	function visualisationStop(el) {
		clearInterval(intervalVis);
		el.removeClass('visualisation').css({'backgroundImage': 'none'}).removeAttr('style');
		$('#player .play').removeClass('visualisation').css({'boxShadow': 'none', 'borderColor': '#0ff'}).removeAttr('style');
		$('#player .play span').remove();
	}


	$('#player .play').click(function(e) {
		if($('.playlist').children('.selected').length > 0) {
			playerState.playlists[playerState.currentPlaylist].currentTrack = {
				id: $('.playlistContainer .selected').data('stationId'),
				url: player.src,
				title: $('.playlistContainer .selected').data('stationTitle')
			};
			var currentTrackEl = $('.playlistContainer .active [data-station-id=' + playerState.playlists[playerState.currentPlaylist].currentTrack.id + ']');
			console.log(currentTrackEl);
			player.src = $('.playlistContainer .selected').data('stationUrl');
			player.play();
			playerState.paused = player.paused;
			visualisation(currentTrackEl);
			// displayState($('.playlist .selected'));
			displayState();
			updateTime();
			localStorage.setItem('playerState', JSON.stringify(playerState));
			setInterval(function() {
				updateTime();
			}, 1000);
		}
	});
	$('.playlistContainer').on('dblclick', '.track', function(e) {
		var url = $(this).data('stationUrl');
		player.src = url;
		player.play();
		playerState.playlists[playerState.currentPlaylist].currentTrack = {
			id: $('.playlistContainer .selected').data('stationId'),
			url: player.src,
			title: $('.playlistContainer .selected').data('stationTitle')
		};
		var currentTrackEl = $('.playlistContainer .active [data-station-id=' + playerState.playlists[playerState.currentPlaylist].currentTrack.id + ']');
		visualisation(currentTrackEl);
		playerState.paused = player.paused;
		localStorage.setItem('playerState', JSON.stringify(playerState));
		// displayState($(this));
		displayState();
		updateTime();
		setInterval(function() {
			updateTime();
		}, 1000);
	});
	$('#player .stop').click(function(e) {
		// playerState = JSON.parse(Cookies.get('playerState'));
		player.pause();
		$('#player .play').removeClass('visualisation');
		playerState.paused = player.paused;
		var currentTrackEl = $('.playlistContainer .active [data-station-id=' + playerState.playlists[playerState.currentPlaylist].currentTrack.id + ']');
		visualisationStop(currentTrackEl);
		// visualisationStop($('.playlistContainer .active .selected'));
		localStorage.setItem('playerState', JSON.stringify(playerState));
		player.currentTime = 0;
		$('#player .info').html('');
	});

	$('.playlistContainer').on('click', '.delete', function(e) {
		/*var playlistName = $(this).parents('.playlist.active').data('name');
		var id = $(this).parent().data('stationId');
		console.log(playlistName, id);*/
		var id = $(this).parent().data('stationId');
		var pl = playerState.playlists[playerState.currentPlaylist];
		pl.tracks.splice(pl.tracks.indexOf(id), 1);
		$(this).parent().remove();
		/*for (var i = 0; i < playerState.playlists.length; i++) {
			var pl = playerState.playlists[i];
			if(pl.name == playlistName) {
				pl.tracks.splice(pl.tracks.indexOf(id), 1);
			}
		}*/
		console.log(playerState);
		localStorage.setItem('playerState', JSON.stringify(playerState));
	});

	$('.playlistContainer').on('mousedown', '.track', function(e) {
		// $(this).parent().find('.selected').removeClass('selected').css({backgroundImage: 'none'});
		// $(this).addClass('selected').css({'backgroundImage': 'linear-gradient(to right, hsl(0, 0%, 33%) 0%, hsl(0, 0%, 47%) 100%)'});
		$(this).parent().find('.selected').removeClass('selected');
		$(this).addClass('selected');
	});

	
	$('#player .volume input').val(player.volume * 100);
	$('#player .volume .val').html(Math.floor(player.volume * 100));
	// $('#player .volumeVisualisation').css({boxShadow: '0 0 5px ' + (4 + Math.floor(player.volume * 100 / 7)) + 'px #0ff'});

	$('#player .volume input').on('input', function(e) {
		player.volume = parseFloat($(this).val() / 100);
		playerState.volume = player.volume;
		$('#player .volume .val').html($(this).val());
		// $('#player .volumeVisualisation').css({boxShadow: '0 0 5px ' + (4 + Math.floor(player.volume * 100 / 7)) + 'px #0ff'});
		localStorage.setItem('playerState', JSON.stringify(playerState));
	});

	/*$('.playlistContainer').on('mouseover', '.track', function(e) {
		$(this).addClass('hovered');
	});
	$('.playlistContainer').on('mouseout', '.track', function(e) {
		$(this).removeClass('hovered');
	});*/


	// Показать поле ввода для поиска
	$('#player .find .showFieldSearch').click(function(e) {
		var searchInput = $(this).parent().find('input');
		if(searchInput.hasClass('visible') == false) {
			searchInput.addClass('visible').animate({opacity: 1, width: 212}, 100);
			setTimeout(function() {
				searchInput.focus();
			}, 300);
		} else {
			searchInput.removeClass('visible').animate({opacity: 0, width: 0}, 100).blur();
		}
	});

	// Поиск и показ найденных станций
	$('#player .find input').on('keyup', function(e) {
		var target = $(this).val();
		if(target.length > 2) {
			$.ajax({
				data: {'action': 'search', 'target': target},
				success: function(data) {
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
				}
			});
		}
	});

	// Получить все станции
	$('#player .find .showAll').on('click', function(e) {
		$.ajax({
			data: {'action': 'getAllStations'},
			success: function(data) {
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
			}
		});
	});

	// Закрытие блока с результатами поиска
	$('.searchContainer .close').on('click', function(e) {
		$(this).parents('.searchContainer').slideUp(500);
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
		addToPlaylist($(this).parent().data('stationId'));
	});
	$('.searchContainer').on('dblclick', '.station', function(e) {
		// playlistDefault.addTrack($(this).data('stationId'));
		addToPlaylist($(this).data('stationId'));
	});

	/*Sortable plugin JQueryUI*/
	$('.sortable').sortable({scroll: true});

	// playlistsPanel.append('<div class="plName" data-name="Default">Default</div>');
	// playlistsPanel.append('<div class="plName" data-name="Default">Default</div>');


});

$(window).load(function() {

	var dateLoad = new Date().getTime();
	// console.log(dateLoad, dateStart);
	// console.log((dateLoad - dateStart) + 'ms');

	// Preloader
	/*$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");*/

		
});

