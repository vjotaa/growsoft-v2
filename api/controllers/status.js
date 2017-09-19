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

module.exports = {
  createStatus
};
