/**
 * Sinon.JS 1.14.1, 2015/03/16
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @author Contributors: https://github.com/cjohansen/Sinon.JS/blob/master/AUTHORS
 *
 * (The BSD License)
 *
 * Copyright (c) 2010-2014, Christian Johansen, christian@cjohansen.no
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice,
 *       this list of conditions and the following disclaimer in the documentation
 *       and/or other materials provided with the distribution.
 *     * Neither the name of Christian Johansen nor the names of his contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * Sinon core utilities. For internal use only.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
var sinon=function(){"use strict";var e;var t=typeof module!=="undefined"&&module.exports&&typeof require==="function";var n=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function r(t,n,r){e=r.exports=t("./sinon/util/core");t("./sinon/extend");t("./sinon/typeOf");t("./sinon/times_in_words");t("./sinon/spy");t("./sinon/call");t("./sinon/behavior");t("./sinon/stub");t("./sinon/mock");t("./sinon/collection");t("./sinon/assert");t("./sinon/sandbox");t("./sinon/test");t("./sinon/test_case");t("./sinon/match");t("./sinon/format");t("./sinon/log_error")}if(n){define(r)}else if(t){r(require,module.exports,module);e=module.exports}else{e={}}return e}();
/**
 * Sinon core utilities. For internal use only.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
/**
 * Sinon core utilities. For internal use only.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
(function(e){var t=typeof document!="undefined"&&document.createElement("div");var n=Object.prototype.hasOwnProperty;function r(e){var n=false;try{e.appendChild(t);n=t.parentNode==e}catch(e){return false}finally{try{e.removeChild(t)}catch(e){}}return n}function o(e){return t&&e&&e.nodeType===1&&r(e)}function i(e){return typeof e==="function"||!!(e&&e.constructor&&e.call&&e.apply)}function s(e){return typeof e==="number"&&isNaN(e)}function a(e,t){for(var r in t){if(!n.call(e,r)){e[r]=t[r]}}}function u(e){return typeof e==="function"&&typeof e.restore==="function"&&e.restore.sinon}var f="keys"in Object;function l(e){e.wrapMethod=function t(r,o,s){if(!r){throw new TypeError("Should wrap property of object")}if(typeof s!="function"&&typeof s!="object"){throw new TypeError("Method wrapper should be a function or a property descriptor")}function u(e){if(!i(e)){l=new TypeError("Attempted to wrap "+typeof e+" property "+o+" as function")}else if(e.restore&&e.restore.sinon){l=new TypeError("Attempted to wrap "+o+" which is already wrapped")}else if(e.calledBefore){var t=!!e.returns?"stubbed":"spied on";l=new TypeError("Attempted to wrap "+o+" which is already "+t)}if(l){if(e&&e.stackTrace){l.stack+="\n--------------\n"+e.stackTrace}throw l}}var l,c;var d=r.hasOwnProperty?r.hasOwnProperty(o):n.call(r,o);if(f){var p=typeof s=="function"?{value:s}:s,h=e.getPropertyDescriptor(r,o),y;if(!h){l=new TypeError("Attempted to wrap "+typeof c+" property "+o+" as function")}else if(h.restore&&h.restore.sinon){l=new TypeError("Attempted to wrap "+o+" which is already wrapped")}if(l){if(h&&h.stackTrace){l.stack+="\n--------------\n"+h.stackTrace}throw l}var v=e.objectKeys(p);for(y=0;y<v.length;y++){c=h[v[y]];u(c)}a(p,h);for(y=0;y<v.length;y++){a(p[v[y]],h[v[y]])}Object.defineProperty(r,o,p)}else{c=r[o];u(c);r[o]=s;s.displayName=o}s.displayName=o;s.stackTrace=new Error("Stack Trace for original").stack;s.restore=function(){if(!d){try{delete r[o]}catch(e){}if(r[o]===s){r[o]=c}}else if(f){Object.defineProperty(r,o,h)}if(!f&&r[o]===s){r[o]=c}};s.restore.sinon=true;if(!f){a(s,c)}return s};e.create=function e(t){var n=function(){};n.prototype=t;return new n};e.deepEqual=function t(n,r){if(e.match&&e.match.isMatcher(n)){return n.test(r)}if(typeof n!="object"||typeof r!="object"){if(s(n)&&s(r)){return true}else{return n===r}}if(o(n)||o(r)){return n===r}if(n===r){return true}if(n===null&&r!==null||n!==null&&r===null){return false}if(n instanceof RegExp&&r instanceof RegExp){return n.source===r.source&&n.global===r.global&&n.ignoreCase===r.ignoreCase&&n.multiline===r.multiline}var i=Object.prototype.toString.call(n);if(i!=Object.prototype.toString.call(r)){return false}if(i=="[object Date]"){return n.valueOf()===r.valueOf()}var a,u=0,f=0;if(i=="[object Array]"&&n.length!==r.length){return false}for(a in n){u+=1;if(!(a in r)){return false}if(!t(n[a],r[a])){return false}}for(a in r){f+=1}return u==f};e.functionName=function e(t){var n=t.displayName||t.name;if(!n){var r=t.toString().match(/function ([^\s\(]+)/);n=r&&r[1]}return n};e.functionToString=function e(){if(this.getCall&&this.callCount){var t,n,r=this.callCount;while(r--){t=this.getCall(r).thisValue;for(n in t){if(t[n]===this){return n}}}}return this.displayName||"sinon fake"};e.objectKeys=function e(t){if(t!==Object(t)){throw new TypeError("sinon.objectKeys called on a non-object")}var r=[];var o;for(o in t){if(n.call(t,o)){r.push(o)}}return r};e.getPropertyDescriptor=function e(t,n){var r=t,o;while(r&&!(o=Object.getOwnPropertyDescriptor(r,n))){r=Object.getPrototypeOf(r)}return o};e.getConfig=function(t){var n={};t=t||{};var r=e.defaultConfig;for(var o in r){if(r.hasOwnProperty(o)){n[o]=t.hasOwnProperty(o)?t[o]:r[o]}}return n};e.defaultConfig={injectIntoThis:true,injectInto:null,properties:["spy","stub","mock","clock","server","requests"],useFakeTimers:true,useFakeServer:true};e.timesInWords=function e(t){return t==1&&"once"||t==2&&"twice"||t==3&&"thrice"||(t||0)+" times"};e.calledInOrder=function(e){for(var t=1,n=e.length;t<n;t++){if(!e[t-1].calledBefore(e[t])||!e[t].called){return false}}return true};e.orderByFirstCall=function(e){return e.sort(function(e,t){var n=e.getCall(0);var r=t.getCall(0);var o=n&&n.callId||-1;var i=r&&r.callId||-1;return o<i?-1:1})};e.createStubInstance=function(t){if(typeof t!=="function"){throw new TypeError("The constructor should be a function.")}return e.stub(e.create(t.prototype))};e.restore=function(e){if(e!==null&&typeof e==="object"){for(var t in e){if(u(e[t])){e[t].restore()}}}else if(u(e)){e.restore()}};return e}var c=typeof module!=="undefined"&&module.exports&&typeof require=="function";var d=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function p(e,t){l(t)}if(d){define(p)}else if(c){p(require,module.exports)}else if(!e){return}else{l(e)}})(typeof sinon=="object"&&sinon||null);(function(e){function t(e){var t=function(){var e={constructor:function(){return"0"},toString:function(){return"1"},valueOf:function(){return"2"},toLocaleString:function(){return"3"},prototype:function(){return"4"},isPrototypeOf:function(){return"5"},propertyIsEnumerable:function(){return"6"},hasOwnProperty:function(){return"7"},length:function(){return"8"},unique:function(){return"9"}};var t=[];for(var n in e){t.push(e[n]())}return t.join("")!=="0123456789"}();function n(e){var n=Array.prototype.slice.call(arguments,1),r,o,i;for(o=0;o<n.length;o++){r=n[o];for(i in r){if(r.hasOwnProperty(i)){e[i]=r[i]}}if(t&&r.hasOwnProperty("toString")&&r.toString!==e.toString){e.toString=r.toString}}return e}e.extend=n;return e.extend}function n(e,n,r){var o=e("./util/core");r.exports=t(o)}var r=typeof module!=="undefined"&&module.exports&&typeof require=="function";var o=typeof define==="function"&&typeof define.amd==="object"&&define.amd;if(o){define(n)}else if(r){n(require,module.exports,module)}else if(!e){return}else{t(e)}})(typeof sinon=="object"&&sinon||null);
/**
 * Minimal Event interface implementation
 *
 * Original implementation by Sven Fuchs: https://gist.github.com/995028
 * Modifications and tests by Christian Johansen.
 *
 * @author Sven Fuchs (svenfuchs@artweb-design.de)
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2011 Sven Fuchs, Christian Johansen
 */if(typeof sinon=="undefined"){this.sinon={}}(function(){var e=[].push;function t(t){t.Event=function e(t,n,r,o){this.initEvent(t,n,r,o)};t.Event.prototype={initEvent:function(e,t,n,r){this.type=e;this.bubbles=t;this.cancelable=n;this.target=r},stopPropagation:function(){},preventDefault:function(){this.defaultPrevented=true}};t.ProgressEvent=function e(t,n,r){this.initEvent(t,false,false,r);this.loaded=n.loaded||null;this.total=n.total||null;this.lengthComputable=!!n.total};t.ProgressEvent.prototype=new t.Event;t.ProgressEvent.prototype.constructor=t.ProgressEvent;t.CustomEvent=function e(t,n,r){this.initEvent(t,false,false,r);this.detail=n.detail||null};t.CustomEvent.prototype=new t.Event;t.CustomEvent.prototype.constructor=t.CustomEvent;t.EventTarget={addEventListener:function t(n,r){this.eventListeners=this.eventListeners||{};this.eventListeners[n]=this.eventListeners[n]||[];e.call(this.eventListeners[n],r)},removeEventListener:function e(t,n){var r=this.eventListeners&&this.eventListeners[t]||[];for(var o=0,i=r.length;o<i;++o){if(r[o]==n){return r.splice(o,1)}}},dispatchEvent:function e(t){var n=t.type;var r=this.eventListeners&&this.eventListeners[n]||[];for(var o=0;o<r.length;o++){if(typeof r[o]=="function"){r[o].call(this,t)}else{r[o].handleEvent(t)}}return!!t.defaultPrevented}}}var n=typeof module!=="undefined"&&module.exports&&typeof require=="function";var r=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function o(e){var n=e("./core");t(n)}if(r){define(o)}else if(n){o(require)}else{t(sinon)}})();
