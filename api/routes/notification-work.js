const express = require("express");
const notificationWorkController = require("../controllers/notification-work");
const notificationWork = express.Router();
const md_auth = require("../middlewares/authenticated");

notificationWork.get(
  "/notificaciones-trabajos/:user?",
  notificationWorkController.getNotifications
);
notificationWork.post(
  "/crear-notificacion-trabajo",
  md_auth.ensureAuth,
  notificationWorkController.addNotificationToProposal
);
notificationWork.put(
  "/actualizar-notificacion-trabajo/:id",
  md_auth.ensureAuth,
  notificationWorkController.updateNotification
);
module.exports = notificationWork;
