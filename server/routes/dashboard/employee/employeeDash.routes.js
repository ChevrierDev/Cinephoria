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
//admin dashboard homePage routes
employeeDashboardRoutes.get(
  "/",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/employee", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

module.exports = employeeDashboardRoutes;
