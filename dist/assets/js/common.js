//===============Функция перемещения картинки из src HTML в background==================

function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			//console.log($(this).find('img').attr('src'))
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();


window.addEventListener('resize', reportWindowSize); //запускаем скрипт при изменении размеров страницы
function reportWindowSize() {
	changeBg();
}

//=====================Изменяем фон слайдера в зависимости от размера экрана===========================================================//

changeBg(); //запускаем скрипт при загрузке страницы
function changeBg() {
	$.each($('.ibgChange'), function (index, val) {
		const ibg = $(this);
		const ibgItem = $(this).find('.ibgChange__item');

		$.each(ibgItem, function (index, val) {
			const img = $(this).find('img')

			if (img.length > 0) {
				const attr = ibgItem[index].getAttribute('data-bg');
				const srcImg = img.attr('src');
				const currentWidth = window.innerWidth

				if (currentWidth <= +attr) {
					ibg.css('background-image', 'url("' + srcImg + '")');
					return false;
				}
			}
		})
	});
}
