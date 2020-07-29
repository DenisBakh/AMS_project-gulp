
@@include('../../components/blocks/header/header.js')

//=====================SLIDER===========================================================//

$(window).on('load', function () {
	$('.slider').slick({
		autoplay: true,
		//infinite:false,
		dots: true,
		arrows: false,
		//accessibility:false,
		//slidesToShow:1,
		autoplaySpeed: 3500,
		speed: 2000
	});
});
