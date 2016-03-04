'use strict';
describe( 'Player Search Controller Experience Filter', function() {

	beforeEach(angular.mock.module('myApp'));

	var experienceFilter;

	beforeEach( angular.mock.inject( [ 'experienceFilter', function( _experienceFilter_ ) {
		experienceFilter = _experienceFilter_;
	}]));

	it( 'Statement for rookies who are in their first year', function()  {
		assert.equal( experienceFilter( 0 ), 'Just starting off but looking for big things' );
	});

	it( 'Statement for players playing less than 5 years in the league', function()  {
		assert.equal( experienceFilter( 3 ), 'Not his first rodeo but still has a lot to learn' );
	});

  it( 'Statement for players playing less than 10 years in the league', function()  {
    assert.equal( experienceFilter( 8 ), 'This guy is in his prime and has been doing this a while' );
  });

  it( 'Statement for players who are veterans', function()  {
    assert.equal( experienceFilter( 100 ), 'Learn from this guy, he is a full out veteran and knows how to be successful' );
  });

  it( 'No Data Given', function()  {
    assert.equal( experienceFilter(), 'Not Provided' );
  });

});
