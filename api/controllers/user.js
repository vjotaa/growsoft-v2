'user strict';
var passport = require('passport');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var validator = require('validator');

function registerUser(req, res) {
  var user = new User();
  var params = req.body;

  user.name = params.name;
  user.lastname = params.lastname;
  user.email = params.email;
  user.username = params.username;
  user.image = 'null';
  emailCheck = validator.isEmail(params.email);

  //Email existence
  User.find({ email: params.email.toLowerCase() }, (err, docs) => {
    if (!docs.length) {
      //Username existence
      User.find({ username: params.username }, (err, docs) => {
        if (!docs.length) {
          if (!emailCheck) {
            res.json({ msg: 'Ingrese un email apropiado' });
          } else {
            if (params.password) {
              bcrypt.hash(params.password, null, null, (err, hash) => {
                user.password = hash;
                if (
                  user.name != null &&
                  user.lastname != null &&
                  user.email != null
                ) {
                  // safe the user
                  user.save((err, userStored) => {
                    if (err) {
                      res.json({
                        success: false,
                        msg: 'Error al guardar el usuario'
                      });
                    } else {
                      if (!userStored) {
                        res.json({
                          success: false,
                          msg: 'El usuario no ha podido ser registrado'
                        });
                      } else {
                        res.status(200).send({ user: userStored });
                      }
                    }
                  });
                } else {
                  res.json({
                    success: false,
                    msg: 'Introduce toda la informacion'
                  });
                }
              });
            } else {
              res.json({ success: false, msg: 'Introduce la contraseña' });
            }
          }
        } else {
          res.json({ msg: 'El nombre de usuario esta registrado' });
        }
      });
    } else {
      res.json({ msg: 'El email ya esta registrado' });
    }
  });
}

function loginUser(req, res) {
  var params = req.body;
  var userId = req.params.id;
  var email = params.email;
  var password = params.password;

  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' });
    } else {
      if (!user) {
        res.status(404).send({
          message:
            'El usuario no existe, confirme si su contaseña o email son correctos'
        });
      } else {
        bcrypt.compare(password, user.password, (err, check) => {
          if (check) {
            if (params.gethash) {
              // Devolver token de jwt
              res.status(200).send({
                token: jwt.createToken(user)
              });
            } else {
              res.status(200).send({ user });
            }
          } else {
            res.status(404).send({
              message:
                'El usuario no puede iniciar sesion, confirme si su contaseña o email son correctos'
            });
          }
        });
      }
    }
  });
}

function updateUser(req, res) {
  var userId = req.params.id;
  var params = req.body;
  var user = new User();
  user.email = params.email;
  if (userId != req.user.sub) {
    return res.send({ message: 'No tienes permisos' });
  }
  // User.find({ email: params.email.toLowerCase() }, (err, docs) => {
  //   if (!docs.length) {
  User.findByIdAndUpdate(userId, params, (err, userUpdated) => {
    if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!userUpdated) {
        res
          .status(404)
          .send({ message: 'El usuario no puede ser actualizado' });
      } else {
        res.status(200).send({ user: userUpdated });
      }
    }
  });
  //   } else {
  //     res.json({ msg: 'El email ya ha sido elegido por otra persona' });
  //   }
  // });
}

function uploadImage(req, res) {
  var userId = req.params.id;
  var file_name = 'Imagen no cargada';

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('/');
    var file_name = file_split[2];

    //Check if it's an image
    var ext_file = file_name.split('.');
    var file_ext = ext_file[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg') {
      User.findByIdAndUpdate(
        userId,
        { image: file_name },
        (err, userUpdated) => {
          if (!userUpdated) {
            res.json({ msg: 'El usuario no puede ser actualizado' });
          } else {
            res.send({ image: file_name, user: userUpdated });
          }
        }
      );
    } else {
      res.send({ message: 'Extension invalida' });
    }
  } else {
    res.send({ message: 'La imagen no puede ser actualizada' });
  }
}

function getImage(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './uploads/users/' + imageFile;
  fs.exists(path_file, exists => {
    exists
      ? res.sendFile(path.resolve(path_file))
      : res.send({ message: 'La imagen no existe' });
  });
}

function getUser(req, res) {
  var userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) {
      res.send({ message: 'Error en la solicitud' });
    } else {
      if (!user) {
        res.send({ message: 'El usuario no existe' });
      } else {
        res.send({ user });
      }
    }
  });
}

function getUsers(req, res) {
  var userId = req.params.user;
  if (!userId) {
    var find = User.find({});
  }
  find.populate({ path: 'user' }).exec((err, users) => {
    if (err) {
      res.send({ msg: 'Error en la peticion' });
    } else {
      !users
        ? res.send({ msg: 'No estan los proyectos' })
        : res.send({ users });
    }
  });
}

module.exports = {
  registerUser,
  getUser,
  loginUser,
  updateUser,
  uploadImage,
  getImage,
  getUsers
};