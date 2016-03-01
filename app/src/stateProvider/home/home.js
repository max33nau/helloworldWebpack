'use strict';
import template from './home.html';

export default {
  url: '/',
  data: {
    requireLogin: false
  },
  template,
  controller: ['$scope', '$auth', function($scope, $auth) {
    $scope.user = {};
    $scope.user.currentDate = new Date();
    $scope.user.authenticate = function(provider){
      $auth.authenticate(provider);
    };
  }]
};
