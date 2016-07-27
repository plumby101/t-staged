
  $(document).ready(function() {
    $(".signup-tile input").val($(".signup-tile input").data("placeholder"));    

  });
  $(".signup-tile input").on("focus", function() {
    if ($(this).val() == $(this).data("placeholder")) {
      $(this).val("");
    }
  });
  $(".signup-tile input").on("focusout", function() {
    if ($(this).val() == "") {
      $(this).val($(this).data("placeholder"));
    }  
  });
  $(".signup-tile input").keydown(function(e) {
      if(e.which == 13){
        e.preventDefault();
        e.stopPropagation();
        $('.signup-tile button').trigger("click");        
      }
  });  
  $('.signup-tile button').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.signup-message').removeClass("invalid-email").addClass('hidden');
    $('signup-tile input').removeClass('invalid-email');
    var emailAddress = $('.signup-tile input').val();
    var callbackFunction = function() {
      $(".signup-tile input, .signup-tile button").addClass("hidden");
      $('.signup-message').html('Thank you for signing up for TOAST newsletters').removeClass("hidden");
      _gaq.push(['_trackEvent', 'Sign Up Landing Page', "Click", "Homepage"]);
    }
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailAddress) == true) {
        mainModule.signUpEmail(emailAddress, [true, true], ["NewsletterOptIn", "user.CustomAttribute.RealTime"], callbackFunction); 
    } else {
      $('.signup-message').removeClass('hidden').addClass('invalid-email');
      $('signup-tile input').addClass('invalid-email');
  _gaq.push(['_trackEvent', 'Sign Up Landing Page Error', "Click", "Homepage"]);
    }
  });   