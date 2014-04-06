// Main Webviewer function

function loadIntoFrame(obj, framestate) {
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

	var source = ((typeof obj) == 'object') ? $(obj).attr('rel') : url; 

	if (framestate != 'reload') $('#webview').fadeIn();
	$('#webview iframe').html();
	$('#webview iframe').attr('src', '');
	$('#webview iframe').attr('src', source);
	$('#webview iframe').load(function(){ $('#webview iframe').fadeIn(150) } );
	
	//hide feedback button
	$('#usrFeedbackButton').hide();
	$('body').css('overflow', 'hidden');
	$('body').css('height', '100%');
	
}

// Left/Right arrows cycle through website posts
function nextPrevCycle(prev, next) {
	if(prev == 0) 
		 $('.previous.frame-switch').fadeOut();
	else $('.previous.frame-switch').fadeIn();
	if($('a[post=' + next + ']').attr('rel') == null) 
		 $('.next.frame-switch').fadeOut();
	else $('.next.frame-switch').fadeIn();
	console.log('next: ' + $('a[post=' + next + ']').attr('rel'));
	$('.next.frame-switch').attr('rel', $('a[post=' + next + ']').attr('rel'));
	$('.previous.frame-switch').attr('rel', $('a[post=' + prev + ']').attr('rel'));
	$('.next.frame-switch').find('h3').text($('a[post=' + next + ']').find('.post-title').text());
	$('.previous.frame-switch').find('h3').text($('a[post=' + prev + ']').find('.post-title').text());
	$('.next.frame-switch').attr('nav', next );
	$('.previous.frame-switch').attr('nav', prev );		
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
	$('body').delegate('a.frame-view', 'click', function(){ loadIntoFrame($(this), 'new') });

	// Fire nextPrevCycle
	$('body').delegate('a.frame-switch', 'click', function(){ loadIntoFrame($(this), 'reload') });

	// Close Frameviewer
	$('.close-article a').click(function(){
		$('#webview').fadeOut(150, function() {
			$('#webview iframe').html();
			$('#webview iframe').attr('src', '');
			$('body').css('overflow', 'visible');
			$('body').css('height', '');
			$('#usrFeedbackButton').show();
		});
	});
	
	
	
}); 

