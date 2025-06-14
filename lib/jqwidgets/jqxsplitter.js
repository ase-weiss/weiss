/*
jQWidgets v5.3.0 (2017-Sep)
Copyright (c) 2011-2017 jQWidgets.
License: https://jqwidgets.com/license/
*/

(function (a) {
    a.jqx.jqxWidget("jqxSplitter", "", {});
    a.extend(a.jqx._jqxSplitter.prototype, {
        defineInstance: function () {
            var b = {
                width: 300,
                height: 300,
                panels: [],
                orientation: "vertical",
                disabled: false,
                splitBarSize: 5,
                touchSplitBarSize: 15,
                panel1: null,
                panel2: null,
                _eventsMap: {
                    mousedown: a.jqx.mobile.getTouchEventName("touchstart"),
                    mouseup: a.jqx.mobile.getTouchEventName("touchend"),
                    mousemove: a.jqx.mobile.getTouchEventName("touchmove"),
                    mouseenter: "mouseenter",
                    mouseleave: "mouseleave"
                },
                _isTouchDevice: false,
                _isNested: false,
                resizable: true,
                touchMode: "auto",
                showSplitBar: true,
                initContent: null,
                _events: ["resize", "expanded", "collapsed", "resizeStart", "layout"]
            };
            if (this === a.jqx._jqxSplitter.prototype) {
                return b
            }
            a.extend(true, this, b);
            return b
        }, createInstance: function () {
            this.render()
        }, _initOverlay: function (b) {
            if (this.overlay || b == "undefined") {
                this.overlay.remove();
                this.overlay = null
            } else {
                if (b == true) {
                    this.overlay = a("<div style='z-index: 100; background: #fff;'></div>");
                    this.overlay.css("opacity", 0.01);
                    this.overlay.css("position", "absolute");
                    this.overlay.appendTo(a(document.body));
                    var c = this.host.coord();
                    this.overlay.css("left", "0px");
                    this.overlay.css("top", "0px");
                    this.overlay.width(a(window).width());
                    this.overlay.height(a(window).height());
                    this.overlay.addClass("jqx-disableselect");
                    if (this.orientation == "horizontal") {
                        this.overlay.css("cursor", "row-resize")
                    } else {
                        this.overlay.css("cursor", "col-resize")
                    }
                }
            }
        }, _startDrag: function (b) {
            if (b.target == this.splitBarButton[0] || this.disabled) {
                return true
            }
            if (this.panels[0].collapsed || this.panels[1].collapsed || !this.resizable) {
                return true
            }
            if (this.overlay == null) {
                this._dragging = true;
                this._initOverlay(true);
                this._dragStart = a.jqx.position(b);
                return false
            }
            return true
        }, _drag: function (b) {
            if (this.panels[0].collapsed || this.panels[1].collapsed || this.disabled) {
                return true
            }
            if (!this._dragging) {
                return true
            }
            var i = this.orientation == "horizontal" ? "top" : "left";
            var k = this.orientation == "vertical" ? "width" : "height";
            this._position = a.jqx.position(b);
            if (this.overlay && !this._splitBarClone) {
                if (Math.abs(this._position[i] - this._dragStart[i]) >= 3) {
                    var m = this.splitBar.coord();
                    this._cloneStart = {left: m.left, top: m.top};
                    this._splitBarClone = this._createSplitBarClone();
                    this._raiseEvent(3, {panels: this.panels});
                    return
                }
            }
            if (this._splitBarClone) {
                var j, c;
                var n = this.host[k]();
                var d = n / 100;
                var f = 1 / d;
                var h = 0;
                var l = this._splitBarClone[k]() + 2;
                var g = parseInt(this.host.coord()[i]);
                var e = this._position[i] - this._dragStart[i] + this._cloneStart[i] - g;
                if (h > e) {
                    e = h
                }
                if (e > n + h - l) {
                    e = n + h - l
                }
                j = this.panels[0].min;
                c = this.panels[1].min;
                if (c.toString().indexOf("%") != -1) {
                    c = parseFloat(c) * d
                }
                if (j.toString().indexOf("%") != -1) {
                    j = parseFloat(j) * d
                }
                this._splitBarClone.removeClass(this.toThemeProperty("jqx-splitter-splitbar-invalid"));
                if (e < j) {
                    this._splitBarClone.addClass(this.toThemeProperty("jqx-splitter-splitbar-invalid"));
                    e = j
                }
                if (e > n + h - l - c) {
                    this._splitBarClone.addClass(this.toThemeProperty("jqx-splitter-splitbar-invalid"));
                    e = n + h - l - c
                }
                this._splitBarClone.css(i, e);
                if (b.preventDefault) {
                    b.preventDefault()
                }
                if (b.stopPropagation) {
                    b.stopPropagation()
                }
                return false
            }
            return true
        }, resize: function (c, b) {
            this.width = c;
            this.height = b;
            this._arrange()
        }, _resize: function () {
            var h = this.orientation == "horizontal" ? "height" : "width";
            var f = this.orientation == "horizontal" ? "top" : "left";
            var c = this._splitBarClone.css(f);
            var b = this.host[h]();
            var e = b / 100;
            var d = 1 / e;
            var g = this.panels[0].size;
            if (g.toString().indexOf("%") != -1) {
                this.panels[0].size = parseFloat(c) * d + "%";
                this.panels[1].size = 100 - (parseFloat(c) * d) + "%"
            } else {
                this.panels[0].size = parseFloat(c);
                this.panels[1].size = b - parseFloat(c)
            }
            this._layoutPanels();
            this._raiseEvent(0, {panels: this.panels})
        }, _stopDrag: function () {
            if (this._dragging) {
                this._initOverlay()
            }
            this._dragging = false;
            if (this._splitBarClone) {
                if (this.panels[0].collapsed || this.panels[1].collapsed || this.disabled) {
                    return true
                }
                this._resize();
                this._splitBarClone.remove();
                this._splitBarClone = null
            }
        }, _createSplitBarClone: function () {
            var b = this.splitBar.clone();
            b.fadeTo(0, 0.7);
            b.css("z-index", 99999);
            if (this.orientation == "vertical") {
                b.css("cursor", "col-resize")
            } else {
                b.css("cursor", "row-resize")
            }
            this.host.append(b);
            return b
        }, _eventName: function (b) {
            if (this._isTouchDevice) {
                return this._eventsMap[b]
            } else {
                return b
            }
        }, _addHandlers: function () {
            var c = this;
            a.jqx.utilities.resize(this.host, function () {
                c._layoutPanels()
            });
            this.addHandler(this.splitBar, "dragstart." + this.element.id, function (e) {
                return false
            });
            if (this.splitBarButton) {
                this.addHandler(this.splitBarButton, "click." + this.element.id, function () {
                    var e = function (f) {
                        if (!f.collapsed) {
                            c.collapse()
                        } else {
                            c.expand()
                        }
                    };
                    if (c.panels[0].collapsible) {
                        e(c.panels[0])
                    } else {
                        if (c.panels[1].collapsible) {
                            e(c.panels[1])
                        }
                    }
                });
                this.addHandler(this.splitBarButton, this._eventName("mouseenter"), function () {
                    c.splitBarButton.addClass(c.toThemeProperty("jqx-splitter-collapse-button-hover"));
                    c.splitBarButton.addClass(c.toThemeProperty("jqx-fill-state-hover"))
                });
                this.addHandler(this.splitBarButton, this._eventName("mouseleave"), function () {
                    c.splitBarButton.removeClass(c.toThemeProperty("jqx-splitter-collapse-button-hover"));
                    c.splitBarButton.removeClass(c.toThemeProperty("jqx-fill-state-hover"))
                })
            }
            this.addHandler(a(document), this._eventName("mousemove") + "." + this.element.id, function (e) {
                return c._drag(e)
            });
            this.addHandler(a(document), this._eventName("mouseup") + "." + this.element.id, function () {
                return c._stopDrag()
            });
            this.addHandler(this.splitBar, this._eventName("mousedown"), function (e) {
                return c._startDrag(e)
            });
            this.addHandler(this.splitBar, this._eventName("mouseenter"), function () {
                if (c.resizable && !c.disabled) {
                    c.splitBar.addClass(c.toThemeProperty("jqx-splitter-splitbar-hover"));
                    c.splitBar.addClass(c.toThemeProperty("jqx-fill-state-hover"))
                }
            });
            this.addHandler(this.splitBar, this._eventName("mouseleave"), function () {
                if (c.resizable && !c.disabled) {
                    c.splitBar.removeClass(c.toThemeProperty("jqx-splitter-splitbar-hover"));
                    c.splitBar.removeClass(c.toThemeProperty("jqx-fill-state-hover"))
                }
            });
            if (document.referrer != "" || window.frameElement) {
                if (window.top != null && window.top != window.self) {
                    var d = null;
                    if (window.parent && document.referrer) {
                        d = document.referrer
                    }
                    if (d && d.indexOf(document.location.host) != -1) {
                        var b = function (e) {
                            c._stopDrag()
                        };
                        if (window.top.document.addEventListener) {
                            window.top.document.addEventListener("mouseup", b, false)
                        } else {
                            if (window.top.document.attachEvent) {
                                window.top.document.attachEvent("onmouseup", b)
                            }
                        }
                    }
                }
            }
        }, _removeHandlers: function () {
            this.removeHandler(a(window), "resize." + this.element.id);
            if (this.splitBarButton) {
                this.removeHandler(this.splitBarButton, "click." + this.element.id);
                this.removeHandler(this.splitBarButton, this._eventName("mouseenter"));
                this.removeHandler(this.splitBarButton, this._eventName("mouseleave"))
            }
            this.removeHandler(a(document), this._eventName("mousemove") + "." + this.element.id);
            this.removeHandler(a(document), this._eventName("mouseup") + "." + this.element.id);
            if (this.splitBar) {
                this.removeHandler(this.splitBar, "dragstart." + this.element.id);
                this.removeHandler(this.splitBar, this._eventName("mousedown"));
                this.removeHandler(this.splitBar, this._eventName("mouseenter"));
                this.removeHandler(this.splitBar, this._eventName("mouseleave"))
            }
        }, render: function () {
            if (this.splitBar) {
                this.splitBar.remove()
            }
            var c = this.host.children();
            if (c.length != 2) {
                throw"Invalid HTML Structure! jqxSplitter requires 1 container DIV tag and 2 nested DIV tags."
            }
            if (c.length == 2) {
                var e = c[0].className.split(" ");
                var b = c[1].className.split(" ");
                if (e.indexOf("jqx-reset") != -1 && e.indexOf("jqx-splitter") != -1 && e.indexOf("jqx-widget") != -1) {
                    throw"Invalid HTML Structure! Nested jqxSplitter cannot be initialized from a Splitter Panel. You need to add a new DIV tag inside the Splitter Panel and initialize the nested jqxSplitter from it!"
                }
                if (b.indexOf("jqx-reset") != -1 && b.indexOf("jqx-splitter") != -1 && b.indexOf("jqx-widget") != -1) {
                    throw"Invalid HTML Structure! Nested jqxSplitter cannot be initialized from a Splitter Panel. You need to add a new DIV tag inside the Splitter Panel and initialize the nested jqxSplitter from it!"
                }
            }
            if (this.host.parent().length > 0 && this.host.parent()[0].className.indexOf("jqx-splitter") != -1) {
                if (this.element.className.indexOf("jqx-splitter-panel") != -1) {
                    throw"Invalid HTML Structure! Nested jqxSplitter cannot be initialized from a Splitter Panel. You need to add a new DIV tag inside the Splitter Panel and initialize the nested jqxSplitter from it!"
                }
                this._isNested = true;
                if (this.width == 300) {
                    this.width = "100%"
                }
                if (this.height == 300) {
                    this.height = "100%"
                }
                if (this.width == "100%" && this.height == "100%") {
                    this.host.addClass("jqx-splitter-nested");
                    if (this.host.parent()[0].className.indexOf("jqx-splitter-panel") != -1) {
                        this.host.parent().addClass("jqx-splitter-panel-nested")
                    }
                }
            }
            this._hasBorder = (this.host.hasClass("jqx-hideborder") == false) || this.element.style.borderTopWidth != "";
            this._removeHandlers();
            this._isTouchDevice = a.jqx.mobile.isTouchDevice();
            this._validate();
            this.panel1.css("left", "0px");
            this.panel1.css("top", "0px");
            this.panel2.css("left", "0px");
            this.panel2.css("top", "0px");
            this.splitBar = a("<div><div></div></div>");
            if (!this.resizable) {
                this.splitBar.css("cursor", "default")
            }
            this.splitBarButton = this.splitBar.find("div:last");
            this._setTheme();
            this.splitBar.insertAfter(this.panel1);
            this._arrange();
            if (this.panels[0].collapsible == false && this.panels[1].collapsible == false) {
                this.splitBarButton.hide()
            }
            var d = this;
            this._addHandlers();
            if (this.initContent) {
                this.initContent()
            }
            if (this.disabled) {
                this.disable()
            }
        }, _hiddenParent: function () {
            return a.jqx.isHidden(this.host)
        }, _setTheme: function () {
            this.panel1.addClass(this.toThemeProperty("jqx-widget-content"));
            this.panel2.addClass(this.toThemeProperty("jqx-widget-content"));
            this.panel1.addClass(this.toThemeProperty("jqx-splitter-panel"));
            this.panel2.addClass(this.toThemeProperty("jqx-splitter-panel"));
            this.panel1.addClass(this.toThemeProperty("jqx-reset"));
            this.panel2.addClass(this.toThemeProperty("jqx-reset"));
            this.host.addClass(this.toThemeProperty("jqx-reset"));
            this.host.addClass(this.toThemeProperty("jqx-splitter"));
            this.host.addClass(this.toThemeProperty("jqx-widget"));
            this.host.addClass(this.toThemeProperty("jqx-widget-content"));
            this.splitBar.addClass(this.toThemeProperty("jqx-splitter-splitbar-" + this.orientation));
            this.splitBar.addClass(this.toThemeProperty("jqx-fill-state-normal"));
            this.splitBarButton.addClass(this.toThemeProperty("jqx-splitter-collapse-button-" + this.orientation));
            this.splitBarButton.addClass(this.toThemeProperty("jqx-fill-state-pressed"))
        }, _validate: function () {
            var b = this.host.children();
            if (b.length != 2) {
                throw"Invalid HTML Structure! jqxSplitter requires two nested DIV tags!"
            }
            if (this.panels && !this.panels[1]) {
                if (!this.panels[0]) {
                    this.panels = [{size: "50%"}, {size: "50%"}]
                } else {
                    this.panels[1] = {}
                }
            } else {
                if (this.panels == undefined) {
                    this.panels = [{size: "50%"}, {size: "50%"}]
                }
            }
            var b = this.host.children();
            this.panel1 = this.panels[0].element = a(b[0]);
            this.panel2 = this.panels[1].element = a(b[1]);
            this.panel1[0].style.minWidth = "";
            this.panel1[0].style.maxWidth = "";
            this.panel2[0].style.minWidth = "";
            this.panel2[0].style.maxWidth = "";
            a.each(this.panels, function () {
                if (this.min == undefined) {
                    this.min = 0
                }
                if (this.size == undefined) {
                    this.size = 0
                }
                if (this.size < 0) {
                    this.size = 0
                }
                if (this.min < 0) {
                    this.min = 0
                }
                if (this.collapsible == undefined) {
                    this.collapsible = true
                }
                if (this.collapsed == undefined) {
                    this.collapsed = false
                }
                if (this.size != 0) {
                    if (this.size.toString().indexOf("px") != -1) {
                        this.size = parseInt(this.size)
                    }
                    if (this.size.toString().indexOf("%") == -1) {
                        if (parseInt(this.min) > parseInt(this.size)) {
                            this.min = this.size
                        }
                    } else {
                        if (this.min.toString().indexOf("%") != -1) {
                            if (parseInt(this.min) > parseInt(this.size)) {
                                this.min = this.size
                            }
                        }
                    }
                }
            })
        }, _arrange: function () {
            if (this.width != null) {
                var d = this.width;
                if (typeof d != "string") {
                    d = parseInt(this.width) + "px"
                }
                this.host.css("width", d)
            }
            if (this.height != null) {
                var b = this.height;
                if (typeof b != "string") {
                    b = parseInt(this.height) + "px"
                }
                this.host.css("height", b)
            }
            this._splitBarSize = !this._isTouchDevice ? this.splitBarSize : this.touchSplitBarSize;
            if (!this.showSplitBar) {
                this._splitBarSize = 0;
                this.splitBar.hide()
            }
            var c = this.orientation == "horizontal" ? "width" : "height";
            this.splitBar.css(c, "100%");
            this.panel1.css(c, "100%");
            this.panel2.css(c, "100%");
            if (this.orientation == "horizontal") {
                this.splitBar.height(this._splitBarSize)
            } else {
                this.splitBar.width(this._splitBarSize)
            }
            if (this.orientation === "vertical") {
                this.splitBarButton.width(this._splitBarSize);
                this.splitBarButton.height(45)
            } else {
                this.splitBarButton.height(this._splitBarSize);
                this.splitBarButton.width(45)
            }
            this.splitBarButton.css("position", "relative");
            if (this.orientation === "vertical") {
                this.splitBarButton.css("top", "50%");
                this.splitBarButton.css("left", "0");
                this.splitBarButton.css("margin-top", "-23px");
                this.splitBarButton.css("margin-left", "-0px")
            } else {
                this.splitBarButton.css("left", "50%");
                this.splitBarButton.css("top", "0");
                this.splitBarButton.css("margin-left", "-23px");
                this.splitBarButton.css("margin-top", "-0px")
            }
            this._layoutPanels()
        }, collapse: function () {
            if (this.disabled) {
                return
            }
            var b = -1;
            this.panels[0].collapsed = this.panels[1].collapsed = false;
            this.panels[0].element[0].style.visibility = "inherit";
            this.panels[1].element[0].style.visibility = "inherit";
            if (this.panels[0].collapsible) {
                b = 0
            } else {
                if (this.panels[1].collapsible) {
                    b = 1
                }
            }
            if (b != -1) {
                this.panels[b].collapsed = true;
                this.panels[b].element[0].style.visibility = "hidden";
                this.splitBar.addClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed"));
                this._layoutPanels();
                this._raiseEvent(2, {index: b, panels: this.panels});
                this._raiseEvent(0, {panels: this.panels})
            }
        }, expand: function () {
            if (this.disabled) {
                return
            }
            var b = -1;
            this.panels[0].collapsed = this.panels[1].collapsed = false;
            this.panels[0].element[0].style.visibility = "inherit";
            this.panels[1].element[0].style.visibility = "inherit";
            if (this.panels[0].collapsible) {
                b = 0
            } else {
                if (this.panels[1].collapsible) {
                    b = 1
                }
            }
            if (b != -1) {
                this.panels[b].collapsed = false;
                this.panels[b].element[0].style.visibility = "inherit";
                this.splitBar.removeClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed"));
                this._layoutPanels();
                this._raiseEvent(1, {index: b, panels: this.panels});
                this._raiseEvent(0, {panels: this.panels})
            }
        }, disable: function () {
            this.disabled = true;
            this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));
            this.splitBar.addClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed"));
            this.splitBarButton.addClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed"))
        }, enable: function () {
            this.disabled = false;
            this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"));
            this.splitBar.removeClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed"));
            this.splitBarButton.removeClass(this.toThemeProperty("jqx-splitter-splitbar-collapsed"))
        }, refresh: function (b) {
            if (b != true) {
                this._arrange()
            }
        }, propertyChangedHandler: function (b, c, e, d) {
            if (c === "panels" || c === "orientation" || c === "showSplitBar") {
                b.render();
                return
            }
            if (c === "touchMode") {
                b._isTouchDevice = d
            }
            if (c === "disabled") {
                if (d) {
                    b.disable()
                } else {
                    b.enable()
                }
            } else {
                if (c === "theme") {
                    a.jqx.utilities.setTheme(e, d, b.host)
                } else {
                    b.refresh()
                }
            }
        }, _layoutPanels: function () {
            var j = this;
            var q = this.orientation == "horizontal" ? "height" : "width";
            var t = this.orientation == "horizontal" ? "top" : "left";
            var l, r, e, u;
            var m = parseInt(this._splitBarSize) + 1;
            if (!this.showSplitBar) {
                m = 0
            }
            var i = this.host[q]();
            var k = i / 100;
            var s = 1 / k;
            var p = s * m;
            var h = this.panel1;
            var g = this.panel2;
            var n = this.panels[0].size;
            if (this.panels[0].collapsed) {
                e = true
            }
            if (this.panels[1].collapsed) {
                u = true
            }
            l = this.panels[0].min;
            r = this.panels[1].min;
            if (r.toString().indexOf("%") != -1) {
                r = parseFloat(r) * k
            }
            if (l.toString().indexOf("%") != -1) {
                l = parseFloat(l) * k
            }
            if (this._isNested && this._isTouchDevice) {
                if (this.orientation == "horizontal") {
                    h.width(this.host.width());
                    g.width(this.host.width())
                } else {
                    h.height(this.host.height());
                    g.height(this.host.height())
                }
            }
            var f = function () {
                var w = j.panel1[q]();
                if (j.splitBar[0].style[t] != w + "px") {
                    var x = w;
                    if (j.orientation == "vertical") {
                        j.splitBar[0].style.borderLeftColor = "";
                        j.splitBar[0].style.borderRightColor = "";
                        j.splitBarButton[0].style.width = parseInt(j._splitBarSize) + "px";
                        j.splitBarButton[0].style.left = "0px"
                    } else {
                        j.splitBar[0].style.borderTopColor = "";
                        j.splitBar[0].style.borderBottomColor = "";
                        j.splitBarButton[0].style.height = parseInt(j._splitBarSize) + "px";
                        j.splitBarButton[0].style.top = "0px"
                    }
                    if (j._hasBorder) {
                        if (i - m == w) {
                            if (j.orientation == "vertical") {
                                j.splitBar[0].style.borderRightColor = "transparent";
                                j.splitBarButton[0].style.width = parseInt(j._splitBarSize + 1) + "px"
                            } else {
                                j.splitBar[0].style.borderBottomColor = "transparent";
                                j.splitBarButton[0].style.height = parseInt(j._splitBarSize + 1) + "px"
                            }
                        } else {
                            if (w == 0) {
                                if (j.orientation == "vertical") {
                                    j.splitBar[0].style.borderLeftColor = "transparent";
                                    j.splitBarButton[0].style.width = parseInt(j._splitBarSize + 1) + "px";
                                    j.splitBarButton[0].style.left = "-1px"
                                } else {
                                    j.splitBar[0].style.borderTopColor = "transparent";
                                    j.splitBarButton[0].style.height = parseInt(j._splitBarSize + 1) + "px";
                                    j.splitBarButton[0].style.top = "-1px"
                                }
                            }
                        }
                    }
                    j.splitBar[0].style[t] = x + "px"
                }
                if (j.panel2[0].style[t] != w + m + "px") {
                    j.panel2[0].style[t] = w + m + "px"
                }
            };
            if (e) {
                var b = Math.max(r, i - m);
                h[q](0);
                g[q](b)
            } else {
                if (u) {
                    var b = Math.max(l, i - m);
                    g[q](0);
                    h[q](b)
                } else {
                    if (n.toString().indexOf("%") != -1) {
                        var c = 100 - parseFloat(n);
                        h.css(q, parseFloat(n) + "%");
                        c -= p;
                        g.css(q, c + "%");
                        var d = g[q]();
                        if (d < r) {
                            var b = d - r;
                            var o = b * s;
                            n = parseFloat(n) + parseFloat(o);
                            var c = 100 - parseFloat(n);
                            h.css(q, parseFloat(n) + "%");
                            c -= p;
                            g.css(q, c + "%")
                        }
                        var v = h[q]();
                        if (v < l) {
                            var o = l * s;
                            h.css(q, parseFloat(o) + "%")
                        }
                    } else {
                        var d = i - n - m;
                        if (h[0].style[q] != n + "px") {
                            h[q](n)
                        }
                        if (g[0].style[q] != d + "px") {
                            g[q](d)
                        }
                        if (d < r) {
                            n += d - r;
                            g[q](r);
                            h[q](n)
                        }
                        if (n < l) {
                            h[q](l)
                        }
                    }
                }
            }
            f();
            this._raiseEvent(4, {panels: this.panels})
        }, destroy: function () {
            this._removeHandlers();
            a.jqx.utilities.resize(this.host, null, true);
            this.host.remove()
        }, _raiseEvent: function (d, f) {
            var e = new a.Event(this._events[d]);
            e.owner = this;
            e.args = f;
            var c = this.orientation == "vertical" ? "width" : "height";
            var b = new Array();
            b[0] = {};
            b[1] = {};
            b[0].size = this.orientation == "vertical" ? this.panel1[0].offsetWidth : this.panel1[0].offsetHeight;
            b[1].size = this.orientation == "vertical" ? this.panel2[0].offsetWidth : this.panel2[0].offsetHeight;
            b[0].min = this.panels[0].min;
            b[1].min = this.panels[1].min;
            b[0].collapsible = this.panels[0].collapsible;
            b[1].collapsible = this.panels[1].collapsible;
            b[0].collapsed = this.panels[0].collapsed;
            b[1].collapsed = this.panels[1].collapsed;
            e.args.panels = b;
            return this.host.trigger(e)
        }
    })
}(jqxBaseFramework));

