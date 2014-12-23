'use strict';

App.factory('IBookState', function() {
	return function() {
		var _pageOpen, _pageClose, _completeCallback, _slide;

		this.setSlide = function(slide) {
			_slide = slide;
		};
		this.getSlide = function() {
			return _slide;
		};

		this.setPageOpen = function(pageOpen) {
			_pageOpen = pageOpen;
		};
		this.getPageClose = function() {
			return _pageClose;
		};

		this.setPageClose = function(pageClose) {
			_pageClose = pageClose;
		};
		this.getPageOpen = function() {
			return _pageOpen;
		};

		this.setCallBack = function(cb) {
			_completeCallback = cb;
		};
		this.completeCallback = function() {
			return _completeCallback;
		};
	};
});