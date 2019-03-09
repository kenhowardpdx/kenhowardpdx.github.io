---
layout: post
title: "iPad & YouTube - 'This video is currently unavailable.' Error"
summary: Everyone watches videos on YouTube. And YouTube allows anyone with a website to embed their videos wherever they want. But there's a problem with YouTube's service and little to no documentation about it.
postimage: /images/post-youtube-unavailable.jpg
---

I don't have all of the facts and my solution may not be your solution.

Today I was presented with an issue. We had a prospective client coming in and we wanted to share [our agency video](http://www.youtube.com/watch?v=kiKi2y1Fx3s&rel=0), which highlights past projects and clients and shows a bit of our personality.

The way we present the video on our website is through YouTube's iframe method. This has worked terrific until today.

We use an AppleTV and mirror our iPad to it to show clients various media (websites, videos, etc.).

When we accessed our website from the iPad and tapped the play button on the YouTube video, the video didn't play but instead there was a message that read **"This video is currently unavailable."**

<div class="notice general">
  <h3>tl;dr</h3>
  <p>Clear Safari's Cookies</p>
</div>

That's a very uninformative error message if you ask me.

So, I opened up my web browser on my computer and checked to see if the video worked there. Sure enough, all was well.

And to test this further, I went to YouTube's website to watch the video on the iPad and the video played. Albeit, it played using Quicktime on the mobile site.

My first thought was that the iPad was requesting a flash version of the video and that's why it wouldn't work.

I set out on testing various embed codes including iframe, [HTML5 video player using MediaElement.js](http://mediaelementjs.com/), and the old object embed.

Nothing worked.

In my testing I was using two iPads. One using iOS 6 and one using iOS 7. In iOS 7 the videos played in the first to methods (original YouTube iframe and HTML5 video). On the older, iOS 6 iPad, none of my test videos played.

After searching the web for the cause of this anomaly, I came across a [Google Product Forum topic](http://productforums.google.com/forum/#!topic/youtube/RWQkh0d6Www) where multiple people offered up their solutions and in some cases, conspiracy theories.

The solution, for us, was simple and the least obvious of those provided.

**We cleared Safari's cookies. Problem solved.**

Don't ask me how this solved the problem just know that it solved the problem.

If you are experiencing the same "This video is currently unavailable." error message, clear your cookies.

Here is the video in question, produced by yours truly, for a great <a href="http://www.turtledove.com">advertising agency in Portland, Oregon</a>.

<div class="fitvids">
<h3>Using YouTube Embed <sup>*</sup></h3>
<iframe width="1280" height="720" src="//www.youtube.com/embed/kiKi2y1Fx3s" frameborder="0" allowfullscreen></iframe>
</div>

<sup>*</sup> Using [fitVids](https://github.com/davatron5000/FitVids.js) to keep embed from breaking the page.
