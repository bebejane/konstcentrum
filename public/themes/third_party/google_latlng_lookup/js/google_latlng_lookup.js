var google_lat_lng_lookup_map=function(){function u(t){if(typeof t=="string"){if(t===undefined){return"Address required"}}else{if($.trim(n.val())==""){n.val("Address required");r.val("");i.val("");return}}var s=t;var t=n.val();e.geocode({address:t},function(e,t){if(t==google.maps.GeocoderStatus.OK){var s=e[0].geometry.location.lat();var u=e[0].geometry.location.lng();r.val(s).css("display","none").fadeIn("slow");i.val(u).css("display","none").fadeIn("slow");if(map_preview!=false){var a="markers=color:blue%7Csize:mid%7Clabel:A%7C"+s+","+u;$(map_preview).attr("src","http://maps.googleapis.com/maps/api/staticmap?&size=170x170&zoom=13&maptype=roadmap&"+a+"&sensor=false")}if(e[0].geometry.location_type==google.maps.GeocoderLocationType.ROOFTOP){o.text("Accurate location").hide().fadeIn()}else{o.text("Approximate location").hide().fadeIn()}}else if(t==google.maps.GeocoderStatus.ZERO_RESULTS){n.val("Google found no results. Try to be more sprecific.")}else if(t==google.maps.GeocoderStatus.OVER_QUERY_LIMIT){n.val("You have made too many request on this domain. Over quota.")}else{n.val("Geocode error: "+t)}})}function a(){fs=$(this).closest("fieldset");lat=fs.find("input.geocode_lat").val();lng=fs.find("input.geocode_lng").val();src="http://maps.googleapis.com/maps/api/staticmap?sensor=false&size=170x170&zoom=13&maptype=roadmap&markers=color:blue%7Csize:mid%7Clabel:A%7C"+lat+","+lng;fs.find("img").attr("src",src)}var e,t,n,r,i,s,o;return function(f){t=f;e=new google.maps.Geocoder;n=$("input[name="+t+"address]"),r=$("input[name="+t+"latitude]"),i=$("input[name="+t+"longitude]"),s=$("button[name="+t+"lookup_button]");o=$("span."+t+"feedback");map_preview=false;if($("."+t+"preview_map").length>0)map_preview=$("."+t+"preview_map");$(s).on("click",u);$("input.geocode_latlng").on("keyup",a)}}()