var mongoose = require("mongoose");
var config = require("../config/database");
var user = require("./user");
var genre = require("./genre");
var Schema = mongoose.Schema;

var ArticleSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User" },
  genres: [{ type: Schema.ObjectId, ref: "Genres" }]
});

var Article = (module.exports = mongoose.model("Article", ArticleSchema));
