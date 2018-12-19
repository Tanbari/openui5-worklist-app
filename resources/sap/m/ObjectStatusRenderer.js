/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","sap/ui/core/library"],function(t,e){"use strict";var i=e.TextDirection;var s=e.ValueState;var a={};a.render=function(e,a){e.write("<div");if(a._isEmpty()){e.writeControlData(a);e.addStyle("display","none");e.writeStyles();e.write(">")}else{var r=a.getState();var d=a.getTextDirection();var w=sap.ui.getCore().getConfiguration().getRTL();if(d===i.Inherit){d=w?i.RTL:i.LTR}e.writeControlData(a);var n=a.getTooltip_AsString();if(n){e.writeAttributeEscaped("title",n)}e.addClass("sapMObjStatus");e.addClass("sapMObjStatus"+r);if(a._isActive()){e.addClass("sapMObjStatusActive");e.writeAttribute("tabindex","0");e.writeAccessibilityState(a,{role:"link"})}e.writeClasses();if(r!=s.None){e.writeAccessibilityState(a,{describedby:{value:a.getId()+"sapSRH",append:true}})}e.write(">");if(a.getTitle()){e.write("<span");e.writeAttributeEscaped("id",a.getId()+"-title");e.addClass("sapMObjStatusTitle");if(d){e.writeAttribute("dir",d.toLowerCase())}e.writeClasses();e.write(">");e.writeEscaped(a.getTitle()+":");e.write("</span>")}if(a._isActive()){e.write("<span");e.writeAttributeEscaped("id",a.getId()+"-link");e.addClass("sapMObjStatusLink");e.writeClasses();e.write(">")}if(a.getIcon()){e.write("<span");e.writeAttributeEscaped("id",a.getId()+"-icon");e.addClass("sapMObjStatusIcon");e.writeClasses();e.write(">");e.renderControl(a._getImageControl());e.write("</span>")}if(a.getText()){e.write("<span");e.writeAttributeEscaped("id",a.getId()+"-text");e.addClass("sapMObjStatusText");if(d){e.writeAttribute("dir",d.toLowerCase())}e.writeClasses();e.write(">");e.writeEscaped(a.getText());e.write("</span>")}if(a._isActive()){e.write("</span>")}if(r!=s.None){e.write("<span");e.writeAttributeEscaped("id",a.getId()+"sapSRH");e.addClass("sapUiInvisibleText");e.writeClasses();e.writeAccessibilityState({hidden:false});e.write(">");e.writeEscaped(t.getAdditionalText(r));e.write("</span>")}}e.write("</div>")};return a},true);