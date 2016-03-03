'use strict';
import template from './playerSearch.html';

export default {
  url: '/searchPlayer',
  data: {
    requireLogin: true
  },
  template,
  resolve: {
    getPlayers: function() {
      return {players: [{
        _id: 'abcd',
        name: 'LEBRON',
        team: 'Portland Trail Blazers',
        age: 25,
        position: 'Power Forward',
        rookie: true,
        yearsInTheLeauge: 13
      },
      {
        _id: 'asdfdfsssd',
        name: 'COOL',
        team: 'Cleveland Cavs',
        age: 30,
        position: 'Small Forward',
        rookie: false,
        yearsInTheLeauge: 15
      },
      {
        _id: '124343',
        name: 'MAX',
        team: 'Miami Heat',
        age: 40,
        position: 'Power Forward',
        rookie: true,
        yearsInTheLeauge: 0
      },
      {
        _id: 'abdasfasdfasdfs',
        name: 'TEST',
        team: 'Portland Trail Blazers',
        age: 25,
        position: 'Point Guard',
        rookie: false,
        yearsInTheLeauge: 30
      }]};
    },
    loadPlayers: function($http) {
      // return $http({
      //   url: '/players',
      //   method: 'GET',
      // })
      // .then(function(response){
      //    return response.data;
      // })
      // .catch(function(error){
      //   return error;
      // });
    }
  },
  controller: ['$scope', '$http','getPlayers', function($scope, $http, getPlayers){
    $scope.user = {};
    $scope.user.existingPlayers = getPlayers.players;
  //  console.log($scope.user.existingPlayers);
  }]
};
