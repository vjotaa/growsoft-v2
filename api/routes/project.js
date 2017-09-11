"use strict";
var express = require("express");
var ProjectController = require("../controllers/project");
var project = express.Router();
var md_auth = require("../middlewares/authenticated");

//Multipart to upload Projects
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./uploads/projects" });

project.get("/proyecto/:id", ProjectController.getProject);
project.post(
  "/crear-proyecto",
  md_auth.ensureAuth,
  ProjectController.saveProject
);
project.get("/proyectos/:user?", ProjectController.getProjects);
project.put(
  "/actualizar-proyecto/:id",
  md_auth.ensureAuth,
  ProjectController.updateProject
);
project.delete("/proyecto/:id", ProjectController.deleteProject);
project.post(
  "/subir-imagen-proyecto/:id",
  [md_auth.ensureAuth, md_upload],
  ProjectController.uploadImage
);
project.get("/imagen-proyecto/:imageFile", ProjectController.getImageFile);

module.exports = project;
