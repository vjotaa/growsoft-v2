var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var Role = require("../models/role");

function createRole(req, res) {
  role = new Role();
  params = req.body;
  role.name = params.name;
  role.user = params.user;

  role.save((err, roleStored) => {
    if (err) {
      res.send({ message: "Error al guardar el role de usuario" });
      console.log(err);
    } else {
      if (!roleStored) {
        res.status(400).send({ message: "El role no ha podido ser guardado" });
      } else {
        res.status(200).send({ role: roleStored });
      }
    }
  });
}

function getRoles(req, res) {
  var userId = req.params.user;
  if (!userId) {
    var find = Role.find({}).sort("title");
  } else {
    var find = Role.find({ user: userId }).sort("title");
  }
  find.populate({ path: "user" }).exec((err, roles) => {
    if (err) {
      res.send({ msg: "Error in te request" });
    } else {
      !roles ? res.send({ msg: "No estan los roles" }) : res.send({ roles });
    }
  });
}
module.exports = {
  createRole,
  getRoles
};
