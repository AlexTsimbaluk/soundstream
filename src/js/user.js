$(document).ready(function() {

	function checkLoginUniq(login) {
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

	/*$('.userPanel button').click(function(e) {
		console.log((this));
		$('.userPanel button').removeClass('active');
		$('.form-auth, .form-reg').fadeOut()
	});*/

	$('.showFormSign').click(function() {
		$(this).toggleClass('active').siblings().toggleClass('active');
		$('.form-auth').toggleClass('visible').fadeToggle(300);
		$('.overlayFull').toggleClass('visible').fadeToggle(300);
		$('.showFormReg').attr('disabled', 'disabled');
	});

	$('.showFormReg').click(function() {
		$(this).toggleClass('active').siblings().toggleClass('active');
		$('.form-reg').toggleClass('visible').fadeToggle(300);
		$('.overlayFull').toggleClass('visible').fadeToggle(300);
		if($('.form-reg .regLogin').val().length > 0) {
			checkLoginUniq($('.form-reg .regLogin').val());
		}
		$('.showFormSign').attr('disabled', 'disabled');
	});

	$(".overlayFull").on('click', function () {
		/*popupClose($("form.visible"), 500);
		popupClose($(this), 500);*/

		if($("form.visible").hasClass('form-reg')) {
			$('.showFormReg').trigger('click');
		} else {
			$('.showFormSign').trigger('click');
		}

		$('.overlayFull').toggleClass('visible').hide();
		$('.showFormSign, .showFormReg').removeAttr('disabled');
	});

	function popupClose(popup, delay) {
		popup.fadeOut(delay);
	}

	//закрытие модального окна и формы, сброс полей формы
	$(".popup-overlay, .close-popup").click(function (e){
		popupClose($(".popup-container, .popup-overlay"), 500);
		// $(".popup-container, .popup-overlay").fadeOut(500);
		$(':input', ".popup-container").not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
	});


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

	/*****************************************
	REGISTRATION
	******************************************/

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


	$('.form-reg .regSubmit').click(function(e) {
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
					console.log("success");
					$('.form-reg').fadeOut(300);
					$('.showFormReg').toggleClass('active').fadeToggle(300);
					$('.successReg').html('You have successfully signed up!').fadeIn(300).addClass('popupHide');
					setTimeout(function() {
						// $('.overlayFull, .success').fadeOut(500);
						$('.overlayFull').fadeOut(500);
						// $('.success').removeClass('popupHide');
					}, 4000);
				}
			});
		}
		return false;
	});

	$('.form-auth .authSubmit').click(function(e) {

		var login = $('.form-auth .authLogin');
		var pass = $('.form-auth .authPass');

		if(validateField(login) && validateField(pass)) {
			$.ajax({
				data: {'action': 'authUser', 'authLogin': login.val(), 'authPass': pass.val()},
				success: function(data) {
					if(data) {
						// $('.success').removeClass('popupHide, transparentText');
						console.log('data');
						var response = JSON.parse(data);
						console.log(response);
						$('.form-auth').fadeOut(300);
						$('.showFormSign').toggleClass('active').fadeToggle(300);
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
		return false;
	});


});

