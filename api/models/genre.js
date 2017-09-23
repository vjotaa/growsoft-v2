var mongoose = require("mongoose");
var config = require("../config/database");
var user = require("./user");
var Schema = mongoose.Schema;

var GenreSchema = Schema({
  name: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: "User" }
});

var Genre = (module.exports = mongoose.model("Genres", GenreSchema));
