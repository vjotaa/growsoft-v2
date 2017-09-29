"use strict";
var express = require("express");
var ArticleController = require("../controllers/article");
var article = express.Router();
var md_auth = require("../middlewares/authenticated");

//Multipart to upload Articles
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./uploads/articles" });

article.get("/articulo/:id", ArticleController.getArticle);
article.post(
  "/crear-articulo",
  md_auth.ensureAuth,
  ArticleController.saveArticle
);
article.get("/articulos/:user?", ArticleController.getArticles);
article.get("/articulos-generos/:genre?", ArticleController.getArticlesByGenre);
article.put(
  "/actualizar-articulo/:id",
  md_auth.ensureAuth,
  ArticleController.updateArticle
);
article.delete("/articulo/:id", ArticleController.deleteArticle);
article.post(
  "/subir-imagen-articulo/:id",
  [md_auth.ensureAuth, md_upload],
  ArticleController.uploadImage
);
article.get("/imagen-articulo/:imageFile", ArticleController.getImageFile);

module.exports = article;
