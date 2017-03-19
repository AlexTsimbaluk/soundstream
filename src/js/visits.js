$(document).ready(function() {


	function checkUniqToday(uniqHash) {
		$.ajax({
			data: {
				'action': 'checkUniqToday',
				'cookie': uniqHash
			},
			success: function(data) {
				data = JSON.parse(data)
				if(data.length > 0) {
					addHit(uniqHash);
					console.log('hit');
				} else {
					addVisit(uniqHash);
					console.log('uniq visit today');
				}
			}
		});
	}

	function addVisit(uniqHash) {
		var useragent = navigator.userAgent,
			os = navigator.oscpu || navigator.platform,
			screensize = screen.width + '*' + screen.height,
			browsersize = window.innerWidth + '*' + window.innerHeight
			;

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
			success: function(data) {}
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
			success: function(data) {}
		});
	}

	var uniqHash;

	if(localStorage.getItem('uniqHash') == undefined) {
		uniqHash = getHash(8);
		localStorage.setItem('uniqHash', uniqHash);
		addVisit(uniqHash);
		console.log('+uniq visit first');
	} else {
		uniqHash = localStorage.getItem('uniqHash');
		checkUniqToday(uniqHash);
	}


});