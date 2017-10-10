const moongose = require("mongoose");
const config = require("../config/database");
const user = require("./user");
const tools = require("./tool");
const status = require("./status");
const Schema = moongose.Schema;

var ProposalProjectSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User" },
  tools: [{ type: Schema.ObjectId, ref: "Tools" }],
  programmers: [{ type: Schema.ObjectId, ref: "User" }],
  designers: [{ type: Schema.ObjectId, ref: "User" }],
  fullStack: [{ type: Schema.ObjectId, ref: "User" }],
  status: { type: Schema.ObjectId, ref: "Status" }
});

var proposalProject = (module.exports = moongose.model(
  "Proposal_projects",
  ProposalProjectSchema
));
