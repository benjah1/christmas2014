'use strict';

App.directive('book', [
	'$window', 
	'BookIterator', 'IPagePointer', 'ISlidePointer', 'extend',
	function($window, 
		BookIterator, IPagePointer, ISlidePointer, extend) {
	var book;

	var link = function ($scope, element) {
		var pagePointers = [], i, 
			PagePointer, pagePointerInst, 
			pageElems = element.children(),
			slidePointers, NextSlide, PrevSlide;

		for (i = 0; i < pageElems.length; ++i) {
			if ('function' === typeof $scope.pagePointers[i]) {
				PagePointer = extend($scope.pagePointers[i], IPagePointer);
			} else {
				PagePointer = IPagePointer;
			}
			pagePointerInst = new PagePointer(i);
			pagePointerInst.setElement(angular.element(pageElems[i]));
			pagePointers.push(pagePointerInst);
		}

		if ('undefined' !== typeof $scope.slidePointers && 
			'function' === typeof $scope.slidePointers.next) {
			NextSlide = extend($scope.slidePointers.next, ISlidePointer);
		} else {
			NextSlide = ISlidePointer;
		}

		if ('undefined' !== typeof $scope.slidePointers && 
			'function' === typeof $scope.slidePointers.previous) {
			PrevSlide = extend($scope.slidePointers.previous, ISlidePointer);
		} else {
			PrevSlide = ISlidePointer;
		}

		slidePointers = {
			next: new NextSlide(),
			previous: new PrevSlide()
		};

		book = new BookIterator(pagePointers, slidePointers, 1);
		$scope.$emit($scope.getBook, book);
	};

	return {
		restrict: 'A',
		//transclude: false,
		link: link,
		scope: {
			pagePointers: '=pages',
			slidePointers: '=slide',
			getBook: '@'
		}
	};
}]);