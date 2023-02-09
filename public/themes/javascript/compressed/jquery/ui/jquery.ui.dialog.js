/*!
 * jQuery UI Dialog @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
!function(i,e){var t="ui-dialog ui-widget ui-widget-content ui-corner-all ",o={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},a={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},
// support for jQuery 1.3.2 - handle common attrFn methods for dialog
n=i.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};i.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",
// ensure that the titlebar is never outside the document
using:function(e){var t=i(this).css(e).offset().top;t<0&&i(this).css("top",e.top-t)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),
// #5742 - .attr() might return a DOMElement
"string"!=typeof this.originalTitle&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var e=this,o=e.options,a=o.title||"&#160;",n=i.ui.dialog.getTitleId(e.element),s=(e.uiDialog=i("<div></div>")).appendTo(document.body).hide().addClass(t+o.dialogClass).css({zIndex:o.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(t){o.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===i.ui.keyCode.ESCAPE&&(e.close(t),t.preventDefault())}).attr({role:"dialog","aria-labelledby":n}).mousedown(function(i){e.moveToTop(!1,i)}),l=(e.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(s),(e.uiDialogTitlebar=i("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(s)),d=i('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){d.addClass("ui-state-hover")},function(){d.removeClass("ui-state-hover")}).focus(function(){d.addClass("ui-state-focus")}).blur(function(){d.removeClass("ui-state-focus")}).click(function(i){return e.close(i),!1}).appendTo(l);(e.uiDialogTitlebarCloseText=i("<span></span>")).addClass("ui-icon ui-icon-closethick").text(o.closeText).appendTo(d),i("<span></span>").addClass("ui-dialog-title").attr("id",n).html(a).prependTo(l);
//handling of deprecated beforeclose (vs beforeClose) option
//Ticket #4669 http://dev.jqueryui.com/ticket/4669
//TODO: remove in 1.9pre
i.isFunction(o.beforeclose)&&!i.isFunction(o.beforeClose)&&(o.beforeClose=o.beforeclose),l.find("*").add(l).disableSelection(),o.draggable&&i.fn.draggable&&e._makeDraggable(),o.resizable&&i.fn.resizable&&e._makeResizable(),e._createButtons(o.buttons),e._isOpen=!1,i.fn.bgiframe&&s.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var i=this;return i.overlay&&i.overlay.destroy(),i.uiDialog.hide(),i.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),i.uiDialog.remove(),i.originalTitle&&i.element.attr("title",i.originalTitle),i},widget:function(){return this.uiDialog},close:function(e){var t,o,a=this;if(!1!==a._trigger("beforeClose",e))
// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
return a.overlay&&a.overlay.destroy(),a.uiDialog.unbind("keypress.ui-dialog"),a._isOpen=!1,a.options.hide?a.uiDialog.hide(a.options.hide,function(){a._trigger("close",e)}):(a.uiDialog.hide(),a._trigger("close",e)),i.ui.dialog.overlay.resize(),a.options.modal&&(t=0,i(".ui-dialog").each(function(){this!==a.uiDialog[0]&&(o=i(this).css("z-index"),isNaN(o)||(t=Math.max(t,o)))}),i.ui.dialog.maxZ=t),a},isOpen:function(){return this._isOpen},
// the force parameter allows us to move modal dialogs to their correct
// position on open
moveToTop:function(e,t){var o,a=this,n=a.options;
//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
//  http://ui.jquery.com/bugs/ticket/3193
return n.modal&&!e||!n.stack&&!n.modal?a._trigger("focus",t):(n.zIndex>i.ui.dialog.maxZ&&(i.ui.dialog.maxZ=n.zIndex),a.overlay&&(i.ui.dialog.maxZ+=1,a.overlay.$el.css("z-index",i.ui.dialog.overlay.maxZ=i.ui.dialog.maxZ)),o={scrollTop:a.element.scrollTop(),scrollLeft:a.element.scrollLeft()},i.ui.dialog.maxZ+=1,a.uiDialog.css("z-index",i.ui.dialog.maxZ),a.element.attr(o),a._trigger("focus",t),a)},open:function(){if(!this._isOpen){var e=this,t=e.options,o=e.uiDialog;
// prevent tabbing out of modal dialogs
// set focus to the first tabbable element in the content area or the first button
// if there are no tabbable elements, set focus on the dialog itself
return e.overlay=t.modal?new i.ui.dialog.overlay(e):null,e._size(),e._position(t.position),o.show(t.show),e.moveToTop(!0),t.modal&&o.bind("keydown.ui-dialog",function(e){if(e.keyCode===i.ui.keyCode.TAB){var t=i(":tabbable",this),o=t.filter(":first"),a=t.filter(":last");return e.target!==a[0]||e.shiftKey?e.target===o[0]&&e.shiftKey?(a.focus(1),!1):void 0:(o.focus(1),!1)}}),i(e.element.find(":tabbable").get().concat(o.find(".ui-dialog-buttonpane :tabbable").get().concat(o.get()))).eq(0).focus(),e._isOpen=!0,e._trigger("open"),e}},_createButtons:function(e){var t=this,o=!1,a=i("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),s=i("<div></div>").addClass("ui-dialog-buttonset").appendTo(a);
// if we already have a button pane, remove it
t.uiDialog.find(".ui-dialog-buttonpane").remove(),"object"==typeof e&&null!==e&&i.each(e,function(){return!(o=!0)}),o&&(i.each(e,function(e,o){o=i.isFunction(o)?{click:o,text:e}:o;var a=i('<button type="button"></button>').click(function(){o.click.apply(t.element[0],arguments)}).appendTo(s);
// can't use .attr( props, true ) with jQuery 1.3.2.
i.each(o,function(i,e){"click"!==i&&(i in n?a[i](e):a.attr(i,e))}),i.fn.button&&a.button()}),a.appendTo(t.uiDialog))},_makeDraggable:function(){function e(i){return{position:i.position,offset:i.offset}}var t,o=this,a=o.options,n=i(document);o.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(n,s){t="auto"===a.height?"auto":i(this).height(),i(this).height(i(this).height()).addClass("ui-dialog-dragging"),o._trigger("dragStart",n,e(s))},drag:function(i,t){o._trigger("drag",i,e(t))},stop:function(s,l){a.position=[l.position.left-n.scrollLeft(),l.position.top-n.scrollTop()],i(this).removeClass("ui-dialog-dragging").height(t),o._trigger("dragStop",s,e(l)),i.ui.dialog.overlay.resize()}})},_makeResizable:function(t){function o(i){return{originalPosition:i.originalPosition,originalSize:i.originalSize,position:i.position,size:i.size}}t=t===e?this.options.resizable:t;var a=this,n=a.options,
// .ui-resizable has position: relative defined in the stylesheet
// but dialogs have to use absolute or fixed positioning
s=a.uiDialog.css("position"),l="string"==typeof t?t:"n,e,s,w,se,sw,ne,nw";a.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:a.element,maxWidth:n.maxWidth,maxHeight:n.maxHeight,minWidth:n.minWidth,minHeight:a._minHeight(),handles:l,start:function(e,t){i(this).addClass("ui-dialog-resizing"),a._trigger("resizeStart",e,o(t))},resize:function(i,e){a._trigger("resize",i,o(e))},stop:function(e,t){i(this).removeClass("ui-dialog-resizing"),n.height=i(this).height(),n.width=i(this).width(),a._trigger("resizeStop",e,o(t)),i.ui.dialog.overlay.resize()}}).css("position",s).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var i=this.options;return"auto"===i.height?i.minHeight:Math.min(i.minHeight,i.height)},_position:function(e){var t,o=[],a=[0,0];e?(
// deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
//		if (typeof position == 'string' || $.isArray(position)) {
//			myAt = $.isArray(position) ? position : position.split(' ');
("string"==typeof e||"object"==typeof e&&"0"in e)&&(o=e.split?e.split(" "):[e[0],e[1]],1===o.length&&(o[1]=o[0]),i.each(["left","top"],function(i,e){+o[i]===o[i]&&(a[i]=o[i],o[i]=e)}),e={my:o.join(" "),at:o.join(" "),offset:a.join(" ")}),e=i.extend({},i.ui.dialog.prototype.options.position,e)):e=i.ui.dialog.prototype.options.position,
// need to show the dialog to get the actual offset in the position plugin
t=this.uiDialog.is(":visible"),t||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(i.extend({of:window},e)),t||this.uiDialog.hide()},_setOptions:function(e){var t=this,n={},s=!1;i.each(e,function(i,e){t._setOption(i,e),i in o&&(s=!0),i in a&&(n[i]=e)}),s&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,o){var a=this,n=a.uiDialog;switch(e){
//handling of deprecated beforeclose (vs beforeClose) option
//Ticket #4669 http://dev.jqueryui.com/ticket/4669
//TODO: remove in 1.9pre
case"beforeclose":e="beforeClose";break;case"buttons":a._createButtons(o);break;case"closeText":
// ensure that we always pass a string
a.uiDialogTitlebarCloseText.text(""+o);break;case"dialogClass":n.removeClass(a.options.dialogClass).addClass(t+o);break;case"disabled":o?n.addClass("ui-dialog-disabled"):n.removeClass("ui-dialog-disabled");break;case"draggable":var s=n.is(":data(draggable)");s&&!o&&n.draggable("destroy"),!s&&o&&a._makeDraggable();break;case"position":a._position(o);break;case"resizable":
// currently resizable, becoming non-resizable
var l=n.is(":data(resizable)");l&&!o&&n.resizable("destroy"),
// currently resizable, changing handles
l&&"string"==typeof o&&n.resizable("option","handles",o),
// currently non-resizable, becoming resizable
l||o===!1||a._makeResizable(o);break;case"title":
// convert whatever was passed in o a string, for html() to not throw up
i(".ui-dialog-title",a.uiDialogTitlebar).html(""+(o||"&#160;"))}i.Widget.prototype._setOption.apply(a,arguments)},_size:function(){/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
var e,t,o=this.options,a=this.uiDialog.is(":visible");if(
// reset content sizing
this.element.show().css({width:"auto",minHeight:0,height:0}),o.minWidth>o.width&&(o.width=o.minWidth),
// reset wrapper sizing
// determine the height of all the non-content elements
e=this.uiDialog.css({height:"auto",width:o.width}).height(),t=Math.max(0,o.minHeight-e),"auto"===o.height)
// only needed for IE6 support
if(i.support.minHeight)this.element.css({minHeight:t,height:"auto"});else{this.uiDialog.show();var n=this.element.css("height","auto").height();a||this.uiDialog.hide(),this.element.height(Math.max(n,t))}else this.element.height(Math.max(o.height-e,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),i.extend(i.ui.dialog,{version:"@VERSION",uuid:0,maxZ:0,getTitleId:function(i){var e=i.attr("id");return e||(this.uuid+=1,e=this.uuid),"ui-dialog-title-"+e},overlay:function(e){this.$el=i.ui.dialog.overlay.create(e)}}),i.extend(i.ui.dialog.overlay,{instances:[],
// reuse old instances due to IE memory leak with alpha transparency (see #5185)
oldInstances:[],maxZ:0,events:i.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(i){return i+".dialog-overlay"}).join(" "),create:function(e){0===this.instances.length&&(
// prevent use of anchors and inputs
// we use a setTimeout in case the overlay is created from an
// event that we're going to be cancelling (see #2804)
setTimeout(function(){
// handle $(el).dialog().dialog('close') (see #4065)
i.ui.dialog.overlay.instances.length&&i(document).bind(i.ui.dialog.overlay.events,function(e){
// stop events if the z-index of the target is < the z-index of the overlay
// we cannot return true when we don't want to cancel the event (#3523)
if(i(e.target).zIndex()<i.ui.dialog.overlay.maxZ)return!1})},1),
// allow closing by pressing the escape key
i(document).bind("keydown.dialog-overlay",function(t){e.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===i.ui.keyCode.ESCAPE&&(e.close(t),t.preventDefault())}),
// handle window resize
i(window).bind("resize.dialog-overlay",i.ui.dialog.overlay.resize));var t=(this.oldInstances.pop()||i("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});return i.fn.bgiframe&&t.bgiframe(),this.instances.push(t),t},destroy:function(e){var t=i.inArray(e,this.instances);t!=-1&&this.oldInstances.push(this.instances.splice(t,1)[0]),0===this.instances.length&&i([document,window]).unbind(".dialog-overlay"),e.remove();
// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
var o=0;i.each(this.instances,function(){o=Math.max(o,this.css("z-index"))}),this.maxZ=o},height:function(){var e,t;
// handle IE 6
// handle IE 6
return i.browser.msie&&i.browser.version<7?(e=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),t=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),e<t?i(window).height()+"px":e+"px"):i(document).height()+"px"},width:function(){var e,t;
// handle IE
// handle IE
return i.browser.msie?(e=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),t=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),e<t?i(window).width()+"px":e+"px"):i(document).width()+"px"},resize:function(){/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
var e=i([]);i.each(i.ui.dialog.overlay.instances,function(){e=e.add(this)}),e.css({width:0,height:0}).css({width:i.ui.dialog.overlay.width(),height:i.ui.dialog.overlay.height()})}}),i.extend(i.ui.dialog.overlay.prototype,{destroy:function(){i.ui.dialog.overlay.destroy(this.$el)}})}(jQuery);