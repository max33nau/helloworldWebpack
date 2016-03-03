'use strict';
import template from './playerSearch.html';

export default {
  url: '/searchPlayer',
  data: {
    requireLogin: true
  },
  template,
  resolve: {
    loadPlayers: function(PlayerInfo) {
      return  PlayerInfo.getAll()
          .then(function(response){
              return response.data;
            })
            .catch(function(error){
              return error;
            });
    }
  },
  controller: ['$scope', '$http','loadPlayers', function($scope, $http, loadPlayers){
    $scope.user = {};
    $scope.user.existingPlayers = loadPlayers;
  }]
};
