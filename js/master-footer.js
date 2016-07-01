/*$("body").prepend("<div class='marketing-message grid-100 tablet-grid-100 mobile-grid-100 grid-parent'>Customer Notice: Our site is undergoing scheduled maintenance today between 10:00 and 13:00 (GMT). Some site features may be affected. Thank you for your patience. </div>");
$(".marketing-message").css({textTransform: "none", height: "auto", lineHeight: "1.5em", padding: "5px"});*/

$('.buy-off-container #ctl00_globalMainContent_btnCheckout').attr('href', '/basket.htm');

// DOC READY SECTION - Page ready only scripts
$(document).ready(function() {
	if (typeof toast_config !== "undefined" && toast_config.in_sale === true) {
		$('.standard-pp').show();
	} else {
		$('.free-pp-and-returns').show();
	}

	showMeTheMoney();

	if($.cookie('preset_filters') === "")
		$.removeCookie('preset_filters');

	var forceFilters = getParameterByName('presetFilters').split('~');
	// If there is url params for filters it takes precedence	
	if(forceFilters.length > 0 && forceFilters[0] != ""){
		$.removeCookie('preset_filters');
		$.cookie('preset_filters', 'size~'+forceFilters[0].slice(1,3), {path: '/'});
	}
	var mediaCodeExpress = getParameterByName('mediacode');
});

// Crazy egg
setTimeout(function(){var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0014/1479.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);