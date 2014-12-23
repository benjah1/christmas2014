'use strict';

App.service('utility', ['extendDeep','jQuery', function(extendDeep, $) {

	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/\{(\d+)\}/g, function(match, number) { 
			return typeof args[number]!=='undefined'?args[number]:'';
		});
	};

	Math.map = function (x, from1, to1, from2, to2) {
		return (from2 - to2) * (x - to1) / (from1 - to1) + to2;
	};
	Math.limit = function (x, max, min) {
		if (x > max) {
			return max;
		} else if (x < min) {
			return min;
		}
		return x;
	};
	
	$.fn.transform = function(options){
		$(this).each(function(){
			var opt = extendDeep({
				'rotate': {
					'x': 0,
					'y': 0,
					'z': 0
				},
				'scale': {
					'x': 1,
					'y': 1,
					'z': 1
				},
				'translate': {
					'x': 0,
					'y': 0,
					'z': 0
				}
			}, options),
			tmp = 'rotateX({0}) rotateY({1}) rotateZ({2}) scale3d({3},{4},{5}) translate3d({6},{7},{8})',
			style = tmp.format(
				opt.rotate.x,
				opt.rotate.y,
				opt.rotate.z,
				opt.scale.x,
				opt.scale.y,
				opt.scale.z,
				opt.translate.x,
				opt.translate.y,
				opt.translate.z
			);
			$(this).css(Modernizr.prefixed('transform'), style);
		});

		return this;
	};
	
}]);
