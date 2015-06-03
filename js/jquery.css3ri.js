(function($){
	'use strict';

	$.fn.extend({
		responsiveImage: function(){
			return this.each(function(){
				
			});
		}
	});

	//auto init on domready
	$(document).ready(function(){
		$('img[data-toggle="responisve"]').responsiveImage();
	});
})(jQuery);