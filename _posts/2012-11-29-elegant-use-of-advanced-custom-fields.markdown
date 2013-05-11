---
layout: post
title: Elegant Use of Advanced Custom Fields in WordPress
summary: One of the best things about WordPress is its limitless functionality. With the use of plugins, a WordPress install can be transformed with great ease.
codehighlight: true
---
[Advanced Custom Fields](http://www.advancedcustomfields.com/) is one such plugin that makes WordPress very powerful.

A recent project required the admin to post articles by various different guest authors - none of the authors have a user account for this particular blog. With the help of AFC the admin has complete control of author details like their name, company name, photo and biography. They can even elect to display the bio at the top or bottom of the post.

Here’s how it looks while on the post screen:

![Advanced Custom Field Screenshot](http://media.tumblr.com/tumblr_me9yn5JTmG1rwh7u0.jpg)

Here’s the code that puts this to work and hooks the bio to the_content() :

<pre><code class="language-clike">
function author_details($selection = 'default', $postid = null)
{
	// Define fields
	/*['author_name']*/ 		$author_name = 'Sales Tax Sally';
	/*['author_photo']*/ 		$author_photo = get_stylesheet_directory_uri() . '/images/author_default.jpg';
	/*['author_link']*/ 		$author_link = null;
	/*['author_link_label']*/ 	$author_link_label = null;
	/*['author_bio']*/ 			$author_bio = null;
	/*['author_bio_position']*/	$author_bio_position = 'top';


	$fields = get_post_custom($postid);
	foreach($fields as $key =&gt; $value)
	{
		$$key = get_field($key);
	}

	switch($selection)
	{
		case 'photo':
			return '&lt;img src="' . $author_photo . '" title="' . $author_name . '" alt class="photo" width="80" height="80" /&gt;';
			break;
		case 'link':
			return '&lt;a href="' . $author_link . '" target="_blank"&gt;' . $author_link_label . '&lt;/a&gt;';
			break;
		case 'bio':
			return $author_bio;
			break;
		case 'bio_position':
			return $author_bio_position;
			break;
		case 'name':
			default:
			return $author_name;
			break;
	}
}

function author_bio( $content = '' )
{
	global $id, $wp_current_filter;

	if(in_array('get_the_excerpt', $wp_current_filter)) return $content;

	$bio = '&lt;p class="author-bio"&gt;' . author_details('bio', $id);
	$bio .= ' &mdash; ' . author_details('link', $id) . '&lt;/p&gt;';

	if(author_details('bio_position', $id) == 'top')
	{
		$content = $bio . $content;
	}
	else
	{
		$content = $content . $bio;
	}

	return $content;
}

add_filter('the_content', 'author_bio', 9);
</code></pre>
