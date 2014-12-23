'use strict';

App.service('SlidePointer', ['jQuery', function($) {

	var createSlide = function(A, B, dir) {
		var slide = angular.element('<div class="slide '+dir+'">');

		var elm = [
			angular.element('<div class="aside">'),
			angular.element('<div class="bside">')
		];
		var tmp = [A, B];

		var i = 0 , j, d, c;
		for (; i < tmp.length; ++i ) {
			c = elm[i];
			j = 0;
			for (;j < 8; ++j) {
				d = tmp[i].clone();
				d = angular.element('<div class="overflow">').append(d);
				d = angular.element('<div class="inner">').append(d);
				c.append(d);
				c = d;
			}
			slide.append(elm[i]);
		}

		return slide;
	};

	var SlidePointerNext = function() {
		this.dragStart = function(pageOpen, pageClose) {
			pageClose.addClass('next-close');
			pageOpen.addClass('next-open');

			var slide = createSlide(
				pageClose.children('div'), 
				pageOpen.children('div'),
				'next'
			);

			$('.card').append(slide);
			this.setElement(slide);
			
			slide = $(slide);
			slide.find('.inner').transform({
				'rotate': {
					y: '-0.1deg'
				}
			});
			slide.find('.aside').transform({
				'rotate': {
					y: '-0.1deg'
				}
			});
			slide.find('.bside').transform({
				'rotate': {
					y: '-0.1deg'
				},
				'translate': {
					z: '-1px'
				}
			});
		};
		this.drag = function(dx, forcePoint) {
			var slide = $(this.getElement());

			slide.find('.inner').transform({
				'rotate': {
					y: Math.map(dx, 0, forcePoint, 0, -10) + 'deg'
				}
			});
			slide.find('.aside').transform({
				'rotate': {
					y: Math.map(dx, 0, forcePoint, 0, -100) + 'deg'
				}
			});
			slide.find('.bside').transform({
				'rotate': {
					y: Math.map(dx, 0, forcePoint, 0, -100) + 'deg'
				},
				'translate': {
					z: '-1px'
				}
			});
		};
		this.dragComplete = function() {
			var slide = $(this.getElement());
			slide.find('.inner').transform({
				'rotate': {
					y: '0deg'
				}
			});
			slide.find('.aside').transform({
				'rotate': {
					y: '-180deg'
				}
			});
			slide.find('.bside').transform({
				'rotate': {
					y: '-180deg'
				},
				'translate': {
					z: '-1px'
				}
			});
		};
		this.dragCancel = function() {
			var slide = $(this.getElement());
			slide.find('.inner').transform({
				'rotate': {
					y: '0deg'
				}
			});
			slide.find('.aside').transform({
				'rotate': {
					y: '0deg'
				}
			});
			slide.find('.bside').transform({
				'rotate': {
					y: '0deg'
				},
				'translate': {
					z: '-1px'
				}
			});
		};
		this.complete = function() {
			this.getElement().remove();
		};
	};

	var SlidePointerPrev = function() {
		this.dragStart = function(pageOpen, pageClose) {
			pageClose.addClass('prev-close');
			pageOpen.addClass('prev-open');

			var slide = createSlide(
				pageOpen.children('div'),
				pageClose.children('div'),
				'prev'
			);

			$('.card').append(slide);
			this.setElement(slide);
			
			slide = $(slide);

			slide.find('.inner').transform({
				'rotate': {
					y: '0.1deg'
				}
			});
			slide.find('.aside').transform({
				'rotate': {
					y: '-180deg'
				}
			});
			slide.find('.bside').transform({
				'rotate': {
					y: '-180deg'
				},
				'translate': {
					z: '-1px'
				}
			});
		};
		this.drag = function(dx, forcePoint) {
			dx = Math.abs(dx);
			var slide = $(this.getElement());

			slide.find('.inner').transform({
				'rotate': {
					y: Math.map(dx, 0, forcePoint, 0, 10) + 'deg'
				}
			});
			slide.find('.aside').transform({
				'rotate': {
					y: Math.map(dx, 0, forcePoint, -180, -80) + 'deg'
				}
			});
			slide.find('.bside').transform({
				'rotate': {
					y: Math.map(dx, 0, forcePoint, -180, -80) + 'deg'
				},
				'translate': {
					z: '-1px'
				}
			});
		};
		this.dragComplete = function() {
			var slide = $(this.getElement());
			slide.find('.inner').transform({
				'rotate': {
					y: '0deg'
				}
			});
			slide.find('.aside').transform({
				'rotate': {
					y: '0deg'
				}
			});
			slide.find('.bside').transform({
				'rotate': {
					y: '0deg'
				},
				'translate': {
					z: '-1px'
				}
			});
		};
		this.dragCancel = function() {
			var slide = $(this.getElement());
			slide.find('.inner').transform({
				'rotate': {
					y: '0deg'
				}
			});
			slide.find('.aside').transform({
				'rotate': {
					y: '-180deg'
				}
			});
			slide.find('.bside').transform({
				'rotate': {
					y: '-180deg'
				},
				'translate': {
					z: '-1px'
				}
			});
		};
		this.complete = function() {
			this.getElement().remove();
		};
	};

	this.slide = {
		next: SlidePointerNext,
		previous: SlidePointerPrev
	};

}]);