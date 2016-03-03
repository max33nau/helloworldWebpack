'use strict';
import welcomeTemplate from './welcome/welcome.html';
import signInTemplate from './signIn/signIn.html';

export default {
  url: '/',
  data: {
    requireLogin: false
  },
  views: {
    'welcome': {template: welcomeTemplate},
    'signIn': {template: signInTemplate,
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
      }]}
    }
};
