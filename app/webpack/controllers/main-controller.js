'use strict';
export default function(ngModule) {
  ngModule.controller('mainCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope,$http){
    $scope.logout = function() {
      $rootScope.root = null;
      localStorage.clear();
    };
  }]);
}
