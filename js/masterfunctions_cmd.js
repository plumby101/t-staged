
(function(t, e) {
    function i(e, i) {
        var n, o, a, r = e.nodeName.toLowerCase();
        return "area" === r ? (n = e.parentNode, o = n.name, e.href && o && "map" === n.nodeName.toLowerCase() ? (a = t("img[usemap=#" + o + "]")[0], !!a && s(a)) : !1) : (/input|select|textarea|button|object/.test(r) ? !e.disabled : "a" === r ? e.href || i : i) && s(e)
    }

    function s(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
            return "hidden" === t.css(this, "visibility")
        }).length
    }
    var n = 0,
        o = /^ui-id-\d+$/;
    t.ui = t.ui || {}, t.extend(t.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), t.fn.extend({
        focus: function(e) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var e = this;
                    setTimeout(function() {
                        t(e).focus(), s && s.call(e)
                    }, i)
                }) : e.apply(this, arguments)
            }
        }(t.fn.focus),
        scrollParent: function() {
            var e;
            return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
        },
        zIndex: function(i) {
            if (i !== e) return this.css("zIndex", i);
            if (this.length)
                for (var s, n, o = t(this[0]); o.length && o[0] !== document;) {
                    if (s = o.css("position"), ("absolute" === s || "relative" === s || "fixed" === s) && (n = parseInt(o.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
                    o = o.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++n)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                o.test(this.id) && t(this).removeAttr("id")
            })
        }
    }), t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
            return function(i) {
                return !!t.data(i, e)
            }
        }) : function(e, i, s) {
            return !!t.data(e, s[3])
        },
        focusable: function(e) {
            return i(e, !isNaN(t.attr(e, "tabindex")))
        },
        tabbable: function(e) {
            var s = t.attr(e, "tabindex"),
                n = isNaN(s);
            return (n || s >= 0) && i(e, !n)
        }
    }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(i, s) {
        function n(e, i, s, n) {
            return t.each(o, function() {
                i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), n && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }), i
        }
        var o = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"],
            a = s.toLowerCase(),
            r = {
                innerWidth: t.fn.innerWidth,
                innerHeight: t.fn.innerHeight,
                outerWidth: t.fn.outerWidth,
                outerHeight: t.fn.outerHeight
            };
        t.fn["inner" + s] = function(i) {
            return i === e ? r["inner" + s].call(this) : this.each(function() {
                t(this).css(a, n(this, i) + "px")
            })
        }, t.fn["outer" + s] = function(e, i) {
            return "number" != typeof e ? r["outer" + s].call(this, e) : this.each(function() {
                t(this).css(a, n(this, e, !0, i) + "px")
            })
        }
    }), t.fn.addBack || (t.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
        return function(i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
        disableSelection: function() {
            return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
                t.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), t.extend(t.ui, {
        plugin: {
            add: function(e, i, s) {
                var n, o = t.ui[e].prototype;
                for (n in s) o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]])
            },
            call: function(t, e, i) {
                var s, n = t.plugins[e];
                if (n && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)
                    for (s = 0; n.length > s; s++) t.options[n[s][0]] && n[s][1].apply(t.element, i)
            }
        },
        hasScroll: function(e, i) {
            if ("hidden" === t(e).css("overflow")) return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop",
                n = !1;
            return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
        }
    })
})(jQuery),
function(t, e) {
    var i = 0,
        s = Array.prototype.slice,
        n = t.cleanData;
    t.cleanData = function(e) {
        for (var i, s = 0; null != (i = e[s]); s++) try {
            t(i).triggerHandler("remove")
        } catch (o) {}
        n(e)
    }, t.widget = function(i, s, n) {
        var o, a, r, h, l = {},
            c = i.split(".")[0];
        i = i.split(".")[1], o = c + "-" + i, n || (n = s, s = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) {
            return !!t.data(e, o)
        }, t[c] = t[c] || {}, a = t[c][i], r = t[c][i] = function(t, i) {
            return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new r(t, i)
        }, t.extend(r, a, {
            version: n.version,
            _proto: t.extend({}, n),
            _childConstructors: []
        }), h = new s, h.options = t.widget.extend({}, h.options), t.each(n, function(i, n) {
            return t.isFunction(n) ? (l[i] = function() {
                var t = function() {
                        return s.prototype[i].apply(this, arguments)
                    },
                    e = function(t) {
                        return s.prototype[i].apply(this, t)
                    };
                return function() {
                    var i, s = this._super,
                        o = this._superApply;
                    return this._super = t, this._superApply = e, i = n.apply(this, arguments), this._super = s, this._superApply = o, i
                }
            }(), e) : (l[i] = n, e)
        }), r.prototype = t.widget.extend(h, {
            widgetEventPrefix: a ? h.widgetEventPrefix : i
        }, l, {
            constructor: r,
            namespace: c,
            widgetName: i,
            widgetFullName: o
        }), a ? (t.each(a._childConstructors, function(e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, r, i._proto)
        }), delete a._childConstructors) : s._childConstructors.push(r), t.widget.bridge(i, r)
    }, t.widget.extend = function(i) {
        for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++)
            for (n in a[r]) o = a[r][n], a[r].hasOwnProperty(n) && o !== e && (i[n] = t.isPlainObject(o) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], o) : t.widget.extend({}, o) : o);
        return i
    }, t.widget.bridge = function(i, n) {
        var o = n.prototype.widgetFullName || i;
        t.fn[i] = function(a) {
            var r = "string" == typeof a,
                h = s.call(arguments, 1),
                l = this;
            return a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a, r ? this.each(function() {
                var s, n = t.data(this, o);
                return n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (s = n[a].apply(n, h), s !== n && s !== e ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : e) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + a + "'")
            }) : this.each(function() {
                var e = t.data(this, o);
                e ? e.option(a || {})._init() : t.data(this, o, new n(a, this))
            }), l
        }
    }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(e, s) {
            s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(t) {
                    t.target === s && this.destroy()
                }
            }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function() {
            return this.element
        },
        option: function(i, s) {
            var n, o, a, r = i;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (r = {}, n = i.split("."), i = n.shift(), n.length) {
                    for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; n.length - 1 > a; a++) o[n[a]] = o[n[a]] || {}, o = o[n[a]];
                    if (i = n.pop(), s === e) return o[i] === e ? null : o[i];
                    o[i] = s
                } else {
                    if (s === e) return this.options[i] === e ? null : this.options[i];
                    r[i] = s
                }
            return this._setOptions(r), this
        },
        _setOptions: function(t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, s, n) {
            var o, a = this;
            "boolean" != typeof i && (n = s, s = i, i = !1), n ? (s = o = t(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, o = this.widget()), t.each(n, function(n, r) {
                function h() {
                    return i || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? a[r] : r).apply(a, arguments) : e
                }
                "string" != typeof r && (h.guid = r.guid = r.guid || h.guid || t.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/),
                    c = l[1] + a.eventNamespace,
                    u = l[2];
                u ? o.delegate(u, c, h) : s.bind(c, h)
            })
        },
        _off: function(t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? s[t] : t).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function(e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function(e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                for (n in o) n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, i) {
        t.Widget.prototype["_" + e] = function(s, n, o) {
            "string" == typeof n && (n = {
                effect: n
            });
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = {
                duration: n
            }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
                t(this)[e](), o && o.call(s[0]), i()
            })
        }
    })
}(jQuery),
function(t) {
    var e = !1;
    t(document).mouseup(function() {
        e = !1
    }), t.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(i) {
            if (!e) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var s = this,
                    n = 1 === i.which,
                    o = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                return n && !o && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    s.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                    return s._mouseMove(t)
                }, this._mouseUpDelegate = function(t) {
                    return s._mouseUp(t)
                }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
            }
        },
        _mouseMove: function(e) {
            return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function(e) {
            return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}(jQuery),
function(t) {
    t.widget("ui.draggable", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function(e) {
            var i = this.options;
            return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(t(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(e) {
            var i = this.options;
            return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, this.offset.scroll = !1, t.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
        },
        _mouseDrag: function(e, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var s = this._uiHash();
                if (this._trigger("drag", e, s) === !1) return this._mouseUp({}), !1;
                this.position = s.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
        },
        _mouseStop: function(e) {
            var i = this,
                s = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                i._trigger("stop", e) !== !1 && i._clear()
            }) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1
        },
        _mouseUp: function(e) {
            return t("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(e) {
            return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _createHelper: function(e) {
            var i = this.options,
                s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.element.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, s, n = this.options;
            return n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === n.containment ? (this.containment = [0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : n.containment.constructor === Array ? (this.containment = n.containment, undefined) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), undefined) : (this.containment = null, undefined)
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var s = "absolute" === e ? 1 : -1,
                n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: n.scrollTop(),
                left: n.scrollLeft()
            }), {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s
            }
        },
        _generatePosition: function(e) {
            var i, s, n, o, a = this.options,
                r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                h = e.pageX,
                l = e.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: r.scrollTop(),
                left: r.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, h = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o)), {
                top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(e, i, s) {
            return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, s)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, i) {
            var s = t(this).data("ui-draggable"),
                n = s.options,
                o = t.extend({}, i, {
                    item: s.element
                });
            s.sortables = [], t(n.connectToSortable).each(function() {
                var i = t.data(this, "ui-sortable");
                i && !i.options.disabled && (s.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }), i.refreshPositions(), i._trigger("activate", e, o))
            })
        },
        stop: function(e, i) {
            var s = t(this).data("ui-draggable"),
                n = t.extend({}, i, {
                    item: s.element
                });
            t.each(s.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, n))
            })
        },
        drag: function(e, i) {
            var s = t(this).data("ui-draggable"),
                n = this;
            t.each(s.sortables, function() {
                var o = !1,
                    a = this;
                this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, t.each(s.sortables, function() {
                    return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this !== a && this.instance._intersectsWith(this.instance.containerCache) && t.contains(a.instance.element[0], this.instance.element[0]) && (o = !1), o
                })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return i.helper[0]
                }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", e), s.dropped = !1)
            })
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var e = t("body"),
                i = t(this).data("ui-draggable").options;
            e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor)
        },
        stop: function() {
            var e = t(this).data("ui-draggable").options;
            e._cursor && t("body").css("cursor", e._cursor)
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function(e, i) {
            var s = t(i.helper),
                n = t(this).data("ui-draggable").options;
            s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity)
        },
        stop: function(e, i) {
            var s = t(this).data("ui-draggable").options;
            s._opacity && t(i.helper).css("opacity", s._opacity)
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var e = t(this).data("ui-draggable");
            e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
        },
        drag: function(e) {
            var i = t(this).data("ui-draggable"),
                s = i.options,
                n = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? n = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (n = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? n = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (n = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed)))), n !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function() {
            var e = t(this).data("ui-draggable"),
                i = e.options;
            e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                var i = t(this),
                    s = i.offset();
                this !== e.element[0] && e.snapElements.push({
                    item: this,
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: s.top,
                    left: s.left
                })
            })
        },
        drag: function(e, i) {
            var s, n, o, a, r, h, l, c, u, d, p = t(this).data("ui-draggable"),
                f = p.options,
                g = f.snapTolerance,
                m = i.offset.left,
                v = m + p.helperProportions.width,
                _ = i.offset.top,
                b = _ + p.helperProportions.height;
            for (u = p.snapElements.length - 1; u >= 0; u--) r = p.snapElements[u].left, h = r + p.snapElements[u].width, l = p.snapElements[u].top, c = l + p.snapElements[u].height, r - g > v || m > h + g || l - g > b || _ > c + g || !t.contains(p.snapElements[u].item.ownerDocument, p.snapElements[u].item) ? (p.snapElements[u].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), {
                snapItem: p.snapElements[u].item
            })), p.snapElements[u].snapping = !1) : ("inner" !== f.snapMode && (s = g >= Math.abs(l - b), n = g >= Math.abs(c - _), o = g >= Math.abs(r - v), a = g >= Math.abs(h - m), s && (i.position.top = p._convertPositionTo("relative", {
                top: l - p.helperProportions.height,
                left: 0
            }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
                top: c,
                left: 0
            }).top - p.margins.top), o && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: r - p.helperProportions.width
            }).left - p.margins.left), a && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: h
            }).left - p.margins.left)), d = s || n || o || a, "outer" !== f.snapMode && (s = g >= Math.abs(l - _), n = g >= Math.abs(c - b), o = g >= Math.abs(r - m), a = g >= Math.abs(h - v), s && (i.position.top = p._convertPositionTo("relative", {
                top: l,
                left: 0
            }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {
                top: c - p.helperProportions.height,
                left: 0
            }).top - p.margins.top), o && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: r
            }).left - p.margins.left), a && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: h - p.helperProportions.width
            }).left - p.margins.left)), !p.snapElements[u].snapping && (s || n || o || a || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), {
                snapItem: p.snapElements[u].item
            })), p.snapElements[u].snapping = s || n || o || a || d)
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function() {
            var e, i = this.data("ui-draggable").options,
                s = t.makeArray(t(i.stack)).sort(function(e, i) {
                    return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                });
            s.length && (e = parseInt(t(s[0]).css("zIndex"), 10) || 0, t(s).each(function(i) {
                t(this).css("zIndex", e + i)
            }), this.css("zIndex", e + s.length))
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function(e, i) {
            var s = t(i.helper),
                n = t(this).data("ui-draggable").options;
            s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex)
        },
        stop: function(e, i) {
            var s = t(this).data("ui-draggable").options;
            s._zIndex && t(i.helper).css("zIndex", s._zIndex)
        }
    })
}(jQuery),
function(t) {
    function e(t, e, i) {
        return t > e && e + i > t
    }
    t.widget("ui.droppable", {
        version: "1.10.3",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var e = this.options,
                i = e.accept;
            this.isover = !1, this.isout = !0, this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || [], t.ui.ddmanager.droppables[e.scope].push(this), e.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; i.length > e; e++) i[e] === this && i.splice(e, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(e, i) {
            "accept" === e && (this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i)
            }), t.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
        },
        _out: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
        },
        _drop: function(e, i) {
            var s = i || t.ui.ddmanager.current,
                n = !1;
            return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var e = t.data(this, "ui-droppable");
                return e.options.greedy && !e.options.disabled && e.options.scope === s.options.scope && e.accept.call(e.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(e, {
                    offset: e.element.offset()
                }), e.options.tolerance) ? (n = !0, !1) : undefined
            }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        }
    }), t.ui.intersect = function(t, i, s) {
        if (!i.offset) return !1;
        var n, o, a = (t.positionAbs || t.position.absolute).left,
            r = a + t.helperProportions.width,
            h = (t.positionAbs || t.position.absolute).top,
            l = h + t.helperProportions.height,
            c = i.offset.left,
            u = c + i.proportions.width,
            d = i.offset.top,
            p = d + i.proportions.height;
        switch (s) {
            case "fit":
                return a >= c && u >= r && h >= d && p >= l;
            case "intersect":
                return a + t.helperProportions.width / 2 > c && u > r - t.helperProportions.width / 2 && h + t.helperProportions.height / 2 > d && p > l - t.helperProportions.height / 2;
            case "pointer":
                return n = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, o = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, e(o, d, i.proportions.height) && e(n, c, i.proportions.width);
            case "touch":
                return (h >= d && p >= h || l >= d && p >= l || d > h && l > p) && (a >= c && u >= a || r >= c && u >= r || c > a && r > u);
            default:
                return !1
        }
    }, t.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(e, i) {
            var s, n, o = t.ui.ddmanager.droppables[e.options.scope] || [],
                a = i ? i.type : null,
                r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t: for (s = 0; o.length > s; s++)
                if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
                    for (n = 0; r.length > n; n++)
                        if (r[n] === o[s].element[0]) {
                            o[s].proportions.height = 0;
                            continue t
                        }
                    o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions = {
                        width: o[s].element[0].offsetWidth,
                        height: o[s].element[0].offsetHeight
                    })
                }
        },
        drop: function(e, i) {
            var s = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), s
        },
        dragStart: function(e, i) {
            e.element.parentsUntil("body").bind("scroll.droppable", function() {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        },
        drag: function(e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var s, n, o, a = t.ui.intersect(e, this, this.options.tolerance),
                        r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
                    r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
                        return t.data(this, "ui-droppable").options.scope === n
                    }), o.length && (s = t.data(o[0], "ui-droppable"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
                }
            })
        },
        dragStop: function(e, i) {
            e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    }
}(jQuery),
function(t) {
    function e(t) {
        return parseInt(t, 10) || 0
    }

    function i(t) {
        return !isNaN(parseInt(t, 10))
    }
    t.widget("ui.resizable", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var e, i, s, n, o, a = this,
                r = this.options;
            if (this.element.addClass("ui-resizable"), t.extend(this, {
                    _aspectRatio: !!r.aspectRatio,
                    aspectRatio: r.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++) s = t.trim(e[i]), o = "ui-resizable-" + s, n = t("<div class='ui-resizable-handle " + o + "'></div>"), n.css({
                    zIndex: r.zIndex
                }), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
            this._renderAxis = function(e) {
                var i, s, n, o;
                e = e || this.element;
                for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), t(this.handles[i]).length
            }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = n && n[1] ? n[1] : "se")
            }), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
            }).mouseleave(function() {
                r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var e, i = function(e) {
                t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _mouseCapture: function(e) {
            var i, s, n = !1;
            for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
            return !this.options.disabled && n
        },
        _mouseStart: function(i) {
            var s, n, o, a = this.options,
                r = this.element.position(),
                h = this.element;
            return this.resizing = !0, /absolute/.test(h.css("position")) ? h.css({
                position: "absolute",
                top: h.css("top"),
                left: h.css("left")
            }) : h.is(".ui-draggable") && h.css({
                position: "absolute",
                top: r.top,
                left: r.left
            }), this._renderProxy(), s = e(this.helper.css("left")), n = e(this.helper.css("top")), a.containment && (s += t(a.containment).scrollLeft() || 0, n += t(a.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: s,
                top: n
            }, this.size = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            } : {
                width: h.width(),
                height: h.height()
            }, this.originalSize = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            } : {
                width: h.width(),
                height: h.height()
            }, this.originalPosition = {
                left: s,
                top: n
            }, this.sizeDiff = {
                width: h.outerWidth() - h.width(),
                height: h.outerHeight() - h.height()
            }, this.originalMousePosition = {
                left: i.pageX,
                top: i.pageY
            }, this.aspectRatio = "number" == typeof a.aspectRatio ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1, o = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === o ? this.axis + "-resize" : o), h.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
        },
        _mouseDrag: function(e) {
            var i, s = this.helper,
                n = {},
                o = this.originalMousePosition,
                a = this.axis,
                r = this.position.top,
                h = this.position.left,
                l = this.size.width,
                c = this.size.height,
                u = e.pageX - o.left || 0,
                d = e.pageY - o.top || 0,
                p = this._change[a];
            return p ? (i = p.apply(this, [e, u, d]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), this.position.top !== r && (n.top = this.position.top + "px"), this.position.left !== h && (n.left = this.position.left + "px"), this.size.width !== l && (n.width = this.size.width + "px"), this.size.height !== c && (n.height = this.size.height + "px"), s.css(n), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || this._trigger("resize", e, this.ui()), !1) : !1
        },
        _mouseStop: function(e) {
            this.resizing = !1;
            var i, s, n, o, a, r, h, l = this.options,
                c = this;
            return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && t.ui.hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = {
                width: c.helper.width() - o,
                height: c.helper.height() - n
            }, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, h = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(a, {
                top: h,
                left: r
            })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(t) {
            var e, s, n, o, a, r = this.options;
            a = {
                minWidth: i(r.minWidth) ? r.minWidth : 0,
                maxWidth: i(r.maxWidth) ? r.maxWidth : 1 / 0,
                minHeight: i(r.minHeight) ? r.minHeight : 0,
                maxHeight: i(r.maxHeight) ? r.maxHeight : 1 / 0
            }, (this._aspectRatio || t) && (e = a.minHeight * this.aspectRatio, n = a.minWidth / this.aspectRatio, s = a.maxHeight * this.aspectRatio, o = a.maxWidth / this.aspectRatio, e > a.minWidth && (a.minWidth = e), n > a.minHeight && (a.minHeight = n), a.maxWidth > s && (a.maxWidth = s), a.maxHeight > o && (a.maxHeight = o)), this._vBoundaries = a
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(), i(t.left) && (this.position.left = t.left), i(t.top) && (this.position.top = t.top), i(t.height) && (this.size.height = t.height), i(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t) {
            var e = this.position,
                s = this.size,
                n = this.axis;
            return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio), "sw" === n && (t.left = e.left + (s.width - t.width), t.top = null), "nw" === n && (t.top = e.top + (s.height - t.height), t.left = e.left + (s.width - t.width)), t
        },
        _respectSize: function(t) {
            var e = this._vBoundaries,
                s = this.axis,
                n = i(t.width) && e.maxWidth && e.maxWidth < t.width,
                o = i(t.height) && e.maxHeight && e.maxHeight < t.height,
                a = i(t.width) && e.minWidth && e.minWidth > t.width,
                r = i(t.height) && e.minHeight && e.minHeight > t.height,
                h = this.originalPosition.left + this.originalSize.width,
                l = this.position.top + this.size.height,
                c = /sw|nw|w/.test(s),
                u = /nw|ne|n/.test(s);
            return a && (t.width = e.minWidth), r && (t.height = e.minHeight), n && (t.width = e.maxWidth), o && (t.height = e.maxHeight), a && c && (t.left = h - e.minWidth), n && c && (t.left = h - e.maxWidth), r && u && (t.top = l - e.minHeight), o && u && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) {
                var t, e, i, s, n, o = this.helper || this.element;
                for (t = 0; this._proportionallyResizeElements.length > t; t++) {
                    if (n = this._proportionallyResizeElements[t], !this.borderDif)
                        for (this.borderDif = [], i = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], e = 0; i.length > e; e++) this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(s[e], 10) || 0);
                    n.css({
                        height: o.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: o.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function() {
            var e = this.element,
                i = this.options;
            this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(t, e) {
                return {
                    width: this.originalSize.width + e
                }
            },
            w: function(t, e) {
                var i = this.originalSize,
                    s = this.originalPosition;
                return {
                    left: s.left + e,
                    width: i.width - e
                }
            },
            n: function(t, e, i) {
                var s = this.originalSize,
                    n = this.originalPosition;
                return {
                    top: n.top + i,
                    height: s.height - i
                }
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            sw: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            },
            ne: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            nw: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }
        },
        _propagate: function(e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var i = t(this).data("ui-resizable"),
                s = i.options,
                n = i._proportionallyResizeElements,
                o = n.length && /textarea/i.test(n[0].nodeName),
                a = o && t.ui.hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
                r = o ? 0 : i.sizeDiff.width,
                h = {
                    width: i.size.width - r,
                    height: i.size.height - a
                },
                l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(h, c && l ? {
                top: c,
                left: l
            } : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function() {
                    var s = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    n && n.length && t(n[0]).css({
                        width: s.width,
                        height: s.height
                    }), i._updateCache(s), i._propagate("resize", e)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function() {
            var i, s, n, o, a, r, h, l = t(this).data("ui-resizable"),
                c = l.options,
                u = l.element,
                d = c.containment,
                p = d instanceof t ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
            p && (l.containerElement = t(p), /document/.test(d) || d === document ? (l.containerOffset = {
                left: 0,
                top: 0
            }, l.containerPosition = {
                left: 0,
                top: 0
            }, l.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (i = t(p), s = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
                s[t] = e(i.css("padding" + n))
            }), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = {
                height: i.innerHeight() - s[3],
                width: i.innerWidth() - s[1]
            }, n = l.containerOffset, o = l.containerSize.height, a = l.containerSize.width, r = t.ui.hasScroll(p, "left") ? p.scrollWidth : a, h = t.ui.hasScroll(p) ? p.scrollHeight : o, l.parentData = {
                element: p,
                left: n.left,
                top: n.top,
                width: r,
                height: h
            }))
        },
        resize: function(e) {
            var i, s, n, o, a = t(this).data("ui-resizable"),
                r = a.options,
                h = a.containerOffset,
                l = a.position,
                c = a._aspectRatio || e.shiftKey,
                u = {
                    top: 0,
                    left: 0
                },
                d = a.containerElement;
            d[0] !== document && /static/.test(d.css("position")) && (u = h), l.left < (a._helper ? h.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - h.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio), a.position.left = r.helper ? h.left : 0), l.top < (a._helper ? h.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - h.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio), a.position.top = a._helper ? h.top : 0), a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top, i = Math.abs((a._helper ? a.offset.left - u.left : a.offset.left - u.left) + a.sizeDiff.width), s = Math.abs((a._helper ? a.offset.top - u.top : a.offset.top - h.top) + a.sizeDiff.height), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o && (i -= a.parentData.left), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio))
        },
        stop: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                s = e.containerOffset,
                n = e.containerPosition,
                o = e.containerElement,
                a = t(e.helper),
                r = a.offset(),
                h = a.outerWidth() - e.sizeDiff.width,
                l = a.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: h,
                height: l
            }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: h,
                height: l
            })
        }
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                s = function(e) {
                    t(e).each(function() {
                        var e = t(this);
                        e.data("ui-resizable-alsoresize", {
                            width: parseInt(e.width(), 10),
                            height: parseInt(e.height(), 10),
                            left: parseInt(e.css("left"), 10),
                            top: parseInt(e.css("top"), 10)
                        })
                    })
                };
            "object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                s(t)
            })
        },
        resize: function(e, i) {
            var s = t(this).data("ui-resizable"),
                n = s.options,
                o = s.originalSize,
                a = s.originalPosition,
                r = {
                    height: s.size.height - o.height || 0,
                    width: s.size.width - o.width || 0,
                    top: s.position.top - a.top || 0,
                    left: s.position.left - a.left || 0
                },
                h = function(e, s) {
                    t(e).each(function() {
                        var e = t(this),
                            n = t(this).data("ui-resizable-alsoresize"),
                            o = {},
                            a = s && s.length ? s : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        t.each(a, function(t, e) {
                            var i = (n[e] || 0) + (r[e] || 0);
                            i && i >= 0 && (o[e] = i || null)
                        }), e.css(o)
                    })
                };
            "object" != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize) : t.each(n.alsoResize, function(t, e) {
                h(t, e)
            })
        },
        stop: function() {
            t(this).removeData("resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                s = e.size;
            e.ghost = e.originalElement.clone(), e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: s.height,
                width: s.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
        },
        resize: function() {
            var e = t(this).data("ui-resizable");
            e.ghost && e.ghost.css({
                position: "relative",
                height: e.size.height,
                width: e.size.width
            })
        },
        stop: function() {
            var e = t(this).data("ui-resizable");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                s = e.size,
                n = e.originalSize,
                o = e.originalPosition,
                a = e.axis,
                r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                h = r[0] || 1,
                l = r[1] || 1,
                c = Math.round((s.width - n.width) / h) * h,
                u = Math.round((s.height - n.height) / l) * l,
                d = n.width + c,
                p = n.height + u,
                f = i.maxWidth && d > i.maxWidth,
                g = i.maxHeight && p > i.maxHeight,
                m = i.minWidth && i.minWidth > d,
                v = i.minHeight && i.minHeight > p;
            i.grid = r, m && (d += h), v && (p += l), f && (d -= h), g && (p -= l), /^(se|s|e)$/.test(a) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(a) ? (e.size.width = d, e.size.height = p, e.position.top = o.top - u) : /^(sw)$/.test(a) ? (e.size.width = d, e.size.height = p, e.position.left = o.left - c) : (e.size.width = d, e.size.height = p, e.position.top = o.top - u, e.position.left = o.left - c)
        }
    })
}(jQuery),
function(t) {
    t.widget("ui.selectable", t.ui.mouse, {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var e, i = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
                    var e = t(this),
                        i = e.offset();
                    t.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: i.left,
                        top: i.top,
                        right: i.left + e.outerWidth(),
                        bottom: i.top + e.outerHeight(),
                        startselected: !1,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        },
        _mouseStart: function(e) {
            var i = this,
                s = this.options;
            this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var s = t.data(this, "selectable-item");
                s.startselected = !0, e.metaKey || e.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {
                    unselecting: s.element
                }))
            }), t(e.target).parents().addBack().each(function() {
                var s, n = t.data(this, "selectable-item");
                return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, {
                    selecting: n.element
                }) : i._trigger("unselecting", e, {
                    unselecting: n.element
                }), !1) : undefined
            }))
        },
        _mouseDrag: function(e) {
            if (this.dragged = !0, !this.options.disabled) {
                var i, s = this,
                    n = this.options,
                    o = this.opos[0],
                    a = this.opos[1],
                    r = e.pageX,
                    h = e.pageY;
                return o > r && (i = r, r = o, o = i), a > h && (i = h, h = a, a = i), this.helper.css({
                    left: o,
                    top: a,
                    width: r - o,
                    height: h - a
                }), this.selectees.each(function() {
                    var i = t.data(this, "selectable-item"),
                        l = !1;
                    i && i.element !== s.element[0] && ("touch" === n.tolerance ? l = !(i.left > r || o > i.right || i.top > h || a > i.bottom) : "fit" === n.tolerance && (l = i.left > o && r > i.right && i.top > a && h > i.bottom), l ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", e, {
                        selecting: i.element
                    }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, {
                        unselecting: i.element
                    }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, {
                        unselecting: i.element
                    })))))
                }), !1
            }
        },
        _mouseStop: function(e) {
            var i = this;
            return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                var s = t.data(this, "selectable-item");
                s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {
                    unselected: s.element
                })
            }), t(".ui-selecting", this.element[0]).each(function() {
                var s = t.data(this, "selectable-item");
                s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {
                    selected: s.element
                })
            }), this._trigger("stop", e), this.helper.remove(), !1
        }
    })
}(jQuery),
function(t) {
    function e(t, e, i) {
        return t > e && e + i > t
    }

    function i(t) {
        return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
    }
    t.widget("ui.sortable", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var t = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(e, i) {
            "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(e, i) {
            var s = null,
                n = !1,
                o = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
                return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : undefined
            }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function() {
                this === e.target && (n = !0)
            }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
        },
        _mouseStart: function(e, i, s) {
            var n, o, a = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, t.extend(this.offset, {
                    click: {
                        left: e.pageX - this.offset.left,
                        top: e.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
                for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
        },
        _mouseDrag: function(e) {
            var i, s, n, o, a = this.options,
                r = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - t(document).scrollTop() < a.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - a.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < a.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + a.scrollSpeed)), e.pageX - t(document).scrollLeft() < a.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - a.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < a.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
                    if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                    this._rearrange(e, s), this._trigger("change", e, this._uiHash());
                    break
                }
            return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var s = this,
                        n = this.placeholder.offset(),
                        o = this.options.axis,
                        a = {};
                    o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
                        s._clear(e)
                    })
                } else this._clear(e, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
                s = [];
            return e = e || {}, t(i).each(function() {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }), !s.length && e.key && s.push(e.key + "="), s.join("&")
        },
        toArray: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
                s = [];
            return e = e || {}, i.each(function() {
                s.push(t(e.item || this).attr(e.attribute || "id") || "")
            }), s
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left,
                i = e + this.helperProportions.width,
                s = this.positionAbs.top,
                n = s + this.helperProportions.height,
                o = t.left,
                a = o + t.width,
                r = t.top,
                h = r + t.height,
                l = this.offset.click.top,
                c = this.offset.click.left,
                u = "x" === this.options.axis || s + l > r && h > s + l,
                d = "y" === this.options.axis || e + c > o && a > e + c,
                p = u && d;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function(t) {
            var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                s = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                n = i && s,
                o = this._getDragVerticalDirection(),
                a = this._getDragHorizontalDirection();
            return n ? this.floating ? a && "right" === a || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1) : !1
        },
        _intersectsWithSides: function(t) {
            var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                s = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                n = this._getDragVerticalDirection(),
                o = this._getDragHorizontalDirection();
            return this.floating && o ? "right" === o && s || "left" === o && !s : n && ("down" === n && i || "up" === n && !i)
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function(t) {
            return this._refreshItems(t), this.refreshPositions(), this
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function(e) {
            var i, s, n, o, a = [],
                r = [],
                h = this._connectWith();
            if (h && e)
                for (i = h.length - 1; i >= 0; i--)
                    for (n = t(h[i]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && r.push([t.isFunction(o.options.items) ? o.options.items.call(o.element) : t(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o]);
            for (r.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = r.length - 1; i >= 0; i--) r[i][0].each(function() {
                a.push(this)
            });
            return t(a)
        },
        _removeCurrentsFromItems: function() {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function(t) {
                for (var i = 0; e.length > i; i++)
                    if (e[i] === t.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(e) {
            this.items = [], this.containers = [this];
            var i, s, n, o, a, r, h, l, c = this.items,
                u = [
                    [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                        item: this.currentItem
                    }) : t(this.options.items, this.element), this]
                ],
                d = this._connectWith();
            if (d && this.ready)
                for (i = d.length - 1; i >= 0; i--)
                    for (n = t(d[i]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                        item: this.currentItem
                    }) : t(o.options.items, o.element), o]), this.containers.push(o));
            for (i = u.length - 1; i >= 0; i--)
                for (a = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) h = t(r[s]), h.data(this.widgetName + "-item", a), c.push({
                    item: h,
                    instance: a,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
        },
        refreshPositions: function(e) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, s, n, o;
            for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(e) {
            e = e || this;
            var i, s = e.options;
            s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
                element: function() {
                    var s = e.currentItem[0].nodeName.toLowerCase(),
                        n = t("<" + s + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === s ? e.currentItem.children().each(function() {
                        t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(n)
                    }) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
                },
                update: function(t, n) {
                    (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
        },
        _contactContainers: function(s) {
            var n, o, a, r, h, l, c, u, d, p, f = null,
                g = null;
            for (n = this.containers.length - 1; n >= 0; n--)
                if (!t.contains(this.currentItem[0], this.containers[n].element[0]))
                    if (this._intersectsWith(this.containers[n].containerCache)) {
                        if (f && t.contains(this.containers[n].element[0], f.element[0])) continue;
                        f = this.containers[n], g = n
                    } else this.containers[n].containerCache.over && (this.containers[n]._trigger("out", s, this._uiHash(this)), this.containers[n].containerCache.over = 0);
            if (f)
                if (1 === this.containers.length) this.containers[g].containerCache.over || (this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1);
                else {
                    for (a = 1e4, r = null, p = f.floating || i(this.currentItem), h = p ? "left" : "top", l = p ? "width" : "height", c = this.positionAbs[h] + this.offset.click[h], o = this.items.length - 1; o >= 0; o--) t.contains(this.containers[g].element[0], this.items[o].item[0]) && this.items[o].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[o].top, this.items[o].height)) && (u = this.items[o].item.offset()[h], d = !1, Math.abs(u - c) > Math.abs(u + this.items[o][l] - c) && (d = !0, u += this.items[o][l]), a > Math.abs(u - c) && (a = Math.abs(u - c), r = this.items[o], this.direction = d ? "up" : "down"));
                    if (!r && !this.options.dropOnEmpty) return;
                    if (this.currentContainer === this.containers[g]) return;
                    r ? this._rearrange(s, r, null, !0) : this._rearrange(s, null, this.containers[g].element, !0), this._trigger("change", s, this._uiHash()), this.containers[g]._trigger("change", s, this._uiHash(this)), this.currentContainer = this.containers[g], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[g]._trigger("over", s, this._uiHash(this)), this.containers[g].containerCache.over = 1
                }
        },
        _createHelper: function(e) {
            var i = this.options,
                s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, s, n = this.options;
            "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var s = "absolute" === e ? 1 : -1,
                n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                o = /(html|body)/i.test(n[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
            }
        },
        _generatePosition: function(e) {
            var i, s, n = this.options,
                o = e.pageX,
                a = e.pageY,
                r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                h = /(html|body)/i.test(r[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
                top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
            }
        },
        _rearrange: function(t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var n = this.counter;
            this._delay(function() {
                n === this.counter && this.refreshPositions(!s)
            })
        },
        _clear: function(t, e) {
            this.reverting = !1;
            var i, s = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !e && s.push(function(t) {
                    this._trigger("receive", t, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                    this._trigger("update", t, this._uiHash())
                }), this !== this.currentContainer && (e || (s.push(function(t) {
                    this._trigger("remove", t, this._uiHash())
                }), s.push(function(t) {
                    return function(e) {
                        t._trigger("receive", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), s.push(function(t) {
                    return function(e) {
                        t._trigger("update", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) e || s.push(function(t) {
                return function(e) {
                    t._trigger("deactivate", e, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over && (s.push(function(t) {
                return function(e) {
                    t._trigger("out", e, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!e) {
                    for (this._trigger("beforeStop", t, this._uiHash()), i = 0; s.length > i; i++) s[i].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
                for (i = 0; s.length > i; i++) s[i].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function() {
            t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    })
}(jQuery),
function(t, e) {
    var i = "ui-effects-";
    t.effects = {
            effect: {}
        },
        function(t, e) {
            function i(t, e, i) {
                var s = u[e.type] || {};
                return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t)
            }

            function s(i) {
                var s = l(),
                    n = s._rgba = [];
                return i = i.toLowerCase(), f(h, function(t, o) {
                    var a, r = o.re.exec(i),
                        h = r && o.parse(r),
                        l = o.space || "rgba";
                    return h ? (a = s[l](h), s[c[l].cache] = a[c[l].cache], n = s._rgba = a._rgba, !1) : e
                }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s) : o[i]
            }

            function n(t, e, i) {
                return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
            }
            var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                r = /^([\-+])=\s*(\d+\.?\d*)/,
                h = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(t) {
                        return [t[1], t[2], t[3], t[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(t) {
                        return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function(t) {
                        return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function(t) {
                        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function(t) {
                        return [t[1], t[2] / 100, t[3] / 100, t[4]]
                    }
                }],
                l = t.Color = function(e, i, s, n) {
                    return new t.Color.fn.parse(e, i, s, n)
                },
                c = {
                    rgba: {
                        props: {
                            red: {
                                idx: 0,
                                type: "byte"
                            },
                            green: {
                                idx: 1,
                                type: "byte"
                            },
                            blue: {
                                idx: 2,
                                type: "byte"
                            }
                        }
                    },
                    hsla: {
                        props: {
                            hue: {
                                idx: 0,
                                type: "degrees"
                            },
                            saturation: {
                                idx: 1,
                                type: "percent"
                            },
                            lightness: {
                                idx: 2,
                                type: "percent"
                            }
                        }
                    }
                },
                u = {
                    "byte": {
                        floor: !0,
                        max: 255
                    },
                    percent: {
                        max: 1
                    },
                    degrees: {
                        mod: 360,
                        floor: !0
                    }
                },
                d = l.support = {},
                p = t("<p>")[0],
                f = t.each;
            p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t, e) {
                e.cache = "_" + t, e.props.alpha = {
                    idx: 3,
                    type: "percent",
                    def: 1
                }
            }), l.fn = t.extend(l.prototype, {
                parse: function(n, a, r, h) {
                    if (n === e) return this._rgba = [null, null, null, null], this;
                    (n.jquery || n.nodeType) && (n = t(n).css(a), a = e);
                    var u = this,
                        d = t.type(n),
                        p = this._rgba = [];
                    return a !== e && (n = [n, a, r, h], d = "array"), "string" === d ? this.parse(s(n) || o._default) : "array" === d ? (f(c.rgba.props, function(t, e) {
                        p[e.idx] = i(n[e.idx], e)
                    }), this) : "object" === d ? (n instanceof l ? f(c, function(t, e) {
                        n[e.cache] && (u[e.cache] = n[e.cache].slice())
                    }) : f(c, function(e, s) {
                        var o = s.cache;
                        f(s.props, function(t, e) {
                            if (!u[o] && s.to) {
                                if ("alpha" === t || null == n[t]) return;
                                u[o] = s.to(u._rgba)
                            }
                            u[o][e.idx] = i(n[t], e, !0)
                        }), u[o] && 0 > t.inArray(null, u[o].slice(0, 3)) && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])))
                    }), this) : e
                },
                is: function(t) {
                    var i = l(t),
                        s = !0,
                        n = this;
                    return f(c, function(t, o) {
                        var a, r = i[o.cache];
                        return r && (a = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function(t, i) {
                            return null != r[i.idx] ? s = r[i.idx] === a[i.idx] : e
                        })), s
                    }), s
                },
                _space: function() {
                    var t = [],
                        e = this;
                    return f(c, function(i, s) {
                        e[s.cache] && t.push(i)
                    }), t.pop()
                },
                transition: function(t, e) {
                    var s = l(t),
                        n = s._space(),
                        o = c[n],
                        a = 0 === this.alpha() ? l("transparent") : this,
                        r = a[o.cache] || o.to(a._rgba),
                        h = r.slice();
                    return s = s[o.cache], f(o.props, function(t, n) {
                        var o = n.idx,
                            a = r[o],
                            l = s[o],
                            c = u[n.type] || {};
                        null !== l && (null === a ? h[o] = l : (c.mod && (l - a > c.mod / 2 ? a += c.mod : a - l > c.mod / 2 && (a -= c.mod)), h[o] = i((l - a) * e + a, n)))
                    }), this[n](h)
                },
                blend: function(e) {
                    if (1 === this._rgba[3]) return this;
                    var i = this._rgba.slice(),
                        s = i.pop(),
                        n = l(e)._rgba;
                    return l(t.map(i, function(t, e) {
                        return (1 - s) * n[e] + s * t
                    }))
                },
                toRgbaString: function() {
                    var e = "rgba(",
                        i = t.map(this._rgba, function(t, e) {
                            return null == t ? e > 2 ? 1 : 0 : t
                        });
                    return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                },
                toHslaString: function() {
                    var e = "hsla(",
                        i = t.map(this.hsla(), function(t, e) {
                            return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                        });
                    return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                },
                toHexString: function(e) {
                    var i = this._rgba.slice(),
                        s = i.pop();
                    return e && i.push(~~(255 * s)), "#" + t.map(i, function(t) {
                        return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                    }).join("")
                },
                toString: function() {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                }
            }), l.fn.parse.prototype = l.fn, c.hsla.to = function(t) {
                if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                var e, i, s = t[0] / 255,
                    n = t[1] / 255,
                    o = t[2] / 255,
                    a = t[3],
                    r = Math.max(s, n, o),
                    h = Math.min(s, n, o),
                    l = r - h,
                    c = r + h,
                    u = .5 * c;
                return e = h === r ? 0 : s === r ? 60 * (n - o) / l + 360 : n === r ? 60 * (o - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a]
            }, c.hsla.from = function(t) {
                if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                var e = t[0] / 360,
                    i = t[1],
                    s = t[2],
                    o = t[3],
                    a = .5 >= s ? s * (1 + i) : s + i - s * i,
                    r = 2 * s - a;
                return [Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o]
            }, f(c, function(s, n) {
                var o = n.props,
                    a = n.cache,
                    h = n.to,
                    c = n.from;
                l.fn[s] = function(s) {
                    if (h && !this[a] && (this[a] = h(this._rgba)), s === e) return this[a].slice();
                    var n, r = t.type(s),
                        u = "array" === r || "object" === r ? s : arguments,
                        d = this[a].slice();
                    return f(o, function(t, e) {
                        var s = u["object" === r ? t : e.idx];
                        null == s && (s = d[e.idx]), d[e.idx] = i(s, e)
                    }), c ? (n = l(c(d)), n[a] = d, n) : l(d)
                }, f(o, function(e, i) {
                    l.fn[e] || (l.fn[e] = function(n) {
                        var o, a = t.type(n),
                            h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s,
                            l = this[h](),
                            c = l[i.idx];
                        return "undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
                    })
                })
            }), l.hook = function(e) {
                var i = e.split(" ");
                f(i, function(e, i) {
                    t.cssHooks[i] = {
                        set: function(e, n) {
                            var o, a, r = "";
                            if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
                                if (n = l(o || n), !d.rgba && 1 !== n._rgba[3]) {
                                    for (a = "backgroundColor" === i ? e.parentNode : e;
                                        ("" === r || "transparent" === r) && a && a.style;) try {
                                        r = t.css(a, "backgroundColor"), a = a.parentNode
                                    } catch (h) {}
                                    n = n.blend(r && "transparent" !== r ? r : "_default")
                                }
                                n = n.toRgbaString()
                            }
                            try {
                                e.style[i] = n
                            } catch (h) {}
                        }
                    }, t.fx.step[i] = function(e) {
                        e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                    }
                })
            }, l.hook(a), t.cssHooks.borderColor = {
                expand: function(t) {
                    var e = {};
                    return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
                        e["border" + s + "Color"] = t
                    }), e
                }
            }, o = t.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(jQuery),
        function() {
            function i(e) {
                var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                    o = {};
                if (n && n.length && n[0] && n[n[0]])
                    for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]);
                else
                    for (i in n) "string" == typeof n[i] && (o[i] = n[i]);
                return o
            }

            function s(e, i) {
                var s, n, a = {};
                for (s in i) n = i[s], e[s] !== n && (o[s] || (t.fx.step[s] || !isNaN(parseFloat(n))) && (a[s] = n));
                return a
            }
            var n = ["add", "remove", "toggle"],
                o = {
                    border: 1,
                    borderBottom: 1,
                    borderColor: 1,
                    borderLeft: 1,
                    borderRight: 1,
                    borderTop: 1,
                    borderWidth: 1,
                    margin: 1,
                    padding: 1
                };
            t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
                t.fx.step[i] = function(t) {
                    ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
                }
            }), t.fn.addBack || (t.fn.addBack = function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }), t.effects.animateClass = function(e, o, a, r) {
                var h = t.speed(o, a, r);
                return this.queue(function() {
                    var o, a = t(this),
                        r = a.attr("class") || "",
                        l = h.children ? a.find("*").addBack() : a;
                    l = l.map(function() {
                        var e = t(this);
                        return {
                            el: e,
                            start: i(this)
                        }
                    }), o = function() {
                        t.each(n, function(t, i) {
                            e[i] && a[i + "Class"](e[i])
                        })
                    }, o(), l = l.map(function() {
                        return this.end = i(this.el[0]), this.diff = s(this.start, this.end), this
                    }), a.attr("class", r), l = l.map(function() {
                        var e = this,
                            i = t.Deferred(),
                            s = t.extend({}, h, {
                                queue: !1,
                                complete: function() {
                                    i.resolve(e)
                                }
                            });
                        return this.el.animate(this.diff, s), i.promise()
                    }), t.when.apply(t, l.get()).done(function() {
                        o(), t.each(arguments, function() {
                            var e = this.el;
                            t.each(this.diff, function(t) {
                                e.css(t, "")
                            })
                        }), h.complete.call(a[0])
                    })
                })
            }, t.fn.extend({
                addClass: function(e) {
                    return function(i, s, n, o) {
                        return s ? t.effects.animateClass.call(this, {
                            add: i
                        }, s, n, o) : e.apply(this, arguments)
                    }
                }(t.fn.addClass),
                removeClass: function(e) {
                    return function(i, s, n, o) {
                        return arguments.length > 1 ? t.effects.animateClass.call(this, {
                            remove: i
                        }, s, n, o) : e.apply(this, arguments)
                    }
                }(t.fn.removeClass),
                toggleClass: function(i) {
                    return function(s, n, o, a, r) {
                        return "boolean" == typeof n || n === e ? o ? t.effects.animateClass.call(this, n ? {
                            add: s
                        } : {
                            remove: s
                        }, o, a, r) : i.apply(this, arguments) : t.effects.animateClass.call(this, {
                            toggle: s
                        }, n, o, a)
                    }
                }(t.fn.toggleClass),
                switchClass: function(e, i, s, n, o) {
                    return t.effects.animateClass.call(this, {
                        add: i,
                        remove: e
                    }, s, n, o)
                }
            })
        }(),
        function() {
            function s(e, i, s, n) {
                return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                    effect: e
                }, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
            }

            function n(e) {
                return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
            }
            t.extend(t.effects, {
                version: "1.10.3",
                save: function(t, e) {
                    for (var s = 0; e.length > s; s++) null !== e[s] && t.data(i + e[s], t[0].style[e[s]])
                },
                restore: function(t, s) {
                    var n, o;
                    for (o = 0; s.length > o; o++) null !== s[o] && (n = t.data(i + s[o]), n === e && (n = ""), t.css(s[o], n))
                },
                setMode: function(t, e) {
                    return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                },
                getBaseline: function(t, e) {
                    var i, s;
                    switch (t[0]) {
                        case "top":
                            i = 0;
                            break;
                        case "middle":
                            i = .5;
                            break;
                        case "bottom":
                            i = 1;
                            break;
                        default:
                            i = t[0] / e.height
                    }
                    switch (t[1]) {
                        case "left":
                            s = 0;
                            break;
                        case "center":
                            s = .5;
                            break;
                        case "right":
                            s = 1;
                            break;
                        default:
                            s = t[1] / e.width
                    }
                    return {
                        x: s,
                        y: i
                    }
                },
                createWrapper: function(e) {
                    if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                    var i = {
                            width: e.outerWidth(!0),
                            height: e.outerHeight(!0),
                            "float": e.css("float")
                        },
                        s = t("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        n = {
                            width: e.width(),
                            height: e.height()
                        },
                        o = document.activeElement;
                    try {
                        o.id
                    } catch (a) {
                        o = document.body
                    }
                    return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).focus(), s = e.parent(), "static" === e.css("position") ? (s.css({
                        position: "relative"
                    }), e.css({
                        position: "relative"
                    })) : (t.extend(i, {
                        position: e.css("position"),
                        zIndex: e.css("z-index")
                    }), t.each(["top", "left", "bottom", "right"], function(t, s) {
                        i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                    }), e.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), e.css(n), s.css(i).show()
                },
                removeWrapper: function(e) {
                    var i = document.activeElement;
                    return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
                },
                setTransition: function(e, i, s, n) {
                    return n = n || {}, t.each(i, function(t, i) {
                        var o = e.cssUnit(i);
                        o[0] > 0 && (n[i] = o[0] * s + o[1])
                    }), n
                }
            }), t.fn.extend({
                effect: function() {
                    function e(e) {
                        function s() {
                            t.isFunction(o) && o.call(n[0]), t.isFunction(e) && e()
                        }
                        var n = t(this),
                            o = i.complete,
                            r = i.mode;
                        (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), s()) : a.call(n[0], i, s)
                    }
                    var i = s.apply(this, arguments),
                        n = i.mode,
                        o = i.queue,
                        a = t.effects.effect[i.effect];
                    return t.fx.off || !a ? n ? this[n](i.duration, i.complete) : this.each(function() {
                        i.complete && i.complete.call(this)
                    }) : o === !1 ? this.each(e) : this.queue(o || "fx", e)
                },
                show: function(t) {
                    return function(e) {
                        if (n(e)) return t.apply(this, arguments);
                        var i = s.apply(this, arguments);
                        return i.mode = "show", this.effect.call(this, i)
                    }
                }(t.fn.show),
                hide: function(t) {
                    return function(e) {
                        if (n(e)) return t.apply(this, arguments);
                        var i = s.apply(this, arguments);
                        return i.mode = "hide", this.effect.call(this, i)
                    }
                }(t.fn.hide),
                toggle: function(t) {
                    return function(e) {
                        if (n(e) || "boolean" == typeof e) return t.apply(this, arguments);
                        var i = s.apply(this, arguments);
                        return i.mode = "toggle", this.effect.call(this, i)
                    }
                }(t.fn.toggle),
                cssUnit: function(e) {
                    var i = this.css(e),
                        s = [];
                    return t.each(["em", "px", "%", "pt"], function(t, e) {
                        i.indexOf(e) > 0 && (s = [parseFloat(i), e])
                    }), s
                }
            })
        }(),
        function() {
            var e = {};
            t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                e[i] = function(e) {
                    return Math.pow(e, t + 2)
                }
            }), t.extend(e, {
                Sine: function(t) {
                    return 1 - Math.cos(t * Math.PI / 2)
                },
                Circ: function(t) {
                    return 1 - Math.sqrt(1 - t * t)
                },
                Elastic: function(t) {
                    return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
                },
                Back: function(t) {
                    return t * t * (3 * t - 2)
                },
                Bounce: function(t) {
                    for (var e, i = 4;
                        ((e = Math.pow(2, --i)) - 1) / 11 > t;);
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                }
            }), t.each(e, function(e, i) {
                t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                    return 1 - i(1 - t)
                }, t.easing["easeInOut" + e] = function(t) {
                    return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
                }
            })
        }()
}(jQuery),
function(t) {
    var e = 0,
        i = {},
        s = {};
    i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide", s.height = s.paddingTop = s.paddingBottom = s.borderTopWidth = s.borderBottomWidth = "show", t.widget("ui.accordion", {
        version: "1.10.3",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function() {
            var e = this.options;
            this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), 0 > e.active && (e.active += this.headers.length), this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : t(),
                content: this.active.length ? this.active.next() : t()
            }
        },
        _createIcons: function() {
            var e = this.options.icons;
            e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var t;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }), "content" !== this.options.heightStyle && t.css("height", "")
        },
        _setOption: function(t, e) {
            return "active" === t ? (this._activate(e), undefined) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), "disabled" === t && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e), undefined)
        },
        _keydown: function(e) {
            if (!e.altKey && !e.ctrlKey) {
                var i = t.ui.keyCode,
                    s = this.headers.length,
                    n = this.headers.index(e.target),
                    o = !1;
                switch (e.keyCode) {
                    case i.RIGHT:
                    case i.DOWN:
                        o = this.headers[(n + 1) % s];
                        break;
                    case i.LEFT:
                    case i.UP:
                        o = this.headers[(n - 1 + s) % s];
                        break;
                    case i.SPACE:
                    case i.ENTER:
                        this._eventHandler(e);
                        break;
                    case i.HOME:
                        o = this.headers[0];
                        break;
                    case i.END:
                        o = this.headers[s - 1]
                }
                o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), e.preventDefault())
            }
        },
        _panelKeyDown: function(e) {
            e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
        },
        refresh: function() {
            var e = this.options;
            this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
        },
        _processPanels: function() {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
        },
        _refresh: function() {
            var i, s = this.options,
                n = s.heightStyle,
                o = this.element.parent(),
                a = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e);
            this.active = this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(e) {
                var i = t(this),
                    s = i.attr("id"),
                    n = i.next(),
                    o = n.attr("id");
                s || (s = a + "-header-" + e, i.attr("id", s)), o || (o = a + "-panel-" + e, n.attr("id", o)), i.attr("aria-controls", o), n.attr("aria-labelledby", s)
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }).next().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                tabIndex: 0
            }).next().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(s.event), "fill" === n ? (i = o.height(), this.element.siblings(":visible").each(function() {
                var e = t(this),
                    s = e.css("position");
                "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
            }), this.headers.each(function() {
                i -= t(this).outerHeight(!0)
            }), this.headers.next().each(function() {
                t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === n && (i = 0, this.headers.next().each(function() {
                i = Math.max(i, t(this).css("height", "").height())
            }).height(i))
        },
        _activate: function(e) {
            var i = this._findActive(e)[0];
            i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return "number" == typeof e ? this.headers.eq(e) : t()
        },
        _setupEvents: function(e) {
            var i = {
                keydown: "_keydown"
            };
            e && t.each(e.split(" "), function(t, e) {
                i[e] = "_eventHandler"
            }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }), this._hoverable(this.headers), this._focusable(this.headers)
        },
        _eventHandler: function(e) {
            var i = this.options,
                s = this.active,
                n = t(e.currentTarget),
                o = n[0] === s[0],
                a = o && i.collapsible,
                r = a ? t() : n.next(),
                h = s.next(),
                l = {
                    oldHeader: s,
                    oldPanel: h,
                    newHeader: a ? t() : n,
                    newPanel: r
                };
            e.preventDefault(), o && !i.collapsible || this._trigger("beforeActivate", e, l) === !1 || (i.active = a ? !1 : this.headers.index(n), this.active = o ? t() : n, this._toggle(l), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), o || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function(e) {
            var i = e.newPanel,
                s = this.prevShow.length ? this.prevShow : e.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), s.prev().attr("aria-selected", "false"), i.length && s.length ? s.prev().attr("tabIndex", -1) : i.length && this.headers.filter(function() {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1), i.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }).prev().attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _animate: function(t, e, n) {
            var o, a, r, h = this,
                l = 0,
                c = t.length && (!e.length || t.index() < e.index()),
                u = this.options.animate || {},
                d = c && u.down || u,
                p = function() {
                    h._toggleComplete(n)
                };
            return "number" == typeof d && (r = d), "string" == typeof d && (a = d), a = a || d.easing || u.easing, r = r || d.duration || u.duration, e.length ? t.length ? (o = t.show().outerHeight(), e.animate(i, {
                duration: r,
                easing: a,
                step: function(t, e) {
                    e.now = Math.round(t)
                }
            }), t.hide().animate(s, {
                duration: r,
                easing: a,
                complete: p,
                step: function(t, i) {
                    i.now = Math.round(t), "height" !== i.prop ? l += i.now : "content" !== h.options.heightStyle && (i.now = Math.round(o - e.outerHeight() - l), l = 0)
                }
            }), undefined) : e.animate(i, r, a, p) : t.animate(s, r, a, p)
        },
        _toggleComplete: function(t) {
            var e = t.oldPanel;
            e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
        }
    })
}(jQuery),
function(t) {
    var e = 0;
    t.widget("ui.autocomplete", {
        version: "1.10.3",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function() {
            var e, i, s, n = this.element[0].nodeName.toLowerCase(),
                o = "textarea" === n,
                a = "input" === n;
            this.isMultiLine = o ? !0 : a ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function(n) {
                    if (this.element.prop("readOnly")) return e = !0, s = !0, i = !0, undefined;
                    e = !1, s = !1, i = !1;
                    var o = t.ui.keyCode;
                    switch (n.keyCode) {
                        case o.PAGE_UP:
                            e = !0, this._move("previousPage", n);
                            break;
                        case o.PAGE_DOWN:
                            e = !0, this._move("nextPage", n);
                            break;
                        case o.UP:
                            e = !0, this._keyEvent("previous", n);
                            break;
                        case o.DOWN:
                            e = !0, this._keyEvent("next", n);
                            break;
                        case o.ENTER:
                        case o.NUMPAD_ENTER:
                            this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
                            break;
                        case o.TAB:
                            this.menu.active && this.menu.select(n);
                            break;
                        case o.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(n), n.preventDefault());
                            break;
                        default:
                            i = !0, this._searchTimeout(n)
                    }
                },
                keypress: function(s) {
                    if (e) return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), undefined;
                    if (!i) {
                        var n = t.ui.keyCode;
                        switch (s.keyCode) {
                            case n.PAGE_UP:
                                this._move("previousPage", s);
                                break;
                            case n.PAGE_DOWN:
                                this._move("nextPage", s);
                                break;
                            case n.UP:
                                this._keyEvent("previous", s);
                                break;
                            case n.DOWN:
                                this._keyEvent("next", s)
                        }
                    }
                },
                input: function(t) {
                    return s ? (s = !1, t.preventDefault(), undefined) : (this._searchTimeout(t), undefined)
                },
                focus: function() {
                    this.selectedItem = null, this.previous = this._value()
                },
                blur: function(t) {
                    return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(t), this._change(t), undefined)
                }
            }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu"), this._on(this.menu.element, {
                mousedown: function(e) {
                    e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    t(e.target).closest(".ui-menu-item").length || this._delay(function() {
                        var e = this;
                        this.document.one("mousedown", function(s) {
                            s.target === e.element[0] || s.target === i || t.contains(i, s.target) || e.close()
                        })
                    })
                },
                menufocus: function(e, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
                        t(e.target).trigger(e.originalEvent)
                    }), undefined;
                    var s = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", e, {
                        item: s
                    }) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value) : this.liveRegion.text(s.value)
                },
                menuselect: function(t, e) {
                    var i = e.item.data("ui-autocomplete-item"),
                        s = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function() {
                        this.previous = s, this.selectedItem = i
                    })), !1 !== this._trigger("select", t, {
                        item: i
                    }) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
                }
            }), this.liveRegion = t("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function(t, e) {
            this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
        },
        _initSource: function() {
            var e, i, s = this;
            t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, s) {
                s(t.ui.autocomplete.filter(e, i.term))
            }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, n) {
                s.xhr && s.xhr.abort(), s.xhr = t.ajax({
                    url: i,
                    data: e,
                    dataType: "json",
                    success: function(t) {
                        n(t)
                    },
                    error: function() {
                        n([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(t) {
            clearTimeout(this.searching), this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, t))
            }, this.options.delay)
        },
        search: function(t, e) {
            return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : undefined
        },
        _search: function(t) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: t
            }, this._response())
        },
        _response: function() {
            var t = this,
                i = ++e;
            return function(s) {
                i === e && t.__response(s), t.pending--, t.pending || t.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function(t) {
            t && (t = this._normalize(t)), this._trigger("response", null, {
                content: t
            }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
        },
        close: function(t) {
            this.cancelSearch = !0, this._close(t)
        },
        _close: function(t) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
        },
        _change: function(t) {
            this.previous !== this._value() && this._trigger("change", t, {
                item: this.selectedItem
            })
        },
        _normalize: function(e) {
            return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                return "string" == typeof e ? {
                    label: e,
                    value: e
                } : t.extend({
                    label: e.label || e.value,
                    value: e.value || e.label
                }, e)
            })
        },
        _suggest: function(e) {
            var i = this.menu.element.empty();
            this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var t = this.menu.element;
            t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(e, i) {
            var s = this;
            t.each(i, function(t, i) {
                s._renderItemData(e, i)
            })
        },
        _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-autocomplete-item", e)
        },
        _renderItem: function(e, i) {
            return t("<li>").append(t("<a>").text(i.label)).appendTo(e)
        },
        _move: function(t, e) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[t](e), undefined) : (this.search(null, e), undefined)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(t, e) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
        }
    }), t.extend(t.ui.autocomplete, {
        escapeRegex: function(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(e, i) {
            var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
            return t.grep(e, function(t) {
                return s.test(t.label || t.value || t)
            })
        }
    }), t.widget("ui.autocomplete", t.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(t) {
                    return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(t) {
            var e;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e))
        }
    })
}(jQuery),
function(t) {
    var e, i, s, n, o = "ui-button ui-widget ui-state-default ui-corner-all",
        a = "ui-state-hover ui-state-active ",
        r = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        h = function() {
            var e = t(this);
            setTimeout(function() {
                e.find(":ui-button").button("refresh")
            }, 1)
        },
        l = function(e) {
            var i = e.name,
                s = e.form,
                n = t([]);
            return i && (i = i.replace(/'/g, "\\'"), n = s ? t(s).find("[name='" + i + "']") : t("[name='" + i + "']", e.ownerDocument).filter(function() {
                return !this.form
            })), n
        };
    t.widget("ui.button", {
        version: "1.10.3",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, h), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var a = this,
                r = this.options,
                c = "checkbox" === this.type || "radio" === this.type,
                u = c ? "" : "ui-state-active",
                d = "ui-state-focus";
            null === r.label && (r.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(o).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                r.disabled || this === e && t(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function() {
                r.disabled || t(this).removeClass(u)
            }).bind("click" + this.eventNamespace, function(t) {
                r.disabled && (t.preventDefault(), t.stopImmediatePropagation())
            }), this.element.bind("focus" + this.eventNamespace, function() {
                a.buttonElement.addClass(d)
            }).bind("blur" + this.eventNamespace, function() {
                a.buttonElement.removeClass(d)
            }), c && (this.element.bind("change" + this.eventNamespace, function() {
                n || a.refresh()
            }), this.buttonElement.bind("mousedown" + this.eventNamespace, function(t) {
                r.disabled || (n = !1, i = t.pageX, s = t.pageY)
            }).bind("mouseup" + this.eventNamespace, function(t) {
                r.disabled || (i !== t.pageX || s !== t.pageY) && (n = !0)
            })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                return r.disabled || n ? !1 : undefined
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (r.disabled || n) return !1;
                t(this).addClass("ui-state-active"), a.buttonElement.attr("aria-pressed", "true");
                var e = a.element[0];
                l(e).not(e).map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                return r.disabled ? !1 : (t(this).addClass("ui-state-active"), e = this, a.document.one("mouseup", function() {
                    e = null
                }), undefined)
            }).bind("mouseup" + this.eventNamespace, function() {
                return r.disabled ? !1 : (t(this).removeClass("ui-state-active"), undefined)
            }).bind("keydown" + this.eventNamespace, function(e) {
                return r.disabled ? !1 : ((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"), undefined)
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                t(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
                e.keyCode === t.ui.keyCode.SPACE && t(this).click()
            })), this._setOption("disabled", r.disabled), this._resetButton()
        },
        _determineButtonType: function() {
            var t, e, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(o + " " + a + " " + r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(t, e) {
            return this._super(t, e), "disabled" === t ? (e ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), undefined) : (this._resetButton(), undefined)
        },
        refresh: function() {
            var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? l(this.element[0]).each(function() {
                t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type) return this.options.label && this.element.val(this.options.label), undefined;
            var e = this.buttonElement.removeClass(r),
                i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
                s = this.options.icons,
                n = s.primary && s.secondary,
                o = [];
            s.primary || s.secondary ? (this.options.text && o.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (o.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : o.push("ui-button-text-only"), e.addClass(o.join(" "))
        }
    }), t.widget("ui.buttonset", {
        version: "1.10.3",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(t, e) {
            "disabled" === t && this.buttons.button("option", t, e), this._super(t, e)
        },
        refresh: function() {
            var e = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}(jQuery),
function(t, e) {
    function i() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, t.extend(this._defaults, this.regional[""]), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function s(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(i, "mouseout", function() {
            t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function() {
            t.datepicker._isDisabledDatepicker(o.inline ? e.parent()[0] : o.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
        })
    }

    function n(e, i) {
        t.extend(e, i);
        for (var s in i) null == i[s] && (e[s] = i[s]);
        return e
    }
    t.extend(t.ui, {
        datepicker: {
            version: "1.10.3"
        }
    });
    var o, a = "datepicker";
    t.extend(i.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(t) {
            return n(this._defaults, t || {}), this
        },
        _attachDatepicker: function(e, i) {
            var s, n, o;
            s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), n), o.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, o) : n && this._inlineDatepicker(e, o)
        },
        _newInst: function(e, i) {
            var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: n,
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(e, i) {
            var s = t(e);
            i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, a, i), i.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function(e, i) {
            var s, n, o, a = this._get(i, "appendText"),
                r = this._get(i, "isRTL");
            i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                src: o,
                alt: n,
                title: n
            }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
                src: o,
                alt: n,
                title: n
            }) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.click(function() {
                return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
            }))
        },
        _autoSize: function(t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, s, n, o = new Date(2009, 11, 20),
                    a = this._get(t, "dateFormat");
                a.match(/[DM]/) && (e = function(t) {
                    for (i = 0, s = 0, n = 0; t.length > n; n++) t[n].length > i && (i = t[n].length, s = n);
                    return s
                }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length)
            }
        },
        _inlineDatepicker: function(e, i) {
            var s = t(e);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, a, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(e, i, s, o, r) {
            var h, l, c, u, d, p = this._dialogInst;
            return p || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], a, p)), n(p.settings, o || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = r ? r.length ? r : [r.pageX, r.pageY] : null, this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], a, p), this
        },
        _destroyDatepicker: function(e) {
            var i, s = t(e),
                n = t.data(e, a);
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, a), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(e) {
            var i, s, n = t(e),
                o = t.data(e, a);
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }))
        },
        _disableDatepicker: function(e) {
            var i, s, n = t(e),
                o = t.data(e, a);
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }), this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function(t) {
            if (!t) return !1;
            for (var e = 0; this._disabledInputs.length > e; e++)
                if (this._disabledInputs[e] === t) return !0;
            return !1
        },
        _getInst: function(e) {
            try {
                return t.data(e, a)
            } catch (i) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(i, s, o) {
            var a, r, h, l, c = this._getInst(i);
            return 2 === arguments.length && "string" == typeof s ? "defaults" === s ? t.extend({}, t.datepicker._defaults) : c ? "all" === s ? t.extend({}, c.settings) : this._get(c, s) : null : (a = s || {}, "string" == typeof s && (a = {}, a[s] = o), c && (this._curInst === c && this._hideDatepicker(), r = this._getDateDatepicker(i, !0), h = this._getMinMaxDate(c, "min"), l = this._getMinMaxDate(c, "max"), n(c.settings, a), null !== h && a.dateFormat !== e && a.minDate === e && (c.settings.minDate = this._formatDate(c, h)), null !== l && a.dateFormat !== e && a.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)), "disabled" in a && (a.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), c), this._autoSize(c), this._setDate(c, r), this._updateAlternate(c), this._updateDatepicker(c)), e)
        },
        _changeDatepicker: function(t, e, i) {
            this._optionDatepicker(t, e, i)
        },
        _refreshDatepicker: function(t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        },
        _setDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
        },
        _doKeyDown: function(e) {
            var i, s, n, o = t.datepicker._getInst(e.target),
                a = !0,
                r = o.dpDiv.is(".ui-datepicker-rtl");
            if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                case 9:
                    t.datepicker._hideDatepicker(), a = !1;
                    break;
                case 13:
                    return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), n[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, n[0]), i = t.datepicker._get(o, "onSelect"), i ? (s = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : t.datepicker._hideDatepicker(), !1;
                case 27:
                    t.datepicker._hideDatepicker();
                    break;
                case 33:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 34:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 35:
                    (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 38:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 40:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
                    break;
                default:
                    a = !1
            } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
            a && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function(i) {
            var s, n, o = t.datepicker._getInst(i.target);
            return t.datepicker._get(o, "constrainInput") ? (s = t.datepicker._possibleChars(t.datepicker._get(o, "dateFormat")), n = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > n || !s || s.indexOf(n) > -1) : e
        },
        _doKeyUp: function(e) {
            var i, s = t.datepicker._getInst(e.target);
            if (s.input.val() !== s.lastVal) try {
                i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
            } catch (n) {}
            return !0
        },
        _showDatepicker: function(e) {
            if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                var i, s, o, a, r, h, l;
                i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s = t.datepicker._get(i, "beforeShow"), o = s ? s.apply(e, [e, i]) : {}, o !== !1 && (n(i.settings, o), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), a = !1, t(e).parents().each(function() {
                    return a |= "fixed" === t(this).css("position"), !a
                }), r = {
                    left: t.datepicker._pos[0],
                    top: t.datepicker._pos[1]
                }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), t.datepicker._updateDatepicker(i), r = t.datepicker._checkOffset(i, r, a), i.dpDiv.css({
                    position: t.datepicker._inDialog && t.blockUI ? "static" : a ? "fixed" : "absolute",
                    display: "none",
                    left: r.left + "px",
                    top: r.top + "px"
                }), i.inline || (h = t.datepicker._get(i, "showAnim"), l = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), l) : i.dpDiv[h || "show"](h ? l : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(e) {
            this.maxRows = 4, o = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var i, s = this._getNumberOfMonths(e),
                n = s[1],
                a = 17;
            e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
        },
        _checkOffset: function(e, i, s) {
            var n = e.dpDiv.outerWidth(),
                o = e.dpDiv.outerHeight(),
                a = e.input ? e.input.outerWidth() : 0,
                r = e.input ? e.input.outerHeight() : 0,
                h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
                l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? n - a : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + o > l && l > o ? Math.abs(o + r) : 0), i
        },
        _findPos: function(e) {
            for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[n ? "previousSibling" : "nextSibling"];
            return i = t(e).offset(), [i.left, i.top]
        },
        _hideDatepicker: function(e) {
            var i, s, n, o, r = this._curInst;
            !r || e && r !== t.data(e, a) || this._datepickerShowing && (i = this._get(r, "showAnim"), s = this._get(r, "duration"), n = function() {
                t.datepicker._tidyDialog(r)
            }, t.effects && (t.effects.effect[i] || t.effects[i]) ? r.dpDiv.hide(i, t.datepicker._get(r, "showOptions"), s, n) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(r, "onClose"), o && o.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(t) {
            t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(e) {
            if (t.datepicker._curInst) {
                var i = t(e.target),
                    s = t.datepicker._getInst(i[0]);
                (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(e, i, s) {
            var n = t(e),
                o = this._getInst(n[0]);
            this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o))
        },
        _gotoToday: function(e) {
            var i, s = t(e),
                n = this._getInst(s[0]);
            this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
        },
        _selectMonthYear: function(e, i, s) {
            var n = t(e),
                o = this._getInst(n[0]);
            o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n)
        },
        _selectDay: function(e, i, s, n) {
            var o, a = t(e);
            t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
        },
        _clearDate: function(e) {
            var i = t(e);
            this._selectDate(i, "")
        },
        _selectDate: function(e, i) {
            var s, n = t(e),
                o = this._getInst(n[0]);
            i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(e) {
            var i, s, n, o = this._get(e, "altField");
            o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(o).each(function() {
                t(this).val(n)
            }))
        },
        noWeekends: function(t) {
            var e = t.getDay();
            return [e > 0 && 6 > e, ""]
        },
        iso8601Week: function(t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        },
        parseDate: function(i, s, n) {
            if (null == i || null == s) throw "Invalid arguments";
            if (s = "object" == typeof s ? "" + s : s + "", "" === s) return null;
            var o, a, r, h, l = 0,
                c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                u = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10),
                d = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                p = (n ? n.dayNames : null) || this._defaults.dayNames,
                f = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                g = (n ? n.monthNames : null) || this._defaults.monthNames,
                m = -1,
                v = -1,
                _ = -1,
                b = -1,
                y = !1,
                w = function(t) {
                    var e = i.length > o + 1 && i.charAt(o + 1) === t;
                    return e && o++, e
                },
                k = function(t) {
                    var e = w(t),
                        i = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                        n = RegExp("^\\d{1," + i + "}"),
                        o = s.substring(l).match(n);
                    if (!o) throw "Missing number at position " + l;
                    return l += o[0].length, parseInt(o[0], 10)
                },
                x = function(i, n, o) {
                    var a = -1,
                        r = t.map(w(i) ? o : n, function(t, e) {
                            return [
                                [e, t]
                            ]
                        }).sort(function(t, e) {
                            return -(t[1].length - e[1].length)
                        });
                    if (t.each(r, function(t, i) {
                            var n = i[1];
                            return s.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (a = i[0], l += n.length, !1) : e
                        }), -1 !== a) return a + 1;
                    throw "Unknown name at position " + l
                },
                D = function() {
                    if (s.charAt(l) !== i.charAt(o)) throw "Unexpected literal at position " + l;
                    l++
                };
            for (o = 0; i.length > o; o++)
                if (y) "'" !== i.charAt(o) || w("'") ? D() : y = !1;
                else switch (i.charAt(o)) {
                    case "d":
                        _ = k("d");
                        break;
                    case "D":
                        x("D", d, p);
                        break;
                    case "o":
                        b = k("o");
                        break;
                    case "m":
                        v = k("m");
                        break;
                    case "M":
                        v = x("M", f, g);
                        break;
                    case "y":
                        m = k("y");
                        break;
                    case "@":
                        h = new Date(k("@")), m = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate();
                        break;
                    case "!":
                        h = new Date((k("!") - this._ticksTo1970) / 1e4), m = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate();
                        break;
                    case "'":
                        w("'") ? D() : y = !0;
                        break;
                    default:
                        D()
                }
                if (s.length > l && (r = s.substr(l), !/^\s+/.test(r))) throw "Extra/unparsed characters found in date: " + r;
            if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= m ? 0 : -100)), b > -1)
                for (v = 1, _ = b;;) {
                    if (a = this._getDaysInMonth(m, v - 1), a >= _) break;
                    v++, _ -= a
                }
            if (h = this._daylightSavingAdjust(new Date(m, v - 1, _)), h.getFullYear() !== m || h.getMonth() + 1 !== v || h.getDate() !== _) throw "Invalid date";
            return h
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(t, e, i) {
            if (!e) return "";
            var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                o = (i ? i.dayNames : null) || this._defaults.dayNames,
                a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                r = (i ? i.monthNames : null) || this._defaults.monthNames,
                h = function(e) {
                    var i = t.length > s + 1 && t.charAt(s + 1) === e;
                    return i && s++, i
                },
                l = function(t, e, i) {
                    var s = "" + e;
                    if (h(t))
                        for (; i > s.length;) s = "0" + s;
                    return s
                },
                c = function(t, e, i, s) {
                    return h(t) ? s[e] : i[e]
                },
                u = "",
                d = !1;
            if (e)
                for (s = 0; t.length > s; s++)
                    if (d) "'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1;
                    else switch (t.charAt(s)) {
                        case "d":
                            u += l("d", e.getDate(), 2);
                            break;
                        case "D":
                            u += c("D", e.getDay(), n, o);
                            break;
                        case "o":
                            u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            u += l("m", e.getMonth() + 1, 2);
                            break;
                        case "M":
                            u += c("M", e.getMonth(), a, r);
                            break;
                        case "y":
                            u += h("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                            break;
                        case "@":
                            u += e.getTime();
                            break;
                        case "!":
                            u += 1e4 * e.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            h("'") ? u += "'" : d = !0;
                            break;
                        default:
                            u += t.charAt(s)
                    }
                    return u
        },
        _possibleChars: function(t) {
            var e, i = "",
                s = !1,
                n = function(i) {
                    var s = t.length > e + 1 && t.charAt(e + 1) === i;
                    return s && e++, s
                };
            for (e = 0; t.length > e; e++)
                if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;
                else switch (t.charAt(e)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        n("'") ? i += "'" : s = !0;
                        break;
                    default:
                        i += t.charAt(e)
                }
                return i
        },
        _get: function(t, i) {
            return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
        },
        _setDateFromField: function(t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"),
                    s = t.lastVal = t.input ? t.input.val() : null,
                    n = this._getDefaultDate(t),
                    o = n,
                    a = this._getFormatConfig(t);
                try {
                    o = this.parseDate(i, s, a) || n
                } catch (r) {
                    s = e ? "" : s
                }
                t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function(t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        },
        _determineDate: function(e, i, s) {
            var n = function(t) {
                    var e = new Date;
                    return e.setDate(e.getDate() + t), e
                },
                o = function(i) {
                    try {
                        return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                    } catch (s) {}
                    for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = n.getFullYear(), a = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
                        switch (l[2] || "d") {
                            case "d":
                            case "D":
                                r += parseInt(l[1], 10);
                                break;
                            case "w":
                            case "W":
                                r += 7 * parseInt(l[1], 10);
                                break;
                            case "m":
                            case "M":
                                a += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));
                                break;
                            case "y":
                            case "Y":
                                o += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a))
                        }
                        l = h.exec(i)
                    }
                    return new Date(o, a, r)
                },
                a = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
            return a = a && "Invalid Date" == "" + a ? s : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
        },
        _daylightSavingAdjust: function(t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
        },
        _setDate: function(t, e, i) {
            var s = !e,
                n = t.selectedMonth,
                o = t.selectedYear,
                a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
        },
        _getDate: function(t) {
            var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return e
        },
        _attachHandlers: function(e) {
            var i = this._get(e, "stepMonths"),
                s = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function() {
                var e = {
                    prev: function() {
                        t.datepicker._adjustDate(s, -i, "M")
                    },
                    next: function() {
                        t.datepicker._adjustDate(s, +i, "M")
                    },
                    hide: function() {
                        t.datepicker._hideDatepicker()
                    },
                    today: function() {
                        t.datepicker._gotoToday(s)
                    },
                    selectDay: function() {
                        return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function() {
                        return t.datepicker._selectMonthYear(s, this, "M"), !1
                    },
                    selectYear: function() {
                        return t.datepicker._selectMonthYear(s, this, "Y"), !1
                    }
                };
                t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(t) {
            var e, i, s, n, o, a, r, h, l, c, u, d, p, f, g, m, v, _, b, y, w, k, x, D, C, I, P, T, M, S, z, A, H, E, N, W, O, F, R, L = new Date,
                j = this._daylightSavingAdjust(new Date(L.getFullYear(), L.getMonth(), L.getDate())),
                Y = this._get(t, "isRTL"),
                B = this._get(t, "showButtonPanel"),
                V = this._get(t, "hideIfNoPrevNext"),
                K = this._get(t, "navigationAsDateFormat"),
                U = this._getNumberOfMonths(t),
                q = this._get(t, "showCurrentAtPos"),
                Q = this._get(t, "stepMonths"),
                X = 1 !== U[0] || 1 !== U[1],
                $ = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                G = this._getMinMaxDate(t, "min"),
                J = this._getMinMaxDate(t, "max"),
                Z = t.drawMonth - q,
                te = t.drawYear;
            if (0 > Z && (Z += 12, te--), J)
                for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e = G && G > e ? G : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, te--);
            for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - Q, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : V ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + Q, 1)), this._getFormatConfig(t)) : n, o = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : V ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? $ : j, a = K ? this.formatDate(a, r, this._getFormatConfig(t)) : a, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), _ = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; U[0] > k; k++) {
                for (x = "", this.maxRows = 4, D = 0; U[1] > D; D++) {
                    if (C = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), I = " ui-corner-all", P = "", X) {
                        if (P += "<div class='ui-datepicker-group", U[1] > 1) switch (D) {
                            case 0:
                                P += " ui-datepicker-group-first", I = " ui-corner-" + (Y ? "right" : "left");
                                break;
                            case U[1] - 1:
                                P += " ui-datepicker-group-last", I = " ui-corner-" + (Y ? "left" : "right");
                                break;
                            default:
                                P += " ui-datepicker-group-middle", I = ""
                        }
                        P += "'>"
                    }
                    for (P += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + I + "'>" + (/all|left/.test(I) && 0 === k ? Y ? o : s : "") + (/all|right/.test(I) && 0 === k ? Y ? s : o : "") + this._generateMonthYearHeader(t, Z, te, G, J, k > 0 || D > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", T = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++) M = (w + c) % 7, T += "<th" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[M] + "'>" + p[M] + "</span></th>";
                    for (P += T + "</tr></thead><tbody>", S = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, S)), z = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, A = Math.ceil((z + S) / 7), H = X ? this.maxRows > A ? this.maxRows : A : A, this.maxRows = H, E = this._daylightSavingAdjust(new Date(te, Z, 1 - z)), N = 0; H > N; N++) {
                        for (P += "<tr>", W = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(E) + "</td>" : "", w = 0; 7 > w; w++) O = m ? m.apply(t.input ? t.input[0] : null, [E]) : [!0, ""], F = E.getMonth() !== Z, R = F && !_ || !O[0] || G && G > E || J && E > J, W += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (E.getTime() === C.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === E.getTime() && b.getTime() === C.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !v ? "" : " " + O[1] + (E.getTime() === $.getTime() ? " " + this._currentClass : "") + (E.getTime() === j.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + E.getMonth() + "' data-year='" + E.getFullYear() + "'") + ">" + (F && !v ? "&#xa0;" : R ? "<span class='ui-state-default'>" + E.getDate() + "</span>" : "<a class='ui-state-default" + (E.getTime() === j.getTime() ? " ui-state-highlight" : "") + (E.getTime() === $.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + E.getDate() + "</a>") + "</td>", E.setDate(E.getDate() + 1), E = this._daylightSavingAdjust(E);
                        P += W + "</tr>"
                    }
                    Z++, Z > 11 && (Z = 0, te++), P += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && D === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += P
                }
                y += x
            }
            return y += l, t._keyEvent = !1, y
        },
        _generateMonthYearHeader: function(t, e, i, s, n, o, a, r) {
            var h, l, c, u, d, p, f, g, m = this._get(t, "changeMonth"),
                v = this._get(t, "changeYear"),
                _ = this._get(t, "showMonthAfterYear"),
                b = "<div class='ui-datepicker-title'>",
                y = "";
            if (o || !m) y += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
            else {
                for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)(!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                y += "</select>"
            }
            if (_ || (b += y + (!o && m && v ? "" : "&#xa0;")), !t.yearshtml)
                if (t.yearshtml = "", o || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                            var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                            return isNaN(e) ? d : e
                        }, f = p(u[0]), g = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, g = n ? Math.min(g, n.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                    t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
                }
            return b += this._get(t, "yearSuffix"), _ && (b += (!o && m && v ? "" : "&#xa0;") + y), b += "</div>"
        },
        _adjustInstDate: function(t, e, i) {
            var s = t.drawYear + ("Y" === i ? e : 0),
                n = t.drawMonth + ("M" === i ? e : 0),
                o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
                a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
            t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
        },
        _restrictMinMax: function(t, e) {
            var i = this._getMinMaxDate(t, "min"),
                s = this._getMinMaxDate(t, "max"),
                n = i && i > e ? i : e;
            return s && n > s ? s : n
        },
        _notifyChange: function(t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function(t) {
            var e = this._get(t, "numberOfMonths");
            return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
        },
        _getMinMaxDate: function(t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        },
        _getDaysInMonth: function(t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
        },
        _getFirstDayOfMonth: function(t, e) {
            return new Date(t, e, 1).getDay()
        },
        _canAdjustMonth: function(t, e, i, s) {
            var n = this._getNumberOfMonths(t),
                o = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
            return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
        },
        _isInRange: function(t, e) {
            var i, s, n = this._getMinMaxDate(t, "min"),
                o = this._getMinMaxDate(t, "max"),
                a = null,
                r = null,
                h = this._get(t, "yearRange");
            return h && (i = h.split(":"), s = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || r >= e.getFullYear())
        },
        _getFormatConfig: function(t) {
            var e = this._get(t, "shortYearCutoff");
            return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                shortYearCutoff: e,
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            }
        },
        _formatDate: function(t, e, i, s) {
            e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
            var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
        }
    }), t.fn.datepicker = function(e) {
        if (!this.length) return this;
        t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.3"
}(jQuery),
function(t) {
    var e = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        i = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        };
    t.widget("ui.dialog", {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(e) {
                    var i = t(this).css(e).offset().top;
                    0 > i && t(this).css("top", e.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var e = this.options.appendTo;
            return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
        },
        _destroy: function() {
            var t, e = this.originalPosition;
            this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: t.noop,
        enable: t.noop,
        close: function(e) {
            var i = this;
            this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || t(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function() {
                i._trigger("close", e)
            }))
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(t, e) {
            var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            return i && !e && this._trigger("focus", t), i
        },
        open: function() {
            var e = this;
            return this._isOpen ? (this._moveToTop() && this._focusTabbable(), undefined) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
                e._focusTabbable(), e._trigger("focus")
            }), this._trigger("open"), undefined)
        },
        _focusTabbable: function() {
            var t = this.element.find("[autofocus]");
            t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus()
        },
        _keepFocus: function(e) {
            function i() {
                var e = this.document[0].activeElement,
                    i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
                i || this._focusTabbable()
            }
            e.preventDefault(), i.call(this), this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                keydown: function(e) {
                    if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), this.close(e), undefined;
                    if (e.keyCode === t.ui.keyCode.TAB) {
                        var i = this.uiDialog.find(":tabbable"),
                            s = i.filter(":first"),
                            n = i.filter(":last");
                        e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (n.focus(1), e.preventDefault()) : (s.focus(1), e.preventDefault())
                    }
                },
                mousedown: function(t) {
                    this._moveToTop(t) && this._focusTabbable()
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var e;
            this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                mousedown: function(e) {
                    t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }), this.uiDialogTitlebarClose = t("<button></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                click: function(t) {
                    t.preventDefault(), this.close(t)
                }
            }), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({
                "aria-labelledby": e.attr("id")
            })
        },
        _title: function(t) {
            this.options.title || t.html("&#160;"), t.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
        },
        _createButtons: function() {
            var e = this,
                i = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), undefined) : (t.each(i, function(i, s) {
                var n, o;
                s = t.isFunction(s) ? {
                    click: s,
                    text: i
                } : s, s = t.extend({
                    type: "button"
                }, s), n = s.click, s.click = function() {
                    n.apply(e.element[0], arguments)
                }, o = {
                    icons: s.icons,
                    text: s.showText
                }, delete s.icons, delete s.showText, t("<button></button>", s).button(o).appendTo(e.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), undefined)
        },
        _makeDraggable: function() {
            function e(t) {
                return {
                    position: t.position,
                    offset: t.offset
                }
            }
            var i = this,
                s = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(s, n) {
                    t(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n))
                },
                drag: function(t, s) {
                    i._trigger("drag", t, e(s))
                },
                stop: function(n, o) {
                    s.position = [o.position.left - i.document.scrollLeft(), o.position.top - i.document.scrollTop()], t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(o))
                }
            })
        },
        _makeResizable: function() {
            function e(t) {
                return {
                    originalPosition: t.originalPosition,
                    originalSize: t.originalSize,
                    position: t.position,
                    size: t.size
                }
            }
            var i = this,
                s = this.options,
                n = s.resizable,
                o = this.uiDialog.css("position"),
                a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: s.maxWidth,
                maxHeight: s.maxHeight,
                minWidth: s.minWidth,
                minHeight: this._minHeight(),
                handles: a,
                start: function(s, n) {
                    t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n))
                },
                resize: function(t, s) {
                    i._trigger("resize", t, e(s))
                },
                stop: function(n, o) {
                    s.height = t(this).height(), s.width = t(this).width(), t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(o))
                }
            }).css("position", o)
        },
        _minHeight: function() {
            var t = this.options;
            return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
        },
        _position: function() {
            var t = this.uiDialog.is(":visible");
            t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
        },
        _setOptions: function(s) {
            var n = this,
                o = !1,
                a = {};
            t.each(s, function(t, s) {
                n._setOption(t, s), t in e && (o = !0), t in i && (a[t] = s)
            }), o && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", a)
        },
        _setOption: function(t, e) {
            var i, s, n = this.uiDialog;
            "dialogClass" === t && n.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                label: "" + e
            }), "draggable" === t && (i = n.is(":data(ui-draggable)"), i && !e && n.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (s = n.is(":data(ui-resizable)"), s && !e && n.resizable("destroy"), s && "string" == typeof e && n.resizable("option", "handles", e), s || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var t, e, i, s = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({
                height: "auto",
                width: s.width
            }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({
                minHeight: e,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var e = t(this);
                return t("<div>").css({
                    position: "absolute",
                    width: e.outerWidth(),
                    height: e.outerHeight()
                }).appendTo(e.parent()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function(e) {
            return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var e = this,
                    i = this.widgetFullName;
                t.ui.dialog.overlayInstances || this._delay(function() {
                    t.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(s) {
                        e._allowInteraction(s) || (s.preventDefault(), t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
                    })
                }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }), t.ui.dialog.overlayInstances++
            }
        },
        _destroyOverlay: function() {
            this.options.modal && this.overlay && (t.ui.dialog.overlayInstances--, t.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
        }
    }), t.ui.dialog.overlayInstances = 0, t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, {
        _position: function() {
            var e, i = this.options.position,
                s = [],
                n = [0, 0];
            i ? (("string" == typeof i || "object" == typeof i && "0" in i) && (s = i.split ? i.split(" ") : [i[0], i[1]], 1 === s.length && (s[1] = s[0]), t.each(["left", "top"], function(t, e) {
                +s[t] === s[t] && (n[t] = s[t], s[t] = e)
            }), i = {
                my: s[0] + (0 > n[0] ? n[0] : "+" + n[0]) + " " + s[1] + (0 > n[1] ? n[1] : "+" + n[1]),
                at: s.join(" ")
            }), i = t.extend({}, t.ui.dialog.prototype.options.position, i)) : i = t.ui.dialog.prototype.options.position, e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.position(i), e || this.uiDialog.hide()
        }
    })
}(jQuery),
function(t) {
    var e = /up|down|vertical/,
        i = /up|left|vertical|horizontal/;
    t.effects.effect.blind = function(s, n) {
        var o, a, r, h = t(this),
            l = ["position", "top", "bottom", "left", "right", "height", "width"],
            c = t.effects.setMode(h, s.mode || "hide"),
            u = s.direction || "up",
            d = e.test(u),
            p = d ? "height" : "width",
            f = d ? "top" : "left",
            g = i.test(u),
            m = {},
            v = "show" === c;
        h.parent().is(".ui-effects-wrapper") ? t.effects.save(h.parent(), l) : t.effects.save(h, l), h.show(), o = t.effects.createWrapper(h).css({
            overflow: "hidden"
        }), a = o[p](), r = parseFloat(o.css(f)) || 0, m[p] = v ? a : 0, g || (h.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({
            position: "absolute"
        }), m[f] = v ? r : a + r), v && (o.css(p, 0), g || o.css(f, r + a)), o.animate(m, {
            duration: s.duration,
            easing: s.easing,
            queue: !1,
            complete: function() {
                "hide" === c && h.hide(), t.effects.restore(h, l), t.effects.removeWrapper(h), n()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.bounce = function(e, i) {
        var s, n, o, a = t(this),
            r = ["position", "top", "bottom", "left", "right", "height", "width"],
            h = t.effects.setMode(a, e.mode || "effect"),
            l = "hide" === h,
            c = "show" === h,
            u = e.direction || "up",
            d = e.distance,
            p = e.times || 5,
            f = 2 * p + (c || l ? 1 : 0),
            g = e.duration / f,
            m = e.easing,
            v = "up" === u || "down" === u ? "top" : "left",
            _ = "up" === u || "left" === u,
            b = a.queue(),
            y = b.length;
        for ((c || l) && r.push("opacity"), t.effects.save(a, r), a.show(), t.effects.createWrapper(a), d || (d = a["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (o = {
                opacity: 1
            }, o[v] = 0, a.css("opacity", 0).css(v, _ ? 2 * -d : 2 * d).animate(o, g, m)), l && (d /= Math.pow(2, p - 1)), o = {}, o[v] = 0, s = 0; p > s; s++) n = {}, n[v] = (_ ? "-=" : "+=") + d, a.animate(n, g, m).animate(o, g, m), d = l ? 2 * d : d / 2;
        l && (n = {
            opacity: 0
        }, n[v] = (_ ? "-=" : "+=") + d, a.animate(n, g, m)), a.queue(function() {
            l && a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
        }), y > 1 && b.splice.apply(b, [1, 0].concat(b.splice(y, f + 1))), a.dequeue()
    }
}(jQuery),
function(t) {
    t.effects.effect.clip = function(e, i) {
        var s, n, o, a = t(this),
            r = ["position", "top", "bottom", "left", "right", "height", "width"],
            h = t.effects.setMode(a, e.mode || "hide"),
            l = "show" === h,
            c = e.direction || "vertical",
            u = "vertical" === c,
            d = u ? "height" : "width",
            p = u ? "top" : "left",
            f = {};
        t.effects.save(a, r), a.show(), s = t.effects.createWrapper(a).css({
            overflow: "hidden"
        }), n = "IMG" === a[0].tagName ? s : a, o = n[d](), l && (n.css(d, 0), n.css(p, o / 2)), f[d] = l ? o : 0, f[p] = l ? 0 : o / 2, n.animate(f, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                l || a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.drop = function(e, i) {
        var s, n = t(this),
            o = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            a = t.effects.setMode(n, e.mode || "hide"),
            r = "show" === a,
            h = e.direction || "left",
            l = "up" === h || "down" === h ? "top" : "left",
            c = "up" === h || "left" === h ? "pos" : "neg",
            u = {
                opacity: r ? 1 : 0
            };
        t.effects.save(n, o), n.show(), t.effects.createWrapper(n), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(l, "pos" === c ? -s : s), u[l] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s, n.animate(u, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.explode = function(e, i) {
        function s() {
            b.push(this), b.length === u * d && n()
        }

        function n() {
            p.css({
                visibility: "visible"
            }), t(b).remove(), g || p.hide(), i()
        }
        var o, a, r, h, l, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
            d = u,
            p = t(this),
            f = t.effects.setMode(p, e.mode || "hide"),
            g = "show" === f,
            m = p.show().css("visibility", "hidden").offset(),
            v = Math.ceil(p.outerWidth() / d),
            _ = Math.ceil(p.outerHeight() / u),
            b = [];
        for (o = 0; u > o; o++)
            for (h = m.top + o * _, c = o - (u - 1) / 2, a = 0; d > a; a++) r = m.left + a * v, l = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -a * v,
                top: -o * _
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: v,
                height: _,
                left: r + (g ? l * v : 0),
                top: h + (g ? c * _ : 0),
                opacity: g ? 0 : 1
            }).animate({
                left: r + (g ? 0 : l * v),
                top: h + (g ? 0 : c * _),
                opacity: g ? 1 : 0
            }, e.duration || 500, e.easing, s)
    }
}(jQuery),
function(t) {
    t.effects.effect.fade = function(e, i) {
        var s = t(this),
            n = t.effects.setMode(s, e.mode || "toggle");
        s.animate({
            opacity: n
        }, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.fold = function(e, i) {
        var s, n, o = t(this),
            a = ["position", "top", "bottom", "left", "right", "height", "width"],
            r = t.effects.setMode(o, e.mode || "hide"),
            h = "show" === r,
            l = "hide" === r,
            c = e.size || 15,
            u = /([0-9]+)%/.exec(c),
            d = !!e.horizFirst,
            p = h !== d,
            f = p ? ["width", "height"] : ["height", "width"],
            g = e.duration / 2,
            m = {},
            v = {};
        t.effects.save(o, a), o.show(), s = t.effects.createWrapper(o).css({
            overflow: "hidden"
        }), n = p ? [s.width(), s.height()] : [s.height(), s.width()], u && (c = parseInt(u[1], 10) / 100 * n[l ? 0 : 1]), h && s.css(d ? {
            height: 0,
            width: c
        } : {
            height: c,
            width: 0
        }), m[f[0]] = h ? n[0] : c, v[f[1]] = h ? n[1] : 0, s.animate(m, g, e.easing).animate(v, g, e.easing, function() {
            l && o.hide(), t.effects.restore(o, a), t.effects.removeWrapper(o), i()
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.highlight = function(e, i) {
        var s = t(this),
            n = ["backgroundImage", "backgroundColor", "opacity"],
            o = t.effects.setMode(s, e.mode || "show"),
            a = {
                backgroundColor: s.css("backgroundColor")
            };
        "hide" === o && (a.opacity = 0), t.effects.save(s, n), s.show().css({
            backgroundImage: "none",
            backgroundColor: e.color || "#ffff99"
        }).animate(a, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === o && s.hide(), t.effects.restore(s, n), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.pulsate = function(e, i) {
        var s, n = t(this),
            o = t.effects.setMode(n, e.mode || "show"),
            a = "show" === o,
            r = "hide" === o,
            h = a || "hide" === o,
            l = 2 * (e.times || 5) + (h ? 1 : 0),
            c = e.duration / l,
            u = 0,
            d = n.queue(),
            p = d.length;
        for ((a || !n.is(":visible")) && (n.css("opacity", 0).show(), u = 1), s = 1; l > s; s++) n.animate({
            opacity: u
        }, c, e.easing), u = 1 - u;
        n.animate({
            opacity: u
        }, c, e.easing), n.queue(function() {
            r && n.hide(), i()
        }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, l + 1))), n.dequeue()
    }
}(jQuery),
function(t) {
    t.effects.effect.puff = function(e, i) {
        var s = t(this),
            n = t.effects.setMode(s, e.mode || "hide"),
            o = "hide" === n,
            a = parseInt(e.percent, 10) || 150,
            r = a / 100,
            h = {
                height: s.height(),
                width: s.width(),
                outerHeight: s.outerHeight(),
                outerWidth: s.outerWidth()
            };
        t.extend(e, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: n,
            complete: i,
            percent: o ? a : 100,
            from: o ? h : {
                height: h.height * r,
                width: h.width * r,
                outerHeight: h.outerHeight * r,
                outerWidth: h.outerWidth * r
            }
        }), s.effect(e)
    }, t.effects.effect.scale = function(e, i) {
        var s = t(this),
            n = t.extend(!0, {}, e),
            o = t.effects.setMode(s, e.mode || "effect"),
            a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === o ? 0 : 100),
            r = e.direction || "both",
            h = e.origin,
            l = {
                height: s.height(),
                width: s.width(),
                outerHeight: s.outerHeight(),
                outerWidth: s.outerWidth()
            },
            c = {
                y: "horizontal" !== r ? a / 100 : 1,
                x: "vertical" !== r ? a / 100 : 1
            };
        n.effect = "size", n.queue = !1, n.complete = i, "effect" !== o && (n.origin = h || ["middle", "center"], n.restore = !0), n.from = e.from || ("show" === o ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : l), n.to = {
            height: l.height * c.y,
            width: l.width * c.x,
            outerHeight: l.outerHeight * c.y,
            outerWidth: l.outerWidth * c.x
        }, n.fade && ("show" === o && (n.from.opacity = 0, n.to.opacity = 1), "hide" === o && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
    }, t.effects.effect.size = function(e, i) {
        var s, n, o, a = t(this),
            r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            h = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            l = ["width", "height", "overflow"],
            c = ["fontSize"],
            u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            p = t.effects.setMode(a, e.mode || "effect"),
            f = e.restore || "effect" !== p,
            g = e.scale || "both",
            m = e.origin || ["middle", "center"],
            v = a.css("position"),
            _ = f ? r : h,
            b = {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
        "show" === p && a.show(), s = {
            height: a.height(),
            width: a.width(),
            outerHeight: a.outerHeight(),
            outerWidth: a.outerWidth()
        }, "toggle" === e.mode && "show" === p ? (a.from = e.to || b, a.to = e.from || s) : (a.from = e.from || ("show" === p ? b : s), a.to = e.to || ("hide" === p ? b : s)), o = {
            from: {
                y: a.from.height / s.height,
                x: a.from.width / s.width
            },
            to: {
                y: a.to.height / s.height,
                x: a.to.width / s.width
            }
        }, ("box" === g || "both" === g) && (o.from.y !== o.to.y && (_ = _.concat(u), a.from = t.effects.setTransition(a, u, o.from.y, a.from), a.to = t.effects.setTransition(a, u, o.to.y, a.to)), o.from.x !== o.to.x && (_ = _.concat(d), a.from = t.effects.setTransition(a, d, o.from.x, a.from), a.to = t.effects.setTransition(a, d, o.to.x, a.to))), ("content" === g || "both" === g) && o.from.y !== o.to.y && (_ = _.concat(c).concat(l), a.from = t.effects.setTransition(a, c, o.from.y, a.from), a.to = t.effects.setTransition(a, c, o.to.y, a.to)), t.effects.save(a, _), a.show(), t.effects.createWrapper(a), a.css("overflow", "hidden").css(a.from), m && (n = t.effects.getBaseline(m, s), a.from.top = (s.outerHeight - a.outerHeight()) * n.y, a.from.left = (s.outerWidth - a.outerWidth()) * n.x, a.to.top = (s.outerHeight - a.to.outerHeight) * n.y, a.to.left = (s.outerWidth - a.to.outerWidth) * n.x), a.css(a.from), ("content" === g || "both" === g) && (u = u.concat(["marginTop", "marginBottom"]).concat(c), d = d.concat(["marginLeft", "marginRight"]), l = r.concat(u).concat(d), a.find("*[width]").each(function() {
            var i = t(this),
                s = {
                    height: i.height(),
                    width: i.width(),
                    outerHeight: i.outerHeight(),
                    outerWidth: i.outerWidth()
                };
            f && t.effects.save(i, l), i.from = {
                height: s.height * o.from.y,
                width: s.width * o.from.x,
                outerHeight: s.outerHeight * o.from.y,
                outerWidth: s.outerWidth * o.from.x
            }, i.to = {
                height: s.height * o.to.y,
                width: s.width * o.to.x,
                outerHeight: s.height * o.to.y,
                outerWidth: s.width * o.to.x
            }, o.from.y !== o.to.y && (i.from = t.effects.setTransition(i, u, o.from.y, i.from), i.to = t.effects.setTransition(i, u, o.to.y, i.to)), o.from.x !== o.to.x && (i.from = t.effects.setTransition(i, d, o.from.x, i.from), i.to = t.effects.setTransition(i, d, o.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function() {
                f && t.effects.restore(i, l)
            })
        })), a.animate(a.to, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                0 === a.to.opacity && a.css("opacity", a.from.opacity), "hide" === p && a.hide(), t.effects.restore(a, _), f || ("static" === v ? a.css({
                    position: "relative",
                    top: a.to.top,
                    left: a.to.left
                }) : t.each(["top", "left"], function(t, e) {
                    a.css(e, function(e, i) {
                        var s = parseInt(i, 10),
                            n = t ? a.to.left : a.to.top;
                        return "auto" === i ? n + "px" : s + n + "px"
                    })
                })), t.effects.removeWrapper(a), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.shake = function(e, i) {
        var s, n = t(this),
            o = ["position", "top", "bottom", "left", "right", "height", "width"],
            a = t.effects.setMode(n, e.mode || "effect"),
            r = e.direction || "left",
            h = e.distance || 20,
            l = e.times || 3,
            c = 2 * l + 1,
            u = Math.round(e.duration / c),
            d = "up" === r || "down" === r ? "top" : "left",
            p = "up" === r || "left" === r,
            f = {},
            g = {},
            m = {},
            v = n.queue(),
            _ = v.length;
        for (t.effects.save(n, o), n.show(), t.effects.createWrapper(n), f[d] = (p ? "-=" : "+=") + h, g[d] = (p ? "+=" : "-=") + 2 * h, m[d] = (p ? "-=" : "+=") + 2 * h, n.animate(f, u, e.easing), s = 1; l > s; s++) n.animate(g, u, e.easing).animate(m, u, e.easing);
        n.animate(g, u, e.easing).animate(f, u / 2, e.easing).queue(function() {
            "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
        }), _ > 1 && v.splice.apply(v, [1, 0].concat(v.splice(_, c + 1))), n.dequeue()
    }
}(jQuery),
function(t) {
    t.effects.effect.slide = function(e, i) {
        var s, n = t(this),
            o = ["position", "top", "bottom", "left", "right", "width", "height"],
            a = t.effects.setMode(n, e.mode || "show"),
            r = "show" === a,
            h = e.direction || "left",
            l = "up" === h || "down" === h ? "top" : "left",
            c = "up" === h || "left" === h,
            u = {};
        t.effects.save(n, o), n.show(), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(n).css({
            overflow: "hidden"
        }), r && n.css(l, c ? isNaN(s) ? "-" + s : -s : s), u[l] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(u, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.transfer = function(e, i) {
        var s = t(this),
            n = t(e.to),
            o = "fixed" === n.css("position"),
            a = t("body"),
            r = o ? a.scrollTop() : 0,
            h = o ? a.scrollLeft() : 0,
            l = n.offset(),
            c = {
                top: l.top - r,
                left: l.left - h,
                height: n.innerHeight(),
                width: n.innerWidth()
            },
            u = s.offset(),
            d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
                top: u.top - r,
                left: u.left - h,
                height: s.innerHeight(),
                width: s.innerWidth(),
                position: o ? "fixed" : "absolute"
            }).animate(c, e.duration, e.easing, function() {
                d.remove(), i()
            })
    }
}(jQuery),
function(t) {
    t.widget("ui.menu", {
        version: "1.10.3",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, t.proxy(function(t) {
                this.options.disabled && t.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item > a": function(t) {
                    t.preventDefault()
                },
                "click .ui-state-disabled > a": function(t) {
                    t.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(e) {
                    var i = t(e.target).closest(".ui-menu-item");
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(e), i.has(".ui-menu").length ? this.expand(e) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(e) {
                    var i = t(e.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(t, e) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    e || this.focus(t, i)
                },
                blur: function(e) {
                    this._delay(function() {
                        t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                    })
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function(e) {
                    t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var e = t(this);
                e.data("ui-menu-submenu-carat") && e.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(e) {
            function i(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var s, n, o, a, r, h = !0;
            switch (e.keyCode) {
                case t.ui.keyCode.PAGE_UP:
                    this.previousPage(e);
                    break;
                case t.ui.keyCode.PAGE_DOWN:
                    this.nextPage(e);
                    break;
                case t.ui.keyCode.HOME:
                    this._move("first", "first", e);
                    break;
                case t.ui.keyCode.END:
                    this._move("last", "last", e);
                    break;
                case t.ui.keyCode.UP:
                    this.previous(e);
                    break;
                case t.ui.keyCode.DOWN:
                    this.next(e);
                    break;
                case t.ui.keyCode.LEFT:
                    this.collapse(e);
                    break;
                case t.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                    break;
                case t.ui.keyCode.ENTER:
                case t.ui.keyCode.SPACE:
                    this._activate(e);
                    break;
                case t.ui.keyCode.ESCAPE:
                    this.collapse(e);
                    break;
                default:
                    h = !1, n = this.previousFilter || "", o = String.fromCharCode(e.keyCode), a = !1, clearTimeout(this.filterTimer), o === n ? a = !0 : o = n + o, r = RegExp("^" + i(o), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return r.test(t(this).children("a").text())
                    }), s = a && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s, s.length || (o = String.fromCharCode(e.keyCode), r = RegExp("^" + i(o), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return r.test(t(this).children("a").text())
                    })), s.length ? (this.focus(e, s), s.length > 1 ? (this.previousFilter = o, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            h && e.preventDefault()
        },
        _activate: function(t) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
        },
        refresh: function() {
            var e, i = this.options.icons.submenu,
                s = this.element.find(this.options.menus);
            s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var e = t(this),
                    s = e.prev("a"),
                    n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
                s.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", s.attr("id"))
            }), e = s.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), e.children(":not(.ui-menu-item)").each(function() {
                var e = t(this);
                /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
            }), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(t, e) {
            "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t, e)
        },
        focus: function(t, e) {
            var i, s;
            this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay), i = e.children(".ui-menu"), i.length && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
                item: e
            })
        },
        _scrollIntoView: function(e) {
            var i, s, n, o, a, r;
            this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.height(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r))
        },
        blur: function(t, e) {
            e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
                item: this.active
            }))
        },
        _startOpening: function(t) {
            clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(), this._open(t)
            }, this.delay))
        },
        _open: function(e) {
            var i = t.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(e, i) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                s.length || (s = this.element), this._close(s), this.blur(e), this.activeMenu = s
            }, this.delay)
        },
        _close: function(t) {
            t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(), this.focus(t, e))
        },
        expand: function(t) {
            var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            e && e.length && (this._open(e.parent()), this._delay(function() {
                this.focus(t, e)
            }))
        },
        next: function(t) {
            this._move("next", "first", t)
        },
        previous: function(t) {
            this._move("prev", "last", t)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(t, e, i) {
            var s;
            this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, s)
        },
        nextPage: function(e) {
            var i, s, n;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = t(this), 0 > i.offset().top - s - n
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(e), undefined)
        },
        previousPage: function(e) {
            var i, s, n;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = t(this), i.offset().top - s + n > 0
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(e), undefined)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(e) {
            this.active = this.active || t(e.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
        }
    })
}(jQuery),
function(t, e) {
    function i(t, e, i) {
        return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
    }

    function s(e, i) {
        return parseInt(t.css(e, i), 10) || 0
    }

    function n(e) {
        var i = e[0];
        return 9 === i.nodeType ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : t.isWindow(i) ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: e.scrollTop(),
                left: e.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: e.outerWidth(),
            height: e.outerHeight(),
            offset: e.offset()
        }
    }
    t.ui = t.ui || {};
    var o, a = Math.max,
        r = Math.abs,
        h = Math.round,
        l = /left|center|right/,
        c = /top|center|bottom/,
        u = /[\+\-]\d+(\.[\d]+)?%?/,
        d = /^\w+/,
        p = /%$/,
        f = t.fn.position;
    t.position = {
            scrollbarWidth: function() {
                if (o !== e) return o;
                var i, s, n = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    a = n.children()[0];
                return t("body").append(n), i = a.offsetWidth, n.css("overflow", "scroll"), s = a.offsetWidth, i === s && (s = n[0].clientWidth), n.remove(), o = i - s
            },
            getScrollInfo: function(e) {
                var i = e.isWindow ? "" : e.element.css("overflow-x"),
                    s = e.isWindow ? "" : e.element.css("overflow-y"),
                    n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                    o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
                return {
                    width: o ? t.position.scrollbarWidth() : 0,
                    height: n ? t.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(e) {
                var i = t(e || window),
                    s = t.isWindow(i[0]);
                return {
                    element: i,
                    isWindow: s,
                    offset: i.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: s ? i.width() : i.outerWidth(),
                    height: s ? i.height() : i.outerHeight()
                }
            }
        }, t.fn.position = function(e) {
            if (!e || !e.of) return f.apply(this, arguments);
            e = t.extend({}, e);
            var o, p, g, m, v, _, b = t(e.of),
                y = t.position.getWithinInfo(e.within),
                w = t.position.getScrollInfo(y),
                k = (e.collision || "flip").split(" "),
                x = {};
            return _ = n(b), b[0].preventDefault && (e.at = "left top"), p = _.width, g = _.height, m = _.offset, v = t.extend({}, m), t.each(["my", "at"], function() {
                var t, i, s = (e[this] || "").split(" ");
                1 === s.length && (s = l.test(s[0]) ? s.concat(["center"]) : c.test(s[0]) ? ["center"].concat(s) : ["center", "center"]), s[0] = l.test(s[0]) ? s[0] : "center", s[1] = c.test(s[1]) ? s[1] : "center", t = u.exec(s[0]), i = u.exec(s[1]), x[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(s[0])[0], d.exec(s[1])[0]]
            }), 1 === k.length && (k[1] = k[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += g : "center" === e.at[1] && (v.top += g / 2), o = i(x.at, p, g), v.left += o[0], v.top += o[1], this.each(function() {
                var n, l, c = t(this),
                    u = c.outerWidth(),
                    d = c.outerHeight(),
                    f = s(this, "marginLeft"),
                    _ = s(this, "marginTop"),
                    D = u + f + s(this, "marginRight") + w.width,
                    C = d + _ + s(this, "marginBottom") + w.height,
                    I = t.extend({}, v),
                    P = i(x.my, c.outerWidth(), c.outerHeight());
                "right" === e.my[0] ? I.left -= u : "center" === e.my[0] && (I.left -= u / 2), "bottom" === e.my[1] ? I.top -= d : "center" === e.my[1] && (I.top -= d / 2), I.left += P[0], I.top += P[1], t.support.offsetFractions || (I.left = h(I.left), I.top = h(I.top)), n = {
                    marginLeft: f,
                    marginTop: _
                }, t.each(["left", "top"], function(i, s) {
                    t.ui.position[k[i]] && t.ui.position[k[i]][s](I, {
                        targetWidth: p,
                        targetHeight: g,
                        elemWidth: u,
                        elemHeight: d,
                        collisionPosition: n,
                        collisionWidth: D,
                        collisionHeight: C,
                        offset: [o[0] + P[0], o[1] + P[1]],
                        my: e.my,
                        at: e.at,
                        within: y,
                        elem: c
                    })
                }), e.using && (l = function(t) {
                    var i = m.left - I.left,
                        s = i + p - u,
                        n = m.top - I.top,
                        o = n + g - d,
                        h = {
                            target: {
                                element: b,
                                left: m.left,
                                top: m.top,
                                width: p,
                                height: g
                            },
                            element: {
                                element: c,
                                left: I.left,
                                top: I.top,
                                width: u,
                                height: d
                            },
                            horizontal: 0 > s ? "left" : i > 0 ? "right" : "center",
                            vertical: 0 > o ? "top" : n > 0 ? "bottom" : "middle"
                        };
                    u > p && p > r(i + s) && (h.horizontal = "center"), d > g && g > r(n + o) && (h.vertical = "middle"), h.important = a(r(i), r(s)) > a(r(n), r(o)) ? "horizontal" : "vertical", e.using.call(this, t, h)
                }), c.offset(t.extend(I, {
                    using: l
                }))
            })
        }, t.ui.position = {
            fit: {
                left: function(t, e) {
                    var i, s = e.within,
                        n = s.isWindow ? s.scrollLeft : s.offset.left,
                        o = s.width,
                        r = t.left - e.collisionPosition.marginLeft,
                        h = n - r,
                        l = r + e.collisionWidth - o - n;
                    e.collisionWidth > o ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - o - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + o - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = a(t.left - r, t.left)
                },
                top: function(t, e) {
                    var i, s = e.within,
                        n = s.isWindow ? s.scrollTop : s.offset.top,
                        o = e.within.height,
                        r = t.top - e.collisionPosition.marginTop,
                        h = n - r,
                        l = r + e.collisionHeight - o - n;
                    e.collisionHeight > o ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - o - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + o - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = a(t.top - r, t.top)
                }
            },
            flip: {
                left: function(t, e) {
                    var i, s, n = e.within,
                        o = n.offset.left + n.scrollLeft,
                        a = n.width,
                        h = n.isWindow ? n.scrollLeft : n.offset.left,
                        l = t.left - e.collisionPosition.marginLeft,
                        c = l - h,
                        u = l + e.collisionWidth - a - h,
                        d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                        p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                        f = -2 * e.offset[0];
                    0 > c ? (i = t.left + d + p + f + e.collisionWidth - a - o, (0 > i || r(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || u > r(s)) && (t.left += d + p + f))
                },
                top: function(t, e) {
                    var i, s, n = e.within,
                        o = n.offset.top + n.scrollTop,
                        a = n.height,
                        h = n.isWindow ? n.scrollTop : n.offset.top,
                        l = t.top - e.collisionPosition.marginTop,
                        c = l - h,
                        u = l + e.collisionHeight - a - h,
                        d = "top" === e.my[1],
                        p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                        f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                        g = -2 * e.offset[1];
                    0 > c ? (s = t.top + p + f + g + e.collisionHeight - a - o, t.top + p + f + g > c && (0 > s || r(c) > s) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - h, t.top + p + f + g > u && (i > 0 || u > r(i)) && (t.top += p + f + g))
                }
            },
            flipfit: {
                left: function() {
                    t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var e, i, s, n, o, a = document.getElementsByTagName("body")[0],
                r = document.createElement("div");
            e = document.createElement(a ? "div" : "body"), s = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, a && t.extend(s, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (o in s) e.style[o] = s[o];
            e.appendChild(r), i = a || document.documentElement, i.insertBefore(e, i.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px;", n = t(r).offset().left, t.support.offsetFractions = n > 10 && 11 > n, e.innerHTML = "", i.removeChild(e)
        }()
}(jQuery),
function(t, e) {
    t.widget("ui.progressbar", {
        version: "1.10.3",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
        },
        value: function(t) {
            return t === e ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), e)
        },
        _constrainedValue: function(t) {
            return t === e && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
        },
        _setOptions: function(t) {
            var e = t.value;
            delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
        },
        _setOption: function(t, e) {
            "max" === t && (e = Math.max(this.min, e)), this._super(t, e)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var e = this.options.value,
                i = this._percentage();
            this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": e
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
        }
    })
}(jQuery),
function(t) {
    var e = 5;
    t.widget("ui.slider", t.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function() {
            var e, i, s = this.options,
                n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                o = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                a = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) a.push(o);
            this.handles = n.add(t(a.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) {
                t(this).data("ui-slider-handle-index", e)
            })
        },
        _createRange: function() {
            var e = this.options,
                i = "";
            e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : this.range = t([])
        },
        _setupEvents: function() {
            var t = this.handles.add(this.range).filter("a");
            this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
        },
        _destroy: function() {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function(e) {
            var i, s, n, o, a, r, h, l, c = this,
                u = this.options;
            return u.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: e.pageX,
                y: e.pageY
            }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                var i = Math.abs(s - c.values(e));
                (n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, o = t(this), a = e)
            }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, o.addClass("ui-state-active").focus(), h = o.offset(), l = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
                left: 0,
                top: 0
            } : {
                left: e.pageX - h.left - o.width() / 2,
                top: e.pageY - h.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(t) {
            var e = {
                    x: t.pageX,
                    y: t.pageY
                },
                i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i), !1
        },
        _mouseStop: function(t) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(t) {
            var e, i, s, n, o;
            return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o)
        },
        _start: function(t, e) {
            var i = {
                handle: this.handles[e],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
        },
        _slide: function(t, e, i) {
            var s, n, o;
            this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > s || 1 === e && s > i) && (i = s), i !== this.values(e) && (n = this.values(), n[e] = i, o = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i,
                values: n
            }), s = this.values(e ? 0 : 1), o !== !1 && this.values(e, i, !0))) : i !== this.value() && (o = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i
            }), o !== !1 && this.value(i))
        },
        _stop: function(t, e) {
            var i = {
                handle: this.handles[e],
                value: this.value()
            };
            this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
        },
        _change: function(t, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
            }
        },
        value: function(t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), undefined) : this._value()
        },
        values: function(e, i) {
            var s, n, o;
            if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), undefined;
            if (!arguments.length) return this._values();
            if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
            for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1) s[o] = this._trimAlignValue(n[o]), this._change(null, o);
            this._refreshValue()
        },
        _setOption: function(e, i) {
            var s, n = 0;
            switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
                    this._animateOff = !1;
                    break;
                case "min":
                case "max":
                    this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function() {
            var t = this.options.value;
            return t = this._trimAlignValue(t)
        },
        _values: function(t) {
            var e, i, s;
            if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
            if (this.options.values && this.options.values.length) {
                for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);
                return i
            }
            return []
        },
        _trimAlignValue: function(t) {
            if (this._valueMin() >= t) return this._valueMin();
            if (t >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1,
                i = (t - this._valueMin()) % e,
                s = t - i;
            return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var e, i, s, n, o, a = this.options.range,
                r = this.options,
                h = this,
                l = this._animateOff ? !1 : r.animate,
                c = {};
            this.options.values && this.options.values.length ? this.handles.each(function(s) {
                i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), c["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[l ? "animate" : "css"](c, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
                    left: i + "%"
                }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
                    width: i - e + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
                    bottom: i + "%"
                }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
                    height: i - e + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                }))), e = i
            }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                width: i + "%"
            }, r.animate), "max" === a && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({
                width: 100 - i + "%"
            }, {
                queue: !1,
                duration: r.animate
            }), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                height: i + "%"
            }, r.animate), "max" === a && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({
                height: 100 - i + "%"
            }, {
                queue: !1,
                duration: r.animate
            }))
        },
        _handleEvents: {
            keydown: function(i) {
                var s, n, o, a, r = t(i.target).data("ui-slider-handle-index");
                switch (i.keyCode) {
                    case t.ui.keyCode.HOME:
                    case t.ui.keyCode.END:
                    case t.ui.keyCode.PAGE_UP:
                    case t.ui.keyCode.PAGE_DOWN:
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass("ui-state-active"), s = this._start(i, r), s === !1)) return
                }
                switch (a = this.options.step, n = o = this.options.values && this.options.values.length ? this.values(r) : this.value(), i.keyCode) {
                    case t.ui.keyCode.HOME:
                        o = this._valueMin();
                        break;
                    case t.ui.keyCode.END:
                        o = this._valueMax();
                        break;
                    case t.ui.keyCode.PAGE_UP:
                        o = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        o = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e);
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                        if (n === this._valueMax()) return;
                        o = this._trimAlignValue(n + a);
                        break;
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (n === this._valueMin()) return;
                        o = this._trimAlignValue(n - a)
                }
                this._slide(i, r, o)
            },
            click: function(t) {
                t.preventDefault()
            },
            keyup: function(e) {
                var i = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
            }
        }
    })
}(jQuery),
function(t) {
    function e(t) {
        return function() {
            var e = this.element.val();
            t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
        }
    }
    t.widget("ui.spinner", {
        version: "1.10.3",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function() {
            var e = {},
                i = this.element;
            return t.each(["min", "max", "step"], function(t, s) {
                var n = i.attr(s);
                void 0 !== n && n.length && (e[s] = n)
            }), e
        },
        _events: {
            keydown: function(t) {
                this._start(t) && this._keydown(t) && t.preventDefault()
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val()
            },
            blur: function(t) {
                return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0)
            },
            mousewheel: function(t, e) {
                if (e) {
                    if (!this.spinning && !this._start(t)) return !1;
                    this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(t)
                    }, 100), t.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(e) {
                function i() {
                    var t = this.element[0] === this.document[0].activeElement;
                    t || (this.element.focus(), this.previous = s, this._delay(function() {
                        this.previous = s
                    }))
                }
                var s;
                s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                    delete this.cancelBlur, i.call(this)
                }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(e) {
                return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
        },
        _keydown: function(e) {
            var i = this.options,
                s = t.ui.keyCode;
            switch (e.keyCode) {
                case s.UP:
                    return this._repeat(null, 1, e), !0;
                case s.DOWN:
                    return this._repeat(null, -1, e), !0;
                case s.PAGE_UP:
                    return this._repeat(null, i.page, e), !0;
                case s.PAGE_DOWN:
                    return this._repeat(null, -i.page, e), !0
            }
            return !1
        },
        _uiSpinnerHtml: function() {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function() {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>"
        },
        _start: function(t) {
            return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function(t, e, i) {
            t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                this._repeat(40, e, i)
            }, t), this._spin(e * this.options.step, i)
        },
        _spin: function(t, e) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {
                value: i
            }) === !1 || (this._value(i), this.counter++)
        },
        _increment: function(e) {
            var i = this.options.incremental;
            return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
        },
        _precisionOf: function(t) {
            var e = "" + t,
                i = e.indexOf(".");
            return -1 === i ? 0 : e.length - i - 1
        },
        _adjustValue: function(t) {
            var e, i, s = this.options;
            return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t
        },
        _stop: function(t) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
        },
        _setOption: function(t, e) {
            if ("culture" === t || "numberFormat" === t) {
                var i = this._parse(this.element.val());
                return this.options[t] = e, this.element.val(this._format(i)), void 0
            }("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (e ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
        },
        _setOptions: e(function(t) {
            this._super(t), this._value(this.element.val())
        }),
        _parse: function(t) {
            return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
        },
        _format: function(t) {
            return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function(t, e) {
            var i;
            "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
        },
        _destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
        },
        stepUp: e(function(t) {
            this._stepUp(t)
        }),
        _stepUp: function(t) {
            this._start() && (this._spin((t || 1) * this.options.step), this._stop())
        },
        stepDown: e(function(t) {
            this._stepDown(t)
        }),
        _stepDown: function(t) {
            this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
        },
        pageUp: e(function(t) {
            this._stepUp((t || 1) * this.options.page)
        }),
        pageDown: e(function(t) {
            this._stepDown((t || 1) * this.options.page)
        }),
        value: function(t) {
            return arguments.length ? (e(this._value).call(this, t), void 0) : this._parse(this.element.val())
        },
        widget: function() {
            return this.uiSpinner
        }
    })
}(jQuery),
function(t, e) {
    function i() {
        return ++n
    }

    function s(t) {
        return t.hash.length > 1 && decodeURIComponent(t.href.replace(o, "")) === decodeURIComponent(location.href.replace(o, ""))
    }
    var n = 0,
        o = /#.*$/;
    t.widget("ui.tabs", {
        version: "1.10.3",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function() {
            var e = this,
                i = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e) {
                t(this).is(".ui-state-disabled") && e.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                t(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                return e.tabs.index(t)
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
        },
        _initialActive: function() {
            var i = this.options.active,
                s = this.options.collapsible,
                n = location.hash.substring(1);
            return null === i && (n && this.tabs.each(function(s, o) {
                return t(o).attr("aria-controls") === n ? (i = s, !1) : e
            }), null === i && (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)), i !== !1 && (i = this.tabs.index(this.tabs.eq(i)), -1 === i && (i = s ? !1 : 0)), !s && i === !1 && this.anchors.length && (i = 0), i
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : t()
            }
        },
        _tabKeydown: function(i) {
            var s = t(this.document[0].activeElement).closest("li"),
                n = this.tabs.index(s),
                o = !0;
            if (!this._handlePageNav(i)) {
                switch (i.keyCode) {
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                        n++;
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.LEFT:
                        o = !1, n--;
                        break;
                    case t.ui.keyCode.END:
                        n = this.anchors.length - 1;
                        break;
                    case t.ui.keyCode.HOME:
                        n = 0;
                        break;
                    case t.ui.keyCode.SPACE:
                        return i.preventDefault(), clearTimeout(this.activating), this._activate(n), e;
                    case t.ui.keyCode.ENTER:
                        return i.preventDefault(), clearTimeout(this.activating), this._activate(n === this.options.active ? !1 : n), e;
                    default:
                        return
                }
                i.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, o), i.ctrlKey || (s.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", n)
                }, this.delay))
            }
        },
        _panelKeydown: function(e) {
            this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
        },
        _handlePageNav: function(i) {
            return i.altKey && i.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : i.altKey && i.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : e
        },
        _findNextTab: function(e, i) {
            function s() {
                return e > n && (e = 0), 0 > e && (e = n), e
            }
            for (var n = this.tabs.length - 1; - 1 !== t.inArray(s(), this.options.disabled);) e = i ? e + 1 : e - 1;
            return e
        },
        _focusNextTab: function(t, e) {
            return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
        },
        _setOption: function(t, i) {
            return "active" === t ? (this._activate(i), e) : "disabled" === t ? (this._setupDisabled(i), e) : (this._super(t, i), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", i), i || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(i), "heightStyle" === t && this._setupHeightStyle(i), e)
        },
        _tabId: function(t) {
            return t.attr("aria-controls") || "ui-tabs-" + i()
        },
        _sanitizeSelector: function(t) {
            return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var e = this.options,
                i = this.tablist.children(":has(a[href])");
            e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                return i.index(t)
            }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var e = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function() {
                return t("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = t(), this.anchors.each(function(i, n) {
                var o, a, r, h = t(n).uniqueId().attr("id"),
                    l = t(n).closest("li"),
                    c = l.attr("aria-controls");
                s(n) ? (o = n.hash, a = e.element.find(e._sanitizeSelector(o))) : (r = e._tabId(l), o = "#" + r, a = e.element.find(o), a.length || (a = e._createPanel(r), a.insertAfter(e.panels[i - 1] || e.tablist)), a.attr("aria-live", "polite")), a.length && (e.panels = e.panels.add(a)), c && l.data("ui-tabs-aria-controls", c), l.attr({
                    "aria-controls": o.substring(1),
                    "aria-labelledby": h
                }), a.attr("aria-labelledby", h)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function() {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(e) {
            return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(e) {
            t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
            for (var i, s = 0; i = this.tabs[s]; s++) e === !0 || -1 !== t.inArray(s, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = e
        },
        _setupEvents: function(e) {
            var i = {
                click: function(t) {
                    t.preventDefault()
                }
            };
            e && t.each(e.split(" "), function(t, e) {
                i[e] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(e) {
            var i, s = this.element.parent();
            "fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var e = t(this),
                    s = e.css("position");
                "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function() {
                i -= t(this).outerHeight(!0)
            }), this.panels.each(function() {
                t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                i = Math.max(i, t(this).height("").height())
            }).height(i))
        },
        _eventHandler: function(e) {
            var i = this.options,
                s = this.active,
                n = t(e.currentTarget),
                o = n.closest("li"),
                a = o[0] === s[0],
                r = a && i.collapsible,
                h = r ? t() : this._getPanelForTab(o),
                l = s.length ? this._getPanelForTab(s) : t(),
                c = {
                    oldTab: s,
                    oldPanel: l,
                    newTab: r ? t() : o,
                    newPanel: h
                };
            e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(o), e), this._toggle(e, c))
        },
        _toggle: function(e, i) {
            function s() {
                o.running = !1, o._trigger("activate", e, i)
            }

            function n() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && o.options.show ? o._show(a, o.options.show, s) : (a.show(), s())
            }
            var o = this,
                a = i.newPanel,
                r = i.oldPanel;
            this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), i.oldTab.attr("aria-selected", "false"), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1), a.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }), i.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function(e) {
            var i, s = this._findActive(e);
            s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return e === !1 ? t() : this.tabs.eq(e)
        },
        _getIndex: function(t) {
            return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function() {
                var e = t(this),
                    i = e.data("ui-tabs-aria-controls");
                i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(i) {
            var s = this.options.disabled;
            s !== !1 && (i === e ? s = !1 : (i = this._getIndex(i), s = t.isArray(s) ? t.map(s, function(t) {
                return t !== i ? t : null
            }) : t.map(this.tabs, function(t, e) {
                return e !== i ? e : null
            })), this._setupDisabled(s))
        },
        disable: function(i) {
            var s = this.options.disabled;
            if (s !== !0) {
                if (i === e) s = !0;
                else {
                    if (i = this._getIndex(i), -1 !== t.inArray(i, s)) return;
                    s = t.isArray(s) ? t.merge([i], s).sort() : [i]
                }
                this._setupDisabled(s)
            }
        },
        load: function(e, i) {
            e = this._getIndex(e);
            var n = this,
                o = this.tabs.eq(e),
                a = o.find(".ui-tabs-anchor"),
                r = this._getPanelForTab(o),
                h = {
                    tab: o,
                    panel: r
                };
            s(a[0]) || (this.xhr = t.ajax(this._ajaxSettings(a, i, h)), this.xhr && "canceled" !== this.xhr.statusText && (o.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.success(function(t) {
                setTimeout(function() {
                    r.html(t), n._trigger("load", i, h)
                }, 1)
            }).complete(function(t, e) {
                setTimeout(function() {
                    "abort" === e && n.panels.stop(!1, !0), o.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), t === n.xhr && delete n.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function(e, i, s) {
            var n = this;
            return {
                url: e.attr("href"),
                beforeSend: function(e, o) {
                    return n._trigger("beforeLoad", i, t.extend({
                        jqXHR: e,
                        ajaxSettings: o
                    }, s))
                }
            }
        },
        _getPanelForTab: function(e) {
            var i = t(e).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    })
}(jQuery),
function(t) {
    function e(e, i) {
        var s = (e.attr("aria-describedby") || "").split(/\s+/);
        s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")))
    }

    function i(e) {
        var i = e.data("ui-tooltip-id"),
            s = (e.attr("aria-describedby") || "").split(/\s+/),
            n = t.inArray(i, s); - 1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby")
    }
    var s = 0;
    t.widget("ui.tooltip", {
        version: "1.10.3",
        options: {
            content: function() {
                var e = t(this).attr("title") || "";
                return t("<a>").text(e).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
        },
        _setOption: function(e, i) {
            var s = this;
            return "disabled" === e ? (this[i ? "_disable" : "_enable"](), this.options[e] = i, void 0) : (this._super(e, i), "content" === e && t.each(this.tooltips, function(t, e) {
                s._updateContent(e)
            }), void 0)
        },
        _disable: function() {
            var e = this;
            t.each(this.tooltips, function(i, s) {
                var n = t.Event("blur");
                n.target = n.currentTarget = s[0], e.close(n, !0)
            }), this.element.find(this.options.items).addBack().each(function() {
                var e = t(this);
                e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).attr("title", "")
            })
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var e = t(this);
                e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
            })
        },
        open: function(e) {
            var i = this,
                s = t(e ? e.target : this.element).closest(this.options.items);
            s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function() {
                var e, s = t(this);
                s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {
                    element: this,
                    title: s.attr("title")
                }, s.attr("title", ""))
            }), this._updateContent(s, e))
        },
        _updateContent: function(t, e) {
            var i, s = this.options.content,
                n = this,
                o = e ? e.type : null;
            return "string" == typeof s ? this._open(e, t, s) : (i = s.call(t[0], function(i) {
                t.data("ui-tooltip-open") && n._delay(function() {
                    e && (e.type = o), this._open(e, t, i)
                })
            }), i && this._open(e, t, i), void 0)
        },
        _open: function(i, s, n) {
            function o(t) {
                l.of = t, a.is(":hidden") || a.position(l)
            }
            var a, r, h, l = t.extend({}, this.options.position);
            if (n) {
                if (a = this._find(s), a.length) return a.find(".ui-tooltip-content").html(n), void 0;
                s.is("[title]") && (i && "mouseover" === i.type ? s.attr("title", "") : s.removeAttr("title")), a = this._tooltip(s), e(s, a.attr("id")), a.find(".ui-tooltip-content").html(n), this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {
                    mousemove: o
                }), o(i)) : a.position(t.extend({
                    of: s
                }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
                    a.is(":visible") && (o(l.of), clearInterval(h))
                }, t.fx.interval)), this._trigger("open", i, {
                    tooltip: a
                }), r = {
                    keyup: function(e) {
                        if (e.keyCode === t.ui.keyCode.ESCAPE) {
                            var i = t.Event(e);
                            i.currentTarget = s[0], this.close(i, !0)
                        }
                    },
                    remove: function() {
                        this._removeTooltip(a)
                    }
                }, i && "mouseover" !== i.type || (r.mouseleave = "close"), i && "focusin" !== i.type || (r.focusout = "close"), this._on(!0, s, r)
            }
        },
        close: function(e) {
            var s = this,
                n = t(e ? e.currentTarget : this.element),
                o = this._find(n);
            this.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && n.attr("title", n.data("ui-tooltip-title")), i(n), o.stop(!0), this._hide(o, this.options.hide, function() {
                s._removeTooltip(t(this))
            }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
                t(i.element).attr("title", i.title), delete s.parents[e]
            }), this.closing = !0, this._trigger("close", e, {
                tooltip: o
            }), this.closing = !1)
        },
        _tooltip: function(e) {
            var i = "ui-tooltip-" + s++,
                n = t("<div>").attr({
                    id: i,
                    role: "tooltip"
                }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return t("<div>").addClass("ui-tooltip-content").appendTo(n), n.appendTo(this.document[0].body), this.tooltips[i] = e, n
        },
        _find: function(e) {
            var i = e.data("ui-tooltip-id");
            return i ? t("#" + i) : t()
        },
        _removeTooltip: function(t) {
            t.remove(), delete this.tooltips[t.attr("id")]
        },
        _destroy: function() {
            var e = this;
            t.each(this.tooltips, function(i, s) {
                var n = t.Event("blur");
                n.target = n.currentTarget = s[0], e.close(n, !0), t("#" + i).remove(), s.data("ui-tooltip-title") && (s.attr("title", s.data("ui-tooltip-title")), s.removeData("ui-tooltip-title"))
            })
        }
    })
}(jQuery);
"use strict";
if (!("bind" in Function.prototype)) {
    Function.prototype.bind = function(owner) {
        var that = this;
        if (arguments.length <= 1) {
            return function() {
                return that.apply(owner, arguments)
            }
        } else {
            var args = Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply(owner, arguments.length === 0 ? args : args.concat(Array.prototype.slice.call(arguments)))
            }
        }
    }
}
if (!("trim" in String.prototype)) {
    String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }
}
if (!("indexOf" in Array.prototype)) {
    Array.prototype.indexOf = function(find, i) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find) return i;
        return -1
    }
}
if (!("lastIndexOf" in Array.prototype)) {
    Array.prototype.lastIndexOf = function(find, i) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length - 1) i = this.length - 1;
        for (i++; i-- > 0;)
            if (i in this && this[i] === find) return i;
        return -1
    }
}
if (!("forEach" in Array.prototype)) {
    Array.prototype.forEach = function(action, that) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this) action.call(that, this[i], i, this)
    }
}
if (!("map" in Array.prototype)) {
    Array.prototype.map = function(mapper, that) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this) other[i] = mapper.call(that, this[i], i, this);
        return other
    }
}
if (!("filter" in Array.prototype)) {
    Array.prototype.filter = function(filter, that) {
        var other = [],
            v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && filter.call(that, v = this[i], i, this)) other.push(v);
        return other
    }
}
if (!("every" in Array.prototype)) {
    Array.prototype.every = function(tester, that) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && !tester.call(that, this[i], i, this)) return false;
        return true
    }
}
if (!("some" in Array.prototype)) {
    Array.prototype.some = function(tester, that) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && tester.call(that, this[i], i, this)) return true;
        return false
    }
}(function() {
    var method;
    var noop = function() {};
    var methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
    var length = methods.length;
    var console = window.console = window.console || {};
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop
        }
    }
})();
(function($, undefined) {
    $.widget("accordiona.accordionA", {
        options: {
            section: "> section",
            header: "> header",
            content: "> .content"
        },
        _create: function() {
            this.$window = $(window);
            this.$document = $(document);
            this.sections = this.element.find(this.options.section);
            this.html = $("html").addClass("js");
            this.element.attr("role", "tablist").delegate(this.sections.prop("nodeName") + " " + this.options.header, "click focus blur".split(" ").concat("").join("." + this.namespace + " "), $.proxy(function(event) {
                var section = $(event.target).closest(this.sections),
                    header = section.find(this.options.header),
                    content = section.find(this.options.content);
                switch (event.type) {
                    case "click":
                        header.addClass("no-outline");
                        this.toggle(section);
                        break;
                    case "focusin":
                        section.bind("keydown." + this.namespace, $.proxy(function(event) {
                            switch (event.keyCode) {
                                case 9:
                                    header.removeClass("no-outline");
                                    break;
                                case 32:
                                    event.preventDefault();
                                    this.toggle(section);
                                    break
                            }
                        }, this));
                        break;
                    case "focusout":
                        section.unbind("keydown." + this.namespace);
                        break
                }
            }, this));
            this.sections.filter('[aria-expanded="true"]:not(:first)').removeAttr("aria-expanded");
            this.sections.each($.proxy(function(i, current) {
                var section = $(current),
                    content = section.find(this.options.content);
                section.find(this.options.header).attr({
                    role: "tab",
                    tabindex: 0
                });
                content.attr("role", "tabpanel").data(this.namespace, {
                    height: content.height()
                }).addClass("no-transition");
                this.toggle(section, section.attr("aria-expanded") === "true");
                setTimeout(function() {
                    content.removeClass("no-transition")
                })
            }, this));
            this._hash()
        },
        destroy: function() {
            this.$window.unbind(this.namespace);
            this.$document.undelegate(this.namespace);
            this.element.undelegate(this.namespace);
            $.Widget.prototype.destroy.call(this)
        },
        refresh: function() {
            $.Widget.prototype.destroy.call(this);
            $.Widget.prototype._create.call(this)
        },
        toggle: function(selector, expand) {
            if (!selector.jquery) switch (typeof selector) {
                case "object":
                    selector = $(selector);
                    break;
                case "string":
                    selector = this.element.find(selector);
                    break;
                case "number":
                    selector = this.sections.eq(selector);
                    break
            }
            if (selector.length) {
                if (typeof expand !== "boolean") expand = selector.attr("aria-expanded") !== "true";
                if (expand) this.toggle(this.sections.filter('[aria-expanded="true"]'), false);
                var content = selector.attr("aria-expanded", expand).toggleClass("expanded", expand).find(this.options.content);
                var totalHeight = 0;
                if (expand) {
                    for (var i = this.sections.length - 1; i >= 0; i--) {
                        if ($(this.sections[i]).hasClass("expanded")) {
                            $(this.sections[i]).find(".content").children().each(function() {
                                totalHeight += $(this).outerHeight(true)
                            })
                        }
                    }
                }
                content.height(expand ? totalHeight : 0);
                this._trigger("toggle", null, {
                    expand: expand
                })
            }
            return this
        },
        _hash: function() {
            if (location.hash) this._expandHash(location.hash);
            this.$document.delegate('a[href^="#"]:not([href="#"])', "click." + this.namespace, $.proxy(function(event) {
                this._expandHash($(event.target).attr("href"))
            }, this));
            this.$window.bind("hashchange." + this.namespace, $.proxy(function() {
                this._expandHash(location.hash)
            }, this))
        },
        _expandHash: function(hash) {
            var target = this.element.find(hash);
            if (target.length) {
                var scroll = this.$document.height() > this.$window.height();
                scroll && this.element.addClass("no-transition");
                this.toggle(target.closest(this.sections), true);
                scroll && setTimeout($.proxy(function() {
                    this.element.removeClass("no-transition")
                }, this))
            }
        }
    })
})(jQuery);
! function(l) {
    ! function(L) {
        if (!L.browser) {
            var I = L.browser = {},
                K = navigator.userAgent.toLowerCase(),
                J = /(chrome)[ \/]([\w.]+)/.exec(K) || /(safari)[ \/]([\w.]+)/.exec(K) || /(webkit)[ \/]([\w.]+)/.exec(K) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(K) || /(msie) ([\w.]+)/.exec(K) || K.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(K) || [];
            if (J[1]) {
                I[J[1]] = true;
                I.version = J[2] || "0"
            }
        }
    }(jQuery);
    l(function() {
        if (typeof l.fn.flowplayer == "function") {
            l("video").parent(".flowplayer").flowplayer()
        }
    });
    var h = [],
        F = [],
        u = window.navigator.userAgent;
    window.flowplayer = function(I) {
        return l.isFunction(I) ? F.push(I) : typeof I == "number" || I === undefined ? h[I || 0] : l(I).data("flowplayer")
    };
    l(window).on("beforeunload", function() {
        l.each(h, function(I, J) {
            if (J.conf.splash) {
                J.unload()
            } else {
                J.bind("error", function() {
                    l(".flowplayer.is-error .fp-message").remove()
                })
            }
        })
    });
    var k = false;
    try {
        if (typeof window.localStorage == "object") {
            window.localStorage.flowplayerTestStorage = "test";
            k = true
        }
    } catch (e) {}
    l.extend(flowplayer, {
        version: "5.4.6",
        engine: {},
        conf: {},
        support: {},
        defaults: {
            debug: false,
            disabled: false,
            engine: "html5",
            fullscreen: window == window.top,
            keyboard: true,
            ratio: 9 / 16,
            adaptiveRatio: false,
            flashfit: false,
            rtmp: 0,
            splash: false,
            live: false,
            swf: "//releases.flowplayer.org/5.4.6/commercial/flowplayer.swf",
            speeds: [.25, .5, 1, 1.5, 2],
            tooltip: true,
            volume: !k ? 1 : localStorage.muted == "true" ? 0 : !isNaN(localStorage.volume) ? localStorage.volume || 1 : 1,
            errors: ["", "Video loading aborted", "Network error", "Video not properly encoded", "Video file not found", "Unsupported video", "Skin not found", "SWF file not found", "Subtitles not found", "Invalid RTMP URL", "Unsupported video format. Try installing Adobe Flash."],
            errorUrls: ["", "", "", "", "", "", "", "", "", "", "http://get.adobe.com/flashplayer/"],
            playlist: []
        }
    });
    var n = 1;
    l.fn.flowplayer = function(I, J) {
        if (typeof I == "string") {
            I = {
                swf: I
            }
        }
        if (l.isFunction(I)) {
            J = I;
            I = {}
        }
        return !I && this.data("flowplayer") || this.each(function() {
            var U = l(this).addClass("is-loading"),
                Q = l.extend({}, flowplayer.defaults, flowplayer.conf, I, U.data()),
                R = l("video", U).addClass("fp-engine").removeAttr("controls"),
                W = R.length ? new s(R) : null,
                O = {},
                M, S;
            if (Q.playlist.length) {
                var T = R.attr("preload"),
                    V;
                if (R.length) {
                    R.replaceWith(V = l("<p />"))
                }
                R = l("<video />").addClass("fp-engine");
                V ? V.replaceWith(R) : U.prepend(R);
                if (flowplayer.support.video) {
                    R.attr("preload", T)
                }
                if (typeof Q.playlist[0] === "string") {
                    R.attr("src", Q.playlist[0])
                } else {
                    l.each(Q.playlist[0], function(Y, X) {
                        for (var Z in X) {
                            if (X.hasOwnProperty(Z)) {
                                R.append(l("<source />").attr({
                                    type: "video/" + Z,
                                    src: X[Z]
                                }))
                            }
                        }
                    })
                }
                W = new s(R)
            }
            var L = U.data("flowplayer");
            if (L) {
                L.unload()
            }
            U.data("fp-player_id", U.data("fp-player_id") || n++);
            try {
                O = window.localStorage || O
            } catch (P) {}
            var K = this.currentStyle && this.currentStyle.direction === "rtl" || window.getComputedStyle && window.getComputedStyle(this, null).getPropertyValue("direction") === "rtl";
            if (K) {
                U.addClass("is-rtl")
            }
            var N = L || {
                conf: Q,
                currentSpeed: 1,
                volumeLevel: typeof Q.volume === "undefined" ? O.volume * 1 : Q.volume,
                video: {},
                disabled: false,
                finished: false,
                loading: false,
                muted: O.muted == "true" || Q.muted,
                paused: false,
                playing: false,
                ready: false,
                splash: false,
                rtl: K,
                load: function(X, Z) {
                    if (N.error || N.loading || N.disabled) {
                        return
                    }
                    X = W.resolve(X);
                    l.extend(X, S.pick(X.sources));
                    if (X.src) {
                        var Y = l.Event("load");
                        U.trigger(Y, [N, X, S]);
                        if (!Y.isDefaultPrevented()) {
                            S.load(X);
                            if (l.isFunction(X)) {
                                Z = X
                            }
                            if (Z) {
                                U.one("ready", Z)
                            }
                        } else {
                            N.loading = false
                        }
                    }
                    return N
                },
                pause: function(X) {
                    if (N.ready && !N.seeking && !N.disabled && !N.loading) {
                        S.pause();
                        N.one("pause", X)
                    }
                    return N
                },
                resume: function() {
                    if (N.ready && N.paused && !N.disabled) {
                        S.resume();
                        if (N.finished) {
                            N.trigger("resume", [N]);
                            N.finished = false
                        }
                    }
                    return N
                },
                toggle: function() {
                    return N.ready ? N.paused ? N.resume() : N.pause() : N.load()
                },
                seek: function(Y, aa) {
                    if (N.ready) {
                        if (typeof Y == "boolean") {
                            var Z = N.video.duration * .1;
                            Y = N.video.time + (Y ? Z : -Z)
                        }
                        Y = M = Math.min(Math.max(Y, 0), N.video.duration).toFixed(1);
                        var X = l.Event("beforeseek");
                        U.trigger(X, [N, Y]);
                        if (!X.isDefaultPrevented()) {
                            S.seek(Y);
                            if (l.isFunction(aa)) {
                                U.one("seek", aa)
                            }
                        } else {
                            N.seeking = false;
                            U.toggleClass("is-seeking", N.seeking)
                        }
                    }
                    return N
                },
                seekTo: function(X, Y) {
                    var Z = X === undefined ? M : N.video.duration * .1 * X;
                    return N.seek(Z, Y)
                },
                mute: function(X) {
                    if (X === undefined) {
                        X = !N.muted
                    }
                    O.muted = N.muted = X;
                    O.volume = !isNaN(O.volume) ? O.volume : Q.volume;
                    N.volume(X ? 0 : O.volume, true);
                    N.trigger("mute", X);
                    return N
                },
                volume: function(Y, X) {
                    if (N.ready) {
                        Y = Math.min(Math.max(Y, 0), 1);
                        if (!X) {
                            O.volume = Y
                        }
                        S.volume(Y)
                    }
                    return N
                },
                speed: function(X, Y) {
                    if (N.ready) {
                        if (typeof X == "boolean") {
                            X = Q.speeds[l.inArray(N.currentSpeed, Q.speeds) + (X ? 1 : -1)] || N.currentSpeed
                        }
                        S.speed(X);
                        if (Y) {
                            U.one("speed", Y)
                        }
                    }
                    return N
                },
                stop: function() {
                    if (N.ready) {
                        N.pause();
                        N.seek(0, function() {
                            U.trigger("stop")
                        })
                    }
                    return N
                },
                unload: function() {
                    if (!U.hasClass("is-embedding")) {
                        if (Q.splash) {
                            N.trigger("unload");
                            S.unload()
                        } else {
                            N.stop()
                        }
                    }
                    return N
                },
                disable: function(X) {
                    if (X === undefined) {
                        X = !N.disabled
                    }
                    if (X != N.disabled) {
                        N.disabled = X;
                        N.trigger("disable", X)
                    }
                    return N
                }
            };
            N.conf = l.extend(N.conf, Q);
            l.each(["bind", "one", "unbind"], function(Y, X) {
                N[X] = function(aa, Z) {
                    U[X](aa, Z);
                    return N
                }
            });
            N.trigger = function(Y, X) {
                U.trigger(Y, [N, X]);
                return N
            };
            if (!U.data("flowplayer")) {
                U.bind("boot", function() {
                    l.each(["autoplay", "loop", "preload", "poster"], function(Y, X) {
                        var Z = R.attr(X);
                        if (Z !== undefined) {
                            Q[X] = Z ? Z : true
                        }
                    });
                    if (Q.splash || U.hasClass("is-splash") || !flowplayer.support.firstframe) {
                        N.forcedSplash = !Q.splash && !U.hasClass("is-splash");
                        N.splash = Q.splash = Q.autoplay = true;
                        U.addClass("is-splash");
                        if (flowplayer.support.video) {
                            R.attr("preload", "none")
                        }
                    }
                    if (Q.live || U.hasClass("is-live")) {
                        N.live = Q.live = true;
                        U.addClass("is-live")
                    }
                    l.each(F, function(X) {
                        this(N, U)
                    });
                    S = flowplayer.engine[Q.engine];
                    if (S) {
                        S = S(N, U)
                    }
                    if (S.pick(W.initialSources)) {
                        N.engine = Q.engine
                    } else {
                        l.each(flowplayer.engine, function(Y, X) {
                            if (Y != Q.engine) {
                                S = this(N, U);
                                if (S.pick(W.initialSources)) {
                                    N.engine = Y
                                }
                                return false
                            }
                        })
                    }
                    h.push(N);
                    if (!N.engine) {
                        return N.trigger("error", {
                            code: flowplayer.support.flashVideo ? 5 : 10
                        })
                    }
                    Q.splash ? N.unload() : N.load();
                    if (Q.disabled) {
                        N.disable()
                    }
                    S.volume(N.volumeLevel);
                    U.one("ready", J)
                }).bind("load", function(Z, X, Y) {
                    if (Q.splash) {
                        l(".flowplayer").filter(".is-ready, .is-loading").not(U).each(function() {
                            var aa = l(this).data("flowplayer");
                            if (aa.conf.splash) {
                                aa.unload()
                            }
                        })
                    }
                    U.addClass("is-loading");
                    X.loading = true
                }).bind("ready", function(Z, X, Y) {
                    Y.time = 0;
                    X.video = Y;

                    function aa() {
                        U.removeClass("is-loading");
                        X.loading = false
                    }
                    if (Q.splash) {
                        U.one("progress", aa)
                    } else {
                        aa()
                    }
                    if (X.muted) {
                        X.mute(true)
                    } else {
                        X.volume(X.volumeLevel)
                    }
                }).bind("unload", function(X) {
                    if (Q.splash) {
                        R.remove()
                    }
                    U.removeClass("is-loading");
                    N.loading = false
                }).bind("ready unload", function(Y) {
                    var X = Y.type == "ready";
                    U.toggleClass("is-splash", !X).toggleClass("is-ready", X);
                    N.ready = X;
                    N.splash = !X
                }).bind("progress", function(Z, X, Y) {
                    X.video.time = Y
                }).bind("speed", function(Y, X, Z) {
                    X.currentSpeed = Z
                }).bind("volume", function(Y, X, Z) {
                    X.volumeLevel = Math.round(Z * 100) / 100;
                    if (!X.muted) {
                        O.volume = Z
                    } else {
                        if (Z) {
                            X.mute(false)
                        }
                    }
                }).bind("beforeseek seek", function(X) {
                    N.seeking = X.type == "beforeseek";
                    U.toggleClass("is-seeking", N.seeking)
                }).bind("ready pause resume unload finish stop", function(Z, Y, X) {
                    N.paused = /pause|finish|unload|stop/.test(Z.type);
                    if (Z.type == "ready") {
                        N.paused = Q.preload == "none";
                        if (X) {
                            N.paused = !X.duration || !Q.autoplay && Q.preload != "none"
                        }
                    }
                    N.playing = !N.paused;
                    U.toggleClass("is-paused", N.paused).toggleClass("is-playing", N.playing);
                    if (!N.load.ed) {
                        N.pause()
                    }
                }).bind("finish", function(X) {
                    N.finished = true
                }).bind("error", function() {
                    R.remove()
                })
            }
            U.trigger("boot", [N, U]).data("flowplayer", N)
        })
    };
    ! function() {
        var O = function(ab) {
            var ac = /Version\/(\d\.\d)/.exec(ab);
            if (ac && ac.length > 1) {
                return parseFloat(ac[1], 10)
            }
            return 0
        };
        var Q = flowplayer.support,
            Y = l.browser,
            U = l("<video loop autoplay preload/>")[0],
            N = Y.msie,
            R = navigator.userAgent,
            T = /iPad|MeeGo/.test(R) && !/CriOS/.test(R),
            P = /iPad/.test(R) && /CriOS/.test(R),
            S = /iP(hone|od)/i.test(R) && !/iPad/.test(R),
            M = /Android/.test(R) && !/Firefox/.test(R),
            V = /Android/.test(R) && /Firefox/.test(R),
            aa = /Silk/.test(R),
            X = /IEMobile/.test(R),
            Z = T ? O(R) : 0,
            J = M ? parseFloat(/Android\ (\d\.\d)/.exec(R)[1], 10) : 0;
        l.extend(Q, {
            subtitles: !!U.addTextTrack,
            fullscreen: !M && (typeof document.webkitCancelFullScreen == "function" && !/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(R) || document.mozFullScreenEnabled || typeof document.exitFullscreen == "function"),
            inlineBlock: !(N && Y.version < 8),
            touch: "ontouchstart" in window,
            dataload: !T && !S && !X,
            zeropreload: !N && !M,
            volume: !T && !M && !S && !aa && !P,
            cachedVideoTag: !T && !S && !P && !X,
            firstframe: !S && !T && !M && !aa && !P && !X && !V,
            inlineVideo: !S && !X && (!M || J >= 3),
            hlsDuration: !Y.safari || T || S || P,
            seekable: !T && !P
        });
        try {
            var K = navigator.plugins["Shockwave Flash"],
                L = N ? new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version") : K.description;
            if (!N && !K[0].enabledPlugin) {
                Q.flashVideo = false
            } else {
                L = L.split(/\D+/);
                if (L.length && !L[0]) {
                    L = L.slice(1)
                }
                Q.flashVideo = L[0] > 9 || L[0] == 9 && L[3] >= 115
            }
        } catch (I) {}
        try {
            Q.video = !!U.canPlayType;
            Q.video && U.canPlayType("video/mp4")
        } catch (W) {
            Q.video = false
        }
        Q.animation = function() {
            var ad = ["", "Webkit", "Moz", "O", "ms", "Khtml"],
                ac = l("<p/>")[0];
            for (var ab = 0; ab < ad.length; ab++) {
                if (ac.style[ad[ab] + "AnimationName"] !== "undefined") {
                    return true
                }
            }
        }()
    }();

    function b(K, J) {
        var M = "obj" + ("" + Math.random()).slice(2, 15),
            I = '<object class="fp-engine" id="' + M + '" name="' + M + '" ';
        I += l.browser.msie ? 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' : ' data="' + K + '" type="application/x-shockwave-flash">';
        var L = {
            width: "100%",
            height: "100%",
            allowscriptaccess: "always",
            wmode: "transparent",
            quality: "high",
            flashvars: "",
            movie: K + (l.browser.msie ? "?" + M : ""),
            name: M
        };
        l.each(J, function(N, O) {
            L.flashvars += N + "=" + O + "&"
        });
        l.each(L, function(N, O) {
            I += '<param name="' + N + '" value="' + O + '"/>'
        });
        I += "</object>";
        return l(I)
    }
    if (window.attachEvent) {
        window.attachEvent("onbeforeunload", function() {
            __flash_savedUnloadHandler = __flash_unloadHandler = function() {}
        })
    }
    flowplayer.engine.flash = function(Q, P) {
        var N = Q.conf,
            J = Q.video,
            I, K, M;
        var O = {
            pick: function(S) {
                if (flowplayer.support.flashVideo) {
                    var R = l.grep(S, function(V) {
                        return V.type == "flash"
                    })[0];
                    if (R) {
                        return R
                    }
                    for (var T = 0, U; T < S.length; T++) {
                        U = S[T];
                        if (/mp4|flv/.test(U.type)) {
                            return U
                        }
                    }
                }
            },
            load: function(X) {
                function S(Z) {
                    return Z.replace(/&amp;/g, "%26").replace(/&/g, "%26").replace(/=/g, "%3D")
                }
                var W = l("video", P),
                    U = S(X.src);
                is_absolute = /^https?:/.test(U);
                try {
                    if (W.length > 0 && flowplayer.support.video) {
                        W[0].pause()
                    }
                } catch (Y) {}
                var R = function() {
                    W.remove()
                };
                var T = function(Z) {
                    return l.grep(Z, function(aa) {
                        return !!W[0].canPlayType("video/" + aa.type)
                    }).length > 0
                };
                if (flowplayer.support.video && W.prop("autoplay") && T(X.sources)) {
                    W.one("timeupdate", R)
                } else {
                    R()
                }
                if (!is_absolute && !N.rtmp) {
                    U = l("<img/>").attr("src", U)[0].src
                }
                if (M) {
                    M.__play(U)
                } else {
                    I = "fp" + ("" + Math.random()).slice(3, 15);
                    var V = {
                        hostname: N.embedded ? N.hostname : location.hostname,
                        url: U,
                        callback: "jQuery." + I
                    };
                    if (P.data("origin")) {
                        V.origin = P.data("origin")
                    }
                    if (is_absolute) {
                        delete N.rtmp
                    }
                    l.each(["key", "autoplay", "preload", "rtmp", "loop", "debug", "preload", "splash", "bufferTime"], function(aa, Z) {
                        if (N[Z]) {
                            V[Z] = N[Z]
                        }
                    });
                    if (V.rtmp) {
                        V.rtmp = S(V.rtmp)
                    }
                    K = b(N.swf, V);
                    K.prependTo(P);
                    M = K[0];
                    setTimeout(function() {
                        try {
                            if (!M.PercentLoaded()) {
                                return P.trigger("error", [Q, {
                                    code: 7,
                                    url: N.swf
                                }])
                            }
                        } catch (Z) {}
                    }, 5e3);
                    setTimeout(function() {
                        if (typeof M.PercentLoaded === "undefined") {
                            P.trigger("flashdisabled", [Q])
                        }
                    }, 1e3);
                    l[I] = function(aa, Z) {
                        if (N.debug && aa != "status") {
                            console.log("--", aa, Z)
                        }
                        var ab = l.Event(aa);
                        switch (aa) {
                            case "ready":
                                Z = l.extend(X, Z);
                                break;
                            case "click":
                                ab.flash = true;
                                break;
                            case "keydown":
                                ab.which = Z;
                                break;
                            case "seek":
                                X.time = Z;
                                break;
                            case "status":
                                Q.trigger("progress", Z.time);
                                if (Z.buffer < X.bytes && !X.buffered) {
                                    X.buffer = Z.buffer / X.bytes * X.duration;
                                    Q.trigger("buffer", X.buffer)
                                } else {
                                    if (!X.buffered) {
                                        X.buffered = true;
                                        Q.trigger("buffered")
                                    }
                                }
                                break
                        }
                        if (aa != "buffered") {
                            setTimeout(function() {
                                Q.trigger(ab, Z)
                            }, 1)
                        }
                    }
                }
            },
            speed: l.noop,
            unload: function() {
                M && M.__unload && M.__unload();
                delete l[I];
                l("object", P).remove();
                M = 0
            }
        };
        l.each("pause,resume,seek,volume".split(","), function(S, R) {
            O[R] = function(T) {
                try {
                    if (Q.ready) {
                        if (R == "seek" && Q.video.time && !Q.paused) {
                            Q.trigger("beforeseek")
                        }
                        if (T === undefined) {
                            M["__" + R]()
                        } else {
                            M["__" + R](T)
                        }
                    }
                } catch (U) {
                    if (typeof M["__" + R] === "undefined") {
                        return P.trigger("flashdisabled", [Q])
                    }
                    throw U
                }
            }
        });
        var L = l(window);
        Q.bind("ready fullscreen fullscreen-exit", function(Y) {
            var W = P.height(),
                ab = P.width();
            if (Q.conf.flashfit || /full/.test(Y.type)) {
                var X = Q.isFullscreen,
                    Z = X && t,
                    U = !flowplayer.support.inlineBlock,
                    T = X ? Z ? screen.width : L.width() : ab,
                    ad = X ? Z ? screen.height : L.height() : W,
                    aa = 0,
                    V = 0,
                    ae = U ? ab : "",
                    ac = U ? W : "",
                    S, R;
                if (Q.conf.flashfit || Y.type === "fullscreen") {
                    S = Q.video.width / Q.video.height, R = Q.video.height / Q.video.width, ac = Math.max(R * T), ae = Math.max(S * ad);
                    ac = ac > ad ? ae * R : ac;
                    ac = Math.min(Math.round(ac), ad);
                    ae = ae > T ? ac * S : ae;
                    ae = Math.min(Math.round(ae), T);
                    V = Math.max(Math.round((ad + V - ac) / 2), 0);
                    aa = Math.max(Math.round((T + aa - ae) / 2), 0)
                }
                l("object", P).css({
                    width: ae,
                    height: ac,
                    marginTop: V,
                    marginLeft: aa
                })
            }
        });
        return O
    };
    var p = l("<video/>")[0];
    var g = {
        ended: "finish",
        pause: "pause",
        play: "resume",
        progress: "buffer",
        timeupdate: "progress",
        volumechange: "volume",
        ratechange: "speed",
        seeked: "seek",
        loadeddata: "ready",
        error: "error",
        dataunavailable: "error"
    };

    function E(J, I) {
        I = I || 100;
        return Math.round(J * I) / I
    }

    function z(I) {
        return /mpegurl/i.test(I) ? "application/x-mpegurl" : "video/" + I
    }

    function G(I) {
        if (!/^(video|application)/.test(I)) {
            I = z(I)
        }
        return !!p.canPlayType(I).replace("no", "")
    }

    function A(J, K) {
        var I = l.grep(J, function(L) {
            return L.type === K
        });
        return I.length ? I[0] : null
    }
    var d;
    var w = function(I) {
        if (d) {
            return d.attr({
                type: z(I.type),
                src: I.src
            })
        }
        return d = l("<video/>", {
            src: I.src,
            type: z(I.type),
            "class": "fp-engine",
            autoplay: "autoplay",
            preload: "none",
            "x-webkit-airplay": "allow"
        })
    };
    flowplayer.engine.html5 = function(Q, O) {
        var N = l("video", O),
            P = flowplayer.support,
            J = l("track", N),
            M = Q.conf,
            R, I, L;
        return R = {
            pick: function(S) {
                if (P.video) {
                    if (M.videoTypePreference) {
                        var U = A(S, M.videoTypePreference);
                        if (U) {
                            return U
                        }
                    }
                    for (var T = 0, V; T < S.length; T++) {
                        if (G(S[T].type)) {
                            return S[T]
                        }
                    }
                }
            },
            load: function(T) {
                if (M.splash && !L) {
                    N = w(T).prependTo(O);
                    if (!P.inlineVideo) {
                        N.css({
                            position: "absolute",
                            top: "-9999em"
                        })
                    }
                    if (J.length) {
                        N.append(J.attr("default", ""))
                    }
                    if (M.loop) {
                        N.attr("loop", "loop")
                    }
                    L = N[0]
                } else {
                    L = N[0];
                    var S = N.find("source");
                    if (!L.src && S.length) {
                        L.src = T.src;
                        S.remove()
                    }
                    if (Q.video.src && T.src != Q.video.src) {
                        N.attr("autoplay", "autoplay");
                        L.src = T.src
                    } else {
                        if (M.preload == "none" || !P.dataload) {
                            if (P.zeropreload) {
                                Q.trigger("ready", T).trigger("pause").one("ready", function() {
                                    O.trigger("resume", [Q])
                                })
                            } else {
                                Q.one("ready", function() {
                                    O.trigger("pause", [Q])
                                })
                            }
                        }
                    }
                }
                K(L, l("source", N).add(N), T);
                if (M.preload != "none" || !P.zeropreload || !P.dataload) {
                    L.load()
                }
                if (M.splash) {
                    L.load()
                }
            },
            pause: function() {
                L.pause()
            },
            resume: function() {
                L.play()
            },
            speed: function(S) {
                L.playbackRate = S
            },
            seek: function(U) {
                try {
                    var S = Q.paused;
                    L.currentTime = U;
                    if (S) {
                        L.pause()
                    }
                } catch (T) {}
            },
            volume: function(S) {
                L.volume = S
            },
            unload: function() {
                l("video.fp-engine", O).remove();
                if (!P.cachedVideoTag) {
                    d = null
                }
                I = clearInterval(I);
                L = 0
            }
        };

        function K(T, S, U) {
            if (T.listeners && T.listeners.hasOwnProperty(O.data("fp-player_id"))) {
                return
            }(T.listeners || (T.listeners = {}))[O.data("fp-player_id")] = true;
            S.bind("error", function(V) {
                try {
                    if (V.originalEvent && l(V.originalEvent.originalTarget).is("img")) {
                        return V.preventDefault()
                    }
                    if (G(l(V.target).attr("type"))) {
                        Q.trigger("error", {
                            code: 4
                        })
                    }
                } catch (W) {}
            });
            l.each(g, function(W, V) {
                T.addEventListener(W, function(ac) {
                    if (V == "progress" && ac.srcElement && ac.srcElement.readyState === 0) {
                        setTimeout(function() {
                            if (!Q.video.duration) {
                                V = "error";
                                Q.trigger(V, {
                                    code: 4
                                })
                            }
                        }, 1e4)
                    }
                    if (M.debug && !/progress/.test(V)) {
                        console.log(W, "->", V, ac)
                    }
                    if (!Q.ready && !/ready|error/.test(V) || !V || !l("video", O).length) {
                        return
                    }
                    var ab = l.Event(V),
                        X;
                    switch (V) {
                        case "ready":
                            X = l.extend(U, {
                                duration: T.duration,
                                width: T.videoWidth,
                                height: T.videoHeight,
                                url: T.currentSrc,
                                src: T.currentSrc
                            });
                            try {
                                X.seekable = T.seekable && T.seekable.end(null)
                            } catch (Z) {}
                            I = I || setInterval(function() {
                                try {
                                    X.buffer = T.buffered.end(null)
                                } catch (ae) {}
                                if (X.buffer) {
                                    if (E(X.buffer, 1e3) < E(X.duration, 1e3) && !X.buffered) {
                                        Q.trigger("buffer", ac)
                                    } else {
                                        if (!X.buffered) {
                                            X.buffered = true;
                                            Q.trigger("buffer", ac).trigger("buffered", ac);
                                            clearInterval(I);
                                            I = 0
                                        }
                                    }
                                }
                            }, 250);
                            if (!M.live && !X.duration && !P.hlsDuration && W === "loadeddata") {
                                var Y = function() {
                                    X.duration = T.duration;
                                    try {
                                        X.seekable = T.seekable && T.seekable.end(null)
                                    } catch (ae) {}
                                    Q.trigger(ab, X);
                                    T.removeEventListener("durationchange", Y)
                                };
                                T.addEventListener("durationchange", Y);
                                return
                            }
                            break;
                        case "progress":
                        case "seek":
                            var aa = Q.video.duration;
                            if (T.currentTime > 0) {
                                X = Math.max(T.currentTime, 0);
                                break
                            } else {
                                if (V == "progress") {
                                    return
                                }
                            }
                        case "speed":
                            X = E(T.playbackRate);
                            break;
                        case "volume":
                            X = E(T.volume);
                            break;
                        case "error":
                            try {
                                X = (ac.srcElement || ac.originalTarget).error
                            } catch (ad) {
                                return
                            }
                    }
                    Q.trigger(ab, X)
                }, false)
            })
        }
    };
    var c = /\.(\w{3,4})(\?.*)?$/i;

    function H(J) {
        var L = J.attr("src"),
            I = J.attr("type") || "",
            K = L.split(c)[1];
        I = /mpegurl/.test(I) ? "mpegurl" : I.replace("video/", "");
        return {
            src: L,
            suffix: K || I,
            type: I || K
        }
    }

    function s(K) {
        var I = this,
            J = [];
        l("source", K).each(function() {
            J.push(H(l(this)))
        });
        if (!J.length) {
            J.push(H(K))
        }
        I.initialSources = J;
        I.resolve = function(L) {
            if (!L) {
                return {
                    sources: J
                }
            }
            if (l.isArray(L)) {
                L = {
                    sources: l.map(L, function(O) {
                        var N, M = l.extend({}, O);
                        l.each(O, function(P, Q) {
                            N = P
                        });
                        M.type = N;
                        M.src = O[N];
                        delete M[N];
                        return M
                    })
                }
            } else {
                if (typeof L == "string") {
                    L = {
                        src: L,
                        sources: []
                    };
                    l.each(J, function(M, N) {
                        if (N.type != "flash") {
                            L.sources.push({
                                type: N.type,
                                src: L.src.replace(c, "." + N.suffix + "$2")
                            })
                        }
                    })
                }
            }
            return L
        }
    }
    l.throttle = function(K, J) {
        var I;
        return function() {
            if (!I) {
                K.apply(this, arguments);
                I = 1;
                setTimeout(function() {
                    I = 0
                }, J)
            }
        }
    };
    l.fn.slider2 = function(J) {
        var I = /iPad/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
        return this.each(function() {
            var W = l(this),
                ab = l(document),
                Q = W.children(":last"),
                N, O, V, T, L, S, Y, X, M = false,
                K = function() {
                    O = W.offset();
                    V = W.width();
                    T = W.height();
                    S = L ? T : V;
                    X = P(Y)
                },
                aa = function(ac) {
                    if (!N && ac != R.value && (!Y || ac < Y)) {
                        W.trigger("slide", [ac]);
                        R.value = ac
                    }
                },
                Z = function(ae) {
                    var ac = ae.pageX;
                    if (!ac && ae.originalEvent && ae.originalEvent.touches && ae.originalEvent.touches.length) {
                        ac = ae.originalEvent.touches[0].pageX
                    }
                    var af = L ? ae.pageY - O.top : ac - O.left;
                    af = Math.max(0, Math.min(X || S, af));
                    var ad = af / S;
                    if (L) {
                        ad = 1 - ad
                    }
                    if (J) {
                        ad = 1 - ad
                    }
                    return U(ad, 0, true)
                },
                U = function(ad, ac) {
                    if (ac === undefined) {
                        ac = 0
                    }
                    if (ad > 1) {
                        ad = 1
                    }
                    var ae = Math.round(ad * 1e3) / 10 + "%";
                    if (!Y || ad <= Y) {
                        if (!I) {
                            Q.stop()
                        }
                        if (M) {
                            Q.css("width", ae)
                        } else {
                            Q.animate(L ? {
                                height: ae
                            } : {
                                width: ae
                            }, ac, "linear")
                        }
                    }
                    return ad
                },
                P = function(ac) {
                    return Math.max(0, Math.min(S, L ? (1 - ac) * T : ac * V))
                },
                R = {
                    max: function(ac) {
                        Y = ac
                    },
                    disable: function(ac) {
                        N = ac
                    },
                    slide: function(ae, ad, ac) {
                        K();
                        if (ac) {
                            aa(ae)
                        }
                        U(ae, ad)
                    },
                    disableAnimation: function(ac) {
                        M = ac !== false
                    }
                };
            K();
            W.data("api", R).bind("mousedown.sld touchstart", function(ad) {
                ad.preventDefault();
                if (!N) {
                    var ac = l.throttle(aa, 100);
                    K();
                    R.dragging = true;
                    W.addClass("is-dragging");
                    aa(Z(ad));
                    ab.bind("mousemove.sld touchmove", function(ae) {
                        ae.preventDefault();
                        ac(Z(ae))
                    }).one("mouseup touchend", function() {
                        R.dragging = false;
                        W.removeClass("is-dragging");
                        ab.unbind("mousemove.sld touchmove")
                    })
                }
            })
        })
    };

    function j(I) {
        I = parseInt(I, 10);
        return I >= 10 ? I : "0" + I
    }

    function C(K) {
        K = K || 0;
        var J = Math.floor(K / 3600),
            I = Math.floor(K / 60);
        K = K - I * 60;
        if (J >= 1) {
            I -= J * 60;
            return J + ":" + j(I) + ":" + j(K)
        }
        return j(I) + ":" + j(K)
    }
    flowplayer(function(W, aa) {
        var S = W.conf,
            U = flowplayer.support,
            af;
        aa.find(".fp-ratio,.fp-ui").remove();
        aa.addClass("flowplayer").append('      <div class="ratio"/>      <div class="ui">         <div class="waiting"><em/><em/><em/></div>         <a class="fullscreen"/>         <a class="unload"/>         <p class="speed"/>         <div class="controls">            <a class="play"></a>            <div class="timeline">               <div class="buffer"/>               <div class="progress"/>            </div>            <div class="volume">               <a class="mute"></a>               <div class="volumeslider">                  <div class="volumelevel"/>               </div>            </div>         </div>         <div class="time">            <em class="elapsed">00:00</em>            <em class="remaining"/>            <em class="duration">00:00</em>         </div>         <div class="message"><h2/><p/></div>      </div>'.replace(/class="/g, 'class="fp-'));

        function Y(aj) {
            return l(".fp-" + aj, aa)
        }
        var P = Y("progress"),
            ab = Y("buffer"),
            K = Y("elapsed"),
            X = Y("remaining"),
            J = Y("waiting"),
            Q = Y("ratio"),
            ae = Y("speed"),
            V = Y("duration"),
            N = Q.css("paddingTop"),
            O = Y("timeline").slider2(W.rtl),
            Z = O.data("api"),
            ad = Y("volume"),
            I = Y("fullscreen"),
            T = Y("volumeslider").slider2(W.rtl),
            L = T.data("api"),
            ah = aa.is(".fixed-controls, .no-toggle");
        Z.disableAnimation(aa.hasClass("is-touch"));

        function ac(aj) {
            if (aa.css("width") === "0px" || aa.css("height") === "0px" || aj !== flowplayer.defaults.ratio) {
                if (!parseInt(N, 10)) {
                    Q.css("paddingTop", aj * 100 + "%")
                }
            }
            if (!U.inlineBlock) {
                l("object", aa).height(aa.height())
            }
        }

        function ai(aj) {
            aa.toggleClass("is-mouseover", aj).toggleClass("is-mouseout", !aj)
        }
        if (!U.animation) {
            J.html("<p>loading &hellip;</p>")
        }
        ac(S.ratio);
        try {
            if (!S.fullscreen) {
                I.remove()
            }
        } catch (ag) {
            I.remove()
        }
        W.bind("ready", function() {
            var aj = W.video.duration;
            Z.disable(W.disabled || !aj);
            S.adaptiveRatio && ac(W.video.height / W.video.width);
            V.add(X).html(C(aj));
            aj >= 3600 && aa.addClass("is-long") || aa.removeClass("is-long");
            L.slide(W.volumeLevel)
        }).bind("unload", function() {
            if (!N) {
                Q.css("paddingTop", "")
            }
        }).bind("buffer", function() {
            var ak = W.video,
                aj = ak.buffer / ak.duration;
            if (!ak.seekable && U.seekable) {
                Z.max(aj)
            }
            if (aj < 1) {
                ab.css("width", aj * 100 + "%")
            } else {
                ab.css({
                    width: "100%"
                })
            }
        }).bind("speed", function(ak, aj, al) {
            ae.text(al + "x").addClass("fp-hilite");
            setTimeout(function() {
                ae.removeClass("fp-hilite")
            }, 1e3)
        }).bind("buffered", function() {
            ab.css({
                width: "100%"
            });
            Z.max(1)
        }).bind("progress", function() {
            var ak = W.video.time,
                aj = W.video.duration;
            if (!Z.dragging) {
                Z.slide(ak / aj, W.seeking ? 0 : 250)
            }
            K.html(C(ak));
            X.html("-" + C(aj - ak))
        }).bind("finish resume seek", function(aj) {
            aa.toggleClass("is-finished", aj.type == "finish")
        }).bind("stop", function() {
            K.html(C(0));
            Z.slide(0, 100)
        }).bind("finish", function() {
            K.html(C(W.video.duration));
            Z.slide(1, 100);
            aa.removeClass("is-seeking")
        }).bind("beforeseek", function() {
            P.stop()
        }).bind("volume", function() {
            L.slide(W.volumeLevel)
        }).bind("disable", function() {
            var aj = W.disabled;
            Z.disable(aj);
            L.disable(aj);
            aa.toggleClass("is-disabled", W.disabled)
        }).bind("mute", function(al, ak, aj) {
            aa.toggleClass("is-muted", aj)
        }).bind("error", function(am, al, aj) {
            aa.removeClass("is-loading").addClass("is-error");
            if (aj) {
                aj.message = S.errors[aj.code];
                al.error = true;
                var ak = l(".fp-message", aa);
                l("h2", ak).text((al.engine || "html5") + ": " + aj.message);
                l("p", ak).text(aj.url || al.video.url || al.video.src || S.errorUrls[aj.code]);
                aa.unbind("mouseenter click").removeClass("is-mouseover")
            }
        }).bind("mouseenter mouseleave", function(al) {
            if (ah) {
                return
            }
            var ak = al.type == "mouseenter",
                aj;
            ai(ak);
            if (ak) {
                aa.bind("pause.x mousemove.x volume.x", function() {
                    ai(true);
                    aj = new Date
                });
                af = setInterval(function() {
                    if (new Date - aj > 5e3) {
                        ai(false);
                        aj = new Date
                    }
                }, 100)
            } else {
                aa.unbind(".x");
                clearInterval(af)
            }
        }).bind("mouseleave", function() {
            if (Z.dragging || L.dragging) {
                aa.addClass("is-mouseover").removeClass("is-mouseout")
            }
        }).bind("click.player", function(aj) {
            if (l(aj.target).is(".fp-ui, .fp-engine") || aj.flash) {
                aj.preventDefault();
                return W.toggle()
            }
        }).bind("contextmenu", function(al) {
            al.preventDefault();
            var ao = aa.offset(),
                aj = l(window),
                am = al.clientX - ao.left,
                ak = al.clientY - ao.top + aj.scrollTop();
            var an = aa.find(".fp-context-menu").css({
                left: am + "px",
                top: ak + "px",
                display: "block"
            }).on("click", function(ap) {
                ap.stopPropagation()
            });
            l("html").on("click.outsidemenu", function(ap) {
                an.hide();
                l("html").off("click.outsidemenu")
            })
        }).bind("flashdisabled", function() {
            aa.addClass("is-flash-disabled").one("ready", function() {
                aa.removeClass("is-flash-disabled").find(".fp-flash-disabled").remove()
            }).append('<div class="fp-flash-disabled">Adobe Flash is disabled for this page, click player area to enable.</div>')
        });
        if (S.poster) {
            aa.css("backgroundImage", "url(" + S.poster + ")")
        }
        var M = aa.css("backgroundColor"),
            R = aa.css("backgroundImage") != "none" || M && M != "rgba(0, 0, 0, 0)" && M != "transparent";
        if (R && !S.splash && !S.autoplay) {
            W.bind("ready stop", function() {
                aa.addClass("is-poster").one("progress", function() {
                    aa.removeClass("is-poster")
                })
            })
        }
        if (!R && W.forcedSplash) {
            aa.css("backgroundColor", "#555")
        }
        l(".fp-toggle, .fp-play", aa).click(W.toggle);
        l.each(["mute", "fullscreen", "unload"], function(ak, aj) {
            Y(aj).click(function() {
                W[aj]()
            })
        });
        O.bind("slide", function(aj, ak) {
            W.seeking = true;
            W.seek(ak * W.video.duration)
        });
        T.bind("slide", function(aj, ak) {
            W.volume(ak)
        });
        Y("time").click(function(aj) {
            l(this).toggleClass("is-inverted")
        });
        ai(ah)
    });
    var r, x, a = "is-help";
    l(document).bind("keydown.fp", function(M) {
        var K = r,
            L = M.ctrlKey || M.metaKey || M.altKey,
            J = M.which,
            I = K && K.conf;
        if (!K || !I.keyboard || K.disabled) {
            return
        }
        if (l.inArray(J, [63, 187, 191]) != -1) {
            x.toggleClass(a);
            return false
        }
        if (J == 27 && x.hasClass(a)) {
            x.toggleClass(a);
            return false
        }
        if (!L && K.ready) {
            M.preventDefault();
            if (M.shiftKey) {
                if (J == 39) {
                    K.speed(true)
                } else {
                    if (J == 37) {
                        K.speed(false)
                    }
                }
                return
            }
            if (J < 58 && J > 47) {
                return K.seekTo(J - 48)
            }
            switch (J) {
                case 38:
                case 75:
                    K.volume(K.volumeLevel + .15);
                    break;
                case 40:
                case 74:
                    K.volume(K.volumeLevel - .15);
                    break;
                case 39:
                case 76:
                    K.seeking = true;
                    K.seek(true);
                    break;
                case 37:
                case 72:
                    K.seeking = true;
                    K.seek(false);
                    break;
                case 190:
                    K.seekTo();
                    break;
                case 32:
                    K.toggle();
                    break;
                case 70:
                    I.fullscreen && K.fullscreen();
                    break;
                case 77:
                    K.mute();
                    break;
                case 81:
                    K.unload();
                    break
            }
        }
    });
    flowplayer(function(J, I) {
        if (!J.conf.keyboard) {
            return
        }
        I.bind("mouseenter mouseleave", function(K) {
            r = !J.disabled && K.type == "mouseenter" ? J : 0;
            if (r) {
                x = I
            }
        });
        I.append('      <div class="fp-help">         <a class="fp-close"></a>         <div class="fp-help-section fp-help-basics">            <p><em>space</em>play / pause</p>            <p><em>q</em>unload | stop</p>            <p><em>f</em>fullscreen</p>            <p><em>shift</em> + <em>&#8592;</em><em>&#8594;</em>slower / faster <small>(latest Chrome and Safari)</small></p>         </div>         <div class="fp-help-section">            <p><em>&#8593;</em><em>&#8595;</em>volume</p>            <p><em>m</em>mute</p>         </div>         <div class="fp-help-section">            <p><em>&#8592;</em><em>&#8594;</em>seek</p>            <p><em>&nbsp;. </em>seek to previous            </p><p><em>1</em><em>2</em>&hellip;<em>6</em> seek to 10%, 20%, &hellip;60% </p>         </div>      </div>   ');
        if (J.conf.tooltip) {
            l(".fp-ui", I).attr("title", "Hit ? for help").on("mouseout.tip", function() {
                l(this).removeAttr("title").off("mouseout.tip")
            })
        }
        l(".fp-close", I).click(function() {
            I.toggleClass(a)
        })
    });
    var q = l.browser.mozilla ? "moz" : "webkit",
        f = "fullscreen",
        y = "fullscreen-exit",
        i, t = flowplayer.support.fullscreen,
        v = typeof document.exitFullscreen == "function",
        B = navigator.userAgent.toLowerCase(),
        D = /(safari)[ \/]([\w.]+)/.exec(B) && !/(chrome)[ \/]([\w.]+)/.exec(B);
    l(document).bind(v ? "fullscreenchange" : q + "fullscreenchange", function(J) {
        var I = l(document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.fullscreenElement || J.target);
        if (I.length && !i) {
            i = I.trigger(f, [I])
        } else {
            i.trigger(y, [i]);
            i = null
        }
    });
    flowplayer(function(K, I) {
        if (!K.conf.fullscreen) {
            return
        }
        var N = l(window),
            L = {
                index: 0,
                pos: 0,
                play: false
            },
            M;
        K.isFullscreen = false;
        K.fullscreen = function(O) {
            if (K.disabled) {
                return
            }
            if (O === undefined) {
                O = !K.isFullscreen
            }
            if (O) {
                M = N.scrollTop()
            }
            if ((q == "webkit" || D) && K.engine == "flash") {
                L.index = K.video.index;
                if (K.conf.rtmp) {
                    l.extend(L, {
                        pos: K.video.time,
                        play: K.playing
                    })
                }
            }
            if (t) {
                if (O) {
                    if (v) {
                        I[0].requestFullscreen()
                    } else {
                        I[0][q + "RequestFullScreen"](Element.ALLOW_KEYBOARD_INPUT);
                        if (D && !document.webkitCurrentFullScreenElement && !document.mozFullScreenElement) {
                            I[0][q + "RequestFullScreen"]()
                        }
                    }
                } else {
                    if (v) {
                        document.exitFullscreen()
                    } else {
                        document[q + "CancelFullScreen"]()
                    }
                }
            } else {
                K.trigger(O ? f : y, [K])
            }
            return K
        };
        var J;
        I.bind("mousedown.fs", function() {
            if (+new Date - J < 150 && K.ready) {
                K.fullscreen()
            }
            J = +new Date
        });
        K.bind(f, function(O) {
            I.addClass("is-fullscreen");
            K.isFullscreen = true
        }).bind(y, function(P) {
            var O;
            if (!t && K.engine === "html5") {
                O = I.css("opacity") || "";
                I.css("opacity", 0)
            }
            I.removeClass("is-fullscreen");
            if (!t && K.engine === "html5") {
                setTimeout(function() {
                    I.css("opacity", O)
                })
            }
            K.isFullscreen = false;
            N.scrollTop(M)
        }).bind("ready", function() {
            if (L.index > 0) {
                K.play(L.index);
                L.index = 0
            } else {
                if (L.pos && !isNaN(L.pos)) {
                    var O = function() {
                        if (!L.play) {
                            K.pause()
                        }
                        l.extend(L, {
                            pos: 0,
                            play: false
                        })
                    };
                    if (K.conf.live) {
                        K.resume();
                        O()
                    } else {
                        K.resume().seek(L.pos, O)
                    }
                }
            }
        })
    });
    flowplayer(function(Q, O) {
        var M = l.extend({
                active: "is-active",
                advance: true,
                query: ".fp-playlist a"
            }, Q.conf),
            N = M.active;

        function K() {
            return l(M.query, O)
        }

        function J() {
            return l(M.query + "." + N, O)
        }
        Q.play = function(S) {
            if (S === undefined) {
                return Q.resume()
            }
            if (typeof S === "number" && !Q.conf.playlist[S]) {
                return Q
            } else {
                if (typeof S != "number") {
                    Q.load.apply(null, arguments)
                }
            }
            Q.unbind("resume.fromfirst");
            Q.video.index = S;
            Q.load(typeof Q.conf.playlist[S] === "string" ? Q.conf.playlist[S].toString() : l.map(Q.conf.playlist[S], function(T) {
                return l.extend({}, T)
            }));
            return Q
        };
        Q.next = function(T) {
            T && T.preventDefault();
            var S = Q.video.index;
            if (S != -1) {
                S = S === Q.conf.playlist.length - 1 ? 0 : S + 1;
                Q.play(S)
            }
            return Q
        };
        Q.prev = function(T) {
            T && T.preventDefault();
            var S = Q.video.index;
            if (S != -1) {
                S = S === 0 ? Q.conf.playlist.length - 1 : S - 1;
                Q.play(S)
            }
            return Q
        };
        l(".fp-next", O).click(Q.next);
        l(".fp-prev", O).click(Q.prev);
        if (M.advance) {
            O.unbind("finish.pl").bind("finish.pl", function(U, S) {
                var T = S.video.index + 1;
                if (T < S.conf.playlist.length || M.loop) {
                    T = T === S.conf.playlist.length ? 0 : T;
                    O.removeClass("is-finished");
                    setTimeout(function() {
                        S.play(T)
                    })
                } else {
                    O.addClass("is-playing");
                    if (S.conf.playlist.length > 1) {
                        S.one("resume.fromfirst", function() {
                            S.play(0);
                            return false
                        })
                    }
                }
            })
        }
        var R = false;
        if (Q.conf.playlist.length) {
            R = true;
            var L = O.find(".fp-playlist");
            if (!L.length) {
                L = l('<div class="fp-playlist"></div>');
                var P = l(".fp-next,.fp-prev", O);
                if (!P.length) {
                    l("video", O).after(L)
                } else {
                    P.eq(0).before(L)
                }
            }
            L.empty();
            l.each(Q.conf.playlist, function(U, V) {
                var S;
                if (typeof V === "string") {
                    S = V
                } else {
                    for (var T in V[0]) {
                        if (V[0].hasOwnProperty(T)) {
                            S = V[0][T];
                            break
                        }
                    }
                }
                L.append(l("<a />").attr({
                    href: S,
                    "data-index": U
                }))
            })
        }
        if (K().length) {
            if (!R) {
                Q.conf.playlist = [];
                K().each(function() {
                    var S = l(this).attr("href");
                    l(this).attr("data-index", Q.conf.playlist.length);
                    Q.conf.playlist.push(S)
                })
            }
            O.on("click", M.query, function(U) {
                U.preventDefault();
                var S = l(U.target).closest(M.query);
                var T = Number(S.attr("data-index"));
                if (T != -1) {
                    Q.play(T)
                }
            });
            var I = K().filter("[data-cuepoints]").length;
            Q.bind("load", function(Z, W, Y) {
                var X = J().removeClass(N),
                    U = X.attr("data-index"),
                    T = Y.index = Q.video.index || 0,
                    V = l('a[data-index="' + T + '"]', O).addClass(N),
                    S = T == Q.conf.playlist.length - 1;
                O.removeClass("video" + U).addClass("video" + T).toggleClass("last-video", S);
                Y.index = W.video.index = T;
                Y.is_last = W.video.is_last = S;
                if (I) {
                    Q.cuepoints = V.data("cuepoints")
                }
            }).bind("unload.pl", function() {
                J().toggleClass(N)
            })
        }
        if (Q.conf.playlist.length) {
            Q.conf.loop = false
        }
    });
    var m = / ?cue\d+ ?/;
    flowplayer(function(J, I) {
        var K = 0;
        J.cuepoints = J.conf.cuepoints || [];

        function L(M) {
            I[0].className = I[0].className.replace(m, " ");
            if (M >= 0) {
                I.addClass("cue" + M)
            }
        }
        J.bind("progress", function(R, P, Q) {
            if (K && Q - K < .015) {
                return K = Q
            }
            K = Q;
            var N = J.cuepoints || [];
            for (var O = 0, M; O < N.length; O++) {
                M = N[O];
                if (!isNaN(M)) {
                    M = {
                        time: M
                    }
                }
                if (M.time < 0) {
                    M.time = J.video.duration + M.time
                }
                M.index = O;
                if (Math.abs(M.time - Q) < .125 * J.currentSpeed) {
                    L(O);
                    I.trigger("cuepoint", [J, M])
                }
            }
        }).bind("unload seek", L);
        if (J.conf.generate_cuepoints) {
            J.bind("load", function() {
                l(".fp-cuepoint", I).remove()
            }).bind("ready", function() {
                var M = J.cuepoints || [],
                    O = J.video.duration,
                    N = l(".fp-timeline", I).css("overflow", "visible");
                l.each(M, function(Q, P) {
                    var S = P.time || P;
                    if (S < 0) {
                        S = O + P
                    }
                    var R = l("<a/>").addClass("fp-cuepoint fp-cuepoint" + Q).css("left", S / O * 100 + "%");
                    R.appendTo(N).mousedown(function() {
                        J.seek(S);
                        return false
                    })
                })
            })
        }
    });
    flowplayer(function(R, O, N) {
        var K = l("track", O),
            M = R.conf;
        if (flowplayer.support.subtitles) {
            R.subtitles = K.length && K[0].track;
            if (M.nativesubtitles && M.engine == "html5") {
                return
            }
        }
        K.remove();
        var L = /^(([0-9]{2}:)?[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3}) --\> (([0-9]{2}:)?[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3})(.*)/;

        function P(S) {
            var T = S.split(":");
            if (T.length == 2) {
                T.unshift(0)
            }
            return T[0] * 60 * 60 + T[1] * 60 + parseFloat(T[2].replace(",", "."))
        }
        R.subtitles = [];
        var I = K.attr("src");
        if (!I) {
            return
        }
        setTimeout(function() {
            l.get(I, function(V) {
                for (var U = 0, aa = V.split("\n"), W = aa.length, Y = {}, X, S, Z, T; U < W; U++) {
                    S = L.exec(aa[U]);
                    if (S) {
                        X = aa[U - 1];
                        Z = "<p>" + aa[++U] + "</p><br/>";
                        while (l.trim(aa[++U]) && U < aa.length) {
                            Z += "<p>" + aa[U] + "</p><br/>"
                        }
                        Y = {
                            title: X,
                            startTime: P(S[1]),
                            endTime: P(S[2] || S[3]),
                            text: Z
                        };
                        T = {
                            time: Y.startTime,
                            subtitle: Y
                        };
                        R.subtitles.push(Y);
                        R.cuepoints.push(T);
                        R.cuepoints.push({
                            time: Y.endTime,
                            subtitleEnd: X
                        });
                        if (Y.startTime === 0) {
                            R.trigger("cuepoint", T)
                        }
                    }
                }
            }).fail(function() {
                R.trigger("error", {
                    code: 8,
                    url: I
                });
                return false
            })
        });
        var J = l("<div class='fp-subtitle'/>").appendTo(O),
            Q;
        R.bind("cuepoint", function(U, T, S) {
            if (S.subtitle) {
                Q = S.index;
                J.html(S.subtitle.text).addClass("fp-active")
            } else {
                if (S.subtitleEnd) {
                    J.removeClass("fp-active");
                    Q = S.index
                }
            }
        }).bind("seek", function(U, S, T) {
            if (Q && R.cuepoints[Q] && R.cuepoints[Q].time > T) {
                J.removeClass("fp-active");
                Q = null
            }
            l.each(R.cuepoints || [], function(W, V) {
                var X = V.subtitle;
                if (X && Q != V.index) {
                    if (T >= V.time && (!X.endTime || T <= X.endTime)) {
                        R.trigger("cuepoint", V)
                    }
                } else {
                    if (V.subtitleEnd && T >= V.time && V.index == Q + 1) {
                        R.trigger("cuepoint", V)
                    }
                }
            })
        })
    });
    flowplayer(function(K, J) {
        var N = K.conf.analytics,
            M = 0,
            L = 0;
        if (N) {
            if (typeof _gat == "undefined") {
                l.getScript("//google-analytics.com/ga.js")
            }

            function I(Q) {
                if (M && typeof _gat != "undefined") {
                    var P = _gat._getTracker(N),
                        O = K.video;
                    P._setAllowLinker(true);
                    P._trackEvent("Video / Seconds played", K.engine + "/" + O.type, J.attr("title") || O.src.split("/").slice(-1)[0].replace(c, ""), Math.round(M / 1e3));
                    M = 0
                }
            }
            K.bind("load unload", I).bind("progress", function() {
                if (!K.seeking) {
                    M += L ? +new Date - L : 0;
                    L = +new Date
                }
            }).bind("pause", function() {
                L = 0
            });
            l(window).unload(I)
        }
    });
    var o = /IEMobile/.test(u);
    if (flowplayer.support.touch || o) {
        flowplayer(function(M, J) {
            var N = /Android/.test(u) && !/Firefox/.test(u) && !/Opera/.test(u),
                L = /Silk/.test(u),
                I = N ? parseFloat(/Android\ (\d\.\d)/.exec(u)[1], 10) : 0;
            if (N) {
                M.conf.videoTypePreference = "mp4";
                if (!/Chrome/.test(u) && I < 4) {
                    var O = M.load;
                    M.load = function(Q, R) {
                        var P = O.apply(M, arguments);
                        M.trigger("ready", [M, M.video]);
                        return P
                    }
                }
            }
            if (!flowplayer.support.volume) {
                J.addClass("no-volume no-mute")
            }
            J.addClass("is-touch");
            J.find(".fp-timeline").data("api").disableAnimation();
            var K = false;
            J.bind("touchmove", function() {
                K = true
            }).bind("touchend click", function(P) {
                if (K) {
                    K = false;
                    return
                }
                if (M.playing && !J.hasClass("is-mouseover")) {
                    J.addClass("is-mouseover").removeClass("is-mouseout");
                    return false
                }
                if (M.paused && J.hasClass("is-mouseout") && !M.splash) {
                    M.toggle()
                }
                if (M.paused && o) {
                    l("video.fp-engine", J)[0].play()
                }
            });
            if (M.conf.native_fullscreen && typeof l("<video />")[0].webkitEnterFullScreen === "function") {
                M.fullscreen = function() {
                    var P = l("video.fp-engine", J);
                    P[0].webkitEnterFullScreen();
                    P.one("webkitendfullscreen", function() {
                        P.prop("controls", true).prop("controls", false)
                    })
                }
            }(N || L) && M.bind("ready", function() {
                var P = l("video.fp-engine", J);
                P.one("canplay", function() {
                    P[0].play()
                });
                P[0].play();
                M.bind("progress.dur", function() {
                    var Q = P[0].duration;
                    if (Q !== 1) {
                        M.video.duration = Q;
                        l(".fp-duration", J).html(C(Q));
                        M.unbind("progress.dur")
                    }
                })
            })
        })
    }
    flowplayer(function(L, I) {
        if (L.conf.embed === false) {
            return
        }
        var K = L.conf,
            N = l(".fp-ui", I),
            J = l("<a/>", {
                "class": "fp-embed",
                title: "Copy to your site"
            }).appendTo(N),
            O = l("<div/>", {
                "class": "fp-embed-code"
            }).append("<label>Paste this HTML code on your site to embed.</label><textarea/>").appendTo(N),
            M = l("textarea", O);
        L.embedCode = function() {
            var U = L.video,
                S = U.width || I.width(),
                Q = U.height || I.height(),
                R = l("<div/>", {
                    "class": "flowplayer",
                    css: {
                        width: S,
                        height: Q
                    }
                }),
                P = l("<video/>").appendTo(R);
            l.each(["origin", "analytics", "key", "rtmp"], function(X, W) {
                if (K[W]) {
                    R.attr("data-" + W, K[W])
                }
            });
            if (K.logo) {
                R.attr("data-logo", l("<img />").attr("src", K.logo)[0].src)
            }
            l.each(U.sources, function(W, Y) {
                var X = Y.src;
                if (!/^https?:/.test(Y.src) && Y.type !== "flash" || !K.rtmp) {
                    X = l("<img/>").attr("src", Y.src)[0].src
                }
                P.append(l("<source/>", {
                    type: "video/" + Y.type,
                    src: X
                }))
            });
            var V = {
                src: "//embed.flowplayer.org/5.4.6/embed.min.js"
            };
            if (l.isPlainObject(K.embed)) {
                V["data-swf"] = K.embed.swf;
                V["data-library"] = K.embed.library;
                V.src = K.embed.script || V.src;
                if (K.embed.skin) {
                    V["data-skin"] = K.embed.skin
                }
            }
            var T = l("<foo/>", V).append(R);
            return l("<p/>").append(T).html().replace(/<(\/?)foo/g, "<$1script")
        };
        I.fptip(".fp-embed", "is-embedding");
        M.click(function() {
            this.select()
        });
        J.click(function() {
            M.text(L.embedCode());
            M[0].focus();
            M[0].select()
        })
    });
    l.fn.fptip = function(I, J) {
        return this.each(function() {
            var K = l(this);

            function L() {
                K.removeClass(J);
                l(document).unbind(".st")
            }
            l(I || "a", this).click(function(M) {
                M.preventDefault();
                K.toggleClass(J);
                if (K.hasClass(J)) {
                    l(document).bind("keydown.st", function(N) {
                        if (N.which == 27) {
                            L()
                        }
                    }).bind("click.st", function(N) {
                        if (!l(N.target).parents("." + J).length) {
                            L()
                        }
                    })
                }
            })
        })
    }
}(jQuery);
flowplayer(function(d, b) {
    function u(c) {
        var a = w("<a/>")[0];
        return a.href = c, a.hostname
    }

    function f(i) {
        var a = "ab.ca,ac.ac,ac.at,ac.be,ac.cn,ac.il,ac.in,ac.jp,ac.kr,ac.th,ac.uk,adm.br,adv.br,ah.cn,am.br,arq.br,art.br,arts.ro,asn.au,asso.fr,asso.mc,bc.ca,bio.br,biz.pl,biz.tr,bj.cn,br.com,cn.com,cng.br,cnt.br,co.ac,co.at,co.gl,co.id,co.il,co.in,co.jp,co.kr,com.ag,com.ai,com.ar,com.au,com.br,com.cn,com.cy,com.de,com.do,com.ec,com.es,com.fj,com.fr,co.mg,com.gl,com.gt,com.hk,com.hr,com.hu,com.kg,com.ki,com.lc,com.mg,com.mm,com.ms,com.mt,com.mu,com.mx,com.my,com.nf,com.ng,com.ni,com.pa,com.ph,com.pl,com.pt,com.qa,com.ro,com.ru,co.ms,com.sb,com.sc,com.sg,com.sv,com.tr,com.tw,com.ua,com.uy,com.ve,com.vn,co.nz,co.th,co.uk,co.ve,co.vi,co.za,cq.cn,de.com,de.org,ecn.br,edu.au,edu.cn,edu.hk,edu.mm,edu.my,edu.pt,edu.qa,edu.tr,eng.br,ernet.in,esp.br,etc.br,eti.br,eu.com,eu.int,eu.lv,firm.in,firm.ro,fm.br,fot.br,fst.br,g12.br,gb.com,gb.net,gd.cn,gen.in,go.jp,go.kr,go.th,gov.au,gov.az,gov.br,gov.cn,gov.il,gov.in,gov.mm,gov.my,gov.qa,gov.sg,gov.tr,gov.tw,gs.cn,gv.ac,gv.at,gx.cn,gz.cn,he.cn,hi.cn,hk.cn,hl.cn,hu.com,id.au,idv.tw,ind.br,ind.in,inf.br,info.pl,info.ro,info.tr,info.ve,in.ua,iwi.nz,jl.cn,jor.br,js.cn,k12.il,k12.tr,kr.com,lel.br,ln.cn,ltd.uk,maori.nz,mb.ca,med.br,me.uk,mil.br,mi.th,mo.cn,muni.il,nb.ca,ne.jp,ne.kr,net.ag,net.ai,net.au,net.br,net.cn,net.do,net.gl,net.hk,net.il,net.in,net.kg,net.ki,net.lc,net.mg,net.mm,net.mu,net.ni,net.nz,net.pl,net.ru,net.sb,net.sc,net.sg,net.th,net.tr,net.tw,net.uk,net.ve,nf.ca,nm.cn,nm.kr,no.com,nom.br,nom.ni,nom.ro,ns.ca,nt.ca,ntr.br,nt.ro,nx.cn,odo.br,off.ai,on.ca,or.ac,or.at,org.ag,org.ai,org.au,org.br,org.cn,org.do,org.es,org.gl,org.hk,org.in,org.kg,org.ki,org.lc,org.mg,org.mm,org.ms,org.nf,org.ni,org.nz,org.pl,org.ro,org.ru,org.sb,org.sc,org.sg,org.tr,org.tw,org.uk,org.ve,or.jp,or.kr,or.th,pe.ca,plc.uk,ppg.br,presse.fr,pro.br,psc.br,psi.br,qc.ca,qc.com,qh.cn,rec.br,rec.ro,res.in,sa.com,sc.cn,sch.ul,se.com,se.net,sh.cn,sk.ca,slg.br,sn.cn,store.ro,tj.cn,tm.fr,tm.mc,tmp.br,tm.ro,tur.br,tv.br,tv.tr,tw.cn,uk.com,uk.net,us.com,uy.com,vet.br,waw.pl,web.ve,www.ro,xj.cn,xz.cn,yk.ca,yn.cn,zj.cn,zlg.br".split(",");
        i = i.toLowerCase();
        var m = i.split("."),
            l = m.length;
        if (2 > l) {
            return i
        }
        var g = m.slice(-2).join(".");
        return l >= 3 && w.inArray(g, a) >= 0 ? m.slice(-3).join(".") : g
    }

    function q(i, a) {
        "localhost" == a || parseInt(a.split(".").slice(-1)) || (a = f(a));
        for (var l = 0, g = a.length - 1; g >= 0; g--) {
            l += 2983723987 * a.charCodeAt(g)
        }
        for (l = ("" + l).substring(0, 7), g = 0; g < i.length; g++) {
            if (l === i[g].substring(1, 8)) {
                return 1
            }
        }
    }
    var w = jQuery,
        v = d.conf,
        h = v.swf.indexOf("flowplayer.org") && v.e && b.data("origin"),
        k = h ? u(h) : location.hostname,
        p = v.key;
    if ("file:" == location.protocol && (k = "localhost"), d.load.ed = 1, v.hostname = k, v.origin = h || location.href, h && b.addClass("is-embedded"), "string" == typeof p && (p = p.split(/,\s*/)), p && "function" == typeof q && q(p, k)) {
        v.logo && b.append(w("<a>", {
            "class": "fp-logo",
            href: h
        }).append(w("<img/>", {
            src: v.logo
        })))
    } else {
        var x = w("<a/>").attr("href", "http://flowplayer.org").appendTo(b);
        w(".fp-controls", b);
        var j = w('<div class="fp-context-menu"><ul><li class="copyright">&copy; 2013</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul></div>').appendTo(b);
        d.bind("pause resume finish unload", function(a, g) {
            var e = -1;
            g.video.src && w.each([
                ["org", "flowplayer", "drive"],
                ["org", "flowplayer", "my"]
            ], function(i, c) {
                return e = g.video.src.indexOf("://" + c.reverse().join(".")), -1 === e
            }), /pause|resume/.test(a.type) && "flash" != g.engine && 4 != e && 5 != e ? (x.show().css({
                position: "absolute",
                left: 16,
                bottom: 36,
                zIndex: 99999,
                width: 100,
                height: 20,
                backgroundImage: "url(" + [".png", "logo", "/", ".net", ".cloudfront", "d32wqyuo10o653", "//"].reverse().join("") + ")"
            }), g.load.ed = x.is(":visible") && w.contains(b[0], j[0]), g.load.ed || g.pause()) : x.hide()
        })
    }
});
! function() {
    var n = this,
        t = n._,
        r = {},
        e = Array.prototype,
        u = Object.prototype,
        i = Function.prototype,
        a = e.push,
        o = e.slice,
        c = e.concat,
        l = u.toString,
        f = u.hasOwnProperty,
        s = e.forEach,
        p = e.map,
        v = e.reduce,
        h = e.reduceRight,
        d = e.filter,
        g = e.every,
        m = e.some,
        y = e.indexOf,
        b = e.lastIndexOf,
        x = Array.isArray,
        _ = Object.keys,
        w = i.bind,
        j = function(n) {
            return n instanceof j ? n : this instanceof j ? (this._wrapped = n, void 0) : new j(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = "1.5.1";
    var A = j.each = j.forEach = function(n, t, e) {
        if (null != n)
            if (s && n.forEach === s) n.forEach(t, e);
            else if (n.length === +n.length) {
            for (var u = 0, i = n.length; i > u; u++)
                if (t.call(e, n[u], u, n) === r) return
        } else
            for (var a in n)
                if (j.has(n, a) && t.call(e, n[a], a, n) === r) return
    };
    j.map = j.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
            e.push(t.call(r, n, u, i))
        }), e)
    };
    var E = "Reduce of empty array with no initial value";
    j.reduce = j.foldl = j.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduce === v) return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) {
                u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
            }), !u) throw new TypeError(E);
        return r
    }, j.reduceRight = j.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduceRight === h) return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = j.keys(n);
            i = a.length
        }
        if (A(n, function(o, c, l) {
                c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
            }), !u) throw new TypeError(E);
        return r
    }, j.find = j.detect = function(n, t, r) {
        var e;
        return O(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0
        }), e
    }, j.filter = j.select = function(n, t, r) {
        var e = [];
        return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function(n, u, i) {
            t.call(r, n, u, i) && e.push(n)
        }), e)
    }, j.reject = function(n, t, r) {
        return j.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u)
        }, r)
    }, j.every = j.all = function(n, t, e) {
        t || (t = j.identity);
        var u = !0;
        return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r
        }), !!u)
    };
    var O = j.some = j.any = function(n, t, e) {
        t || (t = j.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0
        }), !!u)
    };
    j.contains = j.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : O(n, function(n) {
            return n === t
        })
    }, j.invoke = function(n, t) {
        var r = o.call(arguments, 2),
            e = j.isFunction(t);
        return j.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r)
        })
    }, j.pluck = function(n, t) {
        return j.map(n, function(n) {
            return n[t]
        })
    }, j.where = function(n, t, r) {
        return j.isEmpty(t) ? r ? void 0 : [] : j[r ? "find" : "filter"](n, function(n) {
            for (var r in t)
                if (t[r] !== n[r]) return !1;
            return !0
        })
    }, j.findWhere = function(n, t) {
        return j.where(n, t, !0)
    }, j.max = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.max.apply(Math, n);
        if (!t && j.isEmpty(n)) return -1 / 0;
        var e = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a > e.computed && (e = {
                value: n,
                computed: a
            })
        }), e.value
    }, j.min = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.min.apply(Math, n);
        if (!t && j.isEmpty(n)) return 1 / 0;
        var e = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a < e.computed && (e = {
                value: n,
                computed: a
            })
        }), e.value
    }, j.shuffle = function(n) {
        var t, r = 0,
            e = [];
        return A(n, function(n) {
            t = j.random(r++), e[r - 1] = e[t], e[t] = n
        }), e
    };
    var F = function(n) {
        return j.isFunction(n) ? n : function(t) {
            return t[n]
        }
    };
    j.sortBy = function(n, t, r) {
        var e = F(t);
        return j.pluck(j.map(n, function(n, t, u) {
            return {
                value: n,
                index: t,
                criteria: e.call(r, n, t, u)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1
            }
            return n.index < t.index ? -1 : 1
        }), "value")
    };
    var k = function(n, t, r, e) {
        var u = {},
            i = F(null == t ? j.identity : t);
        return A(n, function(t, a) {
            var o = i.call(r, t, a, n);
            e(u, o, t)
        }), u
    };
    j.groupBy = function(n, t, r) {
        return k(n, t, r, function(n, t, r) {
            (j.has(n, t) ? n[t] : n[t] = []).push(r)
        })
    }, j.countBy = function(n, t, r) {
        return k(n, t, r, function(n, t) {
            j.has(n, t) || (n[t] = 0), n[t]++
        })
    }, j.sortedIndex = function(n, t, r, e) {
        r = null == r ? j.identity : F(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
            var o = i + a >>> 1;
            r.call(e, n[o]) < u ? i = o + 1 : a = o
        }
        return i
    }, j.toArray = function(n) {
        return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : []
    }, j.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length
    }, j.first = j.head = j.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t)
    }, j.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t))
    }, j.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
    }, j.rest = j.tail = j.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t)
    }, j.compact = function(n) {
        return j.filter(n, j.identity)
    };
    var R = function(n, t, r) {
        return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function(n) {
            j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n)
        }), r)
    };
    j.flatten = function(n, t) {
        return R(n, t, [])
    }, j.without = function(n) {
        return j.difference(n, o.call(arguments, 1))
    }, j.uniq = j.unique = function(n, t, r, e) {
        j.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? j.map(n, r, e) : n,
            i = [],
            a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e]))
        }), i
    }, j.union = function() {
        return j.uniq(j.flatten(arguments, !0))
    }, j.intersection = function(n) {
        var t = o.call(arguments, 1);
        return j.filter(j.uniq(n), function(n) {
            return j.every(t, function(t) {
                return j.indexOf(t, n) >= 0
            })
        })
    }, j.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return j.filter(n, function(n) {
            return !j.contains(t, n)
        })
    }, j.zip = function() {
        for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++) t[r] = j.pluck(arguments, "" + r);
        return t
    }, j.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, j.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0,
            u = n.length;
        if (r) {
            if ("number" != typeof r) return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        if (y && n.indexOf === y) return n.indexOf(t, r);
        for (; u > e; e++)
            if (n[e] === t) return e;
        return -1
    }, j.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--;)
            if (n[u] === t) return u;
        return -1
    }, j.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;) i[u++] = n, n += r;
        return i
    };
    var M = function() {};
    j.bind = function(n, t) {
        var r, e;
        if (w && n.bind === w) return w.apply(n, o.call(arguments, 1));
        if (!j.isFunction(n)) throw new TypeError;
        return r = o.call(arguments, 2), e = function() {
            if (!(this instanceof e)) return n.apply(t, r.concat(o.call(arguments)));
            M.prototype = n.prototype;
            var u = new M;
            M.prototype = null;
            var i = n.apply(u, r.concat(o.call(arguments)));
            return Object(i) === i ? i : u
        }
    }, j.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(o.call(arguments)))
        }
    }, j.bindAll = function(n) {
        var t = o.call(arguments, 1);
        if (0 === t.length) throw new Error("bindAll must be passed function names");
        return A(t, function(t) {
            n[t] = j.bind(n[t], n)
        }), n
    }, j.memoize = function(n, t) {
        var r = {};
        return t || (t = j.identity),
            function() {
                var e = t.apply(this, arguments);
                return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
            }
    }, j.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, j.defer = function(n) {
        return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1)))
    }, j.throttle = function(n, t, r) {
        var e, u, i, a = null,
            o = 0;
        r || (r = {});
        var c = function() {
            o = r.leading === !1 ? 0 : new Date, a = null, i = n.apply(e, u)
        };
        return function() {
            var l = new Date;
            o || r.leading !== !1 || (o = l);
            var f = t - (l - o);
            return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u)) : a || r.trailing === !1 || (a = setTimeout(c, f)), i
        }
    }, j.debounce = function(n, t, r) {
        var e, u = null;
        return function() {
            var i = this,
                a = arguments,
                o = function() {
                    u = null, r || (e = n.apply(i, a))
                },
                c = r && !u;
            return clearTimeout(u), u = setTimeout(o, t), c && (e = n.apply(i, a)), e
        }
    }, j.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
        }
    }, j.wrap = function(n, t) {
        return function() {
            var r = [n];
            return a.apply(r, arguments), t.apply(this, r)
        }
    }, j.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)];
            return t[0]
        }
    }, j.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, j.keys = _ || function(n) {
        if (n !== Object(n)) throw new TypeError("Invalid object");
        var t = [];
        for (var r in n) j.has(n, r) && t.push(r);
        return t
    }, j.values = function(n) {
        var t = [];
        for (var r in n) j.has(n, r) && t.push(n[r]);
        return t
    }, j.pairs = function(n) {
        var t = [];
        for (var r in n) j.has(n, r) && t.push([r, n[r]]);
        return t
    }, j.invert = function(n) {
        var t = {};
        for (var r in n) j.has(n, r) && (t[n[r]] = r);
        return t
    }, j.functions = j.methods = function(n) {
        var t = [];
        for (var r in n) j.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, j.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t) n[r] = t[r]
        }), n
    }, j.pick = function(n) {
        var t = {},
            r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) {
            r in n && (t[r] = n[r])
        }), t
    }, j.omit = function(n) {
        var t = {},
            r = c.apply(e, o.call(arguments, 1));
        for (var u in n) j.contains(r, u) || (t[u] = n[u]);
        return t
    }, j.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t) n[r] === void 0 && (n[r] = t[r])
        }), n
    }, j.clone = function(n) {
        return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n
    }, j.tap = function(n, t) {
        return t(n), n
    };
    var S = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t)) return !1;
        switch (u) {
            case "[object String]":
                return n == String(t);
            case "[object Number]":
                return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n == +t;
            case "[object RegExp]":
                return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--;)
            if (r[i] == n) return e[i] == t;
        var a = n.constructor,
            o = t.constructor;
        if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o)) return !1;
        r.push(n), e.push(t);
        var c = 0,
            f = !0;
        if ("[object Array]" == u) {
            if (c = n.length, f = c == t.length)
                for (; c-- && (f = S(n[c], t[c], r, e)););
        } else {
            for (var s in n)
                if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e)))) break;
            if (f) {
                for (s in t)
                    if (j.has(t, s) && !c--) break;
                f = !c
            }
        }
        return r.pop(), e.pop(), f
    };
    j.isEqual = function(n, t) {
        return S(n, t, [], [])
    }, j.isEmpty = function(n) {
        if (null == n) return !0;
        if (j.isArray(n) || j.isString(n)) return 0 === n.length;
        for (var t in n)
            if (j.has(n, t)) return !1;
        return !0
    }, j.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, j.isArray = x || function(n) {
        return "[object Array]" == l.call(n)
    }, j.isObject = function(n) {
        return n === Object(n)
    }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
        j["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]"
        }
    }), j.isArguments(arguments) || (j.isArguments = function(n) {
        return !(!n || !j.has(n, "callee"))
    }), "function" != typeof /./ && (j.isFunction = function(n) {
        return "function" == typeof n
    }), j.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, j.isNaN = function(n) {
        return j.isNumber(n) && n != +n
    }, j.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
    }, j.isNull = function(n) {
        return null === n
    }, j.isUndefined = function(n) {
        return n === void 0
    }, j.has = function(n, t) {
        return f.call(n, t)
    }, j.noConflict = function() {
        return n._ = t, this
    }, j.identity = function(n) {
        return n
    }, j.times = function(n, t, r) {
        for (var e = Array(Math.max(0, n)), u = 0; n > u; u++) e[u] = t.call(r, u);
        return e
    }, j.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    };
    var I = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    I.unescape = j.invert(I.escape);
    var T = {
        escape: new RegExp("[" + j.keys(I.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + j.keys(I.unescape).join("|") + ")", "g")
    };
    j.each(["escape", "unescape"], function(n) {
        j[n] = function(t) {
            return null == t ? "" : ("" + t).replace(T[n], function(t) {
                return I[n][t]
            })
        }
    }), j.result = function(n, t) {
        if (null == n) return void 0;
        var r = n[t];
        return j.isFunction(r) ? r.call(n) : r
    }, j.mixin = function(n) {
        A(j.functions(n), function(t) {
            var r = j[t] = n[t];
            j.prototype[t] = function() {
                var n = [this._wrapped];
                return a.apply(n, arguments), z.call(this, r.apply(j, n))
            }
        })
    };
    var N = 0;
    j.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t
    }, j.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var q = /(.)^/,
        B = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "   ": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    j.template = function(n, t, r) {
        var e;
        r = j.defaults({}, r, j.templateSettings);
        var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"),
            i = 0,
            a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(D, function(n) {
                return "\\" + B[n]
            }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t
        }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = new Function(r.variable || "obj", "_", a)
        } catch (o) {
            throw o.source = a, o
        }
        if (t) return e(t, j);
        var c = function(n) {
            return e.call(this, n, j)
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c
    }, j.chain = function(n) {
        return j(n).chain()
    };
    var z = function(n) {
        return this._chain ? j(n).chain() : n
    };
    j.mixin(j), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], z.call(this, r)
        }
    }), A(["concat", "join", "slice"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            return z.call(this, t.apply(this._wrapped, arguments))
        }
    }), j.extend(j.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    })
}.call(this);
! function(t) {
    var e = {},
        s = {
            mode: "horizontal",
            slideSelector: "",
            infiniteLoop: !0,
            hideControlOnEnd: !1,
            speed: 500,
            easing: null,
            slideMargin: 0,
            startSlide: 0,
            randomStart: !1,
            captions: !1,
            ticker: !1,
            tickerHover: !1,
            adaptiveHeight: !1,
            adaptiveHeightSpeed: 500,
            video: !1,
            useCSS: !0,
            preloadImages: "visible",
            responsive: !0,
            touchEnabled: !0,
            swipeThreshold: 50,
            oneToOneTouch: !0,
            preventDefaultSwipeX: !0,
            preventDefaultSwipeY: !1,
            pager: !0,
            pagerType: "full",
            pagerShortSeparator: " / ",
            pagerSelector: null,
            buildPager: null,
            pagerCustom: null,
            controls: !0,
            nextText: "Next",
            prevText: "Prev",
            nextSelector: null,
            prevSelector: null,
            autoControls: !1,
            startText: "Start",
            stopText: "Stop",
            autoControlsCombine: !1,
            autoControlsSelector: null,
            auto: !1,
            pause: 4e3,
            autoStart: !0,
            autoDirection: "next",
            autoHover: !1,
            autoDelay: 0,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 0,
            slideWidth: 0,
            onSliderLoad: function() {},
            onSlideBefore: function() {},
            onSlideAfter: function() {},
            onSlideNext: function() {},
            onSlidePrev: function() {}
        };
    t.fn.bxSlider = function(n) {
        if (0 == this.length) return this;
        if (this.length > 1) return this.each(function() {
            t(this).bxSlider(n)
        }), this;
        var o = {},
            r = this;
        e.el = this;
        var a = t(window).width(),
            l = t(window).height(),
            d = function() {
                o.settings = t.extend({}, s, n), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = {
                    index: o.settings.startSlide
                }, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" == o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && function() {
                    var t = document.createElement("div"),
                        e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in e)
                        if (void 0 !== t.style[e[i]]) return o.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0;
                    return !1
                }(), "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), r.data("origStyle", r.attr("style")), r.children(o.settings.slideSelector).each(function() {
                    t(this).data("origStyle", t(this).attr("style"))
                }), c()
            },
            c = function() {
                r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), o.viewport = r.parent(), o.loader = t('<div class="bx-loading" />'), o.viewport.prepend(o.loader), r.css({
                    width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%" : "auto",
                    position: "relative"
                }), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), f(), o.viewport.css({
                    width: "100%",
                    overflow: "hidden",
                    position: "relative"
                }), o.viewport.parent().css({
                    maxWidth: v()
                }), o.settings.pager || o.viewport.parent().css({
                    margin: "0 auto 0px"
                }), o.children.css({
                    "float": "horizontal" == o.settings.mode ? "left" : "none",
                    listStyle: "none",
                    position: "relative"
                }), o.children.css("width", u()), "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" == o.settings.mode && (o.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none"
                }), o.children.eq(o.settings.startSlide).css({
                    zIndex: 50,
                    display: "block"
                })), o.controls.el = t('<div class="bx-controls" />'), o.settings.captions && P(), o.active.last = o.settings.startSlide == x() - 1, o.settings.video && r.fitVids();
                var e = o.children.eq(o.settings.startSlide);
                "all" == o.settings.preloadImages && (e = o.children), o.settings.ticker ? o.settings.pager = !1 : (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), g(e, h)
            },
            g = function(e, i) {
                var s = e.find("img, iframe").length;
                if (0 == s) return i(), void 0;
                var n = 0;
                e.find("img, iframe").each(function() {
                    t(this).is("img") && t(this).attr("src", t(this).attr("src") + "?timestamp=1"), t(this).load(function() {
                        setTimeout(function() {
                            ++n == s && i()
                        }, 0)
                    })
                })
            },
            h = function() {
                if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
                    var e = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides,
                        i = o.children.slice(0, e).clone().addClass("bx-clone"),
                        s = o.children.slice(-e).clone().addClass("bx-clone");
                    r.append(i).prepend(s)
                }
                o.loader.remove(), S(), "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(p()), r.redrawSlider(), o.settings.onSliderLoad(o.active.index), o.initialized = !0, o.settings.responsive && t(window).bind("resize", B), o.settings.auto && o.settings.autoStart && H(), o.settings.ticker && L(), o.settings.pager && I(o.settings.startSlide), o.settings.controls && W(), o.settings.touchEnabled && !o.settings.ticker && O()
            },
            p = function() {
                var e = 0,
                    s = t();
                if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)
                    if (o.carousel) {
                        var n = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m();
                        for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++) s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i))
                    } else s = o.children.eq(o.active.index);
                else s = o.children;
                return "vertical" == o.settings.mode ? (s.each(function() {
                    e += t(this).outerHeight()
                }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, s.map(function() {
                    return t(this).outerHeight(!1)
                }).get()), e
            },
            v = function() {
                var t = "100%";
                return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t
            },
            u = function() {
                var t = o.settings.slideWidth,
                    e = o.viewport.width();
                return 0 == o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" == o.settings.mode ? t = e : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)), t
            },
            f = function() {
                var t = 1;
                if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)
                    if (o.viewport.width() < o.minThreshold) t = o.settings.minSlides;
                    else if (o.viewport.width() > o.maxThreshold) t = o.settings.maxSlides;
                else {
                    var e = o.children.first().width();
                    t = Math.floor(o.viewport.width() / e)
                } else "vertical" == o.settings.mode && (t = o.settings.minSlides);
                return t
            },
            x = function() {
                var t = 0;
                if (o.settings.moveSlides > 0)
                    if (o.settings.infiniteLoop) t = o.children.length / m();
                    else
                        for (var e = 0, i = 0; e < o.children.length;) ++t, e = i + f(), i += o.settings.moveSlides <= f() ? o.settings.moveSlides : f();
                else t = Math.ceil(o.children.length / f());
                return t
            },
            m = function() {
                return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides : f()
            },
            S = function() {
                if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
                    if ("horizontal" == o.settings.mode) {
                        var t = o.children.last(),
                            e = t.position();
                        b(-(e.left - (o.viewport.width() - t.width())), "reset", 0)
                    } else if ("vertical" == o.settings.mode) {
                        var i = o.children.length - o.settings.minSlides,
                            e = o.children.eq(i).position();
                        b(-e.top, "reset", 0)
                    }
                } else {
                    var e = o.children.eq(o.active.index * m()).position();
                    o.active.index == x() - 1 && (o.active.last = !0), void 0 != e && ("horizontal" == o.settings.mode ? b(-e.left, "reset", 0) : "vertical" == o.settings.mode && b(-e.top, "reset", 0))
                }
            },
            b = function(t, e, i, s) {
                if (o.usingCSS) {
                    var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                    r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == e ? (r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D()
                    })) : "reset" == e ? r.css(o.animProp, n) : "ticker" == e && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(s.resetValue, "reset", 0), N()
                    }))
                } else {
                    var a = {};
                    a[o.animProp] = t, "slide" == e ? r.animate(a, i, o.settings.easing, function() {
                        D()
                    }) : "reset" == e ? r.css(o.animProp, t) : "ticker" == e && r.animate(a, speed, "linear", function() {
                        b(s.resetValue, "reset", 0), N()
                    })
                }
            },
            w = function() {
                for (var e = "", i = x(), s = 0; i > s; s++) {
                    var n = "";
                    o.settings.buildPager && t.isFunction(o.settings.buildPager) ? (n = o.settings.buildPager(s), o.pagerEl.addClass("bx-custom-pager")) : (n = s + 1, o.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>"
                }
                o.pagerEl.html(e)
            },
            T = function() {
                o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), w()), o.pagerEl.delegate("a", "click", q)
            },
            C = function() {
                o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"), o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"), o.controls.next.bind("click", y), o.controls.prev.bind("click", z), o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
            },
            E = function() {
                o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"), o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = t('<div class="bx-controls-auto" />'), o.controls.autoEl.delegate(".bx-start", "click", k), o.controls.autoEl.delegate(".bx-stop", "click", M), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl), A(o.settings.autoStart ? "stop" : "start")
            },
            P = function() {
                o.children.each(function() {
                    var e = t(this).find("img:first").attr("title");
                    void 0 != e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
                })
            },
            y = function(t) {
                o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault()
            },
            z = function(t) {
                o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault()
            },
            k = function(t) {
                r.startAuto(), t.preventDefault()
            },
            M = function(t) {
                r.stopAuto(), t.preventDefault()
            },
            q = function(e) {
                o.settings.auto && r.stopAuto();
                var i = t(e.currentTarget),
                    s = parseInt(i.attr("data-slide-index"));
                s != o.active.index && r.goToSlide(s), e.preventDefault()
            },
            I = function(e) {
                var i = o.children.length;
                return "short" == o.settings.pagerType ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0) : (o.pagerEl.find("a").removeClass("active"), o.pagerEl.each(function(i, s) {
                    t(s).find("a").eq(e).addClass("active")
                }), void 0)
            },
            D = function() {
                if (o.settings.infiniteLoop) {
                    var t = "";
                    0 == o.active.index ? t = o.children.eq(0).position() : o.active.index == x() - 1 && o.carousel ? t = o.children.eq((x() - 1) * m()).position() : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()), "horizontal" == o.settings.mode ? b(-t.left, "reset", 0) : "vertical" == o.settings.mode && b(-t.top, "reset", 0)
                }
                o.working = !1, o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index)
            },
            A = function(t) {
                o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
            },
            W = function() {
                1 == x() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == x() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
            },
            H = function() {
                o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(), o.settings.autoHover && r.hover(function() {
                    o.interval && (r.stopAuto(!0), o.autoPaused = !0)
                }, function() {
                    o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
                })
            },
            L = function() {
                var e = 0;
                if ("next" == o.settings.autoDirection) r.append(o.children.clone().addClass("bx-clone"));
                else {
                    r.prepend(o.children.clone().addClass("bx-clone"));
                    var i = o.children.first().position();
                    e = "horizontal" == o.settings.mode ? -i.left : -i.top
                }
                b(e, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function() {
                    r.stop()
                }, function() {
                    var e = 0;
                    o.children.each(function() {
                        e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                    });
                    var i = o.settings.speed / e,
                        s = "horizontal" == o.settings.mode ? "left" : "top",
                        n = i * (e - Math.abs(parseInt(r.css(s))));
                    N(n)
                }), N()
            },
            N = function(t) {
                speed = t ? t : o.settings.speed;
                var e = {
                        left: 0,
                        top: 0
                    },
                    i = {
                        left: 0,
                        top: 0
                    };
                "next" == o.settings.autoDirection ? e = r.find(".bx-clone").first().position() : i = o.children.first().position();
                var s = "horizontal" == o.settings.mode ? -e.left : -e.top,
                    n = "horizontal" == o.settings.mode ? -i.left : -i.top,
                    a = {
                        resetValue: n
                    };
                b(s, "ticker", speed, a)
            },
            O = function() {
                o.touch = {
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                }, o.viewport.bind("touchstart", X)
            },
            X = function(t) {
                if (o.working) t.preventDefault();
                else {
                    o.touch.originalPos = r.position();
                    var e = t.originalEvent;
                    o.touch.start.x = e.changedTouches[0].pageX, o.touch.start.y = e.changedTouches[0].pageY, o.viewport.bind("touchmove", Y), o.viewport.bind("touchend", V)
                }
            },
            Y = function(t) {
                var e = t.originalEvent,
                    i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x),
                    s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
                if (3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) {
                    var n = 0;
                    if ("horizontal" == o.settings.mode) {
                        var r = e.changedTouches[0].pageX - o.touch.start.x;
                        n = o.touch.originalPos.left + r
                    } else {
                        var r = e.changedTouches[0].pageY - o.touch.start.y;
                        n = o.touch.originalPos.top + r
                    }
                    b(n, "reset", 0)
                }
            },
            V = function(t) {
                o.viewport.unbind("touchmove", Y);
                var e = t.originalEvent,
                    i = 0;
                if (o.touch.end.x = e.changedTouches[0].pageX, o.touch.end.y = e.changedTouches[0].pageY, "fade" == o.settings.mode) {
                    var s = Math.abs(o.touch.start.x - o.touch.end.x);
                    s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
                } else {
                    var s = 0;
                    "horizontal" == o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 == o.active.index && s > 0 || o.active.last && 0 > s) ? b(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : b(i, "reset", 200)
                }
                o.viewport.unbind("touchend", V)
            },
            B = function() {
                var e = t(window).width(),
                    i = t(window).height();
                (a != e || l != i) && (a = e, l = i, r.redrawSlider())
            };
        return r.goToSlide = function(e, i) {
            if (!o.working && o.active.index != e)
                if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= x() - 1, o.settings.pager && I(o.active.index), o.settings.controls && W(), "fade" == o.settings.mode) o.settings.adaptiveHeight && o.viewport.height() != p() && o.viewport.animate({
                    height: p()
                }, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({
                    zIndex: 0
                }), o.children.eq(o.active.index).css("zIndex", 51).fadeIn(o.settings.speed, function() {
                    t(this).css("zIndex", 50), D()
                });
                else {
                    o.settings.adaptiveHeight && o.viewport.height() != p() && o.viewport.animate({
                        height: p()
                    }, o.settings.adaptiveHeightSpeed);
                    var s = 0,
                        n = {
                            left: 0,
                            top: 0
                        };
                    if (!o.settings.infiniteLoop && o.carousel && o.active.last)
                        if ("horizontal" == o.settings.mode) {
                            var a = o.children.eq(o.children.length - 1);
                            n = a.position(), s = o.viewport.width() - a.outerWidth()
                        } else {
                            var l = o.children.length - o.settings.minSlides;
                            n = o.children.eq(l).position()
                        }
                    else if (o.carousel && o.active.last && "prev" == i) {
                        var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides),
                            a = r.children(".bx-clone").eq(d);
                        n = a.position()
                    } else if ("next" == i && 0 == o.active.index) n = r.find("> .bx-clone").eq(o.settings.maxSlides).position(), o.active.last = !1;
                    else if (e >= 0) {
                        var c = e * m();
                        n = o.children.eq(c).position()
                    }
                    if ("undefined" != typeof n) {
                        var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
                        b(g, "slide", o.settings.speed)
                    }
                }
        }, r.goToNextSlide = function() {
            if (o.settings.infiniteLoop || !o.active.last) {
                var t = parseInt(o.active.index) + 1;
                r.goToSlide(t, "next")
            }
        }, r.goToPrevSlide = function() {
            if (o.settings.infiniteLoop || 0 != o.active.index) {
                var t = parseInt(o.active.index) - 1;
                r.goToSlide(t, "prev")
            }
        }, r.startAuto = function(t) {
            o.interval || (o.interval = setInterval(function() {
                "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
            }, o.settings.pause), o.settings.autoControls && 1 != t && A("stop"))
        }, r.stopAuto = function(t) {
            o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != t && A("start"))
        }, r.getCurrentSlide = function() {
            return o.active.index
        }, r.getSlideCount = function() {
            return o.children.length
        }, r.redrawSlider = function() {
            o.children.add(r.find(".bx-clone")).outerWidth(u()), o.viewport.css("height", p()), o.settings.ticker || S(), o.active.last && (o.active.index = x() - 1), o.active.index >= x() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (w(), I(o.active.index))
        }, r.destroySlider = function() {
            o.initialized && (o.initialized = !1, t(".bx-clone", this).remove(), o.children.each(function() {
                void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.pagerEl.remove(), t(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", B))
        }, r.reloadSlider = function(t) {
            void 0 != t && (n = t), r.destroySlider(), d()
        }, d(), this
    }
}(jQuery);
document.createElement("canvas").getContext || function() {
    function C() {}

    function B(a) {
        this.type_ = a, this.r1_ = this.y1_ = this.x1_ = this.r0_ = this.y0_ = this.x0_ = 0, this.colors_ = []
    }

    function A(a, b, c) {
        !z(b) || (a.m_ = b, c && (a.lineScale_ = f(e(b[0][0] * b[1][1] - b[0][1] * b[1][0]))))
    }

    function z(a) {
        var b = 0;
        for (; b < 3; b++) {
            var c = 0;
            for (; c < 2; c++)
                if (!isFinite(a[b][c]) || isNaN(a[b][c])) return !1
        }
        return !0
    }

    function y(a, b, c, d) {
        a.currentPath_.push({
            type: "bezierCurveTo",
            cp1x: b.x,
            cp1y: b.y,
            cp2x: c.x,
            cp2y: c.y,
            x: d.x,
            y: d.y
        }), a.currentX_ = d.x, a.currentY_ = d.y
    }

    function w(a) {
        this.m_ = r(), this.mStack_ = [], this.aStack_ = [], this.currentPath_ = [], this.fillStyle = this.strokeStyle = "#000", this.lineWidth = 1, this.lineJoin = "miter", this.lineCap = "butt", this.miterLimit = g * 1, this.globalAlpha = 1, this.canvas = a;
        var b = a.ownerDocument.createElement("div");
        b.style.width = a.clientWidth + "px", b.style.height = a.clientHeight + "px", b.style.overflow = "hidden", b.style.position = "absolute", a.appendChild(b), this.element_ = b, this.lineScale_ = this.arcScaleY_ = this.arcScaleX_ = 1
    }

    function v(a) {
        switch (a) {
            case "butt":
                return "flat";
            case "round":
                return "round";
            case "square":
            default:
                return "square"
        }
    }

    function u(a) {
        var b, c = 1;
        a = String(a);
        if (a.substring(0, 3) == "rgb") {
            var d = a.indexOf("(", 3),
                e = a.indexOf(")", d + 1),
                f = a.substring(d + 1, e).split(",");
            b = "#";
            var g = 0;
            for (; g < 3; g++) b += o[Number(f[g])];
            f.length == 4 && a.substr(3, 1) == "a" && (c = f[3])
        } else b = a;
        return {
            color: b,
            alpha: c
        }
    }

    function t(a, b) {
        b.fillStyle = a.fillStyle, b.lineCap = a.lineCap, b.lineJoin = a.lineJoin, b.lineWidth = a.lineWidth, b.miterLimit = a.miterLimit, b.shadowBlur = a.shadowBlur, b.shadowColor = a.shadowColor, b.shadowOffsetX = a.shadowOffsetX, b.shadowOffsetY = a.shadowOffsetY, b.strokeStyle = a.strokeStyle, b.globalAlpha = a.globalAlpha, b.arcScaleX_ = a.arcScaleX_, b.arcScaleY_ = a.arcScaleY_, b.lineScale_ = a.lineScale_
    }

    function s(a, b) {
        var c = r(),
            d = 0;
        for (; d < 3; d++) {
            var e = 0;
            for (; e < 3; e++) {
                var f = 0,
                    g = 0;
                for (; g < 3; g++) f += a[d][g] * b[g][e];
                c[d][e] = f
            }
        }
        return c
    }

    function r() {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
    }

    function n(a) {
        var b = a.srcElement;
        b.firstChild && (b.firstChild.style.width = b.clientWidth + "px", b.firstChild.style.height = b.clientHeight + "px")
    }

    function m(a) {
        var b = a.srcElement;
        switch (a.propertyName) {
            case "width":
                b.style.width = b.attributes.width.nodeValue + "px", b.getContext().clearRect();
                break;
            case "height":
                b.style.height = b.attributes.height.nodeValue + "px", b.getContext().clearRect()
        }
    }

    function k(a, b) {
        var c = j.call(arguments, 2);
        return function() {
            return a.apply(b, c.concat(j.call(arguments)))
        }
    }

    function i() {
        return this.context_ || (this.context_ = new w(this))
    }
    var a = Math,
        b = a.round,
        c = a.sin,
        d = a.cos,
        e = a.abs,
        f = a.sqrt,
        g = 10,
        h = g / 2,
        j = Array.prototype.slice,
        l = {
            init: function(a) {
                if (/MSIE/.test(navigator.userAgent) && !window.opera) {
                    var b = a || document;
                    b.createElement("canvas"), b.attachEvent("onreadystatechange", k(this.init_, this, b))
                }
            },
            init_: function(a) {
                a.namespaces.g_vml_ || a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML"), a.namespaces.g_o_ || a.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML");
                if (!a.styleSheets.ex_canvas_) {
                    var b = a.createStyleSheet();
                    b.owningElement.id = "ex_canvas_", b.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"
                }
                var c = a.getElementsByTagName("canvas"),
                    d = 0;
                for (; d < c.length; d++) this.initElement(c[d])
            },
            initElement: function(a) {
                if (!a.getContext) {
                    a.getContext = i, a.innerHTML = "", a.attachEvent("onpropertychange", m), a.attachEvent("onresize", n);
                    var b = a.attributes;
                    b.width && b.width.specified ? a.style.width = b.width.nodeValue + "px" : a.width = a.clientWidth, b.height && b.height.specified ? a.style.height = b.height.nodeValue + "px" : a.height = a.clientHeight
                }
                return a
            }
        };
    l.init();
    var o = [],
        p = 0;
    for (; p < 16; p++) {
        var q = 0;
        for (; q < 16; q++) o[p * 16 + q] = p.toString(16) + q.toString(16)
    }
    var x = w.prototype;
    x.clearRect = function() {
        this.element_.innerHTML = ""
    }, x.beginPath = function() {
        this.currentPath_ = []
    }, x.moveTo = function(a, b) {
        var c = this.getCoords_(a, b);
        this.currentPath_.push({
            type: "moveTo",
            x: c.x,
            y: c.y
        }), this.currentX_ = c.x, this.currentY_ = c.y
    }, x.lineTo = function(a, b) {
        var c = this.getCoords_(a, b);
        this.currentPath_.push({
            type: "lineTo",
            x: c.x,
            y: c.y
        }), this.currentX_ = c.x, this.currentY_ = c.y
    }, x.bezierCurveTo = function(a, b, c, d, e, f) {
        var g = this.getCoords_(e, f),
            h = this.getCoords_(a, b),
            i = this.getCoords_(c, d);
        y(this, h, i, g)
    }, x.quadraticCurveTo = function(a, b, c, d) {
        var e = this.getCoords_(a, b),
            f = this.getCoords_(c, d),
            g = {
                x: this.currentX_ + .6666666666666666 * (e.x - this.currentX_),
                y: this.currentY_ + .6666666666666666 * (e.y - this.currentY_)
            };
        y(this, g, {
            x: g.x + (f.x - this.currentX_) / 3,
            y: g.y + (f.y - this.currentY_) / 3
        }, f)
    }, x.arc = function(a, b, e, f, i, j) {
        e *= g;
        var k = j ? "at" : "wa",
            l = a + d(f) * e - h,
            m = b + c(f) * e - h,
            n = a + d(i) * e - h,
            o = b + c(i) * e - h;
        l == n && !j && (l += .125);
        var p = this.getCoords_(a, b),
            q = this.getCoords_(l, m),
            r = this.getCoords_(n, o);
        this.currentPath_.push({
            type: k,
            x: p.x,
            y: p.y,
            radius: e,
            xStart: q.x,
            yStart: q.y,
            xEnd: r.x,
            yEnd: r.y
        })
    }, x.rect = function(a, b, c, d) {
        this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), this.lineTo(a, b + d), this.closePath()
    }, x.strokeRect = function(a, b, c, d) {
        var e = this.currentPath_;
        this.beginPath(), this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), this.lineTo(a, b + d), this.closePath(), this.stroke(), this.currentPath_ = e
    }, x.fillRect = function(a, b, c, d) {
        var e = this.currentPath_;
        this.beginPath(), this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), this.lineTo(a, b + d), this.closePath(), this.fill(), this.currentPath_ = e
    }, x.createLinearGradient = function(a, b, c, d) {
        var e = new B("gradient");
        e.x0_ = a, e.y0_ = b, e.x1_ = c, e.y1_ = d;
        return e
    }, x.createRadialGradient = function(a, b, c, d, e, f) {
        var g = new B("gradientradial");
        g.x0_ = a, g.y0_ = b, g.r0_ = c, g.x1_ = d, g.y1_ = e, g.r1_ = f;
        return g
    }, x.drawImage = function(c) {
        var d, e, f, h, i, j, k, l, m = c.runtimeStyle.width,
            n = c.runtimeStyle.height;
        c.runtimeStyle.width = "auto", c.runtimeStyle.height = "auto";
        var o = c.width,
            p = c.height;
        c.runtimeStyle.width = m, c.runtimeStyle.height = n;
        if (arguments.length == 3) d = arguments[1], e = arguments[2], i = j = 0, k = f = o, l = h = p;
        else if (arguments.length == 5) d = arguments[1], e = arguments[2], f = arguments[3], h = arguments[4], i = j = 0, k = o, l = p;
        else if (arguments.length == 9) i = arguments[1], j = arguments[2], k = arguments[3], l = arguments[4], d = arguments[5], e = arguments[6], f = arguments[7], h = arguments[8];
        else throw Error("Invalid number of arguments");
        var q = this.getCoords_(d, e),
            r = [];
        r.push(" <g_vml_:group", ' coordsize="', g * 10, ",", g * 10, '"', ' coordorigin="0,0"', ' style="width:', 10, "px;height:", 10, "px;position:absolute;");
        if (this.m_[0][0] != 1 || this.m_[0][1]) {
            var s = [];
            s.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", b(q.x / g), ",", "Dy=", b(q.y / g), "");
            var t = q,
                u = this.getCoords_(d + f, e),
                v = this.getCoords_(d, e + h),
                w = this.getCoords_(d + f, e + h);
            t.x = a.max(t.x, u.x, v.x, w.x), t.y = a.max(t.y, u.y, v.y, w.y), r.push("padding:0 ", b(t.x / g), "px ", b(t.y / g), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", s.join(""), ", sizingmethod='clip');")
        } else r.push("top:", b(q.y / g), "px;left:", b(q.x / g), "px;");
        r.push(' ">', '<g_vml_:image src="', c.src, '"', ' style="width:', g * f, "px;", " height:", g * h, 'px;"', ' cropleft="', i / o, '"', ' croptop="', j / p, '"', ' cropright="', (o - i - k) / o, '"', ' cropbottom="', (p - j - l) / p, '"', " />", "</g_vml_:group>"), this.element_.insertAdjacentHTML("BeforeEnd", r.join(""))
    }, x.stroke = function(c) {
        var d = [],
            e = u(c ? this.fillStyle : this.strokeStyle),
            f = e.color,
            h = e.alpha * this.globalAlpha;
        d.push("<g_vml_:shape", ' filled="', !!c, '"', ' style="position:absolute;width:', 10, "px;height:", 10, 'px;"', ' coordorigin="0 0" coordsize="', g * 10, " ", g * 10, '"', ' stroked="', !c, '"', ' path="');
        var i = {
                x: null,
                y: null
            },
            j = {
                x: null,
                y: null
            },
            k = 0;
        for (; k < this.currentPath_.length; k++) {
            var l = this.currentPath_[k];
            switch (l.type) {
                case "moveTo":
                    d.push(" m ", b(l.x), ",", b(l.y));
                    break;
                case "lineTo":
                    d.push(" l ", b(l.x), ",", b(l.y));
                    break;
                case "close":
                    d.push(" x "), l = null;
                    break;
                case "bezierCurveTo":
                    d.push(" c ", b(l.cp1x), ",", b(l.cp1y), ",", b(l.cp2x), ",", b(l.cp2y), ",", b(l.x), ",", b(l.y));
                    break;
                case "at":
                case "wa":
                    d.push(" ", l.type, " ", b(l.x - this.arcScaleX_ * l.radius), ",", b(l.y - this.arcScaleY_ * l.radius), " ", b(l.x + this.arcScaleX_ * l.radius), ",", b(l.y + this.arcScaleY_ * l.radius), " ", b(l.xStart), ",", b(l.yStart), " ", b(l.xEnd), ",", b(l.yEnd))
            }
            if (l) {
                if (i.x == null || l.x < i.x) i.x = l.x;
                if (j.x == null || l.x > j.x) j.x = l.x;
                if (i.y == null || l.y < i.y) i.y = l.y;
                if (j.y == null || l.y > j.y) j.y = l.y
            }
        }
        d.push(' ">');
        if (c)
            if (typeof this.fillStyle == "object") {
                var m = this.fillStyle,
                    n = 0,
                    o = {
                        x: 0,
                        y: 0
                    },
                    p = 0,
                    q = 1;
                if (m.type_ == "gradient") {
                    var r = m.x1_ / this.arcScaleX_,
                        s = m.y1_ / this.arcScaleY_,
                        t = this.getCoords_(m.x0_ / this.arcScaleX_, m.y0_ / this.arcScaleY_),
                        w = this.getCoords_(r, s);
                    n = Math.atan2(w.x - t.x, w.y - t.y) * 180 / Math.PI, n < 0 && (n += 360), n < 1e-6 && (n = 0)
                } else {
                    var t = this.getCoords_(m.x0_, m.y0_),
                        x = j.x - i.x,
                        y = j.y - i.y;
                    o = {
                        x: (t.x - i.x) / x,
                        y: (t.y - i.y) / y
                    }, x /= this.arcScaleX_ * g, y /= this.arcScaleY_ * g;
                    var z = a.max(x, y);
                    p = 2 * m.r0_ / z, q = 2 * m.r1_ / z - p
                }
                var A = m.colors_;
                A.sort(function(a, b) {
                    return a.offset - b.offset
                });
                var B = A.length,
                    C = A[0].color,
                    D = A[B - 1].color,
                    E = A[0].alpha * this.globalAlpha,
                    F = A[B - 1].alpha * this.globalAlpha,
                    G = [],
                    k = 0;
                for (; k < B; k++) {
                    var H = A[k];
                    G.push(H.offset * q + p + " " + H.color)
                }
                d.push('<g_vml_:fill type="', m.type_, '"', ' method="none" focus="100%"', ' color="', C, '"', ' color2="', D, '"', ' colors="', G.join(","), '"', ' opacity="', F, '"', ' g_o_:opacity2="', E, '"', ' angle="', n, '"', ' focusposition="', o.x, ",", o.y, '" />')
            } else d.push('<g_vml_:fill color="', f, '" opacity="', h, '" />');
        else {
            var I = this.lineScale_ * this.lineWidth;
            I < 1 && (h *= I), d.push("<g_vml_:stroke", ' opacity="', h, '"', ' joinstyle="', this.lineJoin, '"', ' miterlimit="', this.miterLimit, '"', ' endcap="', v(this.lineCap), '"', ' weight="', I, 'px"', ' color="', f, '" />')
        }
        d.push("</g_vml_:shape>"), this.element_.insertAdjacentHTML("beforeEnd", d.join(""))
    }, x.fill = function() {
        this.stroke(!0)
    }, x.closePath = function() {
        this.currentPath_.push({
            type: "close"
        })
    }, x.getCoords_ = function(a, b) {
        var c = this.m_;
        return {
            x: g * (a * c[0][0] + b * c[1][0] + c[2][0]) - h,
            y: g * (a * c[0][1] + b * c[1][1] + c[2][1]) - h
        }
    }, x.save = function() {
        var a = {};
        t(this, a), this.aStack_.push(a), this.mStack_.push(this.m_), this.m_ = s(r(), this.m_)
    }, x.restore = function() {
        t(this.aStack_.pop(), this), this.m_ = this.mStack_.pop()
    }, x.translate = function(a, b) {
        A(this, s([
            [1, 0, 0],
            [0, 1, 0],
            [a, b, 1]
        ], this.m_), !1)
    }, x.rotate = function(a) {
        var b = d(a),
            e = c(a);
        A(this, s([
            [b, e, 0],
            [-e, b, 0],
            [0, 0, 1]
        ], this.m_), !1)
    }, x.scale = function(a, b) {
        this.arcScaleX_ *= a, this.arcScaleY_ *= b, A(this, s([
            [a, 0, 0],
            [0, b, 0],
            [0, 0, 1]
        ], this.m_), !0)
    }, x.transform = function(a, b, c, d, e, f) {
        A(this, s([
            [a, b, 0],
            [c, d, 0],
            [e, f, 1]
        ], this.m_), !0)
    }, x.setTransform = function(a, b, c, d, e, f) {
        A(this, [
            [a, b, 0],
            [c, d, 0],
            [e, f, 1]
        ], !0)
    }, x.clip = function() {}, x.arcTo = function() {}, x.createPattern = function() {
        return new C
    }, B.prototype.addColorStop = function(a, b) {
        b = u(b), this.colors_.push({
            offset: a,
            color: b.color,
            alpha: b.alpha
        })
    }, G_vmlCanvasManager = l, CanvasRenderingContext2D = w, CanvasGradient = B, CanvasPattern = C
}();
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory)
    } else {
        factory(jQuery)
    }
})(function($) {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s)
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s)
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value))
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        }
        try {
            s = decodeURIComponent(s.replace(pluses, " "))
        } catch (e) {
            return
        }
        try {
            return config.json ? JSON.parse(s) : s
        } catch (e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value
    }
    var config = $.cookie = function(key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === "number") {
                var days = options.expires,
                    t = options.expires = new Date;
                t.setDate(t.getDate() + days)
            }
            return document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
        }
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split("=");
            var name = decode(parts.shift());
            var cookie = parts.join("=");
            if (key && key === name) {
                result = read(cookie, value);
                break
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie
            }
        }
        return result
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) !== undefined) {
            $.cookie(key, "", $.extend({}, options, {
                expires: -1
            }));
            return true
        }
        return false
    }
});
var Spinners = {
    version: "3.0.0"
};
(function(a) {
    function b(a) {
        return a * Math.PI / 180
    }

    function c(a) {
        this.element = a
    }

    function d(b, c) {
        b && (this.element = b, h.remove(b), h.removeDetached(), this._position = 0, this._state = "stopped", this.setOptions(a.extend({
            color: "#000",
            dashes: 12,
            radius: 5,
            height: 5,
            width: 1.8,
            opacity: 1,
            padding: 3,
            rotation: 700
        }, c || {})), this.drawPosition(0), h.add(this))
    }
    var e = {
            scroll: function(a, b) {
                if (!b) return a;
                var c = a.slice(0, b);
                return a.slice(b, a.length).concat(c)
            },
            isElement: function(a) {
                return a && 1 == a.nodeType
            },
            element: {
                isAttached: function() {
                    return function(a) {
                        for (; a && a.parentNode;) a = a.parentNode;
                        return !!a && !!a.body
                    }
                }()
            }
        },
        f = {
            drawRoundedRectangle: function(c, d) {
                var e = a.extend({
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0,
                        radius: 0
                    }, d || {}),
                    f = e.left,
                    g = e.top,
                    h = e.width,
                    i = e.height,
                    e = e.radius;
                c.beginPath(), c.moveTo(f + e, g), c.arc(f + h - e, g + e, e, b(-90), b(0), !1), c.arc(f + h - e, g + i - e, e, b(0), b(90), !1), c.arc(f + e, g + i - e, e, b(90), b(180), !1), c.arc(f + e, g + e, e, b(-180), b(-90), !1), c.closePath(), c.fill()
            }
        },
        g = function() {
            function a(a) {
                var c = [];
                0 == a.indexOf("#") && (a = a.substring(1)), a = a.toLowerCase();
                if ("" != a.replace(b, "")) return null;
                3 == a.length ? (c[0] = a.charAt(0) + a.charAt(0), c[1] = a.charAt(1) + a.charAt(1), c[2] = a.charAt(2) + a.charAt(2)) : (c[0] = a.substring(0, 2), c[1] = a.substring(2, 4), c[2] = a.substring(4));
                for (a = 0; a < c.length; a++) c[a] = parseInt(c[a], 16);
                return c.red = c[0], c.green = c[1], c.blue = c[2], c
            }
            var b = RegExp("[0123456789abcdef]", "g"),
                c = function() {
                    function a(a, b, c) {
                        return a = a.toString(c || 10), Array(b - a.length).join("0") + a
                    }
                    return function(b, c, d) {
                        return "#" + a(b, 2, 16) + a(c, 2, 16) + a(d, 2, 16)
                    }
                }();
            return {
                hex2rgb: a,
                hex2fill: function(b, c) {
                    "undefined" == typeof c && (c = 1);
                    var d = c,
                        e = a(b);
                    return e[3] = d, e.opacity = d, "rgba(" + e.join() + ")"
                },
                rgb2hex: c
            }
        }();
    a.extend(Spinners, {
        enabled: !1,
        support: {
            canvas: function() {
                var b = a("<canvas>")[0];
                return !!b.getContext && !!b.getContext("2d")
            }()
        },
        init: function() {
            if (this.support.canvas || window.G_vmlCanvasManager && window.attachEvent && -1 === navigator.userAgent.indexOf("Opera")) window.G_vmlCanvasManager && window.G_vmlCanvasManager.init_(document), this.enabled = !0
        },
        create: function(a, b) {
            return c.create(a, b), this.get(a)
        },
        get: function(a) {
            return new c(a)
        },
        play: function(a) {
            return this.get(a).play(), this
        },
        pause: function(a) {
            return this.get(a).pause(), this
        },
        toggle: function(a) {
            return this.get(a).toggle(), this
        },
        stop: function(a) {
            return this.get(a).stop(), this
        },
        remove: function(a) {
            return this.get(a).remove(), this
        },
        removeDetached: function() {
            return h.removeDetached(), this
        },
        center: function(a) {
            return this.get(a).center(), this
        },
        setOptions: function(a, b) {
            return this.get(a).setOptions(b), this
        },
        getDimensions: function(a) {
            return a = 2 * h.get(a)[0].getLayout().workspace.radius, {
                width: a,
                height: a
            }
        }
    });
    var h = {
        spinners: [],
        get: function(b) {
            if (b) {
                var c = [];
                return a.each(this.spinners, function(d, f) {
                    f && (e.isElement(b) ? f.element == b : a(f.element).is(b)) && c.push(f)
                }), c
            }
        },
        add: function(a) {
            this.spinners.push(a)
        },
        remove: function(b) {
            a(a.map(this.spinners, function(c) {
                if (e.isElement(b) ? c.element == b : a(c.element).is(b)) return c.element
            })).each(a.proxy(function(a, b) {
                this.removeByElement(b)
            }, this))
        },
        removeByElement: function(b) {
            var c = this.get(b)[0];
            c && (c.remove(), this.spinners = a.grep(this.spinners, function(a) {
                return a.element != b
            }))
        },
        removeDetached: function() {
            a.each(this.spinners, a.proxy(function(a, b) {
                b && b.element && !e.element.isAttached(b.element) && this.remove(b.element)
            }, this))
        }
    };
    a.extend(c, {
        create: function(b, c) {
            if (b) {
                var f = c || {},
                    g = [];
                return e.isElement(b) ? g.push(new d(b, f)) : a(b).each(function(a, b) {
                    g.push(new d(b, f))
                }), g
            }
        }
    }), a.extend(c.prototype, {
        items: function() {
            return h.get(this.element)
        },
        play: function() {
            return a.each(this.items(), function(a, b) {
                b.play()
            }), this
        },
        stop: function() {
            return a.each(this.items(), function(a, b) {
                b.stop()
            }), this
        },
        pause: function() {
            return a.each(this.items(), function(a, b) {
                b.pause()
            }), this
        },
        toggle: function() {
            return a.each(this.items(), function(a, b) {
                b.toggle()
            }), this
        },
        center: function() {
            return a.each(this.items(), function(a, b) {
                b.center()
            }), this
        },
        setOptions: function(b) {
            return a.each(this.items(), function(a, c) {
                c.setOptions(b)
            }), this
        },
        remove: function() {
            return h.remove(this.element), this
        }
    }), a.extend(d.prototype, {
        setOptions: function(b) {
            this.options = a.extend({}, this.options, b || {}), this.options.radii && (b = this.options.radii, this.options.radius = Math.min(b[0], b[1]), this.options.height = Math.max(b[0], b[1]) - this.options.radius), this.options.dashWidth && (this.options.width = this.options.dashWidth), this.options.speed && (this.options.duration = 1e3 * this.options.speed);
            var b = this._state,
                c = this._position;
            this._layout = null, this.build(), c && c >= this.options.dashes - 1 && (this._position = this.options.dashes - 1);
            switch (b) {
                case "playing":
                    this.play();
                    break;
                case "paused":
                case "stopped":
                    this.drawPosition(this._position)
            }
            this._centered && this.center()
        },
        remove: function() {
            this.canvas && (this.pause(), a(this.canvas).remove(), this.ctx = this.canvas = null)
        },
        build: function() {
            this.remove();
            var b = this.getLayout().workspace.radius;
            return a(document.body).append(this.canvas = a("<canvas>").attr({
                width: 2 * b,
                height: 2 * b
            }).css({
                zoom: 1
            })), window.G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.canvas[0]), this.ctx = this.canvas[0].getContext("2d"), this.ctx.globalAlpha = this.options.opacity, a(this.element).append(this.canvas), this.ctx.translate(b, b), this
        },
        drawPosition: function(a) {
            var c = this.getLayout().workspace,
                a = e.scroll(c.opacities, -1 * a),
                d = c.radius,
                c = this.options.dashes,
                f = b(360 / c);
            this.ctx.clearRect(-1 * d, -1 * d, 2 * d, 2 * d);
            for (d = 0; d < c; d++) this.drawDash(a[d], this.options.color), this.ctx.rotate(f)
        },
        drawDash: function(a, b) {
            this.ctx.fillStyle = g.hex2fill(b, a);
            var c = this.getLayout(),
                d = c.workspace.radius,
                e = c.dash.position,
                c = c.dash.dimensions;
            f.drawRoundedRectangle(this.ctx, {
                top: e.top - d,
                left: e.left - d,
                width: c.width,
                height: c.height,
                radius: Math.min(c.height, c.width) / 2
            })
        },
        _nextPosition: function() {
            var b = this.options.rotation / this.options.dashes;
            this.nextPosition(), this._playTimer = window.setTimeout(a.proxy(this._nextPosition, this), b)
        },
        nextPosition: function() {
            this._position == this.options.dashes - 1 && (this._position = -1), this._position++, this.drawPosition(this._position)
        },
        play: function() {
            if ("playing" != this._state) {
                this._state = "playing";
                var b = this.options.rotation / this.options.dashes;
                return this._playTimer = window.setTimeout(a.proxy(this._nextPosition, this), b), this
            }
        },
        pause: function() {
            if ("paused" != this._state) return this._pause(), this._state = "paused", this
        },
        _pause: function() {
            this._playTimer && (window.clearTimeout(this._playTimer), this._playTimer = null)
        },
        stop: function() {
            if ("stopped" != this._state) return this._pause(), this._position = 0, this.drawPosition(0), this._state = "stopped", this
        },
        toggle: function() {
            return this["playing" == this._state ? "pause" : "play"](), this
        },
        getLayout: function() {
            if (this._layout) return this._layout;
            for (var a = this.options, b = a.dashes, c = a.width, d = a.radius, e = a.radius + a.height, f = Math.max(c, e), f = Math.ceil(Math.max(f, Math.sqrt(e * e + c / 2 * (c / 2)))), a = f += a.padding, g = 1 / b, h = [], i = 0; i < b; i++) h.push((i + 1) * g);
            return this._layout = b = {
                workspace: {
                    radius: a,
                    opacities: h
                },
                dash: {
                    position: {
                        top: f - e,
                        left: f - c / 2
                    },
                    dimensions: {
                        width: c,
                        height: e - d
                    }
                }
            }
        },
        center: function() {
            var b = 2 * this.getLayout().workspace.radius;
            a(this.element.parentNode).css({
                position: "relative"
            }), a(this.element).css({
                position: "absolute",
                height: b + "px",
                width: b + "px",
                top: "50%",
                left: "50%",
                marginLeft: -.5 * b + "px",
                marginTop: -.5 * b + "px"
            }), this._centered = !0
        }
    }), Spinners.init(), Spinners.enabled || (c.create = function() {
        return []
    })
})(jQuery);
var Tipped = {
    version: "3.1.8"
};
Tipped.Skins = {
    base: {
        afterUpdate: false,
        ajax: {
            cache: true,
            type: "get"
        },
        background: {
            color: "#f2f2f2",
            opacity: 1
        },
        border: {
            size: 1,
            color: "#000",
            opacity: 1
        },
        closeButtonSkin: "default",
        containment: {
            selector: "viewport"
        },
        fadeIn: 180,
        fadeOut: 220,
        showDelay: 75,
        hideDelay: 25,
        radius: {
            size: 5,
            position: "background"
        },
        hideAfter: false,
        hideOn: {
            element: "self",
            event: "mouseleave"
        },
        hideOthers: false,
        hook: "topleft",
        inline: false,
        offset: {
            x: 0,
            y: 0
        },
        onHide: false,
        onShow: false,
        shadow: {
            blur: 2,
            color: "#000",
            offset: {
                x: 0,
                y: 0
            },
            opacity: .12
        },
        showOn: "mousemove",
        spinner: true,
        stem: {
            height: 9,
            width: 18,
            offset: {
                x: 9,
                y: 9
            },
            spacing: 2
        },
        target: "self"
    },
    reset: {
        ajax: false,
        closeButton: false,
        hideOn: [{
            element: "self",
            event: "mouseleave"
        }, {
            element: "tooltip",
            event: "mouseleave"
        }],
        hook: "topmiddle",
        stem: true
    },
    dark: {
        background: {
            color: "#282828"
        },
        border: {
            color: "#9b9b9b",
            opacity: .4,
            size: 1
        },
        shadow: {
            opacity: .02
        },
        spinner: {
            color: "#fff"
        }
    },
    light: {
        background: {
            color: "#fff"
        },
        border: {
            color: "#646464",
            opacity: .4,
            size: 1
        },
        shadow: {
            opacity: .04
        }
    },
    gray: {
        background: {
            color: [{
                position: 0,
                color: "#8f8f8f"
            }, {
                position: 1,
                color: "#808080"
            }]
        },
        border: {
            color: "#131313",
            size: 1,
            opacity: .6
        }
    },
    tiny: {
        background: {
            color: "#161616"
        },
        border: {
            color: "#969696",
            opacity: .35,
            size: 1
        },
        fadeIn: 0,
        fadeOut: 0,
        radius: 4,
        stem: {
            width: 11,
            height: 6,
            offset: {
                x: 6,
                y: 6
            }
        },
        shadow: false,
        spinner: {
            color: "#fff"
        }
    },
    yellow: {
        background: "#ffffaa",
        border: {
            size: 1,
            color: "#6d5208",
            opacity: .4
        }
    },
    red: {
        background: {
            color: [{
                position: 0,
                color: "#e13c37"
            }, {
                position: 1,
                color: "#e13c37"
            }]
        },
        border: {
            size: 1,
            color: "#150201",
            opacity: .6
        },
        spinner: {
            color: "#fff"
        }
    },
    green: {
        background: {
            color: [{
                position: 0,
                color: "#4bb638"
            }, {
                position: 1,
                color: "#4aab3a"
            }]
        },
        border: {
            size: 1,
            color: "#122703",
            opacity: .6
        },
        spinner: {
            color: "#fff"
        }
    },
    blue: {
        background: {
            color: [{
                position: 0,
                color: "#4588c8"
            }, {
                position: 1,
                color: "#3d7cb9"
            }]
        },
        border: {
            color: "#020b17",
            opacity: .6
        },
        spinner: {
            color: "#fff"
        }
    }
};
(function($) {
    $.extend(Tipped.Skins, {
        black: $.extend(true, {}, Tipped.Skins.dark, {
            radius: 0
        }),
        white: $.extend(true, {}, Tipped.Skins.light, {
            radius: 0
        })
    })
})(jQuery);
Tipped.Skins.CloseButtons = {
    base: {
        diameter: 17,
        border: 2,
        x: {
            diameter: 10,
            size: 2,
            opacity: 1
        },
        states: {
            "default": {
                background: {
                    color: [{
                        position: 0,
                        color: "#1a1a1a"
                    }, {
                        position: .46,
                        color: "#171717"
                    }, {
                        position: .53,
                        color: "#121212"
                    }, {
                        position: .54,
                        color: "#101010"
                    }, {
                        position: 1,
                        color: "#000"
                    }],
                    opacity: 1
                },
                x: {
                    color: "#fafafa",
                    opacity: 1
                },
                border: {
                    color: "#fff",
                    opacity: 1
                }
            },
            hover: {
                background: {
                    color: "#333",
                    opacity: 1
                },
                x: {
                    color: "#e6e6e6",
                    opacity: 1
                },
                border: {
                    color: "#fff",
                    opacity: 1
                }
            }
        },
        shadow: {
            blur: 1,
            color: "#000",
            offset: {
                x: 0,
                y: 0
            },
            opacity: .5
        }
    },
    reset: {},
    "default": {},
    light: {
        diameter: 17,
        border: 2,
        x: {
            diameter: 10,
            size: 2,
            opacity: 1
        },
        states: {
            "default": {
                background: {
                    color: [{
                        position: 0,
                        color: "#797979"
                    }, {
                        position: .48,
                        color: "#717171"
                    }, {
                        position: .52,
                        color: "#666"
                    }, {
                        position: 1,
                        color: "#666"
                    }],
                    opacity: 1
                },
                x: {
                    color: "#fff",
                    opacity: .95
                },
                border: {
                    color: "#676767",
                    opacity: 1
                }
            },
            hover: {
                background: {
                    color: [{
                        position: 0,
                        color: "#868686"
                    }, {
                        position: .48,
                        color: "#7f7f7f"
                    }, {
                        position: .52,
                        color: "#757575"
                    }, {
                        position: 1,
                        color: "#757575"
                    }],
                    opacity: 1
                },
                x: {
                    color: "#fff",
                    opacity: 1
                },
                border: {
                    color: "#767676",
                    opacity: 1
                }
            }
        }
    }
};
eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!"".replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return "\\w+"
        };
        c = 1
    }
    while (c--)
        if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    return p
}('(12(a){12 c(a,b){13 c=[a,b];1a c.15=a,c.17=b,c}12 f(a){1N.5v&&5v[5v.6z?"6z":"8c"](a)}12 j(a){11.1g=a}12 k(a){13 b={};28(13 c 5w a)b[c]=a[c]+"2w";1a b}12 l(a,b){1a 1b.8d(a*a+b*b)}12 m(a){1a 2E*a/1b.2Z}12 n(a){1a a*1b.2Z/2E}12 o(a){1a 1/1b.4A(a)}12 v(b){1f(b){11.1g=b,u.1z(b);13 c=11.2e();11.19=a.1k({},c.19),11.2x=1,11.1o={},11.1V=a(b).1X("2p-1V"),u.30(11),11.29=11.19.1u.1D,11.6A=11.19.1l&&11.29,11.3a={x:0,y:0},11.3l={17:0,15:0},11.1P()}}12 x(b,c){11.1g=b,11.1g&&c&&(11.19=a.1k({31:3,1A:{x:0,y:0},1Q:"#4B",1K:.5,2L:1},20[2]||{}),11.2x=11.19.2L,11.1o={},11.1V=a(b).1X("2p-1V"),w.30(11),11.1P())}12 z(b){11.1g=b,11.1g&&(11.19=a.1k({31:5,1A:{x:0,y:0},1Q:"#4B",1K:.5,2L:1},20[1]||{}),11.2x=11.19.2L,11.1V=a(b).1X("2p-1V"),y.30(11),11.1P())}12 A(b,c){28(13 d 5w c)c[d]&&c[d].3D&&c[d].3D===5x?(b[d]=a.1k({},b[d])||{},A(b[d],c[d])):b[d]=c[d];1a b}12 C(b,c){1f(11.1g=b,11.1g){13 e=a(b).1X("2p-1V");e&&B.1z(b),e=h(),a(b).1X("2p-1V",e),11.1V=e;13 f;"8e"!=a.1p(c)||d.2j(c)?f=20[2]||{}:(f=c,c=1r),11.19=B.6B(f);13 g=b.6C("5y");1f(!c){13 i=b.6C("1X-2p");i?c=i:g&&(c=g)}g&&(a(b).1X("5z",g),b.8f("5y","")),11.2F=c,11.2k=11.19.2k||+B.19.4C,11.1o={2G:{14:1,18:1},5A:[],3b:[],2q:{4D:!1,2l:!1,1L:!1,3c:!1,1P:!1,4E:!1,5B:!1,3E:!1},5C:""};13 j=11.19.1C;11.1C="2M"==j?"2M":"4F"!=j&&j?d.2j(j)?j:j&&1x.6D(j)||11.1g:11.1g,11.6E(),B.30(11)}}13 b=6F.3F.8g,d={8h:12(c,d){13 e=c;1a 12(){13 c=[a.1v(e,11)].6G(b.5D(20));1a d.5E(11,c)}},2j:12(a){1a a&&1==a.8i},4G:12(a,c){13 d=b.5D(20,2);1a 8j(12(){1a a.5E(a,d)},c)},44:12(a){1a d.4G.5E(11,[a,1].6G(b.5D(20,1)))},5F:12(a){1a{x:a.5G,y:a.6H}},1g:{4H:12(a){13 b=0,d=0;8k b+=a.4I||0,d+=a.4J||0,a=a.4K;8l(a);1a c(d,b)},4L:12(b){13 e=a(b).1A(),f=d.1g.4H(b),g={17:a(1N).4I(),15:a(1N).4J()};1a e.15+=f.15-g.15,e.17+=f.17-g.17,c(e.15,e.17)},5H:12(){12 a(a){28(13 b=a;b&&b.4K;)b=b.4K;1a b}1a 12(b){13 c=a(b);1a!(!c||!c.3d)}}()}},e=12(a){12 b(b){13 c=5I(b+"([\\\\d.]+)").8m(a);1a c?5J(c[1]):!0}1a{3m:!(!1N.8n||-1!==a.3n("5K"))&&b("8o "),5K:a.3n("5K")>-1&&(!!1N.5L&&5L.6I&&5J(5L.6I())||7.55),5M:a.3n("6J/")>-1&&b("6J/"),4M:a.3n("4M")>-1&&-1===a.3n("8p")&&b("8q:"),6K:!!a.3e(/8r.*8s.*8t/),4N:a.3n("4N")>-1&&b("4N/")}}(8u.8v),g={32:{46:{5N:"1.4.4",5O:1N.46&&46.8w.8x}},6L:12(){12 b(b){28(13 c=b.3e(a),d=c&&c[1]&&c[1].2N(".")||[],e=0,f=0,g=d.2a;g>f;f++)e+=2O(d[f]*1b.6M(10,6-2*f));1a c&&c[3]?e-1:e}13 a=/^(\\d+(\\.?\\d+){0,3})([A-6N-8y-]+[A-6N-8z-9]+)?/;1a 12(a){11.32[a].6O||(11.32[a].6O=!0,(!11.32[a].5O||b(11.32[a].5O)<b(11.32[a].5N)&&!11.32[a].6P)&&(11.32[a].6P=!0,f("1S 8A "+a+" >= "+11.32[a].5N)))}}()},h=12(){13 a=0,b="8B";1a 12(c){28(c=c||b,a++;1x.6D(c+a);)a++;1a c+a}}(),i=12(){13 b=[];1a{1t:12(c){28(13 d=1r,e=0;b.2a>e;e++)b[e]&&b[e].47==c.47&&b[e].1p.6Q()==c.1p.6Q()&&a.6R(b[e].1X||{})==a.6R(c.1X||{})&&(d=b[e].4O);1a d},4P:12(c,d){11.1z(c.47),b.2n(a.1k({},c,{4O:d}))},1z:12(a){28(13 c=0;b.2a>c;c++)b[c]&&b[c].47==a&&3G b[c]},6S:12(){b=[]}}}();a.1k(1S,12(){1a{2H:{3f:12(){13 a=1x.22("3f");1a!(!a.3o||!a.3o("2d"))}(),3H:12(){6T{1a!!("8C"5w 1N||1N.6U&&1x 8D 6U)}6V(a){1a!1}}(),48:12(){13 b=["8E","8F","8G"],c=!1;1a a.1w(b,12(a,b){6T{1x.8H(b),c=!0}6V(d){}}),c}()},3p:12(){(11.2H.3f||e.3m)&&(g.6L("46"),a(1x).6W(12(){B.6X()}))},4Q:12(a,b,c){1a j.4Q(a,b,c),11.1t(a)},1t:12(a){1a 3q j(a)},5P:12(a){1a B.5P(a)},1W:12(a){1a 11.1t(a).1W(),11},1I:12(a){1a 11.1t(a).1I(),11},33:12(a){1a 11.1t(a).33(),11},2P:12(a){1a 11.1t(a).2P(),11},1z:12(a){1a 11.1t(a).1z(),11},4R:12(){1a B.4R(),11},5Q:12(a){1a B.5Q(a),11},5R:12(a){1a B.5R(a),11},1L:12(b){1f(d.2j(b))1a B.5S(b);1f("5T"!=a.1p(b)){13 c=a(b),e=0;1a a.1w(c,12(a,b){B.5S(b)&&e++}),e}1a B.3I().2a},5U:12(){1a B.5U(),11}}}()),a.1k(j,{4Q:12(b,c){1f(b){13 e=20[2]||{},f=[];1a B.6Y(),d.2j(b)?f.2n(3q C(b,c,e)):a(b).1w(12(a,b){f.2n(3q C(b,c,e))}),f}}}),a.1k(j.3F,{49:12(){1a B.2r.4S={x:0,y:0},B.1t(11.1g)},1W:12(){1a a.1w(11.49(),12(a,b){b.1W()}),11},1I:12(){1a a.1w(11.49(),12(a,b){b.1I()}),11},33:12(){1a a.1w(11.49(),12(a,b){b.33()}),11},2P:12(){1a a.1w(11.49(),12(a,b){b.2P()}),11},1z:12(){1a B.1z(11.1g),11}});13 p={4T:12(){13 b;1a b=e.6K?{14:1N.5V,18:1N.5W}:{18:a(1N).18(),14:a(1N).14()}}},q={3r:1b.1E(1b.4U(1N.3r?5J(1N.3r)||1:1,2)),3p:12(){12 a(a){13 b=a.3o("2d");b.8I(q.3r,q.3r)}1a 1N.4V&&!1S.2H.3f&&e.3m?12(b){4V.8J(b),a(b)}:12(b){a(b)}}(),3J:12(b,c){a(b).3g({14:c.14*11.3r,18:c.18*11.3r}).1q(k(c))},6Z:12(b){13 c=a.1k({17:0,15:0,14:0,18:0,1n:0},20[1]||{}),d=c,e=d.15,f=d.17,g=d.14,h=d.18,i=d.1n;1a i?(b.2f(),b.3s(e+i,f),b.26(e+g-i,f+i,i,n(-90),n(0),!1),b.26(e+g-i,f+h-i,i,n(0),n(90),!1),b.26(e+i,f+h-i,i,n(90),n(2E),!1),b.26(e+i,f+i,i,n(-2E),n(-90),!1),b.2g(),b.34(),3t 0):(b.70(e,f,g,h),3t 0)},8K:12(b,c){28(13 d=a.1k({x:0,y:0,1Q:"#4B"},20[2]||{}),e=0,f=c.2a;f>e;e++)28(13 g=0,h=c[e].2a;h>g;g++){13 i=2O(c[e].3u(g))*(1/9);b.2Q=t.2R(d.1Q,i),i&&b.70(d.x+g,d.y+e,1,1)}},4a:12(b,c){13 d;1f("2s"==a.1p(c))d=t.2R(c);1G 1f("2s"==a.1p(c.1Q))d=t.2R(c.1Q,"2y"==a.1p(c.1K)?c.1K:1);1G 1f(a.71(c.1Q)){13 e=a.1k({3K:0,3L:0,3M:0,3N:0},20[2]||{});d=q.72.73(b.8L(e.3K,e.3L,e.3M,e.3N),c.1Q,c.1K)}1a d}};q.72={73:12(b,c){28(13 d="2y"==a.1p(20[2])?20[2]:1,e=0,f=c.2a;f>e;e++){13 g=c[e];("5T"==a.1p(g.1K)||"2y"!=a.1p(g.1K))&&(g.1K=1),b.8M(g.1e,t.2R(g.1Q,g.1K*d))}1a b}};13 r={74:["3O","4b","3P","3Q","4c","4d","4e","4f","4g","4h","4i","3R"],4j:{75:/^(17|15|1R|1O)(17|15|1R|1O|2t|2S)$/,1J:/^(17|1R)/,35:/(2t|2S)/,76:/^(17|1R|15|1O)/},77:12(){13 a={17:"18",15:"14",1R:"18",1O:"14"};1a 12(b){1a a[b]}}(),35:12(a){1a!!a.3v().3e(11.4j.35)},78:12(a){1a!11.35(a)},2I:12(a){1a a.3v().3e(11.4j.1J)?"1J":"2b"},5X:12(a){13 b=1r,c=a.3v().3e(11.4j.76);1a c&&c[1]&&(b=c[1]),b},2N:12(a){1a a.3v().3e(11.4j.75)}},s={5Y:12(a){13 b=a.19.1l;1a{14:b.14,18:b.18}},4k:12(b,c){13 d=a.1k({3S:"1E"},20[2]||{}),e=b.19.1l,f=e.14,g=e.18,h=11.4W(f,g,c);1a d.3S&&(h.14=1b[d.3S](h.14),h.18=1b[d.3S](h.18)),{14:h.14,18:h.18}},4W:12(a,b,c){13 d=m(1b.79(.5*(b/a))),e=2E-d,f=1b.4A(n(e-90))*c,g=a+2*f,h=g*b/a;1a{14:g,18:h}},3T:12(a,b){13 c=11.4k(a,b),d=11.5Y(a),f=(r.35(a.29),1b.1E(c.18+b));1a a.19.1l.1A||0,a.19.1n&&a.19.1n.2u||0,{2z:{1c:{14:1b.1E(c.14),18:1b.1E(f)}},1i:{1c:c},1l:{1c:{14:d.14,18:d.18}}}},5Z:12(b,c,d){13 f=b.19,g={17:0,15:0},h={17:0,15:0},i=a.1k({},c),j=b.1i,k=k||11.3T(b,b.1i),l=k.2z.1c;d&&(l.18=d,j=0);13 m=r.2N(b.29),n=r.2I(b.29);1f(b.19.1l){13 o=r.5X(b.29);1f("17"==o?g.17=l.18-j:"15"==o&&(g.15=l.18-j),"1J"==n){1T(m[2]){1h"2t":1h"2S":h.15=.5*i.14;1B;1h"1O":h.15=i.14}"1R"==m[1]&&(h.17=i.18-j+l.18)}1G{1T(m[2]){1h"2t":1h"2S":h.17=.5*i.18;1B;1h"1R":h.17=i.18}"1O"==m[1]&&(h.15=i.14-j+l.18)}i[r.77(o)]+=l.18-j}1G 1f("1J"==n){1T(m[2]){1h"2t":1h"2S":h.15=.5*i.14;1B;1h"1O":h.15=i.14}"1R"==m[1]&&(h.17=i.18)}1G{1T(m[2]){1h"2t":1h"2S":h.17=.5*i.18;1B;1h"1R":h.17=i.18}"1O"==m[1]&&(h.15=i.14)}13 p=f.1n&&f.1n.2u||0,q=f.1i&&f.1i.2u||0;1f(b.19.1l){13 t=p&&"1m"==f.1n.1e?p:0,u=p&&"1i"==f.1n.1e?p:p+q,v=q+t+.5*k.1l.1c.14-.5*k.1i.1c.14,w=u>v?u-v:0,x=1b.1E(q+t+.5*k.1l.1c.14+w);1f("1J"==n)1T(m[2]){1h"15":h.15+=x;1B;1h"1O":h.15-=x}1G 1T(m[2]){1h"17":h.17+=x;1B;1h"1R":h.17-=x}}13 y;1f(f.1l&&(y=f.1l.1A)){13 z=s.60(y,b.6A,c,k.1i.1c,q,p);1f(y=z.1A,z.4l,"1J"==n)1T(m[2]){1h"15":h.15+=y.x;1B;1h"1O":h.15-=y.x}1G 1T(m[2]){1h"17":h.17+=y.y;1B;1h"1R":h.17-=y.y}}13 B;1f(f.1l&&(B=f.1l.8N))1f("1J"==n)1T(m[1]){1h"17":h.17-=B;1B;1h"1R":h.17+=B}1G 1T(m[1]){1h"15":h.15-=B;1B;1h"1O":h.15+=B}1a{1c:i,1e:{17:0,15:0},1m:{1e:g,1c:c},1l:{1c:l},2J:h}},60:12(b,c,d,e,f,g){13 h=r.2I(c),i=a.1k({},b),j={x:0,y:0},k=0;1a"1J"==h&&(k=d.14-e.14-2*f-2*g)<2*b.x&&(j.x=i.x,/(1O)$/.3h(c)&&(j.x*=-1),i.x=0),"2b"==h&&(k=d.18-e.18-2*f-2*g)<2*b.y&&(j.y=i.y,/(1R)$/.3h(c)&&(j.y*=-1),i.y=0),{1A:i,4l:j}}},t=12(){12 d(a){13 b=a;1a b.7a=a[0],b.7b=a[1],b.7c=a[2],b}12 e(a){1a 2O(a,16)}12 f(a){13 b=6F(3);1f(0==a.3n("#")&&(a=a.4X(1)),a=a.3v(),""!=a.61(c,""))1a 1r;3==a.2a?(b[0]=a.3u(0)+a.3u(0),b[1]=a.3u(1)+a.3u(1),b[2]=a.3u(2)+a.3u(2)):(b[0]=a.4X(0,2),b[1]=a.4X(2,4),b[2]=a.4X(4));28(13 f=0;b.2a>f;f++)b[f]=e(b[f]);1a d(b)}12 g(a,b){13 c=f(a);1a c[3]=b,c.1K=b,c}12 h(b,c){1a"5T"==a.1p(c)&&(c=1),"8O("+g(b,c).8P()+")"}12 i(a){1a"#"+(j(a)[2]>50?"4B":"8Q")}12 j(a){1a k(f(a))}12 k(a){13 f,g,h,a=d(a),b=a.7a,c=a.7b,e=a.7c,i=b>c?b:c;e>i&&(i=e);13 j=c>b?b:c;1f(j>e&&(j=e),h=i/8R,g=0!=i?(i-j)/i:0,0==g)f=0;1G{13 k=(i-b)/(i-j),l=(i-c)/(i-j),m=(i-e)/(i-j);f=b==i?m-l:c==i?2+k-m:4+l-k,f/=6,0>f&&(f+=1)}f=1b.23(7d*f),g=1b.23(62*g),h=1b.23(62*h);13 n=[];1a n[0]=f,n[1]=g,n[2]=h,n.8S=f,n.8T=g,n.8U=h,n}13 b="8V",c=5I("["+b+"]","g");1a{8W:f,2R:h,8X:i}}(),u={4Y:{},1t:12(b){1f(!b)1a 1r;13 c=1r,d=a(b).1X("2p-1V");1a d&&(c=11.4Y[d]),c},30:12(a){11.4Y[a.1V]=a},1z:12(a){13 b=11.1t(a);b&&(3G 11.4Y[b.1V],b.1z())}};a.1k(v.3F,12(){12 b(){11.1o.1u={};13 b=11.29;a.1w(r.74,a.1v(12(b,c){13 d,e=11.1o.1u[c]={};11.29=c;13 f=11.2o();d=f,e.2J=d.2J;13 g=d.1H.1c,h={17:d.1H.1e.17,15:d.1H.1e.15};1f(e.1H={1c:g,1e:h},e.1D={1c:d.21.1c},11.1s){13 i=11.1s.2o(),j=i.21.1e,k=e.1H.1e;a.1k(!0,e,{2J:i.2J,1H:{1e:{17:k.17+j.17,15:k.15+j.15}},1D:{1c:i.1D.1c}})}},11)),11.29=b}12 c(){11.36(),11.19.1s&&(w.1z(11.1g),11.19.1y&&11.19.1y.1s&&y.1z(11.1g)),11.2T&&(11.2T.1z(),11.2T=1r),11.1j&&(a(11.1j).1z(),11.1j=1r)}12 d(){11.1H&&(11.1y&&(a(11.1y).1z(),11.1y=1r,11.63=1r,11.64=1r),a(11.1H).1z(),11.1l=1r,11.1m=1r,11.1H=1r,11.1o={})}12 f(){13 a=11.2e();11.2G=a.1o.2G;13 b=a.19;11.1n=b.1n&&b.1n.2u||0,11.1i=b.1i&&b.1i.2u||0,11.2m=b.2m;13 c=1b.4U(11.2G.18,11.2G.14);11.1n>c/2&&(11.1n=1b.65(c/2)),"1i"==11.19.1n.1e&&11.1n>11.1i&&(11.1i=11.1n),11.1o={19:{1n:11.1n,1i:11.1i,2m:11.2m}}}12 g(){11.36(),1N.4V&&1N.4V.8Y(1x);13 b=11.2e(),c=11.19;11.1H=a("<2h>").1Y("8Z")[0],a(b.4Z).1Z(11.1H),11.51(),11.7e(b),c.1y&&(11.7f(b),c.1y.1s&&(11.2U?(11.2U.19=c.1y.1s,11.2U.1P()):11.2U=3q z(11.1g,a.1k({2L:11.2x},c.1y.1s)))),e.3m&&7>e.3m&&a(b.1j).66(11.2T=a("<91>").1Y("92").3g({93:0,4m:"94:\'\';"})),11.52(),c.1s&&(11.1s?(11.1s.19=c.1s,11.1s.1P()):11.1s=3q x(11.1g,11,a.1k({2L:11.2x},c.1s))),11.7g()}12 h(){13 b=11.2e(),c=a(b.1j),d=a(b.1j).67(".7h").7i()[0];1f(d){a(d).1q({14:"68",18:"68"});13 e=2O(c.1q("17")),f=2O(c.1q("15")),g=2O(c.1q("14"));c.1q({15:"-7j",17:"-7j",14:"95",18:"68"}),b.1F("1L")||a(b.1j).1W();13 h=B.53.69(d);b.19.3i&&"2y"==a.1p(b.19.3i)&&h.14>b.19.3i&&(a(d).1q({14:b.19.3i+"2w"}),h=B.53.69(d)),b.1F("1L")||a(b.1j).1I(),b.1o.2G=h,c.1q({15:f+"2w",17:e+"2w",14:g+"2w"}),11.1P()}}12 i(a,b,c){13 d=!1;11.4n(a)&&(d=!0),11.7k(b)&&(d=!0),c&&11.7l(c)&&(d=!0),d&&11.1P()}12 j(a){13 b=!1;1a(11.3l.15!=a.15||11.3l.17!=a.17)&&(b=!0,11.3l=a),b}12 l(a){13 b=!1;1a(11.3a.x!=a.x||11.3a.y!=a.y)&&(b=!0,11.3a=a),b}12 m(a){13 c=!1;1a 11.29!=a&&(c=!0,11.29=a),c}12 o(){1a B.1t(11.1g)[0]}12 p(){1a s.3T(11,11.1i)}12 u(){13 b=11.2e().19.1y,c=b.3w+2*b.1i;a(11.63).1q({15:-1*c+"2w"}),a(11.64).1q({15:0})}12 v(){13 b=11.2e().19.1y,c=b.3w+2*b.1i;a(11.63).1q({15:0}),a(11.64).1q({15:c+"2w"})}12 A(b){13 c=b.19.1y,d={14:c.3w+2*c.1i,18:c.3w+2*c.1i};a(b.1j).1Z(a(11.1y=1x.22("2h")).1Y("7m").1q(k(d)).1Z(a(11.7n=1x.22("2h")).1Y("96").1q(k(d)))),11.6a(b,"6b"),11.6a(b,"6c"),1S.2H.3H||e.4N||a(11.1y).3U("4o",a.1v(11.7o,11)).3U("54",a.1v(11.7p,11))}12 C(b,c){13 d=b.19.1y,e=d.3w,f=d.1i||0,g=d.x.3w,h=d.x.2u,j=(d.x.97,d.2q[c||"6b"]),l={14:e+2*f,18:e+2*f};g>=e&&(g=e-2);13 m;a(11.7n).1Z(a(11[c+"7q"]=1x.22("2h")).1Y("98").1q(a.1k(k(l),{15:("6c"==c?l.14:0)+"2w"}))),a(1x.3d).1Z(a(m=1x.22("3f"))),q.3J(m,l),q.3p(m);13 o=m.3o("2d");o.2L=11.2x,a(11[c+"7q"]).1Z(m),o.99(l.14/2,l.18/2),o.2Q=q.4a(o,j.1m,{3K:0,3L:0-e/2,3M:0,3N:0+e/2}),o.2f(),o.26(0,0,e/2,0,2*1b.2Z,!0),o.2g(),o.34(),f&&(o.2Q=q.4a(o,j.1i,{3K:0,3L:0-e/2-f,3M:0,3N:0+e/2+f}),o.2f(),o.26(0,0,e/2,1b.2Z,0,!1),o.1d((e+f)/2,0),o.26(0,0,e/2+f,0,1b.2Z,!0),o.26(0,0,e/2+f,1b.2Z,0,!0),o.1d(e/2,0),o.26(0,0,e/2,0,1b.2Z,!1),o.2g(),o.34());13 p=g/2,r=h/2;1f(r>p){13 s=r;r=p,p=s}o.2Q=t.2R(j.x.1Q||j.x,j.x.1K||1),o.56(n(45)),o.2f(),o.3s(0,0),o.1d(0,p);28(13 u=0;4>u;u++)o.1d(0,p),o.1d(r,p),o.1d(r,p-(p-r)),o.1d(p,r),o.1d(p,0),o.56(n(90));o.2g(),o.34()}12 D(b){13 l,m,o,p,q,c=a.1k({1l:!1,3x:1r,9a:1r,2f:!1,2g:!1,3y:1r,3z:1r,1n:0,1i:0,57:0,37:{x:0,y:0}},20[1]||{}),d=c.3y,e=c.3z,f=c.37,g=c.1i,h=c.1n,i=c.3x,j=d.1m.1e,k=d.1m.1c,t={x:1b.2V(11.3a.x),y:1b.2V(11.3a.y)},u={x:0,y:0},v={x:0,y:0};1f(e){l=e.1l.1c,m=e.2z.1e,o=e.2z.1c,p=o.14-l.14;13 w=c.57,x=g+h+.5*l.14-.5*e.1i.1c.14;q=1b.1E(w>x?w-x:0);13 y=s.60(f,i,k,e.1i.1c,g,h);f=y.1A,v=y.4l,u={x:1b.1U(k.14-2*1b.1U(q,f.x||0)-e.1i.1c.14-(2*h||0),0),y:1b.1U(k.18-2*1b.1U(q,f.y||0)-e.1i.1c.18-(2*h||0),0)},r.35(i)&&(u.x*=.5,u.y*=.5),t.x=1b.4U(t.x,u.x),t.y=1b.4U(t.y,u.y),r.35(i)&&(0>11.3a.x&&t.x>0&&(t.x*=-1),0>11.3a.y&&t.y>0&&(t.y*=-1)),11.3l&&11.3l.3A&&a.1w(11.3l.3A,12(b,c){a.1w("17 1O 1R 15".2N(" "),12(a,b){c==b&&5I("("+b+")$").3h(i)&&(t[/^(15|1O)$/.3h(b)?"x":"y"]=0)})})}13 z,A;1f(h?(z=j.15+g+h,A=j.17+g):(z=j.15+g,A=j.17+g),f&&f.x&&/^(3O|3R)$/.3h(i)&&(z+=f.x),c.2f&&b.2f(),b.3s(z,A),c.1l)1T(i){1h"3O":z=j.15+g,h&&(z+=h),z+=1b.1U(q,f.x||0),z+=t.x,b.1d(z,A),A-=l.18,z+=.5*l.14,b.1d(z,A),A+=l.18,z+=.5*l.14,b.1d(z,A);1B;1h"4b":1h"58":z=j.15+.5*k.14-.5*l.14,z+=t.x,b.1d(z,A),A-=l.18,z+=.5*l.14,b.1d(z,A),A+=l.18,z+=.5*l.14,b.1d(z,A),z=j.15+.5*k.14-.5*o.14,b.1d(z,A);1B;1h"3P":z=j.15+k.14-g-l.14,h&&(z-=h),z-=1b.1U(q,f.x||0),z-=t.x,b.1d(z,A),A-=l.18,z+=.5*l.14,b.1d(z,A),A+=l.18,z+=.5*l.14,b.1d(z,A)}1f(h?h&&(b.26(j.15+k.14-g-h,j.17+g+h,h,n(-90),n(0),!1),z=j.15+k.14-g,A=j.17+g+h):(z=j.15+k.14-g,A=j.17+g,b.1d(z,A)),c.1l)1T(i){1h"3Q":A=j.17+g,h&&(A+=h),A+=1b.1U(q,f.y||0),A+=t.y,b.1d(z,A),z+=l.18,A+=.5*l.14,b.1d(z,A),z-=l.18,A+=.5*l.14,b.1d(z,A);1B;1h"4c":1h"59":A=j.17+.5*k.18-.5*l.14,A+=t.y,b.1d(z,A),z+=l.18,A+=.5*l.14,b.1d(z,A),z-=l.18,A+=.5*l.14,b.1d(z,A);1B;1h"4d":A=j.17+k.18-g,h&&(A-=h),A-=l.14,A-=1b.1U(q,f.y||0),A-=t.y,b.1d(z,A),z+=l.18,A+=.5*l.14,b.1d(z,A),z-=l.18,A+=.5*l.14,b.1d(z,A)}1f(h?h&&(b.26(j.15+k.14-g-h,j.17+k.18-g-h,h,n(0),n(90),!1),z=j.15+k.14-g-h,A=j.17+k.18-g):(z=j.15+k.14-g,A=j.17+k.18-g,b.1d(z,A)),c.1l)1T(i){1h"4e":z=j.15+k.14-g,h&&(z-=h),z-=1b.1U(q,f.x||0),z-=t.x,b.1d(z,A),z-=.5*l.14,A+=l.18,b.1d(z,A),z-=.5*l.14,A-=l.18,b.1d(z,A);1B;1h"4f":1h"5a":z=j.15+.5*k.14+.5*l.14,z+=t.x,b.1d(z,A),z-=.5*l.14,A+=l.18,b.1d(z,A),z-=.5*l.14,A-=l.18,b.1d(z,A);1B;1h"4g":z=j.15+g+l.14,h&&(z+=h),z+=1b.1U(q,f.x||0),z+=t.x,b.1d(z,A),z-=.5*l.14,A+=l.18,b.1d(z,A),z-=.5*l.14,A-=l.18,b.1d(z,A)}1f(h?h&&(b.26(j.15+g+h,j.17+k.18-g-h,h,n(90),n(2E),!1),z=j.15+g,A=j.17+k.18-g-h):(z=j.15+g,A=j.17+k.18-g,b.1d(z,A)),c.1l)1T(i){1h"4h":A=j.17+k.18-g,h&&(A-=h),A-=1b.1U(q,f.y||0),A-=t.y,b.1d(z,A),z-=l.18,A-=.5*l.14,b.1d(z,A),z+=l.18,A-=.5*l.14,b.1d(z,A);1B;1h"4i":1h"5b":A=j.17+.5*k.18+.5*l.14,A+=t.y,b.1d(z,A),z-=l.18,A-=.5*l.14,b.1d(z,A),z+=l.18,A-=.5*l.14,b.1d(z,A);1B;1h"3R":A=j.17+g+l.14,h&&(A+=h),A+=1b.1U(q,f.y||0),A+=t.y,b.1d(z,A),z-=l.18,A-=.5*l.14,b.1d(z,A),z+=l.18,A-=.5*l.14,b.1d(z,A)}1a h?h&&(b.26(j.15+g+h,j.17+g+h,h,n(-2E),n(-90),!1),z=j.15+g+h,A=j.17+g,z+=1,b.1d(z,A)):(z=j.15+g,A=j.17+g,b.1d(z,A)),c.2g&&b.2g(),{x:z,y:A,1l:t,5c:v,37:f}}12 E(b){13 o,p,q,r,s,t,c=a.1k({1l:!1,3x:1r,2f:!1,2g:!1,3y:1r,3z:1r,1n:0,1i:0,7r:0,37:{x:0,y:0},5d:1r},20[1]||{}),d=c.3y,e=c.3z,g=(c.7r,c.37),h=c.1i,i=c.1n&&c.1n.2u||0,j=c.7s,k=c.3x,l=d.1m.1e,m=d.1m.1c,u=c.5d&&c.5d.1l||{x:0,y:0};1f(e){o=e.1l.1c,p=e.2z.1e,q=e.2z.1c,r=e.1i.1c,s=q.14-o.14;13 v=h+j+.5*o.14-.5*r.14;t=1b.1E(i>v?i-v:0)}13 w=l.15+h+j,x=l.17+h;j&&(w+=1),a.1k({},{x:w,y:x}),c.2f&&b.2f();13 z=a.1k({},{x:w,y:x});1f(x-=h,b.1d(w,x),i?i&&(b.26(l.15+i,l.17+i,i,n(-90),n(-2E),!0),w=l.15,x=l.17+i):(w=l.15,x=l.17,b.1d(w,x)),c.1l)1T(k){1h"3R":x=l.17+h,j&&(x+=j),x-=.5*r.14,x+=.5*o.14,x+=1b.1U(t,g.y||0),x+=u.y,b.1d(w,x),w-=r.18,x+=.5*r.14,b.1d(w,x),w+=r.18,x+=.5*r.14,b.1d(w,x);1B;1h"4i":1h"5b":x=l.17+.5*m.18-.5*r.14,x+=u.y,b.1d(w,x),w-=r.18,x+=.5*r.14,b.1d(w,x),w+=r.18,x+=.5*r.14,b.1d(w,x);1B;1h"4h":x=l.17+m.18-h-r.14,j&&(x-=j),x+=.5*r.14,x-=.5*o.14,x-=1b.1U(t,g.y||0),x-=u.y,b.1d(w,x),w-=r.18,x+=.5*r.14,b.1d(w,x),w+=r.18,x+=.5*r.14,b.1d(w,x)}1f(i?i&&(b.26(l.15+i,l.17+m.18-i,i,n(-2E),n(-9b),!0),w=l.15+i,x=l.17+m.18):(w=l.15,x=l.17+m.18,b.1d(w,x)),c.1l)1T(k){1h"4g":w=l.15+h,j&&(w+=j),w-=.5*r.14,w+=.5*o.14,w+=1b.1U(t,g.x||0),w+=u.x,b.1d(w,x),x+=r.18,w+=.5*r.14,b.1d(w,x),x-=r.18,w+=.5*r.14,b.1d(w,x);1B;1h"4f":1h"5a":w=l.15+.5*m.14-.5*r.14,w+=u.x,b.1d(w,x),x+=r.18,w+=.5*r.14,b.1d(w,x),x-=r.18,w+=.5*r.14,b.1d(w,x),w=l.15+.5*m.14+r.14,b.1d(w,x);1B;1h"4e":w=l.15+m.14-h-r.14,j&&(w-=j),w+=.5*r.14,w-=.5*o.14,w-=1b.1U(t,g.x||0),w-=u.x,b.1d(w,x),x+=r.18,w+=.5*r.14,b.1d(w,x),x-=r.18,w+=.5*r.14,b.1d(w,x)}1f(i?i&&(b.26(l.15+m.14-i,l.17+m.18-i,i,n(90),n(0),!0),w=l.15+m.14,x=l.17+m.14+i):(w=l.15+m.14,x=l.17+m.18,b.1d(w,x)),c.1l)1T(k){1h"4d":x=l.17+m.18-h,x+=.5*r.14,x-=.5*o.14,j&&(x-=j),x-=1b.1U(t,g.y||0),x-=u.y,b.1d(w,x),w+=r.18,x-=.5*r.14,b.1d(w,x),w-=r.18,x-=.5*r.14,b.1d(w,x);1B;1h"4c":1h"59":x=l.17+.5*m.18+.5*r.14,x+=u.y,b.1d(w,x),w+=r.18,x-=.5*r.14,b.1d(w,x),w-=r.18,x-=.5*r.14,b.1d(w,x);1B;1h"3Q":x=l.17+h,j&&(x+=j),x+=r.14,x-=.5*r.14-.5*o.14,x+=1b.1U(t,g.y||0),x+=u.y,b.1d(w,x),w+=r.18,x-=.5*r.14,b.1d(w,x),w-=r.18,x-=.5*r.14,b.1d(w,x)}1f(i?i&&(b.26(l.15+m.14-i,l.17+i,i,n(0),n(-90),!0),w=l.15+m.14-i,x=l.17):(w=l.15+m.14,x=l.17,b.1d(w,x)),c.1l)1T(k){1h"3P":w=l.15+m.14-h,w+=.5*r.14-.5*o.14,j&&(w-=j),w-=1b.1U(t,g.x||0),w-=u.x,b.1d(w,x),x-=r.18,w-=.5*r.14,b.1d(w,x),x+=r.18,w-=.5*r.14,b.1d(w,x);1B;1h"4b":1h"58":w=l.15+.5*m.14+.5*r.14,w+=u.x,b.1d(w,x),x-=r.18,w-=.5*r.14,b.1d(w,x),x+=r.18,w-=.5*r.14,b.1d(w,x),w=l.15+.5*m.14-r.14,b.1d(w,x),b.1d(w,x);1B;1h"3O":w=l.15+h+r.14,w-=.5*r.14,w+=.5*o.14,j&&(w+=j),w+=1b.1U(t,g.x||0),w+=u.x,b.1d(w,x),x-=r.18,w-=.5*r.14,b.1d(w,x),x+=r.18,w-=.5*r.14,b.1d(w,x)}b.1d(z.x,z.y-h),b.1d(z.x,z.y),c.2g&&b.2g()}12 F(b){13 c=11.2o(),d=11.19.1l&&11.4p(),e=11.29&&11.29.3v(),f=11.1n,h=11.1i,i=11.2m,k=({14:2*h+2*i+11.2G.14,18:2*h+2*i+11.2G.18},b.19.1l&&b.19.1l.1A||{x:0,y:0}),l=0,m=0;f&&(l="1m"==11.19.1n.1e?f:0,m="1i"==11.19.1n.1e?f:l+h),a(1x.3d).1Z(11.2W=1x.22("3f")),q.3J(11.2W,c.1H.1c),q.3p(11.2W);13 n=11.2W.3o("2d");n.2L=11.2x,a(11.1H).1Z(11.2W),n.2Q=q.4a(n,11.19.1m,{3K:0,3L:c.1m.1e.17+h,3M:0,3N:c.1m.1e.17+c.1m.1c.18-h}),n.9c=0;13 o;1f(o=11.6d(n,{2f:!0,2g:!0,1i:h,1n:l,57:m,3y:c,3z:d,1l:11.19.1l,3x:e,37:k}),n.34(),h){13 p=q.4a(n,11.19.1i,{3K:0,3L:c.1m.1e.17,3M:0,3N:c.1m.1e.17+c.1m.1c.18});n.2Q=p,o=11.6d(n,{2f:!0,2g:!1,1i:h,1n:l,57:m,3y:c,3z:d,1l:11.19.1l,3x:e,37:k}),11.7t(n,{2f:!1,2g:!0,1i:h,7s:l,1n:{2u:m,1e:11.19.1n.1e},3y:c,3z:d,1l:11.19.1l,3x:e,37:o.37,5d:o}),n.34()}11.3B=o}12 G(){13 i,a=11.2e(),b=11.2G,c=a.19,d=11.1n,f=11.1i,g=11.2m,h={14:2*f+2*g+b.14,18:2*f+2*g+b.18};1f(11.19.1l){13 j=11.4p();i=j.2z.1c}13 k=s.5Z(11,h),l=k.1c,m=k.1e,h=k.1m.1c,o=k.1m.1e;k.1l.1c;13 r,t,u,q={17:0,15:0},v={14:l.14,18:l.18};1f(c.1y){13 w=d;"1m"==c.1n.1e&&(w+=f);13 x=w-1b.9d(n(45))*w,y="1O";11.29.3v().3e(/^(3P|3Q)$/)&&(y="15");13 z=c.1y.3w+2*c.1y.1i,r={14:z,18:z};1f(q.15=o.15-z/2+("15"==y?x:h.14-x),q.17=o.17-z/2+x,"15"==y){1f(0>q.15){13 A=1b.2V(q.15);v.14+=A,m.15+=A,q.15=0}}1G{13 B=q.15+z-v.14;B>0&&(v.14+=B)}1f(0>q.17){13 C=1b.2V(q.17);v.18+=C,m.17+=C,q.17=0}1f(11.19.1y.1s){13 D=11.19.1y.1s,E=D.31,F=D.1A;1f(t={14:r.14+2*E,18:r.18+2*E},u={17:q.17-E+F.y,15:q.15-E+F.x},"15"==y){1f(0>u.15){13 A=1b.2V(u.15);v.14+=A,m.15+=A,q.15+=A,u.15=0}}1G{13 B=u.15+t.14-v.14;B>0&&(v.14+=B)}1f(0>u.17){13 C=1b.2V(u.17);v.18+=C,m.17+=C,q.17+=C,u.17=0}}}13 G=k.2J;G.17+=m.17,G.15+=m.15;13 H={15:1b.1E(m.15+o.15+11.1i+11.19.2m),17:1b.1E(m.17+o.17+11.1i+11.19.2m)},I={1D:{1c:{14:1b.1E(v.14),18:1b.1E(v.18)}},21:{1c:{14:1b.1E(v.14),18:1b.1E(v.18)}},1H:{1c:l,1e:{17:1b.23(m.17),15:1b.23(m.15)}},1m:{1c:{14:1b.1E(h.14),18:1b.1E(h.18)},1e:{17:1b.23(o.17),15:1b.23(o.15)}},2J:{17:1b.23(G.17),15:1b.23(G.15)},2F:{1e:H}};1a 11.19.1y&&(I.1y={1c:{14:1b.1E(r.14),18:1b.1E(r.18)},1e:{17:1b.23(q.17),15:1b.23(q.15)}},11.19.1y.1s&&(I.2U={1c:{14:1b.1E(t.14),18:1b.1E(t.18)},1e:{17:1b.23(u.17),15:1b.23(u.15)}})),I}12 H(){13 b=11.2o(),c=11.2e();a(c.1j).1q(k(b.1D.1c)),a(c.4Z).1q(k(b.21.1c)),11.2T&&11.2T.1q(k(b.1D.1c)),a(11.1H).1q(a.1k(k(b.1H.1c),k(b.1H.1e))),11.1y&&(a(11.1y).1q(k(b.1y.1e)),b.2U&&a(11.2U.1j).1q(k(b.2U.1e))),a(c.38).1q(k(b.2F.1e))}12 I(a){11.2x=a||0,11.1s&&(11.1s.2x=11.2x)}12 J(a){11.7u(a),11.1P()}1a{51:f,7g:b,1P:g,1z:c,36:d,2e:o,2P:h,5e:i,7l:j,7k:l,4n:m,7f:A,6a:C,7e:F,6d:D,7t:E,7o:u,7p:v,4p:p,2o:G,52:H,7u:I,9e:J}}());13 w={3j:{},1t:12(b){1f(!b)1a 1r;13 c=1r,d=a(b).1X("2p-1V");1a d&&(c=11.3j[d]),c},30:12(a){11.3j[a.1V]=a},1z:12(a){13 b=11.1t(a);b&&(3G 11.3j[b.1V],b.1z())},4q:12(a){1a 1b.2Z/2-1b.6M(a,1b.4A(a)*1b.2Z)}};w.4r={4k:12(a,b){13 c=u.1t(a.1g),d=c.4p().1i.1c,e=11.4W(d.14,d.18,b,{3S:!1});1a{14:e.14,18:e.18}},9f:12(a,b,c){13 d=.5*a,e=m(1b.9g(d/l(d,b))),f=2E-e-90,g=o(n(f))*c,h=2*(d+g),i=h/a*b;1a{14:h,18:i}},4W:12(a,b,c){13 d=m(1b.79(.5*(b/a))),e=2E-d,f=1b.4A(n(e-90))*c,g=a+2*f,h=g*b/a;1a{14:g,18:h}},3T:12(b){13 c=u.1t(b.1g),d=b.19.31,e=r.78(c.29),g=(r.2I(c.29),w.4r.4k(b,d)),h={2z:{1c:{14:1b.1E(g.14),18:1b.1E(g.18)},1e:{17:0,15:0}}};1f(d){h.2X=[];28(13 i=0;d>=i;i++){13 j=w.4r.4k(b,i,{3S:!1}),k={1e:{17:h.2z.1c.18-j.18,15:e?d-i:(h.2z.1c.14-j.14)/2},1c:j};h.2X.2n(k)}}1G h.2X=[a.1k({},h.2z)];1a h},56:12(a,b,c){s.56(a,b.3k(),c)}},a.1k(x.3F,12(){12 b(){1a B.1t(11.1g)[0]}12 c(){1a u.1t(11.1g)}12 d(){11.36()}12 e(){11.1j&&(a(11.1j).1z(),11.1l=1r,11.1m=1r,11.1H=1r,11.1j=1r,11.1o={})}12 f(){}12 g(){11.36(),11.51();13 b=11.2e(),c=11.3k();11.1j=a("<2h>").1Y("9h")[0],a(b.1j).66(11.1j),c.2T&&a(b.1j).66(c.2T),c.2o(),a(11.1j).1q({17:0,15:0}),11.7v(),11.52()}12 h(){1a 11.19.1K/(11.19.31+1)}12 i(){13 b=11.3k(),c=b.2o(),d=11.2e(),e=11.2o(),f=11.19.31,g=w.4r.3T(11),h=b.29,i=r.5X(h),j={17:f,15:f};1f(d.19.1l){13 l=g.2X[g.2X.2a-1];"15"==i&&(j.15+=1b.1E(l.1c.18)),"17"==i&&(j.17+=1b.1E(l.1c.18))}13 m=b.1o.19,n=m.1n,o=m.1i;"1m"==d.19.1n.1e&&n&&(n+=o);13 p=e.1H.1c;a(11.1j).1Z(a(11.1H=1x.22("2h")).1Y("9i").1q(k(p))).1q(k(p)),a(1x.3d).1Z(a(11.2W=1x.22("3f"))),q.3J(11.2W,e.1H.1c),q.3p(11.2W);13 s=11.2W.3o("2d");s.2L=11.2x,a(11.1H).1Z(11.2W);28(13 u=f+1,v=0;f>=v;v++)s.2Q=t.2R(11.19.1Q,w.4q(v*(1/u))*(11.19.1K/u)),q.6Z(s,{14:c.1m.1c.14+2*v,18:c.1m.1c.18+2*v,17:j.17-v,15:j.15-v,1n:n+v});1f(b.19.1l){13 x={x:j.15,y:j.17},y=g.2X[0].1c,z=b.19.1l,A=o;A+=.5*z.14;13 B=b.19.1n&&"1m"==b.19.1n.1e?b.19.1n.2u||0:0;B&&(A+=B);13 C=o+B+.5*z.14-.5*y.14,D=1b.1E(n>C?n-C:0),E=b.3B&&b.3B.1l||{x:0,y:0},F=b.3B&&b.3B.5c||{x:0,y:0};1f(A+=1b.1U(D,b.19.1l.1A&&b.19.1l.1A[i&&/^(15|1O)$/.3h(i)?"y":"x"]||0),"17"==i||"1R"==i){1T(h){1h"3O":1h"4g":x.x+=A+E.x-F.x;1B;1h"4b":1h"58":1h"4f":1h"5a":x.x+=.5*c.1m.1c.14+E.x;1B;1h"3P":1h"4e":x.x+=c.1m.1c.14-(A-E.x+F.x)}"1R"==i&&(x.y+=c.1m.1c.18);28(13 v=0,G=g.2X.2a;G>v;v++){s.2Q=t.2R(11.19.1Q,w.4q(v*(1/u))*(11.19.1K/u));13 f=g.2X[v];s.2f(),"17"==i?(s.3s(x.x,x.y-v),s.1d(x.x-.5*f.1c.14,x.y-v),s.1d(x.x,x.y-v-f.1c.18),s.1d(x.x+.5*f.1c.14,x.y-v)):(s.3s(x.x,x.y+v),s.1d(x.x-.5*f.1c.14,x.y+v),s.1d(x.x,x.y+v+f.1c.18),s.1d(x.x+.5*f.1c.14,x.y+v)),s.2g(),s.34()}}1G{1T(h){1h"3R":1h"3Q":x.y+=A+E.y-F.y;1B;1h"4i":1h"5b":1h"4c":1h"59":x.y+=.5*c.1m.1c.18+E.y;1B;1h"4h":1h"4d":x.y+=c.1m.1c.18-(A-E.y+F.y)}"1O"==i&&(x.x+=c.1m.1c.14);28(13 v=0,G=g.2X.2a;G>v;v++){s.2Q=t.2R(11.19.1Q,w.4q(v*(1/u))*(11.19.1K/u));13 f=g.2X[v];s.2f(),"15"==i?(s.3s(x.x-v,x.y),s.1d(x.x-v,x.y-.5*f.1c.14),s.1d(x.x-v-f.1c.18,x.y),s.1d(x.x-v,x.y+.5*f.1c.14)):(s.3s(x.x+v,x.y),s.1d(x.x+v,x.y-.5*f.1c.14),s.1d(x.x+v+f.1c.18,x.y),s.1d(x.x+v,x.y+.5*f.1c.14)),s.2g(),s.34()}}}}12 j(){13 b=11.3k();b.2G,b.1n;13 e=b.2o(),g=(11.2e(),11.19.31),h=a.1k({},e.1m.1c);h.14+=2*g,h.18+=2*g;13 i,k;1f(b.19.1l){13 l=w.4r.3T(11);i=l.2z.1c,k=i.18}13 m=s.5Z(b,h,k),n=m.1c,o=m.1e,h=m.1m.1c,p=m.1m.1e,r=e.1H.1e,t=e.1m.1e,u={17:r.17+t.17-(p.17+g)+11.19.1A.y,15:r.15+t.15-(p.15+g)+11.19.1A.x},v=e.2J,x=e.21.1c,y={17:0,15:0};1f(0>u.17){13 z=1b.2V(u.17);y.17+=z,u.17=0,v.17+=z}1f(0>u.15){13 A=1b.2V(u.15);y.15+=A,u.15=0,v.15+=A}13 B={18:1b.1U(n.18+u.17,x.18+y.17),14:1b.1U(n.14+u.15,x.14+y.15)},C={15:1b.1E(y.15+e.1H.1e.15+e.1m.1e.15+b.1i+b.2m),17:1b.1E(y.17+e.1H.1e.17+e.1m.1e.17+b.1i+b.2m)},D={1D:{1c:B},21:{1c:x,1e:y},1j:{1c:n,1e:u},1H:{1c:n,1e:{17:1b.23(o.17),15:1b.23(o.15)}},1m:{1c:{14:1b.1E(h.14),18:1b.1E(h.18)},1e:{17:1b.23(p.17),15:1b.23(p.15)}},2J:v,2F:{1e:C}};1a D}12 l(){13 b=11.2o(),c=11.3k(),d=11.2e();1f(a(d.1j).1q(k(b.1D.1c)),a(d.4Z).1q(a.1k(k(b.21.1e),k(b.21.1c))),c.2T&&c.2T.1q(k(b.1D.1c)),d.19.1y){13 e=c.2o(),f=b.21.1e,g=e.1y.1e;1f(a(c.1y).1q(k({17:f.17+g.17,15:f.15+g.15})),d.19.1y.1s){13 h=e.2U.1e;a(c.2U.1j).1q(k({17:f.17+h.17,15:f.15+h.15}))}}a(11.1j).1q(a.1k(k(b.1j.1c),k(b.1j.1e))),a(11.1H).1q(k(b.1H.1c)),a(d.38).1q(k(b.2F.1e))}1a{51:f,1z:d,36:e,1P:g,2e:b,3k:c,2o:j,7w:h,7v:i,52:l}}());13 y={3j:{},1t:12(b){1f(!b)1a 1r;13 c=a(b).1X("2p-1V");1a c?11.3j[c]:1r},30:12(a){11.3j[a.1V]=a},1z:12(a){13 b=11.1t(a);b&&(3G 11.3j[b.1V],b.1z())}};a.1k(z.3F,12(){12 b(){1a B.1t(11.1g)[0]}12 c(){1a u.1t(11.1g)}12 d(){1a 11.19.1K/(11.19.31+1)}12 e(){11.36()}12 f(){11.1j&&(a(11.1j).1z(),11.1j=1r)}12 g(){11.36();13 c=(11.2e(),11.3k()),d=c.2o().1y.1c,e=a.1k({},d),f=11.19.31;e.14+=2*f,e.18+=2*f,a(c.1y).6e(a(11.1j=1x.22("2h")).1Y("9j")),a(1x.3d).1Z(a(11.4s=1x.22("3f"))),q.3J(11.4s,e),q.3p(11.4s);13 g=11.4s.3o("2d");g.2L=11.2x,a(11.1j).1Z(11.4s);28(13 h=e.14/2,i=e.18/2,j=d.18/2,k=f+1,l=0;f>=l;l++)g.2Q=t.2R(11.19.1Q,w.4q(l*(1/k))*(11.19.1K/k)),g.2f(),g.26(h,i,j+l,n(0),n(7d),!0),g.2g(),g.34()}1a{1P:g,1z:e,36:f,2e:b,3k:c,7w:d}}());13 B={2A:{},19:{3V:"6f",4C:9k},6X:12(){12 b(){13 b=["2B"];1S.2H.3H&&(b.2n("9l"),a(1x.3d).3U("2B",12(){1a 3t 0})),a.1w(b,12(b,c){a(1x.7x).9m(".3C .7m, .3C .9n-1D",c,12(b){b.9o(),b.9p(),B.6g(a(b.1C).5f(".3C")[0]).1I()})}),a(1N).3U("3J",a.1v(11.7y,11))}1a b}(),7y:12(){11.5g&&(1N.6h(11.5g),11.5g=1r),11.5g=d.4G(a.1v(12(){13 b=11.3I();a.1w(b,12(a,b){b.1e()})},11),9q)},5h:12(b){13 d,c=a(b).1X("2p-1V");1f(!c){13 e=11.6g(a(b).5f(".3C")[0]);e&&e.1g&&(c=a(e.1g).1X("2p-1V"))}1a c&&(d=11.2A[c])?d:3t 0},5P:12(a){13 b;1a d.2j(a)&&(b=11.5h(a)),b&&b.1g},1t:12(b){13 c=[];1f(d.2j(b)){13 e=11.5h(b);e&&(c=[e])}1G a.1w(11.2A,12(d,e){e.1g&&a(e.1g).7z(b)&&c.2n(e)});1a c},6g:12(b){1f(!b)1a 1r;13 c=1r;1a a.1w(11.2A,12(a,d){d.1F("1P")&&d.1j===b&&(c=d)}),c},9r:12(b){13 c=[];1a a.1w(11.2A,12(d,e){e.1g&&a(e.1g).7z(b)&&c.2n(e)}),c},1W:12(b){1f(d.2j(b)){13 c=b,e=11.1t(c)[0];e&&e.1W()}1G a(b).1w(a.1v(12(a,b){13 c=11.1t(b)[0];c&&c.1W()},11))},1I:12(b){1f(d.2j(b)){13 c=11.1t(b)[0];c&&c.1I()}1G a(b).1w(a.1v(12(a,b){13 c=11.1t(b)[0];c&&c.1I()},11))},33:12(b){1f(d.2j(b)){13 c=b,e=11.1t(c)[0];e&&e.33()}1G a(b).1w(a.1v(12(a,b){13 c=11.1t(b)[0];c&&c.33()},11))},4R:12(){a.1w(11.3I(),12(a,b){b.1I()})},2P:12(b){1f(d.2j(b)){13 c=b,e=11.1t(c)[0];e&&e.2P()}1G a(b).1w(a.1v(12(a,b){13 c=11.1t(b)[0];c&&c.2P()},11))},3I:12(){13 b=[];1a a.1w(11.2A,12(a,c){c.1L()&&b.2n(c)}),b},5S:12(b){13 c=!1;1a d.2j(b)&&a.1w(11.3I()||[],12(a,d){1a d.1g==b?(c=!0,!1):3t 0}),c},7A:12(){13 c,b=0;1a a.1w(11.2A,12(a,d){d.2k>b&&(b=d.2k,c=d)}),c},7B:12(){1>=11.3I().2a&&a.1w(11.2A,12(b,c){c.1F("1P")&&!c.19.2k&&a(c.1j).1q({2k:c.2k=+B.19.4C})})},30:12(a){11.2A[a.1V]=a},5i:12(b){13 c=11.5h(b);1f(c){13 d=a(c.1g).1X("2p-1V");3G 11.2A[d],c.1I(),c.1z()}},1z:12(b){d.2j(b)?11.5i(b):a(b).1w(a.1v(12(a,b){11.5i(b)},11))},6Y:12(){a.1w(11.2A,a.1v(12(a,b){b.1g&&!d.1g.5H(b.1g)&&11.5i(b.1g)},11))},5Q:12(a){11.19.3V=a||"6f"},5R:12(a){11.19.4C=a||0},5U:12(){a.1w(11.2A,a.1v(12(a,b){b.1o&&b.1o.2l&&(b.1o.2l.6i(),b.1o.2l=1r),b.27("3c",!1)},11)),i.6S()},6B:12(){12 f(d){13 e;1a e="2s"==a.1p(d)?{1g:c.25&&c.25.1g||b.25.1g,2v:d}:A(a.1k({},b.25),d)}12 g(f){1a b=1S.2C.7C,c=A(a.1k({},b),1S.2C.6j),d=1S.2C.6k.7C,e=A(a.1k({},d),1S.2C.6k.6j),g=h,h(f)}12 h(g){g.21=g.21&&1S.2C[g.21]?g.21:1S.2C[B.19.3V]?B.19.3V:"6f";13 h=g.21?a.1k({},1S.2C[g.21]||1S.2C[B.19.3V]):{},i=A(a.1k({},c),h),j=A(a.1k({},i),g);1f(j.2c){13 k=c.2c||{},l=b.2c;"4t"==a.1p(j.2c)&&(j.2c={3W:k.3W||l.3W,1p:k.1p||l.1p}),j.2c=A(a.1k({},l),j.2c)}1f(j.1m&&"2s"==a.1p(j.1m)&&(j.1m={1Q:j.1m,1K:1}),j.1i){13 m,n=c.1i||{},o=b.1i;m="2y"==a.1p(j.1i)?{2u:j.1i,1Q:n.1Q||o.1Q,1K:n.1K||o.1K}:A(a.1k({},o),j.1i),j.1i=0===m.2u?!1:m}1f(j.1n){13 p;p="2y"==a.1p(j.1n)?{2u:j.1n,1e:c.1n&&c.1n.1e||b.1n.1e}:A(a.1k({},b.1n),j.1n),j.1n=0===p.2u?!1:p}13 q,s=s=j.1u&&j.1u.1C||"2s"==a.1p(j.1u)&&j.1u||c.1u&&c.1u.1C||"2s"==a.1p(c.1u)&&c.1u||b.1u&&b.1u.1C||b.1u,t=j.1u&&j.1u.1D||c.1u&&c.1u.1D||b.1u&&b.1u.1D||B.2r.6l(s);1f(j.1u?"2s"==a.1p(j.1u)?q={1C:j.1u,1D:B.2r.7D(j.1u)}:(q={1D:t,1C:s},j.1u.1D&&(q.1D=j.1u.1D),j.1u.1C&&(q.1C=j.1u.1C)):q={1D:t,1C:s},"2M"==j.1C){13 u=r.2I(q.1C);q.1C="1J"==u?q.1C.61(/(15|1O)/,"2t"):q.1C.61(/(17|1R)/,"2t")}j.1u=q;13 v;1f("2M"==j.1C?(v=a.1k({},b.1A),a.1k(v,1S.2C.6j.1A||{}),g.21&&a.1k(v,(1S.2C[g.21]||1S.2C[B.19.3V]).1A||{}),v=B.2r.7E(b.1A,b.1u,q.1C,!0),g.1A&&(v=a.1k(v,g.1A||{})),j.3X=0):v={x:j.1A.x,y:j.1A.y},j.1A=v,j.1y&&j.7F){13 w=a.1k({},1S.2C.6k[j.7F]),x=A(a.1k({},e),w);1f(x.2q&&a.1w(["6b","6c"],12(b,c){13 f=x.2q[c],g=e.2q&&e.2q[c];1f(f.1m){13 h=g&&g.1m;1f("2y"==a.1p(f.1m))f.1m={1Q:h&&h.1Q||d.2q[c].1m.1Q,1K:f.1m};1G 1f("2s"==a.1p(f.1m)){13 i=h&&"2y"==a.1p(h.1K)&&h.1K||d.2q[c].1m.1K;f.1m={1Q:f.1m,1K:i}}1G f.1m=A(a.1k({},d.2q[c].1m),f.1m)}1f(f.1i){13 j=g&&g.1i;f.1i="2y"==a.1p(f.1i)?{1Q:j&&j.1Q||d.2q[c].1i.1Q,1K:f.1i}:A(a.1k({},d.2q[c].1i),f.1i)}}),x.1s){13 z=e.1s&&e.1s.3D&&e.1s.3D==5x?e.1s:d.1s;x.1s.3D&&x.1s.3D==5x&&(z=A(z,x.1s)),x.1s=z}j.1y=x}1f(j.1s){13 C;C="4t"==a.1p(j.1s)?c.1s&&"4t"==a.1p(c.1s)?b.1s:c.1s?c.1s:b.1s:A(a.1k({},b.1s),j.1s||{}),"2y"==a.1p(C.1A)&&(C.1A={x:C.1A,y:C.1A}),j.1s=C}1f(j.1l){13 D={};D="4t"==a.1p(j.1l)?A({},b.1l):A(A({},b.1l),a.1k({},j.1l)),"2y"==a.1p(D.1A)&&(D.1A={x:D.1A,y:D.1A}),j.1l=D}1f(j.2Y&&("2s"==a.1p(j.2Y)?j.2Y={5j:j.2Y,7G:!0}:"4t"==a.1p(j.2Y)&&(j.2Y=j.2Y?{5j:"4T",7G:!0}:!1)),j.25&&"2B-9s"==j.25&&(j.7H=!0,j.25=!1),j.25)1f(a.71(j.25)){13 E=[];a.1w(j.25,12(a,b){E.2n(f(b))}),j.25=E}1G j.25=[f(j.25)];1a j.2K&&"2s"==a.1p(j.2K)&&(j.2K=[""+j.2K]),j.2m=0,j.1M&&(1N.6m||(j.1M=!1)),j}13 b,c,d,e;1a g}()};B.2r=12(){12 c(c){13 d=r.2N(c),e=d[1],f=d[2],g=r.2I(c),h=a.1k({1J:!0,2b:!0},20[1]||{});1a"1J"==g?(h.2b&&(e=b[e]),h.1J&&(f=b[f])):(h.2b&&(f=b[f]),h.1J&&(e=b[e])),e+f}12 f(a){13 d=r.2N(a);1a c(d[1]+b[d[2]])}12 h(b,c){a(b.1j).1q({17:c.17+"2w",15:c.15+"2w"})}12 j(a,b,d,e){13 g=y(a,b,d,e),h=d&&"2s"==7I d.1p?d.1p:"";1f(/9t$/.3h(h),1===g.3Y.3Z)1a l(a,g),g;13 m=b,n=e,o={1J:!g.3Y.1J,2b:!g.3Y.2b},p={1J:!1,2b:!1},q=r.2I(b);1a((p.2b="1J"==q&&o.2b)||(p.1J="2b"==q&&o.1J))&&(m=c(b,p),n=c(e,p),g=y(a,m,d,n),1===g.3Y.3Z)?(l(a,g),g):(g=k(g,a),l(a,g),g)}12 k(a,b){13 c=z(b),d=c.1c,e=c.1e,f=u.1t(b.1g).1o.1u[a.1u.1D].1D.1c,g=a.1e,h={17:0,15:0,3A:[]};1a e.15>g.15&&(h.15=e.15-g.15,h.3A.2n("15"),a.1e.15=e.15),e.17>g.17&&(h.17=g.17-e.17,h.3A.2n("17"),a.1e.17=e.17),e.15+d.14<g.15+f.14&&(h.15=e.15+d.14-(g.15+f.14),h.3A.2n("1O"),a.1e.15=e.15+d.14-f.14),e.17+d.18<g.17+f.18&&(h.17=e.17+d.18-(g.17+f.18),h.3A.2n("1R"),a.1e.17=e.17+d.18-f.18),a.7J=h,a}12 l(a,b){a.5e(b.1u.1D,b.3Y.4l,b.7J),h(a,b.1e)}12 m(a){1a a&&(/^2M|2B|3H$/.3h("2s"==7I a.1p&&a.1p||"")||a.5G>=0)}12 n(a,b,c){1a a>=b&&c>=a}12 o(a,b,c,d){13 e=n(a,c,d),f=n(b,c,d);1f(e&&f)1a b-a;1f(e&&!f)1a d-a;1f(!e&&f)1a b-c;13 g=n(c,a,b),h=n(d,a,b);1a g&&h?d-c:g&&!h?b-c:!g&&h?d-a:0}12 q(a,b){1a o(a.1e.15,a.1e.15+a.1c.14,b.1e.15,b.1e.15+b.1c.14)*o(a.1e.17,a.1e.17+a.1c.18,b.1e.17,b.1e.17+b.1c.18)}12 s(a,b){13 c=a.1c.14*a.1c.18;1a c?q(a,b)/c:0}12 t(a,b){13 c=r.2N(b),d=r.2I(b),e={15:0,17:0};1f("1J"==d){1T(c[2]){1h"2t":1h"2S":e.15=.5*a.14;1B;1h"1O":e.15=a.14}"1R"==c[1]&&(e.17=a.18)}1G{1T(c[2]){1h"2t":1h"2S":e.17=.5*a.18;1B;1h"1R":e.17=a.18}"1O"==c[1]&&(e.15=a.14)}1a e}12 v(b){13 c=d.1g.4L(b),e=d.1g.4H(b),f={17:a(1N).4I(),15:a(1N).4J()};1a c.15+=-1*(e.15-f.15),c.17+=-1*(e.17-f.17),c}12 y(b,e,f,g){13 h,i,j,k=u.1t(b.1g),l=k.19,n=l.1A,o=m(f);1f(o||!f){1f(j={14:24,18:24},o){13 p=d.5F(f);h={17:p.y-.5*j.18+6,15:p.x-.5*j.14+6}}1G{13 q=b.1o.2v;h={17:(q?q.y:0)-.5*j.18+6,15:(q?q.x:0)-.5*j.14+6}}b.1o.2v={x:h.15,y:h.17}}1G h=v(f),j={14:a(f).7K(),18:a(f).7L()};1f(l.1l&&"2M"!=l.1C){13 y=r.2N(g),A=r.2N(e),C=r.2I(g),D=k.1o.19,E=k.4p().1i.1c,F=D.1n,G=D.1i,H=F&&"1m"==l.1n.1e?F:0,I=F&&"1i"==l.1n.1e?F:F+G,J=G+H+.5*l.1l.14-.5*E.14,K=I>J?I-J:0;4u=1b.1E(G+H+.5*l.1l.14+K+l.1l.1A["1J"==C?"x":"y"]),"1J"==C&&"15"==y[2]&&"15"==A[2]||"1O"==y[2]&&"1O"==A[2]?(j.14-=2*4u,h.15+=4u):("2b"==C&&"17"==y[2]&&"17"==A[2]||"1R"==y[2]&&"1R"==A[2])&&(j.18-=2*4u,h.17+=4u)}i=a.1k({},h);13 L=o?c(l.1u.1D):l.1u.1C,M=t(j,L),N=t(j,g);({17:h.17+M.17+n.y,15:h.15+M.15+n.x}),h={15:h.15+N.15,17:h.17+N.17};13 P=a.1k({},n);P=x(P,L,g,"2M"==k.19.1C),h.17+=P.y,h.15+=P.x;13 k=u.1t(b.1g),Q=k.1o.1u,R=a.1k({},Q[e]),S={x:0,y:0},y=r.2N(g);1f("2t"!=y[2]){13 C=C=r.2I(g),T=B.2r.6l(g,"2b"==C?{1J:!0,2b:!1}:{1J:!1,2b:!0});e==T&&(S.y=k.3B.5c.y,S.x=k.3B.5c.x)}13 U={17:h.17-R.2J.17-S.y,15:h.15-R.2J.15-S.x};R.1D.1e=U;13 V={1J:!0,2b:!0},W={x:0,y:0};1f(b.19.2Y){13 X=z(b),Y=b.19.1s?w.1t(b.1g):k,Z=Y.2o().1D.1c;V.3Z=s({1c:Z,1e:U},X),1>V.3Z&&((U.15<X.1e.15||U.15+Z.14>X.1e.15+X.1c.14)&&(V.1J=!1,W.x=U.15<X.1e.15?U.15-X.1e.15:U.15+Z.14-(X.1e.15+X.1c.14)),(U.17<X.1e.17||U.17+Z.18>X.1e.17+X.1c.18)&&(V.2b=!1,W.y=U.17<X.1e.17?U.17-X.1e.17:U.17+Z.18-(X.1e.17+X.1c.18)))}1G V.3Z=1;V.4l=W;13 $=Q[e].1H,7M=s({1c:j,1e:i},{1c:$.1c,1e:{17:U.17+$.1e.17,15:U.15+$.1e.15}});1a{1e:U,3Z:{1C:7M},3Y:V,1u:{1D:e,1C:g}}}12 z(b){13 c={17:a(1N).4I(),15:a(1N).4J()},e=b.19,f=e.1C;("2M"==f||"4F"==f)&&(f=b.1g);13 g=a(f).5f(e.2Y.5j).7i()[0];1f(!g||"4T"==e.2Y.5j)1a{1c:p.4T(),1e:c};13 h=d.1g.4L(g),i=d.1g.4H(g);1a h.15+=-1*(i.15-c.15),h.17+=-1*(i.17-c.17),{1c:{14:a(g).5V(),18:a(g).5W()},1e:h}}13 b={15:"1O",1O:"15",17:"1R",1R:"17",2t:"2t",2S:"2S"};e.3m&&9>e.3m||e.4M&&2>e.4M||e.5M&&9u>e.5M;13 x=12(){13 a=[[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]],b={3R:0,3O:0,4b:1,58:1,3P:2,3Q:2,4c:5,59:5,4d:8,4e:8,4f:7,5a:7,4g:6,4h:6,4i:3,5b:3};1a 12(c,d,e,f){13 g=a[b[d]],h=a[b[e]],i=[1b.65(.5*1b.2V(g[0]-h[0]))?-1:1,1b.65(.5*1b.2V(g[1]-h[1]))?-1:1];1a r.35(d)||!r.35(e)||f||("1J"==r.2I(e)?i[0]=0:i[1]=0),{x:i[0]*c.x,y:i[1]*c.y}}}();1a{1t:y,4P:j,6l:c,7D:f,7N:v,7E:x,6n:m}}(),B.2r.4S={x:0,y:0},a(1x).6W(12(){13 b=B.2r;a(1x).3U("5k",12(a){b.4S={x:a.5G,y:a.6H}})}),B.53=12(){12 b(){a(1x.3d).1Z(a(1x.22("2h")).1Y("9v").1Z(a(1x.22("2h")).1Y("3C").1Z(a(11.1j=1x.22("2h")).1Y("7O"))))}12 c(b){1a{14:a(b).5V(),18:a(b).5W()}}12 e(b){13 d=c(b),e=b.4K;1a e&&a(e).1q({14:d.14+"2w"})&&c(b).18>d.18&&d.14++,a(e).1q({14:"62%"}),d}12 f(b,c,e){11.1j||11.1P();13 f=b.19,g=a.1k({1M:!1},20[3]||{});!f.7P&&!d.2j(c)||a(c).1X("7Q")||(f.7P&&"2s"==a.1p(c)&&(b.39=a("#"+c)[0],c=b.39),!b.40&&c&&d.1g.5H(c)&&(a(b.39).1X("7R",a(b.39).1q("7S")),b.40=1x.22("2h"),a(b.39).6e(a(b.40).1I())));13 h=1x.22("2h");a(11.1j).1Z(a(h).1Y("7h 9w").1Z(c)),d.2j(c)&&a(c).1W(),f.21&&a(h).1Y("9x"+b.19.21);13 i=a(h).67("7T[4m]").9y(12(){1a!(a(11).3g("18")&&a(11).3g("14"))});1f(i.2a>0&&!b.1F("3E")){b.27("3E",!0),f.1M&&(g.1M||b.1M||(b.1M=b.6o(f.1M)),b.1F("1L")&&(b.1e(),a(b.1j).1W()),b.1M.6p());13 j=0,k=1b.1U(9z,9A*(i.2a||0));b.2i("3E"),b.41("3E",a.1v(12(){i.1w(12(){11.6q=12(){}}),j>=i.2a||(11.5l(b,h),e&&e())},11),k),a.1w(i,a.1v(12(c,d){13 f=3q 9B;f.6q=a.1v(12(){f.6q=12(){};13 c=f.14,g=f.18,k=a(d).3g("14"),l=a(d).3g("18");k&&l||(!k&&l?(c=1b.23(l*c/g),g=l):!l&&k&&(g=1b.23(k*g/c),c=k),a(d).3g({14:c,18:g}),j++),j==i.2a&&(b.2i("3E"),b.1M&&(b.1M.1z(),b.1M=1r),b.1F("1L")&&a(b.1j).1I(),11.5l(b,h),e&&e())},11),f.4m=d.4m},11))}1G 11.5l(b,h),e&&e()}12 g(b,c){13 d=e(c),f={14:d.14-(2O(a(c).1q("2m-15"))||0)-(2O(a(c).1q("2m-1O"))||0),18:d.18-(2O(a(c).1q("2m-17"))||0)-(2O(a(c).1q("2m-1R"))||0)};b.19.3i&&"2y"==a.1p(b.19.3i)&&f.14>b.19.3i&&(a(c).1q({14:b.19.3i+"2w"}),d=e(c)),b.1o.2G=d,a(b.38).7U(c)}1a{1P:b,42:f,5l:g,69:e}}(),a.1k(C.3F,12(){12 b(a,b,c){11.1o.3b[a]=d.4G(b,c)}12 c(a){1a 11.1o.3b[a]}12 e(a){11.1o.3b[a]&&(1N.6h(11.1o.3b[a]),3G 11.1o.3b[a])}12 f(){a.1w(11.1o.3b,12(a,b){1N.6h(b)}),11.1o.3b=[]}12 g(b,c,d,e){c=c;13 f=a.1v(d,e||11);11.1o.5A.2n({1g:b,7V:c,7W:f}),a(b).3U(c,f)}12 h(){a.1w(11.1o.5A,12(b,c){a(c.1g).7X(c.7V,c.7W)})}12 j(a,b){11.1o.2q[a]=b}12 l(a){1a 11.1o.2q[a]}12 m(){11.2D(11.1g,"4o",11.5m),11.2D(11.1g,"54",a.1v(12(a){11.6r(a)},11)),11.19.2K&&a.1w(11.19.2K,a.1v(12(b,c){13 d=!1;"2B"==c&&(11.19.25&&a.1w(11.19.25,12(a,b){1a"4F"==b.1g&&"2B"==b.2v?(d=!0,!1):3t 0}),11.27("5B",d)),11.2D(11.1g,c,"2B"==c?d?11.33:11.1W:a.1v(12(){11.7Y()},11))},11)),11.19.25?a.1w(11.19.25,a.1v(12(b,c){13 d;1T(c.1g){1h"4F":1f(11.1F("5B")&&"2B"==c.2v)1a;d=11.1g;1B;1h"1C":d=11.1C}d&&11.2D(d,c.2v,"2B"==c.2v?11.1I:a.1v(12(){11.6s()},11))},11)):11.19.7Z&&11.19.2K&&!a.6t("2B",11.19.2K)>-1&&11.2D(11.1g,"54",a.1v(12(){11.2i("1W")},11));13 b=!1;!11.19.9C&&11.19.2K&&((b=a.6t("5k",11.19.2K)>-1)||a.6t("5n",11.19.2K)>-1)&&"2M"==11.1C&&11.2D(11.1g,b?"5k":"5n",12(a){11.1F("4E")&&11.1e(a)})}12 n(){11.2D(11.1j,1S.2H.3H?"5n":"4o",11.5m),11.2D(11.1j,"54",11.6r),11.2D(11.1j,1S.2H.3H?"5n":"4o",a.1v(12(){11.5o("4v")||11.1W()},11)),11.19.25&&a.1w(11.19.25,a.1v(12(b,c){13 d;1T(c.1g){1h"1D":d=11.1j}d&&11.2D(d,c.2v,c.2v.3e(/^(2B|5k|4o)$/)?11.1I:a.1v(12(){11.6s()},11))},11))}12 o(a,b,c){13 d=u.1t(11.1g);d&&d.5e(a,b,c)}12 p(a){13 b=u.1t(11.1g);b&&b.4n(a)}12 q(){11.4n(11.19.1u.1D)}12 r(){a(11.1j=1x.22("2h")).1Y("3C"),11.80()}12 s(){11.1P();13 a=u.1t(11.1g);a?a.1P():(3q v(11.1g),11.27("4E",!0))}12 t(){11.1F("1P")||(a(1x.3d).1Z(a(11.1j).1q({15:"-5p",17:"-5p",2k:11.2k}).1Z(a(11.4Z=1x.22("2h")).1Y("9D")).1Z(a(11.38=1x.22("2h")).1Y("7O"))),a(11.1j).1Y("9E"+11.19.21),11.19.7H&&(a(11.1g).1Y("81"),11.2D(1x.7x,"2B",a.1v(12(b){1f(11.1L()){13 c=a(b.1C).5f(".3C, .81")[0];(!c||c&&c!=11.1j&&c!=11.1g)&&11.1I()}},11))),1S.2H.48&&(11.19.4w||11.19.3X)&&(11.5q(11.19.4w),a(11.1j).1Y("6u")),11.82(),11.27("1P",!0),B.30(11))}12 w(){13 c;11.2F,11.40&&11.39&&((c=a(11.39).1X("7R"))&&a(11.39).1q({7S:c}),a(11.40).6e(11.39).1z(),11.40=1r)}12 x(){d.44(a.1v(12(){11.83()},11)),11.84(),11.6v(),d.44(a.1v(12(){a(11.1j).67("7T[4m]").7X("9F")},11)),u.1z(11.1g),11.1F("1P")&&11.1j&&(a(11.1j).1z(),11.1j=1r);13 c,b="5z";(c=a(11.1g).1X(b))&&a(11.1g).3g("5y",c).85("5z"),a(11.1g).85("2p-1V")}12 y(b){13 c=a.1k({4x:11.19.4x,1M:!1},20[1]||{});11.1P(),11.1F("1L")&&a(11.1j).1I(),B.53.42(11,b,a.1v(12(){13 b=11.1F("1L");b||11.27("1L",!0),11.86(),b||11.27("1L",!1),11.1F("1L")&&(a(11.1j).1I(),11.1e(),11.5r(),a(11.1j).1W()),11.27("3c",!0),c.4x&&c.4x(11.38.4y,11.1g),c.4z&&c.4z()},11),{1M:c.1M})}12 z(b){13 c,d={47:11.2F,1p:11.19.2c.1p,1X:11.19.2c.1X||{},87:11.19.2c.87||"7U"};1f(!(11.1F("2l")||11.19.2c.3W&&11.1F("3c"))){1f(11.19.2c.3W&&(c=i.1t(d)))1a 11.6w(c,{4z:a.1v(12(){11.1F("1L")&&11.19.43&&11.19.43(11.38.4y,11.1g)},11)}),3t 0;11.27("2l",!0),11.19.1M&&(11.1M?11.1M.6p():(11.1M=11.6o(11.19.1M),11.27("3c",!1)),11.1e(b)),11.1o.2l&&(11.1o.2l.6i(),11.1o.2l=1r),11.1o.2l=a.2c(a.1k({},d,{9G:a.1v(12(b,c,e){0!==e.9H&&(i.4P(d,e.4O),11.6w(e.4O,{4z:a.1v(12(){11.27("2l",!1),11.1F("1L")&&11.19.43&&11.19.43(11.38.4y,11.1g),11.1M&&(11.1M.1z(),11.1M=1r)},11)}))},11)}))}}12 A(b){13 c=a.1k({1M:11.19.1M&&11.1M},20[1]||{});11.42(b,c)}12 C(){13 b=1x.22("2h");a(b).1X("7Q",!0);13 c=6m.4Q(b,a.1k({},20[0]||{})),d=6m.5Y(b);1a a(b).1q(k(d)),11.42(b,{4x:!1,4z:12(){c.6p()}}),c}12 E(){1f(11.1F("1P")&&!11.19.2k){13 b=B.7A();b&&b!=11&&11.2k<=b.2k&&a(11.1j).1q({2k:11.2k=b.2k+1})}}12 F(){13 a=u.1t(11.1g);a&&(a.2P(),11.1L()&&11.1e())}12 G(a){1f(1S.2H.48){a=a||0;13 b=11.1j.9I;b.9J=a+"5s",b.9K=a+"5s",b.9L=a+"5s",b.9M=a+"5s"}}12 H(b){11.2i("1I"),11.2i("4v"),11.1F("1L")||11.5o("1W")||11.41("1W",a.1v(12(){11.2i("1W"),11.1W(b)},11),11.19.7Z||1)}12 I(b){1f(11.2i("1I"),11.2i("4v"),!11.1L()){1f("12"==a.1p(11.2F)||"12"==a.1p(11.1o.5t)){"12"!=a.1p(11.1o.5t)&&(11.1o.5t=11.2F);13 c=11.1o.5t(11.1g)||!1;1f(c!=11.1o.5C&&(11.1o.5C=c,11.27("3c",!1),11.6v()),11.2F=c,!c)1a}11.19.9N&&B.4R(),11.27("1L",!0),11.19.2c?11.88(b):11.1F("3c")||11.42(11.2F),11.1F("4E")&&11.1e(b),11.5r(),11.19.5u&&d.44(a.1v(12(){11.5m()},11)),"12"==a.1p(11.19.43)&&(!11.19.2c||11.19.2c&&11.19.2c.3W&&11.1F("3c"))&&11.19.43(11.38.4y,11.1g),1S.2H.48&&(11.19.4w||11.19.3X)&&(11.5q(11.19.4w),a(11.1j).1Y("89").8a("6u")),a(11.1j).1W()}}12 J(){11.2i("1W"),11.1F("1L")&&(11.27("1L",!1),1S.2H.48&&(11.19.4w||11.19.3X)?(11.5q(11.19.3X),a(11.1j).8a("89").1Y("6u"),11.41("4v",a.1v(11.6x,11),11.19.3X)):11.6x(),11.1o.2l&&(11.1o.2l.6i(),11.1o.2l=1r,11.27("2l",!1)))}12 K(){11.1F("1P")&&(a(11.1j).1q({15:"-5p",17:"-5p"}),B.7B(),"12"!=a.1p(11.19.8b)||11.1M||11.19.8b(11.38.4y,11.1g))}12 L(){11.2i("1W"),!11.5o("1I")&&11.1F("1L")&&11.41("1I",a.1v(12(){11.2i("1I"),11.2i("4v"),11.1I()},11),11.19.9O||1)}12 M(a){11[11.1L()?"1I":"1W"](a)}12 N(){1a 11.1F("1L")}12 O(){11.27("4D",!0),11.1F("1L")&&11.5r(),11.19.5u&&11.2i("6y")}12 P(){11.27("4D",!1),11.19.5u&&11.41("6y",a.1v(12(){11.2i("6y"),11.1F("4D")||11.1I()},11),11.19.5u)}13 D=12(b){1f(11.1L()){13 c;1f("2M"==11.19.1C){13 e=B.2r.6n(b),f=B.2r.4S;1f(e)f.x||f.y?(11.1o.2v={x:f.x,y:f.y},c=1r):c=b;1G{1f(f.x||f.y)11.1o.2v={x:f.x,y:f.y};1G 1f(!11.1o.2v){13 g=B.2r.7N(11.1g);11.1o.2v={x:g.15,y:g.17}}c=1r}}1G c=11.1C;1f(B.2r.4P(11,11.19.1u.1D,c,11.19.1u.1C),b&&B.2r.6n(b)){13 h={14:a(11.1j).7K(),18:a(11.1j).7L()},i=d.5F(b),g=d.1g.4L(11.1j);i.x>=g.15&&i.x<=g.15+h.14&&i.y>=g.17&&i.y<=g.17+h.18&&d.44(a.1v(12(){11.2i("1I")},11))}}};1a{1P:t,6E:r,86:s,80:m,82:n,1W:I,1I:J,6x:K,33:M,1L:N,7Y:H,6s:L,5q:G,27:j,1F:l,5m:O,6r:P,5o:c,41:b,2i:e,84:f,2D:g,83:h,5e:o,4n:p,9P:q,2P:F,42:y,88:z,6w:A,6o:C,1e:D,5r:E,6v:w,1z:x}}()),1S.3p()})(46);', 62, 610, "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this|function|var|width|left||top|height|options|return|Math|dimensions|lineTo|position|if|element|case|border|container|extend|stem|background|radius|_cache|type|css|null|shadow|get|hook|proxy|each|document|closeButton|remove|offset|break|target|tooltip|ceil|getState|else|bubble|hide|horizontal|opacity|visible|spinner|window|right|build|color|bottom|Tipped|switch|max|uid|show|data|addClass|append|arguments|skin|createElement|round||hideOn|arc|setState|for|_hookPosition|length|vertical|ajax||getTooltip|beginPath|closePath|div|clearTimer|isElement|zIndex|xhr|padding|push|getOrderLayout|tipped|states|Position|string|middle|size|event|px|_globalAlpha|number|box|tooltips|click|Skins|setEvent|180|content|contentDimensions|support|getOrientation|anchor|showOn|globalAlpha|mouse|split|parseInt|refresh|fillStyle|hex2fill|center|iframeShim|closeButtonShadow|abs|bubbleCanvas|blurs|containment|PI|add|blur|scripts|toggle|fill|isCenter|cleanup|cornerOffset|contentElement|inlineContent|_stemCorrection|timers|updated|body|match|canvas|attr|test|maxWidth|shadows|getSkin|_adjustment|IE|indexOf|getContext|init|new|devicePixelRatio|moveTo|void|charAt|toLowerCase|diameter|hookPosition|layout|stemLayout|sides|_corrections|t_Tooltip|constructor|preloading_images|prototype|delete|touch|getVisible|resize|x1|y1|x2|y2|topleft|topright|righttop|lefttop|math|getLayout|bind|defaultSkin|cache|fadeOut|contained|overlap|inlineMarker|setTimer|update|onShow|defer||jQuery|url|cssTransitions|items|createFillStyle|topmiddle|rightmiddle|rightbottom|bottomright|bottommiddle|bottomleft|leftbottom|leftmiddle|regex|getBorderDimensions|correction|src|setHookPosition|mouseenter|getStemLayout|transition|Stem|closeButtonCanvas|boolean|sideOffset|fadeTransition|fadeIn|afterUpdate|firstChild|callback|cos|000|startingZIndex|active|skinned|self|delay|cumulativeScrollOffset|scrollTop|scrollLeft|parentNode|cumulativeOffset|Gecko|Chrome|responseText|set|create|hideAll|mouseBuffer|viewport|min|G_vmlCanvasManager|getCenterBorderDimensions|substring|skins|skinElement||prepare|order|UpdateQueue|mouseleave||rotate|borderRadius|topcenter|rightcenter|bottomcenter|leftcenter|corner|corrections|setHookPositionAndStemCorrection|closest|_resizeTimer|_getTooltip|_remove|selector|mousemove|_updateTooltip|setActive|touchmove|getTimer|10000px|setFadeDuration|raise|ms|contentFunction|hideAfter|console|in|Object|title|tipped_restore_title|events|toggles|fnCallContent|call|apply|pointer|pageX|isAttached|RegExp|parseFloat|Opera|opera|WebKit|required|available|findElement|setDefaultSkin|setStartingZIndex|isVisibleByElement|undefined|clearAjaxCache|innerWidth|innerHeight|getSide|getDimensions|getBubbleLayout|nullifyCornerOffset|replace|100|defaultCloseButton|hoverCloseButton|floor|prepend|find|auto|getMeasureElementDimensions|drawCloseButtonState|default|hover|_drawBackgroundPath|before|dark|getByTooltipElement|clearTimeout|abort|reset|CloseButtons|getInversedPosition|Spinners|isPointerEvent|insertSpinner|play|onload|setIdle|hideDelayed|inArray|t_hidden|_restoreInlineContent|afterAjaxUpdate|_hide|idle|warn|_stemPosition|createOptions|getAttribute|getElementById|_preBuild|Array|concat|pageY|version|AppleWebKit|MobileSafari|check|pow|Za|checked|notified|toUpperCase|param|clear|try|DocumentTouch|catch|ready|startDelegating|removeDetached|drawRoundedRectangle|fillRect|isArray|Gradient|addColorStops|positions|toOrientation|side|toDimension|isCorner|atan|red|green|blue|360|drawBubble|drawCloseButton|createHookCache|t_ContentContainer|first|25000px|setStemCorrection|setAdjustment|t_Close|closeButtonShift|closeButtonMouseover|closeButtonMouseout|CloseButton|stemOffset|backgroundRadius|_drawBorderPath|setGlobalAlpha|drawBackground|getBlurOpacity|documentElement|onWindowResize|is|getHighestTooltip|resetZ|base|getTooltipPositionFromTarget|adjustOffsetBasedOnHooks|closeButtonSkin|flip|hideOnClickOutside|typeof|adjustment|outerWidth|outerHeight|_|getAbsoluteOffset|t_Content|inline|isSpinner|tipped_restore_inline_display|display|img|html|eventName|handler|unbind|showDelayed|showDelay|createPreBuildObservers|t_hideOnClickOutside|createPostBuildObservers|clearEvents|clearTimers|removeData|_buildSkin|dataType|ajaxUpdate|t_visible|removeClass|onHide|log|sqrt|object|setAttribute|slice|wrap|nodeType|setTimeout|do|while|exec|attachEvent|MSIE|KHTML|rv|Apple|Mobile|Safari|navigator|userAgent|fn|jquery|z_|z0|requires|_t_uid_|ontouchstart|instanceof|WebKitTransitionEvent|TransitionEvent|OTransitionEvent|createEvent|scale|initElement|drawPixelArray|createLinearGradient|addColorStop|spacing|rgba|join|fff|255|hue|saturation|brightness|0123456789abcdef|hex2rgb|getSaturatedBW|init_|t_Bubble||iframe|t_iframeShim|frameBorder|javascript|15000px|t_CloseButtonShift|lineCap|t_CloseState|translate|stemCorrection|270|lineWidth|sin|setOpacity|getCenterBorderDimensions2|acos|t_Shadow|t_ShadowBubble|t_CloseButtonShadow|999999|touchstart|delegate|close|preventDefault|stopPropagation|200|getBySelector|outside|move|530|t_UpdateQueue|t_clearfix|t_Content_|filter|8e3|750|Image|fixed|t_Skin|t_Tooltip_|load|success|status|style|MozTransitionDuration|webkitTransitionDuration|OTransitionDuration|transitionDuration|hideOthers|hideDelay|resetHookPosition".split("|"), 0, {}));
(function($) {
    $.fn.popupWindow = function(instanceSettings) {
        return this.each(function() {
            $(this).click(function() {
                $.fn.popupWindow.defaultSettings = {
                    centerBrowser: 0,
                    centerScreen: 0,
                    height: 500,
                    left: 0,
                    location: 0,
                    menubar: 0,
                    resizable: 0,
                    scrollbars: 0,
                    status: 0,
                    width: 500,
                    windowName: null,
                    windowURL: null,
                    top: 0,
                    toolbar: 0
                };
                settings = $.extend({}, $.fn.popupWindow.defaultSettings, instanceSettings || {});
                var windowFeatures = "height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars + ",status=" + settings.status + ",resizable=" + settings.resizable + ",location=" + settings.location + ",menuBar=" + settings.menubar;
                settings.windowName = this.name || settings.windowName;
                settings.windowURL = this.href || settings.windowURL;
                var centeredY, centeredX;
                if (settings.centerBrowser) {
                    if ($.browser.msie) {
                        centeredY = window.screenTop - 120 + ((document.documentElement.clientHeight + 120) / 2 - settings.height / 2);
                        centeredX = window.screenLeft + ((document.body.offsetWidth + 20) / 2 - settings.width / 2)
                    } else {
                        centeredY = window.screenY + (window.outerHeight / 2 - settings.height / 2);
                        centeredX = window.screenX + (window.outerWidth / 2 - settings.width / 2)
                    }
                    window.open(settings.windowURL, settings.windowName, windowFeatures + ",left=" + centeredX + ",top=" + centeredY).focus()
                } else if (settings.centerScreen) {
                    centeredY = (screen.height - settings.height) / 2;
                    centeredX = (screen.width - settings.width) / 2;
                    window.open(settings.windowURL, settings.windowName, windowFeatures + ",left=" + centeredX + ",top=" + centeredY).focus()
                } else {
                    window.open(settings.windowURL, settings.windowName, windowFeatures + ",left=" + settings.left + ",top=" + settings.top).focus()
                }
                return false
            })
        })
    }
})(jQuery);
(function($) {
    $.fn.UItoTop = function(options) {
        var defaults = {
            text: "To Top",
            min: 625,
            inDelay: 600,
            outDelay: 400,
            containerID: "toTop",
            containerHoverID: "toTopHover",
            scrollSpeed: 1200,
            easingType: "linear"
        };
        var settings = $.extend(defaults, options);
        var containerIDhash = "#" + settings.containerID;
        var containerHoverIDHash = "#" + settings.containerHoverID;
        $("body").append('<a class="hide-on-mobile" href="#" id="' + settings.containerID + '">' + settings.text + "</a>");
        $(containerIDhash).hide().click(function() {
            _gaq.push(["_trackEvent", "Scroll To Top", "Click", "Scroll To Top"]);
            $("html, body").animate({
                scrollTop: 0
            }, settings.scrollSpeed, settings.easingType);
            $("#" + settings.containerHoverID, this).stop().animate({
                opacity: 0
            }, settings.inDelay, settings.easingType);
            return false
        }).prepend('<span id="' + settings.containerHoverID + '"></span>').hover(function() {
            $(containerHoverIDHash, this).stop().animate({
                opacity: 1
            }, 600, "linear")
        }, function() {
            $(containerHoverIDHash, this).stop().animate({
                opacity: 0
            }, 700, "linear")
        });
        $(window).scroll(function() {
            var sd = $(window).scrollTop();
            if (typeof document.body.style.maxHeight === "undefined") {
                $(containerIDhash).css({
                    position: "absolute",
                    top: $(window).scrollTop() + $(window).height() - 50
                })
            }
            if (sd > settings.min) $(containerIDhash).fadeIn(settings.inDelay);
            else $(containerIDhash).fadeOut(settings.Outdelay)
        })
    }
})(jQuery);
eval(function(m, a, g, i, c, k) {
    c = function(e) {
        return (e < a ? "" : c(parseInt(e / a))) + ((e = e % a) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
    };
    if (!"".replace(/^/, String)) {
        while (g--) {
            k[c(g)] = i[g] || c(g)
        }
        i = [function(e) {
            return k[e]
        }];
        c = function() {
            return "\\w+"
        };
        g = 1
    }
    while (g--) {
        if (i[g]) {
            m = m.replace(new RegExp("\\b" + c(g) + "\\b", "g"), i[g])
        }
    }
    return m
}('(P(){if(1d.6N){Q}T b={3A:"ed.7.4",e6:0,67:{},$9Y:P(d){Q(d.$4B||(d.$4B=++a.e6))},93:P(d){Q(a.67[d]||(a.67[d]={}))},$F:P(){},$X:P(){Q X},2N:P(d){Q(1F!=d)},eF:P(d){Q!!(d)},2D:P(d){if(!a.2N(d)){Q X}if(d.$4b){Q d.$4b}if(!!d.5i){if(1==d.5i){Q"8Y"}if(3==d.5i){Q"dE"}}if(d.1B&&d.8M){Q"eG"}if(d.1B&&d.9t){Q"2c"}if((d 4z 1d.en||d 4z 1d.ab)&&d.4I===a.4v){Q"7m"}if(d 4z 1d.5l){Q"5Q"}if(d 4z 1d.ab){Q"P"}if(d 4z 1d.8q){Q"5C"}if(a.18.2A){if(a.2N(d.cH)){Q"3f"}}1f{if(d===1d.3f||d.4I==1d.9P||d.4I==1d.f1||d.4I==1d.ez||d.4I==1d.eI||d.4I==1d.eL){Q"3f"}}if(d 4z 1d.dP){Q"dC"}if(d 4z 1d.53){Q"eM"}if(d===1d){Q"1d"}if(d===1l){Q"1l"}Q 4f(d)},1U:P(j,h){if(!(j 4z 1d.5l)){j=[j]}1I(T g=0,e=j.1B;g<e;g++){if(!a.2N(j)){63}1I(T f in(h||{})){31{j[g][f]=h[f]}3h(d){}}}Q j[0]},8Z:P(h,g){if(!(h 4z 1d.5l)){h=[h]}1I(T f=0,d=h.1B;f<d;f++){if(!a.2N(h[f])){63}if(!h[f].2S){63}1I(T e in(g||{})){if(!h[f].2S[e]){h[f].2S[e]=g[e]}}}Q h[0]},dM:P(f,e){if(!a.2N(f)){Q f}1I(T d in(e||{})){if(!f[d]){f[d]=e[d]}}Q f},$31:P(){1I(T f=0,d=2c.1B;f<d;f++){31{Q 2c[f]()}3h(g){}}Q 19},$A:P(f){if(!a.2N(f)){Q $V([])}if(f.dQ){Q $V(f.dQ())}if(f.8M){T e=f.1B||0,d=1r 5l(e);3P(e--){d[e]=f[e]}Q $V(d)}Q $V(5l.2S.eV.1W(f))},2X:P(){Q 1r dP().f6()},3M:P(h){T f;2m(a.2D(h)){1m"a2":f={};1I(T g in h){f[g]=a.3M(h[g])}1n;1m"5Q":f=[];1I(T e=0,d=h.1B;e<d;e++){f[e]=a.3M(h[e])}1n;2j:Q h}Q a.$(f)},$:P(e){if(!a.2N(e)){Q 19}if(e.$a9){Q e}2m(a.2D(e)){1m"5Q":e=a.dM(e,a.1U(a.5l,{$a9:a.$F}));e.36=e.3S;e.4F=a.5l.4F;Q e;1n;1m"5C":T d=1l.d3(e);if(a.2N(d)){Q a.$(d)}Q 19;1n;1m"1d":1m"1l":a.$9Y(e);e=a.1U(e,a.6l);1n;1m"8Y":a.$9Y(e);e=a.1U(e,a.3t);1n;1m"3f":e=a.1U(e,a.9P);1n;1m"dE":Q e;1n;1m"P":1m"5Q":1m"dC":2j:1n}Q a.1U(e,{$a9:a.$F})},$1r:P(d,f,e){Q $V(a.2J.48(d)).cM(f||{}).1e(e||{})},eD:P(e){if(1l.9w&&1l.9w.1B){1l.9w[0].as(e,0)}1f{T d=$V(1l.48("1K"));d.2Z(e);1l.6I("8J")[0].2s(d)}}};T a=b;1d.6N=b;1d.$V=b.$;a.5l={$4b:"5Q",4C:P(g,h){T d=N.1B;1I(T e=N.1B,f=(h<0)?1s.3N(0,e+h):h||0;f<e;f++){if(N[f]===g){Q f}}Q-1},4F:P(d,e){Q N.4C(d,e)!=-1},3S:P(d,g){1I(T f=0,e=N.1B;f<e;f++){if(f in N){d.1W(g,N[f],f,N)}}},2W:P(d,j){T h=[];1I(T g=0,e=N.1B;g<e;g++){if(g in N){T f=N[g];if(d.1W(j,N[g],g,N)){h.4g(f)}}}Q h},ee:P(d,h){T g=[];1I(T f=0,e=N.1B;f<e;f++){if(f in N){g[f]=d.1W(h,N[f],f,N)}}Q g}};a.8Z(8q,{$4b:"5C",4p:P(){Q N.2B(/^\\s+|\\s+$/g,"")},eq:P(d,e){Q(e||X)?(N.5Y()===d.5Y()):(N.2Y().5Y()===d.2Y().5Y())},3e:P(){Q N.2B(/-\\D/g,P(d){Q d.dJ(1).eB()})},6L:P(){Q N.2B(/[A-Z]/g,P(d){Q("-"+d.dJ(0).2Y())})},1N:P(d){Q 2d(N,d||10)},d7:P(){Q 44(N)},6t:P(){Q!N.2B(/1a/i,"").4p()},3i:P(e,d){d=d||"";Q(d+N+d).4C(d+e+d)>-1}});b.8Z(ab,{$4b:"P",1o:P(){T e=a.$A(2c),d=N,f=e.7u();Q P(){Q d.52(f||19,e.dG(a.$A(2c)))}},2k:P(){T e=a.$A(2c),d=N,f=e.7u();Q P(g){Q d.52(f||19,$V([g||1d.3f]).dG(e))}},2v:P(){T e=a.$A(2c),d=N,f=e.7u();Q 1d.5I(P(){Q d.52(d,e)},f||0)},dh:P(){T e=a.$A(2c),d=N;Q P(){Q d.2v.52(d,e)}},co:P(){T e=a.$A(2c),d=N,f=e.7u();Q 1d.g0(P(){Q d.52(d,e)},f||0)}});T c=a5.g3.2Y();a.18={9F:{bA:!!(1l.g4),f7:!!(1d.fR),aj:!!(1l.fP)},3Q:P(){Q"fT"in 1d||(1d.dO&&1l 4z dO)}(),g8:c.3s(/bV|gm|gl|go\\/|ge|gf|gi|fl|fk|fj|fn|ip(bT|bW|ad)|fh|fa|f8 |fc|fd|ff|fe|c2 m(fs|in)i|ft( fH)?|bY|p(fK|fx)\\/|fz|fY|fA|fB|fC|fy\\.(18|5O)|fu|fv|fw (ce|bY)|fD|fE/)?1a:X,4J:(1d.c2)?"7v":!!(1d.fL)?"2A":(1F!=1l.fM||19!=1d.fJ)?"bj":(19!=1d.fI||!a5.fF)?"3m":"fG",3A:"",45:0,8v:c.3s(/ip(?:ad|bW|bT)/)?"c7":(c.3s(/(?:fg|bV)/)||a5.8v.3s(/dN|5j|f9/i)||["fb"])[0].2Y(),3I:1l.9I&&"cc"==1l.9I.2Y(),4q:P(){Q(1l.9I&&"cc"==1l.9I.2Y())?1l.2i:1l.9k},5R:1d.5R||1d.fi||1d.fp||1d.fr||1d.fo||1F,8f:1d.8f||1d.ci||1d.ci||1d.fm||1d.fN||1d.fO||1F,1L:X,3C:P(){if(a.18.1L){Q}a.18.1L=1a;a.2i=$V(1l.2i);a.5j=$V(1d);(P(){a.18.6S={4k:X,3g:""};if(4f 1l.2i.1K.cX!=="1F"){a.18.6S.4k=1a}1f{T f="bv bC O 8I bu".4a(" ");1I(T e=0,d=f.1B;e<d;e++){a.18.6S.3g=f[e];if(4f 1l.2i.1K[a.18.6S.3g+"gg"]!=="1F"){a.18.6S.4k=1a;1n}}}})();(P(){a.18.7g={4k:X,3g:""};if(4f 1l.2i.1K.gh!=="1F"){a.18.7g.4k=1a}1f{T f="bv bC O 8I bu".4a(" ");1I(T e=0,d=f.1B;e<d;e++){a.18.7g.3g=f[e];if(4f 1l.2i.1K[a.18.7g.3g+"ga"]!=="1F"){a.18.7g.4k=1a;1n}}}})();$V(1l).cE("5h")}};(P(){P d(){Q!!(2c.9t.ae)}a.18.3A=("7v"==a.18.4J)?!!(1l.8J)?gb:!!(1d.gc)?gd:!!(1d.bD)?6V:(a.18.9F.aj)?gj:((d())?gk:((1l.7h)?gq:4R)):("2A"==a.18.4J)?!!(1d.gr||1d.gs)?bE:!!(1d.bq&&1d.gp)?6:((1d.bq)?5:4):("3m"==a.18.4J)?((a.18.9F.bA)?((a.18.9F.aj)?gn:cI):g9):("bj"==a.18.4J)?!!(1l.8J)?4R:!!1l.6r?fV:!!(1d.bD)?fW:((1l.7h)?fX:fU):"";a.18[a.18.4J]=a.18[a.18.4J+a.18.3A]=1a;if(1d.a3){a.18.a3=1a}a.18.45=(!a.18.2A)?0:(1l.bO)?1l.bO:P(){T e=0;if(a.18.3I){Q 5}2m(a.18.3A){1m 4:e=6;1n;1m 5:e=7;1n;1m 6:e=8;1n;1m bE:e=9;1n}Q e}()})();(P(){a.18.3k={4k:X,91:P(){Q X},9V:P(){},c8:P(){},bG:"",bH:"",3g:""};if(4f 1l.cj!="1F"){a.18.3k.4k=1a}1f{T f="3m cQ o 8I fQ".4a(" ");1I(T e=0,d=f.1B;e<d;e++){a.18.3k.3g=f[e];if(4f 1l[a.18.3k.3g+"cV"]!="1F"){a.18.3k.4k=1a;1n}}}if(a.18.3k.4k){a.18.3k.bG=a.18.3k.3g+"fS";a.18.3k.bH=a.18.3k.3g+"fZ";a.18.3k.91=P(){2m(N.3g){1m"":Q 1l.3k;1m"3m":Q 1l.g5;2j:Q 1l[N.3g+"g6"]}};a.18.3k.9V=P(g){Q(N.3g==="")?g.cy():g[N.3g+"g7"]()};a.18.3k.c8=P(g){Q(N.3g==="")?1l.cj():1l[N.3g+"cV"]()}}})();a.3t={5o:P(d){Q N.2V.3i(d," ")},2r:P(d){if(d&&!N.5o(d)){N.2V+=(N.2V?" ":"")+d}Q N},4U:P(d){d=d||".*";N.2V=N.2V.2B(1r 53("(^|\\\\s)"+d+"(?:\\\\s|$)"),"$1").4p();Q N},g1:P(d){Q N.5o(d)?N.4U(d):N.2r(d)},1P:P(f){f=(f=="5u"&&N.7H)?"al":f.3e();T d=19,e=19;if(N.7H){d=N.7H[f]}1f{if(1l.ak&&1l.ak.cW){e=1l.ak.cW(N,19);d=e?e.g2([f.6L()]):19}}if(!d){d=N.1K[f]}if("1z"==f){Q a.2N(d)?44(d):1}if(/^(2l(8W|8X|9a|98)bN)|((2p|2a)(8W|8X|9a|98))$/.1R(f)){d=2d(d)?d:"1T"}Q("1A"==d?19:d)},1D:P(f,d){31{if("1z"==f){N.2C(d);Q N}1f{if("5u"==f){N.1K[("1F"===4f(N.1K.al))?"gu":"al"]=d;Q N}1f{if(a.18.6S&&/cX/.1R(f)){}}}N.1K[f.3e()]=d+(("68"==a.2D(d)&&!$V(["2w","1p"]).4F(f.3e()))?"1x":"")}3h(g){}Q N},1e:P(e){1I(T d in e){N.1D(d,e[d])}Q N},4H:P(){T d={};a.$A(2c).36(P(e){d[e]=N.1P(e)},N);Q d},2C:P(h,e){e=e||X;h=44(h);if(e){if(h==0){if("1O"!=N.1K.2H){N.1K.2H="1O"}}1f{if("4K"!=N.1K.2H){N.1K.2H="4K"}}}if(a.18.2A){if(!N.7H||!N.7H.f3){N.1K.1p=1}31{T g=N.ey.8M("cS.cR.cN");g.91=(1!=h);g.1z=h*1M}3h(d){N.1K.2W+=(1==h)?"":"ex:cS.cR.cN(91=1a,1z="+h*1M+")"}}N.1K.1z=h;Q N},cM:P(d){1I(T e in d){N.eu(e,""+d[e])}Q N},1S:P(){Q N.1e({2e:"2U",2H:"1O"})},29:P(){Q N.1e({2e:"2n",2H:"4K"})},1G:P(){Q{S:N.d5,U:N.aQ}},7r:P(){Q{13:N.4Y,Y:N.5K}},es:P(){T d=N,e={13:0,Y:0};do{e.Y+=d.5K||0;e.13+=d.4Y||0;d=d.1V}3P(d);Q e},3d:P(){if(a.2N(1l.9k.cZ)){T d=N.cZ(),f=$V(1l).7r(),h=a.18.4q();Q{13:d.13+f.y-h.et,Y:d.Y+f.x-h.eH}}T g=N,e=t=0;do{e+=g.eY||0;t+=g.eW||0;g=g.f0}3P(g&&!(/^(?:2i|f2)$/i).1R(g.3W));Q{13:t,Y:e}},3U:P(){T e=N.3d();T d=N.1G();Q{13:e.13,1j:e.13+d.U,Y:e.Y,1k:e.Y+d.S}},7a:P(f){31{N.8l=f}3h(d){N.eU=f}Q N},3O:P(){Q(N.1V)?N.1V.4c(N):N},5X:P(){a.$A(N.eT).36(P(d){if(3==d.5i||8==d.5i){Q}$V(d).5X()});N.3O();N.bo();if(N.$4B){a.67[N.$4B]=19;3x a.67[N.$4B]}Q 19},4L:P(g,e){e=e||"1j";T d=N.2M;("13"==e&&d)?N.9C(g,d):N.2s(g);Q N},22:P(f,e){T d=$V(f).4L(N,e);Q N},d1:P(d){N.4L(d.1V.8y(N,d));Q N},5U:P(d){if("8Y"!==a.2D("5C"==a.2D(d)?d=1l.d3(d):d)){Q X}Q(N==d)?X:(N.4F&&!(a.18.cq))?(N.4F(d)):(N.ct)?!!(N.ct(d)&16):a.$A(N.2z(d.3W)).4F(d)}};a.3t.6A=a.3t.1P;a.3t.eO=a.3t.1e;if(!1d.3t){1d.3t=a.$F;if(a.18.4J.3m){1d.1l.48("eR")}1d.3t.2S=(a.18.4J.3m)?1d["[[eZ.2S]]"]:{}}a.8Z(1d.3t,{$4b:"8Y"});a.6l={1G:P(){if(a.18.eQ||a.18.cq){Q{S:1d.9x,U:1d.9y}}Q{S:a.18.4q().f5,U:a.18.4q().ew}},7r:P(){Q{x:1d.eE||a.18.4q().5K,y:1d.em||a.18.4q().4Y}},be:P(){T d=N.1G();Q{S:1s.3N(a.18.4q().f4,d.S),U:1s.3N(a.18.4q().eK,d.U)}}};a.1U(1l,{$4b:"1l"});a.1U(1d,{$4b:"1d"});a.1U([a.3t,a.6l],{1c:P(g,e){T d=a.93(N.$4B),f=d[g];if(1F!=e&&1F==f){f=d[g]=e}Q(a.2N(f)?f:19)},1E:P(f,e){T d=a.93(N.$4B);d[f]=e;Q N},8i:P(e){T d=a.93(N.$4B);3x d[e];Q N}});if(!(1d.a1&&1d.a1.2S&&1d.a1.2S.7h)){a.1U([a.3t,a.6l],{7h:P(d){Q a.$A(N.6I("*")).2W(P(g){31{Q(1==g.5i&&g.2V.3i(d," "))}3h(f){}})}})}a.1U([a.3t,a.6l],{eP:P(){Q N.7h(2c[0])},2z:P(){Q N.6I(2c[0])}});if(a.18.3k.4k){a.3t.cy=P(){a.18.3k.9V(N)}}a.9P={$4b:"3f",1t:P(){if(N.cG){N.cG()}1f{N.cH=1a}if(N.9X){N.9X()}1f{N.eX=X}Q N},4M:P(){T e,d;e=((/5H/i).1R(N.2t))?N.4n[0]:N;Q(!a.2N(e))?{x:0,y:0}:{x:e.eC||e.6d+a.18.4q().5K,y:e.ep||e.5L+a.18.4q().4Y}},5n:P(){T d=N.er||N.eo;3P(d&&3==d.5i){d=d.1V}Q d},4D:P(){T e=19;2m(N.2t){1m"21":e=N.cA||N.ek;1n;1m"2O":e=N.cA||N.eA;1n;2j:Q e}31{3P(e&&3==e.5i){e=e.1V}}3h(d){e=19}Q e},57:P(){if(!N.cC&&N.8K!==1F){Q(N.8K&1?1:(N.8K&2?3:(N.8K&4?2:0)))}Q N.cC}};a.az="cD";a.a4="fq";a.9L="";if(!1l.cD){a.az="gB";a.a4="ib";a.9L="5g"}a.1U([a.3t,a.6l],{1w:P(g,f){T i=("5h"==g)?X:1a,e=N.1c("7E",{});e[g]=e[g]||{};if(e[g].62(f.$7k)){Q N}if(!f.$7k){f.$7k=1s.7X(1s.7M()*a.2X())}T d=N,h=P(j){Q f.1W(d)};if("5h"==g){if(a.18.1L){f.1W(N);Q N}}if(i){h=P(j){j=a.1U(j||1d.e,{$4b:"3f"});Q f.1W(d,$V(j))};N[a.az](a.9L+g,h,X)}e[g][f.$7k]=h;Q N},2o:P(g){T i=("5h"==g)?X:1a,e=N.1c("7E");if(!e||!e[g]){Q N}T h=e[g],f=2c[1]||19;if(g&&!f){1I(T d in h){if(!h.62(d)){63}N.2o(g,d)}Q N}f=("P"==a.2D(f))?f.$7k:f;if(!h.62(f)){Q N}if("5h"==g){i=X}if(i){N[a.a4](a.9L+g,h[f],X)}3x h[f];Q N},cE:P(h,f){T m=("5h"==h)?X:1a,l=N,j;if(!m){T g=N.1c("7E");if(!g||!g[h]){Q N}T i=g[h];1I(T d in i){if(!i.62(d)){63}i[d].1W(N)}Q N}if(l===1l&&1l.9M&&!l.cF){l=1l.9k}if(1l.9M){j=1l.9M(h);j.il(f,1a,1a)}1f{j=1l.im();j.i7=h}if(1l.9M){l.cF(j)}1f{l.hQ("5g"+f,j)}Q j},bo:P(){T d=N.1c("7E");if(!d){Q N}1I(T e in d){N.2o(e)}N.8i("7E");Q N}});(P(){if("6j"===1l.6r){Q a.18.3C.2v(1)}if(a.18.3m&&a.18.3A<cI){(P(){($V(["hP","6j"]).4F(1l.6r))?a.18.3C():2c.9t.2v(50)})()}1f{if(a.18.2A&&a.18.45<9&&1d==13){(P(){(a.$31(P(){a.18.4q().i0("Y");Q 1a}))?a.18.3C():2c.9t.2v(50)})()}1f{$V(1l).1w("hW",a.18.3C);$V(1d).1w("2I",a.18.3C)}}})();a.4v=P(){T h=19,e=a.$A(2c);if("7m"==a.2D(e[0])){h=e.7u()}T d=P(){1I(T l in N){N[l]=a.3M(N[l])}if(N.4I.$3z){N.$3z={};T o=N.4I.$3z;1I(T n in o){T j=o[n];2m(a.2D(j)){1m"P":N.$3z[n]=a.4v.cx(N,j);1n;1m"a2":N.$3z[n]=a.3M(j);1n;1m"5Q":N.$3z[n]=a.3M(j);1n}}}T i=(N.49)?N.49.52(N,2c):N;3x N.ae;Q i};if(!d.2S.49){d.2S.49=a.$F}if(h){T g=P(){};g.2S=h.2S;d.2S=1r g;d.$3z={};1I(T f in h.2S){d.$3z[f]=h.2S[f]}}1f{d.$3z=19}d.4I=a.4v;d.2S.4I=d;a.1U(d.2S,e[0]);a.1U(d,{$4b:"7m"});Q d};b.4v.cx=P(d,e){Q P(){T g=N.ae;T f=e.52(d,2c);Q f}};a.5j=$V(1d);a.2J=$V(1l)})();(P(b){if(!b){7b"9z 9A 9E";Q}if(b.1X){Q}T a=b.$;b.1X=1r b.4v({R:{4t:60,35:8c,4w:P(c){Q-(1s.9N(1s.9T*c)-1)/2},6W:b.$F,3Y:b.$F,7L:b.$F,b6:b.$F,7S:X,cp:1a},3X:19,49:P(d,c){N.el=a(d);N.R=b.1U(N.R,c);N.55=X},1y:P(c){N.3X=c;N.1H=0;N.i2=0;N.an=b.2X();N.cn=N.an+N.R.35;N.9Q=N.ah.1o(N);N.R.6W.1W();if(!N.R.7S&&b.18.5R){N.55=b.18.5R.1W(1d,N.9Q)}1f{N.55=N.ah.1o(N).co(1s.4Z(aZ/N.R.4t))}Q N},aa:P(){if(N.55){if(!N.R.7S&&b.18.5R&&b.18.8f){b.18.8f.1W(1d,N.55)}1f{hO(N.55)}N.55=X}},1t:P(c){c=b.2N(c)?c:X;N.aa();if(c){N.6m(1);N.R.3Y.2v(10)}Q N},81:P(e,d,c){Q(d-e)*c+e},ah:P(){T d=b.2X();if(d>=N.cn){N.aa();N.6m(1);N.R.3Y.2v(10);Q N}T c=N.R.4w((d-N.an)/N.R.35);if(!N.R.7S&&b.18.5R){N.55=b.18.5R.1W(1d,N.9Q)}N.6m(c)},6m:P(c){T d={};1I(T e in N.3X){if("1z"===e){d[e]=1s.4Z(N.81(N.3X[e][0],N.3X[e][1],c)*1M)/1M}1f{d[e]=N.81(N.3X[e][0],N.3X[e][1],c);if(N.R.cp){d[e]=1s.4Z(d[e])}}}N.R.7L(d);N.7s(d);N.R.b6(d)},7s:P(c){Q N.el.1e(c)}});b.1X.3l={4y:P(c){Q c},cw:P(c){Q-(1s.9N(1s.9T*c)-1)/2},is:P(c){Q 1-b.1X.3l.cw(1-c)},cv:P(c){Q 1s.3B(2,8*(c-1))},it:P(c){Q 1-b.1X.3l.cv(1-c)},cu:P(c){Q 1s.3B(c,2)},i8:P(c){Q 1-b.1X.3l.cu(1-c)},cs:P(c){Q 1s.3B(c,3)},ia:P(c){Q 1-b.1X.3l.cs(1-c)},cK:P(d,c){c=c||1.ii;Q 1s.3B(d,2)*((c+1)*d-c)},ic:P(d,c){Q 1-b.1X.3l.cK(1-d)},d2:P(d,c){c=c||[];Q 1s.3B(2,10*--d)*1s.9N(20*d*1s.9T*(c[0]||1)/3)},gv:P(d,c){Q 1-b.1X.3l.d2(1-d,c)},d0:P(e){1I(T d=0,c=1;1;d+=c,c/=2){if(e>=(7-4*d)/11){Q c*c-1s.3B((11-6*d-11*e)/4,2)}}},hZ:P(c){Q 1-b.1X.3l.d0(1-c)},2U:P(c){Q 0}}})(6N);(P(a){if(!a){7b"9z 9A 9E";Q}if(!a.1X){7b"9z.1X 9A 9E";Q}if(a.1X.aN){Q}T b=a.$;a.1X.aN=1r a.4v(a.1X,{R:{77:"7U"},49:P(d,c){N.el=$V(d);N.R=a.1U(N.$3z.R,N.R);N.$3z.49(d,c);N.4W=N.el.1c("5N:4W");N.4W=N.4W||a.$1r("3j").1e(a.1U(N.el.4H("2a-13","2a-Y","2a-1k","2a-1j","1u","13","5u"),{2u:"1O"})).d1(N.el);N.el.1E("5N:4W",N.4W).1e({2a:0})},7U:P(){N.2a="2a-13";N.54="U";N.6F=N.el.aQ},a0:P(c){N.2a="2a-"+(c||"Y");N.54="S";N.6F=N.el.d5},1k:P(){N.a0()},Y:P(){N.a0("1k")},1y:P(e,h){N[h||N.R.77]();T g=N.el.1P(N.2a).1N(),f=N.4W.1P(N.54).1N(),c={},i={},d;c[N.2a]=[g,0],c[N.54]=[0,N.6F],i[N.2a]=[g,-N.6F],i[N.54]=[f,0];2m(e){1m"in":d=c;1n;1m"ao":d=i;1n;1m"96":d=(0==f)?c:i;1n}N.$3z.1y(d);Q N},7s:P(c){N.el.1D(N.2a,c[N.2a]);N.4W.1D(N.54,c[N.54]);Q N},hX:P(c){Q N.1y("in",c)},hY:P(c){Q N.1y("ao",c)},1S:P(d){N[d||N.R.77]();T c={};c[N.54]=0,c[N.2a]=-N.6F;Q N.7s(c)},29:P(d){N[d||N.R.77]();T c={};c[N.54]=N.6F,c[N.2a]=0;Q N.7s(c)},96:P(c){Q N.1y("96",c)}})})(6N);(P(b){if(!b){7b"9z 9A 9E";Q}if(b.8k){Q}T a=b.$;b.8k=1r b.4v(b.1X,{49:P(c,d){N.a6=c;N.R=b.1U(N.R,d);N.55=X},1y:P(c){N.$3z.1y([]);N.cY=c;Q N},6m:P(c){1I(T d=0;d<N.a6.1B;d++){N.el=a(N.a6[d]);N.3X=N.cY[d];N.$3z.6m(c)}}})})(6N);T 5d=(P(g){T i=g.$;g.$8V=P(j){$V(j).1t();Q X};g.dA=P(j,l,q){T m,k,n,o=[],e=-1;q||(q=g.i3);m=g.$(q)||(1l.8J||1l.2i).2s(g.$1r("1K",{id:q,2t:"cT/dk"}));k=m.hV||m.hU;if("a2"==g.2D(l)){1I(n in l){o.4g(n+":"+l[n])}l=o.7B(";")}if(k.as){e=k.as(j+" {"+l+"}",k.hM.1B)}1f{e=k.hL(j,l)}Q e};T c={3A:"cz.5.14",R:{},9l:{1z:50,4X:X,ag:40,4t:25,1Y:5T,2g:5T,6k:15,2P:"1k",7P:"13",bs:"9U",5c:X,8o:1a,5A:X,6h:X,x:-1,y:-1,7c:X,dK:X,2G:"2I",9q:1a,5B:"13",95:"2x",c9:1a,ei:7Y,dU:4R,2Q:"",1v:1a,4j:"b5",5m:"ap",8r:75,82:"hT",6g:1a,7F:"9G 1p...",7d:"hS",8u:75,am:-1,at:-1,3u:"1C",9n:60,4m:"8a",8z:7Y,7K:1a,5V:X,4o:"",bM:1a,7n:X,3a:X,4i:X,3C:g.$F},eb:$V([/^(1z)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1z-aW)(\\s+)?:(\\s+)?(1a|X)$/i,/^(9q\\-9d)(\\s+)?:(\\s+)?(\\d+)$/i,/^(4t)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1p\\-S)(\\s+)?:(\\s+)?(\\d+\\%?)(1x)?/i,/^(1p\\-U)(\\s+)?:(\\s+)?(\\d+\\%?)(1x)?/i,/^(1p\\-i4)(\\s+)?:(\\s+)?(\\d+)(1x)?/i,/^(1p\\-1u)(\\s+)?:(\\s+)?(1k|Y|13|1j|4Q|4l|#([a-99-8O\\-:\\.]+))$/i,/^(1p\\-d8)(\\s+)?:(\\s+)?(1k|Y|13|1j|5y)$/i,/^(1p\\-3L\\-3R)(\\s+)?:(\\s+)?(1a|X)$/i,/^(1p\\-1d\\-8s)(\\s+)?:(\\s+)?(9U|bt|X)$/i,/^(c1\\-77)(\\s+)?:(\\s+)?(1a|X)$/i,/^(e4\\-5g\\-1C)(\\s+)?:(\\s+)?(1a|X)$/i,/^(ik\\-29\\-1p)(\\s+)?:(\\s+)?(1a|X)$/i,/^(iq\\-1u)(\\s+)?:(\\s+)?(1a|X)$/i,/^(x)(\\s+)?:(\\s+)?([\\d.]+)(1x)?/i,/^(y)(\\s+)?:(\\s+)?([\\d.]+)(1x)?/i,/^(1C\\-8n\\-5z)(\\s+)?:(\\s+)?(1a|X)$/i,/^(1C\\-8n\\-io)(\\s+)?:(\\s+)?(1a|X)$/i,/^(9Z\\-5g)(\\s+)?:(\\s+)?(2I|1C|21)$/i,/^(1C\\-8n\\-9Z)(\\s+)?:(\\s+)?(1a|X)$/i,/^(9q)(\\s+)?:(\\s+)?(1a|X)$/i,/^(29\\-2x)(\\s+)?:(\\s+)?(1a|X|13|1j)$/i,/^(2x\\-ir)(\\s+)?:(\\s+)?(2x|#([a-99-8O\\-:\\.]+))$/i,/^(1p\\-5P)(\\s+)?:(\\s+)?(1a|X)$/i,/^(1p\\-5P\\-in\\-9d)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1p\\-5P\\-ao\\-9d)(\\s+)?:(\\s+)?(\\d+)$/i,/^(2Q)(\\s+)?:(\\s+)?([a-99-8O\\-:\\.]+)$/i,/^(1v)(\\s+)?:(\\s+)?(1a|X)/i,/^(1v\\-cT)(\\s+)?:(\\s+)?([^;]*)$/i,/^(1v\\-1z)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1v\\-1u)(\\s+)?:(\\s+)?(ap|bn|bm|bl|br|bc)/i,/^(29\\-76)(\\s+)?:(\\s+)?(1a|X)$/i,/^(76\\-i9)(\\s+)?:(\\s+)?([^;]*)$/i,/^(76\\-1z)(\\s+)?:(\\s+)?(\\d+)$/i,/^(76\\-1u\\-x)(\\s+)?:(\\s+)?(\\d+)(1x)?/i,/^(76\\-1u\\-y)(\\s+)?:(\\s+)?(\\d+)(1x)?/i,/^(1Q\\-db)(\\s+)?:(\\s+)?(1C|21)$/i,/^(3E\\-db)(\\s+)?:(\\s+)?(1C|21)$/i,/^(3E\\-21\\-ih)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3E\\-8s)(\\s+)?:(\\s+)?(8a|5P|8b|X)$/i,/^(3E\\-8s\\-9d)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3E\\-7m)(\\s+)?:(\\s+)?([a-99-8O\\-:\\.]+)$/i,/^(3L\\-1p\\-1d)(\\s+)?:(\\s+)?(1a|X)$/i,/^(bI\\-3E\\-ij)(\\s+)?:(\\s+)?(1a|X)$/i,/^(bI\\-3E\\-aA)(\\s+)?:(\\s+)?(1a|X)$/i,/^(c3\\-5p)(\\s+)?:(\\s+)?(1a|X)$/i,/^(1k\\-1C)(\\s+)?:(\\s+)?(1a|X)$/i,/^(ch\\-1p)(\\s+)?:(\\s+)?(1a|X)$/i]),4h:$V([]),dm:P(l){T k=/(1C|21)/i;1I(T j=0;j<c.4h.1B;j++){if(c.4h[j].3o&&!c.4h[j].7A){c.4h[j].64()}1f{if(k.1R(c.4h[j].R.2G)&&c.4h[j].6D){c.4h[j].6D=l}}}},1t:P(j){T e=$V([]);if(j){if((j=$V(j))&&j.1p){e.4g(j)}1f{Q X}}1f{e=$V(g.$A(g.2i.2z("A")).2W(P(k){Q((" "+k.2V+" ").3s(/\\bZ\\s/)&&k.1p)}))}e.36(P(k){k.1p&&k.1p.1t()},N)},1y:P(e){if(0==2c.1B){c.78();Q 1a}e=$V(e);if(!e||!(" "+e.2V+" ").3s(/\\s(6X|5d)\\s/)){Q X}if(!e.1p){T j=19;3P(j=e.2M){if(j.3W=="8h"){1n}e.4c(j)}3P(j=e.i5){if(j.3W=="8h"){1n}e.4c(j)}if(!e.2M||e.2M.3W!="8h"){7b"gV gW b5"}c.4h.4g(1r c.1p(e,(2c.1B>1)?2c[1]:1F))}1f{e.1p.1y()}},2Z:P(l,e,k,j){if((l=$V(l))&&l.1p){(19===e||""===e)&&(e=1F);(19===k||""===k)&&(k=1F);l.1p.2Z(e,k,j);Q 1a}Q X},78:P(){g.$A(1d.1l.6I("A")).36(P(e){if(e.2V.3i("6X"," ")){if(c.1t(e)){c.1y.2v(1M,e)}1f{c.1y(e)}}},N)},29:P(e){Q c.92(e)},92:P(e){if((e=$V(e))&&e.1p){Q e.1p.5z()}Q X},b4:P(e){if((e=$V(e))&&e.1p){Q e.1p.64()}Q X},gX:P(e){if((e=$V(e))&&e.1p){Q{x:e.1p.R.x,y:e.1p.R.y}}},bB:P(k){T j,e;j="";1I(e=0;e<k.1B;e++){j+=8q.eg(14^k.dt(e))}Q j}};c.7f=P(){N.49.52(N,2c)};c.7f.2S={49:P(e){N.cb=19;N.5a=19;N.9R=N.bK.2k(N);N.9K=19;N.S=0;N.U=0;N.5E=0;N.84=0;N.2l={Y:0,1k:0,13:0,1j:0};N.2p={Y:0,1k:0,13:0,1j:0};N.1L=X;N.66=19;if("5C"==g.2D(e)){N.66=g.$1r("5w").2r("ax-dn-2T").1e({1u:"1Z",13:"-aU",S:"bF",U:"bF",2u:"1O"}).22(g.2i);N.12=g.$1r("2T").22(N.66);N.9r();N.12.28=e}1f{N.12=$V(e);N.9r();N.12.28=e.28}},4A:P(){if(N.66){if(N.12.1V==N.66){N.12.3O().1e({1u:"7J",13:"1A"})}N.66.5X();N.66=19}},bK:P(j){if(j){$V(j).1t()}if(N.cb){N.4A();N.cb.1W(N,X)}N.5Z()},9r:P(e){N.5a=19;if(e==1a||!(N.12.28&&(N.12.6j||N.12.6r=="6j"))){N.5a=P(j){if(j){$V(j).1t()}if(N.1L){Q}N.1L=1a;N.5r();if(N.cb){N.4A();N.cb.1W()}}.2k(N);N.12.1w("2I",N.5a);$V(["8w","5t"]).36(P(j){N.12.1w(j,N.9R)},N)}1f{N.1L=1a}},2Z:P(j,l){T k=N.1L;N.5Z();T e=g.$1r("a",{2b:j});if(1a!==l&&N.12.28.3i(e.2b)&&0!==N.12.S){N.1L=k}1f{N.9r(1a);N.12.28=j}e=19},5r:P(){N.5E=N.12.5E||N.12.S;N.84=N.12.84||N.12.U;N.S=N.12.S;N.U=N.12.U;if(N.S==0&&N.U==0&&g.18.3m){N.S=N.12.5E;N.U=N.12.84}$V(["9a","98","8W","8X"]).36(P(j){N.2p[j.2Y()]=N.12.6A("2p"+j).1N();N.2l[j.2Y()]=N.12.6A("2l"+j+"bN").1N()},N);if(g.18.7v||(g.18.2A&&!g.18.3I)){N.S-=N.2p.Y+N.2p.1k;N.U-=N.2p.13+N.2p.1j}},8p:P(){T e=19;e=N.12.3U();Q{13:e.13+N.2l.13,1j:e.1j-N.2l.1j,Y:e.Y+N.2l.Y,1k:e.1k-N.2l.1k}},gT:P(){if(N.9K){N.9K.28=N.12.28;N.12=19;N.12=N.9K}},2I:P(e){if(N.1L){if(!N.S){(P(){N.5r();N.4A();e.1W()}).1o(N).2v(1)}1f{N.4A();e.1W()}}1f{if(!N.5a){e.1W(N,X);Q}N.cb=e}},5Z:P(){if(N.5a){N.12.2o("2I",N.5a)}$V(["8w","5t"]).36(P(e){N.12.2o(e,N.9R)},N);N.5a=19;N.cb=19;N.S=19;N.1L=X;N.gS=X}};c.1p=P(){N.a7.52(N,2c)};c.1p.2S={a7:P(l,j,k){T e={};N.4x=-1;N.3o=X;N.80=0;N.88=0;N.9c=!(N.1g);N.8H=N.9c?{}:N.8H||{};N.7A=X;N.4d=19;N.9O=$V(1d).1c("5W:8t")||$V(1d).1c("5W:8t",g.$1r("5w").1e({1u:"1Z",13:-7R,S:10,U:10,2u:"1O"}).22(g.2i));N.R=g.3M(c.9l);if(l){N.c=$V(l)}N.4S=("5w"==N.c.3W.2Y());e=g.1U(e,N.58());e=g.1U(e,N.58(N.c.3y));e=g.1U(e,N.8H);if(j){e=g.1U(e,g.1U(1a===k?N.8H:{},N.58(j)))}if(e.5c&&!e.7c&&1F===e.5A){e.5A=1a}g.1U(N.R,e);N.R.2Q+="";if("2I"==N.R.2G&&g.2N(N.R.aq)&&"1a"==N.R.aq.5Y()){N.R.2G="1C"}if(g.2N(N.R.9W)&&N.R.9W!=N.R.3u){N.R.3u=N.R.9W}if(N.9c&&!N.4S){N.id=N.8T=N.c.id||"";if(!N.c.id){N.c.id=N.id="1p-"+1s.7X(1s.7M()*g.2X())}}if("4l"==N.R.2P&&N.R.5c){N.R.8o=1a}if(N.R.4i){N.3o=X;N.R.7c=1a;N.R.1v=X}("5C"===g.2D(N.R.3C))&&("P"===g.2D(1d[N.R.3C]))&&(N.R.3C=1d[N.R.3C]);if(l){N.6y=19;N.7j=N.8L.2k(N);N.9S=N.85.2k(N);N.ac=N.29.1o(N,1a);N.bw=N.8A.1o(N);N.4P=N.7G.2k(N);N.a8=P(o){T n=$V(N.c).1c("5W:1d:2E"),m=$V(1d).1G();if(n.S!==m.S||n.U!==m.U){3T(N.8S);N.8S=N.7O.1o(N).2v(10);$V(N.c).1E("5W:1d:2E",m)}}.2k(N);if(!N.4S){N.c.1w("1C",P(n){T m=n.57();if(3==m){Q 1a}$V(n).1t();if(!g.18.2A){N.cg()}Q X})}N.c.1w("8L",N.7j);N.c.1w("85",N.9S);if("21"==N.R.2G){N.c.1w("21",N.7j)}if(g.18.3Q){N.c.1e({"-3m-e8-e9":"2U","-3m-5H-dZ":"2U","-3m-dY-e3-59":"aT"});if(!N.R.4i){N.c.1w("6B",N.7j);N.c.1w("4r",N.9S)}1f{N.c.1w("1C",P(m){m.9X()})}}N.c.e0="5g";N.c.1K.h6="2U";N.c.1w("h4",g.$8V);if(!N.4S){N.c.1e({1u:"4V",2e:(g.18.cB)?"2n":"8D-2n",h3:"2U",9J:"0",4e:"h0",2u:"1O"});if(g.18.45){N.c.2r("ax-1I-ie"+g.18.45)}if(N.c.1P("bi")=="5y"){N.c.1e({2a:"1A 1A"})}}N.c.1p=N}1f{N.R.2G="2I"}if(!N.R.3a){N.c.1w("9D",g.$8V)}if("2I"==N.R.2G){N.7l()}1f{if(""!==N.8T){N.ay(1a)}}},7l:P(){T l,o,n,m,j;if(!N.1b){N.1b=1r c.7f(N.c.2M);N.1q=1r c.7f(N.c.2b)}1f{N.1q.2Z(N.c.2b)}if(!N.1g){N.1g={12:$V(1l.48("3j"))[(N.4S)?"4U":"2r"]("h1").1e({2u:"1O",2w:N.R.2P=="4l"?1M:h2,13:"-97",1u:"1Z",S:N.R.1Y+"1x",U:N.R.2g+"1x"}),1p:N,46:"1T",9s:"1T",7p:0,7q:0,69:{43:"Y",4N:1},65:{43:"13",4N:1},4Q:X,6s:N.R.1Y,6u:N.R.2g};if(!(g.18.gP&&g.18.45<9)){2m(N.R.bs){1m"9U":N.1g.12.2r("hK");1n;1m"bt":N.1g.12.2r("gC");1n;2j:1n}}N.1g.1S=P(){if(N.12.1K.13!="-97"&&N.1p.1i&&!N.1p.1i.4E){N.12.1K.13="-97"}if(N.12.1V===g.2i){N.12.22(N.1p.9O)}};N.1g.dV=N.1g.1S.1o(N.1g);if(g.18.3r){l=$V(1l.48("b8"));l.28="bb:\'\'";l.1e({Y:"1T",13:"1T",1u:"1Z","z-2f":-1}).gD=0;N.1g.7o=N.1g.12.2s(l)}N.1g.4s=$V(1l.48("3j")).2r("gA").1e({1u:"4V",2w:10,Y:"1T",13:"1T",2p:"gz"}).1S();o=g.$1r("3j",{},{2u:"1O"});o.2s(N.1q.12);N.1q.12.1e({2p:"1T",2a:"1T",2l:"1T",S:"1A",U:"1A"});if(N.R.5B=="1j"){N.1g.12.2s(o);N.1g.12.2s(N.1g.4s)}1f{N.1g.12.2s(N.1g.4s);N.1g.12.2s(o)}N.1g.12.22(N.9O);if("1F"!==4f(j)){N.1g.g=$V(1l.48("5w")).1e({59:j[1],dX:j[2]+"1x",df:j[3],de:"di",1u:"1Z","z-2f":10+(""+(N.1q.12.1P("z-2f")||0)).1N(),S:j[5],bi:j[4],"gx-U":"gy",Y:"1T"}).7a(c.bB(j[0])).22(N.1g.12,((1s.7X(1s.7M()*dr)+1)%2)?"13":"1j")}}N.1g.4Q=X;if(N.R.2P=="4Q"&&$V(N.c.id+"-aA")){N.1g.4Q=1a;$V(N.c.id+"-aA").2s(N.1g.12)}1f{if(N.R.2P.3i("#")){T q=N.R.2P.2B(/^#/,"");if($V(q)){N.1g.4Q=1a;$V(q).2s(N.1g.12)}}1f{if(N.R.2P=="4l"){N.c.2s(N.1g.12)}}}N.1g.6s=N.R.1Y;N.1g.6u=N.R.2g;if(N.R.5B!="X"&&N.R.5B!=X){T k=N.1g.4s;k.1S();3P(n=k.2M){k.4c(n)}if(N.R.95=="2x"&&""!=N.c.2x){k.2s(1l.5G(N.c.2x));k.29()}1f{if(N.R.95.3i("#")){T q=N.R.95.2B(/^#/,"");if($V(q)){k.7a($V(q).8l);k.29()}}}}1f{N.1g.4s.1S()}N.c.aO=N.c.2x;N.c.2x="";N.1b.2I(N.by.1o(N))},by:P(e){if(!e&&e!==1F){Q}if(!N.1b){Q}if(!N.R.4X){N.1b.12.2C(1)}if(!N.4S){N.c.1e({S:"1A",U:"1A"})}if(N.R.6g&&!N.R.4i){N.87=5I(N.bw,7Y)}if(N.R.2Q!=""&&$V(N.R.2Q)){N.dc()}if(N.c.id!=""){N.ay()}N.1q.2I(N.ar.1o(N))},ar:P(l){T k,j,e;if(!l&&l!==1F){3T(N.87);if(N.R.6g&&N.2h){N.2h.1S()}N.4x=g.2X();Q}if(!N.1b||!N.1q){Q}j=N.1b.12.3U();N.9v=j;if(j.1j==j.13){N.ar.1o(N).2v(8c);Q}if(N.1b.S==0&&g.18.2A){N.1b.5r();N.1q.5r();!N.4S&&N.c.1e({S:N.1b.S+"1x"})}k=N.1g.4s.1G();if(/%$/i.1R(N.R.1Y)){N.R.1Y=(2d(N.R.1Y)/1M)*N.1b.S}if(/%$/i.1R(N.R.2g)){N.R.2g=(2d(N.R.2g)/1M)*N.1b.U}N.1g.12.1e({S:N.R.1Y});k=N.1g.4s.1G();if(N.R.bM||N.R.7n){if((N.1q.S<N.R.1Y)||N.R.7n){N.R.1Y=N.1q.S;N.1g.12.1e({S:N.R.1Y});k=N.1g.4s.1G()}if((N.1q.U<N.R.2g)||N.R.7n){N.R.2g=N.1q.U+k.U}}2m(N.R.2P){1m"1k":N.1g.12.1K.Y=j.1k+N.R.6k+"1x";N.1g.69.43="1k";1n;1m"Y":N.1g.12.1K.Y=j.Y-N.R.6k-N.R.1Y+"1x";1n;1m"13":N.1g.46=j.13-(N.R.6k+N.R.2g)+"1x";1n;1m"1j":N.1g.46=j.1j+N.R.6k+"1x";N.1g.65.43="1j";1n;1m"4l":N.1g.12.1e({Y:"1T",U:"1M%",S:"1M%"});N.R.1Y=N.1b.S;N.R.2g=N.1b.U;N.1g.46="1T";k=N.1g.4s.1G();1n;2j:if(N.1g.4Q){e=$V(N.1g.12.1V).1G();if(/%$/i.1R(N.1g.6s)){N.R.1Y=(2d(N.1g.6s)/1M)*e.S}if(/%$/i.1R(N.1g.6u)){N.R.2g=(2d(N.1g.6u)/1M)*e.U}N.1g.12.1e({Y:"1T",S:N.R.1Y});N.1g.46="1T";k=N.1g.4s.1G()}1n}if(N.R.5B=="1j"){$V(N.1q.12.1V).1D("U",N.R.2g-k.U)}N.1g.12.1e("4l"==N.R.2P?{}:{U:N.R.2g+"1x",S:N.R.1Y+"1x"}).2C(1);if(g.18.3r&&N.1g.7o){N.1g.7o.1e({S:N.R.1Y+"1x",U:N.R.2g+"1x"})}if(N.R.2P=="1k"||N.R.2P=="Y"){if(N.R.7P=="5y"){N.1g.46=(j.1j-(j.1j-j.13)/2-N.R.2g/2)+"1x";N.1g.65={43:"1j",4N:2}}1f{if(N.R.7P=="1j"){N.1g.46=(j.1j-N.R.2g)+"1x";N.1g.65.43="1j"}1f{N.1g.46=j.13+"1x"}}}1f{if(N.R.2P=="13"||N.R.2P=="1j"){if(N.R.7P=="5y"){N.1g.12.1K.Y=(j.1k-(j.1k-j.Y)/2-N.R.1Y/2)+"1x";N.1g.69={43:"1k",4N:2}}1f{if(N.R.7P=="1k"){N.1g.12.1K.Y=(j.1k-N.R.1Y)+"1x";N.1g.69.43="1k"}1f{N.1g.12.1K.Y=j.Y+"1x"}}}}N.1g.7p=2d(N.1g.46,10);N.1g.7q=2d(N.1g.12.1K.Y,10);N.1g.9s=N.1g.7q;N.1g.46=N.1g.7p;N.6v=N.R.2g-k.U;if(N.1g.g){N.1g.g.1e({13:N.R.5B=="1j"?0:"1A",1j:N.R.5B=="1j"?"1A":0})}N.1q.12.1e({1u:"4V",4O:"1T",2p:"1T",Y:"1T",13:"1T"});N.ea();if(N.R.5A){if(N.R.x==-1){N.R.x=N.1b.S/2}if(N.R.y==-1){N.R.y=N.1b.U/2}N.29()}1f{if(N.R.c9){N.3v=1r g.1X(N.1g.12,{7S:"c7"===g.18.8v})}N.1g.12.1e({13:"-97"})}if(N.R.6g&&N.2h){N.2h.1S()}N.c.1w("au",N.4P);N.c.1w("2O",N.4P);if(g.18.3Q){N.c.1w("c4",N.4P);N.c.1w("4r",N.4P)}N.7I();$V(N.c).1c("5W:1d:2E",$V(1d).1G());$V(1d).1w("3p",N.a8);if(!N.R.4i&&(!N.R.7c||"1C"==N.R.2G)){N.3o=1a}if("1C"==N.R.2G&&N.6D){N.7G(N.6D)}if(N.7A){N.5z()}N.4x=g.2X();!N.4S&&("P"==g.2D(N.R.3C))&&N.R.3C.1W(19,N.id,!N.9c)},7I:P(){T m=/bn|br/i,e=/bl|br|bc/i,j=/bc|bm/i,l=19;N.6G=1F;if(!N.R.1v){if(N.1v){N.1v.5X();N.1v=1F}Q}if(!N.1v){N.1v=$V(1l.48("3j")).2r(N.R.82).1e({2e:"2n",2u:"1O",1u:"1Z",2H:"1O","z-2f":1});if(N.R.4j!=""){N.1v.2s(1l.5G(N.R.4j))}N.c.2s(N.1v)}1f{if(N.R.4j!=""){l=N.1v[(N.1v.2M)?"8y":"2s"](1l.5G(N.R.4j),N.1v.2M);l=19}}N.1v.1e({Y:"1A",1k:"1A",13:"1A",1j:"1A",2e:"2n",1z:(N.R.8r/1M),"3N-S":(N.1b.S-4)});T k=N.1v.1G();N.1v.1D((m.1R(N.R.5m)?"1k":"Y"),(j.1R(N.R.5m)?(N.1b.S-k.S)/2:2)).1D((e.1R(N.R.5m)?"1j":"13"),2);N.6G=1a;N.1v.29()},8A:P(){if(N.1q.1L){Q}N.2h=$V(1l.48("3j")).2r(N.R.7d).2C(N.R.8u/1M).1e({2e:"2n",2u:"1O",1u:"1Z",2H:"1O","z-2f":20,"3N-S":(N.1b.S-4)});N.2h.2s(1l.5G(N.R.7F));N.c.2s(N.2h);T e=N.2h.1G();N.2h.1e({Y:(N.R.am==-1?((N.1b.S-e.S)/2):(N.R.am))+"1x",13:(N.R.at==-1?((N.1b.U-e.U)/2):(N.R.at))+"1x"});N.2h.29()},dc:P(){$V(N.R.2Q).bU=$V(N.R.2Q).1V;$V(N.R.2Q).bR=$V(N.R.2Q).gE;N.c.2s($V(N.R.2Q));$V(N.R.2Q).1e({1u:"1Z",Y:"1T",13:"1T",S:N.1b.S+"1x",U:N.1b.U+"1x",2w:15}).29();if(g.18.2A){N.c.9f=N.c.2s($V(1l.48("3j")).1e({1u:"1Z",Y:"1T",13:"1T",S:N.1b.S+"1x",U:N.1b.U+"1x",2w:14,3K:"#gF"}).2C(0.gL))}g.$A($V(N.R.2Q).6I("A")).36(P(j){T k=j.gM.4a(","),e=19;$V(j).1e({1u:"1Z",Y:k[0]+"1x",13:k[1]+"1x",S:(k[2]-k[0])+"1x",U:(k[3]-k[1])+"1x",2w:15}).29();if(j.5o("3c")){if(e=j.1c("1Q")){e.2F=N.R.2Q}1f{j.3y+=";2F: "+N.R.2Q+";"}}},N)},ay:P(k){T e,l,j=1r 53("1p\\\\-id(\\\\s+)?:(\\\\s+)?"+N.c.id+"($|;)");N.3E=$V([]);g.$A(1l.6I("A")).36(P(n){if(j.1R(n.3y)){if(!$V(n).7T){n.7T=P(o){if(!g.18.2A){N.cg()}$V(o).1t();Q X};n.1w("1C",n.7T)}if(k){if(("21"==N.R.2G||"1C"==N.R.2G)&&!$V(n).8U){n.8U=P(p,o){o.2o("1C",o.8U);if(!!N.1b){Q}$V(p).1t();N.c.2b=o.2b;N.c.2M.28=o.6C;N.1y(o.3y);if(N.c.1c("1Q")){N.c.1c("1Q").1y()}}.2k(N,n);n.1w("1C",n.8U)}Q}T m=g.$1r("a",{2b:n.6C});(N.R.4o!="")&&$V(n)[N.1q.12.28.3i(n.2b)&&N.1b.12.28.3i(m.2b)?"2r":"4U"](N.R.4o);if(N.1q.12.28.3i(n.2b)&&N.1b.12.28.3i(m.2b)){N.6y=n}m=19;if(!n.5J){n.5J=P(q,p){p=q.gN||q.5n();31{3P("a"!=p.3W.2Y()){p=p.1V}}3h(o){Q}if(p.5U(q.4D())){Q}if(q.2t=="2O"){if(N.5F){3T(N.5F)}N.5F=X;Q}if(p.2x!=""){N.c.2x=p.2x}if(q.2t=="21"){N.5F=5I(N.2Z.1o(N,p.2b,p.6C,p.3y,p),N.R.9n)}1f{N.2Z(p.2b,p.6C,p.3y,p)}}.2k(N);n.1w(N.R.3u,n.5J);if(N.R.3u=="21"){n.1w("2O",n.5J)}}n.1e({9J:"0",2e:"8D-2n"});if(N.R.7K){l=1r cd();l.28=n.6C}if(N.R.5V){e=1r cd();e.28=n.2b}N.3E.4g(n)}},N)},1t:P(j){31{N.64();N.c.2o("au",N.4P);N.c.2o("2O",N.4P);if(g.18.3Q){N.c.2o("c4",N.4P);N.c.2o("4r",N.4P)}if(1F===j&&N.1i){N.1i.12.1S()}if(N.3v){N.3v.1t()}N.26=19;N.3o=X;if(N.3E!==1F){N.3E.36(P(e){if(N.R.4o!=""){e.4U(N.R.4o)}if(1F===j){e.2o(N.R.3u,e.5J);if(N.R.3u=="21"){e.2o("2O",e.5J)}e.5J=19;e.2o("1C",e.7T);e.7T=19}},N)}if(N.R.2Q!=""&&$V(N.R.2Q)){$V(N.R.2Q).1S();$V(N.R.2Q).bU.9C($V(N.R.2Q),$V(N.R.2Q).bR);if(N.c.9f){N.c.4c(N.c.9f)}}if(N.R.4X){N.c.4U("e5");N.1b.12.2C(1)}N.3v=19;if(N.2h){N.c.4c(N.2h)}if(N.1v){N.1v.1S()}if(1F===j){if(N.1v){N.c.4c(N.1v)}N.1v=19;N.1q.5Z();N.1b.5Z();(N.1i&&N.1i.12)&&N.c.4c(N.1i.12);(N.1g&&N.1g.12)&&N.1g.12.1V.4c(N.1g.12);N.1i=19;N.1g=19;N.1q=19;N.1b=19;if(!N.R.3a){N.c.2o("9D",g.$8V)}if(""===N.8T){N.c.gK("id")}1f{N.c.id=N.8T}$V(1d).2o("3p",N.a8)}if(N.87){3T(N.87);N.87=19}N.4d=19;N.c.9f=19;N.2h=19;if(N.c.2x==""){N.c.2x=N.c.aO}N.4x=-1}3h(k){}},1y:P(j,e){if(N.4x!=-1){Q}N.a7(X,j,(19===e||1F===e))},2Z:P(A,p,j,z){T k,D,e,m,v,l,F=19,x=19,n=N.6y,o,q,C,w,s,u,G,E,r;z=z||19;if(g.2X()-N.4x<5T||N.4x==-1||N.9p){N.5F&&3T(N.5F);k=5T-g.2X()+N.4x;if(N.4x==-1){k=5T}N.5F=5I(N.2Z.1o(N,A,p,j,z),k);Q}if(z&&N.6y==z){Q}1f{N.6y=z}D=P(H){if(1F!=A){N.c.2b=A}if(1F===j){j=""}if(N.R.6h){j="x: "+N.R.x+"; y: "+N.R.y+"; "+j}if(1F!=p){N.1b.2Z(p)}if(H!==1F){N.1b.2I(H)}};x=N.c.1c("1Q");if(x){x.1L&&x.2R(19,1a);x.1H="86";F=P(){x.1H="3G";x.2Z(N.c.2b,19,j)}.1o(N)}N.1b.5r();m=N.1b.S;v=N.1b.U;N.1t(1a);if(N.R.4m!="X"&&1F!==p){N.9p=1a;T B=$V(N.c.7D(1a)).1e({1u:"1Z",13:0,Y:0,S:""});T y=g.$1r("5w",{id:N.c.1V.id,"7m":N.c.1V.2V}).2r("av-dz-dj").1e({S:$V(N.c.1V).1P("S"),"3N-S":$V(N.c.1V).1P("3N-S")});if("gH"===N.c.1V.3W.gI()){N.c.1V.9C(y,N.c)}1f{N.c.1V.1V.9C(y,N.c.1V)}y.4L(B);g.18.a3&&y.1G();if(g.18.45&&g.18.45<8){$V(B.2M).2C(1)}l=1r c.7f(B.2M);l.2Z(p);if("8b"==N.R.4m){r=N.c.2b;o=N.3E.2W(P(H){Q H.2b.3i(r)});o=(o[0])?$V(o[0].2z("2T")[0]||o[0]):N.1b.12;q=N.3E.2W(P(H){Q H.2b.3i(A)});q=(q[0])?$V(q[0].2z("2T")[0]||q[0]):19;if(19==q){q=N.1b.12;o=N.1b.12}w=N.1b.12.3d(),s=o.3d(),u=q.3d(),E=o.1G(),G=q.1G()}e=P(J){T H={},L={},K={},M=19,I=19;if(X===J){l.5Z();$V(l.12).3O();l=19;y.3O();N.9p=X;if(x){x.1H="3G"}N.6y=n;N.1y(19,n);Q}if(g.18.45&&g.18.45<8&&(m===l.S||0===l.S)){l.12.1D("1p",1);y.1G();l.5r()}if("8b"==N.R.4m){H.S=[m,E.S];H.U=[v,E.U];H.13=[w.13,s.13];H.Y=[w.Y,s.Y];L.S=[G.S,l.S];L.U=[G.U,l.U];L.13=[u.13,w.13];y.1e({2p:""});B.2C(0).1e({U:0,S:l.S,1u:"4V"});L.Y=[u.Y,B.3d().Y];K.S=[m,l.S];l.12.22(g.2i).1e({1u:"1Z","z-2f":aB,Y:L.Y[0],13:L.13[0],S:L.S[0],U:L.U[0]});M=$V(N.c.2M.7D(X)).22(g.2i).1e({1u:"1Z","z-2f":bp,Y:H.Y[0],13:H.13[0],2H:"4K"});$V(N.c.2M).1e({2H:"1O"});y.3O();I=N.c.1P("2l-S");N.c.1D("2l-S",0)}1f{l.12.22(N.c).1e({1u:"1Z","z-2f":aB,1z:0,Y:"1T",13:"1T",U:"1A"});M=$V(N.c.2M.7D(X)).22(N.c).1e({1u:"1Z","z-2f":bp,Y:"1T",13:"1T",2H:"4K",U:"1A"});$V(N.c.2M).1e({2H:"1O"});y.3O();L={1z:[0,1]};if(m!=l.S||v!=l.U){K.S=L.S=H.S=[m,l.S];K.U=L.U=H.U=[v,l.U]}if(N.R.4m=="5P"){H.1z=[1,0]}}1r g.8k([N.c,l.12,(M||N.c.2M)],{35:N.R.8z,3Y:P(){if(M){M.3O();M=19}if(19!==I){N.c.1D("2l-S",I)}D.1W(N,P(){l.5Z();$V(N.c.2M).1e({2H:"4K"});$V(l.12).3O();l=19;if(H.1z){$V(N.c.2M).1e({1z:1})}N.9p=X;N.1y(j,z);if(F){F.2v(10)}}.1o(N))}.1o(N)}).1y([K,L,H])};l.2I(e.1o(N))}1f{D.1W(N,P(){N.c.1e({S:N.1b.S+"1x",U:N.1b.U+"1x"});N.1y(j,z);if(F){F.2v(10)}}.1o(N))}},58:P(j){T e,n,l,k;e=19;n=[];j=j||"";if(""==j){1I(k in c.R){e=c.R[k];2m(g.2D(c.9l[k.3e()])){1m"7y":e=e.5Y().6t();1n;1m"68":if(!("1Y"===k.3e()||"2g"===k.3e())||!/\\%$/i.1R(e)){e=44(e)}1n;2j:1n}n[k.3e()]=e}}1f{l=$V(j.4a(";"));l.36(P(m){c.eb.36(P(o){e=o.6x(m.4p());if(e){2m(g.2D(c.9l[e[1].3e()])){1m"7y":n[e[1].3e()]=e[4]==="1a";1n;1m"68":n[e[1].3e()]=(("1Y"===e[1].3e()||"2g"===e[1].3e())&&/\\%$/.1R(e[4]))?e[4]:44(e[4]);1n;2j:n[e[1].3e()]=e[4]}}},N)},N)}if(X===n.4m){n.4m="X"}Q n},ea:P(){T j,e;if(!N.1i){N.1i={12:$V(1l.48("3j")).2r("e5").1e({2w:10,1u:"1Z",2u:"1O"}).1S(),S:20,U:20,af:""};N.c.2s(N.1i.12);N.1i.af=N.1i.12.1P("3K-59")}if(e=N.c.1c("1Q")){N.1i.12.1e({4e:(e.W.5s)?"e4":""})}if(N.R.7n){N.1i.12.1e({"2l-S":"1T",4e:"2j"})}N.1i.4E=X;N.1i.U=N.6v/(N.1q.U/N.1b.U);N.1i.S=N.R.1Y/(N.1q.S/N.1b.S);if(N.1i.S>N.1b.S){N.1i.S=N.1b.S}if(N.1i.U>N.1b.U){N.1i.U=N.1b.U}N.1i.S=1s.4Z(N.1i.S);N.1i.U=1s.4Z(N.1i.U);N.1i.4O=N.1i.12.6A("8d").1N();N.1i.12.1e({S:(N.1i.S-2*(g.18.3I?0:N.1i.4O))+"1x",U:(N.1i.U-2*(g.18.3I?0:N.1i.4O))+"1x"});if(!N.R.4X&&!N.R.3a){N.1i.12.2C(44(N.R.1z/1M));if(N.1i.3H){N.1i.12.4c(N.1i.3H);N.1i.3H=19}}1f{if(N.1i.3H){N.1i.3H.28=N.1b.12.28}1f{j=N.1b.12.7D(X);j.e0="5g";N.1i.3H=$V(N.1i.12.2s(j)).1e({1u:"1Z",2w:5})}if(N.R.4X){N.1i.3H.1e(N.1b.12.1G());N.1i.12.2C(1);if(g.18.45&&g.18.45<9){N.1i.3H.2C(1)}}1f{if(N.R.3a){N.1i.3H.2C(0.hz)}N.1i.12.2C(44(N.R.1z/1M))}}},7G:P(l,j){if(!N.3o||l===1F||l.hw){Q X}if(!N.1i){Q X}T m=(/5H/i).1R(l.2t)&&l.aD.1B>1;T k=("4r"==l.2t&&!l.dL);if((!N.4S||l.2t!="2O")&&!m){$V(l).1t()}if(j===1F){j=$V(l).4M()}if(N.26===19||N.26===1F){N.26=N.1b.8p()}if(k||("2O"==l.2t&&!N.c.5U(l.4D()))||m||j.x>N.26.1k||j.x<N.26.Y||j.y>N.26.1j||j.y<N.26.13){N.64();Q X}N.7A=X;if(l.2t=="2O"||l.2t=="4r"){Q X}if(N.R.5c&&!N.6z){Q X}if(!N.R.8o){j.x-=N.80;j.y-=N.88}if((j.x+N.1i.S/2)>=N.26.1k){j.x=N.26.1k-N.1i.S/2}if((j.x-N.1i.S/2)<=N.26.Y){j.x=N.26.Y+N.1i.S/2}if((j.y+N.1i.U/2)>=N.26.1j){j.y=N.26.1j-N.1i.U/2}if((j.y-N.1i.U/2)<=N.26.13){j.y=N.26.13+N.1i.U/2}N.R.x=j.x-N.26.Y;N.R.y=j.y-N.26.13;if(N.4d===19){N.4d=5I(N.ac,10)}if(g.2N(N.6G)&&N.6G){N.6G=X;N.1v.1S()}Q 1a},29:P(m){if(m&&!N.4d){Q}T s,p,l,k,r,q,o,n,j,e=N.R,u=N.1i;s=u.S/2;p=u.U/2;u.12.1K.Y=e.x-s+N.1b.2l.Y+"1x";u.12.1K.13=e.y-p+N.1b.2l.13+"1x";if(N.R.4X){u.3H.1K.Y="-"+(44(u.12.1K.Y)+u.4O)+"1x";u.3H.1K.13="-"+(44(u.12.1K.13)+u.4O)+"1x"}l=(N.R.x-s)*(N.1q.S/N.1b.S);k=(N.R.y-p)*(N.1q.U/N.1b.U);if(N.1q.S-l<e.1Y){l=N.1q.S-e.1Y;if(l<0){l=0}}if(N.1q.U-k<N.6v){k=N.1q.U-N.6v;if(k<0){k=0}}if(1l.9k.hs=="ht"){l=(e.x+u.S/2-N.1b.S)*(N.1q.S/N.1b.S)}l=1s.4Z(l);k=1s.4Z(k);if(e.9q===X||(!u.4E)){N.1q.12.1K.Y=(-l)+"1x";N.1q.12.1K.13=(-k)+"1x"}1f{r=2d(N.1q.12.1K.Y);q=2d(N.1q.12.1K.13);o=(-l-r);n=(-k-q);if(!o&&!n){N.4d=19;Q}o*=e.ag/1M;if(o<1&&o>0){o=1}1f{if(o>-1&&o<0){o=-1}}r+=o;n*=e.ag/1M;if(n<1&&n>0){n=1}1f{if(n>-1&&n<0){n=-1}}q+=n;N.1q.12.1K.Y=r+"1x";N.1q.12.1K.13=q+"1x"}if(!u.4E){if(N.3v){N.3v.1t();N.3v.R.3Y=g.$F;N.3v.R.35=e.ei;N.1g.12.2C(0);N.3v.1y({1z:[0,1]})}if(/^(Y|1k|13|1j)$/i.1R(e.2P)){N.1g.12.22(g.2i)}if(e.2P!="4l"){u.12.29()}N.1g.12.1e(N.ai(/^(Y|1k|13|1j)$/i.1R(e.2P)&&!N.R.5A));if(e.4X){N.c.1D("3K-59",N.1i.af);N.1b.12.2C(44((1M-e.1z)/1M))}u.4E=1a}if(N.4d){N.4d=5I(N.ac,aZ/e.4t)}},ai:P(q){T j=N.71(5),e=N.1b.12.3U(),n=N.R.2P,m=N.1g,k=N.R.6k,u=m.12.1G(),p=m.7p,l=m.7q,o={Y:m.7q,13:m.7p};if("4l"===n||N.1g.4Q){Q o}q||(q=X);m.9s+=(e[m.69.43]-N.9v[m.69.43])/m.69.4N;m.46+=(e[m.65.43]-N.9v[m.65.43])/m.65.4N;N.9v=e;o.Y=l=m.9s;o.13=p=m.46;if(q){if("Y"==n||"1k"==n){if("Y"==n&&j.Y>l){o.Y=(e.Y-j.Y>=u.S)?(e.Y-u.S-2):(j.1k-e.1k-2>e.Y-j.Y-2)?(e.1k+2):(e.Y-u.S-2)}1f{if("1k"==n&&j.1k<l+u.S){o.Y=(j.1k-e.1k>=u.S)?(e.1k+2):(e.Y-j.Y-2>j.1k-e.1k-2)?(e.Y-u.S-2):(e.1k+2)}}}1f{if("13"==n||"1j"==n){o.Y=1s.3N(j.Y+2,1s.4G(j.1k,l+u.S)-u.S);if("13"==n&&j.13>p){o.13=(e.13-j.13>=u.U)?(e.13-u.U-2):(j.1j-e.1j-2>e.13-j.13-2)?(e.1j+2):(e.13-u.U-2)}1f{if("1j"==n&&j.1j<p+u.U){o.13=(j.1j-e.1j>=u.U)?(e.1j+2):(e.13-j.13-2>j.1j-e.1j-2)?(e.13-u.U-2):(e.1j+2)}}}}}Q o},71:P(k){k=k||0;T j=(g.18.3Q)?{S:1d.9x,U:1d.9y}:$V(1d).1G(),e=$V(1d).7r();Q{Y:e.x+k,1k:e.x+j.S-k,13:e.y+k,1j:e.y+j.U-k}},7O:P(m){if(!N.1b||!N.1b.1L){Q}T k,j,l={S:N.1b.S,U:N.1b.U};N.1b.5r();if(N.1g.4Q){j=$V(N.1g.12.1V).1G();if(/%$/i.1R(N.1g.6s)){N.R.1Y=(2d(N.1g.6s)/1M)*j.S}if(/%$/i.1R(N.1g.6u)){N.R.2g=(2d(N.1g.6u)/1M)*j.U}}1f{if("4l"===N.R.2P){N.R.1Y=N.1b.S;N.R.2g=N.1b.U}1f{N.R.1Y*=N.1b.S/l.S;N.R.2g*=N.1b.U/l.U}}k=N.1g.4s.1G();N.6v=N.R.2g-k.U;if(N.R.5B=="1j"){$V(N.1q.12.1V).1D("U",N.R.2g-k.U)}N.1g.12.1e("4l"==N.R.2P?{}:{U:N.R.2g+"1x",S:N.R.1Y+"1x"});if(g.18.3r&&N.1g.7o){N.1g.7o.1e({S:N.R.1Y,U:N.R.2g})}if(N.R.4X&&N.1i.3H){N.1i.3H.1e(N.1b.12.1G())}N.1i.U=N.6v/(N.1q.U/N.1b.U);N.1i.S=N.R.1Y/(N.1q.S/N.1b.S);if(N.1i.S>N.1b.S){N.1i.S=N.1b.S}if(N.1i.U>N.1b.U){N.1i.U=N.1b.U}N.1i.S=1s.4Z(N.1i.S);N.1i.U=1s.4Z(N.1i.U);N.1i.4O=N.1i.12.6A("8d").1N();N.1i.12.1e({S:(N.1i.S-2*(g.18.3I?0:N.1i.4O))+"1x",U:(N.1i.U-2*(g.18.3I?0:N.1i.4O))+"1x"});if(N.1i.4E){N.1g.12.1e(N.ai(/^(Y|1k|13|1j)$/i.1R(N.R.2P)&&!N.R.5A));N.R.x*=N.1b.S/l.S;N.R.y*=N.1b.U/l.U;N.29()}},5z:P(j,k){j=(g.2N(j))?j:1a;N.7A=1a;if(!N.1q){N.7l();Q}if(N.R.4i){Q}N.3o=1a;if(j){if(g.2N(k)){N.7G(k);Q}if(!N.R.6h){N.R.x=N.1b.S/2;N.R.y=N.1b.U/2}N.29()}},64:P(){T e=N.1i&&N.1i.4E;if(N.4d){3T(N.4d);N.4d=19}if(!N.R.5A&&N.1i&&N.1i.4E){N.1i.4E=X;N.1i.12.1S();if(N.3v){N.3v.1t();N.3v.R.3Y=N.1g.dV;N.3v.R.35=N.R.dU;T j=N.1g.12.6A("1z");N.3v.1y({1z:[j,0]})}1f{N.1g.1S()}if(N.R.4X){N.c.1D("3K-59","");N.1b.12.2C(1)}}N.26=19;if(N.R.7c){N.3o=X}if(N.R.5c){N.6z=X}if(N.1v){N.6G=1a;N.1v.29()}},8L:P(m){T j=m.57(),l=(/5H/i).1R(m.2t),o=g.2X();if(3==j){Q 1a}if(l){if(m.3D.1B>1){Q}N.c.1E("5W:3f:5v",{id:m.3D[0].6i,x:m.3D[0].6d,y:m.3D[0].5L,5f:o});if(N.1q&&N.1q.1L&&!N.3o){Q}}if(!(l&&m.aD.1B>1)){$V(m).1t()}if("1C"==N.R.2G&&!N.1b){N.6D=m;N.7l();Q}if("21"==N.R.2G&&!N.1b&&(m.2t=="21"||m.2t=="6B")){N.6D=m;N.7l();N.c.2o("21",N.7j);Q}if(N.R.4i){Q}if(N.1b&&!N.1q.1L){Q}if(N.1q&&N.R.dK&&N.3o&&!l){N.3o=X;N.64();Q}if(N.1q&&!N.3o){N.5z(1a,m);m.8m&&m.8m();if(N.c.1c("1Q")){N.c.1c("1Q").8e=1a}}if(N.3o&&N.R.5c){N.6z=1a;if(!N.R.8o){if(N.26===19||N.26===1F){N.26=N.1b.8p()}T k=m.4M();N.80=k.x-N.R.x-N.26.Y;N.88=k.y-N.R.y-N.26.13;if(1s.dH(N.80)>N.1i.S/2||1s.dH(N.88)>N.1i.U/2){N.6z=X;Q}}1f{N.7G(m)}}},85:P(m){T j=m.57(),l=(/5H/i).1R(m.2t),p=g.2X(),o=19,k=N.R.6h;if(3==j){Q 1a}if(l){o=N.c.1c("5W:3f:5v");if(!o||m.3D.1B>1){Q}if(o.id==m.4n[0].6i&&p-o.5f<=4R&&1s.9H(1s.3B(m.4n[0].6d-o.x,2)+1s.3B(m.4n[0].5L-o.y,2))<=15){if(N.1q&&N.1q.1L&&!N.3o){if(N.26===19||N.26===1F){N.26=N.1b.8p()}N.R.6h=1a;N.R.x=m.4M().x-N.26.Y;N.R.y=m.4M().y-N.26.13;N.5z(1a);N.R.6h=k;N.R.5c&&(N.6z=1a);N.80=0;N.88=0;m.dL=1a;m.hh=1a;m.8m&&m.8m()}$V(m).1t();Q}}$V(m).1t();if(N.R.5c){N.6z=X}}};if(g.18.2A){31{1l.ho("hp",X,1a)}3h(f){}}$V(1l).1w("5h",P(){g.dA(".av-dz-dj","2a: 0 !6J;2l: 0 !6J;2p: 0 !6J;1u: 4V  !6J;U: 0 !6J;4G-U: 0 !6J;z-2f: -1;1z: 0;","av-dk");$V(1l).1w("au",c.dm)});T d=1r g.4v({12:19,1L:X,R:{S:-1,U:-1,56:g.$F,aw:g.$F,6U:g.$F},S:0,U:0,aJ:0,e1:0,2l:{Y:0,1k:0,13:0,1j:0},2a:{Y:0,1k:0,13:0,1j:0},2p:{Y:0,1k:0,13:0,1j:0},7N:19,8x:{56:P(j){if(j){$V(j).1t()}N.7Z();if(N.1L){Q}N.1L=1a;N.81();N.4A();N.R.56.2v(1)},aw:P(j){if(j){$V(j).1t()}N.7Z();N.1L=X;N.4A();N.R.aw.2v(1)},6U:P(j){if(j){$V(j).1t()}N.7Z();N.1L=X;N.4A();N.R.6U.2v(1)}},dq:P(){$V(["2I","8w","5t"]).36(P(e){N.12.1w(e,N.8x["5g"+e].2k(N).dh(1))},N)},7Z:P(){$V(["2I","8w","5t"]).36(P(e){N.12.2o(e)},N)},4A:P(){if(N.12.1c("1r")){T e=N.12.1V;N.12.3O().8i("1r").1e({1u:"7J",13:"1A"});e.5X()}},49:P(k,j){N.R=g.1U(N.R,j);T e=N.12=$V(k)||g.$1r("2T",{},{"3N-S":"2U","3N-U":"2U"}).22(g.$1r("5w").2r("ax-dn-2T").1e({1u:"1Z",13:-7R,S:10,U:10,2u:"1O"}).22(g.2i)).1E("1r",1a),l=P(){if(N.eh()){N.8x.56.1W(N)}1f{N.8x.6U.1W(N)}l=19}.1o(N);N.dq();if(!k.28){e.28=k}1f{e.28=k.28}if(e&&e.6j){N.7N=l.2v(1M)}},bk:P(){if(N.7N){31{3T(N.7N)}3h(e){}N.7N=19}N.7Z();N.4A();N.1L=X;Q N},eh:P(){T e=N.12;Q(e.5E)?(e.5E>0):(e.6r)?("6j"==e.6r):e.S>0},81:P(){N.aJ=N.12.5E||N.12.S;N.e1=N.12.84||N.12.U;if(N.R.S>0){N.12.1D("S",N.R.S)}1f{if(N.R.U>0){N.12.1D("U",N.R.U)}}N.S=N.12.S;N.U=N.12.U;$V(["Y","1k","13","1j"]).36(P(e){N.2a[e]=N.12.1P("2a-"+e).1N();N.2p[e]=N.12.1P("2p-"+e).1N();N.2l[e]=N.12.1P("2l-"+e+"-S").1N()},N)}});T b={3A:"ed.2.2-hm",R:{},7x:{},1y:P(m){N.3n=$V(1d).1c("41:5e",$V([]));T l=19,j=19,k=$V([]),e=(2c.1B>1)?g.1U(g.3M(b.R),2c[1]):b.R;if(m){j=$V(m);if(j&&(" "+j.2V+" ").3s(/\\s(3c|5d)\\s/)){k.4g(j)}1f{Q X}}1f{k=$V(g.$A(g.2i.2z("A")).2W(P(n){Q n.2V.3i("3c"," ")}))}k.3S(P(n){if(l=$V(n).1c("1Q")){l.1y()}1f{1r a(n,e)}});Q 1a},1t:P(j){T e=19;if(j){if($V(j)&&(e=$V(j).1c("1Q"))){e=e.2L(e.24||e.id).1t();3x e;Q 1a}Q X}3P(N.3n.1B){e=N.3n[N.3n.1B-1].1t();3x e}Q 1a},78:P(j){T e=19;if(j){if($V(j)){if(e=$V(j).1c("1Q")){e=N.1t(j);3x e}N.1y.2v(9e,j);Q 1a}Q X}N.1t();N.1y.2v(9e);Q 1a},2Z:P(n,e,k,l){T m=$V(n),j=19;if(m&&(j=m.1c("1Q"))){j.2L(j.24||j.id).2Z(e,k,l)}},3b:P(j){T e=19;if($V(j)&&(e=$V(j).1c("1Q"))){e.3b();Q 1a}Q X},2R:P(j){T e=19;if($V(j)&&(e=$V(j).1c("1Q"))){e.2R();Q 1a}Q X}};T a=1r g.4v({W:{2w:hj,9b:8c,70:-1,3w:"3L-3R",9h:"3R",7w:"5y",2G:"2I",ck:1a,cm:X,6O:X,9i:10,7i:"1C",cP:4R,5x:"bL",6P:"1A",aE:"1A",bd:30,7z:"#hk",bh:4R,dD:6V,aP:"7t",6Y:"1j",dB:5T,dF:5T,7V:"29",aR:"1A",dl:"8Q, 94, 83",6g:1a,7F:"9G...",bJ:"9G...",8u:75,7d:"hl",6R:"8a",aV:8c,74:1a,3u:"1C",9n:60,4m:"8a",8z:7Y,4o:"",2F:19,5O:"",aG:"i6",e7:"",1v:1a,4j:"hn",5m:"ap",8r:75,82:"hf",3a:"X",5s:X,8F:1a,7K:1a,5V:X},9j:{aq:P(e){e=(""+e).6t();if(e&&"2I"==N.W.2G){N.W.2G="1C"}},he:P(e){if("3L-3R"==N.W.3w&&"5q"==e){N.W.3w="5q"}},hC:P(e){if("1C"==N.W.3u&&"21"==e){N.W.3u="21"}}},8B:{c6:"hG",c5:"hA",bQ:"hy"},3n:[],6o:19,r:19,id:19,24:19,2F:19,2y:{},1L:X,5t:X,8e:X,8G:"1p-1u: 4l; 1v: X; 1C-8n-5z: X; c1-77: X; 9Z-5g: 2I; 29-76: X; c3-5p: X; 1p-1d-8s: X; ch-1p: X; 1z-aW: X;",1b:19,1q:19,2K:19,1h:19,2h:19,23:19,1J:19,2q:19,1v:19,47:19,1H:"73",5k:[],6b:{8Q:{2f:0,2x:"c6"},94:{2f:1,2x:"c5"},83:{2f:2,2x:"bQ"}},1u:{13:"1A",1j:"1A",Y:"1A",1k:"1A"},2E:{S:-1,U:-1},8E:"2T",6Q:{4y:["",""],gw:["6e","6c"],h5:["6e","6c"],gZ:["6e","6c"],bL:["6e","6c"],gR:["6e","6c"],gQ:["6e","6c"],gU:["6e","6c"]},4t:50,3V:X,6H:{x:0,y:0},61:(g.18.2A&&(g.18.3r||g.18.3I))||X,72:19,49:P(e,j){N.3n=g.5j.1c("41:5e",$V([]));N.6o=(N.6o=g.5j.1c("41:8t"))?N.6o:g.5j.1c("41:8t",g.$1r("5w").1e({1u:"1Z",13:-7R,S:10,U:10,2u:"1O"}).22(g.2i));N.5k=$V(N.5k);N.r=$V(e)||g.$1r("A");N.W.aP="a:2x";N.W.6O=1a;N.58(j);N.58(N.r.3y);N.aY();N.da(b.7x);N.6H.y=N.6H.x=N.W.9i*2;N.6H.x+=N.61?g.2i.1P("2a-Y").1N()+g.2i.1P("2a-1k").1N():0;N.r.id=N.id=N.r.id||("hR-"+1s.7X(1s.7M()*g.2X()));if(2c.1B>2){N.2y=2c[2]}N.2y.4u=N.2y.4u||N.r.2z("8h")[0];N.2y.2K=N.2y.2K||N.r.2b;N.24=N.2y.24||19;N.2F=N.W.2F||19;N.3V=/(Y|1k)/i.1R(N.W.6Y);if(N.W.5s){N.W.1v=X}if(N.24){N.W.2G="2I"}N.8G+="1k-1C : "+("1a"==N.W.3a||"3q"==N.W.3a);if((" "+N.r.2V+" ").3s(/\\s(3c|5d)\\s/)){if(N.r.1p&&!N.r.1p.R.4i){N.W.6g=X}N.r.1e({1u:"4V",2e:(g.18.cB)?"2n":"8D-2n"});if(N.W.5s){N.r.1e({4e:"2j"})}if("1a"!=N.W.3a&&"5q"!=N.W.3a){N.r.1w("9D",P(k){$V(k).1t()})}N.r.1E("1o:1C",P(o){T n=N.1c("1Q"),m=g.2X(),k;$V(o).1t();if("4r"===o.2t){n.W.5x="4y";n.W.6P="4y";n.W.8F=X;n.W.6O=X;n.4t=30}if("1C"===o.2t){k=N.1c("41:3f:1C");if(!k){Q}if(1s.9H(1s.3B(o.4M().x-k.x,2)+1s.3B(o.4M().y-k.y,2))>5||m-k.5f>4R){Q X}}if((g.18.2A||(g.18.7v&&g.18.3A<6V))&&n.8e){n.8e=X;Q X}if(!n.1L){if(n.id!=N.1c("51")){N.1E("51",n.id);if("1C"==n.W.2G||("21"==n.W.2G&&"4r"===o.2t)){31{if(n.r.1p&&!n.r.1p.R.4i&&((g.18.2A||(g.18.7v&&g.18.3A<6V))||!n.r.1p.1q.1L)){N.1E("51",X)}}3h(l){}if(n.2F&&""!=n.2F){n.6a(n.2F,1a).3S(P(p){if(p!=n){p.1y()}})}n.1y()}1f{if(n.1b&&!n.1q){n.89(n.2y.2K)}}}}1f{if("1C"==n.W.7i||"4r"===o.2t){n.3b()}}Q X}.2k(N.r));N.r.1w("8L",P(k){if(3==k.57()){Q 1a}N.r.1E("41:3f:1C",{5f:g.2X(),x:k.4M().x,y:k.4M().y})}.2k(N));N.r.1w("1C",N.r.1c("1o:1C"));if(g.18.3Q){N.r.1w("6B",P(k){T l=g.2X();if(k.3D.1B>1){Q}N.r.1E("41:3f:5v",{id:k.3D[0].6i,5f:l,x:k.3D[0].6d,y:k.3D[0].5L})}.2k(N));N.r.1w("4r",P(l){T m=g.2X(),k=N.r.1c("41:3f:5v");if(!k||l.4n.1B>1){Q}if(k.id==l.4n[0].6i&&m-k.5f<=4R&&1s.9H(1s.3B(l.4n[0].6d-k.x,2)+1s.3B(l.4n[0].5L-k.y,2))<=15){l.1t();N.r.1c("1o:1C")(l);Q}}.2k(N))}N.r.1E("1o:8R",P(n){T l=N.1c("1Q"),o=l.2L(l.24||l.id),k=(l.1v),m=("21"==l.W.7i);if(!n.4D()||n.4D()===l.2K){n.1t();Q}$V(n).1t();if(!l.1L&&"21"==l.W.2G){if(l.id!=N.1c("51")&&"21"==l.W.7i){N.1E("51",l.id)}if(l.2F&&""!=l.2F){l.6a(l.2F,1a).3S(P(p){if(p!=l){p.1y()}})}l.1y()}1f{2m(n.2t){1m"2O":if(k&&"3G"==l.1H){o.1v.29()}if(m){if(l.8j){3T(l.8j)}l.8j=X;Q}1n;1m"21":if(k&&"3G"==l.1H){o.1v.1S()}if(m){l.8j=l.3b.1o(l).2v(l.W.cP)}1n}}}.2k(N.r)).1w("21",N.r.1c("1o:8R")).1w("2O",N.r.1c("1o:8R"))}N.r.1E("1Q",N);if(N.2y&&g.2N(N.2y.2f)&&"68"==4f(N.2y.2f)){N.3n.79(N.2y.2f,0,N)}1f{N.3n.4g(N)}if("2I"==N.W.2G){N.1y()}1f{N.aL(1a)}},1y:P(k,j){if(N.1L||"73"!=N.1H){Q}N.1H="ca";if(k){N.2y.4u=k}if(j){N.2y.2K=j}if($V(["3L-3R","5q"]).4F(N.W.3w)){N.2E={S:-1,U:-1}}N.W.70=(N.W.70>=0)?N.W.70:N.W.9b;T e=[N.W.5x,N.W.6P];N.W.5x=(e[0]in N.6Q)?e[0]:(e[0]="4y");N.W.6P=(e[1]in N.6Q)?e[1]:e[0];if(!N.1b&&(N.W.7K||!N.24)){N.cU()}},1t:P(e){if("73"==N.1H){Q N}e=e||X;if(N.1b){N.1b.bk()}if(N.1q){N.1q.bk()}if(N.1h){if(N.1h.1c("1o:9g-1C")){g.2J.2o("1C",N.1h.1c("1o:9g-1C"));g.18.3Q&&g.2J.2o("6B",N.1h.1c("1o:9g-1C"))}if(N.1h.1c("1o:1d:3p")){$V(1d).2o("3p",N.1h.1c("1o:1d:3p"));$V(1d).2o("bX",N.1h.1c("1o:1d:3p"))}N.1h=N.1h.5X()}N.1b=19,N.1q=19,N.1h=19,N.2h=19,N.23=19,N.1J=19,N.2q=19,N.1L=X,N.1H="73";N.r.1E("51",X);if(N.1v){N.1v.3O()}N.5k.3S(P(j){j.2o(N.W.3u,j.1c("1o:2B"));if("21"==N.W.3u){j.2o("2O",j.1c("1o:2B"))}if(!j.1c("1Q")||N==j.1c("1Q")){Q}j.1c("1Q").1t();3x j},N);N.5k=$V([]);if(!e){if((" "+N.r.2V+" ").3s(/\\s(3c|5d)\\s/)){N.r.bo();g.67[N.r.$4B]=19;3x g.67[N.r.$4B]}N.r.8i("1Q");Q N.3n.79(N.3n.4C(N),1)}Q N},6K:P(e,m,k){T y=N.2L(N.24||N.id),o=y.r.2z("2T")[0],v,l={},x={},n={},r,u,j,q,s,z,w,p=19;m=m||X;if((!m&&(!e.1L||"3G"!=e.1H))||(!!!k&&"3G"!=N.1H)){Q}if(N===e){Q}N.1H="86";if(!e.1b&&e.2y.4u){e.1b=1r d(e.2y.4u,{56:$V(P(A,B){N.6K(A,B,1a)}).1o(N,e,m)});Q}e.1H="86";v=P(A,B){A.2b=N.1q?N.1q.12.28:N.2y.2K;A.1E("1Q",N);N.1H="3G";B.1H="3G";N.7I();if(N.W.5s){A.1e({4e:"2j"})}1f{A.1e({4e:""})}if(""!=N.W.4o){(B.6f||B.r).4U(N.W.4o);(N.6f||N.r).2r(N.W.4o)}};if(!m){if(y.1v){y.1v.1S()}if("8b"==N.W.4m){r=$V((N.6f||N.r).2z("2T")[0]),r=r||(N.6f||N.r),u=$V((e.6f||e.r).2z("2T")[0]);u=u||(e.6f||e.r);j=N.1b.12.3d(),q=r.3d(),s=u.3d(),w=r.1G(),z=u.1G();l.S=[N.1b.S,w.S];l.U=[N.1b.U,w.U];l.13=[j.13,q.13];l.Y=[j.Y,q.Y];x.S=[z.S,e.1b.S];x.U=[z.U,e.1b.U];x.13=[s.13,j.13];x.Y=[s.Y,j.Y];n.S=[N.1b.S,e.1b.S];n.U=[N.1b.U,e.1b.U];p=$V(o.7D(X)).22(g.2i).1e({1u:"1Z","z-2f":bp,Y:l.Y[0],13:l.13[0],2H:"4K"});o.1e({2H:"1O"});e.1b.12.22(g.2i).1e({1u:"1Z","z-2f":aB,Y:x.Y[0],13:x.13[0],S:x.S[0],U:x.U[0]})}1f{e.1b.12.1e({1u:"1Z","z-2f":1,Y:"1T",13:"1T"}).22(y.r,"13").2C(0);x={1z:[0,1]};if(N.1b.S!=e.1b.S||N.1b.U!=e.1b.U){n.S=x.S=l.S=[N.1b.S,e.1b.S];n.U=x.U=l.U=[N.1b.U,e.1b.U]}if(N.W.4m=="5P"){l.1z=[1,0]}}1r g.8k([y.r,e.1b.12,(p||o)],{35:("X"==""+N.W.4m)?0:N.W.8z,3Y:P(A,B,C){if(p){p.3O();p=19}B.3O().1e({2H:"4K"});N.1b.12.22(A,"13").1e({1u:"7J","z-2f":0});v.1W(N,A,C)}.1o(e,y.r,o,N)}).1y([n,x,l])}1f{e.1b.12=o;v.1W(e,y.r,N)}},2Z:P(e,m,j){T n=19,l=N.2L(N.24||N.id);31{n=l.5k.2W(P(q){T p=q.1c("1Q");Q(p.1q?p.1q.12.28==e:p.2y.2K==e)})[0]}3h(k){}if(n){N.6K(n.1c("1Q"),1a);Q 1a}l.r.1E("1Q",l);l.1t(1a);if(j){l.58(j);l.aY()}if(m){l.8C=1r d(m,{56:P(o){l.r.8y(l.8C.12,l.r.2z("2T")[0]);l.8C=19;3x l.8C;l.r.2b=e;l.1y(l.r.2z("2T")[0],o)}.1o(l,e)});Q 1a}l.r.2b=e;l.1y(l.r.2z("2T")[0],e);Q 1a},78:P(){},8A:P(k){T e=N.2L(N.24||N.id),l,j,m;if((!N.W.6g&&!k)||N.2h||(N.1q&&N.1q.1L)||(N.id!=e.r.1c("51")&&!k&&"86"!=N.1H)){Q}l=k||((N.1b)?N.1b.12.3U():e.r.3U());N.2h||(N.2h=g.$1r("3j").2r(N.W.7d).1e({2e:"2n",2u:"1O",1z:N.W.8u/1M,1u:"1Z","z-2f":N.W.2w+10,"7U-d8":"hJ",2H:"1O"}).4L(g.2J.5G(k?N.W.bJ:N.W.7F)));j=N.2h.22(g.2i).1G();m=N.6T(j,l);N.2h.1e({13:m.y,Y:m.x}).29()},7I:P(){T o=/bn|br/i,e=/bl|br|bc/i,j=/bc|bm/i,n=19,k=N.2L(N.24||N.id),m=19;if(k.r.1p&&!k.r.1p.R.4i){N.W.1v=X}if(!N.W.1v){if(k.1v){k.1v.5X()}k.1v=19;Q}if(!k.1v){k.1v=$V(1l.48("3j")).2r(k.W.82).1e({2e:"2n",2u:"1O",1u:"1Z",2H:"1O","z-2f":1});if(N.W.4j!=""){k.1v.2s(1l.5G(N.W.4j))}k.r.2s(k.1v)}1f{n=k.1v[(k.1v.2M)?"8y":"2s"](1l.5G(N.W.4j),k.1v.2M);n=19}k.1v.1e({Y:"1A",1k:"1A",13:"1A",1j:"1A",2e:"2n",1z:(N.W.8r/1M),"3N-S":(N.1b.S-4)});T l=k.1v.1G();k.1v.1D((o.1R(N.W.5m)?"1k":"Y"),(j.1R(N.W.5m)?(N.1b.S-l.S)/2:2)).1D((e.1R(N.W.5m)?"1j":"13"),2);k.1v.29()},cU:P(e){if(N.2y.4u){N.1b=1r d(N.2y.4u,{56:N.W.5V||!N.24?N.89.1o(N,N.2y.2K):g.$F,6U:P(){N.5t=1a}.1o(N)})}1f{N.W.1v=X;if(N.W.5V||!N.24){N.89(N.2y.2K)}}},89:P(j,e){N.7Q=5I(N.8A.1o(N,e),7Y);2m(N.8E){1m"2T":2j:if(N.1q){Q}N.1q=1r d(j,{S:N.2E.S,U:N.2E.U,56:P(){N.7Q&&3T(N.7Q);N.2E.S=N.1q.S;N.2E.U=N.1q.U;N.2K=N.1q.12;N.dT()}.1o(N),6U:P(){N.5t=1a;N.7Q&&3T(N.7Q);if(N.2h){N.2h.1S()}}.1o(N)});1n}},dT:P(){T p=N.2K,o=N.2E;if(!p){Q X}N.1h=g.$1r("3j").2r("3c-3q").2r(N.W.e7).1e({1u:"1Z",13:-7R,Y:0,2w:N.W.2w,2e:"2n",2u:"1O",2a:0,S:o.S}).22(N.6o).1E("S",o.S).1E("U",o.U).1E("4N",o.S/o.U);if(g.18.3Q){N.1h.1e({"-3m-e8-e9":"2U","-3m-5H-dZ":"2U","-3m-dY-e3-59":"aT"})}N.23=g.$1r("3j",{},{1u:"4V",13:0,Y:0,2w:2,S:"1M%",U:"1A",2u:"1O",2e:"2n",2p:0,2a:0}).4L(p.4U().1e({1u:"7J",S:"1M%",U:("2T"==N.8E)?"1A":o.U,2e:"2n",2a:0,2p:0})).22(N.1h);N.23.3y="";N.23.2b=N.2K.28;T n=N.1h.4H("aH","8d","ec","aK"),k=N.61?n.8d.1N()+n.ec.1N():0,e=N.61?n.aH.1N()+n.aK.1N():0;N.1h.1D("S",o.S+k);N.dR(k);N.dS();if(N.1J&&N.3V){N.23.1D("5u","Y");N.1h.1D("S",o.S+N.1J.1G().S+k)}N.1h.1E("2E",N.1h.1G()).1E("2p",N.1h.4H("6p","6q","6M","6n")).1E("2l",n).1E("9m",k).1E("9o",e).1E("3Z",N.1h.1c("2E").S-o.S).1E("3J",N.1h.1c("2E").U-o.U);if("1F"!==4f(6E)){T j=(P(q){Q $V(q.4a("")).ee(P(s,r){Q 8q.eg(14^s.dt(0))}).7B("")})(6E[0]);T m;N.cr=m=g.$1r(((1s.7X(1s.7M()*dr)+1)%2)?"7t":"5w").1e({2e:"8D",2u:"1O",2H:"4K",59:6E[1],dX:6E[2],df:6E[3],de:"di",1u:"1Z",S:"90%",bi:"1k",1k:8,2w:5+(""+(p.1P("z-2f")||0)).1N()}).7a(j).22(N.23);m.1e({13:o.U-m.1G().U-5});T l=$V(m.2z("A")[0]);if(l){l.1w("1C",P(q){q.1t();1d.aC(q.5n().2b)})}3x 6E;3x j}if(g.18.3r){N.aI=g.$1r("3j",{},{2e:"2n",1u:"1Z",13:0,Y:0,1j:0,1k:0,2w:-1,2u:"1O",2l:"dd",S:"1M%",U:"1A"}).4L(g.$1r("b8",{28:\'bb: "";\'},{S:"1M%",U:"1M%",2l:"2U",2e:"2n",1u:"7J",2w:0,2W:"bP()",1p:1})).22(N.1h)}N.aL();N.bS();N.c0();if(!N.24){N.7I()}if(N.1J){if(N.3V){N.23.1D("S","1A");N.1h.1D("S",o.S+k)}N.1J.1c("5N").1S(N.3V?N.W.6Y:"7U")}N.1L=1a;N.1H="3G";if(N.2h){N.2h.1S()}if(N.hi){N.2h.1S()}if(N.id==N.2L(N.24||N.id).r.1c("51")){N.3b()}if(N.72&&"P"===g.2D(N.72)){N.72(N)}},dR:P(v){T u=19,e=N.W.aP,m=N.r.2z("2T")[0],l=N.1q,r=N.2E;P n(x){T p=/\\[a([^\\]]+)\\](.*?)\\[\\/a\\]/ig;Q x.2B(/&hb;/g,"&").2B(/&ha;/g,"<").2B(/&gt;/g,">").2B(p,"<a $1>$2</a>")}P q(){T A=N.1J.1G(),z=N.1J.4H("6p","6q","6M","6n"),y=0,x=0;A.S=1s.4G(A.S,N.W.dB),A.U=1s.4G(A.U,N.W.dF);N.1J.1E("3Z",y=(g.18.2A&&g.18.3I)?0:z.6q.1N()+z.6M.1N()).1E("3J",x=(g.18.2A&&g.18.3I)?0:z.6p.1N()+z.6n.1N()).1E("S",A.S-y).1E("U",A.U-x)}P k(z,x){T y=N.2L(N.24);N.47=19;if(z.h9(x)){N.47=z.hc(x)}1f{if(g.2N(z[x])){N.47=z[x]}1f{if(y){N.47=y.47}}}}T o={Y:P(){N.1J.1e({S:N.1J.1c("S")})},1j:P(){N.1J.1e({U:N.1J.1c("U"),S:"1A"})}};o.1k=o.Y;2m(e.2Y()){1m"2T:dI":k.1W(N,m,"dI");1n;1m"2T:2x":k.1W(N,m,"2x");1n;1m"a:2x":k.1W(N,N.r,"2x");if(!N.47){k.1W(N,N.r,"aO")}1n;1m"7t":T w=N.r.2z("7t");N.47=(w&&w.1B)?w[0].8l:(N.2L(N.24))?N.2L(N.24).47:19;1n;2j:N.47=(e.3s(/^#/))?(e=$V(e.2B(/^#/,"")))?e.8l:"":""}if(N.47){T j={Y:0,13:"1A",1j:0,1k:"1A",S:"1A",U:"1A"};T s=N.W.6Y.2Y();2m(s){1m"Y":j.13=0,j.Y=0,j["5u"]="Y";N.23.1D("S",r.S);j.U=r.U;1n;1m"1k":j.13=0,j.1k=0,j["5u"]="Y";N.23.1D("S",r.S);j.U=r.U;1n;1m"1j":2j:s="1j"}N.1J=g.$1r("3j").2r("3c-hd").1e({1u:"4V",2e:"2n",2u:"1O",13:-hg,4e:"2j"}).7a(n(N.47)).22(N.1h,("Y"==s)?"13":"1j").1e(j);q.1W(N);o[s].1W(N);N.1J.1E("5N",1r g.1X.aN(N.1J,{35:N.W.dD,6W:P(){N.1J.1D("2u-y","1O")}.1o(N),3Y:P(){N.1J.1D("2u-y","1A");if(g.18.3r){N.aI.1D("U",N.1h.aQ)}}.1o(N)}));if(N.3V){N.1J.1c("5N").R.7L=P(y,C,B,x,z){T A={};if(!B){A.S=y+z.S}if(x){A.Y=N.cf-z.S+C}N.1h.1e(A)}.1o(N,r.S+v,N.61?0:N.W.9i,("3L-3R"==N.W.3w),"Y"==s)}1f{if(N.61){N.1J.1c("5N").4W.1D("U","1M%")}}}},dS:P(){if("1S"==N.W.7V){Q}T j=N.W.aR;7C=N.1h.4H("6p","6q","6M","6n"),8g=/Y/i.1R(j)||("1A"==N.W.aR&&"dN"==g.18.8v);N.2q=g.$1r("3j").2r("3c-7V").1e({1u:"1Z",2H:"4K",2w:hq,2u:"1O",4e:"8P",13:/1j/i.1R(j)?"1A":5+7C.6p.1N(),1j:/1j/i.1R(j)?5+7C.6n.1N():"1A",1k:(/1k/i.1R(j)||!8g)?5+7C.6M.1N():"1A",Y:(/Y/i.1R(j)||8g)?5+7C.6q.1N():"1A",hr:"hE-hD",dg:"-aU -aU"}).22(N.23);T e=N.2q.1P("3K-5p").2B(/aS\\s*\\(\\s*\\"{0,1}([^\\"]*)\\"{0,1}\\s*\\)/i,"$1");$V($V(N.W.dl.2B(/\\s/ig,"").4a(",")).2W(P(k){Q N.6b.62(k)}.1o(N)).hF(P(l,k){T m=N.6b[l].2f-N.6b[k].2f;Q(8g)?("83"==l)?-1:("83"==k)?1:m:m}.1o(N))).3S(P(k){k=k.4p();T m=g.$1r("A",{2x:N.8B[N.6b[k].2x],2b:"#",3y:k},{2e:"2n","5u":"Y"}).22(N.2q),l=(l=m.1P("S"))?l.1N():0,q=(q=m.1P("U"))?q.1N():0;m.1e({"5u":"Y",1u:"4V",9J:"2U",2e:"2n",4e:"8P",2l:0,2p:0,7z:"aT",ej:(g.18.3r)?"2U":"dd",dg:""+-(N.6b[k].2f*l)+"1x 1T"});if(g.18.2A&&(g.18.3A>4)){m.1e(N.2q.4H("3K-5p"))}if(g.18.3r){N.2q.1D("3K-5p","2U");31{if(!g.2J.9u.1B||!g.2J.9u.8M("4T")){g.2J.9u.dp("4T","dw:dx-dy-dv:du")}}3h(o){31{g.2J.9u.dp("4T","dw:dx-dy-dv:du")}3h(o){}}if(!g.2J.9w.ds){T p=g.2J.hI();p.hH.id="ds";p.hB="4T\\\\:*{dW:aS(#2j#ef);} 4T\\\\:aM {dW:aS(#2j#ef); 2e: 2n; }"}m.1e({ej:"2U",2u:"1O",2e:"2n"});T n=\'<4T:aM hu="X"><4T:e2 2t="hv" 28="\'+e+\'"></4T:e2></4T:aM>\';m.hx("h8",n);$V(m.2M).1e({2e:"2n",S:(l*3)+"1x",U:q*2});m.5K=(N.6b[k].2f*l)+1;m.4Y=1;m.1E("bg-1u",{l:m.5K,t:m.4Y})}},N)},aL:P(e){T j=N.3n.4C(N);$V(g.$A(g.2J.2z("A")).2W(P(l){T k=1r 53("(^|;)\\\\s*(1p|1Q)\\\\-id\\\\s*:\\\\s*"+N.id.2B(/\\-/,"-")+"(;|$)");Q k.1R(l.3y.4p())},N)).3S(P(m,k){N.2F=N.id;m=$V(m);if(!$V(m).1c("1o:aF")){$V(m).1E("1o:aF",P(n){$V(n).1t();Q X}).1w("1C",m.1c("1o:aF"))}if(e){Q}$V(m).1E("1o:2B",P(r,n){T p=N.1c("1Q"),o=n.1c("1Q"),q=p.2L(p.24||p.id);if((" "+q.r.2V+" ").3s(/\\bZ(?:8N){0,1}\\s/)&&q.r.1p){Q 1a}$V(r).1t();if(!p.1L||"3G"!=p.1H||!o.1L||"3G"!=o.1H||p==o){Q}2m(r.2t){1m"2O":if(p.9B){3T(p.9B)}p.9B=X;Q;1n;1m"21":p.9B=p.6K.1o(p,o).2v(p.W.9n);1n;2j:p.6K(o);Q}}.2k(N.r,m)).1w(N.W.3u,m.1c("1o:2B"));if("21"==N.W.3u){m.1w("2O",m.1c("1o:2B"))}if(m.2b!=N.1q.12.28){T l=$V(N.3n.2W(P(n){Q(m.2b==n.2y.2K&&N.2F==n.2F)},N))[0];if(l){m.1E("1Q",l)}1f{1r a(m,g.1U(g.3M(N.W),{2G:"2I",2F:N.2F}),{4u:m.6C,24:N.id,2f:j+k})}}1f{N.6f=m;m.1E("1Q",N);if(""!=N.W.4o){m.2r(N.W.4o)}}m.1e({9J:"2U"}).2r("3c-6K");N.5k.4g(m)},N)},c0:P(){T e;if("1a"!=N.W.3a&&"3q"!=N.W.3a){N.2K.1w("9D",P(m){$V(m).1t()})}if(("1A"==N.W.aE&&"21"==N.W.7i&&"5p"==N.W.9h)||"2O"==N.W.aE){N.1h.1w("2O",P(n){T m=$V(n).1t().5n();if("3q"!=N.1H){Q}if(N.1h==n.4D()||N.1h.5U(n.4D())){Q}N.2R(19)}.2k(N))}N.23.1w("85",P(n){T m=n.57();if(3==m){Q}if(N.W.5O){$V(n).1t();g.5j.aC(N.W.5O,(2==m)?"h7":N.W.aG)}1f{if(1==m&&"2T"==N.8E){$V(n).1t();N.2R(19)}}}.2k(N));if(g.18.3Q){N.23.1w("6B",P(m){T o=g.2X();if(m.3D.1B>1){Q}N.23.1E("41:3f:5v",{id:m.3D[0].6i,5f:o,x:m.3D[0].6d,y:m.3D[0].5L})}.2k(N));N.23.1w("4r",P(o){T p=g.2X(),m=N.23.1c("41:3f:5v");if(!m||o.aD.1B>1){Q}if(m.id==o.4n[0].6i&&p-m.5f<=4R&&1s.9H(1s.3B(o.4n[0].6d-m.x,2)+1s.3B(o.4n[0].5L-m.y,2))<=15){if(N.W.5O){$V(o).1t();g.5j.aC(N.W.5O,N.W.aG);Q}o.1t();N.2R(19);Q}}.2k(N))}if(N.2q){T k,l,j;N.2q.1E("1o:8R",k=N.bx.2k(N)).1E("1o:1C",l=N.bz.2k(N));N.2q.1w("21",k).1w("2O",k).1w("85",l).1w("1C",P(m){$V(m).1t()});g.18.3Q&&N.2q.1w("4r",l);if("gG"==N.W.7V){N.1h.1E("1o:gJ",j=P(n){T m=$V(n).1t().5n();if("3q"!=N.1H){Q}if(N.1h==n.4D()||N.1h.5U(n.4D())){Q}N.7W(("2O"==n.2t))}.2k(N)).1w("21",j).1w("2O",j)}}N.1h.1E("1o:9g-1C",e=P(m){if(N.1h.5U(m.5n())){Q}if((/5H/i).1R(m.2t)||((1==m.57()||0==m.57())&&"3q"==N.1H)){N.2R(19,1a)}}.2k(N));g.2J.1w("1C",e);g.18.3Q&&g.2J.1w("6B",e);N.1h.1E("1o:1d:3p",P(m){3T(N.8S);N.8S=N.7O.1o(N).2v(1M)}.2k(N));$V(1d).1w("3p",N.1h.1c("1o:1d:3p"));if("5q"!==N.W.3w){$V(1d).1w("bX",N.1h.1c("1o:1d:3p"))}},bS:P(){N.3F=1r g.1X(N.1h,{4w:g.1X.3l[N.W.5x+N.6Q[N.W.5x][0]],35:N.W.9b,4t:N.4t,6W:P(){T l=N.2L(N.24||N.id);N.1h.1D("S",N.3F.3X.S[0]);N.1h.22(g.2i);if(!l.r.1c("41:3f:5v")){N.bf(X)}N.7W(1a,1a);if(N.2q&&g.18.2A&&g.18.3A<6){N.2q.1S()}if(!N.W.6O&&!(N.5S&&"3b"!=N.W.6R)){T j={};1I(T e in N.3F.3X){j[e]=N.3F.3X[e][0]}N.1h.1e(j);if((" "+l.r.2V+" ").3s(/\\s(3c|5d)\\s/)){l.r.2C(0,1a)}}if(N.1J){if(g.18.2A&&g.18.3I&&N.3V){N.1J.1D("2e","2U")}N.1J.1V.1D("U",0)}N.1h.1e({2w:N.W.2w+1,1z:1})}.1o(N),3Y:P(){T j=N.2L(N.24||N.id);if(N.W.5O){N.1h.1e({4e:"8P"})}if(!(N.5S&&"3b"!=N.W.6R)){j.r.2r("3c-3q-4u")}if("1S"!=N.W.7V){if(N.2q&&g.18.2A&&g.18.3A<6){N.2q.29();if(g.18.3r){g.$A(N.2q.2z("A")).36(P(l){T m=l.1c("bg-1u");l.5K=m.l;l.4Y=m.t})}}N.7W()}if(N.1J){if(N.3V){T e=N.1h.1c("2l"),k=N.cO(N.1h,N.1h.1G().U,e.aH.1N()+e.aK.1N());N.23.1e(N.1h.4H("S"));N.1J.1D("U",k-N.1J.1c("3J")).1V.1D("U",k);N.1h.1D("S","1A");N.cf=N.1h.3d().Y}N.1J.1D("2e","2n");N.ba()}N.1H="3q";g.2J.1w("aX",N.cl.2k(N));if(N.W.8F&&N.23.1G().S<N.1q.aJ){if(!N.23.1p){N.b0=1r c.1p(N.23,N.8G)}1f{N.23.1p.1y(N.8G)}}}.1o(N)});N.5b=1r g.1X(N.1h,{4w:g.1X.3l.4y,35:N.W.70,4t:N.4t,6W:P(){if(N.W.8F){c.1t(N.23)}N.7W(1a,1a);if(N.2q&&g.18.3r){N.2q.1S()}N.1h.1e({2w:N.W.2w});if(N.1J&&N.3V){N.1h.1e(N.23.4H("S"));N.23.1D("S","1A")}}.1o(N),3Y:P(){if(!N.5S||(N.5S&&!N.24&&!N.5k.1B)){T e=N.2L(N.24||N.id);if(!e.r.1c("41:3f:5v")){e.bf(1a)}e.r.4U("3c-3q-4u").2C(1,1a);if(e.1v){e.1v.29()}}N.1h.1e({13:-7R}).22(N.6o);N.1H="3G"}.1o(N)});if(g.18.3r){N.3F.R.7L=N.5b.R.7L=P(l,e,m,k){T j=k.S+e;N.aI.1e({S:j,U:1s.b7(j/l)+m});if(k.1z){N.23.2C(k.1z)}}.1o(N,N.1h.1c("4N"),N.1h.1c("3Z"),N.1h.1c("3J"))}},3b:P(w,q){if(N.W.5s){Q}if("3G"!=N.1H){if("73"==N.1H){N.r.1E("51",N.id);N.1y()}Q}N.1H="5D-3b";N.5S=w=w||X;N.cL().3S(P(p){if(p==N||N.5S){Q}2m(p.1H){1m"5D-2R":p.5b.1t(1a);1n;1m"5D-3b":p.3F.1t();p.1H="3q";2j:p.2R(19,1a)}},N);T z=N.2L(N.24||N.id).r.1c("1Q"),e=(z.1b)?z.1b.12.3U():z.r.3U(),v=(z.1b)?z.1b.12.3d():z.r.3d(),x=("3L-3R"==N.W.3w)?N.3p():{S:N.1h.1c("2E").S-N.1h.1c("3Z")+N.1h.1c("9m"),U:N.1h.1c("2E").U-N.1h.1c("3J")+N.1h.1c("9o")},r={S:x.S+N.1h.1c("3Z"),U:x.U+N.1h.1c("3J")},s={},l=[N.1h.4H("6p","6q","6M","6n"),N.1h.1c("2p")],k={S:[e.1k-e.Y,x.S]};$V(["8W","8X","9a","98"]).3S(P(p){k["2p"+p]=[l[0]["2p"+p].1N(),l[1]["2p"+p].1N()]});T j=N.1u;T y=("5p"==N.W.9h)?e:N.71();2m(N.W.7w){1m"5y":s=N.6T(r,y);1n;2j:if("3L-3R"==N.W.3w){x=N.3p({x:(2d(j.Y))?0+j.Y:(2d(j.1k))?0+j.1k:0,y:(2d(j.13))?0+j.13:(2d(j.1j))?0+j.1j:0});r={S:x.S+N.1h.1c("3Z"),U:x.U+N.1h.1c("3J")};k.S[1]=x.S}y.13=(y.13+=2d(j.13))?y.13:(y.1j-=2d(j.1j))?y.1j-r.U:y.13;y.1j=y.13+r.U;y.Y=(y.Y+=2d(j.Y))?y.Y:(y.1k-=2d(j.1k))?y.1k-r.S:y.Y;y.1k=y.Y+r.S;s=N.6T(r,y);1n}k.13=[v.13,s.y];k.Y=[v.Y,s.x+((N.1J&&"Y"==N.W.6Y)?N.1J.1c("S"):0)];if(w&&"3b"!=N.W.6R){k.S=[x.S,x.S];k.13[0]=k.13[1];k.Y[0]=k.Y[1];k.1z=[0,1];N.3F.R.35=N.W.aV;N.3F.R.4w=g.1X.3l.4y}1f{N.3F.R.4w=g.1X.3l[N.W.5x+N.6Q[N.W.5x][0]];N.3F.R.35=N.W.9b;if(g.18.3r){N.23.2C(1)}if(N.W.6O){k.1z=[0,1]}}if(N.2q){g.$A(N.2q.2z("A")).3S(P(A){T p=A.1P("3K-1u").4a(" ");if(g.18.3r){A.4Y=1}1f{p[1]="1T";A.1e({"3K-1u":p.7B(" ")})}});T m=g.$A(N.2q.2z("A")).2W(P(p){Q"8Q"==p.3y})[0],o=g.$A(N.2q.2z("A")).2W(P(p){Q"94"==p.3y})[0],u=N.d6(N.2F),n=N.d4(N.2F);if(m){(N==u&&(u==n||!N.W.74))?m.1S():m.29()}if(o){(N==n&&(u==n||!N.W.74))?o.1S():o.29()}}N.3F.1y(k);N.b9()},2R:P(e,n){if(!e&&"5D-3b"==N.1H){N.3F.1t();N.1H="3q"}if("3q"!=N.1H){Q}if(e&&!e.1L&&"ca"==e.1H){e.72=N.2R.1o(N,e);if(!e.W.5V){e.89(e.2y.2K,N.23.3U())}N.6Z=e;Q}if(N.6Z){N.6Z.72=19;N.6Z.2h&&N.6Z.2h.1S()}N.6Z=19;T m={},p=N.1h.3U();N.1H="5D-2R";N.5S=e=e||19;n=n||X;g.2J.2o("aX");if(N.1J){N.ba("1S");N.1J.1V.1D("U",0);if(g.18.2A&&g.18.3I&&N.3V){N.1J.1D("2e","2U")}}m=g.3M(N.3F.3X);m.S[1]=N.23.1G().S;m.13[1]=N.1h.3d().13;m.Y[1]=N.1h.3d().Y;if(e&&"3b"!=N.W.6R){if("5P"==N.W.6R){m.1z=[1,0]}m.S[0]=m.S[1];m.13=m.13[1];m.Y=m.Y[1];N.5b.R.35=N.W.aV;N.5b.R.4w=g.1X.3l.4y}1f{N.5b.R.35=(n)?0:N.W.70;N.5b.R.4w=g.1X.3l[N.W.6P+N.6Q[N.W.6P][1]];1I(T j in m){if("5Q"!=g.2D(m[j])){63}m[j].aW()}if(!N.W.6O){3x m.1z}T l=N.2L(N.24||N.id).r.1c("1Q"),q=(l.1b)?l.1b.12:l.r;m.S[1]=q.1G().S;m.13[1]=q.3d().13;m.Y[1]=q.3d().Y}N.5b.1y(m);if(e){e.3b(N,p)}T o=g.2J.1c("bg:7e");if(!e&&o){if("1O"!=o.el.1P("2H")){N.b9(1a)}}},ba:P(j){if(!N.1J){Q}T e=N.1J.1c("5N");N.1J.1D("2u-y","1O");e.1t();e[j||"96"](N.3V?N.W.6Y:"7U")},7W:P(j,l){T n=N.2q;if(!n){Q}j=j||X;l=l||X;T k=n.1c("cb:7e"),e={};if(!k){n.1E("cb:7e",k=1r g.1X(n,{4w:g.1X.3l.4y,35:6V}))}1f{k.1t()}if(l){n.1D("1z",(j)?0:1);Q}T m=n.1P("1z");e=(j)?{1z:[m,0]}:{1z:[m,1]};k.1y(e)},bx:P(m){T k=$V(m).1t().5n();if("3q"!=N.1H){Q}31{3P("a"!=k.3W.2Y()&&k!=N.2q){k=k.1V}if("a"!=k.3W.2Y()||k.5U(m.4D())){Q}}3h(l){Q}T j=k.1P("3K-1u").4a(" ");2m(m.2t){1m"21":j[1]=k.1P("U");1n;1m"2O":j[1]="1T";1n}if(g.18.3r){k.4Y=j[1].1N()+1}1f{k.1e({"3K-1u":j.7B(" ")})}},bz:P(k){T j=$V(k).1t().5n();3P("a"!=j.3W.2Y()&&j!=N.2q){j=j.1V}if("a"!=j.3W.2Y()){Q}2m(j.3y){1m"8Q":N.2R(N.b2(N,N.W.74));1n;1m"94":N.2R(N.b1(N,N.W.74));1n;1m"83":N.2R(19);1n}},b9:P(j){j=j||X;T k=g.2J.1c("bg:7e"),e={},m=0;if(!k){T l=g.$1r("3j").2r("3c-3K").1e({1u:"gO",2e:"2n",13:0,1j:0,Y:0,1k:0,2w:(N.W.2w-1),2u:"1O",7z:N.W.7z,1z:0,2l:0,2a:0,2p:0}).22(g.2i).1S();if(g.18.3r){l.4L(g.$1r("b8",{28:\'bb:"";\'},{S:"1M%",U:"1M%",2e:"2n",2W:"bP()",13:0,gY:0,1u:"1Z",2w:-1,2l:"2U"}))}g.2J.1E("bg:7e",k=1r g.1X(l,{4w:g.1X.3l.4y,35:N.W.bh,6W:P(n){if(n){N.1e(g.1U(g.2J.be(),{1u:"1Z"}))}}.1o(l,N.61),3Y:P(){N.2C(N.1P("1z"),1a)}.1o(l)}));e={1z:[0,N.W.bd/1M]}}1f{k.1t();m=k.el.1P("1z");k.el.1D("3K-59",N.W.7z);e=(j)?{1z:[m,0]}:{1z:[m,N.W.bd/1M]};k.R.35=N.W.bh}k.el.29();k.1y(e)},bf:P(j){j=j||X;T e=N.2L(N.24||N.id);if(e.r.1p&&-1!=e.r.1p.4x){if(!j){e.r.1p.64();e.r.1p.3o=X;e.r.1p.1i.4E=X;e.r.1p.1i.12.1S();e.r.1p.1g.1S()}1f{e.r.1p.5z(e.r.1p.R.5A)}}},71:P(k){k=k||0;T j=(g.18.3Q)?{S:1d.9x,U:1d.9y}:$V(1d).1G(),e=$V(1d).7r();Q{Y:e.x+k,1k:e.x+j.S-k,13:e.y+k,1j:e.y+j.U-k}},6T:P(k,l){T j=N.71(N.W.9i),e=$V(1d).be();l=l||j;Q{y:1s.3N(j.13,1s.4G(("3L-3R"==N.W.3w)?j.1j:e.U+k.U,l.1j-(l.1j-l.13-k.U)/2)-k.U),x:1s.3N(j.Y,1s.4G(j.1k,l.1k-(l.1k-l.Y-k.S)/2)-k.S)}},3p:P(m,j){T n=(g.18.3Q)?{S:1d.9x,U:1d.9y}:$V(1d).1G(),s=N.1h.1c("2E"),o=N.1h.1c("4N"),l=N.1h.1c("3Z"),k=N.1h.1c("3J"),r=N.1h.1c("9m"),e=N.1h.1c("9o"),q=0,p=0;if(m){n.S-=m.x;n.U-=m.y}q=1s.4G(N.2E.S+r,1s.4G(s.S,n.S-l-N.6H.x)),p=1s.4G(N.2E.U+e,1s.4G(s.U,n.U-k-N.6H.y));if(q/p>o){q=p*o}1f{if(q/p<o){p=q/o}}if(!j){N.1h.1D("S",q);if(N.cr){N.cr.1e({13:(N.1q.12.1G().U-N.cr.1G().U)})}}Q{S:1s.b7(q),U:1s.b7(p)}},7O:P(){if("3q"!==N.1H){Q}T n=N.1h.1G();T r=N.2L(N.24||N.id).r.1c("1Q"),e=(r.1b)?r.1b.12.3U():r.r.3U(),s=("5p"==N.W.9h)?e:N.71(),j=N.1u,o=("3L-3R"==N.W.3w)?N.3p(19,1a):{S:N.1h.1c("2E").S-N.1h.1c("3Z")+N.1h.1c("9m"),U:N.1h.1c("2E").U-N.1h.1c("3J")+N.1h.1c("9o")},l={S:o.S+N.1h.1c("3Z"),U:o.U+N.1h.1c("3J")},q=N.1h.3d(),k=(N.1J&&N.3V)?N.1J.1c("S")+N.1J.1c("3Z"):0,m;n.S-=N.1h.1c("3Z");n.U-=N.1h.1c("3J");2m(N.W.7w){1m"5y":m=N.6T(l,s);1n;2j:if("3L-3R"==N.W.3w){o=N.3p({x:(2d(j.Y))?0+j.Y:(2d(j.1k))?0+j.1k:0,y:(2d(j.13))?0+j.13:(2d(j.1j))?0+j.1j:0},1a);l={S:o.S+N.1h.1c("3Z"),U:o.U+N.1h.1c("3J")}}s.13=(s.13+=2d(j.13))?s.13:(s.1j-=2d(j.1j))?s.1j-l.U:s.13;s.1j=s.13+l.U;s.Y=(s.Y+=2d(j.Y))?s.Y:(s.1k-=2d(j.1k))?s.1k-l.S:s.Y;s.1k=s.Y+l.S;m=N.6T(l,s);1n}1r g.1X(N.1h,{35:6V,b6:P(p,u){T v;if(p>0){N.23.1D("S",u.S-p);v=N.23.1G().U;N.1J.1D("U",v-N.1J.1c("3J")).1V.1D("U",v)}if(N.cr){N.cr.1e({13:(N.1q.12.1G().U-N.cr.1G().U)})}}.1o(N,k),3Y:P(){if(N.b0){N.b0.7O()}}.1o(N)}).1y({S:[n.S+k,o.S+k],13:[q.13,m.y],Y:[q.Y,m.x]})},cO:P(l,j,e){T k=X;2m(g.18.4J){1m"bj":k="2K-42"!=(l.1P("42-5M")||l.1P("-cQ-42-5M"));1n;1m"3m":k="2K-42"!=(l.1P("42-5M")||l.1P("-3m-42-5M"));1n;1m"2A":k=g.18.3I||"2K-42"!=(l.1P("42-5M")||l.1P("-8I-42-5M")||"2K-42");1n;2j:k="2K-42"!=l.1P("42-5M");1n}Q(k)?j:j-e},58:P(o){P l(r){T q=[];if("5C"==g.2D(r)){Q r}1I(T m in r){q.4g(m.6L()+":"+r[m])}Q q.7B(";")}T k=l(o).4p(),p=$V(k.4a(";")),n=19,j=19;p.3S(P(q){1I(T m in N.W){j=1r 53("^"+m.6L().2B(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]"+(("4j"==m)?"*":"+")+")$","i").6x(q.4p());if(j){2m(g.2D(N.W[m])){1m"7y":N.W[m]=j[1].6t();1n;1m"68":N.W[m]=(j[1].3i("."))?(j[1].d7()*((m.2Y().3i("1z"))?1M:aZ)):j[1].1N();1n;2j:N.W[m]=j[1].4p()}}}},N);1I(T e in N.9j){if(!N.9j.62(e)){63}j=1r 53("(^|;)\\\\s*"+e.6L().2B(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]+)\\\\s*(;|$)","i").6x(k);if(j){N.9j[e].1W(N,j[2])}}},aY:P(){T e=19,l=N.1u,k=N.2E;1I(T j in l){e=1r 53(""+j+"\\\\s*=\\\\s*([^,]+)","i").6x(N.W.7w);if(e){l[j]=(d9(l[j]=e[1].1N()))?l[j]:"1A"}}if((6w(l.13)&&6w(l.1j))||(6w(l.Y)&&6w(l.1k))){N.W.7w="5y"}if(!$V(["3L-3R","5q"]).4F(N.W.3w)){1I(T j in k){e=1r 53(""+j+"\\\\s*=\\\\s*([^,]+)","i").6x(N.W.3w);if(e){k[j]=(d9(k[j]=e[1].1N()))?k[j]:-1}}if(6w(k.S)&&6w(k.U)){N.W.3w="3L-3R"}}},da:P(e){T j,l;1I(T j in e){if(N.8B.62(l=j.3e())){N.8B[l]=e[j]}}},2L:P(e){Q $V(N.3n.2W(P(j){Q(e==j.id)}))[0]},6a:P(e,j){e=e||19;j=j||X;Q $V(N.3n.2W(P(k){Q(e==k.2F&&!k.5t&&(j||k.1L)&&(j||"73"!=k.1H)&&(j||!k.W.5s))}))},b1:P(m,e){e=e||X;T j=N.6a(m.2F,1a),k=j.4C(m)+1;Q(k>=j.1B)?(!e||1>=j.1B)?1F:j[0]:j[k]},b2:P(m,e){e=e||X;T j=N.6a(m.2F,1a),k=j.4C(m)-1;Q(k<0)?(!e||1>=j.1B)?1F:j[j.1B-1]:j[k]},d6:P(j){j=j||19;T e=N.6a(j,1a);Q(e.1B)?e[0]:1F},d4:P(j){j=j||19;T e=N.6a(j,1a);Q(e.1B)?e[e.1B-1]:1F},cL:P(){Q $V(N.3n.2W(P(e){Q("3q"==e.1H||"5D-3b"==e.1H||"5D-2R"==e.1H)}))},cl:P(k){T j=N.W.74,m=19;if(!N.W.ck){g.2J.2o("aX");Q 1a}k=$V(k);if(N.W.cm&&!(k.hN||k.i1)){Q X}2m(k.cJ){1m 27:k.1t();N.2R(19);1n;1m 32:1m 34:1m 39:1m 40:m=N.b1(N,j||32==k.cJ);1n;1m 33:1m 37:1m 38:m=N.b2(N,j);1n;2j:}if(m){k.1t();N.2R(m)}}});T h={3A:"cz.5.17",R:{},7x:{},W:{4i:X,5s:X,7K:1a,5V:1a,82:"ev",4j:"b5",7d:"eJ",7F:"9G 1p...",3a:"X"},1y:P(l){N.5e=$V(1d).1c("eN:5e",$V([]));T e=19,j=$V([]),k={};N.R=g.1U(1d.eS||{},N.R);N.W=g.1U(N.W,N.b3());c.R=g.3M(N.W);b.R=g.3M(N.W);c.R.3a=("5q"==N.W.3a||"1a"==N.W.3a);b.7x=N.7x;if(l){e=$V(l);if(e&&(" "+e.2V+" ").3s(/\\s(6X(?:8N){0,1}|3c)\\s/)){j.4g(e)}1f{Q X}}1f{j=$V(g.$A(g.2i.2z("A")).2W(P(m){Q(" "+m.2V+" ").3s(/\\s(6X(?:8N){0,1}|3c)\\s/)}))}j.3S(P(p){p=$V(p);T m=p.2z("7t"),n=19;k=g.1U(g.3M(N.W),N.b3(p.3y||" "));if(p.5o("6X")||(p.5o("5d"))){if(m&&m.1B){n=p.4c(m[0])}c.1y(p,"1k-1C: "+("5q"==k.3a||"1a"==k.3a));if(n){p.4L(n)}}if(p.5o("3c")||(p.5o("5d"))){b.1y(p)}1f{p.1K.4e="8P"}N.5e.4g(p)},N);Q 1a},1t:P(m){T e=19,l=19,j=$V([]);if(m){e=$V(m);if(e&&(" "+e.2V+" ").3s(/\\s(6X(?:8N){0,1}|3c)\\s/)){j=$V(N.5e.79(N.5e.4C(e),1))}1f{Q X}}1f{j=$V(N.5e)}3P(j&&j.1B){l=$V(j[j.1B-1]);if(l.1p){l.1p.1t();c.4h.79(c.4h.4C(l.1p),1);l.1p=1F}b.1t(l);T k=j.79(j.4C(l),1);3x k}Q 1a},78:P(j){T e=19;if(j){N.1t(j);N.1y.1o(N).2v(9e,j)}1f{N.1t();N.1y.1o(N).2v(9e)}Q 1a},2Z:P(n,e,k,l){T m=$V(n),j=19;if(m){if((j=m.1c("1Q"))){j.2L(j.24||j.id).1H="86"}if(!c.2Z(m,e,k,l)){b.2Z(m,e,k,l)}}},3b:P(e){Q b.3b(e)},2R:P(e){Q b.2R(e)},92:P(e){Q c.92(e)},b4:P(e){Q c.b4(e)},b3:P(j){T e,p,l,k,n;e=19;p={};n=[];if(j){l=$V(j.4a(";"));l.36(P(o){1I(T m in N.W){e=1r 53("^"+m.6L().2B(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]+)$","i").6x(o.4p());if(e){2m(g.2D(N.W[m])){1m"7y":p[m]=e[1].6t();1n;1m"68":p[m]=44(e[1]);1n;2j:p[m]=e[1].4p()}}}},N)}1f{1I(k in N.R){e=N.R[k];2m(g.2D(N.W[k.3e()])){1m"7y":e=e.5Y().6t();1n;1m"68":e=44(e);1n;2j:1n}p[k.3e()]=e}}Q p}};$V(1l).1w("5h",P(){h.1y()});Q h})(6N);', 62, 1146, "|||||||||||||||||||||||||||||||||||||||||||||||||this||function|return|options|width|var|height|mjs|_o|false|left||||self|top|||||j21|null|true|z7|j29|window|j6|else|z47|t22|z4|bottom|right|document|case|break|j24|zoom|z1|new|Math|stop|position|hint|je1|px|start|opacity|auto|length|click|j6Prop|j30|undefined|j7|state|for|t25|style|ready|100|j17|hidden|j5|thumb|test|hide|0px|extend|parentNode|call|FX|zoomWidth|absolute||mouseover|j32|t23|t27||z6||src|show|margin|href|arguments|parseInt|display|index|zoomHeight|z3|body|default|j16|border|switch|block|je2|padding|t26|j2|appendChild|type|overflow|j27|zIndex|title|params|byTag|trident|replace|j23|j1|size|group|initializeOn|visibility|load|doc|content|t16|firstChild|defined|mouseout|zoomPosition|hotspots|restore|prototype|img|none|className|filter|now|toLowerCase|update||try||||duration|j14||||rightClick|expand|MagicThumb|j8|j22|event|prefix|catch|has|DIV|fullScreen|Transition|webkit|thumbs|z30|resize|expanded|trident4|match|Element|selectorsChange|z2|expandSize|delete|rel|parent|version|pow|onready|targetTouches|selectors|t30|inz30|z42|backCompat|padY|background|fit|detach|max|j33|while|touchScreen|screen|forEach|clearTimeout|j9|hCaption|tagName|styles|onComplete|padX||magicthumb|box|edge|parseFloat|ieMode|z21|captionText|createElement|init|split|J_TYPE|removeChild|z44|cursor|typeof|push|zooms|disableZoom|hintText|capable|inner|selectorsEffect|changedTouches|selectorsClass|j26|getDoc|touchend|z41|fps|thumbnail|Class|transition|z28|linear|instanceof|_cleanup|J_UUID|indexOf|getRelated|z38|contains|min|j19s|constructor|engine|visible|append|j15|ratio|borderWidth|z43Bind|custom|200|divTag|mt_vml_|j3|relative|wrapper|opacityReverse|scrollTop|round||clicked|apply|RegExp|layout|timer|onload|getButton|z37|color|z9|t31|dragMode|MagicZoomPlus|items|ts|on|domready|nodeType|win|t28|Array|hintPosition|getTarget|j13|image|original|z13|disableExpand|error|float|lastTap|div|expandEffect|center|activate|alwaysShowZoom|showTitle|string|busy|naturalWidth|z35|createTextNode|touch|setTimeout|z34|scrollLeft|clientY|sizing|slide|link|fade|array|requestAnimationFrame|prevItem|300|hasChild|preloadSelectorsBig|magiczoom|kill|toString|unload||ieBack|hasOwnProperty|continue|pause|adjustY|_tmpp|storage|number|adjustX|t15|cbs|In|clientX|Out|selector|showLoading|preservePosition|identifier|complete|zoomDistance|Doc|render|paddingBottom|t29|paddingTop|paddingLeft|readyState|initWidth|j18|initHeight|zoomViewHeight|isNaN|exec|lastSelector|z45|j19|touchstart|rev|initMouseEvent|gd56f7fsgd|offset|hintVisible|scrPad|getElementsByTagName|important|swap|dashize|paddingRight|magicJS|keepThumbnail|restoreEffect|easing|slideshowEffect|css3Transformations|t14|onerror|250|onStart|MagicZoom|captionPosition|nextItem|restoreSpeed|t13|onInititalize|uninitialized|slideshowLoop||loading|mode|refresh|splice|changeContent|throw|clickToActivate|loadingClass|t32|z48|css3Animation|getElementsByClassName|expandTrigger|z14|J_EUID|z18|class|entireImage|z23|initTopPos|initLeftPos|j10|set|span|shift|presto|expandPosition|lang|boolean|backgroundColor|activatedEx|join|pad|cloneNode|events|loadingMsg|z43|currentStyle|setupHint|static|preloadSelectorsSmall|onBeforeRender|random|_timer|onresize|zoomAlign|z3Timer|10000|forceAnimation|z36|vertical|buttons|t10|floor|400|_unbind|ddx|calc|hintClass|close|naturalHeight|mouseup|updating|z24|ddy|setupContent|dissolve|pounce|500|borderLeftWidth|dblclick|cancelAnimationFrame|theme_mac|IMG|j31|hoverTimer|PFX|innerHTML|stopImmediatePropagation|to|moveOnClick|getBox|String|hintOpacity|effect|holder|loadingOpacity|platform|abort|_handlers|replaceChild|selectorsEffectSpeed|z29|_lang|newImg|inline|media|panZoom|mzParams|exOptions|ms|head|button|mousedown|item|Plus|9_|pointer|previous|hover|resizeTimer|originId|clickInitZoom|Ff|Top|Bottom|element|implement||enabled|zoomIn|getStorage|next|titleSource|toggle|100000px|Right|z0|Left|expandSpeed|firstRun|speed|150|z33|external|expandAlign|screenPadding|_deprecated|documentElement|defaults|hspace|selectorsMouseoverDelay|vspace|ufx|smoothing|z11|lastLeftPos|callee|namespaces|z7Rect|styleSheets|innerWidth|innerHeight|MagicJS|not|swapTimer|insertBefore|contextmenu|found|features|Loading|sqrt|compatMode|outline|z10|_event_prefix_|createEvent|cos|z1Holder|Event|loopBind|onErrorHandler|z15|PI|shadow|request|thumbChange|preventDefault|uuid|initialize|horizontal|HTMLElement|object|chrome|_event_del_|navigator|el_arr|construct|resizeBind|J_EXTENDED|stopAnimation|Function|z16||caller|bgColor|smoothingSpeed|loop|adjustPosition|query|defaultView|styleFloat|loadingPositionX|startTime|out|tl|clickToInitialize|z20|insertRule|loadingPositionY|mousemove|mz|onabort|magic|z26|_event_add_|big|5001|open|touches|restoreTrigger|prevent|linkTarget|borderTopWidth|overlapBox|nWidth|borderBottomWidth|t6|rect|Slide|z46|captionSource|offsetHeight|buttonsPosition|url|transparent|10000px|slideshowSpeed|reverse|keydown|parseExOptions|1000|zoomItem|t17|t18|_z37|zoomOut|Zoom|onAfterRender|ceil|IFRAME|t11|t12|javascript||backgroundOpacity|j12|toggleMZ||backgroundSpeed|textAlign|gecko|destroy||tc|tr|je3|5000|XMLHttpRequest||zoomWindowEffect|glow|Khtml|Webkit|z17|cbHover|z19|cbClick|xpath|x7|Moz|localStorage|900|1px|changeEventName|errorEventName|preload|loadingMsgExpanded|onError|back|fitZoomWindow|Width|documentMode|mask|buttonClose|z32|t8|hone|z31|android|od|scroll|phone|sMagicZoom|t7|drag|opera|entire|touchmove|buttonNext|buttonPrevious|ios|cancel|zoomFade|initializing||backcompat|Image||curLeft|blur|disable|mozCancelAnimationFrame|cancelFullScreen|keyboard|onKey|keyboardCtrl|finishTime|interval|roundCss|webkit419||cubicIn|compareDocumentPosition|quadIn|expoIn|sineIn|wrap|requestFullScreen|v4|relatedTarget|gecko181|which|addEventListener|raiseEvent|dispatchEvent|stopPropagation|cancelBubble|420|keyCode|backIn|t21|setProps|Alpha|adjBorder|expandTriggerDelay|moz|Microsoft|DXImageTransform|text|t2|CancelFullScreen|getComputedStyle|transform|styles_arr|getBoundingClientRect|bounceIn|enclose|elasticIn|getElementById|t20|offsetWidth|t19|toFloat|align|isFinite|setLang|change|z25|inherit|fontFamily|fontWeight|backgroundPosition|j28|Tahoma|clone|css|buttonsDisplay|z8|temporary||add|_bind|101|magicthumb_ie_ex|charCodeAt|vml|com|urn|schemas|microsoft|tmp|insertCSS|captionWidth|date|captionSpeed|textnode|captionHeight|concat|abs|alt|charAt|clickToDeactivate|continueAnimation|nativize|mac|DocumentTouch|Date|toArray|t4|t5|t1|zoomFadeOutSpeed|z22|behavior|fontSize|tap|callout|unselectable|nHeight|fill|highlight|move|MagicZoomPup|UUID|cssClass|user|select|z27|z39|borderRightWidth|v2|map|VML|fromCharCode|isReady|zoomFadeInSpeed|backgroundImage|fromElement||pageYOffset|Object|srcElement|pageY||target|j11|clientTop|setAttribute|MagicZoomPlusHint|clientHeight|progid|filters|UIEvent|toElement|toUpperCase|pageX|addCSS|pageXOffset|exists|collection|clientLeft|KeyboardEvent|MagicZoomPlusLoading|scrollHeight|KeyEvent|regexp|magiczoomplus|j20|byClass|presto925|iframe|MagicZoomPlusOptions|childNodes|innerText|slice|offsetTop|returnValue|offsetLeft|DOMElement|offsetParent|MouseEvent|html|hasLayout|scrollWidth|clientWidth|getTime|air|lge|linux|kindle|other|maemo|midp|netfront|mmp|webos|iris|mozRequestAnimationFrame|hiptop|fennec|elaine|oCancelAnimationFrame|iemobile|msRequestAnimationFrame|webkitRequestAnimationFrame|removeEventListener|oRequestAnimationFrame|ob|palm|vodafone|wap|windows|re|up|plucker|psp|symbian|treo|xda|xiino|taintEnabled|unknown|os|WebKitPoint|mozInnerScreenY|ixi|ActiveXObject|getBoxObjectFor|msCancelAnimationFrame|webkitCancelRequestAnimationFrame|querySelector|khtml|runtime|fullscreenchange|ontouchstart|181|192|191|190|pocket|fullscreenerror|setInterval|j4|getPropertyValue|userAgent|evaluate|webkitIsFullScreen|FullScreen|RequestFullScreen|mobile|419|AnimationName|270|applicationCache|260|blackberry|blazer|Transform|animationName|compal|220|211|avantgo|tablet|525|bada|postMessage|210|msPerformance|performance||cssFloat|elasticOut|sine|line|2em|3px|MagicZoomHeader|attachEvent|MagicBoxGlow|frameBorder|nextSibling|ccc|autohide|td|toLocaleLowerCase|cbhover|removeAttribute|00001|coords|currentTarget|fixed|trident900|bounce|elastic|_new|z12|expo|Invalid|Magic|getXY|lef|cubic|hand|MagicZoomBigImageCont|10002|textDecoration|selectstart|quad|MozUserSelect|_blank|beforeEnd|getAttributeNode|lt|amp|getAttribute|caption|imageSize|MagicThumbHint|9999|zoomActivation|clickTo|10001|000000|MagicThumbLoading|mzp|Expand|execCommand|BackgroundImageCache|111|backgroundRepeat|dir|rtl|stroked|tile|skipAnimation|insertAdjacentHTML|Close|009|Next|cssText|swapImage|repeat|no|sort|Previous|owningElement|createStyleSheet|middle|MagicBoxShadow|addRule|cssRules|ctrlKey|clearInterval|loaded|fireEvent|mt|MagicZoomLoading|MagicZoomHint|styleSheet|sheet|DOMContentLoaded|slideIn|slideOut|bounceOut|doScroll|metaKey|curFrame|stylesId|distance|lastChild|_self|eventType|quadOut|msg|cubicOut|detachEvent|backOut|||||delay|618|small|always|initEvent|createEventObject||deactivate||preserve|source|sineOut|expoOut".split("|"), 0, {}));
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },
    easeInExpo: function(x, t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOutExpo: function(x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b
    }
});
(function(a) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
})(function(e) {
    var o = "left",
        n = "right",
        d = "up",
        v = "down",
        c = "in",
        w = "out",
        l = "none",
        r = "auto",
        k = "swipe",
        s = "pinch",
        x = "tap",
        i = "doubletap",
        b = "longtap",
        A = "horizontal",
        t = "vertical",
        h = "all",
        q = 10,
        f = "start",
        j = "move",
        g = "end",
        p = "cancel",
        a = "ontouchstart" in window,
        y = "TouchSwipe";
    var m = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe"
    };
    e.fn.swipe = function(D) {
        var C = e(this),
            B = C.data(y);
        if (B && typeof D === "string") {
            if (B[D]) {
                return B[D].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                e.error("Method " + D + " does not exist on jQuery.swipe")
            }
        } else {
            if (!B && (typeof D === "object" || !D)) {
                return u.apply(this, arguments)
            }
        }
        return C
    };
    e.fn.swipe.defaults = m;
    e.fn.swipe.phases = {
        PHASE_START: f,
        PHASE_MOVE: j,
        PHASE_END: g,
        PHASE_CANCEL: p
    };
    e.fn.swipe.directions = {
        LEFT: o,
        RIGHT: n,
        UP: d,
        DOWN: v,
        IN: c,
        OUT: w
    };
    e.fn.swipe.pageScroll = {
        NONE: l,
        HORIZONTAL: A,
        VERTICAL: t,
        AUTO: r
    };
    e.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: h
    };

    function u(B) {
        if (B && (B.allowPageScroll === undefined && (B.swipe !== undefined || B.swipeStatus !== undefined))) {
            B.allowPageScroll = l
        }
        if (B.click !== undefined && B.tap === undefined) {
            B.tap = B.click
        }
        if (!B) {
            B = {}
        }
        B = e.extend({}, e.fn.swipe.defaults, B);
        return this.each(function() {
            var D = e(this);
            var C = D.data(y);
            if (!C) {
                C = new z(this, B);
                D.data(y, C)
            }
        })
    }

    function z(a0, aq) {
        var av = a || !aq.fallbackToMouseEvents,
            G = av ? "touchstart" : "mousedown",
            au = av ? "touchmove" : "mousemove",
            R = av ? "touchend" : "mouseup",
            P = av ? null : "mouseleave",
            az = "touchcancel";
        var ac = 0,
            aL = null,
            Y = 0,
            aX = 0,
            aV = 0,
            D = 1,
            am = 0,
            aF = 0,
            J = null;
        var aN = e(a0);
        var W = "start";
        var T = 0;
        var aM = null;
        var Q = 0,
            aY = 0,
            a1 = 0,
            aa = 0,
            K = 0;
        var aS = null;
        try {
            aN.bind(G, aJ);
            aN.bind(az, a5)
        } catch (ag) {
            e.error("events not supported " + G + "," + az + " on jQuery.swipe")
        }
        this.enable = function() {
            aN.bind(G, aJ);
            aN.bind(az, a5);
            return aN
        };
        this.disable = function() {
            aG();
            return aN
        };
        this.destroy = function() {
            aG();
            aN.data(y, null);
            return aN
        };
        this.option = function(a8, a7) {
            if (aq[a8] !== undefined) {
                if (a7 === undefined) {
                    return aq[a8]
                } else {
                    aq[a8] = a7
                }
            } else {
                e.error("Option " + a8 + " does not exist on jQuery.swipe.options")
            }
            return null
        };

        function aJ(a9) {
            if (ax()) {
                return
            }
            if (e(a9.target).closest(aq.excludedElements, aN).length > 0) {
                return
            }
            var ba = a9.originalEvent ? a9.originalEvent : a9;
            var a8, a7 = a ? ba.touches[0] : ba;
            W = f;
            if (a) {
                T = ba.touches.length
            } else {
                a9.preventDefault()
            }
            ac = 0;
            aL = null;
            aF = null;
            Y = 0;
            aX = 0;
            aV = 0;
            D = 1;
            am = 0;
            aM = af();
            J = X();
            O();
            if (!a || (T === aq.fingers || aq.fingers === h) || aT()) {
                ae(0, a7);
                Q = ao();
                if (T == 2) {
                    ae(1, ba.touches[1]);
                    aX = aV = ap(aM[0].start, aM[1].start)
                }
                if (aq.swipeStatus || aq.pinchStatus) {
                    a8 = L(ba, W)
                }
            } else {
                a8 = false
            }
            if (a8 === false) {
                W = p;
                L(ba, W);
                return a8
            } else {
                ak(true)
            }
            return null
        }

        function aZ(ba) {
            var bd = ba.originalEvent ? ba.originalEvent : ba;
            if (W === g || W === p || ai()) {
                return
            }
            var a9, a8 = a ? bd.touches[0] : bd;
            var bb = aD(a8);
            aY = ao();
            if (a) {
                T = bd.touches.length
            }
            W = j;
            if (T == 2) {
                if (aX == 0) {
                    ae(1, bd.touches[1]);
                    aX = aV = ap(aM[0].start, aM[1].start)
                } else {
                    aD(bd.touches[1]);
                    aV = ap(aM[0].end, aM[1].end);
                    aF = an(aM[0].end, aM[1].end)
                }
                D = a3(aX, aV);
                am = Math.abs(aX - aV)
            }
            if (T === aq.fingers || aq.fingers === h || !a || aT()) {
                aL = aH(bb.start, bb.end);
                ah(ba, aL);
                ac = aO(bb.start, bb.end);
                Y = aI();
                aE(aL, ac);
                if (aq.swipeStatus || aq.pinchStatus) {
                    a9 = L(bd, W)
                }
                if (!aq.triggerOnTouchEnd || aq.triggerOnTouchLeave) {
                    var a7 = true;
                    if (aq.triggerOnTouchLeave) {
                        var bc = aU(this);
                        a7 = B(bb.end, bc)
                    }
                    if (!aq.triggerOnTouchEnd && a7) {
                        W = ay(j)
                    } else {
                        if (aq.triggerOnTouchLeave && !a7) {
                            W = ay(g)
                        }
                    }
                    if (W == p || W == g) {
                        L(bd, W)
                    }
                }
            } else {
                W = p;
                L(bd, W)
            }
            if (a9 === false) {
                W = p;
                L(bd, W)
            }
        }

        function I(a7) {
            var a8 = a7.originalEvent;
            if (a) {
                if (a8.touches.length > 0) {
                    C();
                    return true
                }
            }
            if (ai()) {
                T = aa
            }
            a7.preventDefault();
            aY = ao();
            Y = aI();
            if (a6()) {
                W = p;
                L(a8, W)
            } else {
                if (aq.triggerOnTouchEnd || aq.triggerOnTouchEnd == false && W === j) {
                    W = g;
                    L(a8, W)
                } else {
                    if (!aq.triggerOnTouchEnd && a2()) {
                        W = g;
                        aB(a8, W, x)
                    } else {
                        if (W === j) {
                            W = p;
                            L(a8, W)
                        }
                    }
                }
            }
            ak(false);
            return null
        }

        function a5() {
            T = 0;
            aY = 0;
            Q = 0;
            aX = 0;
            aV = 0;
            D = 1;
            O();
            ak(false)
        }

        function H(a7) {
            var a8 = a7.originalEvent;
            if (aq.triggerOnTouchLeave) {
                W = ay(g);
                L(a8, W)
            }
        }

        function aG() {
            aN.unbind(G, aJ);
            aN.unbind(az, a5);
            aN.unbind(au, aZ);
            aN.unbind(R, I);
            if (P) {
                aN.unbind(P, H)
            }
            ak(false)
        }

        function ay(bb) {
            var ba = bb;
            var a9 = aw();
            var a8 = aj();
            var a7 = a6();
            if (!a9 || a7) {
                ba = p
            } else {
                if (a8 && bb == j && (!aq.triggerOnTouchEnd || aq.triggerOnTouchLeave)) {
                    ba = g
                } else {
                    if (!a8 && bb == g && aq.triggerOnTouchLeave) {
                        ba = p
                    }
                }
            }
            return ba
        }

        function L(a9, a7) {
            var a8 = undefined;
            if (F() || S()) {
                a8 = aB(a9, a7, k)
            } else {
                if ((M() || aT()) && a8 !== false) {
                    a8 = aB(a9, a7, s)
                }
            }
            if (aC() && a8 !== false) {
                a8 = aB(a9, a7, i)
            } else {
                if (al() && a8 !== false) {
                    a8 = aB(a9, a7, b)
                } else {
                    if (ad() && a8 !== false) {
                        a8 = aB(a9, a7, x)
                    }
                }
            }
            if (a7 === p) {
                a5(a9)
            }
            if (a7 === g) {
                if (a) {
                    if (a9.touches.length == 0) {
                        a5(a9)
                    }
                } else {
                    a5(a9)
                }
            }
            return a8
        }

        function aB(ba, a7, a9) {
            var a8 = undefined;
            if (a9 == k) {
                aN.trigger("swipeStatus", [a7, aL || null, ac || 0, Y || 0, T]);
                if (aq.swipeStatus) {
                    a8 = aq.swipeStatus.call(aN, ba, a7, aL || null, ac || 0, Y || 0, T);
                    if (a8 === false) {
                        return false
                    }
                }
                if (a7 == g && aR()) {
                    aN.trigger("swipe", [aL, ac, Y, T]);
                    if (aq.swipe) {
                        a8 = aq.swipe.call(aN, ba, aL, ac, Y, T);
                        if (a8 === false) {
                            return false
                        }
                    }
                    switch (aL) {
                        case o:
                            aN.trigger("swipeLeft", [aL, ac, Y, T]);
                            if (aq.swipeLeft) {
                                a8 = aq.swipeLeft.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case n:
                            aN.trigger("swipeRight", [aL, ac, Y, T]);
                            if (aq.swipeRight) {
                                a8 = aq.swipeRight.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case d:
                            aN.trigger("swipeUp", [aL, ac, Y, T]);
                            if (aq.swipeUp) {
                                a8 = aq.swipeUp.call(aN, ba, aL, ac, Y, T)
                            }
                            break;
                        case v:
                            aN.trigger("swipeDown", [aL, ac, Y, T]);
                            if (aq.swipeDown) {
                                a8 = aq.swipeDown.call(aN, ba, aL, ac, Y, T)
                            }
                            break
                    }
                }
            }
            if (a9 == s) {
                aN.trigger("pinchStatus", [a7, aF || null, am || 0, Y || 0, T, D]);
                if (aq.pinchStatus) {
                    a8 = aq.pinchStatus.call(aN, ba, a7, aF || null, am || 0, Y || 0, T, D);
                    if (a8 === false) {
                        return false
                    }
                }
                if (a7 == g && a4()) {
                    switch (aF) {
                        case c:
                            aN.trigger("pinchIn", [aF || null, am || 0, Y || 0, T, D]);
                            if (aq.pinchIn) {
                                a8 = aq.pinchIn.call(aN, ba, aF || null, am || 0, Y || 0, T, D)
                            }
                            break;
                        case w:
                            aN.trigger("pinchOut", [aF || null, am || 0, Y || 0, T, D]);
                            if (aq.pinchOut) {
                                a8 = aq.pinchOut.call(aN, ba, aF || null, am || 0, Y || 0, T, D)
                            }
                            break
                    }
                }
            }
            if (a9 == x) {
                if (a7 === p || a7 === g) {
                    clearTimeout(aS);
                    if (V() && !E()) {
                        K = ao();
                        aS = setTimeout(e.proxy(function() {
                            K = null;
                            aN.trigger("tap", [ba.target]);
                            if (aq.tap) {
                                a8 = aq.tap.call(aN, ba, ba.target)
                            }
                        }, this), aq.doubleTapThreshold)
                    } else {
                        K = null;
                        aN.trigger("tap", [ba.target]);
                        if (aq.tap) {
                            a8 = aq.tap.call(aN, ba, ba.target)
                        }
                    }
                }
            } else {
                if (a9 == i) {
                    if (a7 === p || a7 === g) {
                        clearTimeout(aS);
                        K = null;
                        aN.trigger("doubletap", [ba.target]);
                        if (aq.doubleTap) {
                            a8 = aq.doubleTap.call(aN, ba, ba.target)
                        }
                    }
                } else {
                    if (a9 == b) {
                        if (a7 === p || a7 === g) {
                            clearTimeout(aS);
                            K = null;
                            aN.trigger("longtap", [ba.target]);
                            if (aq.longTap) {
                                a8 = aq.longTap.call(aN, ba, ba.target)
                            }
                        }
                    }
                }
            }
            return a8
        }

        function aj() {
            var a7 = true;
            if (aq.threshold !== null) {
                a7 = ac >= aq.threshold
            }
            return a7
        }

        function a6() {
            var a7 = false;
            if (aq.cancelThreshold !== null && aL !== null) {
                a7 = aP(aL) - ac >= aq.cancelThreshold
            }
            return a7
        }

        function ab() {
            if (aq.pinchThreshold !== null) {
                return am >= aq.pinchThreshold
            }
            return true
        }

        function aw() {
            var a7;
            if (aq.maxTimeThreshold) {
                if (Y >= aq.maxTimeThreshold) {
                    a7 = false
                } else {
                    a7 = true
                }
            } else {
                a7 = true
            }
            return a7
        }

        function ah(a7, a8) {
            if (aq.allowPageScroll === l || aT()) {
                a7.preventDefault()
            } else {
                var a9 = aq.allowPageScroll === r;
                switch (a8) {
                    case o:
                        if (aq.swipeLeft && a9 || !a9 && aq.allowPageScroll != A) {
                            a7.preventDefault()
                        }
                        break;
                    case n:
                        if (aq.swipeRight && a9 || !a9 && aq.allowPageScroll != A) {
                            a7.preventDefault()
                        }
                        break;
                    case d:
                        if (aq.swipeUp && a9 || !a9 && aq.allowPageScroll != t) {
                            a7.preventDefault()
                        }
                        break;
                    case v:
                        if (aq.swipeDown && a9 || !a9 && aq.allowPageScroll != t) {
                            a7.preventDefault()
                        }
                        break
                }
            }
        }

        function a4() {
            var a8 = aK();
            var a7 = U();
            var a9 = ab();
            return a8 && a7 && a9
        }

        function aT() {
            return !!(aq.pinchStatus || aq.pinchIn || aq.pinchOut)
        }

        function M() {
            return !!(a4() && aT())
        }

        function aR() {
            var ba = aw();
            var bc = aj();
            var a9 = aK();
            var a7 = U();
            var a8 = a6();
            var bb = !a8 && a7 && a9 && bc && ba;
            return bb
        }

        function S() {
            return !!(aq.swipe || aq.swipeStatus || aq.swipeLeft || aq.swipeRight || aq.swipeUp || aq.swipeDown)
        }

        function F() {
            return !!(aR() && S())
        }

        function aK() {
            return T === aq.fingers || aq.fingers === h || !a
        }

        function U() {
            return aM[0].end.x !== 0
        }

        function a2() {
            return !!aq.tap
        }

        function V() {
            return !!aq.doubleTap
        }

        function aQ() {
            return !!aq.longTap
        }

        function N() {
            if (K == null) {
                return false
            }
            var a7 = ao();
            return V() && a7 - K <= aq.doubleTapThreshold
        }

        function E() {
            return N()
        }

        function at() {
            return (T === 1 || !a) && (isNaN(ac) || ac === 0)
        }

        function aW() {
            return Y > aq.longTapThreshold && ac < q
        }

        function ad() {
            return !!(at() && a2())
        }

        function aC() {
            return !!(N() && V())
        }

        function al() {
            return !!(aW() && aQ())
        }

        function C() {
            a1 = ao();
            aa = event.touches.length + 1
        }

        function O() {
            a1 = 0;
            aa = 0
        }

        function ai() {
            var a7 = false;
            if (a1) {
                var a8 = ao() - a1;
                if (a8 <= aq.fingerReleaseThreshold) {
                    a7 = true
                }
            }
            return a7
        }

        function ax() {
            return !!(aN.data(y + "_intouch") === true)
        }

        function ak(a7) {
            if (a7 === true) {
                aN.bind(au, aZ);
                aN.bind(R, I);
                if (P) {
                    aN.bind(P, H)
                }
            } else {
                aN.unbind(au, aZ, false);
                aN.unbind(R, I, false);
                if (P) {
                    aN.unbind(P, H, false)
                }
            }
            aN.data(y + "_intouch", a7 === true)
        }

        function ae(a8, a7) {
            var a9 = a7.identifier !== undefined ? a7.identifier : 0;
            aM[a8].identifier = a9;
            aM[a8].start.x = aM[a8].end.x = a7.pageX || a7.clientX;
            aM[a8].start.y = aM[a8].end.y = a7.pageY || a7.clientY;
            return aM[a8]
        }

        function aD(a7) {
            var a9 = a7.identifier !== undefined ? a7.identifier : 0;
            var a8 = Z(a9);
            a8.end.x = a7.pageX || a7.clientX;
            a8.end.y = a7.pageY || a7.clientY;
            return a8
        }

        function Z(a8) {
            for (var a7 = 0; a7 < aM.length; a7++) {
                if (aM[a7].identifier == a8) {
                    return aM[a7]
                }
            }
        }

        function af() {
            var a7 = [];
            for (var a8 = 0; a8 <= 5; a8++) {
                a7.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                })
            }
            return a7
        }

        function aE(a7, a8) {
            a8 = Math.max(a8, aP(a7));
            J[a7].distance = a8
        }

        function aP(a7) {
            if (J[a7]) {
                return J[a7].distance
            }
            return undefined
        }

        function X() {
            var a7 = {};
            a7[o] = ar(o);
            a7[n] = ar(n);
            a7[d] = ar(d);
            a7[v] = ar(v);
            return a7
        }

        function ar(a7) {
            return {
                direction: a7,
                distance: 0
            }
        }

        function aI() {
            return aY - Q
        }

        function ap(ba, a9) {
            var a8 = Math.abs(ba.x - a9.x);
            var a7 = Math.abs(ba.y - a9.y);
            return Math.round(Math.sqrt(a8 * a8 + a7 * a7))
        }

        function a3(a7, a8) {
            var a9 = a8 / a7 * 1;
            return a9.toFixed(2)
        }

        function an() {
            if (D < 1) {
                return w
            } else {
                return c
            }
        }

        function aO(a8, a7) {
            return Math.round(Math.sqrt(Math.pow(a7.x - a8.x, 2) + Math.pow(a7.y - a8.y, 2)))
        }

        function aA(ba, a8) {
            var a7 = ba.x - a8.x;
            var bc = a8.y - ba.y;
            var a9 = Math.atan2(bc, a7);
            var bb = Math.round(a9 * 180 / Math.PI);
            if (bb < 0) {
                bb = 360 - Math.abs(bb)
            }
            return bb
        }

        function aH(a8, a7) {
            var a9 = aA(a8, a7);
            if (a9 <= 45 && a9 >= 0) {
                return o
            } else {
                if (a9 <= 360 && a9 >= 315) {
                    return o
                } else {
                    if (a9 >= 135 && a9 <= 225) {
                        return n
                    } else {
                        if (a9 > 45 && a9 < 135) {
                            return v
                        } else {
                            return d
                        }
                    }
                }
            }
        }

        function ao() {
            var a7 = new Date;
            return a7.getTime()
        }

        function aU(a7) {
            a7 = e(a7);
            var a9 = a7.offset();
            var a8 = {
                left: a9.left,
                right: a9.left + a7.outerWidth(),
                top: a9.top,
                bottom: a9.top + a7.outerHeight()
            };
            return a8
        }

        function B(a7, a8) {
            return a7.x > a8.left && a7.x < a8.right && a7.y > a8.top && a7.y < a8.bottom
        }
    }
});
if (typeof Object.create !== "function") {
    Object.create = function(b) {
        function a() {}
        a.prototype = b;
        return new a
    }
}(function(d, c, a, e) {
    var b = {
        makeResponsive: function() {
            var f = this;
            d(f.sliderId + "-wrapper").addClass("ls-responsive").css({
                "max-width": d(f.sliderId + " .panel:first-child").width(),
                width: "100%"
            });
            d(f.sliderId + " .panel-container").css("width", 100 * f.panelCountTotal + f.pSign);
            d(f.sliderId + " .panel").css("width", 100 / f.panelCountTotal + f.pSign);
            if (f.options.hideArrowsWhenMobile) {
                f.leftWrapperPadding = d(f.sliderId + "-wrapper").css("padding-left");
                f.rightWrapperPadding = f.$sliderWrap.css("padding-right")
            }
            f.responsiveEvents();
            d(c).bind("resize", function() {
                f.responsiveEvents();
                clearTimeout(f.resizingTimeout);
                f.resizingTimeout = setTimeout(function() {
                    var g = f.options.autoHeight ? f.getHeight() : f.getHeighestPanel(f.nextPanel);
                    f.adjustHeight(false, g)
                }, 500)
            })
        },
        responsiveEvents: function() {
            var g = this,
                f = g.options.hideArrowsThreshold || g.options.mobileUIThreshold || g.totalNavWidth + 10;
            if (g.$sliderId.outerWidth() < f) {
                if (g.options.mobileNavigation) {
                    g.navigation.css("display", "none");
                    g.dropdown.css("display", "block");
                    g.dropdownSelect.css("display", "block");
                    d(g.sliderId + "-nav-select").val(g.options.mobileNavDefaultText)
                }
                if (g.options.dynamicArrows) {
                    if (g.options.hideArrowsWhenMobile) {
                        g.leftArrow.remove().length = 0;
                        g.rightArrow.remove().length = 0
                    } else {
                        if (!g.options.dynamicArrowsGraphical) {
                            g.leftArrow.css("margin-" + g.options.dynamicTabsPosition, "0");
                            g.rightArrow.css("margin-" + g.options.dynamicTabsPosition, "0")
                        }
                    }
                }
            } else {
                if (g.options.mobileNavigation) {
                    g.navigation.css("display", "block");
                    g.dropdown.css("display", "none");
                    g.dropdownSelect.css("display", "none")
                }
                if (g.options.dynamicArrows) {
                    if (g.options.hideArrowsWhenMobile && (!g.leftArrow.length || !g.rightArrow.length)) {
                        g.addArrows();
                        g.registerArrows()
                    } else {
                        if (!g.options.dynamicArrowsGraphical) {
                            g.leftArrow.css("margin-" + g.options.dynamicTabsPosition, g.navigation.css("height"));
                            g.rightArrow.css("margin-" + g.options.dynamicTabsPosition, g.navigation.css("height"))
                        }
                    }
                }
            }
            d(g.sliderId + "-wrapper").css("width", "100%");
            if (g.options.mobileNavigation) {
                g.dropdownSelect.change(function() {
                    g.setNextPanel(parseInt(d(this).val().split("tab")[1], 10) - 1)
                })
            }
        },
        addNavigation: function(i) {
            var h = this,
                f = "<" + h.options.navElementTag + ' class="ls-nav"><ul id="' + h.$elem.attr("id") + '-nav-ul"></ul></' + h.options.navElementTag + ">";
            if (h.options.dynamicTabsPosition === "bottom") {
                h.$sliderId.after(f)
            } else {
                h.$sliderId.before(f)
            }
            if (h.options.mobileNavigation) {
                var j = h.options.mobileNavDefaultText ? '<option disabled="disabled" selected="selected">' + h.options.mobileNavDefaultText + "</option>" : null,
                    g = '<div class="ls-select-box"><select id="' + h.$elem.attr("id") + '-nav-select" name="navigation">' + j + "</select></div>";
                h.navigation = d(h.sliderId + "-nav-ul").before(g);
                h.dropdown = d(h.sliderId + "-wrapper .ls-select-box");
                h.dropdownSelect = d(h.sliderId + "-nav-select");
                d.each(h.$elem.find(h.options.panelTitleSelector), function(k) {
                    d(h.$sliderWrap).find(".ls-select-box select").append('<option value="tab' + (k + 1) + '">' + d(this).text() + "</option>")
                })
            }
            d.each(h.$elem.find(h.options.panelTitleSelector), function(k) {
                d(h.$sliderWrap).find(".ls-nav ul").append('<li class="tab' + (k + 1) + '"><a class="' + (i || "") + '" href="#' + (k + 1) + '">' + h.getNavInsides(this) + "</a></li>");
                if (!h.options.includeTitle) {
                    d(this).remove()
                }
            })
        },
        getNavInsides: function(f) {
            return this.options.dynamicTabsHtml ? d(f).html() : d(f).text()
        },
        alignNavigation: function() {
            var f = this,
                g = f.options.dynamicArrowsGraphical ? "-arrow" : "";
            if (f.options.dynamicTabsAlign !== "center") {
                if (!f.options.responsive) {
                    d(f.$sliderWrap).find(".ls-nav ul").css("margin-" + f.options.dynamicTabsAlign, d(f.$sliderWrap).find(".ls-nav-" + f.options.dynamicTabsAlign + g).outerWidth(true) + parseInt(f.$sliderId.css("margin-" + f.options.dynamicTabsAlign), 10))
                }
                d(f.$sliderWrap).find(".ls-nav ul").css("float", f.options.dynamicTabsAlign)
            }
            f.totalNavWidth = d(f.$sliderWrap).find(".ls-nav ul").outerWidth(true);
            if (f.options.dynamicTabsAlign === "center") {
                f.totalNavWidth = 0;
                d(f.$sliderWrap).find(".ls-nav li a").each(function() {
                    f.totalNavWidth += d(this).outerWidth(true)
                });
                d(f.$sliderWrap).find(".ls-nav ul").css("width", f.totalNavWidth + 1)
            }
        },
        registerNav: function() {
            var f = this;
            f.$sliderWrap.find("[class^=ls-nav] li").on("click", function() {
                f.setNextPanel(parseInt(d(this).attr("class").split("tab")[1], 10) - 1);
                return false
            })
        },
        addArrows: function(g) {
            var f = this,
                h = f.options.dynamicArrowsGraphical ? "-arrow " : " ";
            f.$sliderWrap.addClass("arrows");
            if (f.options.dynamicArrowsGraphical) {
                f.options.dynamicArrowLeftText = "";
                f.options.dynamicArrowRightText = ""
            }
            f.$sliderId.before('<div class="ls-nav-left' + h + (g || "") + '"><a href="#">' + f.options.dynamicArrowLeftText + "</a></div>");
            f.$sliderId.after('<div class="ls-nav-right' + h + (g || "") + '"><a href="#">' + f.options.dynamicArrowRightText + "</a></div>");
            f.leftArrow = d(f.sliderId + "-wrapper [class^=ls-nav-left]").css("visibility", "hidden").addClass("ls-hidden");
            f.rightArrow = d(f.sliderId + "-wrapper [class^=ls-nav-right]").css("visibility", "hidden").addClass("ls-hidden");
            if (!f.options.hoverArrows) {
                f.hideShowArrows(e, true, true, false)
            }
        },
        hideShowArrows: function(k, h, m, l) {
            var i = this,
                j = typeof k !== "undefined" ? k : i.options.fadeOutDuration,
                f = typeof k !== "undefined" ? k : i.options.fadeInDuration,
                g = h ? "visible" : "hidden";
            if (!m && (l || i.sanatizeNumber(i.nextPanel) === 1)) {
                i.leftArrow.stop().fadeTo(j, 0, function() {
                    d(this).css("visibility", g).addClass("ls-hidden")
                })
            } else {
                if (m || i.leftArrow.hasClass("ls-hidden")) {
                    i.leftArrow.stop().css("visibility", "visible").fadeTo(f, 1).removeClass("ls-hidden")
                }
            }
            if (!m && (l || i.sanatizeNumber(i.nextPanel) === i.panelCount)) {
                i.rightArrow.stop().fadeTo(j, 0, function() {
                    d(this).css("visibility", g).addClass("ls-hidden")
                })
            } else {
                if (m || i.rightArrow.hasClass("ls-hidden")) {
                    i.rightArrow.stop().css("visibility", "visible").fadeTo(f, 1).removeClass("ls-hidden")
                }
            }
        },
        registerArrows: function() {
            var f = this;
            d(f.$sliderWrap.find("[class^=ls-nav-]")).on("click", function() {
                f.setNextPanel(d(this).attr("class").split(" ")[0].split("-")[2])
            })
        },
        registerCrossLinks: function() {
            var f = this;
            f.crosslinks = d("[data-liquidslider-ref*=" + f.sliderId.split("#")[1] + "]");
            f.crosslinks.on("click", function(g) {
                if (f.options.autoSlide === true) {
                    f.startAutoSlide(true)
                }
                f.setNextPanel(f.getPanelNumber(d(this).attr("href").split("#")[1], f.options.panelTitleSelector));
                g.preventDefault()
            });
            f.updateClass()
        },
        registerTouch: function() {
            var f = this,
                g = f.options.swipeArgs || {
                    fallbackToMouseEvents: false,
                    allowPageScroll: "vertical",
                    swipe: function(i, h) {
                        if (h === "up" || h === "down") {
                            return false
                        }
                        f.swipeDir = h === "left" ? "right" : "left";
                        f.setNextPanel(f.swipeDir)
                    }
                };
            d(f.sliderId + " .panel").swipe(g)
        },
        registerKeyboard: function() {
            var f = this;
            d(a).keydown(function(h) {
                var g = h.keyCode || h.which;
                if (h.target.type !== "textarea" && h.target.type !== "textbox") {
                    if (!f.options.forceAutoSlide) {
                        d(this).trigger("click")
                    }
                    if (g === f.options.leftKey) {
                        f.setNextPanel("right")
                    }
                    if (g === f.options.rightKey) {
                        f.setNextPanel("left")
                    }
                    d.each(f.options.panelKeys, function(i, j) {
                        if (g === j) {
                            f.setNextPanel(i - 1)
                        }
                    })
                }
            })
        },
        autoSlide: function() {
            var f = this;
            if (f.options.autoSlideInterval < f.options.slideEaseDuration) {
                f.options.autoSlideInterval = f.options.slideEaseDuration > f.options.heightEaseDuration ? f.options.slideEaseDuration : f.options.heightEaseDuration
            }
            f.autoSlideTimeout = setTimeout(function() {
                f.setNextPanel(f.options.autoSlideDirection);
                f.autoSlide()
            }, f.options.autoSlideInterval)
        },
        stopAutoSlide: function() {
            var f = this;
            f.options.autoSlide = false;
            clearTimeout(f.autoSlideTimeout)
        },
        startAutoSlide: function(g) {
            var f = this;
            f.options.autoSlide = true;
            if (!g) {
                f.setNextPanel(f.options.autoSlideDirection)
            }
            f.autoSlide(clearTimeout(f.autoSlideTimeout))
        },
        updateHashTags: function() {
            var f = this,
                g = f.nextPanel === f.panelCount ? 0 : f.nextPanel;
            c.location.hash = f.getFromPanel(f.options.hashTitleSelector, g)
        },
        adjustHeight: function(h, f, j, i) {
            var g = this;
            if (h || g.useCSS) {
                if (h) {
                    g.configureCSSTransitions("0", "0")
                }
                g.$sliderId.height(f);
                if (h) {
                    g.configureCSSTransitions()
                }
                return
            }
            g.$sliderId.animate({
                height: f + "px"
            }, {
                easing: j || g.options.heightEaseFunction,
                duration: i || g.options.heightEaseDuration,
                queue: false
            })
        },
        getHeight: function(f) {
            var g = this;
            f = f || g.$panelClass.eq(g.sanatizeNumber(g.nextPanel) - 1).outerHeight(true);
            f = f < g.options.minHeight ? g.options.minHeight : f;
            return f
        },
        addPreloader: function() {
            var f = this;
            d(f.sliderId + "-wrapper").append('<div class="ls-preloader"></div>')
        },
        removePreloader: function() {
            var f = this;
            d(f.sliderId + "-wrapper .ls-preloader").fadeTo("slow", 0, function() {
                d(this).remove()
            })
        },
        init: function(g, h) {
            var f = this;
            f.elem = h;
            f.$elem = d(h);
            d("body").removeClass("no-js");
            f.sliderId = "#" + f.$elem.attr("id");
            f.$sliderId = d(f.sliderId);
            f.options = d.extend({}, d.fn.liquidSlider.options, g);
            f.pSign = f.options.responsive ? "%" : "px";
            if (f.options.responsive) {
                f.determineAnimationType()
            } else {
                f.options.mobileNavigation = false;
                f.options.hideArrowsWhenMobile = false
            }
            if (f.options.slideEaseFunction === "animate.css") {
                if (!f.useCSS) {
                    f.options.slideEaseFunction = f.options.slideEaseFunctionFallback
                } else {
                    f.options.continuous = false;
                    f.animateCSS = true
                }
            }
            f.build();
            f.events();
            if (!f.options.responsive && f.options.dynamicArrows) {
                f.$sliderWrap.width(f.$sliderId.outerWidth(true) + f.leftArrow.outerWidth(true) + f.rightArrow.outerWidth(true))
            }
            f.loaded = true;
            d(c).bind("load", function() {
                f.options.preload.call(f)
            })
        },
        build: function() {
            var f = this,
                h;
            if (f.$sliderId.parent().attr("class") !== "ls-wrapper") {
                f.$sliderId.wrap('<div id="' + f.$elem.attr("id") + '-wrapper" class="ls-wrapper"></div>')
            }
            f.$sliderWrap = d(f.sliderId + "-wrapper");
            if (f.options.preloader) {
                f.addPreloader()
            }
            d(f.sliderId).children().addClass(f.$elem.attr("id") + "-panel panel");
            f.panelClass = f.sliderId + " ." + f.$elem.attr("id") + "-panel:not(.clone)";
            f.$panelClass = d(f.panelClass);
            f.$panelClass.wrapAll('<div class="panel-container"></div>');
            f.$panelClass.wrapInner('<div class="panel-wrapper"></div>');
            f.panelContainer = f.$panelClass.parent();
            f.$panelContainer = f.panelContainer;
            if (f.options.slideEaseFunction === "fade") {
                f.$panelClass.addClass("fade");
                f.options.continuous = false;
                f.fade = true
            }
            if (f.options.dynamicTabs) {
                f.addNavigation()
            } else {
                f.options.mobileNavigation = false
            }
            if (f.options.dynamicArrows) {
                f.addArrows()
            } else {
                f.options.hoverArrows = false;
                f.options.hideSideArrows = false;
                f.options.hideArrowsWhenMobile = false
            }
            h = f.$leftArrow && f.$leftArrow.css("position") === "absolute" ? 0 : 1;
            f.totalSliderWidth = f.$sliderId.outerWidth(true) + d(f.$leftArrow).outerWidth(true) * h + d(f.$rightArrow).outerWidth(true) * h;
            d(f.$sliderWrap).css("width", f.totalSliderWidth);
            if (f.options.dynamicTabs) {
                f.alignNavigation()
            }
            if (f.options.hideSideArrows) {
                f.options.continuous = false
            }
            if (f.options.continuous) {
                f.$panelContainer.prepend(f.$panelContainer.children().last().clone().addClass("clone"));
                f.$panelContainer.append(f.$panelContainer.children().eq(1).clone().addClass("clone"))
            }
            var g = f.options.continuous ? 2 : 0;
            f.panelCount = d(f.panelClass).length;
            f.panelCountTotal = f.fade ? 1 : f.panelCount + g;
            f.panelWidth = d(f.panelClass).outerWidth();
            f.totalWidth = f.panelCountTotal * f.panelWidth;
            d(f.sliderId + " .panel-container").css("width", f.totalWidth);
            f.slideDistance = f.options.responsive ? 100 : d(f.sliderId).outerWidth();
            if (f.useCSS) {
                f.totalWidth = 100 * f.panelCountTotal;
                f.slideDistance = 100 / f.panelCountTotal
            }
            if (f.options.responsive) {
                f.makeResponsive()
            }
            f.prepareTransition(f.getFirstPanel(), true);
            f.updateClass()
        },
        determineAnimationType: function() {
            var f = this,
                l = "animation",
                j = "",
                h = "Webkit Moz O ms Khtml".split(" "),
                k = "",
                g = 0;
            f.useCSS = false;
            if (f.elem.style.animationName) {
                f.useCSS = true
            }
            if (f.useCSS === false) {
                for (g = 0; g < h.length; g++) {
                    if (f.elem.style[h[g] + "AnimationName"] !== e) {
                        k = h[g];
                        l = k + "Animation";
                        j = "-" + k.toLowerCase() + "-";
                        f.useCSS = true;
                        break
                    }
                }
            }
            if (a.documentElement.clientWidth > f.options.useCSSMaxWidth) {
                f.useCSS = false
            }
        },
        configureCSSTransitions: function(g, f) {
            var h = this,
                i, j;
            h.easing = {
                easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                easeInOutExpo: "cubic-bezier(1,0,0,1)",
                easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                easeInSine: "cubic-bezier(.47,0,.745,.715)",
                easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                easeOutBack: "cubic-bezier(.175,.885,.32,1.275)",
                easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
            };
            if (h.useCSS) {
                i = "all " + (g || h.options.slideEaseDuration) + "ms " + h.easing[h.options.slideEaseFunction];
                j = "all " + (f || h.options.heightEaseDuration) + "ms " + h.easing[h.options.heightEaseFunction];
                d(h.panelContainer).css({
                    "-webkit-transition": i,
                    "-moz-transition": i,
                    "-ms-transition": i,
                    "-o-transition": i,
                    transition: i
                });
                if (h.options.autoHeight) {
                    h.$sliderId.css({
                        "-webkit-transition": j,
                        "-moz-transition": j,
                        "-ms-transition": j,
                        "-o-transition": j,
                        transition: j
                    })
                }
            }
        },
        transitionFade: function() {
            var f = this;
            d(f.panelClass).eq(f.nextPanel).fadeTo(f.options.fadeInDuration, 1).css("z-index", 1);
            d(f.panelClass).eq(f.prevPanel).fadeTo(f.options.fadeOutDuration, 0).css("z-index", 0);
            f.callback(f.options.callback, true)
        },
        hover: function() {
            var f = this;
            f.$sliderWrap.hover(function() {
                if (f.options.hoverArrows) {
                    f.hideShowArrows(f.options.fadeInDuration, true, true, false)
                }
                if (f.options.pauseOnHover) {
                    clearTimeout(f.autoSlideTimeout)
                }
            }, function() {
                if (f.options.hoverArrows) {
                    f.hideShowArrows(f.options.fadeOutnDuration, true, false, true)
                }
                if (f.options.pauseOnHover && f.options.autoSlide) {
                    f.startAutoSlide()
                }
            })
        },
        events: function() {
            var f = this;
            if (f.options.dynamicArrows) {
                f.registerArrows()
            }
            if (f.options.crossLinks) {
                f.registerCrossLinks()
            }
            if (f.options.dynamicTabs) {
                f.registerNav()
            }
            if (f.options.swipe) {
                f.registerTouch()
            }
            if (f.options.keyboardNavigation) {
                f.registerKeyboard()
            }
            f.$sliderWrap.find("*").on("click", function() {
                if (f.options.forceAutoSlide) {
                    f.startAutoSlide(true)
                } else {
                    if (f.options.autoSlide) {
                        f.stopAutoSlide()
                    }
                }
            });
            f.hover()
        },
        setNextPanel: function(g) {
            var f = this;
            setTimeout(function() {
                if (g === f.nextPanel) {
                    return
                }
                f.prevPanel = f.nextPanel;
                if (f.loaded) {
                    if (typeof g === "number") {
                        f.nextPanel = g
                    } else {
                        f.nextPanel += ~~(g === "right") || -1;
                        if (!f.options.continuous) {
                            f.nextPanel = f.nextPanel < 0 ? f.panelCount - 1 : f.nextPanel % f.panelCount
                        }
                    }
                    if (f.fade || f.animateCSS) {
                        f.prepareTransition(f.nextPanel)
                    } else {
                        f.verifyPanel()
                    }
                }
            }, 100)
        },
        getFirstPanel: function() {
            var g = this,
                f;
            if (g.options.hashLinking) {
                f = g.getPanelNumber(c.location.hash, g.options.hashTitleSelector);
                if (typeof f !== "number") {
                    f = 0
                }
            }
            return f ? f : g.options.firstPanelToLoad - 1
        },
        getPanelNumber: function(i, h) {
            var g = this,
                j, f = i.replace("#", "").toLowerCase();
            g.$panelClass.each(function(k) {
                j = g.convertRegex(d(this).find(h).text());
                if (j === f) {
                    f = k + 1
                }
            });
            return parseInt(f, 10) ? parseInt(f, 10) - 1 : f
        },
        getFromPanel: function(g, h) {
            var f = this;
            return f.convertRegex(f.$panelClass.find(g).eq(h).text())
        },
        convertRegex: function(f) {
            return f.replace(/[^\w -]+/g, "").replace(/ +/g, "-").toLowerCase()
        },
        updateClass: function() {
            var f = this;
            if (f.options.dynamicTabs) {
                d(f.$sliderWrap).find(".tab" + f.sanatizeNumber(f.nextPanel) + ":first a").addClass("current").parent().siblings().children().removeClass("current")
            }
            if (f.options.crossLinks && f.crosslinks) {
                f.crosslinks.not(f.nextPanel).removeClass("currentCrossLink");
                f.crosslinks.each(function() {
                    if (d(this).attr("href") === "#" + f.getFromPanel(f.options.panelTitleSelector, f.sanatizeNumber(f.nextPanel) - 1)) {
                        d(this).addClass("currentCrossLink")
                    }
                })
            }
            f.$panelClass.eq(f.nextPanel).addClass("currentPanel").siblings().removeClass("currentPanel")
        },
        sanatizeNumber: function(f) {
            var g = this;
            if (f >= g.panelCount) {
                return 1
            } else {
                if (f <= -1) {
                    return g.panelCount
                } else {
                    return f + 1
                }
            }
        },
        finalize: function() {
            var g = this;
            var f = g.options.autoHeight ? g.getHeight() : g.getHeighestPanel(g.nextPanel);
            if (g.options.autoHeight) {
                g.adjustHeight(true, f)
            }
            if (g.options.autoSlide) {
                g.autoSlide()
            }
            if (g.options.preloader) {
                g.removePreloader()
            }
            g.onload()
        },
        callback: function(g, h) {
            var f = this;
            if (g && f.loaded) {
                if (f.useCSS && typeof h !== "undefined") {
                    d(".panel-container").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(i) {
                        g.call(f)
                    })
                } else {
                    setTimeout(function() {
                        g.call(f)
                    }, f.options.slideEaseDuration + 50)
                }
            }
        },
        onload: function() {
            var f = this;
            f.options.onload.call(f)
        },
        prepareTransition: function(j, h, g, i) {
            var f = this;
            f.nextPanel = j || 0;
            if (!g) {
                f.pretransition(f.options.pretransition)
            }
            f.noAnimation = h;
            f.noPosttransition = i;
            if (!f.loaded) {
                f.transition()
            } else {
                f.options.pretransition.call(f)
            }
        },
        pretransition: function() {
            var f = this,
                g;
            if (f.options.hashLinking) {
                f.updateHashTags()
            }
            if (f.options.mobileNavigation) {
                f.dropdownSelect.val("tab" + (f.nextPanel + 1))
            }
            if (f.options.hideSideArrows) {
                f.hideShowArrows()
            }
            f.updateClass()
        },
        getTransitionMargin: function() {
            var f = this;
            return -(f.nextPanel * f.slideDistance) - f.slideDistance * ~~f.options.continuous
        },
        transition: function() {
            var f = this,
                g = f.getTransitionMargin();
            if (f.animateCSS && f.loaded) {
                f.transitionOutAnimateCSS();
                return false
            }
            if (g + f.pSign !== f.panelContainer.css("margin-left") || g !== -100) {
                if (f.options.autoHeight && !f.animateCSS) {
                    f.adjustHeight(true, f.getHeight())
                }
                if (f.fade) {
                    f.transitionFade()
                } else {
                    if (f.animateCSS) {
                        f.transitionInAnimateCSS(g)
                    } else {
                        if (f.useCSS) {
                            f.transitionCSS(g, f.noAnimation)
                        } else {
                            f.transitionjQuery(g, f.noAnimation)
                        }
                    }
                }
            }
            if (!f.noPosttransition) {
                f.callback(f.options.callback)
            }
        },
        transitionOutAnimateCSS: function() {
            var f = this;
            d(f.panelClass).removeClass(f.options.animateIn + " animated");
            d(f.panelClass).eq(f.prevPanel).addClass("animated " + f.options.animateOut);
            f.callback(f.transitionInAnimateCSS, e)
        },
        transitionInAnimateCSS: function() {
            var f = this;
            if (f.options.autoHeight) {
                f.adjustHeight(false, f.getHeight())
            }
            f.transitionCSS(f.getTransitionMargin(), !f.loaded);
            d(f.panelClass).removeClass(f.options.animateOut + " animated");
            d(f.panelClass).eq(f.nextPanel).addClass("animated " + f.options.animateIn);
            f.callback(f.options.callback, e)
        },
        transitionCSS: function(h, g) {
            var f = this;
            if (g) {
                f.configureCSSTransitions("0", "0")
            }
            f.panelContainer.css({
                "-webkit-transform": "translate3d(" + h + f.pSign + ", 0, 0)",
                "-moz-transform": "translate3d(" + h + f.pSign + ", 0, 0)",
                "-ms-transform": "translate3d(" + h + f.pSign + ", 0, 0)",
                "-o-transform": "translate3d(" + h + f.pSign + ", 0, 0)",
                transform: "translate3d(" + h + f.pSign + ", 0, 0)"
            });
            if (g) {
                f.callback(function() {
                    f.configureCSSTransitions()
                })
            } else {
                f.configureCSSTransitions()
            }
        },
        transitionjQuery: function(h, g) {
            var f = this;
            if (g) {
                f.panelContainer.css("margin-left", h + f.pSign)
            } else {
                f.panelContainer.animate({
                    "margin-left": h + f.pSign
                }, {
                    easing: f.options.slideEaseFunction,
                    duration: f.options.slideEaseDuration,
                    queue: false
                })
            }
        },
        getHeighestPanel: function() {
            var g = this,
                f, h = 0;
            g.$panelClass.each(function() {
                f = d(this).outerHeight(true);
                h = f > h ? f : h
            });
            if (!g.options.autoHeight) {
                return h
            }
        },
        verifyPanel: function() {
            var g = this,
                f = false;
            if (g.options.continuous) {
                if (g.nextPanel > g.panelCount) {
                    g.nextPanel = g.panelCount;
                    g.setNextPanel(g.panelCount)
                } else {
                    if (g.nextPanel < -1) {
                        g.nextPanel = -1;
                        g.setNextPanel(-1)
                    } else {
                        if (!f && (g.nextPanel === g.panelCount || g.nextPanel === -1)) {
                            g.prepareTransition(g.nextPanel);
                            g.updateClass();
                            clearTimeout(h);
                            var h = setTimeout(function() {
                                if (g.nextPanel === g.panelCount) {
                                    g.prepareTransition(0, true, true, true)
                                } else {
                                    if (g.nextPanel === -1) {
                                        g.prepareTransition(g.panelCount - 1, true, true, true)
                                    }
                                }
                            }, g.options.slideEaseDuration + 50)
                        } else {
                            f = true;
                            g.prepareTransition(g.nextPanel)
                        }
                    }
                }
            } else {
                if (g.nextPanel === g.panelCount) {
                    g.nextPanel = 0
                } else {
                    if (g.nextPanel === -1) {
                        g.nextPanel = g.panelCount - 1
                    }
                }
                g.prepareTransition(g.nextPanel)
            }
        }
    };
    d.fn.liquidSlider = function(f) {
        return this.each(function() {
            var g = Object.create(b);
            g.init(f, this);
            d.data(this, "liquidSlider", g)
        })
    };
    d.fn.liquidSlider.options = {
        autoHeight: true,
        minHeight: 0,
        heightEaseDuration: 1500,
        heightEaseFunction: "easeInOutExpo",
        slideEaseDuration: 1500,
        slideEaseFunction: "easeInOutExpo",
        slideEaseFunctionFallback: "easeInOutExpo",
        animateIn: "bounceInRight",
        animateOut: "bounceOutRight",
        continuous: true,
        fadeInDuration: 500,
        fadeOutDuration: 500,
        autoSlide: false,
        autoSlideDirection: "right",
        autoSlideInterval: 6e3,
        forceAutoSlide: false,
        pauseOnHover: false,
        dynamicArrows: true,
        dynamicArrowsGraphical: true,
        dynamicArrowLeftText: "&#171; left",
        dynamicArrowRightText: "right &#187;",
        hideSideArrows: false,
        hideSideArrowsDuration: 750,
        hoverArrows: true,
        hoverArrowDuration: 250,
        dynamicTabs: true,
        dynamicTabsHtml: true,
        includeTitle: true,
        panelTitleSelector: ".title",
        dynamicTabsAlign: "left",
        dynamicTabsPosition: "top",
        navElementTag: "div",
        firstPanelToLoad: 1,
        crossLinks: false,
        hashLinking: false,
        hashTitleSelector: ".title",
        keyboardNavigation: false,
        leftKey: 39,
        rightKey: 37,
        panelKeys: {
            1: 49,
            2: 50,
            3: 51,
            4: 52
        },
        responsive: true,
        mobileNavigation: true,
        mobileNavDefaultText: "Menu",
        mobileUIThreshold: 0,
        hideArrowsWhenMobile: true,
        hideArrowsThreshold: 0,
        useCSSMaxWidth: 2200,
        preload: function() {
            this.finalize()
        },
        onload: function() {},
        pretransition: function() {
            this.transition()
        },
        callback: function() {},
        preloader: false,
        swipe: true,
        swipeArgs: e
    }
})(jQuery, window, document);


// Old masterfunctions start //

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
