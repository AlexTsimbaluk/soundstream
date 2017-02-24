var dateStart = new Date().getTime();

$(document).ready(function() {

	/*$('.userPanel button').click(function(e) {
		console.log((this));
		$('.userPanel button').removeClass('active');
		$('.form-auth, .form-reg').fadeOut()
	});*/

	$('.showFormSign').click(function() {
		$(this).toggleClass('active').siblings().toggleClass('active');
		$('.form-auth').toggleClass('visible').fadeToggle(300);
		$('.overlayFull').toggleClass('visible').fadeToggle(300);
	});

	$('.showFormReg').click(function() {
		$(this).toggleClass('active').siblings().toggleClass('active');
		$('.form-reg').toggleClass('visible').fadeToggle(300);
		$('.overlayFull').toggleClass('visible').fadeToggle(300);
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
		console.log('validateField');
		var pattern, errorMessage, top;
		if(element.attr('type') == 'text') {
			pattern = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё0-9\._-]{3,19}$/;
			errorMessage = 'От 4 до 20 символов';
			top = element.position().top;
		} else if(element.attr('type') == 'password') {
			pattern = /^[a-z][a-z0-9_-]{4,}$/i;
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
		console.log('equalPassword');
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

	/*****************************************
	REGISTRATION
	******************************************/

	$('.form-reg .regLogin').keyup(function(e) {
		
		var login = $('.form-reg .regLogin');
		/*if(login.val().length > 0) {
			$.ajax({
				type: "POST",
				data: {'action': 'unique', 'regLogin': login.val()},
				url: 'actionsRegistration.php',
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
					$('.registration-bad').html('NO AJAX');
				},
				success: function(data) {
					console.log("Good");
					var response = JSON.parse(data);
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
					}, 4000);
				}
			});
		}*/
		

		if($(this).val().length > 3) {
			validateField($(this));	
		} else if($(this).val().length == 3) {
			validateField($(this));	
		}
		// return false;
		e.preventDefault();
	});

	
	$('.form-reg .regPass').keyup(function() {
		if($(this).val().length > 4) {
			validateField($(this));	
		} else if($(this).val().length == 4) {
			validateField($(this));	
		}
	});

	$('.form-reg .regPassEx').keyup(function() {
		if($(this).val().length > 4) {
			equalPassword($('.form-reg .regPass'), $(this));	
		} else if($(this).val().length == 4) {
			equalPassword($('.form-reg .regPass'), $(this));	
		}
	});


	$('.form-reg .regSubmit').click(function(e) {
		var login = $('.form-reg .regLogin');
		var pass = $('.form-reg .regPass');
		var pass2 = $('.form-reg .regPassEx');
		if(validateField(login) & validateField(pass) & equalPassword(pass, pass2)) {
			$.ajax({
				type: "POST",
				data: {'regLogin': login.val(), 'regPass': pass.val()},
				url: 'actionsRegistration.php',
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
					console.log(error);
					$('.registration-bad').html('NO AJAX');
				},
				success: function(data) {
					// popupClose($(".popup-overlay"), 500);
					console.log("success");
					// $(".popup-container, .popup-overlay").addClass('success');
					// $('body').addClass('registered');
					$('.form-reg').fadeOut(500);
					// $('.registration-success').fadeIn(2000);
					/*setTimeout(function() {
						popupClose($(".registration-success, .popup-container"), 500);
					}, 2000);*/
				}
			});
		} /*else {
			$('.registration-bad').html('NO Validate');
			setTimeout(function() {
				$('.registration-bad').html('');
			}, 2000);
		}*/
		// e.preventDefault();
		return false;
	});

	$('.form-auth .authSubmit').click(function(e) {
		return false;
	});


});

