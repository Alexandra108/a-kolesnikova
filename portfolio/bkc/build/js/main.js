(function($){
  $(function(){
    $('#birthdays-slider1,#birthdays-slider2,#news-slider1,#news-slider2,#events-slider1,#events-slider2').css("display","block");
    /*** ====================== Табы ====================== ***/
    $("#birthdays_lks li").click(function(){
     var section = $(this).data("section");
     if (section != $('#birthdays_lks li.active').data("section") ) {
      $('#birthdays_lks li').removeClass('active');
      $(this).addClass('active');
      $('.birthdays_cnt_section').removeClass('active');
      $(section).addClass('active');
    }
    return false;
  });

    $(".filters").click(function(){
      var section = $(this).data("section");
      if (section != $('.filters.active').data("section") ) {
        $('.filters').removeClass('active');
        $(this).addClass('active');

        $('.filters_cnt').removeClass('active');
        $(section).addClass('active');
      }
      return false;
    });
    $(".employees-mobile_menu li").click(function(){
      var section = $(this).data("section");
      if (section != $('.employees-mobile_menu li.active').data("section") ) {
        $('.employees-mobile_menu li').removeClass('active');
        $(this).addClass('active');

        $('.employees-mobile_cnt .section').removeClass('active');
        $(section).addClass('active');
      }
      return false;
    });


    $("#news_lks li").click(function(){
     var section = $(this).data("section");
     if (section != $('#news_lks li.active').data("section") ) {
      $('#news_lks li').removeClass('active');
      $(this).addClass('active');

      $('.news_cnt_section').removeClass('active');
      $(section).addClass('active');
    }
    return false;
  });
    $("#events-slider_lks li").click(function(){
     var section = $(this).data("section");
     if (section != $('#events-slider_lks li.active').data("section") ) {
      $('#events-slider_lks li').removeClass('active');
      $(this).addClass('active');

      $('.events-slider_cnt_section').removeClass('active');
      $(section).addClass('active');
    }
    return false;
  });

    /*** ============ Функция для определения существования элемента на странице =========== ***/
    (function() {
      $.fn.exists = function(selector) {
       return $(this).length;
     }
   })();

   /*** ====================== Стилизация селекта ====================== ***/
   if($('.filter-by-theme').exists()){
    $('.filter-by-theme').SumoSelect();
  }
  if($('.filter-by-department').exists()){
    $('.filter-by-department').SumoSelect();
  }
  if($('.edit-department').exists()){
    $('.edit-department').SumoSelect();
  }
  
  if($('.fancybox').exists()){
    $('.fancybox').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  }
  
  /*** ============= Обрезка лишнего текста в карточках мероприятий  ======= ***/
  cutLongString($('.events_i_descr'), 149, false);
  cutLongString($('.news_i_t'), 85, false);
  cutLongString($('.news_i_e_t'), 100, false);
  cutLongString($('.events-slider_i_location'), 54, false);
  cutLongString($('.events-slider_i_tx'), 100, false);

  /*** ============= Выпадающее меню профиля  ======= ***/
  (function () {
    var touch   = $('.header_account-user'),
    menu    = $('.header_account_dropdown'),
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
      if(screen.width > 640 && menu.is(':hidden')){
        menu.removeAttr('style');
      }
    });
  })();

  /*** ====================== Мобильное меню ====================== ***/
  $('.mob-btn').on('click', function (e) {
    e.preventDefault();
    $('#mobile-menu').addClass('st-menu-open');
  });
  $('body').on('click', function (e) {
    if ($(e.target).attr('id') != 'mob-menu' && !$(e.target).hasClass('mob-btn') && !$(e.target).parent().hasClass('mob-btn')) {
      $('#mobile-menu').removeClass('st-menu-open');
    }
  });

  /*** ====================== АККОРДЕОН ====================== ***/
  if($('#departments-accordion').exists()){
    $('#departments-accordion').accordion({
      oneOpenedItem : true
    });
  }
  /*** ====================== Daterangepicker ====================== ***/
  if($('#reportrange').exists()){
    $('#reportrange').daterangepicker({
      ranges: {
        'Сегодня': [new Date(), new Date()],
        'Вчера': [moment().subtract('days', 1), moment().subtract('days', 1)],
        'Неделя': [moment().subtract('days', 6), moment()],
        'За 30 дней': [moment().subtract('days', 29), moment()],
        'Текущий месяц': [moment().startOf('month'), moment().endOf('month')],
        'Прошлый месяц': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
      },
      maxDate: moment(),
      format: 'DD.MM.YYYY',
      startDate: '15.09.2016',
      endDate: '22.09.2016',
      opens: "right",
      locale: {
        applyLabel: 'Применить',
        cancelLabel: 'Отмена',
        fromLabel: 'От',
        toLabel: 'До',
        customRangeLabel: 'Диапазон дат',
        daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        firstDay: 1
      }
    },
    function (start, end) {
      $('#reportrange span').html(start.format('D.M.YYYY') + ' - ' + end.format('D.M.YYYY'));
      $('.filter_date_from').val(start.format('D.M.YYYY'));
      $('.filter_date_to').val(end.format('D.M.YYYY'));
      $('form#form-filter-date').submit();
    });
  }
  /*** ====================== Слайдеры ====================== ***/
  if($('#birthdays-slider1').exists() && $('#birthdays-slider2').exists()){
    $("#birthdays-slider1,#birthdays-slider2").owlCarousel({
      loop:true,
      nav:true,
      responsive:{
        0:{
          items:1,
          center:true
        },
        600:{
          items:2,
          autoWidth:true,
          center:false
        },
        680:{
          items:2,
          center:false
        },
        992:{
          items:2,
          center:false
        },
        1200:{
          items:3,
          center:false
        },
        1800:{
          items:4,
          center:false
        }
      }
    });
  }
  if($('#news-slider1').exists() && $('#news-slider2').exists()){
    $("#news-slider1,#news-slider2").owlCarousel({
      items:1,
      nav:true,
      responsive:{
        0:{
          items:1,
          center:true
        },
        500:{
          items:1,
          autoWidth:true,
          margin:34
        },
        860:{
          items:1,
          autoWidth:false
        }
      }
    });
  }
  if($('#events-slider1').exists() && $('#events-slider2').exists()){
    $("#events-slider1,#events-slider2").owlCarousel({
      loop:true,
      nav:true,
      responsive:{
        0:{
         items:1,
         center:true
       },
       600:{
        items:1,
        autoWidth:true,
        center:false,
        margin:34
      },
      680:{
        items:1,
        center:false
      },
      992:{
        items:2,
        center:false
      },
      1200:{
        items:3,
        center:false
      },
      1800:{
        items:3,
        center:false
      }
    }
  });
  }
});
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
        var array_color = ["#b1afaf", "#7c7771", "#5f5448", "#2b231a", "#2b231a", "#2b231a"];
        for(var i = 0; i < 6; i ++){
          light_text += "<span style='color: " + array_color[i] + "'>" + light_part_text.substr(i, 1) + "</span>";
        }
        new_text = first_part_text + light_text;
      }
      itemEl.html(new_text);
    }
  }); 
}
})(jQuery);