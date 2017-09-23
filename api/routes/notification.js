const express = require("express");
const notificationController = require("../controllers/notification");
const notification = express.Router();
const md_auth = require("../middlewares/authenticated");

notification.get(
  "/notificaciones/:user?",
  notificationController.getNotifications
);
notification.post(
  "/crear-notificacion",
  md_auth.ensureAuth,
  notificationController.addNotificationToProposal
);
notification.put(
  "/actualizar-notificacion/:id",
  md_auth.ensureAuth,
  notificationController.updateNotification
);
module.exports = notification;
