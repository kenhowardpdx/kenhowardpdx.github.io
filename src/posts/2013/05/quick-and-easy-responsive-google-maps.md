---
date: '2013-05-10'
title: Quick &amp; Easy Responsive Google Maps
summary: Embedding Google Maps on your website requires set width and height attributes. As a result, the map does not scale to fit the width of its container. Therefore, no responsive goodness....until now!
---
[FitVids.JS](http://fitvidsjs.com/), a jQuery plugin developed by [Chris Coyier](http://chriscoyier.net/) and the team at [Paravel](http://paravelinc.com/), does all of the heavy lifting. <small markdown="1">**Note: Requires [jQuery](http://jquery.com/).**</small>

Simply wrap your <code class="language-clike">&lt;iframe&gt;</code> in a <code class="language-clike">&lt;div&gt;</code> and give your <code class="language-clike">&lt;div&gt;</code> a class of <code class="language-clike">mapWrap</code>. Then initialize FitVids.JS with the following code:

<pre class="language-clike prettyprint"><code class="language-clike">$(document).ready(function() {
	$('.mapWrap').fitVids({ customSelector: "iframe[src*='maps.google.com']" });
});
</code></pre>

Pretty painless, right?