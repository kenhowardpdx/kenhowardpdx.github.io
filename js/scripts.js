/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
/*!
* SimpleHighlight 1.0.0
*
* Copyright 2013, Ken Howard - http://kenowardpdx.com
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 27 12:00:00 2013 -0700
*/
(function( $ ){

  "use strict";

  $.simpleHighlight = function( string, terms ) {

	$.each(terms, function(i,term) {
		var regex = new RegExp('(' + term + '+)\\b','gi'),
		    newStr = '##$1&&'; // To prevent highlighting html tags
		string = string.replace(regex, newStr);
	});
	string = string.replace(/##/g,'<span class="matchedTerm">').replace(/&&/g,'</span>'); // Clean up for display
	return string;
  };
  
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
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