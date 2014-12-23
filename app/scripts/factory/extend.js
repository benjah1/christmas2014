'use strict';

App.factory('extend', function() {
	return function(Target, Source) {
		var create = function() {
			var constructorArgs = arguments;
			var extended = {}, 
				sourced = (function(O) {
					function F(args) {
						return O.apply(this, args);
					}
					F.prototype = O.prototype;
					return new F(constructorArgs);
				})(Source),
				targeted = (function(O) {
					function F(args) {
						return O.apply(this, args);
					}
					F.prototype = O.prototype;
					return new F(constructorArgs);
				})(Target);
			Object.keys(sourced).map(function (prop) {
				 extended[prop] = sourced[prop];
			});
			Object.keys(targeted).map(function (prop) {
				 extended[prop] = targeted[prop];
			});
			extended.super = function() {
				return sourced;
			};
			if ('function' === typeof extended.init) {
				extended.init();
			}
			return extended;
		};
		return create;
	};
});