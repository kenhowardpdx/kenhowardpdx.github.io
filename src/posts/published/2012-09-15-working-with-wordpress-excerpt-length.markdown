---
layout: post
title: Working With WordPress Excerpt Length
summary: When you need to corral WordPress to output your data where filters aren't practicle, write a custom function.
---
One of the beauties of WordPress is that the developers have seriously thought of every possible element and made a function for it. Better yet, they’ve given us the ability to remove and apply filters against those already awesome functions.

I am currently working on a podcast site. One of the main portions in the header of my template is a “Latest Podcast” block. The area I have to display the excerpt is tight. It won’t handle the 55 default word count of the_excerpt(). And if I apply a filter to excerpt_length() I would be modifying the word count for all excerpts on the site. Instead I am using the wp_trim_words()  function. This function is the core function driving the_excerpt().

Here’s how I’m using it.

<pre><code class="language-clike">function recentPodcast() {
	$category = get_category_by_slug('podcast');
	$cat_id = $category->term_id;

	$recent_posts = new WP_Query( array('posts_per_page' => 1, 'cat' => $cat_id) );

	while( $recent_posts->have_posts() ) : $recent_posts->the_post();

	$new_excerpt = wp_trim_words( get_the_excerpt(), 20, '...' );

	echo '&lt;a href="' . the_permalink() . '" class="post-thumbnail"&gt;' . get_the_post_thumbnail(get_the_ID(), 'thumbnail') . '&lt;/a&gt;';
	echo '&lt;p&gt;&lt;strong&gt;Latest Podcast:&lt;/strong&gt;' . $new_excerpt . '&lt;/p&gt;';

	endwhile;
}
</code></pre>