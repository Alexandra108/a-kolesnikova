$.noConflict();
(function($){
	'use strict';
	var optionSwitch,container;
	$(function(){

		/*** ====================== Табы ====================== ***/
		$(".popular-b_lk li").click(function(){
			var section = $(this).data("section");
			if (section != $('.popular-b_lk li.popular-b_lk_active').data("section") ) {
				$('.popular-b_lk li').removeClass('popular-b_lk_active');
				$(this).addClass('popular-b_lk_active');
				$('.popular-b_cnt_section').removeClass('active').css('visibility', 'hidden');
				$(section).addClass('active').css('visibility', 'visible');
			}
			return false;
		});
		$(".modal-content_lk li").click(function(){
			var section = $(this).data("section");
			if (section != $('.modal-content_lk li.modal-content_lk_active').data("section") ) {
				$('.modal-content_lk li').removeClass('modal-content_lk_active');
				$(this).addClass('modal-content_lk_active');
				$('.modal-content_cnt_section').removeClass('active').hide();
				$(section).addClass('active').show();
			}
			return false;
		});

		/*** ====================== Рейтинг ====================== ***/
		$(".rating-card input").on('change',function(){
			var prevLabels = $(this).prevAll("label");
			var nextLabels = $(this).nextAll("label");
			var nextStars = nextLabels.find(".star");
			var prevStars = prevLabels.find(".star");
			prevStars.each(function() {
				$(this).addClass("active");
			});
			nextStars.each(function() {
				$(this).removeClass("active");
			});
		});

		/*** ====================== Функция для определения существования элемента на странице ====================== ***/
		(function() {
			$.fn.exists = function(selector) {
				return $(this).length;
			}
		})();

		/*** ====================== Трейлер ====================== ***/
		(function(){
			var trailer = $(".trailer");
			var id = trailer.attr("id");
			trailer.append($('<div/>', {'class': 'play'}));
			$(document).delegate('#'+id, 'click', function(){
				var iframe_url = "https://www.youtube.com/embed/" + id + "?autoplay=1&autohide=1";
				if (trailer.data('params')) iframe_url+='&'+trailer.data('params');
				var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': trailer.width(), 'height': trailer.height() })
				trailer.replaceWith(iframe);
			});
		})();

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

   /*** ====================== Слайдер "Кадры фильма" ====================== ***/
   (function(){
   	if($('.cadres-of-films').exists()){
   		var cadresWrap = $(".cadres-of-films_r_tx .row:nth-child(1)");
   		var slide = cadresWrap.find(".cadres-of-films_i");
   		var countSlides = slide.length;
   		var slWidth = parseInt(slide.outerWidth(true));
   		var slWrapperWidth = countSlides * slWidth;
   		$(".cadres-of-films_r_tx").width(slWrapperWidth -16);
   		var cadresOfFilms = $(".cadres-of-films_r_cnt");
   		cadresOfFilms.jScrollPane({
   			horizontalGutter: 30,
   			verticalGutter: 30,
   			animateScroll : true,
   			animateDuration : 1000,
   			animateEase : 'swing'
   		});
   		var api = cadresOfFilms.data('jsp');
   		var throttleTimeout;
   		$(window).resize(function(){
   			if (!throttleTimeout) {
   				throttleTimeout = setTimeout(
   					function(){
   						api.reinitialise();
   						throttleTimeout = null;
   					},50);
   			}
   		});
   	}
   })();


   /*** ====================== Выдающее меню ====================== ***/
   $('.header_menu_lst_i').hover(function (){
   	var windowWidth = $(window).width();
   	if(windowWidth > 992){
   		clearTimeout($.data(this,'timer'));
   		$(this).addClass("active");
   		$('.dropdown_m',this).stop(true,true).show();
   	}
   }, function () {
   	$.data(this,'timer', setTimeout($.proxy(function() {
   		$('.dropdown_m',this).stop(true,true).hide();
   		$(this).removeClass("active");
   	}, this), 100));
   });

   /*** ====================== Фильтрация отображения карточек товара ====================== ***/

   (function() {
   	container = document.getElementById('catalog-card-filter-vm');
   	if(container){
   		optionSwitch = Array.prototype.slice.call(container.querySelectorAll('.catalog-card-filter-by-view > a'));
   		init(optionSwitch);
   	}
   })();

   /*** ====================== Модальное окно ====================== ***/
   $('.header_account-enter').click( function(event){ 
   	event.preventDefault();
   	$('#overlay').fadeIn(400, 
   		function(){ 
   			$('.modal-content') 
   			.css('display', 'block') 
   			.animate({opacity: 1, marginTop: '122'}, 200); 
   		});
   });
   $('#overlay').click( function(){
   	$('.modal-content')
   	.animate({opacity: 0, marginTop: '0'}, 200,  
   		function(){ 
   			$(this).css('display', 'none'); 
   			$('#overlay').fadeOut(400); 
   		}
   		);
   });

   /*** ====================== Слайдер со скроллом на главной странице ====================== ***/
   $('.popular-b_cnt_section_tx').each(function() {
   	var slide = $(this).find(".popular-b_i");
   	var slides = $(this).find(".popular-b_i");
   	var countSlides = slides.length;
   	var slWidth = parseInt(slide.outerWidth(true));
   	var slWrapperWidth = countSlides * slWidth;
   	$(this).width(slWrapperWidth -20);
   });
   $('.popular-b_cnt_section').each(function() {
   	$(this).jScrollPane({
   		horizontalGutter: 30,
   		verticalGutter: 30,
   		animateScroll : true,
   		animateDuration : 1000,
   		animateEase : 'swing'
   	});
   	var api = $(this).data('jsp');
   	var throttleTimeout;
   	$(window).resize(function(){
   		if (!throttleTimeout) {
   			throttleTimeout = setTimeout(
   				function(){
   					api.reinitialise();
   					throttleTimeout = null;
   				},50);
   		}
   	});
   });

   /*** ====================== Стилизация селекта ====================== ***/
   if($('.catalog-card-filter-by-type').exists()){
   	$('.catalog-card-filter-by-type').SumoSelect();
   }

   /*** ====================== Проверка формы на валидацию ====================== ***/
   $('form').each(function() {
   	$(this)[0].reset();
   });
   var msg = "";
   var veryfyForm = {
   	'name' : function(form) {
   		var input = form.find("input[name='name']");
   		if(input.exists()){
   			var inputValue = input.val();
   			var fieldName = /^[a-zA-Zа-яА-Я]+$/;
   			if(inputValue.length > 2 && inputValue != '' && fieldName.test(inputValue)){
   				input.addClass('not_error');
   			}else{
   				veryfyForm.errors = true;
   				input.removeClass('not_error').addClass('error');
   				msg+="Поле 'Имя' обязательно для заполнения<br>";
   			}
   		}
   	},
   	'email' : function(form) {
   		var input = form.find("input[name='email']");
   		var inputValue = input.val();
   		if(inputValue == ''){
   			veryfyForm.errors = true;
   			input.removeClass('not_error').addClass('error');
   			msg+="Поле 'Email' обязательно для заполнения<br>";

   		}
   		else if(!isValidEmailAddress(inputValue)){
   			veryfyForm.errors = true;
   			input.removeClass('not_error').addClass('error');
   			msg+="Введен не корректный e-mail<br>";
   		}
   		else{
   			input.addClass('not_error');
   		}
   	},
   	'password' : function(form) {
   		var input = form.find("input[name='password']");
   		var inputValue = input.val();
   		if(inputValue != ''){
   			input.addClass('not_error');
   		}
   		else{
   			veryfyForm.errors = true;
   			input.removeClass('not_error').addClass('error');
   			msg+="Введите пароль<br>";
   		}
   	},
   	'submit' : function(form) {
   		if (msg != ''){
   			form.find(".form_inform_box").html(msg);
   			form.find(".form_inform_box").fadeIn("slow");
   			msg = '';
   			return;
   		}
   		if(!veryfyForm.errors) {
					/*form.submit();
					var mData = form.serialize();
					$.ajax({
						url: '',
						type: 'post',
						data: mData,
						success: function(response){
							form.reset();
						}
					});*/
					form.find(".form_inform_box").html(msg);
				}
			}
		}
		$(".registration-form :submit").click(function(event){
			event.preventDefault();
			veryfyForm.errors = false;
			var form = $(this).closest("form");
			veryfyForm.name(form);
			veryfyForm.email(form);
			veryfyForm.password(form);
			veryfyForm.submit(form);
			return false;
		});
		$(".account-form :submit").click(function(event){
			event.preventDefault();
			veryfyForm.errors = false;
			var form = $(this).closest("form");
			veryfyForm.name(form);
			veryfyForm.email(form);
			veryfyForm.password(form);
			veryfyForm.submit(form);
			return false;
		});
		/*** ====================== Accordion ====================== ***/
		$(".catalog-menu_i > a").on("click", function(){
			if($(this).hasClass('active')){
				$(this).removeClass("active");
				$(this).siblings('.catalog-menu_i_cnt').slideUp(200);
				$(".catalog-menu_i > a i").removeClass("fa-angle-right").addClass("fa-angle-down");
			}else{
				$(".catalog-menu_i > a i").removeClass("fa-angle-down").addClass("fa-angle-right");
				$(this).find("i").removeClass("fa-angle-right").addClass("fa-angle-down");
				$(".catalog-menu_i > a").removeClass("active");
				$(this).addClass("active");
				$('.catalog-menu_i_cnt').slideUp(200);
				$(this).siblings('.catalog-menu_i_cnt').slideDown(200);
			}
			return false;
		});

		/*** ====================== Мобильное меню ====================== ***/
		(function () {
			var touch 	= $('#mob-btn'),
			menu 	= $('.catalog-menu'),
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

		$('#producer-alphabet a').click(function(){
			if(!$(this).hasClass('absent')){
				var letter = $(this).attr('letter');
				$('#producer-alphabet').hide();
				$('#producers').show();
				$('#producers #mb-'+letter).show();
			}
			return false;
		});
		$('#producers .go-to-alphabet').click(function(){
			$(".all-producers_i").hide();
			$('#producers').hide();
			$('#producer-alphabet').show();
			return false;
		});
	});
function init(optionSwitch) {
	optionSwitch.forEach(function(el, i) {
		el.addEventListener('click', function(ev) {
			ev.preventDefault();
			_switch(this);
		}, false );
	} );
}
function _switch(opt) {
	optionSwitch.forEach(function(el) {
		classie.remove(container, el.getAttribute('data-view'));
		classie.remove(el, 'selected');
	});
	classie.add(container, opt.getAttribute('data-view'));
	classie.add(opt, 'selected');
}
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}
})(jQuery);