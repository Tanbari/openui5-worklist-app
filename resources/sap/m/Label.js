/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/LabelEnablement","sap/m/HyphenationSupport","sap/ui/core/library","./LabelRenderer","sap/base/Log","sap/base/security/encodeXML"],function(e,t,a,r,o,i,n,p){"use strict";var l=o.TextDirection;var s=o.TextAlign;var u=e.LabelDesign;var g=o.VerticalAlign;var f=e.WrappingType;var y=t.extend("sap.m.Label",{metadata:{interfaces:["sap.ui.core.Label","sap.ui.core.IShrinkable","sap.m.IOverflowToolbarContent","sap.m.IHyphenation"],library:"sap.m",properties:{design:{type:"sap.m.LabelDesign",group:"Appearance",defaultValue:u.Standard},text:{type:"string",group:"Misc",defaultValue:null},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:s.Begin},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:l.Inherit},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},required:{type:"boolean",group:"Misc",defaultValue:false},displayOnly:{type:"boolean",group:"Appearance",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:f.Normal},vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:g.Inherit}},associations:{labelFor:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/m/designtime/Label.designtime"}});y.prototype.setText=function(e){var t=this.getText();if(t!==e){this.setProperty("text",e,true);this.$("bdi").html(p(r.getTextForRender(this,"main")));if(e){this.$().removeClass("sapMLabelNoText")}else{this.$().addClass("sapMLabelNoText")}}return this};y.prototype.setTooltip=function(e){var t=this.getTooltip();if(t!==e){this.setAggregation("tooltip",e,true);this.$().attr("title",this.getTooltip())}return this};y.prototype.setDisplayOnly=function(e){if(typeof e!=="boolean"){n.error("DisplayOnly property should be boolean. The new value will not be set");return this}this.$().toggleClass("sapMLabelDisplayOnly",e);return t.prototype.setProperty.call(this,"displayOnly",e)};y.prototype.getAccessibilityInfo=function(){return{description:this.getText()}};y.prototype.getOverflowToolbarConfig=function(){var e={canOverflow:true,propsUnrelatedToSize:["design","required","displayOnly"]};function t(e){var t=e&&e.getLayoutData();if(c(t,"sap/m/OverflowToolbarLayoutData")){return t.getGroup()}}e.onBeforeEnterOverflow=function(e){var a=false,r,o,i,n,p;r=e.getParent();if(!c(r,"sap/m/OverflowToolbar")){return}o=e.getLabelFor();i=o&&sap.ui.getCore().byId(o);if(!i||r.indexOfContent(i)<0){return}n=t(e);p=t(i);a=n&&n===p;e.toggleStyleClass("sapMLabelMediumMarginTop",a,true)};e.onAfterExitOverflow=function(e){e.toggleStyleClass("sapMLabelMediumMarginTop",false,true)};return e};y.prototype.getTextsToBeHyphenated=function(){return{main:this.getText()}};y.prototype.getDomRefsForHyphenatedTexts=function(){return{main:this.$("bdi")[0]}};a.enrich(y.prototype);r.mixInto(y.prototype);function c(e,t){if(e&&t){var a=sap.ui.require(t);return typeof a==="function"&&e instanceof a}}return y});