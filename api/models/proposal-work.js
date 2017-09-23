const moongose = require("mongoose");
const config = require("../config/database");
const user = require("./user");
const tool = require("./tool");
const Schema = moongose.Schema;

const ProposalWorkSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary_expectation: { type: String, require: true },
  user: { type: Schema.ObjectId, ref: "User" },
  tools: [{ type: Schema.ObjectId, ref: "Tools" }],
  date: { type: Date, default: Date.now }
});

var proposalWork = (module.exports = moongose.model(
  "Proposal_works",
  ProposalWorkSchema
));
