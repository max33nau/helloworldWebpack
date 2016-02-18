
describe('Angular testing for myApp', function(){
  beforeEach(angular.mock.module('myApp'));
  var $controller;
  var $scope;
  beforeEach(angular.mock.inject(function(_$rootScope_,_$controller_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
  }));

  it('should test to see if controller scope for a specific key exists in AdminCtrl', function(){
    $controller('adminCtrl', { $scope } );
    assert.equal($scope.addPlayekkr, false);
  })
})
