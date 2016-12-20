var productModule = function() {
    var moduleVar = {};
    var currentWindowWidth = window.innerWidth;
    var windowWidth = window.innerWidth;
    var productPageWidth = $(".product-page").width();
    qubitImagesLoaded = false;
    var getProductStockInfo = function() {
        var productId = $("#productId").val();
        var skuListObject = {
            skuList: [productId]
        };
        $.ajax({
            url: "/services/stockservices.asmx/GetProductVariantStock",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(skuListObject),
            dataType: "json",
            success: function(data, status) {
                productPageStockInfo = $.parseJSON(data.d);
                addStockMetaData()
            }
        })
    };
    var getProductData = function(skuList) {
        var thisData;
        $.ajax({
            url: "/services/stockservices.asmx/GetProductData",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(skuList),
            dataType: "json",
            success: function(data, status) {
                productJson = $.parseJSON(data.d);
                thisData = productJson
            }
        });
        return thisData
    };
    var addStockMetaData = function(productPageProductInfo) {
        for (var i = 0; i < $(".size").length; i++) {
            var thisSku = $($(".size")[i]).attr("data-sku");
            for (var k = 0; k < productPageStockInfo.stocklist.length; k++) {
                for (var m = 0; m < productPageStockInfo.stocklist[k].sizesInStock.length; m++) {
                    if (thisSku.toLowerCase() == productPageStockInfo.stocklist[k].sizesInStock[m].sku.toLowerCase()) {
                        $($(".size")[i]).attr("stlev", productPageStockInfo.stocklist[k].sizesInStock[m].stlev);
                        break
                    }
                }
            }
        }
    };
    var hideAllStockMessages = function() {
        $(".stock-message, #addedToBasket").hide();
        $(".product-details .product-details .stock-message-low").remove()
    };
    var manageSizeStockMessages = function($target) {
        hideAllStockMessages();
        if ($target.length == 0) {
            $target = $("ul.product-sizes .size").eq(0)
        }
        if ($target.hasClass("out-of-stock")) {
            $(".stock-message").html('<span class="stock-message-text">Your selected size is currently out of stock</span>').show()
        } else if ($target.hasClass("low-stock")) {
            var stlev = $target.attr("stlev");
            $(".stock-message").show().html('<span class="stock-message-text">We have a limited number of this item left in your selected size.</span>');
            $('<div class="stock-message-low">Only ' + stlev + " left in stock in selected size</div>").appendTo(".product-swatches")
        } else if ($target.hasClass("pre-order")) {
            $(".stock-message").show().html('<span class="stock-message-text">Your selected size is expected in our warehouse on ' + $target.attr("data-pre-order") + ". You can still order &amp; we will send your item out to you as soon as it arrives.</span>")
        }
        $(".desc-prod-code").text("Style Code: " + $(".size-selected").attr("data-sku").slice(0, 5))
    };
    var scrollOverlayToIndex = function(indexClicked) {
        var addUpHeightUntilIndex = 0;
        for (var i = 0; i < $(".modal-wrapper .slides img").length; i++) {
            if (i < indexClicked) {
                addUpHeightUntilIndex += $($(".modal-wrapper .slides img")[i]).height()
            } else {
                break
            }
        }
        $("body, html").animate({
            scrollTop: addUpHeightUntilIndex
        }, "250")
    };
    var openFullscreenOverlay = function($targetImage) {
        var $listOfImages = $(".product-mobile-carousel ul").clone();
        var $wrapper = $('<div class="modal-wrapper grid-parent grid-100 tablet-100"></div>');
        var $overlay = $('<div class="slide-view-overlay grid-60 tablet-70 suffix-20 prefix-20 tablet-suffix-15 tablet-prefix-15"><a href="#" class="overlay-close">Close</a></div>');
        var $title = $('<h3 class="overlay-title">' + $(".product-info h3").text() + "</h3><p>" + $("#nowPrice").text() + "</p>");
        $wrapper.append($overlay);
        $overlay.append($listOfImages);
        $overlay.append($title);
        $overlay.find(".prod-vid").parent().remove();
        var atIndex = $(".product-mobile-carousel .slides img").index($targetImage);
        var $overlayNarBar = $('<ul class="overlay-nav-bar"></ul>');
        for (var i = 0; i < $overlay.find(".slides li").length; i++) {
            var $item = $('<li><a href="#">nav</a></li>');
            if (atIndex == i) {
                $item.addClass("selected")
            }
            $overlayNarBar.append($item)
        }
        $overlay.append($overlayNarBar);
        if (atIndex == -1) {
            atIndex = 0
        }
        $(".main-content").addClass("visuallyHidden");
        $("body").append($wrapper);
        $(".modal-wrapper .slides img").attr("title", "");
        scrollOverlayToIndex(atIndex)
    };
    var breakdownImagesToMobile = function() {
        if ($(".mobile-prod-image").length > 0) {
            if ($(".mobile-prod-image").length == 1) {
                $(".mobile-main-image").show()
            } else $(".mobile-main-image, .mobile-prod-image").show()
        } else {
            var $mainMobileImgDiv = $('<a href="' + $(".product-mobile-carousel li img").eq(0).attr("src").replace(sizeRegex, "/1200/") + '" class="MagicZoomPlus mobile-main-image hide-on-tablet hide-on-desktop mobile-grid-100 grid-parent"></a>');
            $(".product-page").append($mainMobileImgDiv);
            var $mainImg = $($(".product-mobile-carousel li img")[0]).clone();
            $mainMobileImgDiv.append($mainImg);
            $(".product-page").append($mainMobileImgDiv);
            for (var i = 0; i < $(".product-mobile-carousel li img").length; i++) {
                var $target = $($(".product-mobile-carousel li img")[i]);
                var $newDiv = $('<div class="mobile-prod-image hide-on-tablet hide-on-desktop grid-parent"></div>');
                $(".product-page").append($newDiv);
                if ($(".product-mobile-carousel li img").length == 2) {
                    $newDiv.addClass("mobile-grid-50")
                } else if ($(".product-mobile-carousel li img").length == 3) {
                    $newDiv.addClass("mobile-grid-33")
                } else if ($(".product-mobile-carousel li img").length == 4) {
                    $newDiv.addClass("mobile-grid-25")
                } else if ($(".product-mobile-carousel li img").length > 4) {
                    $newDiv.addClass("mobile-grid-20")
                } else {
                    $newDiv.hide()
                }
                var $mobileImg = $target.clone();
                if ($mobileImg.hasClass("cut-out")) {
                    $mobileImg.attr("src", $mobileImg.attr("src").replace("/product/", "/global/"))
                }
                $newDiv.append($mobileImg)
            }
            MagicZoomPlus.refresh()
        }
        $(".product-mobile-carousel, .product-page .player").hide()
    };
    var buildVideo = function() {
        $(".player").flowplayer()
    };
    var loadZoom = function() {
        MagicZoomPlus.options = {
            "zoom-position": "inner",
            "click-to-activate": true,
            "click-to-deactivate": true,
            "loading-msg": "Loading...",
            "show-title": false,
            hint: false,
            opacity: 70,
            "initialize-on": "click",
            "background-color": "#ffffff",
            "background-opacity": 60,
            "zoom-window-effect": false,
            "disable-expand": true,
            "disable-zoom": false,
            onready: function(id, isUpdated) {
                var imageName = $("#" + id).attr("href").split("product/");
                imageName = imageName[1];
                _gaq.push(["_trackEvent", "Zoom", "Click", imageName])
            }
        }
    };
    var setSwatchText = function() {
        var selectedSwatch = $(".selected-swatch").attr("alt");
        var appendSwatchColour = $("h3.product-label:eq(0)").text();
        $("h3.product-label:eq(0)").html(appendSwatchColour + ": " + '<span class="product-label-colour">' + selectedSwatch + "</span>")
    };
    var workOutImageSize = function(imageToResize) {
        if (typeof imageToResize !== "undefined" && imageToResize !== false) {
            var $imgWidth = imageToResize.width();
            for (var i = imageSizeBreakdownArray.length - 1; i >= 0; i--) {
                if ($imgWidth < imageSizeBreakdownArray[i]) {
                    return imageSizeBreakdownArray[i]
                }
            }
        } else {
            var newSize = "1553";
            if (productPageWidth > 550) {
                newSize = "750"
            } else if (productPageWidth > 450) {
                newSize = "550"
            } else if (productPageWidth > 350) {
                newSize = "450"
            } else if (productPageWidth > 250) {
                newSize = "350"
            } else {
                newSize = "250"
            }
            return newSize
        }
    };
    var setImages = function() {
        windowWidth = window.innerWidth;
        productPageWidth = $(".product-page").width();
        MagicZoomPlus.refresh();
        if (currentWindowWidth > windowWidth && windowWidth > 790) return;
        var $imgCollection = $(".mobile-main-image img, .mobile-prod-image img, .product-mobile-carousel .slides img");
        for (var i = 0; i < $imgCollection.length; i++) {
            var $imgItem = $($imgCollection[i]);
            if ($imgItem.attr("src").search(sizeRegex) != -1) {
                var str = $imgItem.attr("src");
                str = str.replace(sizeRegex, "/" + workOutImageSize(false) + "/");
                $imgItem.attr("src", str)
            }
        }
        $(".product-mobile-carousel .visuallyHidden").removeClass("visuallyHidden");
        var $imgThumbs = $(".recentlyViewed img, .ymal img");
        var thumbExt = "350";
        if (windowWidth < 780) {
            thumbExt = "250"
        }
        for (var i = 0; i < $imgThumbs.length; i++) {
            var $thumb = $($imgThumbs[i]);
            if ($thumb.attr("src").search(sizeRegex) != -1) {
                var str = $thumb.attr("src");
                str = str.replace(sizeRegex, "/" + thumbExt + "/");
                $thumb.attr("src", str)
            }
        }
        currentWindowWidth = windowWidth
    };
    var checkToDisableAddToBag = function() {
        for (var i = 0; i < $(".ctab").length; i++) {
            if ($($(".ctab")[i]).is(":visible")) {
                if ($($(".ctab")[i]).find(".product-sizes .size").length == $($(".ctab")[i]).find(".product-sizes .out-of-stock").length) {
                    $("#addToBasket").attr("disabled", "disabled").text("Out of Stock")
                } else {
                    $("#addToBasket").removeAttr("disabled").text("Add to Bag")
                }
            }
        }
    };
    var api = $(".player").data("flowplayer");
    var fpPlaying = false;
    var fpFirstPlay = true;
    var productName = $(".product-details h1:eq(0)").text();
    flowplayer(function(api) {
        api.bind("progress", function() {
            if (fpPlaying == false) {
                fpPlaying = true;
                if (fpFirstPlay == true) {
                    _gaq.push(["_trackEvent", "Video", "Play", productName])
                } else {
                    _gaq.push(["_trackEvent", "Video", "Play - Repeat", productName])
                }
            }
        });
        api.bind("finish", function() {
            fpPlaying = false;
            fpFirstPlay = false
        })
    });


    $(document).ready(function() {

        // Ring specific //

      if (typeof tcp_product_env != "undefined") {
        if (tcp_product_env[Object.keys(tcp_product_env)[1]] == "fjgkc") {
            $(".add-to-bag").css("display", "none")
            $(".ctab").css("display", "none")
            $(".add-wishlist-item-wrapper").css("display", "none")
            $(".product-label").css("display", "none")
            $(".add-to-wishlist").css("display", "none")
            $('.add-wishlist-item-wrapper').css("display", "none")
            $('div.add-wishlist-item-wrapper').hide()
        }
    }

  
        $(".browse-controls").removeClass("hide-on-tablet");
        $(".breadcrumb-browse-controls").removeClass("grid-90 tablet-grid-90 suffix-5 prefix-5 tablet-suffix-5 tablet-prefix-5 grid-80 tablet-grid-80 tablet-prefix-10 tablet-suffix-10 suffix-10 prefix-10").addClass("grid-100 tablet-grid-100 grid-parent");
        $(".product-page").removeClass("grid-50 prefix-10 tablet-prefix-5").addClass("grid-60 grid-parent");
        $(".product-details > .product-info, .product-details > .product-details").removeClass("grid-25 suffix-10 grid-parent float-left").addClass("grid-35 float-right");
        $(".product-details > .product-details").addClass("grid-parent");
        if ($("html.uk").length < 1) {
            $(".product-size-charts").html("(Size Chart & International Conversions)")
        }
        var waitForFinalEvent = function() {
            var timers = {};
            return function(callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId"
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId])
                }
                timers[uniqueId] = setTimeout(callback, ms)
            }
        }();
        $(window).resize(function() {
            waitForFinalEvent(function() {
                if (window.innerWidth < 768) {
                    breakdownImagesToMobile()
                } else if ($(".mobile-main-image").length > 0 && window.innerWidth >= 768) {
                    $(".product-mobile-carousel, .product-page .player").show()
                }
            }, 500, "windowResize")
        });
        if ($("#ctl00_globalMainContent_btnCheckout").attr("href") == undefined || $("#ctl00_globalMainContent_btnCheckout").attr("href") == "") {
            $("#ctl00_globalMainContent_btnCheckout").attr("href", "/checkout.htm")
        }
        $('h3.product-label:contains("Share")').hide();
        $(".prodFittedSizes, .prodEasySizes, .prodShoesSizes").parent().remove();
        var waistInfo = $(".size-fit-tooltip").attr("title");
        $(".size-fit-tooltip").parent().html(waistInfo);
        $(".product-accordion").accordionA({
            autoHeight: false,
            collapsible: true,
            navigation: true,
            heightStyle: "panel",
            create: function(event) {
                $($(".product-accordion section")[0]).attr("id", "product-acc-desc");
                setTimeout(function() {
                    $(".product-accordion").accordionA("toggle", "#product-acc-desc", true)
                }, 500);
                $(".product-accordion").on("click", "section", function(e) {
                    var sectionName = $(this).find("header h2").text().split("(");
                    sectionName = sectionName[0];
                    if (sectionName.match(/&/g)) {
                        sectionName = sectionName.replace("&", "and")
                    }
                    if (sectionName.length > 0) {
                        if ($(this).attr("aria-expanded") == "true") {
                            _gaq.push(["_trackEvent", sectionName, "Click", "Open"])
                        } else {
                            _gaq.push(["_trackEvent", sectionName, "Click", "Close"])
                        }
                    }
                });
                if (checkURLForString("product/archive")) {
                    $("#product-acc-desc .ymal").remove();
                    $("#product-acc-desc .content > p").each(function() {
                        if ($(this).text().toLowerCase() === "also shown:") {
                            $(this).remove()
                        }
                    })
                }
            }
        });
        $(".recentlyViewed ul li:lt(5)").show();
        $(".recentlyViewed ul").addClass("grid-parent");
        $(".recentlyViewed ul li").addClass("grid-20 mobile-grid-20 tablet-grid-20");
        $(".recentlyViewed ul li img").addClass("grid-image");
        mainModule.checkForLegLengths();
        $("ul.product-sizes li").each(function() {
            if ($(this).text().length > 5) {
                $(this).css("min-width", "65px")
            }
        });
        if ($(".product-page").length > 0) {
            $("body").on("click", ".product-sizes li", function(e) {
                var $target = $(this);
                manageSizeStockMessages($target)
            })
        }
        $("body").on("click", ".overlay-close", function(e) {
            e.preventDefault();
            $(".main-content").removeClass("visuallyHidden");
            $(".modal-wrapper").remove()
        });
        $("body").on("click", ".overlay-nav-bar li", function(e) {
            scrollOverlayToIndex($(".overlay-nav-bar li").index($(e.target)))
        });
        $("body").on("click", ".mobile-prod-image", function(e) {
            var $this = $(this);
            var $theImgSrc = $this.find("img").attr("src");
            $(".mobile-main-image img").attr("src", $theImgSrc.replace("/global/", "/product/"));
            var changeParentSrc = $theImgSrc.replace(sizeRegex, "/1200/");
            $(".mobile-main-image").attr("href", changeParentSrc);
            MagicZoomPlus.refresh()
        });
        $(window).scroll(function() {
            if ($(".modal-wrapper").length != 0) {
                var scrollPos = $(window).scrollTop();
                var $listOfOverlayImages = $(".modal-wrapper .slides img");
                var addUpImageHeights = 0;
                var selectedCandidate = 0;
                var arr = [];
                for (var i = 0; i < $listOfOverlayImages.length; i++) {
                    addUpImageHeights += $($listOfOverlayImages[i]).height();
                    arr.push(addUpImageHeights)
                }
                for (var j = 0; j < arr.length; j++) {
                    var windowDiff = scrollPos + $(window).height() / 2;
                    if (arr[j] < windowDiff) {
                        selectedCandidate = j + 1
                    }
                }
                var $overlayNav = $(".overlay-nav-bar li");
                $overlayNav.removeClass("selected");
                $($overlayNav[selectedCandidate]).addClass("selected")
            }
        });
        var product = $("#mainContent").product({
            debug: tcp_env.is_live === "false",
            currencySymbol: tcp_product_env.currencySymbol,
            canSelectOutOfStockSizes: true,
            beforeSwatchClickHandler: null,
            afterSwatchClickHandler: function(swatchImageClicked, tabIndex) {
                var pushSelectedColourText = swatchImageClicked.attr("alt");
                $(".product-label-colour").text(pushSelectedColourText);
                var swatchNewUrl = swatchImageClicked.attr("src").replace("/250/", "/" + workOutImageSize($(".cut-out")) + "/").replace("/global/", "/product/");
                swatchNewUrl = swatchNewUrl.replace('_sw/','/');
                console.log(swatchNewUrl);
                $(".cut-out").attr("src", swatchNewUrl);
                $(".mobile-prod-image .cut-out").attr("src", swatchNewUrl.replace("/product/", "/global/"));
                $(".mobile-main-image").attr("href", swatchNewUrl.replace("/" + workOutImageSize($(".mobile-main-image")) + "/", "/1200/"));
                manageSizeStockMessages($(".size-selected"));
                $($(".product-mobile-carousel .slides li a")[0]).attr("href", swatchImageClicked.attr("src").replace("/250/", "/1553/").replace("/global/", "/product/"));
                MagicZoomPlus.refresh();
                checkToDisableAddToBag()
            },
            outOfStockSizeClickHandler: null
        });
        product = product.data("tcplProduct");
        $("div.product-mobile-carousel ul.slides").productimages({
            debug: tcp_env.is_live === "false",
            productId: tcp_product_env.shortProductId,
            baseImage: tcp_product_env.baseImage,
            imageList: ["d1", "d2", "d3", "s1", "s2", "s3", "mp4"],
            onImageLoaded: function(container, image) {
                var li = $("<li></li>");
                var isCutOut = false;
                if (image.url.toLowerCase() == tcp_product_env.baseImage.toLowerCase()) {
                    isCutOut = true
                }
                var newSizeURL = image.url.replace("/250/", "/" + workOutImageSize(false) + "/").replace('_sw/','/');
                if (image.ext === "mp4" && !checkURLForString("product/archive")) {
                    var setSplash = image.url.replace("/250/", "/750/").replace("mp4", "s1");

                    function checkVideoThumb(url, callback) {
                        var img = new Image;
                        img.onload = function() {
                            callback(true)
                        };
                        img.onerror = function() {
                            callback(false)
                        };
                        img.src = url
                    }
                    var imageUrl = "//d3c707rd4l0ogp.cloudfront.net/product/" + tcp_product_env.shortProductId + "/mp4/750/.jpg";
                    checkVideoThumb(imageUrl, function(exists) {
                        if (exists === true) {
                            setSplash = imageUrl
                        }
                        var posterString = 'poster="' + setSplash + '"';
                        if ($.browser.device === false) {
                            posterString = ""
                        }
                        if ($("#breadcrumb li").eq(1).find("span").text().toLowerCase() == "women") {
                            $(".product-page").append('<div data-swf="//releases.flowplayer.org/5.5.0/commercial/flowplayer.swf" class="player flowplayer ss14 hide-on-mobile" data-key="$179321859326820, $814258226938917"><video ' + posterString + '><source type="video/mp4" src="//d30v566ce36ty1.cloudfront.net/' + tcp_product_env.shortProductId.toUpperCase() + '.mp4"></video></div>')
                        } else {
                            $(".product-page").append('<div data-swf="//releases.flowplayer.org/5.5.0/commercial/flowplayer.swf" class="player flowplayer hide-on-mobile" data-key="$179321859326820, $814258226938917"><video ' + posterString + '><source type="video/mp4" src="//d30v566ce36ty1.cloudfront.net/' + tcp_product_env.shortProductId.toUpperCase() + '.mp4"></video></div>')
                        }
                        if ($.browser.device) {
                            $(".player").css("background-image", "url(" + setSplash + ")")
                        }
                        flowplayer.conf = {
                            native_fullscreen: false
                        };
                        buildVideo()
                    })
                } else if (isCutOut) {

                    var $newCutOut = $('<a class="openZoomLink MagicZoomPlus" style="display: block" href="' + image.url.replace("/250/", "/1553/").replace('_sw/','/') + '"><img src="' + newSizeURL + '" class="grid-image cut-out" title="Click to zoom" alt="' + tcp_product_env.displayName + '" /></a>');
                    li.append($newCutOut)
                } else {
                    if (!checkURLForString("product/archive")) {
                        li.append('<a class="openZoomLink MagicZoomPlus" style="display: block" href="' + image.url.replace("/250/", "/1553/").replace('_sw/','/') + '"><img src="' + newSizeURL + '" class="grid-image" title="Click to zoom" alt="' + tcp_product_env.displayName + '" /></a>')
                    }
                }
                container.append(li);
                $(".product-page").css("visibility", "visible");
                if (isCutOut) {
                    if ($newCutOut.find(".cut-out").height() <= 500) {}
                }
            },
            loadingCompleted: function() {
                setImages();
                qubitImagesLoaded = true;
                loadZoom();
                flowplayer.conf = {
                    native_fullscreen: false
                };
                buildVideo();
                if (window.innerWidth < 768 && $(".mobile-main-image").length == 0) {
                    breakdownImagesToMobile()
                }
                manageSizeStockMessages($(".size-selected"));
                MagicZoomPlus.refresh();
                if (typeof tcp_product_env !== "undefined") {
                    if (typeof unisex_products_array !== "undefined") {
                        for (var i = 0; i < window.unisex_products_array.length; i++) {
                            if (unisex_products_array[i].toLowerCase() === tcp_product_env.productId.toLowerCase()) {
                                for (var j = 0; j < $(".product-mobile-carousel .slides > li").length; j++) {
                                    if (j > 0) {
                                        $($(".product-mobile-carousel .slides li")[j]).hide();
                                        $(".flowplayer").hide()
                                    }
                                }
                                break
                            }
                        }
                    }
                }
            }
        });
        $("body").append("<div id='basket-notification'><a href='/basket.htm'>1 item added to basket</a></div>");
        $("#addToBasket").addtobasket({
            debug: tcp_env.is_live === "false",
            selectedSkuFinder: function() {
                return product.selectedSkuFinder.call(product)
            },
            selectedQtyFinder: function() {
                return product.selectedQtyFinder.call(product)
            },
            selectedProdIdFinder: function() {
                return tcp_product_env.productId
            },
            selectedPriceFinder: function() {
                return product.selectedPriceFinder.call(product)
            },
            selectedNameFinder: function() {
                return tcp_product_env.displayName
            },
            waitInitHandler: function() {
                document.body.style.cursor = "wait"
            },
            waitDestroyHandler: function() {
                document.body.style.cursor = "default"
            },
            addToBasketSuccessHandler: function(button, parameters) {
                if (miniBasket) {
                    miniBasket.data("tcplMinibasket").refreshBasket();
                    if (typeof window.addedToBasketSuccess !== "undefined") {
                        window.addedToBasketSuccess()
                    }
                }
                if (product) {
                    var uppercaseProductName = parameters.productDisplayName.toUpperCase();
                    product.showMessage("<span>" + uppercaseProductName + " has been added to your bag.</span>")
                }
                $(".checkout a").removeAttr("disabled");
                setTimeout(function() {
                    $(".checkout a").removeAttr("disabled");
                    var subBasketItems = "<li><a href='/basket.htm'><span><b>Go to basket</b></span><span class='mini-basket-sub-total'>" + $(".mini-basket .mini-basket-sub-total").text() + "</span></a></li>";
                    $(".basket-items li").each(function() {
                        subBasketItems += "<li>" + "<a href='" + $(this).find(".mini-details").attr("href") + "'>" + "<span>" + $(this).find(".prod-title").html() + "</span>" + "<span>" + $(this).find(".prod-cost").html() + "</span>" + "<span>" + $(this).find(".prod-size").html() + "</span>" + "<span>" + $(this).find(".prod-colour").html() + "</span>" + "<span>" + $(this).find(".prod-qty").html() + "</span>" + "</a>" + "</li>"
                    });
                    $(".left-draw-basket .mini-basket-sub-total").html("");
                    $(".sub-list-basket ul").html(subBasketItems);
                    $(".left-draw-basket > a").html("Basket " + $(".basket-items .qty").html())
                }, 500);
                $(".stock-message").hide();
                mainModule.miniBasketCarousel();
                $("#basket-notification").addClass("open").find("a").html(parameters.quantity + (parameters.quantity > 1 ? " items" : " item") + " added to basket");
                setTimeout(function() {
                    $("#basket-notification").removeClass("open")
                }, 3e3);
                if (typeof tcp_product_env.displayName !== "undefined") {
                    _gaq.push(["_trackEvent", "Add to Basket", "Click", tcp_product_env.displayName])
                }
            },
            addToBasketFailedHandler: function(button, parameters) {
                $("#addedToBasket span").html($("#addedToBasket span").html().replace("Sorry, we only have", "Sorry, currently we have only").replace("more available of this item", "of this item available"))
            },
            trackingElementId: "trackers",
            validateBeforeAdd: function(button, parameters) {
                var isValid = true;
                if (!parameters.productid) {
                    isValid = false
                }
                if (!parameters.sku) {
                    isValid = false
                }
                var skuLi = $("li[data-sku=" + parameters.sku + "]");
                if (!skuLi || skuLi.length == 0) {
                    isValid = false
                } else {
                    var isOos = $(skuLi[0]).attr("data-oos") == "true";
                    if (isOos) {
                        isValid = false;
                        if (product) {
                            $(".stock-message").hide();
                            product.showMessage("<span>Sorry, your selected size is out of stock</span>")
                        }
                    }
                }
                if (!parameters.quantity || parameters.quantity == 0 || parameters.quantity == "0") {
                    isValid = false
                }
                return isValid
            },
            selectedProductCategoryFinder: function() {
                return tcp_product_env.productCategory
            }
        });
        setSwatchText();
        checkToDisableAddToBag();
        getProductStockInfo();
        $(".product-details .product-details").on("click", ".ymal-slides a", function(e) {
            var productName = $(this).find("img").attr("alt");
            _gaq.push(["_trackEvent", "Others Liked", "Click", productName])
        });
        $(".recentlyViewed a").click(function(e) {
            var productName = $(this).find("img").attr("alt");
            _gaq.push(["_trackEvent", "Recently Viewed", "Click", productName])
        });
        $(".browse-controls a").click(function(e) {
            var browseDirection = $(this).hasClass("browse-left") ? "Left" : "Right";
            _gaq.push(["_trackEvent", "Browse Product", "Click", browseDirection])
        })
    });
    var lazyLayout = _.debounce(setImages, 300);
    $(window).resize(lazyLayout);
    return moduleVar = {
        getProductData: getProductData
    }
}();
