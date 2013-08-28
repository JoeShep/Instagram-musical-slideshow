

$(document).ready(function(){

	//***************** Instagram API plugin stuff ***************

	jQuery.fn.spectragram.accessData = {
	    accessToken: '22033045.ea9028a.eec94286a2e049429fe51c3fbc95db20',
	    clientID: 'c8852afd43f24157ab8e06c827d9e058'
	};

	$('.photoList').spectragram('getRecentTagged',{
    query: 'love',
    max: 40,
    wrapEachWith: '<li class="instaMedia"></li>',
	});

	$('#big_play_btn').click(function(){
		$('#overlay').fadeOut("4000", function() { $(this).remove(); });
		$('#player_btns').delay("slow").fadeIn("slow", function() {
		$('#displayDiv').css('visibility','visible').hide().fadeIn('slow');
		  var index = 0;
		  var instaFeed = $('.instaMedia');

		  var doNext = function() { 
		  	$('#photoDivL').empty().append(instaFeed.eq(index));
		  	$('#photoDivR').empty().append(instaFeed.eq(index + 1));
		    index+=2;
		    if (index >= instaFeed.length) index = 0;
		  };
		  doNext();
		  setInterval(doNext, 8000);
		  soundManager.play('kodachrome');
	});
});
	
	//******************* Music playback plugin stuff ************
	soundManager.setup({

	  // location: path to SWF files, as needed (SWF file name is appended later.)

	  url: 'swf/',

	  onready: function() {
	    soundManager.createSound({
		      id: 'kodachrome',
		      url: 'audio/Kodachrome.mp3'
		      // other options here..
		    });
	  },

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