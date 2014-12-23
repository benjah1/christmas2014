'use strict';

App.factory('BookIterator', [
	'BookStateDrag', 
	'BookStateRelease', 
	'BookStateCancel', 
	function(BookStateDrag, BookStateRelease, BookStateCancel) {

	return function(pagePointers, slidePointer, animationTime) {
		var _pagePointers = pagePointers, _currentPage = 0, _bookState, _animationTime = animationTime*1000 || 1,
			_controlling = false, _slidePointer = slidePointer;

		// todo maybe a release timeout?

		this.isControl = function() {
			return _controlling;
		};

		this.next = function() {
			if(!this.hasNext()) {
				throw 'You have reached the end.';
			}
			_controlling = true;
			_bookState = new BookStateDrag(_pagePointers[_currentPage+1], _pagePointers[_currentPage], _slidePointer.next, function() {
				++_currentPage;
			});
			_bookState.dragStart();
		};

		this.previous = function() {
			if(!this.hasPrevious()) {
				throw 'You have reached the beginning.';
			}
			_controlling = true;
			_bookState = new BookStateDrag(_pagePointers[_currentPage-1], _pagePointers[_currentPage], _slidePointer.previous, function() {
				--_currentPage;
			});
			_bookState.dragStart();
		};

		this.drag = function(dx, forcePoint) {
			if(!_controlling) {
				throw 'The book is not in control.';
			}
			_bookState.drag(dx, forcePoint);
		};

		this.release = function() {
			if(!_controlling) {
				throw 'The book is not in control.';
			}
			_bookState.dragComplete();
			_bookState = new BookStateRelease(_bookState);
			_bookState.release();
			setTimeout(function() {
				_controlling = false;
				_bookState.complete();
				_bookState = null;
			}, _animationTime);
		};

		this.cancel = function() {
			if(!_controlling) {
				throw 'The book is not in control.';
			}
			_bookState.dragComplete();
			_bookState = new BookStateCancel(_bookState);
			_bookState.release();
			setTimeout(function() {
				_controlling = false;
				_bookState.complete();
				_bookState = null;
			}, _animationTime);
		};

		this.hasNext = function() {
			if (_currentPage < _pagePointers.length - 1) {
				return true;
			} else {
				return false;
			}
		};

		this.hasPrevious = function() {
			if (_currentPage > 0) {
				return true;
			} else {
				return false;
			}
		};

		this.getCurr = function() {
			return _currentPage;
		};
	};
}]);