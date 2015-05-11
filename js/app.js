// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$('a').filter(function() {
	return this.hostname && this.hostname !== location.hostname;
}).attr("target","_blank");