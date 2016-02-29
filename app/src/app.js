'use strict';

/* CSS Styling */
import './css/main.css';

/* HTML Templates */
import homeTemplate from './views/home.html';
import weeklyTasksTemplate from './views/weeklyTasks.html';

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


const app = angular.module('myApp', [
  angularRouter,
  angularMessages,
  filters,
  components,
  controllers
]);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('mainPage', {
      url: '/',
      template: homeTemplate,
    })
    .state('weeklyTasks', {
      url: '/weeklyTasks',
      template: weeklyTasksTemplate,
    })
    .state('weeklyTasks.day', {
      url: '/:day',
    });

}])
.run(['$rootScope', '$location', function($rootScope,$location) {
    /* AUTHENTICATION WILL GO HERE */
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp']);
});
