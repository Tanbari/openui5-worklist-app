/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Bar","./Button","./InstanceManager","./library","sap/ui/core/Control","sap/ui/core/Popup","sap/ui/core/delegate/ScrollEnablement","sap/ui/core/theming/Parameters","sap/ui/Device","sap/ui/base/ManagedObject","sap/ui/core/library","sap/ui/core/Element","sap/ui/core/ResizeHandler","./PopoverRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/dom/getScrollbarSize","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/dom/jquery/Focusable","sap/ui/dom/jquery/rect","sap/ui/dom/jquery/control"],function(t,e,i,o,r,s,n,a,l,h,f,p,g,c,u,d,_,m,v){"use strict";var P=o.PopupHelper;var y=f.OpenState;var C=o.PlacementType;var w=r.extend("sap.m.Popover",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",properties:{placement:{type:"sap.m.PlacementType",group:"Behavior",defaultValue:C.Right},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},title:{type:"string",group:"Appearance",defaultValue:null},modal:{type:"boolean",group:"Behavior",defaultValue:false},offsetX:{type:"int",group:"Appearance",defaultValue:0},offsetY:{type:"int",group:"Appearance",defaultValue:0},showArrow:{type:"boolean",group:"Appearance",defaultValue:true},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentMinWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enableScrolling:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},verticalScrolling:{type:"boolean",group:"Misc",defaultValue:true},horizontalScrolling:{type:"boolean",group:"Misc",defaultValue:true},bounce:{type:"boolean",group:"Behavior",defaultValue:null},resizable:{type:"boolean",group:"Dimension",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeader:{type:"sap.ui.core.Control",multiple:false},subHeader:{type:"sap.ui.core.Control",multiple:false},footer:{type:"sap.ui.core.Control",multiple:false},_internalHeader:{type:"sap.m.Bar",multiple:false,visibility:"hidden"},beginButton:{type:"sap.ui.core.Control",multiple:false},endButton:{type:"sap.ui.core.Control",multiple:false}},associations:{leftButton:{type:"sap.m.Button",multiple:false,deprecated:true},rightButton:{type:"sap.m.Button",multiple:false,deprecated:true},initialFocus:{type:"sap.ui.core.Control",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}}},designtime:"sap/m/designtime/Popover.designtime"}});w._bIOS7=l.os.ios&&l.os.version>=7&&l.os.version<8&&l.browser.name==="sf";w.prototype.init=function(){this._arrowOffsetThreshold=4;this._marginTopInit=false;this._marginTop=48;this._marginLeft=10;this._marginRight=10;this._marginBottom=10;this._minDimensions={width:100,height:32};this._$window=d(window);this._initialWindowDimensions={};this.oPopup=new s;this.oPopup.setShadow(true);this.oPopup.setAutoClose(true);this.oPopup.setAnimations(d.proxy(this._openAnimation,this),d.proxy(this._closeAnimation,this));this._placements=[C.Top,C.Right,C.Bottom,C.Left,C.Vertical,C.Horizontal,C.Auto,C.VerticalPreferedTop,C.VerticalPreferedBottom,C.HorizontalPreferedLeft,C.HorizontalPreferedRight,C.VerticalPreferredTop,C.VerticalPreferredBottom,C.HorizontalPreferredLeft,C.HorizontalPreferredRight,C.PreferredRightOrFlip,C.PreferredLeftOrFlip,C.PreferredTopOrFlip,C.PreferredBottomOrFlip];this._myPositions=["center bottom","begin center","center top","end center"];this._atPositions=["center top","end center","center bottom","begin center"];this._offsets=["0 -18","18 0","0 18","-18 0"];this._arrowOffset=18;this._followOfTolerance=32;this._scrollContentList=[sap.m.NavContainer,sap.m.Page,sap.m.ScrollContainer];this._fnAdjustPositionAndArrow=d.proxy(this._adjustPositionAndArrow,this);this._fnOrientationChange=d.proxy(this._onOrientationChange,this);this._fnFollowOf=d.proxy(function(t){var e=t.lastOfRect,i=t.currentOfRect;if(!l.system.desktop||Math.abs(e.top-i.top)<=this._followOfTolerance&&Math.abs(e.left-i.left)<=this._followOfTolerance||Math.abs(e.top+e.height-i.top-i.height)<=this._followOfTolerance&&Math.abs(e.left+e.width-i.left-i.width)<=this._followOfTolerance){this.oPopup._applyPosition(this.oPopup._oLastPosition,true)}else{this.close()}},this);this.setFollowOf(true);this._oRestoreFocusDelegate={onBeforeRendering:function(){var t=d(document.activeElement),e=t.control(0);this._sFocusControlId=e&&e.getId()},onAfterRendering:function(){if(this._sFocusControlId&&!u(this.getDomRef(),document.activeElement)){sap.ui.getCore().byId(this._sFocusControlId).focus()}}};var t=this;this.oPopup._applyPosition=function(e,i){var o=this.getOpenState(),r;if(o===y.CLOSING||o===y.CLOSED){return}if(i){t._storeScrollPosition()}t._clearCSSStyles();var n=t._placements.indexOf(t.getPlacement());if(n>3&&!t._bPosCalced){t._calcPlacement();return}t._bPosCalced=false;if(t._oOpenBy instanceof p){e.of=t._getOpenByDomRef()}if(!e.of){v.warning("sap.m.Popover: in function applyPosition, the openBy element doesn't have any DOM output. "+t);return}if(!u(document.documentElement,e.of)&&e.of.id){r=d(document.getElementById(e.of.id));if(r){e.of=r}else{v.warning("sap.m.Popover: in function applyPosition, the openBy element's DOM is already detached from DOM tree and can't be found again by the same id. "+t);return}}var a=d(e.of).rect();if(i&&t._$window.height()==t._initialWindowDimensions.height&&(a.top+a.height<=0||a.top>=t._$window.height()||a.left+a.width<=0||a.left>=t._$window.width())){t.close();return}var h=t.getDomRef("scroll");if(!l.system.desktop){d(window).scrollLeft(0)}t._deregisterContentResizeHandler();s.prototype._applyPosition.call(this,e);t._fnAdjustPositionAndArrow();t._restoreScrollPosition();t._registerContentResizeHandler(h)};this.oPopup.close=function(e){var i=typeof e==="boolean";var o=t.oPopup.getOpenState();if(e!==true&&(this.touchEnabled||!this._isFocusInsidePopup())&&this.isOpen()&&!(o===y.CLOSED||o===y.CLOSING)){t.fireBeforeClose({openBy:t._oOpenBy})}t._deregisterContentResizeHandler();s.prototype.close.apply(this,i?[]:arguments);t.removeDelegate(t._oRestoreFocusDelegate)}};w.prototype.onBeforeRendering=function(){var t,e;if(!this._initialWindowDimensions.width||!this._initialWindowDimensions.height){this._initialWindowDimensions={width:this._$window.width(),height:this._$window.height()}}if(!this.getHorizontalScrolling()&&!this.getVerticalScrolling()){this._forceDisableScrolling=true}else if(!this._bVScrollingEnabled&&!this._bHScrollingEnabled&&this._hasSingleScrollableContent()){this._forceDisableScrolling=true;v.info("VerticalScrolling and horizontalScrolling in sap.m.Popover with ID "+this.getId()+" has been disabled because there's scrollable content inside")}else{this._forceDisableScrolling=false}if(!this._forceDisableScrolling){if(!this._oScroller){this._oScroller=new n(this,this.getId()+"-scroll",{horizontal:this.getHorizontalScrolling(),vertical:this.getVerticalScrolling()})}}if(this._bContentChanged){this._bContentChanged=false;t=this._getSingleNavContent();e=this._getSinglePageContent();if(t&&!this.getModal()&&!l.support.touch&&!d.sap.simulateMobileOnDesktop){t.attachEvent("afterNavigate",function(t){var e=this.getDomRef();if(e&&!e.contains(document.activeElement)){e.focus()}},this)}if(t||e){e=e||t.getCurrentPage();if(e&&e._getAnyHeader){this.addStyleClass("sapMPopoverWithHeaderCont")}if(t){t.attachEvent("navigate",function(t){var e=t.getParameter("to");if(e instanceof sap.m.Page){this.$().toggleClass("sapMPopoverWithHeaderCont",!!e._getAnyHeader())}},this)}}}};w.prototype.onAfterRendering=function(){var t,e,i;if(!this._marginTopInit&&this.getShowArrow()){this._marginTop=2;if(this._oOpenBy){t=d(this._getOpenByDomRef());if(!(t.closest("header.sapMIBar").length>0)){e=t.closest(".sapMPage");if(e.length>0){i=e.children("header.sapMIBar");if(i.length>0){this._marginTop+=i.outerHeight()}}}this._marginTopInit=true}}};w.prototype.exit=function(){this._deregisterContentResizeHandler();l.resize.detachHandler(this._fnOrientationChange);i.removePopoverInstance(this);this.removeDelegate(this._oRestoreFocusDelegate);this._oRestoreFocusDelegate=null;if(this.oPopup){this.oPopup.detachClosed(this._handleClosed,this);this.oPopup.destroy();this.oPopup=null}if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._internalHeader){this._internalHeader.destroy();this._internalHeader=null}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null}};w.prototype.openBy=function(t,e){var r=this.oPopup,n=this.oPopup.getOpenState(),h=this._getInitialFocusId(),f,p,g,c;f=t.getDomRef&&t.getDomRef()||t;c=d(f).closest(".sapUiSizeCompact");g=a.get("_sap_m_Popover_ForceCompactArrowOffset")==="true";this._bSizeCompact=o._bSizeCompact||!!c.length||this.hasStyleClass("sapUiSizeCompact");this._bUseCompactArrow=this._bSizeCompact||g;this._adaptPositionParams();if(n===y.OPEN||n===y.OPENING){if(this._oOpenBy===t){return this}else{var u=function(){r.detachClosed(u,this);this.openBy(t)};r.attachClosed(u,this);this.close();return this}}if(!t){return this}if(l.support.touch){l.resize.attachHandler(this._fnOrientationChange)}if(!this._oOpenBy||t!==this._oOpenBy){this._oOpenBy=t}this.fireBeforeOpen({openBy:this._oOpenBy});r.attachOpened(this._handleOpened,this);r.attachClosed(this._handleClosed,this);r.setInitialFocusId(h);p=this._placements.indexOf(this.getPlacement());if(p>-1){f=this._getOpenByDomRef();if(!f){v.error("sap.m.Popover id = "+this.getId()+": is opened by a control which isn't rendered yet.");return this}r.setAutoCloseAreas([t]);r.setContent(this);if(p<=3){r.setPosition(this._myPositions[p],this._atPositions[p],f,this._calcOffset(this._offsets[p]),"fit")}else{r._oPosition.of=f}var _=this;var m=function(){if(r.getOpenState()===y.CLOSING){if(_._sOpenTimeout){clearTimeout(_._sOpenTimeout);_._sOpenTimeout=null}_._sOpenTimeout=setTimeout(m,150)}else{_._oPreviousFocus=s.getCurrentFocusInfo();r.open();_.addDelegate(_._oRestoreFocusDelegate,_);if(!e){i.addPopoverInstance(_)}}};m()}else{v.error(this.getPlacement()+"is not a valid value! It can only be top, right, bottom or left")}return this};w.prototype.close=function(){var t=this.oPopup.getOpenState(),e,i;if(t===y.CLOSED||t===y.CLOSING){return this}this.fireBeforeClose({openBy:this._oOpenBy});this.oPopup.close(true);if(this._oPreviousFocus){i=document.activeElement||{};e=this._oPreviousFocus.sFocusId===sap.ui.getCore().getCurrentFocusedControlId()||this._oPreviousFocus.sFocusId===i.id;if(!e){s.applyFocusInfo(this._oPreviousFocus);this._oPreviousFocus=null}}return this};w.prototype.isOpen=function(){return this.oPopup&&this.oPopup.isOpen()};w.prototype.setFollowOf=function(t){if(t){this.oPopup.setFollowOf(this._fnFollowOf)}else{this.oPopup.setFollowOf(false)}return this};w.prototype._clearCSSStyles=function(){var t=this.getDomRef().style,e=this.$("cont"),i=e.children(".sapMPopoverScroll"),o=e[0].style,r=i[0].style,s=this.getContentWidth(),n=this.getContentHeight(),a=this.$("arrow"),l,h;if(s.indexOf("%")>0){l=this._$window.width();s=P.calcPercentageSize(s,l)}if(n.indexOf("%")>0){h=this._$window.height();n=P.calcPercentageSize(n,h)}o.width=s||"";o.height=n||"";o.maxWidth="";o.maxHeight="";t.left="";t.right="";t.top="";t.bottom="";t.width="";t.height="";r.width="";r.display="";a.removeClass("sapMPopoverArrRight sapMPopoverArrLeft sapMPopoverArrDown sapMPopoverArrUp sapMPopoverCrossArr sapMPopoverFooterAlignArr sapMPopoverHeaderAlignArr sapContrast sapContrastPlus");a.css({left:"",top:""})};w.prototype._onOrientationChange=function(){var t=this.oPopup.getOpenState();if(!(t===y.OPEN||t===y.OPENING)){return}this.oPopup._applyPosition(this.oPopup._oLastPosition,true)};w.prototype._handleOpened=function(){var t=this;this.oPopup.detachOpened(this._handleOpened,this);if(!l.support.touch){setTimeout(function(){!t.bIsDestroyed&&l.resize.attachHandler(t._fnOrientationChange)},0)}var e=this._getInitialFocusId(),i=sap.ui.getCore().byId(e),o=e?window.document.getElementById(e):null;if(i&&i.getFocusDomRef()){i.getFocusDomRef().focus()}else if(!i&&o){o.focus()}this.fireAfterOpen({openBy:this._oOpenBy})};w.prototype._handleClosed=function(){this.oPopup.detachClosed(this._handleClosed,this);l.resize.detachHandler(this._fnOrientationChange);i.removePopoverInstance(this);if(!this.oPopup._bModal&&!l.system.desktop&&document.activeElement&&!d(document.activeElement).is(":visible")){document.activeElement.blur()}this.fireAfterClose({openBy:this._oOpenBy})};w.prototype.onfocusin=function(t){var e=t.target,i=this.$();if(e.id===this.getId()+"-firstfe"){var o=i.lastFocusableDomRef();if(o){o.focus()}}else if(e.id===this.getId()+"-lastfe"){var r=i.firstFocusableDomRef();if(r){r.focus()}}};w.prototype.onkeydown=function(t){var e=m,i=t.which||t.keyCode,o=t.altKey;if(i===e.ESCAPE||o&&i===e.F4){if(t.originalEvent&&t.originalEvent._sapui_handledByControl){return}this.close();t.stopPropagation();t.preventDefault()}};w.prototype.onmousedown=function(t){var e=sap.ui.getCore().getConfiguration().getRTL();if(!t.target.classList.contains("sapMPopoverResizeHandle")){return}var i=d(document);var o=this.$();var r=this;o.addClass("sapMPopoverResizing");t.preventDefault();t.stopPropagation();var s={x:t.pageX,y:t.pageY,width:o.width(),height:o.height()};i.on("mousemove.sapMPopover",function(t){var i,o;if(e){i=s.width+s.x-t.pageX;o=s.height+(s.y-t.pageY)}else{i=s.width+t.pageX-s.x;o=s.height+(s.y-t.pageY)}r.setContentWidth(Math.max(i,r._minDimensions.width)+"px");r.setContentHeight(Math.max(o,r._minDimensions.height)+"px")});i.on("mouseup.sapMPopover",function(){o.removeClass("sapMPopoverResizing");i.off("mouseup.sapMPopover, mousemove.sapMPopover")})};w.prototype._hasSingleNavContent=function(){return!!this._getSingleNavContent()};w.prototype._getSingleNavContent=function(){var t=this._getAllContent();while(t.length===1&&t[0]instanceof sap.ui.core.mvc.View){t=t[0].getContent()}if(t.length===1&&t[0]instanceof sap.m.NavContainer){return t[0]}else{return null}};w.prototype._getSinglePageContent=function(){var t=this._getAllContent();while(t.length===1&&t[0]instanceof sap.ui.core.mvc.View){t=t[0].getContent()}if(t.length===1&&t[0]instanceof sap.m.Page){return t[0]}else{return null}};w.prototype._hasSinglePageContent=function(){var t=this._getAllContent();while(t.length===1&&t[0]instanceof sap.ui.core.mvc.View){t=t[0].getContent()}if(t.length===1&&t[0]instanceof sap.m.Page){return true}else{return false}};w.prototype._hasSingleScrollableContent=function(){var t=this._getAllContent(),e;while(t.length===1&&t[0]instanceof sap.ui.core.mvc.View){t=t[0].getContent()}if(t.length===1){for(e=0;e<this._scrollContentList.length;e++){if(t[0]instanceof this._scrollContentList[e]){return true}}return false}else{return false}};w.prototype._getOffsetX=function(){var t=this.getPlacement(),e=0;if(this._bHorizontalFlip){var i=this._getOpenByDomRef();var o=i!==undefined;var r=o?i.getBoundingClientRect().width:0;e=t===C.PreferredRightOrFlip?Math.abs(r):-Math.abs(r)}var s=sap.ui.getCore().getConfiguration().getRTL();var n=e*(s?-1:1)+this.getOffsetX()*(s?-1:1);return n};w.prototype._getOffsetY=function(){var t=this.getPlacement(),e=0;if(this._bVerticalFlip){var i=this._getOpenByDomRef();var o=i!==undefined;var r=o?i.getBoundingClientRect().height:0;e=t==="PreferredTopOrFlip"?-Math.abs(r):Math.abs(r)}return e+this.getOffsetY()};w.prototype._calcOffset=function(t){var e=this._getOffsetX(),i=this._getOffsetY();var o=t.split(" ");var t=parseInt(o[0])+e+" "+(parseInt(o[1])+i);return t};w.prototype._calcPlacement=function(){var t=this.getPlacement();var e=this._getOpenByDomRef();switch(t){case C.Auto:this._calcAuto();break;case C.Vertical:case C.VerticalPreferedTop:case C.VerticalPreferredTop:case C.VerticalPreferedBottom:case C.VerticalPreferredBottom:case C.PreferredTopOrFlip:case C.PreferredBottomOrFlip:this._calcVertical();break;case C.Horizontal:case C.HorizontalPreferedLeft:case C.HorizontalPreferredLeft:case C.HorizontalPreferedRight:case C.HorizontalPreferredRight:case C.PreferredRightOrFlip:case C.PreferredLeftOrFlip:this._calcHorizontal();break}this._bPosCalced=true;var i=this._placements.indexOf(this._oCalcedPos);this.oPopup.setPosition(this._myPositions[i],this._atPositions[i],e,this._calcOffset(this._offsets[i]),"fit")};w.prototype._getDocHeight=function(){var t=document.body,e=document.documentElement;return Math.max(t.scrollHeight,t.offsetHeight,e.clientHeight,e.offsetHeight)};w.prototype._calcVertical=function(){var t=d(this._getOpenByDomRef());var e=t[0]!==undefined;var i=this.getPlacement()===C.VerticalPreferedTop||this.getPlacement()===C.VerticalPreferredTop;var o=this.getPlacement()===C.VerticalPreferedBottom||this.getPlacement()===C.VerticalPreferredBottom;var r=this.getPlacement()===C.PreferredTopOrFlip;var s=this.getPlacement()===C.PreferredBottomOrFlip;var n=e?t[0].getBoundingClientRect().top:0;var a=e?t[0].getBoundingClientRect().height:0;var l=this._getOffsetY();var h=n-this._marginTop+l;var f=this.$().outerHeight();var p=this._getDocHeight()-(t.offset().top+a+this._marginBottom+l);if(i&&h>f+this._arrowOffset){this._bVerticalFlip=false;this._oCalcedPos=C.Top}else if(r){if(h>f+this._arrowOffset){this._bVerticalFlip=false;this._oCalcedPos=C.Top}else{this._bVerticalFlip=true;this._oCalcedPos=C.Bottom}}else if(o&&p>f+this._arrowOffset){this._oCalcedPos=C.Bottom;this._bVerticalFlip=false}else if(s){if(p>f+this._arrowOffset){this._bVerticalFlip=false;this._oCalcedPos=C.Bottom}else{this._bVerticalFlip=true;this._oCalcedPos=C.Top}}else if(h>p){this._oCalcedPos=C.Top}else{this._oCalcedPos=C.Bottom}};w.prototype._calcHorizontal=function(){var t=d(this._getOpenByDomRef());var e=t[0]!==undefined;var i=this.getPlacement()===C.HorizontalPreferedLeft||this.getPlacement()===C.HorizontalPreferredLeft;var o=this.getPlacement()===C.HorizontalPreferedRight||this.getPlacement()===C.HorizontalPreferredRight;var r=e?t[0].getBoundingClientRect().left:0;var s=e?t[0].getBoundingClientRect().width:0;var n=this._getOffsetX();var a=r-this._marginLeft+n;var l=r+s;var h=this._$window.width()-l-this._marginRight-n;var f=this.$().outerWidth();var p=this.getPlacement()===C.PreferredLeftOrFlip;var g=this.getPlacement()===C.PreferredRightOrFlip;var c=sap.ui.getCore().getConfiguration().getRTL();if(i&&a>f+this._arrowOffset){this._bHorizontalFlip=false;this._oCalcedPos=c?C.Right:C.Left}else if(p){if(a>f+this._arrowOffset){this._bHorizontalFlip=false;this._oCalcedPos=c?C.Right:C.Left}else{this._bHorizontalFlip=true;this._oCalcedPos=c?C.Left:C.Right}}else if(o&&h>f+this._arrowOffset){this._bHorizontalFlip=false;this._oCalcedPos=c?C.Left:C.Right}else if(g){if(h>f+this._arrowOffset){this._bHorizontalFlip=false;this._oCalcedPos=c?C.Left:C.Right}else{this._bHorizontalFlip=true;this._oCalcedPos=c?C.Right:C.Left}}else if(a>h){this._oCalcedPos=c?C.Right:C.Left}else{this._oCalcedPos=c?C.Left:C.Right}};w.prototype._calcAuto=function(){if(this._$window.width()>this._$window.height()){if(this._checkHorizontal()){this._calcHorizontal()}else if(this._checkVertical()){this._calcVertical()}else{this._calcBestPos()}}else{if(this._checkVertical()){this._calcVertical()}else if(this._checkHorizontal()){this._calcHorizontal()}else{this._calcBestPos()}}};w.prototype._checkHorizontal=function(){var t=d(this._getOpenByDomRef());var e=t[0]!==undefined;var i=e?t[0].getBoundingClientRect().left:0;var o=e?t[0].getBoundingClientRect().width:0;var r=this._getOffsetX();var s=i-this._marginLeft+r;var n=i+o;var a=this._$window.width()-n-this._marginRight-r;var l=this.$();var h=l.outerWidth()+this._arrowOffset;if(h<=s||h<=a){return true}};w.prototype._checkVertical=function(){var t=d(this._getOpenByDomRef());var e=t[0]!==undefined;var i=e?t[0].getBoundingClientRect().top:0;var o=e?t[0].getBoundingClientRect().height:0;var r=this._getOffsetY();var s=i-this._marginTop+r;var n=this._getDocHeight()-t.offset().top-o-this._marginBottom-r;var a=this.$();var l=a.outerHeight()+this._arrowOffset;if(l<=s||l<=n){return true}};w.prototype._calcBestPos=function(){var t=this.$();var e=t.outerHeight();var i=t.outerWidth();var o=sap.ui.getCore().getConfiguration().getRTL();var r=d(this._getOpenByDomRef());var s=r[0]!==undefined;var n=s?r[0].getBoundingClientRect().left:0;var a=s?r[0].getBoundingClientRect().top:0;var l=s?r[0].getBoundingClientRect().width:0;var h=s?r[0].getBoundingClientRect().height:0;var f=this._getOffsetX();var p=this._getOffsetY();var g=a-this._marginTop+p;var c=this._getDocHeight()-r.offset().top-h-this._marginBottom-p;var u=n-this._marginLeft+f;var _=n+l;var m=this._$window.width()-_-this._marginRight-f;var v=e*i;var P;var y;if(this._$window.height()-this._marginTop-this._marginBottom>=e){P=e}else{P=this._$window.height()-this._marginTop-this._marginBottom}if(this._$window.width()-this._marginLeft-this._marginRight>=i){y=i}else{y=this._$window.width()-this._marginLeft-this._marginRight}var w=P*u/v;var O=P*m/v;var H=y*g/v;var b=y*c/v;var B=Math.max(w,O);var R=Math.max(H,b);if(B>R){if(B===w){this._oCalcedPos=o?C.Right:C.Left}else if(B===O){this._oCalcedPos=o?C.Left:C.Right}}else if(R>B){if(R===H){this._oCalcedPos=C.Top}else if(R===b){this._oCalcedPos=C.Bottom}}else if(R===B){if(this._$window.height()>this._$window.width()){if(R===H){this._oCalcedPos=C.Top}else if(R===b){this._oCalcedPos=C.Bottom}}else{if(B===w){this._oCalcedPos=o?C.Right:C.Left}else if(B===O){this._oCalcedPos=o?C.Left:C.Right}}}};w.outerWidth=function(t,e){if(typeof window.SVGElement!=="undefined"&&t instanceof window.SVGElement){return t.getBoundingClientRect().width}return d(t).outerWidth(!!e)};w.outerHeight=function(t,e){if(typeof window.SVGElement!=="undefined"&&t instanceof window.SVGElement){return t.getBoundingClientRect().height}return d(t).outerHeight(!!e)};w.prototype._getPositionParams=function(t,e,i,o){var r=window.getComputedStyle(t[0]),s=window.getComputedStyle(i[0]),n=this.getDomRef().clientHeight!=this.getDomRef().scrollHeight?_().width:0,a={};a._$popover=t;a._$parent=d(this._getOpenByDomRef());a._$arrow=e;a._$content=i;a._$scrollArea=o;a._$header=t.children(".sapMPopoverHeader");a._$subHeader=t.children(".sapMPopoverSubHeader");a._$footer=t.children(".sapMPopoverFooter");a._fWindowTop=this._$window.scrollTop();a._fWindowRight=this._$window.width();a._fWindowBottom=w._bIOS7&&l.orientation.landscape&&window.innerHeight?window.innerHeight:this._$window.height();a._fWindowLeft=this._$window.scrollLeft();a._fDocumentWidth=a._fWindowLeft+a._fWindowRight;a._fDocumentHeight=a._fWindowTop+a._fWindowBottom;a._fArrowHeight=e.outerHeight(true);a._fWidth=w.outerWidth(t[0]);a._fWidthInner=a._$scrollArea?a._$scrollArea.width()+n:0;a._fHeight=w.outerHeight(t[0]);a._fHeaderHeight=a._$header.length>0?a._$header.outerHeight(true):0;a._fSubHeaderHeight=a._$subHeader.length>0?a._$subHeader.outerHeight(true):0;a._fFooterHeight=a._$footer.length>0?a._$footer.outerHeight(true):0;a._fOffset=t.offset();a._fOffsetX=this._getOffsetX();a._fOffsetY=this._getOffsetY();a._fMarginTop=a._fWindowTop+this._marginTop;a._fMarginRight=this._marginRight;a._fMarginBottom=this._marginBottom;a._fMarginLeft=a._fWindowLeft+this._marginLeft;a._fPopoverBorderTop=parseFloat(r.borderTopWidth);a._fPopoverBorderRight=parseFloat(r.borderRightWidth);a._fPopoverBorderBottom=parseFloat(r.borderBottomWidth);a._fPopoverBorderLeft=parseFloat(r.borderLeftWidth);a._fContentMarginTop=parseFloat(s.marginTop);a._fContentMarginBottom=parseFloat(s.marginBottom);return a};w.prototype._recalculateMargins=function(t,e){var i=sap.ui.getCore().getConfiguration().getRTL();switch(t){case C.Left:if(i){e._fMarginLeft=e._$parent.offset().left+w.outerWidth(e._$parent[0],false)+this._arrowOffset-e._fOffsetX}else{e._fMarginRight=e._fDocumentWidth-e._$parent.offset().left+this._arrowOffset-e._fOffsetX}break;case C.Right:if(i){e._fMarginRight=e._fDocumentWidth-w.outerWidth(e._$parent[0],false)-e._$parent.offset().left+this._arrowOffset}else{e._fMarginLeft=e._$parent.offset().left+w.outerWidth(e._$parent[0],false)+this._arrowOffset+e._fOffsetX}break;case C.Top:e._fMarginBottom=e._fDocumentHeight-e._$parent.offset().top+this._arrowOffset-e._fOffsetY;break;case C.Bottom:e._fMarginTop=e._$parent.offset().top+w.outerHeight(e._$parent[0],false)+this._arrowOffset+e._fOffsetY;break}};w.prototype._getPopoverPositionCss=function(t){var e,i,o,r,s=t._fDocumentWidth-t._fOffset.left-t._fWidth,n=t._fDocumentHeight-t._fOffset.top-t._fHeight,a=t._fDocumentWidth-t._fMarginRight-t._fMarginLeft<t._fWidth,l=t._fDocumentHeight-t._fMarginTop-t._fMarginBottom<t._fHeight,h=t._fOffset.left<t._fMarginLeft,f=this.getVerticalScrolling()&&t._fWidth!==t._fWidthInner?_().width:0,p=s<t._fMarginRight+f,g=t._fOffset.top<t._fMarginTop,c=n<t._fMarginBottom,u=sap.ui.getCore().getConfiguration().getRTL();if(a){e=t._fMarginLeft;i=t._fMarginRight}else{if(h){e=t._fMarginLeft;if(u){i=""}}else if(p){i=t._fMarginRight;e=""}}if(l){o=t._fMarginTop;r=t._fMarginBottom}else{if(g){o=t._fMarginTop}else if(c){r=t._fMarginBottom;o=""}}var d={top:o,bottom:r-t._fWindowTop,left:e,right:typeof i==="number"?i-t._fWindowLeft:i};return d};w.prototype._getContentDimensionsCss=function(t){var e={},i=t._$content.height(),o=this._getMaxContentWidth(t),r=this._getMaxContentHeight(t);r=Math.max(r,0);e["max-width"]=o+"px";if(this.getContentHeight()||i>r){e["height"]=Math.min(r,i)+"px"}else{e["height"]="";e["max-height"]=r+"px"}return e};w.prototype._getMaxContentWidth=function(t){return t._fDocumentWidth-t._fMarginLeft-t._fMarginRight-t._fPopoverBorderLeft-t._fPopoverBorderRight};w.prototype._getMaxContentHeight=function(t){return t._fDocumentHeight-t._fMarginTop-t._fMarginBottom-t._fHeaderHeight-t._fSubHeaderHeight-t._fFooterHeight-t._fContentMarginTop-t._fContentMarginBottom-t._fPopoverBorderTop-t._fPopoverBorderBottom};w.prototype._isHorizontalScrollbarNeeded=function(t){return this.getHorizontalScrolling()&&t._$scrollArea.outerWidth(true)<=t._$content.width()};w.prototype._getArrowOffsetCss=function(t,e){var i,o=sap.ui.getCore().getConfiguration().getRTL();e._fWidth=e._$popover.outerWidth();e._fHeight=e._$popover.outerHeight();if(t===C.Left||t===C.Right){i=e._$parent.offset().top-e._$popover.offset().top-e._fPopoverBorderTop+e._fOffsetY+.5*(w.outerHeight(e._$parent[0],false)-e._$arrow.outerHeight(false));i=Math.max(i,this._arrowOffsetThreshold);i=Math.min(i,e._fHeight-this._arrowOffsetThreshold-e._$arrow.outerHeight());return{top:i}}else if(t===C.Top||t===C.Bottom){if(o){i=e._$popover.offset().left+w.outerWidth(e._$popover[0],false)-(e._$parent.offset().left+w.outerWidth(e._$parent[0],false))+e._fPopoverBorderRight+e._fOffsetX+.5*(w.outerWidth(e._$parent[0],false)-e._$arrow.outerWidth(false));i=Math.max(i,this._arrowOffsetThreshold);i=Math.min(i,e._fWidth-this._arrowOffsetThreshold-e._$arrow.outerWidth(false));return{right:i}}else{i=e._$parent.offset().left-e._$popover.offset().left-e._fPopoverBorderLeft+e._fOffsetX+.5*(w.outerWidth(e._$parent[0],false)-e._$arrow.outerWidth(false));i=Math.max(i,this._arrowOffsetThreshold);i=Math.min(i,e._fWidth-this._arrowOffsetThreshold-e._$arrow.outerWidth(false));return{left:i}}}};w.prototype._getArrowPositionCssClass=function(t){switch(t){case C.Left:return"sapMPopoverArrRight";case C.Right:return"sapMPopoverArrLeft";case C.Top:return"sapMPopoverArrDown";case C.Bottom:return"sapMPopoverArrUp"}};w.prototype._getArrowStyleCssClass=function(t){var e=t._$arrow.position(),i=t._$footer.position(),o=this._getSingleNavContent(),r=this._getSinglePageContent(),s=0;if(o||r){r=r||o.getCurrentPage();if(r){s=r._getAnyHeader().$().outerHeight()}}if(e.top+t._fArrowHeight<t._fHeaderHeight+t._fSubHeaderHeight||e.top+t._fArrowHeight<s){return"sapMPopoverHeaderAlignArr"}else if(e.top<t._fHeaderHeight+t._fSubHeaderHeight||e.top<s||t._$footer.length&&e.top+t._fArrowHeight>i.top&&e.top<i.top){return"sapMPopoverCrossArr"}else if(t._$footer.length&&e.top>i.top){return"sapMPopoverFooterAlignArr"}};w.prototype._getCalculatedPlacement=function(){return this._oCalcedPos||this.getPlacement()};w.prototype._adjustPositionAndArrow=function(){var t=this.oPopup.getOpenState();if(!(t===y.OPEN||t===y.OPENING)){return}var e=this.$(),i=this.$("arrow"),o=this.$("cont"),r=this.$("scroll"),s=this._getCalculatedPlacement(),n=this._getPositionParams(e,i,o,r);this._recalculateMargins(s,n);var a=this._getPopoverPositionCss(n),l=this._getContentDimensionsCss(n),h=this._isHorizontalScrollbarNeeded(n);e.css(a);o.css(l);if(h){r.css("display","block")}if(this.getShowArrow()){var f=this._getArrowOffsetCss(s,n),p=this._getArrowPositionCssClass(s),g,c;i.removeAttr("style");i.css(f);i.addClass(p);if(s===C.Top&&n._$footer&&n._$footer.size()){c=true}if(s===C.Left||s===C.Right){g=this._getArrowStyleCssClass(n);if(g){i.addClass(g);if(g==="sapMPopoverFooterAlignArr"){c=true}}}if(c){i.addClass("sapContrast sapContrastPlus")}e.css("overflow","visible")}this._afterAdjustPositionAndArrowHook()};w.prototype._adaptPositionParams=function(){if(this.getShowArrow()){this._marginLeft=10;this._marginRight=10;this._marginBottom=10;this._arrowOffset=18;this._offsets=["0 -18","18 0","0 18","-18 0"];if(this._bUseCompactArrow){this._arrowOffset=9;this._offsets=["0 -9","9 0","0 9","-9 0"]}this._myPositions=["center bottom","begin center","center top","end center"];this._atPositions=["center top","end center","center bottom","begin center"]}else{this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"];this._myPositions=["begin bottom","begin center","begin top","end center"];this._atPositions=["begin top","end center","begin bottom","begin center"]}};w.prototype._afterAdjustPositionAndArrowHook=function(){};w.prototype._isPopupElement=function(t){var e=this._getOpenByDomRef();return!!d(t).closest(sap.ui.getCore().getStaticAreaRef()).length||!!d(t).closest(e).length};w.prototype._getAnyHeader=function(){if(this.getCustomHeader()){return this.getCustomHeader()}else{if(this.getShowHeader()){this._createInternalHeader();return this._internalHeader}}};w.prototype._createInternalHeader=function(){if(!this._internalHeader){var e=this;this._internalHeader=new t(this.getId()+"-intHeader");this.setAggregation("_internalHeader",this._internalHeader);this._internalHeader.addEventDelegate({onAfterRendering:function(){e._restoreFocus()}});return true}else{return false}};w.prototype._animation=function(t,e){var i=null;var o=function(){e.off("webkitTransitionEnd transitionend");clearTimeout(i);setTimeout(function(){t()})};e.on("webkitTransitionEnd transitionend",o);i=setTimeout(o,this._getAnimationDuration())};w.prototype._getAnimationDuration=function(){return 300};w.prototype._openAnimation=function(t,e,i){var o=this;setTimeout(function(){t.css("display","block");o._animation(function(){if(!o.oPopup||o.oPopup.getOpenState()!==y.OPENING){return}i()},t)},l.browser.firefox?50:0)};w.prototype._closeAnimation=function(t,e,i){t.addClass("sapMPopoverTransparent");this._animation(function(){i();t.removeClass("sapMPopoverTransparent")},t)};w.prototype._getInitialFocusId=function(){return this.getInitialFocus()||this._getFirstVisibleButtonId()||this._getFirstFocusableContentElementId()||this.getId()};w.prototype._getFirstVisibleButtonId=function(){var t=this.getBeginButton(),e=this.getEndButton(),i="";if(t&&t.getVisible()){i=t.getId()}else if(e&&e.getVisible()){i=e.getId()}return i};w.prototype._getFirstFocusableContentElementId=function(){var t="";var e=this.$("cont");var i=e.firstFocusableDomRef();if(i){t=i.id}return t};w.prototype._restoreFocus=function(){if(this.isOpen()){var t=this._getInitialFocusId(),e=sap.ui.getCore().byId(t),i=t?window.document.getElementById(t):null;if(e&&e.getFocusDomRef()){e.getFocusDomRef().focus()}else if(!e&&i){i.focus()}}};w.prototype._registerContentResizeHandler=function(t){if(!this._sResizeListenerId){this._sResizeListenerId=g.register(t||this.getDomRef("scroll"),this._fnOrientationChange)}};w.prototype._deregisterContentResizeHandler=function(){if(this._sResizeListenerId){g.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};w.prototype._storeScrollPosition=function(){var t=this.$("cont");if(t.length>0){this._oScrollPosDesktop={x:t.scrollLeft(),y:t.scrollTop()}}};w.prototype._restoreScrollPosition=function(){if(!this._oScrollPosDesktop){return}var t=this.$("cont");if(t.length>0){t.scrollLeft(this._oScrollPosDesktop.x).scrollTop(this._oScrollPosDesktop.y);this._oScrollPosDesktop=null}};w.prototype._repositionOffset=function(){var t=this.oPopup.getOpenState(),e,i;if(!(t===y.OPEN)){return this}e=this.oPopup._oLastPosition;i=this._placements.indexOf(this.getPlacement());if(i===-1){return this}if(i<4){e.offset=this._calcOffset(this._offsets[i]);this.oPopup._applyPosition(e)}else{this._calcPlacement()}return this};w.prototype._getOpenByDomRef=function(){if(!this._oOpenBy){return null}if(this._oOpenBy instanceof p){return this._oOpenBy.getPopupAnchorDomRef&&this._oOpenBy.getPopupAnchorDomRef()||this._oOpenBy.getFocusDomRef()}else{return this._oOpenBy}};w.prototype._getAccessibilityOptions=function(){var t,e={};e.role="dialog";if(this.getShowHeader()&&this._getAnyHeader()){t=Array.prototype.concat(this._getAnyHeader().getId(),this.getAssociation("ariaLabelledBy",[]));e.labelledby=t.join(" ")}return e};w.prototype.setPlacement=function(t){this.setProperty("placement",t,true);this._bVerticalFlip=false;this._bHorizontalFlip=false;var e=this._placements.indexOf(t);if(e<=3){this._oCalcedPos=t}return this};w.prototype.setTitle=function(t){this.setProperty("title",t,true);if(this._headerTitle){this._headerTitle.setText(t)}else{this._headerTitle=new sap.m.Title(this.getId()+"-title",{text:this.getTitle(),level:"H2"});this._createInternalHeader();this._internalHeader.addContentMiddle(this._headerTitle)}return this};w.prototype.setBeginButton=function(t){var e=this.getBeginButton();if(e===t){return this}this._createInternalHeader();this._beginButton=t;if(t){if(e){this._internalHeader.removeAggregation("contentLeft",e,true)}this._internalHeader.addAggregation("contentLeft",t)}else{this._internalHeader.removeContentLeft(e)}return this};w.prototype.setEndButton=function(t){var e=this.getEndButton();if(e===t){return this}this._createInternalHeader();this._endButton=t;if(t){if(e){this._internalHeader.removeAggregation("contentRight",e,true)}this._internalHeader.insertAggregation("contentRight",t,1,true);this._internalHeader.invalidate()}else{this._internalHeader.removeContentRight(e)}return this};w.prototype.setLeftButton=function(t){if(!(t instanceof e)){t=sap.ui.getCore().byId(t)}this.setBeginButton(t);return this.setAssociation("leftButton",t)};w.prototype.setRightButton=function(t){if(!(t instanceof e)){t=sap.ui.getCore().byId(t)}this.setEndButton(t);return this.setAssociation("rightButton",t)};w.prototype.setShowHeader=function(t){if(t===this.getShowHeader()||this.getCustomHeader()){return this}if(t){if(this._internalHeader){this._internalHeader.$().show()}}else{if(this._internalHeader){this._internalHeader.$().hide()}}this.setProperty("showHeader",t,true);return this};w.prototype.setModal=function(t,e){if(t===this.getModal()){return this}this.oPopup.setModal(t,d.trim("sapMPopoverBLayer "+(e||"")));this.setProperty("modal",t,true);return this};w.prototype.setOffsetX=function(t){this.setProperty("offsetX",t,true);return this._repositionOffset()};w.prototype.setOffsetY=function(t){this.setProperty("offsetY",t,true);return this._repositionOffset()};w.prototype.setEnableScrolling=function(t){this.setHorizontalScrolling(t);this.setVerticalScrolling(t);var e=this.getEnableScrolling();if(e===t){return this}this.setProperty("enableScrolling",t,true);return this};w.prototype.setVerticalScrolling=function(t){this._bVScrollingEnabled=t;var e=this.getVerticalScrolling();if(e===t){return this}this.$().toggleClass("sapMPopoverVerScrollDisabled",!t);this.setProperty("verticalScrolling",t,true);if(this._oScroller){this._oScroller.setVertical(t)}return this};w.prototype.setHorizontalScrolling=function(t){this._bHScrollingEnabled=t;var e=this.getHorizontalScrolling();if(e===t){return this}this.$().toggleClass("sapMPopoverHorScrollDisabled",!t);this.setProperty("horizontalScrolling",t,true);if(this._oScroller){this._oScroller.setHorizontal(t)}return this};w.prototype.setResizable=function(t){if(!l.system.desktop){t=false}return this.setProperty("resizable",t,true)};w.prototype.getScrollDelegate=function(){return this._oScroller};w.prototype.setAggregation=function(t,e,i){if(t==="beginButton"||t==="endButton"){var o="set"+t.charAt(0).toUpperCase()+t.slice(1);return this[o](e)}else{return r.prototype.setAggregation.apply(this,arguments)}};w.prototype.getAggregation=function(t,e){if(t==="beginButton"||t==="endButton"){var i=this["_"+t];return i||e||null}else{return r.prototype.getAggregation.apply(this,arguments)}};w.prototype.destroyAggregation=function(t,e){var i=d(document.activeElement).control(0);if(t==="beginButton"||t==="endButton"){var o=this["_"+t];if(o){o.destroy();this["_"+t]=null}}else{r.prototype.destroyAggregation.apply(this,arguments)}i&&i.getDomRef()?i.focus():this.focus();return this};w.prototype.invalidate=function(t){if(this.isOpen()){r.prototype.invalidate.apply(this,arguments)}return this};w.prototype.addAggregation=function(t,e,i){if(t==="content"){this._bContentChanged=true}r.prototype.addAggregation.apply(this,arguments)};w.prototype._getAllContent=function(){return this.getContent()};w.prototype._applyContextualSettings=function(){h.prototype._applyContextualSettings.call(this,h._defaultContextualSettings)};return w});