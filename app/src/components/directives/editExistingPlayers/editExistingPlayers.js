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
        $scope.players.existing = [{
          _id: 'abcd',
          name: 'Max Jacobsen',
          team: 'Portland Trail Blazers',
          age: 25,
          position: 'Power Forward',
          rookie: true,
          yearsInTheLeauge: 13
        },
        {
          _id: 'asdfdfsssd',
          name: 'Lebron James',
          team: 'Cleveland Cavs',
          age: 30,
          position: 'Small Forward',
          rookie: false,
          yearsInTheLeauge: 15
        },
        {
          _id: '124343',
          name: 'Test 2',
          team: 'Miami Heat',
          age: 40,
          position: 'Power Forward',
          rookie: true,
          yearsInTheLeauge: 0
        },
        {
          _id: 'abdasfasdfasdfs',
          name: 'Test 3',
          team: 'Portland Trail Blazers',
          age: 25,
          position: 'Point Guard',
          rookie: false,
          yearsInTheLeauge: 30
        }];
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
