
$(document).ready(function () {
  var fadeControlsTimer = null;
  $(window).load(function() {
    //***************** on first page load *************** 
    $('#intro_text1').delay(500).hide().fadeIn('1200');
    $('#title_text').delay(1800).fadeIn(1200);
    $('#intro_text2').delay(2800).fadeIn(1200);
    $('#big_play_btn, footer').delay(3800).css('visibility', 'visible').hide().fadeIn('1200');
    $('.headerR').delay(3800).animate({opacity:1},1200);
    var instaFeed = []
    
  });

  //***************** Facebook "Like" *******************
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&status=0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  //***************** Twitter "Share" *****************
  ! function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = p + '://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }(document, 'script', 'twitter-wjs');

  //***************** Instagram API ***************

  jQuery.fn.spectragram.accessData = {
    accessToken: '22033045.ea9028a.eec94286a2e049429fe51c3fbc95db20',
    clientID: 'c8852afd43f24157ab8e06c827d9e058'
  };

  // ****************** JWplayer / video setup ****************

  ! function grabVideos() {
    $('.vidList').spectragram('getPopular', {
      max: 20,
      wrapEachWith: '<li></li>',
    });
  }();

  function addVideos(playlistL, playlistR) {
    jwplayer("vidDivL").setup({
      controls: false,
      width: 470,
      height: 470,
      fallback: true,
      primary: "html5",
      mute: true,
      repeat: true,
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
      repeat: true,
      allowscriptaccess: "always",
      allownetworking: "all",
      playlist: playlistR
    });
  };


  //***************** UI functionality **************
  // *************** overlay play button ***********

  $('#big_play_btn').click(function () {
    instaFeed = $('.instaVid').map(function () {
      return $(this).attr("src");
    }).get();
    console.log(instaFeed.length);
    console.log(instaFeed[1]);

    var playlistL = [];
    var playlistR = [];
    for (var k = 0; k < instaFeed.length; k = k + 2) {
      var newItem = {
        file: instaFeed[(k)]
      }
      playlistL.push(newItem);
    }
    for (var k = 1; k < instaFeed.length; k = k + 2) {
      var newItem = {
        file: instaFeed[(k)]
      }
      playlistR.push(newItem);
    }
    addVideos(playlistL, playlistR);

    $('footer').fadeOut("3000");
    $('#overlay').fadeOut("3000", function () {
      $(this).remove();
    });
    $('#pause_btn').animate({opacity:1}, 4000); 
    $('#player_btns').delay('3000').animate({opacity:1}, function () {
      $('#displayDiv').css('visibility', 'visible')
        .hide().fadeIn('4000');
      soundManager.play('kodachrome');
      $('#vidDivL, #vidDivR').addClass('player-screen');
      jwplayer("vidDivR").play();
      jwplayer("vidDivL").play();
      setMouseTrigger();
    }); //end fadeIn
  }); //end click

  // ******************* header nav *****************

  $('#about-link').hover(
    function () {
      $(this).addClass("bordered");
    },
    function () {
      $(this).removeClass("bordered");
    }
  ).click(function(){
    wait = setTimeout( function() {
        $('#addVidModal, #hAdd').hide();
        $('#hAbout').show();
      },100);
  });

  $('#add-vid').hover(
    function () {
      $(this).addClass("bordered");
    },
    function () {
      $(this).removeClass("bordered");
    }
  ).click(function(){
      wait = setTimeout( function() {
        $('#aboutModal, #hAbout').hide();
        $('#hAdd').show();
      },100);
  });

  //******************* Music playback ************

  soundManager.setup({
    // location: path to SWF files, as needed (SWF file name is appended later.)
    url: 'swf/',

    onready: function () {
      soundManager.createSound({
        id: 'kodachrome',
        url: 'audio/Kodachrome.mp3',
        whileplaying: function () {
          $("#progColor").css('width', ((this.position / this.duration) *
            100) + '%')
        },
        onfinish: function () {
          $("#progColor").css('width', '0');
        }
      });
    },

    ontimeout: function () {
      // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
      // See the flashblock demo when you want to start getting fancy.
    }
  });

  // ************* user controls *******************

  $('#play_btn').click(function () {
    soundManager.play('kodachrome');
    jwplayer("vidDivL").play();
    jwplayer("vidDivR").play();
    $('#play_btn').animate({opacity:0}, 500).addClass('removed');
    $('#pause_btn').animate({opacity:1}, 500).removeClass('removed');
    setMouseTrigger();
  });

  $('#pause_btn').click(function () {
    soundManager.pause('kodachrome');
    jwplayer("vidDivL").pause();
    jwplayer("vidDivR").pause();
    $('#pause_btn').animate({opacity:0}, 500).addClass('removed');
    $('#play_btn').animate({opacity:1}, 500).removeClass('removed');
    undoMouseTrigger();
  });

  function setMouseTrigger(){
    var controls = $('#player_btns, .headerR, .nav');
    controls.delay(1000).animate({opacity:0},1500);
    $(document).on('mousemove', function() {
      controls.finish();
      controls.animate({opacity:1},500);
      clearTimeout(fadeControlsTimer);
      fadeControlsTimer = setTimeout(function(){
        controls.delay(100).animate({opacity:0}, 500);
      }, 2000);
    });
  };

  function undoMouseTrigger() {
    var controls = $('#player_btns, .headerR, .nav');
    controls.finish().fadeIn(1000);
    $(document).off('mousemove');
    window.clearTimeout(fadeControlsTimer);
    fadeControlsTimer = null;
  }

  
}); //end ready