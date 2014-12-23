'use strict';

App.factory('PageStateDragOpen', [
	'IPageState', 'extend', 
	function(IPageState, extend) {
	
	return extend(function() {
		this.dragStart = function() {
			this.getPointer().dragOpenStart();
		};

		this.drag = function() {
			this.getPointer().dragOpen();
		};

		this.dragComplete = function() {
			this.getPointer().dragOpenComplete();
		};
	}, IPageState);
}]);
