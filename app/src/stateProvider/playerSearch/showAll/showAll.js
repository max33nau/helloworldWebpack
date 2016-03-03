'use strict';
import template from './showAll.html';

export default {
  url: '/showAll',
  template,
  controller: ['$scope', function($scope){
    $scope.defaultFilter = {};
    $scope.user.removeFilter = function() {
      console.log('clicked');
      $scope.user.selectedFilter = null;
      $scope.filterByName = {};
      $scope.filterByTeam = {};
      $scope.filterByRookie = {};
      $scope.filterByPosition = {};
    };
  }]
};
