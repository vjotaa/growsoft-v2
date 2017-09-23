const express = require("express");
const proposalWorkController = require("../controllers/proposal-work");
const proposal_work = express.Router();
const md_auth = require("../middlewares/authenticated");

proposal_work.get(
  "/propuestas_trabajo/:id?",
  proposalWorkController.getProposals
);
proposal_work.post(
  "/crear-propuesta-trabajo",
  md_auth.ensureAuth,
  proposalWorkController.createProposal
);
module.exports = proposal_work;
