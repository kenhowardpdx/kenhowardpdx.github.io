---
layout: post
title: PHP&#58; Function Displays Days Since Event
summary: A helpful function that takes a UNIX timestamp and reports how many days ago that time occured.
codehighlight: true
---
While working on a job board implementation I needed to convert dates into an easy to read format. Users would be able to see when a job was posted: Today, Yesterday or 2, 3, 4 days ago.

Without further ado, here's the function:

<pre><code class="language-clike">function count_the_days($date)
{
	$timestamp = strtotime($date);
	$datediff = time() - $timestamp;
	$daycount = floor($datediff/(60*60*24));
	if($daycount == 0)
	{
		return "Today";
	}
	elseif($daycount == 1)
	{
		return "Yesterday";
	}
	else
	{
		return $daycount . " days ago";
	}
}
</code></pre>