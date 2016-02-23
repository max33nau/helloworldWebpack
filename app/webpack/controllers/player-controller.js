'use strict';

import dummyData from '../test-data/dummyDataPlayers';

export default function(ngModule) {
  ngModule.controller('playerCtrl',['$scope', '$http', function($scope,$http) {
    var token = localStorage.getItem('token');
    $scope.player = {};
    $scope.defaultFilter = {};
    $scope.players = [];
    $scope.searchedPlayer = {};
    $scope.showAll = false;
    var x = dummyData();
    $scope.players = x;
    // $http({
    //   url: '/players',
    //   method: 'GET',
    //   headers: { 'token': token}
    // })
    // .then(function(response){
    //   $scope.players = response.data;
    // })
    // .catch(function(error){
    //   $scope.error = 'Something went wrong getting players from the database';
    // });

    $scope.player.search = function(playerName) {
      $scope.searchedPlayer = {};
      $scope.showAll = false;
      $scope.showOne = true;
      $http({
        url: '/players/find/'+playerName,
        method: 'GET',
        headers: { 'token': token}
      })
      .then(function(response){
        if(response.data !== null) {
          $scope.searchedPlayer.notFound = false;
          $scope.searchedPlayer = response.data;
        } else {
          $scope.searchedPlayer.notFound = true;
          $scope.searchedPlayer.error = 'Player Not Found';
        }
      })
      .catch(function(error){
        $scope.error = 'Something went wrong getting players from the database';
      });
    };

    $scope.player.removeFilter = function() {
      $scope.selectedFilter = null;
      $scope.filterByName = {};
      $scope.filterByTeam = {};
      $scope.filterByRookie = {};
      $scope.filterByPosition = {};
    };
  }]
);
}
