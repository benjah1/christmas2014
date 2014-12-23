'use strict';

App.factory('Slide', function() {
	return function() {
		var _pointer;

		this.setPointer = function(pointer) {
			_pointer = pointer;
		};
		this.getPointer = function() {
			return _pointer;
		};

		this.dragStart = function(pageOpen, pageClose) {
			_pointer.dragStart(pageOpen, pageClose);
		};
		this.drag = function(dx, forcePoint) {
			_pointer.drag(dx, forcePoint);
		};
		this.dragComplete = function() {
			_pointer.dragComplete();
		};
		this.dragCancel = function() {
			_pointer.dragCancel();
		};
		this.release = function() {
			_pointer.release();
		};
		this.complete = function() {
			_pointer.complete();
		};
	};
});