var catalogueSignUpModule = (function () {
  var moduleVar = {};

  var postCodeData = [];

  var validateForm = function(e) {

    if (!e.hasClass('not-required')) {
      if (e.val().length < 1 || e.val() == 0) {
        e.addClass("invalid");
        e.next(".invalidAlert").removeClass("hidden");
      } else {
        e.removeClass("invalid");
        e.next(".invalidAlert").addClass("hidden");
      }

      if (e.attr("id") == "signUpEmail") {
        if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.val()) == false) {
          e.addClass("invalid");
          e.next(".invalidAlert").removeClass("hidden");
        }
      }

      if(e.hasClass("invalid")) {
        console.log(e);
      }
    }
  }

  var findPostcode = function(key, searchTerm, preferredLanguage, filter, userName) {
    $.getJSON("https://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/Find/v1.10/json3.ws?callback=?", {
      Key: key,
      SearchTerm: searchTerm,
      PreferredLanguage: preferredLanguage,
      Filter: filter,
      UserName: userName
    }, function(data) {
      // Test for an error
      if (data.Items.length == 1 && typeof(data.Items[0].Error) != "undefined") {
        // Show the error message
        $(".noresults").removeClass("hidden");
      } else {
        // Check if there were any items found
        if (data.Items.length == 0) {
          //console.log("Sorry, there were no results");
          $(".noresults").removeClass("hidden");
          $('#selectAddress, #selectAddressWrapper').addClass('hidden');
        } else {
          //console.log(data);
          postCodeData = data.Items;
          $('#selectAddress').html('');
          $(".noresults").addClass("hidden");

          /*$('#selectAddress').append("<option value='0'>Please select</option>");
          for (var i = 0; i < data.Items.length; i++) {
            var newOption = $('<option value="' + (i + 1) + '">' + data.Items[i].StreetAddress + '</option>');
            $('#selectAddress').append(newOption);
          }*/

          $("#manualAddress").hide();

          for (var i = 0; i < data.Items.length; i++) {
            var newOption = $('<span data-index="'+i+'">' + data.Items[i].StreetAddress + ", " + data.Items[i].Place+ '</span>');
            $('#selectAddress').append(newOption);
          }

          $('#selectAddressWrapper').removeClass('hidden')
          $('#selectAddress').removeClass('hidden').focus();

          $('#selectAddress span').click(function() {
            var thisData = postCodeData[$(this).data("index")];
            $("#yourAddress").html($(this).html());
            findAddressById("FU43-NY28-TA13-EH87", thisData.Id, "English", "None", "FRENC11122");        
          });
        }
      }
    });
  }

  var findAddressById = function(key, id, preferredLanguage, userName) {
    $.getJSON("https://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/RetrieveById/v1.30/json3.ws?callback=?", {
      Key: key,
      Id: id,
      PreferredLanguage: preferredLanguage,
      UserName: userName
    },
    function(data) {
      // Test for an error
      if (data.Items.length == 1 && typeof(data.Items[0].Error) != "undefined") {
        // Show the error message
        //console.log(data.Items[0].Description);
      } else {
        // Check if there were any items found
        if (data.Items.length == 0) {
          //console.log("Sorry, there were no results for ID");
        }else {
          $('#signUpBuildingNo').val(data.Items[0].Company);
          $('#signUpAddressOne').val(data.Items[0].Line1);
          $('#signUpAddressTwo').val(data.Items[0].Line2);
          $('#signUpTown').val(data.Items[0].PostTown);
          $('#signUpCounty').val(data.Items[0].County);
          for (var i = 0; i < $('.details-three input').length; i++) {
            validateForm($($('.details-three input')[i]));
          }
          $("#selectAddress, #catalogueFindPostcode, #selectAddressWrapper").hide();
          $("#yourAddressWrapper").show();
        }
      }
    });
  }
  $(document).ready(function() {


    // Set up add to bag 
    if ($.fn.addtobasket) {
      $(".add-to-bag").addtobasket({
        selectedProductArrayBuilder: function() {
          var productsToAdd = [];
          if ($("#catalogueWomen").is(":checked")) {
            productsToAdd.push({
              productid: "6CBTW",
              sku: "6CBTWNONEOS",
              quantity: 1,
              productDisplayName: "",
              productCategory: "",
              price: ""
            });
          }
          if ($("#catalogueMen").is(":checked")) {
            productsToAdd.push({
              productid: "6CBTM",
              sku: "6CBTMNONEOS",
              quantity: 1,
              productDisplayName: "",
              productCategory: "",
              price: ""
            });
          }
          return productsToAdd;
        },
        validateBeforeAdd: function() {
          $("#registerSignUp select, #registerSignUp input").each(function() {
            validateForm($(this));
          });

          var catalogueErrors = 0;
          var nothingTicked = false;
          $(".catalogue-choices input[type='checkbox']").each(function() {
            if($(this).is(':checked') == false) {
              catalogueErrors++;
            }
          });
          if (catalogueErrors == $(".catalogue-choices input[type='checkbox']").length) {
            nothingTicked = true;
            $(".catalogue-choices .invalidAlert").removeClass("hidden");
          } else {
            $(".catalogue-choices .invalidAlert").addClass("hidden");
          }
          if ($('#registerSignUp .invalid').length === 0 && nothingTicked == false) {
            $(".ajaxLoader").show();
            $("#catalogue-added-to-bag").hide();
            return true;
          }
        },
        addToBasketFailedHandler: function() {
          $(".ajaxLoader").hide();
          $("#catalogue-added-to-bag").text("There was a problem adding the selected catalogue(s) to your basket. Please try again").show();
        },
        addToBasketSuccessHandler: function() {
          $(".ajaxLoader").hide();
          if (miniBasket) {
            miniBasket.data('tcplMinibasket').refreshBasket();
          }
          $("#catalogue-added-to-bag").text("Selected catalogue(s) have been added to your bag").show();
        }
      });
    }

    // Hide add to bag option if in sale
    if (typeof toast_config !== "undefined" && toast_config.grand_sale === true) {
      $("#catalogue-added-to-bag").show().text("We do not ship catalogues during sale periods. Please check back soon to order next season's book");
      $("#catalogueAddToBag").hide();
    }

    $(".catalogue-option").change(function() {
      if ($(".catalogue-option:checked").length > 0) {
        $("#registerSignUp").show();
        setTimeout(function() {
          $("#registerSignUp").addClass("fadeIn");     
        },1);
      } else {
        $("#registerSignUp").hide().removeClass("fadeIn")        
      }
      if ($("#catalogueBoth").is(":checked")) {
        $("#catalogueWomen, #catalogueMen").attr("checked", "checked");
      }
    });

    $("#signUpCountry").change(function() {
      if ($(this).val().toLowerCase() === "gb" || $(this).val().toLowerCase() === "gg" || $(this).val().toLowerCase() === "je") {
        $("#ukAddressFields").show();
        $("#signUpPostcode, #signUpAddressOne, #signUpTown, #signUpCounty").removeClass("not-required");
        $("#internationalSubmit").addClass("hidden");
        $("#ukSubmit").removeClass("hidden");
      } else {
        $("#ukAddressFields").hide();
        $("#signUpPostcode, #signUpAddressOne, #signUpTown, #signUpCounty").addClass("not-required");
        $("#internationalSubmit").removeClass("hidden");
        $("#ukSubmit").addClass("hidden");
      }
    });

    $("#manualAddress, #changeAddress").click(function(e) {
      e.preventDefault();
      $(".addressWrapper").append($("label[for=signUpPostcode]")).append($("#signUpPostcode")).append($(".details-two .mandatory"));
      $(".addressWrapper").show();
      $("#yourAddressWrapper, #catalogueFindPostcode, #manualAddress").hide();
    });

    $("#lookbookLink").attr("href", $(".lookbook.nav-option a").attr("href"));

    $("#lookbookLink").click(function() {
      //console.log("Catalogue Online Lookbook");
      if (typeof(_gaq) !== "undefined") {
        _gaq.push(['_trackEvent', "Catalogue Online Lookbook", "Click", "Catalogue Online Lookbook"]);
      }
    });

    $("#newsletterLink").click(function() {
      //console.log("Newsletter Catalogue Click");
      if (typeof(_gaq) !== "undefined") {
        _gaq.push(['_trackEvent', "Catalogue Newsletter Link", "Click", "Catalogue Newsletter Link"]);    
      }
    });  

    $("#download-pdf-catalogue a").click(function() {
      var season = $(this).text();
      season = season.split(" -");
      season = season[0];
      //console.log("Catalogue PDF Download Click", season);
      if (typeof(_gaq) !== "undefined") {
        _gaq.push(['_trackEvent', 'Catalogue PDF Download', "Click", season]);
      }
    });

    if($("html").hasClass("lt-ie9")) {
      $(".checkhack").hide();
      $("input").each(function() {
        if ($(this).attr("type") == "checkbox") {
          $(this).show();
          $(this).css("visibility","visible");
        }
      });
    }  
    $('#registerSignUp input[type=text]').keypress(function(e) {
      console.log("tpy")
      $("#catalogueFindPostcode").trigger("click");
    });


    $('#signUpPostcode input[type=text]').keypress(function(e) {
      
        e.stopPropagation();
        e.preventDefault();
        $("#catalogueFindPostcode").trigger("click");
    
    });

     $('#signUpPostcode input[type=text]').focusout(function() {
    
     $("#catalogueFindPostcode").trigger("click");
  })


    $('#registerSignUp input[type=text]').keydown(function(e) {
      if (e.which == 13) {
        e.stopPropagation();
        e.preventDefault();
      }
    });
    $('#registerSignUp input[type=text]').keyup(function(e) {
      // If Enter do something
      if (e.which == 13 && $(this).attr('id') == "signUpPostcode") {
        e.stopPropagation();
        $("#catalogueFindPostcode").trigger("click");
      }
    });
    $('#catalogueFindPostcode').click(function(e) {
      e.preventDefault();
      //console.log("Catalogue Find Postcode Click");
      if (typeof(_gaq) !== "undefined") {
        _gaq.push(['_trackEvent', 'Catalogue Find Postcode', "Click", "Catalogue Find Postcode"]);
      }
      if ($('#signUpPostcode').val().length > 0)
        findPostcode("FU43-NY28-TA13-EH87", $('#signUpPostcode').val(), "English", "None", "FRENC11122");
    });

    $("#registerSignUp input, #registerSignUp select").focusout(function() {
      validateForm($(this));
    });

    $("#registerSignUp select").change(function() {
      if ($(this).val() != 0) {
        $(this).removeClass("invalid");
        $(this).next(".invalidAlert").addClass("hidden");
      }
    });

    var $signUpTitle = $('#signUpTitle');
    var $signUpForename = $('#signUpForename');
    var $signUpSurname = $('#signUpSurname');
    var $signUpEmail = $('#signUpEmail');
    var $signUpBuildingNo = $('#signUpBuildingNo');
    var $signUpPostcode = $('#signUpPostcode');
    var $signUpAddressOne = $('#signUpAddressOne');
    var $signUpAddressTwo = $('#signUpAddressTwo');
    var $signUpTown = $('#signUpTown');
    var $signUpCounty = $('#signUpCounty');
    var $signUpCountry = $('#signUpCountry');
    var $newsletterCheckBox = $('#signUpOptIn');
    var $catalogueWomen = $('#catalogueWomen');
    var $catalogueMen = $('#catalogueMen');
    
    $('#catalogueSignUpSubmit').click(function(e) {
      e.preventDefault();

      $("#registerSignUp select, #registerSignUp input").each(function() {
        validateForm($(this));
      });

      var catalogueErrors = 0;
      var nothingTicked = false;
      $(".catalogue-choices input[type='checkbox']").each(function() {
        if($(this).is(':checked') == false) {
          catalogueErrors++;
        }
      });
      if (catalogueErrors == $(".catalogue-choices input[type='checkbox']").length) {
        nothingTicked = true;
        $(".catalogue-choices .invalidAlert").removeClass("hidden");
      } else {
        $(".catalogue-choices .invalidAlert").addClass("hidden");
      }

      var womenCatCode = $catalogueWomen.val();
      var menCatCode = $catalogueMen.val();

      var cataloguesArray = [];
      var womenJsonData;
      var menJsonData;
      if (String($catalogueWomen.is(':checked')) == "true") {
        womenJsonData = {
            "userDetails": 
            {
              "title": $signUpTitle.val(),
              "firstName": $signUpForename.val(),
              "lastName": $signUpSurname.val(),
              "email": $signUpEmail.val(),
              "postCode": $signUpPostcode.val(),
              "buildingNameOrNumber": $signUpBuildingNo.val(),
              "addressOne": $signUpAddressOne.val(),
              "addressTwo": $signUpAddressTwo.val(),
              "town": $signUpTown.val(),
              "county": $signUpCounty.val(),
              "catalogueChosen": {},
              "ThirdPartyOptIn": true
            }
          };
        
        womenJsonData.userDetails.catalogueChosen[womenCatCode] = String($catalogueWomen.is(':checked'))
        cataloguesArray.push(womenJsonData);
      }
      if (String($catalogueMen.is(':checked')) == "true") {
        menJsonData = {
            "userDetails": 
            {
              "title": $signUpTitle.val(),
              "firstName": $signUpForename.val(),
              "lastName": $signUpSurname.val(),
              "email": $signUpEmail.val(),
              "postCode": $signUpPostcode.val(),
              "buildingNameOrNumber": $signUpBuildingNo.val(),
              "addressOne": $signUpAddressOne.val(),
              "addressTwo": $signUpAddressTwo.val(),
              "town": $signUpTown.val(),
              "county": $signUpCounty.val(),
              "catalogueChosen": {},
              "ThirdPartyOptIn": false
            }
          };
        menJsonData.userDetails.catalogueChosen[menCatCode] = String($catalogueMen.is(':checked'))
        cataloguesArray.push(menJsonData);
      }

      if ($('#registerSignUp .invalid').length === 0 && nothingTicked == false) {
        $(".ajaxLoader").show();
        $("#catalogueSignUpSubmit").hide();

        for(var i=0;i<cataloguesArray.length;i++) {
          $.ajax({
            type: "POST",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            url: "/services/CatalogueSignupService.asmx/Subscribe",
            dataType: "json",
            data: JSON.stringify(cataloguesArray[i]),
            success: function (data) {
            }
          }).fail(function(jqXHR, textStatus, errorThrown ) {
            //console.log(jqXHR, textStatus, errorThrown);
          });
        }

        //console.log($catalogueWomen.val());
       
        var params = {
          method: '/user/create',
          queryNames: ['email'],
          queryValues: [$signUpEmail.val()],            
          attributeValues: [$signUpTitle.val(), $signUpForename.val(), $signUpSurname.val(), $signUpEmail.val(), $signUpBuildingNo.val() + " " + $signUpAddressOne.val(), $signUpAddressTwo.val(), $signUpPostcode.val(), $signUpTown.val(), $signUpCounty.val(), $signUpCountry.val(), true, $newsletterCheckBox.is(':checked'), $newsletterCheckBox.is(':checked'), true, $catalogueWomen.is(':checked'), false, $catalogueMen.is(':checked'), true],
          attributeNames: ["user.CustomAttribute.Title", "FirstName", "LastName", "Email", "AddressLine1", "AddressLine2", "Postcode", "AddressLine3", "AddressLine4", "BillingCountry", "CatalogueOptIn", "user.CustomAttribute.PC_BookLaunch", "user.CustomAttribute.PC_Weekly", "user.CustomAttribute.RealTime", "user.CustomAttribute.WomenCatalogueOptIn", "user.CustomAttribute.HHCatalogueOptIn", "user.CustomAttribute.MenCatalogueOptIn", "user.CustomAttribute.CatalogueEmailSignUp"],
          httpVerb: 'post'
        };
        $.ajax({
          url: '/services/ecrelay.asmx/Relay',
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(params),
          dataType: 'json',
          success: function(data, status) {
            var thisData = $.parseJSON(data.d);
            //console.log(thisData);
            if (data.d.indexOf("OBJECT_ALREADY_EXISTS") > 0) {
              var updateParams = {
                method: '/user/updateProfileByEmail',
                queryNames: ['email'],
                queryValues: [$signUpEmail.val()],
                attributeValues: [$signUpTitle.val(), $signUpForename.val(), $signUpSurname.val(), $signUpEmail.val(), $signUpBuildingNo.val() + " " + $signUpAddressOne.val(), $signUpAddressTwo.val(), $signUpPostcode.val(), $signUpTown.val(), $signUpCounty.val(), $signUpCountry.val(), true, $newsletterCheckBox.is(':checked'), $newsletterCheckBox.is(':checked'), true, $catalogueWomen.is(':checked'), false, $catalogueMen.is(':checked'), true],
                attributeNames: ["user.CustomAttribute.Title", "FirstName", "LastName", "Email", "AddressLine1", "AddressLine2", "Postcode", "AddressLine3", "AddressLine4", "BillingCountry", "CatalogueOptIn", "user.CustomAttribute.PC_BookLaunch", "user.CustomAttribute.PC_Weekly", "user.CustomAttribute.RealTime", "user.CustomAttribute.WomenCatalogueOptIn", "user.CustomAttribute.HHCatalogueOptIn", "user.CustomAttribute.MenCatalogueOptIn", "user.CustomAttribute.CatalogueEmailSignUp"],
                httpVerb: 'post'
              };
              $.ajax({
                url: '/services/ecrelay.asmx/Relay',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(updateParams),
                dataType: 'json',
                success: function(data, status) {
                  var thisData = $.parseJSON(data.d);

                  $("#registerSignUp, .registerDescription, .catalogue-choices, .ajaxLoader, .registerHeader").hide();
                  $("#thankYouMessage, #latestCollections").show();

                  $("html,body").animate({
                    scrollTop: 0
                  });

                  if (typeof(_gaq) !== "undefined") {
                    _gaq.push(['_trackEvent', 'Catalogue Sign Up', "Submit", "Catalogue Sign Up"]);
                  }
                  // Change view to relay user exists and possibly direct to preference centre.
                }
              });
            } else {

              $("#registerSignUp, .registerDescription, .catalogue-choices, .ajaxLoader, .registerHeader").hide();
              $("#thankYouMessage, #latestCollections").show();

              $("html,body").animate({
                scrollTop: 0
              });

              if (typeof(_gaq) !== "undefined") {
                _gaq.push(['_trackEvent', 'Catalogue Sign Up', "Submit", "Catalogue Sign Up"]);
              }

              /*if ($newsletterCheckBox.is(':checked')) {
                var subscribeParams = {
                  method: '/membership/subscribeByEmail',
                  queryNames: ['email', 'groupId', 'subscriptionMode'],
                  queryValues: [$signUpEmail.val(), 750049776, 'OPT_IN'],
                  attributeValues: null,
                  attributeNames: null,
                  httpVerb: 'POST'
                };
                $.ajax({
                  url: '/services/ecrelay.asmx/Relay',
                  type: 'POST',
                  contentType: "application/json; charset=utf-8",
                  data: JSON.stringify(subscribeParams),
                  dataType: 'json',
                  success: function(data, status) {
                  var thisData = $.parseJSON(data.d);
                  //console.log("sub", thisData);
                    //console.log("Master group - SUBSCRIBE", data.d);
                    if (data.d.indexOf("NO_SUCH_OBJECT") > 0) {

                    } else {

                    }
                  }
                });
              }*/
            }
            var catSubscribeParams = {
              method: '/membership/subscribeByEmail',
              queryNames: ['email', 'groupId', 'subscriptionMode'],
              queryValues: [$signUpEmail.val(), 750303069, 'OPT_IN'],
              attributeValues: null,
              attributeNames: null,
              httpVerb: 'POST'
            };
            $.ajax({
              url: '/services/ecrelay.asmx/Relay',
              type: 'POST',
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(catSubscribeParams),
              dataType: 'json',
              success: function(data, status) {
              var thisData = $.parseJSON(data.d);
              //console.log("sub", thisData);
                //console.log("Master group - SUBSCRIBE", data.d);
                if (data.d.indexOf("NO_SUCH_OBJECT") > 0) {

                } else {

                }
              }
            });
          }
        });
      }
    });
  });

  return moduleVar;
}());
0
