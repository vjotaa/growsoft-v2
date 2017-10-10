"user strict";
var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var genre = require("../models/genre");
var Article = require("../models/article");

function getArticle(req, res) {
  articleId = req.params.id;
  Article.findById(articleId)
    .populate({ path: "user" })
    .populate({ path: "genres", select: "name" })
    .exec((err, article) => {
      if (err) {
        console.log(err);
      } else {
        !article
          ? res.send({ msg: "Error en la peticion" })
          : res.send({ article });
      }
    });
}

function saveArticle(req, res) {
  article = new Article();
  params = req.body;
  article.title = params.title;
  article.description = params.description;
  article.image = "null";
  article.user = params.user;
  article.genres = params.genres.replace(/\s/g, "").split(",");

  article.save((err, articleStored) => {
    if (err) {
      res.send({ message: "Error al guardar el articulo" });
    } else {
      if (!articleStored) {
        res
          .status(400)
          .send({ message: "El articulo no ha podido ser guardado" });
      } else {
        res.status(200).send({ article: articleStored });
      }
    }
  });
}

function getArticles(req, res) {
  var userId = req.params.user;
  if (!userId) {
    var find = Article.find({}).sort({ date: "desc" });
  } else {
    var find = Article.find({ user: userId }).sort({ date: "desc" });
  }
  find.populate({ path: "user" }).exec((err, articles) => {
    if (err) {
      res.send({ msg: "Error in the request" });
    } else {
      !articles
        ? res.send({ msg: "No estan los articulos" })
        : res.send({ articles });
    }
  });
}

function getArticlesByGenre(req, res) {
  var genreId = req.params.genre;
  if (!genreId) {
    var find = Article.find({}).sort({ date: "desc" });
  } else {
    var find = Article.find({ genres: genreId }).sort({ date: "desc" });
  }
  find.populate({ path: "genres", select: "name" }).exec((err, articles) => {
    if (err) {
      res.send({ msg: "Error in the request" });
    } else {
      !articles
        ? res.send({ msg: "No estan los proyectos" })
        : res.send({ articles });
    }
  });
}

function updateArticle(req, res) {
  var articleId = req.params.id;
  var update = req.body;

  Article.findByIdAndUpdate(articleId, update, (err, articleUpdate) => {
    if (err) {
      res.status(500).send({ message: "error to save the article" });
    } else {
      if (!articleUpdate) {
        res.status(404).send({ message: "The article can be updated" });
      } else {
        res.status(200).send({ article: articleUpdate });
      }
    }
  });
}

function deleteArticle(req, res) {
  var articleId = req.params.id;
  Article.findByIdAndRemove(articleId, (err, articleRemoved) => {
    if (err) {
      res.send({ message: "Error al tratar de eliminar el articulo" });
    } else {
      if (!articleRemoved) {
        res.send({ message: "El articulo no puede ser eliminado" });
      } else {
        res.send({ article: articleRemoved });
      }
    }
  });
}

function uploadImage(req, res) {
  var articleId = req.params.id;
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
      Article.findByIdAndUpdate(
        articleId,
        { image: file_name },
        (err, articleStored) => {
          if (!articleStored) {
            res.send({ message: "La imagen no puede ser actualizada" });
          } else {
            res.send({ article: articleStored });
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
  var path_file = "./uploads/articles/" + imageFile;
  fs.exists(path_file, exists => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ message: "La imagen no existe" });
    }
  });
}

module.exports = {
  getArticle,
  saveArticle,
  getArticles,
  updateArticle,
  deleteArticle,
  getImageFile,
  uploadImage,
  getArticlesByGenre
};
