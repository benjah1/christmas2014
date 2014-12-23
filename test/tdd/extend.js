'use strict';

describe('Test extendable', function() {
	var extend;

	beforeEach(function() {
		module('xmas');
		inject(function($injector) {
			extend = $injector.get('extend');
		});
	});

	it('extend', function() {
		var A = function() {
			this.number = 1;
			this.bool = true;
			this.magic = 'real';
			this.animal = 'whale';
			this.croutons = 'delicious';
			this.run = function() {
				return 'A';
			};
		};

		var B = extend(function() {
			this.number = 2;
			this.magic = 'real';
			this.animal = 'porpoise';
			this.bool = false;
			this.random = 42;
			this.run = function() {
				return 'B';
			};
		}, A);

		var ob = new B();
		assert.strictEqual(ob.number, 2);
		assert.strictEqual(ob.magic, 'real');
		assert.strictEqual(ob.animal, 'porpoise');
		assert.strictEqual(ob.bool, false);
		assert.strictEqual(ob.random, 42);
		assert.strictEqual(ob.croutons, 'delicious');
		assert.strictEqual(ob.run(), 'B');
	});

	it('multi extend', function() {
		var A = function() {
			this.a = 'aa';
			this.c = 'ac';
		};

		var B = extend(function() {
			this.b = 'bb';
			this.c = 'bc';
		}, A);

		var C = extend(function() {
			this.c = 'cc';
		}, B);

		var oc = new C();
		assert.strictEqual(oc.a, 'aa');
		assert.strictEqual(oc.b, 'bb');
		assert.strictEqual(oc.c, 'cc');
	});

	it('super class', function() {
		var A = function() {
			this.identity = 'A';
			this.run = function() {
				return 'Hello';
			};
		};

		var B = extend(function() {
			this.identity = 'B';
			this.run = function() {
				return this.super().run() + ' World';
			};
		}, A);

		var ob = new B();
		assert.strictEqual(ob.identity, 'B');
		assert.strictEqual(ob.super().identity, 'A');
		assert.strictEqual(ob.run(), 'Hello World');
	});

	it('parent\'s this', function() {
		var A = function() {
			this.i = 'A';
			this.run = function() {
				return this.i;
			};
		}, B = extend(function() {
			this.i = 'B';
		}, A);

		var b = new B();
		assert.strictEqual(b.run(), 'B');
	});

	it('super class - middle one', function() {
		var A = function() {
			this.identity = 'A';
			this.run = function() {
				return 'Hello';
			};
		};

		var B = extend(function() {
			this.identity = 'B';
			this.run = function() {
				return this.super().run() + ' World';
			};
		}, A);

		var C = extend(function() {
			this.identity = 'C';
			this.run = function() {
				return this.super().run() + ' !';
			};
		}, B);

		var oc = new C();
		assert.strictEqual(oc.identity, 'C');
		assert.strictEqual(oc.super().identity, 'B');
		assert.strictEqual(oc.run(), 'Hello World !');
	});

});