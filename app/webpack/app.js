'use strict';

/* CSS Styling */
import 'bootstrap';
import './css/main.css';

/* HTML Templates */
import adminTemplate from './views/admin.html';
import homeTemplate from './views/home.html';
import loginTemplate from './views/login.html';
import playerSearchTemplate from './views/playerSearch.html';
import registerTemplate from './views/register.html';

/* JS Vendors */
import angular from 'angular' ;
import angularRoute from 'angular-route';

const app = angular.module('myApp', [angularRoute]);

/* Controllers */
import controller from './controllers'; // finds index.js
controller(app);

app.config(['$routeProvider', '$httpProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: homeTemplate,
    })
    .when('/searchPlayer', {
      templateUrl: playerSearchTemplate,
      controller: 'playerCtrl'
    })
    .when('/login', {
      templateUrl: loginTemplate,
      controller: 'loginCtrl'
    })
    .when('/register', {
      templateUrl: registerTemplate,
      controller: 'registerCtrl'
    })
    .when('/admin', {
      templateUrl: adminTemplate,
      controller: 'adminCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]).run(['$rootScope', '$location', function($rootScope,$location) {
  $rootScope.$on('$locationChangeStart', function(event,newUrl) {
    $rootScope.root = {};
    var token = localStorage.getItem('token');
    var currentUser = localStorage.getItem('user');
    var urlArray = newUrl.split('#');
    var nextPath = urlArray[1];
    if(nextPath === '/searchPlayer' && !token) {
      $rootScope.root.notAuthorized = true;
    } else if (token && currentUser) {
      $rootScope.root.notAuthorized = false;
      $rootScope.root.userLoggedIn = true;
      $rootScope.root.user = currentUser;
      if(token && currentUser === 'admin') {
        $rootScope.root.admin = true;
      }
    } else {
      $rootScope.root.notAuthorized = false;
      $rootScope.root.user = '';
      $rootScope.root.userLoggedIn = false;
    }
  });
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp']);
});
