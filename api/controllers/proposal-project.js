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
  proposalProject.programmers = params.programmers
    .replace(/\s/g, "")
    .split(",");
  proposalProject.designers = params.designers.replace(/\s/g, "").split(",");
  proposalProject.status = "59c191a76dd53e08d75d56da";
  proposalProject.user = params.user;

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
  var userId = req.params.user;
  if (!userId) {
    var find = ProposalProject.find({}).sort("title");
  } else {
    var find = ProposalProject.find({ user: userId }).sort("title");
  }
  find
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
