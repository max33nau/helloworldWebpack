'use strict';
import template from './playerInfo.html';

export default function( ngModule ) {
	ngModule.directive( 'playerInfo', function(){
		return {
			replace: true,
			restrict: 'E',
			template,
    	scope: {
        player: '=',
        removePlayer: '&'
			},
			controller: ['$scope', 'PlayerInfo', function($scope,PlayerInfo) {
        $scope.specificPlayer = {};
        $scope.uneditedPlayer = {};
				$scope.specificPlayer.success = '';
				$scope.specificPlayer.error = '';
        $scope.specificPlayer.edit = function() {
          $scope.editing = true;
          $scope.uneditedPlayer = angular.copy($scope.player);
        };
        $scope.specificPlayer.cancelEdit = function() {
          $scope.editing = false;
          $scope.player = angular.copy($scope.uneditedPlayer);
          $scope.uneditedPlayer = {};
        };

        $scope.specificPlayer.save = function() {
          $scope.editing = false;
          if(Number($scope.player.yearsInTheLeauge) === 0) {
            $scope.player.rookie = true;
          } else {
            $scope.player.rookie = false;
          }
        	PlayerInfo.update($scope.player)
          	.then(function(response){
							PlayerInfo.updateCache($scope.player);
            	$scope.specificPlayer.success = 'Player updated';
            	$scope.uneditedPlayer = {};
          	})
          	.catch(function(error){
            	$scope.specificPlayer.error = 'Update player went wrong';
            	$scope.player = angular.copy($scope.uneditedPlayer);
          	});
        };

        $scope.specificPlayer.delete = function() {
          var areYouSure = prompt("Are you sure you want to delete that player? yes/no");
          if(areYouSure === 'yes') {
        		PlayerInfo.delete($scope.player)
            	.then(function(response){
              	$scope.removePlayer($scope.player);
								PlayerInfo.removeCache();
            	})
            	.catch(function(error){
              	console.log(error);
              	$scope.specificPlayer.error = 'Delete attempt was unsuccessful';
            	});
          }
        };
		  }]
		};
	});
}
