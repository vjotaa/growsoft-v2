var mongoose = require("mongoose");
var config = require("../config/database");
var role = require("./role");
var Schema = mongoose.Schema;

var RoleSchema = Schema({
  name: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: "User" }
});

var role = (module.exports = mongoose.model("roles", RoleSchema));
