'use strict';
export default function( ngModule ) {
	ngModule.directive( 'noWhitespaceValidator', function() {
    return {
      require : 'ngModel',
      link : function($scope, element, attrs, ngModel) {
        ngModel.$validators.noWhitespaceValidator = function(username) {
					if(!/[\s+$]/.test(username)) {
						return true;
					} else {
						return false;
					}
        };
      }
    };
  });
}
