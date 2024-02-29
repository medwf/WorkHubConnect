document.addEventListener('DOMContentLoaded', function() {
$(document).ready(function() {
	function submitForm(formId) {
		alert("in submit function")
		var formData = {};
		var form = $('#' + formId);

		form.find('input').each(function() {
			formData[$(this).attr('name')] = $(this).val();
		});

		fetch('http://127.0.0.1:5001/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	$('.form').find('input, textarea').on('keyup blur focus', function (e) {
		var $this = $(this),
			label = $this.prev('label');

		if (e.type === 'keyup') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.addClass('active highlight');
			}
		} else if (e.type === 'blur') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.removeClass('highlight');
			}
		} else if (e.type === 'focus') {
			if ($this.val() === '') {
				label.removeClass('highlight');
			} else {
				label.addClass('highlight');
			}
		}
	});

	$('.tab a').on('click', function (e) {
		e.preventDefault();

		var target = $(this).attr('href');

		$('.tab-group .tab').removeClass('active');
		$(this).parent('.tab').addClass('active');

		$('.tab-content > div').hide();
		$(target).fadeIn(600);
	});

});
});

