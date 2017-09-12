var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var Tool = require("../models/tool");

function createTool(req, res) {
  tool = new Tool();
  params = req.body;
  tool.name = params.name;
  tool.user = params.user;

  tool.save((err, toolStored) => {
    if (err) {
      res.send({ message: "Error al guardar la herramienta" });
    } else {
      if (!toolStored) {
        res
          .status(400)
          .send({ message: "La herramienta no ha podido ser guardada" });
      } else {
        res.status(200).send({ tool: toolStored });
      }
    }
  });
}

function getTools(req, res) {
  var userId = req.params.user;
  if (!userId) {
    var find = Tool.find({}).sort("title");
  } else {
    var find = Tool.find({ user: userId }).sort("title");
  }
  find.populate({ path: "user" }).exec((err, tools) => {
    if (err) {
      res.send({ msg: "Error in te request" });
    } else {
      !tools
        ? res.send({ msg: "No estan las herramientas" })
        : res.send({ tools });
    }
  });
}
module.exports = {
  createTool,
  getTools
};
