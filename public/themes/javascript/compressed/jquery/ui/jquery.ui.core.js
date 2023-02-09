/*!
 * jQuery UI @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
!function(t,e){
// selectors
function n(e,n){var r=e.nodeName.toLowerCase();if("area"===r){var o,s=e.parentNode,u=s.name;return!(!e.href||!u||"map"!==s.nodeName.toLowerCase())&&(o=t("img[usemap=#"+u+"]")[0],!!o&&i(o))}return(/input|select|textarea|button|object/.test(r)?!e.disabled:"a"==r?e.href||n:n)&&i(e)}function i(e){return!t(e).parents().andSelf().filter(function(){return"hidden"===t.curCSS(this,"visibility")||t.expr.filters.hidden(this)}).length}
// prevent duplicate loading
// this is only a problem because we proxy existing functions
// and we don't want to double proxy them
t.ui=t.ui||{},t.ui.version||(t.extend(t.ui,{version:"@VERSION",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,// COMMAND
COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,// COMMAND_RIGHT
NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),
// plugins
t.fn.extend({propAttr:t.fn.prop||t.fn.attr,_focus:t.fn.focus,focus:function(e,n){return"number"==typeof e?this.each(function(){var i=this;setTimeout(function(){t(i).focus(),n&&n.call(i)},e)}):this._focus.apply(this,arguments)},scrollParent:function(){var e;return e=t.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(t.curCSS(this,"position",1))&&/(auto|scroll)/.test(t.curCSS(this,"overflow",1)+t.curCSS(this,"overflow-y",1)+t.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(t.curCSS(this,"overflow",1)+t.curCSS(this,"overflow-y",1)+t.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e},zIndex:function(n){if(n!==e)return this.css("zIndex",n);if(this.length)for(var i,r,o=t(this[0]);o.length&&o[0]!==document;){if(
// Ignore z-index if position is set to a value where z-index is ignored by the browser
// This makes behavior of this function consistent across browsers
// WebKit always returns auto if the element is positioned
i=o.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(
// IE returns 0 when zIndex is not specified
// other browsers return a string
// we ignore the case of nested elements with an explicit value of 0
// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
r=parseInt(o.css("zIndex"),10),!isNaN(r)&&0!==r))return r;o=o.parent()}return 0},disableSelection:function(){return this.bind((t.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),t.each(["Width","Height"],function(n,i){function r(e,n,i,r){return t.each(o,function(){n-=parseFloat(t.curCSS(e,"padding"+this,!0))||0,i&&(n-=parseFloat(t.curCSS(e,"border"+this+"Width",!0))||0),r&&(n-=parseFloat(t.curCSS(e,"margin"+this,!0))||0)}),n}var o="Width"===i?["Left","Right"]:["Top","Bottom"],s=i.toLowerCase(),u={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(n){return n===e?u["inner"+i].call(this):this.each(function(){t(this).css(s,r(this,n)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?u["outer"+i].call(this,e):this.each(function(){t(this).css(s,r(this,e,!0,n)+"px")})}}),t.extend(t.expr[":"],{data:function(e,n,i){return!!t.data(e,i[3])},focusable:function(e){return n(e,!isNaN(t.attr(e,"tabindex")))},tabbable:function(e){var i=t.attr(e,"tabindex"),r=isNaN(i);return(r||i>=0)&&n(e,!r)}}),
// support
t(function(){var e=document.body,n=e.appendChild(n=document.createElement("div"));
// access offsetHeight before setting the style to prevent a layout bug
// in IE 9 which causes the elemnt to continue to take up space even
// after it is removed from the DOM (#8026)
n.offsetHeight,t.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),t.support.minHeight=100===n.offsetHeight,t.support.selectstart="onselectstart"in n,
// set display to none to avoid a layout bug in IE
// http://dev.jquery.com/ticket/4014
e.removeChild(n).style.display="none"}),
// deprecated
t.extend(t.ui,{
// $.ui.plugin is deprecated.  Use the proxy pattern instead.
plugin:{add:function(e,n,i){var r=t.ui[e].prototype;for(var o in i)r.plugins[o]=r.plugins[o]||[],r.plugins[o].push([n,i[o]])},call:function(t,e,n){var i=t.plugins[e];if(i&&t.element[0].parentNode)for(var r=0;r<i.length;r++)t.options[i[r][0]]&&i[r][1].apply(t.element,n)}},
// will be deprecated when we switch to jQuery 1.4 - use jQuery.contains()
contains:function(t,e){return document.compareDocumentPosition?16&t.compareDocumentPosition(e):t!==e&&t.contains(e)},
// only used by resizable
hasScroll:function(e,n){
//If overflow is hidden, the element might have extra content, but the user wants to hide it
if("hidden"===t(e).css("overflow"))return!1;var i=n&&"left"===n?"scrollLeft":"scrollTop",r=!1;
// TODO: determine which cases actually cause this to happen
// if the element doesn't have the scroll set, see if it's possible to
// set the scroll
return e[i]>0||(e[i]=1,r=e[i]>0,e[i]=0,r)},
// these are odd functions, fix the API or move into individual plugins
isOverAxis:function(t,e,n){
//Determines when x coordinate is over "b" element axis
return t>e&&t<e+n},isOver:function(e,n,i,r,o,s){
//Determines when x, y coordinates is over "b" element
return t.ui.isOverAxis(e,i,o)&&t.ui.isOverAxis(n,r,s)}}))}(jQuery);