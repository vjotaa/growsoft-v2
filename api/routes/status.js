const express = require("express");
const statusController = require("../controllers/status");
const status = express.Router();
const md_auth = require("../middlewares/authenticated");

status.get("/obtener-status/:id?", statusController.getStatus);
status.post("/crear-status", md_auth.ensureAuth, statusController.createStatus);
module.exports = status;
