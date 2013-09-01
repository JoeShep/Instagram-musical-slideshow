

$(document).ready(function(){

	//***************** on first page load *************** 
	$('#intro_text1, header').delay(500).fadeIn(1200);
	$('#title_text').delay(1800).fadeIn(1200);
	$('#intro_text2').delay(2800).fadeIn(1200);
	$('#big_play_btn, footer').delay(3800).fadeIn(1200);


	//***************** Facebook "Like" *******************
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	//***************** Twitter "Share" *****************
	!function(d,s,id){
		var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
		if(!d.getElementById(id)){
				js=d.createElement(s);
				js.id=id;
				js.src=p+'://platform.twitter.com/widgets.js';
				fjs.parentNode.insertBefore(js,fjs);
			}
		}(document, 'script', 'twitter-wjs');

	//***************** Instagram API ***************

	jQuery.fn.spectragram.accessData = {
	    accessToken: '22033045.ea9028a.eec94286a2e049429fe51c3fbc95db20',
	    clientID: 'c8852afd43f24157ab8e06c827d9e058'
	};

	!function grabVideos(){
		$('.photoList').spectragram('getPopular',{
	    max: 40,
	    wrapEachWith: '<li class="instaVid"></li>',
		});
	}();

	// ****************** JWplayer / video setup ****************
	var instaFeed = $('.instaVid');
	jwplayer("vidDivL").setup({
	file: '/some/summy/file.mp4',
	controls: false,
	width: 470,
	height: 470,
	fallback: true,
	primary: "flash",
	mute: true,
	repeat: false,
	allowscriptaccess: "always",
	allownetworking: "all"
});

	//***************** UI functionality **************

	$('#big_play_btn').click(function(){
		$('header').fadeOut("4000");
		$('footer').fadeOut("4000");
		$('#overlay').fadeOut("4000", function() { $(this).remove(); });
		$('#player_btns').delay("slow").fadeIn("slow", function() {
			$('#displayDiv').css('visibility','visible').hide().fadeIn('slow');

			
			// var slideshow = null;
		  // var index = 0;
		  // var doNext = function() { 
		  // 	$('#vidDivL').empty().append(instaFeed.eq(index)).hide().fadeIn(1500);
		  // 	$('#vidDivR').empty().append(instaFeed.eq(index + 1)).hide().fadeIn(1500);
		  //   index+=2;
		  //   if (index >= instaFeed.length) {index = 0};
		  // };	
		  // doNext();
		    
		  soundManager.play('kodachrome');

		  function start() {  
        slideshow = setInterval(doNext, 9000);
    	};

			function stop() {
        clearInterval(slideshow);
    	};

			$('#play_btn').bind("click", start); 
    	$('#stop_btn, #pause_btn').bind("click", stop);
    	start();
		});
	});

	$('#about').hover(
		function(){
			$(this).addClass("bordered");
		},
		function(){
			$(this).removeClass("bordered");
		}
	);3

	$('#add-vid').hover(
		function(){
			$(this).addClass("bordered");
		},
		function(){
			$(this).removeClass("bordered");
		}
	);
	
	//******************* Music playback ************
	soundManager.setup({
	  // location: path to SWF files, as needed (SWF file name is appended later.)
	  url: 'swf/',

	  onready: function() {
	    soundManager.createSound({
	      id: 'kodachrome',
	      url: 'audio/Kodachrome.mp3',
	      whileplaying: function() {
  			$("#progColor").css('width', ((this.position/this.duration) * 100) + '%')
		    },
		    onfinish: function() {
        $("#progColor").css('width', '0');
        }
	    });
	  },

	  ontimeout: function() {
	    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
	    // See the flashblock demo when you want to start getting fancy.
  	}
	});	

	$('#play_btn').click(function(){		
		soundManager.play('kodachrome');
		// $(this).css({"border-bottom": "1px solid green","border-radius":"10px"});
	});

	$('#pause_btn').click(function(){
		soundManager.pause('kodachrome');
	});

	$('#stop_btn').click(function(){
		soundManager.stop('kodachrome');
		$("#progColor").css('width', '0');
	});

}); //end ready