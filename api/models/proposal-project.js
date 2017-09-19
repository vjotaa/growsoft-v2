const moongose = require("mongoose");
const config = require("../config/database");
const user = require("./user");
const tools = require("./tool");
const Schema = moongose.Schema;

const ProposalProject = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User" },
  tools: [{ type: Schema.ObjectId, ref: "Tools" }]
});

const ProposalProject = ((module.exports = mongoose.model("Proposal-project")),
ProposalProject);
