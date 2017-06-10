$(document).ready(function() {

	function getModalMarkup(data) {
		var responseMarkup = '',
			className = (data.result == 'Update SUCCES!') ? 'state-success' : 'state-warning';

		responseMarkup = '<div class="row"><div class="col-md-2">Запрос SQL</div>\
							<div class="col-md-10">'
							+ data.query
							+ '</div></div>\
							<br><br><div class="row ' + className + '">\
							<div class="col-md-2">Результат</div>\
							<div class="col-md-10">'
							+ data.result
							+ '</div></div>';

		return responseMarkup;
	}

	$('.js-create-table').on('click', function(e) {
		var sqlAction  = $(this).attr('data-sql'),
			sqlValue = $($(this).attr('data-sql-value') + ' option:selected').val();

		console.log(sqlAction);
		console.log(sqlValue);

		$.ajax({
			url  : 'actionsAdmin.php',
			data : {
				'action'    : 'makeSql',
				'sqlAction' : sqlAction,
				'sqlValue'  : sqlValue
			},
			success: function(data) {
				var response = JSON.parse(data);
				console.log(response);

				var modal = $('#sqlResponse');
					modalBody = modal.find('.modal-body'),
					responseMarkup = getModalMarkup(response)
				;

				modalBody.html(responseMarkup);

				modal.modal('toggle');
			}
		});
	});

	$('.js-drop-table').on('click', function(e) {
		var sqlAction  = $(this).attr('data-sql'),
			sqlValue = $($(this).attr('data-sql-value') + ' option:selected').val();

		console.log(sqlAction);
		console.log(sqlValue);

		$.ajax({
			url  : 'actionsAdmin.php',
			data : {
				'action'    : 'makeSql',
				'sqlAction' : sqlAction,
				'sqlValue'  : sqlValue
			},
			success: function(data) {
				var response = JSON.parse(data);
				console.log(response);

				var modal = $('#sqlResponse');
					modalBody = modal.find('.modal-body'),
					responseMarkup = getModalMarkup(response)
				;

				modalBody.html(responseMarkup);

				modal.modal('show');
			}
		});
	});

});