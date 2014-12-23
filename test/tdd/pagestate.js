'use strict';

describe('Test page state', function() {
	var extend, BookIterator, IPagePointer, ISlidePointer, _log = [], book;

	var log = function(d) {
		_log.push(d);
	};
	beforeEach(function() {
		module('xmas');
		inject(function($injector) {
			BookIterator = $injector.get('BookIterator');
			IPagePointer = $injector.get('IPagePointer');
			ISlidePointer = $injector.get('ISlidePointer');
			extend = $injector.get('extend');

			var PagePointer = extend(function(index){
				this.get = function() {
					return index;
				};
				this.dragOpenStart = function() {
					this.super().dragOpenStart();
					log('page '+index+' dragOpenStart');
				};
				this.dragOpen = function() {
					this.super().dragOpen();
					log('page '+index+' dragOpen');
				};
				this.dragOpenComplete = function() {
					this.super().dragOpenComplete();
					log('page '+index+' dragOpenComplete');
				};
				this.dragCloseStart = function() {
					this.super().dragCloseStart();
					log('page '+index+' dragCloseStart');
				};
				this.dragClose = function() {
					this.super().dragClose();
					log('page '+index+' dragClose');
				};
				this.dragCloseComplete = function() {
					this.super().dragCloseComplete();
					log('page '+index+' dragCloseComplete');
				};
				this.openStart = function() {
					this.super().openStart();
					log('page '+index+' openStart');
				};
				this.openComplete = function() {
					this.super().openComplete();
					log('page '+index+' openComplete');
				};
				this.closeStart = function() {
					this.super().closeStart();
					log('page '+index+' closeStart');
				};
				this.closeComplete = function() {
					this.super().closeComplete();
					log('page '+index+' closeComplete');
				};
			}, IPagePointer);

			var pages = [
				new PagePointer(0),
				new PagePointer(1),
				new PagePointer(2)
			];

			var slide = {
				next: new ISlidePointer(),
				previous: new ISlidePointer()
			};

			book = new BookIterator(pages, slide);
		});
  });

	beforeEach(function() {
		_log = [];
	});

	it('Test hasNext', function() {
		assert.isTrue(book.hasNext());
		assert.isFalse(book.hasPrevious());
	});

	it('Test beginning exception', function() {
		assert.throws(function() {
			book.previous();
		}, 'You have reached the beginning.');
	});

	it('Test not in control exception', function() {
		assert.throws(book.drag, 'The book is not in control.');
		assert.throws(book.release, 'The book is not in control.');
		assert.throws(book.cancel, 'The book is not in control.');
	});

	it('Test next drag cancel', function(done) {
		book.next();
		book.drag();
		book.cancel();
		assert.deepEqual(_log, [
			'page 1 dragOpenStart', 
			'page 0 dragCloseStart', 
			'page 1 dragOpen', 
			'page 0 dragClose',
			'page 1 dragOpenComplete', 
			'page 0 dragCloseComplete',
			'page 1 closeStart',
			'page 0 openStart']);
		setTimeout(function() {
			assert.deepEqual(_log, [
				'page 1 dragOpenStart', 
				'page 0 dragCloseStart', 
				'page 1 dragOpen', 
				'page 0 dragClose',
				'page 1 dragOpenComplete', 
				'page 0 dragCloseComplete',
				'page 1 closeStart',
				'page 0 openStart',
				'page 1 closeComplete', 
				'page 0 openComplete']);
			assert.isTrue(book.hasNext());
			assert.isFalse(book.hasPrevious());
			done();
		},10);
	});

	it('Test next drag release', function(done) {
		book.next();
		book.drag();
		book.release();
		assert.deepEqual(_log, [
			'page 1 dragOpenStart', 
			'page 0 dragCloseStart', 
			'page 1 dragOpen', 
			'page 0 dragClose',
			'page 1 dragOpenComplete', 
			'page 0 dragCloseComplete',
			'page 1 openStart',
			'page 0 closeStart']);
		setTimeout(function() {
			assert.deepEqual(_log, [
				'page 1 dragOpenStart', 
				'page 0 dragCloseStart', 
				'page 1 dragOpen', 
				'page 0 dragClose',
				'page 1 dragOpenComplete', 
				'page 0 dragCloseComplete',
				'page 1 openStart',
				'page 0 closeStart',
				'page 1 openComplete', 
				'page 0 closeComplete']);
			assert.isTrue(book.hasNext());
			assert.isTrue(book.hasPrevious());
			done();
		},10);
	});

	it('Test page 1 next drag complete', function(done) {
		book.next();
		book.drag();
		book.release();
		setTimeout(function() {
			_log = [];
			book.next();
			book.drag();
			book.release();
			setTimeout(function() {
				assert.deepEqual(_log, [
					'page 2 dragOpenStart', 
					'page 1 dragCloseStart', 
					'page 2 dragOpen', 
					'page 1 dragClose',
					'page 2 dragOpenComplete', 
					'page 1 dragCloseComplete',
					'page 2 openStart',
					'page 1 closeStart',
					'page 2 openComplete', 
					'page 1 closeComplete']);
				assert.isFalse(book.hasNext(), 'page2 should not has next');
				assert.isTrue(book.hasPrevious(), 'page2 should has previous');
				done();
			},10);
		},10);
	});

	it('Test page 2 previous drag complete', function(done) {
		book.next();
		book.drag();
		book.release();
		setTimeout(function() {
			book.next();
			book.drag();
			book.release();
			setTimeout(function() {
				_log = [];
				book.previous();
				book.drag();
				book.release();
				setTimeout(function() {
					assert.deepEqual(_log, [
						'page 1 dragOpenStart', 
						'page 2 dragCloseStart', 
						'page 1 dragOpen', 
						'page 2 dragClose',
						'page 1 dragOpenComplete', 
						'page 2 dragCloseComplete',
						'page 1 openStart',
						'page 2 closeStart',
						'page 1 openComplete', 
						'page 2 closeComplete']);
					assert.isTrue(book.hasNext());
					assert.isTrue(book.hasPrevious());
					done();
				},10);
			},10);
		},10);
	});

	it('Test page 1 previous drag complete', function(done) {
		book.next();
		book.drag();
		book.release()
		setTimeout(function() {
			_log = [];
			book.previous();
			book.drag();
			book.release();
			setTimeout(function() {
				assert.deepEqual(_log, [
					'page 0 dragOpenStart', 
					'page 1 dragCloseStart', 
					'page 0 dragOpen', 
					'page 1 dragClose',
					'page 0 dragOpenComplete', 
					'page 1 dragCloseComplete',
					'page 0 openStart',
					'page 1 closeStart',
					'page 0 openComplete', 
					'page 1 closeComplete']);
				assert.isTrue(book.hasNext());
				assert.isFalse(book.hasPrevious());
				done();
			},10);
		},10);
	});

	it('Test end', function(done) {
		book.next();
		book.drag();
		book.release();
		setTimeout(function() {
			_log = [];
			book.next();
			book.drag();
			book.release();
			setTimeout(function() {
				assert.isFalse(book.hasNext(), 'page2 should not has next');
				assert.isTrue(book.hasPrevious(), 'page2 should has previous');
				done();
			},10);
		},10);
	});

	it('Test end exception', function(done) {
		book.next();
		book.drag();
		book.release();
		setTimeout(function() {
			_log = [];
			book.next();
			book.drag();
			book.release();
			setTimeout(function() {
				assert.throws(function() {
					book.next();
				}, 'You have reached the end.');
				done();
			},10);
		},10);
	});

});