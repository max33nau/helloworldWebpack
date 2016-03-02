'use strict';

const my = require('../.././src/config/configDBandServer');
var Player = require('../.././src/models/model-playerinfo');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe( 'Checks that the player schema was created correctly', () => {
  var playerSchema;
  var newPlayer = {};
  before(function() {
    newPlayer.name = 'max jacobsen';
    newPlayer.team = 'portland trail blazers';
    newPlayer.age = '25';
    newPlayer.position = 'power forward';
    newPlayer.rookie = 'false';
    newPlayer.yearsInTheLeauge = '1';
    playerSchema = new Player(newPlayer);
  });

	it( 'should convert the position, name, and team to uppercase, check toUpper function in schema', () => {
    assert.equal(playerSchema.name, 'MAX JACOBSEN');
    assert.equal(playerSchema.position, 'POWER FORWARD');
    assert.equal(playerSchema.team, 'PORTLAND TRAIL BLAZERS');
	});

  it( 'should convert the age and years in the league to a number, check convertToNumber function in schema ', () => {
    assert.deepStrictEqual(playerSchema.age, 25); // fails if you change 25 to '25' (a string)
    assert.deepStrictEqual(playerSchema.yearsInTheLeauge, 1);
  });

  it('should not allow the age or yearsInTheLeague to be added to the player schema if they are not a number', () => {
    newPlayer.age = 'foo';
    newPlayer.yearsInTheLeauge = 'bar';
    var faltyPlayerSchema = new Player(newPlayer);
    expect(faltyPlayerSchema.age).to.not.exist;
    expect(faltyPlayerSchema.yearsInTheLeague).to.not.exist;
  });
});

describe( 'Checks that the config parameters are correct for my database and server', () => {
	it( 'should have a port connection of 3333', () => {
		assert.equal( my.serverPort, 3333 );
	});
  it( 'should have a database name of myCalendar ', () => {
    assert.equal( my.dbName, 'NBA Player App' );
  });
});
