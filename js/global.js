  var toast_env = {
    staging: '//s3-eu-west-1.amazonaws.com/toast-staging/',                
    production: '//d2xfispw8k8nwr.cloudfront.net/' 
  };

 function flagSwap() {
	str = $(".menu__title").text()
	rg = /[a-zA-Z]+/g
	el = $('#footer-country-select .has-flag-uk').first();
	el.html(el.html().replace(/GBP/ig, str.match(rg)[0]));

	currentFlag = $(".has-flag").attr('class').split(' ').pop();
	$("#footerCountryFlag").removeClass("has-flag-uk");
	$("#footerCountryFlag").addClass(currentFlag);
}

$( document ).ready(function() {
    flagSwap() 
});