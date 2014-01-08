<?php
/**
 * Framed Web Navigator
 * Cycle through multiple websites based on tag / category 
 * results. The browser remains on the host site 
 * while updating a unique urlwhich can be shared.
 * Reference: Trap.it web browser
 * Target: Veria.com - Veria Living - Go Well Guide
 * 
 * Author: Brad Napoliello
 */

?>
<script src="jquery-1.10.2.min.js"></script>

<!-- BLOGROLL SECTION -->
<!-- Every post's link has a url -->
<div id="blogroll">
	<?php 
	if ($activity->have_posts()) : while ($activity->have_posts()) : $activity->the_post(); 
		$index = ($paged > 1) ? (($paged - 1) * 8) + $count : $count;
		$url = get_post_meta($post->ID, 'target-url', true);
		?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> role="article" rel="<?php echo sanitize_title(get_the_title()); ?>">
			<a href="javascript:void(0);" rel="<?php echo $url ?>" title="<?php the_title_attribute(); ?>" class="frame-view" post="<?php echo $index ?>">
				<header class="article-header">
					<h3 class="post-title"><?php the_title(); ?></h3>
				</header> <!-- end article header -->
			</a>
			<section class="thumbnail"> <?php if( has_post_thumbnail() ) the_post_thumbnail( 'thumb' ) ?> </section>
				<header class="article-header">
					<h3 class="post-title"> <?php the_title(); ?> </h3>
				</header>
			<section class="description">
				<section class="entry-content clearfix"> <?php the_content(); ?> </section> 
			</section>
		
		</article> <!-- end article -->
	<?php endwhile; endif; ?>
</div>


<!-- 
   - Frame Website Viewer 
   -->
<section id="webview">

	<header class="webview-toolbar">
		<h2 class="toolbar-logo close-article">
			<span class="hide">Veria Living Go Well</span>
		</h2>

		<div class="tools">

			<div class="share-this tool toolblue">
				<h3>SHARE THIS</h3>
				<div class="share-links">
				</div>
			</div>

			<div class="close-article tool toolblue">
				<h3>CLOSE ARTICLE</h3>
				<a href="javascript:void(0);" class="cta">
					<span class="icon-close circle blue"></span>
				</a>
			</div>
		</div>

	</header>

	<div class="webview-content">

		<nav id="webview-pager">
			<a class="cta previous frame-switch" href="javascript:void(0);">
				<div class="">
					<span class="arrow alignright">
						<span class="icon-dot-left"></span>
						<span class="meta-nav icon-arrow-left"></span>
					</span> 
					<h3>Previous</h3>
				</div>
			</a>  
			<a class="cta next frame-switch" href="javascript:void(0);">
				<div class="">
					<span class="arrow alignleft">
						<span class="meta-nav icon-arrow-right"></span>
						<span class="icon-dot-right"></span>
					</span> 
					<h3>Next</h3>
				</div>  
			</a>
		</nav>
		<div class="loading"><div class="spinner"></div></div>
		<iframe id="webview-frame">
		</iframe>
	</div>
</section>


