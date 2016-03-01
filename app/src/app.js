'use strict';

/* CSS Styling */
import './css/main.css';

/* Angular Vendors */
import angular from 'angular' ;
import angularRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';

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
  controllers
]);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  configStateProvider($stateProvider);
}])
.run(['$rootScope', '$location', function($rootScope,$location) {
    /* AUTHENTICATION WILL GO HERE */
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp']);
});
