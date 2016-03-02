'use strict';
import template from './home.html';

export default {
  url: '/',
  data: {
    requireLogin: false
  },
  template,
  controller: ['$scope', '$auth','User', function($scope, $auth, User) {
    $scope.user = {};
    $scope.user.authenticate = function(provider){
      $auth.authenticate(provider)
        .then(function(response){
          User.logIn(response.data);
        })
        .catch(function(error){
          console.log(error);
        });
    };
  }]
};
