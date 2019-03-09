// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$('a').filter(function() {
	return this.hostname && this.hostname !== location.hostname;
}).attr("target","_blank");

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