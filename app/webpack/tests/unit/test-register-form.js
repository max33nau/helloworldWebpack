// 'use strict';
//
// import usernames from '../mock-server-data/usernames';
// var users = usernames();
//
// describe('Angular testing for adminCtrl', function(){
//   beforeEach(angular.mock.module('myApp'));
//   var $controller;
//   var $scope;
//   var $http;
//   var $httpBackend;
//
//   beforeEach(angular.mock.inject(function(_$rootScope_,_$controller_, _$httpBackend_, _$http_) {
//     $controller = _$controller_;
//     $scope = _$rootScope_.$new();
//     $httpBackend = _$httpBackend_;
//     $http = _$http_;
//     $httpBackend.whenPOST('/user/signup').respond(function(method,url,data,headers){
//       var username = angular.fromJson(data.username);
//       for(var ii = 0; ii < users.length; ii++) {
//         if(users[ii].username === username) {
//           return [401,false];
//         } else {
//           return [200,username];
//         }
//       }
//     });
//   }));
//
//   it('should have one player already existing in the players array on the first load', function(){
//       $controller('registerCtrl', { $scope, $http, $httpBackend} );
//       $scope.user.username = 'Max';
//       $scope.user.password = 'abc';
//       $httpBackend.flush();
//
//   });
//
//   afterEach(function() {
//     $httpBackend.verifyNoOutstandingExpectation();
//     $httpBackend.verifyNoOutstandingRequest();
//   });
// })
