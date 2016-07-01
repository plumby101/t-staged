function sliderHeight(){

    $(".saleBanner").height( $(".saleBanner").width() * 0.28654217643271);
     $(".imageSlider").height( $(".imageSlider").width() * 0.9903)
                           
}

jQuery(window).resize(function() {

  sliderHeight();

});


$( document ).ready(function() {
     sliderHeight();
    $(".imageSlides").width( "100%");
});

