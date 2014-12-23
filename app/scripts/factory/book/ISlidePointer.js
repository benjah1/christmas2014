'use strict';

App.factory('ISlidePointer', function() {
	return function() {
		var _element;
		this.setElement = function(element) {
			_element = element;
		};
		this.getElement = function() {
			return _element;
		};

		this.dragStart = function() {};
		this.drag = function() {};
		this.dragComplete = function() {};
		this.dragCancel = function() {};
		this.release = function() {};
		this.complete = function() {};
	};
});