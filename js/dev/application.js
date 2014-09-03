$(function(){

  $("a[href^='http://']").attr("target","_blank");

  // Top Bar - need to improve appearance
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

if (location.host === 'kenhowardpdx.com') {
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-6386829-3']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}