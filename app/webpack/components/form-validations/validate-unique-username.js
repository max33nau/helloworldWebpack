'use strict';
export default function( ngModule ) {
	ngModule.directive( 'uniqueUsernameValidator',['$http', function($http) {
    return {
      require : 'ngModel',
      link : function($scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.uniqueUsernameValidator = function(username) {
          console.log(username);
        //  $http.post('/user/signup', JSON.stringify(username));
        };
      }
    };
  }]);
}
