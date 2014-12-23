'use strict';

App.factory('Page', function() {
	return function() {
		var _pagePointer, _pageState;

		this.setPointer = function(pointer) {
			_pagePointer = pointer;
		};

		this.setState = function(stateFunc) {
			_pageState = stateFunc(_pagePointer);
		};

		this.getElement = function() {
			return _pagePointer.getElement();
		};

		this.dragStart = function() {
			_pageState.dragStart();
		};

		this.drag = function() {
			_pageState.drag();
		};

		this.dragComplete = function() {
			_pageState.dragComplete();
		};

		this.releaseStart = function() {
			_pageState.releaseStart();
		};

		this.releaseComplete = function() {
			_pageState.releaseComplete();
		};
	};
});