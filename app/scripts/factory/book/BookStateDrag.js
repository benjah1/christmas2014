'use strict';

App.factory('BookStateDrag', [
	'Page', 'PageStateDragOpen', 'PageStateDragClose', 'Slide',
	'IBookState',	'extend',
	function(
		Page, PageStateDragOpen, PageStateDragClose, Slide, 
		IBookState, extend) {

	return extend(function(
		pageOpenPointer, pageClosePointer,
		slidePointer,
		completeCB) {

		this.init = function() {
			this.setSlide(new Slide());
			this.getSlide().setPointer(slidePointer);

			this.setPageOpen(new Page());
			this.getPageOpen().setPointer(pageOpenPointer);
			this.getPageOpen().setState(PageStateDragOpen);

			this.setPageClose(new Page());
			this.getPageClose().setPointer(pageClosePointer);
			this.getPageClose().setState(PageStateDragClose);

			this.setCallBack(completeCB);
		};

		this.dragStart = function() {
			this.getSlide().dragStart(
				this.getPageOpen().getElement(), 
				this.getPageClose().getElement());
			this.getPageOpen().dragStart();
			this.getPageClose().dragStart();
		};

		this.drag = function(dx, forcePoint) {
			this.getSlide().drag(dx, forcePoint);
			this.getPageOpen().drag();
			this.getPageClose().drag();
		};

		this.dragComplete = function() {
			this.getPageOpen().dragComplete();
			this.getPageClose().dragComplete();
		};

	}, IBookState);
}]);