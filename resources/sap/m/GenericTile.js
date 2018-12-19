/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/m/Text","sap/ui/core/HTML","sap/ui/core/Icon","sap/ui/core/IconPool","sap/m/Button","sap/m/GenericTileRenderer","sap/m/GenericTileLineModeRenderer","sap/ui/Device","sap/ui/core/ResizeHandler","sap/base/strings/camelize","sap/base/util/deepEqual","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery"],function(e,t,i,o,s,n,a,r,l,h,p,d,u,g,c){"use strict";var f=e.GenericTileScope,_=e.LoadState,T=e.FrameType,y=e.Size,m=e.GenericTileMode,v=e.TileSizeBehavior,S=e.WrappingType;var A="GenericTileDeviceSet";var b=t.extend("sap.m.GenericTile",{metadata:{library:"sap.m",properties:{mode:{type:"sap.m.GenericTileMode",group:"Appearance",defaultValue:m.ContentMode},header:{type:"string",group:"Appearance",defaultValue:null},subheader:{type:"string",group:"Appearance",defaultValue:null},failedText:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Misc",defaultValue:y.Auto},frameType:{type:"sap.m.FrameType",group:"Misc",defaultValue:T.OneByOne},backgroundImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},headerImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},state:{type:"sap.m.LoadState",group:"Misc",defaultValue:_.Loaded},imageDescription:{type:"string",group:"Accessibility",defaultValue:null},scope:{type:"sap.m.GenericTileScope",group:"Misc",defaultValue:f.Display},sizeBehavior:{type:"sap.m.TileSizeBehavior",defaultValue:v.Responsive},ariaLabel:{type:"string",group:"Accessibility",defaultValue:null},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:S.Normal}},defaultAggregation:"tileContent",aggregations:{tileContent:{type:"sap.m.TileContent",multiple:true,bindable:"bindable"},icon:{type:"sap.ui.core.Control",multiple:false},_titleText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_failedMessageText:{type:"sap.m.Text",multiple:false,visibility:"hidden"}},events:{press:{parameters:{scope:{type:"sap.m.GenericTileScope"},action:{type:"string"},domRef:{type:"any"}}}}},renderer:function(t,i){if(i.getMode()===e.GenericTileMode.LineMode){l.render(t,i)}else{r.render(t,i)}}});b._Action={Press:"Press",Remove:"Remove"};b.LINEMODE_SIBLING_PROPERTIES=["state","subheader","header","scope"];b.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(!h.media.hasRangeSet(A)){h.media.initRangeSet(A,[450],"px",["small","large"])}this._oTitle=new i(this.getId()+"-title");this._oTitle.addStyleClass("sapMGTTitle");this._oTitle.cacheLineHeight=false;this.setAggregation("_titleText",this._oTitle,true);this._oSubTitle=new i(this.getId()+"-subTitle");this._oSubTitle.cacheLineHeight=false;this.addDependent(this._oSubTitle);this._sFailedToLoad=this._oRb.getText("INFOTILE_CANNOT_LOAD_TILE");this._sLoading=this._oRb.getText("INFOTILE_LOADING");this._oFailedText=new i(this.getId()+"-failed-txt",{maxLines:2});this._oFailedText.cacheLineHeight=false;this._oFailedText.addStyleClass("sapMGTFailed");this.setAggregation("_failedMessageText",this._oFailedText,true);this._oWarningIcon=new s(this.getId()+"-warn-icon",{src:"sap-icon://notification",size:"1.375rem"});this._oWarningIcon.addStyleClass("sapMGTFtrFldIcnMrk");this._oBusy=new o(this.getId()+"-overlay");this._oBusy.setBusyIndicatorDelay(0);this._bTilePress=true;this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}};b.prototype.setWrappingType=function(e){this.setProperty("wrappingType",e,true);this._oTitle.setWrappingType(e);this._oFailedText.setWrappingType(e);this._oSubTitle.setWrappingType(e);return this};b.prototype.setSubheader=function(e){this.setProperty("subheader",e);this._oSubTitle.setText(e);return this};b.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this)}};b.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this._oTitle.clampHeight();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this)};b.prototype._initScopeContent=function(t){switch(this.getScope()){case e.GenericTileScope.Actions:if(this.getState&&this.getState()===e.LoadState.Disabled){break}this._oMoreIcon=this._oMoreIcon||n.createControlByURI({id:this.getId()+"-action-more",size:"1rem",useIconTooltip:false,src:"sap-icon://overflow"}).addStyleClass("sapMPointer").addStyleClass(t+"MoreIcon");this._oRemoveButton=this._oRemoveButton||new a({id:this.getId()+"-action-remove",icon:"sap-icon://decline",tooltip:this._oRb.getText("GENERICTILE_REMOVEBUTTON_TEXT")}).addStyleClass("sapUiSizeCompact").addStyleClass(t+"RemoveButton");this._oRemoveButton._bExcludeFromTabChain=true;break;default:}};b.prototype.exit=function(){if(this._sParentResizeListenerId){p.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null}h.media.detachHandler(this._handleMediaChange,this,A);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents());this._$RootNode=null}this._clearAnimationUpdateQueue();this._oWarningIcon.destroy();if(this._oImage){this._oImage.destroy()}this._oBusy.destroy();if(this._oMoreIcon){this._oMoreIcon.destroy()}if(this._oRemoveButton){this._oRemoveButton.destroy()}};b.prototype.onBeforeRendering=function(){var t=!!this.getSubheader();if(this.getMode()===e.GenericTileMode.HeaderMode){this._applyHeaderMode(t)}else{this._applyContentMode(t)}var i=this.getTileContent().length;for(var o=0;o<i;o++){this.getTileContent()[o].setDisabled(this.getState()===e.LoadState.Disabled)}this._initScopeContent("sapMGT");this._generateFailedText();this.$().unbind("mouseenter",this._updateAriaAndTitle);this.$().unbind("mouseleave",this._removeTooltipFromControl);if(this._sParentResizeListenerId){p.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null}h.media.detachHandler(this._handleMediaChange,this,A);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents())}if(this.getFrameType()===e.FrameType.Auto){this.setProperty("frameType",e.FrameType.OneByOne,true)}};b.prototype.onAfterRendering=function(){this._setupResizeClassHandler();this.$().bind("mouseenter",this._updateAriaAndTitle.bind(this));this.$().bind("mouseleave",this._removeTooltipFromControl.bind(this));var i=this.getMode();if(i===e.GenericTileMode.LineMode&&this._isScreenLarge()){this.$().parent().addClass("sapMGTLineModeContainer");this._updateHoverStyle(true);if(this.getParent()instanceof t){this._sParentResizeListenerId=p.register(this.getParent(),this._handleResize.bind(this))}else{this._sParentResizeListenerId=p.register(this.$().parent(),this._handleResize.bind(this))}}if(i===e.GenericTileMode.LineMode&&this._bUpdateLineTileSiblings){this._updateLineTileSiblings();this._bUpdateLineTileSiblings=false}if(i===e.GenericTileMode.LineMode){h.media.attachHandler(this._handleMediaChange,this,A)}};b.prototype._handleResize=function(){if(this.getMode()===e.GenericTileMode.LineMode&&this._isScreenLarge()&&this.getParent()){this._queueAnimationEnd()}};b.prototype._setupResizeClassHandler=function(){var e=function(){if(this.getSizeBehavior()===v.Small||window.matchMedia("(max-width: 374px)").matches){this.$().addClass("sapMTileSmallPhone")}else{this.$().removeClass("sapMTileSmallPhone")}}.bind(this);c(window).resize(e);e()};b.prototype._isCompact=function(){return c("body").hasClass("sapUiSizeCompact")||this.$().is(".sapUiSizeCompact")||this.$().closest(".sapUiSizeCompact").length>0};b.prototype._calculateStyleData=function(){this.$("lineBreak").remove();if(!this._isScreenLarge()||!this.getDomRef()||this.$().is(":hidden")){return null}var e=this.$(),t=this.$("endMarker"),i=this.$("startMarker");if(t.length===0||i.length===0){return null}var o=this._getLineCount(),s,n,a=Math.ceil(l._getCSSPixelValue(this,"margin-top")),r,p=this.$().parent().innerWidth(),d=Math.ceil(l._getCSSPixelValue(this,"min-height")),u=l._getCSSPixelValue(this,"line-height"),g=this.$().is(":not(:first-child)")&&o>1,f=c("<span><br /></span>"),_=0,T=sap.ui.getCore().getConfiguration().getRTL(),y=t.position();if(g){f.attr("id",this.getId()+"-lineBreak");e.prepend(f);o=this._getLineCount();y=t.position()}var m={rtl:T,lineBreak:g,startOffset:i.offset(),endOffset:t.offset(),availableWidth:p,lines:[]};var v;if(h.browser.msie||h.browser.edge){v=f.find("br").position()}else{v=f.position()}var S=v;if(!(h.browser.mozilla||h.browser.msie||h.browser.edge)&&v.left<y.left){S=y}m.positionLeft=g?v.left:e.position().left;m.positionRight=g?e.width()-S.left:m.availableWidth-e.position().left;if(!g&&o>1){m.positionRight=i.parent().innerWidth()-(i.position().left+i.width())}for(_;_<o;_++){if(g&&_===0){continue}if(o===1){s=T?m.availableWidth-m.positionLeft:m.positionLeft;r=e.width()}else if(_===o-1){s=0;r=T?e.width()-y.left:y.left}else if(g&&_===1){s=0;r=p}else{s=0;r=p}n=_*u+a;m.lines.push({offset:{x:s,y:n},width:r,height:d})}return m};b.prototype._getStyleData=function(){var e=this._calculateStyleData();if(!u(this._oStyleData,e)){delete this._oStyleData;this._oStyleData=e;return true}return false};b.prototype._getAnimationEvents=function(){return"transitionend.sapMGT$id animationend.sapMGT$id".replace(/\$id/g,d(this.getId()))};b.prototype._updateHoverStyle=function(e){if(!this._getStyleData()&&!e){return}this._clearAnimationUpdateQueue();this._cHoverStyleUpdates=-1;this._oAnimationEndCallIds={};if(this._oStyleData&&this._oStyleData.lineBreak&&this.getUIArea()){this._$RootNode=c(this.getUIArea().getRootNode());this._$RootNode.on(this._getAnimationEvents(),this._queueAnimationEnd.bind(this))}this._queueAnimationEnd()};b.prototype._queueAnimationEnd=function(e){if(e){var t=c(e.target);if(t.is(".sapMGT, .sapMGT *")){return false}}if(typeof this._cHoverStyleUpdates!=="number"){this._cHoverStyleUpdates=-1}if(!this._oAnimationEndCallIds){this._oAnimationEndCallIds={}}this._cHoverStyleUpdates++;this._oAnimationEndCallIds[this._cHoverStyleUpdates]=setTimeout(this._handleAnimationEnd.bind(this,this._cHoverStyleUpdates),10)};b.prototype._handleAnimationEnd=function(e){delete this._oAnimationEndCallIds[e];if(this._cHoverStyleUpdates===e){this._getStyleData();l._updateHoverStyle.call(this)}};b.prototype._clearAnimationUpdateQueue=function(){for(var e in this._oAnimationEndCallIds){clearTimeout(this._oAnimationEndCallIds[e]);delete this._oAnimationEndCallIds[e]}};b.prototype._getLineCount=function(){var e=this.getDomRef().getBoundingClientRect(),t=l._getCSSPixelValue(this,"line-height");return Math.round(e.height/t)};b.prototype.getBoundingRects=function(){var t=this.$().offset();if(this.getMode()===e.GenericTileMode.LineMode&&this._isScreenLarge()){this._getStyleData();var i=[],o,s;this.$().find(".sapMGTLineStyleHelper").each(function(){o=c(this);s=o.offset();i.push({offset:{x:s.left,y:s.top},width:o.width(),height:o.height()})});return i}else{return[{offset:{x:t.left,y:t.top},width:this.$().width(),height:this.$().height()}]}};b.prototype._updateLineTileSiblings=function(){var t=this.getParent();if(this.getMode()===e.GenericTileMode.LineMode&&this._isScreenLarge()&&t){var i=t.indexOfAggregation(this.sParentAggregationName,this);var o=t.getAggregation(this.sParentAggregationName).splice(i+1);for(i=0;i<o.length;i++){var s=o[i];if(s instanceof e.GenericTile&&s.getMode()===e.GenericTileMode.LineMode){s._updateHoverStyle()}}}};b.prototype.ontouchstart=function(){if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive")}if(this.getMode()===e.GenericTileMode.LineMode){this.addStyleClass("sapMGTLineModePress")}};b.prototype.ontouchcancel=function(){if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}};b.prototype.ontouchend=function(){if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}if(this.getMode()===e.GenericTileMode.LineMode){this.removeStyleClass("sapMGTLineModePress")}};b.prototype.ontap=function(t){var i;if(this._bTilePress&&this.getState()!==e.LoadState.Disabled){this.$().focus();i=this._getEventParams(t);this.firePress(i);t.preventDefault()}};b.prototype.onkeydown=function(t){if(g.events.sapselect.fnCheck(t)&&this.getState()!==e.LoadState.Disabled){if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive")}t.preventDefault()}};b.prototype._updateAriaLabel=function(){var e=this._getAriaText(),t=this.$(),i=false;if(t.attr("aria-label")!==e){t.attr("aria-label",e);i=true}return i};b.prototype.onkeyup=function(t){var i,o=false,s=this.getScope(),n=s===e.GenericTileScope.Actions;if(n&&(g.events.sapdelete.fnCheck(t)||g.events.sapbackspace.fnCheck(t))){i={scope:s,action:b._Action.Remove,domRef:this._oRemoveButton.getPopupAnchorDomRef()};o=true}if(g.events.sapselect.fnCheck(t)&&this.getState()!==e.LoadState.Disabled){if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}i=this._getEventParams(t);o=true}if(o){this.firePress(i);t.preventDefault()}this._updateAriaLabel()};b.prototype.setProperty=function(i){t.prototype.setProperty.apply(this,arguments);if(this.getMode()===e.GenericTileMode.LineMode&&b.LINEMODE_SIBLING_PROPERTIES.indexOf(i)!==-1){this._bUpdateLineTileSiblings=true}return this};b.prototype.getHeader=function(){return this._oTitle.getText()};b.prototype.setHeader=function(e){this._oTitle.setText(e);return this};b.prototype.setHeaderImage=function(t){var i=!u(this.getHeaderImage(),t);if(i){if(this._oImage){this._oImage.destroy();this._oImage=undefined}if(t){this._oImage=n.createControlByURI({id:this.getId()+"-icon-image",src:t},e.Image);this._oImage.addStyleClass("sapMGTHdrIconImage")}}return this.setProperty("headerImage",t)};b.prototype._applyHeaderMode=function(e){if(e){this._oTitle.setMaxLines(4)}else{this._oTitle.setMaxLines(5)}this._changeTileContentContentVisibility(false)};b.prototype._applyContentMode=function(e){if(e){this._oTitle.setMaxLines(2)}else{this._oTitle.setMaxLines(3)}this._changeTileContentContentVisibility(true)};b.prototype._changeTileContentContentVisibility=function(e){var t;t=this.getTileContent();for(var i=0;i<t.length;i++){t[i].setRenderContent(e)}};b.prototype._getHeaderAriaAndTooltipText=function(){var e="";var t=true;if(this.getHeader()){e+=this.getHeader();t=false}if(this.getSubheader()){e+=(t?"":"\n")+this.getSubheader();t=false}if(this.getImageDescription()){e+=(t?"":"\n")+this.getImageDescription()}return e};b.prototype._getContentAriaAndTooltipText=function(){var e="";var t=true;var i=this.getTileContent();for(var o=0;o<i.length;o++){if(c.isFunction(i[o]._getAriaAndTooltipText)){e+=(t?"":"\n")+i[o]._getAriaAndTooltipText()}else if(i[o].getTooltip_AsString()){e+=(t?"":"\n")+i[o].getTooltip_AsString()}t=false}return e};b.prototype._getAriaAndTooltipText=function(){var t=this.getTooltip_AsString()&&!this._isTooltipSuppressed()?this.getTooltip_AsString():this._getHeaderAriaAndTooltipText()+"\n"+this._getContentAriaAndTooltipText();switch(this.getState()){case e.LoadState.Disabled:return"";case e.LoadState.Loading:return t+"\n"+this._sLoading;case e.LoadState.Failed:return t+"\n"+this._oFailedText.getText();default:if(c.trim(t).length===0){return""}else{return t}}};b.prototype._getAriaText=function(){var t=this.getTooltip_Text();var i=this.getAriaLabel();if(!t||this._isTooltipSuppressed()){t=this._getAriaAndTooltipText()}if(this.getScope()===e.GenericTileScope.Actions){t=this._oRb.getText("GENERICTILE_ACTIONS_ARIA_TEXT")+" "+t}if(i){t=i+" "+t}return t};b.prototype._getTooltipText=function(){var e=this.getTooltip_Text();if(this._isTooltipSuppressed()===true){e=null}return e};b.prototype._checkFooter=function(t,i){var o=i.getState();var s=this.getScope()===e.GenericTileScope.Actions||this._bShowActionsView===true;if(o===e.LoadState.Failed||s&&o!==e.LoadState.Disabled){t.setRenderFooter(false)}else{t.setRenderFooter(true)}};b.prototype._generateFailedText=function(){var e=this.getFailedText();var t=e?e:this._sFailedToLoad;this._oFailedText.setText(t);this._oFailedText.setTooltip(t)};b.prototype._isTooltipSuppressed=function(){var e=this.getTooltip_Text();if(e&&e.length>0&&c.trim(e).length===0){return true}else{return false}};b.prototype._isHeaderTextTruncated=function(){var t,i,o,s;if(this.getMode()===e.GenericTileMode.LineMode){o=this.$("hdr-text");if(o.length>0){s=Math.ceil(o[0].getBoundingClientRect().width);return o[0]&&s<o[0].scrollWidth}else{return false}}else{t=this.getAggregation("_titleText").getDomRef("inner");i=this.getAggregation("_titleText").getClampHeight(t);return i<t.scrollHeight}};b.prototype._isSubheaderTextTruncated=function(){var t;if(this.getMode()===e.GenericTileMode.LineMode){t=this.$("subHdr-text")}else{t=this.$("subTitle")}if(t.length>0){var i=Math.ceil(t[0].getBoundingClientRect().width);return t[0]&&i<t[0].scrollWidth}else{return false}};b.prototype._setTooltipFromControl=function(){var t,i="";var o=true;var s=this.getTileContent();if(this._isHeaderTextTruncated()){i=this._oTitle.getText();o=false}if(this._isSubheaderTextTruncated()){i+=(o?"":"\n")+this.getSubheader();o=false}if(this.getScope()!==e.GenericTileScope.Actions){for(var n=0;n<s.length;n++){t=s[n].getContent();if(t&&t.getMetadata().getLibraryName()==="sap.suite.ui.microchart"){i+=(o?"":"\n")+t.getTooltip_AsString()}o=false}}if(i&&!this._getTooltipText()&&!this._isTooltipSuppressed()){this.$().attr("title",i);this._bTooltipFromControl=true}};b.prototype._updateAriaAndTitle=function(){var t=this._getAriaAndTooltipText();var i=this._getAriaText();var o=this.$();if(o.attr("title")!==t){o.attr("aria-label",i)}if(this.getScope()===e.GenericTileScope.Actions){o.find("*:not(.sapMGTRemoveButton)").removeAttr("aria-label").removeAttr("title").unbind("mouseenter")}else{o.find("*").removeAttr("aria-label").removeAttr("title").unbind("mouseenter")}this._setTooltipFromControl()};b.prototype._removeTooltipFromControl=function(){if(this._bTooltipFromControl){this.$().removeAttr("title");this._bTooltipFromControl=false}};b.prototype._isScreenLarge=function(){return this._getCurrentMediaContainerRange(A).name==="large"};b.prototype._getEventParams=function(t){var i,o=b._Action.Press,s=this.getScope(),n=this.getDomRef();if(s===e.GenericTileScope.Actions&&t.target.id.indexOf("-action-remove")>-1){o=b._Action.Remove;n=this._oRemoveButton.getPopupAnchorDomRef()}else if(s===e.GenericTileScope.Actions){n=this._oMoreIcon.getDomRef()}i={scope:s,action:o,domRef:n};return i};b.prototype._handleMediaChange=function(){this._bUpdateLineTileSiblings=true;this.invalidate()};b.prototype.setPressEnabled=function(e){this._bTilePress=e};b.prototype.showActionsView=function(e){if(this._bShowActionsView!==e){this._bShowActionsView=e;this.invalidate()}};return b});