---
date: '2013-09-12'
title: A Simple CSS Trick to Vertically and Horizontally Center a Block
summary: Centering a block horizontally is no problem. Centering an absolute positioned block has its challenges. Vertically centering anything on a page can make you pull your hair out. That is, until now.
---
I don't remember where I found this solution so I appologize to whoever originated it. I've been using this method for about a year. Thankfully it's short and easy to remember.

**Update:** I just found [an article](http://coding.smashingmagazine.com/2013/08/09/absolute-horizontal-vertical-centering-css/) about the same exact thing!

```css
.outerblock {
	position:relative;
	width:500px;
	height:300px;
}

.innerblock {
	margin: auto;
	position: absolute;
	top:0;
	right:0;
	bottom:0;
	left:0;
	width: 100px;
	height: 100px;
}
```

<p data-height="268" data-theme-id="0" data-slug-hash="gkAhj" data-user="kenhowardpdx" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/gkAhj'>Simple CSS Vertical and Horizontal Centering</a> by kenhowardpdx (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="http://codepen.io/assets/embed/ei.js"></script>
