
describe('Angular testing for adminCtrl', function(){
  beforeEach(angular.mock.module('myApp'));
  var $controller;
  var $scope;
  var $http;
  var $httpBackend;

  beforeEach(angular.mock.inject(function(_$rootScope_,_$controller_, _$httpBackend_, _$http_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $http = _$http_;
    $httpBackend.whenGET('/players').respond(function(method,url,data,headers){
      players = [
        {
          name: 'LEBRON JAMES',
          age: 23,
          team: 'CLEVELAND CAVALIERS',
          position: 'SMALL FORWARD',
          rookie: false,
          yearsInTheLeauge: 10,
          _id: 'abcdef'
        }
      ];
      return [200, players];
    });
    $httpBackend.whenPOST('/players').respond(function(method,url,data,headers){
      data = angular.fromJson(data);
      var newPlayer = {};
      newPlayer.name = data.name.toUpperCase();
      newPlayer.team = data.team.toUpperCase();
      newPlayer.age = Number(data.age);
      newPlayer.position = data.position.toUpperCase();
      newPlayer.rookie = data.rookie;
      newPlayer.yearsInTheLeauge = Number(data.yearsInTheLeauge);
      newPlayer._id = 'abcdet1';
      return [200, JSON.stringify(newPlayer)];
    });

    $httpBackend.whenPUT(/\/players\//).respond(function(method,url,data,headers,params){
      return [200, angular.fromJson(data)];
    });
  }));

  it('should have one player already existing in the players array on the first load', function(){
      $controller('adminCtrl', { $scope, $http, $httpBackend} );
      $httpBackend.flush();
      expect($scope.players.length).to.deep.equal(1);
  });

  it('should test to see if creating a new player adds a player to the players array within scope', function(){
    var token = 'fake-token';
    $controller('adminCtrl', { $scope, $http, $httpBackend} );
    $scope.playerInfo = {
      name: 'Max Jacobsen',
      team: 'Portland Trail Blazers',
      age: 25,
      position: 'Power Forward',
      rookie: false,
      yearsInTheLeauge: 5
    };
    $scope.admin.createPlayer();
    $httpBackend.flush();
    expect($scope.players.length).to.deep.equal(2);
  })

  it('should update the existing player already in the $scope.players array', function(){
    var token = 'fake-token';
    $controller('adminCtrl', { $scope, $http, $httpBackend} );
    $httpBackend.flush();
    expect($scope.players[0].team).to.deep.equal('CLEVELAND CAVALIERS');
    $scope.players[0].team = 'MIAMI HEAT';
    $scope.admin.updatePlayer($scope.players[0]);
    $httpBackend.flush();
    expect($scope.players[0].team).to.deep.equal('MIAMI HEAT');
  });

  it('should copy a player that has been asked to be edited and then revert back to original copy if they hit cancel', function(){
      var token = 'fake-token';
      $controller('adminCtrl', { $scope, $http, $httpBackend} );
      $httpBackend.flush();
      $scope.admin.editPlayer($scope.players[0]);
      expect($scope.uneditedPlayer).to.deep.equal($scope.players[0]);
      $scope.players[0].team = 'MIAMI';
      $scope.admin.cancelEdit($scope.players[0]);
      expect($scope.players[0].team).to.deep.equal('CLEVELAND CAVALIERS');
  });



  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
})
