'use strict';

App.factory('BookStateCancel', [
	'PageStateCancelOpen', 'PageStateCancelClose', 
	'BookStateRelease',	'extend', 
	function(PageStateCancelOpen, PageStateCancelClose, BookStateRelease, extend) {
	
	return extend(function() {
		this.init = function() {
			this.super().init();
			this.getPageOpen().setState(PageStateCancelOpen);
			this.getPageClose().setState(PageStateCancelClose);
		};
		this.release = function() {
			this.getSlide().dragCancel();
			this.getPageOpen().releaseStart();
			this.getPageClose().releaseStart();
		};
		this.complete = function() {
			this.getSlide().complete();
			this.getPageOpen().releaseComplete();
			this.getPageClose().releaseComplete();
		};
	}, BookStateRelease);
}]);