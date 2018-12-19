/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/events/KeyCodes"],function(e,t){"use strict";var i=e.extend("sap.ui.core.support.controls.InteractionSlider",{constructor:function(){this.SIDE_LIST_WIDTH=0;this.LEFT_HANDLE_ID="left";this.RIGHT_HANDLE_ID="right";this.HANDLE_BORDER_SIZE=0;this.HANDLES_WIDTH=3;this.selectedInterval={start:0,end:0,duration:0};this.nodes={slider:null,handle:null,leftResizeHandle:null,rightResizeHandle:null};this.sizes={width:0,handleWidth:0,handleMinWidth:10};this.drag={handleClickOffsetX:0,handleOffsetLeft:0,isResize:false,whichResizeHandle:""};this.fRefs={mousedown:undefined,mousemove:undefined,mouseup:undefined,dragstart:undefined}}});i.prototype.render=function(e){e.write("<div id='interactionSlider'>"+"<div id='interactionSlideHandle'>"+"<span id='interactionLeftHandle'></span>"+"<span id='interactionRightHandle'></span>"+"</div>"+"</div>");e.write("<div id='interactionSliderBottom'>"+"<div id='interactionSlideHandleBottom'>"+"<span id='interactionLeftHandleBottom'></span>"+"<span id='interactionRightHandleBottom'></span>"+"</div>"+"</div>")};i.prototype.initialize=function(){this._registerEventListeners();this._initSlider()};i.prototype.setDuration=function(e){if(!e||!e.length){return}this.selectedInterval.duration=e[e.length-1].end-e[0].start};i.prototype._registerEventListeners=function(){var e=this;window.addEventListener("resize",function(){e._calculateSliderSize()},false);window.addEventListener("keydown",this._onArrowMove.bind(this));window.addEventListener("keyup",this._onArrowUp.bind(this));jQuery("#interactionSlideHandle").on("dblclick",this._initSlider.bind(this));jQuery("#interactionSlider").on("wheel",this._onMouseWheel.bind(this));jQuery("#interactionSlideHandleBottom").on("dblclick",this._initSlider.bind(this));jQuery("#interactionSliderBottom").on("wheel",this._onMouseWheel.bind(this))};i.prototype._initSlider=function(){this.nodes.slider=this.nodes.slider||document.querySelector("#interactionSlider");this.nodes.sliderBottom=this.nodes.sliderBottom||document.querySelector("#interactionSliderBottom");this.nodes.handle=this.nodes.handle||document.querySelector("#interactionSlideHandle");this.nodes.handleBottom=this.nodes.handleBottom||document.querySelector("#interactionSlideHandleBottom");this.nodes.leftResizeHandle=this.nodes.leftResizeHandle||document.querySelector("#interactionLeftHandle");this.nodes.leftResizeHandleBottom=this.nodes.leftResizeHandleBottom||document.querySelector("#interactionLeftHandleBottom");this.nodes.rightResizeHandle=this.nodes.rightResizeHandle||document.querySelector("#interactionRightHandle");this.nodes.rightResizeHandleBottom=this.nodes.rightResizeHandleBottom||document.querySelector("#interactionRightHandleBottom");this.nodes.handle.style.left=0;this.nodes.handleBottom.style.left=this.nodes.handle.style.left;this.nodes.handle.style.width="100%";this.nodes.handleBottom.style.width=this.nodes.handle.style.width;this._calculateSliderSize();if(!this.fRefs.mousedown){this.fRefs.mousedown=this._onMouseDown.bind(this);this.nodes.slider.addEventListener("mousedown",this.fRefs.mousedown);this.nodes.sliderBottom.addEventListener("mousedown",this.fRefs.mousedown)}else{this._fireSelectEvent()}};i.prototype._calculateSliderSize=function(){var e=this.sizes.width;this.sizes.handleWidth=parseInt(this._getSlideHandleWidth());this.sizes.width=this.nodes.slider.offsetWidth;if(this.sizes.width!==this.sizes.handleWidth){this._resizeSliderHandle(e)}this._updateUI()};i.prototype._resizeSliderHandle=function(e){var t=this.sizes.width-e;var i=this.sizes.width-this.drag.handleOffsetLeft;var s=this.sizes.handleWidth+t;this.sizes.handleWidth=Math.max(this.sizes.handleMinWidth,Math.min(s,i));this.nodes.handle.style.width=this.sizes.handleWidth+"px";this.nodes.handleBottom.style.width=this.nodes.handle.style.width;if(this.sizes.width<this.drag.handleOffsetLeft+this.sizes.handleWidth){this.drag.handleOffsetLeft=this.sizes.width-this.sizes.handleWidth;this.nodes.handle.style.left=this.drag.handleOffsetLeft+"px";this.nodes.handleBottom.style.left=this.nodes.handle.style.left}};i.prototype._updateUI=function(){this.sizes.handleWidth=parseInt(this._getSlideHandleWidth());this.drag.handleOffsetLeft=this.nodes.handle.offsetLeft};i.prototype._getSlideHandleWidth=function(){var e;if(document.getElementById("interactionSlideHandle").currentStyle){e=document.getElementById("interactionSlideHandle").currentStyle.width}else{e=window.getComputedStyle(this.nodes.handle).width}return e};i.prototype._onArrowMove=function(e){var i=0;var s=5;if(e.keyCode!=t.ARROW_LEFT&&e.keyCode!=t.ARROW_RIGHT){return}else if(e.keyCode==t.ARROW_LEFT){i=-s}else if(e.keyCode==t.ARROW_RIGHT){i=s}var n=Math.min(this.drag.handleOffsetLeft+i,this.sizes.width-this.sizes.handleWidth);this.drag.handleOffsetLeft=Math.max(n,0);this.nodes.handle.style.left=this.drag.handleOffsetLeft+"px";this.nodes.handleBottom.style.left=this.nodes.handle.style.left};i.prototype._onArrowUp=function(e){if(e.keyCode!=t.ARROW_LEFT&&e.keyCode!=t.ARROW_RIGHT){return}this._fireSelectEvent()};i.prototype._onMouseDown=function(e){var t=e.target.id;var i=this.SIDE_LIST_WIDTH+this.sizes.handleWidth/2;var s=Math.max(e.clientX-i,0);var n=this.sizes.width-this.sizes.handleWidth;var d=Math.min(s,n);if(t===this.nodes.slider.id||t===this.nodes.sliderBottom.id){this.nodes.handle.style.left=d+"px";this.nodes.handleBottom.style.left=this.nodes.handle.style.left;this.drag.handleOffsetLeft=this.nodes.handle.offsetLeft;this.drag.isResize=false}else if(t===this.nodes.handle.id||t===this.nodes.handleBottom.id){this.drag.handleClickOffsetX=e.offsetX;this.drag.isResize=false;this._registerOnMouseMoveListener()}else if(t===this.nodes.leftResizeHandle.id||t===this.nodes.leftResizeHandleBottom.id){this.drag.whichResizeHandle=this.LEFT_HANDLE_ID;this.drag.isResize=true;this._registerOnMouseMoveListener()}else if(t===this.nodes.rightResizeHandle.id||t===this.nodes.rightResizeHandleBottom.id){this.drag.whichResizeHandle=this.RIGHT_HANDLE_ID;this.drag.isResize=true;this._registerOnMouseMoveListener()}else{return}this._registerOnMouseUpListener();this._registerOnDragStartListener()};i.prototype._registerOnMouseMoveListener=function(){this.fRefs.mousemove=this._onMouseMove.bind(this);window.addEventListener("mousemove",this.fRefs.mousemove)};i.prototype._registerOnMouseUpListener=function(){this.fRefs.mouseup=this._onMouseUp.bind(this);window.addEventListener("mouseup",this.fRefs.mouseup)};i.prototype._registerOnDragStartListener=function(){this.fRefs.dragstart=this._onDragStart.bind(this);window.addEventListener("dragstart",this.fRefs.dragstart)};i.prototype._onMouseMove=function(e){e.stopImmediatePropagation();var t;var i=e.clientX-this.SIDE_LIST_WIDTH;if(this.drag.isResize){this._handleResize(e);return}var s=this.sizes.width-this.sizes.handleWidth+this.drag.handleClickOffsetX;t=Math.max(Math.min(i,s),this.drag.handleClickOffsetX);this.nodes.handle.style.left=t-this.drag.handleClickOffsetX+"px";this.nodes.handleBottom.style.left=this.nodes.handle.style.left};i.prototype._onMouseWheel=function(e){e.preventDefault();this._handleMouseWheelResize(e)};i.prototype._handleResize=function(e){e.stopImmediatePropagation();var t;var i;var s;var n;var d;var h;var o=e.clientX-this.SIDE_LIST_WIDTH;var a=3;if(this.drag.whichResizeHandle===this.RIGHT_HANDLE_ID){n=o-this.drag.handleOffsetLeft+a;t=Math.max(n,this.sizes.handleMinWidth);i=this.sizes.width-this.drag.handleOffsetLeft;s=Math.min(t,i);this.nodes.handle.style.width=s+"px";this.nodes.handleBottom.style.width=this.nodes.handle.style.width}if(this.drag.whichResizeHandle===this.LEFT_HANDLE_ID){t=this.drag.handleOffsetLeft+this.sizes.handleWidth-this.sizes.handleMinWidth;o=Math.max(Math.min(o,t),0);i=this.drag.handleOffsetLeft+this.sizes.handleWidth;d=Math.min(o,this.sizes.width);h=Math.max(Math.max(d,-2*this.sizes.handleMinWidth),a);s=i-h+a;if(s<=a+this.sizes.handleMinWidth){s-=a;h+=a}this.nodes.handle.style.left=h-a+"px";this.nodes.handleBottom.style.left=this.nodes.handle.style.left;this.nodes.handle.style.width=s+"px";this.nodes.handleBottom.style.width=this.nodes.handle.style.width}};i.prototype._handleMouseWheelResize=function(e){var t=40;if(e.originalEvent.deltaY&&e.originalEvent.deltaY>=0){this._calculateHandlerSizePositionOnMouseWheelDown(t)}else{this._calculateHandlerSizePositionOnMouseWheelUp(t)}this._updateUI();this._fireSelectEvent()};i.prototype._calculateHandlerSizePositionOnMouseWheelDown=function(e){var t;var i;var s=this.sizes.width-this.drag.handleOffsetLeft;var n=Math.min(s-this.sizes.handleWidth,e);var d=this.drag.handleOffsetLeft+this.sizes.handleWidth===this.sizes.width;if(n<e&&!d){i=this.sizes.handleWidth+n;t=this.nodes.handle.offsetLeft}else if(d){var h=Math.min(this.sizes.width-this.sizes.handleWidth,e);i=this.sizes.handleWidth+h;t=Math.max(0,this.nodes.handle.offsetLeft-h)}else{i=this.sizes.handleWidth+e;t=Math.max(0,this.nodes.handle.offsetLeft-e/2)}this.nodes.handle.style.left=t+"px";this.nodes.handleBottom.style.left=this.nodes.handle.style.left;this.nodes.handle.style.width=i+"px";this.nodes.handleBottom.style.width=this.nodes.handle.style.width};i.prototype._calculateHandlerSizePositionOnMouseWheelUp=function(e){if(this.sizes.handleWidth-e>this.sizes.handleMinWidth){this.nodes.handle.style.left=this.nodes.handle.offsetLeft+e/2+"px";this.nodes.handleBottom.style.left=this.nodes.handleBottom.offsetLeft+e/2+"px";this.nodes.handle.style.width=this.sizes.handleWidth-e+"px";this.nodes.handleBottom.style.width=this.nodes.handle.style.width}};i.prototype._onMouseUp=function(e){e.stopImmediatePropagation();window.removeEventListener("mousemove",this.fRefs.mousemove);window.removeEventListener("mouseup",this.fRefs.mouseup);window.removeEventListener("dragstart",this.fRefs.dragstart);this._updateUI();this._fireSelectEvent()};i.prototype._onDragStart=function(e){e.preventDefault()};i.prototype._fireSelectEvent=function(){var e=this.selectedInterval.start;var t=this.selectedInterval.end;this._calculateStartEndPeriod();if(e===this.selectedInterval.start&&t==this.selectedInterval.end){return}jQuery("#interactionSlider").trigger("InteractionSliderChange",[this.selectedInterval.start,this.selectedInterval.end])};i.prototype._calculateStartEndPeriod=function(){var e=this.nodes.slider.offsetWidth;var t=this.nodes.leftResizeHandle.getBoundingClientRect().left-this.nodes.slider.getBoundingClientRect().left-this.HANDLE_BORDER_SIZE;var i=this.nodes.rightResizeHandle.getBoundingClientRect().left-this.nodes.slider.getBoundingClientRect().left+this.HANDLE_BORDER_SIZE+this.HANDLES_WIDTH;var s=t/e;var n=i/e,d=this,h=function(e,t){var i=function(e){return""+Math.round(e*d.selectedInterval.duration/10)/100+"s"};var s=i(e);jQuery("#"+t).attr("title",s);jQuery("#"+t+"Bottom").attr("title",s)};if(s!=this.selectedInterval.start){h(s,"interactionLeftHandle")}if(n!=this.selectedInterval.end){h(n,"interactionRightHandle")}this.selectedInterval.start=s;this.selectedInterval.end=n};return i});