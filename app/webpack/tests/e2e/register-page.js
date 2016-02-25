'use strict';

var Chance = require('chance');
var chance = new Chance(); // random names for database;

describe('Register page end 2 end testing', function(){

  it('should have a title of Webpack on the home page', function() {
    browser.get('/#/register');
    expect(browser.getTitle()).toEqual('NBA Players App');
  });


  it('should allow a user to register if form requirements are met', function(){
    browser.get('/#/register');
    var username = chance.first()+'abcd';
    expect(element(by.css('legend')).getText()).toEqual('Register');
    element(by.model('user.username')).sendKeys(username);
    element(by.model('user.password')).sendKeys('abcdeFHI123');
    element(by.css('button')).click();
    expect(element(by.className('bg-success')).getText()).toEqual('Registratiion Successful');
  });

})
