/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/delegate/ItemNavigation","sap/ui/core/ResizeHandler","sap/ui/core/ListItem","sap/ui/core/IconPool","./SegmentedButtonRenderer"],function(t,e,i,s,n,o,r,a){"use strict";var l=e.extend("sap.m.SegmentedButton",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent"],library:"sap.m",designtime:"sap/m/designtime/SegmentedButton.designtime",publicMethods:["createButton"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},selectedKey:{type:"string",group:"Data",defaultValue:"",bindable:"bindable"}},defaultAggregation:"buttons",aggregations:{buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},items:{type:"sap.m.SegmentedButtonItem",multiple:true,singularName:"item",bindable:"bindable"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},associations:{selectedButton:{deprecated:true,type:"sap.m.Button",multiple:false},selectedItem:{type:"sap.m.SegmentedButtonItem",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{deprecated:true,parameters:{button:{type:"sap.m.Button"},id:{type:"string"},key:{type:"string"}}},selectionChange:{parameters:{item:{type:"sap.m.SegmentedButtonItem"}}}}}});i.call(l.prototype);l.prototype.init=function(){this._aWidths=[];this._oItemNavigation=new s;this._oItemNavigation.setCycling(false);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});this.addDelegate(this._oItemNavigation);this.removeButton=function(t){var e=l.prototype.removeButton.call(this,t);this.setSelectedButton(this.getButtons()[0]);this._fireChangeEvent();return e}};l.prototype.onBeforeRendering=function(){var t=this._getVisibleButtons();this._bCustomButtonWidth=t.some(function(t){return t.getWidth()});if(this._sResizeListenerId){n.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.setSelectedKey(this.getProperty("selectedKey"));if(!this.getSelectedButton()){this._selectDefaultButton()}};l.prototype.onAfterRendering=function(){var t=this._getVisibleButtons(),e;if(!this._sResizeListenerId){e=this.getDomRef().parentNode;if(e){this._sResizeListenerId=n.register(e,this._handleContainerResize.bind(this))}}this._setItemNavigation();this._aWidths=this._getRenderedButtonWidths(t);this._updateWidth()};l.prototype._handleContainerResize=function(){var t=this._getVisibleButtons();this._clearAutoWidthAppliedToControl();this._aWidths=this._getRenderedButtonWidths(t);this._updateWidth()};l.prototype._clearAutoWidthAppliedToControl=function(){var t=this._getVisibleButtons(),e=t.length,i,s=0;if(!this.getWidth()){this.$().css("width","")}while(s<e){i=t[s];if(!i.getWidth()){i.$().css("width","")}s++}};l.prototype._getRenderedButtonWidths=function(t){return t.map(function(t){var e=t.getDomRef();return e&&e.getBoundingClientRect?e.getBoundingClientRect().width:t.$().outerWidth()})};l.prototype._getButtonWidth=function(t){var e=t.length,i,s=0,n=0,o=0,r,a,l=0;if(this._bCustomButtonWidth){while(l<e){i=t[l].getWidth();if(i){if(i.indexOf("%")!==-1){n+=parseInt(i.slice(0,-1))}else{o+=parseInt(i.slice(0,-2))}}else{s++}l++}if(s===0){return false}r=(100-n)/s;a=o/s;if(r<0){r=0}if(a<0){a=0}if(a>0){return"calc("+r+"% - "+a+"px)"}else{return r+"%"}}else{return 100/e+"%"}};l.prototype._updateWidth=function(){if(this.$().length===0||this.hasStyleClass("sapMSegmentedButtonNoAutoWidth")){return}var t=this.getWidth(),e=this._getVisibleButtons(),i=e.length,s=this._aWidths.length>0?Math.max.apply(Math,this._aWidths):0,n=100/i,o=this.$().parent().innerWidth(),r=this._getButtonWidth(e),a,l,h;if(!t){if(s*i>o){this.$().css("width","100%")}else if(s>0){this.$().width(s*i+1)}h=0;while(h<i){l=e[h];l.$().css("width",l.getWidth()?l.getWidth():r);h++}}else if(t&&!this._bCustomButtonWidth){h=0;while(h<i){e[h].$().css("width",n+"%");h++}}a=this.$().width();if(this._previousWidth!==undefined&&a!==this._previousWidth&&!this._bInOverflow){this.fireEvent("_containerWidthChanged")}this._previousWidth=a};l.prototype.exit=function(){if(this._sResizeListenerId){n.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}this._bCustomButtonWidth=null;this._aWidths=null};l.prototype._setItemNavigation=function(){var t,e=this.getDomRef();if(e){this._oItemNavigation.setRootDomRef(e);t=this.$().find(".sapMSegBBtn:not(.sapMSegBBtnDis)");this._oItemNavigation.setItemDomRefs(t);this._focusSelectedButton()}};l.prototype.getOverflowToolbarConfig=function(){var t={canOverflow:true,listenForEvents:["select"],noInvalidationProps:["enabled","selectedKey"],invalidationEvents:["_containerWidthChanged"],onBeforeEnterOverflow:this._onBeforeEnterOverflow,onAfterExitOverflow:this._onAfterExitOverflow};return t};l.prototype._onBeforeEnterOverflow=function(t){t._toSelectMode()};l.prototype._onAfterExitOverflow=function(t){t._toNormalMode()};l.prototype.createButton=function(t,e,i,s){var n=new sap.m.Button;if(t!==null){n.setText(t)}if(e!==null){n.setIcon(e)}if(i||i===undefined){n.setEnabled(true)}else{n.setEnabled(false)}if(s){n.setTextDirection(s)}this.addButton(n);return n};(function(){l.prototype.addButton=function(e){if(e){t(e,this);this.addAggregation("buttons",e);this._syncSelect();this._fireChangeEvent();return this}};l.prototype.insertButton=function(e,i){if(e){t(e,this);this.insertAggregation("buttons",e,i);this._syncSelect();this._fireChangeEvent();return this}};function t(t,e){t.attachPress(function(t){e._buttonPressed(t)});t.attachEvent("_change",e._syncSelect,e);t.attachEvent("_change",e._fireChangeEvent,e);var i=sap.m.Button.prototype.setEnabled;t.setEnabled=function(e){t.$().toggleClass("sapMSegBBtnDis",!e).toggleClass("sapMFocusable",e);i.apply(t,arguments)};t.setVisible=function(t){sap.m.Button.prototype.setVisible.apply(this,arguments);e.invalidate()}}})();l.prototype.getSelectedKey=function(){var t=this.getButtons(),e=this.getItems(),i=this.getSelectedButton(),s=0;if(e.length>0){for(;s<t.length;s++){if(t[s]&&t[s].getId()===i){this.setProperty("selectedKey",e[s].getKey(),true);return e[s].getKey()}}}return""};l.prototype.setSelectedKey=function(t){var e=this.getButtons(),i=this.getItems(),s=0;if(!t){this.setProperty("selectedKey",t,true);return this}if(i.length>0&&e.length>0){for(;s<i.length;s++){if(i[s]&&i[s].getKey()===t){this.setSelectedItem(i[s]);break}}}this.setProperty("selectedKey",t,true);return this};l.prototype.removeButton=function(t){var e=this.removeAggregation("buttons",t);if(e){delete e.setEnabled;e.detachEvent("_change",this._syncSelect,this);e.detachEvent("_change",this._fireChangeEvent,this);this._syncSelect()}return e};l.prototype.removeAllButtons=function(){var t=this.getButtons();if(t){for(var e=0;e<t.length;e++){var i=t[e];if(i){delete i.setEnabled;this.removeAggregation("buttons",i);i.detachEvent("_change",this._syncSelect,this);i.detachEvent("_change",this._fireChangeEvent,this)}}this._syncSelect()}return t};l.prototype.addItem=function(t){this.addAggregation("items",t);this.addButton(t.oButton);return this};l.prototype.removeItem=function(t){var e;if(t!==null&&t!==undefined){e=this.removeAggregation("items",t);this.removeButton(t.oButton)}if(t&&t instanceof sap.m.SegmentedButtonItem&&this.getSelectedButton()===t.oButton.getId()){this.setSelectedKey("");this.setSelectedButton("");this.setSelectedItem("")}this.setSelectedItem(this.getItems()[0]);return e};l.prototype.insertItem=function(t,e){this.insertAggregation("items",t,e);this.insertButton(t.oButton,e);return this};l.prototype.removeAllItems=function(t){var e=this.removeAllAggregation("items",t);this.removeAllButtons();this.setSelectedKey("");this.setSelectedButton("");this.setSelectedItem("");return e};l.prototype._buttonPressed=function(t){var e=t.getSource(),i;if(this.getSelectedButton()!==e.getId()){this.getButtons().forEach(function(t){t.$().removeClass("sapMSegBBtnSel");t.$().attr("aria-checked",false)});i=this.getItems().filter(function(t){return t.oButton===e})[0];e.$().addClass("sapMSegBBtnSel");e.$().attr("aria-checked",true);this.setAssociation("selectedButton",e,true);this.setProperty("selectedKey",this.getSelectedKey(),true);this.setAssociation("selectedItem",i,true);this.fireSelectionChange({item:i});this.fireSelect({button:e,id:e.getId(),key:this.getSelectedKey()})}};l.prototype._selectDefaultButton=function(){var t=this._getVisibleButtons();if(t.length>0){this.setAssociation("selectedButton",t[0],true);if(this.getItems().length>0){this.setAssociation("selectedItem",this.getItems()[0],true)}}};l.prototype.setSelectedButton=function(t){var e=this.getSelectedButton(),i,s=this.getButtons();this.setAssociation("selectedButton",t,true);if(e!==this.getSelectedButton()){if(this.$().length){if(!this.getSelectedButton()&&s.length>1){this._selectDefaultButton()}i=sap.ui.getCore().byId(this.getSelectedButton());s.forEach(function(t){t.$().removeClass("sapMSegBBtnSel");t.$().attr("aria-checked",false)});if(i){i.$().addClass("sapMSegBBtnSel");i.$().attr("aria-checked",true)}this._focusSelectedButton()}}this._syncSelect();return this};l.prototype.setSelectedItem=function(t){var e=typeof t==="string"&&t!==""?sap.ui.getCore().byId(t):t,i=e instanceof sap.m.SegmentedButtonItem,s=i?e.oButton:t;this.setAssociation("selectedItem",t,true);this.setSelectedButton(s);return this};l.prototype._focusSelectedButton=function(){var t=this.getButtons(),e=this.getSelectedButton(),i=0;for(;i<t.length;i++){if(t[i]&&t[i].getId()===e){this._oItemNavigation&&this._oItemNavigation.setFocusedIndex(i);break}}};l.prototype.onsappagedown=function(t){this._oItemNavigation.onsapend(t)};l.prototype.onsappageup=function(t){this._oItemNavigation.onsaphome(t)};l.prototype._lazyLoadSelectForm=function(){var t=this.getAggregation("_select");if(!t){t=new sap.m.Select(this.getId()+"-select");t.attachChange(this._selectChangeHandler,this);t.addStyleClass("sapMSegBSelectWrapper");this.setAggregation("_select",t,true)}};l.prototype._selectChangeHandler=function(t){var e=t.getParameter("selectedItem"),i=parseInt(e.getKey()),s=this.getButtons()[i],n=s.getId();s.firePress();this.setSelectedButton(n)};l.prototype._fireChangeEvent=function(){this.fireEvent("_change")};l.prototype._syncSelect=function(){var t=0,e=0,i,s,n=this.getAggregation("_select");if(!n){return}n.destroyItems();this._getVisibleButtons().forEach(function(r){i=r.getText();s=r.getIcon();n.addItem(new o({key:t.toString(),icon:s?s:"",text:i?i:r.getTooltip_AsString(),enabled:r.getEnabled()}));if(r.getId()===this.getSelectedButton()){e=t}t++},this);n.setSelectedKey(e.toString())};l.prototype._toSelectMode=function(){this._bInOverflow=true;this.addStyleClass("sapMSegBSelectWrapper");this._lazyLoadSelectForm();this._syncSelect()};l.prototype._toNormalMode=function(){delete this._bInOverflow;this.removeStyleClass("sapMSegBSelectWrapper");this.getAggregation("_select").removeAllItems();this.destroyAggregation("_select")};l.prototype._overwriteImageOnload=function(t){var e=this;if(t.onload===sap.m.Image.prototype.onload){t.onload=function(){if(sap.m.Image.prototype.onload){sap.m.Image.prototype.onload.apply(this,arguments)}window.setTimeout(function(){e._updateWidth()},20)}}};l.prototype._getIconAriaLabel=function(t){var e=r.getIconInfo(t.getSrc()),i="";if(e&&e.name){i=e.name}return i};l.prototype._getVisibleButtons=function(){return this.getButtons().filter(function(t){return t.getVisible()})};l.prototype.clone=function(){var t=this.getSelectedButton(),i=this.removeAllAggregation("buttons"),s=e.prototype.clone.apply(this,arguments),n=i.map(function(t){return t.getId()}).indexOf(t),o;if(n>-1){s.setSelectedButton(s.getButtons()[n])}for(o=0;o<i.length;o++){this.addAggregation("buttons",i[o])}return s};return l});