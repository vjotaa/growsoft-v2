var mongoose = require("mongoose");
var config = require("../config/database");
var job = require("./job");
var Schema = mongoose.Schema;

var JobSchema = Schema({
  name: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: "User" }
});

var Job = (module.exports = mongoose.model("Jobs", JobSchema));
