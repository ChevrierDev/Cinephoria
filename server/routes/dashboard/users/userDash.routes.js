const express = require("express");
const userDashRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/autorisation/autorisation");

userDashRoutes.get(
  "/user/reset-pass",
  checkAuthenticated,
  checkRole("user"),
  (req, res) => {
    const userId = req.user.sub;
    res.render("dashboard/users/userResetPass", {
      title: "Réinitialiser votre mot de passe..",
      id: userId
    });
  }
);

module.exports = userDashRoutes;
