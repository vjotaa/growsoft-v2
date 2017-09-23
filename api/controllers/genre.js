var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var Genre = require("../models/genre");

function createGenre(req, res) {
  genre = new Genre();
  params = req.body;
  genre.name = params.name;
  genre.user = params.user;

  genre.save((err, genreStored) => {
    if (err) {
      res.send({ message: "Error al guardar el genero" });
    } else {
      if (!genreStored) {
        res
          .status(400)
          .send({ message: "La herramienta no ha podido ser guardada" });
      } else {
        res.status(200).send({ genre: genreStored });
      }
    }
  });
}

function getGenres(req, res) {
  var userId = req.params.user;
  if (!userId) {
    var find = Genre.find({}).sort("title");
  } else {
    var find = Genre.find({ user: userId }).sort("title");
  }
  find.populate({ path: "user" }).exec((err, genres) => {
    if (err) {
      res.send({ msg: "Error in te request" });
    } else {
      !genres
        ? res.send({ msg: "No estan las herramientas" })
        : res.send({ genres });
    }
  });
}
module.exports = {
  createGenre,
  getGenres
};
