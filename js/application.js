$(function(){

  $("a[href^='http://']").attr("target","_blank");

  // Top Bar
  $('.top-bar nav').addClass('hidden');
  $('.menu-link').on('click', function(e){
    e.preventDefault();
    $('.top-bar nav').toggleClass('hidden');
  });

  $('pre').addClass('prettyprint');

  $(window).scroll(function(){
    if($(window).scrollTop() <= 20){
      $('.top-bar').removeClass('alt')
    }else{
      $('.top-bar').addClass('alt')
    }
  });

  var who = 'me';
  var where = 'kenhowardpdx.com';

  $('span.mailto').html('<a href="mailto:' + who + '@' + where + '?subject=You\'re Awesome">' + who + '@' + where + '</a>');
});