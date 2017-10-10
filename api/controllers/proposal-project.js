var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var Tool = require("../models/tool");
var ProposalProject = require("../models/proposal-project");
var status = require("../models/status");

function createProposal(req, res) {
  proposalProject = new ProposalProject();
  params = req.body;
  proposalProject.title = params.title;
  proposalProject.description = params.description;
  proposalProject.price = params.price;
  proposalProject.tools = params.tools.replace(/\s/g, "").split(",");
  proposalProject.programmers = _empty(params.programmers);
  proposalProject.designers = _empty(params.designers);
  proposalProject.fullStack = _empty(params.fullStack);
  proposalProject.status = "59c558d4be86a7479c199bf3";
  proposalProject.user = params.user;

  function _empty(value) {
    if (value) {
      console.log("pasa");
      value = value.replace(/\s/g, "").split(",");
    } else {
      console.log("indenfinido");
      value;
    }
    return value;
  }

  proposalProject.save((err, proposalProjectStored) => {
    if (err) {
      res.send({ message: "Error al guardar la propuesta" });
      console.log(err);
    } else {
      if (!proposalProjectStored) {
        res
          .status(400)
          .send({ message: "La herramienta no ha podido ser guardada" });
      } else {
        res.status(200).send({ proposalProject: proposalProjectStored });
      }
    }
  });
}

function getProposals(req, res) {
  var proposalId = req.params.id;
  console.log(proposalId);
  if (!proposalId) {
    var find = ProposalProject.find({}).sort("title");
  } else {
    var find = ProposalProject.find({ _id: proposalId }).sort("title");
  }
  find
    .populate({ path: "fullStack", select: "name" })
    .populate({ path: "programmers", select: "name" })
    .populate({ path: "user", select: "name" })
    .populate({ path: "designers", select: "name" })
    .populate({ path: "status", select: "name" })
    .populate({ path: "tools", select: "name" })
    .exec((err, proposalProject) => {
      if (err) {
        res.send({ msg: "Error in te request" });
      } else {
        !proposalProject
          ? res.send({ msg: "No estan las propuestas" })
          : res.send({ proposalProject });
      }
    });
}
module.exports = {
  createProposal,
  getProposals
};
