'use strict';
import template from './newPlayer.html';

export default function( ngModule ) {
	ngModule.directive( 'newPlayerForm', function(){
		return {
			replace: true,
			restrict: 'E',
			template,
    	scope: {
				formHeader: '@',
        showAddPlayerForm: '='
			},
			controller: ['$scope', '$http', function($scope,$http) {
		    $scope.error = '';
		    $scope.success = '';
		    $scope.playerInfo = {};
		    $scope.playerInfo.createPlayer = function() {
					if(Number($scope.playerInfo.yearsInTheLeauge) === 0) {
						$scope.playerInfo.rookie = true;
					} else {
						$scope.playerInfo.rookie = false;
					}
		      $scope.error = '';
		      $scope.success = '';
		      $http({
		        url: '/players',
		        method: 'POST',
		        data: $scope.playerInfo
		      })
		      .then(function(response){
		        $scope.success = response.data.name + ' was added to the database.';
		        $scope.playerInfo = {};
		      })
		      .catch(function(error){
		        $scope.error = 'The right criteria was not met for adding a new player';
		      });
		    };
		  }]
		};
	});
}
