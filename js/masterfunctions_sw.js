
sizeRegex = /(\/[0-9]{3,4}\/)/i;
imageSizeBreakdownArray = [250, 350, 450, 550, 700, 950, 1200, 1553];
productYmalRendered = false;
String.prototype.splice = function(idx, rem, s) {
    return this.slice(0, idx) + s + this.slice(idx + Math.abs(rem))
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}
getUniqueStringArray = function(arr) {
    var ret = [];
    if (arr.length > 0) {
        arr = arr.sort();
        ret = [arr[0]];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i - 1].toLowerCase() !== arr[i].toLowerCase()) {
                ret.push(arr[i])
            }
        }
    }
    return ret
};
checkURLForString = function(searchTerm) {
    if (window.location.href.indexOf(searchTerm) > -1) {
        return true
    } else {
        return false
    }
};
renderRecsHome = function(jsonData) {
    var $pRecs = $(".peerius-rec");
    if ($pRecs.length > 0) {
        for (var i = $pRecs.length - 1; i >= 0; i--) {
            if (typeof jsonData[0].recs[i] != "undefined") {
                $($pRecs[i]).attr("peerius-item-id", jsonData[0].recs[i].id);
                $($pRecs[i]).attr("href", jsonData[0].recs[i].url);
                $($pRecs[i]).find(".peerius-bg-img").css({
                    "background-image": "url('" + jsonData[0].recs[i].img.replace("/product/", "/global/").replace(sizeRegex, "/450/") + "')",
                    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + jsonData[0].recs[i].img.replace("/product/", "/global/").replace(sizeRegex, "/450/") + "', sizingMethod='scale')"
                });
                var pRecPrice = parseFloat(jsonData[0].recs[i].prices.GBP.unitPrice).toFixed(2).replace(".00", "");
                if (jsonData[0].recs[i].prices.GBP.unitPrice != jsonData[0].recs[i].prices.GBP.salePrice)
                    pRecPrice = parseFloat(jsonData[0].recs[i].prices.GBP.salePrice).toFixed(2).replace(".00", "");
                $($pRecs[i]).find(".p-rec-price").text("£" + pRecPrice);
                if (jsonData[0].recs[i].title.length > 12) {
                    $($pRecs[i]).find(".p-rec-title").text(jsonData[0].recs[i].title.slice(0, 12) + "...");
                    $($pRecs[i]).find(".p-rec-hover").text(jsonData[0].recs[i].title)
                } else {
                    $($pRecs[i]).find(".p-rec-title").text(jsonData[0].recs[i].title)
                }
            }
        }
        $(".peerius-rec").on("click", function(e) {
            Peerius.smartRecsClick($(this).attr("peerius-item-id"))
        })
    }
};
renderRecsLanding = function(jsonData) {
    var $pRecs = $(".peerius-rec");
    if ($pRecs.length > 0) {
        for (var i = $pRecs.length - 1; i >= 0; i--) {
            if (typeof jsonData[0].recs[i] != "undefined") {
                $($pRecs[i]).attr("peerius-item-id", jsonData[0].recs[i].id);
                $($pRecs[i]).attr("href", jsonData[0].recs[i].url);
                $($pRecs[i]).find(".peerius-bg-img").css({
                    "background-image": "url('" + jsonData[0].recs[i].img.replace("/product/", "/global/").replace(sizeRegex, "/450/") + "')",
                    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + jsonData[0].recs[i].img.replace("/product/", "/global/").replace(sizeRegex, "/450/") + "', sizingMethod='scale')"
                });
                var pRecPrice = parseFloat(jsonData[0].recs[i].prices.GBP.unitPrice).toFixed(2).replace(".00", "");
                if (jsonData[0].recs[i].prices.GBP.unitPrice != jsonData[0].recs[i].prices.GBP.salePrice)
                    pRecPrice = parseFloat(jsonData[0].recs[i].prices.GBP.salePrice).toFixed(2).replace(".00", "");
                $($pRecs[i]).find(".p-rec-price").text("£" + pRecPrice);
                if (jsonData[0].recs[i].title.length > 12) {
                    $($pRecs[i]).find(".p-rec-title").text(jsonData[0].recs[i].title.slice(0, 12) + "...");
                    $($pRecs[i]).find(".p-rec-hover").text(jsonData[0].recs[i].title)
                } else {
                    $($pRecs[i]).find(".p-rec-title").text(jsonData[0].recs[i].title)
                }
            }
        }
        $(".peerius-rec").on("click", function(e) {
            Peerius.smartRecsClick($(this).attr("peerius-item-id"))
        })
    }
};
renderRecsSearch = function(jsonData) {
    if ($(".you-may-also-like").length == 0 && typeof jsonData[0].recs != "undefined" && $(".category-product-items .product").length == 0) {
        $(".category-product-items").after($('<div class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent"><div class="grid-100 tablet-grid-100 mobile-grid-100 you-may-also-like five-column-recs"><h3 class="product-label">But you may be interested in</h3><ul class="ymal-slides grid-parent"></ul></div></div>'));
        for (var i = 0; i < jsonData[0].recs.length; i++) {
            if (i < 5) {
                var $ymalLiItem = $('<div class="product grid-20 tablet-grid-33 mobile-grid-50"></div>');
                $(".ymal-slides").append($ymalLiItem);
                $ymalLiItem.append($('<a href="' + jsonData[0].recs[i].url + '" peerius-item-id="' + jsonData[0].recs[i].id + '" title="' + jsonData[0].recs[i].title + '"><img src="' + jsonData[0].recs[i].img.replace(sizeRegex, "/250/").replace("/product/", "/global/") + '" alt="' + jsonData[0].recs[i].title + '" class="grid-image full-opacity"><h3>' + jsonData[0].recs[i].title + "</h3><p></p></a>"));
                if (jsonData[0].recs[i].prices.GBP.salePrice == jsonData[0].recs[i].prices.GBP.unitPrice)
                    $ymalLiItem.find("p").text("£" + jsonData[0].recs[i].prices.GBP.unitPrice);
                else
                    $ymalLiItem.find("p").html('<span class="recommendation-price price-strike-through">£' + jsonData[0].recs[i].prices.GBP.unitPrice + ' </span><span class="recommendation-sale">£' + jsonData[0].recs[i].prices.GBP.salePrice + "</span>")
            } else {
                break
            }
        }
        $(".you-may-also-like a").on("click", function(e) {
            Peerius.smartRecsClick($(this).attr("peerius-item-id"))
        });
        Tipped.create(".ymal-slides a", {
            skin: "toast",
            target: "mouse",
            hook: "topmiddle",
            showDelay: 250
        });
        $(".ymal-slides .product a").click(function() {
            _gaq.push(["_trackEvent", "Search You May Also Like", "Click", $(this).find("img").attr("alt")])
        });
        categoryModule.setCategoryImages()
    }
};
renderRecsProduct = function(jsonData) {
    if ($(".you-may-also-like").length == 0 && typeof jsonData[0].recs != "undefined") {
        $("#social").after($('<h3 class="product-label ymal-header">Others liked</h3><div class="grid-100 tablet-grid-100 mobile-grid-100 you-may-also-like"><ul class="ymal-slides grid-parent"></ul></div>'));
        for (var i = 0; i < jsonData[0].recs.length; i++) {
            if (i < 3) {
                var $ymalLiItem = $('<li class="grid-33 mobile-grid-33 tablet-grid-33" style="display: list-item;"></li>');
                $(".product-details .ymal-slides").append($ymalLiItem);
                $ymalLiItem.append($('<a href="' + jsonData[0].recs[i].url + '" peerius-item-id="' + jsonData[0].recs[i].id + '" title="' + jsonData[0].recs[i].title + '"><img src="' + jsonData[0].recs[i].img.replace(sizeRegex, "/250/").replace("/product/", "/global/") + '" alt="' + jsonData[0].recs[i].title + '" class="grid-image"></a>'))
            } else {
                break
            }
        }
        $(".you-may-also-like a").on("click", function(e) {
            Peerius.smartRecsClick($(this).attr("peerius-item-id"))
        });
        Tipped.create(".product-details .ymal-slides a", {
            skin: "toast",
            target: "mouse",
            hook: "topmiddle",
            showDelay: 250
        });
        productYmalRendered = true
    }
};
renderRecsBasket = function(jsonData) {
    if ($(".basket-recommendations-container").length == 0 && typeof jsonData[0].recs != "undefined") {
        $("#inner").append('<div class="grid-100 tablet-grid-100 mobile-grid-100 basket-recommendations-container five-column-recs grid-parent"></div>');
        $(".basket-recommendations-container").html('<h3 class="basket-recommendations-label you-may-be-label">Others Like...</h3><div class="grid-100 tablet-grid-100 mobile-grid-100 group-images"></div>');
        for (var i = 0; i < jsonData[0].recs.length; i++) {
            if (i < 5) {
                var $ymalLiItem = $('<div class="grid-20 mobile-grid-50 tablet-grid-20 basket-recommendations range-product" id="' + jsonData[0].recs[i].refCode + '" peerius-item-id="' + jsonData[0].recs[i].id + '"></div>');
                $(".basket-recommendations-container .group-images").append($ymalLiItem);
                var $newItem = $('<img class="grid-image"><span class="basket-recommendation-title">' + jsonData[0].recs[i].title + '</span><span class="basket-recommendation-price">£' + jsonData[0].recs[i].prices.GBP.unitPrice + "</span>");
                $ymalLiItem.append($newItem);
                if (jsonData[0].recs[i].prices.GBP.unitPrice != jsonData[0].recs[i].prices.GBP.salePrice) {
                    $ymalLiItem.find(".basket-recommendation-price").addClass("price-strike-through");
                    $ymalLiItem.append('<span class="basket-recommendation-sale-price">£' + jsonData[0].recs[i].prices.GBP.salePrice + "</span>")
                }
            } else {
                break
            }
        }
        $($(".basket-recommendations-container .range-product")[0]).addClass("selected-range-product");
        $(".range-product").on("click", function(e) {
            Peerius.smartRecsSendClick($(this).attr("peerius-item-id"))
        });
        Tipped.create(".basket-recommendations-container .range-product img", {
            skin: "toast",
            target: "mouse",
            hook: "topmiddle",
            showDelay: 250
        });
        setTimeout(function() {
            $("#inner").append(rangeModule.getRangeBuyOffTemplate());
            rangeModule.setBaseBuyOffVars();
            rangeModule.addRangeListeners();
            rangeModule.initialiseBuyOff()
        }, 100)
    }
};
renderRecsErrorPage = function(jsonData) {
    var pRecsHTML = "";
    if (jsonData[0].recs.length > 0) {
        $(".page-404").append($('<div class="grid-parent grid-100 tablet-grid-100 mobile-grid-100 you-may-also-like five-column-recs"><h3 class="product-label you-may-be-label grid-parent">You may be interested in...</h3><ul class="ymal-slides grid-parent"></ul></div>'));
        for (var i = 0; i < jsonData[0].recs.length; i++) {
            if (i < 5) {
                var $ymalLiItem = $('<div class="product grid-20 tablet-grid-33 mobile-grid-50"></div>');
                $(".ymal-slides").append($ymalLiItem);
                $ymalLiItem.append($('<a href="' + jsonData[0].recs[i].url + '" peerius-item-id="' + jsonData[0].recs[i].id + '" title="' + jsonData[0].recs[i].title + '"><img src="' + jsonData[0].recs[i].img.replace(sizeRegex, "/250/").replace("/product/", "/global/") + '" alt="' + jsonData[0].recs[i].title + '" class="grid-image full-opacity"><h3>' + jsonData[0].recs[i].title + "</h3><p></p></a>"));
                if (jsonData[0].recs[i].prices.GBP.salePrice == jsonData[0].recs[i].prices.GBP.unitPrice)
                    $ymalLiItem.find("p").text("£" + jsonData[0].recs[i].prices.GBP.unitPrice);
                else
                    $ymalLiItem.find("p").html('<span class="recommendation-price price-strike-through">£' + jsonData[0].recs[i].prices.GBP.unitPrice + ' </span><span class="recommendation-sale">£' + jsonData[0].recs[i].prices.GBP.salePrice + "</span>")
            } else {
                break
            }
        }
        $(".you-may-also-like a").on("click", function(e) {
            Peerius.smartRecsClick($(this).attr("peerius-item-id"))
        });
        Tipped.create(".ymal-slides a", {
            skin: "toast",
            target: "mouse",
            hook: "topmiddle",
            showDelay: 250
        });
        $(".ymal-slides .product a").click(function() {
            _gaq.push(["_trackEvent", "Search You May Also Like", "Click", $(this).find("img").attr("alt")])
        })
    }
};
renderRecsWishlist = function(jsonData) {
    var $pRecs = $(".peerius-rec");
    if (jsonData[0].recs.length > 0) {
        $(".wishlist-exterior-wrapper").append($('<div class="grid-parent grid-100 tablet-grid-100 mobile-grid-100 grid-parent you-may-also-like five-column-recs"><h3 class="product-label you-may-be-label grid-parent">You may be interested in...</h3><ul class="ymal-slides grid-parent"></ul></div>'));
        for (var i = 0; i < jsonData[0].recs.length; i++) {
            if (i < 5) {
                var $ymalLiItem = $('<div class="product grid-20 tablet-grid-33 mobile-grid-50"></div>');
                $(".ymal-slides").append($ymalLiItem);
                $ymalLiItem.append($('<a href="' + jsonData[0].recs[i].url + '" peerius-item-id="' + jsonData[0].recs[i].id + '" title="' + jsonData[0].recs[i].title + '"><img src="' + jsonData[0].recs[i].img.replace(sizeRegex, "/250/").replace("/product/", "/global/") + '" alt="' + jsonData[0].recs[i].title + '" class="grid-image full-opacity"><h3>' + jsonData[0].recs[i].title + "</h3><p></p></a>"));
                if (jsonData[0].recs[i].prices.GBP.salePrice == jsonData[0].recs[i].prices.GBP.unitPrice)
                    $ymalLiItem.find("p").text("£" + jsonData[0].recs[i].prices.GBP.unitPrice);
                else
                    $ymalLiItem.find("p").html('<span class="recommendation-price price-strike-through">£' + jsonData[0].recs[i].prices.GBP.unitPrice + ' </span><span class="recommendation-sale">£' + jsonData[0].recs[i].prices.GBP.salePrice + "</span>")
            } else {
                break
            }
        }
        $(".you-may-also-like a").on("click", function(e) {
            Peerius.smartRecsClick($(this).attr("peerius-item-id"))
        });
        Tipped.create(".ymal-slides a", {
            skin: "toast",
            target: "mouse",
            hook: "topmiddle",
            showDelay: 250
        });
        $(".ymal-slides .product a").click(function() {
            _gaq.push(["_trackEvent", "Search You May Also Like", "Click", $(this).find("img").attr("alt")])
        })
    }
};
renderRecsAccount = function(jsonData) {
    var $pRecs = $(".peerius-rec");
    if (jsonData[0].recs.length > 0) {
        $("#inner").append($('<div class="grid-parent grid-100 tablet-grid-100 mobile-grid-90 mobile-prefix-5 mobile-suffix-5 grid-parent you-may-also-like five-column-recs"><h3 class="product-label you-may-be-label grid-parent">OTHERS LIKE...</h3><ul class="ymal-slides grid-parent"></ul></div>'));
        for (var i = 0; i < jsonData[0].recs.length; i++) {
            if (i < 5) {
                var $ymalLiItem = $('<div class="product grid-20 tablet-grid-33 mobile-grid-50"></div>');
                $(".ymal-slides").append($ymalLiItem);
                $ymalLiItem.append($('<a href="' + jsonData[0].recs[i].url + '" peerius-item-id="' + jsonData[0].recs[i].id + '" title="' + jsonData[0].recs[i].title + '"><img src="' + jsonData[0].recs[i].img.replace(sizeRegex, "/250/").replace("/product/", "/global/") + '" alt="' + jsonData[0].recs[i].title + '" class="grid-image full-opacity"><h3>' + jsonData[0].recs[i].title + "</h3><p></p></a>"));
                if (jsonData[0].recs[i].prices.GBP.salePrice == jsonData[0].recs[i].prices.GBP.unitPrice)
                    $ymalLiItem.find("p").text("£" + jsonData[0].recs[i].prices.GBP.unitPrice);
                else
                    $ymalLiItem.find("p").html('<span class="recommendation-price price-strike-through">£' + jsonData[0].recs[i].prices.GBP.unitPrice + ' </span><span class="recommendation-sale">£' + jsonData[0].recs[i].prices.GBP.salePrice + "</span>")
            } else {
                break
            }
        }
        $(".you-may-also-like a").on("click", function(e) {
            Peerius.smartRecsClick($(this).attr("peerius-item-id"))
        });
        Tipped.create(".ymal-slides a", {
            skin: "toast",
            target: "mouse",
            hook: "topmiddle",
            showDelay: 250
        });
        $(".ymal-slides .product a").click(function() {
            _gaq.push(["_trackEvent", "Search You May Also Like", "Click", $(this).find("img").attr("alt")])
        })
    }
};
showMeTheMoney = function() {
    $("#mainContent, #aspnetForm > header").css("visibility", "visible").hide().fadeIn(400)
};
var teradata = function() {
    var subscribeByEmail = function(email, attributes, loading, callback, group) {
        group = typeof group !== "undefined" ? group : "750049776";
        if (typeof loading === "function") {
            if (loading() === false) {
                return
            }
        }
        values = [];
        names = [];
        var i = 0;
        for (i; i < attributes.length; i++) {
            values.push(attributes[i].value);
            names.push(attributes[i].name)
        }
        var params = {
            method: "/user/create",
            queryNames: ["email"],
            queryValues: [email],
            attributeValues: values,
            attributeNames: names,
            httpVerb: "post"
        };
        $.ajax({
            url: "/services/ecrelay.asmx/Relay",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(params),
            dataType: "json",
            success: function(data, status) {
                var newExisting = "new";
                if (data.d.indexOf("OBJECT_ALREADY_EXISTS") > -1) {
                    newExisting = "existing";
                    params.method = "/user/updateProfileByEmail";
                    $.ajax({
                        url: "/services/ecrelay.asmx/Relay",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(params),
                        dataType: "json",
                        success: function(data, status) {}
                    })
                }
                params.method = "/membership/subscribeByEmail";
                params.queryNames = ["email", "groupId", "subscriptionMode"];
                params.queryValues = [email, group, "OPT_IN"];
                params.attributeVales = null;
                params.attributeNames = null;
                $.ajax({
                    url: "/services/ecrelay.asmx/Relay",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(params),
                    dataType: "json",
                    success: function(data, status) {
                        if (typeof callback === "function") {
                            callback(newExisting)
                        }
                    }
                })
            }
        })
    };
    return {
        subscribeByEmail: subscribeByEmail
    }
}();
var postcodeAnywhere = function() {
    var config = {
        key: "FU43-NY28-TA13-EH87",
        preferredLanguage: "English",
        userName: "FRENC11122",
        filter: "None"
    };
    var findAddress = function(id, callback) {
        $.getJSON("https://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/RetrieveById/v1.30/json3.ws?callback=?", {
            Key: config.key,
            Id: id,
            PreferredLanguage: config.preferredLanguage,
            UserName: config.userName
        }, function(data) {
            callback(data.Items[0])
        })
    };
    var findPostcode = function(postcode, callback) {
        $.getJSON("https://services.postcodeanywhere.co.uk/PostcodeAnywhere/Interactive/Find/v1.10/json3.ws?callback=?", {
            Key: config.key,
            SearchTerm: postcode,
            PreferredLanguage: config.preferredLanguage,
            Filter: config.filter,
            UserName: config.userName
        }, function(data) {
            if (data.Items.length === 1 && typeof data.Items[0].Error !== "undefined" || data.Items.length === 0) {
                callback(false, data)
            } else {
                callback(true, data)
            }
        })
    };
    return {
        findPostcode: findPostcode,
        findAddress: findAddress
    }
}();
var mainModule = function() {
    var moduleVar = {};
    miniBasket = null;
    var miniBasketSlider = {};
    var landingBgdImgElemCollection = [];
    var $associateSlider = $("");
    var openInnerDraw = function(e) {
        $(e.target).addClass("is-active");
        var $slideRightList = $(e.target).parent().find(".slide-right-list").addClass("slide-list-visible");
        if ($slideRightList[0].offsetHeight + $slideRightList[0].scrollTop < $slideRightList[0].scrollHeight) {
            $(e.target).parent().find(".left-draw-scroll-indicator").fadeIn("slow")
        }
        $(".left-draw").addClass("is-subdraw-visible");
        $(".is-draw-visible .nav-wrapper nav > ul").addClass("is-inactive")
    };
    var closeInnerDraw = function() {
        $(".nav-option a").removeClass("is-active");
        $(".slide-right-list").removeClass("slide-list-visible");
        $(".left-draw-scroll-indicator").fadeOut("slow");
        $(".left-draw").removeClass("is-subdraw-visible");
        $(".is-draw-visible .nav-wrapper nav > ul").removeClass("is-inactive")
    };
    var toggleDraw = function(toggleOff) {
        var $drawBtn = $(".drawBtn");
        if ($drawBtn.hasClass("selected") || toggleOff) {
            $(".left-draw").removeClass("is-draw-visible");
            $(".main-content, .marketing-message").removeClass("draw-visible-main-content");
            $drawBtn.removeClass("selected")
        } else {
            $(".left-draw").addClass("is-draw-visible");
            $(".main-content, .marketing-message").addClass("draw-visible-main-content");
            $drawBtn.addClass("selected")
        }
    };
    var getRidOfClosingNav = function($elem, makeWait) {
        setTimeout(function() {
            $elem.addClass("visuallyHidden")
        }, makeWait + 100)
    };
    var checkProductSizeBoxWidth = function() {
        $("ul.product-sizes li").each(function() {
            if ($(this).text().length > 5) {
                $(this).css("min-width", "65px")
            }
        })
    };
    var highlightCurrentCategory = function() {
        var url = window.location.pathname;
        if (url === "/") {
            return
        }
        var foundItem = _.find($(".category-nav-list li a"), function(obj) {
            return $(obj).attr("href").toLowerCase().indexOf(url.toLowerCase()) != -1
        });
        if (foundItem && $(foundItem).length > 0)
            $(foundItem).addClass("current")
    };
    var miniBasketCarousel = function() {
        if ($(".basket-items li").length > 3) {
            var itemsCount = 0;
            $(".basket-items li").each(function(i) {
                if (i > 2) {
                    $(this).remove();
                    itemsCount++
                }
            });
            $("ul.basket-items").after("<div id='mini-basket-overflow' style=''><a href='/basket.htm'>+ " + itemsCount + " more item" + (itemsCount > 1 ? "s" : "") + " in bag</a></div>");
            $(".go-to-basket").text("VIEW FULL SHOPPING BAG")
        }
    };
    var checkForLegLengths = function() {
        var longLegRegex = /( )(l)(?:$| )/i;
        var regLegRegex = /( )(r)(?:$| )/i;
        $("div.product-sizes").each(function() {
            for (var i = 0; i < $(this).find(".size").length; i++) {
                var $sizeItem = $($(this).find(".size")[i]);
                if ($sizeItem.text().toLowerCase().search(longLegRegex) != -1) {
                    $sizeItem.addClass("long grid-parent")
                } else if ($sizeItem.text().toLowerCase().search(regLegRegex) != -1) {
                    $sizeItem.addClass("regular grid-parent")
                }
            }
            $(this).find(".regular").wrapAll('<ul class="product-sizes-split regular-size-list"></ul>');
            $(this).find(".long").wrapAll('<ul class="product-sizes-split long-size-list"></ul>').closest().insertAfter(".regular-size-list")
        });
        var regSize = $(".regSize").text();
        var longSize = $(".longSize").text();
        $("ul.regular-size-list").before('<h3 class="product-label-sizes">Leg Length: ' + regSize + "</h3>");
        $("ul.long-size-list").before('<h3 class="product-label-sizes">Leg Length: ' + longSize + "</h3>");
        $(".regSize, .longSize").parent().addClass("hidden");
        $("div.product-sizes").each(function() {
            var $this = $(this);
            $this.find(".long-size-list").appendTo($this.find("ul.product-sizes"));
            $this.find(".regular-size-list").insertAfter($this.find("ul.product-sizes h3").eq(0))
        })
    };
    var buildSizedImageSources = function($rangeImage, isContentImage) {
        var urlRoot = tcp_env.dynamic_image_settings.BaseUrl;
        if (isContentImage) {
            urlRoot = urlRoot + "content-images/";
            urlRoot = urlRoot + $rangeImage.attr("season") + "/250"
        }
        $rangeImage.attr("img-src", urlRoot + $rangeImage.attr("img-src"))
    };
    var defineVariousImageSizes = function(windowWidth) {
        var smallNewSize = "250";
        var mediumNewSize = "250";
        var largeNewSize = "250";
        var fullWidthSize = "250";
        if (windowWidth < 480) {
            smallNewSize = "250";
            mediumNewSize = "350";
            largeNewSize = "350";
            fullWidthSize = "450"
        } else if (windowWidth >= 480 && windowWidth < 860) {
            smallNewSize = "450";
            mediumNewSize = "550";
            largeNewSize = "700";
            fullWidthSize = "950"
        } else if (windowWidth >= 860 && windowWidth < 980) {
            smallNewSize = "250";
            mediumNewSize = "450";
            largeNewSize = "700";
            fullWidthSize = "950"
        } else if (windowWidth > 979 && windowWidth < 1440) {
            smallNewSize = "350";
            mediumNewSize = "550";
            largeNewSize = "950";
            fullWidthSize = "1200"
        } else if (windowWidth > 1439 && windowWidth <= 1999) {
            smallNewSize = "450";
            mediumNewSize = "700";
            largeNewSize = "950";
            fullWidthSize = "1553"
        } else if (windowWidth > 1999) {
            smallNewSize = "550";
            mediumNewSize = "950";
            largeNewSize = "1553";
            fullWidthSize = "1553"
        }
        return [smallNewSize, mediumNewSize, largeNewSize, fullWidthSize]
    };
    var setHomepageImageSizes = function() {
        homepageWindowWidth = $(window).width();
        if (homepageCurrentWindowWidth > homepageWindowWidth && homepageWindowWidth > 768)
            return;
        var sizesArr = defineVariousImageSizes(homepageWindowWidth);
        var $imgCollection = landingBgdImgElemCollection;
        setSourceOnImageCollection($imgCollection, sizesArr);
        homepageCurrentWindowWidth = homepageWindowWidth
    };
    var setSourceOnImageCollection = function($imgCollection, sizesArr) {
        for (var i = 0; i < $imgCollection.length; i++) {
            var $imgItem = $($imgCollection[i]);
            if (!$imgItem.hasClass("range-product")) {
                if ($imgItem.css("background-image") != undefined && $imgItem.css("background-image") != "none") {
                    var $imgSrcStr = $imgItem.css("background-image");
                    var $imgWidth = $imgItem.width();
                    for (var k = 0; k < imageSizeBreakdownArray.length; k++) {
                        if ($imgWidth < imageSizeBreakdownArray[k]) {
                            $imgItem.css("background-image", $imgSrcStr.replace(sizeRegex, "/" + imageSizeBreakdownArray[k] + "/"));
                            break
                        }
                    }
                } else {
                    var $imgSrcStr = $imgItem.attr("src");
                    if ($imgSrcStr == undefined || $imgSrcStr.length == 0)
                        $imgSrcStr = $imgItem.attr("img-src");
                    var $imgWidth = $imgItem.width();
                    for (var k = 0; k < imageSizeBreakdownArray.length; k++) {
                        if ($imgWidth < imageSizeBreakdownArray[k]) {
                            $imgItem.attr("src", $imgSrcStr.replace(sizeRegex, "/" + imageSizeBreakdownArray[k] + "/"));
                            break
                        }
                    }
                }
            }
        }
    };
    var setRangeImages = function() {
        rangeWindowWidth = $(window).width();
        if (rangeCurrentWindowWidth > rangeWindowWidth)
            return;
        var newSize = "700";
        if (rangeWindowWidth < 600) {
            newSize = "350"
        } else if (rangeWindowWidth >= 860 && rangeWindowWidth < 980) {
            newSize = "450"
        } else if (rangeWindowWidth > 979 && rangeWindowWidth < 2e3) {
            newSize = "550"
        } else if (rangeWindowWidth > 1999) {
            newSize = "700"
        }
        var $imgCollection = $(".category-full-width-banner .range-image");
        for (var i = 0; i < $imgCollection.length; i++) {
            var $imgItem = $($imgCollection[i]);
            if ($imgItem.attr("img-src").search(sizeRegex) != -1) {
                var str = $imgItem.attr("img-src");
                str = str.replace(sizeRegex, "/" + newSize + "/");
                $imgItem.attr("src", str)
            }
        }
        rangeCurrentWindowWidth = rangeWindowWidth
    };
    var showNextLandingContainer = function(forceLoad) {
        var pos = $(window).height() + $(window).scrollTop();
        var footerHeight = 0;
        if ($("#newFooter").length != 0 && $(".footer-list-links").length != 0) {
            footerHeight = $("#newFooter").height() + parseInt($("#newFooter").css("padding-top")) + parseInt($("#newFooter").css("padding-bottom"))
        }
        if (pos / ($(document).height() - footerHeight) > .9 || forceLoad) {
            $(".landing-container").removeClass("visuallyHidden");
            for (var i = 0; i < 4; i++) {
                $($(".archive-post.visuallyHidden")[i]).addClass("active-tile");
                $($(".archive-post.visuallyHidden")[i]).find("img").attr("src", $($(".archive-post.visuallyHidden")[i]).find("img").attr("img-src"))
            }
            $(".active-tile").removeClass("visuallyHidden");
            $(".active-tile").css("opacity", "1").removeClass("active-tile")
        }
    };
    var setSocialVariables = function() {
        var rtnObj = {};
        var productTitle = "";
        if ($(".product-info h3").length > 0) {
            productTitle = $(".product-info h3").text()
        } else if ($(".product-info h2").length > 0) {
            productTitle = $(".product-info h2").text()
        } else {
            productTitle = $(".product-info h1").text()
        }
        rtnObj.socialProductDescription = $.trim(productTitle);
        rtnObj.socialProductDetails = $.trim($($(".product-accordion section")[0]).find("p").text());
        rtnObj.socialUrlhostname = tcp_env.site_base;
        if ($(".buy-off-container").length != 0 && typeof currentObjId !== "undefined")
            rtnObj.socialUrlProdcode = currentObjId;
        else
            rtnObj.socialUrlProdcode = $("#productId").attr("value");
        rtnObj.socialUrlProdName = rtnObj.socialProductDescription.replace(/\s/g, "");
        rtnObj.socialUrlShare = tcp_env.site_base + "product/" + rtnObj.socialUrlProdcode + "/" + rtnObj.socialUrlProdName + ".htm";
        if ($(".buy-off-container").length != 0 && typeof currentObjId !== "undefined")
            $(".twitter-social").attr("href", "//twitter.com/share?url=" + rtnObj.socialUrlShare + "&text=" + rtnObj.socialProductDescription + "%20by%20TOAST:%20");
        return rtnObj
    };
    var setSocialIcons = function() {
        if ($("#social a").length > 0) {
            var socialVars = setSocialVariables();
            $(".pinterest-social").click(function(e) {
                e.preventDefault();
                var imageShare = $(".selected-swatch").attr("src").replace(sizeRegex, "/250/");
                $(".pinterest-social").attr("href", "//pinterest.com/pin/create/button/?url=" + socialVars.socialUrlShare + "&media=" + imageShare + "&description=" + socialVars.socialProductDescription + " by TOAST");
                if ($("#mainContent").find(".buy-off-container").length > 0) {
                    _gaq.push(["_trackEvent", "Buy-off Social Sharing", "Click - " + socialVars.socialProductDescription, "Pinterest"])
                } else {
                    _gaq.push(["_trackEvent", "Product Social Sharing", "Click - " + $(".product-info h1").text(), "Pinterest"])
                }
            });
            $(".facebook-social").click(function(e) {
                e.preventDefault();
                var imageShare = $(".selected-swatch").attr("src");
                var socialLink = "";
                if ($(".buy-off-container").length != 0 && typeof currentObjId !== "undefined") {
                    imageShare = imageShare.replace(sizeRegex, "/250/");
                    socialLink = "http://www.facebook.com/sharer.php?m2w&s=100&p[title]=" + socialVars.socialProductDescription + "%20by%20TOAST&p[summary]=" + socialVars.socialProductDetails + "&p[url]=" + socialVars.socialUrlShare + "&p[images][0]=http:" + imageShare + ",%20sharer,toolbar=0,status=0,width=1200,height=1200"
                } else {
                    socialLink = "http://www.facebook.com/sharer.php?s=100&p[title]=" + socialVars.socialProductDescription + "%20by%20TOAST&p[summary]=" + socialVars.socialProductDetails + "&p[url]=" + socialVars.socialUrlShare + "&p[images][0]=http:" + imageShare + ",%20sharer,toolbar=0,status=0,width=250,height=250";
                    imageShare = imageShare.replace(sizeRegex, "/250/")
                }
                $(".facebook-social").attr("href", socialLink.replace(/\s/g, "%20"));
                if ($("#mainContent").find(".buy-off-container").length > 0) {
                    _gaq.push(["_trackEvent", "Buy-off Social Sharing", "Click - " + socialVars.socialProductDescription, "Facebook"])
                } else {
                    _gaq.push(["_trackEvent", "Product Social Sharing", "Click - " + $(".product-info h1").text(), "Facebook"])
                }
            });
            $(".pinterest-social").popupWindow({
                height: 400,
                width: 800,
                centerBrowser: 1
            });
            $(".facebook-social, .twitter-social").popupWindow({
                height: 350,
                width: 670,
                centerBrowser: 1
            });
            $(".twitter-social").attr("href", "//twitter.com/share?url=" + socialVars.socialUrlShare + "&text=" + socialVars.socialProductDescription + "%20by%20TOAST:%20");
            $(".twitter-social").click(function(e) {
                e.preventDefault();
                if ($("#mainContent").find(".buy-off-container").length > 0) {
                    _gaq.push(["_trackEvent", "Buy-off Social Sharing", "Click - " + socialVars.socialProductDescription, "Twitter"])
                } else {
                    _gaq.push(["_trackEvent", "Product Social Sharing", "Click - " + $(".product-info h1").text(), "Twitter"])
                }
            })
        }
    };
    var populateTippedElements = function() {
        Tipped.create(".recentlyViewed ul li a, .ymal img, .browse-left, .browse-right, .product-swatch, .mapTooltip, .fourth-row .cutout-image, .fourth-row .homepage-image, .group-images .range-product img", {
            skin: "toast",
            target: "mouse",
            hook: "topmiddle",
            showDelay: 250
        })
    };
    var destroyTippedElements = function() {
        Tipped.remove(".recentlyViewed ul li a, .ymal img, .browse-left, .browse-right, .product-swatch, .fourth-row .cutout-image, .fourth-row .homepage-image, .group-images .range-product img")
    };
    var subscribeToGroup = function(emailAddress, group, callbackFunction) {
        var subscribeParams = {
            method: "/membership/subscribeByEmail",
            queryNames: ["email", "groupId", "subscriptionMode"],
            queryValues: [emailAddress, group, "OPT_IN"],
            attributeValues: null,
            attributeNames: null,
            httpVerb: "POST"
        };
        $.ajax({
            url: "/services/ecrelay.asmx/Relay",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(subscribeParams),
            dataType: "json",
            success: function(data, status) {
                if (typeof callbackFunction != "undefined") {
                    callbackFunction(data)
                }
            }
        })
    };
    var signUpEmail = function(emailAddress, aValues, aNames, callbackFunction) {
        var params = {
            method: "/user/create",
            queryNames: ["email"],
            queryValues: [emailAddress],
            attributeValues: aValues,
            attributeNames: aNames,
            httpVerb: "post"
        };
        $.ajax({
            url: "/services/ecrelay.asmx/Relay",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(params),
            dataType: "json",
            success: function(data, status) {
                if (data.d.indexOf("OBJECT_ALREADY_EXISTS") > 0) {
                    var dateStampParams = {
                        method: "/user/updateProfileByEmail",
                        queryNames: ["email"],
                        queryValues: [emailAddress],
                        attributeValues: aValues,
                        attributeNames: aNames,
                        httpVerb: "post"
                    };
                    $.ajax({
                        url: "/services/ecrelay.asmx/Relay",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(dateStampParams),
                        dataType: "json",
                        success: function(data, status) {
                            subscribeToGroup(emailAddress, 750049776);
                            if (typeof callbackFunction != "undefined") {
                                callbackFunction()
                            }
                        }
                    })
                } else {
                    subscribeToGroup(emailAddress, 750049776);
                    if (typeof callbackFunction != "undefined") {
                        callbackFunction()
                    }
                }
            }
        })
    };
    var waitForFinalResize = function() {
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
        waitForFinalResize(function() {
            if ($(window).width() < 1023) {
                destroyTippedElements()
            } else if ($(window).width() > 1024) {
                populateTippedElements()
            }
        }, 500, "windowResize")
    });
    $(".left-side-nav").addClass("grid-60 tablet-grid-60 grid-parent");
    $(".right-side-nav").addClass("grid-40 tablet-grid-40 grid-parent");
    $(".right-side-nav ul").addClass("search-box grid-50 tablet-grid-50 mobile-grid-100 grid-parent");
    $("#country-selector").before('<ol class="user-options grid-25 tablet-grid-25 mobile-grid-100 grid-parent"></ol>');
    if ($("#toastFont").length > 0) {
        $("body").append($('<a class="hide-on-mobile" href="#" id="more-content-arrow" style="display: inline;"><span id="more-content-arrow-hover" style="opacity: 0;"></span>To Top</a>'));
        $("#more-content-arrow").hover(function() {
            $("#more-content-arrow-hover").stop().animate({
                opacity: 1
            }, 600, "linear")
        }, function() {
            $("#more-content-arrow-hover").stop().animate({
                opacity: 0
            }, 700, "linear")
        }).click(function(e) {
            e.preventDefault();
            _gaq.push(["_trackEvent", "More Content Arrow", "Click", "More Content Arrow"])
        });
        $(window).scroll(function() {
            var sd = $(window).scrollTop();
            if (sd > 500)
                $("#more-content-arrow").fadeOut(300);
            else
                $("#more-content-arrow").fadeIn(300)
        })
    }
    $(document).ready(function() {

     $.browser.device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|ios|mobile|opera mobi|opera|tab|touchpad|nexus 7|nexus 10|gt-n|pad|gt-p|ideatab|sm-t|hp slate|xoom|aurora-ii|me301t|a1-810|a1-811|nookhd|pmp5880d|quantum7|kindle fire|sgp3|nook hd|transformer|at300|cobalt|momo|sweet m|archos|nook|nabi2|mz60|vega|slider|mid7|kftt|streak|lepanii|htc_flyer|jro03h|bntv400|a500|kftt build|m805|pom727mc|cm_tenderloin/i.test(navigator.userAgent.toLowerCase())
     $(".product-size-charts").click(function() {
        _gaq.push(["_trackEvent", "beta", "product page size chart clicked"])
    })

        if ($.browser.device === true) {
            $(".nav-option").click(function(e) {
                e.preventDefault();
                $that = $(this);
                $(".nav-option").each(function() {
                    if ($(this) !== $that) {
                        $(this).click(function(e) {
                            e.preventDefault();
                            $(this).trigger("hover");
                            $(this).unbind("click")
                        })
                    }
                });
                $(this).trigger("hover");
                $(this).unbind("click")
            })
        }
        (function() {
            if (typeof tcp_env !== "undefined") {
                var country = tcp_env.country_code;
                if (typeof $.cookie("welcome-served") === "undefined") {
                    if (country === "us") {
                        $("body").addClass("welcome");
                        $("#mat-us").show()
                    } else if (country === "eu") {
                        $("body").addClass("welcome");
                        $("#mat-eu").show()
                    }
                }
                $(".continue-shopping, .mat-close").click(function() {
                    $("#welcome-backdrop").fadeOut(function() {
                        $.cookie("welcome-served", "true", {
                            expires: 999,
                            path: "/"
                        });
                        $("body").removeClass("welcome")
                    })
                });
                $(".site-chooser").click(function() {
                    $("#welcome-mat").fadeOut(function() {
                        $("#country-popup").fadeIn();
                        $("#mat-select a").click(function(e) {
                            $.cookie("welcome-served", "true", {
                                expires: 999,
                                path: "/"
                            })
                        })
                    })
                })
            }
        })();
        (function() {
            var miniBasketPollCount = 0;
            var miniBasketPoll = function() {
                if (miniBasketPollCount < 200) {
                    if (miniBasket) {
                        miniBasket.data("tcplMinibasket").refreshBasket()
                    } else {
                        miniBasketPollCount++;
                        setTimeout(miniBasketPoll, 25)
                    }
                }
            };
            miniBasketPoll()
        })();
        if (typeof $.cookie("cookie-banner-dismissed") === "undefined") {
            $.cookie("cookie-banner-dismissed", "true", {
                expires: 999,
                path: "/"
            });
            $("body").prepend("<div id='cookie-banner'>TOAST uses cookies to improve your experience of shopping online. In using the site you have agreed to our cookies policy. <a href='/content/help/help.htm?helpSection=cookie-policy'>Learn more.</a> <a href='#' id='cookie-dismiss'><span class='sprite close'></span></a>");
            $("#cookie-dismiss").click(function(e) {
                e.preventDefault();
                $("#cookie-banner").remove()
            })
        }
        $("#ctl00_ctl01_btnSearch").click(function(e) {
            if ($("#ctl00_ctl01_txtSearch").val() == "search") {
                e.preventDefault()
            }
        });
        $(".main-content .category-nav-list").removeClass("max-width-1000");
        $(".login-item").appendTo($(".right-side-nav .user-options"));
        setTimeout(function() {
            $("#topBasketContainer").appendTo($(".right-side-nav .user-options"))
        }, 50);
        $("#newFooter a").click(function() {
            var footerClickedLink = "";
            if ($(this).parents("#socialLinks").length > 0) {
                footerClickedLink = $(this).attr("href").split(".");
                footerClickedLink = footerClickedLink[1]
            } else if ($(this).parents("#mainLinks").length > 0) {
                var removeText = $(this).find("span").text();
                footerClickedLink = $(this).text();
                footerClickedLink = footerClickedLink.replace(removeText, "");
                footerClickedLink = $.trim(footerClickedLink)
            } else {
                footerClickedLink = $(this).text()
            }
            _gaq.push(["_trackEvent", "Footer Link", "Click", footerClickedLink])
        });
        $(".new-cat-nav .nav-option .relative > a").click(function() {
            _gaq.push(["_trackEvent", "Top Nav", "Click", $(this).text()])
        });
        $(".new-cat-nav .new-sub-nav-list a").click(function() {
            _gaq.push(["_trackEvent", "Sub Nav", "Click", $(this).parents(".nav-option").find(".relative > a").text() + " > " + $(this).text()])
        });

        function displayUpsell() {
            if (tcp_env.country_code.toLowerCase() === "uk") {
                var basketValue = tcp_env.basket.subtotal;
                var upsellToAdd = parseInt(125 - basketValue);
                if (typeof toast_config !== "undefined" && toast_config.in_sale === false) {
                    if (upsellToAdd > 0 && basketValue > 84 && $("#mini-basket-upsell").length === 0 && $("#basket-upsell").length === 0) {
                        $(".mini-basket-sub-total").before("<div id='mini-basket-upsell' style='margin-top:15px; color: #186aa2; text-align: center; text-transform: uppercase; letter-spacing: 1px' class='medFont'>Add £" + upsellToAdd + " more to your basket for free UK delivery and returns</div>");
                        $("#submitBasket").prepend("<div id='basket-upsell' style='margin-bottom:15px; color: #186aa2; text-align: center; text-transform: uppercase; letter-spacing: 1px' class='medFont grid-100 tablet-grid-100 mobile-grid-100 grid-parent'>Add £" + upsellToAdd + " more to your basket for free UK delivery and returns</div>");
                        $("#continueShopping").css({
                            "float": "right"
                        })
                    } else if (basketValue < 84 && $("#mini-basket-upsell").length > 0) {
                        $("#mini-basket-upsell").remove()
                    }
                }
            }
        }

        function miniBasketLowStock() {
            var skuListObj = {
                skuList: []
            };
            var line_items = tcp_env.basket.line_items;
            for (var i = 0; i < line_items.length; i++) {
                var thisProd = line_items[i].product;
                skuListObj.skuList.push(thisProd.id)
            }
            $.ajax({
                url: "/services/stockservices.asmx/GetProductVariantStock",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(skuListObj),
                dataType: "json",
                success: function(data) {
                    var stock = $.parseJSON(data.d);
                    if (stock !== null) {
                        for (var j = 0; j < stock.stocklist.length; j++) {
                            var thisProd = stock.stocklist[j];
                            for (var k = 0; k < thisProd.sizesInStock.length; k++) {
                                var thisSize = thisProd.sizesInStock[k];
                                if (thisSize.stlev < 5 && thisSize.stlev > 0) {
                                    $("#mini-basket [data-sku=" + thisSize.sku + "] .prod-error").html("Only " + thisSize.stlev + " left in stock")
                                }
                            }
                        }
                    }
                }
            })
        }
        if ($("#topBasketContainer").length > 0 && typeof $("#topBasketContainer").minibasket != "undefined") {
            miniBasket = $("#topBasketContainer").minibasket({
                afterRemoveItem: function(event, data) {
                    document.body.style.cursor = "default"
                },
                refreshCompleted: function() {
                    if (jQuery.isFunction(miniBasketCarousel)) {
                        miniBasketCarousel()
                    }
                    displayUpsell();
                    miniBasketLowStock()
                }
            })
        }
        $(".product-details .recentlyViewed li").removeClass("grid-20 tablet-grid-20 mobile-grid-20").addClass("grid-33 tablet-grid-33 mobile-grid-33 visuallyHidden");
        for (var i = 0; i < $(".product-details .recentlyViewed li").length; i++) {
            if (i < 3) {
                $($(".product-details .recentlyViewed li")[i]).removeClass("visuallyHidden")
            }
        }
        var headerNavBarOffSet = 0;
        if ($("header .nav-bar").length > 0 && typeof $("header .nav-bar").offset != "undefined") {
            headerNavBarOffSet = $("header .nav-bar").offset().top
        }
        $(".category-container .category-nav-list").removeClass("hide-on-tablet");
        $(".landingPage a").click(function(e) {
            try {
                var linkUrl = $(this).attr("href");
                _gaq.push(["_trackEvent", "Landing Page Panel", "Click", linkUrl])
            } catch (e) {}
        });
        $(".close-nav-btn").click(function(e) {
            e.preventDefault();
            if ($(".category-nav .nav-option a").hasClass("selected")) {
                $(".category-nav .nav-option a").removeClass("selected");
                $associateSlider.css({
                    height: "0px",
                    opacity: 0
                });
                getRidOfClosingNav($associateSlider, 450)
            }
        });
        $("body").on("click", ".product-sizes li", function(e, triggerUsed) {
            if (typeof triggerUsed == "undefined") {
                var sizeText = $(this).text();
                _gaq.push(["_trackEvent", "Size", "Click", sizeText]);
                if ($(this).hasClass("regular") || $(this).hasClass("long") || $(this).hasClass("short") || $(this).hasClass("product-sizes-split")) {
                    var legLength = $(this).html().split(" ");
                    legLength = legLength[1];
                    _gaq.push(["_trackEvent", "Leg Length", "Click", legLength])
                }
            }
        });
        $("body").on("change", ".product-qty select", function() {
            var quantityText = $(this).val();
            _gaq.push(["_trackEvent", "Quantity", "Select", quantityText])
        });
        $("body").on("click", ".product-swatches li", function(e, triggerUsed) {
            if (typeof triggerUsed == "undefined") {
                var selectedColour = $(this).find("img").attr("alt");
                _gaq.push(["_trackEvent", "Colour", "Click", selectedColour])
            }
        });
        $("body").on("change", ".basketqtylist", function(e) {
            var quantityText = $(this).val();
            var productName = $(this).parent().parent().find(".basketProductDescription a").attr("title");
            _gaq.push(["_trackEvent", "Change Quantity", quantityText, productName])
        });
        $("body").on("click", "#basketTableMain .basketTableTd input", function() {
            var productName = $(this).parent().parent().find(".basketProductDescription a").attr("title");
            _gaq.push(["_trackEvent", "Remove Product", "Click", productName])
        });
        $("#promobutton").click(function(e) {
            var promoCode = $("#promoForm input").val();
            if (promoCode.length > 0) {
                _gaq.push(["_trackEvent", "Promotional Code", "Enter", promoCode])
            }
        });
        $(".promoField").keydown(function(e) {
            if (e.which == 13) {
                if (promoCode.length > 0) {
                    _gaq.push(["_trackEvent", "Promotional Code", "Enter", promoCode])
                }
            }
        });
        $("body").on("click", ".basket-recommendations-container .basket-recommendations", function() {
            var productName = $(this).find("img").attr("alt");
            _gaq.push(["_trackEvent", "Others Like", "Click", productName])
        });
        $("#continueShopping").click(function() {
            _gaq.push(["_trackEvent", "Continue Shopping", "Click", "Continue Shopping"])
        });
        $(".checkoutButton").click(function() {
            _gaq.push(["_trackEvent", "Secure Checkout", "Click", "Secure Checkout"])
        });
        var $wrapper = $('<div class="left-draw hide-on-desktop"><div class="nav-wrapper"><nav><ul class="search-nav nav-draw-ul"></ul><ul class="menu-nav nav-draw-ul"></ul><ul class="help-nav nav-draw-ul"></ul></nav></div></div>');
        $("body").prepend($wrapper);
        $(".search-nav").append($('<li><form action="#"><input name="ctl01$txtSearch" type="search" id="ctl01_txtSearch" class="searchBox-Nav" /></form></li>'));
        $(".menu-nav").append("<li class='nav-option left-draw-basket'><a href='/basket.htm' associate='sub-list-basket'>Basket " + ($(".basket-items .qty").length > 0 ? $(".basket-items .qty").html() : "(0)") + "</a></li>" + "<li class='nav-option mobile-nav-checkout'><a href='/checkout/login.htm'>Checkout</a></li>");
        $(".help-nav").append('<li class="hide-on-desktop"><a href="/content/wishlist/wishlist.htm">Wishlist (<span class="wishlist-qty">0</span>)</a></li>' + '<li class="hide-on-desktop"><a href="/account.htm?mode=myaccount">My Account</a></li>');
        $(".help-nav #topBasketContainer").remove();
        $("<li>" + $(".shop-section a") + "</li>");
        $(".left-draw .searchBox-Nav").val("search");
        $(".left-draw .searchBox-Nav").on("focus", function() {
            if ($(this).val() == "search") {
                $(this).val("")
            }
        }).on("focusout", function() {
            if ($(this).val() == "") {
                $(this).val("search")
            }
        });
        var catHovered = false;
        $("body").append("<div id='newHeaderBlackout' class='visuallyHidden'></div>");
        $(".new-cat-nav > li:not(.separator):not(.new-cat-nav-new)").hover(function() {
            if ($(this).find(".new-sub-nav").length > 0) {
                catHovered = true;
                if (!$(this).hasClass("selected")) {
                    $(".new-cat-nav > li").removeClass("selected")
                }
                $(".fixedRight").removeClass("fixedRight");
                $(this).addClass("selected");
                $("#newHeaderBlackout").removeClass("visuallyHidden");
                $("#newHeaderBlackout").addClass("show");
                alignSubNav()
            }
        }, function() {
            catHovered = false;
            setTimeout(function() {
                if ($(".new-cat-nav li.selected").length < 1) {
                    $("#newHeaderBlackout").addClass("visuallyHidden")
                }
                if (catHovered === false) {
                    $("#newHeaderBlackout").removeClass("show");
                    setTimeout(function() {
                        if (catHovered === false) {
                            $("#newHeaderBlackout").addClass("visuallyHidden")
                        }
                    }, 200);
                    $(".new-cat-nav > li").removeClass("selected")
                }
            }, 200)
        });
        $(".separator").on("mouseenter mouseleave", function(e) {
            $(this).prev("li").trigger(e.type)
        });
        $(".close-tablet-menu-btn").click(function(e) {
            e.preventDefault();
            catHovered = false;
            $(".new-cat-nav > li").removeClass("selected");
            setTimeout(function() {
                $("#newHeaderBlackout").addClass("visuallyHidden")
            }, 200)
        });

        function alignSubNav() {
            if (typeof $(".selected .new-sub-nav").offset() !== "undefined") {
                if ($(window).width() - ($(".selected .new-sub-nav").offset().left + $(".selected .new-sub-nav").outerWidth()) < 20) {
                    while ($(window).width() - ($(".selected .new-sub-nav").offset().left + $(".selected .new-sub-nav").outerWidth()) < 10) {
                        $(".selected .new-sub-nav").css({
                            left: "-=10px"
                        })
                    }
                } else {
                    $(".selected .new-sub-nav").css({
                        left: "-10px"
                    });
                    if ($(window).width() - ($(".selected .new-sub-nav").offset().left + $(".selected .new-sub-nav").outerWidth()) < 20) {
                        alignSubNav()
                    }
                }
            }
        }
        var mobileNavObj = "";
        var mobileNavCounter = 0;

        $(".new-cat-nav .nav-option").each(function() {
            var $thisAnchor = $(this).find("> div > a");
            mobileNavObj += "<li class='nav-option'><a href='" + $thisAnchor.attr("href") + "' " + (typeof $thisAnchor.attr("style") !== "undefined" ? "style='" + $thisAnchor.attr("style") + "'" : "") + ">" + $thisAnchor.text() + "</a></li>";
            if ($(this).find(".new-sub-nav li").length > 0) {
                var thisSubNav = "<li><ul class='mobile-sub-nav'>";
                $(this).find(".new-sub-nav .main-link, .new-sub-nav .new-sub-nav-list-heading").each(function() {
                   
                    var $thisSubAnchor = $(this).find("a");
                    if ($(this).hasClass("new-sub-nav-list-heading")) {
                        mobileNavCounter++
                        thisSubNav += "<li class='nav-option subNavItem" + mobileNavCounter +"' id='"+$(this).text()+"'><a href='#' class='mobile-sub-list-heading'>+ " + $(this).text() + "</a></li>";
                        var thisSubList = "<li id='"+$(this).text()+"-sub'><ul class='mobile-sub-list' >";
                        $(this).parent().parent().parent().find("[data-parent=" + $(this).data("category") + "]").each(function() {
                            thisSubList += "<li class='nav-option'><a href='" + $(this).find("a").attr("href") + "' " + (typeof $(this).find("a").attr("style") !== "undefined" ? "style='" + $(this).find("a").attr("style") + "'" : "") + ">- " + $(this).text() + "</a></li>"
                        });
                        thisSubNav += thisSubList + "</ul></li>"
                    } else {
                        thisSubNav += "<li class='nav-option'><a href='" + $thisSubAnchor.attr("href") + "' " + (typeof $thisSubAnchor.attr("style") !== "undefined" ? "style='" + $thisSubAnchor.attr("style") + "'" : "") + ">" + $thisSubAnchor.text() + "</a></li>"
                    }
                });
                mobileNavObj += thisSubNav + "</ul></li>"
              
            }
        });
        $(".menu-nav").prepend(mobileNavObj);
 

        // New JS updated to move clothing items on mobile 
        $(".mobile-sub-nav:first").prepend("<li>"+$("#Footwear-sub").html()+"</li>")
        $(".mobile-sub-nav:first").prepend("<li class='nav-option'>"+$("#Footwear").html()+"</li>")

        $(".mobile-sub-nav:first").prepend("<li>"+$("#Accessories-sub").html()+"</li>")
        $(".mobile-sub-nav:first").prepend("<li class='nav-option'>"+$("#Accessories").html()+"</li>")

        $(".mobile-sub-nav:first").prepend("<li>"+$("#Clothing-sub").html()+"</li>")
        $(".mobile-sub-nav:first").prepend("<li class='nav-option'>"+$("#Clothing").html()+"</li>")

        $("#Footwear-sub").remove()
        $("#Footwear").remove()
        $("#Accessories-sub").remove()
        $("#Accessories").remove()
        $("#Clothing-sub").remove()
        $("#Clothing").remove()


        $(".menu-nav > li > a").click(function(e) {
            e.preventDefault();
            var expandClick = "Click";
            if (!$(this).parent().hasClass("mobile-nav-expanded")) {
                $(".mobile-nav-expanded").removeClass("mobile-nav-expanded");
                $(this).parent().addClass("mobile-nav-expanded");
                expandClick = "Expand"
            } else {
                window.location.href = $(this).attr("href")
            }
            _gaq.push(["_trackEvent", "Mobile Top Nav", expandClick, $(this).text()])
        });
        $(".mobile-sub-list-heading").click(function(e) {
            e.preventDefault();
            var expandContract = "Contract";
            var accordionText = $(this).text().replace("+ ", "");
            if (!$(this).parent().hasClass("mobile-sub-nav-expanded")) {
                $(".mobile-sub-nav-expanded").removeClass("mobile-sub-nav-expanded");
                $(this).parent().addClass("mobile-sub-nav-expanded");
                expandContract = "Expand"
            } else {
                $(this).parent().removeClass("mobile-sub-nav-expanded")
            }
            _gaq.push(["_trackEvent", "Mobile Sub Accordion", expandContract, $(this).parent().parent().parent().prev().text() + " > " + accordionText])
        });
        $(".mobile-sub-list > li > a, .mobile-sub-nav > .nav-option > a:not(.mobile-sub-list-heading)").click(function() {
            var subNavText = $(this).text().replace("- ", "");
            var subParentText = $(this).parents(".mobile-sub-list").length > 0 ? $(this).parent().parent().parent().prev().parent().parent().prev().text() : $(this).parent().parent().parent().prev().text();
            _gaq.push(["_trackEvent", "Mobile Sub Nav", "Click", subParentText + " > " + subNavText])
        });
        $(".nav-wrapper").click(function(e) {
            e.stopPropagation();
            closeInnerDraw()
        });
        $("html").click(function(e) {
            toggleDraw(true)
        });
        $(".drawBtn").click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDraw(false)
        });
        $(".left-draw-follow").click(function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: $(document).height()
            }, 0);
            toggleDraw(false)
        });
        var $miniBasket = $("#mini-basket");
        $(".nav-bar .basket-items").hover(function(e) {
            $(this).addClass("hover-mini-bag");
            if ($(".basket-items li").length > 0) {
                $miniBasket.css("top", $("#topBasketContainer").offset().top - $(window).scrollTop() + 25);
                var miniOffset = $(window).width() - ($("#topBasketContainer").offset().left + $("#topBasketContainer").width());
                $("#mini-basket").css({
                    right: miniOffset - 1
                });
                $miniBasket.removeClass("visuallyHidden")
            }
        }, function(e) {
            $(this).removeClass("hover-mini-bag");
            setTimeout(function() {
                if (!$miniBasket.hasClass("inBasket")) {
                    $miniBasket.addClass("visuallyHidden")
                }
            }, 10)
        });
        if ($miniBasket.length > 0) {
            $miniBasket.hover(function(e) {
                $miniBasket.addClass("inBasket")
            }, function(e) {
                $miniBasket.removeClass("inBasket");
                setTimeout(function() {
                    if (!$miniBasket.hasClass("inBasket") && !$(".nav-bar .basket-items").hasClass("hover-mini-bag")) {
                        $miniBasket.addClass("visuallyHidden")
                    }
                }, 400)
            })
        }
        $(".main-content").on("click", ".mini-details, .mini-img", function(e) {
            var productName = $(this).parent().find("a img").attr("alt");
            _gaq.push(["_trackEvent", "Mini-Basket Product", "Click", productName])
        });
        $(".main-content").on("click", ".go-to-basket", function(e) {
            _gaq.push(["_trackEvent", "Mini-Basket View Bag", "Click", "Mini-Basket View Bag"])
        });
        $(".left-draw .searchBox-Nav").keydown(function(e) {
            $(".right-side-nav .searchForm input[type=text]").attr("value", $(this).val());
            if (e.which == 13) {
                e.preventDefault();
                $(".searchbutton").trigger("click")
            }
        });
        $(".product-size-charts").click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".main-content").addClass("visuallyHidden");
            $("body").append($('<div class="info-draw grid-parent grid-80 tablet-grid-80 mobile-grid-80"><a href="#" class="info-draw-close">Close</a><section class="size-fit-info"></section><section id="social-info"></section></div>'));
            var t1Transitional = ["CAEAD", "CAEAE", "CAEAL", "CAEAN", "CAEBX", "CAEBY", "CAEBZ", "C6EAA", "C6EAB", "C6EAJ", "C6EAK", "C6EAL", "C6EAN", "C6EBG", "C6EBH"];
            if ($.inArray($(".desc-prod-code").text().replace("Style Code: ", ""), t1Transitional) !== -1) {
                $(".info-draw .size-fit-info").load("/content/site/product/size-chart-t1-2015.htm #size-chart-overlay-content")
            } else {
                $(".info-draw .size-fit-info").load("/content/site/product/size-Chart.htm #size-chart-overlay-content")
            }
        });
        $("body").on("click", ".info-draw-close", function(e) {
            e.preventDefault();
            $(".main-content").removeClass("visuallyHidden");
            $(".info-draw").remove()
        });
        $().UItoTop({
            easingType: "easeOutQuart"
        });
        highlightCurrentCategory();
        if ($("#breadcrumb").length > 0) {
            var a = $("#breadcrumb li").eq(1).text();
            var b = $("#breadcrumb li").eq(1).children();
            if (a.indexOf("women") > -1) {
                b.wrap('<a href="/category/women+new/new.htm"></a>')
            } else if (a.indexOf("men") > -1) {
                b.wrap('<a href="/category/men+new+in/New.htm"></a>')
            } else if (a.indexOf("house&home") > -1) {
                b.wrap('<a href="/category/HH+newly+added/new.htm"></a>')
            }
        }
        $("#breadcrumb li > a").click(function(e) {
            var linkText = $(this).text();
            _gaq.push(["_trackEvent", "Breadcrumbs", "Click", linkText])
        });
        $("body").on("click", ".checkout a", function() {
            var productName = $(".product-details .product-info h1").text() || $(".product-details .product-info h3").text() || $(".wishlist-item-selected .wish-item-title").text();
            _gaq.push(["_trackEvent", "Checkout", "Click", productName])
        });
        if ($("html.lt-ie9").length > 0) {
            $("#breadcrumb li, li.breadcrumb").last().css("background-image", "none");
            $(".product-page").removeClass("prefix-10 suffix-5 grid-50").addClass("grid-60");
            $(".product-details .product-details").removeClass("suffix-10 grid-50 grid-45").addClass("grid-35 prefix-5");
            $(".product-info").removeClass("suffix-10 grid-25").addClass("grid-35 prefix-5");
            $(".product-accordion, .ymal").parent().removeClass("grid-85").addClass("grid-100");
            if ($(".category-product-items").length > 0) {
                $(".category-product-items").removeClass("grid-80 prefix-10 suffix-10 grid-90 suffix-5 prefix-5").addClass("grid-100");
                $(".category-product-items > .product").removeClass("grid-25").addClass("grid-33");
                $(".filter-wrapper nav, div.filters, div.filter-options, div.results-info-wrapper").removeClass("grid-80 prefix-10 suffix-10 grid-90 prefix-5 suffix-5").addClass("grid-100")
            }
            $(".left-v-footer, .right-v-footer").removeClass("grid-30").addClass("grid-25");
            $(".middle-v-footer").removeClass("grid-40").addClass("grid-50");
            $("#basketTableMain thead .basketTableHeader th:eq(0), #basketTableMain thead .basketTableHeader th:eq(1)").css("text-align", "left");
            $(".group-product-image").removeClass("grid-40 prefix-10 suffix-5").addClass("grid-50");
            $(".buy-off-container > .product-details").removeClass("grid-35 suffix-10").addClass("grid-45 prefix-5");
            $(".buy-off-container > .product-details > .product-info").removeClass("grid-100 suffix-15").addClass("grid-85 suffix-15");
            $("#lookbook-outer-wrap .group-product-image").removeClass("grid-60 suffix-5 grid-85").addClass("grid-50");
            $("#lookbook-outer-wrap .product-details").removeClass("grid-40 suffix-10").addClass("grid-45 prefix-5");
            $("#lookbook-outer-wrap .product-details > .product-info").removeClass("grid-45 suffix-15 suffix-5 grid-85").addClass("grid-100");
            $(".right-side-nav").addClass("remove-right-margin")
        }
        jQuery.extend(Tipped.Skins, {
            toast: {
                border: {
                    size: 0,
                    color: "#959fa9"
                },
                background: "#e9e9e9",
                radius: {
                    size: 0,
                    position: "border"
                },
                shadow: false,
                closeButtonSkin: "light"
            }
        });
        jQuery(window).load(function() {
            if ($(window).width() > 1023) {
                populateTippedElements()
            }
        });
        _.defer(miniBasketCarousel);
        if ($(".category-full-width-banner .range-image").length > 0) {
            rangeCurrentWindowWidth = $(window).width();
            rangeWindowWidth = $(window).width();
            for (var j = 0; j < $(".range-image").length; j++) {
                $rangeImage = $($(".range-image")[j]);
                buildSizedImageSources($rangeImage, true)
            }
            lazyRangeLayout = _.debounce(setRangeImages, 300);
            $(document).ready(function() {
                _.defer(setRangeImages)
            });
            $(window).resize(lazyRangeLayout)
        }
        if (window.location.href.indexOf("/range/") < 0 ){
         setSocialIcons();
        }
        var fixHeader = function() {
            var headerHeight = $(".main-header").outerHeight() > 80 ? "74px" : $(".main-header").outerHeight();
            var mmHeight = $(".marketing-message").css("display") == "none" ? 0 : $(".marketing-message").outerHeight();
            if (Modernizr.mq("(min-width: 1024px)") && $.browser.device == false || $.browser.device == true && Modernizr.mq("(min-width: 1025px)") || $(".lt-ie9").length > 0) {
                if ($(window).scrollTop() > $(".main-header").offset().top + $(".main-header").outerHeight() && $("#generalContainerBasket").length < 1) {
                    $(".main-header").css({
                        position: "fixed",
                        transition: "none",
                        transform: "translateY(-" + $(".main-header").outerHeight() + "px)"
                    });
                    $("#mainContent").css({
                        marginTop: $(".main-header").outerHeight() > 80 ? "74px" : $(".main-header").outerHeight()
                    });
                    setTimeout(function() {
                        $(".main-header").css({
                            transition: "0.15s",
                            transform: "translateY(0)",
                            boxShadow: "0 1px 8px 2px rgba(180,180,180,0.5)"
                        })
                    }, 100)
                } else if ($(window).scrollTop() <= mmHeight) {
                    $(".main-header").css({
                        position: "relative",
                        transition: "none",
                        transform: "none",
                        boxShadow: "0 0 0 rgba(0,0,0,0)"
                    });
                    $("#mainContent").css({
                        marginTop: "0"
                    })
                }
            }
        };
        fixHeader();
        $(window).scroll(fixHeader);
        $(window).resize(fixHeader)
    });
    if ($("#toastFont, .homepageContainer").length > 0) {
        $(".landing-tile-content").each(function(index) {
            if ($(this).css("background-image") !== undefined && $(this).css("background-image") !== "none")
                landingBgdImgElemCollection.push($(this))
        });
        homepageCurrentWindowWidth = $(window).width();
        homepageWindowWidth = $(window).width();
        var lazyHomepageLayout = _.debounce(setHomepageImageSizes, 300);
        _.defer(setHomepageImageSizes);
        $(window).resize(lazyHomepageLayout);
        $(".range-product").click(function(e) {
            var $clickedRangeProduct = $(this);
            if ($(".scrollToBuyOff").length == 0) {
                setTimeout(function() {
                    $("body, html").animate({
                        scrollTop: $clickedRangeProduct.offset().top
                    }, "250")
                }, 300)
            }
        });
        $(document).ready(function() {
            setTimeout(function() {
                setHomepageImageSizes()
            }, 500)
        })
    }
    if ($(".editorial-buy-off").length > 0) {
        $(".range-product").click(function(e) {
            var $clickedRangeProduct = $(this);
            if ($(".scrollToBuyOff").length == 0) {
                setTimeout(function() {
                    $("body, html").animate({
                        scrollTop: $(".buy-off-container").offset().top
                    }, "250")
                }, 300)
            } else {
                setTimeout(function() {
                    $("body, html").animate({
                        scrollTop: $(".buy-off-container").offset().top
                    }, "250")
                }, 300)
            }
        })
    }
    if ($(".landing-container").length > 0) {
        windowWidth = $(window).width();
        $(".archive-post").addClass("visuallyHidden").css("opacity", 0);
        $(window).scroll(function() {
            showNextLandingContainer(false)
        })
    }
    $("#aspnetForm > header").addClass("main-header");
    return moduleVar = {
        checkProductSizeBoxWidth: checkProductSizeBoxWidth,
        checkForLegLengths: checkForLegLengths,
        buildSizedImageSources: buildSizedImageSources,
        setRangeImages: setRangeImages,
        setSocialVariables: setSocialVariables,
        setSocialIcons: setSocialIcons,
        populateTippedElements: populateTippedElements,
        destroyTippedElements: destroyTippedElements,
        subscribeToGroup: subscribeToGroup,
        miniBasketCarousel: miniBasketCarousel,
        signUpEmail: signUpEmail
    }
}();
(function($) {
    $.fn.showHide = function(options) {
        var defaults = {
            speed: 1e3,
            easing: ""
        };
        var options = $.extend(defaults, options);
        $(this).click(function() {
            $(".toggleDiv").slideUp(options.speed, options.easing);
            var toggleClick = $(this);
            var toggleDiv = $(this).attr("rel");
            toggleClick.toggleClass("activeHelp");
            $(".helpHeader").not(this).removeClass("activeHelp");
            $(toggleDiv).is(":visible") ? $(".toggleDiv").slideUp(options.speed, options.easing) : $(toggleDiv).slideToggle(options.speed, options.easing, function() {});
            return false
        })
    }
})(jQuery);
var helpModule = function() {
    var moduleVar = {};
    var toggleOpenAccordionSection = function(sectionId, tabNumber) {
        $(".helpHeader").removeClass("activeHelp");
        $(".toggleDiv").hide();
        $(".toggleDiv:eq(" + tabNumber + ")").show().prev().addClass("activeHelp");
        if (tabNumber == 0)
            $(".shopping-accordion").accordionA("toggle", "#" + sectionId, true);
        else if (tabNumber == 1)
            $(".legal-accordion").accordionA("toggle", "#" + sectionId, true);
        else if (tabNumber == 2)
            $(".company-accordion").accordionA("toggle", "#" + sectionId, true);
        setTimeout(function() {
            $("body, html").animate({
                scrollTop: Math.floor($("#" + sectionId).offset().top - $(".main-header").height())
            }, "250")
        }, 500)
    };
    $(document).ready(function() {
        $("#delivery-exclusions tr:odd").addClass("pale-bg");
        $(".help-accordion").accordionA();
        $(".shopping-accordion").accordionA();
        $(".legal-accordion").accordionA();
        $(".company-accordion").accordionA();
        $(".toggleDiv:not(:first)").hide();
        $(".helpHeader").showHide({
            speed: 300,
            easing: ""
        });
        var helpSectionId = getParameterByName("helpSection");
        var subSectionId = getParameterByName("subSection");
        if (helpSectionId != "") {
            sectionNumber = 0;
            if ($("#" + helpSectionId).parent().hasClass("legal-accordion"))
                sectionNumber = 1;
            else if ($("#" + helpSectionId).parent().hasClass("company-accordion"))
                sectionNumber = 2;
            toggleOpenAccordionSection(helpSectionId, sectionNumber);
            if (subSectionId != "") {
                setTimeout(function() {
                    $("body, html").animate({
                        scrollTop: Math.floor($("#" + subSectionId).offset().top - $(".main-header").height())
                    }, "250")
                }, 1e3)
            }
        }
        $(".delivery-charges-link").click(function(e) {
            e.preventDefault();
            toggleOpenAccordionSection("shipping-charges", 0)
        });
        $(".exclusions-link").click(function(e) {
            e.preventDefault();
            toggleOpenAccordionSection("delivery-exclusions", 0)
        });
        $(".linkToPrivacyPolicy").click(function(e) {
            e.preventDefault();
            toggleOpenAccordionSection("privacy-policy", 1)
        });
        $(".terms-conditions-link").click(function(e) {
            e.preventDefault();
            toggleOpenAccordionSection("terms-conditions", 1);
            setTimeout(function() {
                $("body, html").animate({
                    scrollTop: Math.floor($("#delivery-terms-heading").offset().top)
                }, "250")
            }, 500)
        });
        $("a.copyright-trademark-notice").click(function(e) {
            e.preventDefault();
            toggleOpenAccordionSection("terms-conditions", 1);
            setTimeout(function() {
                $("body, html").animate({
                    scrollTop: Math.floor($("#copyright-trademark-notice").offset().top)
                }, "250")
            }, 500)
        });
        if (document.location.href.indexOf("?=legal") > +1) {
            $(".helpHeader").removeClass("activeHelp");
            $(".toggleDiv").hide();
            $(".toggleDiv:eq(1)").show().prev().addClass("activeHelp")
        }
    });
    return moduleVar
}();
var rangeModule = function() {
    var moduleVar = {};
    var calledFromLightbox = false;
    var currentObj = {};
    var currentObjId = {};
    var currentObjTitle = {};
    var currentObjDescription = {};
    var currentObjDetails = {};
    var currentObjFitNotes = {};
    var currentObjProvenance = {};
    var colourMode = false;
    var bedLinenMode = false;
    var rangeSliderPresent = false;
    var previousColour = "";
    var selectedCode = "";
    var accordionCreated = false;
    var rangeSlider = null;
    var currentWindowWidth = window.innerWidth;
    var windowWidth = window.innerWidth;
    var initAddToBasket = function() {
        $(".add-to-bag").addtobasket({
            debug: tcp_env.is_live === "false",
            selectedSkuFinder: function(button) {
                if (!button)
                    return null;
                var sku = button.parent().find(".size-selected").attr("sku-id");
                return sku
            },
            selectedQtyFinder: function(button) {
                return button.parent().find(".qtyList option:selected").val()
            },
            selectedProdIdFinder: function(button) {
                if (!button)
                    return null;
                return button.parent().attr("prod-id")
            },
            selectedPriceFinder: function(button) {
                if (!button)
                    return null;
                return button.parent().find(".nowPrice").attr("price")
            },
            selectedNameFinder: function(button) {
                if (!button)
                    return null;
                return button.parent().find(".product-info h3").text()
            },
            waitInitHandler: function() {
                document.body.style.cursor = "wait"
            },
            waitDestroyHandler: function() {
                document.body.style.cursor = "default"
            },
            addToBasketSuccessHandler: function(button, parameters) {
                var size = button.parent().find(".size-selected").text();
                button.parent().find(".stock-message").hide();
                button.parent().find("#added-to-basket").show().html("<span class='" +
                    "message-text'>" + parameters.productDisplayName + ", size " + size + " has been added to your basket.</span>");
                if (miniBasket) {
                    miniBasket.data("tcplMinibasket").refreshBasket()
                }
                document.body.style.cursor = "default";
                if ($(".basket-recommendations-container").length > 0) {
                    window.location = "/basket.htm"
                }
                setTimeout(function() {
                    var subBasketItems = "<li><a href='/basket.htm'><span><b>Go to basket</b></span><span class='mini-basket-sub-total'>" + $(".mini-basket .mini-basket-sub-total").text() + "</span></a></li>";
                    $(".basket-items li").each(function() {
                        subBasketItems += "<li>" + "<a href='" + $(this).find(".mini-details").attr("href") + "'>" + "<span>" + $(this).find(".prod-title").html() + "</span>" + "<span>" + $(this).find(".prod-cost").html() + "</span>" + "<span>" + $(this).find(".prod-size").html() + "</span>" + "<span>" + $(this).find(".prod-colour").html() + "</span>" + "<span>" + $(this).find(".prod-qty").html() + "</span>" + "</a>" + "</li>"
                    });
                    $(".left-draw-basket .mini-basket-sub-total").html("");
                    $(".sub-list-basket ul").html(subBasketItems);
                    $(".left-draw-basket > a").html("Basket " + $(".basket-items .qty").html())
                }, 500);
                if (typeof parameters.productDisplayName !== "undefined") {
                    _gaq.push(["_trackEvent", "Add to Basket", "Click", parameters.productDisplayName])
                }
            },
            addToBasketFailedHandler: function(button, parameters) {
                // console.log("Add to basket failure: ");
                // console.log("parameters", parameters);
                // console.log("button", button);
                // console.log("Failed to add")
            },
            trackingElementId: "trackers",
            validateBeforeAdd: function(button, parameters) {
                var $elem = button.parent();
                if ($elem.find(".size-selected").hasClass("out-of-stock") || $elem.find(".qtyList").is(":disabled")) {
                    document.body.style.cursor = "default";
                    return false
                }
                return true
            },
            selectedProductCategoryFinder: function () {
                if (typeof currentIndividualObj === 'undefined') {
                    return $('h1').text();
                }
                return currentIndividualObj.parentCategory
            }
        })
    };
    var getGroupStockInfo = function(skuListObject) {
        skuListObject.skuList = skuListObject.skuList.sort(function(a, b) {
            return a - b
        });
        var ret = [skuListObject.skuList[0]];
        for (var i = 1; i < skuListObject.skuList.length; i++) {
            if (skuListObject.skuList[i - 1] !== skuListObject.skuList[i]) {
                ret.push(skuListObject.skuList[i])
            }
        }
        skuListObject.skuList = ret;
        $.ajax({
            url: "/services/stockservices.asmx/GetProductVariantStock",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(skuListObject),
            dataType: "json",
            success: function(data, status) {
                stockJson = $.parseJSON(data.d);
                populateRangeImages();
               // populateRangeBuyOffSection();
                setFadedOutRangeImagesBasedOnStock();
               // populateRangeSizesBasedOnStock();
                initAddToBasket();
                if ($(".basket-recommendations-container").length < 1 && $(".wishlist-product").length < 1) {
                    toggleOpenDescription()
                }
                if (typeof wishlistModule.updateAddRemoveWishlistButton != "undefined") {
                    wishlistModule.updateAddRemoveWishlistButton()
                }
                var productClicked = getParameterByName("selectedProd");
                if (productClicked != "") {
                    setSelectedProductFromParam(productClicked)
                }
            }
        })
    };
    var getGroupProductInfo = function(skuList) {
        $.ajax({
            url: "/services/stockservices.asmx/GetProductData",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(skuList),
            dataType: "json",
            success: function(data, status) {
                productJson = $.parseJSON(data.d);
                for (var i = 0; i < productJson.products.length; i++) {
                    for (prop in productJson.products[i]) {
                        if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance" && prop != "restricted" && (productJson.products[i][prop][0].price === "0" || productJson.products[i][prop][0].price === null || productJson.products[i][prop][0].price === "0.00" || productJson.products[i][prop][0].price === "undefined")) {
                            productJson.products.splice(i, 1)
                        }
                    }
                }
                setCurrentObj(false);
                getGroupStockInfo(skuList)
            }
        })
    };
    setCurrentObj = function(useSize) {
        if (typeof rangeJson !== 'undefined')
            return;
        var selectedCode = "";
        if (useSize) {
            selectedCode = $(".size-selected").attr("prod-id")
        } else if (colourMode) {
            selectedCode = $(".selected-range-product").attr("base-code")
        } else {
            selectedCode = $(".selected-range-product").attr("id")
        }
        for (var i = 0; i < productJson.products.length; i++) {
            for (prop in productJson.products[i]) {
                if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance" && prop.toLowerCase() == selectedCode.toLowerCase()) {
                    currentObj = productJson.products[i][prop];
                    currentObjId = prop;
                    currentObjTitle = productJson.products[i].title;
                    currentObjDescription = productJson.products[i].description;
                    currentObjDetails = productJson.products[i].details;
                    currentObjFitNotes = productJson.products[i].fitNotes;
                    currentObjProvenance = productJson.products[i].provenance;
                    return
                }
            }
        }
    };
    var populateRangeImages = function() {
        var matchRangeRegex = /\/range\/.*\.htm/i;
        var previousIndex = 0;
        for (var i = 0; i < productJson.products.length; i++) {
            for (prop in productJson.products[i]) {
                if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance" && prop !== "restricted") {
                    var itemArr = productJson.products[i][prop];
                    if ($(".selected-colour-tile").length == 0) {
                        if ($("#lookbook-outer-wrap, #jersey-outer-wrap").length == 0) {
                            var inStockArr = [];
                            for (var b = 0; b < itemArr.length; b++) {
                                for (var k = 0; k < stockJson.stocklist.length; k++) {
                                    if (stockJson.stocklist[k].prodId.toLowerCase() == itemArr[b].prodId.toLowerCase()) {
                                        var itemInStock = false;
                                        for (var l = 0; l < stockJson.stocklist[k].sizesInStock.length; l++) {
                                            if (stockJson.stocklist[k].sizesInStock[l].stlev != "0" || stockJson.stocklist[k].sizesInStock[l].preOrderAvailable != "") {
                                                itemInStock = true;
                                                inStockArr.push(itemArr[b]);
                                                break
                                            }
                                        }
                                        if (!itemInStock && colourMode)
                                            inStockArr.push(itemArr[b]);
                                        break
                                    }
                                }
                            }
                            if (inStockArr.length > 0) {
                                itemArr = inStockArr
                            }
                        }
                        if (itemArr.length > 0) {
                            if (previousIndex >= itemArr.length) {
                                previousIndex = 0
                            }
                            var itemObj = itemArr[previousIndex];
                            if ($("#lookbook-outer-wrap, #jersey-outer-wrap").length > 0) {
                                var gotItemMoveOn = false;
                                for (var k = 0; k < lookbookModule.lookbookFoundItem.products.length; k++) {
                                    for (var q = 0; q < itemArr.length; q++) {
                                        if (itemArr[q].prodId.indexOf(lookbookModule.lookbookFoundItem.products[k].prodId.slice(0, 5)) != -1 && itemArr[q].upImg.toLowerCase().indexOf("/" + lookbookModule.lookbookFoundItem.products[k].skuColor.toLowerCase() + "/") != -1) {
                                            itemObj = itemArr[q];
                                            gotItemMoveOn = true;
                                            break
                                        }
                                    }
                                    if (gotItemMoveOn)
                                        break
                                }
                            }
                            var imgSrc = "";
                            if (false) {
                                var categoryStr = window.location.href.slice(window.location.href.search(matchRangeRegex) + 7, window.location.href.indexOf(".htm"));
                                var scalingImageFileName = "/" + prop + "_" + itemObj.colour.replace(/ /g, "").replace(/\//g, "") + ".jpg";
                                imgSrc = "/stormsites/toast/images/range-images/" + categoryStr + scalingImageFileName
                            } else {
                                imgSrc = itemObj.upImg.replace(sizeRegex, "/250/")
                            }
                            if (colourMode) {
                                $($("#" + itemObj.prodId + " img")[0]).attr({
                                    src: imgSrc.replace("gift_clear", "gift/clear"),
                                    alt: productJson.products[i].title,
                                    title: productJson.products[i].title,
                                    "prod-code": itemObj.prodId,
                                    "base-colour": itemObj.baseColour,
                                    "item-colour": itemObj.colour
                                })
                            } else {
                                $($("#" + prop + " img")[0]).attr({
                                    src: imgSrc.replace("gift_clear", "gift/clear"),
                                    alt: productJson.products[i].title,
                                    title: productJson.products[i].title,
                                    "prod-code": itemObj.prodId,
                                    "base-colour": itemObj.baseColour,
                                    "item-colour": itemObj.colour
                                })
                            }
                            previousIndex++
                        }
                    } else {
                        if (itemArr.length > 0) {
                            var baseColour = $(".selected-colour-tile").attr("base-colour").toLowerCase();
                            for (var m = itemArr.length - 1; m >= 0; m--) {
                                if (itemArr[m].baseColour.toLowerCase() === baseColour) {
                                    var itemObj = itemArr[m];
                                    var imgSrc = "";
                                    if (false) {
                                        var categoryStr = window.location.href.slice(window.location.href.search(matchRangeRegex) + 7, window.location.href.indexOf(".htm"));
                                        var scalingImageFileName = "/" + prop + "_" + itemObj.colour.replace(/ /g, "").replace(/\//g, "") + ".jpg";
                                        imgSrc = "/stormsites/toast/images/range-images/" + categoryStr + scalingImageFileName
                                    } else
                                        imgSrc = itemObj.upImg.replace(sizeRegex, "/250/");
                                    if (colourMode) {
                                        $($("#" + itemObj.prodId + " img")[0]).attr({
                                            src: imgSrc.replace("gift_clear", "gift/clear"),
                                            alt: window.productJson.products[i].title,
                                            title: window.productJson.products[i].title,
                                            "prod-code": itemObj.prodId,
                                            "base-colour": itemObj.baseColour,
                                            "item-colour": itemObj.colour
                                        })
                                    } else {
                                        $($("#" + prop + " img")[0]).attr({
                                            src: imgSrc.replace("gift_clear", "gift/clear"),
                                            alt: window.productJson.products[i].title,
                                            title: window.productJson.products[i].title,
                                            "prod-code": itemObj.prodId,
                                            "base-colour": itemObj.baseColour,
                                            "item-colour": itemObj.colour
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    var setFadedOutRangeImagesBasedOnStock = function() {
        for (var i = 0; i < $(".range-product img").length; i++) {
            for (var k = 0; k < stockJson.stocklist.length; k++) {
                if (typeof $($(".range-product img")[i]).attr("prod-code") !== "undefined" && stockJson.stocklist[k].prodId.toLowerCase() == $($(".range-product img")[i]).attr("prod-code").toLowerCase()) {
                    var inStock = false;
                    for (var l = 0; l < stockJson.stocklist[k].sizesInStock.length; l++) {
                        if (stockJson.stocklist[k].sizesInStock[l].stlev != "0" || stockJson.stocklist[k].sizesInStock[l].preOrderAvailable != "") {
                            inStock = true
                        }
                    }
                    if (!inStock) {
                        $($(".range-product img")[i]).addClass("range-product-out-of-stock");
                        break
                    } else {
                        $($(".range-product img")[i]).removeClass("range-product-out-of-stock")
                    }
                    break
                }
            }
        }
    };
    var setStockMessage = function () {
        if (typeof rangeJson !== 'undefined')
            return;
        $("#added-to-basket").hide();
        $(".stock-message").hide();
        var $sizeElem = $(".product-sizes ul .size-selected");
        if ($sizeElem.length == 0) {
            if (!bedLinenMode) {
                var setSize = false;
                for (var i = 0; i < $(".product-sizes ul .size").length; i++) {
                    if ($($(".product-sizes ul .size")[i]).attr("data-oos") == "false") {
                        $sizeElem = $($(".product-sizes ul .size")[i]).addClass("size-selected");
                        setSize = true;
                        break
                    }
                }
                if (!setSize) {
                    $sizeElem = $($(".product-sizes ul .size")[0]);
                    $sizeElem.addClass("size-selected")
                }
            } else {
                for (var i = 0; i < $(".product-sizes ul .size").length; i++) {
                    $sizeElem = $($(".product-sizes ul .size")[i]);
                    if ($sizeElem.attr("prod-id") == $(".product-details").attr("prod-id")) {
                        $sizeElem.addClass("size-selected");
                        break
                    }
                }
            }
        }
        var $stockMsg = $(".stock-message");
        if ($sizeElem.hasClass("out-of-stock")) {
            $stockMsg.show().html('<span class="message-text">Your selected size is currently out of stock.</span>')
        } else if (typeof $sizeElem.attr("low-stock") !== "undefined" && $sizeElem.attr("low-stock").length > 0 && parseInt($sizeElem.attr("low-stock")) < 7 && parseInt($sizeElem.attr("low-stock")) != 0) {
            $stockMsg.show().html('<span class="message-text">We have a limited number of this item left in your selected size.</span>');
            $sizeElem.addClass("low-stock")
        } else if (typeof $sizeElem.attr("low-stock") !== "undefined" && $sizeElem.attr("pre-order").length > 0) {
            $stockMsg.show().html('<span class="message-text">Your selected size is expected in our warehouse on ' + $sizeElem.attr("pre-order") + ". You can still order, we will send your item out to you as soon as it arrives.</span>");
            $sizeElem.addClass("pre-order")
        } else {
            $stockMsg.hide()
        }
    };
    var populateRangeSizesBasedOnStock = function() {
        var $sizeSelect = $(".product-sizes ul");
        $sizeSelect.html("");
        var sizeDisplay = "";
        if (!bedLinenMode && currentIndividualObj) {
            for (var i = 0; i < currentIndividualObj.skuSetArr.length; i++) {
                var size = currentIndividualObj.skuSetArr[i].slice(-2);
                sizeDisplay = size;
                var preOrderValue = "";
                var lowStockValue = "";
                var inStock = false;
                for (var k = 0; k < stockJson.stocklist.length; k++) {
                    if (stockJson.stocklist[k].prodId.toLowerCase() == currentIndividualObj.prodId.toLowerCase()) {
                        for (var m = 0; m < stockJson.stocklist[k].sizesInStock.length; m++) {
                            if (currentIndividualObj.skuSetArr[i].toLowerCase() == stockJson.stocklist[k].sizesInStock[m].sku.toLowerCase()) {
                                if (stockJson.stocklist[k].sizesInStock[m].stlev != "0" || stockJson.stocklist[k].sizesInStock[m].preOrderAvailable != "") {
                                    inStock = true;
                                    lowStockValue = stockJson.stocklist[k].sizesInStock[m].stlev
                                }
                                sizeDisplay = stockJson.stocklist[k].sizesInStock[m].value1;
                                preOrderValue = stockJson.stocklist[k].sizesInStock[m].preOrderAvailable;
                                break
                            }
                        }
                        break
                    }
                }
                if (sizeDisplay.toLowerCase() == "os")
                    sizeDisplay = "One Size";
                if (inStock) {
                    $sizeSelect.append($('<li class="grid-10 tablet-grid-10 mobile-grid-10 size" sku-id="' + currentIndividualObj.skuSetArr[i] + '" data-oos="' + !inStock + '" pre-order="' + preOrderValue + '" low-stock="' + lowStockValue + '" data-price="' + currentIndividualObj.price + '">' + sizeDisplay + "</li>"))
                } else {
                    $sizeSelect.append($('<li class="grid-10 tablet-grid-10 mobile-grid-10 size size-out-of-stock out-of-stock" sku-id="' + currentIndividualObj.skuSetArr[i] + '" data-oos="' + !inStock + '" pre-order="" low-stock="" data-price="' + currentIndividualObj.price + '">' + sizeDisplay + "</li>"))
                }
            }
            mainModule.checkForLegLengths()
        } else {
            for (var i = 0; i < productJson.products.length; i++) {
                var product = productJson.products[i];
                if (product.title == currentObjTitle) {
                    var sizeDisplay = "";
                    for (prop in product) {
                        if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance") {
                            var workingObj = product[prop];
                            var inStock = false;
                            for (var p = 0; p < workingObj.length; p++) {
                                var preOrderValue = "";
                                var lowStockValue = "";
                                if ($(".selected-swatch").attr("base-colour").toLowerCase() == workingObj[p].baseColour.toLowerCase() && $(".selected-swatch").attr("title").toLowerCase() == workingObj[p].colour.toLowerCase() || $(".selected-swatch").attr("alt").toLowerCase() == workingObj[p].colour.toLowerCase()) {
                                    if (!sizeDisplay || sizeDisplay.length == 0)
                                        sizeDisplay = "Undetermined";
                                    for (var k = 0; k < stockJson.stocklist.length; k++) {
                                        if (stockJson.stocklist[k].prodId.toLowerCase() == workingObj[p].prodId.toLowerCase()) {
                                            for (var m = 0; m < stockJson.stocklist[k].sizesInStock.length; m++) {
                                                if (workingObj[p].skuSetArr[0].toLowerCase() == stockJson.stocklist[k].sizesInStock[m].sku.toLowerCase()) {
                                                    if (stockJson.stocklist[k].sizesInStock[m].stlev != "0" || stockJson.stocklist[k].sizesInStock[m].preOrderAvailable != "") {
                                                        inStock = true;
                                                        lowStockValue = stockJson.stocklist[k].sizesInStock[m].stlev
                                                    }
                                                    sizeDisplay = stockJson.stocklist[k].sizesInStock[m].value1;
                                                    preOrderValue = stockJson.stocklist[k].sizesInStock[m].preOrderAvailable;
                                                    break
                                                }
                                            }
                                            break
                                        }
                                    }
                                    if (sizeDisplay == "Undetermined" && product.fitNotes != undefined) {
                                        var notes = product.fitNotes;
                                        var firstIndex = notes.indexOf("&quot;&gt;");
                                        var lastIndex = notes.indexOf("&lt;", firstIndex);
                                        sizeDisplay = notes.slice(firstIndex + 10, lastIndex)
                                    }
                                    if (inStock) {
                                        $sizeSelect.append($('<li class="grid-10 tablet-grid-10 mobile-grid-10 size" prod-id="' + prop + '" sku-id="' + workingObj[p].skuSetArr[0] + '" data-oos="' + !inStock + '" pre-order="' + preOrderValue + '" low-stock="' + lowStockValue + '" data-price="' + workingObj[p].price + '">' + sizeDisplay + "</li>"))
                                    } else {
                                        $sizeSelect.append($('<li class="grid-10 tablet-grid-10 mobile-grid-10 size size-out-of-stock out-of-stock" prod-id="' + prop + '" sku-id="' + workingObj[p].skuSetArr[0] + '" data-oos="' + !inStock + '" pre-order="" low-stock="" data-price="' + workingObj[p].price + '">' + sizeDisplay + "</li>"))
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        setStockMessage();
        setRangeItemQuantityEnabled();
        mainModule.checkProductSizeBoxWidth();
        $(".product-description-content .prodID").text($(".size-selected").attr("sku-id").slice(0, 5));
        if ($(".product-sizes .size").length == $(".product-sizes .out-of-stock").length)
            $(".add-to-bag").attr("disabled", "disabled").text("Out of Stock");
        else
            $(".add-to-bag").removeAttr("disabled").text("Add To Bag")
    };
    var displayNewPrice = function(theProduct) {
        if (typeof theProduct !== "undefined") {
            var currency_symbol = tcp_env.currency_symbol === "&#163;" ? "£" : typeof tcp_env.currency_symbol !== "undefined" ? tcp_env.currency_symbol : "£";
            if ($("#salePrice").length > 0)
                $("#salePrice").remove();
            $(".nowPrice").removeClass("price-strike-through");
            var price = parseFloat(theProduct.price).toFixed(2);
            $(".nowPrice").attr("price", price).text(currency_symbol + price);
            if (theProduct.price != theProduct.salePrice && theProduct.salePrice != "0") {
                var salePrice = parseFloat(theProduct.salePrice).toFixed(2);
                $(".product-info").append($('<p id="salePrice">' + currency_symbol + salePrice + "</p>"));
                $(".nowPrice").addClass("price-strike-through")
            }
        }
    };
    var populateRangeBuyOffSection = function() {
        currentIndividualObj = undefined;
        var $selectedRangeItemTile = undefined;
        if ($(".selected-range-product img").length > 1) {
            $selectedRangeItemTile = $($(".selected-range-product img")[1])
        } else {
            $selectedRangeItemTile = $(".selected-range-product img")
        }
        $(".group-buy-off .product-swatches").html("");
        for (var i = 0; i < currentObj.length; i++) {
            var itemObj = currentObj[i];
            var imgSrc = itemObj.upImg.replace(sizeRegex, "/250/").replace("gift_clear", "gift/clear");
            var $newSwatch = $('<li class="grid-15 tablet-grid-15 mobile-grid-15 swatch"><img src="' + imgSrc + '" id="' + itemObj.prodId + '" class="grid-image product-swatch" alt="' + itemObj.colour + '" title="' + itemObj.colour + '" data-tab-index="' + i + '" base-colour="' + itemObj.baseColour.toLowerCase() + '"></li>');
            $(".group-buy-off .product-swatches").append($newSwatch);
            if (!bedLinenMode && $selectedRangeItemTile.length > 0 && $selectedRangeItemTile.attr("prod-code").toLowerCase() === itemObj.prodId.toLowerCase()) {
                $newSwatch.find("img").addClass("selected-swatch");
                currentIndividualObj = itemObj;
                $(".colour-showing").text(itemObj.colour)
            } else if (bedLinenMode && previousColour.length == 0 && $selectedRangeItemTile.length > 0 && $selectedRangeItemTile.attr("prod-code").toLowerCase() === itemObj.prodId.toLowerCase() && $selectedRangeItemTile.attr("item-colour").toLowerCase() == itemObj.colour.toLowerCase()) {
                $newSwatch.find("img").addClass("selected-swatch");
                currentIndividualObj = itemObj;
                $(".colour-showing").text(itemObj.colour);
                previousColour = itemObj.baseColour.toLowerCase()
            } else if (bedLinenMode && previousColour.length > 0 && $selectedRangeItemTile.attr("item-colour").toLowerCase() === itemObj.colour.toLowerCase()) {
                for (var k = 0; k < currentObj.length; k++) {
                    if (previousColour == currentObj[k].baseColour.toLowerCase()) {
                        $newSwatch.find("img").addClass("selected-swatch");
                        currentIndividualObj = currentObj[k];
                        $(".colour-showing").text(itemObj.colour);
                        previousColour = currentObj[k].baseColour.toLowerCase()
                    }
                }
            }
        }
        setRangeImage();
        $(".product-details").attr("prod-id", currentObjId);
        $(".product-info h3").text(currentObjTitle);
        if (typeof currentObj[0] !== "undefined") {
            if ($(".goToPageAnchor").length === 0 && currentObj) {
                var $goToPageAnchor = $('<a class="goToPageAnchor"></a>');
                $goToPageAnchor.attr("href", "/product/" + currentObj[0].parentCategory.replace(/ /g, "+").replace(/\//g, "+") + "/" + currentObjId + "/" + currentObjTitle.replace(/ /g, "+").replace(/\//g, "+").replace(/'/g, "") + ".htm?clr=" + currentObjId.slice(0, 5) + "_" + $(".colour-showing").text().replace(/ /g, "").replace(/\//g, ""));
                $(".product-info h3").wrapAll($goToPageAnchor)
            } else {
                $(".goToPageAnchor").attr("href", "/product/" + currentObj[0].parentCategory.replace(/ /g, "+").replace(/\//g, "+") + "/" + currentObjId + "/" + currentObjTitle.replace(/ /g, "+").replace(/\//g, "+").replace(/'/g, "") + ".htm?clr=" + currentObjId.slice(0, 5) + "_" + $(".colour-showing").text().replace(/ /g, "").replace(/\//g, ""))
            }
        }
        displayNewPrice(currentIndividualObj);
        var parsedHtmlDesc = $("<div />").html(currentObjDescription).text();
        if (typeof parsedHtmlDesc == "undefined" || parsedHtmlDesc.length == 0)
            parsedHtmlDesc = currentObjDescription;
        $(".product-description-content p").html(parsedHtmlDesc);
        $(".details").empty();
        $(".fit-notes").empty();
        for (prop in currentObjDetails) {
            $(".details").append($("<li>" + currentObjDetails[prop] + "</li>"))
        }
        if (currentObjFitNotes) {
            var fitHtml = $.parseHTML(currentObjFitNotes);
            var $fitNotes = $(".fit-notes").append(fitHtml);
            var $newFitNotes = $($fitNotes.text().replace(/"/g, ""));
            $fitNotes.html("").append($newFitNotes);
            for (var i = 0; i < $(".regSize, .longSize").length; i++) {
                $($(".fit-notes .regSize, .fit-notes .longSize")[i]).text($($(".fit-notes .regSize, .fit-notes .longSize")[i]).text() + '"')
            }
        }
        if (currentObjProvenance && currentObjProvenance.length > 0) {
            var provenanceHtml = currentObjProvenance.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            $(".details").append($(provenanceHtml))
        }
         if (window.location.href.indexOf("/range/") < 0 ){
        mainModule.setSocialVariables();
    }

      
        setTimeout(function() {
            mainModule.destroyTippedElements();
            mainModule.populateTippedElements()
        }, 50)
    };
    var setRangeItemQuantityEnabled = function() {
        if ($(".product-sizes li.size-selected").length > 0) {
            if ($(".product-sizes li.size-selected").hasClass("size-out-of-stock"))
                $(".qtyList").attr("disabled", "disabled");
            else
                $(".qtyList").removeAttr("disabled")
        }
    };
    var setSelectedProductFromParam = function(productClicked) {
        var foundSelectedProd = false;
        for (var i = $(".group-images .range-product").length - 1; i >= 0; i--) {
            if (foundSelectedProd)
                break;
            if (bedLinenMode) {
                if ($($(".group-images .range-product")[i]).attr("size-ids").toLowerCase().indexOf(productClicked.substring(0, 5).toLowerCase()) != -1) {
                    $($(".group-images .range-product")[i]).trigger("click");
                    foundSelectedProd = true;
                    break
                }
            } else if (!colourMode) {
                if ($($(".group-images .range-product")[i]).attr("id").substring(0, 5).toLowerCase().indexOf(productClicked.substring(0, 5).toLowerCase()) != -1) {
                    $($(".group-images .range-product")[i]).trigger("click");
                    foundSelectedProd = true;
                    break
                }
            } else {
                var thisProdCode = productClicked.substring(0, 5);
                for (var m = 0; m < window.productJson.products.length; m++) {
                    if (foundSelectedProd)
                        break;
                    if (window.productJson.products[m][thisProdCode] != undefined) {
                        for (var d = 0; d < window.productJson.products[m][thisProdCode].length; d++) {
                            for (var k = 0; k < window.productJson.products[m][thisProdCode][d].skuSetArr.length; k++) {
                                if (window.productJson.products[m][thisProdCode][d].skuSetArr[k] == productClicked) {
                                    $("#" + window.productJson.products[m][thisProdCode][d].prodId).trigger("click");
                                    foundSelectedProd = true;
                                    break
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!foundSelectedProd) {
            var thisProdCode = productClicked.substring(0, 5);
            $("#" + thisProdCode).trigger("click")
        }
    };
    var toggleOpenDescription = function() {
        setTimeout(function() {
            $(".product-accordion").accordionA("toggle", $($(".product-accordion section")[0]), true)
        }, 500)
    };
    var workOutRangeImageSize = function() {
        var newSize = "250";
        if (windowWidth < 600 && windowWidth > 479) {
            newSize = "350"
        } else if (windowWidth < 1024 && windowWidth > 600) {
            newSize = "450"
        } else if (windowWidth < 1440 && windowWidth > 1024) {
            newSize = "550"
        } else if (windowWidth < 2e3 && windowWidth > 1440) {
            newSize = "700"
        } else {
            newSize = "950"
        }
        return newSize
    };
    var setRangeImage = function (calledFromSwatch) {
        if (typeof currentIndividualObj === 'undefined')
            return;
        windowWidth = window.innerWidth;
        if (typeof currentWindowWidth == "undefined") {
            currentWindowWidth = window.innerWidth
        }
        if (currentWindowWidth > windowWidth && calledFromLightbox === false)
            return;
        newSize = workOutRangeImageSize();
        var $img = $(".product-swatches .selected-swatch");
        var $mainImg = $(".main-product-image");
        var $spinner = $(".spinner");
        if ($img.attr("src") != undefined && $img.attr("src").search(sizeRegex) != -1) {
            var str = $img.attr("src");
            str = str.replace(sizeRegex, "/" + newSize + "/").replace("gift_clear", "gift/clear");
            var globalIndex = str.indexOf("/global/");
            if (globalIndex != -1)
                str = str.replace("/global/", "/product/");
            if (str != $mainImg.attr("src")) {
                $mainImg.attr({
                    src: str,
                    alt: currentIndividualObj.title,
                    title: currentIndividualObj.title
                });
                $spinner.removeClass("visuallyHidden");
                if ($(".range-lifestyle").length > 0) {
                    $(".range-lifestyle").removeClass("visuallyHidden")
                }
            }
            if ($(".zoom-anchor").length > 0) {
                $(".zoom-anchor").attr("href", $mainImg.attr("src").replace(sizeRegex, "/1200/"));
                if ($(".range-lifestyle").length > 0) {
                    $(".range-lifestyle").parent().attr("href", $(".range-lifestyle").attr("src").replace(sizeRegex, "/1200/"))
                }
                MagicZoomPlus.refresh()
            }
        }
        currentWindowWidth = windowWidth;
        if (calledFromLightbox === true && calledFromSwatch !== true) {
            $("#lightbox-buy-off .main-product-image").hide();
            var currentImg = $("#lightbox-buy-off .main-product-image").attr("src").split("/");
            try {
                var newImg = currentImg[0] + "/" + currentImg[1] + "/" + currentImg[2] + "/global/" + currentImg[4] + "/s1/" + currentImg[6] + "/" + currentImg[7];
                $("#lightbox-buy-off .main-product-image").attr("src", newImg);
                var newZoomImg = currentImg[0] + "/" + currentImg[1] + "/" + currentImg[2] + "/global/" + currentImg[4] + "/s1/1553/" + currentImg[7];
                $("#lightbox-buy-off .MagicZoomPlus").attr("href", newZoomImg)
            } catch (e) {}
            $("#lightbox-buy-off .main-product-image").load(function() {
                $("#lightbox-buy-off .main-product-image").show()
            });
            $("#lightbox-buy-off").modal("show")
        }
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
            "zoom-window-effect": true,
            "disable-expand": true,
            "disable-zoom": false
        }
    };
    var getLightboxTemplate = function() {
        return $(['<div class="buy-off-container group-buy-off grid-90 prefix-5 suffix-5 mobile-grid-100 tablet-grid-90 tablet-prefix-5 tablet-suffix-5 grid-parent">', '<div class="group-product-image grid-45 mobile-grid-100 tablet-grid-50 suffix-5">', '<img src="//d1kh76s6bjh8ww.cloudfront.net/img/ajaxLoader.gif" class="spinner visuallyHidden">', '<a href="#" class="zoom-anchor MagicZoomPlus" title="Click to zoom">', '<img class="main-product-image" />', "</a>", "</div>", '<div class="product-details grid-50 tablet-grid-50 mobile-grid-100">', '<div class="product-info grid-100 suffix-15 tablet-grid-95 tablet-suffix-5 mobile-grid-100 grid-parent">', "<h3></h3>", '<p class="nowPrice"></p>', "</div>", '<div class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', '<article class="group-product-description product-accordion accordion-a" role="tablist">', "<section>", "<header>", "<h2>Description</h2>", "</header>", '<div class="content product-description-content">', "<p></p>", '<ul class="details"></ul>', '<span class="desc-prod-code">Style Code: <span class="prodID"></span></span>', "</div>", "</section>", "</article>", "</div>", '<h3 class="product-label">Colour: <span class="colour-showing"></span></h3>', '<div class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', '<ul class="product-swatches">', "</ul>", "</div>", '<h3 class="product-label ">Size: <a class="product-size-charts" target="_blank" href="/content/help/help.htm#size-fit">(Size Chart)</a></h3>', '<div class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent product-sizes">', '<ul class="product-sizes"></ul>', "</div>", '<div class="grid-100 tablet-grid-100 mobile-grid-100 stock-message hidden-message"></div>', '<h3 class="product-label">Quantity: </h3>', '<div class="product-qty">', '<select class="qtyList" name="qty">', '<option value="1">1</option>', '<option value="2">2</option>', '<option value="3">3</option>', '<option value="4">4</option>', '<option value="5">5</option>', '<option value="6">6</option>', "</select>", "</div>", '<div id="added-to-basket" class="grid-100 tablet-grid-100 mobile-grid-100 stock-message-added hidden-message">Added to basket</div> ', '<div id="#addToBasket" class="grid-100 tablet-grid-100 mobile-grid-100 product-button add-to-bag">Add to bag</div>', "</div>", "</div>"].join(""))
    };
    var getRangeBuyOffTemplate = function() {
        return $(['<div class="buy-off-container group-buy-off grid-90 prefix-5 suffix-5 mobile-grid-100 tablet-grid-90 tablet-prefix-5 tablet-suffix-5 grid-parent">', '<a href="#" class="buy-off-close">close</a>', '<div class="group-product-image grid-45 mobile-grid-100 tablet-grid-50 suffix-5">', '<img src="//d1kh76s6bjh8ww.cloudfront.net/img/ajaxLoader.gif" class="spinner visuallyHidden">', '<a href="#" class="zoom-anchor MagicZoomPlus" title="Click to zoom">', '<img class="main-product-image" />', "</a>", $("#range-lifestyle-holder").length > 0 ? '<a href="#" class="zoom-anchor MagicZoomPlus" title="Click to zoom"><img class="range-lifestyle visuallyHidden" /></a>' : "", "</div>", '<div class="product-details grid-50 tablet-grid-50 mobile-grid-100">', '<div class="product-info grid-100 suffix-15 tablet-grid-95 tablet-suffix-5 mobile-grid-100 grid-parent">', "<h3></h3>", '<p class="nowPrice"></p>', "</div>", '<div class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', '<article class="group-product-description product-accordion accordion-a" role="tablist">', "<section>", "<header>", "<h2>Description</h2>", "</header>", '<div class="content product-description-content">', "<p></p>", '<ul class="details"></ul>', '<span class="desc-prod-code">Style Code: <span class="prodID"></span></span>', "</div>", "</section>", '<section id="the-final-section">', "<header>", "<h2>Shipping & Returns</h2>", "</header>", '<div class="content">', "</div>", "</section>", "</article>", "</div>", '<h3 class="product-label">Colour: <span class="colour-showing"></span></h3>', '<div class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', '<ul class="product-swatches">', "</ul>", "</div>", '<h3 class="product-label ">Size: <a class="product-size-charts" target="_blank" href="/content/help/help.htm#size-fit">(Size Chart)</a></h3>', '<div class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent product-sizes">', '<ul class="product-sizes"></ul>', "</div>", '<div class="grid-100 tablet-grid-100 mobile-grid-100 stock-message hidden-message"></div>', '<h3 class="product-label">Quantity: </h3>', '<div class="product-qty">', '<select class="qtyList" name="qty">', '<option value="1">1</option>', '<option value="2">2</option>', '<option value="3">3</option>', '<option value="4">4</option>', '<option value="5">5</option>', '<option value="6">6</option>', "</select>", "</div>", '<div id="added-to-basket" class="grid-100 tablet-grid-100 mobile-grid-100 stock-message-added hidden-message">Added to basket</div> ', '<div id="#addToBasket" class="grid-100 tablet-grid-100 mobile-grid-100 product-button add-to-bag">Add to bag</div>', '<div class="grid-100 tablet-grid-100  mobile-grid-100 product-button checkout">', '<a id="ctl00_globalMainContent_btnCheckout" class="darkButton" href="/basket.htm">Checkout</a>', "</div>", "</div>", "</div>"].join(""))
    };
    var initialiseBuyOff = function() {
        $("#the-final-section .content").load("/content/site/product/shipping-Returns.htm .shipping-content");
        $('h3.product-label:contains("Share")').hide();
        $(".buy-off-container").append($('<div class="fit-notes visuallyHidden"></div>'));
        if ($(".bedlinen-buy-off").length > 0) {
            bedLinenMode = true;
            previousColour = ""
        }
        if ($(".colour-mode").length > 0) {
            colourMode = true
        }
        if ($(".group-images").length > 0 && $(".lookbook-buy-off, .jersey-buy-off").length == 0) {
            var skuListObject = {
                skuList: []
            };
            for (var i = 0; i < $(".group-images .range-product").length; i++) {
                if (!bedLinenMode && !colourMode) {
                    skuListObject.skuList.push($($(".group-images .range-product")[i]).attr("id"))
                } else if (!bedLinenMode && colourMode) {
                    skuListObject.skuList.push($($(".group-images .range-product")[i]).attr("base-code"))
                } else {
                    for (var i = 0; i < $(".range-product").length; i++) {
                        var splitArr = $($(".range-product")[i]).attr("size-ids").split("-");
                        for (var j = 0; j < splitArr.length; j++) {
                            skuListObject.skuList.push(splitArr[j])
                        }
                    }
                }
            }
            getGroupProductInfo(skuListObject)
        }
        loadZoom();

        if (window.location.href.indexOf("/range/") < 0 ){
        $(".buy-off-container .product-details").append($('<div id="social" class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent"/>').load("/stormsites/toast/content/html/en-GB/site/social-icons.html #social a", function() {
             if (window.location.href.indexOf("/range/") < 0 ){
          mainModule.setSocialIcons()
        }
           
        }


        ) )}
    };
    var setBaseBuyOffVars = function() {
        currentWindowWidth = window.innerWidth;
        windowWidth = window.innerWidth;
        var lazyRangeImgLayout = _.debounce(setRangeImage, 300);
        $(window).resize(lazyRangeImgLayout)
    };
    var setBreadcrumb = function() {
        var $catLink = $("#category-link");
        var linkArr = $catLink.data("link");
        for (var i = 0; i < linkArr.length; i++) {
            var catStr = linkArr[i];
            if (document.referrer.indexOf(catStr) != -1 || document.referrer.replace(/%20/g, "+").indexOf(catStr) != -1) {
                assignBreadcrumbDetails($catLink, catStr);
                doneBreadcrumb = true;
                break
            }
        }
    };
    var assignBreadcrumbDetails = function($catLink, catStr) {
        $catLink.attr("href", catStr);
        var lastSlash = catStr.lastIndexOf("/");
        var htmIndex = catStr.indexOf(".htm");
        var nameOfCat = catStr.slice(lastSlash + 1, htmIndex);
        $catLink.find("span").text(nameOfCat.replace(/\+/g, " "));
        if (catStr.toLowerCase().indexOf("category/women") !== -1) {
            $("#section-link").attr("href", "/women.htm");
            $("#section-link").find("span").text("women")
        } else if (catStr.toLowerCase().indexOf("category/men") !== -1) {
            $("#section-link").attr("href", "/men.htm");
            $("#section-link").find("span").text("men")
        } else {
            $("#section-link").attr("href", "/houseandhome.htm");
            $("#section-link").find("span").text("house&home")
        }
    };
    addRangeListeners = function() {
        $(".group-images").on("click", ".range-product", function(e) {
            var relatedBuyOff = $(this).parent().parent().attr("related-buy-off");
            if (relatedBuyOff != undefined && relatedBuyOff != "") {
                $(".buy-off-container").insertAfter($(this).parent().parent())
            }
            $(".buy-off-container").css({
                height: "auto",
                opacity: 1
            });
            if (!$(this).hasClass("selected-range-product")) {
                previousColour = "";
                $(".selected-range-product").removeClass("selected-range-product");
                $(this).addClass("selected-range-product");
                currentWindowWidth = 0;
                setCurrentObj(false);
                 if (isLookBook){
                populateRangeBuyOffSection();
                populateRangeSizesBasedOnStock();
           }
                toggleOpenDescription();
                if (typeof wishlistModule.updateAddRemoveWishlistButton != "undefined") {
                    wishlistModule.updateAddRemoveWishlistButton()
                }
            }
            reviewDisplayModule.callReviews()
        });
        $(".group-buy-off").on("click", ".product-swatch", function(e) {
            if (!$(this).hasClass("selected-swatch")) {
                var $elem = $(".buy-off-container");
                previousColour = $(this).attr("base-colour");
                $elem.find(".product-swatch").removeClass("selected-swatch");
                $(this).addClass("selected-swatch");
                for (var i = 0; i < currentObj.length; i++) {
                    var itemObj = currentObj[i];
                    if ($(this).attr("base-colour").toLowerCase() == itemObj.baseColour.toLowerCase() && $(this).attr("title").toLowerCase() == itemObj.colour.toLowerCase() || $(this).attr("alt").toLowerCase() == itemObj.colour.toLowerCase()) {
                        currentIndividualObj = itemObj;
                        $elem.find(".colour-showing").text(itemObj.colour)
                    }
                }
                setRangeImage(true);
                 if (isLookBook){
                populateRangeSizesBasedOnStock();
           }
                displayNewPrice(currentIndividualObj)
            }
        });
        // $("body").on("click", ".buy-off-close", function(e) {
        //     e.preventDefault();
        //     $(this).parent().css({
        //         height: "0",
        //         opacity: 0
        //     })
        // });
        $(".group-buy-off").on("click", ".size", function(e) {
            if ($(this).hasClass(".size-selected"))
                return;
            if (bedLinenMode) {
                $(".size-selected").removeClass("size-selected");
                $(this).addClass("size-selected");
                setCurrentObj(true);
                 if (isLookBook){
                populateRangeBuyOffSection();
           }
                setRangeItemQuantityEnabled();
                setStockMessage();
                toggleOpenDescription()
            } else {
                $(".size").removeClass("size-selected");
                $(this).addClass("size-selected");
                setStockMessage()
            }
            $(".product-description-content .prodID").text($(".size-selected").attr("sku-id").slice(0, 5))
        });
        $(".colour-tiles li").click(function() {
            if (!$(this).hasClass("selected-colour-tile")) {
                if ($(".selected-colour-tile").length > 0)
                    $(".selected-colour-tile").removeClass("selected-colour-tile");
                if ($(".selected-mix-tile").length > 0)
                    $(".selected-mix-tile").removeClass("selected-mix-tile");
                $(this).addClass("selected-colour-tile");
                previousColour = $(this).attr("base-colour");
                populateRangeImages();
                setCurrentObj(false);
                setFadedOutRangeImagesBasedOnStock();
                 if (isLookBook){
               populateRangeBuyOffSection();
               populateRangeSizesBasedOnStock();
          }
                toggleOpenDescription()
            }
        });
        $(".mix-container").click(function() {
            if (!$(this).hasClass("selected-mix-tile")) {
                if ($(".selected-colour-tile").length > 0)
                    $(".selected-colour-tile").removeClass("selected-colour-tile");
                $(this).addClass("selected-mix-tile");
                populateRangeImages();
                setCurrentObj(false);
                setFadedOutRangeImagesBasedOnStock();
                
                 if (isLookBook){
                populateRangeBuyOffSection();
                populateRangeSizesBasedOnStock()
            }
            }
        });
        $(".main-product-image").load(function(e) {
            $(".group-product-image .spinner").addClass("visuallyHidden")
        })
    };
    bedLinenMode = false;
    colourMode = false;
    if ($(".group-product-image").length > 0) {
        setBaseBuyOffVars()
    }
    if ($(".buy-off-container").length > 0) {
        $("body").on("click", ".bv-dropdown-item", function(e) {
            sortOrder = $(this).text();
            _gaq.push(["_trackEvent", "Review Sort", "Click", sortOrder])
        })
    }
    if ($("#category-link").length > 0) {
        setBreadcrumb()
    }
    $(document).ready(function() {
        if (typeof isLookBook == 'undefined') {
            isLookBook = false
        }
        if (isLookBook){
        $(".template-buy-off").after(getRangeBuyOffTemplate());
    }
        $(".lightbox-template-buy-off").after(getLightboxTemplate());
        if ($("#range-lifestyle-holder").data("src") != "" && $("#range-lifestyle-holder").data("src") != "undefined") {
            $(".range-lifestyle").attr("src", $("#range-lifestyle-holder").data("src"))
        }
        if ($(".buy-off-container").length > 0) {
            initialiseBuyOff();
            addRangeListeners();
            $("#breadcrumb").removeClass("grid-90 tablet-grid-90 suffix-5 prefix-5 tablet-suffix-5 tablet-prefix-5 grid-80 tablet-grid-80 tablet-prefix-10 tablet-suffix-10 suffix-10 prefix-10").addClass("grid-100 tablet-grid-100 grid-parent");
            $(".range-breadcrumb").removeClass("grid-60 prefix-5").addClass("grid-100");
            $(".breadcrumb-browse-controls").removeClass("grid-95 tablet-grid-95 mobile-grid-95 tablet-prefix-5 tablet-suffix-5 mobile-prefix-5 mobile-suffix-5").addClass("grid-100 tablet-grid-100 mobile-grid-100");
            $(".template-buy-off, .buy-off-container").removeClass("grid-90 prefix-5 suffix-5").addClass("grid-100")
        }
        if ($(".lookbook-buy-off, .jersey-buy-off").length == 0) {
            rangeSlider = null;
            rangeSliderPresent = false;
            if ($(window).width() < 767) {
                rangeSliderPresent = true;
                rangeSlider = $(".group-images .group-images-set-one").bxSlider({
                    touchEnabled: false,
                    auto: false,
                    slideWidth: 500,
                    minSlides: 3,
                    maxSlides: 3
                })
            }
            var waitOnEvent = function() {
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
                waitOnEvent(function() {
                    if ($(window).width() < 767 && !rangeSliderPresent) {
                        rangeSliderPresent = true;
                        rangeSlider = $(".group-images .group-images-set-one").bxSlider({
                            touchEnabled: false,
                            auto: false,
                            slideWidth: 500,
                            minSlides: 3,
                            maxSlides: 3
                        })
                    } else if (rangeSlider && rangeSlider.destroySlider && $(window).width() > 768) {
                        rangeSlider.destroySlider();
                        rangeSlider = null;
                        rangeSliderPresent = false
                    }
                }, 500, "windowResize")
            })
        }
    });
    return moduleVar = {
        toggleOpenDescription: toggleOpenDescription,
        setCurrentObj: setCurrentObj,
        populateRangeImages: populateRangeImages,
        populateRangeBuyOffSection: populateRangeBuyOffSection,
        setFadedOutRangeImagesBasedOnStock: setFadedOutRangeImagesBasedOnStock,
        populateRangeSizesBasedOnStock: populateRangeSizesBasedOnStock,
        initAddToBasket: initAddToBasket,
        setBaseBuyOffVars: setBaseBuyOffVars,
        addRangeListeners: addRangeListeners,
        initialiseBuyOff: initialiseBuyOff,
        getRangeBuyOffTemplate: getRangeBuyOffTemplate,
        getLightboxTemplate: getLightboxTemplate
    }
}();
var wishlistModule = function() {
    var moduleVar = {
        wishlistProductJson: undefined,
        wishlistStockJson: undefined,
        wishListCollection: {
            wishlist: []
        }
    };
    var selectedItemCode = "";
    var viewMode = false;
    var wishItemOutOfStockStr = "Out Of Stock";
    var wishItemPreOrderAvailableStr = "Pre-Order Available";
    var wishItemAddToBagStr = "Add To Bag";
    var itemInWishlist = false;
    var wishAddAll = false;
    var initWishlistAddToBasket = function() {
        $(".wishlist-add-all, .wishlist-add-to-bag-btn").addtobasket({
            debug: tcp_env.is_live === "false",
            selectedProductArrayBuilder: function(button) {
                if (!button) {
                    return null
                }
                var wishlistProductsToAdd = [];
                if (button.hasClass("wishlist-add-all")) {
                    wishlistProductsToAdd = $(".wishlist-product")
                } else {
                    wishlistProductsToAdd = button.parent().parent().parent()
                }
                var productsToAdd = Array();
                wishlistProductsToAdd.each(function() {
                    var $this = $(this);
                    if ($this.find(".wishlist-add-to-bag-btn span").text().toLowerCase() != "out of stock") {
                        var productId = $this.find(".range-product").attr("id");
                        var sku = $this.attr("sku");
                        var quantity = $(".wish-item-qty", $this).data("quantity");
                        var price = $this.find(".price-of-item").attr("price");
                        var name = $this.find(".wish-item-title").text();
                        var parentCategory = "";
                        $.each(moduleVar.wishlistProductJson.products, function(index, product) {
                            if (typeof product[productId] != "undefined") {
                                parentCategory = product[productId][0].parentCategory
                            }
                        });
                        productsToAdd.push({
                            productid: productId,
                            sku: sku,
                            quantity: quantity,
                            price: price,
                            productDisplayName: name,
                            productCategory: parentCategory
                        })
                    }
                });
                return productsToAdd
            },
            waitInitHandler: function() {
                document.body.style.cursor = "wait"
            },
            waitDestroyHandler: function() {
                document.body.style.cursor = "default"
            },
            addToBasketSuccessHandler: function(button, parameters) {
                if (button.hasClass("wishlist-add-all")) {
                    wishAddAll = true
                } else {
                    var $item = button.parent().parent().parent();
                    $item.find(".wishlist-add-to-bag-btn span").text("Added to Basket");
                    $item.find(".wishlist-add-to-bag-btn").addClass("grey-wish-btn");
                    setTimeout(function() {
                        $item.find(".wishlist-add-to-bag-btn").removeClass("grey-wish-btn");
                        $item.find(".wishlist-add-to-bag-btn span").text("Add to Bag")
                    }, 3e3)
                }
                _gaq.push(["_trackEvent", "Wishlist Add to Basket", "Click", parameters.productDisplayName])
            },
            addToBasketFailedHandler: function(button, parameters) {
                // console.log("Add to basket failure: ");
                // console.log("parameters", parameters);
                // console.log("button", button)
            },
            trackingElementId: "trackers",
            validateBeforeAdd: function(button, productsToAdd) {
                var msgContainer = $(".messages");
                msgContainer.empty();
                var isValid = true;
                for (var i = 0; i < productsToAdd.length; i++) {
                    if (!productsToAdd[i].sku || !productsToAdd[i].productid || !productsToAdd[i].quantity) {
                        isValid = false
                    }
                }
                if (!isValid) {
                    // console.log("Invalid Product details")
                }
                return isValid
            },
            addToBasketComplete: function(operations) {
                if (wishAddAll) {
                    $(".wishlist-add-all").addClass("grey-wish-btn").find("span").text("All in stock items added to basket");
                    setTimeout(function() {
                        $(".wishlist-add-all").removeClass("grey-wish-btn").find("span").text("Add all items to basket")
                    }, 3e3);
                    _gaq.push(["_trackEvent", "Wishlist Add All to Basket", "Click", $(".wishlist-add-to-bag-btn").length + " Items"])
                }
                document.body.style.cursor = "default";
                if (miniBasket) {
                    miniBasket.data("tcplMinibasket").refreshBasket()
                }
            }
        })
    };
    var getBitlyShortenedUrl = function(longUrl) {
        $.ajax({
            url: "https://api-ssl.bitly.com/v3/shorten",
            data: {
                longUrl: longUrl,
                apiKey: "R_b310498725681c10639d4ca31a776f4d",
                login: "toasttechops"
            },
            dataType: "jsonp",
            success: function(v) {
                var returnUrl = v.data.url;
                $(".url-to-copy").html('<a href="mailto:?subject=My Toast Wishlist&body=You can find my Toast wishlist at: ' + returnUrl + '">' + returnUrl + "</a>");
                $(".share-list-twitter").attr("href", "//twitter.com/share?url=" + returnUrl + "&text= My%20Toast%20Wishlist");
                var socialLink = "http://www.facebook.com/sharer.php?s=100&p[title]=My%20TOAST%20Wishlist&p[summary]=Take%20a%20look%20at%20my%20TOAST%20wishlist&p[url]=" + returnUrl + "&p[images][0]=http://d1kh76s6bjh8ww.cloudfront.net/site/Toast_Favicon_250x250_Black.png,%20sharer,toolbar=0,status=0,width=1200,height=1200";
                $(".share-list-facebook").attr("href", socialLink.replace(/\s/g, "%20"));
                var pinUrl = "http://www.pinterest.com/pin/create/button/?url=" + returnUrl + "&media=//d1kh76s6bjh8ww.cloudfront.net/img/logo-mobile.png&description=My%20Toast%20Wishlist";
                $(".share-list-pinterest").attr("href", pinUrl.replace(/\s/g, "%20"))
            }
        })
    };
    var getWishlistStockInfo = function(skuList) {
        $.ajax({
            url: "/services/stockservices.asmx/GetProductVariantStock",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(skuListObject),
            dataType: "json",
            success: function(data, status) {
                moduleVar.wishlistStockJson = $.parseJSON(data.d);
                initialiseWishlist();
                setWishlistEventListeners();
                initWishlistAddToBasket()
            }
        })
    };
    var getWishlistProductInfo = function(skuList) {
        $.ajax({
            url: "/services/stockservices.asmx/GetProductData",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: skuList,
            dataType: "json",
            success: function(data, status) {
                moduleVar.wishlistProductJson = $.parseJSON(data.d);
                getWishlistStockInfo(skuList)
            }
        })
    };
    var initialiseWishlist = function() {
        var selectedRangeProductAdded = false;
        for (var k = 0; k < moduleVar.wishListCollection.wishlist.length; k++) {
            var addTemplate = false;
            for (var i = 0; i < moduleVar.wishlistProductJson.products.length; i++) {
                for (prop in moduleVar.wishlistProductJson.products[i]) {
                    if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance") {
                        for (var j = 0; j < moduleVar.wishlistProductJson.products[i][prop].length; j++) {
                            addTemplate = false;
                            var matchedItem = false;
                            for (var m = 0; m < moduleVar.wishlistProductJson.products[i][prop][j].skuSetArr.length; m++) {
                                if (moduleVar.wishlistProductJson.products[i][prop][j].skuSetArr[m].toLowerCase() == moduleVar.wishListCollection.wishlist[k].skuCode.toLowerCase() && $("#" + prop).length == 0) {
                                    addTemplate = true;
                                    matchedItem = moduleVar.wishListCollection.wishlist[k];
                                    break
                                }
                            }
                            if (addTemplate) {
                                var $newItem = getWishlistItemTemplate(moduleVar.wishlistProductJson.products[i], moduleVar.wishlistProductJson.products[i][prop][j], prop, matchedItem);
                                $(".wishlist-wrapper .wishlist-product-group, .view-wishlist-wrapper .wishlist-product-group").append($newItem);
                                if (!selectedRangeProductAdded) {
                                    $newItem.find(".range-product").addClass("selected-range-product");
                                    selectedRangeProductAdded = true
                                }
                                $newItem.find(".wishlist-details").append($('<select class="wishListQtylist visuallyHidden"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select>'));
                                var auditQty = matchedItem.quantity == "0" || matchedItem.quantity == 0 ? "1" : matchedItem.quantity;
                                $newItem.find(".wishlist-details .wishListQtylist option[value=" + auditQty + "]").attr("selected", "selected");
                                $newItem.find(".wish-item-qty").attr("data-quantity", auditQty);
                                $newItem.find(".wish-item-qty").text("Quantity: " + auditQty);
                                if ($newItem.find(".sale-price").length > 0)
                                    $newItem.find(".price").addClass("strike-through");
                                break
                            }
                        }
                    }
                    if (addTemplate)
                        break
                }
                if (addTemplate)
                    break
            }
        }
        if (viewMode) {
            $(".wishlist-delete-btn, .slash-seperator").hide();
            $(".wishListQtylist").removeClass("visuallyHidden")
        } else {
            $(".wishlist-options-wrapper").before(rangeModule.getRangeBuyOffTemplate());
            setupUpdateWishlistButton();
            $($(".product-label")[1]).before($('<div class="grid-100 tablet-grid-100 mobile-grid-100 wishlist-update-message visuallyHidden grid-parent" style="display: block;"><span class="wishlist-message"></span></div>'));
            rangeModule.setBaseBuyOffVars();
            rangeModule.addRangeListeners();
            rangeModule.initialiseBuyOff()
        }
    };
    var updateThisItem = function($updatedItem) {
        for (var i = 0; i < moduleVar.wishListCollection.wishlist.length; i++) {
            if (moduleVar.wishListCollection.wishlist[i].skuCode.toLowerCase() == $updatedItem.attr("sku").toLowerCase()) {
                var quantity = moduleVar.wishListCollection.wishlist[i].quantity = $updatedItem.find(".wishListQtylist option:selected").val();
                var skuCode = moduleVar.wishListCollection.wishlist[i].skuCode = $updatedItem.find(".wishlist-sizes").attr("sku");
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "/services/tcplservices.asmx/UpdateProductInWishlist",
                    data: JSON.stringify({
                        prodCode: $updatedItem.find(".range-product").attr("id"),
                        skuCode: $updatedItem.attr("sku"),
                        newSkuCode: skuCode,
                        quantity: quantity
                    }),
                    success: function(data) {}
                })
            }
        }
    };
    var reorderWishlist = function(reorderObj) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/services/tcplservices.asmx/UpdateWishlistOrder",
            data: JSON.stringify(reorderObj),
            success: function(data) {}
        })
    };
    var addWishlistBuyOffListeners = function() {
        $(".wishlist-wrapper").on("click", ".product-sizes .size", function(e) {
            var $this = $(this);
            var $updatedItem = $(".wishlist-item-selected");
            if (!$this.hasClass("size-selected")) {
                var newSku = $this.attr("sku-id");
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "/services/tcplservices.asmx/UpdateProductInWishlist",
                    data: JSON.stringify({
                        prodCode: $updatedItem.find(".range-product").attr("id"),
                        skuCode: $updatedItem.attr("sku"),
                        newSkuCode: newSku,
                        quantity: 1
                    }),
                    success: function(data) {
                        $(".wishlist-update-message .wishlist-message").text("The size of this item in your wishlist has been updated").removeClass("visuallyHidden")
                    }
                })
            }
        });
        $(".wishlist-wrapper").on("click", ".product-swatches .swatch", function(e) {
            var $this = $(this);
            var $updatedItem = $(".wishlist-item-selected");
            if (!$this.find(".product-swatch").hasClass("selected-swatch")) {
                var newSku = $this.parent().parent().parent().find(".size-selected").attr("sku-id");
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "/services/tcplservices.asmx/UpdateProductInWishlist",
                    data: JSON.stringify({
                        prodCode: $updatedItem.find(".range-product").attr("id"),
                        skuCode: $updatedItem.attr("sku"),
                        newSkuCode: newSku,
                        quantity: 1
                    }),
                    success: function(data) {
                        $(".wishlist-update-message .wishlist-message").text("The colour of this item in your wishlist has been updated").removeClass("visuallyHidden");
                        $updatedItem.find("wishlist-image img").attr("src", $(".selected-swatch").attr("src").replace(sizeRegex, "/350/"))
                    }
                })
            }
        })
    };
    var setWishlistEventListeners = function() {
        var userMailFromUniVar = tcp_env.user.email;
        getBitlyShortenedUrl(window.location.origin + "/content/wishlist/view-wishlist.htm?sharedWish=" + userMailFromUniVar + "&wishTitle=Toast Wishlist");
        $(".wishlist-add-all").click(function(e) {
            e.preventDefault();
            var delay = 0;
            for (var i = $(".wishlist-add-to-bag-btn").length - 1; i >= 0; i--) {
                setTimeout(function() {
                    $($(".wishlist-add-to-bag-btn")[i]).trigger("click");
                    delay += 200
                }, delay)
            }
        });
        $(".wishlist-edit-btn").click(function(e) {
            var $this = $(this);
            $(".wishlist-product").removeClass("wishlist-item-selected");
            $this.parent().parent().parent().addClass("wishlist-item-selected");
            $(".wishlist-update-message").addClass("visuallyHidden");
            var editBtnIndex = 0;
            for (var i = $(".wishlist-edit-btn").length - 1; i >= 0; i--) {
                if ($(".wishlist-edit-btn")[i] === this) {
                    editBtnIndex = i;
                    break
                }
            }
            var countWishItems = 0;
            var indexToPutBuyOff = 0;
            var modFigure = 4;
            if (window.innerWidth <= 1024 && window.innerWidth > 767)
                modFigure = 3;
            else if (window.innerWidth < 768)
                modFigure = 1;
            while (editBtnIndex >= countWishItems) {
                countWishItems += modFigure;
                if (editBtnIndex + 1 <= countWishItems) {
                    if (countWishItems <= $(".wishlist-edit-btn").length)
                        $($(".wishlist-product")[countWishItems - 1]).after($(".buy-off-container"));
                    else
                        $($(".wishlist-product")[$(".wishlist-edit-btn").length - 1]).after($(".buy-off-container"))
                }
            }
            setTimeout(function() {
                $($(".wishlist-product")[editBtnIndex]).find(".range-product").trigger("click");
                $("body, html").animate({
                    scrollTop: $(".buy-off-container").offset().top
                }, "250")
            }, 200);
            var sizeSelectedSkuOnWishItem = $this.parent().parent().find(".wishlist-sizes").attr("sku");
            var colourLabelOnWishItem = $this.parent().parent().find(".wishlist-item-colour").text();
            setTimeout(function() {
                for (var i = $(".product-sizes .size").length - 1; i >= 0; i--) {
                    if ($($(".product-sizes .size")[i]).attr("sku-id") == sizeSelectedSkuOnWishItem) {
                        $(".product-sizes .size").removeClass("size-selected");
                        $($(".product-sizes .size")[i]).trigger("click", [true]);
                        break
                    }
                }
                for (var i = $(".product-swatches .product-swatch").length - 1; i >= 0; i--) {
                    if ($($(".product-swatches .product-swatch")[i]).attr("alt") == colourLabelOnWishItem) {
                        $($(".product-swatches .product-swatch")[i]).trigger("click", [true]);
                        break
                    }
                }
            }, 500);
            var productName = $(this).parent().parent().find(".wish-item-title").text();
            _gaq.push(["_trackEvent", "Edit", "Click", productName])
        });
        $(".wishlist-delete-btn").click(function(e) {
            var $deletedItem = $(this).parent().parent().parent();
            var selectedItemSku = $deletedItem.find(".wishlist-sizes").attr("sku");
            for (var i = 0; i < moduleVar.wishListCollection.wishlist.length; i++) {
                if (moduleVar.wishListCollection.wishlist[i].skuCode.toLowerCase() == selectedItemSku.toLowerCase()) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "/services/tcplservices.asmx/RemoveProductFromWishlist",
                        data: JSON.stringify({
                            prodCode: moduleVar.wishListCollection.wishlist[i].prodCode,
                            skuCode: selectedItemSku
                        }),
                        success: function(data) {
                            $deletedItem.remove();
                            $(".expanding-wish-sharer").addClass("wish-sharer-closed");
                            moduleVar.wishListCollection.wishlist.splice(i, 1);
                            updateWishlistButton();
                            if ($(".wishlist-product").length == 0)
                                $(".wishlist-product-group").html('<p class="empty-wishlist-text">You&#39;ve got nothing on your wishlist. Find things to add to it <a href="/">here</a></p>')
                        }
                    });
                    break
                }
            }
            var productName = $(this).parent().parent().find(".wish-item-title").text();
            _gaq.push(["_trackEvent", "Delete", "Click", productName])
        });
        $(".wishlist-sizes").change(function(e) {
            var $updatedItem = $(this).parent().parent().parent();
            var selectedItemKey = $updatedItem.attr("prod-key");
            var skuSelected = $(this).attr("sku");
            for (var i = 0; i < moduleVar.wishlistStockJson.stocklist.length; i++) {
                if (moduleVar.wishlistStockJson.stocklist[i].prodId.toLowerCase() == selectedItemKey.toLowerCase()) {
                    for (var k = 0; k < moduleVar.wishlistStockJson.stocklist[i].sizesInStock.length; k++) {
                        var itemSizesObj = moduleVar.wishlistStockJson.stocklist[i].sizesInStock[k];
                        if (itemSizesObj.sku.toLowerCase() == skuSelected) {
                            $updatedItem.find(".wishlist-messages").text(getItemStockMessage(itemSizesObj))
                        }
                    }
                }
            }
            updateThisItem($updatedItem);
            $(".expanding-wish-sharer").addClass("wish-sharer-closed")
        });
        $(".wishListQtylist").change(function(e) {
            var $updatedItem = $(this).parent().parent().parent();
            updateThisItem($updatedItem)
        });
        $(".share-list-facebook, .share-list-twitter, .share-list-pinterest").popupWindow({
            height: 350,
            width: 670,
            centerBrowser: 1
        })
    };
    var getItemStockMessage = function (itemSizesObj) {
        if (typeof rangeJson !== 'undefined')
            return;
        if (itemSizesObj.stlev == 0 && itemSizesObj.preOrderAvailable == "") {
            return "<span>This is currently out of stock in this size</span>"
        } else if (itemSizesObj.stlev == 0 && itemSizesObj.preOrderAvailable != "") {
            return "<span>This is expected in our warehouse on " + itemSizesObj.preOrderAvailable + " in this size. You can still order we will send your item out to you as soon as it arrives.</span>"
        } else if (itemSizesObj.stlev != 0 && itemSizesObj.stlev < 7) {
            return "<span>We have a limited number of this item left in this size.</span>"
        }
        return ""
    };
    var getWishlistItemTemplate = function(parentItem, item, prop, matchedItem) {
        var currency_symbol = tcp_env.currency_symbol === "&#163;" ? "£" : typeof tcp_env.currency_symbol !== "undefined" ? tcp_env.currency_symbol : "£";
        var newPrice = item.price;
        if (item.price.indexOf(",") != -1) {
            var priceBreakdown = item.price.split(",");
            newPrice = priceBreakdown[0] + " - " + currency_symbol + priceBreakdown[priceBreakdown.length - 1]
        } else
            newPrice = parseFloat(item.price).toFixed(2).replace(".00", "");
        var adjustedPrice = newPrice;
        newPrice = '<span class="price">' + currency_symbol + newPrice + "</span>";
        var saleHtml = "";
        if (item.price != item.salePrice) {
            adjustedPrice = parseFloat(item.salePrice).toFixed(2).replace(".00", "");
            saleHtml = '<span class="sale-price">' + currency_symbol + adjustedPrice + "</span>"
        }
        var sizeValues = [];
        var sizeOptionsStr = "";
        var userMessage = "";
        var addToBagStr = wishItemAddToBagStr;
        var parsedHtmlDesc = $("<div />").html(parentItem.description).text();
        if (typeof parsedHtmlDesc == "undefined" || parsedHtmlDesc.length == 0)
            parsedHtmlDesc = parentItem.description;
        var wishItemSizeStr = "";
        for (var i = 0; i < moduleVar.wishlistStockJson.stocklist.length; i++) {
            if (moduleVar.wishlistStockJson.stocklist[i].prodId.toLowerCase() == item.prodId.toLowerCase()) {
                for (var k = 0; k < moduleVar.wishlistStockJson.stocklist[i].sizesInStock.length; k++) {
                    var itemSizesObj = moduleVar.wishlistStockJson.stocklist[i].sizesInStock[k];
                    var outOfStockStr = "";
                    if (matchedItem.skuCode.toLowerCase() == moduleVar.wishlistStockJson.stocklist[i].sizesInStock[k].sku.toLowerCase()) {
                        var preOrderStr = "";
                        if (itemSizesObj.preOrderAvailable != "") {
                            preOrderStr = "pre-order";
                            addToBagStr = wishItemPreOrderAvailableStr
                        } else {
                            if (itemSizesObj.stlev == 0)
                                addToBagStr = wishItemOutOfStockStr
                        }
                        sizeOptionsStr = sizeOptionsStr + '<label stlev="' + itemSizesObj.stlev + '" class="wishlist-sizes visuallyHidden ' + preOrderStr + '" sku="' + itemSizesObj.sku + '" value="' + itemSizesObj.value1 + '">' + itemSizesObj.value1 + outOfStockStr + "</label>";
                        wishItemSizeStr = itemSizesObj.value1;
                        break
                    }
                }
                break
            }
        }
        return $(['<div class="wishlist-product grid-25 tablet-grid-33 mobile-grid-100" sku="' + matchedItem.skuCode + '" prod-key="' + item.prodId + '">', '<div class="wishlist-image grid-100 tablet-grid-100 mobile-grid-100">', '<a href="/product/' + item.parentCategory.replace(/ /g, "+").replace(/\//g, "+") + "/" + prop + "/" + parentItem.title.replace(/ /g, "+").replace(/\//g, "+") + ".htm?clr=" + item.prodId.slice(0, 5) + "_" + item.colour.replace(/ /g, "").replace(/\//g, "") + '">', '<img src="' + item.upImg.replace("/product/", "/global/") + '" alt="' + parentItem.title + '" title="' + parentItem.title + '" class="grid-image product-image">', "</a>", "</div>", '<div class="wishlist-details-wrapper grid-100 tablet-grid-100 mobile-grid-100">', '<div class="wishlist-details grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', '<h3 class="wish-item-title">' + parentItem.title + "</h3>", '<p class="price-of-item" price="' + adjustedPrice + '">' + newPrice + " " + saleHtml + "</p>", '<h3 class="wishlist-item-colour">' + item.colour + "</h3>", '<h3 class="wishlist-item-size">Size: ' + wishItemSizeStr + "</h3>", sizeOptionsStr, '<h3 class="wish-item-qty"></h3>', "</div>", '<div class="grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', '<div class="wishlist-add-to-bag-btn"><span>' + addToBagStr + "</span></div>", "</div>", '<div class="wishlist-button-container">', '<span class="wishlist-edit-btn">Edit</span><span class="slash-seperator">/</span><span class="wishlist-delete-btn">Remove</span>', "</div>", '<span class="range-product visuallyHidden" id="' + matchedItem.prodCode + '"><img></span>', "</div>", "</div>"].join(""))
    };
    var updateWishlistButton = function() {
        $(".wishlist-qty").text(moduleVar.wishListCollection.wishlist.length)
    };
    var setupUpdateWishlistButton = function() {
        $(".product-button.checkout").before($('<div id="updateItemWishlist" class="grid-100 tablet-grid-100  mobile-grid-100 product-button"><a id="updateItemWishlist" href="#" class="wishlist-update-item">Update Item In Wishlist</a></div>'));
        $("#updateItemWishlist").click(function(e) {
            e.preventDefault();
            var $this = $(this);
            var $updatedItem = $(".wishlist-item-selected");
            var newSku = $this.parent().parent().find(".size-selected").attr("sku-id");
            var wishItemQty = $this.parent().parent().find(".qtyList option:selected").val();
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/services/tcplservices.asmx/UpdateProductInWishlist",
                data: JSON.stringify({
                    prodCode: $updatedItem.find(".range-product").attr("id"),
                    skuCode: $updatedItem.attr("sku"),
                    newSkuCode: newSku,
                    quantity: wishItemQty
                }),
                success: function(data) {
                    $(".wishlist-update-message").removeClass("visuallyHidden");
                    $(".wishlist-update-message .wishlist-message").text("This item in your wishlist has been updated with your current selections");
                    $updatedItem.find(".wishlist-image img").attr("src", $(".selected-swatch").attr("src").replace(sizeRegex, "/350/"));
                    $updatedItem.find(".wishlist-item-colour").text($(".buy-off-container .colour-showing").text());
                    $updatedItem.find(".wishlist-item-size").text("Size: " + $(".buy-off-container .size-selected").text());
                    var selectedQuantity = $(".buy-off-container .qtyList option:selected").val();
                    if (selectedQuantity == 0 || selectedQuantity == "0")
                        selectedQuantity = "1";
                    $updatedItem.find(".wish-item-qty").text("Quantity: " + selectedQuantity);
                    var $sizeSelected = $(".buy-off-container .size-selected");
                    var selectedSizeSku = $sizeSelected.attr("sku-id");
                    var stockLevel = $sizeSelected.attr("low-stock") == "" ? 0 : $sizeSelected.attr("low-stock");
                    $updatedItem.find(".wishlist-sizes").attr({
                        sku: selectedSizeSku,
                        stlev: stockLevel,
                        value: $sizeSelected.text()
                    });
                    var isPreOrderAvailable = $sizeSelected.hasClass("pre-order");
                    if (stockLevel == 0 && isPreOrderAvailable)
                        $updatedItem.find(".wishlist-add-to-bag-btn span").text(wishItemPreOrderAvailableStr);
                    else if (stockLevel == 0 && !isPreOrderAvailable)
                        $updatedItem.find(".wishlist-add-to-bag-btn span").text(wishItemOutOfStockStr);
                    else
                        $updatedItem.find(".wishlist-add-to-bag-btn span").text(wishItemAddToBagStr);
                    $updatedItem.find(".wishlist-sizes").toggleClass("pre-order", isPreOrderAvailable);
                    $updatedItem.find(".wishlist-sizes").text($sizeSelected.text());
                    $updatedItem.find(".wishListQtylist option:selected").removeAttr("selected");
                    for (var i = $updatedItem.find(".wishListQtylist option").length - 1; i >= 0; i--) {
                        if ($($updatedItem.find(".wishListQtylist option")[i]).val() == selectedQuantity) {
                            $($updatedItem.find(".wishListQtylist option")[i]).attr("selected", "selected");
                            break
                        }
                    }
                    $updatedItem.attr({
                        sku: $(".size-selected").attr("sku-id"),
                        "prod-key": $(".selected-swatch").attr("id")
                    })
                }
            });
            var productName = $(".wishlist-item-selected .wish-item-title").html();
            _gaq.push(["_trackEvent", "Update", "Click", productName])
        });
        $(".buy-off-container").on("click", ".swatch, .size", function(e) {
            $(".wishlist-update-message").addClass("visuallyHidden")
        });
        $(".buy-off-container").on("change", ".qtyList", function(e) {
            $(".wishlist-update-message").addClass("visuallyHidden")
        })
    };
    var setupDeleteFromWishlistButton = function() {
        var visuallyHiddenStr = "";
        if (!itemInWishlist)
            visuallyHiddenStr = "visuallyHidden";
        $(".product-button.checkout").before($('<div class="grid-100 tablet-grid-100 mobile-grid-100 product-button remove-wishlist-item-wrapper ' + visuallyHiddenStr + '"><a href="#" id="deleteFromWishlist" class="delete-from-wishlist">Remove From Wishlist</a></div>'));
        $("#deleteFromWishlist").click(function(e) {
            e.preventDefault();
            for (var i = moduleVar.wishListCollection.wishlist.length - 1; i >= 0; i--) {
                if (moduleVar.wishListCollection.wishlist[i].prodCode == $("#productId").val() || moduleVar.wishListCollection.wishlist[i].prodCode == $(".buy-off-container .product-details").attr("prod-id")) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "/services/tcplservices.asmx/RemoveProductFromWishlist",
                        data: JSON.stringify({
                            prodCode: moduleVar.wishListCollection.wishlist[i].prodCode,
                            skuCode: moduleVar.wishListCollection.wishlist[i].skuCode
                        }),
                        success: function(data) {
                            if (data.d.Success) {
                                var prodTitle = $(".product-details").find(".product-info h1").text() || $(".product-details").find(".product-info h3").text();
                                $(".product-details").find("#added-to-basket, #addedToBasket").show().html("<span class='message-text'>" + prodTitle + " has been removed from your wishlist.</span>");
                                $("#deleteFromWishlist").parent().addClass("visuallyHidden");
                                $("#addToWishlist").parent().removeClass("visuallyHidden");
                                moduleVar.wishListCollection.wishlist.splice(i, 1);
                                updateWishlistButton();
                                if (typeof prodTitle !== "undefined") {
                                    _gaq.push(["_trackEvent", "Delete from Wishlist", "Click", prodTitle])
                                }
                            } else {
                                var returnToProductURL = "/login.htm?returnUrl=";
                                returnToProductURL = returnToProductURL + document.location.pathname.replace(/\//gi, "%2f").replace(/\./gi, "%2E");
                                window.location.href = returnToProductURL
                            }
                        }
                    });
                    break
                }
            }
        })
    };
    var setupAddToWishlistButton = function() { 
        var visuallyHiddenStr = "";
        if (itemInWishlist)
            visuallyHiddenStr = "visuallyHidden"; 
            $(".product-button.checkout").before($('<div class="grid-100 tablet-grid-100 mobile-grid-100 product-button add-wishlist-item-wrapper ' + visuallyHiddenStr + '"><a href="#" id="addToWishlist" class="add-to-wishlist">Add To Wishlist</a></div>')); 

        $("#addToWishlist").click(function(e) {
            e.preventDefault();
            document.body.style.cursor = "wait";
            var newCookieObj = {
                prodCode: "",
                quantity: "",
                skuCode: ""
            };
            if ($(".buy-off-container").length == 0) {
                var productQuantity = 0;
                for (var i = 0; i < $(".ctab").length; i++) {
                    if ($($(".ctab")[i]).is(":visible")) {
                        productQuantity = parseInt($($(".ctab")[i]).find(".qtylist").val())
                    }
                }
                newCookieObj = {
                    prodCode: $("#productId").val(),
                    quantity: productQuantity,
                    skuCode: $(".size-selected").attr("data-sku")
                }
            } else {
                newCookieObj = {
                    prodCode: $(".product-details").attr("prod-id"),
                    quantity: parseInt($(".qtyList").val()),
                    skuCode: $(".size-selected").attr("sku-id")
                }
            }
            var foundCookieItem = _.find(moduleVar.wishListCollection.wishlist, function(obj) {
                return obj.skuCode.toLowerCase() == newCookieObj.skuCode.toLowerCase()
            });
            if (foundCookieItem != undefined) {
                foundCookieItem.quantity = newCookieObj.quantity
            } else {
                moduleVar.wishListCollection.wishlist.push(newCookieObj)
            }
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/services/tcplservices.asmx/AddProductToWishlist",
                data: JSON.stringify({
                    prodCode: newCookieObj.prodCode,
                    skuCode: newCookieObj.skuCode,
                    quantity: newCookieObj.quantity
                }),
                success: function(data) {
                    document.body.style.cursor = "default";
                    if (data.d.Success) {
                        var prodTitle = $(".product-details").find(".product-info h1").text() || $(".product-details").find(".product-info h3").text();
                        prodTitle = prodTitle.toUpperCase();
                        updateWishlistButton();
                        $(".product-details").find("#added-to-basket, #addedToBasket").show().html("<span class='message-text'>" + prodTitle + " has been added to your wishlist.</span>");
                        $("#deleteFromWishlist").parent().removeClass("visuallyHidden");
                        $("#addToWishlist").parent().addClass("visuallyHidden");
                        if (typeof prodTitle !== "undefined") {
                            _gaq.push(["_trackEvent", "Add to Wishlist (Signed In)", "Click", prodTitle])
                        }
                    } else {
                        var prodTitle = $(".product-details").find(".product-info h1").text() || $(".product-details").find(".product-info h3").text();
                        var returnToProductURL = "/login.htm?returnUrl=";
                        returnToProductURL = returnToProductURL + document.location.pathname.replace(/\//gi, "%2f").replace(/\./gi, "%2E") + "?addProdToWishList=true%26selectedProd=" + $('.size-selected').attr('sku-id');
                        window.location.href = returnToProductURL;
                        if (typeof prodTitle !== "undefined") {
                            _gaq.push(["_trackEvent", "Add to Wishlist (Not Signed In)", "Click", prodTitle])
                        }
                    }
                }
            })
        })
    };
    moduleVar.updateAddRemoveWishlistButton = function() {
        checkItemInWishlist();
        $(".add-wishlist-item-wrapper").toggleClass("visuallyHidden", itemInWishlist);
        $(".remove-wishlist-item-wrapper").toggleClass("visuallyHidden", !itemInWishlist)
    };
    var checkItemInWishlist = function() {
        itemInWishlist = false;
        var thisProdCode = $("#productId").val();
        if (typeof thisProdCode == "undefined")
            thisProdCode = $(".buy-off-container .product-details").attr("prod-id");
        var foundThisItem = _.find(moduleVar.wishListCollection.wishlist, function(obj) {
            return obj.prodCode == thisProdCode
        });
        if (foundThisItem != undefined) {
            itemInWishlist = true
        }
    };
    $(document).ready(function() {
        $(".login-item").before($('<li class="wishlist-btn"><a href="/content/wishlist/wishlist.htm">wishlist (<span class="wishlist-qty">0</span>)</a></li>'));
        if ($(".view-wishlist-wrapper").length > 0) {
            viewMode = true
        }
        var userMail = [];
        if (viewMode) {
            userMail = getParameterByName("sharedWish");
            $(".view-wishlist-wrapper").prepend($('<div class="view-wishlist-title"><h2>' + getParameterByName("wishTitle") + "</h2></div>"));
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/services/tcplservices.asmx/GetWishlistForUser",
                data: JSON.stringify({
                    email: userMail
                }),
                success: function(data) {
                    moduleVar.wishListCollection.wishlist = data.d.wishlist;
                    if (moduleVar.wishListCollection.wishlist.length > 0) {
                        skuListObject = {
                            skuList: []
                        };
                        for (var i = 0; i < moduleVar.wishListCollection.wishlist.length; i++) {
                            skuListObject.skuList.push(moduleVar.wishListCollection.wishlist[i].prodCode)
                        }
                        getWishlistProductInfo(JSON.stringify(skuListObject))
                    }
                }
            })
        } else {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "/services/tcplservices.asmx/GetWishlist",
                data: null,
                success: function(data) {
                    if (data.d.wishlist.length > 0) {
                        moduleVar.wishListCollection.wishlist = data.d.wishlist;
                        updateWishlistButton();
                        if ($(".wishlist-wrapper").length > 0) {
                            if (moduleVar.wishListCollection.wishlist.length > 0) {
                                skuListObject = {
                                    skuList: []
                                };
                                for (var i = 0; i < moduleVar.wishListCollection.wishlist.length; i++) {
                                    skuListObject.skuList.push(moduleVar.wishListCollection.wishlist[i].prodCode)
                                }
                                getWishlistProductInfo(JSON.stringify(skuListObject))
                            } else {
                                $(".share-my-list").hide()
                            }
                        }
                    } else {
                        if ($(".wishlist-wrapper").length > 0) {
                            $(".wishlist-product-group").html('<p class="empty-wishlist-text">You&#39;ve got nothing on your wishlist. Find things to add to it <a href="/">here</a></p>');
                            $(".expanding-wish-sharer").hide()
                        }
                    }
                    if ($(".product-details").length > 0) {
                        checkItemInWishlist();
                        setupAddToWishlistButton();
                        setupDeleteFromWishlistButton();
                        var addProdOnLoad = getParameterByName("addProdToWishList");
                        setTimeout(function() {
                            if (addProdOnLoad)
                                $("#addToWishlist").trigger("click")
                        }, 1e3)
                    }
                }
            })
        }
        if ($(".wishlist-wrapper").length > 0) {
            if (tcp_env.user.email == "") {
                window.location.href = "/login.htm?returnUrl=%2fcontent/wishlist/wishlist.htm"
            }
        }
        $(".share-list-facebook").click(function() {
            _gaq.push(["_trackEvent", "Social Sharing", "Click - Wishlist", "Facebook"])
        });
        $(".share-list-twitter").click(function() {
            _gaq.push(["_trackEvent", "Social Sharing", "Click - Wishlist", "Twitter"])
        });
        $(".share-list-pinterest").click(function() {
            _gaq.push(["_trackEvent", "Social Sharing", "Click - Wishlist", "Pinterest"])
        });
        $("body").on("click", ".url-to-copy a", function() {
            _gaq.push(["_trackEvent", "Social Sharing", "Click - Wishlist", "Email"])
        })
    });
    return moduleVar
}();
var reviewDisplayModule = function() {
    var moduleVar = {};
    var bestRating = 0;
    var maxReviews = 6;
    var accordionCreated = false;
    var gaqCallCount = 0;
    var addReviewTemplate = function(review) {
        var dateModerated = new Date(review.LastModeratedTime);
        var dateSubmitted = new Date(review.SubmissionTime);
        var oneDay = 24 * 60 * 60 * 1e3;
        var diffDays = Math.round(Math.abs((dateSubmitted.getTime() - (new Date).getTime()) / oneDay));
        var diffHours = Math.round(((new Date).getTime() - dateSubmitted.getTime()) / 1e3 / 60 / 60);
        var percentToShow = Math.ceil(review.Rating / 5 * 100);
        return reviewNode = $(['<li class="review-content-top-review review-content-review" itemprop="review" itemscope="" itemtype="http://schema.org/Review">', '<meta itemprop="itemReviewed" content="' + $(".product-info h1").text() + '">', '<div class="review-content-item">', '<div class="review-content-data-summary">', '<div class="review-content-header-meta">', '<span class="review-content-rating review-rating-ratio" itemprop="reviewRating" itemscope="" itemtype="http://schema.org/Rating" tabindex="0">', '<meta itemprop="ratingValue" content="' + review.Rating + '">', '<meta itemprop="bestRating" content="' + bestRating + '">', '<span class="review-rating-stars-container">', '<abbr title="' + review.Rating + '" class="review-rating review-rating-stars review-rating-stars-off visuallyHidden" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</abbr>', '<abbr title="' + review.Rating + '" style="width:' + percentToShow + '%;" class="review-rating-max review-rating-stars review-rating-stars-on" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</abbr>', '<span class="review-off-screen visuallyHidden">' + review.Rating + " out of 5 stars.</span>", "</span>", "</span>", '<div class="review-content-meta-wrapper">', '<div class="review-content-meta" role="presentation">', '<div class="review-content-reference-data review-content-author-name">', '<h3 class="review-author font-weight-300 medFont" itemprop="author">' + review.UserNickname + "</h3>", '<div class="review-content-datetime" role="presentation">', '<meta itemprop="dateCreated" content="' + dateSubmitted.getDate() + "/" + dateSubmitted.getMonth() + "/" + dateSubmitted.getFullYear() + '">', '<meta itemprop="datePublished" content="' + dateModerated.getDate() + "/" + dateModerated.getMonth() + "/" + dateModerated.getFullYear() + '">', diffHours > 24 ? '<span class="review-content-datetime-stamp">' + dateSubmitted.toDateString() + "</span>" : '<span class="review-content-datetime-stamp">' + diffHours + " hours ago &nbsp;</span>", "</div>", "</div>", "</div>", "</div>", "</div>", '<div class="review-content-title-container">', review.IsRatingsOnly === false ? '<h4 class="review-content-title font-weight-300 medFont" itemprop="headline">' + review.Title + "</h4>" : "", "</div>", "</div>", '<div class="review-content-summary-body" itemprop="reviewBody">', '<div class="review-content-summary-body-text">', review.IsRatingsOnly === false ? "<p>" + review.ReviewText + "</p>" : "", "</div>", "</div>", '<div class="review-secondary-ratings" role="presentation">', '<dl class="review-content-secondary-ratings" role="presentation">', "</dl>", "</div>", "</div>", "</li>"].join(""))
    };
    var addSecondarySection = function(secondaryRatingObj, $reviewElement) {
        if (typeof secondaryRatingObj !== "boolean" && secondaryRatingObj !== null) {
            var $secondarySection = $(['<dd class="review-content-slider">', '<span class="review-content-slider-container">', '<ul class="review-content-slider-bar" role="presentation">', '<li class="review-content-slider-segment" ></li>', '<li class="review-content-slider-segment" ></li>', '<li class="review-content-slider-segment" ></li>', '<li class="review-content-slider-segment" ></li>', '<li class="review-content-slider-segment" ></li>', "</ul>", "</span>", '<span class="review-off-screen visuallyHidden">Rating of 1 means</span>', '<span class="review-content-slider-sublabel1">' + secondaryRatingObj.MinLabel + "</span>", '<span class="review-off-screen visuallyHidden">Rating of 5 means</span>', '<span class="review-content-slider-sublabel2">' + secondaryRatingObj.MaxLabel + "</span>", '<span class="review-off-screen visuallyHidden">' + secondaryRatingObj.Value + " out of 5</span>", "</dd>"].join(""))
        } else {
            var thisVal = secondaryRatingObj === true ? "Yes" : "No";
            secondaryRatingObj = {
                Label: "Would you recommend this product to a friend?",
                Value: "",
                ValueLabel: thisVal
            };
            var $secondarySection = $()
        }
        var $secondarySectionTitle = $('<dt class="review-content-secondary-ratings-label medFont">' + secondaryRatingObj.Label + ': <span class="secondary-figure">' + secondaryRatingObj.Value + "</span> - " + secondaryRatingObj.ValueLabel + "</dt>");

        
        $reviewElement.find(".review-content-secondary-ratings").append($secondarySectionTitle);
        $reviewElement.find(".review-content-secondary-ratings").append($secondarySection);
        $($secondarySection.find(".review-content-slider-segment")[secondaryRatingObj.Value - 1]).addClass("selected")
    };
    var getRangeProductId = function () {
        if (typeof currentProd !== 'undefined')
            return currentProd.ProductStyleCode;

        var idHolder = $("#productId").val();
        if ($(".buy-off-container ").length > 0) {
            if ($(".selected-range-product").attr("id").indexOf("Key") === -1) {
                idHolder = $(".selected-range-product").attr("id")
            } else {
                var indexOfProdKey = $(".selected-range-product").attr("id").indexOf("Key");
                idHolder = $(".selected-range-product").attr("id").slice(0, indexOfProdKey)
            }
        }
        return idHolder
    };
    var callReviews = function(sort, newSort, id) {
        addAccordion();
        $(".read-more-reviews").remove();
        $(".product-reviews-bottom").remove();
        $(".review-content-review").remove();
        var idHolder = getRangeProductId();
        var returnToProductURL = "/login.htm?returnUrl=";
        returnToProductURL = returnToProductURL + document.location.pathname.replace(/\//gi, "%2f").replace(/\./gi, "%2E");
        if ($(".buy-off-container ").length > 0) {
            if (tcp_env.user.email.length > 0) {
                $("#add-review").attr("href", "http://display.ugc.bazaarvoice.com/static/toast/en_GB/container.htm?bvaction=rr_submit_review&bvproductId=" + idHolder)
            } else {
                $("#add-review").attr("href", returnToProductURL)
            }
        }
        var sort = sort == null || typeof sort == "undefined" || sort.length < 1 ? "SubmissionTime:desc" : sort;
        $.ajax({
            url: "//api.bazaarvoice.com/data/reviews.json?apiversion=5.4&passkey=9qho0pl4cxnt05nqnt3y6yzk6&Filter=ProductId:" + idHolder + "&Sort=" + sort + "&Limit=50",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function(data, status) {
                if (!data.HasErrors) {
                    if (data.TotalResults === 0) {
                        $(".noReviews").removeClass("visuallyHidden");
                        $("#review-section header h2").text("Reviews (0)");
                        $("#reviewContainer").addClass("visuallyHidden");
                        if ($(".noReviews").length < 1) {
                            $("#reviewContainer").before('<p class="noReviews">There are currently no reviews for this product.</p>');
                            if (tcp_env.user.email.length > 0) {
                                $("#reviewContainer").before('<p class="noReviews"><a href="http://display.ugc.bazaarvoice.com/static/toast/en_GB/container.htm?bvaction=rr_submit_review&bvproductId=' + idHolder + '" target="_blank">Be the first to review this product.</a></p>');
                                $("#review-section header h2").after($('<a href="http://display.ugc.bazaarvoice.com/static/toast/en_GB/container.htm?bvaction=rr_submit_review&bvproductId=' + idHolder + '" target="_blank"><span class="first-to-review-summary noReviews">be first to review this</span></a>'))
                            } else {
                                $("#reviewContainer").before('<p class="noReviews"><a href="' + returnToProductURL + '">Be the first to review this product.</a></p>');
                                $("#review-section header h2").after($('<a href="' + returnToProductURL + '"><span class="first-to-review-summary noReviews">Be first to review this</span></a>'))
                            }
                        }
                        $("#reviewContainer").removeClass("visuallyHidden").addClass("no-reviews");
                        if (tcp_env.user.email.length > 0) {
                            $(".noReviews a, #add-review").attr("href", "http://display.ugc.bazaarvoice.com/static/toast/en_GB/container.htm?bvaction=rr_submit_review&bvproductId=" + idHolder + "");
                            $(".first-to-review-summary").parent().attr("href", "http://display.ugc.bazaarvoice.com/static/toast/en_GB/container.htm?bvaction=rr_submit_review&bvproductId=" + idHolder + "")
                        } else {
                            $("#reviewContainer .review-dropdown").hide()
                        }
                        $("#reviewSummaryContainer").hide()
                    } else {
                        var containerSelector = "";
                        var gridString = "";
                        $(".noReviews").addClass("visuallyHidden");
                        $("#reviewContainer").removeClass("visuallyHidden no-reviews");
                        if ($(".buy-off-container").length > 0) {
                            containerSelector = $("#mainContent .buy-off-container");
                            gridString = "grid-60 suffix-5 tablet-grid-60"
                        } else {
                            containerSelector = $("#mainContent > .product-details");
                            gridString = "prefix-10 grid-50 suffix-5 tablet-grid-50 tablet-prefix-5"
                        }
                        containerSelector.append('<div class="product-reviews-bottom visuallyHidden ' + gridString + ' mobile-grid-100 float-left grid-parent"></div>');
                        var reviewCompiledResults = 0;
                        for (var i = 0; i < data.Results.length; i++) {
                            reviewCompiledResults += data.Results[i].Rating;
                            if (data.Results[i].Rating > bestRating)
                                bestRating = data.Results[i].Rating
                        }
                        var numberToDivideBy = data.TotalResults == 0 ? 1 : data.TotalResults;
                        var reviewCompiledResultsAvg = (reviewCompiledResults / numberToDivideBy).toFixed(1);
                        var percentToShow = Math.ceil(reviewCompiledResultsAvg / 5 * 100);
                        if (data.TotalResults > 1) {
                            $("#review-section header h2").text("Reviews (" + data.TotalResults + ")")
                        } else {
                            $("#review-section header h2").text("Review (" + data.TotalResults + ")")
                        }
                        $("#reviewSummaryContainer").show();
                        var summaryBar = $(['<dl class="review-stars-container" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating" role="presentation">', '<meta itemprop="itemReviewed" content="' + $(".product-info h1").text() + '">', '<dd class="review-rating-ratio-count visuallyHidden" role="presentation">', '<span itemprop="reviewCount">Reviews ' + data.TotalResults + "</span>", "</dd>", '<dd class="review-rating-ratio" role="presentation">', '<span class="review-rating-stars-on review-rating-stars" aria-hidden="true"><span style="width: ' + percentToShow + '%;">&#9733;&#9733;&#9733;&#9733;&#9733;</span></span>', '<meta itemprop="bestRating" content="' + bestRating + '">', '<span class="review-off-screen visuallyHidden">' + reviewCompiledResultsAvg + " out of 5 stars. Read reviews.</span>", "</dd>", '<dd class="review-rating-ratio-number" role="presentation" aria-hidden="true">', '<span class="review-rating">', '<span itemprop="ratingValue">' + reviewCompiledResultsAvg + " / 5.0</span>", "</span>", "</dd>", "</dl>"].join(""));
                        if (!newSort) {
                            $("#reviewSummaryContainer").html(summaryBar)
                        }
                        $("#reviewContainer ul.review-list").html("");
                        $(".product-reviews-bottom").html("");
                        for (var i = 0; i < data.Results.length; i++) {
                            $newReview = addReviewTemplate(data.Results[i]);
                            if (i < maxReviews) {
                                $("#reviewContainer ul.review-list").append($newReview)
                            } else {
                                $(".product-reviews-bottom").append($newReview)
                            }
                            for (var j = 0; j < data.Results[i].SecondaryRatingsOrder.length; j++) {
                                if (data.Results[i].SecondaryRatings[data.Results[i].SecondaryRatingsOrder[j]].ValueLabel !== null)
                                    addSecondarySection(data.Results[i].SecondaryRatings[data.Results[i].SecondaryRatingsOrder[j]], $newReview)
                            }
                            addSecondarySection(data.Results[i].IsRecommended, $newReview)
                        }
                        if (data.TotalResults > maxReviews) {
                            $("#reviewContainer").append('<a href="#" class="read-more-reviews"><span>Read more reviews</span></a>');
                            $(".read-more-reviews").click(function(e) {
                                e.preventDefault();
                                $(".product-reviews-bottom").removeClass("visuallyHidden");
                                $("html, body").animate({
                                    scrollTop: $(".product-reviews-bottom").offset().top - $(".main-header").height()
                                }, 500);
                                var productName = $(".product-info ").find("h1").html() || $(".product-info ").find("h3").html();
                                productName = $.trim(productName);
                                _gaq.push(["_trackEvent", "Read More Reviews", "Click", productName])
                            })
                        }
                        if (newSort) {
                            setTimeout(function() {
                                $(".product-accordion").accordionA("toggle", "#review-section", true)
                            }, 500)
                        }
                    }
                } else {}
            }
        })
    };
    var callCategoryReviews = function() {
        //console.log("Call category reviews")

        var reviewCodeCollection = [];
        var commaSeparatedIds = "";
        if (typeof productJson === "undefined") {
            return
        }
        for (var i = 0; i < productJson.products.length; i++) {
            for (prop in window.productJson.products[i]) {
                reviewCodeCollection.push(prop);
                if (i < productJson.products.length - 1) {
                    commaSeparatedIds = commaSeparatedIds + prop + ","
                } else {
                    commaSeparatedIds = commaSeparatedIds + prop
                }
            }
        }
        $.ajax({
            url: "//api.bazaarvoice.com/data/statistics.json?apiversion=5.4&passkey=9qho0pl4cxnt05nqnt3y6yzk6&Filter=ProductId:" + commaSeparatedIds + "&Limit:100&stats=NativeReviews",
            //url: "//api.bazaarvoice.com/data/statistics.json?apiversion=5.4&passkey=9qho0pl4cxnt05nqnt3y6yzk6&Filter=ProductId:C0GCB&Limit:100&stats=NativeReviews",
            type: "GET",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function(data, status) {
                if (!data.HasErrors) {
                    var keyArr = ["Key1", "Key2", "Key3", "Key4", "Key5", "Key6", "Key7", "Key8"];
                    for (var i = data.Results.length - 1; i >= 0; i--) {
                        if (data.Results[i].ProductStatistics.NativeReviewStatistics.TotalReviewCount !== 0) {
                            var thisProdId = data.Results[i].ProductStatistics.ProductId;
                            for (var k = 0; k < keyArr.length; k++) {
                                var $theProd = $("#" + thisProdId /* + keyArr[k] */ );
                                if ($theProd.length > 0) {
                                   // var $theProdAnchor = $theProd.find("a");
                                    var averageRatingVal = data.Results[i].ProductStatistics.NativeReviewStatistics.AverageOverallRating === null ? 0 : data.Results[i].ProductStatistics.NativeReviewStatistics.AverageOverallRating;
                                   // $theProdAnchor.append('<meta itemprop="averageRating" content="' + averageRatingVal + '">');
                                    //$theProdAnchor.append('<meta itemprop="totalReviews" content="' + data.Results[i].ProductStatistics.NativeReviewStatistics.TotalReviewCount + '">');
                                    //$theProd.find("a > p, a > h3").wrapAll('<div class="productReviewStars" />');
                                    //console.log($theProd)
                                    $($theProd.selector + " .productReviewStars").html('<span class="review-rating-stars-on review-rating-stars grid-100 tablet-grid-100 mobile-grid-100 grid-parent"><span class="stars-maintain-width"><span class="float-left"><span class="stars-block">&#9733;&#9733;&#9733;&#9733;&#9733;</span></span><span class="number-of-reviews"></span></span></span>');
                                    var percentToShow = averageRatingVal / 5 * 100;
                                    $($theProd.selector + " .stars-block").css("width", percentToShow + "%");
                                    $($theProd.selector + " .number-of-reviews").text("(" + data.Results[i].ProductStatistics.NativeReviewStatistics.TotalReviewCount + ")")
                                } else {
                                    break
                                }
                            }
                        } else {}
                    }
                }
            }
        })
    };
    var addAccordion = function() {
        if ($(".product-accordion").length > 0 && $("#review-section").length < 1) {
            var productToReviewId = typeof $("#productId").val() === "undefined" ? $(".buy-off-container .product-details").attr("prod-id") : $("#productId").val();
            $(".product-accordion").append($(['<section id="review-section" aria-expanded="false">', '<header><h2>Reviews</h2><div id="reviewSummaryContainer"></div></header>', '<div class="content">', '<div id="reviewContainer">', function() {
                if (tcp_env.user.email.length > 0) {
                    return ['<a id="add-review" href="http://display.ugc.bazaarvoice.com/static/toast/en_GB/container.htm?bvaction=rr_submit_review&bvproductId=' + getRangeProductId() + '" target="_blank">', '<span class="grid-40 suffix-10 tablet-grid-40 tablet-suffix-10 mobile-grid-40 mobile-suffix-10 grid-parent">Add Review</span>', "</a>", '<div class="review-dropdown grid-40 prefix-10 tablet-grid-40 tablet-prefix-10 mobile-grid-40 mobile-prefix-10">'].join("")
                } else {
                    var returnToProductURL = "/login.htm?returnUrl=";
                    returnToProductURL = returnToProductURL + document.location.pathname.replace(/\//gi, "%2f").replace(/\./gi, "%2E");
                    return ['<a id="add-review" href="' + returnToProductURL + '">', '<span class="grid-40 suffix-10 tablet-grid-40 tablet-suffix-10 mobile-grid-40 mobile-suffix-10 grid-parent">Add Review</span>', "</a>", '<div class="review-dropdown grid-40 prefix-10 tablet-grid-40 tablet-prefix-10 mobile-grid-40 mobile-prefix-10">'].join("")
                }
            }(), '<div class="review-dropdown-target">', '<button type="button" role="menuitem">', '<span class="review-dropdown-title">Sort</span>', '<span class="review-off-screen visuallyHidden">Menu, press enter to show options</span>', "</button>", "</div>", '<label for="review-dropdown-select-1" class="review-off-screen visuallyHidden">Sort by</label>', '<div class="review-dropdown-select visuallyHidden">', '<ul class="review-dropdown-active">', '<li class="review-dropdown-item review-dropdown-item-selected" data-review-sort-value="positive" role="menuitem">Highest to Lowest Rating</li>', '<li class="review-dropdown-item" data-review-sort-value="negative" role="menuitem">Lowest to Highest Rating</li>', '<li class="review-dropdown-item" data-review-sort-value="mostRecent" role="menuitem">Most Recent</li>', "</ul>", "</div>", "</div>", '<ul class="review-list"></ul>', "</div>", "</div>", "</section>"].join("")));
            $("#mainContent").on("click", "#add-review", function() {
                var productName = $(".product-details .product-info h1").text() || $(".product-details .product-info h3").text() || $(".wishlist-item-selected .wish-item-title").text();
                _gaq.push(["_trackEvent", "Add Review", "Click", productName])
            });
            if (!accordionCreated) {
                if ($(".product-page").length < 1)
                    $(".product-accordion").accordionA();
                $(".product-accordion").on("click", "section header", function(e) {
                    var sectionName = $(this).text().split("(");
                    sectionName = $.trim(sectionName[0]);
                    if (sectionName.match(/&/g))
                        sectionName = sectionName.replace("&", "and");
                    if (sectionName.match(/Review/g)) {
                        sectionName = "Reviews"
                    }
                    if ($(".product-page").length > 0 && sectionName.match(/Reviews/g) || $(".product-page").length < 1) {
                        if ($(this).parent().attr("aria-expanded") == "true") {
                            _gaq.push(["_trackEvent", sectionName, "Click", "Close"])
                        } else {
                            _gaq.push(["_trackEvent", sectionName, "Click", "Open"])
                        }
                    }
                })
            } else {}
            accordionCreated = true;
            $(".review-dropdown-target button").mousedown(function(e) {
                e.preventDefault()
            });
            if (Modernizr.touch) {
                $(".review-dropdown-target button").click(function() {
                    $(".review-dropdown-select").toggleClass("visuallyHidden")
                })
            } else {
                $(".review-dropdown-target button").hover(function() {
                    $(".review-dropdown-select").removeClass("visuallyHidden")
                })
            }
            $(".review-dropdown-select").hover(function() {}, function() {
                $(".review-dropdown-select").addClass("visuallyHidden")
            });
            $("#review-section").hover(function() {}, function() {
                $(".review-dropdown-select").addClass("visuallyHidden")
            });
            $("body").on("click", ".review-dropdown-item", function(e) {
                $(".product-accordion").accordionA("toggle", "#review-section", false);
                switch ($(this).data("review-sort-value")) {
                    case "mostRecent":
                        setTimeout(function() {
                            callReviews("SubmissionTime:desc", true);
                            $(".review-dropdown-title").html("Most Recent")
                        }, 250);
                        break;
                    case "negative":
                        setTimeout(function() {
                            callReviews("Rating:asc", true);
                            $(".review-dropdown-title").html("Lowest to Highest Rating")
                        }, 250);
                        break;
                    case "positive":
                        setTimeout(function() {
                            callReviews("Rating:desc", true);
                            $(".review-dropdown-title").html("Highest to Lowest Rating")
                        }, 250);
                        break
                }
                $(".review-dropdown-select").addClass("visuallyHidden");
                sortOrder = $(this).text();
                sortOrder = $.trim(sortOrder);
                _gaq.push(["_trackEvent", "Review Sort", "Click", sortOrder])
            })
        }
    };
    $(document).ready(function() {
        if ($(".lookbook-buy-off").length < 1 && (typeof $(".selected-range-product").attr("id") != "undefined" || typeof $("#productId").val() != "undefined")) {
            callReviews()
        } else if ($(".category-product-items").length > 0) {
            callCategoryReviews()
        }
    });
    return moduleVar = {
        callReviews: callReviews,
        callCategoryReviews: callCategoryReviews
    }
}();




// DOC READY SECTION - Page ready only scripts
$(document).ready(function() {

$('.buy-off-container #ctl00_globalMainContent_btnCheckout').attr('href', '/basket.htm');

    flagSwap() 

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
