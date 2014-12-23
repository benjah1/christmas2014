'use strict';

App.factory('PageStateReleaseClose', [
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
