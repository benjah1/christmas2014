'use strict';

var App = angular.module('xmas', []);

App.controller('mainCtrl', [
	'$scope', '$window', 'extend','jQuery',
	'PagePointer', 'SlidePointer', 'utility', 
	function($scope, $window, extend, $, PagePointer, SlidePointer) {

	// Book pages event
	$scope.book = null;
	$scope.pages = PagePointer.pages;
	$scope.slide = SlidePointer.slide;
	$scope.curr = 'page0';
	$scope.$on('getBook',function (e, book){
		$scope.book = book;
	});
	var opened = false;
	var open = function() {
		opened = true;
		$('.notify.show').removeClass('show');
	};

	var control = (function() {
		var width = 0, height = 0;
		var pageWidth = 800, pageHeight = 600;
		var isDrag = false, origPos = {}, lastPos = {}, currPos = {}, dx, dy;
		var cancelPoint = width/8, releasePoint = width/4, forcePoint = width/2;

		var cx = 0, cy = 0;
		var page1Timer = 0;


		var followCursor = function() {
			if ($('.card').hasClass('page1')) {
				cx = Math.map(width/2 - currPos.x, width/2, -width/2, -25, 25);
				cy = Math.map(2*height/3 - currPos.y, 2*height/3, -height/3, 2, -15);
				$('.scene').transform({
					'rotate': {
						x: Math.floor(cy) +'deg',
						y: Math.floor(cx) + 'deg'
					}
				});
			} else {
				$('.scene').css('transform', 'none');
			}
		};

		return {
			mousedown: function(event) {
				var touches = event.touches;
        if (touches && touches.length) {
					origPos.x = touches[0].pageX;
					origPos.y = touches[0].pageY;
					lastPos.x = touches[0].pageX;
					lastPos.y = touches[0].pageY;
					currPos.x = touches[0].pageX;
					currPos.y = touches[0].pageY;
					$('.scene').css('transition', 'transform 0.4s');
					followCursor();
				} else {
					origPos.x = event.pageX;
					origPos.y = event.pageY;
					lastPos.x = event.pageX;
					lastPos.y = event.pageY;
				}
				dx = 0;
				dy = 0;
				isDrag = true;
			},
			mousemove: function (event) {
				var touches = event.touches;
		    if (touches && touches.length) {
					currPos.x = touches[0].pageX;
					currPos.y = touches[0].pageY;
				} else {
					currPos.x = event.pageX;
					currPos.y = event.pageY;
				}

				if (Math.abs(lastPos.x - currPos.x) > 10 || Math.abs(lastPos.y - currPos.y) > 10) {
					followCursor();
				}

				if (true === isDrag) {
					if (Math.abs(lastPos.x - currPos.x) > 20) {
						dx = origPos.x - currPos.x;

						var adx = Math.abs(dx);
						if (!$scope.book.isControl()) {
							if (!$('.card').hasClass('page1')) {
								if (dx > cancelPoint && $scope.book.hasNext()) {
									$scope.book.next();
								} else if (dx < -1*cancelPoint && $scope.book.hasPrevious()) {
									$scope.book.previous();
								}
							} else {
								if (0 === page1Timer) {
									$('.scene').addClass('down');
									setTimeout(function() {
										$('.scene').removeClass('up');
									}, 10);
									page1Timer = setTimeout(function() {
										if (dx > cancelPoint && $scope.book.hasNext()) {
											$scope.book.next();
											dx = (forcePoint)/3;
										} else if (dx < -1*cancelPoint && $scope.book.hasPrevious()) {
											$scope.book.previous();
											dx = (forcePoint/3)*-1;
										}
										origPos.x = lastPos.x + dx;
										lastPos.x = origPos.x;
										page1Timer = 0;
										isDrag = true;
										$scope.book.drag(cancelPoint, forcePoint);
										setTimeout(function() {
											$scope.book.drag(dx, forcePoint);
										}, 100);
									}, 1000);
								}
							}
						} else if ($scope.book.isControl()) {
							$scope.book.drag(dx, forcePoint);

							if (adx < cancelPoint) {
								$scope.book.cancel();
								isDrag = false;

							} else if (adx > forcePoint) {
								$scope.book.release();
								isDrag = false;
								open();
							}
						}

						lastPos.x = currPos.x;
						lastPos.y = currPos.y;
					}

				}
				
			},
			mouseup: function() {
				if (isDrag) {
					isDrag = false;
					if ($scope.book.isControl()) {
						if (Math.abs(dx) < releasePoint) {
							$scope.book.cancel();
						} else if (Math.abs(dx) >= releasePoint) {
							$scope.book.release();
							open();
						}
					}
				}
			},
			resize: function() {
				width = $($window).width();
		 		height = $($window).height();
				releasePoint = width/4;
				forcePoint = width/2;

		 		if (width > pageWidth && height > pageHeight) {
		 			$('.stage').css('margin', (height - pageHeight)/2 + 'px '+ (width-pageWidth)/2 + 'px');
	 				$('.stage').transform({
						'scale': {
							x: 1,
							y: 1,
							z: 1
						}
					});
		 		} else {

		 			var r = pageWidth/pageHeight;
		 			if (r > width/height) {
		 				$('.stage').css('margin', (height - width/r)/2 +'px 0px').css('transform-origin','top left 0');
		 				$('.stage').transform({
							'scale': {
								x: width/pageWidth,
								y: width/pageWidth,
								z: width/pageWidth
							}
						});
		 			} else {
		 				$('.stage').css('margin', '0px '+ (width-height*r)/2 + 'px').css('transform-origin','top left 0');
		 				$('.stage').transform({
							'scale': {
								x: height/pageHeight,
								y: height/pageHeight,
								z: height/pageHeight
							}
						});
		 			}
		 		}
			}
		};
	})();

	angular.element($window)
		.bind('mousedown',control.mousedown)
		.bind('mousemove', control.mousemove)
		.bind('mouseup', control.mouseup)
		.bind('touchstart',control.mousedown)
		.bind('touchmove', control.mousemove)
		.bind('touchend', control.mouseup)
		.bind('touchcancel', control.mouseup)
		.bind('resize', control.resize);

	control.resize();

	setTimeout(function() {
		if (!opened) {
			$('.notify').addClass('show');
		}
	}, 10000);

}]);