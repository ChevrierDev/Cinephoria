const express = require("express");
const loginFormRoutes = express.Router();

loginFormRoutes.get("/components/login-form.ejs", (req, res) => {
  const redirectUrl = req.query.redirect || '';
  res.render("components/login-form", { redirectUrl });
});

module.exports = loginFormRoutes;
