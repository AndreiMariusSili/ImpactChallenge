var $ = jQuery.noConflict();



// Progress Bar

$(document).ready(function ($) {
    "use strict";
    
    $('.skill-shortcode').appear(function () {
        $('.progress').each(function () {
            $('.progress-bar').css('width',  function () { return ($(this).attr('data-percentage') + '%')});
        });
    }, {accY: -100});

    $('.menu-item').click(function(e) {
    if($(this).hasClass('open')) {
      $('.menu-item.out').not($(this)).removeClass('out');
      $(this).removeClass('open');
    }
    else {
      $('.menu-item').not($(this)).addClass('out');
      $(this).addClass('open');
    }
  });
});