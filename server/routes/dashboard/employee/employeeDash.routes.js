const express = require("express");
const employeeDashboardRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");
const {
  enrichUserWithInfo
} = require('../../../middlewares/enrichUserWithInfo')

// user reset password routes
employeeDashboardRoutes.get(
  "/",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details
    res.render("dashboard/users/employee", {
      title: `Bienvenue sur votre intranet ${user.first_name}.`,
    });
  }
);

module.exports = employeeDashboardRoutes;
