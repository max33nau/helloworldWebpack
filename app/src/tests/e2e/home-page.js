'use strict';
var Chance = require('chance');
var chance = new Chance(); // random names for database;

describe('Home page end 2 end testing', function(){

  it('should have a title of Webpack on the home page', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('NBA Players App');
  });

  it('should redirect the user to the home page if false url', function() {
    browser.get('/#/idonotexist');
    expect(element(by.id('homePageHeader')).getText()).toEqual('Welcome!');
  });


})
