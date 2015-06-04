(function($){
	'use strict';
	var resolutions = {
		xs: 0,
		sm: 360,
		md: 756,
		lg: 1024
	};
	var baseCSS 	= '.responsive-image{background-size: cover; width:100%; height:100%;}';
	var styleTmpl 	= '@media(min-width: %size%px){ .responsive-image-%id%{background-image:url("%url%");} }';
	$.fn.extend({
		responsiveImage: function(){
			return this.each(function(){
				var $this = $(this);
				var css = baseCSS;
				var model,imageID = Math.floor(Math.random()*999999999);
				for (var res in resolutions) {
					model = {
						id 	: imageID,
						size: resolutions[res],
						url : $this.data(res)
					};
					//render
					css += styleTmpl.replace(/%[^%]+%/gi,function(needle){
						return model[ needle.substr(1,needle.length-2) ];
					});
				};
				
				$this
					.before($('<style type="text/css" />').html(css))
					.replaceWith( $('<div/>').addClass('responsive-image responsive-image-' + imageID));
					
			});
		}
	});

	//auto init on domready
	$(document).ready(function(){
		$('img[data-toggle="responsive"]').responsiveImage();
	});
})(jQuery);