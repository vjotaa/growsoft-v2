const express = require("express");
const roleController = require("../controllers/role");
const role = express.Router();
const md_auth = require("../middlewares/authenticated");

role.get("/roles/", roleController.getRoles);
role.post("/crear-role", md_auth.ensureAuth, roleController.createRole);
module.exports = role;
