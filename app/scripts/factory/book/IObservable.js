'use strict';

App.factory('IObservable', function() {
	var _events = [];

	return function(){
		this.register = function(event, cb) {
			if ('undefined' === typeof _events[event]) {
				_events[event] = [];
			}
			_events[event].push(cb);
		};
		this.trigger = function(event) {
			if ('undefined' === typeof _events[event]) {
				return true;
			}
			var i;
			for(i in _events[event]) {
				if ('function' === typeof _events[event][i]) {
					_events[event][i]();
				} else {
					throw 'It is not a valid event function.';
				}
			}
		};
	};
});