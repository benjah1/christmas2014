'use strict';

App.factory('PageStateDragClose', [
	'PageStateDragOpen', 'extend', 
	function(PageStateDragOpen, extend) {

	return extend(function() {
		this.dragStart = function() {
			this.getPointer().dragCloseStart();
		};

		this.drag = function() {
			this.getPointer().dragClose();
		};

		this.dragComplete = function() {
			this.getPointer().dragCloseComplete();
		};
	}, PageStateDragOpen);	
}]);