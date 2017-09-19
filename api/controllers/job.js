var fs = require("fs");
var path = require("path");
var user = require("../models/user");
var Job = require("../models/job");

function createJob(req, res) {
  job = new Job();
  params = req.body;
  job.name = params.name;
  job.user = params.user;

  job.save((err, jobStored) => {
    if (err) {
      res.send({ message: "Error el trabajo" });
    } else {
      if (!jobStored) {
        res
          .status(400)
          .send({ message: "el trabajo no ha podido ser guardado" });
      } else {
        res.status(200).send({ job: jobStored });
      }
    }
  });
}

function getJobs(req, res) {
  var userId = req.params.user;
  if (!userId) {
    var find = Job.find({}).sort("title");
  } else {
    var find = Job.find({ user: userId }).sort("title");
  }
  find.populate({ path: "user" }).exec((err, jobs) => {
    if (err) {
      res.send({ msg: "Error in te request" });
    } else {
      !jobs
        ? res.send({ msg: "No estan las herramientas" })
        : res.send({ jobs });
    }
  });
}
module.exports = {
  createJob,
  getJobs
};
