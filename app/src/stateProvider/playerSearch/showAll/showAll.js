'use strict';
import template from './showAll.html';

export default {
  url: '/showAll',
  template,
  controller: ['$scope', function($scope){
    $scope.defaultFilter = {};
    $scope.user.removeFilter = function() {
      $scope.user.selectedFilter = null;
      $scope.filterByName = {};
      $scope.filterByTeam = {};
      $scope.filterByRookie = {};
      $scope.filterByPosition = {};
    };
  }]
};
