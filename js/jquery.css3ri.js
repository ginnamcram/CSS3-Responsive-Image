/**
*	Simple jQuery Plugin to genereate Responsive Image loading based on CSS Media Queries
*	@autor Marc Mannig
*	@license Underscore may be freely distributed under the MIT license.
*/
(function($){
	'use strict';
	var resolutions = {
		xs: 0,
		sm: 360,
		md: 756,
		lg: 1024
	};
	var baseCSS 	= '.responsive-image{background-size: contain; background-repeat: no-repeat; width:100%; height:100%;}';
	var styleTmpl 	= '@media(min-width: %size%px){ .responsive-image-%id%{background-image:url("%url%");} }';
	$.fn.extend({
		responsiveImage: function(){
			return this.each(function(){
				var $this 	= $(this);
				var css 	= baseCSS;
				//create a unique id
				var imageID = Math.floor(Math.random()*999999999) + '-' + Math.floor(Math.random()*999999999);
				var model;
				for (var res in resolutions) {
					//create model for tmpl
					model = {
						id 	: imageID,
						size: resolutions[res],
						url : $this.data(res)
					};
					//render tmpl
					css += styleTmpl.replace(/%[^%]+%/gi,function(needle){
						return model[ needle.substr(1,needle.length-2) ];
					});
				};
				//replace original and add custom style before the dom
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