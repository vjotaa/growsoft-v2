const express = require("express");
const genreController = require("../controllers/genre");
const genre = express.Router();
const md_auth = require("../middlewares/authenticated");

genre.get("/generos/:user?", genreController.getGenres);
genre.post("/crear-genero", md_auth.ensureAuth, genreController.createGenre);
module.exports = genre;
