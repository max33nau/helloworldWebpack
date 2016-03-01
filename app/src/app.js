'use strict';

/* CSS Styling */
import './css/main.css';

/* Angular Vendors */
import angular from 'angular' ;
import angularRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';

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
.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event,toState, toParms){
      var requireLogin = toState.data.requireLogin;
      if(requireLogin && !$rootScope.currentUser) {
        event.preventDefault();
      }
    });

}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp']);
});
