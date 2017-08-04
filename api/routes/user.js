'use strict';
var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated.js');
const user = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });

//Register
user.post('/registrar-usuario', UserController.registerUser);
//Login
user.post('/iniciar-sesion', UserController.loginUser);
//Update
user.put(
  '/actualizar-usuario/:id',
  md_auth.ensureAuth,
  UserController.updateUser
);
//Upload
user.post(
  '/imagen-usuario/:id',
  [md_auth.ensureAuth, md_upload],
  UserController.uploadImage
);
//Get Image
user.get('/ver-imagen/:imageFile', UserController.getImage);
//Get User
user.get('/usuario/:id', UserController.getUser);
user.get('/usuarios/', UserController.getUsers);
module.exports = user;
