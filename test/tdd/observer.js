'use strict';

describe('Test Observer', function() {
	var IObservable, IObserver, extend;

	beforeEach(function() {
		module('xmas');
		inject(function($injector) {
			IObservable = $injector.get('IObservable');
			IObserver = $injector.get('IObserver');
			extend = $injector.get('extend');
		});
	});

	it('listener', function() {
		var Observer = new IObserver(), Observable = new IObservable(), fired = false;

		Observer.addListener('test', function() {
			fired = true;
		});

		Observable.trigger('test');

		assert.isTrue(fired);
	});

	it('inheritance', function() {
		var fired = {A:false, B:false};
		var A = extend(function() {}, IObserver);
		var B = extend(function() {}, IObserver);
		var C = extend(function() {}, IObservable);
		var a = new A(), b = new B(), c = new C();

		a.addListener('test', function() {
			fired.a = true;
		});

		b.addListener('test', function() {
			fired.b = true;
		});

		c.trigger('test');

		assert.isTrue(fired.a);
		assert.isTrue(fired.b);

	});

	it('trigger empty event', function() {
		var Observer = new IObserver(), Observable = new IObservable(), fired = false;

		assert.isTrue(Observable.trigger('test2'));
	});

	it('wrong function type', function() {
		var Observer = new IObserver(), Observable = new IObservable(), fired = false;

		Observer.addListener('test', true);

		assert.throws(function() {
			Observable.trigger('test');
		}, 'It is not a valid event function.');
	});

});