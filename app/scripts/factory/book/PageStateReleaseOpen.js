'use strict';

App.factory('PageStateReleaseOpen', [
	'IPageState', 'extend', 
	function(IPageState, extend) {
	
	return extend(function() {
		this.releaseStart = function() {
			this.getPointer().openStart();
		};

		this.releaseComplete = function() {
			this.getPointer().openComplete();
		};
	}, IPageState);
}]);
