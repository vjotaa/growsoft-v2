"user strict";
var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var Project = require("../models/project");
var q = require("q");

function getProject(req, res) {
  projectId = req.params.id;
  Project.findById(projectId)
    .populate({ path: "user" })
    .exec((err, project) => {
      if (err) {
        console.log(err);
      } else {
        !project
          ? res.send({ msg: "Error en la peticion" })
          : res.send({ project });
      }
    });
}

function saveProject(req, res) {
  project = new Project();
  params = req.body;
  project.title = params.title;
  project.description = params.description;
  project.project_url = params.project_url;
  project.image = "null";
  project.user = params.user;
  project.tool = params.tool;
  
  project.save((err, projectStored) => {
    if (err) {
      res.send({ message: "Error al guardar el proyecto" });
    } else {
      if (!projectStored) {
        res
          .status(400)
          .send({ message: "El proyecto no ha podido ser guardado" });
      } else {
        res.status(200).send({ project: projectStored });
      }
    }
  });
}

function getProjects(req, res) {
  var userId = req.params.user;
  if (!userId) {
    var find = Project.find({}).sort({ date: "desc" });
  } else {
    var find = Project.find({ user: userId }).sort({ date: "desc" });
  }
  find.populate({ path: "user" }).exec((err, projects) => {
    if (err) {
      res.send({ msg: "Error in te request" });
    } else {
      !projects
        ? res.send({ msg: "No estan los proyectos" })
        : res.send({ projects });
    }
  });
}

function updateProject(req, res) {
  var projectId = req.params.id;
  var update = req.body;

  Project.findByIdAndUpdate(projectId, update, (err, projectUpdated) => {
    if (err) {
      res.status(500).send({ message: "error to save the project" });
    } else {
      if (!projectUpdated) {
        res.status(404).send({ message: "The project can be updated" });
      } else {
        res.status(200).send({ project: projectUpdated });
      }
    }
  });
}

function deleteProject(req, res) {
  var projectId = req.params.id;
  Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
    if (err) {
      res.send({ message: "Error al tratar de eliminar el proyecto" });
    } else {
      if (!projectRemoved) {
        res.send({ message: "El proyecto no puede ser eliminado" });
      } else {
        res.send({ project: projectRemoved });
      }
    }
  });
}

function uploadImage(req, res) {
  var projectId = req.params.id;
  var file_name = "Imagen no cargada";

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split("/");
    var file_name = file_split[2];
    var ext_file = file_name.split(".");
    var file_ext = ext_file[1];

    if (
      file_ext == "png" ||
      file_ext == "jpg" ||
      file_ext == "jpeg" ||
      file_ext == "gif"
    ) {
      Project.findByIdAndUpdate(
        projectId,
        { image: file_name },
        (err, projectUpdated) => {
          if (!projectUpdated) {
            res.send({ message: "La imagen no puede ser actualizada" });
          } else {
            res.send({ project: projectUpdated });
          }
        }
      );
    } else {
      res.send({ message: "La imagen no es una extension correcta" });
    }
    console.log(file_ext);
  } else {
    res.send({ message: "La imagen no puede ser subida" });
  }
}

//get images
function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = "./uploads/projects/" + imageFile;
  fs.exists(path_file, exists => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ message: "La imagen no existe" });
    }
  });
}

module.exports = {
  getProject,
  saveProject,
  getProjects,
  updateProject,
  deleteProject,
  getImageFile,
  uploadImage
};
