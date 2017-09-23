var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var Tool = require("../models/tool");
var ProposalWork = require("../models/proposal-work");

function createProposal(req, res) {
  proposalWork = new ProposalWork();
  params = req.body;
  proposalWork.title = params.title;
  proposalWork.description = params.description;
  proposalWork.salary_expectation = params.salary_expectation;
  proposalWork.tools = params.tools.replace(/\s/g, "").split(",");
  proposalWork.user = params.user;

  proposalWork.save((err, proposalWorkStored) => {
    if (err) {
      console.log(err);
      res.send({ message: "Error al guardar la propuesta" });
      console.log(err);
    } else {
      if (!proposalWorkStored) {
        res
          .status(400)
          .send({ message: "La herramienta no ha podido ser guardada" });
      } else {
        res.status(200).send({ proposalWork: proposalWorkStored });
      }
    }
  });
}

function getProposals(req, res) {
  var proposalId = req.params.id;
  console.log(proposalId);
  if (!proposalId) {
    var find = ProposalWork.find({}).sort("title");
  } else {
    var find = ProposalWork.find({ _id: proposalId }).sort("title");
  }
  find
    .populate({ path: "user", select: "name" })
    .populate({ path: "tools", select: "name" })
    .exec((err, proposalWork) => {
      if (err) {
        res.send({ msg: "Error in te request" });
      } else {
        !proposalWork
          ? res.send({ msg: "No estan las propuestas" })
          : res.send({ proposalWork });
      }
    });
}
module.exports = {
  createProposal,
  getProposals
};
