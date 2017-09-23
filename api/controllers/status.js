var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var Status = require("../models/status");

function createStatus(req, res) {
  status = new Status();
  params = req.body;
  status.name = params.name;
  status.user = params.user;

  status.save((err, statusStored) => {
    if (err) {
      res.send({ message: "Error al guardar la herramienta" });
    } else {
      if (!statusStored) {
        res
          .status(400)
          .send({ message: "La herramienta no ha podido ser guardada" });
      } else {
        res.status(200).send({ status: statusStored });
      }
    }
  });
}
function getStatus(req, res) {
  var userId = req.params.user;
  if (!userId) {
    var find = Status.find({}).sort("title");
  } else {
    var find = Status.find({ user: userId }).sort("title");
  }
  find.populate({ path: "user" }).exec((err, status) => {
    if (err) {
      res.send({ msg: "Error in te request" });
    } else {
      !status ? res.send({ msg: "No estan los Status" }) : res.send({ status });
    }
  });
}

module.exports = {
  createStatus,
  getStatus
};
