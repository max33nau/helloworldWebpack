'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function mainPage() {
  router.get('/', function(request,response) {
    response.sendFile(path.join(__dirname, '../public/', 'index.html'));
  });
  return router;
};
