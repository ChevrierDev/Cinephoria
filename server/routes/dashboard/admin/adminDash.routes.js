const express = require("express");
const adminDashboardRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");
const {
  enrichUserWithInfo
} = require('../../../middlewares/enrichUserWithInfo')


//admin dashboard homePage routes
adminDashboardRoutes.get(
  "/",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details
    res.render("dashboard/admin/admin", {
      title: `Bienvenue ${user.first_name}.`
    });
  }
);

//admin dashboard films layouts routes
adminDashboardRoutes.get(
  "/films",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details
    res.render("dashboard/admin/films", {
      title: `Modifier ou ajouter des films à l'affiche.`
    });
  }
);

//admin dashboard add films layouts routes
adminDashboardRoutes.get(
  "/films/add",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details
    res.render("dashboard/admin/addMovie", {
      title: `Ajouter un films.`
    });
  }
);

//admin dashboard rooms layouts routes
adminDashboardRoutes.get(
  "/rooms",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details
    res.render("dashboard/admin/rooms", {
      title: `Modifier ou ajouter des films à l'affiche.`
    });
  }
);

//admin dashboard employee layouts routes
adminDashboardRoutes.get(
  "/employees",
  checkAuthenticated,
  checkRole("admin"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details
    res.render("dashboard/admin/employees", {
      title: `Modifier ou ajouter des films à l'affiche.`
    });
  }
);

module.exports = adminDashboardRoutes;
