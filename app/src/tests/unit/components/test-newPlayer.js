'use strict';
describe('Create a New Player', function(){
  beforeEach(angular.mock.module('myApp'));
  var $scopeNewPlayer;
  var $httpBackend;
  var $compile;
  var $renderNewPlayerForm;
  var $scopePlayerInfo;
  var newPlayerScope;

  beforeEach(angular.mock.inject(function(_$rootScope_, _$httpBackend_, _$compile_) {
    $scopeNewPlayer = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    var htmlNewPlayerForm = "<new-player-form show-add-player-form='admin.addPlayer' form-header='Add Player'> </new-player-form>";
    $renderNewPlayerForm = $compile(htmlNewPlayerForm);
    $httpBackend.whenPOST('http://localhost:3333/players').respond(function(method,url,data,headers){
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

  })
);

  it( 'should add a player to the database', () => {
    $scopeNewPlayer.admin = {};
    $scopeNewPlayer.admin.addPlayer = true;
    var element = $renderNewPlayerForm($scopeNewPlayer);
    $scopeNewPlayer.$digest();
    newPlayerScope = element.isolateScope();
    newPlayerScope.playerInfo.name = 'Batman';
    newPlayerScope.playerInfo.team = 'Justice League';
    newPlayerScope.playerInfo.age = '25';
    newPlayerScope.playerInfo.position = 'point guard';
    newPlayerScope.playerInfo.yearsInTheLeauge = 0;
    newPlayerScope.playerInfo.createPlayer();
    $httpBackend.flush();
    expect(newPlayerScope.success).to.deep.equal('BATMAN was added to the database.');
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


});
