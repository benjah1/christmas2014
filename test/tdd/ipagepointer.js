'use strict';

describe('Test IPagePointer', function() {
	var IPagePointer, extend, IObserver;
return;
	beforeEach(function() {
		module('xmas');
		inject(function($injector) {
			IPagePointer = $injector.get('IPagePointer');
			IObserver = $injector.get('IObserver');
			extend = $injector.get('extend');
		});
	});

	it('test', function() {
		var PagePointer = extend(function() {
			this.dragOpenStart = function() {
				this.super().dragOpenStart();
			};
			this.dragOpen = function() {
				this.super().dragOpen();
			};
			this.dragOpenComplete = function() {
				this.super().dragOpenComplete();
			};
			this.dragCloseStart = function() {
				this.super().dragCloseStart();
			};
			this.dragClose = function() {
				this.super().dragClose();
			};
			this.dragCloseComplete = function() {
				this.super().dragCloseComplete();
			};
			this.openStart = function() {
				this.super().openStart();
			};
			this.openComplete = function() {
				this.super().openComplete();
			};
			this.closeStart = function() {
				this.super().closeStart();
			};
			this.closeComplete = function() {
				this.super().closeComplete();
			};
		}, IPagePointer);

		var fired = {
			dragOpenStart: false, dragOpen: false, dragOpenComplete: false, 
			dragCloseStart: false, dragClose: false, dragCloseComplete: false,
			openStart: false, openComplete: false, 
			closeStart: false, closeComplete: false 
		};
		var observer = new IObserver();

		observer.addListener('dragOpenStart', function() {
			fired.dragOpenStart = true;
		});
		observer.addListener('dragOpen', function() {
			fired.dragOpen = true;
		});
		observer.addListener('dragOpenComplete', function() {
			fired.dragOpenComplete = true;
		});
		observer.addListener('dragCloseStart', function() {
			fired.dragCloseStart = true;
		});
		observer.addListener('dragClose', function() {
			fired.dragClose = true;
		});
		observer.addListener('dragCloseComplete', function() {
			fired.dragCloseComplete = true;
		});
		observer.addListener('openStart', function() {
			fired.openStart = true;
		});
		observer.addListener('openComplete', function() {
			fired.openComplete = true;
		});
		observer.addListener('closeStart', function() {
			fired.closeStart = true;
		});
		observer.addListener('closeComplete', function() {
			fired.closeComplete = true;
		});

		var pagePointer = new PagePointer();

		assert.isFalse(fired.dragOpenStart);
		pagePointer.dragOpenStart()
		assert.isTrue(fired.dragOpenStart);

		assert.isFalse(fired.dragOpen);
		pagePointer.dragOpen()
		assert.isTrue(fired.dragOpen);

		assert.isFalse(fired.dragOpenComplete);
		pagePointer.dragOpenComplete()
		assert.isTrue(fired.dragOpenComplete);

		assert.isFalse(fired.dragCloseStart);
		pagePointer.dragCloseStart()
		assert.isTrue(fired.dragCloseStart);

		assert.isFalse(fired.dragClose);
		pagePointer.dragClose()
		assert.isTrue(fired.dragClose);

		assert.isFalse(fired.dragCloseComplete);
		pagePointer.dragCloseComplete()
		assert.isTrue(fired.dragCloseComplete);

		assert.isFalse(fired.openStart);
		pagePointer.openStart()
		assert.isTrue(fired.openStart);

		assert.isFalse(fired.openComplete);
		pagePointer.openComplete()
		assert.isTrue(fired.openComplete);

		assert.isFalse(fired.closeStart);
		pagePointer.closeStart()
		assert.isTrue(fired.closeStart);

		assert.isFalse(fired.closeComplete);
		pagePointer.closeComplete()
		assert.isTrue(fired.closeComplete);

	});
});