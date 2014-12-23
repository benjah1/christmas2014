'use strict';

App.factory('BookStateRelease', [
	'PageStateReleaseOpen', 'PageStateReleaseClose', 
	'IBookState',	'extend', 
	function(PageStateReleaseOpen, PageStateReleaseClose, IBookState, extend) {
	
	return extend(function(_bookState) {
		this.init = function() {
			this.setSlide(_bookState.getSlide());
			this.setPageOpen(_bookState.getPageOpen());
			this.setPageClose(_bookState.getPageClose());
			this.setCallBack(_bookState.completeCallback());

			this.getPageOpen().setState(PageStateReleaseOpen);
			this.getPageClose().setState(PageStateReleaseClose);
		};
		this.release = function() {
			this.getSlide().dragComplete();
			this.getPageOpen().releaseStart();
			this.getPageClose().releaseStart();
		};
		this.complete = function() {
			this.getPageOpen().releaseComplete();
			this.getPageClose().releaseComplete();
			this.getSlide().complete();
			this.completeCallback()();
		};
	}, IBookState);
}]);