'use strict';

App.factory('IPagePointer', function() {
	return function() {
		var _element;
		this.setElement = function(element) {
			_element = element;
		};
		this.getElement = function() {
			return _element;
		};

		this.dragOpenStart = function() {};
		this.dragOpen = function() {};
		this.dragOpenComplete = function() {};

		this.dragCloseStart = function() {};
		this.dragClose = function() {};
		this.dragCloseComplete = function() {};

		this.openStart = function() {};
		this.openComplete = function() {};

		this.closeStart = function() {};
		this.closeComplete = function() {};
	};

});