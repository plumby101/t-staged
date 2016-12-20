var categoryModule = function() {
    var moduleVar = {};
    var firingLazyLoad = false;
    var deleteAll = "deleteAll";
    var filterObjectsArray = [];
    var filteredIDsArray = [];
    var activeFilters = [];
    var uniqueSizesArr = [];
    var objectsDisplayedArr = [];
    var uniqueColoursArr = [];
    var legLengthRegex = /([0-9]{2}\s(R|L|r|l))/i;
    var rememberFilters = false;
    var heightToHit = 37;
    var skuListObjectSplitOne = stockJsonSplitOne = stockJsonSplitTwo = skuListObjectSplitTwo = [];
    var allProductImages = breakdownArr = [];
    getProductImgSourceAndBreakdowns = function($productImg) {
        var arr = [];
        var breakdownImgSrc = $productImg.attr("src") === undefined ? $productImg.data("imgSrc") : $productImg.attr("src");
        var productSrc = breakdownImgSrc.replace("global", "product").replace("//d3c707rd4l0ogp.cloudfront.net/", "//d117fiyhpld8f9.cloudfront.net/");
        arr.push(productSrc.replace(sizeRegex, "/550/"));
        arr.push(productSrc.replace(sizeRegex, "/700/"));
        arr.push(productSrc.replace(sizeRegex, "/950/"));
        arr.push(productSrc.replace(sizeRegex, "/1200/"));
        arr.push(productSrc.replace(sizeRegex, "/1553/"));
        return arr
    };
    serveImages = function($productImage) {
        var breakdownPoppedObj = breakdownArr.pop();
        setTimeout(function() {
            $(".cache-served-image").attr("src", breakdownPoppedObj);
            if (breakdownArr.length == 0) {
                cacheOffImages()
            } else {
                serveImages()
            }
        }, 250)
    };
    cacheOffImages = function() {
        if (allProductImages.length > 0) {
            var $productImage = $(allProductImages.splice(allProductImages.length - 1, 1));
            breakdownArr = getProductImgSourceAndBreakdowns($productImage);
            serveImages($productImage)
        } else {
            console.log("Finished Caching Images for:");
            console.log($(".category-nav ul li a.selected").text() + " - " + $(".category-nav-list li a.current").text())
        }
    };
    // var getCustomGroupStockInfo = function(skuList) {
    //     $.ajax({
    //         url: "/services/stockservices.asmx/GetProductVariantStock",
    //         type: "POST",
    //         contentType: "application/json; charset=utf-8",
    //         data: JSON.stringify(skuListObject),
    //         dataType: "json",
    //         success: function(data, status) {
    //             stockJson = $.parseJSON(data.d);
    //             updateStockInformation();
    //             buildFilters();
    //             defineHeightOfFilterDropDown();
    //             if ($(".category-product-items").length > 0) {
    //                 resetFilterObjectsArray();
    //                 addOutOfStockToBottom();
    //                 updateFilters(deleteAll, false, "none");
    //                 updateFilterQuantities("none", false);
    //                 var overrideFiltersFromParam = getParameterByName("setCatFilter");
    //                 var overrideFiltersArr = overrideFiltersFromParam.split("|");
    //                 if (overrideFiltersArr.length > 0 && overrideFiltersArr[0] != "") {
    //                     clearAllFilters();
    //                     for (var i = 0; i < overrideFiltersArr.length; i++) {
    //                         $("#" + overrideFiltersArr[i]).trigger("click", ["triggerUsed"])
    //                     }
    //                 } else setPreSelectedFilters()
    //             }
    //             setCategoryEventListeners();
    //             if (typeof doCustomBehaviourPostCategoryBuild != "undefined") {
    //                 doCustomBehaviourPostCategoryBuild()
    //             }
    //             if ($.browser.device == true && $(".lazy-load").length > 0) {
    //                 $(".category-product-items").append("<div class='CusStock grid-40 tablet-grid-40 mobile-grid-40 prefix-30 tablet-prefix-30 mobile-prefix-30 suffix-30 tablet-suffix-30 mobile-suffix-30' id='pleaseRelease'>Release to load more products</div>")
    //             }
    //         }
    //     })
    // };
    var getCustomGroupProductInfo = function(skuList) {
        $.ajax({
            url: "/services/stockservices.asmx/GetProductData",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: skuList,
            dataType: "json",
            success: function(data, status) {
                productJson = $.parseJSON(data.d);
                initialiseCustomCategory();
                getCustomGroupStockInfo(skuList)
            }
        })
    };
    var initialiseCustomCategory = function() {
        $("#mainContent").append($(['<div class="filter-wrapper grid-100 mobile-grid-100 tablet-grid-100 grid-parent">', '<nav id="breadcrumb" class="grid-100 tablet-grid-100 grid-100 grid-parent">', "<ul>", '<li><a rel="nofollow" href="/"><span>home</span></a></li>', "<li>", '<a href="/collection/' + categoryName.replace(/\ /g, "-") + '.htm"><span>' + categoryName + "</span></a>", "</li>", "</ul>", "</nav>"].join("")));
        $("#mainContent").append($('<div class="category-product-items grid-100 tablet-grid-100 mobile-grid-100 grid-parent"></div>'));
        var remainderArr = [];
        var arrOfCuratedItems = [];
        for (var i = 0; i < productJson.products.length; i++) {
            for (prop in productJson.products[i]) {
                if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance" && prop != "restricted") {
                    for (var j = 0; j < productJson.products[i][prop].length; j++) {
                        var foundItem = _.find(itemCodes, function(obj) {
                            return obj.rendered != true && obj.itemCode.toLowerCase() == prop.toLowerCase() && productJson.products[i][prop][j].colour.replace(/\s/g, "").replace(/\//g, "").replace("&", "").toLowerCase() == obj.skuColour.toLowerCase()
                        });
                        if (foundItem) {
                            arrOfCuratedItems.push({
                                parentItem: productJson.products[i],
                                item: productJson.products[i][prop][j],
                                prodCode: prop,
                                foundItem: foundItem
                            })
                        } else if (typeof showWholeCategory != "undefined" && showWholeCategory == true) {
                            remainderArr.push(getCategoryItemTemplate(productJson.products[i], productJson.products[i][prop][j], prop))
                        }
                        objectsDisplayedArr.push(productJson.products[i][prop]);
                        uniqueColoursArr.push(productJson.products[i][prop][j].baseColour)
                       // console.log(productJson.products[i][prop][j].baseColour)
                    }
                }
            }
        }
        for (var j = 0; j < itemCodes.length; j++) {
            for (var i = 0; i < arrOfCuratedItems.length; i++) {
                if (itemCodes[j].itemCode.toLowerCase() == arrOfCuratedItems[i].prodCode.toLowerCase() && itemCodes[j].skuColour.toLowerCase() == arrOfCuratedItems[i].item.colour.replace(/\s/g, "").replace(/\//g, "").replace("&", "").toLowerCase()) {
                    itemCodes[j].rendered = true;
                    $(".category-product-items").append(getCategoryItemTemplate(arrOfCuratedItems[i].parentItem, arrOfCuratedItems[i].item, arrOfCuratedItems[i].prodCode, arrOfCuratedItems[i].foundItem));
                    break
                }
            }
        }
        uniqueColoursArr = getUniqueStringArray(uniqueColoursArr);
        if (typeof showWholeCategory != "undefined" && showWholeCategory == true) {
            for (var i = 0; i < remainderArr.length; i++) {
                $(".category-product-items").append(remainderArr[i])
            }
        }
        if (typeof groupByBaseColour != "undefined" && groupByBaseColour != false) {
            groupProductsByBaseColour()
        }
    };
    var setUpDefaultPeeriusCategoryProducts = function() {
        if ($(".you-may-also-like").length == 0) {
            $("#main-content").after($('<div class="grid-30 tablet-30 mobile-100"><h3 class="product-label">You may also like</h3><div class="grid-100 tablet-grid-100 mobile-grid-100 you-may-also-like"><ul class="ymal-slides grid-parent"></ul></div></div>'));
            for (var i = 0; i < productPeeriusDefaults.length; i++) {
                if (i < 5) {
                    var $ymalLiItem = $('<li class="grid-20 mobile-grid-20 tablet-grid-20" style="display: list-item;"></li>');
                    $(".ymal-slides").append($ymalLiItem);
                    $ymalLiItem.append($('<a href="' + productPeeriusDefaults[i].url + '" title="' + productPeeriusDefaults[i].title + '"><img src="' + productPeeriusDefaults[i].img.replace(sizeRegex, "/250/").replace("/product/", "/global/") + '" alt="' + productPeeriusDefaults[i].title + '" class="grid-image"></a>'))
                } else {
                    break
                }
            }
        }
        Tipped.create(".product-details .ymal-slides a", {
            skin: "toast",
            target: "mouse",
            hook: "topmiddle",
            showDelay: 250
        })
    };
   
    var groupProductsByBaseColour = function() {
        var sortedElemArray = [];
        for (var i = 0; i < uniqueColoursArr.length; i++) {
            for (var k = 0; k < $(".product").length; k++) {
                if (uniqueColoursArr[i].toLowerCase() == $($(".product")[k]).attr("base-colour").toLowerCase()) {
                    sortedElemArray.push($($(".product")[k]))
                }
            }
        }
        $(".category-product-items").html("");
        for (var i = 0; i < sortedElemArray.length; i++) {
            $(".category-product-items").append(sortedElemArray[i])
        }
    };

    var getCategoryItemTemplate = function(parentItem, item, prodCode, foundItem) {
        if (parentItem.restricted[tcp_env.country_code]) {
            return
        }
        var currency_symbol = tcp_env.currency_symbol === "&#163;" ? "£" : typeof tcp_env.currency_symbol !== "undefined" ? tcp_env.currency_symbol : "£";
        var newItemSource = item.upImg;
        if (typeof foundItem != "undefined" && typeof foundItem.imgSourceReplace != "undefined") {
            newItemSource = newItemSource.replace(foundItem.imgSourceReplace, foundItem.imgSourceInsert)
        }
        var itemPriceValue = item.price.replace(/,/g, "");
        var itemSalePriceValue = item.salePrice.replace(/,/g, "");
        var newPrice = "";
        if (parseFloat(itemPriceValue) > parseFloat(itemSalePriceValue)) {
            newPrice = "<span class='sale'>" + currency_symbol + parseFloat(item.price).toFixed(2).replace(".00", "") + "</span>" + currency_symbol + parseFloat(item.salePrice).toFixed(2).replace(".00", "")
        } else {
            newPrice = item.price;
            if (item.price.indexOf(",") != -1) {
                var priceBreakdown = item.price.split(",");
                newPrice = currency_symbol + parseFloat(priceBreakdown[0]).toFixed(2).replace(".00", "") + " - " + currency_symbol + parseFloat(priceBreakdown[priceBreakdown.length - 1]).toFixed(2).replace(".00", "")
            } else {
                newPrice = currency_symbol + parseFloat(item.price).toFixed(2).replace(".00", "")
            }
        }
        return $(['<div class="product grid-25 tablet-grid-33 mobile-grid-50" id="' + item.prodId.substring(0,5) + '" base-colour="' + item.baseColour + '" colour="' + item.colour + '">', '<a href="/product/' + prodCode + "/" + prodCode + ".htm?clr=" + prodCode.split("-")[0] + "_" + item.colour.replace(/\s/g, "").replace(/\//g, "") + '">', '<img src="' + newItemSource + '" alt="' + parentItem.title + '" title="' + parentItem.title + '" class="grid-image product-image">', "<h3>" + parentItem.title + "</h3>", "<p>" + newPrice + "</p>", '<div class="hover-details visuallyHidden">', "<h3>Available In</h3>", "<p></p>", "</div>", "</a>", '<div class="hide-on-desktop product-info-btn"><span>Sizes</span></div>', "</div>"].join(""))
    };
    var buildFilters = function() {
        $(".filter-wrapper").append($(['<div class="filters grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', '<section class="filter-types grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', "<a>", "<span>Filter</span>", "</a>", "</section>", '<section class="filters-selected grid-100 tablet-grid-100 mobile-grid-100 grid-parent">', "<ul>", '<li class="clear-filter visuallyHidden"><a href="#">CLEAR ALL</a></li>', "</ul>", "</section>", '<div class="clearfix"></div>', "</div>"].join("")));
        $(".filter-wrapper").append($(['<div class="filter-options grid-80 tablet-grid-80 mobile-grid-100 grid-parent">', "</div>"].join("")));
        addFilterSections();
        addFilterOptions()
    };
    var addFilterSections = function() {
        var currency_symbol = tcp_env.currency_symbol === "&#163;" ? "£" : typeof tcp_env.currency_symbol !== "undefined" ? tcp_env.currency_symbol : "£";
        $(".filter-options").prepend(['<section class="grid-25 tablet-grid-25 mobile-grid-50 grid-parent">', '<select class="colour-options"><option>Colour</option></select>', "</section>", '<section class="grid-25 tablet-grid-25 mobile-grid-50 grid-parent">', '<select class="size-options"><option>Size</option></select>', "</section>", '<section class="grid-25 tablet-grid-25 mobile-grid-50 grid-parent">', '<select class="price-options">', "<option>Price</option>", '<option id="PBand1" filter-value="band1" filter-text="under ' + currency_symbol + '50" visible="True">under ' + currency_symbol + "50<span></span></option>", '<option id="PBand2" filter-value="band2" filter-text="' + currency_symbol + "50 to " + currency_symbol + '100" visible="True">' + currency_symbol + "50 to " + currency_symbol + "100<span></span></option>", '<option id="PBand3" filter-value="band3" filter-text="' + currency_symbol + "100 to " + currency_symbol + '150" visible="True">' + currency_symbol + "100 to " + currency_symbol + "150<span></span></option>", '<option id="PBand4" filter-value="band4" filter-text="' + currency_symbol + "150 to " + currency_symbol + '200" visible="True">' + currency_symbol + "150 to " + currency_symbol + "200<span></span></option>", '<option id="PBand5" filter-value="band5" filter-text="' + currency_symbol + '200 and over" visible="True">' + currency_symbol + "200 and over<span></span></option>", "</select>", "</section>", '<section class="grid-25 tablet-grid-25 mobile-grid-50 grid-parent">', '<select class="sort-options">', "<option>Sort</option>", '<option id="Rank1" filter-value="rank1" filter-text="Price: High - Low" visible="True" >Price: High - Low</option>', '<option id="Rank2" filter-value="rank2" filter-text="Price: Low - High" visible="True">Price: Low - High</option>', '<option id="Rank3" filter-value="rank3" filter-text="Reviews: Highest Rated" visible="True">Reviews: Highest Rated</option>', '<option id="Rank4" filter-value="rank4" filter-text="Sale" visible="True">Sale</option>', "</select>", "</section>"].join(""))
    };
    var addFilterOptions = function() {
        for (var i = 0; i < uniqueColoursArr.length; i++) {
            $(".colour-options").append('<option id="C' + uniqueColoursArr[i] + '" filter-value="' + uniqueColoursArr[i] + '" filter-text="' + uniqueColoursArr[i] + '" visible="True">Hello ' + uniqueColoursArr[i] + "<span></span></option>")
        }
        for (var i = 0; i < uniqueSizesArr.length; i++) {
            $(".size-options").append('<option id="S' + uniqueSizesArr[i].replace(/ /g, "-") + '" filter-value="' + uniqueSizesArr[i].replace(/ /g, "-") + '" filter-text="' + uniqueSizesArr[i].replace(/ /g, "-") + '"  visible="True">' + uniqueSizesArr[i] + "<span></span></option>")
        }
        for (var i = 0; i < $(".size-options option").length; i++) {
            if (typeof $($(".size-options option")[i]).attr("id") !== "undefined" && $($(".size-options option")[i]).attr("id").indexOf("-") != -1) {
                $($(".size-options option")[i]).parent().hide()
            }
        }
        $(".filter-options select").change(function(e, triggerUsed) {
            e.preventDefault();
            var $target = $("option:selected", this);
            var targetId = $target.attr("id");
            if ($target.attr("id").length > 0) {
                var indicator = targetId.charAt(0);
                var type = "size";
                if (indicator.toLowerCase() == "c") {
                    type = "colour"
                } else if (indicator.toLowerCase() == "p") {
                    type = "price"
                } else if (indicator.toLowerCase() == "r") {
                    type = "rank"
                }
            }
            var triggerArr = [];
            if (type == "size") {
                if ($target.parent().is(":visible")) {
                    for (var i = 0; i < $(".size-options a").length; i++) {
                        var $sizeOption = $($(".size-options a")[i]);
                        if ($sizeOption.attr("filter-value").toLowerCase().indexOf($target.attr("filter-value") + " r") != -1 || $sizeOption.attr("filter-value").toLowerCase().indexOf($target.attr("filter-value") + " l") != -1) {
                            triggerArr.push($sizeOption)
                        }
                    }
                }
            }
            if ($target.hasClass("selected")) {
                $target.removeClass("selected");
                $(".token-" + targetId).remove();
                updateFilters($target.attr("filter-value"), false, type);
                if (activeFilters.length === 0 && $(".filter-token-disabled").length === 0) {
                    clearCategoryFilterCookie()
                }
            } else {
                $target.addClass("selected");
                var $targetCopy = $target.clone();
                var targetText = $targetCopy.attr("filter-text");
                var $newToken = $('<li class="filter-token ' + "token-" + targetId.substring(0,5) + " " + type + "-token" + '" associate="' + targetId.substring(0,5) + '"><a href="#">' + targetText + "</a></li>");
                $(".filters-selected ul").append($newToken);
                updateFilters($target.attr("filter-value"), true, type);
                for (var i = 0; i < triggerArr.length; i++) {
                    triggerArr[i].addClass("selected");
                    $targetCopy = triggerArr[i].clone();
                    $targetCopy.find("span").remove();
                    targetText = $targetCopy.attr("filter-text");
                    var $newToken = $('<li class="filter-token ' + "token-" + triggerArr[i].attr("id").substring(0,5) + " " + type + "-token" + '" associate="' + triggerArr[i].attr("id").substring(0,5) + '"><a href="#">' + targetText + "</a></li>");
                    $(".filters-selected ul").append($newToken);
                    updateFilters(triggerArr[i].attr("filter-value"), true, type)
                }
                if (type === "rank") {
                    if ($target.attr("filter-value") === "rank1") {
                        $("#Rank2, #Rank3, #Rank4").removeClass("selected");
                        $(".token-Rank2, .token-Rank3, .token-Rank4").remove();
                        updateFilters($("#Rank2").attr("filter-value"), false, type);
                        updateFilters($("#Rank3").attr("filter-value"), false, type);
                        updateFilters($("#Rank4").attr("filter-value"), false, type)
                    } else if ($target.attr("filter-value") === "rank2") {
                        $("#Rank1, #Rank3, #Rank4").removeClass("selected");
                        $(".token-Rank1, .token-Rank3, .token-Rank4").remove();
                        updateFilters($("#Rank1").attr("filter-value"), false, type);
                        updateFilters($("#Rank3").attr("filter-value"), false, type);
                        updateFilters($("#Rank4").attr("filter-value"), false, type)
                    } else if ($target.attr("filter-value") === "rank3") {
                        $("#Rank1, #Rank2, #Rank4").removeClass("selected");
                        $(".token-Rank1, .token-Rank2, .token-Rank4").remove();
                        updateFilters($("#Rank1").attr("filter-value"), false, type);
                        updateFilters($("#Rank2").attr("filter-value"), false, type);
                        updateFilters($("#Rank4").attr("filter-value"), false, type)
                    } else if ($target.attr("filter-value") === "rank4") {
                        $("#Rank2, #Rank3, #Rank1").removeClass("selected");
                        $(".token-Rank2, .token-Rank3, .token-Rank1").remove();
                        updateFilters($("#Rank1").attr("filter-value"), false, type);
                        updateFilters($("#Rank2").attr("filter-value"), false, type);
                        updateFilters($("#Rank3").attr("filter-value"), false, type)
                    }
                }
            }
            checkClearButtonShow()
        });
        $(".filters-selected").on("click", ".filter-token", function(e) {
            e.preventDefault();
            var associateTag = "";
            var $target = $(this);
            if ($target.hasClass("filter-token")) {
                $target.remove();
                associateTag = $target.attr("associate")
            } else {
                $target.parent().remove();
                associateTag = $target.parent().attr("associate")
            }
            $("#" + associateTag).removeClass("selected");
            checkClearButtonShow();
            var type = "size";
            if ($target.hasClass("colour-token")) {
                type = "colour"
            } else if ($target.hasClass("price-token")) {
                type = "price"
            }
            updateFilters($("#" + associateTag).attr("filter-value"), false, type);
            if (activeFilters.length === 0 && $(".filter-token-disabled").length === 0) clearCategoryFilterCookie()
        })
    };
    var populateArraysForFilters = function() {
        for (var i = 0; i < productJson.products.length; i++) {
            for (prop in productJson.products[i]) {
                if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance") {
                    for (var j = 0; j < productJson.products[i][prop].length; j++) {
                        uniqueColoursArr.push(productJson.products[i][prop][j].baseColour)
                      
                    }
                }
            }
        }
        uniqueColoursArr = getUniqueStringArray(uniqueColoursArr)
      
    };
    moduleVar.beginCustomCategoryBuild = function() {
        if (typeof itemCodes != "undefined") {
            if (itemCodes.length > 0) {
                skuListObject = {
                    skuList: []
                };
                for (var i = 0; i < itemCodes.length; i++) {
                    skuListObject.skuList.push(itemCodes[i].itemCode)
                }
                getCustomGroupProductInfo(JSON.stringify(skuListObject))
            }
        }
    };
    var getCategoryStockInfo = function() {
        var skuListObject = {
            skuList: []
        };
        for (var i = 0; i < productJson.products.length; i++) {
            for (prop in window.productJson.products[i]) {
                if (prop !== "restricted") {
                    skuListObject.skuList.push(prop)
                }
            }
        }
        if (skuListObject.skuList.length <= 50) {
            $.ajax({
                url: "/services/stockservices.asmx/GetProductVariantStock",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(skuListObject),
                dataType: "json",
                success: function(data, status) {
                    stockJson = $.parseJSON(data.d);
                    updateFilters(deleteAll, false, "none");
                    updateStockInformation();
                    populateArraysForFilters();
                    if ($(".colour-options").length == 0) {
                        addFilterSections();
                        addFilterOptions();
                        defineHeightOfFilterDropDown()
                    }
                    addOutOfStockToBottom();
                    updateFilterQuantities("none", false);
                    setCategoryEventListeners();
                    var overrideFiltersFromParam = getParameterByName("setCatFilter");
                    var overrideFiltersArr = overrideFiltersFromParam.split("|");
                    if (overrideFiltersArr.length > 0 && overrideFiltersArr[0] != "") {
                        clearAllFilters();
                        for (var i = 0; i < overrideFiltersArr.length; i++) {
                            $("#" + overrideFiltersArr[i]).trigger("click", ["triggerUsed"])
                        }
                    } else {
                        setPreSelectedFilters()
                    }
                    if ($.browser.device == true && $(".lazy-load").length > 0) {
                        $(".category-product-items").append("<div class='catStockIf grid-40 tablet-grid-40 mobile-grid-40 prefix-30 tablet-prefix-30 mobile-prefix-30 suffix-30 tablet-suffix-30 mobile-suffix-30' id='pleaseRelease'>Release to load more products</div>")
                    }
                }
            })
        } else {
            var skuListObjectSplitOne = {
                skuList: skuListObject.skuList.slice(0, 50)
            };
            var skuListObjectSplitTwo = {
                skuList: skuListObject.skuList.slice(50, skuListObject.skuList.length)
            };
            $.ajax({
                url: "/services/stockservices.asmx/GetProductVariantStock",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(skuListObjectSplitOne),
                dataType: "json",
                success: function(data, status) {
                    var stockJsonSplitOne = $.parseJSON(data.d);
                    $.ajax({
                        url: "/services/stockservices.asmx/GetProductVariantStock",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(skuListObjectSplitTwo),
                        dataType: "json",
                        success: function(data, status) {
                            var stockJsonSplitTwo = $.parseJSON(data.d);
                            var stockListArr = stockJsonSplitOne.stocklist.concat(stockJsonSplitTwo.stocklist);
                            stockJson = {
                                stocklist: stockListArr
                            };
                            updateFilters(deleteAll, false, "none");
                            updateStockInformation();
                            populateArraysForFilters();
                            if ($(".colour-options").length == 0) {
                                addFilterSections();
                                addFilterOptions();
                                defineHeightOfFilterDropDown()
                            }
                            addOutOfStockToBottom();
                            updateFilterQuantities("none", false);
                            setCategoryEventListeners();
                            var overrideFiltersFromParam = getParameterByName("setCatFilter");
                            var overrideFiltersArr = overrideFiltersFromParam.split("|");
                            if (overrideFiltersArr.length > 0 && overrideFiltersArr[0] != "") {
                                clearAllFilters();
                                for (var i = 0; i < overrideFiltersArr.length; i++) {
                                    $("#" + overrideFiltersArr[i]).trigger("click", ["triggerUsed"])
                                }
                            } else {
                                setPreSelectedFilters()
                            }
                            if ($.browser.device == true && $(".lazy-load").length > 0) {
                                $(".category-product-items").append("<div class='catStockElse grid-40 tablet-grid-40 mobile-grid-40 prefix-30 tablet-prefix-30 mobile-prefix-30 suffix-30 tablet-suffix-30 mobile-suffix-30' id='pleaseRelease'>Release to load more products</div>")
                            }
                        }
                    })
                }
            })
        }
    };
    var setPreSelectedFilters = function() {
        var preSelectedFilters = getParameterByName("presetFilters").split("~");
        if (preSelectedFilters.length > 0 && preSelectedFilters[0] != "") {
            for (var i = 0; i < preSelectedFilters.length; i++) {
                for (var j = 0; j < $(".filter-options section a").length; j++) {
                    if (preSelectedFilters[i].toLowerCase() === $($(".filter-options section a")[j]).attr("id").toLowerCase()) {
                        $($(".filter-options section option")[j]).trigger("click", ["triggerUsed"])
                    }
                }
            }
        } else if (rememberFilters) {
            var preferredFiltersArr = [];
            if ($.cookie("preset_filters")) {
                var tempFiltersArr = $.cookie("preset_filters").split("|");
                if (tempFiltersArr.length > 0 && tempFiltersArr[0] != "") {
                    for (var i = 0; i < tempFiltersArr.length; i++) {
                        var newNodes = tempFiltersArr[i].split("~");
                        var newObj = {
                            type: newNodes[0],
                            value: newNodes[1]
                        };
                        preferredFiltersArr.push(newObj)
                    }
                    for (var i = 0; i < preferredFiltersArr.length; i++) {
                        var foundItem = _.find($(".filter-options section option"), function(obj) {
                            return preferredFiltersArr[i].value.toLowerCase() === $(obj).attr("filter-value").toLowerCase()
                        });
                        if (foundItem) {
                            $(foundItem).trigger("click", ["triggerUsed"])
                        } else {
                            var $newToken = $('<li class="filter-token-disabled"' + 'token-value="' + preferredFiltersArr[i].value + '" token-type="' + preferredFiltersArr[i].type + '"><a href="#">' + preferredFiltersArr[i].value + "</a></li>");
                            $(".filters-selected ul").append($newToken)
                        }
                    }
                    setFilterCookie()
                }
            }
            checkClearButtonShow()
        }
    };
    var updateStockInformation = function() {
        for (var i = 0; i < stockJson.stocklist.length; i++) {
            var $elem = $("#" + stockJson.stocklist[i].prodId.substring(0,5));
            if ($elem.length > 0) {
                var sizesAvailable = "";
                var sizesAvailable2 = "";
                var testSizeVar = "";
                for (var j = 0; j < stockJson.stocklist[i].sizesInStock.length; j++) {
                    var str = "";
                    str = stockJson.stocklist[i].sizesInStock[j].value1;
                    uniqueSizesArr.push(str);
                    if (stockJson.stocklist[i].sizesInStock[j].stlev != "0" || stockJson.stocklist[i].sizesInStock[j].preOrderAvailable != "") {
                        var hoverRegex = /( )(l)(?:$| )/i;
                        if (sizesAvailable.indexOf(str) == -1 && str.toLowerCase().search(hoverRegex) == -1) {
                            sizesAvailable = sizesAvailable.concat(str + ", ")
                        } else if (sizesAvailable2.indexOf(str) == -1 && str.toLowerCase().search(hoverRegex) != -1) {
                            sizesAvailable2 = sizesAvailable2.concat(str + ", ")
                        } else {
                            sizesAvailable = sizesAvailable.concat(str + ", ")
                        }
                    }
                }
                if (sizesAvailable.length == 0 && sizesAvailable2.length == 0) {
                     $elem.find(".hover-details h3").text("Out of stock");
                     $elem.find(".hover-details").removeClass("visuallyHidden");
                     //$elem.find("img").css("opacity", "0.6");
                     sizesAvailable = "";
                    // console.log($elem)
                     //$elem.addClass("out-of-stock col-sm-4 col-xs-6")
                } else if (sizesAvailable.toLowerCase().indexOf("one size") != -1) {
                    $elem.find(".hover-details h3").text("In Stock");
                    sizesAvailable = ""
                } else {
                    sizesAvailable = sizesAvailable.substring(0, sizesAvailable.length - 2)
                }
                $elem.find(".hover-details p").text(sizesAvailable);
                if (sizesAvailable2.length > 0) {
                    sizesAvailable2 = sizesAvailable2.substring(0, sizesAvailable2.length - 2);
                    $($elem.find(".hover-details")).addClass("trouser-length").append($("<p>" + sizesAvailable2 + "</p>"))
                } else {
                    sizesAvailable2 = ""
                }
            }
        }
        uniqueSizesArr = getUniqueStringArray(uniqueSizesArr)
    };
    var resetFilterObjectsArray = function() {
        for (var i = 0; i < productJson.products.length; i++) {
            for (prop in productJson.products[i]) {
                if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance") {
                    for (var j = 0; j < productJson.products[i][prop].length; j++) {
                        if (typeof itemCodes === "undefined") {
                            filterObjectsArray.push(productJson.products[i][prop][j])
                        } else {
                            if ($("#" + productJson.products[i][prop][j].prodId).length > 0) {
                                filterObjectsArray.push(productJson.products[i][prop][j])
                            }
                        }
                    }
                }
            }
        }
    };
    var closeFilterOptions = function() {
        var $selected = $(".filter-types .selected");
        if ($selected.length > 0) {
            $(".filter-options").css("height", 0);
            $selected.removeClass("selected");
            $(".close-filter-options").addClass("visuallyHidden");
            if ($(".filter-token").length < 1) {
                $("#remember-filters").fadeOut()
            }
            return true
        }
        return false
    };
    var checkClearButtonShow = function() {
        if ($(".clear-filter").hasClass("visuallyHidden") && $(".filter-token, .filter-token-disabled").length > 0) {
            $(".clear-filter").removeClass("visuallyHidden");
            $("#remember-filters").show()
        } else if (!$(".clear-filter").hasClass("visuallyHidden") && $(".filter-token, .filter-token-disabled").length == 0) {
            $(".clear-filter").addClass("visuallyHidden");
            closeFilterOptions()
        }
    };
    var doSizeCheck = function(filterValue, obj) {
        var hasIt = false;
        for (var i = 0; i < stockJson.stocklist.length; i++) {
            if (obj.prodId.toLowerCase() == stockJson.stocklist[i].prodId.toLowerCase()) {
                for (var j = 0; j < stockJson.stocklist[i].sizesInStock.length; j++) {
                    if (stockJson.stocklist[i].sizesInStock[j].stlev != "0" && stockJson.stocklist[i].sizesInStock[j].value1.toLowerCase() == filterValue.toLowerCase()) {
                        hasIt = true;
                        break
                    } else {
                        for (var k = 0; k < activeFilters.length; k++) {
                            if (activeFilters[k].type == "size") {
                                if (stockJson.stocklist[i].sizesInStock[j].stlev != "0" && stockJson.stocklist[i].sizesInStock[j].value1.toLowerCase() == activeFilters[k].value.toLowerCase()) {
                                    hasIt = true;
                                    break
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!hasIt) spliceIt(obj)
    };
    var checkPriceBands = function(filterValue, price) {
        if (filterValue.toLowerCase() == "band1") {
            if (price > 50) {
                return true
            }
        } else if (filterValue.toLowerCase() == "band2") {
            if (price <= 50 || price > 100) {
                return true
            }
        } else if (filterValue.toLowerCase() == "band3") {
            if (price <= 100 || price > 150) {
                return true
            }
        } else if (filterValue.toLowerCase() == "band4") {
            if (price <= 150 || price > 200) {
                return true
            }
        } else if (filterValue.toLowerCase() == "band5") {
            if (price <= 200) {
                return true
            }
        }
        return false
    };
    var doPriceCheck = function(filterValue, obj) {
        var price = obj.price === obj.salePrice ? parseInt(obj.price) : parseInt(obj.salePrice);
        var doSplice = checkPriceBands(filterValue, price);
        var throwAway = true;
        if (doSplice) {
            for (var i = 0; i < activeFilters.length; i++) {
                if (activeFilters[i].type.toLowerCase() == "price") {
                    if (activeFilters[i].value.toLowerCase() != filterValue.toLowerCase()) {
                        doSplice = checkPriceBands(activeFilters[i].value, price);
                        if (!doSplice) {
                            throwAway = false
                        }
                    }
                }
            }
        }
        if (doSplice && throwAway) spliceIt(obj)
    };
    var doColourCheck = function(filterValue, obj) {
        var hasIt = false;
        for (var i = 0; i < activeFilters.length; i++) {
            if (activeFilters[i].value != filterValue) {
                if (obj.baseColour.toLowerCase() === activeFilters[i].value.toLowerCase()) {
                    hasIt = true;
                    break
                }
            }
        }
        if (!hasIt && obj.baseColour.toLowerCase() !== filterValue.toLowerCase()) {
            spliceIt(obj)
        }
    };
    var showFilteredItems = function() {
        _gaq.push(["_trackEvent", "Category filtered", "Click"])
        for (var k = 0; k < $(".category-product-items .product").length; k++) {
            if (filteredIDsArray.indexOf($($(".category-product-items .product")[k]).attr("id").substring(0,5)) == -1) {
               // console.log( "hide " + $($(".category-product-items .product")[k]))
                $($(".category-product-items .product")[k]).hide()
            } else {
                // console.log( "show " + $($(".category-product-items .product")[k]))
                $($(".category-product-items .product")[k]).show()
            }
        }
    };
    var spliceIt = function(obj) {
       
        var indexAt = filteredIDsArray.indexOf(obj.prodId.substring(0,5));
        if (indexAt != -1) filteredIDsArray.splice(indexAt, 1)
    };
    var updateFilters = function(filterValue, isInsert, filterType) {

        if (filterValue === undefined || filterValue === null) {
     filterValue = deleteAll
}
        if (filterValue === deleteAll) {
            filteredIDsArray = [];
            activeFilters = [];
            $(".product").show();
            return
        }
        if (isInsert) {
            activeFilters.push({
                value: filterValue,
                type: filterType
            })
        } else {
            for (var l = 0; l < activeFilters.length; l++) {
                if (activeFilters[l].value.toLowerCase() === filterValue.toLowerCase()) {
                    activeFilters.splice(l, 1);
                    break
                }
            }
        }
        filteredIDsArray = [];
        for (var h = 0; h < filterObjectsArray.length; h++) {
            filteredIDsArray.push(filterObjectsArray[h].prodId.substring(0,5))
                //console.log(filteredIDsArray)
        }
        for (var j = 0; j < activeFilters.length; j++) {
            for (var i = 0; i < filterObjectsArray.length > 0; i++) {
                obj = filterObjectsArray[i];
                if (activeFilters[j].type.toLowerCase() == "colour") {
                    doColourCheck(activeFilters[j].value, obj)
                } else if (activeFilters[j].type.toLowerCase() == "size") {
                    doSizeCheck(activeFilters[j].value, obj)
                } else if (activeFilters[j].type.toLowerCase() == "price") {
                    doPriceCheck(activeFilters[j].value, obj)
                }
            }
        }
        showFilteredItems();
        updateFilterQuantities(filterType, isInsert);
        setFilterCookie();
        var notSorted = true;
        if ($(".token-Rank2").length > 0) {
            notSorted = false;
            filterObjectsArray.sort(function(a, b) {
                return a.salePrice - b.salePrice
            })
        } else if ($(".token-Rank1").length > 0) {
            notSorted = false;
            filterObjectsArray.sort(function(a, b) {
                return b.salePrice - a.salePrice
            })
        } else if ($(".token-Rank4").length > 0) {
            notSorted = false;
            filterObjectsArray.sort(function(a, b) {
                var aSalePrice = a.salePrice < a.price ? a.salePrice : 0;
                var bSalePrice = b.salePrice < b.price ? b.salePrice : 0;
                return bSalePrice - aSalePrice
            })
        } else if ($(".token-Rank3").length > 0) {
            notSorted = false;
            filterObjectsArray.sort(function(a, b) {
                var aMeta = $("#" + a.prodId + ' meta[itemProp="averageRating"]').length > 0 ? parseFloat($("#" + a.prodId + ' meta[itemProp="averageRating"]').attr("content")) : 0;
                var bMeta = $("#" + b.prodId + ' meta[itemProp="averageRating"]').length > 0 ? parseFloat($("#" + b.prodId + ' meta[itemProp="averageRating"]').attr("content")) : 0;
                return bMeta - aMeta
            })
        }
        orderSortedElements(notSorted)
    };
    var setFilterCookie = function() {
        if (activeFilters.length > 0 && rememberFilters || $(".filter-token-disabled").length > 0 && rememberFilters) {
            var strGenerated = "";
            for (var i = 0; i < activeFilters.length; i++) {
                if (activeFilters[i].value.search(legLengthRegex) == -1) {
                    strGenerated = strGenerated.concat(activeFilters[i].type + "~" + activeFilters[i].value + "|")
                } else {
                    var foundItem = _.find(activeFilters, function(obj) {
                        return obj.value.toLowerCase() == activeFilters[i].value.slice(0, 2).toLowerCase()
                    });
                    if (!foundItem) {
                        strGenerated = strGenerated.concat(activeFilters[i].type + "~" + activeFilters[i].value + "|")
                    }
                }
            }
            for (var i = $(".filter-token-disabled").length - 1; i >= 0; i--) {
                strGenerated = strGenerated.concat($($(".filter-token-disabled")[i]).attr("token-type") + "~" + $($(".filter-token-disabled")[i]).attr("token-value") + "|")
            }
            strGenerated = strGenerated.slice(0, strGenerated.length - 1);
            $.cookie("preset_filters", strGenerated, {
                path: "/"
            })
        } else {
            return
        }
    };
    var orderSortedElements = function(notSorted) {
        if (typeof itemCodes == "undefined") {
            if (notSorted) {
                for (var i = 0; i < productJson.products.length; i++) {
                    for (prop in productJson.products[i]) {
                        if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance") {
                            for (var j = 0; j < productJson.products[i][prop].length; j++) {
                                $(".category-product-items").append($("#" + productJson.products[i][prop][j].prodId.substring(0,5)))
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < filterObjectsArray.length; i++) {
                    $(".category-product-items").append($("#" + filterObjectsArray[i].prodId.substring(0,5)))
                }
            }
        } else {
            if (notSorted) {
                for (var j = 0; j < itemCodes.length; j++) {
                    for (var i = 0; i < filterObjectsArray.length; i++) {
                        if (filterObjectsArray[i].prodId.toLowerCase().indexOf(itemCodes[j].itemCode.toLowerCase()) != -1 && itemCodes[j].skuColour.toLowerCase() == filterObjectsArray[i].colour.replace(/\s/g, "").replace(/\//g, "").toLowerCase()) {
                            $(".category-product-items").append($("#" + filterObjectsArray[i].prodId.substring(0,5)));
                            break
                        }
                    }
                }
            } else {
                for (var i = 0; i < filterObjectsArray.length; i++) {
                    $(".category-product-items").append($("#" + filterObjectsArray[i].prodId))
                }
            }
        }
        addOutOfStockToBottom()
    };
    var updateFilterQuantities = function(filterType, isInsert) {
        var objectsToCheck = filterObjectsArray;
        var sameTypeOfFilter = true;
        if (activeFilters.length > 0) {
            var newArr = [];
            if (!isInsert) {
                for (var i = 0; i < activeFilters.length; i++) {
                    if (activeFilters[0].type.toLowerCase() != activeFilters[i].type.toLowerCase()) sameTypeOfFilter = false
                }
                if (sameTypeOfFilter) {
                    var arr = activeFilters.slice();
                    updateFilters(deleteAll, false, "none");
                    for (var j = 0; j < arr.length; j++) {
                        updateFilters(arr[j].value, true, arr[j].type)
                    }
                    return
                }
            }
            for (var i = 0; i < filterObjectsArray.length; i++) {
                if (filteredIDsArray.indexOf(filterObjectsArray[i].prodId.toLowerCase()) != -1) {
                    newArr.push(filterObjectsArray[i])
                }
            }
            objectsToCheck = newArr
        } else {
            for (var i = 0; i < filterObjectsArray.length; i++) {
                filteredIDsArray.push(filterObjectsArray[i].prodId.toLowerCase())
            }
        }
        if (filterType) {
            if (filterType.toLowerCase() != "colour" || !isInsert) {
                for (var k = 0; k < $(".colour-options option[filter-value]").length; k++) {
                    var counter = 0;
                    var $thisOption = $($(".colour-options option[filter-value]")[k]);
                    var filterOption = $thisOption.attr("filter-value").toLowerCase();
                    for (var i = 0; i < objectsToCheck.length; i++) {
                      
                        if (objectsToCheck[i].baseColour.toLowerCase() == filterOption && $("#" + objectsToCheck[i].prodId.substring(0,5)).length > 0) {
                            counter++
                        }
                    }
                    $thisOption.text($thisOption.attr("filter-value") /*+ " (" + counter + ")" */)
                }
            }
            if (filterType.toLowerCase() != "size" || !isInsert) {
                for (var k = 0; k < $(".size-options option[filter-value]").length; k++) {
                    var counter = 0;
                    var $thisOption = $($(".size-options option[filter-value]")[k]);
                    var filterOption = $thisOption.attr("filter-value");
                    for (var i = 0; i < stockJson.stocklist.length; i++) {
                        for (var j = 0; j < stockJson.stocklist[i].sizesInStock.length; j++) {
                            if ($("#" + stockJson.stocklist[i].prodId).length > 0) {
                                if (stockJson.stocklist[i].sizesInStock[j].stlev != "0" && stockJson.stocklist[i].sizesInStock[j].value1 == filterOption && filteredIDsArray.indexOf(stockJson.stocklist[i].prodId.substring(0,5)) != -1) {
                                    counter++;
                                    break
                                }
                            }
                        }
                    }
                    $thisOption.text($thisOption.attr("filter-value") /*+ " (" + counter + ")" */)
                }
            }
            if (filterType.toLowerCase() != "price" || !isInsert) {
                for (var k = 0; k < $(".price-options option[filter-value]").length; k++) {
                    var counter = 0;
                    var $thisOption = $($(".price-options option[filter-value]")[k]);
                    var filterOption = $thisOption.attr("filter-value").toLowerCase();
                    for (var i = 0; i < objectsToCheck.length; i++) {
                        if ($("#" + objectsToCheck[i].prodId.substring(0,5)).length > 0) {
                            var priceToCheck = objectsToCheck[i].price === objectsToCheck[i].salePrice ? objectsToCheck[i].price : objectsToCheck[i].salePrice;
                            if (parseInt(priceToCheck) < 50 && filterOption.toLowerCase() == "band1") {
                                counter++
                            } else if (parseInt(priceToCheck) >= 50 && parseInt(priceToCheck) < 100 && filterOption.toLowerCase() == "band2") {
                                counter++
                            } else if (parseInt(priceToCheck) >= 100 && parseInt(priceToCheck) < 150 && filterOption.toLowerCase() == "band3") {
                                counter++
                            } else if (parseInt(priceToCheck) >= 150 && parseInt(priceToCheck) < 200 && filterOption.toLowerCase() == "band4") {
                                counter++
                            } else if (parseInt(priceToCheck) >= 200 && filterOption.toLowerCase() == "band5") {
                                counter++
                            }
                        }
                    }
                    $thisOption.text($thisOption.attr("filter-text") /*+ " (" + counter + ")" */)
                }
            }
        }
    };
    currentWindowWidth = $(window).width();
    windowWidth = $(window).width();
    var workOutCategoryImageSize = function() {
        var newSize = "350";
        if (windowWidth > 1650 && windowWidth < 2e3) {
            newSize = "450"
        }
        if (windowWidth >= 2e3) {
            newSize = "550"
        }
        return newSize
    };
    moduleVar.setCategoryImages = function() {
        windowWidth = $(window).width();
        // if (currentWindowWidth > windowWidth) return;
        // var newSize = workOutCategoryImageSize();
        // var $imgCollection = $(".category-items-holder .productImage img");
        // if ($(".ymal-slides .product").length > 0 && $(".category-product-items .product").length < 1) {
        //     $imgCollection = $(".ymal-slides img")
        // }
        // for (var i = 0; i < $imgCollection.length; i++) {
        //  var $imgItem = $($imgCollection[i]);
        //     if (!$imgItem.parent().parent().hasClass("lazy-load")) {
        //         console.log("search : i= " + i + " src: " + $imgItem.attr("src"))
        //         if ($imgItem.attr("src").search(sizeRegex) != -1) {
        //             var str = $imgItem.attr("src");
        //             str = str.replace(sizeRegex, "/" + newSize + "/");
        //             $imgItem.attr("src", str)
        //         }
        //     } else {
        //         if ($imgItem.data("imgSrc").search(sizeRegex) != -1) {
        //             var str = $imgItem.data("imgSrc");
        //             str = str.replace(sizeRegex, "/" + newSize + "/");
        //             $imgItem.data("imgSrc", str)
        //         }
        //     }
        // }
        currentWindowWidth = windowWidth
    };
    if ($(".category-product-items img").length > 0) {
        var lazyLayout = _.debounce(moduleVar.setCategoryImages, 300);
        $(window).resize(lazyLayout);
        moduleVar.setCategoryImages()
    }
    var hideLegLengthFilter = function() {
        if ($(".size-options li").length > 0) {
            var arr = [];
            for (var i = 0; i < $(".size-options option").length; i++) {
                arr.push($($(".size-options option")[i]).attr("filter-value"))
            }
            for (var i = 0; i < arr.length; i++) {
                var index = arr[i].search(legLengthRegex);
                if (index != -1) {
                    var indexOfNormalSize = arr.indexOf(arr[i].slice(0, 2));
                    var foundItem = _.find($(".size-options li"), function(obj) {
                        return $(obj).find("a").attr("filter-value") == arr[i]
                    });
                    if (foundItem && $(foundItem).length > 0) $(foundItem).hide();
                    if (indexOfNormalSize == -1 && foundItem && $(foundItem).length > 0) {
                        $(foundItem).after($('<option id="' + arr[i].slice(0, 2) + '" filter-value="' + arr[i].slice(0, 2) + '" visible="True">' + arr[i].slice(0, 2) + " </option>"))
                    }
                }
            }
        }
    };
    var defineHeightOfFilterDropDown = function() {};
    var addOutOfStockToBottom = function() {
        $(".category-product-items .out-of-stock").appendTo($(".category-product-items"))

    };
    var addOutOfStockToLazyLoadList = function() {};
    var clearAllFilters = function(e) {
        if (typeof e != "undefined") e.preventDefault();
        $(".filters-selected .filter-token, .filters-selected .filter-token-disabled").remove();
        $(".filter-options .selected").removeClass("selected");
        checkClearButtonShow();
        updateFilters(deleteAll, false, "none");
        clearCategoryFilterCookie()
    };
    var addSaleToTopAndShow = function() {
        for (var i = 0; i < $(".category-product-items .product").length; i++) {
            var $thisProd = $($(".category-product-items .product")[i]);
            if (!$thisProd.hasClass("out-of-stock")) {
                if ($thisProd.find(".sale").length > 0) {
                    $(".category-product-items").prepend($thisProd);
                    $thisProd.find("img").attr("src", $thisProd.find("img").data("imgSrc"));
                    $thisProd.removeClass("visuallyHidden lazy-load")
                }
            }
        }
    };
    var clearCategoryFilterCookie = function() {
        $.removeCookie("preset_filters", {
            path: "/"
        })
    };
    var setCategoryEventListeners = function() {
        $("#remember-filters").click(function(e) {
            e.preventDefault();
            $("#remember-filters").toggleClass("selected");
            rememberFilters = $("#remember-filters").hasClass("selected");
            if (!rememberFilters) {
                $.removeCookie("remember_filters", {
                    path: "/"
                });
                clearCategoryFilterCookie();
                _gaq.push(["_trackEvent", "Deselect Remember Filters", "Click", "Deselect Remember Filters"])
            } else {
                $.cookie("remember_filters", "true", {
                    path: "/"
                });
                setFilterCookie();
                _gaq.push(["_trackEvent", "Select Remember Filters", "Click", "Select Remember Filters"])
            }
        });
        // $(".product").hover(function() {
        //     if (!$(this).hasClass("out-of-stock")) {
        //         $(this).find(".hover-details").removeClass("visuallyHidden");
        //         $(this).find("img").addClass("hoverDetailsOver")
        //     }
        // }, function() {
        //     if (!$(this).hasClass("out-of-stock")) {
        //         $(this).find(".hover-details").addClass("visuallyHidden");
        //         $(this).find("img").removeClass("hoverDetailsOver")
        //     }
        // });
        // $(".product-info-btn").click(function(e) {
        //     $(".product img").removeClass("hoverDetailsOver");
        //     $(".product .hover-details").addClass("visuallyHidden");
        //     $(this).parent().find(".hover-details").toggleClass("visuallyHidden");
        //     $(this).parent().find("img").toggleClass("hoverDetailsOver")
        // });
        $(".clear-filter").click(function(e) {
            clearAllFilters(e)
        });
        $("#pleaseRelease").remove()                                        
    };
    $(document).ready(function() {

    $(".category-product-items .out-of-stock").each(function() {
        $(".productSwatches", this).html("<p class='outOfStock'>OUT OF STOCK</p>")
    });


    $(".category-product-items .product").each(function() {
        $(this).attr('id', this.id.substring(0,5));
            });

        for (var i = 0; i < $(".category-product-items .product").length; i++) {
            var $thisCatProduct = $($(".category-product-items .product")[i]);
            //console.log("in 1")
            if ($thisCatProduct.hasClass("lazy-load")) {
                //console.log("in 2 " +  $($(".category-product-items .productImage img")[i]).data("imgSrc") )
                $thisCatProduct.find(".productImage img").attr("src", $($(".category-product-items .productImage img")[i]).data("imgSrc"));
                $thisCatProduct.removeClass("visuallyHidden lazy-load");
                if ($thisCatProduct.hasClass("out-of-stock") === false) {
                    $thisCatProduct.css("opacity", 1)
                }
            }
        }
        $(".filter-wrapper").addClass("grid-100 mobile-grid-100 tablet-grid-100 grid-parent");
        $(".desktop-filters-holder").append($(".filters"));
        $(".category-description").after($(".filter-wrapper"));
        $("#mainContent").prepend($("#breadcrumb"));
        $(".filter-options").after($(".filters-selected")).removeClass("grid-80 prefix-10 suffix-10 tablet-grid-90 tablet-prefix-5 tablet-suffix-5").addClass("grid-100 tablet-grid-100").css({
            width: "calc(100% + 20px)",
            marginLeft: "calc(-10px - 0px)"
        });
        $(".filters-selected").addClass("grid-100 tablet-grid-100").removeClass("grid-75 tablet-grid-50");
        $(".tablet-filters-holder").append($(".filters").clone(true));
        $(".filter-types").addClass("grid-100 tablet-grid-100").removeClass("grid-50 tablet-grid-50").find("a").text("Filter");
        $("#mainContent").on("click", ".filter-types a", function(e) {
            e.preventDefault();
            var $target = $(".filter-types a");
            var waitOnTopNav = 1;
            if ($(".category-nav .selected").length > 0) {
                mainModule.toggleMainNav($(".category-nav .selected"));
                waitOnTopNav = 450
            }
            if (!closeFilterOptions()) {
                $target.addClass("selected");
                $(".filter-options").css("height", "auto")
            }
        });
        $(".close-filter-options").click(function(e) {
            e.preventDefault();
            closeFilterOptions()
        });
        if (window.location.href.indexOf("ProductNoLongerExists") !== -1 && $(".product").length < 1 && $(".category-product-items").length < 1) {
            $("#ctl00_globalMainContent_categoryContainer").html(['<div class="page-404 grid-100 tablet-grid-100 mobile-grid-100 max-width-1100" style="margin: 150px auto 50px auto; letter-spacing: 1px">', "<h2>Oops!</h2>", "<p>", "We&#39;re very sorry, but that product is no longer available.", "</p>", "<p>", 'If you would like one of our customer service staff to help you, call us on +44 (0)333 400 5200, or <a style="font-weight: bold" href="/contact+us.htm">send us a message</a>.', "</p>", "<p>", 'Alternatively, visit our <a href="/">homepage</a> or shop the <a href="/women.htm" style="font-weight: bold">WOMEN</a>, <a href="/men.htm" style="font-weight: bold">MEN</a> and <a href="/houseandhome.htm" style="font-weight: bold">HOUSE&HOME</a> collections.', "</p>", "</div>"].join(""))
        }
        $("#breadcrumb, .filters, .category-product-items, .category-full-width-banner, .category-description").removeClass("grid-90 tablet-grid-90 suffix-5 prefix-5 tablet-suffix-5 tablet-prefix-5 grid-80 tablet-grid-80 tablet-prefix-10 tablet-suffix-10 prefix-10 suffix-10 mobile-grid-90 mobile-prefix-5").addClass("grid-100 tablet-grid-100 mobile-grid-100");
        $("div.results-info-wrapper").removeClass("grid-90 tablet-grid-90 mobile-grid-90 prefix-5 suffix-5 tablet-suffix-5 tablet-prefix-5").addClass("grid-100 tablet-grid-100 mobile-grid-100");
        if ($.cookie("remember_filters") === "true") {
            rememberFilters = true
        }
        if (typeof itemCodes == "undefined") {
            hideLegLengthFilter();
            defineHeightOfFilterDropDown();
            if ($(".category-product-items div").length > 0) {
                resetFilterObjectsArray();
                getCategoryStockInfo();
                addOutOfStockToBottom();
                addOutOfStockToLazyLoadList()
            }
        }
        $(".category-product-items .productImage a").click(function(e) {
            e.preventDefault();
            var productName = $(this).find("img").attr("alt");
            _gaq.push(["_trackEvent", "Category Product", "Click", productName]);
            if ($(this).parent().hasClass("out-of-stock")) {
                _gaq.push(["_trackEvent", "Category Product Out-of-Stock", "Click", productName])
            }
            window.location.href = $(this).attr("href")
        })
    });
    return moduleVar
}();