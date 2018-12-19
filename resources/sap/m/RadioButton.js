/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","./RadioButtonGroup","sap/ui/core/library","sap/base/strings/capitalize","./RadioButtonRenderer"],function(e,t,i,r,s,o,a){"use strict";var n=s.TextAlign;var u=s.ValueState;var p=s.TextDirection;var l=t.extend("sap.m.RadioButton",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},selected:{type:"boolean",group:"Data",defaultValue:false},groupName:{type:"string",group:"Behavior",defaultValue:"sapMRbDefaultGroup"},text:{type:"string",group:"Appearance",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:p.Inherit},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},useEntireWidth:{type:"boolean",group:"Appearance",defaultValue:false},activeHandling:{type:"boolean",group:"Appearance",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:u.None},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:n.Begin},editableParent:{type:"boolean",group:"Behavior",defaultValue:true,visibility:"hidden"},posinset:{type:"string",group:"Data",defaultValue:"",visibility:"hidden"},setsize:{type:"string",group:"Data",defaultValue:"",visibility:"hidden"}},events:{select:{parameters:{selected:{type:"boolean"}}}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/m/designtime/RadioButton.designtime"}});i.call(l.prototype);l.prototype._groupNames={};var h={HOME:"first",END:"last",NEXT:"next",PREV:"prev"};l.prototype.ontap=function(e){if(!this.getEnabled()||!this.getEditable()){return}var t=this.getParent();if(t instanceof r&&(!t.getEnabled()||!t.getEditable())){return}e&&e.setMarked();this.applyFocusInfo();if(!this.getSelected()){this.setSelected(true);var i=this;setTimeout(function(){i.fireSelect({selected:true})},0)}};l.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true;if(this.getEnabled()&&this.getActiveHandling()){this.$().toggleClass("sapMRbBTouched",true)}};l.prototype.ontouchend=function(e){this.$().toggleClass("sapMRbBTouched",false)};l.prototype.onsapnext=function(e){this._keyboardHandler(h.NEXT,true);e.setMarked();return this};l.prototype.onsapnextmodifiers=function(e){this._keyboardHandler(h.NEXT,!e.ctrlKey);e.setMarked();return this};l.prototype.onsapprevious=function(e){this._keyboardHandler(h.PREV,true);e.setMarked();return this};l.prototype.onsappreviousmodifiers=function(e){this._keyboardHandler(h.PREV,!e.ctrlKey);e.setMarked();return this};l.prototype.onsaphome=function(e){this._keyboardHandler(h.HOME,true);e.setMarked();return this};l.prototype.onsaphomemodifiers=function(e){this._keyboardHandler(h.HOME,!e.ctrlKey);e.setMarked();return this};l.prototype.onsapend=function(e){this._keyboardHandler(h.END,true);e.setMarked();return this};l.prototype.onsapendmodifiers=function(e){this._keyboardHandler(h.END,!e.ctrlKey);e.setMarked();return this};l.prototype._keyboardHandler=function(e,t){if(this.getParent()instanceof r){return}var i=this._getNextFocusItem(e);i.focus();if(t&&!i.getSelected()&&i.getEditable()&&i.getEnabled()){i.setSelected(true);setTimeout(function(){i.fireSelect({selected:true})},0)}};l.prototype.getAccessibilityInfo=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");return{role:"radio",type:e.getText("ACC_CTR_TYPE_RADIO"),description:(this.getText()||"")+(this.getSelected()?" "+e.getText("ACC_CTR_STATE_CHECKED"):""),enabled:this.getEnabled(),editable:this.getEditable()}};l.prototype.getFormDoNotAdjustWidth=function(){return this.getText()?false:true};l.prototype._getNextFocusItem=function(e){var t=this._groupNames[this.getGroupName()].filter(function(e){return e.getDomRef()&&e.getEnabled()});var i=t.indexOf(this),r=i,s=t.length;switch(e){case h.NEXT:r=i===s-1?i:i+1;break;case h.PREV:r=i===0?0:r-1;break;case h.HOME:r=0;break;case h.END:r=s-1;break}return t[r]||this};l.prototype.onsapselect=function(e){e.preventDefault();this.ontap(e)};l.prototype.setEnabled=function(e){this.setProperty("enabled",e,false);return this};l.prototype.setSelected=function(e){var t,i=this.getSelected(),r=this.getGroupName(),s=this._groupNames[r],o=s&&s.length;this.setProperty("selected",e,true);this._changeGroupName(this.getGroupName());if(!!e&&r&&r!==""){for(var a=0;a<o;a++){t=s[a];if(t instanceof l&&t!==this&&t.getSelected()){t.fireSelect({selected:false});t.setSelected(false)}}}if(i!==!!e&&this.getDomRef()){this.$().toggleClass("sapMRbSel",e);if(e){this.getDomRef().setAttribute("aria-checked","true");this.getDomRef("RB").checked=true;this.getDomRef("RB").setAttribute("checked","checked")}else{this.getDomRef().removeAttribute("aria-checked");this.getDomRef("RB").checked=false;this.getDomRef("RB").removeAttribute("checked")}}return this};l.prototype.setText=function(e){this.setProperty("text",e,true);if(this._oLabel){this._oLabel.setText(this.getText())}else{this._createLabel("text",this.getText())}this.toggleStyleClass("sapMRbHasLabel",!!e);return this};l.prototype._setWidth=function(e){if(!e){this._setLableWidth()}else{this._setLableWidth("auto")}};l.prototype._setLableWidth=function(e){e=e||this.getWidth();if(this._oLabel){this._oLabel.setWidth(e)}else{this._createLabel("width",e)}};l.prototype.setTextDirection=function(e){this.setProperty("textDirection",e,true);if(this._oLabel){this._oLabel.setTextDirection(this.getTextDirection())}else{this._createLabel("textDirection",this.getTextDirection())}return this};l.prototype.setGroupName=function(e){this._changeGroupName(e,this.getGroupName());return this.setProperty("groupName",e,true)};l.prototype.onBeforeRendering=function(){this._setWidth(this.getUseEntireWidth());return this._changeGroupName(this.getGroupName())};l.prototype.onAfterRendering=function(){var e=this.getGroupName();this._setAriaPositionAttributes(e)};l.prototype.exit=function(){var e=this.getGroupName(),t=this._groupNames[e],i=t&&t.indexOf(this);this._iTabIndex=null;if(this._oLabel){this._oLabel.destroy()}if(i>=-1){t.splice(i,1)}};l.prototype._createLabel=function(e,t){this._oLabel=new sap.m.Label(this.getId()+"-label").addStyleClass("sapMRbBLabel").setParent(this,null,true);this._oLabel.setProperty(e,t,false)};l.prototype.setTabIndex=function(e){var t=this.getFocusDomRef();this._iTabIndex=e;if(t){t.setAttribute("tabindex",e)}return this};l.prototype.setTextAlign=function(e){this.setProperty("textAlign",e,true);if(this._oLabel){this._oLabel.setTextAlign(this.getTextAlign())}else{this._createLabel("textAlign",this.getTextAlign())}return this};l.prototype._changeGroupName=function(e,t){var i=this._groupNames[e],r=this._groupNames[t];if(r&&r.indexOf(this)!==-1){r.splice(r.indexOf(this),1);this._setAriaPositionAttributes(t)}if(!i){i=this._groupNames[e]=[]}if(i.indexOf(this)===-1){i.push(this);this._setAriaPositionAttributes(e)}};l.prototype._setAriaPositionAttributes=function(e){var t=this._groupNames[e],i=0,r;if(!t.length||!this.getDomRef()){return}r=t.reduce(function(e,t){return t.getDomRef()?++e:e},0);t.forEach(function(e){var t=e.getDomRef();if(t){t.setAttribute("aria-posinset",++i);t.setAttribute("aria-setsize",r)}})};["editableParent","posinset","setsize"].forEach(function(e){l.prototype["_set"+o(e)]=function(t){return this.setProperty(e,t,true)}});return l});