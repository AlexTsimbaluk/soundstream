var dateStart = new Date().getTime();

$(document).ready(function() {

	var playerContainer = $('.playerContainer');

	var player = new Audio();
	// Объект состояния плеера
	var playerState = {
		volume : player.volume
	};

	function runAjax(type_, data_, callback) {
		$.ajax({
			type: type_,
			data: data_,
			url: 'actions.php',
			complete: function() {},
			statusCode: {
				200: function(message) {
					// console.log(message);
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

	function displayState(el) {
		$('#player .info').html(el.data('stationTitle'));
	}

	function updateTime() {
		var s = ('0' + parseInt(player.currentTime % 60)).slice(-2);
		var m = ('0' + parseInt((player.currentTime / 60) % 60)).slice(-2);
		$('#player .time .hours').html();
		$('#player .time .minutes').html(m);
		$('#player .time .seconds').html(s);
	}

	function addToPlaylist(id) {
		console.log(id);
		runAjax('POST', {'action': 'getStation', 'id': id}, function(data) {
			var response = JSON.parse(data);
			var playlistContainer = $('.playlistContainer');
			var markup = '';
			for(var i = 0; i < response.length; i++) {
				var track = response[i];
				markup += '<div class="track" data-station-id="' + track.station_id + '" data-station-title="' + track.station_title + '" data-station-url="' + track.station_url + '"><div class="delete"><i class="fa fa-minus"></i></div><div class="title">' + track.station_title +
				'</div><div class="url">' + track.station_url + '</div></div>';
			}
			playlistContainer.html(playlistContainer.html() + markup);
			playlistContainer.find('.track:first').addClass('selected');
		});
	}
	

	$('#player .play').click(function(e) {
		if($('.playlistContainer').children('.selected').length > 0) {
			player.src = $('.playlistContainer .selected').data('stationUrl');
			console.log(player.src);
			player.play();
			displayState($('.playlistContainer .selected'));
			updateTime();
			setInterval(function() {
				updateTime();
			}, 1000);
		}
	});

	$('#player .stop').click(function(e) {
		player.pause();
		player.currentTime = 0;
		$('#player .info').html('');
	});

	playerState.volume = player.volume;

	if(undefined == Cookies.get('volume')) {
		Cookies.set('volume', player.volume, {expires: 180, path: "/"});
	} /*else {
		Cookies.set('volume', $('#player .volume input').val() / 100, {expires: 180, path: "/"});
	}*/

	player.volume = Cookies.get('volume');
	$('#player .volume input').val(player.volume * 100);

	$('#player .volume input').on('input', function(e) {
		player.volume = parseFloat($(this).val() / 100);
		$('#player .volume .val').html($(this).val());
		Cookies.set('volume', player.volume, {expires: 180, path: "/"});
	});

	$('.playlistContainer').on('mouseover', '.track', function(e) {
		$(this).addClass('hovered');
	});

	$('.playlistContainer').on('mouseout', '.track', function(e) {
		$(this).removeClass('hovered');
	});

	$('.playlistContainer').on('mousedown', '.track', function(e) {
		// console.log($(this).parent().find('.selected'));
		console.log($(this));
		$(this).parent().find('.selected').removeClass('selected');
		$(this).addClass('selected');
	});

	$('.playlistContainer').on('dblclick', '.track', function(e) {
		var url = $(this).data('stationUrl');
		player.src = url;
		console.log($(this));
		displayState($(this));
		updateTime();
		player.play();
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
	$('.searchContainer').on('click', '.add', function(e) {
		addToPlaylist($(this).parent().data('stationId'));
	});
	$('.searchContainer').on('dblclick', '.station', function(e) {
		addToPlaylist($(this).data('stationId'));
	});


	/*$.ajax({
		type: "POST",
		url: 'actions.php',
		data: 'action=initUrlList',
		error: function() {  
			console.log("Ошибка соединения");
		},
		complete: function() {},
		statusCode: {
			200: function(message) {
				// console.log(message);
			},
			403: function(jqXHR) {
				var error = JSON.parse(jqXHR.responseText);
				$("body").prepend(error.message);
			}
		},
		success: function(data) {
			var response = JSON.parse(data);
			//var playerContainerMarkup = 'All: ' + response.length;
			var playerContainerMarkup = '';
			// for(var i = 0; i < response.length / 1000; i++) {
			for(var i = 0; i < 1; i++) {
				var entry = response[i];
				playerContainerMarkup += '<div class="station" data-stationId="' + entry.station_id + '" data-stationTitle="' +  entry.station_title + '"><div class="delete" onclick="deleteEntry(\'stations\', this);"><i class="fa fa-trash-o"></i></div><audio src="' + entry.station_url + '" controls=""></audio></div>';
			}
			// playerContainer.html(playerContainerMarkup);
		}
	});*/



	/*var dateReady = new Date().getTime();
	console.log(dateReady, dateStart);
	console.log(dateReady - dateStart);*/


});

$(window).load(function() {

	var dateLoad = new Date().getTime();
	// console.log(dateLoad, dateStart);
	console.log((dateLoad - dateStart) + 'ms');

	// Preloader
	/*$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");*/

	// var  player = new Audio('radiotunes_clubbollywood_aacplus');
		
});