/**
 * Logs errors
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2014 Christian Johansen
 */
/**
 * Logs errors
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2014 Christian Johansen
 */
(function(e){var t=setTimeout;function n(e){function n(){}function r(t,n){var o=t+" threw exception: ";e.log(o+"["+n.name+"] "+n.message);if(n.stack){e.log(n.stack)}r.setTimeout(function(){n.message=o+n.message;throw n},0)}r.setTimeout=function(e,n){t(e,n)};var o={};o.log=e.log=n;o.logError=e.logError=r;return o}function r(e,t,r){var o=e("./util/core");r.exports=n(o)}var o=typeof module!=="undefined"&&module.exports&&typeof require=="function";var i=typeof define==="function"&&typeof define.amd==="object"&&define.amd;if(i){define(r)}else if(o){r(require,module.exports,module)}else if(!e){return}else{n(e)}})(typeof sinon=="object"&&sinon||null);if(typeof sinon=="undefined"){this.sinon={}}(function(e){var t={XDomainRequest:e.XDomainRequest};t.GlobalXDomainRequest=e.XDomainRequest;t.supportsXDR=typeof t.GlobalXDomainRequest!="undefined";t.workingXDR=t.supportsXDR?t.GlobalXDomainRequest:false;function n(n){n.xdr=t;function r(){this.readyState=r.UNSENT;this.requestBody=null;this.requestHeaders={};this.status=0;this.timeout=null;if(typeof r.onCreate=="function"){r.onCreate(this)}}function o(e){if(e.readyState!==r.OPENED){throw new Error("INVALID_STATE_ERR")}if(e.sendFlag){throw new Error("INVALID_STATE_ERR")}}function i(e){if(e.readyState==r.UNSENT){throw new Error("Request not sent")}if(e.readyState==r.DONE){throw new Error("Request done")}}function s(e){if(typeof e!="string"){var t=new Error("Attempted to respond to fake XDomainRequest with "+e+", which is not a string.");t.name="InvalidBodyException";throw t}}n.extend(r.prototype,n.EventTarget,{open:function e(t,n){this.method=t;this.url=n;this.responseText=null;this.sendFlag=false;this.readyStateChange(r.OPENED)},readyStateChange:function e(t){this.readyState=t;var o="";switch(this.readyState){case r.UNSENT:break;case r.OPENED:break;case r.LOADING:if(this.sendFlag){o="onprogress"}break;case r.DONE:if(this.isTimeout){o="ontimeout"}else if(this.errorFlag||(this.status<200||this.status>299)){o="onerror"}else{o="onload"}break}if(o){if(typeof this[o]=="function"){try{this[o]()}catch(e){n.logError("Fake XHR "+o+" handler",e)}}}},send:function e(t){o(this);if(!/^(get|head)$/i.test(this.method)){this.requestBody=t}this.requestHeaders["Content-Type"]="text/plain;charset=utf-8";this.errorFlag=false;this.sendFlag=true;this.readyStateChange(r.OPENED);if(typeof this.onSend=="function"){this.onSend(this)}},abort:function e(){this.aborted=true;this.responseText=null;this.errorFlag=true;if(this.readyState>n.FakeXDomainRequest.UNSENT&&this.sendFlag){this.readyStateChange(n.FakeXDomainRequest.DONE);this.sendFlag=false}},setResponseBody:function e(t){i(this);s(t);var n=this.chunkSize||10;var o=0;this.responseText="";do{this.readyStateChange(r.LOADING);this.responseText+=t.substring(o,o+n);o+=n}while(o<t.length);this.readyStateChange(r.DONE)},respond:function e(t,n,r){this.status=typeof t=="number"?t:200;this.setResponseBody(r||"")},simulatetimeout:function e(){this.status=0;this.isTimeout=true;this.responseText=undefined;this.readyStateChange(r.DONE)}});n.extend(r,{UNSENT:0,OPENED:1,LOADING:3,DONE:4});n.useFakeXDomainRequest=function r(){n.FakeXDomainRequest.restore=function r(o){if(t.supportsXDR){e.XDomainRequest=t.GlobalXDomainRequest}delete n.FakeXDomainRequest.restore;if(o!==true){delete n.FakeXDomainRequest.onCreate}};if(t.supportsXDR){e.XDomainRequest=n.FakeXDomainRequest}return n.FakeXDomainRequest};n.FakeXDomainRequest=r}var r=typeof module!=="undefined"&&module.exports&&typeof require=="function";var o=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function i(e,t,r){var o=e("./core");e("../extend");e("./event");e("../log_error");n(o);r.exports=o}if(o){define(i)}else if(r){i(require,module.exports,module)}else{n(sinon)}})(this);
/**
 * Fake XMLHttpRequest object
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
/**
 * Fake XMLHttpRequest object
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
(function(e){var t=typeof ProgressEvent!=="undefined";var n=typeof CustomEvent!=="undefined";var r={XMLHttpRequest:e.XMLHttpRequest};r.GlobalXMLHttpRequest=e.XMLHttpRequest;r.GlobalActiveXObject=e.ActiveXObject;r.supportsActiveX=typeof r.GlobalActiveXObject!="undefined";r.supportsXHR=typeof r.GlobalXMLHttpRequest!="undefined";r.workingXHR=r.supportsXHR?r.GlobalXMLHttpRequest:r.supportsActiveX?function(){return new r.GlobalActiveXObject("MSXML2.XMLHTTP.3.0")}:false;r.supportsCORS=r.supportsXHR&&"withCredentials"in new r.GlobalXMLHttpRequest;var o={"Accept-Charset":true,"Accept-Encoding":true,Connection:true,"Content-Length":true,Cookie:true,Cookie2:true,"Content-Transfer-Encoding":true,Date:true,Expect:true,Host:true,"Keep-Alive":true,Referer:true,TE:true,Trailer:true,"Transfer-Encoding":true,Upgrade:true,"User-Agent":true,Via:true};function i(){this.readyState=i.UNSENT;this.requestHeaders={};this.requestBody=null;this.status=0;this.statusText="";this.upload=new s;if(r.supportsCORS){this.withCredentials=false}var e=this;var t=["loadstart","load","abort","loadend"];function n(t){e.addEventListener(t,function(n){var r=e["on"+t];if(r&&typeof r=="function"){r.call(this,n)}})}for(var o=t.length-1;o>=0;o--){n(t[o])}if(typeof i.onCreate=="function"){i.onCreate(this)}}function s(){this.eventListeners={progress:[],load:[],abort:[],error:[]}}s.prototype.addEventListener=function e(t,n){this.eventListeners[t].push(n)};s.prototype.removeEventListener=function e(t,n){var r=this.eventListeners[t]||[];for(var o=0,i=r.length;o<i;++o){if(r[o]==n){return r.splice(o,1)}}};s.prototype.dispatchEvent=function e(t){var n=this.eventListeners[t.type]||[];for(var r=0,o;(o=n[r])!=null;r++){o(t)}};function a(e){if(e.readyState!==i.OPENED){throw new Error("INVALID_STATE_ERR")}if(e.sendFlag){throw new Error("INVALID_STATE_ERR")}}function u(e,t){t=t.toLowerCase();for(var n in e){if(n.toLowerCase()==t){return n}}return null}function f(e,t){if(!e){return}for(var n=0,r=e.length;n<r;n+=1){t(e[n])}}function l(e,t){for(var n=0;n<e.length;n++){if(t(e[n])===true){return true}}return false}var c=function(e,t,n){switch(n.length){case 0:return e[t]();case 1:return e[t](n[0]);case 2:return e[t](n[0],n[1]);case 3:return e[t](n[0],n[1],n[2]);case 4:return e[t](n[0],n[1],n[2],n[3]);case 5:return e[t](n[0],n[1],n[2],n[3],n[4])}};i.filters=[];i.addFilter=function e(t){this.filters.push(t)};var d=/MSIE 6/;i.defake=function e(t,n){var o=new r.workingXHR;f(["open","setRequestHeader","send","abort","getResponseHeader","getAllResponseHeaders","addEventListener","overrideMimeType","removeEventListener"],function(e){t[e]=function(){return c(o,e,arguments)}});var s=function(e){f(e,function(e){try{t[e]=o[e]}catch(e){if(!d.test(navigator.userAgent)){throw e}}})};var a=function e(){t.readyState=o.readyState;if(o.readyState>=i.HEADERS_RECEIVED){s(["status","statusText"])}if(o.readyState>=i.LOADING){s(["responseText","response"])}if(o.readyState===i.DONE){s(["responseXML"])}if(t.onreadystatechange){t.onreadystatechange.call(t,{target:t})}};if(o.addEventListener){for(var u in t.eventListeners){if(t.eventListeners.hasOwnProperty(u)){f(t.eventListeners[u],function(e){o.addEventListener(u,e)})}}o.addEventListener("readystatechange",a)}else{o.onreadystatechange=a}c(o,"open",n)};i.useFilters=false;function p(e){if(e.readyState!=i.OPENED){throw new Error("INVALID_STATE_ERR - "+e.readyState)}}function h(e){if(e.readyState==i.DONE){throw new Error("Request done")}}function y(e){if(e.async&&e.readyState!=i.HEADERS_RECEIVED){throw new Error("No headers received")}}function v(e){if(typeof e!="string"){var t=new Error("Attempted to respond to fake XMLHttpRequest with "+e+", which is not a string.");t.name="InvalidBodyException";throw t}}i.parseXML=function e(t){var n;if(typeof DOMParser!="undefined"){var r=new DOMParser;n=r.parseFromString(t,"text/xml")}else{n=new ActiveXObject("Microsoft.XMLDOM");n.async="false";n.loadXML(t)}return n};i.statusCodes={100:"Continue",101:"Switching Protocols",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",300:"Multiple Choice",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Long",415:"Unsupported Media Type",416:"Requested Range Not Satisfiable",417:"Expectation Failed",422:"Unprocessable Entity",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported"};function m(s){s.xhr=r;s.extend(i.prototype,s.EventTarget,{async:true,open:function e(t,n,r,o,s){this.method=t;this.url=n;this.async=typeof r=="boolean"?r:true;this.username=o;this.password=s;this.responseText=null;this.responseXML=null;this.requestHeaders={};this.sendFlag=false;if(i.useFilters===true){var a=arguments;var u=l(i.filters,function(e){return e.apply(this,a)});if(u){return i.defake(this,arguments)}}this.readyStateChange(i.OPENED)},readyStateChange:function e(n){this.readyState=n;if(typeof this.onreadystatechange=="function"){try{this.onreadystatechange()}catch(e){s.logError("Fake XHR onreadystatechange handler",e)}}this.dispatchEvent(new s.Event("readystatechange"));switch(this.readyState){case i.DONE:this.dispatchEvent(new s.Event("load",false,false,this));this.dispatchEvent(new s.Event("loadend",false,false,this));this.upload.dispatchEvent(new s.Event("load",false,false,this));if(t){this.upload.dispatchEvent(new s.ProgressEvent("progress",{loaded:100,total:100}));this.dispatchEvent(new s.ProgressEvent("progress",{loaded:100,total:100}))}break}},setRequestHeader:function e(t,n){a(this);if(o[t]||/^(Sec-|Proxy-)/.test(t)){throw new Error('Refused to set unsafe header "'+t+'"')}if(this.requestHeaders[t]){this.requestHeaders[t]+=","+n}else{this.requestHeaders[t]=n}},setResponseHeaders:function e(t){p(this);this.responseHeaders={};for(var n in t){if(t.hasOwnProperty(n)){this.responseHeaders[n]=t[n]}}if(this.async){this.readyStateChange(i.HEADERS_RECEIVED)}else{this.readyState=i.HEADERS_RECEIVED}},send:function e(t){a(this);if(!/^(get|head)$/i.test(this.method)){var n=u(this.requestHeaders,"Content-Type");if(this.requestHeaders[n]){var r=this.requestHeaders[n].split(";");this.requestHeaders[n]=r[0]+";charset=utf-8"}else if(!(t instanceof FormData)){this.requestHeaders["Content-Type"]="text/plain;charset=utf-8"}this.requestBody=t}this.errorFlag=false;this.sendFlag=this.async;this.readyStateChange(i.OPENED);if(typeof this.onSend=="function"){this.onSend(this)}this.dispatchEvent(new s.Event("loadstart",false,false,this))},abort:function e(){this.aborted=true;this.responseText=null;this.errorFlag=true;this.requestHeaders={};if(this.readyState>i.UNSENT&&this.sendFlag){this.readyStateChange(i.DONE);this.sendFlag=false}this.readyState=i.UNSENT;this.dispatchEvent(new s.Event("abort",false,false,this));this.upload.dispatchEvent(new s.Event("abort",false,false,this));if(typeof this.onerror==="function"){this.onerror()}},getResponseHeader:function e(t){if(this.readyState<i.HEADERS_RECEIVED){return null}if(/^Set-Cookie2?$/i.test(t)){return null}t=u(this.responseHeaders,t);return this.responseHeaders[t]||null},getAllResponseHeaders:function e(){if(this.readyState<i.HEADERS_RECEIVED){return""}var t="";for(var n in this.responseHeaders){if(this.responseHeaders.hasOwnProperty(n)&&!/^Set-Cookie2?$/i.test(n)){t+=n+": "+this.responseHeaders[n]+"\r\n"}}return t},setResponseBody:function e(t){h(this);y(this);v(t);var n=this.chunkSize||10;var r=0;this.responseText="";do{if(this.async){this.readyStateChange(i.LOADING)}this.responseText+=t.substring(r,r+n);r+=n}while(r<t.length);var o=this.getResponseHeader("Content-Type");if(this.responseText&&(!o||/(text\/xml)|(application\/xml)|(\+xml)/.test(o))){try{this.responseXML=i.parseXML(this.responseText)}catch(e){}}this.readyStateChange(i.DONE)},respond:function e(t,n,r){this.status=typeof t=="number"?t:200;this.statusText=i.statusCodes[this.status];this.setResponseHeaders(n||{});this.setResponseBody(r||"")},uploadProgress:function e(n){if(t){this.upload.dispatchEvent(new s.ProgressEvent("progress",n))}},downloadProgress:function e(n){if(t){this.dispatchEvent(new s.ProgressEvent("progress",n))}},uploadError:function e(t){if(n){this.upload.dispatchEvent(new s.CustomEvent("error",{detail:t}))}}});s.extend(i,{UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4});s.useFakeXMLHttpRequest=function(){i.restore=function t(n){if(r.supportsXHR){e.XMLHttpRequest=r.GlobalXMLHttpRequest}if(r.supportsActiveX){e.ActiveXObject=r.GlobalActiveXObject}delete i.restore;if(n!==true){delete i.onCreate}};if(r.supportsXHR){e.XMLHttpRequest=i}if(r.supportsActiveX){e.ActiveXObject=function e(t){if(t=="Microsoft.XMLHTTP"||/^Msxml2\.XMLHTTP/i.test(t)){return new i}return new r.GlobalActiveXObject(t)}}return i};s.FakeXMLHttpRequest=i}var E=typeof module!=="undefined"&&module.exports&&typeof require=="function";var g=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function w(e,t,n){var r=e("./core");e("../extend");e("./event");e("../log_error");m(r);n.exports=r}if(g){define(w)}else if(E){w(require,module.exports,module)}else if(typeof sinon==="undefined"){return}else{m(sinon)}})(typeof global!=="undefined"?global:this);
/**
 * Format functions
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2014 Christian Johansen
 */
