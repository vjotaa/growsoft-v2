const moongose = require("mongoose");
const config = require("../config/database");
const user = require("./user");
const tool = require("./tool");
const Schema = moongose.Schema;

const ProposalWork = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User" },
  tools: [{ type: Schema.ObjectId, ref: "Tool" }]
});

const ProposalWork = ((module.exports = mongoose.model("Proposal-work")),
ProposalWork);
