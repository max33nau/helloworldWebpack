"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  twitter: String
});

var user = mongoose.model('User', userSchema);


module.exports = user;
