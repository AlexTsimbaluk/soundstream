var dateStart = new Date().getTime();

$.ajaxSetup({
	type: 'POST',
	url: 'actions.php',
	complete: function() {},
	statusCode: {
		200: function(message) {},
		403: function(jqXHR) {
			'use strict';
			var error = JSON.parse(jqXHR.responseText);
			$("body").prepend(error.message);
		}
	},
	error: function (error, xhr, status, errorThrown) {
		'use strict';
		consoleOutput('XHR error');
		console.log(error);
	}
});

if(getParams().admin !== undefined) {
	$('body').addClass('admin');
} else {
	$('body').removeClass('admin');
}

function getParams() {
	'use strict';
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
	return 'rgb(' 					 +
				getRandomInt(0, 255) +
				','					 +
				getRandomInt(0, 255) +
				','					 +
				getRandomInt(0, 255) + ')';
}



// Получение случайной строки
function getHash(size) {
	'use strict';
	var hash = '';
	for(var i = 0; i < size; i++) {
		hash += String.fromCharCode(getRandomInt(33, 127));
	}
	return hash;
}







$(document).ready(function() {
	'use strict';
	
	detectDevice();

	$(window).on('resize', function() {
		detectDevice();
	});

	$.material.init();

	/*Sortable plugin JQueryUI*/
	// $('.sortable').sortable({scroll: true});




	// Первоначальное случайное фоновое изображение для body
	$('body').css({'background':'url("../img/bg/bg' +
					getRandomInt(1, 10) 			+
					'.jpg") no-repeat center / cover'
					// '.jpg") no-repeat center / auto 100%'
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
			// consoleOutput(path);
			imageArr[i] = path;
		}
		// imageArr.sort(compareRandom);
		// consoleOutput(imageArr);

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


	// mCustomScrollbar
	// Анимация кнопки "закрыть" при скроле блока с результатами поиска
	$('.searchContainer').mCustomScrollbar({
		callbacks: {
			onScroll: function() {
				animateCloseButton(this);
			}
		}
	});



	// преобразовать принятую строку в такую же но как будто на другом языке
	function decodeText(text) {
		var symbolArray = (text + '').split('');
		var codeArray = getSymbolCode(text);
		var decodeArray = [];
		var newText = ''; 

		for (var i = 0; i < codeArray.length; i++) {
			if((codeArray[i] >= 65 && codeArray[i] <= 90) || 	// A -Z
			(codeArray[i] >= 97 && codeArray[i] <= 122)) { 		// a - z
				var newCode = decodeCode(codeArray[i]);
				var newSymbol = (newCode[getRandomInt(0, newCode.length - 1)]);
				decodeArray.push(newSymbol);
				// console.log(symbolArray[i] + ' - ' + newCode);
				if($('.after-decode').length) {
					$('.after-decode .mCSB_container')
						.append(
							'<div class="translated-text">'
								+ symbolArray[i]
								+ ' - '
								+ newCode
								+ '</div>'
						);
				}
			} else {
				decodeArray.push(symbolArray[i]);
			}
		}

		// todo: добавить вывод итогового результата для $(.before-decode).val()
		// в какой нибудь блок (тоже добавить в $(.devel .symbols))

		newText = decodeArray.join('');
		return newText;
	}

	function getSymbolCode(text) {
		var codeArray = (text + '').split('');

		for (var i = 0; i < codeArray.length; i++) {
			codeArray[i] = codeArray[i].charCodeAt(0);
		}

		return codeArray;
	}

	function decodeCode(code) {
		var variants = [];
		var newSymbol;

		switch(code) {
			/* A - Z */
			case 65: // A
				variants.push(570);
				variants.push(582);
				variants.push(916);
				variants.push(1126);
				variants.push(5122);
				variants.push(7680);
				variants.push(7840);
				variants.push(7842);
				variants.push(7844);
				variants.push(7846);
				variants.push(7848);
				variants.push(7850);
				variants.push(7852);
				variants.push(7854);
				variants.push(7856);
				variants.push(7858);
				variants.push(7860);
				variants.push(7862);
				variants.push(8491);
				variants.push(11375);
				variants.push(42582);
				variants.push(42584);
				variants.push(66662);
				break;

			case 66: // B
				variants.push(579);
				variants.push(7682);
				variants.push(7684);
				variants.push(7838);
				variants.push(7686);
				variants.push(8492);
				variants.push(65922);
				break;

			case 67: // C
				variants.push(1021);
				variants.push(1022);
				variants.push(7688);
				variants.push(42814);
				break;

			case 68: // D
				variants.push(270);
				variants.push(272);
				variants.push(7690);
				variants.push(7692);
				variants.push(7694);
				variants.push(7696);
				variants.push(7698);
				
				break;

			case 69: // E
				variants.push(582);
				variants.push(1214);
				variants.push(7700);
				variants.push(7702);
				variants.push(7704);
				variants.push(7706);
				variants.push(7708);
				variants.push(7864);
				variants.push(7866);
				variants.push(7868);
				variants.push(7870);
				variants.push(7872);
				variants.push(7874);
				variants.push(7876);
				variants.push(7878);
				variants.push(8493);
				break;

			case 70: // F
				variants.push(7710);
				variants.push(8457);
				variants.push(8497);
				break;

			case 71: // G
				variants.push(284);
				variants.push(290);
				variants.push(7712);
				variants.push(42912);
				break;

			case 72: // H
				variants.push(292);
				variants.push(294);
				variants.push(7714);
				variants.push(7716);
				variants.push(7718);
				variants.push(7720);
				variants.push(7722);
				variants.push(1186);
				variants.push(1188);
				variants.push(42922);
				break;

			case 73: // I
				variants.push(302);
				variants.push(1031);
				variants.push(7724);
				variants.push(7726);
				variants.push(7880);
				variants.push(7882);
				break;

			case 74: // J
				variants.push(308);
				break;

			case 75: // K
				variants.push(1180);
				variants.push(1182);
				variants.push(1184);
				variants.push(1310);
				variants.push(7728);
				variants.push(7730);
				variants.push(7732);
				variants.push(42816);
				variants.push(42914);
				variants.push(65944);
				break;

			case 76: // L
				variants.push(317);
				variants.push(319);
				variants.push(321);
				variants.push(573);
				variants.push(7734);
				variants.push(7736);
				variants.push(7738);
				variants.push(7740);
				variants.push(7930);
				variants.push(42824);
				break;

			case 77: // M
				variants.push(7742);
				variants.push(7744);
				variants.push(7746);
				variants.push(11374);
				variants.push(43005);
				break;

			case 78: // N
				variants.push(327);
				variants.push(330);
				variants.push(7748);
				variants.push(7750);
				variants.push(7752);
				variants.push(7754);
				variants.push(42916);
				break;

			case 79: // O
				variants.push(336);
				variants.push(556);
				variants.push(1256);
				variants.push(1258);
				variants.push(7756);
				variants.push(7758);
				variants.push(7760);
				variants.push(7762);
				variants.push(7884);
				variants.push(7886);
				variants.push(7888);
				variants.push(7890);
				variants.push(7892);
				variants.push(7894);
				variants.push(7896);
				variants.push(7898);
				variants.push(7900);
				variants.push(7902);
				variants.push(7904);
				variants.push(7906);
				
				break;

			case 80: // P
				variants.push(1166);
				variants.push(5502);
				variants.push(5504);
				variants.push(7764);
				variants.push(7766);
				variants.push(8253);
				variants.push(8267);
				variants.push(42832);
				variants.push(42834);
				break;

			case 81: // Q
				variants.push(8474);
				break;

			case 82: // R
				variants.push(588);
				variants.push(7768);
				variants.push(7770);
				variants.push(7772);
				variants.push(7774);
				variants.push(8476);
				variants.push(8477);
				variants.push(8479);
				variants.push(42918);
				variants.push(65958);
				break;

			case 83: // S
				variants.push(7776);
				variants.push(7778);
				variants.push(7780);
				variants.push(7782);
				variants.push(7784);
				variants.push(11390);
				variants.push(42920);
				break;

			case 84: // T
				variants.push(1196);
				variants.push(7786);
				variants.push(7788);
				variants.push(7790);
				variants.push(7792);
				variants.push(42825);
				variants.push(65964);
				variants.push(65966);
				break;

			case 85: // U
				variants.push(7794);
				variants.push(7796);
				variants.push(7798);
				variants.push(7800);
				variants.push(7802);
				variants.push(7908);
				variants.push(7910);
				variants.push(7912);
				variants.push(7914);
				variants.push(7916);
				variants.push(7918);
				variants.push(7920);
				variants.push(65967);
				break;

			case 86: // V
				variants.push(7804);
				variants.push(7806);
				variants.push(11377);
				break;

			case 87: // W
				variants.push(7808);
				variants.push(7810);
				variants.push(7812);
				variants.push(7814);
				variants.push(7816);
				variants.push(65510);
				break;

			case 88: // X
				variants.push(1276);
				variants.push(1278);
				variants.push(4287);
				variants.push(7818);
				variants.push(7820);
				break;

			case 89: // Y
				variants.push(590);
				variants.push(7822);
				variants.push(7922);
				variants.push(7924);
				variants.push(7926);
				variants.push(7928);
				variants.push(65971);
				variants.push(65912);
				break;

			case 90: // Z
				variants.push(7824);
				variants.push(7826);
				variants.push(7828);
				variants.push(11391);
				variants.push(65973);
				break;

			/* a - z */
			case 97: // a
				variants.push(170);
				variants.push(7681);
				variants.push(7834);
				variants.push(7841);
				variants.push(7843);
				variants.push(7845);
				variants.push(7847);
				variants.push(7849);
				variants.push(7851);
				variants.push(7853);
				variants.push(7855);
				variants.push(7857);
				variants.push(7859);
				variants.push(7861);
				variants.push(7863);
				variants.push(8119);
				variants.push(8071);
				variants.push(9074);
				variants.push(9078);
				variants.push(9082);
				variants.push(42583);
				variants.push(65998);
				break;

			case 98: // b
				variants.push(384);
				variants.push(389);
				variants.push(7683);
				variants.push(7685);
				variants.push(7687);
				variants.push(7839);
				variants.push(65920);
				break;

			case 99: // c
				variants.push(162);
				variants.push(263);
				variants.push(265);
				variants.push(267);
				variants.push(267);
				variants.push(269);				
				variants.push(1195);
				variants.push(7689);
				break;

			case 100: // d
				variants.push(271);
				variants.push(273);
				variants.push(545);
				variants.push(7691);
				variants.push(7693);
				variants.push(7695);
				variants.push(7697);
				variants.push(7699);
				break;

			case 101: // e
				variants.push(583);
				variants.push(7701);
				variants.push(7703);
				variants.push(7705);
				variants.push(7707);
				variants.push(7709);
				variants.push(7865);
				variants.push(7867);
				variants.push(7869);
				variants.push(7871);
				variants.push(7873);
				variants.push(7875);
				variants.push(7877);
				variants.push(7879);
				variants.push(8493);
				break;

			case 102: // f
				variants.push(402);
				variants.push(589);
				variants.push(981);
				variants.push(7711);
				variants.push(7835);
				variants.push(7836);
				variants.push(7837);
				variants.push(42919);
				break;

			case 103: // g
				variants.push(285);
				variants.push(287);
				variants.push(289);
				variants.push(291);
				variants.push(485);
				variants.push(487);
				variants.push(7713);
				variants.push(42913);
				break;

			case 104: // h
				variants.push(293);
				variants.push(295);
				variants.push(7715);
				variants.push(7717);
				variants.push(7719);
				variants.push(7721);
				variants.push(7723);
				variants.push(7830);
				break;

			case 105: // i
				variants.push(297);
				variants.push(299);
				variants.push(301);
				variants.push(303);
				variants.push(1031);
				variants.push(7725);
				variants.push(7727);
				variants.push(7881);
				variants.push(7883);
				break;

			case 106: // j
				variants.push(309);
				break;

			case 107: // k
				variants.push(311);
				variants.push(1179);
				variants.push(7729);
				variants.push(7731);
				variants.push(7733);
				variants.push(42915);
				variants.push(65945);
				break;

			case 108: // l
				variants.push(314);
				variants.push(316);
				variants.push(318);
				variants.push(320);
				variants.push(322);
				variants.push(7735);
				variants.push(7737);
				variants.push(7739);
				variants.push(7741);
				break;

			case 109: // m
				variants.push(7743);
				variants.push(7745);
				variants.push(7747);
				break;

			case 110: // n
				variants.push(324);
				variants.push(326);
				variants.push(328);
				variants.push(329);
				variants.push(331);
				variants.push(7749);
				variants.push(7751);
				variants.push(7753);
				variants.push(7755);
				variants.push(42917);
				variants.push(65950);
				break;

			case 111: // o
				
				variants.push(7757);
				variants.push(7759);
				variants.push(7761);
				variants.push(7763);
				variants.push(7885);
				variants.push(7887);
				variants.push(7889);
				variants.push(7891);
				variants.push(7893);
				variants.push(7895);
				variants.push(7897);
				variants.push(7899);
				variants.push(7901);
				variants.push(7903);
				variants.push(7905);
				variants.push(7907);
				variants.push(9004);
				break;

			case 112: // p
				variants.push(1167);
				variants.push(7765);
				variants.push(7767);
				break;

			case 113: // q
				variants.push(491);
				variants.push(493);
				break;

			case 114: // r			
				variants.push(7769);
				variants.push(7771);
				variants.push(7773);
				variants.push(7775);
				
				break;

			case 115: // s
				variants.push(349);
				variants.push(351);
				variants.push(353);
				variants.push(575);
				variants.push(7777);
				variants.push(7779);
				variants.push(7781);
				variants.push(7783);
				variants.push(7785);
				variants.push(42921);
				break;

			case 116: // t
				variants.push(355);
				variants.push(357);
				variants.push(359);
				variants.push(566);
				variants.push(7787);
				variants.push(7789);
				variants.push(7791);
				variants.push(7793);
				variants.push(7831);
				variants.push(65963);
				break;

			case 117: // u
				variants.push(359);
				variants.push(361);
				variants.push(363);
				variants.push(365);
				variants.push(367);
				variants.push(369);
				variants.push(371);
				variants.push(7795);
				variants.push(7797);
				variants.push(7799);
				variants.push(7801);
				variants.push(7909);
				variants.push(7911);
				variants.push(7913);
				variants.push(7915);
				variants.push(7917);
				variants.push(7919);
				variants.push(7921);
				variants.push(7803);
				break;

			case 118: // v
				variants.push(7805);
				variants.push(7807);
				variants.push(11380);
				break;

			case 119: // w
				variants.push(7809);
				variants.push(7811);
				variants.push(7813);
				variants.push(7815);
				variants.push(7817);
				variants.push(7832);
				variants.push(9077);
				variants.push(9081);
				break;

			case 120: // x
				variants.push(7819);
				variants.push(7821);
				variants.push(967);
				variants.push(1008);
				break;

			case 121: // y
				variants.push(591);
				variants.push(7823);
				variants.push(7833);
				variants.push(7923);
				variants.push(7925);
				variants.push(7927);
				variants.push(7929);
				variants.push(8509);
				break;

			case 122: // z
				variants.push(549);
				variants.push(576);
				variants.push(7825);
				variants.push(7827);
				variants.push(7829);
				variants.push(65974);
				break;

			default:
				console.log('Передана не буква в латинской раскладке');
				break;
		}

		if(!variants.length) {
			variants.push(code);
		}

		for (var i = 0; i < variants.length; i++) {
			variants[i] = String.fromCharCode(variants[i]);
		}

		return variants;
	}

	function translateCollection($collection, needTranslate) {
		if(needTranslate) {
			$collection.each(function(index, el) {
				var $el = $(el);
				var originalText = $el.text()
				var translatedText = decodeText(originalText);

				if(!$el.attr('data-orirginal-text')) {
					$el.attr('data-orirginal-text', originalText);
				}
				$el.text(translatedText);
			});
		} else {
			$collection.each(function(index, el) {
				var $el = $(el);
				var originalText = $el.attr('data-orirginal-text');

				$el.text(originalText);
			});
		}
	}

	function translateAllText(needTranslate) {
		/*var childNodes = document.body.children;
		console.log(childNodes);

		if(needTranslate) {

		} else {

		}

		for (var i = 0; i < childNodes.length; i++) {
			// отфильтровать не-элементы
			if(childNodes[i].nodeType != 1){
				continue;
			}

			var __ = childNodes[i].children;

			if(__.length) {
				// for (var i = 0; i < __.length; i++) {
				// 	// console.log(__);
				// }
				console.log(__.length);
			}

		}*/

		// var $tags = 
	}

	function translateText($elements, init) {
		console.log('::translateText');

		// var $elements = $('.track .url');

		// клик по кнопке перевода, или нужен перевод после загрузки страницы
		if((!playerState.translated && !init) || (playerState.translated && init)) {
			console.log('need translate');
			console.log(playerState.translated);

			translateCollection($elements, true);
			$('.translate-text').attr('data-translated', 1);

			// translateAllText(true);

			playerState.translated = true;
			localStorage.setItem('playerState', JSON.stringify(playerState));
		} else {
			console.log('need original');
			console.log(playerState.translated);

			translateCollection($elements, false);
			$('.translate-text').removeAttr('data-translated');

			// translateAllText(false);

			playerState.translated = false;
			localStorage.setItem('playerState', JSON.stringify(playerState));
		}
	}



	// определяем устройство
	function detectDevice() {
		console.log('::detectDevice');

		var width        = $('body').width(),
			height       = $('body').height(),
			screenWidth  = screen.width,
			screenHeight = screen.height,
			ratio        = Math.max(width, height) / Math.min(width, height),
			screenRatio  = Math.max(width, screenHeight) / Math.min(width, screenHeight),
			device       = ''
		;

		$('body')
			.removeAttr('data-smartphone')
			.removeAttr('data-tab')
			.removeAttr('data-desktop')
			.removeAttr('data-smartphone-keyboard')
			.removeAttr('data-console')
		;

		if(height <= 736) {
			consoleOutput('height <= 736');
			if(ratio >= 1.01 && ratio < 1.25) {
				device = 'smartphone-keyboard';
				$('body').attr('data-smartphone-keyboard', 1);
			} else if((screenRatio >= 1.7 && screenRatio < 1.8) && ratio < 2) {
			// if(ratio >= 1.7 && ratio < 1.8) {
				device = 'smartphone';
				$('body').attr('data-smartphone', 1);
			} else {
				device = 'desktop';
				$('body').attr('data-desktop', 1);
				if(screenHeight - height > 115) {
					$('body').attr('data-console', 1);
				}
			}
		} else if(height <= 1024) {
			consoleOutput('height <= 1024');
			if(screenRatio >= 1.3 && screenRatio < 1.4) {
				device = 'tab';
				$('body').attr('data-tab', 1);
			} else {
				device = 'desktop';
				$('body').attr('data-desktop', 1);
				if(screenHeight - height > 115) {
					$('body').attr('data-console', 1);
				}
			}
		} else {
			device = 'desktop';
			$('body').attr('data-desktop', 1);
			if(screenHeight - height > 115) {
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
			ratio
		;


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

		titleContainer
			.removeClass('runningString')
			.parent().css({'width':'auto'})
		;

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

		titleContainer
			.addClass('runningString')
			.parent()
			.css({'width':'220px'});
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

		this.templateTrack 	= $('.template-track').html();

		// функция для добавления плейлистов на панель
		this.addPanel = function(name) {
			$playlistsPanel
				.find('.list .mCSB_container')
				.append($(__playlists[name].titleHtmlEl));

			var totalPl = $playlistsPanel.find('.playlist').length - 1;
			var plWidth = __playlists.playlistPanelWidth || 
							$playlistsPanel
								.find('.playlist:first')
								.innerWidth();

			var scrollLeft = plWidth * totalPl;

			$playlistsPanel
				.find('.playlist:last')
				.attr('data-scroll-left', scrollLeft);
		};

		this.addTrackToPlaylist = function(trackId) {
			// var array = [];
			// array.push(trackId);
			var $track = self.makeTrack([trackId]);

			if(playlistContainer.hasClass('mCustomScrollbar')) {
				playlistContainer.
					find('.mCSB_container').
					append($track);
			} else {
				playlistContainer.append($track);
			}

			__playlists[playerState.currentPlaylist]
				.tracks
				.push(+trackId);

			consoleOutput(__playlists);

			localStorage.setItem('__playlists', JSON.stringify(__playlists));
		};

		// метод возвращает jquery коллекцию эементов треков,
		// которая будет встроена в DOM методом this.makePlaylistTracks
		// принимает массив track_id
		this.makeTrack = function(tracksId) {
			var tracks = tracksId;

			var templateTrack 	= $('.template-track').html(),
				tracksArray 	= []
			;
			// consoleOutput($(templateTrack));

			for (var i = 0; i < tracks.length; i++) {
				var track 	= stationsArray[tracks[i]];
				var $track 	= $(templateTrack);

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
		this.makePlaylistTracks = function(tracksId) {
			var currentPlaylist = __playlists[playerState.currentPlaylist],
				tracks 			= self.makeTrack(tracksId) // jquery collection 
			;

			if(playlistContainer.hasClass('mCustomScrollbar')) {
				playlistContainer.
					find('.mCSB_container').
					append(tracks);
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

			if(!playlistContainer.hasClass('mCustomScrollbar')) {
				$('.playlistContainer').mCustomScrollbar({
					// theme:"dark"
				});
			}
		};

		this.setCurrent = function(name, scrollPosition) {
			/*$('.playlistsPanel .list').
				mCustomScrollbar('scrollTo', scrollPosition);*/

			$('.playlistsPanel').
				find('.list').
				mCustomScrollbar('scrollTo',
									$playlistsPanel
										.find('[data-current]')
										.attr('data-scroll-left')
								);


			$playlistsPanel
				.find('[data-name="' + playerState.currentPlaylist + '"]')
				.removeAttr('data-current');

			$playlistsPanel
				.find('[data-name="' + name + '"]')
				.attr('data-current', 1);

			playerState.currentPlaylist = name;

			playlistContainer.find('.mCSB_container').children().remove();

			var tracksArray = __playlists[playerState.currentPlaylist].tracks;
			if(tracksArray.length) {
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
    	analyser.smoothingTimeConstant =
    									analyserOpts.smoothingTimeConstant ||
							    		0.7;
    	analyser.fftSize = analyserOpts.fftSize || 512;

    	src.connect(analyser);
    	analyser.connect(audioCtx.destination);

	    self.streamData = new Uint8Array(analyser.frequencyBinCount);

    	var sampleAudioStream = function() {
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

		self.getCtx = function(canvasId, width, height) {
			var canvas = new AudioCanvas(canvasId, width, height);
		}

		this.start = function(cb) {
			interval = requestAnimationFrame(cb);
		}
		this.stop = function(cb) {
			clearRequestAnimationFrame(cb);
		}
	}

	function AudioApiElement(audioElement) {
	    var $playerTag = document.getElementById(audioElement);
	    var self = this;
	    

	    var source = audioCtx.createMediaElementSource($playerTag);
	    var analyserEqLeft, analyserEqRight, analyserVolume, analyserTriangle;
	    analyserEqLeft =
				new Analyser(
				source,
				{smoothingTimeConstant: 0.2, fftSize: 1024});
		analyserEqRight =
				new Analyser(
				source,
				{smoothingTimeConstant: 0.5, fftSize: 1024});
		analyserVolume =
				new Analyser(
				source,
				{smoothingTimeConstant: 0.5, fftSize: 64});
		analyserTriangle =
				new Analyser(
				source,
				{smoothingTimeConstant: 0.9, fftSize: 32});


	    this.streamDataEqLeft  	= analyserEqLeft.streamData;
	    this.streamDataEqRight 	= analyserEqRight.streamData;
	    this.streamDataVolume  	= analyserVolume.streamData;
	    this.streamDataTriangle = analyserTriangle.streamData;

    	audioBindAll($playerTag, 'AudioApiElement');

    	this.visStart = function(visName) {
    		switch(visName) {
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

    	this.visStop = function(visName) {
    		switch(visName) {
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
		

	    this.playStream = function(streamUrl) {
	    	consoleOutput('AudioApiElement::playStream::Begin');
	    	consoleOutput(streamUrl);

	    	// jquery-объект трека, который надо играть
	    	var currentTrackEl = 
					    	$('[data-station-url="' +
				    		streamUrl 				+
					    	'"]');

	    	var posLeft;
			if(currentTrackEl.length) {
				posLeft = currentTrackEl.position().top;
			} else {
				posLeft = 0;
			}
			
			$('.playlistContainer')
				.mCustomScrollbar('scrollTo', posLeft);


			// при старте воспроизведения
			// удалим у всех треков атрибут data-current-track
			currentTrackEl.
				// closest('.playlist').
				parent().
				find('[data-current-track]').
				removeAttr('data-current-track');

	    	consoleOutput(currentTrackEl);

			// а затем установим data-current-track нужному треку
			currentTrackEl.attr('data-current-track', 1);

	    	// Соберем временный объект для удобства
	    	var _currentTrack = {
	    		url 			: currentTrackEl.attr('data-station-url'),
		    	title 			: currentTrackEl.attr('data-station-title'),
		    	id 				: currentTrackEl.attr('data-station-id'),
		    	scrollPosition 	: posLeft
	    	};

	    	// Изменим объект состояния
	    	/*playerState.playlists[getCurrentPlaylist()].currentTrack =
	    														_currentTrack;*/

			__playlists[getCurrentPlaylist()].currentTrack =
    														_currentTrack;
			// vmCurrentTrackTitle.title = _currentTrack.title;

	        $playerTag.src = streamUrl;
	        $playerTag.crossOrigin = 'anonymous';
	    	setTimeout(function(){
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

				playPromise.then(function() {
					consoleOutput('AudioApiElement::playPromise::Success::Begin');					
			        consoleOutput('AudioApiElement::playPromise::Success::End');
				}).catch(function() {
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

			if(!playerState.nowPlaying.playlistName) {
				playerState.nowPlaying.playlistName =
							playerState.currentPlaylist;
				playerState.nowPlaying.track = _currentTrack;
			} else if(playerState.nowPlaying.playlistName ==
							playerState.currentPlaylist) {
				playerState.nowPlaying.track = _currentTrack;
			} else if(playerState.nowPlaying.playlistName !=
							playerState.currentPlaylist) {
				consoleOutput('pppp');
				playerState.nowPlaying.playlistName =
							playerState.currentPlaylist;
				playerState.nowPlaying.track = _currentTrack;
			}
			// __playlists.nowPlaying.playlistName = playerState.currentPlaylist;

	        localStorage.setItem('playerState', JSON.stringify(playerState));
			localStorage.setItem('__playlists', JSON.stringify(__playlists));
	        
			if(playerState.visualisations['visEqLeft'].state) {
				drawEqLeft();
			}
			if(playerState.visualisations['visEqRight'].state) {
				drawEqRight();
			}
			if(playerState.visualisations['analyserVisVolume'].state) {
				drawVisVolume();
			}
			if(playerState.visualisations['visTriangle'].state) {
		        drawTriangle();
			}
			/*if(playerState.visualisations['allEnabled'].state) {
		        drawEqLeft();
		        drawEqRight();
		        drawVisVolume();
		        drawTriangle();
			}*/

	        
	        consoleOutput('AudioApiElement::playStream::End');
	        // TODO: добавить на играющий трек эквалайзер
	    };
	     // TODO: добавить сюда остановку анимации
	    this.stopStream = function() {
			visualisationStop();
			$('#player .play').removeClass('visualisation');

			// playerState.playingTrack = {};
			vmCurrentTrackTitle.title = '';

			$('#player .info .trackTitle').html('')
											.removeClass('runningString')
											.parent().css({'width':'auto'});

			$playerTag.pause();

			audioCbElement.stopStream();
			// $playerTag.currentTime = 0;
			// playerState.paused = $playerTag.paused;
			consoleOutput('AudioApiElement::stopStream');
			localStorage.setItem('playerState', JSON.stringify(playerState));
	    };
	    this.setVolume = function(vol) {
	    	$playerTag.volume = vol;
	    };
	    this.getVolume = function() {
	    	return $playerTag.volume;
	    };
	}



	// Фолбэк если не срабатывает Audio API
	function AudioCbElement() {
	    var player = new Audio();

    	audioBindAll(player, 'AudioCbElement');

	    this.playStream = function(streamUrl) {
	    	consoleOutput('AudioCbElement::playStream::Begin');
        	player.src = streamUrl;

	        player.play();
	        // $(".spinner").show();

	        consoleOutput(player.paused);
	        playerState.paused = player.paused;

	        localStorage.setItem('playerState', JSON.stringify(playerState));
	        consoleOutput('AudioCbElement::playStream::End');
	    };
	    this.stopStream = function() {
			visualisationStop();
			$('#player .play').removeClass('visualisation');
			$('#player .info .trackTitle').html('')
											.removeClass('runningString')
											.parent().css({'width':'auto'});

			player.pause();
			player.currentTime = 0;
			playerState.paused = player.paused;
			consoleOutput('AudioCbElement::stopStream');
			localStorage.setItem('playerState', JSON.stringify(playerState));
	    };
	    this.setVolume = function(vol) {
	    	player.volume = vol;
	    };
	    this.getVolume = function() {
	    	return player.volume;
	    };
	}



	// https://developer.mozilla.org/ru/docs/Web/Guide/Events/Media_events
	function audioBindProgress(player, name) {
		player.addEventListener('progress', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
	}

	function audioBindVolume(player, name) {
		player.addEventListener('volumechange', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
	}

    function audioBindAll(player, name) {
    	player.addEventListener('abort', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
     		$(".spinner").hide();
        });
        player.addEventListener('canplay', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('canplaythrough', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('durationchange', (e)=> {
     		// consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('emptied', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
     		$(".spinner").hide();
        });
        player.addEventListener('encrypted', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('ended', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('error', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
     		$(".spinner").hide();
     		// if(!$('.track.visualisation').length) {
     		if(playerState.paused) {
     			consoleOutput('paused');
     			$('.track.waiting').
     				removeClass('waiting').
     				addClass('error-playing');
     		} else {
     			consoleOutput('это невозможно');
     		}
        });
        player.addEventListener('interruptbegin', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('interruptend', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('loadeddata', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('loadedmetadata', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('loadstart', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('mozaudioavailable', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('pause', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);

     		consoleOutput('pause::' +  player.paused);
     		player.currentTime = 0;
     		playerState.paused = player.paused;

     		visualisationStop();
        });
        player.addEventListener('play', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
     		$(".spinner").show();
     		$('[data-current-track]').addClass('waiting');
        });
        player.addEventListener('playing', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);

     		consoleOutput('pause::' +  player.paused);
     		playerState.paused = player.paused;

     		$(".spinner").hide();

     		if($('[data-current-track]').hasClass('waiting')) {
	    		$('[data-current-track]').removeClass('waiting');
    		}
    		if($('[data-current-track]').hasClass('error-playing')) {
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
        player.addEventListener('ratechange', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('seeked', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('seeking', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('timeupdate', (e)=> {
 			var time = Math.ceil(player.currentTime);
 			
 			var sec = ('0' + parseInt(Math.floor(time % 60))).slice(-2);
 			var min = ('0' + parseInt((Math.floor(time / 60)) % 60)).slice(-2);
 			$('#player .time .hours').html();
 			$('#player .time .minutes').html(min);
 			$('#player .time .seconds').html(sec);
        });
        player.addEventListener('stalled', (e)=> {
     		consoleOutput(name + '::Event.type::' + e.type);
     		$(".spinner").hide();
        });
        player.addEventListener('suspend', (e)=> {
     		// consoleOutput(name + '::Event.type::' + e.type);
        });
        player.addEventListener('waiting', (e)=> {
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
		var canvas 			= document.getElementById(id);
		canvas.width 		= width;
		canvas.height 		= height;
		this.ctx			= canvas.getContext("2d");
		this.canvasWidth 	= canvas.width;
		this.canvasHeight 	= canvas.height;
	}

	// TODO: Сделать функцию,
	// которая принимает объект с настройками (анализатора например (fft)),
	// и колбэк - функцию рисования

	

	function drawEqLeft() { // левый eq
		var maxValue = (window.innerHeight > 510) ? 510 : (Math.ceil(window.innerHeight / 2));
		// получаем canvas
		// var canvas = new AudioCanvas('visEqLeft', 500, 255 * 2);
		var canvas = new AudioCanvas('visEqLeft', 500, maxValue * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

	    for(var bin = 0; audioApiElement.streamDataEqLeft && bin < audioApiElement.streamDataEqLeft.length; bin ++) {
	        var val = audioApiElement.streamDataEqLeft[bin];
	        canvas.ctx.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
	        // canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
	        canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 + 1, 1, Math.floor(-val / 1.5));
	        canvas.ctx.fillRect(bin, canvas.canvasHeight / 2 - 1, 1, Math.floor(val / 1.5));
	    }
	    requestAnimationFrame(drawEqLeft);
	};

	function drawEqRight() { // правый eq
		var maxValue = (window.innerHeight > 510) ? 510 : (Math.ceil(window.innerHeight / 2));
		// получаем canvas
		var canvas = new AudioCanvas('visEqRight', 500, maxValue * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

	    for(var bin = 0; audioApiElement.streamDataEqRight && bin < audioApiElement.streamDataEqRight.length; bin ++) {
	        var val = audioApiElement.streamDataEqRight[bin];
	        // canvas.ctx.fillStyle = 'rgb(' + (val) + ',' + (val) + ',' + (val) + ')';
	        // canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
	        canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (val) + ',' + (255 - val) + ')';
	        canvas.ctx.fillRect(audioApiElement.streamDataEqRight.length - bin, canvas.canvasHeight / 2 + 1, 1, -val / 1.5);
	        canvas.ctx.fillRect(audioApiElement.streamDataEqRight.length - bin, canvas.canvasHeight / 2 - 1, 1, val / 1.5);
	    }
	    requestAnimationFrame(drawEqRight);
	};

	function drawVisVolume() { // громкость
		var canvas = new AudioCanvas('analyserVisVolume', 288, 20);
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
	    for(var i = 0; audioApiElement.streamDataVolume && i < audioApiElement.streamDataVolume.length; i ++) {
	        var val = audioApiElement.streamDataVolume[i],
				totalBar = Math.floor(val / 10)
			;
			// canvas.ctx.fillStyle = 'rgb(' + (255 - val) + ',' + (val) + ',' + (255 - val) + ')';
	        // canvas.ctx.fillRect(i, canvas.canvasHeight, 1, -val / 1);
	        for(var j = 0; j < totalBar; j++) {
	        	// canvas.ctx.strokeStyle = 'rgb(' + (255 - val) + ',' + (0 + val) + ',' + (255 - val) + ')';
	        	// canvas.ctx.strokeStyle = 'hsl(' + (0 + j * 7) + ', 100%, 50%)';
	        	canvas.ctx.strokeStyle = 'rgb(' + (255 - val) + ',' + (255 - val) + ',' + (255 - val) + ')';
	        	canvas.ctx.strokeRect(
		        							i * fullBarWidth,
	        								canvas.canvasHeight - (j * fullBarHeight),
	        								barWidth,
	        								barHeight
        								);
	        }
	    }
		requestAnimationFrame(drawVisVolume);
	};

	function drawTriangle() {
		var maxValue = (window.innerHeight > 510) ? 510 : (Math.ceil(window.innerHeight / 2));
		// получаем canvas
		var canvas = new AudioCanvas('visTriangle', 540, maxValue * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);
		canvas.ctx.translate(canvas.canvasWidth / 2, canvas.canvasHeight / 2);

		var fib =  	1.6180339;

		// при fftSize > 64 тормозит
	    for(var bin = 0; audioApiElement.streamDataTriangle && bin < audioApiElement.streamDataTriangle.length; bin ++) {
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

	        canvas.ctx.moveTo(audioApiElement.streamDataTriangle[bin],audioApiElement.streamDataTriangle[bin]);
	        canvas.ctx.lineTo(audioApiElement.streamDataTriangle[bin] % 5,audioApiElement.streamDataTriangle[bin] / 1.618);
	        canvas.ctx.lineTo(audioApiElement.streamDataTriangle[bin] / 1.618,audioApiElement.streamDataTriangle[bin]);
	        canvas.ctx.lineTo(audioApiElement.streamDataTriangle[bin],audioApiElement.streamDataTriangle[bin]);

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
	        canvas.ctx.rotate(Math.PI / 4 );
	    	
	    }
	    requestAnimationFrame(drawTriangle);
	};

	function drawFractal() {
		var canvas = new AudioCanvas('visFractal', 500, 255 * 2);
		canvas.ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

		var qtMin = 5;
		var fib =  	1.6180339;

	    for(var bin = 0; bin < audioApiElement.streamData_4.length; bin ++) {
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
		$('.track').each(function(i) {
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
		el
			.addClass('visualisation')
			.find('.url')
			.addClass('runningString');

		$('#player .play').addClass('visualisation');
		
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
						+ ((360 - stepBorder1)%360) 
						+ ', 100%, 50%)'});
			}, 50);
		}
		consoleOutput('visualisation::End');
	}



	// Остановка визуализации
	function visualisationStop() {
		consoleOutput('visualisationStop::Begin');
		clearInterval(intervalVis);
		var el = $('.playlistContainer [data-station-id="' + getCurrentTrack().id + '"]');
		el.removeClass('visualisation')
			.css({'backgroundImage': 'none'})
			.removeAttr('style')
			.find('.url')
			.removeClass('runningString')
		;
		$('#player .play').removeClass('visualisation')
							.css({'boxShadow': 'none', 'borderColor': '#0ff'})
							.removeAttr('style')
		;
		// $('#player .play span').remove();
		consoleOutput('visualisationStop::End');
	}

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
		setTimeout(function() {
			$('.searchContainer .close').animate({top: -(el.mcs.top + 10) + 'px'}, 150);
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
		var track 	= getCurrentTrack(),
			$track 	= $('.playlistContainer [data-station-id="' 	+
																track.id 	+
																'"]'),
			$sibling,
			// url для audioApiElement.playStream()
			playUrl
		;

		if(direction === 'prev') {
			$sibling = $track.prev();
		} else if(direction === 'next') {
			$sibling = $track.next();
		} else {
			throw new Error('Не передано направление!');
		}

		if($sibling.length) {
			playUrl = $sibling.attr('data-station-url');
			return playUrl;
		} else {
			consoleOutput('no siblings');
		}
	}




	function debugPlayerState() {
		// consoleOutput('::debugPlayerState');
		var $debugLs 		= $('[data-remove="prop"]'),
			$removeButton 	= $debugLs.find('.removeItem'),
			$removeList 	= $debugLs.find('.removeItemList'),
			removeList 		= [],
			markup 			= ''
		;

		$removeButton.attr('disabled', 'disabled');
		$removeButton.attr('title', 'Change item of local storage');

		removeList.push({prop: 'search.stationsOpened', name: 'StationsOpened'});
		removeList.push({prop: 'volume', name: 'Volume'});

		for(var i = 0; i < removeList.length; i++) {
						markup += '<li class="remove" data-change-prop="'
								+ removeList[i].prop
								+ '"><a href="#">'
								+ removeList[i].name
								+ '</a></li>';
		}
		$removeList.html(markup);

		$('[data-change-prop]').on('click', function(e) {
			var prop = $(this).attr('data-change-prop');

			consoleOutput(prop);
			consoleOutput($removeButton);


			$removeButton.attr('data-remove-prop', prop);
			$removeButton.removeAttr('disabled');
			$removeButton.html(prop).attr('title', 'playerState.' + prop);

			$('[data-remove-prop]').on('click', function(e) {
				// prop - что удаляем, например volume у playerState
				var prop 	= $(this).attr('data-remove-prop'),
					$option = $removeList.find('[data-change-prop="' + prop + '"]')
				;

				switch(prop) {
					case 'search.stationsOpened':
						delete playerState.search.stationsOpened;
						consoleOutput(`delete playerState.${prop}`);
						break;

					case 'volume':
						delete playerState.volume;
						consoleOutput(`delete playerState.${prop}`);
						break;

					default:
						break;
				}

				consoleOutput(playerState);
				localStorage.setItem('playerState', JSON.stringify(playerState));

				$(this)
					.html('Reset')
					.attr('disabled', 'disabled')
					.attr('title', 'Change prop of playerState')
					.removeAttr('data-remove-prop')
				;
				$option.remove();

				return false;
			});
		});
	}

	function debugLocalStorage() {
		// consoleOutput('::debugLocalStorage');
		var $debugLs 		= $('[data-remove="item"]'),
			$removeButton 	= $debugLs.find('.removeItem'),
			$removeList 	= $debugLs.find('.removeItemList'),
			removeList 		= [],
			markup 			= ''
		;


		$removeButton.attr('disabled', 'disabled');
		$removeButton.attr('title', 'Change item of local storage');

		removeList.push({item: 'playerState',	name: 'playerState'});
		removeList.push({item: 'stations',		name: 'stations'});
		removeList.push({item: 'stationsOn100',	name: 'stationsOn100'});
		removeList.push({item: 'uniqHash',		name: 'uniqHash'});
		removeList.push({item: 'userStatus',	name: 'userStatus'});
		removeList.push({item: 'localStorage',	name: 'localStorage'});

		for(var i = 0; i < removeList.length; i++) {
						markup += '<li class="remove" data-change-item="'
						+ removeList[i].item
						+ '"><a href="#">'
						+ removeList[i].name
						+ '</a></li>'
		}
		$removeList.html(markup);

		$('[data-change-item]').on('click', function(e) {
			var $option 	= $(this),
				item 		= $option.attr('data-change-item')
			;

			consoleOutput($option);

			$removeButton.attr('data-remove-item', item);
			$removeButton.removeAttr('disabled');
			$removeButton.html(item).attr('title', 'Delete::' + item);

			$('[data-remove-item]').on('click', function(e) {
				// item - элемент из localStorage который удаляем
				var item 	= $(this).attr('data-remove-item'),
					$option = $removeList.find('[data-change-item="' + item + '"]')
				;

				if($option.attr('data-change-item') == 'stations' || $option.attr('data-change-item') == 'stationsOn100') {
					var $optionStations = [
						$removeList.find('[data-change-item="stations"]'),
						$removeList.find('[data-change-item="stationsOn100"]')
					];
				}
				consoleOutput($option);

				switch(item) {
					case 'playerState':
						localStorage.removeItem(item);
						consoleOutput(`delete ${item}`);
						break;

					case 'stations':
					case 'stationsOn100':
						localStorage.removeItem('stations');
						localStorage.removeItem('stationsOn100');
						consoleOutput(`delete ${item}`);
						consoleOutput(`delete ${item}On100`);
						break;

					case 'uniqHash':
						localStorage.removeItem(item);
						consoleOutput(`delete ${item}`);
						break;

					case 'userStatus':
						localStorage.removeItem(item);
						consoleOutput(`delete ${item}`);
						break;

					case 'localStorage':
						localStorage.clear();
						consoleOutput(`delete ${item}`);
						location.reload();
						break;

					default:
						break;
				}

				$(this)
					.html('Clear')
					.attr('disabled', 'disabled')
					.attr('title', 'Change item of local storage')
					.removeAttr('data-remove-item')
				;

				if($optionStations) {
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
			
			$('.animation-settings')
				.append(markup)
				.addClass('flex')
			;

			if(vis[visOrder[i]].state) {
				$('[data-animation-name=' + visOrder[i] + ']').prop('checked', true);
			} else {
				$('[data-animation-name=' + visOrder[i] + ']').prop('checked', false);
			}
		}

		$('.toggle-animation').on('change', function(event) {
			var $el = $(this);
			var aName = $el.attr('data-animation-name');
			var aState = $el.attr('data-animation-state');

			$el.attr('data-animation-state', !playerState.visualisations[aName].state);

			if(playerState.visualisations[aName].state) {			
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
		for(var key in obj) {
			consoleOutput(key + ' : ' + obj[key]);
			if(typeof obj[key] === 'object') {
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
		if(!disableCustomConsole) {
			$('.consoleList .mCSB_container').append(
				'<div class="consoleItem">'
					+ $('.consoleItem').length
					+ ':'
					+ outputText
					+ '</div>'
			);

			$('.consoleList').mCustomScrollbar('scrollTo', '.consoleItem:last');
		}
	}

	function makeConfig() {
		$.ajax({
			data: {'action': 'configToFile', 'config': JSON.stringify(playerState)},
			success: function(data) {
				console.log('config is made');
			}
		});
	}

	function toggleSearchContainer(time) {
		var $playerDesktop    = $('[data-desktop]').find('#player'),
			$searchDesktop    = $('[data-desktop]').find('.searchContainer'),

			$playerTab        = $('[data-tab]').find('#player'),
			$searchTab        = $('[data-tab]').find('.searchContainer'),
			
			$playerSmartphone = $('[data-smartphone]').find('#player'),
			$searchSmartphone = $('[data-smartphone]').find('.searchContainer'),

			$playerSmartphoneKeyboard = $('[data-smartphone-keyboard]').find('#player'),
			$searchSmartphoneKeyboard = $('[data-smartphone-keyboard]').find('.searchContainer'),

			playerWidth 	  = $('#player').outerWidth()
		;

		if(!$('#player').attr('data-search-container')) {
			console.log('hidden');

			if($playerDesktop.length) {
				$playerDesktop.animate({
					left: '+=' + (playerWidth / 2) + 'px'
				}, time);

				$searchDesktop.animate({
					// left: '-100%',
					left: '-320px',
					opacity: 1
				}, time);
			} else if($playerTab.length || $playerSmartphone.length || $playerSmartphoneKeyboard.length) {
				$('#player')
					.find('.playlistContainer')
					.fadeOut(time / 2);

				$('.searchContainer').animate({
					opacity: 1,
				}, time);
			}

			$('#player').attr('data-search-container', true);
			$('.searchContainer').attr('data-visible', true);
		} else {
			console.log('visible');

			if($playerDesktop.length) {
				$playerDesktop.animate({
					left: '-=' + (playerWidth / 2) + 'px'
				}, time);

				$searchDesktop.animate({
					left: '0',
					opacity: 0
				}, time);
			} else if($playerTab.length || $playerSmartphone.length || $playerSmartphoneKeyboard.length) {
				$('#player')
					.find('.playlistContainer')
					.fadeIn(time);

				$('.searchContainer').animate({
					opacity: 0,
				}, time);
			}

			$('#player').removeAttr('data-search-container');
			$('.searchContainer').removeAttr('data-visible');
		}
	}




	$('#player .prev').click(function(e) {
		consoleOutput('prev');
		var playUrl = getSibling('prev');
		consoleOutput(playUrl);
		if(playUrl) {
			audioApiElement.stopStream();
			audioApiElement.playStream(playUrl);
		}
	});

	$('#player .next').click(function(e) {
		consoleOutput('next');
		var playUrl = getSibling('next');
		consoleOutput(playUrl);
		if(playUrl) {
			audioApiElement.stopStream();
			audioApiElement.playStream(playUrl);
		}
	});

	$('#player .play').on('click', function(e) {
		if(playerState.paused) {
			audioApiElement.playStream(getCurrentTrack().url);
			$('.playlistContainer').mCustomScrollbar('scrollTo', getCurrentTrack().scrollPosition);
		}
	});

	$('.playlistContainer').on('click', '.track', function(e) {
		if(!playerState.paused) {
			if($(this).attr('data-current-track')) {
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
	$('#player .stop').click(function(e) {
		if(!playerState.paused) {
			audioApiElement.stopStream();
		}
	});

	$('.playlistContainer').on('click', '.delete', function(e) {
		var id = $(this)
					.parent()
					.data('stationId'),
			pl = __playlists[playerState.currentPlaylist]
		;

		pl.tracks.splice(pl.tracks.indexOf(id), 1);
		$(this).parent().remove();
		// localStorage.setItem('playerState', JSON.stringify(playerState));
		localStorage.setItem('__playlists', JSON.stringify(__playlists));
		return false;
	});

	$('.playlistContainer').on('click', '.canplaytest', function(e) {
		var url = $(e.target)
					.closest('.track')
					.data('stationUrl')
		;
		consoleOutput(url);
		e.stopPropagation();
	});

	$('.toAdmin').on('click', function(e) {
		consoleOutput('toAdmin');
		$('body').addClass('admin');

		$.ajax({
			data: {'admin': 1},
			success: function(data) {
				$('#player').after(data);
				$('#player').hide();

				$('.toPlayer').on('click', function(e) {
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
	$('.showFieldSearch').click(function(e) {
		$(this).toggleClass('active');

		var searchInput = $(this)
							.closest('.find')
							.find('.js-search-station-input')
		;

		if(searchInput.hasClass('visible') == false) {
			searchInput.addClass('visible')
						.animate({opacity: 1, width: '100%'}, 100)
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
	$('.js-search-station-input').on('keyup', function(e) {
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
									+ '</span> stations is found on <span class="target">'
									+ target
									+ '<span></div>';

					result.html('');

					for(var i = 0; i < response.length; i++) {
						var station = response[i];

						markup
							+= '<div class="station btn" data-station-id="'
							+ station.station_id
							+ '"><div class="add"><div class="icon">add</div></div><div class="title">'
							+ station.station_title
							+ '</div><div class="url">'
							+ station.station_url
							+ '</div></div>'
						;
					}

					result.html(markup);

					$('[data-station-id]').each(function(index, el) {
						var $station = $(el);
						var title    = $station.find('.title').text();
						var url      = $station.find('.url').text();
						var regExp 	 = new RegExp(target, 'gi')

						title = title.replace(regExp, '<span class="search-target">' + target + '</span>');
						url   = url.replace(regExp, '<span class="search-target">' + target + '</span>');

						$station.find('.title').html(title);
						$station.find('.url').html(url);
					});

					$(".spinner").hide();

					if(!$('.vmPlayer').attr('data-search-container')) {
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


	$('#player .find .showAll').on('click', function(e) {
		$(this).toggleClass('active');


		// ??? - что за if ???
		if(!$('.searchContainer .result .station').length) {
			$(".spinner").show();
			/*$.ajax({
				data: {'action': 'getAllStations'},
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
				}
			});*/

			// всего станций
			var size 		= 0;
			for (var key in stationsArray) {
				size++;
			}
			var response 		= stationsArray, // объект со всеми станциями
				// последний открытый блок, если был
				stationsOpened 	= playerState.search.stationsOpened || [], 
				$result 			= $('.searchContainer .result'),
				// станций в блоке и всего блоков
				IN_BLOCK 		= 100,
				totalBlocks 	= Math.ceil(size / IN_BLOCK),
				// начальная разметка - общее количество станций
				markup 			= '<div class="total"><span>'
								+ size
								+ '</span> stations is found</div>'
			;
			

			$result.html('');

			for (var i = 0; i < totalBlocks; i++) {
				var from 	= i * 100,
					to 		= ((i + 1) * 100);

				if(i == totalBlocks - 1) {
					to = (totalBlocks - 1).toString() + (size % 100);
				}

				markup += '<div class="stationsBlockToggle" data-show="closed" data-block-number="'
							+ i
							// + '"><div class="showFoundStations"><i class="fa fa-minus"></i></div><div class="title">'
							+ '"><div class="title">'
							+ from + '..' + to
							+ '</div></div>';
			}

			$result.html(markup);

			// $('.stationsBlockToggle').on('click', function(e) {
			$('[data-block-number]').on('click', function(e) {
				var markup 	= '',
					index 	= $(this).attr('data-block-number')
				;
				if($(this).attr('data-show') == 'closed') {
					var _stations = stationsArrayOn100[index];
					markup += '<div class="stationsBlockList" data-stations-number=' + index + '>';
					for(var i = 0; i < _stations.length; i++) {
						var station = _stations[i];
						markup += '<div class="station" data-station-id="'
									+ station.station_id
									// + '"><div class="add"><i lass="fa fa-plus"></i></div><div class="title">'
									+ '"><div class="title">'
									+ station.station_title 
									+ '</div><div class="url">'
									+ station.station_url
									+ '</div></div>';
					}
					markup += '</div>';
					$(this).after(markup);
					$(this).attr('data-show', 'open');

					consoleOutput(stationsOpened);
					stationsOpened.push(index);
					consoleOutput(stationsOpened);

					if(stationsOpened.length > 3) {
						consoleOutput('лишний ' + stationsOpened[0]);

						$('[data-stations-number="' + stationsOpened[0] + '"]').remove();
						$('[data-block-number="' 	+ stationsOpened[0] + '"]').attr('data-show', 'closed');

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
					var _stationsOpened = stationsOpened.filter((el) => {
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

			if(stationsOpened.length > 0) {
				var targetBlock        = stationsOpened[stationsOpened.length - 1],
					$targetBlock       = $('[data-block-number="' + targetBlock + '"]'),
					markupStationsList = ''
				;

				stationsOpened = [];
				consoleOutput('targetBlock is ' + targetBlock);
				// $('[data-block-number="' + targetBlock + '"]').click();
				var _stations = stationsArrayOn100[targetBlock];
				markupStationsList += '<div class="stationsBlockList" data-stations-number=' + targetBlock + '>';
				for(var i = 0; i < _stations.length; i++) {
					var station = _stations[i];
					markupStationsList += '<div class="station" data-station-id="'
								+ station.station_id
								+ '"><div class="add"><i class="fa fa-plus"></i></div><div class="title">'
								+ station.station_title 
								+ '</div><div class="url">'
								+ station.station_url
								+ '</div></div>';
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
	$('.searchContainer .close').on('click', function(e) {
		$('.showAll').removeClass('active');
		toggleSearchContainer(600);
	});

	$('.searchContainer').on('click', '.station', function(e) {
		playlistManager.addTrackToPlaylist($(this).data('stationId'));
	});



	$('.playlist-new').on('click', function(e) {
		consoleOutput('::new playlist');

		var defaultPLName = new Date().getTime().toString().substr(6);

		var pl = new Playlist(defaultPLName);

		/*__playlists[defaultPLName] = pl;
		consoleOutput(__playlists['Default']);*/

		/*playerState
			.playlists[playerState.currentPlaylist]
			 = pl;*/

		// playlistManager.addPanel(defaultPLName);
		
		$playlistsPanel
			.find('[data-current]')
			.removeAttr('data-current');

		$playlistsPanel.
			find('[data-name=' + defaultPLName + ']').
			attr('data-current', 1);

		playerState.currentPlaylist = defaultPLName;

		consoleOutput($playlistsPanel.
			find('[data-name=' + defaultPLName + ']'));

		// var scrollPosition = $playlistsPanel.find('[data-current]').position().left;

		// __playlists[playerState.currentPlaylist].scrollPosition = scrollPosition;

		localStorage.setItem('playerState', JSON.stringify(playerState));
		// localStorage.setItem('__playlists', JSON.stringify(__playlists));
	});

	$('.playlistsPanel').on('click', '.vmTitle', function() {
		var $pl = $(this).closest('.playlist');
		if(!$pl.attr('data-current')) {
			consoleOutput('::Change playlist::' + $pl.attr('data-name'));
			
			/*playlistManager.
				// setCurrent($pl.attr('data-name'), $pl.attr('data-scroll-left'));
				setCurrent($pl.attr('data-name'));*/
				
			// mCustomScrollbar('scrollTo', $pl.attr('data-scroll-left'));
		} else {
			consoleOutput('Плейлист уже выбран');
		}
	});

	$('.showConsole').on('click', function() {
		$('.console').toggleClass('hidden');
		$('.consoleList').mCustomScrollbar('scrollTo', '.consoleItem:last');

		detectDevice();
		return false;
	});

	$('.clearConsole').on('click', function() {
		$('.consoleList .mCSB_container').children().remove();
		return false;
	});

	$('.before-decode').on('input', function(event) {
		var $textInput = $(this);
		var val = $textInput.val();
		
		// $('.after-decode').empty();
		// $('.after-decode .mCSB_container').append('<div class="translated-text">' + decodeText(val) + '</div>');
		decodeText(val);
		// $textInput.val('');
	});

	$('.before-decode').on('keypress', function(event) {
		var $textInput = $(this);
		var val = $textInput.val();

		// $('.after-decode').append(decodeText(event.keyCode));
	});

	$('.clearSymbols').on('click', function() {
		$('.after-decode .mCSB_container').empty();
		return false;
	});

	$('.translate-text').on('click', function() {
		translateText(
			$('.title, .url, .playlist .vmTitle, .adminItem .button:not(.showConsole):not(.data-toggle), .remove a, form button'), false
		);
	});



	/*****************************************
	REGISTRATION
	******************************************/
	function checkLoginUniq(login) {
		console.log('checkLoginUniq');
		$.ajax({
			data: {'action': 'loginUniq', 'regLogin': login},
			success: function(data) {
				if(data) {
					$('.form-reg .regLogin').addClass('busy');
					// console.log("Good");
					var response = JSON.parse(data);
					// console.log(response);
					$('.loginsUniq').html('');
					var markup = '';
					for(var i = 0; i < response.length; i++) {
						var fieldBusy = response[i];
						markup += '<div class=\"fieldUniq\"><div class=\"field\">' + fieldBusy.user_login
						+ '</div></div>';
					}
					$('.loginsUniq').html('Used :(:<br>' + markup);
					setTimeout(function() {
						$('.loginsUniq').html('');
					}, 4000);
				} else if(!$('.form-reg .regLogin').hasClass('error')) {
					$('.form-reg .regLogin').removeClass('busy');
					$('.loginsUniq').html('Good choice!');
					setTimeout(function() {
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
		if(element.attr('type') == 'text') {
			pattern = /^[A-Za-zА-Яа-яЁё0-9\._-]{3,27}$/;
			errorMessage = 'От 3 до 20 символов';
			top = element.position().top;
		} else if(element.attr('type') == 'password') {
			pattern = /^[A-Za-zА-Яа-яЁё0-9\._-]{5,}$/;
			errorMessage = 'От 5 символов';
			top = element.position().top;
		}
		
		var value = element.val();
		var check = true;
		if(value.search(pattern) != 0) {
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
		if(pass1.val() != pass2.val()) {
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
			data: {'action': 'loginIsFree', 'value': login.val()},
			success: function(data) {
				// console.log("Good");
				
				if(data === 'true') {
					// console.log($(login));
					console.log('good');
					login.removeClass('busy');
					// return true;
				} else {
					// console.log($(login));
					console.log('busy');
					login.addClass('busy');
					$('.loginsUnique').html('Login is busy');
					setTimeout(function() {
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

	$('.showFormSign, .showFormReg').on('click', function() {
		var $el = $(this);
		var targetEl = $el.attr('data-form');
		console.log('покажем форму ' + targetEl);
		// $el.toggleClass('active').siblings().toggleClass('active');
		$(targetEl).toggleClass('visible').fadeToggle(300);
		$('.overlayFull').attr('data-visible', true).fadeToggle(300);
		$el.attr('disabled', 'disabled');

		if(!$('.overlayFull').attr('data-visible')) {
			$el.attr('data-visible', true).fadeToggle(300);
		}
	});

	$(".overlayFull").on('click', function () {
		var $el = $(this);

		if($el.attr('data-visible')) {
			$el.attr('data-visible', false).hide();
		}
		
		$('.form-reg, .form-auth').hide();
		$('.showFormSign, .showFormReg').removeAttr('disabled');
	});



	//закрытие модального окна и формы, сброс полей формы
	$(".popup-overlay, .close-popup").click(function (e){
		popupClose($(".popup-container, .popup-overlay"), 500);
		// $(".popup-container, .popup-overlay").fadeOut(500);
		$(':input', ".popup-container").not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
	});

	$('.form-reg .regLogin').keyup(function(e) {
		var login = $('.form-reg .regLogin');
		if(login.val().length > 2) {
			checkLoginUniq(login.val());
		}

		validateField($(this));

		// return false;
		e.preventDefault();
	});
	
	$('.form-reg .regPass').keyup(function() {
		validateField($(this));
		/*if($(this).val().length < 4) {
			setTimeout(function() {
				validateField($(this));
			}, 2000);
		} else {
			validateField($(this));	
		}*/
	});

	$('.form-reg .regPassEx').keyup(function() {
		equalPassword($('.form-reg .regPass'), $(this));	
	});



	$('.form-reg .regSubmit').on('click', function(e) {
		var login = $('.form-reg .regLogin');
		var pass = $('.form-reg .regPass');
		var pass2 = $('.form-reg .regPassEx');
		// console.log(loginIsFree(login));
		if(validateField(login)
			&& validateField(pass)
			&& equalPassword(pass, pass2)
			&& !login.hasClass('busy')) {
			$.ajax({
				data: {'action': 'regUser', 'regLogin': login.val(), 'regPass': pass.val()},
				// url: 'actionsRegistration.php',
				success: function(data) {
					console.log('Registration is success!!!');
					$('.form-reg').fadeOut(300);
					// $('.showFormReg').toggleClass('active').fadeToggle(300);
					// $('.showFormReg').toggleClass('active');
					$('.successReg').html('You have successfully signed up!').fadeIn(300).addClass('popupHide');
					setTimeout(function() {
						// $('.overlayFull, .success').fadeOut(500);
						$('.overlayFull').fadeOut(500);
						// $('.success').removeClass('popupHide');
					}, 4000);

					$.ajax({
						data: {'action': 'authUser', 'authLogin': login.val(), 'authPass': pass.val()},
						// data: {'action': 'authUser', 'authLogin': 55555, 'authPass': 55555},
						success: function(data) {
							if(data) {
								// $('.success').removeClass('popupHide, transparentText');
								console.log('Authorization is success!!!');
								var response = JSON.parse(data);
								console.log(response);
								$('.form-auth').fadeOut(300);
								// $('.showFormSign').toggleClass('active').fadeToggle(300);
								// $('.showFormSign').toggleClass('active');
								$('.successAuth').html('Hi, ' + response.user_login + '<br>Welcome to RA').fadeIn(300).addClass('popupHide');
								setTimeout(function() {
									$('.overlayFull').fadeOut(500);
								}, 4000);
							} else {
								console.log('no data');
								$('.errors').html('Login or password is not correct :(');
								setTimeout(function() {
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

	$('.form-auth .authSubmit').on('click', function(e) {
		var login = $('.form-auth .authLogin');
		var pass = $('.form-auth .authPass');

		if(validateField(login) && validateField(pass)) {
			$.ajax({
				data: {'action': 'authUser', 'authLogin': login.val(), 'authPass': pass.val()},
				// data: {'action': 'authUser', 'authLogin': 55555, 'authPass': 55555},
				success: function(data) {
					if(data) {
						// $('.success').removeClass('popupHide, transparentText');
						console.log('Authorization is success!!!');
						var response = JSON.parse(data);
						console.log(response);
						$('.form-auth').fadeOut(300);
						// $('.showFormSign').toggleClass('active').fadeToggle(300);
						// $('.showFormSign').toggleClass('active');
						$('.successAuth').html('Hi, ' + response.user_login + '<br>Welcome to RA').fadeIn(300).addClass('popupHide');

						setTimeout(function() {
							$('.overlayFull').fadeOut(500);
						}, 4000);

						Cookies.set('userLogin', response.user_login, {expires: 30, path: "/"});
						Cookies.set('userKey', response.user_cookie, {expires: 30, path: "/"});
						// Cookies.get('sliderState')

						$('.showFormSign')
							.removeClass('showFormSign')
							.addClass('logout')
							.removeAttr('data-form')
							.attr('title', 'Logout')
							.find('.icon')
							.text('exit_to_app')
						;

						$(this)
							.closest('.animation-settings')
							.append('<p class="user-name">' + response.user_login + '</p>')
						;
					} else {
						console.log('no data');
						$('.errors').html('Login or password is not correct :(');
						setTimeout(function() {
							$('.errors').html('');
						}, 5000);
					}
				}
			});
		}
		return false;
	});

	$('.controls .logout').on('click', function(e) {
		console.log('logout');
		$.ajax({
			data: {'action': 'logout'},
			success: function(data) {
				console.log('You logged out');
				$('.logout')
					.removeClass('logout')
					.addClass('showFormSign')
					.attr('data-form', '.form-auth')
					.attr('title', 'Sign in')
					.find('.icon')
					.text('forward')
				;

				$(this)
					.closest('.animation-settings')
					.find('.user-name')
					.remove()
				;
			}
		});
		return false;
	});

	


	/*
		Чтобы на экранах в высоту меньше 640px у блока playlistContainer с треками 
		выставить всю доступную высоту
	*/

	var playlistContainer 	= $('#player .playlistContainer'),
		// панелька для плейлистов
		$playlistsPanel 	= $('#player .playlistsPanel'),
		
		player 				= new Audio(),


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
			},
			translated: false
		},

		// Массив со всеми станциями
		stationsArray 		= {},

		// Массив со всеми станциями, только станции сгруппированы в массивы по 100шт
		stationsArrayOn100	= [],

		// Аудио-контекст
		audioCtx 			= new (window.AudioContext || window.webkitAudioContext),
		
		// Основной и запасной аудио источники
		audioApiElement 	= new AudioApiElement('playerTag'),
		audioCbElement 		= new AudioCbElement(),

		canvasAudioSourceEq3 = new DrawSound(),

		// Таймер для визуализации трека
		// TODO: переделать на requestAnimationFrame
		intervalVis = null,

		// 
		canvasVolume    	= document.getElementById('canvas-volume'),
		ctxVolume			= canvasVolume.getContext('2d'),
		canvasVolumeWidth 	= canvasVolume.width,
		canvasVolumeHeight 	= canvasVolume.height
	;

	canvasVolume.width 	= 100;
	canvasVolume.height = 30;


	// Погнали!!!;)
	// Состояние пользователя - зарегистрирован или нет, авторизован или нет
	if(localStorage.getItem('userStatus') == undefined) {
		consoleOutput('userStatus == undefined');
		localStorage.setItem('userStatus', JSON.stringify(userStatus));
	} else {
		userStatus = JSON.parse(localStorage.userStatus);
		console.log(userStatus);
		console.log(localStorage);
	}

	if(localStorage.getItem('stations') == undefined) {
		consoleOutput('stations == undefined');
		$.ajax({
			data: {'action': 'getAllStations'},
			success: function(data) {
				try {
					stationsArray = JSON.parse(data);
					var size 		= 0;
					for (var key in stationsArray) {
						size++;
					}
					var totalArrays = Math.ceil(size / 100);

					// массив имен станций
					// нужен для правильного получения stationsIndex
					var keys = [];

					for(var key in stationsArray) {
						keys.push(key);
					}

					for (var i = 0; i < totalArrays; i++) {
						stationsArrayOn100[i] = [];  // TODO здесь баги
						for (var j = 0; j < 100; j++) {
							var stationsIndex = keys[i * 100 + j];
							// если последняя станция - break
							// почему?
							// return?
							if(i == totalArrays - 1 && j == size % 100) {
								break;
							}
							// TODO
							//  сделать проверку что stationsArray[stationsIndex] не null
							stationsArrayOn100[i][j] = stationsArray[stationsIndex];
						}
					}

					localStorage.setItem('stations', JSON.stringify(stationsArray));
					localStorage.setItem('stationsOn100', JSON.stringify(stationsArrayOn100));

					location.reload();
				} catch(e) {
					$('body').addClass('error-mysql-connect');
					throw new Error(e + ':' + data);
				}
			}
		});
	}

	if(localStorage.getItem('playerState') == undefined) {
		consoleOutput('playerState == undefined');
		
		// Объект плейлиста
		var nirvanaPlaylist          	= new Playlist('~Nirvana~'); // ?? - нужен ??
		var dubstepPlaylist          	= new Playlist('Dubstep');
		var dubPlaylist 	         	= new Playlist('|_Dub_|');

		nirvanaPlaylist.tracks       	= [
						1330,		// graal future
						1193,		// graal space
						883,		// Drum and Bass) (Uturn Radio
						3207,		// TECHNO4EVER.FM HARD
						884,		// TeaTime.FM - 24h Happy Hardcore, Drum and Bass, UK
						3771,		// CoreTime.FM - 24h Hardcore, Industrial, Speedcore
						3210,		// Make Some Noise
						7942		// не воспроизводится - для отладки ошибок
		];

		dubstepPlaylist.tracks       	= [
						2599,		// Walmer Radio
						55,			// Dub & Bass
						2403,		// DubTerrain.net
						2409,		// Dubstep.fm - 128k MP3
						2410,		// Dubstep.fm - 256k MP3
						4055,		// UFO TRAP Radio Station
						885			// Dubstep) (Uturn Radio
		];

		dubPlaylist.tracks           	= [
						55,			// Dub & Bass
						2599,		// Walmer Radio
						2392,		// LanochedelhombrelobO - Dubfun - mp3 128kbs
						6431,		// LanochedelhombrelobO - Dubfun - ogg 112 kbs
						6416,		// Cyprus Dub Community Radio
						145, 		// Urban Boogie
						7631,		// Arctic Dub (Sursumcorda)
						7656, 		// Anima Amoris [Dub Techno] 56 AACP anima.sknt.ru
						7657 		// Anima Amoris [Dub Techno] 320 MP anima.sknt.ru
		];

		nirvanaPlaylist.currentTrack 	= {
				id 				: 1330,
				url 			:'http://graalradio.com:8123/future',
				title 			:'Graal Radio Future'
				// scrollPosition 	: 0
		};

		dubstepPlaylist.currentTrack 	= {
				id 				: 2599,
				url 			:'http://sc3.dubplate.fm:8200/lofi_autodj',
				title 			:'Walmer Radio'
				// scrollPosition - ???
		};

		dubPlaylist.currentTrack     	= {
				id 				: 55,
				url 			:'http://sc3.dubplate.fm:5000/dubstep/192',
				title 			:'Dub & Bass'
		};

		__playlists['~Nirvana~']       	= nirvanaPlaylist;
		__playlists['Dubstep']       	= dubstepPlaylist;
		__playlists['|_Dub_|']           	= dubPlaylist;
		// __playlists['Default'].scrollPosition    = 0;

		// consoleOutput(__playlists['Default']);
		// consoleOutput(playerState);

		playerState.currentPlaylist = '~Nirvana~';
		// playerState.nowPlaying = {};
		playerState.volume = .27;
		playerState.paused = true;

		playerState.visualisations = {};

		// пока убираю allEnabled для вкл/выкл всех анимаций
		// playerState.visualisations.order = ['allEnabled', 'visEqLeft', 'analyserVisVolume', 'visEqRight', 'visTriangle'];
		/*playerState.visualisations['allEnabled'] = {
			icon: 'flash_auto',
			name: 'allEnabled',
			state: false
		};*/

		playerState.visualisations.order = ['visEqLeft', 'analyserVisVolume', 'visEqRight', 'visTriangle'];
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

		stationsArray 		= JSON.parse(localStorage.getItem('stations'));
		stationsArrayOn100 	= JSON.parse(localStorage.getItem('stationsOn100'));

		consoleOutput(playerState);
		consoleOutput(__playlists);

		debugPlayerState();
		debugLocalStorage();
		enableVisualisations();

		var vmPlaylist = new Vue({
			el: '.vmPlaylistsPanel',
			data: {
				edited 			: false,
				playlistsOrder	: playerState.playlistsOrder,
				playlistEdited	: -1,
				totalPl 		: playerState.playlistsOrder.length,
				plWidth 		: 84,
				curPl 			: playerState.currentPlaylist
			},
			computed: {
				currentPlaylist : function(pl) {
					return this.curPl;
				},
				scrollLeft: function() {
					return this.plWidth * this.totalPl;
				}
			},
			methods: {
				setCurrentPlaylist : function(index, name) {
					consoleOutput(playerState.playlistsOrder[index]);
					consoleOutput(name);

					$('.playlistsPanel').
						find('.list').
						mCustomScrollbar('scrollTo',
											$playlistsPanel
												.find('[data-name="' + name + '"]')
												.attr('data-scroll-left')
										);


					$playlistsPanel
						.find('[data-name="' + playerState.currentPlaylist + '"]')
						.removeAttr('data-current');

					$playlistsPanel
						.find('[data-name="' + name + '"]')
						.attr('data-current', 1);

					playerState.currentPlaylist = name;

					playlistContainer.find('.mCSB_container').children().remove();

					var tracksArray = __playlists[playerState.currentPlaylist].tracks;
					if(tracksArray.length) {
						playlistManager.makePlaylistTracks(tracksArray);
					}

					// __playlists[playerState.currentPlaylist].scrollPosition = scrollPosition;

					localStorage.setItem('playerState', JSON.stringify(playerState));
					localStorage.setItem('__playlists', JSON.stringify(__playlists));
				},
				deletePlaylist: function(index, name) {
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
				changeEditMode: function(index, event) {
					consoleOutput(index);
					// consoleOutput($(event.target));
					consoleOutput(this.playlistEdited);
					this.edited = !this.edited;
					if(this.edited) {
						this.playlistEdited = index;
					} else {
						this.playlistEdited = -1;
					}
				},
				editPlaylist: function(index, name, event) {
					var newName = $(event.target).val();

					playerState.playlistsOrder[index] 	= newName;

					consoleOutput($(event.target));
					if($(event.target).closest('.playlist').attr('data-current')) {
						playerState.currentPlaylist = newName;
					}

					__playlists[name].name 				= newName;
					__playlists[newName] 				= __playlists[name];
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
			advanced:{
				autoExpandHorizontalScroll: true
			}
		});

		// хак
		$('.playlistsPanel .list').
			find('.mCSB_container').
			addClass('flex left');

		// Наполняем $playlistsPanel заголовками плейлистов
		/*for (var i = 0; i < playerState.playlistsOrder.length; i++) {
			var plName = playerState.playlistsOrder[i];
			playlistManager.addPanel(plName);
		}*/

		$playlistsPanel
			.find('[data-name="' + playerState.currentPlaylist + '"]')
			.attr('data-current', 1);

		consoleOutput($playlistsPanel
					.find('[data-current]')
					.attr('data-scroll-left'));

		$('.playlistsPanel').
				find('.list').
				mCustomScrollbar('scrollTo',
									$playlistsPanel
										.find('[data-current]')
										.attr('data-scroll-left')
								);


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
		var playlistTracks = __playlists[playerState.currentPlaylist]
								.tracks
		;

		var playlistPanelWidth = $playlistsPanel
									.find('.playlist:first')
									.innerWidth();

		__playlists.playlistPanelWidth = playlistPanelWidth;

		if(playlistTracks.length > 0) {
			consoleOutput('make tracks:begin');
			playlistManager.makePlaylistTracks(playlistTracks);
			consoleOutput('make tracks:end');

			// if(playerState.translated) {
			consoleOutput('translate text:begin');
			translateText(
				$('.title, .url, .playlist .vmTitle, .adminItem .button:not(.showConsole):not(.data-toggle), .remove a, form button'), true
			);
			// translateText($('.url'), true);
			consoleOutput('translate text:end');
			// }
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
					get: function () {
						// return getCurrentTrack().title;
						return this.trackTitle;
					},
					set: function (title) {
						consoleOutput(title);
						consoleOutput(getCurrentTrack().title);
						this.trackTitle = title;
						// this.trackTitle = getCurrentTrack().title;
					}
				}
			},
			beforeCreate: function(){
		        consoleOutput('vmCurrentTrackTitle::beforeCreate');
		    },
		    created: function(){
		        consoleOutput('vmCurrentTrackTitle::created');
		    },
		    beforeMount: function(){
		        consoleOutput('vmCurrentTrackTitle::beforeMount');
		    },
		    mounted: function(){
		        consoleOutput('vmCurrentTrackTitle::mounted');
		    },
		    beforeUpdate: function(){
		        consoleOutput('vmCurrentTrackTitle::beforeUpdate');
		    },
		    updated: function(){
		        consoleOutput('vmCurrentTrackTitle::updated');
		    },
		    beforeDestroy: function(){
		        consoleOutput('vmCurrentTrackTitle::beforeDestroy');
		    },
		    destroyed: function(){
		        consoleOutput('vmCurrentTrackTitle::destroyed');
		    }
		});



		if(!playerState.paused) {
			// если плейлист играющего(!) текущего трека != playerState.currentPlaylist
			// сделать что то(?)
			/*if(__playlists[playerState.currentPlaylist].tracks.length) {
				audioApiElement.playStream(getCurrentTrack().url);
			} else {
				consoleOutput('няма трэкау');
				vmPlaylist.setCurrentPlaylist(0, playerState.nowPlaying.playlistName);
				audioApiElement.playStream(playerState.nowPlaying.track.url);
			}*/

			if(!__playlists[playerState.currentPlaylist].tracks.length) {
				vmPlaylist.setCurrentPlaylist(0, playerState.nowPlaying.playlistName);
			}
			audioApiElement.playStream(getCurrentTrack().url);
		}
		makeConfig();

		console.log('' + $('div').get(0));
		console.log($('.vmPlayer').text());
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
window.addEventListener('beforeinstallprompt', function(e) {
	// beforeinstallprompt Event fired
	// e.userChoice will return a Promise.
	e.userChoice.then(function(choiceResult) {
		console.log(choiceResult.outcome);

		if(choiceResult.outcome == 'dismissed') {
			console.log('User cancelled home screen install');
		}
		else {
			console.log('User added to home screen');
		}
	});
});
