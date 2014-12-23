'use strict';

App.factory('PageStateCancelOpen', [
	'PageStateReleaseOpen', 'extend', 
	function(PageStateReleaseOpen, extend) {
	
	return extend(function() {
		this.releaseStart = function() {
			this.getPointer().closeStart();
		};

		this.releaseComplete = function() {
			this.getPointer().closeComplete();
		};
	}, PageStateReleaseOpen);
}]);
