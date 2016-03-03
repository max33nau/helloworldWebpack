'use strict';
import template from './admin.html';

export default {
  url: '/admin',
  data: {
    requireLogin: true
  },
  template,
  controller: ['$scope', function($scope){
    $scope.admin = {};
    $scope.admin.addPlayer = true;
  }]
};
