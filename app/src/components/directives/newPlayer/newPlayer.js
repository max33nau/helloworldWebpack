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
			controller: ['$scope', 'PlayerInfo', function($scope,PlayerInfo) {
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
					PlayerInfo.createNewPlayer($scope.playerInfo)
		      	.then(function(response){
		        	$scope.success = response.data.name + ' was added to the database.';
		        	$scope.playerInfo = {};
							PlayerInfo.removeCache();
		      	})
		      	.catch(function(error){
		        	$scope.error = 'The right criteria was not met for adding a new player';
		      	});
		    };
		  }]
		};
	});
}
