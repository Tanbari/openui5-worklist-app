/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Popup","sap/m/Text","sap/m/Button","sap/ui/core/ResizeHandler","sap/ui/Device","sap/ui/core/Icon","sap/ui/layout/VerticalLayout","./InstanceManager","sap/ui/core/InvisibleText","sap/ui/core/library","./LightBoxRenderer","sap/ui/thirdparty/jquery"],function(t,e,i,s,n,o,r,a,h,p,g,u,l,_){"use strict";var c=u.TextAlign;var d=t.ButtonType;var f=t.LightBoxLoadingStates;var m=e.extend("sap.m.LightBox",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",aggregations:{imageContent:{type:"sap.m.LightBoxItem",multiple:true,bindable:"bindable"},_closeButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_errorIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_errorTitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_errorSubtitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_verticalLayout:{type:"sap.ui.layout.VerticalLayout",multiple:false,visibility:"hidden"},_invisiblePopupText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_busy:{type:"sap.m.BusyIndicator",multiple:false,visibility:"hidden"}},events:{},defaultAggregation:"imageContent",designtime:"sap/m/designtime/LightBox.designtime"}});m.prototype.init=function(){this._createPopup();this._width=0;this._height=0;this._isRendering=true;this._resizeListenerId=null;this._$lightBox=null;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._closeButtonText=this._rb.getText("LIGHTBOX_CLOSE_BUTTON");if(sap.ui.getCore().getConfiguration().getAccessibility()){this.setAggregation("_invisiblePopupText",new g)}};m.prototype.onBeforeRendering=function(){var t=this._getImageContent(),e=t._getNativeImage(),i=t.getImageSrc(),s=t._getImageState();this._createErrorControls();if(e.src!==i){e.src=i}if(this._resizeListenerId){r.resize.detachHandler(this._onResizeHandler);o.deregister(this._resizeListenerId);this._resizeListenerId=null}switch(s){case f.Loading:this._timeoutId=setTimeout(function(){t._setImageState(f.TimeOutError)},1e4);break;case f.Loaded:clearTimeout(this._timeoutId);this._calculateSizes(e);break;case f.Error:clearTimeout(this._timeoutId);break;default:break}var n=this.getAggregation("_invisiblePopupText");if(t&&n){n.setText(this._rb.getText("LIGHTBOX_ARIA_ENLARGED",t.getTitle()))}this._isRendering=true};m.prototype.onAfterRendering=function(){this._isRendering=false;this._$lightBox=this.$();if(!this._resizeListenerId){this._onResizeHandler=this._onResize.bind(this);r.resize.attachHandler(this._onResizeHandler);this._resizeListenerId=o.register(this,this._onResizeHandler)}};m.prototype.forceInvalidate=e.prototype.invalidate;m.prototype.invalidate=function(t){var e=this._getImageContent();if(this.isOpen()){if(e&&e.getImageSrc()){this.forceInvalidate(t)}else{this.close()}}return this};m.prototype.exit=function(){if(this._oPopup){this._oPopup.detachOpened(this._fnOpened,this);this._oPopup.detachClosed(this._fnClosed,this);this._oPopup.destroy();this._oPopup=null}if(this._resizeListenerId){r.resize.detachHandler(this._onResizeHandler);o.deregister(this._resizeListenerId);this._resizeListenerId=null}p.removeLightBoxInstance(this)};m.prototype.open=function(){var t=this._getImageContent();this._oPopup.setContent(this);if(t&&t.getImageSrc()){this._oPopup.open(300,"center center","center center",document.body,null);p.addLightBoxInstance(this)}return this};m.prototype.isOpen=function(){if(this._oPopup&&this._oPopup.isOpen()){return true}return false};m.prototype.close=function(){if(this._resizeListenerId){r.resize.detachHandler(this._onResizeHandler);o.deregister(this._resizeListenerId);this._resizeListenerId=null}this._oPopup.close();p.removeLightBoxInstance(this);return this};m.prototype._getCloseButton=function(){var t=this.getAggregation("_closeButton");if(!t){t=new n({id:this.getId()+"-closeButton",text:this._closeButtonText,type:d.Transparent,press:function(){this.close()}.bind(this)});this.setAggregation("_closeButton",t,true)}return t};m.prototype._getBusyIndicator=function(){var t=this.getAggregation("_busy");if(!t){t=new sap.m.BusyIndicator;this.setAggregation("_busy",t,true)}return t};m.prototype._imageStateChanged=function(t){var e=t===f.Loaded||t===f.Error;if(e&&!this._isRendering){this.rerender()}};m.prototype._createPopup=function(){this._oPopup=new i(this,true,true);this._oPopup.attachOpened(this._fnOpened,this);this._oPopup.attachClosed(this._fnClosed,this)};m.prototype._fnOpened=function(){var t=this;_("#sap-ui-blocklayer-popup").on("click",function(){t.close()})};m.prototype._fnClosed=function(){_("#sap-ui-blocklayer-popup").off("click")};m.prototype._createErrorControls=function(){var t=this._rb;var e;var i;if(this._getImageContent()._getImageState()===f.TimeOutError){e=t.getText("LIGHTBOX_IMAGE_TIMED_OUT");i=t.getText("LIGHTBOX_IMAGE_TIMED_OUT_DETAILS")}else{e=t.getText("LIGHTBOX_IMAGE_ERROR");i=t.getText("LIGHTBOX_IMAGE_ERROR_DETAILS")}if(!this.getAggregation("_verticalLayout")){var n=new s({text:e,textAlign:c.Center}).addStyleClass("sapMLightBoxErrorTitle"),o=new s({text:i,textAlign:c.Center}).addStyleClass("sapMLightBoxErrorSubtitle"),r=new a({src:"sap-icon://picture"}).addStyleClass("sapMLightBoxErrorIcon");this.setAggregation("_verticalLayout",new h({content:[r,n,o]}).addStyleClass("sapMLightBoxVerticalLayout"))}};m.prototype._onResize=function(){var t=y()/2+"px",e=t,i=t,s="",n="",o=this._getImageContent(),r=this.getDomRef(),a,h,p=y(),g=2;if(o._getImageState()===f.Loaded){this._calculateSizes(o._getNativeImage());a=this._width;h=this._height;this._$lightBox.width(a);this._$lightBox.height(h)}else{a=r.clientWidth;h=r.clientHeight}if(window.innerWidth>a+p){i="50%";n=Math.round(-a/2)}if(window.innerHeight>h+p){e="50%";s=Math.round(-h/2)}if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){s-=g;n-=g}this._$lightBox.css({top:e,"margin-top":s,left:i,"margin-left":n})};m.prototype._calculateSizes=function(t){var e=this._calculateFooterHeightInPx(),i=288-e,s=this._getImageContent().getAggregation("_image"),n;this._setImageSize(s,t.naturalWidth,t.naturalHeight);this._calculateAndSetLightBoxSize(s);n=this._pxToNumber(s.getHeight());this.toggleStyleClass("sapMLightBoxMinSize",n<i);this._isBusy=false};m.prototype._calculateFooterHeightInPx=function(){var t=this.$().parents().hasClass("sapUiSizeCompact");var e=this._getImageContent().getSubtitle();var i=2.5;if(!t){i+=.5}if(e){i+=1.5}return i*16};m.prototype._calculateAndSetLightBoxSize=function(t){var e,i,s=20*16,n=18*16,o=this._calculateFooterHeightInPx();e=this._pxToNumber(t.getHeight());i=this._pxToNumber(t.getWidth());this._width=Math.max(s,i);this._height=Math.max(n,e+o);this._isLightBoxBiggerThanMinDimensions=i>=s&&e>=n-o};m.prototype._setImageSize=function(t,e,i){var s=this._calculateFooterHeightInPx(),n=this._getDimensions(e,i,s);t.setWidth(n.width+"px");t.setHeight(n.height+"px")};m.prototype._getDimensions=function(t,e,i){var s=20*16,n=18*16,o=_(window),r=o.height(),a=o.width(),h=y(),p=Math.max(a-h,s),g=Math.max(r-h,n),u;g-=i;if(e<=g){if(t<=p){}else{e*=p/t;t=p}}else{if(t<=p){t*=g/e;e=g}else{u=Math.max(t/p,e/g);t/=u;e/=u}}return{width:Math.round(t),height:Math.round(e)}};m.prototype._pxToNumber=function(t){return t.substring(0,t.length-2)*1};m.prototype._getImageContent=function(){var t=this.getAggregation("imageContent");return t&&t[0]};function y(){var t=r.system;if(t.desktop){return 4*16}if(t.tablet){return 2*16}return 0}return m});