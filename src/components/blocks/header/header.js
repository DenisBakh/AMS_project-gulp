//=========================HEADER======================

$(document).ready(function () {
	//Т.к. header position:fixed, он выпадает из потока, поэтому рассчитываем отступ верхний у контента в величине высоты header

	if ($('.header_fixed').length > 0) {
		var headerHeight = $('.header_fixed').innerHeight()
		$('.main').css({
			'margin-top': headerHeight
		})

		window.addEventListener('resize', reportWindowSize);
		function reportWindowSize() {
			currentWidth = window.innerWidth
			var headerHeight = $('.header_fixed').innerHeight()
			$('.main').css({
				'margin-top': headerHeight
			})
		}
	}


	//бургер
	$('.burger-menu').on('click', function () {
		$this = $(this)
		$parent = $this.closest('.header')
		$menu = $parent.find('.header-menu__nav')

		//$parent.toggleClass('active')
		$this.toggleClass('active')
		$menu.toggleClass('active')
	})

	$(document).mouseup(function (e) { // событие клика по веб-документу
		if ($('.burger-menu').hasClass('active')) {
			const header = $this.closest('.header')
			const burgerMenu = $('.burger-menu');
			const headerMenu = $('.header-menu__nav');

			if (!header.is(e.target) // если клик был не по нашему блоку
				&& header.has(e.target).length === 0) { // и не по его дочерним элементам
				burgerMenu.removeClass('active');
				headerMenu.removeClass('active');
			}
		}
	});



	// Меняем подменю на выпадающий список при screen-width<=1000
	$('.header-nav__link').click(function (event) {
		const mq = window.matchMedia("(max-width: 1000px)");
		const $this = $(this)
		const dropdawnIcon = $this.find('.dropdawn-icon')

		if (mq.matches) {
			//линк a всегда бросает к верху страницы, поэтому на будущее – либо не использовать линки для подобных задач, либо вот .preventDefault().
			//event.preventDefault();
			$this.toggleClass('active').next().slideToggle(500);
			dropdawnIcon.toggleClass("active")
		}
		else {

		}

	});




})



