var mongoose = require("mongoose");
var config = require("../config/database");
var user = require("./user");
var Schema = mongoose.Schema;

var StatusSchema = Schema({
  name: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: "User" }
});

var Status = (module.exports = mongoose.model("Status", StatusSchema));
