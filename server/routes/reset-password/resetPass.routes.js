const express = require("express");
const resetPasswordRoutes = express.Router();
const {
  checkAuthenticated,
  checkRole,
} = require("../../middlewares/autorisation/autorisation");


//reset Password layout
resetPasswordRoutes.get("/forgot-password", (req, res) => {
    res.render('layouts/forgot-pass', {
      title: "Vous avez oublier votre mot de passe ?"
    })
  }
);

resetPasswordRoutes.get(
  "/reset-password",
  checkAuthenticated,
  checkRole("user"),
  (req, res) => {
    console.log(req.user);
    res.status(300).send("redirection vers changement de mot de passe");
  }
);

module.exports = resetPasswordRoutes;
