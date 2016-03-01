'use strict';
import template from './home.html';

export default {
  url: '/',
  template,
  controller: ['$scope', function($scope) {
    $scope.user = {};
      $scope.user.currentDate = new Date();
  }]
};
