const express = require("express");
const loginFormRoutes = express.Router();

loginFormRoutes.get("/components/login-form.ejs", (req, res) => {
  res.render("components/login-form");
});

module.exports = loginFormRoutes;
