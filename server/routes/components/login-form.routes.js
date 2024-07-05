const express = require("express");
const loginFormRoutes = express.Router();

loginFormRoutes.get("/login", (req, res) => {
  const redirectUrl = req.query.redirect || ''; // ou une URL par défaut
  res.render("auth/login", { redirectUrl });
});

module.exports = loginFormRoutes;
