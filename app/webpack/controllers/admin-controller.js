'use strict';

export default function(ngModule) {
  ngModule.controller('adminCtrl',['$scope', '$http', function($scope,$http) {
    $scope.error = '';
    $scope.success = '';
    var token = localStorage.getItem('token');
    $scope.admin = {};
    $scope.playerInfo = {};
    $scope.players = [];
    $http({
      url: '/players',
      method: 'GET',
      headers: { 'token': token}
    })
    .then(function(response){
      $scope.players = response.data;
    })
    .catch(function(error){
      $scope.error = 'Something went wrong getting players from the database';
    });
    $scope.admin.createPlayer = function() {
      $scope.error = '';
      $scope.success = '';
      $http({
        url: '/players',
        method: 'POST',
        headers: { 'token': token},
        data: $scope.playerInfo
      })
      .then(function(response){
        $scope.players.push(response.data);
        $scope.success = response.data.name + ' was added to the database.';
        $scope.playerInfo = {};
      })
      .catch(function(error){
        $scope.error = 'The right criteria was not met for adding a new player';
      });
    };

    $scope.uneditedPlayer = {};

    $scope.admin.editPlayer = function(playerInfo) {
      $scope.admin.error = '';
      $scope.admin.success = '';
      playerInfo.editing = true;
      $scope.uneditedPlayer = angular.copy(playerInfo);
    };

    $scope.admin.cancelEdit = function(playerInfo) {
      $scope.admin.error = '';
      $scope.admin.success = '';
      playerInfo.editing = false;
      playerInfo.rookie = angular.copy($scope.uneditedPlayer.rookie);
      playerInfo.team = angular.copy($scope.uneditedPlayer.team);
      playerInfo.age = angular.copy($scope.uneditedPlayer.age);
      playerInfo.yearsInTheLeauge = angular.copy($scope.uneditedPlayer.yearsInTheLeauge);
      playerInfo.position = angular.copy($scope.uneditedPlayer.position);
    };

    $scope.admin.updatePlayer = function(player) {
      $scope.admin.error = '';
      $scope.admin.success = '';
      player.editing=false;
      var updatedPlayer = {};
      updatedPlayer._id = player._id;
      updatedPlayer.name = player.name;
      updatedPlayer.team = player.team;
      updatedPlayer.age = player.age;
      updatedPlayer.rookie = player.rookie;
      updatedPlayer.position = player.position;
      $http({
        url: '/players/'+player._id,
        method: 'PUT',
        headers: { 'token': token},
        data: updatedPlayer
      })
      .then(function(response){
        $scope.admin.success = 'Player updated';
      })
      .catch(function(error){
        $scope.admin.error = 'Update player went wrong';
        player.rookie = angular.copy($scope.uneditedPlayer.rookie);
        player.team = angular.copy($scope.uneditedPlayer.team);
        player.age = angular.copy($scope.uneditedPlayer.age);
        player.yearsInTheLeauge = angular.copy($scope.uneditedPlayer.yearsInTheLeauge);
        player.position = angular.copy($scope.uneditedPlayer.position);
      });
    };

    $scope.admin.deletePlayer = function(player) {
      $scope.admin.error = '';
      $scope.admin.success = '';
      var areYouSure = prompt("Are you sure you want to delete that player? yes/no");
      if(areYouSure === 'yes') {
        $http({
          url: '/players/'+player._id,
          method: 'DELETE',
          headers: { 'token': token}
        })
        .then(function(response){
          for(var ii = 0; ii < $scope.players.length; ii++){
            if($scope.players[ii].name === player.name) {
              $scope.players.splice(ii,1);
            }
          }
        })
        .catch(function(error){
          console.log(error);
          $scope.admin.error = 'Delete attempt was unsuccessful';
        });
      }
    };
  }]);
}
