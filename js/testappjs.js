

$(document).ready(function(){

	//***************** Instagram API plugin stuff ***************

	jQuery.fn.spectragram.accessData = {
	    accessToken: '22033045.ea9028a.eec94286a2e049429fe51c3fbc95db20',
	    clientID: 'c8852afd43f24157ab8e06c827d9e058'
	};

	$('.photoList').spectragram('getRecentTagged',{
    query: 'cats',
    max: 20,
    wrapEachWith: '<li class="instaMedia"></li>',
	});

	// function showPics(instaFeed){
	// 	$('.photoDivL').append(instaFeed[Math.floor(Math.random() * instaFeed.length)]);
	// }
	$('#big_play_btn').click(function(){
		$('#overlay').fadeOut("3000", function() { $(this).remove(); });
		$(function() {
	  var index = 0;
	  var instaFeed = $('.instaMedia')

	  var doNext = function() { 
	  	$('.photoDivL').empty().append(instaFeed.eq(index));
	    // increment the index - if it is beyond the number of li's - reset it to 0
	    if (++index >= instaFeed.length) index = 0;
	  };
	  doNext();
	  // set it up to be called every 8000 ms
	  setInterval(doNext, 8000);
	});
});
	
	// var slideshow = setInterval(function(){
	// 	$('.photoDivL').empty();
	// 	showPics();
	// }, 5000);

	//******************* Music playback plugin stuff ************
	soundManager.setup({

	  // location: path to SWF files, as needed (SWF file name is appended later.)

	  url: 'swf/',

	  // optional: version of SM2 flash audio API to use (8 or 9; default is 8 if omitted, OK for most use cases.)
	  // flashVersion: 9,

	  // optional: use 100% HTML5 mode where available
	  // preferFlash: false,

	  // use soundmanager2-nodebug-jsmin.js, or disable debug mode (enabled by default) after development/testing
	  // debugMode: false,

	  // good to go: the onready() callback

	  onready: function() {
	    soundManager.createSound({
		      id: 'kodachrome',
		      url: 'audio/Kodachrome.mp3'
		      // onload: function() { console.log('sound loaded!', this); }
		      // other options here..
		    });
	  },
	  // optional: ontimeout() callback for handling start-up failure

	  ontimeout: function() {

	    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
	    // See the flashblock demo when you want to start getting fancy.

  	}

	});	

	$('#play_btn').click(function(){		
		soundManager.play('kodachrome');
	});

	$('#pause_btn').click(function(){
		soundManager.pause('kodachrome');
	});

	$('#stop_btn').click(function(){
		soundManager.stop('kodachrome');
	});
	


}); //end ready