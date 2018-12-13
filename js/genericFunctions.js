// WEBSITE LOCATION FROM ROOT
// Change it with the path in which the website home page is located within the root domain
var path = "";


// GENERATE HEAD
// Requires: nothing (maybe in future will be required the browser tab title)
function createHead() {
  var start = ["<meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0'><meta name='ROBOTS' content='INDEX,FOLLOW'><meta name='GOOGLEBOT' content='ARCHIVE'><link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>"];
  var css2 = ["<link rel='stylesheet' href='css/default.css' />"]
  var css3 = ["<link rel='stylesheet' href='css/slider.css'>"];
  var css4 = ["<link rel='stylesheet' href='css/sweetalert2_mine.css'>"];
  var css5 = ["<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css'>"];
  var favicon = ["<link rel='shortcut icon' type='image/png' href='/img/favicon_hd.png'/>"];
  var title = ["<title>Title of the page</title>"];
  var headfull = start.concat(css2,css3,css4,css5,favicon,title);
  $('head').append(headfull);
}


// LOADING PROCESS
// Requires:
function loadingProcess(loader, IDcontent) {
  window.onload = function() {
    setInterval(function() {
      $(loader).fadeOut();
      // $(IDcontent).fadeTo("slow", 1);
      $(IDcontent).attr("style", "opacity:1");
      // $(IDcontent).removeClass('hidden');
    }, 950);
  }

}


// DIV APPEARING USING ANIMATE.CSS
// Requires: id to be animated, animate.css class, offset to start the animation
function divAppear(divID, animID, offsetID) {
  $('' + divID).css('opacity', 0);
  $('' + divID).waypoint(function() {
    $('' + divID).addClass('' + animID);
  }, {
    offset: '' + offsetID
  });
}


// ENABLE SCROLL TO TOP BUTTON
// Requires: nothing (maybe in future will be required the scroll speed and the offset where to show scroll to top button)
function scrollToTop(){
  $(window).scroll(function() {
      if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
          $('#to-top').fadeIn(200);    // Fade in the arrow
          // console.log("compare");
      } else {
          $('#to-top').fadeOut(200);   // Else fade out the arrow
          // console.log("scompare");
      }
  });
  $('#to-top').click(function() {      // When arrow is clicked
    // console.log("pressed");
      $('html,body').animate({
          scrollTop : 0                       // Scroll to top of body
      }, 0);
  });
}


// GET URL PARAMETERS
// Requires: parameter name
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
