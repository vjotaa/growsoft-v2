var mongoose = require("mongoose");
var config = require("../config/database");
const user = require("./user");
const status = require("./status");
const proposalWork = require("./proposal-work");
var Schema = mongoose.Schema;

var NotificationWorkSchema = Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  proposal_work: { type: Schema.ObjectId, ref: "Proposal_works" },
  status: { type: Schema.ObjectId, ref: "Status" }
});

var NotificationWork = (module.exports = mongoose.model(
  "Notifications-works",
  NotificationWorkSchema
));
