'use strict';
describe('Edit Existing Players', function(){
  beforeEach(angular.mock.module('myApp'));
  var $scope;
  var $httpBackend;
  var players;
  var $compile;
  var $renderEditPlayer;
  var $renderPlayerInfo;
  var $scopePlayerInfo;
  var editPlayerScope;
  var playerInfoScope;

  beforeEach(angular.mock.inject(function(_$rootScope_, _$httpBackend_, _$compile_) {
    $scope = _$rootScope_.$new();
    $scopePlayerInfo = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    var htmlEdit = "<edit-existing-players hide-add-player-form='admin.addPlayer'> </edit-existing-players>";
    var htmlPlayerInfo = "<player-info player='player' remove-player='players.removePlayer(player)'> </player-info>"
    $renderEditPlayer = $compile(htmlEdit);
    $renderPlayerInfo = $compile(htmlPlayerInfo);

    $httpBackend.whenGET('http://localhost:3333/players').respond(function(method,url,data,headers){
      players = [
        {
          name: 'LEBRON JAMES',
          age: 23,
          team: 'CLEVELAND CAVALIERS',
          position: 'SMALL FORWARD',
          rookie: false,
          yearsInTheLeauge: 10,
          _id: 'abcdef'
        },
        {
          name: 'MAX JACOBSEN',
          age: 27,
          team: 'PORTLAND TRAIL BLAZERS',
          position: 'CENTER',
          rookie: false,
          yearsInTheLeauge: 5,
          _id: '123445'
        }
      ];
      return [200, players];
    });

    $httpBackend.whenPUT('http://localhost:3333'+/\/players\//).respond(function(method,url,data,headers,params){
      return [200, angular.fromJson(data)];
    });
  })
);

  it( 'should get the exiting players in the mock database', () => {
    $scope.admin = {};
    $scope.admin.addPlayer = false;
    var elementEdit = $renderEditPlayer($scope);
    $scope.$digest();
    editPlayerScope = elementEdit.isolateScope();
    $httpBackend.flush();
    expect(editPlayerScope.players.existing.length).to.deep.equal(2);
    expect(editPlayerScope.players.existing[0].name).to.deep.equal('LEBRON JAMES');
  });

  it('should create the playerInfo directive', ()=> {
    $scopePlayerInfo.player = editPlayerScope.players.existing[0];
    $scopePlayerInfo.removePlayer = function(player) {
      for(var ii = 0; ii < editPlayerScope.players.existing.length; ii++){
          if(editPlayerScope.players.existing[ii].name === player.name) {
              editPlayerScope.players.existing.splice(ii,1);
          }
        }
    };
    var elementPlayerInfo = $renderPlayerInfo($scopePlayerInfo);
    $scopePlayerInfo.$digest();
    playerInfoScope = elementPlayerInfo.isolateScope();
    expect(playerInfoScope.player.name).to.deep.equal('LEBRON JAMES');
  });

  it('should copy a player and then revert back when the user cancels the edit', ()=> {
    playerInfoScope.specificPlayer.edit();
    expect(playerInfoScope.uneditedPlayer.name).to.deep.equal('LEBRON JAMES');
    playerInfoScope.player.name = 'TEST';
    playerInfoScope.specificPlayer.cancelEdit();
    expect(playerInfoScope.player.name).to.deep.equal('LEBRON JAMES');
  });

  it('should save a player and update it on the player object', () => {
    playerInfoScope.player.name = 'TEST';
    playerInfoScope.specificPlayer.save();
  //  $httpBackend.flush(); Not needed because the http.get is cached so updates player in cachedFactory 
    expect(playerInfoScope.player.name).to.deep.equal('TEST');
  })

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


});
