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

  it('should display the username on the home page after a user has registered then log them out when the click logout', function(){
    browser.get('/#/register');
    var userName = chance.first();
    expect(element(by.css('legend')).getText()).toEqual('Register');
    element(by.model('username')).sendKeys(userName);
    element(by.model('password')).sendKeys('abc');
    element(by.css('button')).click();
    element(by.id('homeNav')).click();
    expect(element(by.id('userName')).getText()).toEqual(userName);
    element(by.id('logoutNav')).click();
    expect(element(by.id('userName')).getText()).toBeFalsy();
  });

})
