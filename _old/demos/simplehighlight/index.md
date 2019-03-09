---
title: "SimpleHighlight.js Demo"
summary: "Highlighting terms in a string with a simple jQuery plugin"
---

**[Head on over to GitHub](https://github.com/kenhowardpdx/SimpleHighlight.js) and grab yourself a simple text highlighter for search results today!**

<label for="string">Enter some text:</label>  
<textarea id="string">Roof party Tumblr authentic Pinterest, direct trade ethnic bitters hashtag YOLO pug. Chambray ethical church-key, vegan photo booth iPhone slow-carb swag Intelligentsia. Lomo fashion axe American Apparel bitters wolf brunch.</textarea>

<label for="terms">Enter some keywords to highlight:</label>  
<input type="text" id="terms" value="iPhone swag hashtag" />

<label for="output">Be amazed:</label>  
<div id="output"></div>

---

### How do you do it?

<pre class="language-clike prettycode"><code class="language-clike">&lt;script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"&gt; &lt;/script&gt;
&lt;script type="text/javascript" src="/js/plugins/jquery.simplehighlight.js"&gt;&lt;/script&gt;
&lt;script&gt;

$('#string,#terms').on('keyup', showHighlight);

showHighlight();

function showHighlight() {
	var string = $('#string').val();
	var highlight = $('#terms').val();
	highlight = highlight.trim().split(' ');
	var newString = $('#output').html($.simpleHighlight( string, highlight ));
}

&lt;/script&gt;

&lt;style type="text/css"&gt;
.matchedTerm {
	font-weight: bold;
	color: red;
}
&lt;/style&gt;
</code></pre>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"> </script>
<script type="text/javascript" src="/js/plugins/jquery.simplehighlight.js"></script>
<script>

	$('#string,#terms').on('keyup', showHighlight);

	showHighlight();

	function showHighlight() {
		var string = $('#string').val();
		var highlight = $('#terms').val();
		highlight = highlight.trim().split(' ');
		var newString = $('#output').html($.simpleHighlight( string, highlight ));
	}

</script>

<style type="text/css">
.matchedTerm {
	font-weight: bold;
	color: red;
}
textarea {
	width: 100%;
	height: 80px;
	margin-bottom: 1em;
	border-radius: 10px;
	padding: 10px;
	line-height: 1.2em;
}

input {
	width: 100%;
	margin-bottom: 1em;
	height: 2.5em;
	padding: 10px;
	border-radius: 10px;
	-webkit-appearance: none;
	border: 1px solid #222;
}

#output {
	border: 1px solid #555;
	background-color: rgba(0,0,0,.1);
	border-radius: 10px;
	padding: 10px;
}
</style>
