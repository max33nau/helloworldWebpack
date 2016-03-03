  'use strict';
  import template from './showOne.html';

  export default {
    url: '/showOne/:playerName',
    template,
    controller: ['$scope','$stateParams', function($scope, $stateParams){
      $scope.showOne = {};
      $scope.showOne.playerName =  $stateParams.playerName.toUpperCase();
      $scope.showOne.searchedPlayer = {};
      $scope.showOne.notFound = false;
      $scope.showOne.found = false;
      $scope.showOne.error = 'Sorry, you mispelled the name or that player does not exist in our system.';
      $scope.showOne.searchedPlayer = $scope.user.existingPlayers.filter(function(playerInfo){
        return playerInfo.name === $scope.showOne.playerName;
      })[0];
      console.log($scope.showOne.searchedPlayer);
      if(!!$scope.showOne.searchedPlayer) {
        $scope.showOne.found = true;
      } else {
        $scope.showOne.notFound = true;
      }
    }]
  };
