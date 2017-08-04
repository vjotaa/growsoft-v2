var mongoose = require('mongoose');
var config = require('../config/database');
var user = require('./user');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  project_url: { type: String, require: true },
  image: String,
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' },
  tools: [{ type: Array, require: true }]
});

var Project = (module.exports = mongoose.model('Project', ProjectSchema));
