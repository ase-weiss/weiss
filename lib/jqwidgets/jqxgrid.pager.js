/*
jQWidgets v5.3.0 (2017-Sep)
Copyright (c) 2011-2017 jQWidgets.
License: https://jqwidgets.com/license/
*/

(function (a) {
    a.extend(a.jqx._jqxGrid.prototype, {
        _initpager: function () {
            var r = this.that;
            var j = this.gridlocalization.pagergotopagestring;
            var s = this.gridlocalization.pagerrangestring;
            var l = this.gridlocalization.pagershowrowsstring;
            var m = (this.pagerheight - 20) / 2;
            this.pagerdiv = this.pagerdiv || a('<div style="line-height: 20px; width: 100%; height: 100%; position: relative;"></div>');
            if (!this.pageable) {
                this.pagerdiv.remove();
                this.vScrollBar.jqxScrollBar({thumbSize: 0});
                return
            }
            if (!this.pagerrenderer) {
                this.pagerdiv.css("top", m);
                this.pager.append(this.pagerdiv);
                this.pagergotoinput = this.pagergotoinput || a('<div style="margin-right: 12px; width: 27px; height: 27px; float: right;"><input style="margin-top: 0px; text-align: right; height:27px; width: 27px;" type="text"/></div>');
                this.pagergoto = this.pagergoto || a('<div style="float: right; margin-right: 7px;"></div>');
                this.pagerrightbutton = this.pagerrightbutton || a('<div type="button" style="padding: 0px; margin-top: 0px; margin-right: 3px; height:20px; width: 27px; float: right;"></div>');
                this.pagerleftbutton = this.pagerleftbutton || a('<div type="button" style="padding: 0px; margin-top: 0px; margin-right: 3px; height:20px; width: 27px; float: right;"></div>');
                this.pagerdetails = this.pagerdetails || a('<div style="margin-right: 7px; float: right;"></div>');
                this.pagershowrows = this.pagershowrows || a('<div style="margin-right: 7px; float: right;"></div>');
                this.pagerbuttons = a('<div style="margin-right: 3px; float: right;"></div>');
                if (this.pagershowrowscombo && this.pagershowrowscombo.jqxDropDownList) {
                    this.pagershowrowscombo.remove();
                    this.pagershowrowscombo = null
                }
                this.pagergotoinput.attr("disabled", this.disabled);
                this.pagerfirstbutton = a('<div type="button" style="padding: 0px; margin-top: 0px; margin-left: 3px; margin-right: 3px; height: 27px; width: 27px; float: right;"></div>');
                this.pagerlastbutton = a('<div type="button" style="padding: 0px; margin-top: 0px; margin-right: 3px; width: 27px; float: right;"></div>');
                this.pagershowrowscombo = this.pagershowrowscombo || a('<div id="gridpagerlist" style="margin-top: 0px; margin-right: 7px; float: right;"></div>');
                this.pagerdiv.children().remove();
                this.pagershowrowscombo[0].id = "gridpagerlist" + this.element.id;
                this.removeHandler(this.pagerrightbutton, "mousedown");
                this.removeHandler(this.pagerrightbutton, "mouseup");
                this.removeHandler(this.pagerrightbutton, "click");
                this.removeHandler(this.pagerleftbutton, "mousedown");
                this.removeHandler(this.pagerleftbutton, "mouseup");
                this.removeHandler(this.pagerleftbutton, "click");
                this.removeHandler(this.pagerfirstbutton, "mousedown");
                this.removeHandler(this.pagerfirstbutton, "mouseup");
                this.removeHandler(this.pagerfirstbutton, "click");
                this.removeHandler(this.pagerlastbutton, "mousedown");
                this.removeHandler(this.pagerlastbutton, "mouseup");
                this.removeHandler(this.pagerlastbutton, "click");
                this.pagerleftbutton.attr("title", this.gridlocalization.pagerpreviousbuttonstring);
                this.pagerrightbutton.attr("title", this.gridlocalization.pagernextbuttonstring);
                if (this.pagermode == "simple") {
                    if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                        this.pagerbuttons.css("overflow", "visible");
                        this.pagerbuttons.css("padding", "3px")
                    }
                    this.pagerfirstbutton.attr("title", this.gridlocalization.pagerfirstbuttonstring);
                    this.pagerlastbutton.attr("title", this.gridlocalization.pagerlastbuttonstring);
                    var n = a("<div style='margin-left: 6px; width: 15px; height: 20px;'></div>");
                    n.addClass(this.toThemeProperty("jqx-icon-arrow-first"));
                    this.pagerfirstbutton.wrapInner(n);
                    var g = a("<div style='margin-left: 6px; width: 15px; height: 20px;'></div>");
                    g.addClass(this.toThemeProperty("jqx-icon-arrow-last"));
                    this.pagerlastbutton.wrapInner(g);
                    if (!this.rtl) {
                        this.pagerdiv.append(this.pagerfirstbutton);
                        this.pagerdiv.append(this.pagerleftbutton);
                        this.pagerdiv.append(this.pagerbuttons);
                        this.pagerdiv.append(this.pagerrightbutton);
                        this.pagerdiv.append(this.pagerlastbutton)
                    } else {
                        this.pagerdiv.append(this.pagerlastbutton);
                        this.pagerdiv.append(this.pagerrightbutton);
                        this.pagerdiv.append(this.pagerbuttons);
                        this.pagerdiv.append(this.pagerleftbutton);
                        this.pagerdiv.append(this.pagerfirstbutton)
                    }
                    this.pagerlastbutton.jqxButton({cursor: "pointer", disabled: this.disabled, theme: this.theme});
                    this.pagerfirstbutton.jqxButton({cursor: "pointer", disabled: this.disabled, theme: this.theme});
                    var t = !this.rtl ? "left" : "right";
                    this.pagerbuttons.css("float", t);
                    this.pagerlastbutton.css("float", t);
                    this.pagerfirstbutton.css("float", t);
                    this.pagerrightbutton.css("float", t);
                    this.pagerleftbutton.css("float", t);
                    this.pagerdetails.css("float", this.rtl ? "left" : "right");
                    if (this.rtl) {
                        this.pagerdetails.css("margin-left", "7px");
                        this.pagerdetails.css("margin-right", "0px")
                    } else {
                        this.pagerdetails.css("margin-left", "0px");
                        this.pagerdetails.css("margin-right", "7px")
                    }
                    this.pagergotoinput.hide();
                    this.pagershowrowscombo.hide();
                    this.pagergoto.hide();
                    this.pagershowrows.hide()
                } else {
                    this.pagergotoinput.show();
                    this.pagershowrowscombo.show();
                    this.pagergoto.show();
                    this.pagershowrows.show();
                    if (!this.rtl) {
                        this.pagerdiv.append(this.pagerrightbutton);
                        this.pagerdiv.append(this.pagerleftbutton)
                    }
                }
                this.pagerrightbutton.jqxButton({cursor: "pointer", disabled: this.disabled, theme: this.theme});
                this.pagerleftbutton.jqxButton({cursor: "pointer", disabled: this.disabled, theme: this.theme});
                this.pagerleftbutton.find(".jqx-icon-arrow-left").remove();
                this.pagerrightbutton.find(".jqx-icon-arrow-right").remove();
                var c = a("<div style='margin-left: 6px; width: 15px; height: 20px;'></div>");
                c.addClass(this.toThemeProperty("jqx-icon-arrow-left"));
                this.pagerleftbutton.wrapInner(c);
                var d = a("<div style='margin-left: 6px; width: 15px; height: 20px;'></div>");
                d.addClass(this.toThemeProperty("jqx-icon-arrow-right"));
                this.pagerrightbutton.wrapInner(d);
                this.pagerdiv.append(this.pagerdetails);
                if (this.pagermode != "simple") {
                    if (!this.rtl) {
                        this.pagerdiv.append(this.pagershowrowscombo);
                        this.pagerdiv.append(this.pagershowrows);
                        this.pagerdiv.append(this.pagergotoinput);
                        this.pagerdiv.append(this.pagergoto)
                    } else {
                        this.pagerdiv.append(this.pagergoto);
                        this.pagerdiv.append(this.pagergotoinput);
                        this.pagerdiv.append(this.pagershowrows);
                        this.pagerdiv.append(this.pagershowrowscombo);
                        this.pagerdiv.append(this.pagerdetails);
                        this.pagerdiv.append(this.pagerrightbutton);
                        this.pagerdiv.append(this.pagerleftbutton)
                    }
                }
                var o = this.pagesizeoptions;
                if (!this.pagershowrowscombo.jqxDropDownList) {
                    throw new Error("jqxGrid: jqxdropdownlist.js is not loaded.");
                    return
                }
                this.pagershowrowscombo.jqxDropDownList({
                    rtl: this.rtl,
                    disabled: this.disabled,
                    source: o,
                    enableBrowserBoundsDetection: true,
                    keyboardSelection: false,
                    autoDropDownHeight: true,
                    width: "auto",
                    height: 20,
                    theme: this.theme
                });
                var q = 0;
                for (var p = 0; p < o.length; p++) {
                    if (this.pagesize >= o[p]) {
                        q = p
                    }
                }
                this.pagershowrows[0].innerHTML = l;
                this.pagergoto[0].innerHTML = j;
                this.updatepagerdetails();
                this.pagershowrowscombo.jqxDropDownList({selectedIndex: q});
                this.pagerpageinput = this.pagergotoinput.find("input");
                this.pagerpageinput.addClass(this.toThemeProperty("jqx-input"));
                this.pagerpageinput.addClass(this.toThemeProperty("jqx-widget-content"));
                if (this.rtl) {
                    this.pagerpageinput.css("direction", "rtl")
                }
                var r = this.that;
                this.removeHandler(this.pagershowrowscombo, "select");
                this.addHandler(this.pagershowrowscombo, "select", function (w) {
                    if (w.args) {
                        if (r.vScrollInstance) {
                            r.vScrollInstance.setPosition(0)
                        }
                        if (r.editcell != null && r.endcelledit) {
                            r.endcelledit(r.editcell.row, r.editcell.column, true, false)
                        }
                        var u = w.args.index;
                        var x = r.dataview.pagenum * r.dataview.pagesize;
                        var v = o[u];
                        var y = r.pagesize;
                        r.pagesize = parseInt(v);
                        if (isNaN(r.pagesize)) {
                            r.pagesize = 10
                        }
                        if (v >= 100) {
                            r.pagershowrowscombo.jqxDropDownList({width: "auto"})
                        } else {
                            r.pagershowrowscombo.jqxDropDownList({width: 44})
                        }
                        r.dataview.pagesize = r.pagesize;
                        var i = Math.floor(x / r.dataview.pagesize);
                        r.prerenderrequired = true;
                        r._requiresupdate = true;
                        r._raiseEvent(10, {pagenum: i, oldpagesize: y, pagesize: r.dataview.pagesize});
                        r.gotopage(i);
                        if (r.autoheight && r._updatesizeonwindowresize) {
                            r._updatesize(true);
                            setTimeout(function () {
                                r._updatesize(true)
                            }, 500)
                        }
                    }
                });
                var k = this.pagergotoinput.find("input");
                k.addClass(this.toThemeProperty("jqx-grid-pager-input"));
                k.addClass(this.toThemeProperty("jqx-rc-all"));
                this.removeHandler(k, "keydown");
                this.removeHandler(k, "change");
                this.addHandler(k, "keydown", function (i) {
                    if (i.keyCode >= 65 && i.keyCode <= 90) {
                        return false
                    }
                    if (i.keyCode == "13") {
                        var u = k.val();
                        u = parseInt(u);
                        if (!isNaN(u)) {
                            r.gotopage(u - 1)
                        }
                        return false
                    }
                });
                this.addHandler(k, "change", function () {
                    var i = k.val();
                    i = parseInt(i);
                    if (!isNaN(i)) {
                        r.gotopage(i - 1)
                    }
                });
                this.addHandler(this.pagerrightbutton, "mouseenter", function () {
                    d.addClass(r.toThemeProperty("jqx-icon-arrow-right-hover"))
                });
                this.addHandler(this.pagerleftbutton, "mouseenter", function () {
                    c.addClass(r.toThemeProperty("jqx-icon-arrow-left-hover"))
                });
                this.addHandler(this.pagerrightbutton, "mouseleave", function () {
                    d.removeClass(r.toThemeProperty("jqx-icon-arrow-right-hover"))
                });
                this.addHandler(this.pagerleftbutton, "mouseleave", function () {
                    c.removeClass(r.toThemeProperty("jqx-icon-arrow-left-hover"))
                });
                this.addHandler(this.pagerrightbutton, "mousedown", function () {
                    d.addClass(r.toThemeProperty("jqx-icon-arrow-right-selected"))
                });
                this.addHandler(this.pagerrightbutton, "mouseup", function () {
                    d.removeClass(r.toThemeProperty("jqx-icon-arrow-right-selected"))
                });
                this.addHandler(this.pagerleftbutton, "mousedown", function () {
                    c.addClass(r.toThemeProperty("jqx-icon-arrow-left-selected"))
                });
                this.addHandler(this.pagerleftbutton, "mouseup", function () {
                    c.removeClass(r.toThemeProperty("jqx-icon-arrow-left-selected"))
                });
                this.addHandler(a(document), "mouseup.pagerbuttons" + this.element.id, function () {
                    d.removeClass(r.toThemeProperty("jqx-icon-arrow-right-selected"));
                    c.removeClass(r.toThemeProperty("jqx-icon-arrow-left-selected"))
                });
                this.addHandler(this.pagerrightbutton, "click", function () {
                    if (!r.pagerrightbutton.jqxButton("disabled")) {
                        if (!r.rtl) {
                            r.gotonextpage()
                        } else {
                            r.gotoprevpage()
                        }
                    }
                });
                this.addHandler(this.pagerleftbutton, "click", function () {
                    if (!r.pagerleftbutton.jqxButton("disabled")) {
                        if (!r.rtl) {
                            r.gotoprevpage()
                        } else {
                            r.gotonextpage()
                        }
                    }
                });
                var f = this;
                if (this.pagermode === "simple") {
                    var e = this.pagerfirstbutton;
                    var h = this.pagerlastbutton;
                    this.addHandler(h, "mouseenter", function () {
                        g.addClass(f.toThemeProperty("jqx-icon-arrow-last-hover"))
                    });
                    this.addHandler(e, "mouseenter", function () {
                        n.addClass(f.toThemeProperty("jqx-icon-arrow-first-hover"))
                    });
                    this.addHandler(h, "mouseleave", function () {
                        g.removeClass(f.toThemeProperty("jqx-icon-arrow-last-hover"))
                    });
                    this.addHandler(e, "mouseleave", function () {
                        n.removeClass(f.toThemeProperty("jqx-icon-arrow-first-hover"))
                    });
                    this.addHandler(h, "mousedown", function () {
                        g.addClass(f.toThemeProperty("jqx-icon-arrow-last-selected"))
                    });
                    this.addHandler(e, "mousedown", function () {
                        n.addClass(f.toThemeProperty("jqx-icon-arrow-first-selected"))
                    });
                    this.addHandler(h, "mouseup", function () {
                        g.removeClass(f.toThemeProperty("jqx-icon-arrow-last-selected"))
                    });
                    this.addHandler(e, "mouseup", function () {
                        n.removeClass(f.toThemeProperty("jqx-icon-arrow-first-selected"))
                    });
                    this.addHandler(a(document), "mouseup.pagerbuttons" + name + this.element.id, function () {
                        d.removeClass(f.toThemeProperty("jqx-icon-arrow-right-selected"));
                        c.removeClass(f.toThemeProperty("jqx-icon-arrow-left-selected"));
                        if (g) {
                            g.removeClass(f.toThemeProperty("jqx-icon-arrow-last-selected"));
                            n.removeClass(f.toThemeProperty("jqx-icon-arrow-first-selected"))
                        }
                    });
                    this.addHandler(e, "click", function () {
                        if (!e.jqxButton("disabled")) {
                            if (!f.rtl) {
                                f.gotopage(0)
                            } else {
                                var u = f.dataview.totalrecords;
                                var i = Math.ceil(u / f.pagesize);
                                f.gotopage(i - 1)
                            }
                        }
                    });
                    this.addHandler(h, "click", function () {
                        if (!h.jqxButton("disabled")) {
                            if (!f.rtl) {
                                var u = f.dataview.totalrecords;
                                var i = Math.ceil(u / f.pagesize);
                                f.gotopage(i - 1)
                            } else {
                                f.gotopage(0)
                            }
                        }
                    })
                }
            } else {
                this.pagerdiv.children().remove();
                var b = this.pagerrenderer();
                if (b != null) {
                    this.pagerdiv.append(a(b))
                }
                this.pager.append(this.pagerdiv)
            }
            this.vScrollBar.jqxScrollBar("refresh");
            this._arrange()
        }, _updatepagertheme: function () {
            if (this.pagershowrowscombo == null) {
                return
            }
            this.pagershowrowscombo.jqxDropDownList({theme: this.theme});
            this.pagerrightbutton.jqxButton({theme: this.theme});
            this.pagerleftbutton.jqxButton({theme: this.theme});
            this.pagerpageinput.removeClass();
            var c = this.pagergotoinput.find("input");
            c.removeClass();
            c.addClass(this.toThemeProperty("jqx-grid-pager-input"));
            c.addClass(this.toThemeProperty("jqx-rc-all"));
            this.pagerpageinput.addClass(this.toThemeProperty("jqx-input"));
            this.pagerpageinput.addClass(this.toThemeProperty("jqx-widget-content"));
            this.pagerleftbutton.find(".jqx-icon-arrow-left").remove();
            this.pagerrightbutton.find(".jqx-icon-arrow-right").remove();
            var d = a("<div style='margin-left: 6px; width: 15px; height: 15px;'></div>");
            d.addClass(this.toThemeProperty("jqx-icon-arrow-left"));
            this.pagerleftbutton.wrapInner(d);
            var e = a("<div style='margin-left: 6px; width: 15px; height: 15px;'></div>");
            e.addClass(this.toThemeProperty("jqx-icon-arrow-right"));
            this.pagerrightbutton.wrapInner(e);
            if (this.pagermode == "simple") {
                if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                    this.pagerbuttons.css("overflow", "visible");
                    this.pagerbuttons.css("padding", "3px")
                }
                this.pagerfirstbutton.attr("title", this.gridlocalization.pagerfirstbuttonstring);
                this.pagerlastbutton.attr("title", this.gridlocalization.pagerlastbuttonstring);
                var h = a("<div style='margin-left: 6px; width: 15px; height: 15px;'></div>");
                h.addClass(this.toThemeProperty("jqx-icon-arrow-first"));
                this.pagerfirstbutton.wrapInner(h);
                var g = a("<div style='margin-left: 6px; width: 15px; height: 15px;'></div>");
                g.addClass(this.toThemeProperty("jqx-icon-arrow-last"));
                this.pagerlastbutton.wrapInner(g);
                this.pagerdiv.append(this.pagerfirstbutton);
                this.pagerdiv.append(this.pagerleftbutton);
                this.pagerdiv.append(this.pagerbuttons);
                this.pagerdiv.append(this.pagerrightbutton);
                this.pagerdiv.append(this.pagerlastbutton);
                this.pagerlastbutton.jqxButton({cursor: "pointer", disabled: this.disabled, theme: this.theme});
                this.pagerfirstbutton.jqxButton({cursor: "pointer", disabled: this.disabled, theme: this.theme});
                this.pagerbuttons.css("float", "left");
                this.pagerlastbutton.css("float", "left");
                this.pagerfirstbutton.css("float", "left");
                this.pagerrightbutton.css("float", "left");
                this.pagerleftbutton.css("float", "left");
                this.pagergotoinput.hide();
                this.pagershowrowscombo.hide();
                this.pagergoto.hide();
                this.pagershowrows.hide()
            } else {
                this.pagergotoinput.show();
                this.pagershowrowscombo.show();
                this.pagergoto.show();
                this.pagershowrows.show()
            }
            var b = function (j, i) {
                j.removeHandler(i, "mouseenter");
                j.removeHandler(i, "mouseleave");
                j.removeHandler(i, "mousedown");
                j.removeHandler(i, "mouseup")
            };
            b(this, this.pagerrightbutton);
            b(this, this.pagerleftbutton);
            var f = this.that;
            this.addHandler(this.pagerrightbutton, "mouseenter", function () {
                e.addClass(f.toThemeProperty("jqx-icon-arrow-right-hover"))
            });
            this.addHandler(this.pagerleftbutton, "mouseenter", function () {
                d.addClass(f.toThemeProperty("jqx-icon-arrow-left-hover"))
            });
            this.addHandler(this.pagerrightbutton, "mouseleave", function () {
                e.removeClass(f.toThemeProperty("jqx-icon-arrow-right-hover"))
            });
            this.addHandler(this.pagerleftbutton, "mouseleave", function () {
                d.removeClass(f.toThemeProperty("jqx-icon-arrow-left-hover"))
            });
            this.addHandler(this.pagerrightbutton, "mousedown", function () {
                e.addClass(f.toThemeProperty("jqx-icon-arrow-right-selected"))
            });
            this.addHandler(this.pagerrightbutton, "mouseup", function () {
                e.removeClass(f.toThemeProperty("jqx-icon-arrow-right-selected"))
            });
            this.addHandler(this.pagerleftbutton, "mousedown", function () {
                d.addClass(f.toThemeProperty("jqx-icon-arrow-left-selected"))
            });
            this.addHandler(this.pagerleftbutton, "mouseup", function () {
                d.removeClass(f.toThemeProperty("jqx-icon-arrow-left-selected"))
            })
        }, gotopage: function (d) {
            if (d == null || d == undefined) {
                d = 0
            }
            if (d == -1) {
                d = 0
            }
            if (d < 0) {
                return
            }
            var c = this.dataview.totalrecords;
            if (this.summaryrows) {
                c += this.summaryrows.length
            }
            var e = this.pagenum;
            this._raiseEvent(25, {oldpagenum: this.dataview.pagenum, pagenum: d, pagesize: this.dataview.pagesize});
            var b = Math.ceil(c / this.pagesize);
            if (d >= b) {
                if (this.dataview.totalrecords == 0) {
                    this.dataview.pagenum = 0;
                    this.updatepagerdetails()
                }
                if (d > 0) {
                    d = b - 1
                }
                if (d < 0) {
                    d = 0
                }
            }
            if (this.dataview.pagenum != d || this._requiresupdate) {
                if (this.pageable) {
                    if (this.source.pager) {
                        this.source.pager(d, this.dataview.pagesize, this.dataview.pagenum)
                    }
                    this.dataview.pagenum = d;
                    if (this.virtualmode) {
                        this.hiddens = new Array();
                        this.expandedgroups = new Array();
                        if (this.rendergridrows) {
                            var h = d * this.dataview.pagesize;
                            var g = h + this.dataview.pagesize;
                            if (h != null && g != null) {
                                if (this.pagerrightbutton) {
                                    this.pagerrightbutton.jqxButton({disabled: true});
                                    this.pagerleftbutton.jqxButton({disabled: true});
                                    this.pagershowrowscombo.jqxDropDownList({disabled: true})
                                }
                                if (this.pagerfirstbutton) {
                                    this.pagerfirstbutton.jqxButton({disabled: true});
                                    this.pagerlastbutton.jqxButton({disabled: true})
                                }
                                this.updatebounddata("pagechanged");
                                this._raiseEvent(9, {pagenum: d, oldpagenum: e, pagesize: this.dataview.pagesize});
                                this.updatepagerdetails();
                                if (this.autosavestate) {
                                    if (this.savestate) {
                                        this.savestate()
                                    }
                                }
                                return
                            }
                        }
                    } else {
                        this.dataview.updateview()
                    }
                    this._loadrows();
                    this._updatepageviews();
                    this.tableheight = null;
                    this._updatecolumnwidths();
                    this._updatecellwidths();
                    this._renderrows(this.virtualsizeinfo);
                    this.updatepagerdetails();
                    if (this.autoheight || this.autorowheight) {
                        var f = this.host.height() - this._gettableheight();
                        height = f + this._pageviews[0].height;
                        if (height != this.host.height()) {
                            this._arrange();
                            this._updatepageviews();
                            if (this.autorowheight) {
                                this._renderrows(this.virtualsizeinfo)
                            }
                        }
                    }
                    if (this.editcell != null && this.endcelledit) {
                        this.endcelledit(this.editcell.row, this.editcell.column, false, false)
                    }
                    this.focus();
                    this._raiseEvent(9, {pagenum: d, oldpagenum: e, pagesize: this.dataview.pagesize});
                    if (this.autosavestate) {
                        if (this.savestate) {
                            this.savestate()
                        }
                    }
                }
            }
        }, gotoprevpage: function () {
            if (this.dataview.pagenum > 0) {
                this.gotopage(this.dataview.pagenum - 1)
            } else {
                if (this.pagermode != "simple") {
                    var c = this.dataview.totalrecords;
                    if (this.summaryrows) {
                        c += this.summaryrows.length
                    }
                    var b = Math.ceil(c / this.pagesize);
                    this.gotopage(b - 1)
                }
            }
        }, gotonextpage: function () {
            var c = this.dataview.totalrecords;
            if (this.summaryrows) {
                c += this.summaryrows.length
            }
            var b = Math.ceil(c / this.pagesize);
            if (this.dataview.pagenum < b - 1) {
                this.gotopage(this.dataview.pagenum + 1)
            } else {
                if (this.pagermode != "simple") {
                    this.gotopage(0)
                }
            }
        }, updatepagerdetails: function () {
            if (this.pagerdetails != null && this.pagerdetails.length > 0) {
                var n = this.dataview.pagenum * this.pagesize;
                var d = (this.dataview.pagenum + 1) * this.pagesize;
                if (d >= this.dataview.totalrecords) {
                    d = this.dataview.totalrecords
                }
                var q = this.dataview.totalrecords;
                if (this.summaryrows) {
                    q += this.summaryrows.length;
                    if ((this.dataview.pagenum + 1) * this.pagesize > this.dataview.totalrecords) {
                        d = q
                    }
                }
                n++;
                var g = Math.ceil(q / this.dataview.pagesize);
                if (g >= 1) {
                    g--
                }
                g++;
                if (this.pagermode !== "simple") {
                    var o = this.pagergotoinput.find("input");
                    o.val(this.dataview.pagenum + 1)
                } else {
                    var b = "";
                    var f = this.pagerbuttonscount;
                    if (f == 0 || !f) {
                        f = 5
                    }
                    var h = 0;
                    if (this.rtl) {
                        h = f - 1
                    }
                    while ((this.rtl && h >= 0) || (!this.rtl && h < f)) {
                        var m = 1 + h;
                        var k = this.dataview.pagenum / f;
                        var e = Math.floor(k);
                        m += e * f;
                        var l = this.toTP("jqx-grid-pager-number");
                        l += " " + this.toTP("jqx-rc-all");
                        if (m > g) {
                            break
                        }
                        if (!this.rtl) {
                            if (h == 0 && m > f) {
                                b += "<a class='" + l + "' tabindex=-1 href='javascript:;' data-page='" + (-1 + m) + "'>...</a>"
                            }
                        }
                        if (this.dataview.pagenum === m - 1) {
                            l += " " + this.toTP("jqx-fill-state-pressed")
                        }
                        if (!this.rtl) {
                            b += "<a class='" + l + "' tabindex=-1 href='javascript:;' data-page='" + m + "'>" + m + "</a>";
                            if (h === f - 1) {
                                var l = this.toTP("jqx-grid-pager-number");
                                l += " " + this.toTP("jqx-rc-all");
                                if (g >= 1 + m) {
                                    b += "<a class='" + l + "' tabindex=-1 href='javascript:;' data-page='" + (1 + m) + "'>...</a>"
                                }
                            }
                        } else {
                            if (h === f - 1) {
                                var l = this.toTP("jqx-grid-pager-number");
                                l += " " + this.toTP("jqx-rc-all");
                                if (g >= 1 + m) {
                                    b += "<a class='" + l + "' tabindex=-1 href='javascript:;' data-page='" + (1 + m) + "'>...</a>"
                                }
                            }
                            if (this.dataview.pagenum === m - 1) {
                                l += " " + this.toTP("jqx-fill-state-pressed")
                            }
                            b += "<a class='" + l + "' tabindex=-1 href='javascript:;' data-page='" + m + "'>" + m + "</a>"
                        }
                        if (this.rtl) {
                            var l = this.toTP("jqx-grid-pager-number");
                            l += " " + this.toTP("jqx-rc-all");
                            if (h == 0 && m > f) {
                                b += "<a class='" + l + "' tabindex=-1 href='javascript:;' data-page='" + (-1 + m) + "'>...</a>"
                            }
                        }
                        if (!this.rtl) {
                            h++
                        } else {
                            h--
                        }
                    }
                    var p = this["pagerbuttons"].find("a");
                    this.removeHandler(p, "click");
                    this.removeHandler(p, "mouseenter");
                    this.removeHandler(p, "mouseleave");
                    this["pagerbuttons"][0].innerHTML = b;
                    var j = this;
                    var c = function () {
                        j.addHandler(p, "click", function (i) {
                            var r = a(i.target).attr("data-page");
                            j.gotopage(parseInt(r) - 1);
                            return false
                        });
                        j.addHandler(p, "mouseenter", function (i) {
                            a(i.target).addClass(j.toTP("jqx-fill-state-hover"))
                        });
                        j.addHandler(p, "mouseleave", function (i) {
                            a(i.target).removeClass(j.toTP("jqx-fill-state-hover"))
                        })
                    };
                    var p = this["pagerbuttons"].find("a");
                    c(p)
                }
                this.pagergotoinput.attr("title", "1 - " + g);
                if (d == 0 && d < n) {
                    n = 0
                }
                if (!this.rtl) {
                    this.pagerdetails[0].innerHTML = n + "-" + d + this.gridlocalization.pagerrangestring + q
                } else {
                    this.pagerdetails[0].innerHTML = q + this.gridlocalization.pagerrangestring + d + "-" + n
                }
                if (n > d) {
                    this.gotoprevpage()
                }
            }
        }, _updatepagedview: function (e, g, b) {
            var j = this.that;
            if (this.dataview.rows.length != this.dataview.pagesize) {
                this.dataview.updateview()
            }
            var k = this.dataview.rows.length;
            for (var d = 0; d < k; d++) {
                var f = this.dataview.rows[d].visibleindex;
                var h = {index: f, height: this.heights[f], hidden: this.hiddens[f], details: this.details[f]};
                if (this.heights[f] == undefined) {
                    this.heights[f] = this.rowsheight;
                    h.height = this.rowsheight
                }
                if (this.hiddens[f] == undefined) {
                    this.hiddens[f] = false;
                    h.hidden = false
                }
                if (this.details[f] == undefined) {
                    this.details[f] = null
                }
                if (h.height != j.rowsheight) {
                    g -= j.rowsheight;
                    g += h.height
                }
                if (h.hidden) {
                    g -= h.height
                } else {
                    b += h.height;
                    var c = 0;
                    if (this.rowdetails) {
                        if (h.details && h.details.rowdetails && !h.details.rowdetailshidden) {
                            c = h.details.rowdetailsheight;
                            b += c;
                            g += c
                        }
                    }
                }
            }
            this._pageviews[0] = {top: 0, height: b};
            return g
        }
    })
})(jqxBaseFramework);