/**
 * Format functions
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2014 Christian Johansen
 */
(function(e,t){function n(e){function n(e){return""+e}function r(){var e=t.configure({quoteStrings:false,limitChildrenCount:250});function n(){return e.ascii.apply(e,arguments)}return n}function o(e){function t(e){return typeof e=="object"&&e.toString===Object.prototype.toString?r.inspect(e):e}try{var r=require("util")}catch(e){}return r?t:n}var i=typeof module!=="undefined"&&module.exports&&typeof require=="function",s;if(i){try{t=require("formatio")}catch(e){}}if(t){s=r()}else if(i){s=o()}else{s=n}e.format=s;return e.format}function r(e,t,r){var o=e("./util/core");r.exports=n(o)}var o=typeof module!=="undefined"&&module.exports&&typeof require=="function";var i=typeof define==="function"&&typeof define.amd==="object"&&define.amd;if(i){define(r)}else if(o){r(require,module.exports,module)}else if(!e){return}else{n(e)}})(typeof sinon=="object"&&sinon||null,typeof formatio=="object"&&formatio);
/**
 * The Sinon "server" mimics a web server that receives requests from
 * sinon.FakeXMLHttpRequest and provides an API to respond to those requests,
 * both synchronously and asynchronously. To respond synchronuously, canned
 * answers have to be provided upfront.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */if(typeof sinon=="undefined"){var sinon={}}(function(){var e=[].push;function t(){}function n(e){t.prototype=e;return new t}function r(e){var t=e;if(Object.prototype.toString.call(e)!="[object Array]"){t=[200,{},e]}if(typeof t[2]!="string"){throw new TypeError("Fake server response body should be string, but was "+typeof t[2])}return t}var o=typeof window!=="undefined"?window.location:{};var i=new RegExp("^"+o.protocol+"//"+o.host);function s(e,t,n){var r=e.method;var o=!r||r.toLowerCase()==t.toLowerCase();var i=e.url;var s=!i||i==n||typeof i.test=="function"&&i.test(n);return o&&s}function a(e,t){var n=t.url;if(!/^https?:\/\//.test(n)||i.test(n)){n=n.replace(i,"")}if(s(e,this.getHTTPMethod(t),n)){if(typeof e.response=="function"){var r=e.url;var o=[t].concat(r&&typeof r.exec=="function"?r.exec(n).slice(1):[]);return e.response.apply(e,o)}return true}return false}function u(t){t.fakeServer={create:function(){var e=n(this);if(!t.xhr.supportsCORS){this.xhr=t.useFakeXDomainRequest()}else{this.xhr=t.useFakeXMLHttpRequest()}e.requests=[];this.xhr.onCreate=function(t){e.addRequest(t)};return e},addRequest:function t(n){var r=this;e.call(this.requests,n);n.onSend=function(){r.handleRequest(this);if(r.respondImmediately){r.respond()}else if(r.autoRespond&&!r.responding){setTimeout(function(){r.responding=false;r.respond()},r.autoRespondAfter||10);r.responding=true}}},getHTTPMethod:function e(t){if(this.fakeHTTPMethods&&/post/i.test(t.method)){var n=(t.requestBody||"").match(/_method=([^\b;]+)/);return!!n?n[1]:t.method}return t.method},handleRequest:function t(n){if(n.async){if(!this.queue){this.queue=[]}e.call(this.queue,n)}else{this.processRequest(n)}},log:function e(n,r){var o;o="Request:\n"+t.format(r)+"\n\n";o+="Response:\n"+t.format(n)+"\n\n";t.log(o)},respondWith:function t(n,o,i){if(arguments.length==1&&typeof n!="function"){this.response=r(n);return}if(!this.responses){this.responses=[]}if(arguments.length==1){i=n;o=n=null}if(arguments.length==2){i=o;o=n;n=null}e.call(this.responses,{method:n,url:o,response:typeof i=="function"?i:r(i)})},respond:function e(){if(arguments.length>0){this.respondWith.apply(this,arguments)}var t=this.queue||[];var n=t.splice(0,t.length);var r;while(r=n.shift()){this.processRequest(r)}},processRequest:function e(n){try{if(n.aborted){return}var r=this.response||[404,{},""];if(this.responses){for(var o=this.responses.length,i=o-1;i>=0;i--){if(a.call(this,this.responses[i],n)){r=this.responses[i].response;break}}}if(n.readyState!=4){this.log(r,n);n.respond(r[0],r[1],r[2])}}catch(e){t.logError("Fake server request processing",e)}},restore:function e(){return this.xhr.restore&&this.xhr.restore.apply(this.xhr,arguments)}}}var f=typeof module!=="undefined"&&module.exports&&typeof require=="function";var l=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function c(e,t,n){var r=e("./core");e("./fake_xdomain_request");e("./fake_xml_http_request");e("../format");u(r);n.exports=r}if(l){define(c)}else if(f){c(require,module.exports,module)}else{u(sinon)}})();
/**
 * Fake timer API
 * setTimeout
 * setInterval
 * clearTimeout
 * clearInterval
 * tick
 * reset
 * Date
 *
 * Inspired by jsUnitMockTimeOut from JsUnit
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */if(typeof sinon=="undefined"){var sinon={}}(function(e){function t(e,t){var n=typeof lolex!=="undefined"?lolex:t;e.useFakeTimers=function(){var e,t=Array.prototype.slice.call(arguments);if(typeof t[0]==="string"){e=0}else{e=t.shift()}var r=n.install(e||0,t);r.restore=r.uninstall;return r};e.clock={create:function(e){return n.createClock(e)}};e.timers={setTimeout:setTimeout,clearTimeout:clearTimeout,setImmediate:typeof setImmediate!=="undefined"?setImmediate:undefined,clearImmediate:typeof clearImmediate!=="undefined"?clearImmediate:undefined,setInterval:setInterval,clearInterval:clearInterval,Date:Date}}var n=typeof module!=="undefined"&&module.exports&&typeof require=="function";var r=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function o(e,n,r,o){var i=e("./core");t(i,o);r.exports=i}if(r){define(o)}else if(n){o(require,module.exports,module,require("lolex"))}else{t(sinon)}})(typeof global!="undefined"&&typeof global!=="function"?global:this);
/**
 * Add-on for sinon.fakeServer that automatically handles a fake timer along with
 * the FakeXMLHttpRequest. The direct inspiration for this add-on is jQuery
 * 1.3.x, which does not use xhr object's onreadystatehandler at all - instead,
 * it polls the object for completion with setInterval. Dispite the direct
 * motivation, there is nothing jQuery-specific in this file, so it can be used
 * in any environment where the ajax implementation depends on setInterval or
 * setTimeout.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
/**
 * Add-on for sinon.fakeServer that automatically handles a fake timer along with
 * the FakeXMLHttpRequest. The direct inspiration for this add-on is jQuery
 * 1.3.x, which does not use xhr object's onreadystatehandler at all - instead,
 * it polls the object for completion with setInterval. Dispite the direct
 * motivation, there is nothing jQuery-specific in this file, so it can be used
 * in any environment where the ajax implementation depends on setInterval or
 * setTimeout.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
(function(){function e(e){function t(){}t.prototype=e.fakeServer;e.fakeServerWithClock=new t;e.fakeServerWithClock.addRequest=function t(n){if(n.async){if(typeof setTimeout.clock=="object"){this.clock=setTimeout.clock}else{this.clock=e.useFakeTimers();this.resetClock=true}if(!this.longestTimeout){var r=this.clock.setTimeout;var o=this.clock.setInterval;var i=this;this.clock.setTimeout=function(e,t){i.longestTimeout=Math.max(t,i.longestTimeout||0);return r.apply(this,arguments)};this.clock.setInterval=function(e,t){i.longestTimeout=Math.max(t,i.longestTimeout||0);return o.apply(this,arguments)}}}return e.fakeServer.addRequest.call(this,n)};e.fakeServerWithClock.respond=function t(){var n=e.fakeServer.respond.apply(this,arguments);if(this.clock){this.clock.tick(this.longestTimeout||0);this.longestTimeout=0;if(this.resetClock){this.clock.restore();this.resetClock=false}}return n};e.fakeServerWithClock.restore=function t(){if(this.clock){this.clock.restore()}return e.fakeServer.restore.apply(this,arguments)}}var t=typeof module!=="undefined"&&module.exports&&typeof require=="function";var n=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function r(t){var n=t("./core");t("./fake_server");t("./fake_timers");e(n)}if(n){define(r)}else if(t){r(require)}else{e(sinon)}})();