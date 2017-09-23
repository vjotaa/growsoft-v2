var mongoose = require("mongoose");
var config = require("../config/database");
const user = require("./user");
const status = require("./status");
const proposalProject = require("./proposal-project");
var Schema = mongoose.Schema;

var NotificationSchema = Schema({
  users: [{ type: Schema.ObjectId, ref: "User" }],
  proposal_project: { type: Schema.ObjectId, ref: "Proposal_projects" },
  status: { type: Schema.ObjectId, ref: "Status" }
});

var Notification = (module.exports = mongoose.model(
  "Notifications",
  NotificationSchema
));
