const express = require("express");
const proposalProjectController = require("../controllers/proposal-project");
const proposal = express.Router();
const md_auth = require("../middlewares/authenticated");

proposal.get(
  "/propuesta_proyecto/:id?",
  proposalProjectController.getProposals
);
proposal.post(
  "/crear-propuesta-proyecto",
  md_auth.ensureAuth,
  proposalProjectController.createProposal
);
module.exports = proposal;
