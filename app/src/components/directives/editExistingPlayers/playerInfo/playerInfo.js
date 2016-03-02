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
			controller: ['$scope', '$http', function($scope,$http) {
        $scope.specificPlayer = {};
        $scope.uneditedPlayer = {};
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
          $http({
            url: '/players/'+$scope.player._id,
            method: 'PUT',
            data: $scope.player
          })
          .then(function(response){
            $scope.specifiedPlayer.success = 'Player updated';
            $scope.uneditedPlayer = {};
          })
          .catch(function(error){
            $scope.specifiedPlayer.error = 'Update player went wrong';
            $scope.player = angular.copy($scope.uneditedPlayer);
          });
        };

        $scope.specificPlayer.delete = function() {
          var areYouSure = prompt("Are you sure you want to delete that player? yes/no");
          if(areYouSure === 'yes') {
            $http({
              url: '/players/'+$scope.player._id,
              method: 'DELETE'
            })
            .then(function(response){
              $scope.removePlayer($scope.player);
            })
            .catch(function(error){
              console.log(error);
              $scope.specifiedPlayer.error = 'Delete attempt was unsuccessful';
            });
          }
        };
		  }]
		};
	});
}
