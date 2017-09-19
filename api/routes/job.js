const express = require("express");
const jobController = require("../controllers/job");
const job = express.Router();
const md_auth = require("../middlewares/authenticated");

job.get("/trabajos/:user?", jobController.getJobs);
job.post("/crear-trabajo", md_auth.ensureAuth, jobController.createJob);
module.exports = job;
