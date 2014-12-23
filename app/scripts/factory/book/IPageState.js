'use strict';

App.factory('IPageState', function() {
	return function(pagePointer) {
		this.getPointer = function() {
			return pagePointer;
		};
	};
});