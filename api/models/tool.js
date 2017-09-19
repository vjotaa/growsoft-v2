var mongoose = require("mongoose");
var config = require("../config/database");
var user = require("./user");
var Schema = mongoose.Schema;

var ToolSchema = Schema({
  name: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: "User" }
});

var Tool = (module.exports = mongoose.model("Tools", ToolSchema));
