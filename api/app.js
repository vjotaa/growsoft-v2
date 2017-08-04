'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport-jwt');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
var users_route = require('./routes/user');
var projects_route = require('./routes/project');
//Port
const port = process.env.PORT || 3000;

//Connect to database and verificate errors
mongoose.connect(config.database, (err, res) => {
  if (err) {
    console.log('Error en la base de datos: ', err);
  } else {
    console.log('Conectado a la base de datos' + config.database);
  }
});

//Start the server
app.listen(port, () => {
  console.log('Server iniciado en el puerto ' + port);
});

//Body parse Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Config headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY,Origin, X-Requested-With,Content-Type,Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');

  next();
});

//Route Base
app.use('/api', users_route);
app.use('/api', projects_route);
//Index route
