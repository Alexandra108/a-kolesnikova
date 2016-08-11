/* ---------------------------------------------- /*
* PRELOADER
/* ---------------------------------------------- */
(function($){
	'use strict';
	$(window).on('load', function() {
	  $('#preloader-status').fadeOut();
	  $("#preloader").delay(500).animate({
		opacity: 0
	  }, 700, function() {
		$(this).css({display:'none'});
			skillbar();
	  });
	});
	$(function(){
   /* ---------------------------------------------- /*
	 * FULL HEIGHT
	 /* ---------------------------------------------- */ 
	 (function () {
	 	$(window).bind("load resize", function() {
	 		if($(window).height()>510){
				$(".full-height").height($(window).height());
	 		}else{
				$(".full-height").height(510);
	 		}
	 		
	 	});
	 }());

   /* ---------------------------------------------- /*
	 * STICKY MENU
	 /* ---------------------------------------------- */  
	 $('.header_cnt').sticky({
	 	topSpacing: 0
	 });

	 $('body').scrollspy({
	 	target: '.navbar-custom',
	 	offset: 70
	 });


	/* ---------------------------------------------- /*
	 * PORTFOLIO
	 /* ---------------------------------------------- */  
	 (function () { 
	 	var $container = $('.portfolio_cnt');
	 	$container.imagesLoaded(function(){
		 	$container.isotope({
		 		itemSelector: '.isotope-item',
		 		filter: '*',
		 		resizable: false,
		 		masonry: {
		 			columnWidth: $container.width() / 4
		 		},
		 		percentPosition: true,
		 		animationEngine: 'jquery'	
		 	});
	 	});

	 	$(window).smartresize(function(){
	 		$container.isotope({
	 			masonry: {
	 				columnWidth: $container.width() / 4
	 			}
	 		});
	 	});

	 	$('.portfolio-filter a').click(function(){
	 		$('.portfolio-filter .current').removeClass('current');
	 		$(this).addClass('current');
	 		var selector = $(this).attr('data-filter');
	 		$container.isotope({
	 			filter: selector,
	 			animationOptions: {
	 				duration: 450,
	 				easing: 'linear',
	 				queue: false
	 			}
	 		});
	 		return false;
	 	});
	 })();

	/* ---------------------------------------------- /*
	 * SCROLL UP
	 /* ---------------------------------------------- */ 
	 (function () {
	 	$.fn.scrollToTop = function(){
	 		$(this).hide().removeAttr("href");
	 		if($(window).scrollTop()<100){
	 			$(this).fadeIn("slow")
	 		}
	 		var scrollDiv=$(this);
	 		$(window).scroll(function(){
	 			if($(window).scrollTop()<100){
	 				$(scrollDiv).fadeOut(700)
	 			}else{
	 				$(scrollDiv).fadeIn(700)
	 			}
	 		});
	 		$(this).click(function(){
	 			$("html, body").animate({scrollTop:0},1000)
	 		});
	 	}
	 })();
	 $(".scroll-up").scrollToTop();

	/* ---------------------------------------------- /*
	 * ANIMATED SCROLLING
	 /* ---------------------------------------------- */ 
	 $('nav a').bind("click", function(e){
	 	var anchor = $(this);
	 	$('html, body').stop().animate({
	 		scrollTop: $(anchor.attr('href')).offset().top - 62
	 	}, 1000);
	 	e.preventDefault();
	 });

	 $('.nav a').on('click', function(){
	 	var windowWidth = $(window).width();
	 	if(windowWidth < 768){
	 		$('.btn-navbar').click(); 
	 		$('.navbar-toggle').click();
	 	}
	 });
	/* ---------------------------------------------- /*
	 * GOOGLE MAP
	 /* ---------------------------------------------- */   
	 (function () {
	 	var myLatlng = new google.maps.LatLng(46.8550216, 35.3586996);
	 	var styles = [
	 	{
	 		featureType: "landscape",
	 		stylers: [
	 		{ color: '#f7f7f7' }
	 		]
	 	},{
	 		featureType: "natural",
	 		stylers: [
	 		{ hue: '#00ffe6' }
	 		]
	 	},{
	 		featureType: "road",
	 		stylers: [
	 		{ hue: '#fff' },
	 		{ saturation: -70 }
	 		]
	 	},{
	 		featureType: "building",
	 		elementType: "labels",
	 		stylers: [
	 		{ hue: '' }
	 		]
	 	},{
	 		featureType: "poi",
	 		stylers: [
	 		{ hue: '' }
	 		]
	 	}
	 	];

	 	var mapOptions = {
	 		zoom: 15,
	 		scrollwheel: false,
	 		center: myLatlng,
	 		mapTypeId: google.maps.MapTypeId.ROADMAP,
	 		disableDefaultUI: true,
	 		styles: styles
	 	}
	 	var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

	 	var marker = new google.maps.Marker({
	 		position: myLatlng,
	 		map: map,
	 		animation: google.maps.Animation.DROP,
	 		title: 'Мелитополь'
	 	});

	 	var contentString = '' + 'Мелитополь' + '';
	 	var infowindow = new google.maps.InfoWindow({
	 		content: contentString
	 	});

	 	google.maps.event.addListener(marker, 'click', function () {
	 		infowindow.open(map, marker);
	 	});
	 })();

	/* ---------------------------------------------- /*
	 * ПРОВЕРКА ФОРМЫ
	 /* ---------------------------------------------- */
	 $('.contact-form form :submit').removeAttr('disabled');
	 $('.contact-form form :input').removeAttr('disabled');
	 $('.contact-form form')[0].reset();
	 var veryfyForm = {
	 	'name' : function() {
	 		var input = $('#form_it_n');
	 		var inputValue = input.val();
	 		var fieldName = /^[a-zA-Zа-яА-Я]+$/;
	 		if(inputValue.length > 2 && inputValue != '' && fieldName.test(inputValue)){
	 			input.addClass('not_error');
	 			input.next('.form_inform_box').text('Принято')
	 			.css('color','#68c3a3');
	 		}else{
	 			veryfyForm.errors = true;
	 			input.removeClass('not_error').addClass('error');
	 			input.next('.form_inform_box').html('&bull; поле "Имя" обязательно для заполнения<br> &bull; длина имени должна составлять не менее двух символов<br> &bull; поле должно содержать только русские или латинские буквы')
	 			.css('color','#972c2c');
	 		}
	 	},
	 	'email' : function() {
	 		var input = $('#form_it_email');
	 		var inputValue = input.val();
	 		if(inputValue != '' && isValidEmailAddress(inputValue)){
	 			input.addClass('not_error');
	 			input.next('.form_inform_box').text('Принято')
	 			.css('color','#68c3a3');
	 		}else{
	 			veryfyForm.errors = true;
	 			input.removeClass('not_error').addClass('error');
	 			input.next('.form_inform_box').html('&bull; поле "Email" обязательно для заполнения<br> &bull; поле должно содержать правильный email-адрес<br> (например: example123@mail.ru)')
	 			.css('color','#972c2c');
	 		}
	 	},
	 	'message' : function() {
	 		var input = $('#form_it_message');
	 		var inputValue = input.val();
	 		if(inputValue != '' && inputValue.length < 5000){
	 			input.addClass('not_error');
	 			input.next('.form_inform_box').text('Принято')
	 			.css('color','#68c3a3');
	 		}
	 		else{
	 			veryfyForm.errors = true;
	 			input.removeClass('not_error').addClass('error');
	 			input.next('.form_inform_box').html('&bull; поле "Текст письма" обязательно для заполнения')
	 			.css('color','#972c2c');
	 		}
	 	},
	 	'submit' : function() {
	 		if(!veryfyForm.errors) {
	 			$('.contact-form form').submit();
				var mData = $(".contact-form form").serialize();
	 			/*$.ajax({
	 				url: 'send.php',
	 				type: 'post',
	 				data: mData,
	 				beforeSend: function(xhr, textStatus){ 
	 					$('.contact-form form :input').attr('disabled','disabled');
	 				},
	 				success: function(response){
	 					$(".contact-form form :submit").attr('disabled','disabled');
	 					$('.contact-form form [type=text], .contact-form form textarea, .contact-form form [type=email]').removeClass().addClass("form-control").next('.form_inform_box').text('');
	 					$('.contact-form form')[0].reset();

	 					$.magnificPopup.open({
	 						callbacks: {
	 							open: function() {
	 								$('html').attr('style','');
	 							}
	 						},
	 						items:{
	 							src:"<div class='contact-form_popup'>Спасибо! Ваше сообщение успешно отправлено.</div>"

	 						},
	 						showCloseBtn: true,
	 						type: 'inline',
	 						tClose: 'Закрыть'
	 					});

	 				}
	 			});*/
	 		}
	 	}
	 }
	 $(".contact-form form :submit").click(function (){
	 	var obj = navigator.userAgent.indexOf('AppleWebKit') != -1 ? $('body') : $('html');
	 	obj.animate({ scrollTop: $('.contact-form').offset().top-92 }, 750, function (){
	 		veryfyForm.errors = false;
	 		veryfyForm.name();
	 		veryfyForm.email();
	 		veryfyForm.message();
	 		veryfyForm.submit();
	 	});
	 	return false;
	 });
	 $('#form_it_n').change(veryfyForm.name);
	 $('#form_it_email').change(veryfyForm.email);
	 $('#form_it_message').change(veryfyForm.message);

	 $('.portfolio-gallery').magnificPopup({
	 	delegate: 'a',
	 	type: 'image',
	 	tClose: 'Закрыть',
	 	tLoading: 'Загрузка изображения #%curr%...',
	 	gallery: {
	 		enabled: true,
	 		navigateByImgClick: true,
	 		preload: [0,1],
	 		tPrev: 'Предыдущий',
	 		tNext: 'Следующий',
	 		tCounter: ''
	 	},
	 	image: {
	 		tError: '<a href="%url%">Изображение #%curr%</a> не было загружено.',
	 		titleSrc: function(item) {
	 			return item.el.attr('title') + ' &middot; <a class="portfolio_i_a" href="'+item.el.attr('data-href')+'" target="_blank">Перейти на сайт</a>&nbsp;&middot;&nbsp;<a class="portfolio_i_a" href="'+item.el.attr('data-source')+'" target="_blank">GitHub</a>';
	 		},
	 		cursor: 'mfp-fade'
	 	},
	 	callbacks: {
	 		open: function() {
	 			$('html').attr('style','');
	 		}
	 	}
	 });

/* ---------------------------------------------- /*
 * WOW EFFECT
 /* ---------------------------------------------- */
 new WOW({
 	mobile:  false
 }).init();

/* ---------------------------------------------- /*
 * PARALLAX
 /* ---------------------------------------------- */
 $('section[data-type="background"]').each(function(){
 	var $backgroundElement = $(this); 
 	$(window).scroll(function(){
 		var yPos = -($(window).scrollTop() / $backgroundElement.data('speed')); 
 		var coords = '50%'+ yPos + 'px';
 		$backgroundElement.css({ backgroundPosition: coords });
 	}); 
 }); 

});
function skillbar(){
	$('.skillbar').one('inview', function(event, visible, visiblePartX, visiblePartY) {
	 	if (visible) {
	 		$.each($('.skillbar_i'),function(){
	 			$(this).find('.skillbar-bar').animate({
	 				width:$(this).attr('data-percent')
	 			},1200);
	 			$(this).find('.skillbar-percent').animate({
	 				left:$(this).attr('data-percent')
	 			},1200).text($(this).attr('data-percent'));
	 		});
	 		$(this).unbind('inview');
	 	}
	});
}
$(document).bind("ajaxSend", function(){
	$('#loading').show();
	$("body").append("<div id='overlay'></div>");
	$('#overlay').show();
}).bind("ajaxComplete", function(){
	$('#loading').hide();
	$('#overlay').remove('#overlay');
});
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}
})(jQuery);