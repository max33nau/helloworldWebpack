'use strict';
import template from './editExistingPlayers.html';

export default function( ngModule ) {
	ngModule.directive( 'editExistingPlayers', function(){
		return {
			replace: true,
			restrict: 'E',
			template,
    	scope: {
        hideAddPlayerForm: '='
			},
			controller: ['$scope', '$http', function($scope,$http) {
        $scope.players = {};
        $scope.players.existing = [];
        $scope.players.removePlayer = function(player) {
          for(var ii = 0; ii < $scope.players.existing.length; ii++){
            if($scope.players.existing[ii].name === player.name) {
              $scope.players.existing.splice(ii,1);
            }
          }
        };
		  }]
		};
	});
}
