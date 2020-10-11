window.onload = function() {

	const gamburger = document.querySelector('.gamburger');
	const gamburgerButton = document.querySelector('.menu__gamburger');
	const body = document.querySelector('body');
	// счетчик для проверки overflowY
	let gamburgerCount = 0;
	
	function clickActiveGamburger() {
		if(gamburgerCount == 0) {
			gamburgerCount = 1;
			gamburgerButton.classList.add('active');
			gamburger.classList.add('active');
			body.style.overflowY = 'hidden';
		} else {
			gamburgerCount = 0;
			gamburgerButton.classList.remove('active');
			gamburger.classList.remove('active');
			body.style.overflowY = 'auto';
		}
	};
	gamburgerButton.addEventListener('click', clickActiveGamburger);
	
	
	const headerButton = document.querySelector('.header__button');
	const popupVideo = document.querySelector('.header__popup');
	const appMainButton = document.querySelector('.app__main-button');
	const video = document.querySelector('.header__popup_video');
	// счетчик для проверки overflowY
	let videoCount = 0;
	
	// открытие попапа и запуск видео
	function showVideo() {
		popupVideo.style.display = 'flex';
		popupVideo.style.pointerEvents = 'auto';
		video.play();
		if(videoCount == 0) {
			body.style.overflowY = 'hidden';
			videoCount = 1;
		}
	};
	headerButton.addEventListener('click', showVideo);
	appMainButton.addEventListener('click', showVideo);
	
	// закрытие попапа при клике вне его и остановка видео
	function hideVideo(event) {
		let target = event.target;
		if(videoCount == 1) {
			if(target.className == 'header__popup') {
				popupVideo.style.display = 'none';
				popupVideo.style.pointerEvents = 'none';
				video.pause();
				if(videoCount == 1) {
					body.style.overflowY = 'auto';
					videoCount = 0;
				}
			}
		}
	};
	document.addEventListener('click', hideVideo);
	
	
	const headerCarouselParent = document.querySelector('.header__carousel');
	const headerCarouselChild = headerCarouselParent.querySelectorAll('.header__carousel_item');
	const headerBgImg = document.querySelectorAll('.header__bg_item');
	let headerCarouselChildPress;
	let headerCounterAutoFlipping = 1;
	
	headerBgImg[0].classList.add('active');
	headerCarouselChild[0].classList.add('active');
	
	// нажатие на точку в слайдере в шапке
	function headerSlider(event) {
		let target = event.target;
	
		if (target.className != 'header__carousel_item') {
			return;
		}
	
		for(let i = 0; i < headerCarouselChild.length; i++) {
			if(target == headerCarouselChild[i]) {
				headerBgImg[i].classList.add('active');
				headerCarouselChildPress = target;
				headerCarouselChildPress.classList.add('active');
				headerCounterAutoFlipping = i;
			} else {
				headerBgImg[i].classList.remove('active');
				headerCarouselChild[i].classList.remove('active');
			}
		}
	};
	
	headerCarouselParent.addEventListener('click', headerSlider);
	
	// автопролистывание слайдов в шапке
	setInterval(function() {
		for(let i = 0; i < headerCarouselChild.length; i++) {
			headerBgImg[i].classList.remove('active');
			headerCarouselChild[i].classList.remove('active');
		}
		headerBgImg[headerCounterAutoFlipping].classList.add('active');
		headerCarouselChild[headerCounterAutoFlipping].classList.add('active');
		headerCounterAutoFlipping++;
		if(headerCounterAutoFlipping == 3) {
			headerCounterAutoFlipping = 0;
		}
	} , 4000);
	
	
	const resourcesCarouselParent = document.querySelector('.resources__carousel');
	const resourcesCarouselChild = resourcesCarouselParent.querySelectorAll('.resources__carousel_item');
	let resourcesCarouselChildPress;
	let resourcesCounterCarouselFlipping = 1;
	let resourcesSliderCounter = 1;
	
	resourcesCarouselChild[0].classList.add('active');
	
	// нажатие на точку в слайдере в блоке resources
	function resourcesSlider(event) {
		let target = event.target;
	
		if (target.className != 'resources__carousel_item'){
			return;
		}
	
		for(let i = 0; i < resourcesCarouselChild.length; i++){
			if (target == resourcesCarouselChild[i]){
				resourcesCarouselChildPress = target;
				resourcesCarouselChildPress.classList.add('active');
				resourcesCounterCarouselFlipping = i;
				resourcesSliderCounter = resourcesCounterCarouselFlipping;
				resourcesSliderRight();
			} else {
				resourcesCarouselChild[i].classList.remove('active');
			}
		}
	};
	
	resourcesCarouselParent.addEventListener('click', resourcesSlider);
	
	
	// копирование первого слайда и вставка его в конец
	// копирование последнего слайда и вставка его в начало
	// (для достижения плавного и бесконечного пролистывания)
	var resourcesSliderParent = document.querySelector('.resources__slider');
	let resourcesSliderChild = resourcesSliderParent.querySelectorAll('.resources__slider_item');
	let resourcesSliderChildFirstClone = resourcesSliderChild[0].cloneNode(true);
	let resourcesSliderChildLastClone = resourcesSliderChild[resourcesSliderChild.length - 1].cloneNode(true);
	
	resourcesSliderChild[0].insertAdjacentElement("beforeBegin", resourcesSliderChildLastClone);
	resourcesSliderChild[resourcesSliderChild.length - 1].insertAdjacentElement("afterEnd", resourcesSliderChildFirstClone);
	
	
	const resourcesSliderArrowLeft = document.querySelector('.resources__slider-arrow-left');
	const resourcesSliderArrowRight = document.querySelector('.resources__slider-arrow-right');
	
	var resourcesSliderWrap = document.querySelector('.resources__slider-wrap');
	
	resourcesSliderParent.style.transform = 'translateX(-' + (resourcesSliderCounter * resourcesSliderWrap.offsetWidth) + 'px)';
	
	// задать высоту обертки слайдера в зависимости от высоты самого слайда
	resourcesSliderWrap.style.height = resourcesSliderChild[0].offsetHeight + 'px';
	
	// правая кнопка в слайдере resources
	function resourcesSliderRight() {
		resourcesSliderArrowRight.removeEventListener('click', resourcesSliderRight);
		// "включение" точки
		resourcesCounterCarouselFlipping = resourcesSliderCounter++;
		if (resourcesCounterCarouselFlipping == resourcesCarouselChild.length) {
			resourcesCarouselChild[0].classList.add('active');
			resourcesCarouselChild[resourcesCarouselChild.length - 1].classList.remove('active');
		} else {
			for (let i = 0; i < resourcesCarouselChild.length; i++) {
				if (i == resourcesCounterCarouselFlipping) {
					resourcesCarouselChild[i].classList.add('active');
				} else {
					resourcesCarouselChild[i].classList.remove('active');
				}
			}
		}
		resourcesSliderParent.style.transition = "500ms";
		if(resourcesSliderCounter >= 0) {
			resourcesSliderParent.style.transform = 'translateX(-' + (resourcesSliderCounter * resourcesSliderWrap.offsetWidth) + 'px)';
		} else {
			resourcesSliderParent.style.transform = 'translateX(' + (resourcesSliderCounter * resourcesSliderWrap.offsetWidth) + 'px)';
		}
		endSlide();
		setTimeout(resourcesEventRightButton, 500);
	};
	
	// левая кнопка в слайдере resources
	function resourcesSliderLeft() {
		resourcesSliderArrowLeft.removeEventListener('click', resourcesSliderLeft);
		resourcesCounterCarouselFlipping = --resourcesSliderCounter;
		if (resourcesCounterCarouselFlipping == 0){
			resourcesCarouselChild[resourcesCarouselChild.length - 1].classList.add('active');
			resourcesCarouselChild[0].classList.remove('active');
		} else {
			for(let i = 0; i < resourcesCarouselChild.length; i++) {
				if (i == resourcesCounterCarouselFlipping - 1) {
					resourcesCarouselChild[i].classList.add('active');
				} else {
					resourcesCarouselChild[i].classList.remove('active');
				}
			}
		}
		resourcesSliderParent.style.transition = "500ms";
		if(resourcesSliderCounter >= 0)
			resourcesSliderParent.style.transform = 'translateX(-' + (resourcesSliderCounter * resourcesSliderWrap.offsetWidth) + 'px)';
		else
			resourcesSliderParent.style.transform = 'translateX(' + (resourcesSliderCounter * resourcesSliderWrap.offsetWidth) + 'px)';
		endSlide();
		setTimeout(resourcesEventLeftButton, 500);
	};
	
	function endSlide() {
		resourcesSliderParent.addEventListener('transitionend', function() {
				if(resourcesSliderCounter == resourcesSliderChild.length + 1) {
					resourcesSliderCounter = 1;
					resourcesSliderParent.style.transition = "none";
				}
				if(resourcesSliderCounter == 0) {
					resourcesSliderCounter = resourcesSliderChild.length;
					resourcesSliderParent.style.transition = "none";
				}
				resourcesSliderParent.style.transform = 'translateX(-' + (resourcesSliderCounter * resourcesSliderWrap.offsetWidth) + 'px)';
		});
	};
	
	let resourcesEventLeftButton = () => {
		resourcesSliderArrowLeft.addEventListener('click', resourcesSliderLeft);
	};
	
	let resourcesEventRightButton = () => {
		resourcesSliderArrowRight.addEventListener('click', resourcesSliderRight);
	};
	
	resourcesSliderArrowLeft.addEventListener('click', resourcesSliderLeft);
	resourcesSliderArrowRight.addEventListener('click', resourcesSliderRight);
	
	
	const testimonialsCarouselParent = document.querySelector('.testimonials__carousel');
	const testimonialsCarouselChild = testimonialsCarouselParent.querySelectorAll('.testimonials__carousel_item');
	const testimonialsSliderParent = document.querySelector('.testimonials__slider');
	const testimonialsSliderChild = testimonialsSliderParent.querySelectorAll('.testimonials__slider_item');
	const testimonialsSliderArrow = document.querySelector('.testimonials__slider_arrow');
	const testimonialsSliderArrowLeft = testimonialsSliderArrow.querySelector('.testimonials__slider_arrow-left');
	const testimonialsSliderArrowRight = testimonialsSliderArrow.querySelector('.testimonials__slider_arrow-right');
	const testimonialsSliderWrap = document.querySelector('.testimonials__slider-wrap');
	let testimonialsCarouselChildPress;
	let testimonialsSliderCounter = 0;
	// ширина слайда + маржины
	let testimonialsSliderChildWidth = testimonialsSliderChild[0].offsetWidth + 50;
	let centerScreen;
	// размещение слайдов по центру при ширине экрана <= 1000px, <= 700px
	if(window.innerWidth <= 480) {
		testimonialsSliderChildWidth = testimonialsSliderChild[0].offsetWidth + 40;
		centerScreen = (window.innerWidth / 2) - (testimonialsSliderChildWidth / 2);
		testimonialsSliderParent.style.transform = 'translateX(' + centerScreen + 'px)';
	} else if(window.innerWidth <= 1000) {
		testimonialsSliderChildWidth = testimonialsSliderChild[0].offsetWidth + 40;
		centerScreen = (window.innerWidth / 2) - (testimonialsSliderChildWidth / 2) - 9;
		testimonialsSliderParent.style.transform = 'translateX(' + centerScreen + 'px)';
	} else {
		centerScreen = 0;
	}
	
	// проверка на отрицательные числа + багфикс центрирования первого слайда при клике на первую точку
	let checkIntTestimonialsSlider = i => {
		if( ( (i * testimonialsSliderChildWidth) - centerScreen) < 0 ) {
			testimonialsSliderParent.style.transform = 'translateX(' + Math.abs((i * testimonialsSliderChildWidth) - centerScreen) + 'px)';
		} else {
			testimonialsSliderParent.style.transform = 'translateX(-' + Math.abs((i * testimonialsSliderChildWidth) - centerScreen) + 'px)';
		}
	};
	
	// установление прозрачности для левой стрелки при первом слайде и для правой при последнем
	let setOpacityTestimonialsSlider = i => {
		if (i == 0) {
			testimonialsSliderArrowLeft.style.opacity = '.3';
			testimonialsSliderArrowRight.style.opacity = '1';
		} else if (i == testimonialsCarouselChild.length - 1) {
			testimonialsSliderArrowLeft.style.opacity = '1';
			testimonialsSliderArrowRight.style.opacity = '.3';
		} else {
			testimonialsSliderArrowLeft.style.opacity = '1';
			testimonialsSliderArrowRight.style.opacity = '1';
		}
	};
	
	setOpacityTestimonialsSlider (testimonialsSliderCounter);
	
	// расположение стрелок по центру по вертикали
	if(window.innerWidth > 480) {
		testimonialsSliderArrow.style.transform = 'translateY(' + ((testimonialsSliderChild[0].offsetHeight / 2) - (testimonialsSliderArrow.offsetHeight / 2)) + 'px)';
	}
	
	// задать высоту обертки слайдера (высота слайдера + маржин + высота карусели)
	if(window.innerWidth <= 480) {
		testimonialsSliderWrap.style.height = testimonialsSliderParent.offsetHeight + 80 + testimonialsCarouselParent.offsetHeight + 'px';
	} else if(window.innerWidth <= 700) {
		testimonialsSliderWrap.style.height = testimonialsSliderParent.offsetHeight + 60 + testimonialsCarouselParent.offsetHeight + 'px';
	} else if(window.innerWidth <= 1000) {
		testimonialsSliderWrap.style.height = testimonialsSliderParent.offsetHeight + 70 + testimonialsCarouselParent.offsetHeight + 'px';
	} 
	
	testimonialsCarouselChild[0].classList.add('active');
	testimonialsSliderChild[0].classList.add('active');
	
	// нажатие на точку в слайдере в блоке testimonials
	function pressTestimonialsCarousel(event) {
		let target = event.target;
		if (target.className != 'testimonials__carousel_item') {
			return;
		}
		for(let i = 0; i < testimonialsCarouselChild.length; i++) {
			if (target == testimonialsCarouselChild[i]) {
				testimonialsSliderCounter = i;
				testimonialsCarouselChildPress = target;
				testimonialsCarouselChildPress.classList.add('active');
				testimonialsSliderChild[i].classList.add('active');
				checkIntTestimonialsSlider (i);
			} else {
				testimonialsCarouselChild[i].classList.remove('active');
				testimonialsSliderChild[i].classList.remove('active');
			}
		}
		setOpacityTestimonialsSlider(testimonialsSliderCounter);
	};
	
	testimonialsCarouselParent.addEventListener('click', pressTestimonialsCarousel);
	
	
	// левая кнопка в слайдере testimonials
	function testimonialsSliderLeft () {
		// проверка на первый слайд
		if (testimonialsSliderCounter == 0) {
			return;
		} else {
			checkIntTestimonialsSlider(--testimonialsSliderCounter);
			for (let i = 0; i < testimonialsCarouselChild.length; i++) {
				if (testimonialsSliderCounter == i) {
					testimonialsCarouselChild[i].classList.add('active');
					testimonialsSliderChild[i].classList.add('active');
				} else {
					testimonialsCarouselChild[i].classList.remove('active');
					testimonialsSliderChild[i].classList.remove('active');
				}
			}
		}
		setOpacityTestimonialsSlider(testimonialsSliderCounter);
	};
	
	// правая кнопка в слайдере testimonials
	function testimonialsSliderRight () {
		if (testimonialsSliderCounter == (testimonialsCarouselChild.length - 1) ) {
			return;
		} else {
			testimonialsSliderCounter++;
			checkIntTestimonialsSlider(testimonialsSliderCounter);
			for (let i = 0; i < testimonialsCarouselChild.length; i++) {
				if (testimonialsSliderCounter == i) {
					testimonialsCarouselChild[i].classList.add('active');
					testimonialsSliderChild[i].classList.add('active');
				} else {
					testimonialsCarouselChild[i].classList.remove('active');
					testimonialsSliderChild[i].classList.remove('active');
				}
			}
		}
		setOpacityTestimonialsSlider(testimonialsSliderCounter);
	};
	
	testimonialsSliderArrowLeft.addEventListener('click', testimonialsSliderLeft);
	testimonialsSliderArrowRight.addEventListener('click', testimonialsSliderRight);
	
	
	const helpFaqParent = document.querySelector('.help__faq');
	const helpFaqItem = helpFaqParent.querySelectorAll('.help__item');
	const helpFaqChild = helpFaqParent.querySelectorAll('.help__item_subheader');
	const helpFaqChildWrap = helpFaqParent.querySelectorAll('.help__item_subheader_wrap');
	const helpFaqChildHeader = helpFaqParent.querySelectorAll('.help__item_header');
	
	function helpFaqPress(event) {
		let target = event.target;
	
		if (target.className != 'help__item_header') {
			target = target.parentNode;
			if (target.className != 'help__item_header') {
				return;
			}
		}
	
		for(let i = 0; i < helpFaqChildHeader.length; i++) {
			if (target == helpFaqChildHeader[i]) {
				if (helpFaqChildWrap[i].offsetHeight == 0) {
					let childHeight = helpFaqChild[i].offsetHeight + 30;
					helpFaqChildWrap[i].style.height = childHeight + 'px';
					helpFaqItem[i].classList.add('active');
				} else {
					helpFaqChildWrap[i].style.height = '0px';
					helpFaqItem[i].classList.remove('active');
				}
			}
		}
	};
	
	helpFaqParent.addEventListener('click', helpFaqPress);
	
	
	// расположение логотипа в футере по центру по вертикали
	let footerLogo = document.querySelector('.footer__logo');
	let footerLinks = document.querySelector('.footer__anchor-links');
	
	if(window.innerWidth >= 700) {
		footerLogo.style.transform = 'translateY(-' + ((footerLogo.offsetHeight / 2) - (footerLinks.offsetHeight / 2)) + 'px)';
	}
	
	
	};