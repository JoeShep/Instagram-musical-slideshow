

$(document).ready(function(){

	

	//***************** on first page load *************** 
	$('#intro_text1, header').delay(500).fadeIn(1200);
	$('#title_text').delay(1800).fadeIn(1200);
	$('#intro_text2').delay(2800).fadeIn(1200);
	$('#big_play_btn, footer').delay(3800).fadeIn(1200);
	// var playState = false;
	var instaFeed = [];


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

	// ****************** JWplayer / video setup ****************

	//***************** Instagram API ***************

	jQuery.fn.spectragram.accessData = {
	    accessToken: '22033045.ea9028a.eec94286a2e049429fe51c3fbc95db20',
	    clientID: 'c8852afd43f24157ab8e06c827d9e058'
	};

	!function grabVideos(){
		$('.vidList').spectragram('getPopular',{
	    max: 20,
	    wrapEachWith: '<li></li>',
		});
	}();

	function addVideos(playlist){
		console.log(playlist.length);
		jwplayer("vidDivL").setup({
      controls: false,
      width: 470,
      height: 470,
      fallback: true,
      primary: "html5",
      mute: true,
      repeat: false,
      allowscriptaccess: "always",
      allownetworking: "all",
      playlist: playlist
      });
		};


	//***************** UI functionality **************

	$('#big_play_btn').click(function(){
		instaFeed = $('.instaVid').map(function() {
    return $(this).attr("src");
    }).get();
    console.log(instaFeed.length);
    console.log(instaFeed[0]);

		var playlist = [];
		for (var k=0; k<instaFeed.length; k++) {
        var newItem = {
            file: instaFeed[(k)]
        }
        playlist.push(newItem);
		}
		// jwplayer().load(playlist);
		// var vidUrl = 'http://distilleryimage7.s3.amazonaws.com/e591ae7215a411e3a3d522000a9f13e2_102.mp4';
		addVideos(playlist);
		// playState = true;
		$('header').fadeOut("4000");
		$('footer').fadeOut("4000");
		$('#overlay').fadeOut("4000", function() { $(this).remove(); });
		$('#player_btns').delay("slow").fadeIn("slow", function() {
			$('#displayDiv').css('visibility','visible').hide().fadeIn('slow');		    
		  soundManager.play('kodachrome');
			jwplayer("vidDivL").play();
		}); //end fadeIn
	}); //end click

	$('#about').hover(
		function(){
			$(this).addClass("bordered");
		},
		function(){
			$(this).removeClass("bordered");
		}
	);

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