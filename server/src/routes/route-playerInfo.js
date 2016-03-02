'use strict';

var express = require('express');
var router = express.Router();
var playerHandler = require('./handlers/player-handler');

module.exports = function searchPlayers(authenticat) {
  router.get('/', playerHandler.getAll);
  router.post('/',playerHandler.createPlayer);
  router.get('/find/:playerName', playerHandler.getPlayerByName);
  router.put('/:id',playerHandler.updatePlayerInfo);
  router.delete('/:id',playerHandler.removePlayer);
  return router;
};
