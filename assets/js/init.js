
// Open external links in a new window
$("a[href^='http:'], a[href^='https:']").attr('target','_blank');



// Slideshow
$("#slides").cycle();
$("#quotes").cycle();
$("#quotes-award").cycle();


// Toggle mailing list form
$("#btn-join-mailing-list").toggle(function() {
    $("#mailing-list").show();
}, function() {
    $("#mailing-list").hide();
})



// Close mailing list
$("#close, #close-elist").click(function(){
    $("#btn-join-mailing-list").trigger("click");
    $("#confirmation").hide();
    $("#elist-form").show();
})


// Overlay css
$("#overlay").css({
    "opacity": "0.1"
})

// Bio overlay
$("#bio-list a").click( function(e) {
    $("#bio, #overlay").fadeIn("slow");
    $("#bio .content").load(this.href, function(){
        $("#bio-txt").jScrollPane({
            "verticalDragMinHeight": 40
        });
    });
    $("#bio .content").scrollTo(0);
    e.preventDefault();
})


// Close bio overlay
$("#overlay").click( function() {
    $("#bio, #overlay").fadeOut("slow");
})


// Buy album overlay
$("#btn-buy-soundtrack").click(function(e){
    $("#overlay").fadeIn("slow");
    $("#buy-album-overlay")
        .fadeIn("slow")
        .center({
            vertical: false,
            onresize: false
        });
    e.preventDefault();
})

// Close album overlay
$("#close-album, #overlay").click(function(){
    $("#buy-album-overlay, #overlay").hide();
})


// Highlight current page in nav
/*
$("#nav ul li a").each(function() {
    if(location.href.match(this.href)) {
        $(this).addClass("active");
    }
});
*/



// Custom scrollbars
$(window).load(function(){
    $(".scrollpane").jScrollPane({
        "verticalDragMinHeight": 40
    });
})


// Switch galleries
$("#btn-photos a").click(function(e){
    $("#btn-video a").removeClass();
    $(this).addClass("active-gallery")
    $("#video-gallery").hide();
    $("#photo-gallery").show();
    $("#load-video-object").empty();
    e.preventDefault();
})

$("#btn-video a").click(function(e){
    $("#btn-photos a").removeClass();
    $(this).addClass("active-gallery")
    $("#video-gallery").show();
    $("#photo-gallery").hide();
    e.preventDefault();
})


// Image gallery
// Galleria.loadTheme('themes/classic/galleria.classic.js');
/*
$("#photo-gallery").galleria({
    image_crop: true,
    width: 578,
    height: 420
});
*/


// Video gallery
$("#video-gallery ul li a").click(function(e){
    $("#video-gallery ul li a").removeClass();
    //$(this).addClass("active-video")
    e.preventDefault();
    
    var file = this.href;
    
    $("#video").append('<div id="load-video-object">')
    
    //$("#video, #overlay").show();
    
    
    var so = new SWFObject('player/player.swf','mpl','556','305','9');
    so.addParam('allowfullscreen','true');
    so.addParam('allowscriptaccess','always');
    so.addParam('wmode','opaque');
    so.addVariable('file', file);
    so.addVariable('skin','player/glow.xml');
    so.addVariable('controlbar','over');
    so.addVariable('dock','false');
    so.addVariable('autostart','true');
    so.addVariable('repeat','always');
    so.write('load-video-object');
    
});


// Show video titles
$("#video-gallery ul li a").hover(function (){
    $(this).next().show()
}, function() {
    $(this).next().hide()
})




/*  Submit e-list form via ajax
------------------------------------------------------------------------ */

// Check for valid email
function checkEmail(email) { 
  var pattern = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var emailVal = $("#" + email).val();
  return pattern.test(emailVal);
}

// Sumbit e-list sign-up via ajax
$("#elist-form input:image").click(function() { 
  
  // First, disable the form from submitting
  $('form#elist-form').submit(function() { return false; });
  
  // Grab form action
  var formAction = $("form#elist-form").attr("action");
  
  // Hacking together id for email field
  // Replace the xxxxx below:
  // If your form action were http://mysiteaddress.createsend.com/t/r/s/abcde/, then you'd enter "abcde" below
  var id = "ujkrdk";
  var emailId = id + "-" + id;
  // Validate email address with regex
  if (!checkEmail(emailId)) {
    alert("Please enter a valid email address");
    return;
  }
  
  // Serialize form values to be submitted with POST
  var str = $("form#elist-form").serialize();
  
  // Add form action to end of serialized data
  // CDATA is used to avoid validation errors
  //<![CDATA[
  var serialized = str + "&action=" + formAction;
  // ]]>
  
  // Submit the form via ajax
  $.ajax({
    url: "php/proxy.php",
    type: "POST",
    data: serialized,
    success: function(data){
      // Server-side validation
      if (data.search(/invalid/i) != -1) {
        alert('The email address you supplied is invalid and needs to be fixed before you can subscribe to this list.');
      }
      else
      {
        $("#elist-form").hide(); // If successfully submitted hides the form
        $("#confirmation").fadeIn("slow");  // Shows "Thanks for subscribing" div
        $("#confirmation").tabIndex = -1;
        $("#confirmation").focus(); // For screen reader accessibility
        // Fire off Google Analytics fake pageview
        //var pageTracker = _gat._getTracker("UA-XXXXX-X");
        //pageTracker._trackPageview("/newsletter_signup");
      }
    }
  });
});


/*  Don't put anything below this line
------------------------------------------------------------------------ */
















