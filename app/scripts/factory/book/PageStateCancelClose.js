'use strict';

App.factory('PageStateCancelClose', [
	'PageStateCancelOpen', 'extend', 
	function(PageStateCancelOpen, extend) {
	
	return extend(function() {
		this.releaseStart = function() {
			this.getPointer().openStart();
		};

		this.releaseComplete = function() {
			this.getPointer().openComplete();
		};
	}, PageStateCancelOpen);
}]);
