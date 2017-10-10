var fs = require("fs");
var path = require("path");
var Notification = require("../models/notification");
const user = require("./user");
const status = require("./status");
var proposal_project = require("../models/proposal-project");

function addNotificationToProposal(req, res) {
  notification = new Notification();
  params = req.body;
  notification.users = params.users.replace(/\s/g, "").split(",");
  notification.proposal_project = params.proposal_project;
  notification.status = "59dd07bfefc02e3bce491ba9";

  notification.save((err, notificationStored) => {
    if (err) {
      res.send({ message: "Error al guardar la notificacion" });
    } else {
      if (!notificationStored) {
        res
          .status(400)
          .send({ message: "La notificacion no ha podido ser guardada" });
      } else {
        res.status(200).send({ notification: notificationStored });
      }
    }
  });
}

function getNotifications(req, res) {
  var userId = req.params.user;
  console.log(userId);
  if (!userId) {
    var find = Notification.find({}).sort("title");
  } else {
    var find = Notification.find({ users: userId }).sort("title");
  }
  find
    .populate({ path: "users", select: "name" })
    .populate({
      path: "proposal_project",
      select: ["title", "description", "price"],
      populate: [
        {
          path: "user",
          select: "name"
        }
      ]
    })
    .populate({ path: "status", select: "name" })
    .exec((err, notifications) => {
      if (err) {
        res.send({ msg: "Error in te request" });
      } else {
        !notifications
          ? res.send({ msg: "No estan las herramientas" })
          : res.send({ notifications });
      }
    });
}

function updateNotification(req, res) {
  var notificationId = req.params.id;
  var update = req.body;

  Notification.findByIdAndUpdate(
    notificationId,
    update,
    (err, notificationUpdate) => {
      if (err) {
        res.status(500).send({ message: "error to save the Notification" });
      } else {
        if (!notificationUpdate) {
          res.status(404).send({ message: "The notification can be updated" });
        } else {
          res.status(200).send({ notification: notificationUpdate });
        }
      }
    }
  );
}

module.exports = {
  getNotifications,
  addNotificationToProposal,
  updateNotification
};
