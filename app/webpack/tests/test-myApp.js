
describe('Angular testing for myApp', function(){
  beforeEach(angular.mock.module('myApp'));
  var $controller;
  var $scope;
  var $http;
  beforeEach(angular.mock.inject(function(_$rootScope_,_$controller_, _$http_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $http = _$http_
  }));

  it('should test to see if controller scope for a specific key exists in AdminCtrl', function(){
    $controller('adminCtrl', { $scope, $http } );
    $http({
      url: '/players',
      method: 'GET'
    }).then(function(players){

    }).catch(function(error){
      assert.equal($scope.error, 'Something went wrong getting players from the database');
    })

  })
})
