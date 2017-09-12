const express = require("express");
const toolController = require("../controllers/tool");
const tool = express.Router();
const md_auth = require("../middlewares/authenticated");

tool.get("/herramientas/:user?", toolController.getTools);
tool.post("/crear-herramienta", md_auth.ensureAuth, toolController.createTool);
module.exports = tool;
