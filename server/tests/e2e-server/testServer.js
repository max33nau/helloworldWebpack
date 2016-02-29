'use strict';
require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const start = require('../.././src/app');
const mainApp = start();
const mongoose = require('../.././src/database').mongoose;
chai.use(chaiHttp);
if (!global.Promise) {
  var q = require('q');
  chai.request.addPromises(q.Promise);
}
const expect = chai.expect;

describe('Test authenticat token-based authentication and Perform Angular CRUD', function () {
  // Used for running crud need the values of what I created in the database
  var server;
  var chaiRequest;
  var app;
  var userData = {};
  var playerInfo = {};
  before(function (done) {
    server = mainApp.start(done);
    app = mainApp.app;
    chaiRequest = chai.request(app);
  });



  // it('not allow a request to /players without a token authorization', function (done) {
  //   chaiRequest.get('/players')
  //   .then(function (response) {
  //     done();
  //   })
  //   .catch(function(error){
  //     expect(error).to.have.status(401);
  //
  //     done();
  //   });
  // });
  //
  // it('should allow a request to /players because of token set in header', function (done) {
  //   chaiRequest.get('/players')
  //   .set('token', userData.normalToken)
  //   .then(function (response) {
  //     expect(response).to.have.status(200);
  //     expect(response).to.have.header('content-type','application/json; charset=utf-8');
  //     done();
  //   })
  //   .catch(done);
  // });
  //
  //
  //
  // it('should allow the admin to post with the proper token', function (done) {
  //   chaiRequest.post('/players')
  //   .set('token', userData.adminToken)
  //   .send({'name':'Lebron', 'age': '12', 'team': 'Cavaliers', 'position':'center', 'rookie': 'true','yearsInTheLeauge': '15'})
  //   .then(function (response) {
  //     expect(response).to.have.status(200);
  //     expect(response.body.name).deep.equal('LEBRON');
  //     playerInfo.id = response.body._id;
  //     done();
  //   })
  //   .catch(done);
  // });
  //
  // it('should allow the admin to post with the proper token', function (done) {
  //   chaiRequest.put('/players/'+playerInfo.id)
  //   .set('token', userData.adminToken)
  //   .send({'name':'kevin'})
  //   .then(function (response) {
  //     expect(response).to.have.status(200);
  //     done();
  //   })
  //   .catch(done);
  // });
  //
  // it('Lebron should now be changed to Kevin so should be able to find Kevin in the database', function (done) {
  //   chaiRequest.get('/players/find/kevin')
  //   .set('token', userData.adminToken)
  //   .then(function (response) {
  //     expect(response.body.name).deep.equal('KEVIN');
  //     expect(response).to.have.status(200);
  //     done();
  //   })
  //   .catch(done);
  // });
  //
  // it('should delete the created player from the database', function (done) {
  //   chaiRequest.delete('/players/'+playerInfo.id)
  //   .set('token', userData.adminToken)
  //   .then(function (response) {
  //     expect(response).to.have.status(200);
  //     expect(response.text).deep.equal(playerInfo.id +' was removed');
  //     done();
  //   })
  //   .catch(done);
  // });

  after(function (done) {
    mongoose.connection.db.collection('users', function(err, collection){
      collection.remove({});
    });
    server.close(done);
  });
});
