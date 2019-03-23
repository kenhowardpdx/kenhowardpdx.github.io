---
date: '2013-10-14'
title: Best Way to Force External Website Links to Open In New Window
summary: Gone are the days of adding target='_blank' to each and every link on a page. jQuery, the superhero of the Internet, saves the day once again.
---
Use the following code on any website and you will age less each year. Gauranteed\*.

The best part about this little line of code is that it doesn't require a domain name. It uses the javascript 'location' object. This works really well when you're working with different environments (local, dev, staging, production).

<pre class="language-clike prettycode"><code class="language-clike">$("a[href^='http://']:not([href^='http://" + location.hostname + "'])").attr("target","_blank");

// Bonus - Automatically record clicks in Google Analytics
$("a[href^='http://']:not([href^='http://" + location.hostname + "']").on('click', function() {
 _gaq.push(['_trackPageview', '/outbound/' + $(this).attr('href')]);
});
</code></pre>

\* This is has not been proven, but who wouldn't like to find the fountain of youth in a single line of jQuery?
