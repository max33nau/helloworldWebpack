'use strict';
var express = require('express');
var router = express.Router();
var authHandler = require('./handlers/auth-handler');

module.exports = function searchPlayers(authenticat) {
  router.post('/twitter', authHandler.checkAuth);
  return router;
};
