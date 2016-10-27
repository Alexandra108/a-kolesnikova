(function($){
	$(function(){
		/*** ============ Функция для определения существования элемента на странице =========== ***/
		$('.new-goods_cnt,.bestseller_cnt,.general-slider_cnt').css("display","block");
		(function() {
			$.fn.exists = function(selector) {
				return $(this).length;
			}
		})();
		/*** ============= Обрезка лишнего текста в карточках мероприятий  ======= ***/
		cutLongString($('.card_tx'), 48, false);
		cutLongString($('.bargain_i_tx'), 48, false);
		cutLongString($('.video-materials_i_t'), 52, false);
		cutLongString($('.about-us-says_i_tx'), 46, false);

		/*** ====================== Мобильное меню ====================== ***/
		(function () {
			var touch 	= $('#mob-btn'),
			menu 	= $('#mobile-menu'),
			closeMenu = $("#mobile-menu_btn_back"), 
			width = screen.width;
			$(touch).on('click', function(e){
				e.preventDefault();
				touch.addClass("active");
				menu.addClass("st-menu-open");
			});
			$(closeMenu).on('click', function(e){
				e.preventDefault();
				touch.removeClass('active');
				menu.removeClass("st-menu-open");
			});
			$(window).resize(function(){
				if(screen.width > 768 && menu.is(':hidden')){
					menu.removeAttr('style');
				}
			});

		})();

		/*** ====================== Стилизация селекта ====================== ***/
		if($('.filter-by-type_sel').exists()){
			$('.filter-by-type_sel').SumoSelect();
			$('#filter-select .SumoSelect').click(function(){
				var placeholder = $(this).find("option").eq(0); 
				var attr = placeholder.data("placeholder");
				var optWrapper = $(this).find(".optWrapper");
				var disabledLi = optWrapper.find(".disabled");
				if (attr){
					placeholder.remove();
					disabledLi.remove();
				}
				return false;
			});
		}
		if($('.form_select').exists()){
			$('.form_select').SumoSelect({
				placeholder: '',
			});
			$('.form_field .SumoSelect').click(function(){
				var placeholder = $(this).find("option").eq(0); 
				var attr = placeholder.data("placeholder");
				var optWrapper = $(this).find(".optWrapper");
				var disabledLi = optWrapper.find(".disabled");
				if (attr){
					placeholder.remove();
					disabledLi.remove();
				}
				return false;
			});
		}
		if($('.count_sel').exists()){
			$('.count_sel').SumoSelect();
		}

		/*** ====================== Слайдеры ====================== ***/
		if($('#general-slider_cnt').exists()){
			$("#general-slider_cnt").owlCarousel({
				loop:true,
				nav:true,
				autoplay:true,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				items:1,
				animateOut: 'fadeOut',
				dots:false
			});
		}
		if($('.new-goods_cnt').exists()){
			$(".new-goods_cnt").owlCarousel({
				loop:true,
				nav:true,
				items:3,
				dots:false,
				lazyLoad:true,
				responsive:{
					0:{
						items:2
					},
					768:{
						items:1
					},
					992:{
						items:2
					},
					1200:{
						items:3
					}
				}
			});
		}
		if($('.bestseller_cnt').exists()){
			$(".bestseller_cnt").owlCarousel({
				loop:true,
				nav:true,
				items:3,
				dots:false,
				lazyLoad:true,
				responsive:{
					0:{
						items:2
					},
					768:{
						items:1
					},
					992:{
						items:2
					},
					1200:{
						items:3
					}
				}
			});
		}
		if($('.video-materials_i_video').exists()){
			$(".video-materials_i_video").fancybox({
				maxWidth : 800,
				openEffect : 'elastic',
				maxHeight : 600,
				fitToView : false,
				width : '70%',
				height : '70%',
				autoSize : false,
				closeClick : false,
				openEffect : 'none',
				closeEffect : 'none',
				helpers: {
					overlay: {
						locked: false
					}
				}
			});
		}
		$(".good_tabs_lk").click(function(){
			var section = $(this).data("section");
			if (section != $('.good_tabs_lk.good_tabs_lk_active').data("section") ) {
				$('.good_tabs_lk').removeClass('good_tabs_lk_active');
				$(this).addClass('good_tabs_lk_active');
				$('.good_tabs_section').removeClass('active');
				$(section).addClass('active');
			}
			return false;
		});
		$('#good_zoom').click(function(){
			var href = $(this).closest(".good_b").siblings(".good_img").find("img").data("large");
			$.fancybox.open({
				href : href,
				maxWidth : 800,
				openEffect : 'elastic',
				maxHeight : 600,
				fitToView : false,
				width : '70%',
				height : '70%',
				autoSize : false,
				closeClick : false,
				openEffect : 'none',
				closeEffect : 'none',
				helpers: {
					overlay: {
						locked: false
					}
				}
			});
			return false;	
		});

		/*** ====================== Каталог меню (мобильное) ====================== ***/
		$('.filter-by-cat_t').on('click', function(e){
			e.preventDefault();
			var filterByCatMenu = $(this).siblings(".filter-by-cat_menu");
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				filterByCatMenu.removeClass('open');
			}else {
				$(this).addClass('active');
				filterByCatMenu.addClass('open');
			}
		});
		$('.filter-by-cat_menu li').click(function(){
			if( $(this).find('> .filter-by-cat_submenu').length==1 ){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$(this).find('> .filter-by-cat_submenu').slideUp();
				} else {
					$(this).addClass('active');
					$(this).find('> .filter-by-cat_submenu').slideDown();
				}
			} else {
				window.location = $(this).find('> a').attr('href');
			}
			return false;
		});
		$(".good_liked").on('click', function(e){
			e.preventDefault();
			$(this).toggleClass("active");
		});
		/*** ====================== Модальное окно личного кабинета ====================== ***/
		$('.header-personal-area').click( function(event){
			event.preventDefault();
			var modalContent = $('#personal-area');
			var modalContentHeight = modalContent.outerHeight(true);
			var windowHeight = $(window).height();
			var marginTop = (windowHeight-modalContentHeight)/2;
			$('#overlay').fadeIn(400, 
				function(){ 
					$('#personal-area') 
					.css('visibility', 'visible') 
					.animate({opacity: 1, marginTop: marginTop}, 200); 
				});
		});
		$('#overlay').click( function(){
			$('#personal-area')
			.animate({opacity: 0, marginTop: '0'}, 200,  
				function(){ 
					$(this).css('visibility', 'hidden'); 
					$('#overlay').fadeOut(400); 
				}
				);
		});
		$('#personal-area .modal-content_close').click(function (e) {
			e.preventDefault();
			$('#personal-area')
			.animate({opacity: 0, marginTop: '0'}, 200,  
				function(){ 
					$(this).css('visibility', 'hidden'); 
					$('#overlay').fadeOut(400); 
				}
				);
		});

		/*** ====================== Модальное окно покупки товара ====================== ***/
		$('.catalog .card-buy').click( function(event){
			event.preventDefault();
			var modalContent = $('#basket-popup');
			var modalContentHeight = modalContent.outerHeight(true);
			var windowHeight = $(window).height();
			var marginTop = (windowHeight-modalContentHeight)/2;
			$('#overlay').fadeIn(400, 
				function(){ 
					$('#basket-popup') 
					.css('visibility', 'visible') 
					.animate({opacity: 1}, 200); 
				});
		});
		$('#overlay').click( function(){
			$('#basket-popup')
			.animate({opacity: 0}, 200,  
				function(){ 
					$(this).css('visibility', 'hidden'); 
					$('#overlay').fadeOut(400); 
				}
				);
		});
		$('.modal-content_close').click(function (e) {
			e.preventDefault();
			$('#basket-popup')
			.animate({opacity: 0}, 200,  
				function(){ 
					$(this).css('visibility', 'hidden'); 
					$('#overlay').fadeOut(400); 
				}
				);
		});

		if($('.basket-popup_cnt').exists()){
			$('.basket-popup_cnt').jScrollPane();
			var api = $('.basket-popup_cnt').data('jsp');
			var throttleTimeout;
			$(window).bind(
				'resize',
				function()
				{
					if (!throttleTimeout) {
						throttleTimeout = setTimeout(
							function()
							{
								api.reinitialise();
								throttleTimeout = null;
							},
							50
						);
					}
				}
			);
		}
		/*** ====================== mobile-accordion ====================== ***/
		$('.mobile-accordion_t').click(function(e) {
			var currentAttrValue = $(this).attr('href');
			if($(e.target).is('.active')) {
				close_accordion_section();
			}else {
				close_accordion_section();
				$(this).addClass('active');
				$('.mobile-accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
			}
			e.preventDefault();
		});

		/*** ====================== Постраничная навигация в мобильной версии каталога ====================== ***/
		if($('.catalog_holder').exists()){
			var initialization = false;
			$(window).resize(function() {
				JPages();
			});
			JPages();
			function JPages() {	
				var widthW = $(window).width();
				if (!initialization && widthW < 768) {
					$("div.catalog_holder").jPages({
						containerID: "itemContainer",
						fallback: 500,
						perPage: 3,
						midRange: 4,
						callback: function(){
							initialization = true
						}
					});

				} else if(initialization && widthW > 768) {
					$("div.catalog_holder").jPages("destroy");
					$('#itemContainer .card').each(function() {
						$(this).show();
					});
					initialization = false;
				}
			}
		}

		/*** ====================== Проверка формы на валидацию ====================== ***/
		$('form').each(function() {
			$(this)[0].reset();
		});
		var msg = "";
		var veryfyForm = {
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
		$(".authorization-form form :submit").click(function(event){
			event.preventDefault();
			veryfyForm.errors = false;
			var form = $(this).closest("form");
			veryfyForm.email(form);
			veryfyForm.password(form);
			veryfyForm.submit(form);
			return false;
		});
	});

function close_accordion_section() {
	$('.mobile-accordion .mobile-accordion_t').removeClass('active');
	$('.mobile-accordion .mobile-accordion_cnt').slideUp(300).removeClass('open');
}

function cutLongString(element, count_lit, blackout){
	element.each(function(){
		var itemEl = $(this);
		var text = itemEl.html();
		var all_len = text.length;
		var new_text;
		if (all_len > count_lit){
			new_text = text.substr(0, (count_lit - 3)) + '...';
			if(blackout){
				var first_part_text = new_text.substr(0, (count_lit - 6));
				var light_part_text = new_text.substr((count_lit - 6), count_lit);
				var light_text = "";
				var array_color = ["#000","#414040", "#5a5a5a", "#a3a3a3", "#cccccc", "#ffffff"];
				for(var i = 0; i < 6; i ++){
					light_text += "<span style='color: " + array_color[i] + "'>" + light_part_text.substr(i, 1) + "</span>";
				}
				new_text = first_part_text + light_text;
			}
			itemEl.html(new_text);
		}
	}); 
}
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}
})(jQuery);