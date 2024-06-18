const express = require("express");
const userDashboardRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");
const {
  enrichUserWithInfo
} = require('../../../middlewares/enrichUserWithInfo')

// user reset password routes
userDashboardRoutes.get(
  "/user/reset-pass",
  checkAuthenticated,
  checkRole("user"),
  (req, res) => {
    const userId = req.user.sub;
    res.render("dashboard/users/userResetPass", {
      title: "Réinitialiser votre mot de passe..",
      id: userId,
    });
  }
);

//users dashboard homePage routes
userDashboardRoutes.get(
  "/",
  checkAuthenticated,
  checkRole("user"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details
    res.render("dashboard/users/users", {
      user: user,
      title: `Bienvenue ${user.first_name}.`
    });
  }
);

// //users dashboard homePage routes
// userDashboardRoutes.get(
//   "/reviews",
//   checkAuthenticated,
//   checkRole("user"),
//   enrichUserWithInfo,
//   (req, res) => {
//     const user = req.user.details
//     res.render("dashboard/users/userReview", {
//       user: user,
//       title: `Laisser un avis.`,
//       currentPath: req.path
//     });
//   }
// );

//users dashboard get review form routes
userDashboardRoutes.get(
  "/reviews-form",
  checkAuthenticated,
  checkRole("user"),
  enrichUserWithInfo,
  (req, res) => {
    const user = req.user.details
    res.render("dashboard/users/reviewForm", {
      user: user,
      title: `Laisser un avis.`,
      currentPath: req.path
    });
  }
);

module.exports = userDashboardRoutes;
