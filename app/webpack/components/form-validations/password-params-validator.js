'use strict';
export default function( ngModule ) {
	ngModule.directive( 'passwordParamsValidator', function() {
    return {
      require : 'ngModel',
      link : function($scope, element, attrs, ngModel) {
        ngModel.$validators.passwordParamsValidator = function(password) {
					if(/[A-Z]+/.test(password) && /[\d]+/.test(password) &&  /[a-z]+/.test(password)) {
						return true;
					} else {
						return false;
					}
        };
      }
    };
  });
}
