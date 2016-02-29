'use strict';
var Chance = require('chance');
var chance = new Chance(); // random names for database;

describe('Home page end 2 end testing', function(){

  it('should have a title of Webpack on the home page', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('My Calendar');
  });

})
