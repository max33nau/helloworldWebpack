'use strict';

export default function( ngModule ) {
	ngModule.directive( 'logout', function(){
		return {
			replace: true,
			restrict: 'E',
			template: '<div ng-click=logOutUser()> Log Out </div>',
      scope: {},
      controller: ['$scope','User', function($scope,User){
        $scope.logOutUser = function() {
          User.logout();
        };
      }]
		};
	});
}
