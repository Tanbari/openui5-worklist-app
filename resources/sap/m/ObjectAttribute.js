/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/library","sap/m/Text","./ObjectAttributeRenderer","sap/base/Log"],function(t,e,i,n,o,r){"use strict";var s=i.TextDirection;var a=e.extend("sap.m.ObjectAttribute",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ObjectAttribute.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},text:{type:"string",group:"Misc",defaultValue:null},active:{type:"boolean",group:"Misc",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:s.Inherit}},aggregations:{customContent:{type:"sap.ui.core.Control",multiple:false},_textControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{press:{parameters:{domRef:{type:"string"}}}}}});a.prototype.init=function(){this.setAggregation("_textControl",new n)};a.prototype._getUpdatedTextControl=function(){var t=this.getAggregation("customContent")||this.getAggregation("_textControl"),e=this.getTitle(),i=this.getAggregation("customContent")?this.getAggregation("customContent").getText():this.getText(),n=this.getTextDirection(),r=this.getParent(),a=sap.ui.getCore().getConfiguration().getRTL(),g=o.MAX_LINES.MULTI_LINE,p=true,u="";if(n===s.LTR&&a){u="‎"}if(n===s.RTL&&!a){u="‏"}i=u+i+u;if(e){i=i.replace(new RegExp(e+":\\s+","gi"),"");i=e+": "+i}t.setProperty("text",i,true);if(r instanceof sap.m.ObjectListItem){p=false;g=o.MAX_LINES.SINGLE_LINE}this._setControlWrapping(t,p,g);return t};a.prototype._setControlWrapping=function(t,e,i){if(t.isA("sap.m.Link")){t.setProperty("wrapping",e,true)}if(t.isA("sap.m.Text")){t.setProperty("maxLines",i,true)}};a.prototype.ontap=function(t){if(this._isSimulatedLink()&&t.target.id===this.getId()+"-text"){this.firePress({domRef:this.getDomRef()})}};a.prototype.onsapenter=function(t){if(this._isSimulatedLink()){this.firePress({domRef:this.getDomRef()});t.setMarked()}};a.prototype.onsapspace=function(t){this.onsapenter(t)};a.prototype._isEmpty=function(){if(this.getAggregation("customContent")&&!(this.getAggregation("customContent").isA("sap.m.Link")||this.getAggregation("customContent").isA("sap.m.Text"))){r.warning('Only sap.m.Link or sap.m.Text are allowed in "sap.m.ObjectAttribute.customContent" aggregation');return true}return!(this.getText().trim()||this.getTitle().trim())};a.prototype.ontouchstart=function(t){if(this._isSimulatedLink()){t.originalEvent._sapui_handledByControl=true}};a.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("text")};a.prototype._isSimulatedLink=function(){return this.getActive()&&this.getText()!==""&&!this.getAggregation("customContent")};a.prototype.setCustomContent=function(t){if(t&&t.isA("sap.m.Link")){t._getTabindex=function(){return"-1"}}return this.setAggregation("customContent",t)};a.prototype._isClickable=function(){return this.getActive()&&this.getText()!==""||this.getAggregation("customContent")&&this.getAggregation("customContent").isA("sap.m.Link")};return a});