// Main Webviewer function
// This is the core functionality for the Web Viewer module


// 
function loadIntoFrame(obj, framestate) {

	// On loading the frame, grab its index to update the next and previous buttons
	if (framestate != 'url') {
		if (framestate == 'reload') {
			$('#webview iframe').fadeOut(150)
			var index = $(obj).attr('nav');	
		} else {
			var index = $(obj).attr('post');	
		}
		nextPrevCycle(parseInt(index) - 1, parseInt(index) + 1);
	} else {
		nextPrevCycle(0,1);
	}

	// Sourcing the url from the post attribute
	var source = ((typeof obj) == 'object') ? $(obj).attr('rel') : url; 

	// Flush out any existing website in the framer and load the new one.
	clearPage(source);
	
	// If loading the framer for the first time, fade it in
	if (framestate != 'reload') 
		$('#webview').fadeIn();
	
	// Once the site finishes loading, fade in the iFrame.
	$('#webview iframe').load(function(){ $('#webview iframe').fadeIn(150) } );

}

// Left/Right arrows cycle through website posts
function nextPrevCycle(prev, next) {

	// IF we are at the end or beginning of our feed, we need to hide the next/prev buttons 
	if(prev == 0) 
		 $('.previous.frame-switch').fadeOut();
	else $('.previous.frame-switch').fadeIn();
	if($('a[post=' + next + ']').attr('rel') == null) 
		 $('.next.frame-switch').fadeOut();
	else $('.next.frame-switch').fadeIn();

	// Update the next and previous buttons
	$('.next.frame-switch').attr('rel', $('a[post=' + next + ']').attr('rel'));
	$('.next.frame-switch').find('h3').text($('a[post=' + next + ']').find('.post-title').text());
	$('.next.frame-switch').attr('nav', next );
	
	$('.previous.frame-switch').attr('rel', $('a[post=' + prev + ']').attr('rel'));
	$('.previous.frame-switch').find('h3').text($('a[post=' + prev + ']').find('.post-title').text());
	$('.previous.frame-switch').attr('nav', prev );		
}

// Clear the frame html and iframe src attribute
function clearPage(new_src) {
	$('#webview iframe').html();
	$('#webview iframe').attr('src', '');
	
	// If a new src is specified, reload the frame
	if (reload != '')
		$('#webview iframe').attr('src', new_src);
}

jQuery(document).ready( function() {


	// If webviewer's link is manually entered into the domain bar
	// or if a view is shared, the link takes you straight to the
	// frame view mode.
	var url = document.location.search;
	if (url.search('url') != -1) {
		url = url.substr(5);
		loadIntoFrame(url, 'url');
	}

	// Fire up frame view on post click
	$('body').on('click', 'a.frame-view', function(){ loadIntoFrame($(this), 'new') });

	// Fire nextPrevCycle
	$('body').on('click', 'a.frame-switch', function(){ loadIntoFrame($(this), 'reload') });

	// Close Frameviewer
	$('.close-article a').click(function(){
		$('#webview').fadeOut(150, function() {
			clearPage();
			$('body').css('overflow', 'visible');
			$('body').css('height', '');
			$('#usrFeedbackButton').show();
		});
	});
	
	
	
}); 

