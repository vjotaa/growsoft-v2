'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  lastname: String,
  email: String,
  biography: String,
  username: String,
  password: String,
  image: String
});

module.exports = mongoose.model('User', UserSchema);
