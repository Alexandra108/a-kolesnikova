$(function(){
	/* ---------------------------------------------- /*
   * Стартовая анимация
   /* ---------------------------------------------- */
   startAnimate();

	/* ---------------------------------------------- /*
   * Мобильное меню
   /* ---------------------------------------------- */
   (function () {
   	var touch 	= $('#touch-menu'),
   	menu 	= $('.main-menu'),
   	width = screen.width;
   	$(touch).on('click', function(e){
   		if(touch.hasClass('active')){
   			touch.removeClass('active');
   		}else{
   			touch.addClass("active");
   		}
   		e.preventDefault();
   		menu.slideToggle();
   	});
   	$(window).resize(function(){
   		if(screen.width > 540 && menu.is(':hidden')){
   			menu.removeAttr('style');
   		}
   	});
   })();

	/* ---------------------------------------------- /*
   * Parallax
   /* ---------------------------------------------- */
   (function () {
   	$.fn.exists = function(selector) {
   		return $(this).length;
   	}
   	if ($('.intro.parallax').exists()) {
   		$('.intro').parallax("50%", 0.07);
   	}
   	if ($('.article.parallax').exists()) {
   		$('.article').parallax("50%", 0.2);
   	}
   })();

	/* ---------------------------------------------- /*
   * General slider
   /* ---------------------------------------------- */
   (function () {
   	var container = $('.container');
   	$('.main-slider').owlCarousel({
   		navigation:true,
   		items : 4,
   		responsiveRefreshRate: 100,
   		lazyEffect: "fade",
   		itemsDesktop:[1140,4],
   		itemsTablet:[768,2],
   		itemsTabletSmall:[540,2],
   		itemsMobile:[320,1],
   		navigationText:["<i class='icon-chevron_l'></i>","<i class='icon-chevron_r'></i>"],
   		responsive: true,
   		responsiveBaseWidth: container
   	});
   })();

	/* ---------------------------------------------- /*
   * Reviews slider
   /* ---------------------------------------------- */
   (function () {
   	var container = $('.container');
   	$('.reviews-slider_cnt').owlCarousel({
   		items : 1,
   		navigation:true,
   		singleItem:true,
   		responsiveRefreshRate: 100,
   		responsive: true,
   		responsiveBaseWidth: container,
   		navigationText:["<i class='icon-chevron_l'></i>","<i class='icon-chevron_r'></i>"]
   	});
   })();

	/* ---------------------------------------------- /*
   * Form validation
   /* ---------------------------------------------- */
   $('.form_is input').removeAttr('disabled');
   $('.form_order').submit(function(e){
   	e.preventDefault();
   	var id=$(this).attr("id");
   	msg='';
   	if( $("#"+id+" input[name='name']").val() == ''){
   		msg+="Введите свое имя<br>";
   		$("#"+id+" input[name='name']").addClass("error");
   	}else{
   		$("#"+id+" input[name='name']").removeClass("error");
   	}
   	var email=$.trim($("#"+id+" input[name='email']").val());
   	if( $("#"+id+" input[name='email']").val() == ''){
   		msg+="Введите свой email<br>";
   		$("#"+id+" input[name='email']").addClass("error");
   	}else if(!isValidEmailAddress(email)){
   		msg+="Введен не корректный e-mail!"+'<br>';
   		$("#"+id+" input[name='email']").addClass("error");
   	}else{
   		$("#"+id+" input[name='email']").removeClass("error");
   	}
   	if( $("#"+id+" input[name='phone']").val() == ''){
   		msg+="Введите свой телефон ";
   		$("#"+id+" input[name='phone']").addClass("error");
   	}else{
   		$("#"+id+" input[name='phone']").removeClass("error");
   	}
   	if (msg != ''){
   		$("#"+id).find(".form_verify_tx").html(msg);
   		$("#"+id).find(".form_verify_tx").fadeIn("slow");
   		return;
   	}
   	var m_data=$(this).serialize();
   	$("#"+id).find(".form_verify_tx").hide();
   	$.ajax({
   		type: "POST",
   		url: "https://getsimpleform.com/messages?form_api_token=f54fd7d095e97f0a751ed1d19276c038",
   		data: m_data,
   		success: function(data){
   			fancyboxMessage('Ваш запрос успешно отправлен и будет обработан в ближайшее время');
   			$(".form_is input").attr('disabled','disabled');
   		},
   		error: function(xhr,str){
   			fancyboxMessage('Ошибка запроса. Проверьте правильность введенных данных.');
   		}
   	});
   });

	/* ---------------------------------------------- /*
   * Scroll to top
   /* ---------------------------------------------- */
   (function () {
	   $.fn.scrollToTop = function(){
	   	$(this).hide().removeAttr("href");
	   	if($(window).scrollTop()!="0"){
	   		$(this).fadeIn("slow")
	   	}
	   	var scrollDiv=$(this);
	   	$(window).scroll(function(){
	   		if($(window).scrollTop()=="0"){
	   			$(scrollDiv).fadeOut("slow")
	   		}else{
	   			$(scrollDiv).fadeIn("slow")
	   		}
	   	});
	   	$(this).click(function(){
	   		$("html, body").animate({scrollTop:0},"slow")
	   	});
	   }
   })();
   $(".arrow-b").scrollToTop();

   /* ---------------------------------------------- /*
   * Fancybox Content
   /* ---------------------------------------------- */
   var fancyboxContent;
   $(".card").click(function(){
   	var rel=$(this).attr("rel");
   	fancyboxContent = $("#"+rel).html();
   	var title=$(this).find(".card_t").text();
   	$.fancybox({
   		maxWidth : 800,
   		padding:15,
   		maxHeight: 250,
   		height: 'auto',
   		width: 'auto',
   		content : fancyboxContent,
   		fitToView   : true,
   		autoSize    : false,
   		openEffect:'elastic',
   		closeEffect:'elastic',
   		closeBtn: false,
   		afterLoad : function() {
   			this.title = "<div class='card_fancybox_t'>"+title+"</div>";
   		},
   		helpers : {
   			overlay : {
   				locked : false,
   				css : {
   					'opacity' : '0.3'
   				}
   			},
   			title: {
   				type: 'outside',
   				position: 'top'
   			}
   		}
   	});
   	return false;
   });
   if ($('#yandex-map').exists()) {
   	ymaps.ready(yandexMap);
   }
});
$(document).bind("ajaxSend", function(){
	$('#loading').show();
	$(".wrapper").append("<div id='overlay'></div>");
	$('#overlay').show();
}).bind("ajaxComplete", function(){
	$('#loading').hide();
	$('#overlay').remove('#overlay');
});
function yandexMap() {
	var myMap = new ymaps.Map("yandex-map", {
		center: [55.7766,37.6060],
		zoom: 14,
		type: "yandex#map",
		behaviors: ['default', 'RouteEditor']
	});
	// Создание метки
	var myPlacemark = new ymaps.Placemark(
		// Координаты метки
		[55.7766,37.6060], {
			balloonContentBody: "<div class='balloon'>г.Москва, ул.Краснопролетарская, д.9</div>"
		}, {
			hideIconOnBalloonOpen: true,
			preset: 'twirl#redDotIcon'
		}
		);
	// Добавление метки на карту
	myMap.geoObjects.add(myPlacemark);
}
function fancyboxMessage(text) {
	$.fancybox({
		content:'<div class="form_ntf_tx">'+text+'</div>',
		fitToView   : true,
		autoSize    : true,
		minHeight : 50,
		closeBtn: false,
		helpers : {
			overlay : {
				locked : false,
				css : {
					'opacity' : '0.3'
				}
			}
		},
		afterLoad: function () {
			setTimeout(function () { $.fancybox.close(); }, 4000);
		}
	});
}
function startAnimate() {
	$('.header_logo').waypoint(function () {
		$(this).removeClass('hidded');
		$(this).addClass('animated fadeIn');
	}, {
		offset: '10%'
	});
	$('.intro_caption').waypoint(function () {
		$(this).removeClass('hidded');
		$(this).addClass('animated fadeIn');
	}, {
		offset: '30%'
	});
	$('.form-b').waypoint(function () {
		$(this).removeClass('hidded');
		$(this).addClass('animated bounceIn');
	}, {
		offset: '90%'
	});
	$('.header_phones').waypoint(function () {
		$(this).removeClass('hidded');
		$(this).addClass('animated zoomIn');
	}, {
		offset: '10%'
	});
	$('.main-menu').waypoint(function () {
		$(this).removeClass('hidded');
		$(this).addClass('animated fadeIn');
		$('.main-slider').removeClass('hidded');
		$('.main-slider').addClass('animated fadeIn');

	}, {
		offset: '85%'
	});
	$('.article .container').waypoint(function () {
		$(this).removeClass('hidded');
		$(this).addClass('animated fadeIn');
	}, {
		offset: '80%'
	});
}
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}