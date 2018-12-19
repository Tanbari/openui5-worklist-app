/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(t){"use strict";var e;if(t.module){e=t.module;t.module=undefined}sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/ui/core/mvc/View","sap/ui/test/matchers/Ancestor","sap/ui/test/matchers/MatcherFactory","sap/ui/test/pipelines/MatcherPipeline","sap/ui/test/_opaCorePlugin","sap/ui/test/_OpaLogger"],function(t,e,r,n,o,i,l,s){var a=new o;var u=new i;var g=["id","viewName","controlType","searchOpenDialogs"];var c=e.extend("sap.ui.test.OpaPlugin",{constructor:function(){this._oLogger=s.getLogger("sap.ui.test.Opa5")},getAllControls:function(t,e){var r=l.getAllControls(t);this._oLogger.debug("Found "+r.length+" controls"+(t?" of type '"+(e||t)+"'":"")+" in page");return r},getView:function(t){var e=this.getAllControls(r,"View");return e.filter(function(e){return e.getViewName()===t})[0]},getControlInView:function(e){var r=(e.viewNamespace||"")+"."+(e.viewName||""),n=r.replace(/\.+/g,".").replace(/^\.|\.$/g,""),o=this.getView(n),i=typeof e.id==="string";if(!o){this._oLogger.debug("Found no view with the name: '"+n+"'");return i?null:[]}if(t.isArray(e.id)){var l=[];var s=[];t.each(e.id,function(t,e){var r=o.byId(e);if(r){l.push(r)}else{s.push(e)}});var a=s.length?". Found no controls matching the subset of IDs "+s:"";this._oLogger.debug("Found "+l.length+" controls with ID contained in "+e.id+" in view '"+n+"'"+a);return l}if(i){var u=o.byId(e.id)||null;this._oLogger.debug("Found "+(u?"":"no ")+"control with ID '"+e.id+"' in view '"+n+"'");return u}var g=this.getAllControlsWithTheParent(o,e.controlType,e.sOriginalControlType);var c=t.type(e.id)==="regexp";if(c){var h=o.getId();g=g.filter(function(t){var r=t.getId().replace(h,"");return e.id.test(r)})}this._oLogger.debug("Found "+g.length+" controls of type "+e.sOriginalControlType+(c?" with ID matching "+e.id:"")+" in view '"+n+"'");return g},getAllControlsWithTheParent:function(t,e,r){var o=new n(t);return this._filterUniqueControlsByCondition(this.getAllControls(e,r),o)},getAllControlsInContainer:function(t,e,r,n){var o=this._filterUniqueControlsByCondition(t.find("*").control(),function(t){return l.checkControlType(t,e)});this._oLogger.debug("Found "+o.length+" controls in "+(n?n:"container")+" with controlType '"+r+"'");return o},getMatchingControls:function(e){var r=null;e=e||{};var n=this._modifyControlType(e);if(!n){return typeof e.id==="string"?r:[]}if(e.searchOpenDialogs){r=this.getAllControlsInContainer(t("#sap-ui-static"),e.controlType,e.sOriginalControlType,"the static UI area")}else if(e.viewName){r=this.getControlInView(e)}else if(e.id){r=this.getControlByGlobalId(e)}else if(e.controlType){r=this.getAllControls(e.controlType,e.sOriginalControlType)}else{r=this.getAllControls()}if(!r||e.visible===false){return r}var o=a.getInteractabilityMatchers(e.interactable);var i=u.process({control:r,matchers:o});if(!i){if(t.isArray(r)){return[]}if(r){return null}return r}return i},_getFilteredControls:function(t){var e=this._filterControlsByCondition(t);return e===c.FILTER_FOUND_NO_CONTROLS?c.FILTER_FOUND_NO_CONTROLS:this._filterControlsByMatchers(t,e)},_getFilteredControlsByDeclaration:function(e){var r=this._filterControlsByCondition(e);var n=t.extend({},e,{useDeclarativeMatchers:true});return r===c.FILTER_FOUND_NO_CONTROLS?c.FILTER_FOUND_NO_CONTROLS:this._filterControlsByMatchers(n,r)},_filterControlsByCondition:function(e){var r=null;var n=this._isLookingForAControl(e);if(n){r=this.getMatchingControls(e)}var o=[typeof e.id==="string"&&!r,!e.id&&(e.viewName||e.searchOpenDialogs)&&!r.length,t.type(e.id)==="regexp"&&!r.length,t.isArray(e.id)&&(!r||r.length!==e.id.length),e.controlType&&t.isArray(r)&&!r.length];return o.some(Boolean)?c.FILTER_FOUND_NO_CONTROLS:r},_filterControlsByMatchers:function(t,e){var r=t.useDeclarativeMatchers?a.getFilteringMatchers(t):t.matchers;var n=this._isLookingForAControl(t);var o=null;if((e||!n)&&r){o=u.process({matchers:r,control:e});if(!o){return c.FILTER_FOUND_NO_CONTROLS}}else{o=e}return o},getControlByGlobalId:function(e){var r=l.getCoreElements();if(typeof e.id==="string"){var n=r[e.id]||null;if(n&&!l.checkControlType(n,e.controlType)){this._oLogger.error("A control with global ID '"+e.id+"' is found but does not have required controlType '"+e.sOriginalControlType+"'. Found control is '"+n+"' but null is returned instead");return null}this._oLogger.debug("Found "+(n?"":"no ")+"control with the global ID '"+e.id+"'");return n}var o=[];var i=t.type(e.id)==="regexp";if(i){for(var s in r){if(!r.hasOwnProperty(s)||!e.id.test(s)){continue}o.push(s)}}else if(t.isArray(e.id)){o=e.id}var a=[];var u=[];o.forEach(function(t){var n=r[t];if(n&&l.checkControlType(n,e.controlType)&&!n.bIsDestroyed){a.push(n)}else{u.push(t)}});var g=!i&&u.length?". Found no controls of matching the subset of IDs "+u:"";this._oLogger.debug("Found "+a.length+" controls of type "+e.sOriginalControlType+(i?" with ID matching '":" with ID contained in '")+e.id+g);return a},getControlConstructor:function(e){if(sap.ui.lazyRequire._isStub(e)){this._oLogger.debug("The control type "+e+" is currently a lazy stub.");return null}var r=t.sap.getObject(e);if(!r){this._oLogger.debug("The control type "+e+" is undefined.");return null}return r},_isLookingForAControl:function(t){return Object.keys(t).some(function(e){return g.indexOf(e)!==-1&&!!t[e]})},_filterUniqueControlsByCondition:function(t,e){return t.filter(function(t,r,n){var o=!!e(t);return o&&n.indexOf(t)===r})},_modifyControlType:function(t){var e=t.controlType;if(typeof e!=="string"){if(e&&e._sapUiLazyLoader){this._oLogger.debug("The control type is currently a lazy stub");return false}return true}var r=this.getControlConstructor(e);if(!r){return false}t.sOriginalControlType=e;t.controlType=r;return true}});c.FILTER_FOUND_NO_CONTROLS="FILTER_FOUND_NO_CONTROL";return c});if(e){t.module=e}})(window);