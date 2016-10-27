(function($){
	'use strict';
	$(function(){
		if (typeof google === 'object' && typeof google.maps === 'object') {
			initialize();
		}
		
		/*** ============ Функция для определения существования элемента на странице =========== ***/
		$('.general-slider_cnt').css("display","block");
		(function() {
			$.fn.exists = function(selector) {
				return $(this).length;
			}
		})();
		/*** ====================== Слайдеры ====================== ***/
		if($('#general-slider_cnt').exists()){
			$("#general-slider_cnt").owlCarousel({
				loop:true,
				nav:false,
				autoplay:false,
				autoplayTimeout:3000,
				autoplayHoverPause:true,
				items:1,
				dots:true
			});
		}

		/*** ====================== Стилизация селекта ====================== ***/
		if($('.distance_sel').exists()){
			$('.distance_sel').SumoSelect();
		}

		/*** ====================== Мобильное меню ====================== ***/
		$( '#dl-menu' ).dlmenu({
			animationClasses : { classin : 'dl-animate-in-3', classout : 'dl-animate-out-3' }
		});

		$('.lang_e').on('click', function(e){
			$(".lang_lst").slideToggle();
		});
		/*** ====================== Autocomplete====================== ***/
		var availableTags = [
		"Air vent",
		"Air mover",
		"Axial-flo",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scheme"
		];
		$("#autocomplete").autocomplete({
			source: availableTags
		});
	});

	function initialize() {
   var haightAshbury = new google.maps.LatLng(52.69636108, 9.72290039);//(долгота, широта)
   var mapOptions = {
      zoom: 5,//масштаб
      draggable: true,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      center: haightAshbury,//позиционируем карту на заданые координаты
      mapTypeId: google.maps.MapTypeId.ROADMAP//задаем тип карты
   };    
   map = new google.maps.Map(document.getElementById("map"), mapOptions);//инициализация карты
   //addGeneralMarker(haightAshbury,map);
   var cities = [
   ['London', 51.5073509, -0.1277583, 8,"images/contacts_logo.png","Unit 9 Oj's Industrial Park, 3 Clay- bank Road, Portsmouth PO3, UK"],
   ['Liverpool', 53.4083714, -3.13316345, 5,'images/contacts_logo.png',"Unit 9 Oj's Industrial Park, 3 Clay- bank Road, Portsmouth PO3, UK"],
   ['Edinburgh', 55.953252, -3.188267, 70,'images/contacts_logo.png',"Unit 9 Oj's Industrial Park, 3 Clay- bank Road, Portsmouth PO3, UK"],
   ['Brit Crops', 52.69636108, 9.72290039, 29,'images/contacts_logo.png',"Unit 9 Oj's Industrial Park, 3 Clay- bank Road, Portsmouth PO3, UK"]
   ];
   for (var i = 0; i < cities.length; i++) {
   	var city = cities[i];
   	setCities(map,city[0], city[1], city[2],city[3]);
   }
   
}
/*function addState(location) {
	var image = new google.maps.MarkerImage('images/map-poup.png',
		new google.maps.Size(463, 233),
		new google.maps.Point(0, 0),
      new google.maps.Point(0, 463)); //изображение маркера

	var marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: image,
		title: "My title!)",
		zIndex: 999
   });//добавление главного маркера
}*/
function setCities(map,name,lat,lng,logoSrc,address) {
	var cityName = name;
	var logoSrc = logoSrc;
	
	var address = escape(address);
	console.log(address);
	var contentString = '<div class="map-popup_w">'+
	'<div class="map-popup_cnt cf">'+
	'<div class="map-popup_l">'+
	'<div class="map-popup_img">'+
	'<img src="'+logoSrc+'" alt="Blackorchild">'+
	'</div>'+
	'</div>'+
	'<div class="map-popup_r">'+
	'<div class="map-popup_t">'+cityName+'</div>'+
	'<div class="map-popup_tx">'+address+'</div>'+
	'</div>'+
	'</div>'+
	'</div>';
	var infoBubble = new InfoBubble({
		content: contentString,
		shadowStyle: 0,
		padding: 0,
		backgroundColor: 'transparent',
		borderRadius: 0,
		arrowSize: 24,
		minWidth:'auto',
		minHeight:'auto',
		overflow:'auto',
		maxWidth: 463,
		borderWidth: 0,
		disableAutoPan: true,
		hideCloseButton: true,
		arrowPosition:47,
		pixelOffset: new google.maps.Size(200,0),
		backgroundClassName: 'map-popup',
		arrowStyle: 0
	});
	var image = new google.maps.MarkerImage('images/map-icon.png',
		new google.maps.Size(35, 50),
		new google.maps.Point(0, 0),
      new google.maps.Point(0, 35)); //изображение маркера

	var lat = lat;
	var lng = lng;
	var zIndex = zIndex;
	var marker = new google.maps.Marker({
		position: {lat: lat, lng: lng},
		map: map,
		icon: image,
		title: cityName,
		zIndex: zIndex
	});
	google.maps.event.addListener(marker, 'click', function() {
		if(!marker.open){
			infoBubble.open(map,marker);
			marker.open = true;
			marker.setVisible(false);
		}
		else{
			infoBubble.close();
			marker.open = false;
		}
		google.maps.event.addListener(map, 'click', function() {
			infoBubble.close();
			marker.open = false;
			marker.setVisible(true);
		});
	});
}
function addslashes(str) {
	return str.replace('/(["\'\])/g', "\\$1");
}

})(jQuery);