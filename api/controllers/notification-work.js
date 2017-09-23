var fs = require("fs");
var path = require("path");
var NotificationWork = require("../models/notification-work");
const user = require("./user");
const status = require("./status");
var proposal_work = require("../models/proposal-work");

function addNotificationToProposal(req, res) {
  notificationWork = new NotificationWork();
  params = req.body;
  notificationWork.user = params.user;
  notificationWork.proposal_work = params.proposal_work;
  notificationWork.status = "59c558d4be86a7479c199bf3";

  notificationWork.save((err, notificationWorkStored) => {
    if (err) {
      res.send({ message: "Error al guardar la notificacion" });
    } else {
      if (!notificationWorkStored) {
        res
          .status(400)
          .send({ message: "La notificacion no ha podido ser guardada" });
      } else {
        res.status(200).send({ notificationWork: notificationWorkStored });
      }
    }
  });
}

function getNotifications(req, res) {
  var userId = req.params.user;
  console.log(userId);
  if (!userId) {
    var find = NotificationWork.find({}).sort("title");
  } else {
    var find = NotificationWork.find({ user: userId }).sort("title");
  }
  find
    .populate({ path: "user", select: "name" })
    .populate({
      path: "proposal_project",
      select: ["title", "description", "salary_expectation"],
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

  NotificationWork.findByIdAndUpdate(
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
