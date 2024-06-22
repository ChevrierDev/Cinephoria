const express = require("express");
const employeeDashboardRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");
const {
  enrichUserWithInfo
} = require('../../../middlewares/enrichUserWithInfo')

//employee dashboard homePage routes
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

//employee dashboard films routes
employeeDashboardRoutes.get(
  "/films/add",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/addFilm", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

//employee dashboard add films routes
employeeDashboardRoutes.get(
  "/films/update",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/updateFilm", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

//employee dashboard delete films routes
employeeDashboardRoutes.get(
  "/films/delete",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/deleteFilm", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

//employee dashboard reviews routes
employeeDashboardRoutes.get(
  "/films/delete",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details;
    res.render("dashboard/employee/deleteFilm", {
      title: `Bienvenue ${user.first_name}.`,
    });
  }
);

module.exports = employeeDashboardRoutes;
