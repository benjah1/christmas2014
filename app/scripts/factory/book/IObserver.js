'use strict';

App.factory('IObserver', ['IObservable', function(IObservable) {
	
	return function() {
		var fakeObservable = new IObservable();

		this.addListener = function(event, cb) {
			fakeObservable.register(event, cb);
		};
	};
}]);