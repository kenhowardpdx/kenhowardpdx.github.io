---
layout: post
title: The Best Way to Redirect for WWW and Non-WWW with .htaccess
summary: To avoid confusing search engines, it's important to have a properly configured 301 redirect for your base domain. You must decide whether to use the 'www' sub-domain or to ditch the antiquated prefix in favor of a cleaner URL.
---

301 redirects can have various use-cases. I'll cover using a 301 redirect to prevent search engines from indexing the wrong URLs. For instance, we don't want both 'www.yoursite.com' and 'yoursite.com' indexed with the same information, or what is called [duplicate content](https://support.google.com/webmasters/answer/66359?hl=en).

*Note: This how-to is based on the Apache web server method. You'll need to consult your hosting provider support to implement these changes if you're website isn't on an Apache server.*

**Why is this the best method for implementing 301 redirects?** We aren't making assumptions on where the files are being served from. The beauty of this method is that we can use this snippet of code on any domain. I like to work locally and really don't want to configure a seperate .htaccess file for my local machine and another one for my dev and production servers. This also plays well with [SubVersion](http://subversion.apache.org/) or [Git](http://git-scm.com/) repositories and remote teams.

First, you'll need to determine whether your URLs will have the 'www' prefix or not. It's important to chose a structure and stick with it as you don't want to be changing it in the future. 

You'll then want to locate your .htaccess file. If you don't have an .htaccess file, crack open your favorite text editor and create a new black file in the root of your websites public folder (usually 'public_html' or 'httpdocs'). And be sure to save the file as '.htaccess', not 'htaccess.txt'.

<div class="notice general">
  <h3>Don't care about the why and the how?</h3>
  <p><a href="http://beamusup.com">BeamUsUp</a> has a really handy <a href="http://beamusup.com/generate-htaccess/">.htaccess generator</a> you should check out.</p>
</div>

Place the following code in your .htaccess file and un-comment (remove #) the lines you wish to use
<pre class="language-clike prettycode"><code class="language-clike">RewriteEngine on
RewriteBase /  
\#Force non-www:
\#RewriteCond %{HTTP\_HOST} www\.(.\*)$ [NC]
\#RewriteRule ^(.\*)$ http://%1/$1 [R=301,L]  
\#Force www:
\#RewriteCond %{HTTP\_HOST} !^www\. [NC]
\#RewriteCond %{HTTP\_HOST} ^(.+)$ [NC]
\#RewriteRule ^(.\*)$ http://www\.%1/$1 [R=301,L]
</code></pre>

Save your .htaccess file an upload to your server. If you're looking for more indepth coverage and details on what these simple rules do, have a look at [Jeff Starr](https://twitter.com/perishable)'s article on Perishable Press -- [Universal www-Canicalization via htaccess](http://perishablepress.com/universal-www-canonicalization-via-htaccess/).
