/**
*	Simple jQuery Plugin to genereate Responsive Image loading based on CSS Media Queries
*	@autor Marc Mannig
*	@license This Plugin may be freely distributed under the MIT license.
*/
(function($){
	'use strict';
	var resolutions = {
		xs: 0,
		sm: 360,
		md: 756,
		lg: 1024
	};
	//transparent pngs to enshure image height scales with the correct aspect ratio
	//converted to a base64 data src with http://www.base64-image.de
	var aspectRatio = {
		/** cubiq **/
		'1x1'	: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wYTECAjyZX/KwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAADUlEQVQI12NgYGBgAAAABQABXvMqOgAAAABJRU5ErkJggg==',
		/** 35mm still camera film, iPhone (until iPhone 5) displays **/
		'2x3'	: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAYAAAC56t6BAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wYTEQgC2WMr6AAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAC0lEQVQI12NgwAkAABsAAVJE5KkAAAAASUVORK5CYII=',
		/** 35mm still camera film, iPhone (until iPhone 5) displays (Lansscape) **/
		'3x2'	: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wYTEQYaVIyeMAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAC0lEQVQI12NgwAUAABoAASRETuUAAAAASUVORK5CYII=',
		/** Some (not all) 20th century computer monitors (VGA, XGA, etc.), standard-definition television  (Lansscape) **/
		'4x3'	: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wYTECQjrfk6LwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAADElEQVQI12NgIBkAAAAzAAFWfYMKAAAAAElFTkSuQmCC',
		/** Widescreen (Lansscape) **/
		'16x9'	: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAAA7KqwyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wYTECQG5v3uaAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAD0lEQVQoz2NgGAWjgAoAAAJJAAEMrHXpAAAAAElFTkSuQmCC'
	};
	var baseCSS 	= '.responsive-image{background-size: cover; background-repeat: no-repeat; width:100%;} .responsive-image img{width:100%;}';
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
				var ratioData;
				if( ratioData = aspectRatio[$this.data('aspect')] )
					$this.attr('src', ratioData);
				else
					$this.hide();
				//wrap original and add custom style before the dom
				$this
					.before($('<style type="text/css" />').html(css))
					.wrap( $('<div/>')
								.addClass('responsive-image responsive-image-' + imageID)
								.addClass($this.attr('class')))
					.removeAttr('class'); //copy style classes to allow override width etc..

					
			});
		}
	});

	//auto init on domready
	$(document).ready(function(){
		$('img[data-toggle="responsive"]').responsiveImage();
	});
})(jQuery);