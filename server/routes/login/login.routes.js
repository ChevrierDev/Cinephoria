const express = require("express");
const loginRoutes = express.Router();

loginRoutes.get("/", (req, res) => {
  res.render("auth/login", {
    title: "Connectez-vous à votre compte.",
  });
});

module.exports = loginRoutes;
