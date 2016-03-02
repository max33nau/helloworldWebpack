'use strict';

/* CSS Styling */
import './css/main.css';

/* Angular Vendors */
import angular from 'angular' ;
import angularRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';

/* import services */
import services from './services';

/* authentication provider */
import satellizer from 'satellizer';

/* Custom Filters */
import filters from './filters';

/* Components */
import components from './components';

/* Controllers */
import controllers from './controllers';

/* config StateProvider */
import configStateProvider from './stateProvider';

const app = angular.module('myApp', [
  angularRouter,
  angularMessages,
  services,
  filters,
  components,
  controllers,
  satellizer
]);

app.constant('baseUrl', 'http://localhost:3333');

app.config(['$authProvider','baseUrl', function($authProvider, baseUrl){
  $authProvider.twitter({
    url: baseUrl+'/auth/twitter',
  });
}]);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  configStateProvider($stateProvider);
}])
.run(['$rootScope', '$auth','$state','User', function($rootScope, $auth, $state, User) {

    User.checkLogInStatus();

    $rootScope.$on('$stateChangeStart', function(event,toState, toParms){
      if(toState.data && toState.data.requireLogin && !$rootScope.currentUser && !$auth.isAuthenticated()) {
        event.preventDefault();
      }
    });


}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp']);
});
