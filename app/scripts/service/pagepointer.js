'use strict';

App.service('PagePointer', ['jQuery', function($) {
	var book = $('.card');
	book.addClass('page0');
	$('#p0').css('display','block');

	var PagePointer = function(index) {
		this.dragOpenStart = function() {
			$('#p'+index).css('display','block');
		};
		this.dragOpen = function() {
		};
		this.dragOpenComplete = function() {
		};
		this.dragCloseStart = function() {
		};
		this.dragClose = function() {
		};
		this.dragCloseComplete = function() {
		};
		this.openStart = function() {
			book.addClass('page'+index);
		};
		this.openComplete = function() {
			this.getElement().removeClass('next-open').removeClass('prev-open').removeClass('next-close').removeClass('prev-close');
			window.ga('send', 'event', 'page', 'open', index);
		};
		this.closeStart = function() {
			book.removeClass('page'+index);
		};
		this.closeComplete = function() {
			this.getElement().removeClass('next-open').removeClass('prev-open').removeClass('next-close').removeClass('prev-close');
			$('#p'+index).css('display','none');
		};
	};

	var PagePointerOne = function(index) {
		this.dragOpenStart = function() {
			$('#p'+index).css('display','block');
		};
		this.dragCloseStart = function() {
			this.super().dragCloseStart();
		};
		this.openStart = function() {
			book.addClass('page'+index);
		};
		this.openComplete = function() {
			$('.scene').addClass('up');
			$('.scene').removeClass('down');
			this.getElement().removeClass('next-open').removeClass('prev-open').removeClass('next-close').removeClass('prev-close');
			window.ga('send', 'event', 'page', 'open', index);
		};
		this.closeStart = function() {
			book.removeClass('page'+index);
		};
		this.closeComplete = function() {
			$('.scene').removeClass('down');
			this.getElement().removeClass('next-open').removeClass('prev-open').removeClass('next-close').removeClass('prev-close');
			$('#p'+index).css('display','none');
		};
	};

	this.pages = [
		PagePointer,
		PagePointerOne,
		PagePointer
	];

}]);