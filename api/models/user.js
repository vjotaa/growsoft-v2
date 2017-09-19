"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var role = require("./role");
var jobs = require("./job");

var UserSchema = Schema({
  name: String,
  lastname: String,
  email: String,
  biography: String,
  username: String,
  password: String,
  image: String,
  jobs: [{ type: Schema.ObjectId, ref: "Jobs" }],
  role: { type: Schema.ObjectId, ref: "roles" }
});

module.exports = mongoose.model("User", UserSchema);
