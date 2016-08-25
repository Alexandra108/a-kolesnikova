var countSlides, slides;
/*** ======== Preloader ========== ***/
$(window).load(function() {
  $("#loader").delay(700).fadeOut('slow');
  $("#loader-wrapper").delay(1000).animate({
    opacity: 0
  }, 1000, function() {
    $(this).css({display:'none'});
    progressbar();
  });
});
$(function() {
  /*** ======== Добавление диаграммы после загрузки шрифтов с google fonts========== ***/
  (function () {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    WebFontConfig = {
      google: { families: [ 'Source+Sans+Pro:200,300,300italic:latin' ] },
      loading: function(){addDiagramm(40);}
    };
  })();

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
  var imagesOfGeneralSlider = $('.main-slider_cnt_i').find('img');
  imagesOfGeneralSlider.each(function() {
      pathsOfGeneralSliderImg.push($(this).attr('src'));
  });
  $.preloadImages(pathsOfGeneralSliderImg, function () {
     generalSlider();
  });

  /*** ====================== Слайдер с пользователями ====================== ***/
  var pathsOfUsersSliderImg  = [];
  var imagesOfUsersSlider = $('.user-slider_slides_i').find('img');
  imagesOfUsersSlider.each(function() {
      pathsOfUsersSliderImg.push($(this).attr('src'));
  });
  $.preloadImages(pathsOfUsersSliderImg, function () {
    usersSlider();
  });

  /*** ====================== Стилизирование селекта ====================== ***/
  (function () {
    var select,selectBoxContainer,dropDown,selectBox,option,li;
    $('.main_select select').each(function(){
      select = $(this);
      selectBoxContainer = $('<div>',{
        class   : 'main_select_cnt'
      });
      dropDown = $('<ul>',{class:'main_select_drop_menu'});
      select.find('option').each(function(i){
        option = $(this);
        li = $('<li>',{
          html: '<span>'+ option.text()+'</span>',
          attr: {"data-value" : option.val()}
        });
        dropDown.append(li);
      });
      selectBoxContainer.append(dropDown);
      select.hide().after(selectBoxContainer);
      $(this).siblings('p').text($(this).children('option:selected').text());
    });
  })();
  $(".main_select_drop_menu li").click(function(){
    var selectValue = $(this).find("span").text();
    var currentSelect = $(this).closest("div.main_select").find("select");
    $(this).closest("div.main_select").find("p").text(selectValue);
    $(this).closest("div.main_select").toggleClass('active');
    currentSelect.val($(this).data("value"));
    return false;
  });
  $('.main_select i').click(function(){
    var currentSel = $(this).parent("div.main_select");
    currentSel.toggleClass('active');
    $("div.main_select").not(currentSel).removeClass("active");
    return false;
  });
  $(document).click(function (e){
    var selectArea = $(".main_select");
    if (!selectArea.is(e.target) && selectArea.has(e.target).length === 0) {
      selectArea.removeClass("active");
    }
  });


  /*** ====================== Табы ====================== ***/
  $(".tabs_lk li").click(function(){
   var section = $(this).data("section");
   if (section != $('.tabs_lk li.tabs_lk_active').data("section") ) {
    $('.tabs_lk li').removeClass('tabs_lk_active');
    $(this).addClass('tabs_lk_active');
    $('.tabs_cnt_section').removeClass('active');
    $(section).addClass('active');
  }
  return false;
});

  /*** ====================== Range ====================== ***/
  $( "#range" ).slider({
   range: true,
   values: [ 26, 65 ],
   min: 0,
   max: 100
 });

  /*** ====================== ProgressBar ====================== ***/
  $(window).on('resize', function(){
    mainSliderProportions(countSlides);
  });
});
function progressbar(){
  $('.progress-bar').one('inview', function(event, visible, visiblePartX, visiblePartY) {
    if (visible){
      var progressbar = $('.progress-bar_value');
      var valueMax = progressbar.data('max');
      var procentStep = 0;
      var procent = 1200/valueMax,
      time = 50/valueMax;
      if(valueMax>15){
        $('.progress-bar_value span').css("right","10px");
      }else{
        $('.progress-bar_value span').css("display","none");
      }
      var set = setInterval(function(){
        procentStep = procentStep+procent;
        progress = parseInt(procentStep);
        $('.progress-bar_value span').text(progress + '%');
        if(progress >= valueMax){
          $('.progress-bar_value span').text(valueMax + '%');
          clearInterval(set);
          return;
        }
      },time);
      progressbar.width(0);
      progressbar.animate({width: valueMax+'%'}, 1200);
    }
  });
}
function generalSlider(){
	var slideNum, slideTime, animSlide, pause;
	slides = $(".main-slider").find(".main-slider_cnt").children(".main-slider_cnt_i");
  countSlides = slides.length;
  hwSlideSpeed = 700;
  mainSliderProportions(countSlides);
  $('.main-slider_cnt_i').css({"position" : "absolute","top":'0', "left": '0'}).hide().eq(0).show();
  for (var j=0, len=slides.length; j < len; j++) {
   $(".main-slider").find(".main-slider_navigation").append("<div class='main-slider_navigation_i'>"+j+"</div>");
 }
 $(".main-slider").find(".main-slider_navigation .main-slider_navigation_i:first").addClass("__active");
 slideNum=0;
 animSlide = function(arrow){
  clearTimeout(slideTime);
  $('.main-slider_cnt_i').eq(slideNum).fadeOut(hwSlideSpeed);
  if(arrow == "next"){
   if(slideNum == (countSlides-1)){slideNum=0;}
   else{slideNum++}
 }else{
   slideNum = arrow;
 }
 $('.main-slider_cnt_i').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
 $(".main-slider_navigation_i.__active").removeClass("__active");
 $('.main-slider_navigation_i').eq(slideNum).addClass('__active');
}
$('.main-slider_navigation_i').click(function(){
  var goToNum = parseFloat($(this).text());
  animSlide(goToNum);
});
pause = false;
var rotator = function(){
  if(!pause){
   slideTime = setTimeout(function(){animSlide('next')}, 3000);
 }
}
$('.main-slider_cnt').hover(
  function(){clearTimeout(slideTime); pause = true;},
  function(){pause = false; rotator();
  });
rotator();
}
function usersSlider(){
	var slideWrap = $('.user-slider_slides');
	var next = $('.user-slider_ac_next');
	var prev = $('.user-slider_ac_prev');
  var slides = $(".user-slider_slides").children(".user-slider_slides_i");
  var slideWidth = $(".user-slider_slides_i").outerWidth(true);
  var countSlides = slides.length;
  var offset = countSlides * slideWidth;
  $(".user-slider_slides").css('width', offset);
  var newLeftPos = slideWrap.position().left - slideWidth;
  next.click(function(){
    if(!slideWrap.is(':animated')) {
     slideWrap.animate({left: newLeftPos}, 700, function(){
      slideWrap
      .find('.user-slider_slides_i:first')
      .appendTo(slideWrap)
      .parent()
      .css({'left': 0});
    });
   }
 });
  prev.click(function(){
    if(!slideWrap.is(':animated')) {
     slideWrap
     .css({'left': newLeftPos})
     .find('.user-slider_slides_i:last')
     .prependTo(slideWrap)
     .parent()
     .animate({left: 0}, 700);
   }
 });
}
function addDiagramm(num) {
  var drawingCanvas = document.getElementById('diaframm');
  if(drawingCanvas && drawingCanvas.getContext) {
   var context = drawingCanvas.getContext('2d');
   context.fillStyle = "#e7e8e8";
   context.strokeStyle = "#e7e8e8";
   context.beginPath();
   context.arc(46,46,44,0,Math.PI*2,true);
   context.closePath();
   context.fill();
   context.fillStyle = "#ffa352";
   context.beginPath();
   context.moveTo(46, 46);
   var start=1.5 * Math.PI ;
   context.arc(46,46,44,start,start+(Math.PI/180)*num*360/100,false);
   context.closePath();
   context.fill();
   context.fillStyle = "#ffffff";
   context.beginPath();
   context.arc(46,46,27,0,Math.PI*2,true);
   context.closePath();
   context.fill();
   context.fillStyle = "#000000";
   context.font = "21px Source Sans Pro";
   context.fontWeight = "200";
   context.textAlign = "center";
   context.textBaseline = 'middle';
   var x=drawingCanvas.width/2;
   var y=drawingCanvas.height/2;
   context.fillText(num +"%", x, y);
 }};

 function mainSliderProportions(countSlides){
  var slHeight = parseInt($('.main-slider_cnt_i').outerHeight(true));
  var slWidth = parseInt($('.main-slider_cnt_i').outerWidth(true));
  var slWrapperWidth = countSlides * slWidth;
  $('.main-slider').height(slHeight);
  $('.main-slider').width(slWidth);
  $('.main-slider_cnt').width(slWrapperWidth);
  $('.main-slider_cnt_i img').each(function() {
    var imgWidth = $(this).width();
    var imgHeight = $(this).height();
    var viewportWidth = parseInt($('.main-slider_cnt_i').width());
    var viewportHeight = parseInt($('.main-slider_cnt_i').height());
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
