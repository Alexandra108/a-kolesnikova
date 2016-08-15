(function($){
	'use strict';
	var hwSlideSpeed = 700;
	var hwTimeOut = 3000;
	var hwNeedLinks = true;
	var slideCount;
	/*** ======== Preloader ========== ***/
	$(window).load(function() {
		$("#preloader").delay(700).fadeOut('slow');
		$(".preloader_e").delay(700).animate({
			opacity: 0
		}, 100);
	});
	$(function(){
		/*** ====================== Предзагрузка изображений ====================== ***/
		(function () {
			$.preloadImages = function () {
				if (typeof arguments[arguments.length - 1] == 'function') {
					var callback = arguments[arguments.length - 1];
				} else {
					var callback = false;
				}
				if (typeof arguments[0] == 'object') {
					var images = arguments[0];
					var n = images.length;
				} else {
					var images = arguments;
					var n = images.length - 1;
				}
				var not_loaded = n;
				for (var i = 0; i < n; i++) {
					jQuery(new Image()).attr('src', images[i]).load(function() { 
						if (--not_loaded < 1 && typeof callback == 'function') {
							callback();
						}
					});
				}
			}
		})();
		/*** ====================== Главный слайдер ====================== ***/
		var pathsOfGeneralSliderImg  = [];
		var imagesOfGeneralSlider = $('.general-slider_i').find('img');
		imagesOfGeneralSlider.each(function() {
			pathsOfGeneralSliderImg.push($(this).attr('src'));
		});
		$.preloadImages(pathsOfGeneralSliderImg, function () {
			generalSlider();
		});
		
		$(window).on('resize', function(){
			mainSliderProportions();
		});
		/*** ====================== Анимация при наведении ====================== ***/
		svgAnimation();

		/*** ====================== Слайдер в блоке "Это интересно" ====================== ***/
		(function () {
			var interestingSlider = $(".interesting-slider_cnt");
			interestingSlider.owlCarousel({
				autoplay: true,
				nav: false,
				items:1,
				loop:true,
				lazyLoad: true,
				singleItem : true,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',
				dots:false
			});
			$(".interesting-slider_navigation .next").click(function() {
				interestingSlider.trigger('next.owl.carousel');
			});
			$(".interesting-slider_navigation .prev").click(function() {
				interestingSlider.trigger('prev.owl.carousel');
			});
		})();

		/*** ====================== Слайдер в блоке "Галерея мероприятий и экскурсий" ====================== ***/
		(function () {
			var gallerySlider = $(".gallery-b_slider");
			gallerySlider.owlCarousel({
				nav:false,
				slideSpeed:2000,
				items:4,
				dots:false,
				margin:20,
				loop:true,
				lazyLoad: true,
				responsive : {
					992: {
						items:3
					},
					1040: {
						items:4
					}
				}
			});
			$(".gallery-b_slider_navigation .next").click(function() {
				gallerySlider.trigger('next.owl.carousel');
			});
			$(".gallery-b_slider_navigation .prev").click(function() {
				gallerySlider.trigger('prev.owl.carousel');
			});
		})();

		/*** ====================== Переключатель валют ====================== ***/
		$(".choose-valute a").click(function(){
			var idEl = $(this).attr('id');
			console.log(idEl);
			if (idEl != $('.choose-valute a.active').attr('id')){
				$('.choose-valute a').removeClass('active');
				$(this).addClass('active');
				$('.basket_cnt_tabs').removeClass('active');
				$('#basket_cnt_' + idEl).addClass('active');
			}
			return false;
		});

		/*** ====================== Выдающее меню ====================== ***/
		$('.main-navigation_cnt_el li').hover(function () {
			clearTimeout($.data(this,'timer'));
			$(this).addClass("active");
			$('.dropdown_m',this).stop(true,true).slideDown(400);
		}, function () {
			$.data(this,'timer', setTimeout($.proxy(function() {
				$('.dropdown_m',this).stop(true,true).slideUp(200);
				$(this).removeClass("active");
			}, this), 100));
		});

	});

	function svgAnimation() {
		var speed = 250,
		easing = mina.easeinout;
		[].slice.call ( document.querySelectorAll('.entertainment_i')).forEach( function( el ) {
			var s = Snap( el.querySelector('svg') ), path = s.select('path'),
			pathConfig = {
				from : path.attr('d'),
				to : el.getAttribute('data-path-hover'),
				fill : path.attr('fill')
			};
			el.onmouseover = function(e) {
				path.animate( { 'path' : pathConfig.to,'fill': '#ffbb0b' }, speed, easing );
			}
			el.onmouseout = function(e) {
				path.animate( { 'path' : pathConfig.from,'fill': pathConfig.fill }, speed, easing );
			}
		} );
	}
	function generalSlider(){
		$('.general-slider_i').css({"position" : "absolute","top":'0', "left": '0'}).hide().eq(0).show();
		var slideNum = 0;
		var slideTime,animSlide;
		slideCount = $(".general-slider_i").size();
		mainSliderProportions();
		animSlide = function(arrow){
			clearTimeout(slideTime);
			$('.general-slider_i').eq(slideNum).fadeOut(hwSlideSpeed);
			if(arrow == "next"){
				if(slideNum == (slideCount-1)){slideNum=0;}
				else{slideNum++}
			}
		else if(arrow == "prew")
		{
			if(slideNum == 0){slideNum=slideCount-1;}
			else{slideNum-=1}
		}
	else{
		slideNum = arrow;
	}
	$('.general-slider_i').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
	$(".general-slider_control.active").removeClass("active");
	$('.general-slider_control').eq(slideNum).addClass('active');
}
if(hwNeedLinks){
	var $linkArrow = $('<a id="general-slider_ac-prev" href="#">&lt;</a><a id="general-slider_ac-next" href="#">&gt;</a>')
	.prependTo('.general-slider_cnt');		
	$('#general-slider_ac-next').click(function(){
		animSlide("next");
		return false;
	});
	$('#general-slider_ac-prev').click(function(){
		animSlide("prew");
		return false;
	});
}
var $adderSpan = '';
$('.general-slider_i').each(function(index) {
	$adderSpan += '<span class = "general-slider_control">' + index + '</span>';
});
$('<div class ="general-slider_controls">' + $adderSpan +'</div>').appendTo('.general-slider_cnt');
$(".general-slider_control:first").addClass("active");
$('.general-slider_control').click(function(){
	var goToNum = parseFloat($(this).text());
	animSlide(goToNum);
});
var pause = false;
var rotator = function(){
	if(!pause){slideTime = setTimeout(function(){animSlide('next')}, hwTimeOut);}
}
$('#slider-wrap').hover(	
	function(){clearTimeout(slideTime); pause = true;},
	function(){pause = false; rotator();
	});
rotator();
}
function mainSliderProportions(){
	var slHeight = parseInt($('.general-slider_i').outerHeight(true));
	var slWidth = parseInt($('.general-slider_i').outerWidth(true));
	$('.general-slider').height(slHeight);
	$('.general-slider').width(slWidth);
	$('.general-slider_cnt').width(slWidth);
	$('.general-slider_i img').each(function() {
		var imgWidth = $(this).width();
		var imgHeight = $(this).height();
		var viewportWidth = parseInt($('.general-slider_i').width());
		var viewportHeight = parseInt($('.general-slider_i').height());
		var style = calculateStyle(imgWidth, imgHeight, viewportWidth, viewportHeight);
		$(this).css(style);
	});
}
function calculateStyle(imgWidth, imgHeight, viewportWidth, viewportHeight) {
	var imgRatio = imgWidth / imgHeight;
	var viewportRatio = viewportWidth / viewportHeight;

	var imgTop = 0, imgLeft = 0;

	if (imgRatio >= viewportRatio) {
		imgHeight = viewportHeight;
		imgWidth = Math.round((imgHeight) * imgRatio);

	} else {
		imgWidth = viewportWidth;
		imgHeight = Math.round((imgWidth) / imgRatio);
	}

	if (imgWidth != viewportWidth) {
		imgLeft = Math.round((viewportWidth - imgWidth) / 2);
	}

	if (imgHeight != viewportHeight) {
		imgTop = Math.round((viewportHeight - imgHeight) / 2);
	}

	return {
		width: imgWidth,
		height: imgHeight,
		left: imgLeft,
		top: imgTop
	};
}
})(jQuery);