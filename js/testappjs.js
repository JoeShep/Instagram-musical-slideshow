

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

	//***************** Instagram API ***************

	jQuery.fn.spectragram.accessData = {
	    accessToken: '22033045.ea9028a.eec94286a2e049429fe51c3fbc95db20',
	    clientID: 'c8852afd43f24157ab8e06c827d9e058'
	};

	// ****************** JWplayer / video setup ****************

	!function grabVideos(){
		$('.vidList').spectragram('getPopular',{
	    max: 20,
	    wrapEachWith: '<li></li>',
		});
	}();

	function addVideos(playlistL, playlistR){
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
      playlist: playlistL
     });
     jwplayer("vidDivR").setup({
     	controls: false,
      width: 470,
      height: 470,
      fallback: true,
      primary: "html5",
      mute: true,
      repeat: false,
      allowscriptaccess: "always",
      allownetworking: "all",
      playlist: playlistR
     });
   };
	

	//***************** UI functionality **************
	// *************** overlay play button ***********

	$('#big_play_btn').click(function(){
		instaFeed = $('.instaVid').map(function() {
    return $(this).attr("src");
    }).get();
    console.log(instaFeed.length);
    console.log(instaFeed[1]);

		var playlistL = [];
		var playlistR = [];
		for (var k=0; k<instaFeed.length; k=k+2) {
        var newItem = {
            file: instaFeed[(k)]
        }
        playlistL.push(newItem);
		}
		for (var k=1; k<instaFeed.length; k=k+2) {
        var newItem = {
            file: instaFeed[(k)]
        }
        playlistR.push(newItem);
		}
		addVideos(playlistL, playlistR);
		
		$('header').fadeOut("4000");
		$('footer').fadeOut("4000");
		$('#overlay').fadeOut("4000", function() { $(this).remove(); });
		$('#player_btns').delay("slow").fadeIn("slow", function() {
			$('#displayDiv').css('visibility','visible').hide().fadeIn('slow');		    
		  soundManager.play('kodachrome');
			jwplayer("vidDivR").play();
			jwplayer("vidDivL").play();
		}); //end fadeIn
	}); //end click

	// ******************* header nav *****************

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

	// ************* user controls *******************

	$('#play_btn').click(function(){		
		soundManager.play('kodachrome');
		jwplayer("vidDivL").play();
		jwplayer("vidDivR").play();
		// $(this).css({"border-bottom": "1px solid green","border-radius":"10px"});
	});

	$('#pause_btn').click(function(){
		soundManager.pause('kodachrome');
		jwplayer("vidDivL").pause();
		jwplayer("vidDivR").pause();
	});

	$('#stop_btn').click(function(){
		soundManager.stop('kodachrome');
		jwplayer("vidDivL").stop();
		jwplayer("vidDivR").stop();
		$("#progColor").css('width', '0');
	});

}); //end ready