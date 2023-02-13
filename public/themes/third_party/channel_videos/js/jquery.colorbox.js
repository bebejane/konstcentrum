// ColorBox v1.3.17.2 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2011 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(b,E,ea){function c(a,g,c){a=E.createElement(a);g&&(a.id=q+g);c&&(a.style.cssText=c);return b(a)}function N(a){var b=l.length;a=(p+a)%b;return 0>a?b+a:a}function m(a,b){return Math.round((/%/.test(a)?("x"===b?h.width():h.height())/100:1)*parseInt(a,10))}function fa(b){return a.photo||/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(b)}function ga(){var y,g=b.data(k,u);null==g?(a=b.extend({},S),console&&console.log&&console.log("Error: cboxElement missing settings object")):a=b.extend({}, g);for(y in a)b.isFunction(a[y])&&"on"!==y.slice(0,2)&&(a[y]=a[y].call(k));a.rel=a.rel||k.rel||b(k).data("rel")||"nofollow";a.href=a.href||b(k).attr("href");a.title=a.title||k.title;"string"===typeof a.href&&(a.href=b.trim(a.href))}function C(a,g){b.event.trigger(a);g&&g.call(k)}function ma(){var b,g=q+"Slideshow_",c="click."+q,e,r;a.slideshow&&l[1]?(e=function(){G.html(a.slideshowStop).unbind(c).bind(T,function(){if(a.loop||l[p+1])b=setTimeout(f.next,a.slideshowSpeed)}).bind(U,function(){clearTimeout(b)}).one(c+ " "+O,r);j.removeClass(g+"off").addClass(g+"on");b=setTimeout(f.next,a.slideshowSpeed)},r=function(){clearTimeout(b);G.html(a.slideshowStart).unbind([T,U,O,c].join(" ")).one(c,function(){f.next();e()});j.removeClass(g+"on").addClass(g+"off")},a.slideshowAuto?e():r()):j.removeClass(g+"off "+g+"on")}function ha(c){if(!P){k=c;ga();l=b(k);p=0;"nofollow"!==a.rel&&(l=b("."+F).filter(function(){var c=b.data(this,u),y;c&&(y=b(this).data("rel")||c.rel||this.rel);return y===a.rel}),p=l.index(k),-1===p&&(l= l.add(k),p=l.length-1));if(!v){v=H=!0;j.show();if(a.returnFocus)b(k).blur().one(ia,function(){b(this).focus()});z.css({opacity:+a.opacity,cursor:a.overlayClose?"pointer":"auto"}).show();a.w=m(a.initialWidth,"x");a.h=m(a.initialHeight,"y");f.position();I&&h.bind("resize."+Q+" scroll."+Q,function(){z.css({width:h.width(),height:h.height(),top:h.scrollTop(),left:h.scrollLeft()})}).trigger("resize."+Q);C(ja,a.onOpen);V.add(W).hide();X.html(a.close).show()}f.load(!0)}}function ka(){!j&&E.body&&(Y=!1,h= b(ea),j=c(e).attr({id:u,"class":J?q+(I?"IE6":"IE"):""}).hide(),z=c(e,"Overlay",I?"position:absolute":"").hide(),Z=c(e,"LoadingOverlay").add(c(e,"LoadingGraphic")),D=c(e,"Wrapper"),t=c(e,"Content").append(n=c(e,"LoadedContent","width:0; height:0; overflow:hidden"),W=c(e,"Title"),$=c(e,"Current"),K=c(e,"Next"),L=c(e,"Previous"),G=c(e,"Slideshow").bind(ja,ma),X=c(e,"Close")),D.append(c(e).append(c(e,"TopLeft"),aa=c(e,"TopCenter"),c(e,"TopRight")),c(e,!1,"clear:left").append(ba=c(e,"MiddleLeft"),t,ca= c(e,"MiddleRight")),c(e,!1,"clear:left").append(c(e,"BottomLeft"),da=c(e,"BottomCenter"),c(e,"BottomRight"))).find("div div").css({"float":"left"}),M=c(e,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),V=K.add(L).add($).add(G),b(E.body).append(z,j.append(D,M)))}var S={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0, photo:!1,href:!1,title:!1,rel:!1,opacity:0.9,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1, right:!1,fixed:!1,data:void 0},u="colorbox",q="cbox",F=q+"Element",ja=q+"_open",U=q+"_load",T=q+"_complete",O=q+"_cleanup",ia=q+"_closed",R=q+"_purge",J=!b.support.leadingWhitespace,I=J&&!ea.XMLHttpRequest,Q=q+"_IE6",z,j,D,t,aa,ba,ca,da,l,h,n,M,Z,W,$,G,K,L,X,V,a,A,B,w,x,k,p,d,v,H,P,la,f,e="div",Y;b.colorbox||(b(ka),f=b.fn[u]=b[u]=function(c,e){var d=this;c=c||{};ka();var s;j?(Y||(Y=!0,A=aa.height()+da.height()+t.outerHeight(!0)-t.height(),B=ba.width()+ca.width()+t.outerWidth(!0)-t.width(),w=n.outerHeight(!0), x=n.outerWidth(!0),j.css({"padding-bottom":A,"padding-right":B}),K.click(function(){f.next()}),L.click(function(){f.prev()}),X.click(function(){f.close()}),z.click(function(){a.overlayClose&&f.close()}),b(E).bind("keydown."+q,function(b){var c=b.keyCode;v&&(a.escKey&&27===c)&&(b.preventDefault(),f.close());v&&(a.arrowKey&&l[1])&&(37===c?(b.preventDefault(),L.click()):39===c&&(b.preventDefault(),K.click()))}),b(E).delegate("."+F,"click",function(a){1<a.which||(a.shiftKey||a.altKey||a.metaKey)||(a.preventDefault(), ha(this))})),s=!0):s=!1;if(s){if(!d[0]){if(d.selector)return d;d=b("<a/>");c.open=!0}e&&(c.onComplete=e);d.each(function(){b.data(this,u,b.extend({},b.data(this,u)||S,c))}).addClass(F);(b.isFunction(c.open)&&c.open.call(d)||c.open)&&ha(d[0])}return d},f.position=function(b,c){function e(a){aa[0].style.width=da[0].style.width=t[0].style.width=a.style.width;t[0].style.height=ba[0].style.height=ca[0].style.height=a.style.height}var d,r=d=0,l=j.offset(),n,p;h.unbind("resize."+q);j.css({top:-9E4,left:-9E4}); n=h.scrollTop();p=h.scrollLeft();a.fixed&&!I?(l.top-=n,l.left-=p,j.css({position:"fixed"})):(d=n,r=p,j.css({position:"absolute"}));r=!1!==a.right?r+Math.max(h.width()-a.w-x-B-m(a.right,"x"),0):!1!==a.left?r+m(a.left,"x"):r+Math.round(Math.max(h.width()-a.w-x-B,0)/2);d=!1!==a.bottom?d+Math.max(h.height()-a.h-w-A-m(a.bottom,"y"),0):!1!==a.top?d+m(a.top,"y"):d+Math.round(Math.max(h.height()-a.h-w-A,0)/2);j.css({top:l.top,left:l.left});b=j.width()===a.w+x&&j.height()===a.h+w?0:b||0;D[0].style.width=D[0].style.height= "9999px";d={width:a.w+x,height:a.h+w,top:d,left:r};0===b&&j.css(d);j.dequeue().animate(d,{duration:b,complete:function(){e(this);H=!1;D[0].style.width=a.w+x+B+"px";D[0].style.height=a.h+w+A+"px";a.reposition&&setTimeout(function(){h.bind("resize."+q,f.position)},1);c&&c()},step:function(){e(this)}})},f.resize=function(b){v&&(b=b||{},b.width&&(a.w=m(b.width,"x")-x-B),b.innerWidth&&(a.w=m(b.innerWidth,"x")),n.css({width:a.w}),b.height&&(a.h=m(b.height,"y")-w-A),b.innerHeight&&(a.h=m(b.innerHeight,"y")), !b.innerHeight&&!b.height&&(n.css({height:"auto"}),a.h=n.height()),n.css({height:a.h}),f.position("none"===a.transition?0:a.speed))},f.prep=function(h){function g(){a.w=a.w||n.width();a.w=a.mw&&a.mw<a.w?a.mw:a.w;return a.w}function m(){a.h=a.h||n.height();a.h=a.mh&&a.mh<a.h?a.mh:a.h;return a.h}if(v){var k,r="none"===a.transition?0:a.speed;n.remove();n=c(e,"LoadedContent").append(h);n.hide().appendTo(M.show()).css({width:g(),overflow:a.scrolling?"auto":"hidden"}).css({height:m()}).prependTo(t);M.hide(); b(d).css({"float":"none"});if(I)b("select").not(j.find("select")).filter(function(){return"hidden"!==this.style.visibility}).css({visibility:"hidden"}).one(O,function(){this.style.visibility="inherit"});k=function(){function e(){J&&j[0].style.removeAttribute("filter")}var f,g;f=l.length;var h,m,k;if(v){m=function(){clearTimeout(la);Z.detach().hide();C(T,a.onComplete)};J&&d&&n.fadeIn(100);W.html(a.title).add(n).show();if(1<f){if("string"===typeof a.current&&$.html(a.current.replace("{current}",p+1).replace("{total}", f)).show(),K[a.loop||p<f-1?"show":"hide"]().html(a.next),L[a.loop||p?"show":"hide"]().html(a.previous),a.slideshow&&G.show(),a.preloading)for(f=[N(-1),N(1)];g=l[f.pop()];)(k=b.data(g,u))&&k.href?(k=k.href,b.isFunction(k)&&(k=k.call(g))):k=g.href,fa(k)&&(g=new Image,g.src=k)}else V.hide();a.iframe?(h=c("iframe")[0],"frameBorder"in h&&(h.frameBorder=0),"allowTransparency"in h&&(h.allowTransparency="true"),a.scrolling||(h.scrolling="no"),b(h).attr({src:a.href,name:(new Date).getTime(),"class":q+"Iframe", allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",m).one(R,function(){h.src="//about:blank"}).appendTo(n),a.fastIframe&&b(h).trigger("load")):m();"fade"===a.transition?j.fadeTo(r,1,e):e()}};"fade"===a.transition?j.fadeTo(r,0,function(){f.position(0,k)}):f.position(r,k)}},f.load=function(h){var g,j,s=f.prep;H=!0;d=!1;k=l[p];h||ga();C(R);C(U,a.onLoad);a.h=a.height?m(a.height,"y")-w-A:a.innerHeight&&m(a.innerHeight,"y");a.w=a.width?m(a.width,"x")-x-B:a.innerWidth&&m(a.innerWidth, "x");a.mw=a.w;a.mh=a.h;a.maxWidth&&(a.mw=m(a.maxWidth,"x")-x-B,a.mw=a.w&&a.w<a.mw?a.w:a.mw);a.maxHeight&&(a.mh=m(a.maxHeight,"y")-w-A,a.mh=a.h&&a.h<a.mh?a.h:a.mh);g=a.href;la=setTimeout(function(){Z.show().appendTo(t)},100);a.inline?(c(e).hide().insertBefore(b(g)[0]).one(R,function(){b(this).replaceWith(n.children())}),s(b(g))):a.iframe?s(" "):a.html?s(a.html):fa(g)?(b(d=new Image).addClass(q+"Photo").error(function(){a.title=!1;s(c(e,"Error").html(a.imgError))}).load(function(){var b;d.onload=null; a.scalePhotos&&(j=function(){d.height-=d.height*b;d.width-=d.width*b},a.mw&&d.width>a.mw&&(b=(d.width-a.mw)/d.width,j()),a.mh&&d.height>a.mh&&(b=(d.height-a.mh)/d.height,j()));a.h&&(d.style.marginTop=Math.max(a.h-d.height,0)/2+"px");if(l[1]&&(a.loop||l[p+1]))d.style.cursor="pointer",d.onclick=function(){f.next()};J&&(d.style.msInterpolationMode="bicubic");setTimeout(function(){s(d)},1)}),setTimeout(function(){d.src=g},1)):g&&M.load(g,a.data,function(d,f){s("error"===f?c(e,"Error").html(a.xhrError): b(this).contents())})},f.next=function(){if(!H&&l[1]&&(a.loop||l[p+1]))p=N(1),f.load()},f.prev=function(){if(!H&&l[1]&&(a.loop||p))p=N(-1),f.load()},f.close=function(){v&&!P&&(P=!0,v=!1,C(O,a.onCleanup),h.unbind("."+q+" ."+Q),z.fadeTo(200,0),j.stop().fadeTo(300,0,function(){j.add(z).css({opacity:1,cursor:"auto"}).hide();C(R);n.remove();setTimeout(function(){P=!1;C(ia,a.onClosed)},1)}))},f.remove=function(){b([]).add(j).add(z).remove();j=null;b("."+F).removeData(u).removeClass(F);b(E).undelegate("."+ F)},f.element=function(){return b(k)},f.settings=S)})(jQuery,document,window);