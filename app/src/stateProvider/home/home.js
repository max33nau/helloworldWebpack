'use strict';
import welcomeTemplate from './welcome/welcome.html';
import signInTemplate from './signIn/signIn.html';

export default {
  url: '/?admin',
  data: {
    requireLogin: false
  },
  views: {
    '@': {
      template: "<div ng-show='adminAuthorized'><my-nav-link class='navLink' state='admin' page-name='Admin'/> </div>",
      controller: ['$scope', '$stateParams', function($scope,$stateParams) {
          if($stateParams.admin === 'max') { // will be a better secret eventually
            $scope.adminAuthorized = true;
          } else {
            $scope.adminAuthorized = false;
          }
       }]
     },
    'welcome': {
      template: welcomeTemplate
    },
    'signIn': {
      template: signInTemplate,
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
      }
    }

};
