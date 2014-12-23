'use strict';

App.factory('extendDeep', function() {
	return function extendDeep(dst) {
	  angular.forEach(arguments, function(obj) {
	    if (obj !== dst) {
	      angular.forEach(obj, function(value, key) {
	        if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
	          extendDeep(dst[key], value);
	        } else {
	          dst[key] = value;
	        }     
	      });   
	    }
	  });
	  return dst;
	};
});